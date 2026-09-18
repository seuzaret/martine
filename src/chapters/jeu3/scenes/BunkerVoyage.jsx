import { useEffect, useState, useRef } from "react";
import PnjSprite from "../PnjSprite.jsx";

/* ============================================================
   JEU 3 — SCÈNE : « Voyage dans le temps » (mission A)
   ------------------------------------------------------------
   Trois phases :
   1) flash — décompte 2087 → 2087 (juin 18) sur ~1.5 s
   2) past  — le passé : un toit d'immeuble, ciel crépusculaire,
      la journaliste Léa Vermet avec son magnéto. Cliquer sur
      elle → sa réplique. Puis un bouton "Enregistrer le message".
   3) return — flash retour bunker → onGo("archives") + flag set
   ============================================================ */
export default function BunkerVoyage({ onGo, j3 }) {
  const mission = j3.missions.appel;
  const [phase, setPhase] = useState("flash");
  const [heard, setHeard] = useState(false);
  const [year, setYear] = useState(2087);
  const rafRef = useRef(null);

  /* Phase flash : ~1.5s de décompte années → arrivée dans le passé */
  useEffect(() => {
    if (phase !== "flash") return;
    const t0 = performance.now();
    const DUR = 1400;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / DUR);
      const eased = 1 - Math.pow(1 - p, 3);
      setYear(Math.round(2087 - eased * 0)); // reste à 2087, on affiche juste le compteur
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else setTimeout(() => setPhase("past"), 200);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  const finish = () => {
    j3.setFlag(mission.flag);
    setPhase("return");
    setTimeout(() => onGo("archives"), 1300);
  };

  if (phase === "flash" || phase === "return") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, position: "relative" }}>
        <svg viewBox="0 0 800 400" style={{ display: "block", width: "100%", height: "auto", maxHeight: "56vh" }}>
          <defs>
            <radialGradient id="bv-flash" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="40%" stopColor="#7fd8ff" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#3a80c8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="400" fill="#050810" />
          {[0, 0.2, 0.4, 0.6, 0.8].map((delay, i) => (
            <circle key={i} cx="400" cy="200" r="60" fill="none" stroke="#7fd8ff" strokeWidth="1.5" opacity="0.6">
              <animate attributeName="r" values="20;300" dur="1.2s" begin={`${delay}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;0" dur="1.2s" begin={`${delay}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <circle cx="400" cy="200" r="240" fill="url(#bv-flash)" />
        </svg>
        <div style={{ position: "absolute", top: "36%", left: 0, right: 0, textAlign: "center", pointerEvents: "none" }}>
          <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 12, letterSpacing: 3, color: "#7fd8ff" }}>
            {phase === "return" ? "◈ RETOUR AU BUNKER" : "⏳ RETOUR DANS LE TEMPS"}
          </div>
          <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 32, fontWeight: 900, color: "#fff", textShadow: "0 0 14px #7fd8ff", marginTop: 6 }}>
            {phase === "return" ? "2087 · +40 ans" : mission.dateCible}
          </div>
        </div>
      </div>
    );
  }

  /* Phase past : décor toit crépuscule + journaliste */
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 3, color: "#e0a848" }}>
        📻 {mission.dateCible.toUpperCase()} — TOIT DE L'IMMEUBLE 12, RUE DES SIRÈNES
      </div>
      <svg viewBox="0 0 800 400" style={{ display: "block", width: "100%", height: "auto", maxHeight: "48vh" }}>
        <defs>
          <linearGradient id="bv-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1030" />
            <stop offset="60%" stopColor="#8a3820" />
            <stop offset="100%" stopColor="#c86840" />
          </linearGradient>
          <linearGradient id="bv-roof" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a3038" />
            <stop offset="100%" stopColor="#141018" />
          </linearGradient>
        </defs>
        {/* Ciel crépuscule 2047 */}
        <rect width="800" height="240" fill="url(#bv-sky)" />
        {/* Ville lointaine (silhouette de tours) */}
        <path d="M0 240 L0 180 L40 180 L40 140 L80 140 L80 170 L140 170 L140 120 L180 120 L180 150 L240 150 L240 100 L280 100 L280 160 L340 160 L340 130 L400 130 L400 160 L460 160 L460 110 L500 110 L500 170 L560 170 L560 140 L620 140 L620 170 L680 170 L680 120 L720 120 L720 160 L800 160 L800 240 Z" fill="#1a1020" opacity="0.85" />
        {/* Quelques fenêtres allumées */}
        {[[80, 160], [200, 160], [340, 150], [460, 150], [620, 150]].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="4" height="6" fill="#ffd870" opacity="0.9" />
        ))}
        {/* Soleil couchant */}
        <circle cx="580" cy="200" r="30" fill="#ffd870" opacity="0.8" />
        <circle cx="580" cy="200" r="20" fill="#fff4b0" opacity="0.9" />
        {/* Toit */}
        <rect y="240" width="800" height="160" fill="url(#bv-roof)" />
        {/* Rebord de toit */}
        <rect y="240" width="800" height="10" fill="#5a5060" />
        {/* Cheminée en briques à gauche */}
        <g transform="translate(80,180)">
          <rect x="0" y="0" width="40" height="60" fill="#5a3018" stroke="#0a0806" strokeWidth="1.5" />
          <rect x="-4" y="-6" width="48" height="8" fill="#3a2010" />
        </g>
        {/* Antenne parabole à droite */}
        <g transform="translate(700,220)">
          <line x1="0" y1="0" x2="0" y2="20" stroke="#5a6270" strokeWidth="2" />
          <path d="M-14 0 Q0 -20 14 0" fill="#8a9098" stroke="#3a4048" strokeWidth="1" />
        </g>
        {/* Magnéto posé sur un cageot */}
        <g transform="translate(340,300)">
          <rect x="0" y="0" width="60" height="20" fill="#3a2818" />
          <rect x="4" y="-24" width="52" height="24" fill="#28303a" stroke="#0a0806" strokeWidth="1.5" />
          <circle cx="18" cy="-12" r="4" fill="#5a6270" stroke="#0a0806" strokeWidth="0.8" />
          <circle cx="38" cy="-12" r="4" fill="#5a6270" stroke="#0a0806" strokeWidth="0.8" />
          <rect x="10" y="-4" width="36" height="2" fill="#e83820" />
        </g>
        {/* Léa Vermet (PNJ cliquable) */}
        <PnjSprite x={450} y={230} color="#5a2830" hair="#3a1808"
          nom={mission.temoin.nom} role={mission.temoin.role}
          heard={heard} active={!heard}
          onClick={() => setHeard(true)} />
      </svg>

      {/* Zone dialogue + enregistrement */}
      <div style={{ maxWidth: 800, width: "100%", minHeight: 78 }}>
        {heard ? (
          <div style={{ background: "#141020", border: "1px solid #e0a848", borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#e0a848" }}>
              {mission.temoin.nom.toUpperCase()} · {mission.temoin.role.toUpperCase()}
            </div>
            <p style={{ margin: "3px 0 0", fontSize: 13.5, lineHeight: 1.5, color: "#e8eef5" }}>
              « {mission.temoin.replique} »
            </p>
          </div>
        ) : (
          <div style={{ background: "#0a0e14", border: "1px dashed #3a4048", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: 12.5, color: "#7a879e", fontStyle: "italic" }}>
              Clique sur la journaliste pour l'écouter.
            </p>
          </div>
        )}
      </div>

      {heard && (
        <button onClick={finish} autoFocus
          style={{ background: "#5eff9e", color: "#06110b", border: "none", borderRadius: 10, padding: "12px 26px", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: 2, boxShadow: "0 0 18px rgba(94,255,158,0.4)" }}>
          ⏵ ENREGISTRER LE MESSAGE
        </button>
      )}
    </div>
  );
}
