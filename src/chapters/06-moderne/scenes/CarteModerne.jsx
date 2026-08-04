/* ============================================================
   CHAPITRE 6 — Carte : la France de Jules (fin XVIIIe)
   Annonay (le vol de la montgolfière, en province), Paris
   (l'imprimerie du journal) et Condé-sur-l'Escaut, au nord
   (la victoire télégraphiée par Chappe, 1794). La ligne Chappe
   Paris ↔ Lille est esquissée.
   ============================================================ */

const LIEUX = [
  { tab: 0, nom: "Annonay", sous: "la montgolfière", x: 452, y: 300 },
  { tab: 1, nom: "Paris", sous: "l'imprimerie", x: 372, y: 168 },
  { tab: 2, nom: "Condé", sous: "Chappe · 1794", x: 404, y: 96 },
];

export default function CarteModerne({ tab = 0 }) {
  return (
    <svg viewBox="0 0 700 440" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <linearGradient id="c6-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8fb8c0" /><stop offset="100%" stopColor="#5f8b98" /></linearGradient>
        <linearGradient id="c6-land" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#cdb680" /><stop offset="100%" stopColor="#aa9058" /></linearGradient>
        <radialGradient id="c6-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffd166" stopOpacity="0.9" /><stop offset="100%" stopColor="#ffd166" stopOpacity="0" /></radialGradient>
        <filter id="c6-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* mer autour */}
      <rect width="700" height="440" fill="url(#c6-sea)" />
      <g stroke="#cfe0e2" strokeWidth="1.2" fill="none" opacity="0.3">
        {[60, 200, 360].map((y, i) => <path key={i} d={`M60 ${y} q14 -6 28 0 q14 6 28 0`} />)}
      </g>
      <text x="120" y="250" textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize="13" fill="#2e5560" fontStyle="italic" opacity="0.7" transform="rotate(-90 120 250)">Océan Atlantique</text>
      <text x="470" y="410" textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize="12" fill="#2e5560" fontStyle="italic" opacity="0.7">Méditerranée</text>

      {/* ═══ LA FRANCE (hexagone reconnaissable) ═══ */}
      {/* Manche au nord, Bretagne à l'ouest, Méditerranée au sud-est, Pyrénées au sud */}
      <path d="M360 70 L430 84 Q470 96 486 132 L520 170 Q516 210 486 226 L470 300 Q446 344 396 350 L300 342 Q250 348 224 320 L214 250 Q236 236 250 250 L232 214 Q210 196 244 190 Q286 184 300 156 Q286 128 320 118 Q300 96 336 96 Z" fill="url(#c6-land)" />
      <path d="M360 70 L430 84 Q470 96 486 132 L520 170 Q516 210 486 226 L470 300 Q446 344 396 350 L300 342 Q250 348 224 320 L214 250 Q236 236 250 250 L232 214 Q210 196 244 190 Q286 184 300 156 Q286 128 320 118 Q300 96 336 96 Z" fill="#8a6a3a" opacity="0.12" filter="url(#c6-grain)" />
      {/* Corse */}
      <path d="M512 316 q8 -6 10 6 q0 14 -8 16 q-8 -2 -6 -14 Z" fill="url(#c6-land)" />
      <text x="300" y="240" textAnchor="middle" fontFamily="'Cinzel',Palatino,serif" fontSize="20" fill="#6a4a24" fontStyle="italic" opacity="0.55" letterSpacing="2">FRANCE</text>
      {/* Alpes (est) + Pyrénées (sud) en chevrons */}
      <g stroke="#8a6a42" strokeWidth="2" fill="none" opacity="0.5">
        {[[470, 210], [486, 232], [250, 328], [284, 334], [318, 330]].map(([x, y], i) => <path key={i} d={`M${x - 9} ${y + 10} L${x} ${y} L${x + 9} ${y + 10}`} />)}
      </g>

      {/* la ligne Chappe Paris ↔ Nord (vers Lille/Condé) */}
      <path d="M372 168 L404 96" fill="none" stroke="#7a3020" strokeWidth="2.4" strokeDasharray="2 5" strokeLinecap="round" opacity="0.8" />
      {/* le trajet du chapitre */}
      <path d={`M${LIEUX[0].x} ${LIEUX[0].y} L${LIEUX[1].x} ${LIEUX[1].y} L${LIEUX[2].x} ${LIEUX[2].y}`}
        fill="none" stroke="#9a5a2e" strokeWidth="2.5" strokeDasharray="3 7" strokeLinecap="round" opacity="0.5" />

      {LIEUX.map((l) => {
        const ici = l.tab === tab;
        return (
          <g key={l.tab}>
            {ici && <circle cx={l.x} cy={l.y} r="26" fill="url(#c6-glow)" style={{ animation: "glow 2s ease-in-out infinite" }} />}
            <circle cx={l.x} cy={l.y} r={ici ? 8 : 5.5} fill={ici ? "#e8542e" : "#7a3a24"} stroke="#3a2410" strokeWidth="2" />
            {ici && <circle cx={l.x} cy={l.y} r="13" fill="none" stroke="#e8542e" strokeWidth="2" style={{ animation: "pulse 1.6s ease-in-out infinite" }} />}
            <text x={l.x} y={l.y - (ici ? 20 : 13)} textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize={ici ? 16 : 13} fontWeight={ici ? 700 : 400} fill="#2e2414">{l.nom}</text>
            <text x={l.x} y={l.y + (ici ? 28 : 21)} textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9.5" fill="#5a3f24" opacity="0.9">{l.sous}</text>
            {ici && <text x={l.x} y={l.y + 42} textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10.5" fill="#e8542e" fontWeight="700">◉ tu es ici</text>}
          </g>
        );
      })}

      <g transform="translate(650,392)" opacity="0.7">
        <circle r="16" fill="none" stroke="#e8d5a8" strokeWidth="1.4" />
        <path d="M0 -16 L4 0 L0 16 L-4 0 Z" fill="#9a5a2e" /><path d="M-16 0 L0 -4 L16 0 L0 4 Z" fill="#e8d5a8" />
        <text x="0" y="-19" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#e8d5a8">N</text>
      </g>
    </svg>
  );
}
