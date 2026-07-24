/* ============================================================
   CHAPITRE 1 — Éléments de décor partagés par les 4 tableaux
   (dégradés de ciel, sapins, touffes d'herbe, oiseaux…)
   ============================================================ */

export const SkyDefs = () => (
  <defs>
    <linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#171236" />
      <stop offset="30%" stopColor="#43265c" />
      <stop offset="58%" stopColor="#9c4436" />
      <stop offset="80%" stopColor="#d97b35" />
      <stop offset="100%" stopColor="#f0b054" />
    </linearGradient>
    <radialGradient id="sunhaze" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#ffe9ae" />
      <stop offset="40%" stopColor="#ffcf78" stopOpacity="0.7" />
      <stop offset="100%" stopColor="#ffcf78" stopOpacity="0" />
    </radialGradient>
    <linearGradient id="mFar" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4e2f63" /><stop offset="100%" stopColor="#3a2350" /></linearGradient>
    <linearGradient id="mMid" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5d3358" /><stop offset="100%" stopColor="#452648" /></linearGradient>
    <linearGradient id="mNear" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4a2a3e" /><stop offset="100%" stopColor="#331d30" /></linearGradient>
    <linearGradient id="soil" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a6a42" /><stop offset="25%" stopColor="#6e5232" /><stop offset="100%" stopColor="#3f2d1c" /></linearGradient>
    <linearGradient id="rock" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7d5c44" /><stop offset="45%" stopColor="#5c4030" /><stop offset="100%" stopColor="#3a2820" /></linearGradient>
    <radialGradient id="caveMouth" cx="50%" cy="30%" r="80%"><stop offset="0%" stopColor="#050302" /><stop offset="70%" stopColor="#120a06" /><stop offset="100%" stopColor="#241510" /></radialGradient>
    <radialGradient id="fireLight" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffb85e" stopOpacity="0.55" /><stop offset="55%" stopColor="#ff9540" stopOpacity="0.22" /><stop offset="100%" stopColor="#ff9540" stopOpacity="0" /></radialGradient>
    <linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e8a05a" /><stop offset="30%" stopColor="#a35a4e" /><stop offset="70%" stopColor="#5c3a62" /><stop offset="100%" stopColor="#33224a" /></linearGradient>
    <linearGradient id="trunk" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#4a3322" /><stop offset="50%" stopColor="#6b4a30" /><stop offset="100%" stopColor="#33231a" /></linearGradient>
    <radialGradient id="canopy" cx="40%" cy="35%" r="70%"><stop offset="0%" stopColor="#3f5232" /><stop offset="70%" stopColor="#26351f" /><stop offset="100%" stopColor="#1a2617" /></radialGradient>
    <linearGradient id="caveWallIn" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#241610" /><stop offset="45%" stopColor="#4a3020" /><stop offset="75%" stopColor="#6e4c30" /><stop offset="100%" stopColor="#8a6240" /></linearGradient>
    <radialGradient id="dayHole" cx="50%" cy="50%" r="60%"><stop offset="0%" stopColor="#ffd98c" /><stop offset="60%" stopColor="#e8935a" /><stop offset="100%" stopColor="#a35440" /></radialGradient>
  </defs>
);

export const Pine = ({ x, y, s = 1, dark = "#1d2f22" }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M-3 0 L3 0 L2 -18 L-2 -18 Z" fill="#2e1f14" />
    <path d="M0 -92 L20 -60 L10 -62 L28 -34 L14 -36 L34 -8 L-34 -8 L-14 -36 L-28 -34 L-10 -62 L-20 -60 Z" fill={dark} />
    <path d="M0 -92 L20 -60 L10 -62 L28 -34 L14 -36 L20 -26 L-2 -30 Z" fill="#28402d" opacity="0.6" />
  </g>
);

export const GrassTuft = ({ x, y, c = "#5d6b2e" }) => (
  <path d={`M${x} ${y} q-5 -18 -11 -22 M${x} ${y} q0 -20 6 -26 M${x} ${y} q5 -16 12 -19 M${x} ${y} q-2 -14 2 -24`} stroke={c} strokeWidth="2.2" fill="none" opacity="0.85" />
);

export const Birds = () => (
  <g stroke="#241530" strokeWidth="2.4" fill="none" opacity="0.85">
    <path d="M560 118 q9 -9 18 0 q9 -9 18 0" />
    <path d="M615 145 q7 -7 14 0 q7 -7 14 0" />
    <path d="M520 160 q6 -6 12 0 q6 -6 12 0" />
  </g>
);
