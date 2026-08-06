import { useState, useEffect, useRef } from "react";

/* ============================================================
   MINI-JEU : « Le cylindre de James » (NY, 1878)
   ------------------------------------------------------------
   Tourner la manivelle du phonographe Edison à la BONNE VITESSE :
   trop vite, la voix devient aiguë (Mickey) ; trop lent, elle devient
   caverneuse ; à ~60 tr/min, elle sonne juste.
   Le joueur clique/tape une fois par « demi-tour » : on mesure la
   cadence. La barre reste dans la zone verte pendant 10 secondes.
   Leçon : c'est le premier support qui GRAVE et RESTITUE la voix.
   ============================================================ */

const TARGET_MS = 500;   // 1 clic toutes les 500 ms = 60 rpm (2 clics/tour)
const TOL_MS = 130;      // tolérance ±130 ms
const HOLD_MS = 10000;   // maintenir dans la zone 10 s

/* petit son "aou" filtré selon la vitesse (WebAudio) — sans échantillon */
let AC = null;
function playCue(pitchMul) {
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    if (AC.state === "suspended") AC.resume();
    const t = AC.currentTime;
    const o = AC.createOscillator(); const g = AC.createGain();
    o.type = "triangle"; o.frequency.value = 220 * pitchMul;
    o.connect(g); g.connect(AC.destination);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.08, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
    o.start(t); o.stop(t + 0.2);
  } catch { /* audio indisponible : le jeu marche quand même */ }
}

