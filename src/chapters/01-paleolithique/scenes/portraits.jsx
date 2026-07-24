/* ============================================================
   CHAPITRE 1 — Portraits « gros plan »
   Utilisés par la quête (étapes avec `portrait: "…"`) : le
   personnage apparaît en grand, face au joueur, comme s'il
   s'avançait devant l'écran. Même style que les silhouettes
   des décors (celles-ci en plus détaillé) : dessiné ici, donc
   libre de droits et hors-ligne.
   ============================================================ */

/* ANA — l'accueillante du clan. Cheveux en bataille, peau nouée
   sur l'épaule, grand sourire… et les paumes rouges d'ocre,
   levées pour dire bonjour. */
export function PortraitAna() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pAnaHalo" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#ffe4a8" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#f0c890" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#f0c890" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pAnaFur" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9a7852" />
          <stop offset="100%" stopColor="#6e5236" />
        </linearGradient>
      </defs>

      {/* halo du matin derrière elle */}
      <circle cx="150" cy="140" r="132" fill="url(#pAnaHalo)" />

      {/* LE BRAS LEVÉ qui salue (derrière le buste), paume d'ocre bien ouverte */}
      <g style={{ animation: "sway 2.6s ease-in-out infinite", transformOrigin: "226px 250px", transformBox: "view-box" }}>
        <path d="M226 250 Q252 200 250 152" stroke="#c89a72" strokeWidth="30" strokeLinecap="round" fill="none" />
        <path d="M232 240 Q254 200 251 160" stroke="#b5885e" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.4" />
        {/* la main : paume rouge d'ocre, doigts écartés */}
        <g transform="translate(250,128)">
          <ellipse cx="0" cy="0" rx="26" ry="30" fill="#b5451f" />
          <rect x="-24" y="-38" width="11" height="34" rx="5.5" fill="#b5451f" transform="rotate(-14 -18 -20)" />
          <rect x="-9" y="-44" width="11" height="40" rx="5.5" fill="#b5451f" />
          <rect x="6" y="-42" width="11" height="38" rx="5.5" fill="#b5451f" transform="rotate(8 12 -22)" />
          <rect x="19" y="-32" width="10" height="28" rx="5" fill="#b5451f" transform="rotate(22 24 -16)" />
          <rect x="-36" y="-12" width="12" height="26" rx="6" fill="#b5451f" transform="rotate(-52 -30 0)" />
          {/* lignes de la paume, plus sombres */}
          <path d="M-10 -4 q10 8 20 4 M-12 8 q10 7 18 3" stroke="#8a2f12" strokeWidth="2" fill="none" opacity="0.6" />
        </g>
      </g>

      {/* LE BUSTE : la peau nouée sur une épaule */}
      <path d="M44 340 Q48 258 96 236 Q124 224 150 226 Q176 224 204 236 Q252 258 256 340 Z" fill="url(#pAnaFur)" />
      {/* mèches de la fourrure */}
      <path d="M70 300 q14 -6 26 0 M110 282 q14 -7 26 0 M160 280 q14 -6 26 0 M204 300 q13 -6 24 0 M92 322 q13 -6 24 0 M178 322 q14 -6 26 0" stroke="#54381e" strokeWidth="2.6" fill="none" opacity="0.7" />
      {/* l'épaule nue (la peau est nouée d'un seul côté) */}
      <path d="M96 236 Q120 226 150 227 L150 262 Q118 258 98 244 Z" fill="#c89a72" />
      {/* le nœud de la tenue */}
      <circle cx="150" cy="252" r="9" fill="#54381e" />
      <path d="M143 246 l14 12 M157 246 l-14 12" stroke="#3a2412" strokeWidth="2.4" />

      {/* LE COU puis LA TÊTE */}
      <rect x="132" y="196" width="36" height="42" rx="14" fill="#c89a72" />
      <path d="M132 214 q18 8 36 0" stroke="#a87850" strokeWidth="2" fill="none" opacity="0.5" />
      <circle cx="150" cy="140" r="62" fill="#c89a72" />
      {/* la lumière du matin accroche sa joue gauche */}
      <path d="M100 118 Q96 152 116 178" stroke="#ffe0a8" strokeWidth="5" fill="none" opacity="0.45" strokeLinecap="round" />

      {/* LES CHEVEUX en bataille : calotte + mèches rebelles */}
      <path d="M90 128 Q86 66 150 62 Q214 66 210 128 Q196 92 150 90 Q104 92 90 128 Z" fill="#3a2a1c" />
      <path d="M96 106 l-14 -18 M122 84 l-8 -20 M150 78 l0 -22 M178 84 l8 -20 M204 106 l14 -18 M108 92 l-14 -12 M192 92 l14 -12" stroke="#3a2a1c" strokeWidth="7" strokeLinecap="round" />
      {/* petites mèches sur le front */}
      <path d="M118 106 q6 10 -2 18 M150 100 q4 12 -2 20 M182 106 q-6 10 2 18" stroke="#2c1f14" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* LE VISAGE : sourcils, yeux pétillants, nez, grand sourire */}
      <path d="M116 128 q12 -8 24 -2 M160 126 q12 -6 24 2" stroke="#2c1f14" strokeWidth="4" fill="none" strokeLinecap="round" />
      <g>
        <ellipse cx="130" cy="142" rx="7" ry="8.5" fill="#fff6ea" />
        <ellipse cx="170" cy="142" rx="7" ry="8.5" fill="#fff6ea" />
        <circle cx="131" cy="144" r="4" fill="#2c1a10" />
        <circle cx="171" cy="144" r="4" fill="#2c1a10" />
        <circle cx="132.5" cy="142.5" r="1.3" fill="#fff" />
        <circle cx="172.5" cy="142.5" r="1.3" fill="#fff" />
      </g>
      <path d="M148 150 q-3 12 4 16 q-5 3 -9 0" stroke="#a87850" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* le sourire, franc et chaleureux */}
      <path d="M124 176 Q150 198 176 176" stroke="#7a4630" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M130 181 Q150 194 170 181 Q150 190 130 181 Z" fill="#fff6ea" opacity="0.9" />
      {/* joues : une pointe d'ocre (elle en met partout) */}
      <ellipse cx="114" cy="162" rx="10" ry="6" fill="#b5451f" opacity="0.3" />
      <ellipse cx="186" cy="162" rx="10" ry="6" fill="#b5451f" opacity="0.3" />
      {/* une trace d'ocre sur le front, marque de bienvenue */}
      <path d="M138 112 q12 -4 24 0" stroke="#b5451f" strokeWidth="4" fill="none" opacity="0.55" strokeLinecap="round" />

      {/* SON AUTRE MAIN, posée sur le cœur */}
      <g transform="translate(118,268)">
        <ellipse cx="0" cy="0" rx="19" ry="15" fill="#b5451f" />
        <rect x="-22" y="-10" width="9" height="20" rx="4.5" fill="#b5451f" transform="rotate(-30 -18 0)" />
        <path d="M-8 -4 q8 6 16 3" stroke="#8a2f12" strokeWidth="1.8" fill="none" opacity="0.6" />
      </g>
    </svg>
  );
}
