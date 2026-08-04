/* ============================================================
   CHAPITRE 4 — Carte : plan de la villa de Caius (Pompéi)
   Les 3 tableaux sont trois pièces d'une même villa romaine :
   l'ENTRÉE (vestibule + atrium), la BIBLIOTHÈQUE (tablinum) et
   le JARDIN (péristyle). Un petit encart situe Pompéi au pied
   du Vésuve, sur la baie de Naples.
   ============================================================ */

const LIEUX = [
  { tab: 0, nom: "Entrée", sous: "atrium", x: 350, y: 336 },
  { tab: 1, nom: "Bibliothèque", sous: "tablinum", x: 350, y: 232 },
  { tab: 2, nom: "Jardin", sous: "péristyle", x: 350, y: 128 },
];

export default function CarteAntiquite({ tab = 0 }) {
  return (
    <svg viewBox="0 0 700 440" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <linearGradient id="c4-parch" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e8d5a8" /><stop offset="100%" stopColor="#d2b884" /></linearGradient>
        <radialGradient id="c4-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffd166" stopOpacity="0.9" /><stop offset="100%" stopColor="#ffd166" stopOpacity="0" /></radialGradient>
        <filter id="c4-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      <rect width="700" height="440" fill="url(#c4-parch)" />
      <rect width="700" height="440" fill="#8a6a3a" opacity="0.14" filter="url(#c4-grain)" />

      {/* ═══ le PLAN de la villa (mosaïque au sol) ═══ */}
      <g transform="translate(0,0)">
        {/* sol général */}
        <rect x="212" y="56" width="276" height="360" fill="#d8c39a" stroke="#8a6a3a" strokeWidth="4" />
        {/* murs séparant les 3 zones */}
        <path d="M212 180 h276 M212 288 h276" stroke="#8a6a3a" strokeWidth="4" />

        {/* JARDIN (péristyle) en haut : colonnes autour d'un jardin */}
        <rect x="238" y="80" width="224" height="80" fill="#bcd0a0" opacity="0.6" />
        {[248, 300, 352, 404, 452].map((x, i) => <circle key={i} cx={x} cy={90} r="5" fill="#efe6ce" stroke="#8a6a3a" strokeWidth="1.4" />)}
        {[248, 300, 352, 404, 452].map((x, i) => <circle key={`b${i}`} cx={x} cy={150} r="5" fill="#efe6ce" stroke="#8a6a3a" strokeWidth="1.4" />)}
        {/* arbustes */}
        {[300, 352, 404].map((x, i) => <circle key={i} cx={x} cy={120} r="9" fill="#6a8a4a" />)}

        {/* BIBLIOTHÈQUE (tablinum) au milieu : casiers à rouleaux */}
        {[232, 288, 344].map((y, r) => [252, 274, 296, 404, 426, 448].map((x, c) => (
          <rect key={`${r}-${c}`} x={x} y={y - 24} width="14" height="14" fill="#c8a860" stroke="#8a6a3a" strokeWidth="1" opacity="0.7" />
        )))}
        <rect x="330" y="196" width="40" height="56" fill="#e8dcc0" stroke="#8a6a3a" strokeWidth="1.4" opacity="0.5" />

        {/* ENTRÉE (atrium) en bas : impluvium (bassin) + porte */}
        <rect x="316" y="316" width="68" height="40" fill="#8fb8c0" stroke="#8a6a3a" strokeWidth="2" />
        <path d="M330 416 h40 v-6 h-40 Z" fill="#6a4a2a" />
        <text x="350" y="410" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill="#7a5a30" opacity="0.8">rue</text>
      </g>

      {/* ═══ encart : Pompéi au pied du Vésuve (baie de Naples) ═══ */}
      <g transform="translate(70,300)">
        <rect x="-56" y="-40" width="120" height="96" fill="#e8d5a8" stroke="#8a6a3a" strokeWidth="2" />
        <rect x="-56" y="-40" width="120" height="30" fill="#8fb8c0" opacity="0.5" />
        <text x="4" y="-28" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7" fill="#2e5560" opacity="0.8">baie de Naples</text>
        {/* Vésuve */}
        <path d="M-6 40 L18 -6 L42 40 Z" fill="#8a6a4a" />
        <path d="M12 -3 q6 -3 12 0 l-3 5 q-3 -2 -6 0 Z" fill="#c85a2a" />
        <path d="M18 -8 q-4 -10 4 -16" stroke="#c8c0b6" strokeWidth="3" fill="none" opacity="0.5" />
        <text x="18" y="52" textAnchor="middle" fontFamily="Palatino,serif" fontSize="8" fill="#6a4a24">Vésuve</text>
        {/* Pompéi */}
        <circle cx="-30" cy="34" r="3" fill="#e8542e" /><text x="-30" y="26" textAnchor="middle" fontFamily="Palatino,serif" fontSize="8" fill="#7a2418" fontWeight="700">Pompéi</text>
      </g>

      {/* titre */}
      <text x="350" y="40" textAnchor="middle" fontFamily="'Cinzel',Palatino,serif" fontSize="17" fill="#6a4a24" letterSpacing="1">VILLA DE CAIUS · POMPÉI</text>

      {/* ═══ les 3 pièces ═══ */}
      {LIEUX.map((l) => {
        const ici = l.tab === tab;
        return (
          <g key={l.tab}>
            {ici && <circle cx={l.x} cy={l.y} r="30" fill="url(#c4-glow)" style={{ animation: "glow 2s ease-in-out infinite" }} />}
            <circle cx={l.x} cy={l.y} r={ici ? 9 : 6} fill={ici ? "#e8542e" : "#8a6a3a"} stroke="#3a2410" strokeWidth="2" />
            {ici && <circle cx={l.x} cy={l.y} r="14" fill="none" stroke="#e8542e" strokeWidth="2" style={{ animation: "pulse 1.6s ease-in-out infinite" }} />}
            <text x={l.x} y={l.y - (ici ? 22 : 15)} textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize={ici ? 16 : 13} fontWeight={ici ? 700 : 400} fill="#3a2410">{l.nom}</text>
            <text x={l.x} y={l.y + (ici ? 30 : 22)} textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9.5" fill="#7a5a30" opacity="0.85">{l.sous}</text>
            {ici && <text x={l.x} y={l.y + 44} textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10.5" fill="#e8542e" fontWeight="700">◉ tu es ici</text>}
          </g>
        );
      })}
    </svg>
  );
}
