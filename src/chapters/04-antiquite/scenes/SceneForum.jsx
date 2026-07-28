import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";
import { PompeiDefs, PompeiFond } from "./fond.jsx";

/* ============================================================
   CHAPITRE 4 · Tableau 3 — Le jardin clos de la villa
   Un jardin de péristyle : mur de clôture au fond (derrière, la
   ville de Pompéi et le Vésuve), oliviers, un grand arbre où
   nichent les abeilles, une fontaine, une vache, et l'atelier.
   ============================================================ */

export default function SceneJardin({ collect, action, reveal, made = [] }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <PompeiDefs />
        <linearGradient id="ja-grass" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a9a52" /><stop offset="100%" stopColor="#5a6a34" /></linearGradient>
        <linearGradient id="ja-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a8ccd0" /><stop offset="100%" stopColor="#5a808a" /></linearGradient>
        <linearGradient id="ja-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d8c49a" /><stop offset="100%" stopColor="#b09a6e" /></linearGradient>
        <radialGradient id="ja-tree" cx="45%" cy="40%" r="60%"><stop offset="0%" stopColor="#6a8a3a" /><stop offset="100%" stopColor="#3a5226" /></radialGradient>
        <radialGradient id="ja-olive" cx="45%" cy="40%" r="60%"><stop offset="0%" stopColor="#9aa672" /><stop offset="100%" stopColor="#6a7a48" /></radialGradient>
      </defs>

      <PompeiFond />

      {/* ═══ derrière le mur : une ville plus dense ═══ */}
      <PLayer depth={2}>
        {/* rangée de bâtiments romains (toits rouges), au-dessus du mur */}
        {[[60, 300, 1], [110, 296, 0.9], [175, 300, 1.05], [235, 298, 0.85], [560, 300, 0.9], [620, 296, 1.1], [690, 300, 0.9], [900, 298, 1]].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x},${y}) scale(${s})`}>
            <rect x="-22" y="-40" width="44" height="40" fill="#e4dcc8" />
            <rect x="-22" y="-40" width="44" height="40" fill="#a89a78" opacity="0.15" filter="url(#pf-grain)" />
            <path d="M-26 -40 L0 -56 L26 -40 Z" fill="#a8462e" />
            <rect x="-13" y="-28" width="10" height="12" fill="#6a5238" /><rect x="4" y="-28" width="10" height="12" fill="#6a5238" />
            <rect x="-7" y="-14" width="14" height="14" fill="#5a4230" />
          </g>
        ))}
        {/* un petit temple à colonnes derrière le mur */}
        <g transform="translate(400,300)">
          <path d="M-40 -40 L0 -60 L40 -40 Z" fill="#c8462e" />
          <rect x="-38" y="-40" width="76" height="7" fill="#e4dcc8" />
          {[-32, -18, -4, 10, 24].map((x, i) => <rect key={i} x={x} y="-33" width="7" height="33" fill="#d8cdb4" />)}
        </g>

        {/* LE MUR DE CLÔTURE du jardin */}
        <rect x="0" y="304" width="1000" height="56" fill="url(#ja-wall)" />
        <rect x="0" y="304" width="1000" height="56" fill="#8a6e46" opacity="0.2" filter="url(#pf-grain)" />
        <rect x="0" y="298" width="1000" height="10" fill="#c8b488" />
        <path d="M0 322 h1000 M0 340 h1000" stroke="#a08a5e" strokeWidth="1.2" opacity="0.5" />
        {[...Array(28)].map((_, i) => <path key={i} d={`M${i * 36} 308 v52`} stroke="#a08a5e" strokeWidth="1" opacity="0.35" />)}
      </PLayer>

      {/* ═══ le jardin (premier plan) ═══ */}
      <PLayer depth={3}>
        <rect y="356" width="1000" height="204" fill="url(#ja-grass)" />
        <rect y="358" width="1000" height="202" fill="#2e3a18" opacity="0.24" filter="url(#pf-mottle)" />
        {/* allée dallée vers la fontaine */}
        <path d="M400 560 L472 388 L540 388 L620 560 Z" fill="#c2a877" opacity="0.85" />
        <path d="M400 560 L472 388 M620 560 L540 388" stroke="#8a6e46" strokeWidth="1.6" opacity="0.4" />

        {/* LES OLIVIERS (plusieurs, en rang le long du mur) */}
        {[[110, 372, 0.95], [250, 376, 0.8], [330, 372, 0.9], [720, 374, 0.85], [820, 372, 1], [900, 376, 0.8]].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x},${y}) scale(${s})`}>
            <path d="M0 4 q-7 -32 -1 -50 q7 18 1 50" stroke="#6e5236" strokeWidth="9" fill="none" strokeLinecap="round" />
            <path d="M0 -30 l-12 -8 M0 -38 l12 -10" stroke="#6e5236" strokeWidth="3" />
            <ellipse cx="-3" cy="-56" rx="30" ry="23" fill="url(#ja-olive)" />
            <ellipse cx="12" cy="-46" rx="20" ry="16" fill="#7a8a5a" opacity="0.8" />
            {[...Array(7)].map((_, k) => <circle key={k} cx={-18 + k * 6} cy={-52 + (k % 2) * 9} r="2" fill="#3a4a22" />)}
          </g>
        ))}

        {/* LE GRAND ARBRE (gauche) — les ABEILLES y nichent, on y taille une branche */}
        <g transform="translate(150,356)">
          <path d="M0 8 L-6 -74 M0 8 L6 -74" stroke="#5a3f24" strokeWidth="15" strokeLinecap="round" />
          <path d="M0 -44 l-26 -14 M0 -54 l26 -18 M0 -64 l-22 -22" stroke="#5a3f24" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="0" cy="-96" rx="70" ry="56" fill="url(#ja-tree)" />
          <ellipse cx="-32" cy="-74" rx="36" ry="30" fill="#6a8a3a" opacity="0.7" />
          <ellipse cx="36" cy="-102" rx="36" ry="30" fill="#5a7a32" opacity="0.7" />
          {/* la branche cassée qui pend (à ramasser) */}
          <path d="M-44 -64 q-26 6 -36 28" stroke="#6a4a2c" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* LA RUCHE nichée dans le tronc (creux) + le miel */}
          <g transform="translate(2,-30)">
            <ellipse cx="0" cy="0" rx="13" ry="16" fill="#2a1c10" />
            <path d="M-9 -6 Q0 -14 9 -6 Q9 8 0 12 Q-9 8 -9 -6 Z" fill="#d8a83a" />
            <path d="M-7 -2 q7 3 14 0 M-6 4 q6 3 12 0" stroke="#a87a1a" strokeWidth="1.4" fill="none" />
          </g>
          {/* les ABEILLES qui tournent autour de l'arbre */}
          {[[-18, -50], [22, -70], [8, -30], [-30, -90], [40, -40]].map(([x, y], i) => (
            <g key={i} style={{ animation: `drift ${2 + i * 0.6}s ease-in-out infinite`, transformOrigin: `${150 + x}px ${356 + y}px`, transformBox: "view-box" }}>
              <ellipse cx={x} cy={y} rx="2.4" ry="1.6" fill="#e0b23a" />
              <path d={`M${x - 2} ${y} h4`} stroke="#2a1c10" strokeWidth="1.4" />
            </g>
          ))}
        </g>

        {/* panier d'olives (récolte) */}
        <g transform="translate(300,486)">
          <path d="M-20 -8 Q-22 14 0 16 Q22 14 20 -8 Z" fill="#a87a44" />
          <path d="M-20 -8 q20 -6 40 0" stroke="#7a5230" strokeWidth="2" fill="none" />
          {[...Array(9)].map((_, k) => <circle key={k} cx={-13 + (k % 5) * 6.5} cy={-6 + Math.floor(k / 5) * 7} r="3" fill="#3a4a22" />)}
        </g>

        {/* LA FONTAINE (centre) */}
        <g transform="translate(500,470)">
          <ellipse cx="0" cy="30" rx="70" ry="16" fill="#241608" opacity="0.3" />
          <path d="M-64 24 Q-70 -2 0 -8 Q70 -2 64 24 Z" fill="#b0a488" />
          <ellipse cx="0" cy="-8" rx="60" ry="16" fill="url(#ja-water)" />
          <path d="M-44 -8 q44 -6 88 0" stroke="#cfe0e0" strokeWidth="1.6" fill="none" opacity="0.5" style={{ animation: "ripple 3.4s ease-in-out infinite" }} />
          <rect x="-4" y="-40" width="8" height="34" fill="#9a8e78" />
          <path d="M0 -40 q-10 -14 0 -26 q10 12 0 26" fill="#bfe0e0" opacity="0.6" style={{ animation: "pulse 2.2s ease-in-out infinite" }} />
        </g>

        {/* LA VACHE (droite, support) */}
        <g transform="translate(860,470)">
          <ellipse cx="0" cy="30" rx="40" ry="8" fill="#241608" opacity="0.35" />
          <path d="M-34 22 Q-40 -14 -14 -18 L20 -18 Q40 -14 36 18 L36 30 L26 30 L26 24 L-24 24 L-24 30 L-34 30 Z" fill="#d8cdbc" />
          <path d="M-34 22 Q-40 -14 -14 -18 L20 -18 Q40 -14 36 18" fill="#8a7a68" opacity="0.2" filter="url(#pf-grain)" />
          <ellipse cx="-8" cy="2" rx="12" ry="9" fill="#5a4636" opacity="0.6" /><ellipse cx="18" cy="8" rx="8" ry="6" fill="#5a4636" opacity="0.6" />
          <path d="M-34 -8 Q-52 -10 -50 6 Q-48 16 -36 14 Z" fill="#d8cdbc" />
          <path d="M-50 -6 q-6 -6 -3 -12 M-44 -10 q-2 -8 3 -12" stroke="#c8b8a0" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="-46" cy="2" r="2" fill="#2a1c10" />
        </g>

        {/* L'ATELIER : établi + outils */}
        <g transform="translate(600,504)">
          <ellipse cx="0" cy="30" rx="100" ry="14" fill="#241608" opacity="0.35" />
          <rect x="-96" y="-6" width="192" height="16" rx="3" fill="#7a5230" />
          <rect x="-96" y="-6" width="192" height="16" rx="3" fill="#3a2414" opacity="0.3" filter="url(#pf-grain)" />
          <rect x="-88" y="10" width="14" height="30" fill="#5a3f24" /><rect x="74" y="10" width="14" height="30" fill="#5a3f24" />
          <g transform="translate(-64,-14)"><rect x="-24" y="0" width="48" height="7" rx="1.5" fill="#a8865a" /><rect x="-20" y="-7" width="42" height="7" rx="1.5" fill="#b89a6a" /></g>
          <g transform="translate(-14,-12) rotate(-10)"><rect x="-4" y="6" width="8" height="8" rx="1" fill="#6a4a2c" /><path d="M0 6 L2 -34 L-2 -34 Z" fill="#c8c8d0" stroke="#9a9aa6" strokeWidth="0.8" /><path d="M-8 6 h16" stroke="#8a7a4a" strokeWidth="2.4" /></g>
          <g transform="translate(34,-10)"><rect x="-2" y="-16" width="5" height="20" rx="1.5" fill="#9a9aa6" /><rect x="-4" y="4" width="9" height="6" rx="1.5" fill="#5a3f24" /><rect x="14" y="-6" width="16" height="12" rx="2" fill="#8a5a34" /><rect x="20" y="6" width="4" height="12" fill="#5a3f24" /></g>
          <g transform="translate(70,-12)"><path d="M-8 4 L8 0 L8 4 L-8 8 Z" fill="#c8c0b4" stroke="#8a8478" strokeWidth="0.8" /><rect x="-12" y="4" width="10" height="5" rx="2" fill="#6e4c2e" /><ellipse cx="16" cy="4" rx="7" ry="5" fill="#b8b0a0" /></g>
        </g>
      </PLayer>

      <rect width="1000" height="560" fill="#231a10" opacity="0.06" style={{ pointerEvents: "none" }} />

      {/* zones cliquables */}
      <Hotspot cx={860} cy={462} r={48} label="la vache" item="vache" reveal={reveal} onClick={() => collect("vache")} />
      <Hotspot cx={152} cy={326} r={26} label="cire d'abeille (la ruche de l'arbre)" item="cire_abeille" reveal={reveal} onClick={() => collect("cire_abeille")} />
      <Hotspot cx={112} cy={314} r={28} label="branche taillée" item="branche" reveal={reveal} onClick={() => collect("branche")} />
      <Hotspot cx={536} cy={488} r={30} label="planche de bois" item="planche" reveal={reveal} onClick={() => collect("planche")} />
      <Hotspot cx={586} cy={488} r={26} label="épée" item="epee" reveal={reveal} onClick={() => collect("epee")} />
      <Hotspot cx={634} cy={488} r={26} label="burin" item="burin" reveal={reveal} onClick={() => collect("burin")} />
      <Hotspot cx={670} cy={488} r={26} label="grattoir & ponce" item="grattoir" reveal={reveal} onClick={() => collect("grattoir")} />
    </svg>
  );
}
