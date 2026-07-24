/* ============================================================
   CHAPITRE 1 — Portraits « gros plan »
   Utilisés par la quête (étapes avec `portrait: "…"`) : le
   personnage apparaît en grand, face au joueur, comme s'il
   s'avançait devant l'écran. Dessinés ici : libres de droits.
   Même construction pour les quatre : halo du matin, chevelure
   arrière, buste en peau de bête, visage ovale, détails.
   ============================================================ */

/* ANA — l'accueillante du clan. Longs cheveux bruns qui couvrent
   tout le crâne, un collier de coquillages, les traits d'ocre du
   clan sur la pommette, un sourire doux. */
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

      <circle cx="150" cy="138" r="130" fill="url(#pAnaHalo)" />

      {/* chevelure ARRIÈRE (derrière les épaules) */}
      <path d="M98 110 Q74 178 84 248 Q88 274 104 284 L114 238 Q102 178 106 124 Z" fill="#2b1d10" />
      <path d="M202 110 Q226 176 219 250 Q214 278 197 286 L189 236 Q202 178 195 122 Z" fill="#2b1d10" />

      {/* LE BUSTE : la peau de bête nouée, une épaule nue */}
      <path d="M44 340 Q46 260 94 238 Q122 226 150 228 Q180 226 208 238 Q254 260 256 340 Z" fill="url(#pAnaFur)" />
      <path d="M94 238 Q120 226 150 228 L150 272 Q112 268 94 250 Z" fill="url(#pAnaSkin)" />
      <path d="M98 244 q22 -12 48 -12" stroke="#e0b68a" strokeWidth="3" fill="none" opacity="0.5" />
      <g stroke="#54381e" strokeWidth="2.4" fill="none" opacity="0.65">
        <path d="M160 246 q12 -6 24 -1 M196 258 q12 -6 23 0 M170 272 q13 -6 25 0 M120 286 q13 -7 25 0 M150 296 q13 -6 25 0 M196 292 q12 -6 23 0 M84 306 q13 -6 25 0 M172 316 q13 -6 25 0 M120 322 q13 -6 25 0 M220 318 q12 -5 22 0" />
      </g>
      <path d="M196 240 Q206 262 202 290" stroke="#4a3018" strokeWidth="3" fill="none" opacity="0.6" strokeDasharray="6 5" />

      {/* LE COU */}
      <path d="M134 190 L166 190 L169 240 Q150 248 131 240 Z" fill="url(#pAnaSkin)" />
      <path d="M136 196 q14 8 28 0" stroke="#9a7050" strokeWidth="4" fill="none" opacity="0.4" />

      {/* LE VISAGE : un ovale doux, menton fin */}
      <path d="M150 58 C190 58 208 92 206 130 C204 168 186 198 150 204 C114 198 96 168 94 130 C92 92 110 58 150 58 Z" fill="url(#pAnaSkin)" />
      <path d="M104 116 Q100 152 118 180" stroke="#ffe0a8" strokeWidth="5" fill="none" opacity="0.4" strokeLinecap="round" />
      {/* l'oreille + petit coquillage */}
      <ellipse cx="97" cy="142" rx="7" ry="11" fill="#c89a72" />
      <path d="M95 138 q5 2 4 8" stroke="#a87b54" strokeWidth="2" fill="none" />
      <ellipse cx="93" cy="166" rx="3.4" ry="4.6" fill="#e8dcc4" stroke="#b8a884" strokeWidth="1" />

      {/* SOURCILS + YEUX en amande */}
      <path d="M116 125 Q128 118 141 123" stroke="#2c1f14" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M159 123 Q172 118 184 125" stroke="#2c1f14" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M119 136 Q129 128 140 135 Q130 142 119 136 Z" fill="#fdf4e6" />
      <path d="M160 135 Q171 128 181 136 Q170 142 160 135 Z" fill="#fdf4e6" />
      <circle cx="130" cy="135" r="4.4" fill="#3a2416" />
      <circle cx="170" cy="135" r="4.4" fill="#3a2416" />
      <circle cx="131.6" cy="133.4" r="1.4" fill="#fff" />
      <circle cx="171.6" cy="133.4" r="1.4" fill="#fff" />
      <path d="M118 135 Q129 127 141 134" stroke="#4a3322" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M159 134 Q171 127 182 135" stroke="#4a3322" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M122 140 Q130 143 138 140 M162 140 Q170 143 178 140" stroke="#a87b54" strokeWidth="1.4" fill="none" opacity="0.6" />

      {/* NEZ + SOURIRE doux */}
      <path d="M150 136 Q147 150 144 157 Q142 163 149 164" stroke="#a87b54" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M153 162 q3 1 4 -1" stroke="#a87b54" strokeWidth="1.8" fill="none" opacity="0.6" />
      <path d="M131 173 Q150 183 169 173" stroke="#8a4a34" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M139 180 Q150 186 161 180" stroke="#b06a4e" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.75" />
      <path d="M127 171 q-3 2 -3 5 M173 171 q3 2 3 5" stroke="#a87b54" strokeWidth="1.8" fill="none" opacity="0.55" />
      <ellipse cx="119" cy="154" rx="9" ry="5.5" fill="#e8b98c" opacity="0.35" />
      <ellipse cx="181" cy="154" rx="9" ry="5.5" fill="#b5451f" opacity="0.14" />
      {/* les deux traits d'ocre — la marque du clan */}
      <path d="M107 148 l14 -3 M108 156 l12 -2" stroke="#b5451f" strokeWidth="3.4" strokeLinecap="round" opacity="0.55" />
      <path d="M140 196 q10 5 20 0" stroke="#9a7050" strokeWidth="2.2" fill="none" opacity="0.4" />

      {/* CHEVELURE AVANT : une vraie calotte pleine, jusqu'en haut du
          crâne (elle DÉPASSE le sommet de la tête : les cheveux ont du
          volume), puis la ligne du front et les mèches sur les épaules */}
      <path d="M92 138 Q78 52 150 44 Q222 52 208 138 Q202 116 184 108 Q166 100 150 101 Q134 100 116 108 Q98 116 92 138 Z" fill="url(#pAnaHair)" />
      <path d="M96 118 Q86 168 92 212 Q96 236 108 246 Q114 222 107 178 Q103 146 105 122 Z" fill="url(#pAnaHair)" />
      <path d="M204 118 Q216 170 210 216 Q205 242 193 252 Q188 226 195 182 Q199 148 197 122 Z" fill="url(#pAnaHair)" />
      {/* la raie et les reflets */}
      <path d="M150 48 Q116 60 104 100 M150 48 Q184 60 196 100 M150 50 L150 100" stroke="#5c4429" strokeWidth="2" fill="none" opacity="0.7" />
      <path d="M124 60 Q112 84 108 116 M176 60 Q188 84 192 116" stroke="#5c4429" strokeWidth="1.6" fill="none" opacity="0.5" />

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

