/* ============================================================
   CHAPITRE 5 — Carte du domaine (façon carte enluminée médiévale)
   Le CHÂTEAU du seigneur (tableaux 1 & 3, l'aller et le retour),
   le MONASTÈRE du frère Jorge, la VILLE où travaille Gutenberg, et
   le MOULIN à papier au bord de la rivière. Pas une région réelle :
   un domaine médiéval imaginaire, à la manière des vieilles cartes.
   ============================================================ */

const LIEUX = [
  { tabs: [0, 2], nom: "Château", sous: "le seigneur", x: 168, y: 196 },
  { tab: 1, nom: "Monastère", sous: "frère Jorge", x: 476, y: 140 },
  { tab: 3, nom: "Ville", sous: "l'imprimerie", x: 388, y: 322 },
  { tab: 4, nom: "Moulin", sous: "à papier", x: 566, y: 300 },
];

export default function CarteMoyenAge({ tab = 0 }) {
  const isHere = (l) => (l.tabs ? l.tabs.includes(tab) : l.tab === tab);
  return (
    <svg viewBox="0 0 700 440" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <linearGradient id="c5-parch" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ecdcb2" /><stop offset="100%" stopColor="#d6bd88" /></linearGradient>
        <radialGradient id="c5-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffd166" stopOpacity="0.9" /><stop offset="100%" stopColor="#ffd166" stopOpacity="0" /></radialGradient>
        <filter id="c5-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.28 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      <rect width="700" height="440" fill="url(#c5-parch)" />
      <rect width="700" height="440" fill="#8a6a3a" opacity="0.12" filter="url(#c5-grain)" />
      {/* bordure enluminée */}
      <rect x="8" y="8" width="684" height="424" fill="none" stroke="#a8842a" strokeWidth="3" opacity="0.6" />
      <rect x="14" y="14" width="672" height="412" fill="none" stroke="#7a2a34" strokeWidth="1.4" opacity="0.5" />

      {/* collines vertes */}
      <g fill="#8aa864" opacity="0.5">
        <path d="M60 250 q60 -40 130 -6 q60 30 120 0 q60 -30 130 4 q60 34 190 -6 L640 400 L60 400 Z" />
      </g>
      {/* forêt (petits arbres) */}
      {[[260, 210], [300, 224], [600, 200], [630, 214], [90, 300]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x},${y})`}><rect x="-2" y="0" width="4" height="10" fill="#6a4a2a" /><circle cx="0" cy="-6" r="10" fill="#5a7a40" /></g>
      ))}

      {/* la RIVIÈRE (le moulin est dessus) */}
      <path d="M410 20 Q440 120 500 200 Q560 270 566 300 Q574 360 660 410" fill="none" stroke="#7fa8c0" strokeWidth="12" strokeLinecap="round" opacity="0.85" />
      <path d="M410 20 Q440 120 500 200 Q560 270 566 300 Q574 360 660 410" fill="none" stroke="#bcd8e0" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      <text x="470" y="230" fontFamily="Palatino,serif" fontSize="12" fill="#3a6a80" fontStyle="italic" transform="rotate(52 470 230)" opacity="0.75">la rivière</text>

      {/* chemins (pointillés) reliant les lieux */}
      <path d="M168 196 Q320 120 476 140 M168 196 Q280 280 388 322 M388 322 Q480 314 566 300"
        fill="none" stroke="#9a7a3a" strokeWidth="2.4" strokeDasharray="3 6" strokeLinecap="round" opacity="0.6" />

      {/* ═══ petites vignettes des lieux (dessinées) ═══ */}
      {/* château */}
      <g transform="translate(168,196)" opacity="0.95">
        <rect x="-22" y="-6" width="44" height="26" fill="#b8b0a0" stroke="#5a4a38" strokeWidth="1.5" />
        {[-22, -8, 6, 20].map((x, i) => <rect key={i} x={x} y="-12" width="6" height="8" fill="#b8b0a0" stroke="#5a4a38" strokeWidth="1" />)}
        <rect x="-30" y="-16" width="12" height="36" fill="#a8a090" stroke="#5a4a38" strokeWidth="1.4" />
        <path d="M-30 -16 l6 -8 l6 8 Z" fill="#7a3a2a" />
      </g>
      {/* monastère (chapelle + croix) */}
      <g transform="translate(476,140)" opacity="0.95">
        <rect x="-18" y="-6" width="36" height="24" fill="#c8b890" stroke="#5a4a38" strokeWidth="1.4" />
        <path d="M-18 -6 L0 -20 L18 -6 Z" fill="#8a6a44" />
        <path d="M0 -20 v-8 M-4 -24 h8" stroke="#5a4a38" strokeWidth="1.6" />
      </g>
      {/* ville (maisons + presse) */}
      <g transform="translate(388,322)" opacity="0.95">
        {[-16, 0, 16].map((x, i) => <g key={i} transform={`translate(${x},0)`}><rect x="-7" y="-6" width="14" height="16" fill="#c9a86a" stroke="#5a4a38" strokeWidth="1.2" /><path d="M-8 -6 L0 -14 L8 -6 Z" fill="#8a4a34" /></g>)}
      </g>
      {/* moulin (roue) */}
      <g transform="translate(566,300)" opacity="0.95">
        <rect x="-12" y="-8" width="20" height="22" fill="#a87c4a" stroke="#5a4a38" strokeWidth="1.4" />
        <path d="M-6 -8 L2 -18 L10 -8 Z" fill="#7a4632" />
        <circle cx="14" cy="8" r="9" fill="none" stroke="#5a4a38" strokeWidth="2" />
        <path d="M14 -1 v18 M5 8 h18 M8 2 l12 12 M8 14 l12 -12" stroke="#5a4a38" strokeWidth="1.4" />
      </g>

      {/* titre */}
      <text x="350" y="42" textAnchor="middle" fontFamily="'Cinzel',Palatino,serif" fontSize="16" fill="#7a2a34" letterSpacing="1">LE DOMAINE</text>

      {/* ═══ marqueurs ═══ */}
      {LIEUX.map((l, k) => {
        const ici = isHere(l);
        return (
          <g key={k}>
            {ici && <circle cx={l.x} cy={l.y} r="34" fill="url(#c5-glow)" style={{ animation: "glow 2s ease-in-out infinite" }} />}
            {ici && <circle cx={l.x} cy={l.y} r="26" fill="none" stroke="#e8542e" strokeWidth="2.5" style={{ animation: "pulse 1.6s ease-in-out infinite" }} />}
            <text x={l.x} y={l.y + 38} textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize={ici ? 16 : 13} fontWeight={ici ? 700 : 400} fill="#3a2410">{l.nom}</text>
            <text x={l.x} y={l.y + 52} textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9.5" fill="#7a5a30" opacity="0.85">{l.sous}</text>
            {ici && <text x={l.x} y={l.y - 30} textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10.5" fill="#e8542e" fontWeight="700">◉ tu es ici</text>}
          </g>
        );
      })}
    </svg>
  );
}
