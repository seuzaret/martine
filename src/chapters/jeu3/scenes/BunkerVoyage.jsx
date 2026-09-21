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
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, position: "relative", width: "100%" }}>
        <svg viewBox="0 0 1100 560" style={{ display: "block", width: "100%", height: "auto", maxHeight: "72vh" }}>
          <defs>
            <radialGradient id="bv-flash" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="40%" stopColor="#7fd8ff" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#3a80c8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1100" height="560" fill="#050810" />
          {[0, 0.2, 0.4, 0.6, 0.8].map((delay, i) => (
            <circle key={i} cx="550" cy="280" r="60" fill="none" stroke="#7fd8ff" strokeWidth="1.5" opacity="0.6">
              <animate attributeName="r" values="20;420" dur="1.2s" begin={`${delay}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;0" dur="1.2s" begin={`${delay}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <circle cx="550" cy="280" r="320" fill="url(#bv-flash)" />
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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, width: "100%" }}>
      <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 3, color: "#e0a848" }}>
        📻 {mission.dateCible.toUpperCase()} — TOIT DE L'IMMEUBLE 12, RUE DES SIRÈNES
      </div>
      <svg viewBox="0 0 1100 560" style={{ display: "block", width: "100%", height: "auto", maxHeight: "78vh", flexShrink: 0 }}>
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
          <radialGradient id="bv-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffd870" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffd870" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Ciel crépuscule 2047 (plus haut) */}
        <rect width="1100" height="340" fill="url(#bv-sky)" />
        {/* Halo solaire */}
        <circle cx="800" cy="280" r="220" fill="url(#bv-sun)" />
        {/* Étoiles pâles en haut */}
        {[[80, 30], [200, 60], [320, 20], [500, 50], [620, 40], [900, 70], [1040, 30]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.4 : 0.9} fill="#e8eef5" opacity={0.4 + (i % 4) * 0.1} />
        ))}
        {/* Ville lointaine (silhouette de tours plus étendue) */}
        <path d="M0 340 L0 260 L50 260 L50 210 L110 210 L110 240 L180 240 L180 180 L240 180 L240 220 L320 220 L320 160 L380 160 L380 230 L460 230 L460 190 L540 190 L540 230 L620 230 L620 170 L680 170 L680 240 L750 240 L750 200 L830 200 L830 240 L900 240 L900 180 L960 180 L960 230 L1030 230 L1030 200 L1100 200 L1100 340 Z" fill="#1a1020" opacity="0.85" />
        {/* Deuxième plan de tours plus proches */}
        <path d="M0 340 L0 300 L80 300 L80 270 L160 270 L160 290 L260 290 L260 250 L360 250 L360 290 L480 290 L480 260 L580 260 L580 300 L720 300 L720 270 L840 270 L840 290 L960 290 L960 250 L1100 250 L1100 340 Z" fill="#0e0818" opacity="0.9" />
        {/* Fenêtres allumées */}
        {[[110, 220], [280, 200], [400, 200], [500, 205], [620, 190], [720, 200], [900, 200], [1040, 215], [200, 280], [500, 275], [820, 280]].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width={i % 2 === 0 ? 5 : 4} height="7" fill={i % 3 === 0 ? "#e0a848" : "#ffd870"} opacity="0.9" />
        ))}
        {/* Soleil couchant plus détaillé */}
        <circle cx="800" cy="280" r="42" fill="#ffd870" opacity="0.85" />
        <circle cx="800" cy="280" r="32" fill="#fff4b0" opacity="0.95" />
        <circle cx="800" cy="280" r="18" fill="#fff" opacity="0.75" />
        {/* Toit + rebord */}
        <rect y="340" width="1100" height="220" fill="url(#bv-roof)" />
        <rect y="340" width="1100" height="12" fill="#5a5060" />
        {/* Grille de béton sur le toit */}
        <path d="M0 400 L1100 400" stroke="#0a0806" strokeWidth="0.6" opacity="0.5" />
        <path d="M0 460 L1100 460" stroke="#0a0806" strokeWidth="0.6" opacity="0.5" />
        {[200, 400, 600, 800, 1000].map((x) => (
          <path key={x} d={`M${x} 352 L${x} 560`} stroke="#0a0806" strokeWidth="0.5" opacity="0.45" />
        ))}

        {/* Cheminée en briques à gauche (plus grande) */}
        <g transform="translate(110,250)">
          <rect x="0" y="0" width="56" height="90" fill="#5a3018" stroke="#0a0806" strokeWidth="1.5" />
          {/* Motif briques */}
          {[0, 12, 24, 36, 48, 60, 72].map((y, k) => (
            <g key={y}>
              <line x1="0" y1={y} x2="56" y2={y} stroke="#3a1808" strokeWidth="0.4" />
              {k % 2 === 0 ? <line x1="28" y1={y} x2="28" y2={y + 12} stroke="#3a1808" strokeWidth="0.4" /> :
                             <><line x1="14" y1={y} x2="14" y2={y + 12} stroke="#3a1808" strokeWidth="0.4" /><line x1="42" y1={y} x2="42" y2={y + 12} stroke="#3a1808" strokeWidth="0.4" /></>}
            </g>
          ))}
          <rect x="-6" y="-8" width="68" height="12" fill="#3a2010" stroke="#0a0806" strokeWidth="1" />
          {/* Fumée qui monte */}
          <path d="M28 -12 Q22 -30 34 -46 Q26 -60 30 -80" stroke="#8a9098" strokeWidth="4" fill="none" opacity="0.35" strokeLinecap="round">
            <animate attributeName="opacity" values="0.15;0.5;0.15" dur="3s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Bouches d'aération / caisson technique au milieu-fond */}
        <g transform="translate(600,300)">
          <rect x="-30" y="0" width="60" height="40" fill="#3a4048" stroke="#0a0806" strokeWidth="1.5" />
          <rect x="-24" y="4" width="48" height="32" fill="#28303a" />
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1="-22" y1={10 + i * 8} x2="22" y2={10 + i * 8} stroke="#5a6270" strokeWidth="1" />
          ))}
          <circle cx="30" cy="20" r="3" fill="#5eff9e">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Antenne parabole à droite */}
        <g transform="translate(960,300)">
          <line x1="0" y1="0" x2="0" y2="40" stroke="#5a6270" strokeWidth="2.5" />
          <path d="M-20 0 Q0 -30 20 0" fill="#8a9098" stroke="#3a4048" strokeWidth="1.5" />
          <line x1="0" y1="-14" x2="6" y2="-4" stroke="#3a4048" strokeWidth="1" />
          <circle cx="6" cy="-4" r="2" fill="#e83820" />
        </g>
        {/* Grande antenne relais avec haubans */}
        <g transform="translate(200,180)">
          <line x1="0" y1="0" x2="0" y2="160" stroke="#5a6270" strokeWidth="2" />
          <line x1="0" y1="10" x2="-30" y2="160" stroke="#5a6270" strokeWidth="1" opacity="0.7" />
          <line x1="0" y1="10" x2="30" y2="160" stroke="#5a6270" strokeWidth="1" opacity="0.7" />
          {[30, 60, 90, 120].map((y) => (
            <line key={y} x1="-14" y1={y} x2="14" y2={y} stroke="#5a6270" strokeWidth="1" />
          ))}
          <circle cx="0" cy="6" r="3" fill="#e83820">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Cageot + magnéto (plus grand, plus détaillé) */}
        <g transform="translate(440,400)">
          {/* Cageot en bois */}
          <rect x="0" y="0" width="90" height="34" fill="#3a2818" stroke="#0a0806" strokeWidth="1" />
          <rect x="0" y="0" width="90" height="8" fill="#5a3818" />
          <line x1="0" y1="20" x2="90" y2="20" stroke="#0a0806" strokeWidth="0.6" />
          <line x1="30" y1="0" x2="30" y2="34" stroke="#0a0806" strokeWidth="0.4" />
          <line x1="60" y1="0" x2="60" y2="34" stroke="#0a0806" strokeWidth="0.4" />
          {/* Magnéto à bobines (Nagra années 80) */}
          <rect x="6" y="-38" width="78" height="38" fill="#28303a" stroke="#0a0806" strokeWidth="1.5" rx="2" />
          <rect x="10" y="-34" width="70" height="20" fill="#141c26" stroke="#5a6270" strokeWidth="0.6" />
          {/* Deux bobines qui tournent */}
          <g transform="translate(24,-24)" style={{ transformOrigin: "0 0", animation: "bvReel 4s linear infinite" }}>
            <circle r="8" fill="#3a4048" stroke="#0a0806" strokeWidth="0.8" />
            <circle r="3" fill="#c8a848" />
            <line x1="-8" y1="0" x2="8" y2="0" stroke="#0a0806" strokeWidth="0.4" />
            <line x1="0" y1="-8" x2="0" y2="8" stroke="#0a0806" strokeWidth="0.4" />
          </g>
          <g transform="translate(66,-24)" style={{ transformOrigin: "0 0", animation: "bvReel 4s linear infinite" }}>
            <circle r="8" fill="#3a4048" stroke="#0a0806" strokeWidth="0.8" />
            <circle r="3" fill="#c8a848" />
            <line x1="-8" y1="0" x2="8" y2="0" stroke="#0a0806" strokeWidth="0.4" />
            <line x1="0" y1="-8" x2="0" y2="8" stroke="#0a0806" strokeWidth="0.4" />
          </g>
          {/* Bande magnétique entre les bobines */}
          <path d="M32 -24 Q45 -16 58 -24" stroke="#8a5030" strokeWidth="1" fill="none" />
          {/* Molette + LED enreg */}
          <circle cx="45" cy="-8" r="3" fill="#5a6270" stroke="#0a0806" strokeWidth="0.4" />
          <circle cx="72" cy="-8" r="2" fill="#e83820">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="0.8s" repeatCount="indefinite" />
          </circle>
          <text x="45" y="-2" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="4" fill="#e0a848">NAGRA IV-S</text>
        </g>

        {/* Bouteille et carnet abandonnés au sol */}
        <g transform="translate(720,470)">
          <rect x="0" y="0" width="30" height="20" fill="#e8dfc8" stroke="#3a2818" strokeWidth="0.6" />
          <line x1="4" y1="5" x2="26" y2="5" stroke="#3a2818" strokeWidth="0.4" />
          <line x1="4" y1="10" x2="24" y2="10" stroke="#3a2818" strokeWidth="0.4" />
          <line x1="4" y1="15" x2="20" y2="15" stroke="#3a2818" strokeWidth="0.4" />
        </g>
        <g transform="translate(780,466)">
          <rect x="0" y="0" width="6" height="20" fill="#3a6828" stroke="#0a0806" strokeWidth="0.5" />
          <rect x="1" y="-4" width="4" height="6" fill="#5a3818" />
        </g>

        {/* Léa Vermet (PNJ cliquable) — plus centrale */}
        <PnjSprite x={620} y={400} color="#5a2830" hair="#3a1808"
          facing="left" activity="write"
          nom={mission.temoin.nom} role={mission.temoin.role}
          heard={heard} active={!heard}
          onClick={() => setHeard(true)} />

        <style>{`@keyframes bvReel { from { transform: rotate(0); } to { transform: rotate(360deg); } }`}</style>
      </svg>

      {/* Zone dialogue + bouton — hauteur réservée fixe pour que le SVG
          ne se redimensionne pas quand on clique sur la journaliste. */}
      <div style={{ maxWidth: 800, width: "100%", minHeight: 78, flexShrink: 0 }}>
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

      {/* Bouton (avec placeholder invisible quand pas encore écouté, pour que
          le layout ne bouge pas). */}
      <div style={{ minHeight: 50, display: "flex", alignItems: "center", flexShrink: 0 }}>
        {heard ? (
          <button onClick={finish} autoFocus
            style={{ background: "#5eff9e", color: "#06110b", border: "none", borderRadius: 10, padding: "12px 26px", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: 2, boxShadow: "0 0 18px rgba(94,255,158,0.4)" }}>
            ⏵ ENREGISTRER LE MESSAGE
          </button>
        ) : null}
      </div>
    </div>
  );
}
