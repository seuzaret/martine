/* ============================================================
   CHAPITRE 1 — Portraits « gros plan »
   Utilisés par la quête (étapes avec `portrait: "…"`) : le
   personnage apparaît en grand, face au joueur, comme s'il
   s'avançait devant l'écran. Style plus travaillé que les
   silhouettes des décors — dessiné ici, donc libre de droits.
   ============================================================ */

/* ANA — l'accueillante du clan. Longs cheveux bruns, une peau
   nouée sur l'épaule, un collier de coquillages, un sourire
   doux… et la paume teintée d'ocre, levée pour dire bonjour. */
export function PortraitAna() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pAnaHalo" cx="50%" cy="40%" r="62%">
          <stop offset="0%" stopColor="#ffe4a8" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#f0c890" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#f0c890" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pAnaSkin" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="#d8a97a" />
          <stop offset="55%" stopColor="#c89a72" />
          <stop offset="100%" stopColor="#b0855c" />
        </linearGradient>
        <linearGradient id="pAnaFur" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#96754f" />
          <stop offset="100%" stopColor="#6a4f34" />
        </linearGradient>
        <linearGradient id="pAnaHair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#453222" />
          <stop offset="100%" stopColor="#2b1d10" />
        </linearGradient>
      </defs>

      {/* halo doux du matin */}
      <circle cx="150" cy="138" r="130" fill="url(#pAnaHalo)" />

      {/* chevelure ARRIÈRE (derrière les épaules) */}
      <path d="M98 116 Q76 178 84 246 Q88 272 104 282 L114 238 Q102 178 106 130 Z" fill="#2b1d10" />
      <path d="M202 116 Q226 176 219 248 Q214 276 197 284 L189 236 Q202 178 195 128 Z" fill="#2b1d10" />

      {/* LE BRAS LEVÉ qui salue — la paume teintée d'ocre, doigts déliés */}
      <g style={{ animation: "sway 3s ease-in-out infinite", transformOrigin: "240px 164px", transformBox: "view-box" }}>
        <path d="M220 258 Q236 208 240 166" stroke="url(#pAnaSkin)" strokeWidth="25" strokeLinecap="round" fill="none" />
        <path d="M228 240 Q238 205 240 176" stroke="#a87b54" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.35" />
        {/* la paume */}
        <path d="M226 108 Q246 98 265 109 Q276 128 268 148 Q250 161 232 151 Q219 130 226 108 Z" fill="#b5502a" />
        {/* les doigts, souples et effilés */}
        <g stroke="#b5502a" strokeLinecap="round" fill="none">
          <path d="M231 108 L226 74" strokeWidth="12" />
          <path d="M245 104 L245 64" strokeWidth="12.5" />
          <path d="M258 107 L263 72" strokeWidth="11.5" />
          <path d="M267 115 L276 89" strokeWidth="10" />
          <path d="M226 124 L206 104" strokeWidth="11.5" />
        </g>
        {/* bouts des doigts un peu plus clairs (l'ocre s'estompe) */}
        <g stroke="#cd5f33" strokeLinecap="round" fill="none" opacity="0.8">
          <path d="M226.5 78 L226 74" strokeWidth="11" />
          <path d="M245 68 L245 64" strokeWidth="11.5" />
          <path d="M262.4 76 L263 72" strokeWidth="10.5" />
          <path d="M274.6 93 L276 89" strokeWidth="9" />
        </g>
        {/* lignes de la paume */}
        <path d="M236 122 q10 8 22 6 M234 134 q10 7 20 4" stroke="#8a2f12" strokeWidth="2" fill="none" opacity="0.55" />
        {/* le poignet : la limite de l'ocre sur la peau */}
        <path d="M230 152 q12 8 24 2" stroke="#b5502a" strokeWidth="6" fill="none" opacity="0.5" />
      </g>

      {/* LE BUSTE : la peau de bête nouée, une épaule nue */}
      <path d="M44 340 Q46 260 94 238 Q122 226 150 228 Q180 226 208 238 Q254 260 256 340 Z" fill="url(#pAnaFur)" />
      {/* l'épaule nue (côté lumière) */}
      <path d="M94 238 Q120 226 150 228 L150 272 Q112 268 94 250 Z" fill="url(#pAnaSkin)" />
      <path d="M98 244 q22 -12 48 -12" stroke="#e0b68a" strokeWidth="3" fill="none" opacity="0.5" />
      {/* mèches de la fourrure, en rangées douces */}
      <g stroke="#54381e" strokeWidth="2.4" fill="none" opacity="0.65">
        <path d="M160 246 q12 -6 24 -1 M196 258 q12 -6 23 0 M170 272 q13 -6 25 0 M120 286 q13 -7 25 0 M150 296 q13 -6 25 0 M196 292 q12 -6 23 0 M84 306 q13 -6 25 0 M172 316 q13 -6 25 0 M120 322 q13 -6 25 0 M220 318 q12 -5 22 0" />
      </g>
      {/* la couture de la tenue sur l'épaule couverte */}
      <path d="M196 240 Q206 262 202 290" stroke="#4a3018" strokeWidth="3" fill="none" opacity="0.6" strokeDasharray="6 5" />

      {/* LE COU */}
      <path d="M134 190 L166 190 L169 240 Q150 248 131 240 Z" fill="url(#pAnaSkin)" />
      <path d="M136 196 q14 8 28 0" stroke="#9a7050" strokeWidth="4" fill="none" opacity="0.4" />

      {/* LE VISAGE : un ovale doux, menton fin */}
      <path d="M150 58 C190 58 208 92 206 130 C204 168 186 198 150 204 C114 198 96 168 94 130 C92 92 110 58 150 58 Z" fill="url(#pAnaSkin)" />
      {/* lumière du matin sur la joue gauche */}
      <path d="M104 116 Q100 152 118 180" stroke="#ffe0a8" strokeWidth="5" fill="none" opacity="0.4" strokeLinecap="round" />
      {/* l'oreille visible + petit coquillage */}
      <ellipse cx="97" cy="142" rx="7" ry="11" fill="#c89a72" />
      <path d="M95 138 q5 2 4 8" stroke="#a87b54" strokeWidth="2" fill="none" />
      <path d="M97 153 l0 6 q0 4 -3 5" stroke="#8a6244" strokeWidth="2" fill="none" />
      <ellipse cx="93" cy="166" rx="3.4" ry="4.6" fill="#e8dcc4" stroke="#b8a884" strokeWidth="1" />

      {/* SOURCILS, doux et expressifs */}
      <path d="M116 125 Q128 118 141 123" stroke="#2c1f14" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M159 123 Q172 118 184 125" stroke="#2c1f14" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      {/* YEUX en amande */}
      <path d="M119 136 Q129 128 140 135 Q130 142 119 136 Z" fill="#fdf4e6" />
      <path d="M160 135 Q171 128 181 136 Q170 142 160 135 Z" fill="#fdf4e6" />
      <circle cx="130" cy="135" r="4.4" fill="#3a2416" />
      <circle cx="170" cy="135" r="4.4" fill="#3a2416" />
      <circle cx="131.6" cy="133.4" r="1.4" fill="#fff" />
      <circle cx="171.6" cy="133.4" r="1.4" fill="#fff" />
      {/* paupières */}
      <path d="M118 135 Q129 127 141 134" stroke="#4a3322" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M159 134 Q171 127 182 135" stroke="#4a3322" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M122 140 Q130 143 138 140 M162 140 Q170 143 178 140" stroke="#a87b54" strokeWidth="1.4" fill="none" opacity="0.6" />

      {/* LE NEZ, discret */}
      <path d="M150 136 Q147 150 144 157 Q142 163 149 164" stroke="#a87b54" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M153 162 q3 1 4 -1" stroke="#a87b54" strokeWidth="1.8" fill="none" opacity="0.6" />

      {/* LE SOURIRE, doux — lèvres légères, fossettes */}
      <path d="M131 173 Q150 183 169 173" stroke="#8a4a34" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M139 180 Q150 186 161 180" stroke="#b06a4e" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.75" />
      <path d="M127 171 q-3 2 -3 5 M173 171 q3 2 3 5" stroke="#a87b54" strokeWidth="1.8" fill="none" opacity="0.55" />
      {/* joues : lumière + une pointe d'ocre */}
      <ellipse cx="119" cy="154" rx="9" ry="5.5" fill="#e8b98c" opacity="0.35" />
      <ellipse cx="181" cy="154" rx="9" ry="5.5" fill="#b5451f" opacity="0.14" />
      {/* les deux traits d'ocre sur la pommette — la marque du clan */}
      <path d="M107 148 l14 -3 M108 156 l12 -2" stroke="#b5451f" strokeWidth="3.4" strokeLinecap="round" opacity="0.55" />
      {/* ombre légère sous le menton */}
      <path d="M140 196 q10 5 20 0" stroke="#9a7050" strokeWidth="2.2" fill="none" opacity="0.4" />

      {/* CHEVELURE AVANT : la frange balayée + les mèches qui encadrent */}
      <path d="M94 132 Q88 70 150 60 Q212 70 206 132 Q198 96 170 90 Q183 76 150 74 Q122 76 111 96 Q99 112 94 132 Z" fill="url(#pAnaHair)" />
      {/* mèches qui tombent devant les épaules */}
      <path d="M96 120 Q86 168 92 212 Q96 236 108 246 Q114 222 107 178 Q103 146 105 124 Z" fill="url(#pAnaHair)" />
      <path d="M204 120 Q216 170 210 216 Q205 242 193 252 Q188 226 195 182 Q199 148 197 124 Z" fill="url(#pAnaHair)" />
      {/* reflets dans les cheveux */}
      <g stroke="#5c4429" strokeWidth="2" fill="none" opacity="0.7">
        <path d="M112 96 Q104 130 100 170 M120 84 Q114 120 112 150" />
        <path d="M188 92 Q198 130 200 172 M180 82 Q188 116 190 148" />
        <path d="M132 74 Q126 82 122 94 M164 74 Q172 82 177 94" />
      </g>
      {/* petites mèches libres */}
      <path d="M116 66 q-8 -8 -17 -9 M184 66 q8 -8 17 -9 M150 60 q-1 -8 -6 -12" stroke="#3a2a1c" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.85" />

      {/* LE COLLIER de coquillages */}
      <path d="M116 252 Q150 272 184 252" stroke="#54381e" strokeWidth="2.6" fill="none" />
      {[[127, 260, -18], [139, 266, -8], [150, 268, 0], [161, 266, 8], [173, 260, 18]].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x},${y}) rotate(${r})`}>
          <path d="M0 0 Q-3.5 4 0 9 Q3.5 4 0 0 Z" fill="#e8dcc4" stroke="#b8a884" strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}
