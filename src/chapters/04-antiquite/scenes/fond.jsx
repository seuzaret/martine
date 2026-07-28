import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 4 — Fond commun aux 3 tableaux de Pompéi
   Le ciel méditerranéen, la ville de Pompéi (toits rouges, un
   temple) et le VÉSUVE qui fume au fond — présent partout, que
   personne ne regarde. Chaque tableau ajoute ensuite son décor.
   ============================================================ */

/* les dégradés / filtres partagés — à placer dans le <defs> de chaque scène */
export function PompeiDefs() {
  return (
    <>
      <linearGradient id="pf-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3f74a4" /><stop offset="55%" stopColor="#8fb6cc" /><stop offset="100%" stopColor="#e8d0a0" />
      </linearGradient>
      <filter id="pf-grain" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" result="a" />
        <feComposite in="a" in2="SourceGraphic" operator="in" />
      </filter>
      <filter id="pf-mottle" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" result="a" />
        <feComposite in="a" in2="SourceGraphic" operator="in" />
      </filter>
      <filter id="pf-blur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="7" /></filter>
    </>
  );
}

/* le ciel + le Vésuve + la ville — couche lointaine (depth 1) */
export function PompeiFond() {
  return (
    <>
      <rect width="1000" height="560" fill="url(#pf-sky)" />
      <circle cx="170" cy="120" r="34" fill="#fff4d0" opacity="0.85" />

      <PLayer depth={1}>
        {/* colline / horizon */}
        <path d="M0 296 Q250 284 500 292 Q750 300 1000 290 L1000 360 L0 360 Z" fill="#9a9a6e" />

        {/* le VÉSUVE qui fume, au fond à droite */}
        <g transform="translate(800,298)">
          <path d="M-150 0 L-42 -150 Q0 -172 42 -150 L150 0 Z" fill="#63634a" />
          <path d="M-150 0 L-42 -150 Q0 -172 42 -150 L150 0 Z" fill="#34342a" opacity="0.45" filter="url(#pf-mottle)" />
          <path d="M-150 0 L150 0 L122 -20 Q0 -38 -122 -20 Z" fill="#55663f" opacity="0.5" />
          <path d="M-42 -150 Q0 -172 42 -150 L24 -134 Q0 -148 -24 -134 Z" fill="#454534" />
          <ellipse cx="0" cy="-150" rx="21" ry="6" fill="#e0762e" opacity="0.5" style={{ animation: "pulse 3.2s ease-in-out infinite" }} />
          <path d="M0 -162 q-14 -36 11 -62 q-19 8 -8 -36 q12 -22 -3 -48" stroke="#c8bcae" strokeWidth="13" fill="none" opacity="0.42" style={{ animation: "drift 7s ease-in-out infinite" }} filter="url(#pf-blur)" />
          <path d="M5 -150 q-9 -26 7 -46" stroke="#9a5238" strokeWidth="6" fill="none" opacity="0.3" filter="url(#pf-blur)" />
        </g>

        {/* LA VILLE DE POMPÉI : maisons blanches à toits rouges + un temple */}
        {[[70, 292, 1], [120, 288, 0.85], [300, 292, 0.9], [360, 288, 1.05], [470, 294, 0.8], [560, 290, 0.9]].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x},${y}) scale(${s})`}>
            <rect x="-20" y="-24" width="40" height="24" fill="#e4dcc8" />
            <rect x="-20" y="-24" width="40" height="24" fill="#a89a78" opacity="0.15" filter="url(#pf-grain)" />
            <path d="M-24 -24 L0 -38 L24 -24 Z" fill="#a8462e" />
            <rect x="-6" y="-14" width="12" height="14" fill="#6a5238" />
          </g>
        ))}
        {/* le temple à colonnes (au centre de la ville) */}
        <g transform="translate(420,292)">
          <path d="M-34 -30 L0 -48 L34 -30 Z" fill="#c8462e" />
          <rect x="-32" y="-30" width="64" height="6" fill="#e4dcc8" />
          {[-26, -14, -2, 10, 22].map((x, i) => <rect key={i} x={x} y="-24" width="6" height="24" fill="#d8cdb4" />)}
        </g>
        {/* cyprès sombres qui ponctuent l'horizon */}
        {[30, 250, 640, 950].map((x, i) => (
          <path key={i} d={`M${x} 296 q-6 -52 0 -72 q6 20 0 72 Z`} fill="#3a5236" opacity="0.85" />
        ))}
      </PLayer>
    </>
  );
}
