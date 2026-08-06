import { useState, useEffect, useRef } from "react";

/* ============================================================
   MINI-JEU : « La projection du Nickelodeon » (NY, mai 1912)
   ------------------------------------------------------------
   Sean, 15 ans, entre dans un cinéma populaire pour voir
   « Saved from the Titanic ». Il faut charger la bobine, puis
   tourner la manivelle du projecteur à ~16 images/seconde
   (2 rotations/s : soit une pression toutes les ~500 ms).
   La fenêtre de projection montre le film qui « prend vie »
   quand la vitesse est juste. Trop lent : ça saute. Trop vite :
   ça défile en accéléré.
   ============================================================ */

const TARGET_MS = 500;
const TOL_MS = 140;
const HOLD_MS = 8000;

export function CineGame({ onClose, onWin }) {
  const [phase, setPhase] = useState("load"); // load → project → done
  const [interval_, setInterval_] = useState(TARGET_MS);
  const [inZone, setInZone] = useState(0);
  const [frame, setFrame] = useState(0);
  const lastClick = useRef(null);
  const raf = useRef(null);
  const lastT = useRef(null);

  useEffect(() => {
    if (phase !== "project") return;
    lastT.current = performance.now();
    const tick = (t) => {
      const dt = t - (lastT.current || t);
      lastT.current = t;
      // le film n'avance QUE si on tourne : vitesse basée sur l'intervalle
      const speed = Math.min(3, 500 / Math.max(80, interval_));
      setFrame((f) => (f + dt * 0.008 * speed) % 4);
      const ok = Math.abs(interval_ - TARGET_MS) <= TOL_MS;
      setInZone((z) => {
        const nz = ok ? Math.min(HOLD_MS, z + dt) : Math.max(0, z - dt * 0.6);
        if (nz >= HOLD_MS) setPhase("done");
        return nz;
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [phase, interval_]);

  useEffect(() => { if (phase === "done") onWin?.(); }, [phase]); // eslint-disable-line

  const clickCrank = () => {
    if (phase !== "project") return;
    const now = performance.now();
    if (lastClick.current) {
      const dt = now - lastClick.current;
      setInterval_((prev) => Math.round(prev * 0.4 + dt * 0.6));
    }
    lastClick.current = now;
  };

  const diagnosis = phase === "done" ? "" :
    interval_ < TARGET_MS - TOL_MS ? "Trop vite ! Les acteurs courent comme des lapins." :
    interval_ > TARGET_MS + TOL_MS ? "Trop lent — l'image saccade et devient noire entre chaque photo." :
    "Vitesse juste : le mouvement devient fluide !";

  return (
    <div onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(4,8,14,0.82)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 70, backdropFilter: "blur(3px)" }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ background: "#17110a", border: "2px solid #c8963e66", borderRadius: 18, padding: 20, maxWidth: 580, width: "100%", maxHeight: "92vh", overflowY: "auto", boxShadow: "0 12px 48px rgba(0,0,0,0.6)", color: "#efe6d2", fontFamily: "Palatino, Georgia, serif" }}>
        <div style={{ textAlign: "center", fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#e0a848" }}>🎞️ NICKELODEON · 14ᵉ RUE, NY, MAI 1912</div>
        <h2 style={{ textAlign: "center", margin: "6px 0 4px", color: "#ffd166", fontSize: 21 }}>« Saved from the Titanic »</h2>

        {phase === "load" && (
          <>
            <p style={{ textAlign: "center", fontSize: 13, color: "#d8c9a8", margin: "0 0 12px" }}>
              Charge la bobine sur l'axe supérieur du projecteur : clique la BOBINE.
            </p>
            <svg viewBox="0 0 400 300" style={{ width: "100%", height: "auto", background: "#1a1006", borderRadius: 8, border: "1px solid #5a4028" }}>
              {/* projecteur */}
              <rect x="140" y="120" width="180" height="120" fill="#2a1608" stroke="#5a4028" strokeWidth="3" />
              <rect x="220" y="140" width="80" height="40" fill="#0a0604" />
              {/* axe supérieur (cible) */}
              <circle cx="200" cy="140" r="24" fill="none" stroke="#c8963e" strokeWidth="3" strokeDasharray="4 4" style={{ animation: "pulse 1.6s ease-in-out infinite" }} />
              <circle cx="200" cy="140" r="6" fill="#5a4028" />
              <text x="200" y="180" fontFamily="ui-monospace,monospace" fontSize="10" fill="#c8963e" textAnchor="middle">axe de la bobine</text>
              {/* la BOBINE, cliquable (grosse cible tactile) */}
              <g transform="translate(80,240)" style={{ cursor: "pointer", userSelect: "none" }}
                onClick={() => setPhase("project")}>
                <circle cx="0" cy="0" r="44" fill="none" stroke="#7fe0a8" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" style={{ animation: "pulse 2s ease-in-out infinite" }} />
                <circle cx="0" cy="0" r="30" fill="#5a4028" />
                <circle cx="0" cy="0" r="26" fill="#0a0604" />
                <circle cx="0" cy="0" r="20" fill="#5a4028" />
                {[0, 60, 120, 180, 240, 300].map((a, i) => {
                  const rad = (a * Math.PI) / 180;
                  return <path key={i} d={`M0 0 L${Math.cos(rad) * 24} ${Math.sin(rad) * 24}`} stroke="#0a0604" strokeWidth="2" />;
                })}
                <circle cx="0" cy="0" r="5" fill="#c8963e" />
                <text y="56" fontFamily="ui-monospace,monospace" fontSize="10" fill="#7fe0a8" textAnchor="middle">clique-moi !</text>
              </g>
            </svg>
          </>
        )}

        {phase === "project" && (
          <>
            <p style={{ textAlign: "center", fontSize: 13, color: "#d8c9a8", margin: "0 0 10px" }}>
              Tourne la manivelle à ~2 tours/seconde (le CINÉMA se dit « 16 images/seconde »).
            </p>

            {/* l'écran + le film qui prend vie */}
            <svg viewBox="0 0 400 220" style={{ width: "100%", height: "auto", background: "#0a0604", borderRadius: 8, border: "2px solid #a8801f" }}>
              <rect width="400" height="220" fill="#3a2418" opacity="0.4" />
              {/* horizon marin */}
              <path d="M0 130 h400" stroke="#7a5030" strokeWidth="1" opacity="0.5" />
              {/* le paquebot qui coule — position selon frame */}
              <g transform={`translate(${140 + Math.floor(frame) * 8}, ${140 + Math.floor(frame) * 3}) rotate(${-8 - Math.floor(frame) * 3})`}>
                <path d="M-60 0 Q0 10 60 0 L52 12 Q0 18 -52 12 Z" fill="#1a0e04" />
                <rect x="-44" y="-12" width="88" height="16" fill="#2a1608" />
                {[-28, -8, 12, 30].map((x, i) => <rect key={i} x={x} y="-24" width="8" height="14" rx="2" fill="#3a1c0a" />)}
              </g>
              {/* intertitre */}
              <rect x="60" y="180" width="280" height="30" fill="#0a0806" />
              <text x="200" y="200" textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic" fontSize="13" fill="#e8d8b0">
                {Math.floor(frame) === 0 ? "The great ship strikes the iceberg…" :
                 Math.floor(frame) === 1 ? "…she begins to list…" :
                 Math.floor(frame) === 2 ? "Boats away!" : "Miss Gibson, saved."}
              </text>
              {/* papillotement */}
              <rect width="400" height="220" fill="#000" opacity={interval_ > TARGET_MS + TOL_MS ? 0.4 : 0.06} style={{ animation: "flicker 0.12s steps(2) infinite" }} />
            </svg>

            <p style={{ textAlign: "center", fontSize: 12.5, color: "#e0a848", fontStyle: "italic", minHeight: 20, margin: "8px 0" }}>{diagnosis}</p>

            {/* barre de vitesse */}
            <div style={{ position: "relative", height: 20, background: "#1a140a", border: "1px solid #5a4028", borderRadius: 6, overflow: "hidden", marginBottom: 6 }}>
              <div style={{ position: "absolute", left: `${((TARGET_MS - TOL_MS) / (TARGET_MS * 2)) * 100}%`, width: `${(TOL_MS * 2 / (TARGET_MS * 2)) * 100}%`, top: 0, bottom: 0, background: "#7fe0a8", opacity: 0.35 }} />
              <div style={{ position: "absolute", left: `${Math.max(0, Math.min(100, (interval_ / (TARGET_MS * 2)) * 100))}%`, top: 0, bottom: 0, width: 3, background: "#ffd166", transform: "translateX(-1px)" }} />
            </div>

            {/* barre de maintien */}
            <div style={{ margin: "10px 0 4px", background: "#1a140a", border: "1px solid #5a4028", borderRadius: 6, height: 12, overflow: "hidden" }}>
              <div style={{ width: `${(inZone / HOLD_MS) * 100}%`, height: "100%", background: "#7fe0a8", transition: "width 0.1s" }} />
            </div>
            <div style={{ fontSize: 11, textAlign: "center", color: "#a89878", margin: "0 0 10px" }}>projection : {Math.max(0, Math.ceil((HOLD_MS - inZone) / 1000))} s</div>

            <button onPointerDown={clickCrank}
              style={{ width: "100%", background: "#e0a848", color: "#1a1206", border: "none", borderRadius: 10, padding: "16px", fontWeight: 800, cursor: "pointer", fontSize: 17, fontFamily: "ui-monospace,monospace", letterSpacing: 2 }}>
              TOURNER LA MANIVELLE
            </button>
          </>
        )}

        {phase === "done" && (
          <div style={{ marginTop: 4 }}>
            <div style={{ background: "#0e1420", border: "1px solid #2a3648", borderRadius: 12, padding: "14px 16px" }}>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: "#e8eef5", margin: 0 }}>
                « Le 28 décembre 1895, les frères Lumière projettent 10 courts films au Salon Indien du Grand Café, à Paris — 33 spectateurs, 1 franc la place. Le CINÉMA vient de naître : une SUITE de photos à 16 images/seconde, notre œil ne voit pas les coupures. En 1912, quelques semaines après le naufrage du Titanic, le film « Saved from the Titanic » sort avec Dorothy Gibson, VRAIE rescapée — Sean pleure : le cinéma peut donc RECONSTITUER un événement, servir de mémoire, mais aussi de fiction émouvante. La même catastrophe est passée par la TSF (bips), la presse (mots), et maintenant les images animées. Chaque média la raconte à sa manière — un même événement, plusieurs récits. » — MARTINE
              </p>
            </div>
            <p style={{ textAlign: "center", margin: "12px 0 0", color: "#7fe0a8", fontSize: 13, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              ✓ Sean a vu le film — direction New York, il faut appeler la famille…
            </p>
            <button onClick={onClose}
              style={{ marginTop: 10, width: "100%", background: "#e0a848", color: "#1a1206", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: "pointer", fontSize: 15, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              Continuer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
