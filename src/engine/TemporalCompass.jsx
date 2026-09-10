import { useEffect, useMemo, useRef, useState } from "react";

/* ============================================================
   PROTOTYPE v3 : Boussole temporelle
   ------------------------------------------------------------
   - Vue de dessus (plus d'angle iso : deplacements 100% intuitifs)
   - Camera + joueur mis a jour via refs (pas de re-render React
     par frame) => plus de saccades
   - Grille et tourbillons dessines UNE fois, en memo
   ============================================================ */

const VW = 1600;
const VH = 900;
const WORLD = 2400;
const LOCK_RADIUS = 60;
const LOCK_MS = 900;
const NUM_WHIRLS = 10;

const rand = (min, max) => min + Math.random() * (max - min);

export function TemporalCompass({ onClose, onLock }) {
  const posRef = useRef({ x: 0, y: 0 });
  const heldRef = useRef({ up: false, down: false, left: false, right: false });
  const cameraRef = useRef(null);
  const playerRef = useRef(null);
  const needleRef = useRef(null);
  const targetGroupRef = useRef(null);
  const minimapPlayerRef = useRef(null);
  const lockBarRef = useRef(null);
  const lockTextRef = useRef(null);
  const ringsRef = useRef([]);
  const [done, setDone] = useState(false);

  const { target, whirls } = useMemo(() => {
    const angle = Math.random() * Math.PI * 2;
    const dist = rand(1400, 2100);
    return {
      target: { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist },
      whirls: Array.from({ length: NUM_WHIRLS }, () => ({
        x: rand(-WORLD + 300, WORLD - 300),
        y: rand(-WORLD + 300, WORLD - 300),
        r: rand(90, 160),
        dir: Math.random() < 0.5 ? 1 : -1,
      })),
    };
  }, []);

  /* clavier */
  useEffect(() => {
    const map = (k) => {
      if (["ArrowUp", "z", "w"].includes(k)) return "up";
      if (["ArrowDown", "s"].includes(k)) return "down";
      if (["ArrowLeft", "q", "a"].includes(k)) return "left";
      if (["ArrowRight", "d"].includes(k)) return "right";
      return null;
    };
    const down = (e) => {
      if (e.key === "Escape") { onClose?.(); return; }
      const k = map(e.key); if (k) heldRef.current[k] = true;
    };
    const up = (e) => { const k = map(e.key); if (k) heldRef.current[k] = false; };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, [onClose]);

  /* boucle */
  useEffect(() => {
    let raf, last = performance.now();
    let lock = 0, isDone = false;
    const step = (t) => {
      const dt = Math.min(50, t - last); last = t;
      const p = posRef.current, held = heldRef.current;
      const speed = 0.9;
      if (held.up)    p.y -= speed * dt;
      if (held.down)  p.y += speed * dt;
      if (held.left)  p.x -= speed * dt;
      if (held.right) p.x += speed * dt;
      for (const w of whirls) {
        const dx = p.x - w.x, dy = p.y - w.y;
        const d = Math.hypot(dx, dy);
        if (d < w.r) {
          const force = (1 - d / w.r) * 0.4 * dt;
          const invD = 1 / (d || 1);
          p.x += (-dy * invD) * force * w.dir + (-dx * invD) * force * 0.3;
          p.y += ( dx * invD) * force * w.dir + (-dy * invD) * force * 0.3;
        }
      }
      p.x = Math.max(-WORLD + 20, Math.min(WORLD - 20, p.x));
      p.y = Math.max(-WORLD + 20, Math.min(WORLD - 20, p.y));

      /* camera & player DOM update */
      if (cameraRef.current) cameraRef.current.setAttribute("transform", `translate(${VW / 2 - p.x} ${VH / 2 - p.y})`);
      if (playerRef.current) playerRef.current.setAttribute("transform", `translate(${p.x} ${p.y})`);
      if (minimapPlayerRef.current) {
        minimapPlayerRef.current.setAttribute("cx", (p.x / WORLD) * 60);
        minimapPlayerRef.current.setAttribute("cy", (p.y / WORLD) * 60);
      }

      /* boussole */
      const dxT = target.x - p.x, dyT = target.y - p.y;
      const distT = Math.hypot(dxT, dyT);
      const angT = Math.atan2(dyT, dxT);
      if (needleRef.current) needleRef.current.setAttribute("transform", `rotate(${(angT * 180) / Math.PI})`);
      const prox = Math.max(0, Math.min(1, 1 - distT / (WORLD * 1.05)));
      const lit = Math.round(prox * 5);
      const col = lit >= 4 ? "#ff4a3a" : lit >= 3 ? "#ffa050" : lit >= 2 ? "#ffd166" : "#a8c8ff";
      ringsRef.current.forEach((r, i) => {
        if (!r) return;
        const active = i < lit;
        r.setAttribute("stroke", active ? col : "#233855");
        r.setAttribute("stroke-width", active ? 3 : 1.2);
        r.setAttribute("opacity", active ? 0.95 : 0.45);
      });
      if (targetGroupRef.current) targetGroupRef.current.setAttribute("opacity", Math.max(0, 1 - distT / 900));

      /* verrouillage */
      if (distT < LOCK_RADIUS) {
        lock = Math.min(1, lock + dt / LOCK_MS);
        if (lockBarRef.current) {
          lockBarRef.current.setAttribute("width", 312 * lock);
          lockBarRef.current.parentNode.setAttribute("visibility", "visible");
        }
        if (lock >= 1 && !isDone) {
          isDone = true;
          setDone(true);
          setTimeout(() => { onLock?.(); onClose?.(); }, 600);
        }
      } else {
        lock = 0;
        if (lockBarRef.current) {
          lockBarRef.current.setAttribute("width", 0);
          lockBarRef.current.parentNode.setAttribute("visibility", "hidden");
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [whirls, target, onClose, onLock]);

  /* Monde statique memoise : grille + tourbillons + noeud */
  const worldStatic = useMemo(() => {
    const step = WORLD * 2 / 20;
    const lines = [];
    for (let i = 0; i <= 20; i++) {
      const t = -WORLD + i * step;
      lines.push(<line key={`v${i}`} x1={t} y1={-WORLD} x2={t} y2={WORLD} />);
      lines.push(<line key={`h${i}`} x1={-WORLD} y1={t} x2={WORLD} y2={t} />);
    }
    return (
      <>
        <rect x={-WORLD} y={-WORLD} width={WORLD * 2} height={WORLD * 2} fill="#1a2a48" opacity="0.55" />
        <g stroke="#3f5f88" strokeWidth="1" fill="none" opacity="0.55">{lines}</g>
        <line x1={-WORLD} y1="0" x2={WORLD} y2="0" stroke="#7fd8ff" strokeWidth="1.4" opacity="0.4" />
        <line x1="0" y1={-WORLD} x2="0" y2={WORLD} stroke="#7fd8ff" strokeWidth="1.4" opacity="0.4" />
        <rect x={-WORLD} y={-WORLD} width={WORLD * 2} height={WORLD * 2} fill="none" stroke="#7fb0e0" strokeWidth="3" strokeDasharray="12 8" opacity="0.9" />

        {whirls.map((w, i) => (
          <g key={i} transform={`translate(${w.x} ${w.y})`}>
            <g>
              <animateTransform attributeName="transform" type="rotate" values={`0; ${360 * w.dir}`} dur={`${5 + (i % 4)}s`} repeatCount="indefinite" />
              {[0.35, 0.6, 0.85, 1].map((k, j) => (
                <circle key={j} r={w.r * k} fill="none" stroke="#c8a8f0" strokeWidth="2" opacity={0.7 - j * 0.13} />
              ))}
            </g>
            <circle r="5" fill="#e8d8ff" />
          </g>
        ))}

        <g ref={targetGroupRef} transform={`translate(${target.x} ${target.y})`}>
          {[60, 42, 26].map((r, i) => (
            <circle key={i} r={r} fill="none" stroke="#ffe08a" strokeWidth="2.4">
              <animate attributeName="opacity" values="0.2;0.95;0.2" dur={`${1.6 + i * 0.4}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <circle r="10" fill="#fff2b8" />
        </g>
      </>
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whirls, target]);

  return (
    <div onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "linear-gradient(180deg,#2a3a58 0%,#14203a 65%,#0a1224 100%)", overflow: "hidden" }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ position: "absolute", inset: 0, color: "#e8eef5", fontFamily: "ui-monospace,monospace" }}>
        <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
          <g ref={cameraRef} transform={`translate(${VW / 2} ${VH / 2})`}>
            {worldStatic}
            <g ref={playerRef}>
              <ellipse cy="6" rx="14" ry="5" fill="#000" opacity="0.5" />
              <circle r="11" fill="#7fffb0" stroke="#0e2a1a" strokeWidth="2" />
              <circle r="18" fill="none" stroke="#7fffb0" strokeWidth="1.6" opacity="0.6">
                <animate attributeName="r" values="12;24;12" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0;0.6" dur="1.8s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>

          {/* HUD boussole */}
          <g transform={`translate(${VW - 140} 140)`}>
            <circle r="96" fill="#0e1a30" stroke="#7fb0e0" strokeWidth="1.6" opacity="0.9" />
            {[0, 1, 2, 3, 4].map((k) => (
              <circle key={k} ref={(el) => (ringsRef.current[k] = el)} r={16 + (k + 1) * 12} fill="none" stroke="#233855" strokeWidth="1.2" opacity="0.45" />
            ))}
            <g ref={needleRef}>
              <path d="M0 0 L76 0 L68 -5 M76 0 L68 5" stroke="#ffe08a" strokeWidth="3" fill="none" strokeLinecap="round" />
              <circle r="5" fill="#ffe08a" />
            </g>
            <text y="122" textAnchor="middle" fontSize="12" letterSpacing="2" fill="#a8c8ff">PROXIMITE</text>
            <text y="-114" textAnchor="middle" fontSize="11" letterSpacing="2" fill="#a8c8ff">BOUSSOLE TEMPORELLE</text>
          </g>

          {/* barre de verrouillage */}
          <g transform={`translate(${VW / 2} 50)`} visibility="hidden">
            <rect x="-160" y="-12" width="320" height="24" rx="4" fill="#0e1a30" stroke="#7fffb0" strokeWidth="1.4" />
            <rect ref={lockBarRef} x="-156" y="-9" width="0" height="18" rx="3" fill="#7fffb0" />
            <text ref={lockTextRef} y="-20" textAnchor="middle" fontSize="12" fill="#7fffb0" letterSpacing="3">VERROUILLAGE…</text>
          </g>
          {done && (
            <g transform={`translate(${VW / 2} 80)`}>
              <text textAnchor="middle" fontSize="34" fontWeight="800" fill="#7fffb0" letterSpacing="6">✓ NŒUD VERROUILLÉ</text>
            </g>
          )}

          <text x="24" y={VH - 24} fontSize="12" fill="#a8c8ff" letterSpacing="2">
            ↑ ↓ ← →  ou  W A S D   ·   trouve le nœud, evite les tourbillons   ·   ESC pour quitter
          </text>

          {/* mini-map */}
          <g transform={`translate(${VW - 170} ${VH - 170})`}>
            <rect x="0" y="0" width="150" height="150" fill="#0e1a30" stroke="#7fb0e0" strokeWidth="1.4" opacity="0.9" />
            <text x="75" y="14" textAnchor="middle" fontSize="9" fill="#a8c8ff" letterSpacing="2">CARTE</text>
            <g transform="translate(75 80)">
              {whirls.map((w, i) => (
                <circle key={i} cx={(w.x / WORLD) * 60} cy={(w.y / WORLD) * 60} r={(w.r / WORLD) * 60 + 1} fill="none" stroke="#c8a8f0" strokeWidth="0.6" opacity="0.6" />
              ))}
              <circle cx={(target.x / WORLD) * 60} cy={(target.y / WORLD) * 60} r="3" fill="#ffe08a" />
              <circle ref={minimapPlayerRef} cx="0" cy="0" r="2.4" fill="#7fffb0" />
              <rect x="-62" y="-62" width="124" height="124" fill="none" stroke="#7fb0e0" strokeWidth="0.6" strokeDasharray="3 3" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
