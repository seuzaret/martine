/* ============================================================
   CHAPITRE 2 — Carte du pays néolithique
   La CITÉ (sa muraille, le trône, les artisans — tableaux 1 à 3),
   la PLAINE aux mégalithes, et la MONTAGNE où l'on extrait le
   cuivre. Un petit pays imaginaire du Néolithique.
   ============================================================ */

const LIEUX = [
  { tabs: [0, 1, 2], nom: "La cité", sous: "murs & artisans", x: 210, y: 260 },
  { tab: 3, nom: "La plaine", sous: "les mégalithes", x: 452, y: 176 },
  { tab: 4, nom: "La montagne", sous: "mine de cuivre", x: 556, y: 316 },
];

export default function CarteNeolithique({ tab = 0 }) {
  const isHere = (l) => (l.tabs ? l.tabs.includes(tab) : l.tab === tab);
  return (
    <svg viewBox="0 0 700 440" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <linearGradient id="c2-land" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#cbb884" /><stop offset="100%" stopColor="#a89058" /></linearGradient>
        <radialGradient id="c2-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffd166" stopOpacity="0.9" /><stop offset="100%" stopColor="#ffd166" stopOpacity="0" /></radialGradient>
        <filter id="c2-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      <rect width="700" height="440" fill="url(#c2-land)" />
      <rect width="700" height="440" fill="#8a6a3a" opacity="0.12" filter="url(#c2-grain)" />

      {/* prairies + champs cultivés */}
      <g fill="#9aae66" opacity="0.5"><path d="M40 300 q80 -40 180 -10 q100 30 220 -6 q100 -30 200 8 L640 400 L40 400 Z" /></g>
      <g stroke="#8a7a3a" strokeWidth="1.4" opacity="0.4">{[330, 360].map((y, i) => <path key={i} d={`M120 ${y} h180`} />)}</g>

      {/* une rivière */}
      <path d="M300 30 Q330 140 300 240 Q272 330 340 410" fill="none" stroke="#7fa8c0" strokeWidth="8" strokeLinecap="round" opacity="0.75" />

      {/* chemins */}
      <path d="M210 260 Q330 200 452 176 M210 260 Q380 300 556 316"
        fill="none" stroke="#8a6a3a" strokeWidth="2.2" strokeDasharray="3 6" strokeLinecap="round" opacity="0.55" />

      {/* ═══ vignettes ═══ */}
      {/* la cité fortifiée */}
      <g transform="translate(210,260)">
        <path d="M-38 14 h76 v-20 h-76 Z" fill="#c2b088" stroke="#5a4a30" strokeWidth="1.6" />
        {[-38, -24, -10, 4, 18, 32].map((x, i) => <rect key={i} x={x} y="-12" width="8" height="8" fill="#c2b088" stroke="#5a4a30" strokeWidth="1" />)}
        {/* huttes dedans */}
        {[-16, 6].map((x, i) => <g key={i} transform={`translate(${x},0)`}><path d="M-6 8 L0 -4 L6 8 Z" fill="#8a6a3a" /></g>)}
      </g>
      {/* la plaine aux mégalithes (pierres levées) */}
      <g transform="translate(452,176)">
        {[-24, -8, 8, 24].map((x, i) => <rect key={i} x={x - 3} y={-14} width="6" height="22" rx="2" fill="#9a9488" stroke="#5a5348" strokeWidth="1.2" />)}
        <rect x="-30" y="-18" width="18" height="5" rx="1" fill="#9a9488" stroke="#5a5348" strokeWidth="1" />
      </g>
      {/* la montagne + entrée de mine */}
      <g transform="translate(556,316)">
        <path d="M-34 20 L-6 -30 L22 20 Z" fill="#8a8072" stroke="#4a4438" strokeWidth="1.6" />
        <path d="M-6 -30 L6 -6 L-14 6 Z" fill="#a89a86" opacity="0.7" />
        <path d="M-8 20 q-2 -14 8 -16 q10 2 8 16 Z" fill="#2a2018" />
        {/* filon de cuivre */}
        <path d="M-2 4 l6 -4 l-2 8" stroke="#c87a3a" strokeWidth="2" fill="none" />
      </g>

      <text x="350" y="42" textAnchor="middle" fontFamily="'Cinzel',Palatino,serif" fontSize="16" fill="#6a4a24" letterSpacing="1" opacity="0.75">NOTRE PAYS</text>

      {LIEUX.map((l, k) => {
        const ici = isHere(l);
        return (
          <g key={k}>
            {ici && <circle cx={l.x} cy={l.y} r="34" fill="url(#c2-glow)" style={{ animation: "glow 2s ease-in-out infinite" }} />}
            {ici && <circle cx={l.x} cy={l.y} r="26" fill="none" stroke="#e8542e" strokeWidth="2.5" style={{ animation: "pulse 1.6s ease-in-out infinite" }} />}
            <text x={l.x} y={l.y + 40} textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize={ici ? 16 : 13} fontWeight={ici ? 700 : 400} fill="#3a2410">{l.nom}</text>
            <text x={l.x} y={l.y + 54} textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9.5" fill="#7a5a30" opacity="0.85">{l.sous}</text>
            {ici && <text x={l.x} y={l.y - 30} textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10.5" fill="#e8542e" fontWeight="700">◉ tu es ici</text>}
          </g>
        );
      })}
    </svg>
  );
}
