/* ============================================================
   CHAPITRE 7 — Carte régionale : l'Atlantique Nord
   Montre les 3 étapes du chapitre sur une carte « parchemin » :
   l'Amérique (le télégraphe du Far West → New York), le CÂBLE
   sous-marin qui traverse l'océan, et le point du SOS (TSF) en
   plein Atlantique. Le lieu courant (tab) brille.
   ============================================================ */

const LIEUX = [
  { tab: 0, nom: "Télégraphe", sous: "Far West → New York", x: 170, y: 258 },
  { tab: 2, nom: "TSF · SOS", sous: "le Titanic", x: 322, y: 120 },
  { tab: 1, nom: "Câble", sous: "sous l'océan", x: 380, y: 176 },
];

export default function CarteXIXe({ tab = 0 }) {
  return (
    <svg viewBox="0 0 700 440" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <linearGradient id="c7-parch" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e8d5a8" /><stop offset="100%" stopColor="#d2b884" /></linearGradient>
        <linearGradient id="c7-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8fb8c0" /><stop offset="100%" stopColor="#5f8b98" /></linearGradient>
        <linearGradient id="c7-land" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#cdb680" /><stop offset="100%" stopColor="#b49a64" /></linearGradient>
        <radialGradient id="c7-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffd166" stopOpacity="0.9" /><stop offset="100%" stopColor="#ffd166" stopOpacity="0" /></radialGradient>
        <filter id="c7-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* parchemin */}
      <rect width="700" height="440" fill="url(#c7-parch)" />

      {/* ═══ l'OCÉAN ATLANTIQUE (au milieu) ═══ */}
      <rect width="700" height="440" fill="url(#c7-sea)" />
      {/* petites vagues */}
      <g stroke="#cfe0e2" strokeWidth="1.4" fill="none" opacity="0.4">
        {[70, 150, 230, 310, 390].map((y, i) => <path key={i} d={`M300 ${y} q18 -7 36 0 q18 7 36 0 q18 -7 36 0`} />)}
      </g>
      <text x="360" y="330" textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize="17" fill="#2e5560" fontStyle="italic" opacity="0.75">Océan Atlantique</text>

      {/* ═══ AMÉRIQUE (à gauche) ═══ */}
      <path d="M0 0 L250 0 Q262 60 236 118 Q214 168 250 214 Q276 250 250 300 Q228 350 258 400 Q266 424 250 440 L0 440 Z" fill="url(#c7-land)" />
      <path d="M0 0 L250 0 Q262 60 236 118 Q214 168 250 214 Q276 250 250 300 Q228 350 258 400 Q266 424 250 440 L0 440 Z" fill="#8a6a3a" opacity="0.14" filter="url(#c7-grain)" />
      <text x="110" y="150" textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize="19" fill="#6a4a24" fontStyle="italic" opacity="0.8">Amérique</text>
      {/* montagnes de l'Ouest (chevrons) */}
      <g stroke="#8a6a42" strokeWidth="2" fill="none" opacity="0.5">
        {[[60, 250], [88, 244], [116, 252], [70, 300], [100, 296]].map(([x, y], i) => <path key={i} d={`M${x - 11} ${y + 12} L${x} ${y} L${x + 11} ${y + 12}`} />)}
      </g>

      {/* ═══ EUROPE (à droite) ═══ */}
      <path d="M700 0 L470 0 Q456 70 486 120 Q510 160 480 210 Q456 250 486 300 Q512 350 484 400 Q474 424 490 440 L700 440 Z" fill="url(#c7-land)" />
      <path d="M700 0 L470 0 Q456 70 486 120 Q510 160 480 210 Q456 250 486 300 Q512 350 484 400 Q474 424 490 440 L700 440 Z" fill="#8a6a3a" opacity="0.14" filter="url(#c7-grain)" />
      <text x="600" y="150" textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize="19" fill="#6a4a24" fontStyle="italic" opacity="0.8">Europe</text>

      {/* ═══ le CÂBLE sous-marin (Amérique ↔ Europe) ═══ */}
      <path d="M244 186 Q360 210 486 168" fill="none" stroke="#7a3020" strokeWidth="3.5" strokeDasharray="2 6" strokeLinecap="round" opacity="0.85" />

      {/* ═══ le trajet du voyage (pointillés) ═══ */}
      <path d={`M${LIEUX[0].x} ${LIEUX[0].y} L${LIEUX[2].x} ${LIEUX[2].y} L${LIEUX[1].x} ${LIEUX[1].y}`}
        fill="none" stroke="#9a5a2e" strokeWidth="2.5" strokeDasharray="3 7" strokeLinecap="round" opacity="0.6" />

      {/* ═══ les 3 lieux ═══ */}
      {LIEUX.map((l) => {
        const ici = l.tab === tab;
        return (
          <g key={l.tab}>
            {ici && <circle cx={l.x} cy={l.y} r="30" fill="url(#c7-glow)" style={{ animation: "glow 2s ease-in-out infinite" }} />}
            <circle cx={l.x} cy={l.y} r={ici ? 9 : 6} fill={ici ? "#e8542e" : "#7a5a2e"} stroke="#3a2410" strokeWidth="2" />
            {ici && <circle cx={l.x} cy={l.y} r="14" fill="none" stroke="#e8542e" strokeWidth="2" style={{ animation: "pulse 1.6s ease-in-out infinite" }} />}
            <text x={l.x} y={l.y - (ici ? 22 : 14)} textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize={ici ? 17 : 14} fontWeight={ici ? 700 : 400} fill="#2e4850">{l.nom}</text>
            <text x={l.x} y={l.y + (ici ? 30 : 22)} textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fill="#2e4850" opacity="0.85">{l.sous}</text>
            {ici && <text x={l.x} y={l.y + 44} textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="11" fill="#e8542e" fontWeight="700">◉ tu es ici</text>}
          </g>
        );
      })}

      {/* rose des vents */}
      <g transform="translate(650,388)" opacity="0.75">
        <circle r="18" fill="none" stroke="#e8d5a8" strokeWidth="1.5" />
        <path d="M0 -18 L4 0 L0 18 L-4 0 Z" fill="#9a5a2e" />
        <path d="M-18 0 L0 -4 L18 0 L0 4 Z" fill="#e8d5a8" />
        <text x="0" y="-22" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill="#e8d5a8">N</text>
      </g>
    </svg>
  );
}