export function PhonoGame({ onClose, onWin }) {
  const [interval_, setInterval_] = useState(TARGET_MS);
  const [inZone, setInZone] = useState(0);   // ms cumulés dans la zone
  const [won, setWon] = useState(false);
  const lastClick = useRef(null);
  const raf = useRef(null);
  const lastT = useRef(null);
  const angle = useRef(0);
  const [_, force] = useState(0);

  useEffect(() => {
    lastT.current = performance.now();
    const tick = (t) => {
      const dt = t - (lastT.current || t);
      lastT.current = t;
      // rotation visuelle : plus l'intervalle est court, plus ça tourne vite
      angle.current = (angle.current + dt / (interval_ * 0.5) * 180) % 360;
      // décompte "dans la zone verte" si l'intervalle actuel est OK
      const ok = Math.abs(interval_ - TARGET_MS) <= TOL_MS;
      setInZone((z) => {
        const nz = ok ? Math.min(HOLD_MS, z + dt) : Math.max(0, z - dt * 0.6);
        if (nz >= HOLD_MS && !won) setWon(true);
        return nz;
      });
      force((x) => x + 1);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [interval_, won]);

  useEffect(() => { if (won) onWin?.(); }, [won]); // eslint-disable-line

  const clickCrank = () => {
    if (won) return;
    const now = performance.now();
    if (lastClick.current) {
      const dt = now - lastClick.current;
      // lissage : moyenne pondérée
      setInterval_((prev) => Math.round(prev * 0.4 + dt * 0.6));
      // hauteur du son inversement proportionnelle à l'intervalle
      playCue(TARGET_MS / Math.max(80, dt));
    }
    lastClick.current = now;
  };

  const diagnosis = won ? "" :
    interval_ < TARGET_MS - TOL_MS ? "Trop vite ! La voix monte dans les aigus…" :
    interval_ > TARGET_MS + TOL_MS ? "Trop lent — la voix devient caverneuse." :
    "Parfait ! Reste dans la zone verte.";

  return (
    <div onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(4,8,14,0.82)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 70, backdropFilter: "blur(3px)" }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ background: "#17110a", border: "2px solid #c8963e66", borderRadius: 18, padding: 20, maxWidth: 560, width: "100%", maxHeight: "92vh", overflowY: "auto", boxShadow: "0 12px 48px rgba(0,0,0,0.6)", color: "#efe6d2", fontFamily: "Palatino, Georgia, serif" }}>
        <div style={{ textAlign: "center", fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#e0a848" }}>🎙️ PHONOGRAPHE EDISON · NY 1878</div>
        <h2 style={{ textAlign: "center", margin: "6px 0 4px", color: "#ffd166", fontSize: 21 }}>La voix de James, sur cire</h2>

        {!won ? (
          <>
            <p style={{ textAlign: "center", fontSize: 13, color: "#d8c9a8", margin: "0 0 12px" }}>
              James parle dans le pavillon. Tourne la manivelle à la BONNE VITESSE en cliquant
              régulièrement (environ 2 clics par seconde). Trop vite ou trop lent : la voix se
              déforme.
            </p>

            {/* La manivelle (rotation visuelle basée sur l'intervalle) */}
            <div style={{ display: "flex", justifyContent: "center", margin: "6px 0 10px" }}>
              <svg viewBox="0 0 200 200"
                onPointerDown={clickCrank} style={{ width: 200, height: 200, cursor: "pointer", userSelect: "none" }}>
                <circle cx="100" cy="100" r="86" fill="#3a2410" stroke="#5a4028" strokeWidth="4" />
                <circle cx="100" cy="100" r="70" fill="#e0d0a0" />
                {[4, 8, 12, 16, 20, 24].map((r, i) => (
                  <circle key={i} cx="100" cy="100" r={r * 3} fill="none" stroke="#a89878" strokeWidth="1" />
                ))}
                {/* manivelle qui tourne */}
                <g style={{ transformOrigin: "100px 100px", transform: `rotate(${angle.current}deg)` }}>
                  <rect x="100" y="96" width="80" height="8" rx="3" fill="#a89878" />
                  <circle cx="180" cy="100" r="10" fill="#c8963e" stroke="#5a4028" strokeWidth="2" />
                </g>
                <circle cx="100" cy="100" r="6" fill="#5a4028" />
              </svg>
            </div>

            <p style={{ textAlign: "center", fontSize: 12.5, color: "#e0a848", fontStyle: "italic", minHeight: 20, margin: "0 0 8px" }}>{diagnosis}</p>

            {/* barre de vitesse : cible au centre */}
            <div style={{ position: "relative", height: 22, background: "#1a140a", border: "1px solid #5a4028", borderRadius: 6, overflow: "hidden", marginBottom: 6 }}>
              {/* zone verte */}
              <div style={{ position: "absolute", left: `${((TARGET_MS - TOL_MS) / (TARGET_MS * 2)) * 100}%`, width: `${(TOL_MS * 2 / (TARGET_MS * 2)) * 100}%`, top: 0, bottom: 0, background: "#7fe0a8", opacity: 0.35 }} />
              {/* curseur */}
              <div style={{ position: "absolute", left: `${Math.max(0, Math.min(100, (interval_ / (TARGET_MS * 2)) * 100))}%`, top: 0, bottom: 0, width: 3, background: "#ffd166", transform: "translateX(-1px)" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: "#a89878", marginBottom: 12 }}>
              <span>← trop vite (aigu)</span><span>cadence</span><span>trop lent (grave) →</span>
            </div>

            {/* barre de maintien */}
            <div style={{ margin: "10px 0 4px", background: "#1a140a", border: "1px solid #5a4028", borderRadius: 6, height: 14, overflow: "hidden" }}>
              <div style={{ width: `${(inZone / HOLD_MS) * 100}%`, height: "100%", background: "#7fe0a8", transition: "width 0.1s" }} />
            </div>
            <div style={{ fontSize: 11, textAlign: "center", color: "#a89878" }}>maintien : {Math.max(0, Math.ceil((HOLD_MS - inZone) / 1000))} s dans la zone</div>
          </>
        ) : (
          <div style={{ marginTop: 4 }}>
            <div style={{ background: "#0e1420", border: "1px solid #2a3648", borderRadius: 12, padding: "14px 16px" }}>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: "#e8eef5", margin: 0 }}>
                « Une voix HUMAINE, gravée dans la cire — c'est prodigieux ! Le 21 novembre 1877, Thomas Edison annonce son phonographe à cylindre. Pour la première fois de l'Histoire, un SON survit à celui qui l'a émis. En 1887, Emile Berliner invente le disque plat (le gramophone) — plus facile à copier. Après l'image (photo), voici le son : nos morts pourront désormais nous parler. Attention : la cire est FRAGILE, elle fond à 50 °C, elle s'use à chaque écoute… combien de voix du XIXᵉ nous sont-elles arrivées ? Très peu. » — MARTINE
              </p>
            </div>
            <p style={{ textAlign: "center", margin: "12px 0 0", color: "#7fe0a8", fontSize: 13, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              ✓ Cylindre de cire enregistré — la voix de James est gravée !
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
