import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 2 · Tableau 1 — La porte de la cité  (PEINTURE FINE)
   Aube méditerranéenne : la mer à gauche, la cité aux toits blancs
   sur sa colline, la palissade de bois et sa porte gardée par Guna.
   Un coquillage brille sur la grève mouillée.
   ============================================================ */

export default function SceneMuraille({ collect, action, reveal, queteQui }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="mu-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#26386c" /><stop offset="30%" stopColor="#5a6a9c" /><stop offset="58%" stopColor="#b89ca8" /><stop offset="80%" stopColor="#f0c090" /><stop offset="100%" stopColor="#ffe6b0" />
        </linearGradient>
        <radialGradient id="mu-sun" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#fff6dc" /><stop offset="45%" stopColor="#ffe0a4" stopOpacity="0.7" /><stop offset="100%" stopColor="#ffe0a0" stopOpacity="0" /></radialGradient>
        <linearGradient id="mu-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c8b490" /><stop offset="34%" stopColor="#8a94a0" /><stop offset="100%" stopColor="#4c5a68" /></linearGradient>
        <linearGradient id="mu-wood" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#4a3322" /><stop offset="50%" stopColor="#7a5636" /><stop offset="100%" stopColor="#2e2014" /></linearGradient>
        <linearGradient id="mu-sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c2a878" /><stop offset="100%" stopColor="#7a6040" /></linearGradient>
        <linearGradient id="mu-house" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#efe8da" /><stop offset="100%" stopColor="#cbbfa6" /></linearGradient>
        <filter id="mu-blur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="8" /></filter>
        <filter id="mu-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.55 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="mu-mottle" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* ═══ ciel d'aube ═══ */}
      <rect width="1000" height="560" fill="url(#mu-sky)" />
      {[[520, 40, 0.3], [660, 66, 0.28], [200, 54, 0.32], [820, 44, 0.3]].map(([x, y, o], i) => (
        <circle key={i} cx={x} cy={y} r="1.2" fill="#fff" opacity={o} style={{ animation: `twinkle ${3 + i}s infinite` }} />
      ))}
      {/* le soleil, bas sur la mer */}
      <circle cx="150" cy="240" r="150" fill="url(#mu-sun)" />
      <circle cx="150" cy="240" r="34" fill="#fff8e2" />
      {/* nuées étirées du matin */}
      <g filter="url(#mu-blur)">
        <ellipse cx="420" cy="120" rx="170" ry="10" fill="#f0b8a0" opacity="0.4" />
        <ellipse cx="720" cy="150" rx="140" ry="8" fill="#e8a88c" opacity="0.3" />
      </g>

      {/* ═══ couche lointaine : la mer + la cité blanche sur sa colline ═══ */}
      <PLayer depth={1}>
        {/* la mer, à gauche */}
        <path d="M0 300 L360 300 L360 372 L0 372 Z" fill="url(#mu-sea)" />
        {/* chemin doré du soleil sur l'eau */}
        <path d="M90 306 L210 306 L250 368 L60 368 Z" fill="#ffe0a0" opacity="0.28" />
        {[314, 330, 346, 360].map((y, i) => <path key={i} d={`M0 ${y} q40 ${i % 2 ? 3 : -3} 80 0 t80 0 t80 0 t80 0`} stroke="#d8dce0" strokeWidth="1.4" fill="none" opacity="0.4" />)}
        {/* une barque au loin */}
        <path d="M240 344 q14 6 28 0 l-4 8 l-20 0 Z" fill="#3a3428" opacity="0.7" />
        <path d="M254 344 l0 -14" stroke="#3a3428" strokeWidth="1.4" opacity="0.7" />
        {/* colline + toits blancs de la cité, derrière la muraille */}
        <path d="M330 320 Q560 288 780 316 Q900 330 1000 314 L1000 372 L330 372 Z" fill="#9a8a5e" />
        {[[440, 268, 0.9], [512, 254, 1.05], [590, 268, 0.85], [668, 258, 1.0], [742, 272, 0.9], [812, 262, 0.8]].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x},${y}) scale(${s})`}>
            <rect x="-26" y="0" width="52" height="60" fill="url(#mu-house)" />
            <rect x="-26" y="0" width="52" height="60" fill="#8a7a56" opacity="0.12" filter="url(#mu-grain)" />
            <rect x="-26" y="0" width="52" height="8" fill="#d8cfb8" />
            <path d="M-26 0 h52" stroke="#e8e0cc" strokeWidth="1.5" opacity="0.6" />
            <rect x="-9" y="30" width="18" height="30" fill="#3a2c1c" />
            {/* échelle sur le toit (Çatalhöyük) */}
            <path d="M-18 0 l4 -13 M-12 0 l4 -13 M-17 -3 h5 M-16 -7 h5" stroke="#a89060" strokeWidth="1.1" opacity="0.7" />
          </g>
        ))}
      </PLayer>

      {/* ═══ couche intermédiaire : la palissade de bois + la porte ═══ */}
      <PLayer depth={2}>
        {/* remblai de terre au pied du mur */}
        <path d="M330 372 Q640 356 1000 368 L1000 430 L330 430 Z" fill="#8a6e46" />
        <path d="M330 372 Q640 356 1000 368 L1000 430 L330 430 Z" fill="#3a2c18" opacity="0.28" filter="url(#mu-mottle)" />
        {/* les pieux de la palissade */}
        {Array.from({ length: 22 }).map((_, i) => {
          const x = 336 + i * 30;
          if (x > 560 && x < 700) return null; // l'ouverture de la porte
          const h = 196 + (i % 3) * 6;
          return (
            <g key={i}>
              <rect x={x} y={430 - h} width="24" height={h} fill="url(#mu-wood)" />
              <rect x={x} y={430 - h} width="24" height={h} fill="#221408" opacity="0.4" filter="url(#mu-grain)" />
              <path d={`M${x + 2} ${430 - h + 14} v${h - 24}`} stroke="#a8865c" strokeWidth="1.4" opacity="0.35" />
              <path d={`M${x} ${430 - h} l12 -14 l12 14 Z`} fill="#6e4c2e" />
              <path d={`M${x} ${430 - h} l12 -14`} stroke="#8a6a44" strokeWidth="1.4" opacity="0.5" />
            </g>
          );
        })}
        {/* la tour de guet, au-dessus de la porte */}
        <rect x="548" y="196" width="164" height="20" fill="#6e4c2e" />
        <rect x="548" y="196" width="164" height="20" fill="#221408" opacity="0.3" filter="url(#mu-grain)" />
        <rect x="564" y="150" width="132" height="48" fill="#5a3f24" />
        {[566, 588, 610, 632, 654, 676].map((x, i) => <rect key={i} x={x} y="138" width="14" height="14" fill="#4a3018" />)}
        {/* les deux battants de la porte, ouverts sur l'ombre */}
        <rect x="562" y="270" width="66" height="160" fill="#3a2614" />
        <rect x="632" y="270" width="66" height="160" fill="#3a2614" />
        <path d="M562 270 v160 M628 270 v160 M632 270 v160 M698 270 v160" stroke="#241608" strokeWidth="3" />
        {[300, 340, 380].map((y, i) => <path key={i} d={`M566 ${y} h58 M636 ${y} h58`} stroke="#241608" strokeWidth="2" opacity="0.6" />)}
        {/* l'ombre profonde de l'entrée */}
        <path d="M628 276 q6 60 0 150 l6 0 q-4 -80 0 -150 Z" fill="#0e0805" opacity="0.7" />
      </PLayer>

      {/* ═══ premier plan : la grève, Guna, le coquillage ═══ */}
      <PLayer depth={3}>
        {/* le sol devant la porte */}
        <path d="M0 560 L0 430 Q320 412 640 434 Q840 448 1000 428 L1000 560 Z" fill="url(#mu-sand)" />
        <path d="M0 560 L0 430 Q320 412 640 434 Q840 448 1000 428 L1000 560 Z" fill="#2c1c10" opacity="0.26" filter="url(#mu-mottle)" />
        <ellipse cx="580" cy="500" rx="420" ry="46" fill="#5a4630" opacity="0.25" />
        {/* la grève mouillée qui rejoint la mer, à gauche */}
        <path d="M0 452 Q120 440 240 460 L240 560 L0 560 Z" fill="#9a9080" opacity="0.5" />
        <path d="M0 456 Q120 444 236 464" stroke="#e8dcc0" strokeWidth="2" fill="none" opacity="0.5" />
        {/* galets mouillés */}
        {[[90, 520, 10], [150, 540, 7], [210, 522, 9]].map(([x, y, r], i) => (
          <g key={i}><ellipse cx={x + r} cy={y + 2} rx={r * 1.4} ry={r * 0.35} fill="#1c1420" opacity="0.4" /><ellipse cx={x} cy={y} rx={r} ry={r * 0.6} fill={i % 2 ? "#6e5a48" : "#564636"} /><path d={`M${x - r * 0.6} ${y - r * 0.3} q${r * 0.6} -${r * 0.4} ${r * 1.2} 0`} stroke="#e8d4a8" strokeWidth="1.4" fill="none" opacity="0.6" /></g>
        ))}

        {/* GUNA, le garde — cuirasse de cuir, lance, bouclier rond */}
        <g transform="translate(388,440)">
          <ellipse cx="0" cy="30" rx="28" ry="8" fill="#2a1c10" opacity="0.5" />
          {/* la lance, plantée */}
          <path d="M34 -60 L30 46" stroke="#6e4c2e" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M34 -60 l-6 14 l6 5 l6 -5 Z" fill="#8d8d97" stroke="#dfe3ec" strokeWidth="1" />
          {/* les jambes */}
          <path d="M-8 24 l-2 22 M8 24 l3 22" stroke="#5a3f24" strokeWidth="7" strokeLinecap="round" />
          {/* la tunique de peau + cuirasse */}
          <path d="M-16 26 Q-22 -8 0 -22 Q22 -8 16 26 Z" fill="#7a5636" />
          <path d="M-16 26 Q-22 -8 0 -22 Q22 -8 16 26 Z" fill="#2c1a0c" opacity="0.35" filter="url(#mu-grain)" />
          <path d="M-14 4 q14 6 28 0" stroke="#5a3f24" strokeWidth="3" fill="none" />
          <path d="M-12 -10 L12 -10 L8 6 L-8 6 Z" fill="#8a5a34" opacity="0.7" />
          {/* liseré de lumière du matin (soleil à gauche) */}
          <path d="M-16 20 Q-22 -8 0 -22" stroke="#ffe0a8" strokeWidth="2" fill="none" opacity="0.55" />
          {/* le bras qui tient la lance */}
          <path d="M12 -6 q16 -2 22 8" stroke="#c89a6e" strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* la tête, casque de cuir, barbe */}
          <circle cx="0" cy="-30" r="10" fill="#c89a6e" />
          <path d="M-10 -33 q1 -12 10 -11 q11 1 10 12 q-4 -6 -10 -6 q-7 0 -10 5 Z" fill="#4a3324" />
          <path d="M-6 -22 q6 8 12 0 l-2 6 q-4 3 -8 0 Z" fill="#3a2a1c" />
          <path d="M4 -34 q5 3 4 10" stroke="#ffe0a8" strokeWidth="1.6" fill="none" opacity="0.5" />
          {/* le bouclier rond au bras gauche */}
          <ellipse cx="-20" cy="2" rx="14" ry="16" fill="#8a5a34" stroke="#5a3f24" strokeWidth="2.5" />
          <circle cx="-20" cy="2" r="4" fill="#c8a860" />
          <path d="M-20 -12 v28 M-32 2 h24" stroke="#5a3f24" strokeWidth="1.4" opacity="0.5" />
        </g>
        {/* le « ? » doré : c'est au tour de Guna */}
        {queteQui === "guna" && (
          <g transform="translate(370,330)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
            <path d="M0 0 q0 -22 22 -22 q22 0 22 18 q0 15 -18 20 l0 7" fill="none" stroke="#ffd166" strokeWidth="4" />
            <circle cx="22" cy="34" r="2.8" fill="#ffd166" />
          </g>
        )}

        {/* LE COQUILLAGE, nacré, sur le sable humide */}
        <g transform="translate(140,486)">
          <ellipse cx="0" cy="12" rx="22" ry="6" fill="#1c1420" opacity="0.4" />
          <path d="M0 10 Q-22 4 -16 -14 Q-7 -24 0 -16 Q7 -24 16 -14 Q22 4 0 10 Z" fill="#f2e6cc" />
          <path d="M0 10 Q-22 4 -16 -14 Q-7 -24 0 -16 Q7 -24 16 -14 Q22 4 0 10 Z" fill="#e8b0c0" opacity="0.25" />
          <path d="M0 8 L-10 -10 M0 8 L-3 -16 M0 8 L4 -15 M0 8 L11 -9" stroke="#d0b898" strokeWidth="1.4" opacity="0.7" />
          <path d="M-4 -14 q4 -4 8 0" stroke="#fff6ea" strokeWidth="1.4" fill="none" opacity="0.7" />
        </g>

        {/* herbes sèches qui cadrent le bas */}
        <g opacity="0.9">
          <path d="M-4 560 q10 -30 4 -46 M18 560 q3 -24 14 -38 M960 560 q-6 -22 2 -34 M984 560 q4 -18 12 -28" stroke="#241a10" strokeWidth="4" fill="none" />
        </g>
      </PLayer>

      {/* voile de grain global */}
      <rect width="1000" height="560" fill="#141008" opacity="0.08" style={{ pointerEvents: "none" }} />

      {/* zones cliquables */}
      <Hotspot cx={392} cy={414} r={42} label="Guna, le garde" reveal={reveal} onClick={(p) => action("guna", p)} />
      <Hotspot cx={140} cy={480} r={34} label="coquillage" item="coquillage" reveal={reveal} onClick={() => collect("coquillage")} />
    </svg>
  );
}
