import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 4 · Tableau 2 — La bibliothèque de la villa
   Une pièce chaude : un bureau avec l'encre, les rayonnages à
   rouleaux, un beau pan de mur frais pour la fresque, et une
   grande fenêtre ouverte sur Pompéi et le Vésuve.
   ============================================================ */

export default function SceneBibliotheque({ collect, action, reveal, made = [] }) {
  const fresque = made.includes("msg_fresque");
  const range = made.includes("msg_bibliotheque");
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="bi-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c8a878" /><stop offset="100%" stopColor="#a8865a" /></linearGradient>
        <linearGradient id="bi-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a8845a" /><stop offset="100%" stopColor="#6e5436" /></linearGradient>
        <linearGradient id="bi-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5a8ab0" /><stop offset="60%" stopColor="#9ec0d0" /><stop offset="100%" stopColor="#e8d0a0" /></linearGradient>
        <linearGradient id="bi-plaster" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#efe6d2" /><stop offset="100%" stopColor="#d8cbb0" /></linearGradient>
        <filter id="bi-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="bi-blur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="5" /></filter>
      </defs>

      {/* ═══ la pièce : mur du fond + sol ═══ */}
      <rect width="1000" height="560" fill="url(#bi-wall)" />
      <rect width="1000" height="560" fill="#6a4a2a" opacity="0.14" filter="url(#bi-grain)" />
      <rect y="392" width="1000" height="168" fill="url(#bi-floor)" />
      <rect y="392" width="1000" height="168" fill="#3c2c18" opacity="0.26" filter="url(#bi-grain)" />
      <path d="M0 392 h1000" stroke="#5a4026" strokeWidth="3" opacity="0.5" />
      {[...Array(14)].map((_, i) => <path key={i} d={`M${40 + i * 74} 392 L${20 + i * 84} 560`} stroke="#5a4026" strokeWidth="1" opacity="0.25" />)}

      {/* ═══ LA FENÊTRE (droite) : le soleil, le Vésuve et 3 maisons ═══ */}
      <g transform="translate(730,96)">
        {/* encadrement + rebord */}
        <rect x="-16" y="-16" width="192" height="184" rx="6" fill="#8a6a40" />
        <rect x="-24" y="164" width="208" height="12" rx="3" fill="#7a5a34" />
        <path d="M-4 -4 h168 v156 h-168 Z" fill="url(#bi-sky)" />
        <clipPath id="bi-win"><path d="M-4 -4 h168 v156 h-168 Z" /></clipPath>
        <g clipPath="url(#bi-win)">
          {/* le SOLEIL */}
          <circle cx="28" cy="34" r="18" fill="#fff4d0" opacity="0.9" />
          {/* mer + horizon */}
          <rect x="-4" y="96" width="168" height="60" fill="#5a92a0" opacity="0.7" />
          <path d="M-4 96 h168" stroke="#cfe0da" strokeWidth="1.4" opacity="0.5" />
          {/* le VÉSUVE qui fume, au centre */}
          <g transform="translate(108,96)">
            <path d="M-56 0 L-16 -62 Q0 -72 16 -62 L56 0 Z" fill="#63634a" />
            <path d="M-16 -62 Q0 -72 16 -62 L9 -55 Q0 -62 -9 -55 Z" fill="#454534" />
            <ellipse cx="0" cy="-62" rx="8" ry="2.6" fill="#e0762e" opacity="0.6" style={{ animation: "pulse 3.2s ease-in-out infinite" }} />
            <path d="M0 -66 q-8 -18 6 -30 q-10 4 -4 -18" stroke="#c8bcae" strokeWidth="6" fill="none" opacity="0.4" style={{ animation: "drift 7s ease-in-out infinite" }} filter="url(#bi-blur)" />
          </g>
          {/* exactement 3 MAISONS à toits rouges */}
          {[[24, 96], [58, 98], [138, 96]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x},${y})`}>
              <rect x="-13" y="-18" width="26" height="18" fill="#e4dcc8" />
              <path d="M-15 -18 L0 -28 L15 -18 Z" fill="#a8462e" />
              <rect x="-4" y="-10" width="8" height="10" fill="#6a5238" />
            </g>
          ))}
        </g>
        {/* croisillon de la fenêtre */}
        <path d="M80 -4 v156 M-4 74 h168" stroke="#8a6a40" strokeWidth="6" />
      </g>

      {/* ═══ LE MUR À FRESQUE (gauche) : panneau d'enduit frais ═══ */}
      <g transform="translate(60,70)">
        <rect x="0" y="0" width="230" height="300" fill="url(#bi-plaster)" />
        <rect x="0" y="0" width="230" height="300" fill="#a89070" opacity="0.12" filter="url(#bi-grain)" />
        <rect x="10" y="10" width="210" height="280" fill="none" stroke="#c8462e" strokeWidth="4" />
        {fresque ? (
          <g style={{ animation: "fadein 1s ease-out" }}>
            <rect x="22" y="22" width="186" height="256" fill="#7e2a20" />
            <rect x="34" y="34" width="162" height="232" fill="none" stroke="#e8c86a" strokeWidth="3" />
            {/* un personnage en toge, un jardin, façon fresque pompéienne */}
            <g transform="translate(115,180)">
              <path d="M-22 60 Q-30 -16 0 -32 Q30 -16 22 60 Z" fill="#efe3c8" />
              <path d="M-16 6 q16 10 32 -1" stroke="#c98a5a" strokeWidth="2.4" fill="none" opacity="0.5" />
              <circle cx="0" cy="-46" r="13" fill="#d8a878" />
              <path d="M-12 -50 q2 -13 12 -12 q12 1 11 13 q-4 -7 -11 -7 q-8 0 -12 6 Z" fill="#4e3220" />
              <path d="M18 -20 q26 -8 33 -32" stroke="#d8a878" strokeWidth="6" fill="none" strokeLinecap="round" />
              <path d="M51 -52 q6 -13 1 -25 M51 -52 q12 -4 21 -11 M51 -52 q12 6 22 4" stroke="#6a9a4a" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
            <path d="M40 250 q-4 -32 9 -50 M55 210 q11 -6 19 -1" stroke="#6a8a4a" strokeWidth="3" fill="none" opacity="0.8" strokeLinecap="round" />
          </g>
        ) : (
          <>
            <circle cx="115" cy="130" r="18" fill="#e8c86a" opacity="0.6" />
            <path d="M80 200 q35 -44 70 0" stroke="#d8b060" strokeWidth="3" fill="none" opacity="0.5" />
            <text x="115" y="270" textAnchor="middle" fontSize="12" fill="#a8865a" fontStyle="italic" opacity="0.7">mur frais…</text>
          </>
        )}
      </g>

      {/* ═══ LES RAYONNAGES À ROULEAUX (bibliothèque, support) ═══ */}
      <g transform="translate(430,150)">
        <rect x="-70" y="0" width="180" height="250" fill="#6e4c2e" />
        <rect x="-70" y="0" width="180" height="250" fill="#3a2414" opacity="0.3" filter="url(#bi-grain)" />
        {[0, 62, 124, 186].map((y, r) => <rect key={r} x="-70" y={y} width="180" height="10" fill="#5a3f24" />)}
        {/* les bouts de rouleaux (cercles) dans les casiers */}
        {[14, 76, 138].map((y) => [...Array(9)].map((_, c) => (
          <g key={`${y}-${c}`} transform={`translate(${-58 + c * 20},${y + 22})`}>
            <circle r="7" fill="#e6d8b8" stroke="#b09a6a" strokeWidth="1.2" />
            <circle r="2.2" fill="#8a7a4a" />
          </g>
        )))}
        {/* le rouleau qu'on vient de ranger, en évidence (résultat) */}
        {range && (
          <g transform="translate(-58,200)" style={{ animation: "fadein 1s ease-out" }}>
            <circle r="8" fill="#f2e6c4" stroke="#c8a860" strokeWidth="1.6" style={{ filter: "drop-shadow(0 0 6px #ffd166)" }} />
            <circle r="2.4" fill="#a83a2c" />
          </g>
        )}
      </g>

      {/* ═══ LE BUREAU (devant) : encre + umbilicus ═══ */}
      <g transform="translate(430,470)">
        <ellipse cx="0" cy="34" rx="94" ry="14" fill="#241608" opacity="0.35" />
        <rect x="-90" y="-2" width="180" height="14" rx="3" fill="#7a5230" />
        <rect x="-84" y="12" width="12" height="40" fill="#5a3f24" /><rect x="72" y="12" width="12" height="40" fill="#5a3f24" />
        {/* encrier */}
        <g transform="translate(-46,-8)">
          <path d="M-10 -2 Q-11 8 0 9 Q11 8 10 -2 Z" fill="#5a4636" />
          <ellipse cx="0" cy="-2" rx="9" ry="3.5" fill="#14141a" />
          <g transform="translate(4,-8) rotate(24)"><rect x="-1" y="-14" width="2.4" height="22" rx="1" fill="#c9a86a" /><path d="M-1 -14 h2.4 l-1.2 -3 Z" fill="#3a3a3a" /></g>
        </g>
        {/* umbilicus (bâton à pommeaux) posé */}
        <g transform="translate(34,-6)">
          <rect x="-30" y="-2" width="60" height="5" rx="2.5" fill="#8a6a3a" />
          <circle cx="-30" cy="0.5" r="5" fill="#c8a860" /><circle cx="30" cy="0.5" r="5" fill="#c8a860" />
        </g>
      </g>

      {/* pots de PIGMENTS au pied du mur à fresque */}
      <g transform="translate(160,470)">
        {[["#b23020", -22], ["#2a5a9a", 0], ["#d8a838", 22], ["#e8dcc4", 44]].map(([c, dx], i) => (
          <g key={i} transform={`translate(${dx},0)`}>
            <ellipse cx="0" cy="8" rx="11" ry="4.5" fill="#241608" opacity="0.4" />
            <path d="M-10 -2 Q-11 7 0 8 Q11 7 10 -2 Z" fill="#7a5636" />
            <ellipse cx="0" cy="-2" rx="9" ry="4" fill={c} />
          </g>
        ))}
        <g transform="translate(56,2) rotate(20)"><rect x="-1" y="-18" width="2.5" height="26" fill="#8a6a42" /><rect x="-2" y="-22" width="4.5" height="6" rx="2" fill="#3a2a1a" /></g>
      </g>

      <rect width="1000" height="560" fill="#231a10" opacity="0.06" style={{ pointerEvents: "none" }} />

      {/* zones cliquables */}
      <Hotspot cx={175} cy={210} r={90} label="mur enduit frais" item="mur" reveal={reveal} onClick={() => collect("mur")} />
      <Hotspot cx={160} cy={470} r={46} label="pigments" item="pigments" reveal={reveal} onClick={() => collect("pigments")} />
      <Hotspot cx={384} cy={462} r={28} label="encre" item="encre" reveal={reveal} onClick={() => collect("encre")} />
      <Hotspot cx={464} cy={464} r={30} label="umbilicus" item="ombilicus" reveal={reveal} onClick={() => collect("ombilicus")} />
      <Hotspot cx={430} cy={250} r={80} label="la bibliothèque" item="bibliotheque" reveal={reveal} onClick={() => collect("bibliotheque")} />
    </svg>
  );
}
