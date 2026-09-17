import { useState } from "react";

/* ============================================================
   JEU 3 — SCÈNE : « Le Réveil »
   ------------------------------------------------------------
   Le joueur se réveille dans une petite cellule d'habitation
   du bunker. Il ne reconnaît rien, MARTINE ne répond pas.
   Trois répliques de son "toi" intérieur, puis un bouton pour
   sortir dans le couloir central (→ onGo("hub")).
   ============================================================ */
const LINES = [
  "Une lumière blanche, froide. Un plafond bas en béton. Tu ne connais pas cette pièce.",
  "Ton téléphone est éteint. MARTINE ne répond pas. Aucun son familier.",
  "Sur la porte, une inscription : « N-27 · Habitant · Niveau 4 ». Tu ne sais pas ce que ça veut dire. Il faut sortir voir.",
];

export default function BunkerAwake({ prenom, onGo }) {
  const [step, setStep] = useState(0);
  const isLast = step === LINES.length - 1;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <svg viewBox="0 0 800 460" style={{ display: "block", width: "100%", height: "auto", maxHeight: "56vh" }}>
        <defs>
          <linearGradient id="ba-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2f38" />
            <stop offset="100%" stopColor="#141820" />
          </linearGradient>
          <radialGradient id="ba-light" cx="50%" cy="0%" r="60%">
            <stop offset="0%" stopColor="#f0f4ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f0f4ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Murs de béton */}
        <rect width="800" height="460" fill="url(#ba-wall)" />
        {/* Plafond avec néon */}
        <rect x="0" y="0" width="800" height="60" fill="#1a1e26" />
        <rect x="260" y="20" width="280" height="14" rx="3" fill="#e8eef5" opacity="0.85" />
        <ellipse cx="400" cy="34" rx="220" ry="180" fill="url(#ba-light)" />
        {/* Sol */}
        <rect x="0" y="380" width="800" height="80" fill="#0e1218" />
        <path d="M0 380 L800 380" stroke="#3a4048" strokeWidth="1" />
        {/* Joints de dalles */}
        {[100, 200, 300, 400, 500, 600, 700].map((x) => (
          <path key={x} d={`M${x} 380 L${x - 40} 460`} stroke="#0a0e14" strokeWidth="1.5" opacity="0.7" />
        ))}
        {/* Lit en métal, couverture grise */}
        <g transform="translate(150,300)">
          <rect x="0" y="0" width="260" height="80" fill="#3a4048" stroke="#0a0e14" strokeWidth="2" />
          <path d="M4 6 Q60 -4 130 8 Q200 20 256 6 L256 40 Q200 48 130 40 Q60 34 4 40 Z" fill="#5a6270" />
          {/* Oreiller */}
          <rect x="6" y="4" width="60" height="22" rx="4" fill="#8a9098" />
          {/* Pieds */}
          <rect x="4" y="80" width="10" height="30" fill="#1a1e26" />
          <rect x="246" y="80" width="10" height="30" fill="#1a1e26" />
        </g>
        {/* Porte à droite avec l'inscription */}
        <g transform="translate(640,180)">
          <rect x="0" y="0" width="120" height="200" fill="#5a4028" stroke="#0a0806" strokeWidth="3" />
          <rect x="4" y="4" width="112" height="192" fill="#4a3020" />
          {/* Poignée */}
          <circle cx="100" cy="100" r="4" fill="#c8a848" />
          {/* Plaque N-27 */}
          <rect x="20" y="30" width="80" height="30" fill="#e8eef5" stroke="#3a2818" strokeWidth="1.5" />
          <text x="60" y="42" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill="#0a0806" fontWeight="700">N-27</text>
          <text x="60" y="53" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7" fill="#5a4028">HABITANT · N4</text>
        </g>
        {/* Étagère avec quelques objets à gauche */}
        <g transform="translate(60,240)">
          <rect x="0" y="0" width="80" height="4" fill="#3a4048" />
          <rect x="0" y="60" width="80" height="4" fill="#3a4048" />
          {/* Livre + gobelet */}
          <rect x="6" y="-30" width="8" height="30" fill="#5a3818" />
          <rect x="18" y="-24" width="8" height="24" fill="#8a3820" />
          <rect x="52" y="-20" width="20" height="20" fill="#c8b090" />
        </g>
      </svg>

      {/* Texte narratif + bouton "Continuer" ou "Sortir de la chambre" */}
      <div style={{ maxWidth: 700, textAlign: "center" }}>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: "#c8d4e2", margin: 0, fontStyle: "italic" }}>
          « {LINES[step].replace(/\{prenom\}/g, prenom || "chronaute")} »
        </p>
        <div style={{ marginTop: 18 }}>
          {!isLast ? (
            <button onClick={() => setStep(step + 1)}
              style={{ background: "#141b26", color: "#7fd8ff", border: "1px solid #3a80c8", borderRadius: 10, padding: "10px 22px", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              Suite ▸
            </button>
          ) : (
            <button onClick={() => onGo("hub")} autoFocus
              style={{ background: "#5eff9e", color: "#06110b", border: "none", borderRadius: 10, padding: "12px 26px", fontWeight: 800, cursor: "pointer", fontSize: 14, fontFamily: "ui-monospace,monospace", letterSpacing: 2, boxShadow: "0 0 18px rgba(94,255,158,0.35)" }}>
              ▶ SORTIR DANS LE COULOIR
            </button>
          )}
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: "#5a6678", fontFamily: "ui-monospace,monospace" }}>
          {step + 1} / {LINES.length}
        </div>
      </div>
    </div>
  );
}
