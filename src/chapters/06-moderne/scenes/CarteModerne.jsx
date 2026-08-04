/* ============================================================
   CHAPITRE 6 — Carte : la France de Jules (fin XVIIIe)
   Une carte terrestre, sans mer : la France et ses trois lieux —
   Annonay (la montgolfière), Paris (l'imprimerie) et Condé au nord
   (la victoire télégraphiée par Chappe, 1794).
   ============================================================ */

const LIEUX = [
  { tab: 0, nom: "Annonay", sous: "la montgolfière", x: 430, y: 300 },
  { tab: 1, nom: "Paris", sous: "l'imprimerie", x: 356, y: 176 },
  { tab: 2, nom: "Condé", sous: "Chappe · 1794", x: 392, y: 108 },
];

export default function CarteModerne({ tab = 0 }) {
  return (
    <svg viewBox="0 0 700 440" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <linearGradient id="c6-euro" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c6b07c" /><stop offset="100%" stopColor="#a48c56" /></linearGradient>
        <linearGradient id="c6-fr" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e2ce92" /><stop offset="100%" stopColor="#cdb274" /></linearGradient>
        <radialGradient id="c6-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffd166" stopOpacity="0.9" /><stop offset="100%" stopColor="#ffd166" stopOpacity="0" /></radialGradient>
        <filter id="c6-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.26 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* ═══ TERRE partout (l'Europe), aucune mer ═══ */}
      <rect width="700" height="440" fill="url(#c6-euro)" />
      <rect width="700" height="440" fill="#7a5a2e" opacity="0.12" filter="url(#c6-grain)" />

      {/* ═══ la FRANCE (région claire, contour net) ═══ */}
      <path d="M158 182 Q188 152 250 138 L398 112 Q446 118 458 150 L490 196 Q504 230 484 254 L466 306 Q446 340 398 344 L304 338 Q254 342 230 316 L214 256 Q236 240 250 254 L232 214 Q208 200 240 190 Q262 184 250 166 Q236 182 158 182 Z"
        fill="url(#c6-fr)" stroke="#7a4a20" strokeWidth="2.5" />
      <text x="342" y="240" textAnchor="middle" fontFamily="'Cinzel',Palatino,serif" fontSize="20" fill="#7a5424" opacity="0.5" letterSpacing="2">FRANCE</text>
      {/* voisins (terre) discrets */}
      <text x="580" y="150" textAnchor="middle" fontFamily="Palatino,serif" fontSize="11" fill="#6a4a24" fontStyle="italic" opacity="0.5">St-Empire</text>
      <text x="250" y="404" textAnchor="middle" fontFamily="Palatino,serif" fontSize="11" fill="#6a4a24" fontStyle="italic" opacity="0.5">Espagne</text>
      <text x="96" y="150" textAnchor="middle" fontFamily="Palatino,serif" fontSize="11" fill="#6a4a24" fontStyle="italic" opacity="0.5">Bretagne</text>
      {/* Alpes + Pyrénées (chevrons) */}
      <g stroke="#8a6a42" strokeWidth="2" fill="none" opacity="0.5">
        {[[474, 214], [488, 236], [258, 326], [292, 332]].map(([x, y], i) => <path key={i} d={`M${x - 9} ${y + 10} L${x} ${y} L${x + 9} ${y + 10}`} />)}
      </g>

      {/* la ligne Chappe (Paris → Nord/Condé) */}
      <path d="M356 176 L392 108" fill="none" stroke="#7a3020" strokeWidth="2.4" strokeDasharray="2 5" strokeLinecap="round" opacity="0.85" />
      {/* le trajet du chapitre */}
      <path d={`M${LIEUX[0].x} ${LIEUX[0].y} L${LIEUX[1].x} ${LIEUX[1].y} L${LIEUX[2].x} ${LIEUX[2].y}`}
        fill="none" stroke="#9a5a2e" strokeWidth="2.5" strokeDasharray="3 7" strokeLinecap="round" opacity="0.5" />

      {/* titre */}
      <text x="350" y="46" textAnchor="middle" fontFamily="'Cinzel',Palatino,serif" fontSize="16" fill="#5a3f1e" letterSpacing="1" opacity="0.8">LE VOYAGE EN FRANCE</text>

      {LIEUX.map((l) => {
        const ici = l.tab === tab;
        return (
          <g key={l.tab}>
            {ici && <circle cx={l.x} cy={l.y} r="26" fill="url(#c6-glow)" style={{ animation: "glow 2s ease-in-out infinite" }} />}
            <circle cx={l.x} cy={l.y} r={ici ? 8 : 5.5} fill={ici ? "#e8542e" : "#7a3a24"} stroke="#3a2410" strokeWidth="2" />
            {ici && <circle cx={l.x} cy={l.y} r="13" fill="none" stroke="#e8542e" strokeWidth="2" style={{ animation: "pulse 1.6s ease-in-out infinite" }} />}
            <text x={l.x} y={l.y - (ici ? 20 : 13)} textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize={ici ? 17 : 14} fontWeight={ici ? 700 : 400} fill="#2e2414">{l.nom}</text>
            <text x={l.x} y={l.y + (ici ? 28 : 21)} textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fill="#5a3f24" opacity="0.9">{l.sous}</text>
            {ici && <text x={l.x} y={l.y + 42} textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10.5" fill="#e8542e" fontWeight="700">◉ tu es ici</text>}
          </g>
        );
      })}

      <g transform="translate(650,392)" opacity="0.7">
        <circle r="16" fill="none" stroke="#5a4020" strokeWidth="1.4" />
        <path d="M0 -16 L4 0 L0 16 L-4 0 Z" fill="#9a5a2e" /><path d="M-16 0 L0 -4 L16 0 L0 4 Z" fill="#c8a878" />
        <text x="0" y="-19" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#5a4020">N</text>
      </g>
    </svg>
  );
}
