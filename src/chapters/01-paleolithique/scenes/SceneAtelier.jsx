import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 1 — Tableau : L'ATELIER DE SILEX
   ------------------------------------------------------------
   Une clairière à côté de la grotte. Cheng, le tailleur, y débite
   des nucléus. Rocher plat qui sert d'établi, éclats au sol,
   nodules bruts en tas. Cliquer sur le rocher → mini-jeu de taille.
   ============================================================ */

export default function SceneAtelier({ collect, action, reveal, made = [], inv = [] }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        {/* ciel de matin plus subtil (dégradé chaud comme le campement) */}
        <linearGradient id="at-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a5a7a" />
          <stop offset="30%" stopColor="#8a9ab0" />
          <stop offset="60%" stopColor="#c8b498" />
          <stop offset="100%" stopColor="#e8c890" />
        </linearGradient>
        <linearGradient id="at-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a7248" />
          <stop offset="45%" stopColor="#7a6238" />
          <stop offset="100%" stopColor="#3a2a18" />
        </linearGradient>
        <linearGradient id="at-rock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a09488" />
          <stop offset="50%" stopColor="#7a6c60" />
          <stop offset="100%" stopColor="#3a3428" />
        </linearGradient>
        <linearGradient id="at-trunk" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4c3626" />
          <stop offset="45%" stopColor="#6a4c34" />
          <stop offset="100%" stopColor="#2e2016" />
        </linearGradient>
        <radialGradient id="at-canopy" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#4c6244" />
          <stop offset="70%" stopColor="#2c4030" />
          <stop offset="100%" stopColor="#1e2c22" />
        </radialGradient>
        <radialGradient id="at-sunhalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe4a8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffe4a8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="at-nodule" cx="35%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#6a5a48" />
          <stop offset="60%" stopColor="#3a3028" />
          <stop offset="100%" stopColor="#1a1408" />
        </radialGradient>
        <filter id="at-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="at-blur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="7" /></filter>
      </defs>

      {/* ═══ ciel (fixe) ═══ */}
      <rect width="1000" height="400" fill="url(#at-sky)" />
      {/* halo lumineux général du matin */}
      <ellipse cx="700" cy="120" rx="360" ry="180" fill="url(#at-sunhalo)" />
      {/* SOLEIL bas et chaud, avec double halo */}
      <circle cx="780" cy="130" r="46" fill="#ffe4a8" opacity="0.35" filter="url(#at-blur)" />
      <circle cx="780" cy="130" r="30" fill="#f8f0c8" opacity="0.8" />
      <circle cx="780" cy="130" r="20" fill="#fff4d0" />
      {/* rayons diffus du soleil dans le ciel */}
      <g opacity="0.35">
        {[[-200, -30], [-120, -80], [-40, -110], [40, -110], [120, -80], [200, -30]].map(([dx, dy], i) => (
          <path key={i} d={`M780 130 L${780 + dx * 2.6} ${130 + dy * 2.6}`} stroke="#ffe4a8" strokeWidth="2" strokeLinecap="round" filter="url(#at-blur)" />
        ))}
      </g>
      {/* nuages étirés du matin */}
      {[[120, 70], [360, 55], [600, 90], [900, 65]].map(([x, y], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx="80" ry="9" fill="#f0e8d0" opacity="0.55" filter="url(#at-blur)" />
          <ellipse cx={x + 30} cy={y + 8} rx="46" ry="5" fill="#f8f0d8" opacity="0.4" />
        </g>
      ))}
      {/* petit oiseau qui plane près du soleil */}
      <path d="M540 145 q6 -6 12 0 q6 -6 12 0" stroke="#3a2a18" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.75" />

      <PLayer depth={4}>
        {/* MONTAGNES lointaines bleutées, deux crêtes qui se chevauchent */}
        <path d="M0 360 L0 260 L140 220 L280 260 L400 200 L540 240 L680 210 L820 240 L1000 220 L1000 360 Z" fill="#5a6a86" opacity="0.4" />
        <path d="M0 360 L0 310 L120 270 L260 300 L380 260 L520 290 L660 270 L800 290 L1000 275 L1000 360 Z" fill="#6a7a94" opacity="0.55" />

        {/* FORÊT lointaine embrumée */}
        <rect y="300" width="1000" height="90" fill="#3e4a5a" opacity="0.55" />
        {[80, 190, 320, 460, 600, 730, 850, 940].map((x, i) => (
          <g key={i} opacity={0.55 - (i % 3) * 0.1}>
            <ellipse cx={x} cy={288 + (i % 3) * 10} rx={30 + (i % 3) * 8} ry={22 + (i % 2) * 4} fill="#3a4864" />
          </g>
        ))}
        {/* nappes de brume */}
        <ellipse cx="300" cy="342" rx="300" ry="14" fill="#e8dcc4" opacity="0.22" filter="url(#at-blur)" />
        <ellipse cx="740" cy="352" rx="280" ry="12" fill="#f4e4c0" opacity="0.2" filter="url(#at-blur)" />

        {/* silhouette de la GROTTE avec entrée sombre + FUMÉE qui monte */}
        <g>
          <path d="M0 360 L0 200 Q40 175 120 185 Q180 195 210 250 Q240 300 220 360 Z" fill="#4a3a26" />
          <path d="M0 360 L0 200 Q40 175 120 185 Q180 195 210 250 Q240 300 220 360 Z" fill="#2a1e10" opacity="0.4" filter="url(#at-grain)" />
          {/* entrée noire */}
          <path d="M50 360 Q40 290 70 250 Q110 230 150 250 Q170 290 160 360 Z" fill="#0a0604" />
          {/* lueur du feu depuis l'entrée */}
          <ellipse cx="100" cy="320" rx="30" ry="16" fill="#ff9540" opacity="0.28" style={{ animation: "glow 2.6s ease-in-out infinite" }} />
          {/* fumée qui sort de l'entrée */}
          {[0, 1, 2].map((i) => (
            <ellipse key={i} cx={100 + i * 4} cy={220 - i * 18} rx={12 + i * 2} ry={8 + i} fill="#e0d8c0" opacity={0.5 - i * 0.12}
              style={{ animation: `smokeRise ${4 + i}s ease-in-out infinite` }} />
          ))}
        </g>
      </PLayer>

      {/* ═══ couche intermédiaire : grands arbres qui cadrent ═══ */}
      <PLayer depth={2.5}>
        {/* grand arbre à droite : cadre la scène */}
        <g>
          <rect x="920" y="120" width="34" height="290" fill="url(#at-trunk)" rx="8" />
          <rect x="920" y="120" width="34" height="290" fill="#221408" opacity="0.5" filter="url(#at-grain)" rx="8" />
          <path d="M928 160 q5 90 -1 200 M942 140 q4 100 1 240" stroke="#33231a" strokeWidth="2" fill="none" opacity="0.7" />
          <ellipse cx="944" cy="290" rx="4" ry="8" fill="#2c1c10" />
          <ellipse cx="938" cy="112" rx="90" ry="70" fill="url(#at-canopy)" />
          <ellipse cx="880" cy="140" rx="52" ry="38" fill="url(#at-canopy)" />
          {[[900, 90], [948, 74], [986, 100]].map(([x, y], i) => (
            <path key={i} d={`M${x} ${y} q6 -8 14 -8 q-3 8 -14 8 Z`} fill="#54724a" opacity="0.85" />
          ))}
          {/* lueur du soleil sur le tronc côté droit */}
          <path d="M950 130 q4 130 -2 260" stroke="#a8865c" strokeWidth="2" fill="none" opacity="0.4" />
        </g>
        {/* branche basse qui descend de la droite (première plan de canopée) */}
        <g>
          <path d="M1000 200 q-40 20 -80 30" stroke="#4c3626" strokeWidth="5" fill="none" strokeLinecap="round" />
          <ellipse cx="908" cy="234" rx="34" ry="20" fill="url(#at-canopy)" />
          <ellipse cx="944" cy="222" rx="22" ry="14" fill="url(#at-canopy)" opacity="0.85" />
        </g>
        {/* sapin de lisière à mi-plan (gauche) */}
        <g transform="translate(260,352)">
          <path d="M-3 0 L3 0 L2 -18 L-2 -18 Z" fill="#2e1f14" />
          <path d="M0 -82 L18 -52 L8 -54 L26 -30 L12 -32 L30 -6 L-30 -6 L-12 -32 L-26 -30 L-8 -54 L-18 -52 Z" fill="#26402e" />
          <path d="M0 -82 L18 -52 L8 -54 L26 -30 L12 -32 L18 -22 L-2 -26 Z" fill="#3a5a40" opacity="0.7" />
        </g>
      </PLayer>

      <PLayer depth={2}>
        <rect y="360" width="1000" height="200" fill="url(#at-ground)" />
        {/* texture terre : petites tavelures granuleuses */}
        <rect y="360" width="1000" height="200" fill="#3a2818" opacity="0.35" filter="url(#at-grain)" />

        {/* zone d'atelier — sol de terre battue avec double ombre */}
        <ellipse cx="500" cy="450" rx="300" ry="40" fill="#1a0e04" opacity="0.4" />
        <ellipse cx="500" cy="440" rx="240" ry="26" fill="#2a1e10" opacity="0.5" />

        {/* Traces de pas dans la terre autour du rocher */}
        {[[380, 500], [420, 522], [590, 500], [620, 520], [400, 540], [610, 542]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y}) rotate(${(i * 40) % 60 - 30})`}>
            <ellipse cx="0" cy="0" rx="8" ry="4" fill="#1a0e04" opacity="0.35" />
            <ellipse cx="0" cy="-5" rx="3" ry="2" fill="#1a0e04" opacity="0.3" />
          </g>
        ))}

        {/* Rocher plat central (l'ÉTABLI) — plus texturé */}
        <g>
          <ellipse cx="500" cy="472" rx="106" ry="20" fill="#0a0604" opacity="0.6" />
          <path d="M420 460 Q440 448 500 446 Q560 448 580 462 L580 480 Q560 490 500 490 Q440 488 420 478 Z" fill="url(#at-rock)" stroke="#1a0e08" strokeWidth="2" />
          {/* texture grain sur le rocher */}
          <path d="M420 460 Q440 448 500 446 Q560 448 580 462 L580 480 Q560 490 500 490 Q440 488 420 478 Z" fill="#3a3428" opacity="0.4" filter="url(#at-grain)" />
          {/* stries + fissures sur le rocher */}
          <path d="M440 462 q20 -8 40 -2 M510 458 q20 4 50 8 M450 480 q30 -4 60 0" stroke="#4a4238" strokeWidth="0.8" fill="none" opacity="0.65" />
          {/* mousse au bord */}
          <path d="M418 466 q4 -3 8 0 q-2 4 -8 0 Z" fill="#5a7030" opacity="0.75" />
          <path d="M574 468 q4 -3 8 0 q-2 4 -8 0 Z" fill="#5a7030" opacity="0.7" />
          {/* nodule au centre — halo léger + brillant */}
          <ellipse cx="500" cy="462" rx="22" ry="14" fill="url(#at-nodule)" stroke="#0a0806" strokeWidth="1.8" />
          <path d="M486 455 Q500 449 514 456" stroke="#a89478" strokeWidth="1.4" fill="none" opacity="0.75" />
          <path d="M492 460 Q500 458 508 462" stroke="#8a7860" strokeWidth="0.8" fill="none" opacity="0.55" />
          {/* petit reflet lumineux en haut à gauche */}
          <ellipse cx="490" cy="455" rx="4" ry="1.5" fill="#e8dfc8" opacity="0.35" />
        </g>

        {/* Éclats de silex éparpillés au sol — variés en taille, plus nombreux */}
        {[[380, 500, -12, 1.1], [420, 510, 8, 0.8], [560, 512, -20, 1.3], [610, 500, 15, 0.9], [340, 520, 30, 1.1],
          [660, 522, -8, 0.7], [470, 528, 45, 0.7], [520, 534, -12, 1.0], [400, 486, 60, 0.6], [590, 490, 20, 0.8]].map(([x, y, r, s], i) => (
          <g key={i} transform={`translate(${x},${y}) rotate(${r}) scale(${s})`}>
            <path d="M-6 0 L4 -4 L6 2 L-2 6 Z" fill="#4a4238" stroke="#1a1408" strokeWidth="0.6" />
            <path d="M-3 -1 L3 -2" stroke="#c8b8a0" strokeWidth="0.5" opacity="0.75" />
            {/* petit tranchant clair */}
            <path d="M-6 0 L4 -4" stroke="#e8d8b0" strokeWidth="0.35" opacity="0.6" />
          </g>
        ))}

        {/* Tas de silex bruts à droite — disparaît une fois ramassé */}
        {!inv.includes("silex_brut") && (
        <g transform="translate(760,500)">
          <ellipse cx="0" cy="12" rx="46" ry="9" fill="#0a0604" opacity="0.55" />
          <path d="M-32 0 Q-26 -22 -6 -24 Q12 -26 28 -20 Q40 -8 32 8 L22 14 Q0 16 -22 14 L-32 8 Z" fill="url(#at-rock)" stroke="#1a0e08" strokeWidth="1.5" />
          <ellipse cx="-16" cy="-8" rx="14" ry="9" fill="url(#at-nodule)" stroke="#1a0e08" strokeWidth="0.8" />
          <ellipse cx="10" cy="-10" rx="12" ry="7" fill="url(#at-nodule)" stroke="#1a0e08" strokeWidth="0.8" />
          <ellipse cx="-4" cy="-2" rx="10" ry="6" fill="url(#at-nodule)" stroke="#1a0e08" strokeWidth="0.8" />
          <path d="M-20 -12 q3 -2 6 0 M6 -14 q3 -2 6 0" stroke="#c8b8a0" strokeWidth="0.6" fill="none" opacity="0.7" />
        </g>
        )}

        {/* Percuteur en bois de cerf — plus détaillé */}
        <g transform="translate(600,478) rotate(-30)">
          {/* ombre */}
          <ellipse cx="0" cy="8" rx="4" ry="1.5" fill="#0a0604" opacity="0.5" />
          {/* manche avec striure de fibres */}
          <rect x="-2.5" y="-26" width="5" height="32" rx="1.2" fill="#8a6a4a" stroke="#3a2818" strokeWidth="0.8" />
          <path d="M-2 -20 L-2 4 M2 -20 L2 4" stroke="#5a4028" strokeWidth="0.4" />
          {/* tête bois de cerf poli */}
          <ellipse cx="0" cy="-26" rx="7" ry="5" fill="#a88848" stroke="#3a2818" strokeWidth="0.8" />
          <ellipse cx="-1" cy="-27" rx="3" ry="2" fill="#c8a878" opacity="0.6" />
          {/* ramifications du bois */}
          <path d="M-5 -28 l-4 -4 M5 -28 l4 -4 M0 -32 l0 -6" stroke="#a88848" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M-8 -32 l-2 -3 M8 -32 l2 -3 M-1 -36 l-2 -3 M1 -36 l2 -3" stroke="#a88848" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* Petites touffes d'herbe au sol */}
        {[[80, 510], [220, 500], [880, 505], [950, 520]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <path d="M-6 4 q4 -12 0 -16 M0 4 q4 -14 0 -18 M6 4 q4 -12 0 -16" stroke="#4a5820" strokeWidth="1" fill="none" strokeLinecap="round" />
          </g>
        ))}

        {/* Séchoir à peaux (à droite du tas de silex) — trois perches en trépied
            avec une peau tendue, motif traditionnel. Ajoute de la profondeur. */}
        <g transform="translate(880,470)">
          {/* trépied */}
          <path d="M-30 30 L0 -60 M30 30 L0 -60 M0 30 L0 -60" stroke="#4a3018" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M-8 -50 L8 -50" stroke="#4a3018" strokeWidth="2.5" strokeLinecap="round" />
          {/* peau tendue */}
          <path d="M-22 -32 Q0 -42 22 -32 L20 20 Q0 26 -20 20 Z" fill="#8a6240" />
          <path d="M-22 -32 Q0 -42 22 -32 L20 20 Q0 26 -20 20 Z" fill="#5c3a22" opacity="0.4" filter="url(#at-grain)" />
          {/* liens de tension */}
          <path d="M-22 -32 l-6 -4 M22 -32 l6 -4 M-20 20 l-6 6 M20 20 l6 6" stroke="#3a2418" strokeWidth="1.2" />
          <path d="M-16 -22 q16 -6 32 0 M-16 -6 q16 -6 32 0 M-14 10 q14 -5 28 0" stroke="#6e4a2c" strokeWidth="1.4" fill="none" opacity="0.7" />
          <path d="M-18 -30 q18 -5 36 0" stroke="#c9a878" strokeWidth="1.2" fill="none" opacity="0.5" />
        </g>

        {/* Petit bol en écorce à cotè du percuteur, avec des chutes de silex dedans */}
        <g transform="translate(555,510)">
          <ellipse cx="0" cy="4" rx="14" ry="4" fill="#0a0604" opacity="0.5" />
          <path d="M-12 0 Q-14 -8 0 -10 Q14 -8 12 0 Q10 4 0 6 Q-10 4 -12 0 Z" fill="#6a4a2c" stroke="#3a2418" strokeWidth="0.8" />
          <ellipse cx="0" cy="-4" rx="9" ry="2.5" fill="#3a2818" />
          {/* petits éclats dedans */}
          <path d="M-4 -5 l3 -1 M2 -6 l3 -1 M-1 -3 l2 -2" stroke="#c8b8a0" strokeWidth="0.6" strokeLinecap="round" opacity="0.7" />
        </g>

        {/* PAPILLON qui vole en boucle entre les touffes d'herbe — ambiance
            vivante, discrète. Chemin en zigzag naturel, ailes qui battent. */}
        <g>
          <animateTransform attributeName="transform" type="translate"
            values="150,480; 300,440; 480,470; 620,430; 750,470; 900,440; 150,480"
            dur="18s" repeatCount="indefinite" />
          <g>
            {/* battement d'ailes en scale sur X */}
            <animateTransform attributeName="transform" type="scale"
              values="1,1; 0.35,1; 1,1" dur="0.28s" repeatCount="indefinite" />
            {/* corps */}
            <ellipse cx="0" cy="0" rx="0.8" ry="3" fill="#1a1408" />
            {/* aile gauche */}
            <path d="M0 -1 q-6 -4 -6 1 q0 4 6 2 Z" fill="#e08840" stroke="#5a2810" strokeWidth="0.3" />
            {/* aile droite */}
            <path d="M0 -1 q6 -4 6 1 q0 4 -6 2 Z" fill="#e08840" stroke="#5a2810" strokeWidth="0.3" />
            {/* petits points sur les ailes */}
            <circle cx="-3" cy="0" r="0.6" fill="#1a1408" />
            <circle cx="3" cy="0" r="0.6" fill="#1a1408" />
          </g>
        </g>

        {/* NUAGE DE POUSSIÈRE DE TAILLE : petits points blancs qui montent depuis
            l'établi, effet « silex qui se débite en direct ». Discret, pas
            envahissant, mais donne vie à l'atelier. */}
        <g opacity="0.7">
          {[[494, 440, 0], [502, 448, 0.5], [510, 434, 1.1], [488, 456, 1.6],
            [516, 452, 0.3], [498, 428, 2.2], [508, 460, 1.4]].map(([x, y, d], i) => (
            <circle key={i} cx={x} cy={y} r={1.2 + (i % 3) * 0.5} fill="#e8dfc8"
              style={{ animation: `spark ${2.5 + (i % 4) * 0.7}s linear ${d}s infinite` }} />
          ))}
        </g>
      </PLayer>

      <PLayer depth={1}>
        {/* CHENG le tailleur, accroupi à gauche du rocher */}
        <g transform="translate(340,458)">
          {/* jambes repliées */}
          <ellipse cx="0" cy="50" rx="34" ry="12" fill="#5a3818" />
          {/* torse */}
          <path d="M-24 30 Q-22 -14 0 -20 Q22 -14 24 30 Z" fill="#8a5828" />
          {/* peau de bête sur les épaules */}
          <path d="M-26 -10 Q0 -22 26 -10 L28 20 Q0 12 -28 20 Z" fill="#5a3818" opacity="0.85" />
          {/* tête */}
          <ellipse cx="0" cy="-30" rx="14" ry="16" fill="#c8946a" />
          {/* cheveux longs bruns */}
          <path d="M-12 -34 q-4 -6 4 -12 q6 8 8 -2 q4 8 6 -2 q6 6 6 12 q-2 -6 -12 -8 q-10 4 -12 12 Z" fill="#3a2418" />
          <path d="M-14 -30 q-3 12 0 22 M14 -30 q3 12 0 22" stroke="#3a2418" strokeWidth="4" />
          {/* yeux + moustache */}
          <circle cx="-5" cy="-30" r="1.6" fill="#2a1a10" />
          <circle cx="5" cy="-30" r="1.6" fill="#2a1a10" />
          <path d="M-4 -22 q4 -1 8 0" stroke="#3a2418" strokeWidth="1.4" fill="none" />
          {/* bras qui tient un percuteur */}
          <path d="M22 0 Q40 -4 48 12" stroke="#8a5828" strokeWidth="10" fill="none" strokeLinecap="round" />
        </g>

        {/* « ? » de dialogue au-dessus de Cheng */}
        <g transform="translate(340,400)" style={{ animation: "float 2s ease-in-out infinite" }}>
          <circle r="14" fill="#ffd166" stroke="#8a5a20" strokeWidth="2" />
          <text y="5" textAnchor="middle" fontSize="18" fontWeight="800" fill="#3a2410">?</text>
        </g>

        {/* Objets d'époque décoratifs (ephemere) : feuilles, coccinelle, brindille
            — disparaissent une fois dans le sac. */}
        {!inv.includes("feuille_morte") && (
        <g transform="translate(120,540) rotate(-8)">
          <path d="M0 0 q-8 -10 -14 -6 q-4 6 6 10 q10 4 8 -4 Z" fill="#a05820" stroke="#5a2810" strokeWidth="0.8" />
          <path d="M-2 0 q-4 -6 -8 -4" stroke="#5a2810" strokeWidth="0.6" fill="none" />
        </g>
        )}
        {!inv.includes("coccinelle") && (
        <g transform="translate(660,542)">
          <ellipse cx="0" cy="0" rx="5" ry="4" fill="#c8382e" stroke="#3a0a0a" strokeWidth="0.5" />
          <path d="M0 -4 L0 4" stroke="#3a0a0a" strokeWidth="0.8" />
          <circle cx="-2" cy="-1" r="0.6" fill="#3a0a0a" />
          <circle cx="2" cy="-1" r="0.6" fill="#3a0a0a" />
          <circle cx="-2" cy="1.5" r="0.6" fill="#3a0a0a" />
          <circle cx="2" cy="1.5" r="0.6" fill="#3a0a0a" />
          <ellipse cx="0" cy="-4.5" rx="1.5" ry="1.2" fill="#1a0a06" />
        </g>
        )}
        {!inv.includes("brindille") && (
        <g transform="translate(280,528) rotate(30)">
          <path d="M0 0 L18 0" stroke="#8a6a48" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M4 0 l3 -3 M9 0 l3 3 M14 0 l3 -3" stroke="#5a4028" strokeWidth="0.8" />
        </g>
        )}
      </PLayer>

      {/* ═══ zones cliquables ═══ */}
      <Hotspot cx={340} cy={430} r={44} label="Ough, le tailleur de silex" reveal={reveal} onClick={() => action("ough")} />
      <Hotspot cx={500} cy={470} r={50} label="rocher de taille — glisse un silex brut dessus" item="rocher_taille" reveal={reveal} onClick={() => action("tailler_silex")} />
      <Hotspot cx={760} cy={490} r={44} label="tas de silex bruts" item="silex_brut" reveal={reveal} onClick={() => collect("silex_brut")} />
      <Hotspot cx={600} cy={470} r={20} label="percuteur en bois de cerf" item="percuteur" reveal={reveal} onClick={() => collect("percuteur")} />
      <Hotspot cx={120} cy={540} r={16} label="feuille morte" item="feuille_morte" reveal={reveal} onClick={() => collect("feuille_morte")} />
      <Hotspot cx={660} cy={542} r={12} label="coccinelle" item="coccinelle" reveal={reveal} onClick={() => collect("coccinelle")} />
      <Hotspot cx={294} cy={528} r={16} label="brindille" item="brindille" reveal={reveal} onClick={() => collect("brindille")} />
    </svg>
  );
}
