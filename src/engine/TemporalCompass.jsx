import { useEffect, useMemo, useRef, useState } from "react";

/* ============================================================
   PROTOTYPE : Boussole temporelle
   ------------------------------------------------------------
   Un ecran plein cadre entre deux tableaux : le joueur se
   deplace sur une carte isometrique schematique de l'espace-
   temps pour trouver le prochain « noeud temporel ». Une
   boussole en haut a droite montre la direction (aiguille qui
   tourne) et l'intensite de la distance (5 anneaux concentriques :
   5 rouges = tres proche, 1 seul bleu = tres loin).
   Des tourbillons temporels donnent des coups de courant qui
   deportent le curseur si on les traverse.
   Verrouillage : reste 1 seconde a moins de 40 unites du noeud.
   ============================================================ */

const W = 1000;
const H = 560;
const LOCK_RADIUS = 40;
const LOCK_MS = 900;

const rand = (min, max) => min + Math.random() * (max - min);

/* Coord isometrique -> ecran, centre en (W/2, H/2). */
function iso(x, y) {
  return { sx: W / 2 + (x - y) * 0.9, sy: H / 2 + (x + y) * 0.45 };
}

export function TemporalCompass({ onClose, onLock }) {
  /* espace = grille -400..400 sur x et y (coord monde) */
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [held, setHeld] = useState({ up: false, down: false, left: false, right: false });
  const [locking, setLocking] = useState(0); // 0..1
  const [done, setDone] = useState(false);
  const posRef = useRef(pos);
  posRef.current = pos;

  /* le noeud temporel à trouver + quelques tourbillons */
  const { target, whirls } = useMemo(() => {
    const angle = Math.random() * Math.PI * 2;
    const dist = rand(220, 340);
    return {
      target: { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist },
      whirls: Array.from({ length: 4 }, () => ({
        x: rand(-260, 260),
        y: rand(-260, 260),
        r: rand(38, 60),
        dir: Math.random() < 0.5 ? 1 : -1,
      })),
    };
  }, []);

  /* clavier */
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

  /* boucle : déplacement + tourbillons + verrouillage */
  useEffect(() => {
    if (done) return;
    let raf, last = performance.now();
    const step = (t) => {
      const dt = Math.min(50, t - last); last = t;
      setPos((p) => {
        let nx = p.x, ny = p.y;
        const speed = 0.28; // px par ms
        if (held.up)    ny -= speed * dt;
        if (held.down)  ny += speed * dt;
        if (held.left)  nx -= speed * dt;
        if (held.right) nx += speed * dt;
        /* effet des tourbillons */
        for (const w of whirls) {
          const dx = nx - w.x, dy = ny - w.y;
          const d = Math.hypot(dx, dy);
          if (d < w.r) {
            const force = (1 - d / w.r) * 0.14 * dt;
            const perp = { x: -dy / (d || 1), y: dx / (d || 1) };
            nx += perp.x * force * w.dir;
            ny += perp.y * force * w.dir;
            nx += (-dx / (d || 1)) * force * 0.3;
            ny += (-dy / (d || 1)) * force * 0.3;
          }
        }
        nx = Math.max(-380, Math.min(380, nx));
        ny = Math.max(-380, Math.min(380, ny));
        return { x: nx, y: ny };
      });
      /* verrouillage */
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

  /* rendu */
  const player = iso(pos.x, pos.y);
  const distToTarget = Math.hypot(pos.x - target.x, pos.y - target.y);
  const angleToTarget = Math.atan2(target.y - pos.y, target.x - pos.x);
  const proximity = Math.max(0, Math.min(1, 1 - distToTarget / 500)); // 0 loin -> 1 proche
  const ringsLit = Math.round(proximity * 5);

  return (
    <div onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(2,4,10,0.94)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 90, padding: 20, backdropFilter: "blur(2px)" }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ position: "relative", width: "100%", maxWidth: 1100, aspectRatio: `${W} / ${H}`, background: "radial-gradient(ellipse at center, #0a1428 0%, #05060e 70%, #010204 100%)", border: "2px solid #7fd8ff44", borderRadius: 12, overflow: "hidden", color: "#e8eef5", fontFamily: "ui-monospace,monospace" }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
          {/* grille iso schematique */}
          <g stroke="#1e2e48" strokeWidth="0.6" fill="none">
            {Array.from({ length: 41 }, (_, i) => {
              const t = -400 + i * 20;
              const a = iso(t, -400), b = iso(t, 400);
              return <line key={`x${i}`} x1={a.sx} y1={a.sy} x2={b.sx} y2={b.sy} />;
            })}
            {Array.from({ length: 41 }, (_, i) => {
              const t = -400 + i * 20;
              const a = iso(-400, t), b = iso(400, t);
              return <line key={`y${i}`} x1={a.sx} y1={a.sy} x2={b.sx} y2={b.sy} />;
            })}
          </g>
          {/* horizon lointain / cadre du losange */}
          <path d={`M${iso(-400,-400).sx} ${iso(-400,-400).sy} L${iso(400,-400).sx} ${iso(400,-400).sy} L${iso(400,400).sx} ${iso(400,400).sy} L${iso(-400,400).sx} ${iso(-400,400).sy} Z`}
            fill="none" stroke="#3a80c8" strokeWidth="1.2" opacity="0.6" strokeDasharray="4 4" />

          {/* tourbillons */}
          {whirls.map((w, i) => {
            const c = iso(w.x, w.y);
            return (
              <g key={i} transform={`translate(${c.sx} ${c.sy})`}>
                <g>
                  <animateTransform attributeName="transform" type="rotate"
                    values={`0; ${360 * w.dir}`} dur={`${4 + i}s`} repeatCount="indefinite" />
                  {[0.3, 0.55, 0.8, 1].map((k, j) => (
                    <ellipse key={j} rx={w.r * k * 0.9} ry={w.r * k * 0.45} fill="none" stroke="#a840f0" strokeWidth="1.2" opacity={0.65 - j * 0.12} />
                  ))}
                </g>
                <circle r="2.4" fill="#c8a8e0" />
              </g>
            );
          })}

          {/* le noeud temporel — visible seulement si on est déjà proche (visibilité progressive) */}
          {(() => {
            const t = iso(target.x, target.y);
            const reveal = Math.max(0, 1 - distToTarget / 220);
            return (
              <g transform={`translate(${t.sx} ${t.sy})`} opacity={reveal}>
                {[26, 20, 14].map((r, i) => (
                  <circle key={i} r={r} fill="none" stroke="#ffd166" strokeWidth="1.4">
                    <animate attributeName="opacity" values="0.2;0.9;0.2" dur={`${1.6 + i * 0.4}s`} repeatCount="indefinite" />
                  </circle>
                ))}
                <circle r="4" fill="#ffe08a" />
              </g>
            );
          })()}

          {/* le joueur */}
          <g transform={`translate(${player.sx} ${player.sy})`}>
            {/* ombre */}
            <ellipse cy="4" rx="8" ry="3" fill="#000" opacity="0.5" />
            <circle r="6" fill="#5eff9e" stroke="#0e2a1a" strokeWidth="1.4" />
            <circle r="10" fill="none" stroke="#5eff9e" strokeWidth="1" opacity="0.6">
              <animate attributeName="r" values="8;14;8" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0;0.6" dur="1.8s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* trace de deplacement — petit disque qui pulse au sol du joueur */}
          <circle cx={player.sx} cy={player.sy + 6} r="2" fill="#5eff9e" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.15;0.6" dur="1.4s" repeatCount="indefinite" />
          </circle>

          {/* HUD : BOUSSOLE en haut a droite */}
          <g transform={`translate(${W - 110} 110)`}>
            <circle r="72" fill="#0a141c" stroke="#3a4a68" strokeWidth="1.4" />
            {/* 5 anneaux : rouges pres, bleus loin */}
            {[1, 2, 3, 4, 5].map((k) => {
              const active = k <= ringsLit;
              const color = active
                ? (ringsLit >= 4 ? "#ff4a3a" : ringsLit >= 3 ? "#ffa050" : ringsLit >= 2 ? "#ffd166" : "#a8c8ff")
                : "#1a2a3e";
              return (
                <circle key={k} r={12 + k * 10} fill="none" stroke={color} strokeWidth={active ? 2.2 : 1} opacity={active ? 0.9 : 0.4} />
              );
            })}
            {/* aiguille de la boussole vers la cible */}
            <g transform={`rotate(${(angleToTarget * 180) / Math.PI})`}>
              <path d="M0 0 L58 0 L52 -4 M58 0 L52 4" stroke="#ffe08a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              <circle r="4" fill="#ffe08a" />
            </g>
            {/* etiquette proximite */}
            <text y="94" textAnchor="middle" fontSize="10" letterSpacing="2" fill="#7fd8ff">PROXIMITE {ringsLit}/5</text>
            <text y="-88" textAnchor="middle" fontSize="9" letterSpacing="2" fill="#7fd8ff">BOUSSOLE TEMPORELLE</text>
          </g>

          {/* HUD : jauge de verrouillage */}
          {locking > 0 && !done && (
            <g transform={`translate(${W / 2} 40)`}>
              <rect x="-100" y="-10" width="200" height="20" rx="4" fill="#0a141c" stroke="#5eff9e" strokeWidth="1" />
              <rect x="-98" y="-8" width={196 * locking} height="16" rx="3" fill="#5eff9e" />
              <text y="-16" textAnchor="middle" fontSize="10" fill="#5eff9e" letterSpacing="2">VERROUILLAGE…</text>
            </g>
          )}
          {done && (
            <g transform={`translate(${W / 2} 60)`}>
              <text textAnchor="middle" fontSize="24" fontWeight="800" fill="#5eff9e" letterSpacing="4" style={{ animation: "pulse 0.7s infinite" }}>✓ NŒUD TEMPOREL VERROUILLÉ</text>
            </g>
          )}

          {/* instructions bas d'ecran */}
          <text x="20" y={H - 20} fontSize="10" fill="#7fd8ff" letterSpacing="2">
            ↑ ↓ ← →  ou  W A S D   ·   trouve le noeud, evite les tourbillons   ·   ESC pour quitter
          </text>
        </svg>
      </div>
    </div>
  );
}
