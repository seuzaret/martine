import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";
import { PompeiDefs, PompeiFond } from "./fond.jsx";

/* ============================================================
   CHAPITRE 4 · Tableau 3 — Le jardin & l'atelier de la villa
   Fontaine, arbres et oliviers, une vache, les ruches, et un
   petit atelier avec planches, outils, burin et épée. Le Vésuve
   veille au fond.
   ============================================================ */

export default function SceneJardin({ collect, action, reveal, made = [] }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <PompeiDefs />
        <linearGradient id="ja-grass" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a9a52" /><stop offset="100%" stopColor="#5a6a34" /></linearGradient>
        <linearGradient id="ja-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a8ccd0" /><stop offset="100%" stopColor="#5a808a" /></linearGradient>
        <radialGradient id="ja-tree" cx="45%" cy="40%" r="60%"><stop offset="0%" stopColor="#6a8a3a" /><stop offset="100%" stopColor="#3a5226" /></radialGradient>
      </defs>

      <PompeiFond />

      {/* ═══ le jardin (premier plan) ═══ */}
      <PLayer depth={3}>
        <rect y="360" width="1000" height="200" fill="url(#ja-grass)" />
        <rect y="362" width="1000" height="198" fill="#2e3a18" opacity="0.24" filter="url(#pf-mottle)" />
        {/* allée dallée */}
        <path d="M380 560 L470 380 L540 380 L640 560 Z" fill="#c2a877" opacity="0.85" />
        <path d="M380 560 L470 380 M640 560 L540 380" stroke="#8a6e46" strokeWidth="1.6" opacity="0.4" />

        {/* GRAND ARBRE (gauche) — on y taille une branche */}
        <g transform="translate(130,360)">
          <path d="M0 8 L-6 -70 M0 8 L6 -70" stroke="#5a3f24" strokeWidth="14" strokeLinecap="round" />
          <path d="M0 -40 l-24 -14 M0 -50 l24 -16 M0 -60 l-20 -20" stroke="#5a3f24" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="0" cy="-90" rx="66" ry="52" fill="url(#ja-tree)" />
          <ellipse cx="-30" cy="-70" rx="34" ry="28" fill="#6a8a3a" opacity="0.7" />
          <ellipse cx="34" cy="-96" rx="34" ry="28" fill="#5a7a32" opacity="0.7" />
          {/* une branche cassée qui pend (à ramasser) */}
          <path d="M-40 -60 q-24 6 -34 26" stroke="#6a4a2c" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>

        {/* OLIVIERS (au fond du jardin) + paniers d'olives */}
        {[[300, 372, 0.8], [700, 374, 0.9]].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x},${y}) scale(${s})`}>
            <path d="M0 0 q-6 -30 0 -46 q6 16 0 46" stroke="#6e5236" strokeWidth="8" fill="none" strokeLinecap="round" />
            <ellipse cx="-2" cy="-52" rx="30" ry="22" fill="#8a9a6a" />
            <ellipse cx="8" cy="-44" rx="20" ry="16" fill="#7a8a5a" />
            {[...Array(6)].map((_, k) => <circle key={k} cx={-16 + k * 6} cy={-48 + (k % 2) * 8} r="2" fill="#3a4a22" />)}
          </g>
        ))}
        {/* panier d'olives (récolte) */}
        <g transform="translate(300,480)">
          <path d="M-20 -8 Q-22 14 0 16 Q22 14 20 -8 Z" fill="#a87a44" />
          <path d="M-20 -8 q20 -6 40 0" stroke="#7a5230" strokeWidth="2" fill="none" />
          {[...Array(9)].map((_, k) => <circle key={k} cx={-13 + (k % 5) * 6.5} cy={-6 + Math.floor(k / 5) * 7} r="3" fill="#3a4a22" />)}
        </g>

        {/* LA FONTAINE (centre) */}
        <g transform="translate(500,468)">
          <ellipse cx="0" cy="30" rx="70" ry="16" fill="#241608" opacity="0.3" />
          <path d="M-64 24 Q-70 -2 0 -8 Q70 -2 64 24 Z" fill="#b0a488" />
          <ellipse cx="0" cy="-8" rx="60" ry="16" fill="url(#ja-water)" />
          <path d="M-44 -8 q44 -6 88 0" stroke="#cfe0e0" strokeWidth="1.6" fill="none" opacity="0.5" style={{ animation: "ripple 3.4s ease-in-out infinite" }} />
          {/* jet central */}
          <rect x="-4" y="-40" width="8" height="34" fill="#9a8e78" />
          <path d="M0 -40 q-10 -14 0 -26 q10 12 0 26" fill="#bfe0e0" opacity="0.6" style={{ animation: "pulse 2.2s ease-in-out infinite" }} />
        </g>

        {/* LES RUCHES (cire d'abeille), près de l'arbre */}
        <g transform="translate(220,498)">
          {[[-18, 0], [16, 4]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x},${y})`}>
              <path d="M-14 8 Q-16 -8 0 -12 Q16 -8 14 8 Z" fill="#c8a24a" />
              <path d="M-13 0 q13 4 26 0 M-11 -6 q11 3 22 0" stroke="#9a7a2a" strokeWidth="1.6" fill="none" />
            </g>
          ))}
          {/* abeilles */}
          {[[-6, -18], [8, -22], [0, -14]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.6" fill="#3a2a10" style={{ animation: `drift ${2 + i}s ease-in-out infinite` }} />)}
        </g>

        {/* LA VACHE (droite, support) */}
        <g transform="translate(840,476)">
          <ellipse cx="0" cy="30" rx="40" ry="8" fill="#241608" opacity="0.35" />
          <path d="M-34 22 Q-40 -14 -14 -18 L20 -18 Q40 -14 36 18 L36 30 L26 30 L26 24 L-24 24 L-24 30 L-34 30 Z" fill="#d8cdbc" />
          <path d="M-34 22 Q-40 -14 -14 -18 L20 -18 Q40 -14 36 18" fill="#8a7a68" opacity="0.2" filter="url(#pf-grain)" />
          {/* taches */}
          <ellipse cx="-8" cy="2" rx="12" ry="9" fill="#5a4636" opacity="0.6" /><ellipse cx="18" cy="8" rx="8" ry="6" fill="#5a4636" opacity="0.6" />
          {/* tête */}
          <path d="M-34 -8 Q-52 -10 -50 6 Q-48 16 -36 14 Z" fill="#d8cdbc" />
          <path d="M-50 -6 q-6 -6 -3 -12 M-44 -10 q-2 -8 3 -12" stroke="#c8b8a0" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="-46" cy="2" r="2" fill="#2a1c10" />
        </g>

        {/* L'ATELIER (avant-plan gauche-centre) : établi + outils */}
        <g transform="translate(600,500)">
          <ellipse cx="0" cy="30" rx="100" ry="14" fill="#241608" opacity="0.35" />
          <rect x="-96" y="-6" width="192" height="16" rx="3" fill="#7a5230" />
          <rect x="-96" y="-6" width="192" height="16" rx="3" fill="#3a2414" opacity="0.3" filter="url(#pf-grain)" />
          <rect x="-88" y="10" width="14" height="30" fill="#5a3f24" /><rect x="74" y="10" width="14" height="30" fill="#5a3f24" />
          {/* planches empilées (gauche de l'établi) */}
          <g transform="translate(-64,-14)"><rect x="-24" y="0" width="48" height="7" rx="1.5" fill="#a8865a" /><rect x="-20" y="-7" width="42" height="7" rx="1.5" fill="#b89a6a" /></g>
          {/* épée posée */}
          <g transform="translate(-14,-12) rotate(-10)"><rect x="-4" y="6" width="8" height="8" rx="1" fill="#6a4a2c" /><path d="M0 6 L2 -34 L-2 -34 Z" fill="#c8c8d0" stroke="#9a9aa6" strokeWidth="0.8" /><path d="M-8 6 h16" stroke="#8a7a4a" strokeWidth="2.4" /></g>
          {/* burin + maillet */}
          <g transform="translate(34,-10)"><rect x="-2" y="-16" width="5" height="20" rx="1.5" fill="#9a9aa6" /><rect x="-4" y="4" width="9" height="6" rx="1.5" fill="#5a3f24" /><rect x="14" y="-6" width="16" height="12" rx="2" fill="#8a5a34" /><rect x="20" y="6" width="4" height="12" fill="#5a3f24" /></g>
          {/* grattoir + ponce */}
          <g transform="translate(70,-12)"><path d="M-8 4 L8 0 L8 4 L-8 8 Z" fill="#c8c0b4" stroke="#8a8478" strokeWidth="0.8" /><rect x="-12" y="4" width="10" height="5" rx="2" fill="#6e4c2e" /><ellipse cx="16" cy="4" rx="7" ry="5" fill="#b8b0a0" /></g>
        </g>
      </PLayer>

      <rect width="1000" height="560" fill="#231a10" opacity="0.06" style={{ pointerEvents: "none" }} />

      {/* zones cliquables */}
      <Hotspot cx={840} cy={468} r={48} label="la vache" item="vache" reveal={reveal} onClick={() => collect("vache")} />
      <Hotspot cx={220} cy={492} r={40} label="cire d'abeille (ruches)" item="cire_abeille" reveal={reveal} onClick={() => collect("cire_abeille")} />
      <Hotspot cx={104} cy={318} r={40} label="branche taillée" item="branche" reveal={reveal} onClick={() => collect("branche")} />
      <Hotspot cx={536} cy={484} r={30} label="planche de bois" item="planche" reveal={reveal} onClick={() => collect("planche")} />
      <Hotspot cx={586} cy={484} r={26} label="épée" item="epee" reveal={reveal} onClick={() => collect("epee")} />
      <Hotspot cx={634} cy={484} r={26} label="burin" item="burin" reveal={reveal} onClick={() => collect("burin")} />
      <Hotspot cx={670} cy={484} r={26} label="grattoir & ponce" item="grattoir" reveal={reveal} onClick={() => collect("grattoir")} />
    </svg>
  );
}
