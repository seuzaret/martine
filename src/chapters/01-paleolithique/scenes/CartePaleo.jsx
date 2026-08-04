/* ============================================================
   CHAPITRE 1 — Carte de la vallée (façon tracé sur paroi, à l'ocre)
   Un plan local gravé sur la roche : la GROTTE (au fond et devant
   — tableaux 1 & 2), le CAMPEMENT et la RIVIÈRE. Pas une région
   réelle : le petit territoire d'un clan du Paléolithique.
   ============================================================ */

const LIEUX = [
  { tabs: [0, 1], nom: "La grotte", sous: "fond & entrée", x: 190, y: 200 },
  { tab: 2, nom: "Le campement", sous: "le feu", x: 430, y: 300 },
  { tab: 3, nom: "La rivière", sous: "le gué", x: 540, y: 176 },
];

export default function CartePaleo({ tab = 0 }) {
  const isHere = (l) => (l.tabs ? l.tabs.includes(tab) : l.tab === tab);
  return (
    <svg viewBox="0 0 700 440" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <linearGradient id="c1-rock" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4a4038" /><stop offset="100%" stopColor="#332a24" /></linearGradient>
        <radialGradient id="c1-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffcf78" stopOpacity="0.8" /><stop offset="100%" stopColor="#ffcf78" stopOpacity="0" /></radialGradient>
        <filter id="c1-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* paroi de roche */}
      <rect width="700" height="440" fill="url(#c1-rock)" />
      <rect width="700" height="440" fill="#1c140e" opacity="0.35" filter="url(#c1-grain)" />
      <rect width="700" height="440" fill="#e8c088" opacity="0.05" filter="url(#c1-grain)" />

      {/* la RIVIÈRE tracée à l'ocre bleutée */}
      <path d="M540 40 Q520 120 540 176 Q560 240 480 300 Q400 350 300 360 Q180 370 90 420" fill="none" stroke="#6a90a0" strokeWidth="7" strokeLinecap="round" opacity="0.7" />
      <path d="M540 40 Q520 120 540 176 Q560 240 480 300 Q400 350 300 360 Q180 370 90 420" fill="none" stroke="#a8c8d0" strokeWidth="2" strokeLinecap="round" opacity="0.4" />

      {/* le relief (collines, à l'ocre) */}
      <g stroke="#b07a3a" strokeWidth="2.5" fill="none" opacity="0.55">
        <path d="M80 260 q40 -40 90 0 q40 30 90 -6" />
        <path d="M600 300 q-30 -30 -70 0" />
      </g>
      {/* une bête peinte (bison stylisé) pour l'ambiance rupestre */}
      <g transform="translate(340,120)" opacity="0.4" fill="none" stroke="#8a3a24" strokeWidth="3" strokeLinecap="round">
        <path d="M-30 6 Q-34 -14 -14 -16 L20 -14 Q34 -12 32 4 Q30 14 18 14 L-18 12 Q-30 12 -30 6 Z" />
        <path d="M26 -10 q10 -4 14 -14 M-30 4 q-8 6 -6 16" />
      </g>

      {/* la GROTTE : une bouche noire dans la falaise */}
      <g transform="translate(190,200)">
        <path d="M-40 20 Q-46 -30 0 -34 Q46 -30 40 20 Z" fill="#5a4c40" stroke="#7a5a3a" strokeWidth="2" />
        <path d="M-22 20 Q-26 -10 0 -12 Q26 -10 22 20 Z" fill="#160f0a" />
      </g>
      {/* le CAMPEMENT : deux huttes + un feu */}
      <g transform="translate(430,300)">
        <path d="M-30 10 L-18 -14 L-6 10 Z" fill="#6a4c30" stroke="#3a2818" strokeWidth="1.4" />
        <path d="M2 10 L14 -12 L26 10 Z" fill="#6a4c30" stroke="#3a2818" strokeWidth="1.4" />
        <g transform="translate(-2,14)"><path d="M-4 0 q4 -10 0 -16 q6 8 4 16 Z" fill="#e8963a" style={{ animation: "glow 1.6s ease-in-out infinite" }} /></g>
      </g>
      {/* le GUÉ : pierres dans la rivière */}
      <g transform="translate(540,176)">
        {[[-10, 0], [2, 6], [12, -2]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="6" ry="3.4" fill="#8a8478" />)}
      </g>

      {/* titre gravé */}
      <text x="350" y="42" textAnchor="middle" fontFamily="'Cinzel',Palatino,serif" fontSize="15" fill="#c8945a" letterSpacing="2" opacity="0.85">NOTRE VALLÉE</text>

      {LIEUX.map((l, k) => {
        const ici = isHere(l);
        return (
          <g key={k}>
            {ici && <circle cx={l.x} cy={l.y} r="34" fill="url(#c1-glow)" style={{ animation: "glow 2s ease-in-out infinite" }} />}
            {ici && <circle cx={l.x} cy={l.y} r="26" fill="none" stroke="#ffcf78" strokeWidth="2.5" style={{ animation: "pulse 1.6s ease-in-out infinite" }} />}
            <text x={l.x} y={l.y + 40} textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize={ici ? 16 : 13} fontWeight={ici ? 700 : 400} fill="#efe0c4">{l.nom}</text>
            <text x={l.x} y={l.y + 54} textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9.5" fill="#c8a878" opacity="0.85">{l.sous}</text>
            {ici && <text x={l.x} y={l.y - 30} textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10.5" fill="#ffcf78" fontWeight="700">◉ tu es ici</text>}
          </g>
        );
      })}
    </svg>
  );
}
