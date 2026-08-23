import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 1 — Tableau : L'ATELIER DE SILEX
   ------------------------------------------------------------
   Une clairière à côté de la grotte. Cheng, le tailleur, y débite
   des nucléus. Rocher plat qui sert d'établi, éclats au sol,
   nodules bruts en tas. Cliquer sur le rocher → mini-jeu de taille.
   ============================================================ */

export default function SceneAtelier({ collect, action, reveal, made = [] }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="at-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8ea0a8" /><stop offset="100%" stopColor="#a0b090" /></linearGradient>
        <linearGradient id="at-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7a6238" /><stop offset="100%" stopColor="#3a2a18" /></linearGradient>
        <linearGradient id="at-rock" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a8078" /><stop offset="100%" stopColor="#3a3428" /></linearGradient>
      </defs>

      <PLayer depth={4}>
        <rect width="1000" height="360" fill="url(#at-sky)" />
        {/* silhouette de la grotte proche à gauche */}
        <path d="M0 360 L0 220 Q50 200 120 210 Q180 220 200 260 Q230 300 220 360 Z" fill="#3a2a18" opacity="0.85" />
        <path d="M40 360 Q30 300 60 260 Q100 240 140 260 Q160 300 150 360 Z" fill="#1a0e08" />
        {/* forêt de fond à droite */}
        {[600, 660, 720, 780, 840, 900, 960].map((x, i) => {
          const h = 60 + (i % 3) * 20;
          return <path key={i} d={`M${x} 360 L${x - 20} ${360 - h} L${x} ${360 - h - 12} L${x + 20} ${360 - h} Z`} fill="#3a4a28" opacity="0.75" />;
        })}
        {/* nuages */}
        {[[200, 90], [500, 70], [800, 100]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="60" ry="10" fill="#e0e0d0" opacity="0.5" />
        ))}
      </PLayer>

      <PLayer depth={2}>
        <rect y="360" width="1000" height="200" fill="url(#at-ground)" />
        {/* zone d'atelier — traces de piétinement */}
        <ellipse cx="500" cy="440" rx="260" ry="30" fill="#2a1e10" opacity="0.35" />

        {/* Rocher plat central (l'ÉTABLI) */}
        <g>
          <ellipse cx="500" cy="470" rx="100" ry="18" fill="#5a5048" />
          <path d="M420 460 Q440 448 500 446 Q560 448 580 462 L580 480 Q560 490 500 490 Q440 488 420 478 Z" fill="url(#at-rock)" stroke="#1a0e08" strokeWidth="2" />
          {/* nodule posé prêt à être taillé */}
          <ellipse cx="500" cy="462" rx="20" ry="12" fill="#3a3028" stroke="#0a0806" strokeWidth="1.5" />
          <path d="M482 458 Q500 452 518 460" stroke="#7a6a58" strokeWidth="1" fill="none" opacity="0.6" />
        </g>

        {/* Éclats de silex éparpillés au sol */}
        {[[380, 500, -12], [420, 510, 8], [560, 512, -20], [610, 500, 15], [340, 520, 30], [660, 522, -8]].map(([x, y, r], i) => (
          <g key={i} transform={`translate(${x},${y}) rotate(${r})`}>
            <path d="M-6 0 L4 -4 L6 2 L-2 6 Z" fill="#4a4238" stroke="#1a1408" strokeWidth="0.6" />
            <path d="M-3 -1 L3 -2" stroke="#8a8078" strokeWidth="0.4" opacity="0.7" />
          </g>
        ))}

        {/* Tas de nodules bruts à droite */}
        <g transform="translate(760,500)">
          <ellipse cx="0" cy="8" rx="42" ry="8" fill="#1a1408" opacity="0.5" />
          <path d="M-30 0 Q-24 -20 -6 -22 Q10 -24 26 -18 Q36 -8 30 6 L20 12 Q0 14 -20 12 L-30 6 Z" fill="#3a3028" stroke="#1a0e08" strokeWidth="1.5" />
          <ellipse cx="-15" cy="-6" rx="14" ry="8" fill="#4a4038" opacity="0.6" />
          <ellipse cx="12" cy="-4" rx="10" ry="6" fill="#4a4038" opacity="0.5" />
        </g>

        {/* Percuteur en bois de cerf posé à côté du rocher */}
        <g transform="translate(600,478) rotate(-30)">
          <rect x="-2" y="-24" width="4" height="30" rx="1" fill="#8a6a4a" stroke="#3a2818" strokeWidth="0.8" />
          <ellipse cx="0" cy="-24" rx="6" ry="4" fill="#a88848" stroke="#3a2818" strokeWidth="0.8" />
          <path d="M-4 -26 l-3 -3 M4 -26 l3 -3" stroke="#a88848" strokeWidth="1.5" strokeLinecap="round" />
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

        {/* Objets d'époque décoratifs (ephemere) : feuilles, coccinelle, brindille */}
        <g transform="translate(120,540) rotate(-8)">
          <path d="M0 0 q-8 -10 -14 -6 q-4 6 6 10 q10 4 8 -4 Z" fill="#a05820" stroke="#5a2810" strokeWidth="0.8" />
          <path d="M-2 0 q-4 -6 -8 -4" stroke="#5a2810" strokeWidth="0.6" fill="none" />
        </g>
        <g transform="translate(660,542)">
          <ellipse cx="0" cy="0" rx="5" ry="4" fill="#c8382e" stroke="#3a0a0a" strokeWidth="0.5" />
          <path d="M0 -4 L0 4" stroke="#3a0a0a" strokeWidth="0.8" />
          <circle cx="-2" cy="-1" r="0.6" fill="#3a0a0a" />
          <circle cx="2" cy="-1" r="0.6" fill="#3a0a0a" />
          <circle cx="-2" cy="1.5" r="0.6" fill="#3a0a0a" />
          <circle cx="2" cy="1.5" r="0.6" fill="#3a0a0a" />
          <ellipse cx="0" cy="-4.5" rx="1.5" ry="1.2" fill="#1a0a06" />
        </g>
        <g transform="translate(280,528) rotate(30)">
          <path d="M0 0 L18 0" stroke="#8a6a48" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M4 0 l3 -3 M9 0 l3 3 M14 0 l3 -3" stroke="#5a4028" strokeWidth="0.8" />
        </g>
      </PLayer>

      {/* ═══ zones cliquables ═══ */}
      <Hotspot cx={340} cy={430} r={44} label="Cheng, le tailleur" reveal={reveal} onClick={() => action("cheng")} />
      <Hotspot cx={500} cy={470} r={50} label="tailler un silex sur le rocher" reveal={reveal} onClick={() => action("tailler_silex")} />
      <Hotspot cx={760} cy={490} r={44} label="tas de nodules bruts" item="silex" reveal={reveal} onClick={() => collect("silex")} />
      <Hotspot cx={600} cy={470} r={20} label="percuteur en bois de cerf" item="percuteur" reveal={reveal} onClick={() => collect("percuteur")} />
      <Hotspot cx={120} cy={540} r={16} label="feuille morte" item="feuille_morte" reveal={reveal} onClick={() => collect("feuille_morte")} />
      <Hotspot cx={660} cy={542} r={12} label="coccinelle" item="coccinelle" reveal={reveal} onClick={() => collect("coccinelle")} />
      <Hotspot cx={294} cy={528} r={16} label="brindille" item="brindille" reveal={reveal} onClick={() => collect("brindille")} />
    </svg>
  );
}
