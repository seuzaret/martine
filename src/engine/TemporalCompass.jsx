import { useEffect, useMemo, useRef, useState } from "react";

/* ============================================================
   PROTOTYPE v2 : Boussole temporelle
   ------------------------------------------------------------
   - Plein ecran (le SVG occupe la fenetre entiere, pas de modale)
   - Plateau 6x plus grand : la camera suit le joueur
   - Palette clarifiee (fond bleu nuit doux, grille lisible)
   ============================================================ */

const VW = 1600;
const VH = 900;
const WORLD = 2400;      // demi-cote du plateau : de -2400 a +2400
const LOCK_RADIUS = 60;
const LOCK_MS = 900;
const NUM_WHIRLS = 12;

const rand = (min, max) => min + Math.random() * (max - min);

/* Coord isometrique -> ecran, centre en (VW/2, VH/2). */
function iso(x, y) {
  return { sx: (x - y) * 0.9, sy: (x + y) * 0.45 };
}

export function TemporalCompass({ onClose, onLock }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [held, setHeld] = useState({ up: false, down: false, left: false, right: false });
  const [locking, setLocking] = useState(0);
  const [done, setDone] = useState(false);
  const posRef = useRef(pos);
  posRef.current = pos;

  const { target, whirls } = useMemo(() => {
    const angle = Math.random() * Math.PI * 2;
    const dist = rand(1200, 2000);
    return {
      target: { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist },
      whirls: Array.from({ length: NUM_WHIRLS }, () => ({
        x: rand(-WORLD + 200, WORLD - 200),
        y: rand(-WORLD + 200, WORLD - 200),
        r: rand(70, 140),
        dir: Math.random() < 0.5 ? 1 : -1,
      })),
    };
  }, []);

  useEffect(() => {
    const down = (e) => {
      const k = e.key;
      if (["ArrowUp", "z", "w"].includes(k)) setHeld((h) => ({ ...h, up: true }));
      else if (["ArrowDown", "s"].includes(k)) setHeld((h) => ({ ...h, down: true }));
      else if (["ArrowLeft", "q", "a"].includes(k)) setHeld((h) => ({ ...h, left: true }));
      else if (["ArrowRight", "d"].includes(k)) setHeld((h) => ({ ...h, right: true }));
      else if (k === "Escape") onClose?.();
    };
    const up = (e) => {
      const k = e.key;
      if (["ArrowUp", "z", "w"].includes(k)) setHeld((h) => ({ ...h, up: false }));
      else if (["ArrowDown", "s"].includes(k)) setHeld((h) => ({ ...h, down: false }));
      else if (["ArrowLeft", "q", "a"].includes(k)) setHeld((h) => ({ ...h, left: false }));
      else if (["ArrowRight", "d"].includes(k)) setHeld((h) => ({ ...h, right: false }));
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, [onClose]);

  useEffect(() => {
    if (done) return;
    let raf, last = performance.now();
    const step = (t) => {
      const dt = Math.min(50, t - last); last = t;
      setPos((p) => {
        let nx = p.x, ny = p.y;
        const speed = 0.85; // px monde par ms — plateau 6x plus grand donc plus rapide
        if (held.up)    ny -= speed * dt;
        if (held.down)  ny += speed * dt;
        if (held.left)  nx -= speed * dt;
        if (held.right) nx += speed * dt;
        for (const w of whirls) {
          const dx = nx - w.x, dy = ny - w.y;
          const d = Math.hypot(dx, dy);
          if (d < w.r) {
            const force = (1 - d / w.r) * 0.4 * dt;
            const perp = { x: -dy / (d || 1), y: dx / (d || 1) };
            nx += perp.x * force * w.dir;
            ny += perp.y * force * w.dir;
            nx += (-dx / (d || 1)) * force * 0.3;
            ny += (-dy / (d || 1)) * force * 0.3;
          }
        }
        nx = Math.max(-WORLD + 20, Math.min(WORLD - 20, nx));
        ny = Math.max(-WORLD + 20, Math.min(WORLD - 20, ny));
        return { x: nx, y: ny };
      });
      const p = posRef.current;
      const dist = Math.hypot(p.x - target.x, p.y - target.y);
      if (dist < LOCK_RADIUS) {
        setLocking((l) => {
          const nl = Math.min(1, l + dt / LOCK_MS);
          if (nl >= 1) { setDone(true); setTimeout(() => { onLock?.(); onClose?.(); }, 600); }
          return nl;
        });
      } else {
        setLocking(0);
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [held, whirls, target, done, onClose, onLock]);

  const player = iso(pos.x, pos.y);
  const distToTarget = Math.hypot(pos.x - target.x, pos.y - target.y);
  const angleToTarget = Math.atan2(target.y - pos.y, target.x - pos.x);
  const proximity = Math.max(0, Math.min(1, 1 - distToTarget / (WORLD * 1.05)));
  const ringsLit = Math.round(proximity * 5);

  /* Camera : centre sur le joueur */
  const camX = -player.sx;
  const camY = -player.sy;

  /* On dessine dans un g decale de (VW/2 + camX, VH/2 + camY) */
  const cx = VW / 2 + camX;
  const cy = VH / 2 + camY;

  return (
    <div onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "linear-gradient(180deg, #2a3a58 0%, #14203a 65%, #0a1224 100%)", overflow: "hidden" }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ position: "absolute", inset: 0, color: "#e8eef5", fontFamily: "ui-monospace,monospace" }}>
        <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
          {/* etoiles douces d'ambiance */}
          {Array.from({ length: 60 }).map((_, i) => {
            const sx = (i * 137) % VW;
            const sy = (i * 79) % VH;
            return <circle key={i} cx={sx} cy={sy} r={(i % 4) * 0.4 + 0.4} fill="#b8d0ea" opacity={0.35 + (i % 5) * 0.1} />;
          })}

          {/* MONDE - grand groupe decale par la camera */}
          <g transform={`translate(${cx} ${cy})`}>
            {/* fond plateau : grand losange plein, un peu plus clair */}
            {(() => {
              const c1 = iso(-WORLD, -WORLD), c2 = iso(WORLD, -WORLD), c3 = iso(WORLD, WORLD), c4 = iso(-WORLD, WORLD);
              return <path d={`M${c1.sx} ${c1.sy} L${c2.sx} ${c2.sy} L${c3.sx} ${c3.sy} L${c4.sx} ${c4.sy} Z`} fill="#1a2a48" opacity="0.55" />;
            })()}

            {/* grille iso claire, 41x41 lignes avec pas de 120 */}
            <g stroke="#4a6a94" strokeWidth="1" fill="none" opacity="0.55">
              {Array.from({ length: 41 }, (_, i) => {
                const t = -WORLD + i * (WORLD * 2 / 40);
                const a = iso(t, -WORLD), b = iso(t, WORLD);
                return <line key={`x${i}`} x1={a.sx} y1={a.sy} x2={b.sx} y2={b.sy} />;
              })}
              {Array.from({ length: 41 }, (_, i) => {
                const t = -WORLD + i * (WORLD * 2 / 40);
                const a = iso(-WORLD, t), b = iso(WORLD, t);
                return <line key={`y${i}`} x1={a.sx} y1={a.sy} x2={b.sx} y2={b.sy} />;
              })}
            </g>
            {/* axes lumineux au centre */}
            <g stroke="#7fd8ff" strokeWidth="1.4" opacity="0.5">
              {(() => { const a = iso(-WORLD, 0), b = iso(WORLD, 0); return <line x1={a.sx} y1={a.sy} x2={b.sx} y2={b.sy} />; })()}
              {(() => { const a = iso(0, -WORLD), b = iso(0, WORLD); return <line x1={a.sx} y1={a.sy} x2={b.sx} y2={b.sy} />; })()}
            </g>
            {/* cadre losange */}
            {(() => {
              const c1 = iso(-WORLD, -WORLD), c2 = iso(WORLD, -WORLD), c3 = iso(WORLD, WORLD), c4 = iso(-WORLD, WORLD);
              return <path d={`M${c1.sx} ${c1.sy} L${c2.sx} ${c2.sy} L${c3.sx} ${c3.sy} L${c4.sx} ${c4.sy} Z`} fill="none" stroke="#7fb0e0" strokeWidth="2.2" strokeDasharray="8 6" opacity="0.9" />;
            })()}

            {/* tourbillons */}
            {whirls.map((w, i) => {
              const c = iso(w.x, w.y);
              return (
                <g key={i} transform={`translate(${c.sx} ${c.sy})`}>
                  <g>
                    <animateTransform attributeName="transform" type="rotate"
                      values={`0; ${360 * w.dir}`} dur={`${4 + (i % 5)}s`} repeatCount="indefinite" />
                    {[0.3, 0.55, 0.8, 1].map((k, j) => (
                      <ellipse key={j} rx={w.r * k * 0.9} ry={w.r * k * 0.45} fill="none" stroke="#c8a8f0" strokeWidth="1.6" opacity={0.75 - j * 0.14} />
                    ))}
                  </g>
                  <circle r="4" fill="#e8d8ff" />
                </g>
              );
            })}

            {/* le noeud temporel */}
            {(() => {
              const t = iso(target.x, target.y);
              const reveal = Math.max(0, 1 - distToTarget / 900);
              return (
                <g transform={`translate(${t.sx} ${t.sy})`} opacity={reveal}>
                  {[46, 34, 22].map((r, i) => (
                    <circle key={i} r={r} fill="none" stroke="#ffe08a" strokeWidth="2">
                      <animate attributeName="opacity" values="0.2;0.9;0.2" dur={`${1.6 + i * 0.4}s`} repeatCount="indefinite" />
                    </circle>
                  ))}
                  <circle r="8" fill="#fff2b8" />
                </g>
              );
            })()}

            {/* le joueur */}
            <g transform={`translate(${player.sx} ${player.sy})`}>
              <ellipse cy="6" rx="12" ry="4" fill="#000" opacity="0.45" />
              <circle r="9" fill="#7fffb0" stroke="#0e2a1a" strokeWidth="2" />
              <circle r="14" fill="none" stroke="#7fffb0" strokeWidth="1.4" opacity="0.6">
                <animate attributeName="r" values="10;20;10" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0;0.6" dur="1.8s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>

          {/* HUD (fixe, non decale par la camera) */}
          <g transform={`translate(${VW - 140} 140)`}>
            <circle r="96" fill="#0e1a30" stroke="#7fb0e0" strokeWidth="1.6" opacity="0.9" />
            {[1, 2, 3, 4, 5].map((k) => {
              const active = k <= ringsLit;
              const color = active
                ? (ringsLit >= 4 ? "#ff4a3a" : ringsLit >= 3 ? "#ffa050" : ringsLit >= 2 ? "#ffd166" : "#a8c8ff")
                : "#233855";
              return <circle key={k} r={16 + k * 12} fill="none" stroke={color} strokeWidth={active ? 3 : 1.2} opacity={active ? 0.95 : 0.45} />;
            })}
            <g transform={`rotate(${(angleToTarget * 180) / Math.PI})`}>
              <path d="M0 0 L76 0 L68 -5 M76 0 L68 5" stroke="#ffe08a" strokeWidth="3" fill="none" strokeLinecap="round" />
              <circle r="5" fill="#ffe08a" />
            </g>
            <text y="122" textAnchor="middle" fontSize="12" letterSpacing="2" fill="#a8c8ff">PROXIMITE {ringsLit}/5</text>
            <text y="-114" textAnchor="middle" fontSize="11" letterSpacing="2" fill="#a8c8ff">BOUSSOLE TEMPORELLE</text>
          </g>

          {/* jauge de verrouillage */}
          {locking > 0 && !done && (
            <g transform={`translate(${VW / 2} 50)`}>
              <rect x="-160" y="-12" width="320" height="24" rx="4" fill="#0e1a30" stroke="#7fffb0" strokeWidth="1.4" />
              <rect x="-156" y="-9" width={312 * locking} height="18" rx="3" fill="#7fffb0" />
              <text y="-20" textAnchor="middle" fontSize="12" fill="#7fffb0" letterSpacing="3">VERROUILLAGE…</text>
            </g>
          )}
          {done && (
            <g transform={`translate(${VW / 2} 80)`}>
              <text textAnchor="middle" fontSize="34" fontWeight="800" fill="#7fffb0" letterSpacing="6" style={{ animation: "pulse 0.7s infinite" }}>✓ NŒUD VERROUILLÉ</text>
            </g>
          )}

          {/* instructions bas d'ecran */}
          <text x="24" y={VH - 24} fontSize="12" fill="#a8c8ff" letterSpacing="2">
            ↑ ↓ ← →  ou  W A S D   ·   trouve le nœud, evite les tourbillons   ·   ESC pour quitter
          </text>

          {/* mini-map en bas a droite (position dans le monde entier) */}
          <g transform={`translate(${VW - 170} ${VH - 170})`}>
            <rect x="0" y="0" width="150" height="150" fill="#0e1a30" stroke="#7fb0e0" strokeWidth="1.4" opacity="0.9" />
            <text x="75" y="14" textAnchor="middle" fontSize="9" fill="#a8c8ff" letterSpacing="2">CARTE</text>
            {/* cadre monde */}
            <g transform="translate(75 80)">
              {whirls.map((w, i) => (
                <circle key={i} cx={(w.x / WORLD) * 60} cy={(w.y / WORLD) * 60} r={(w.r / WORLD) * 60 + 1} fill="none" stroke="#c8a8f0" strokeWidth="0.6" opacity="0.6" />
              ))}
              <circle cx={(target.x / WORLD) * 60} cy={(target.y / WORLD) * 60} r="3" fill="#ffe08a" />
              <circle cx={(pos.x / WORLD) * 60} cy={(pos.y / WORLD) * 60} r="2.4" fill="#7fffb0" />
              <rect x="-62" y="-62" width="124" height="124" fill="none" stroke="#7fb0e0" strokeWidth="0.6" strokeDasharray="3 3" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
