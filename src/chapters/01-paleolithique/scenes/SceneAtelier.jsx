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
        <linearGradient id="at-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8ea0a8" />
          <stop offset="60%" stopColor="#a8b8a0" />
          <stop offset="100%" stopColor="#c0c8a0" />
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
      </defs>

      <PLayer depth={4}>
        <rect width="1000" height="360" fill="url(#at-sky)" />
        {/* nuages étirés + rayons diffus du soleil */}
        {[[120, 70], [360, 55], [600, 90], [840, 65]].map(([x, y], i) => (
          <g key={i}>
            <ellipse cx={x} cy={y} rx="80" ry="9" fill="#f0e8d0" opacity="0.6" />
            <ellipse cx={x + 30} cy={y + 8} rx="46" ry="5" fill="#f8f0d8" opacity="0.4" />
          </g>
        ))}
        {/* SOLEIL doux */}
        <circle cx="820" cy="100" r="34" fill="#f8f0c8" opacity="0.65" />
        <circle cx="820" cy="100" r="22" fill="#fff4d0" opacity="0.9" />

        {/* MONTAGNE lointaine bleutée */}
        <path d="M0 360 L0 300 L140 240 L280 280 L400 220 L540 260 L680 230 L820 260 L1000 240 L1000 360 Z" fill="#7a8098" opacity="0.55" />

        {/* silhouette de la GROTTE avec entrée sombre + FUMÉE qui monte */}
        <g>
          <path d="M0 360 L0 200 Q40 175 120 185 Q180 195 210 250 Q240 300 220 360 Z" fill="#4a3a26" />
          <path d="M0 360 L0 200 Q40 175 120 185 Q180 195 210 250 Q240 300 220 360 Z" fill="#2a1e10" opacity="0.4" filter="url(#at-grain)" />
          {/* entrée noire */}
          <path d="M50 360 Q40 290 70 250 Q110 230 150 250 Q170 290 160 360 Z" fill="#0a0604" />
          {/* fumée qui sort de l'entrée */}
          {[0, 1, 2].map((i) => (
            <ellipse key={i} cx={100 + i * 4} cy={220 - i * 18} rx={12 + i * 2} ry={8 + i} fill="#e0d8c0" opacity={0.5 - i * 0.12}
              style={{ animation: `smokeRise ${4 + i}s ease-in-out infinite` }} />
          ))}
        </g>

        {/* FORÊT de fond à droite avec plus de détails (troncs + feuillages) */}
        {[600, 650, 700, 750, 800, 860, 920, 970].map((x, i) => {
          const h = 70 + (i % 4) * 18;
          return (
            <g key={i}>
              {/* tronc */}
              <rect x={x - 1.5} y={360 - h * 0.35} width="3" height={h * 0.35} fill="#2a1a10" opacity="0.75" />
              {/* feuillage */}
              <ellipse cx={x} cy={360 - h * 0.7} rx={12 + (i % 3) * 2} ry={h * 0.35} fill="#3a4a28" opacity="0.85" />
              <ellipse cx={x - 3} cy={360 - h * 0.65} rx="6" ry={h * 0.2} fill="#4a5a30" opacity="0.6" />
            </g>
          );
        })}
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