/* RAYA — le chef. Cheveux poivre et sel ramenés en arrière, barbe
   fournie, regard droit sous des sourcils épais, collier de crocs :
   l'autorité tranquille. */
export function PortraitRaya() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pRayaHalo" cx="50%" cy="40%" r="62%">
          <stop offset="0%" stopColor="#ffd9a0" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#e8b880" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#e8b880" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pRayaSkin" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="#c99a6c" />
          <stop offset="55%" stopColor="#b78a5e" />
          <stop offset="100%" stopColor="#9c704a" />
        </linearGradient>
        <linearGradient id="pRayaFur" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7e5f3e" />
          <stop offset="100%" stopColor="#523c26" />
        </linearGradient>
        <linearGradient id="pRayaHair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#57503f" />
          <stop offset="100%" stopColor="#332c1e" />
        </linearGradient>
      </defs>

      <circle cx="150" cy="138" r="130" fill="url(#pRayaHalo)" />

      {/* cheveux arrière, ramenés sur la nuque */}
      <path d="M102 100 Q86 150 94 210 L112 200 Q102 150 112 108 Z" fill="#332c1e" />
      <path d="M198 100 Q214 150 206 210 L188 200 Q198 150 188 108 Z" fill="#332c1e" />

      {/* LE MANTEAU du chef : fourrure épaisse sur les DEUX épaules */}
      <path d="M40 340 Q42 256 92 234 Q122 222 150 224 Q178 222 208 234 Q258 256 260 340 Z" fill="url(#pRayaFur)" />
      <g stroke="#3e2c18" strokeWidth="2.6" fill="none" opacity="0.6">
        <path d="M96 250 q13 -7 26 0 M140 244 q13 -6 26 0 M184 252 q13 -6 25 0 M76 280 q13 -6 26 0 M120 274 q13 -6 26 0 M168 278 q13 -6 26 0 M212 286 q12 -6 24 0 M96 306 q13 -6 26 0 M148 302 q13 -6 26 0 M196 314 q13 -6 25 0 M120 330 q13 -6 26 0" />
      </g>
      {/* l'attache en os du manteau */}
      <rect x="138" y="252" width="24" height="7" rx="3.5" fill="#e0d4bc" stroke="#a89878" strokeWidth="1.2" transform="rotate(-8 150 255)" />

      {/* LE COU */}
      <path d="M133 188 L167 188 L170 236 Q150 244 130 236 Z" fill="url(#pRayaSkin)" />

      {/* LE VISAGE : plus large, mâchoire forte */}
      <path d="M150 60 C193 60 211 94 209 132 C207 168 190 196 150 202 C110 196 93 168 91 132 C89 94 107 60 150 60 Z" fill="url(#pRayaSkin)" />
      <path d="M102 114 Q98 150 114 178" stroke="#ffd9a0" strokeWidth="5" fill="none" opacity="0.35" strokeLinecap="round" />
      <ellipse cx="95" cy="140" rx="7" ry="11" fill="#b78a5e" />
      <path d="M93 136 q5 2 4 8" stroke="#96684a" strokeWidth="2" fill="none" />

      {/* rides du front — l'expérience */}
      <path d="M120 98 Q150 92 180 98 M124 108 Q150 103 176 108" stroke="#96684a" strokeWidth="1.8" fill="none" opacity="0.55" />

      {/* SOURCILS épais, presque froncés */}
      <path d="M113 124 Q127 116 142 122" stroke="#3a3226" strokeWidth="4.6" fill="none" strokeLinecap="round" />
      <path d="M158 122 Q173 116 187 124" stroke="#3a3226" strokeWidth="4.6" fill="none" strokeLinecap="round" />
      {/* YEUX plus étroits, francs */}
      <path d="M119 137 Q129 130 140 136 Q130 142 119 137 Z" fill="#f8efdd" />
      <path d="M160 136 Q171 130 181 137 Q170 142 160 136 Z" fill="#f8efdd" />
      <circle cx="130" cy="136" r="4" fill="#2e1d10" />
      <circle cx="170" cy="136" r="4" fill="#2e1d10" />
      <circle cx="131.4" cy="134.6" r="1.2" fill="#fff" />
      <circle cx="171.4" cy="134.6" r="1.2" fill="#fff" />
      <path d="M118 136 Q129 129 141 135 M159 135 Q171 129 182 136" stroke="#4a3322" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* pattes d'oie */}
      <path d="M114 136 l-7 -2 M114 139 l-7 2 M186 136 l7 -2 M186 139 l7 2" stroke="#96684a" strokeWidth="1.6" opacity="0.6" />

      {/* NEZ plus marqué */}
      <path d="M150 136 Q146 152 143 160 Q141 166 150 167" stroke="#96684a" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <path d="M154 165 q4 1 5 -2" stroke="#96684a" strokeWidth="2" fill="none" opacity="0.6" />

      {/* LA BARBE fournie, poivre et sel, qui sourit */}
      <path d="M106 146 Q104 200 126 226 Q140 240 150 240 Q160 240 174 226 Q196 200 194 146 Q184 186 150 190 Q116 186 106 146 Z" fill="url(#pRayaHair)" />
      {/* moustache */}
      <path d="M128 170 Q150 180 172 170 Q166 186 150 184 Q134 186 128 170 Z" fill="#3e3628" />
      {/* mèches grises dans la barbe */}
      <g stroke="#8a8272" strokeWidth="1.8" fill="none" opacity="0.7">
        <path d="M118 168 Q120 196 132 216 M138 184 Q140 206 148 226 M182 168 Q180 196 168 216 M162 184 Q160 206 152 226 M150 192 L150 230" />
      </g>
      {/* la bouche, sourire discret sous la moustache */}
      <path d="M138 184 Q150 189 162 184" stroke="#7a4630" strokeWidth="2.6" fill="none" strokeLinecap="round" />

      {/* CHEVELURE ramenée en arrière, front dégagé de chef */}
      <path d="M91 136 Q78 54 150 46 Q222 54 209 136 Q208 104 192 88 Q172 74 150 74 Q128 74 108 88 Q92 104 91 136 Z" fill="url(#pRayaHair)" />
      {/* les stries des cheveux tirés + mèches grises */}
      <g stroke="#8a8272" strokeWidth="1.8" fill="none" opacity="0.65">
        <path d="M120 62 Q104 84 98 118 M150 50 L150 74 M180 62 Q196 84 202 118 M134 54 Q122 76 114 106 M166 54 Q178 76 186 106" />
      </g>

      {/* LE COLLIER de crocs — trophées du chef */}
      <path d="M114 250 Q150 272 186 250" stroke="#3e2c18" strokeWidth="2.8" fill="none" />
      {[[128, 259, -22], [141, 266, -10], [150, 268, 0], [159, 266, 10], [172, 259, 22]].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x},${y}) rotate(${r})`}>
          <path d="M-3 0 Q-3 8 0 13 Q3 8 3 0 Q0 -2 -3 0 Z" fill="#eee2c8" stroke="#b0a080" strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}

/* DORU — le chasseur. Jeune, vif, un bandeau de cuir avec une plume,
   une fine cicatrice au sourcil, la sangle de son carquois en travers
   de la poitrine. */
export function PortraitDoru() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pDoruHalo" cx="50%" cy="40%" r="62%">
          <stop offset="0%" stopColor="#d8e4c0" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#b8cc98" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#b8cc98" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pDoruSkin" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="#d0a072" />
          <stop offset="55%" stopColor="#bf9066" />
          <stop offset="100%" stopColor="#a3764e" />
        </linearGradient>
        <linearGradient id="pDoruFur" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a6a44" />
          <stop offset="100%" stopColor="#5e4629" />
        </linearGradient>
      </defs>

      <circle cx="150" cy="138" r="130" fill="url(#pDoruHalo)" />

      {/* cheveux arrière courts + la petite queue nouée */}
      <path d="M104 96 Q94 130 100 168 L114 160 Q106 128 114 102 Z" fill="#2c2013" />
      <path d="M196 96 Q206 130 200 168 L186 160 Q194 128 186 102 Z" fill="#2c2013" />
      <path d="M150 52 Q186 58 196 92 L204 120 Q212 148 204 170 Q214 130 200 96 Q188 62 150 52 Z" fill="#2c2013" />
      <ellipse cx="207" cy="176" rx="7" ry="14" fill="#2c2013" transform="rotate(-14 207 176)" />
      <path d="M203 166 q8 4 8 12" stroke="#54381e" strokeWidth="2" fill="none" />

      {/* LE BUSTE : tenue légère de chasse, une épaule nue */}
      <path d="M46 340 Q48 262 96 240 Q124 228 150 230 Q178 228 206 240 Q252 262 254 340 Z" fill="url(#pDoruFur)" />
      <path d="M150 230 Q178 228 206 240 L206 262 Q176 250 150 252 Z" fill="url(#pDoruSkin)" />
      <g stroke="#4a3419" strokeWidth="2.4" fill="none" opacity="0.6">
        <path d="M96 258 q13 -6 25 0 M130 250 q13 -6 25 0 M92 288 q13 -6 25 0 M136 282 q13 -6 25 0 M110 314 q13 -6 25 0 M160 306 q13 -6 25 0 M204 296 q12 -6 24 0 M186 326 q13 -6 25 0" />
      </g>
      {/* LA SANGLE du carquois, en travers */}
      <path d="M98 246 Q150 290 214 330" stroke="#5a3a20" strokeWidth="11" fill="none" />
      <path d="M98 246 Q150 290 214 330" stroke="#7a5230" strokeWidth="3" fill="none" opacity="0.7" strokeDasharray="8 7" />

      {/* LE COU */}
      <path d="M134 188 L166 188 L169 238 Q150 246 131 238 Z" fill="url(#pDoruSkin)" />
      <path d="M136 194 q14 8 28 0" stroke="#96684a" strokeWidth="4" fill="none" opacity="0.4" />

      {/* LE VISAGE : jeune, un peu anguleux */}
      <path d="M150 60 C190 60 207 94 205 130 C203 166 184 196 150 202 C116 196 97 166 95 130 C93 94 110 60 150 60 Z" fill="url(#pDoruSkin)" />
      <path d="M104 116 Q100 150 118 178" stroke="#e8e0b8" strokeWidth="5" fill="none" opacity="0.35" strokeLinecap="round" />
      <ellipse cx="98" cy="142" rx="7" ry="11" fill="#bf9066" />
      <path d="M96 138 q5 2 4 8" stroke="#a3764e" strokeWidth="2" fill="none" />

      {/* SOURCILS — celui de gauche coupé par une fine cicatrice */}
      <path d="M116 124 Q128 117 141 122" stroke="#241a10" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path d="M159 122 Q172 117 184 124" stroke="#241a10" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path d="M133 114 L138 130" stroke="#d8ab80" strokeWidth="2.6" strokeLinecap="round" />
      {/* YEUX vifs, grands ouverts */}
      <path d="M118 136 Q129 127 141 135 Q130 143 118 136 Z" fill="#fdf4e6" />
      <path d="M159 135 Q171 127 182 136 Q170 143 159 135 Z" fill="#fdf4e6" />
      <circle cx="130" cy="135" r="4.8" fill="#2c1c0e" />
      <circle cx="170" cy="135" r="4.8" fill="#2c1c0e" />
      <circle cx="131.8" cy="133.2" r="1.5" fill="#fff" />
      <circle cx="171.8" cy="133.2" r="1.5" fill="#fff" />
      <path d="M117 135 Q129 126 142 134 M158 134 Q171 126 183 135" stroke="#4a3322" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* NEZ + le petit sourire en coin */}
      <path d="M150 136 Q147 150 145 156 Q143 162 150 163" stroke="#a3764e" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M133 174 Q152 183 167 172" stroke="#8a4a34" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M167 172 q4 -1 6 -4" stroke="#8a4a34" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <ellipse cx="120" cy="154" rx="9" ry="5.5" fill="#e0aa7c" opacity="0.35" />
      {/* trait d'ocre du chasseur, sous l'œil droit */}
      <path d="M162 148 l16 -2" stroke="#b5451f" strokeWidth="3.2" strokeLinecap="round" opacity="0.55" />

      {/* CHEVELURE pleine + LE BANDEAU de cuir et sa plume */}
      <path d="M95 130 Q82 50 150 44 Q218 50 205 130 Q200 102 182 94 Q164 86 150 87 Q136 86 118 94 Q100 102 95 130 Z" fill="#2c2013" />
      <path d="M124 56 Q112 74 106 96 M150 46 L150 86 M176 56 Q188 74 194 96" stroke="#4c3a22" strokeWidth="2" fill="none" opacity="0.7" />
      {/* le bandeau */}
      <path d="M95 116 Q150 96 205 116 L205 128 Q150 108 95 128 Z" fill="#8a5a30" />
      <path d="M99 119 Q150 100 201 119" stroke="#5a3a20" strokeWidth="1.8" fill="none" opacity="0.7" strokeDasharray="5 5" />
      {/* la plume, glissée dans le bandeau */}
      <g transform="translate(196,102) rotate(24)">
        <path d="M0 0 Q-7 -16 -2 -38 Q10 -20 6 -2 Q3 2 0 0 Z" fill="#9a8a72" />
        <path d="M1 -2 L-1 -34" stroke="#6e6250" strokeWidth="1.6" />
        <path d="M0 -10 l-5 -3 M1 -16 l6 -3 M0 -22 l-5 -3 M1 -28 l5 -3" stroke="#6e6250" strokeWidth="1" opacity="0.8" />
      </g>

      {/* LE PENDENTIF : une seule griffe, celle de sa première chasse */}
      <path d="M126 252 Q150 266 174 252" stroke="#4a3419" strokeWidth="2.6" fill="none" />
      <g transform="translate(150,262) rotate(4)">
        <path d="M-4 0 Q-5 10 0 16 Q5 10 4 0 Q0 -3 -4 0 Z" fill="#eee2c8" stroke="#b0a080" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

/* KYAN — la mémoire du clan. Cheveux blancs, rides profondes et
   douces, les points d'ocre rituels sur le front, un pendentif
   d'ivoire gravé d'une spirale : tout ce qu'elle sait, elle le porte. */
export function PortraitKyan() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pKyanHalo" cx="50%" cy="40%" r="62%">
          <stop offset="0%" stopColor="#ffe8c0" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#f0d0a0" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#f0d0a0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pKyanSkin" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="#c69468" />
          <stop offset="55%" stopColor="#b3835a" />
          <stop offset="100%" stopColor="#95693f" />
        </linearGradient>
        <linearGradient id="pKyanFur" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6e5a44" />
          <stop offset="100%" stopColor="#48392a" />
        </linearGradient>
        <linearGradient id="pKyanHair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e4dccc" />
          <stop offset="100%" stopColor="#b8ae9a" />
        </linearGradient>
      </defs>

      <circle cx="150" cy="138" r="130" fill="url(#pKyanHalo)" />

      {/* la longue chevelure blanche, derrière */}
      <path d="M96 104 Q72 180 82 258 Q86 284 102 294 L112 240 Q100 176 104 118 Z" fill="#c8bfae" />
      <path d="M204 104 Q228 178 219 260 Q214 288 197 296 L189 238 Q202 176 196 116 Z" fill="#c8bfae" />

      {/* LE CHÂLE de fourrure, serré sur les épaules */}
      <path d="M46 340 Q48 262 94 240 Q122 228 150 230 Q180 228 206 240 Q252 262 254 340 Z" fill="url(#pKyanFur)" />
      <g stroke="#332818" strokeWidth="2.4" fill="none" opacity="0.6">
        <path d="M92 256 q13 -6 25 0 M136 248 q13 -6 25 0 M182 256 q13 -6 25 0 M76 288 q13 -6 25 0 M118 280 q13 -6 25 0 M166 284 q13 -6 25 0 M210 292 q12 -6 24 0 M96 314 q13 -6 25 0 M146 308 q13 -6 25 0 M194 320 q13 -6 25 0" />
      </g>
      {/* le châle se croise devant */}
      <path d="M104 248 Q140 290 150 340 M196 248 Q160 290 150 340" stroke="#332818" strokeWidth="4" fill="none" opacity="0.5" />

      {/* LE COU */}
      <path d="M135 188 L165 188 L168 238 Q150 246 132 238 Z" fill="url(#pKyanSkin)" />
      <path d="M138 196 q12 7 24 0 M136 206 q14 8 28 0" stroke="#8a6040" strokeWidth="2.6" fill="none" opacity="0.45" />

      {/* LE VISAGE : plus étroit, pommettes hautes */}
      <path d="M150 62 C188 62 204 94 202 130 C200 166 182 194 150 200 C118 194 100 166 98 130 C96 94 112 62 150 62 Z" fill="url(#pKyanSkin)" />
      <path d="M106 116 Q102 150 120 176" stroke="#ffe8c0" strokeWidth="5" fill="none" opacity="0.4" strokeLinecap="round" />
      <ellipse cx="101" cy="142" rx="6.5" ry="10" fill="#b3835a" />
      <path d="M99 138 q5 2 4 8" stroke="#95693f" strokeWidth="2" fill="none" />

      {/* les rides — chaque ligne est une histoire */}
      <path d="M122 94 Q150 88 178 94 M126 103 Q150 98 174 103 M130 112 Q150 108 170 112" stroke="#8a6040" strokeWidth="1.7" fill="none" opacity="0.55" />
      <path d="M118 134 l-8 -2 M118 138 l-8 1 M182 134 l8 -2 M182 138 l8 1" stroke="#8a6040" strokeWidth="1.6" opacity="0.6" />
      <path d="M132 158 Q127 170 132 179 M168 158 Q173 170 168 179" stroke="#8a6040" strokeWidth="1.8" fill="none" opacity="0.5" />
      {/* creux des joues */}
      <path d="M112 158 Q116 170 124 176 M188 158 Q184 170 176 176" stroke="#95693f" strokeWidth="2" fill="none" opacity="0.35" />

      {/* SOURCILS fins, gris */}
      <path d="M118 124 Q129 119 141 123" stroke="#8a8272" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M159 123 Q171 119 182 124" stroke="#8a8272" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* YEUX plus petits, sous des paupières lourdes — mais brillants */}
      <path d="M121 136 Q130 130 139 135 Q130 140 121 136 Z" fill="#faf1de" />
      <path d="M161 135 Q170 130 179 136 Q170 140 161 135 Z" fill="#faf1de" />
      <circle cx="130" cy="135" r="3.7" fill="#33200f" />
      <circle cx="170" cy="135" r="3.7" fill="#33200f" />
      <circle cx="131.3" cy="133.7" r="1.2" fill="#fff" />
      <circle cx="171.3" cy="133.7" r="1.2" fill="#fff" />
      <path d="M119 135 Q130 128 140 134 M160 134 Q170 128 181 135" stroke="#5c4630" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M123 141 q7 3 14 0 M163 141 q7 3 14 0" stroke="#8a6040" strokeWidth="1.4" fill="none" opacity="0.6" />

      {/* NEZ + le sourire de celle qui sait */}
      <path d="M150 136 Q147 152 144 158 Q142 164 149 165" stroke="#95693f" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M133 176 Q150 184 167 176" stroke="#7a4630" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M129 174 q-3 2 -4 5 M171 174 q3 2 4 5" stroke="#8a6040" strokeWidth="1.7" fill="none" opacity="0.6" />
      {/* les POINTS D'OCRE rituels, en arc sur le front */}
      {[[126, 88], [138, 84], [150, 82], [162, 84], [174, 88]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.7" fill="#b5451f" opacity="0.6" />
      ))}

      {/* CHEVELURE blanche : raie au milieu, pleine jusqu'au sommet */}
      <path d="M96 134 Q82 52 150 46 Q218 52 204 134 Q198 108 178 78 Q166 96 150 98 Q134 96 122 78 Q102 108 96 134 Z" fill="url(#pKyanHair)" />
      <path d="M150 48 L150 96 M128 56 Q116 80 108 112 M172 56 Q184 80 192 112 M138 52 Q132 72 126 86 M162 52 Q168 72 174 86" stroke="#a89e8a" strokeWidth="1.8" fill="none" opacity="0.7" />
      {/* deux fines tresses devant, avec perle d'os */}
      <path d="M108 112 Q102 160 106 208" stroke="#d4cbb8" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M108 118 l5 6 M106 132 l6 6 M105 146 l6 6 M105 160 l6 6 M105 174 l6 6 M105 188 l6 6" stroke="#a89e8a" strokeWidth="1.6" opacity="0.8" />
      <ellipse cx="106" cy="212" rx="4" ry="5" fill="#e8dcc4" stroke="#b8a884" strokeWidth="1" />
      <path d="M192 112 Q198 160 194 208" stroke="#d4cbb8" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M192 118 l-5 6 M194 132 l-6 6 M195 146 l-6 6 M195 160 l-6 6 M195 174 l-6 6 M195 188 l-6 6" stroke="#a89e8a" strokeWidth="1.6" opacity="0.8" />
      <ellipse cx="194" cy="212" rx="4" ry="5" fill="#e8dcc4" stroke="#b8a884" strokeWidth="1" />

      {/* LE PENDENTIF d'ivoire gravé d'une spirale */}
      <path d="M122 252 Q150 268 178 252" stroke="#332818" strokeWidth="2.6" fill="none" />
      <circle cx="150" cy="266" r="12" fill="#eee2c8" stroke="#b0a080" strokeWidth="1.6" />
      <path d="M150 266 m0 -1 a1.5 1.5 0 0 1 1.5 1.5 a3.2 3.2 0 0 1 -3.2 3.2 a5.2 5.2 0 0 1 -5.2 -5.2 a7.4 7.4 0 0 1 7.4 -7.4" stroke="#8a7a5c" strokeWidth="1.6" fill="none" />
    </svg>
  );
}
