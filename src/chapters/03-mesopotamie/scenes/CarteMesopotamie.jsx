/* ============================================================
   CHAPITRE 3 — Carte régionale : le Croissant fertile
   Montre les 3 lieux du chapitre (Ur, le Nil, la côte phénicienne)
   sur une carte stylisée « parchemin » : Méditerranée, Nil,
   Tigre & Euphrate, golfe Persique. Le lieu courant (tab) brille.
   ============================================================ */

/* les 3 étapes, dans l'ordre des tableaux du chapitre */
const LIEUX = [
  { tab: 0, nom: "Ur", sous: "cunéiforme", x: 556, y: 300 },
  { tab: 1, nom: "Le Nil", sous: "hiéroglyphes", x: 150, y: 356 },
  { tab: 2, nom: "Côte phénicienne", sous: "alphabet", x: 236, y: 150 },
];

export default function CarteMesopotamie({ tab = 0 }) {
  return (
    <svg viewBox="0 0 700 440" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <linearGradient id="cm-parch" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e8d5a8" /><stop offset="100%" stopColor="#d2b884" /></linearGradient>
        <linearGradient id="cm-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8fb8c0" /><stop offset="100%" stopColor="#6a97a3" /></linearGradient>
        <radialGradient id="cm-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffd166" stopOpacity="0.9" /><stop offset="100%" stopColor="#ffd166" stopOpacity="0" /></radialGradient>
        <filter id="cm-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* parchemin */}
      <rect width="700" height="440" fill="url(#cm-parch)" />
      <rect width="700" height="440" fill="#8a6a3a" opacity="0.16" filter="url(#cm-grain)" />
      <rect x="6" y="6" width="688" height="428" fill="none" stroke="#9a7a48" strokeWidth="2" opacity="0.5" />

      {/* ═══ les mers ═══ */}
      {/* Méditerranée (haut-gauche) */}
      <path d="M0 0 L300 0 L286 70 Q220 96 150 100 Q70 104 0 150 Z" fill="url(#cm-sea)" />
      <text x="120" y="52" fontFamily="Palatino, Georgia, serif" fontSize="16" fill="#2e5560" fontStyle="italic" opacity="0.7">Méditerranée</text>
      {/* golfe Persique (bas-droite) */}
      <path d="M700 440 L700 250 Q620 300 590 360 Q574 400 560 440 Z" fill="url(#cm-sea)" />
      <text x="600" y="410" fontFamily="Palatino, Georgia, serif" fontSize="13" fill="#2e5560" fontStyle="italic" opacity="0.7" textAnchor="middle">Golfe</text>
      {/* Mer Rouge (bas-gauche, sliver) */}
      <path d="M120 440 L150 300 Q160 360 176 440 Z" fill="url(#cm-sea)" opacity="0.85" />

      {/* ═══ les fleuves ═══ */}
      {/* Nil : du sud vers le delta méditerranéen */}
      <path d="M150 440 Q140 380 150 320 Q160 260 176 210 Q186 176 150 100" fill="none" stroke="#6a97a3" strokeWidth="5" strokeLinecap="round" />
      <text x="96" y="300" fontFamily="Palatino, Georgia, serif" fontSize="13" fill="#3a6a72" fontStyle="italic" transform="rotate(-72 96 300)" opacity="0.8">Nil</text>
      {/* Tigre & Euphrate : du nord-ouest vers le golfe */}
      <path d="M430 70 Q470 160 500 240 Q524 300 590 360" fill="none" stroke="#6a97a3" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M470 70 Q516 150 536 236 Q552 300 600 360" fill="none" stroke="#6a97a3" strokeWidth="4.5" strokeLinecap="round" />
      <text x="470" y="150" fontFamily="Palatino, Georgia, serif" fontSize="12" fill="#3a6a72" fontStyle="italic" transform="rotate(58 470 150)" opacity="0.8">Euphrate · Tigre</text>

      {/* montagnes au nord (petits chevrons) */}
      <g stroke="#8a6a42" strokeWidth="2" fill="none" opacity="0.55">
        {[[320, 60], [352, 54], [384, 62], [560, 66], [594, 58], [628, 66]].map(([x, y], i) => (
          <path key={i} d={`M${x - 12} ${y + 14} L${x} ${y} L${x + 12} ${y + 14}`} />
        ))}
      </g>

      {/* légende « croissant fertile » */}
      <text x="350" y="118" textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize="15" fill="#7a5a30" fontStyle="italic" opacity="0.7">le Croissant fertile</text>

      {/* ═══ le trajet en pointillés (Ur → Nil → Phénicie) ═══ */}
      <path d={`M${LIEUX[0].x} ${LIEUX[0].y} L${LIEUX[1].x} ${LIEUX[1].y} L${LIEUX[2].x} ${LIEUX[2].y}`}
        fill="none" stroke="#9a5a2e" strokeWidth="2.5" strokeDasharray="3 7" strokeLinecap="round" opacity="0.7" />

      {/* ═══ les 3 lieux ═══ */}
      {LIEUX.map((l) => {
        const ici = l.tab === tab;
        return (
          <g key={l.tab}>
            {ici && <circle cx={l.x} cy={l.y} r="30" fill="url(#cm-glow)" style={{ animation: "glow 2s ease-in-out infinite" }} />}
            <circle cx={l.x} cy={l.y} r={ici ? 9 : 6} fill={ici ? "#e8542e" : "#8a6a3a"} stroke="#3a2410" strokeWidth="2" />
            {ici && <circle cx={l.x} cy={l.y} r="14" fill="none" stroke="#e8542e" strokeWidth="2" style={{ animation: "pulse 1.6s ease-in-out infinite" }} />}
            <text x={l.x} y={l.y - (ici ? 22 : 14)} textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize={ici ? 17 : 14} fontWeight={ici ? 700 : 400} fill="#3a2410">{l.nom}</text>
            <text x={l.x} y={l.y + (ici ? 30 : 22)} textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fill="#7a5a30" opacity="0.85">{l.sous}</text>
            {ici && <text x={l.x} y={l.y + 44} textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="11" fill="#e8542e" fontWeight="700">◉ tu es ici</text>}
          </g>
        );
      })}

      {/* rose des vents */}
      <g transform="translate(650,90)" opacity="0.7">
        <circle r="18" fill="none" stroke="#8a6a42" strokeWidth="1.5" />
        <path d="M0 -18 L4 0 L0 18 L-4 0 Z" fill="#9a5a2e" />
        <path d="M-18 0 L0 -4 L18 0 L0 4 Z" fill="#c8a878" />
        <text x="0" y="-22" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill="#6a4a28">N</text>
      </g>
    </svg>
  );
}
