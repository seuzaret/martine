/* ============================================================
   CHAPITRE 7 — Carte : l'Atlantique Nord (côtes reconnaissables)
   Amérique du Nord (côte est, Floride, Terre-Neuve) et Europe de
   l'Ouest (îles Britanniques, France, Ibérie), le câble sous-marin
   Terre-Neuve ↔ Irlande, et le point du SOS du Titanic.
   ============================================================ */

const LIEUX = [
  { tab: 0, nom: "Télégraphe", sous: "Far West → New York", x: 214, y: 250 },
  { tab: 2, nom: "TSF · SOS", sous: "le Titanic", x: 322, y: 170 },
  { tab: 1, nom: "Câble", sous: "sous l'océan", x: 380, y: 186 },
];

export default function CarteXIXe({ tab = 0 }) {
  return (
    <svg viewBox="0 0 700 440" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <linearGradient id="c7-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8fb8c0" /><stop offset="100%" stopColor="#5f8b98" /></linearGradient>
        <linearGradient id="c7-land" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#cdb680" /><stop offset="100%" stopColor="#b49a64" /></linearGradient>
        <radialGradient id="c7-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffd166" stopOpacity="0.9" /><stop offset="100%" stopColor="#ffd166" stopOpacity="0" /></radialGradient>
        <filter id="c7-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.32 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* ═══ l'océan ═══ */}
      <rect width="700" height="440" fill="url(#c7-sea)" />
      <g stroke="#cfe0e2" strokeWidth="1.3" fill="none" opacity="0.35">
        {[90, 160, 230, 300, 370].map((y, i) => <path key={i} d={`M300 ${y} q16 -6 32 0 q16 6 32 0 q16 -6 32 0`} />)}
      </g>
      <text x="350" y="360" textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize="16" fill="#2e5560" fontStyle="italic" opacity="0.7">Océan Atlantique</text>

      {/* ═══ AMÉRIQUE DU NORD (côte est reconnaissable + Floride) ═══ */}
      <path d="M0 0 L0 440 L150 440 L176 388 Q196 350 200 316 L214 316 Q222 348 214 372 L226 372 Q244 318 232 268 Q224 236 200 222 Q182 210 206 196 Q232 186 236 158 Q240 132 210 120 Q184 110 150 118 Q120 40 150 0 Z" fill="url(#c7-land)" />
      <path d="M0 0 L0 440 L150 440 L176 388 Q196 350 200 316 L214 316 Q222 348 214 372 L226 372 Q244 318 232 268 Q224 236 200 222 Q182 210 206 196 Q232 186 236 158 Q240 132 210 120 Q184 110 150 118 Q120 40 150 0 Z" fill="#8a6a3a" opacity="0.13" filter="url(#c7-grain)" />
      {/* Terre-Neuve (île détachée) */}
      <path d="M244 150 q18 -6 26 8 q4 12 -10 16 q-16 2 -18 -12 Z" fill="url(#c7-land)" />
      <text x="86" y="150" textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize="18" fill="#6a4a24" fontStyle="italic" opacity="0.8">Amérique</text>
      <text x="262" y="140" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#5a3f24" opacity="0.8">Terre-Neuve</text>
      <g stroke="#8a6a42" strokeWidth="2" fill="none" opacity="0.45">
        {[[60, 250], [88, 244], [116, 252]].map(([x, y], i) => <path key={i} d={`M${x - 10} ${y + 11} L${x} ${y} L${x + 10} ${y + 11}`} />)}
      </g>

      {/* ═══ EUROPE DE L'OUEST (Ibérie, France, Îles Britanniques) ═══ */}
      {/* continent : Ibérie + France + Scandinavie */}
      <path d="M700 440 L700 0 L560 0 Q540 40 556 78 Q568 108 548 130 L560 150 Q548 176 556 202 L536 214 Q520 240 540 262 Q552 286 520 300 Q500 310 520 330 L500 360 Q506 400 540 440 Z" fill="url(#c7-land)" />
      <path d="M700 440 L700 0 L560 0 Q540 40 556 78 Q568 108 548 130 L560 150 Q548 176 556 202 L536 214 Q520 240 540 262 Q552 286 520 300 Q500 310 520 330 L500 360 Q506 400 540 440 Z" fill="#8a6a3a" opacity="0.13" filter="url(#c7-grain)" />
      {/* Îles Britanniques */}
      <path d="M496 150 q14 -10 20 4 q4 16 -10 20 q-16 0 -18 -12 q-2 -8 8 -12 Z" fill="url(#c7-land)" />
      <path d="M474 176 q8 -4 10 6 q0 8 -8 8 q-8 -2 -6 -10 Z" fill="url(#c7-land)" />
      <text x="618" y="150" textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize="18" fill="#6a4a24" fontStyle="italic" opacity="0.8">Europe</text>
      <text x="512" y="132" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7.5" fill="#5a3f24" opacity="0.8">Irlande · G.-B.</text>

      {/* ═══ le CÂBLE sous-marin (Terre-Neuve ↔ Irlande) ═══ */}
      <path d="M256 158 Q368 210 486 168" fill="none" stroke="#7a3020" strokeWidth="3" strokeDasharray="2 6" strokeLinecap="round" opacity="0.85" />

      {/* ═══ le trajet du voyage (pointillés) ═══ */}
      <path d={`M${LIEUX[0].x} ${LIEUX[0].y} L${LIEUX[2].x} ${LIEUX[2].y} L${LIEUX[1].x} ${LIEUX[1].y}`}
        fill="none" stroke="#9a5a2e" strokeWidth="2.5" strokeDasharray="3 7" strokeLinecap="round" opacity="0.55" />

      {/* ═══ les 3 lieux ═══ */}
      {LIEUX.map((l) => {
        const ici = l.tab === tab;
        return (
          <g key={l.tab}>
            {ici && <circle cx={l.x} cy={l.y} r="28" fill="url(#c7-glow)" style={{ animation: "glow 2s ease-in-out infinite" }} />}
            <circle cx={l.x} cy={l.y} r={ici ? 9 : 6} fill={ici ? "#e8542e" : "#7a3a24"} stroke="#3a2410" strokeWidth="2" />
            {ici && <circle cx={l.x} cy={l.y} r="14" fill="none" stroke="#e8542e" strokeWidth="2" style={{ animation: "pulse 1.6s ease-in-out infinite" }} />}
            <text x={l.x} y={l.y - (ici ? 22 : 14)} textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize={ici ? 16 : 13} fontWeight={ici ? 700 : 400} fill="#22343a">{l.nom}</text>
            <text x={l.x} y={l.y + (ici ? 30 : 22)} textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9.5" fill="#22343a" opacity="0.85">{l.sous}</text>
            {ici && <text x={l.x} y={l.y + 44} textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10.5" fill="#e8542e" fontWeight="700">◉ tu es ici</text>}
          </g>
        );
      })}

      {/* rose des vents */}
      <g transform="translate(652,388)" opacity="0.7">
        <circle r="16" fill="none" stroke="#e8d5a8" strokeWidth="1.4" />
        <path d="M0 -16 L4 0 L0 16 L-4 0 Z" fill="#9a5a2e" /><path d="M-16 0 L0 -4 L16 0 L0 4 Z" fill="#e8d5a8" />
        <text x="0" y="-19" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#e8d5a8">N</text>
      </g>
    </svg>
  );
}
