/* ============================================================
   JEU 3 — Sprite PNJ générique (SVG, réutilisable)
   ------------------------------------------------------------
   Un buste + tête stylisée, coloris paramétrables. À placer dans
   un <svg> parent. Affiche une pastille verte « ✓ déjà entendu »
   si `heard`, et un halo doré pulsant si `active`.
   Props :
     x, y      — position dans le SVG parent
     color     — couleur des vêtements (buste)
     hair      — couleur des cheveux (défaut brun foncé)
     skin      — couleur de peau (défaut ocre clair)
     nom, role — étiquettes affichées sous le buste
     heard     — si vrai : pastille verte
     active    — si vrai : halo doré pulsant
     onClick   — callback clic
   ============================================================ */
export default function PnjSprite({
  x, y, color = "#5a5060", hair = "#2a1808", skin = "#e0a878",
  nom = "?", role = "", heard = false, active = false, onClick,
}) {
  return (
    <g transform={`translate(${x},${y})`} onClick={onClick} style={{ cursor: onClick ? "pointer" : "default" }}>
      {active && (
        <circle cx="0" cy="20" r="66" fill="none" stroke="#ffd166" strokeWidth="2" strokeDasharray="4 4">
          <animate attributeName="r" values="60;70;60" dur="1.6s" repeatCount="indefinite" />
        </circle>
      )}
      {/* buste */}
      <ellipse cx="0" cy="60" rx="38" ry="22" fill={color} stroke="#0a0806" strokeWidth="1.5" />
      {/* tête */}
      <ellipse cx="0" cy="15" rx="18" ry="20" fill={skin} stroke="#5a3018" strokeWidth="1" />
      {/* cheveux (petite touffe stylisée) */}
      <path d="M-16 0 q0 -18 8 -20 q8 2 10 -6 q4 8 10 -2 q4 6 8 8 q4 8 4 20 z" fill={hair} />
      {/* yeux + bouche */}
      <circle cx="-5" cy="15" r="1.6" fill="#0a0806" />
      <circle cx="5" cy="15" r="1.6" fill="#0a0806" />
      <path d="M-3 24 Q0 26 3 24" stroke="#5a2818" strokeWidth="1" fill="none" strokeLinecap="round" />
      {heard && (
        <g transform="translate(24,-4)">
          <circle r="8" fill="#5eff9e" stroke="#0a0806" strokeWidth="1.2" />
          <path d="M-4 0 L-1 3 L5 -3" stroke="#0a0806" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
      <text x="0" y="96" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fontWeight="700" fill="#e8dfc8">{nom}</text>
      <text x="0" y="107" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#8a7050">{role}</text>
    </g>
  );
}
