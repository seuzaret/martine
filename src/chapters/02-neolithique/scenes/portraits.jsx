/* ============================================================
   CHAPITRE 2 — Portraits « gros plan »
   Utilisés par la quête (étapes avec `portrait: "…"`) : le
   personnage s'avance en grand devant l'écran pour parler.
   Même construction que ceux du chapitre 1 : halo, chevelure
   arrière, buste, cou, visage ovale, yeux/nez/bouche, coiffe et
   accessoire caractéristique. Libres de droits.
   ============================================================ */

/* Bouche qui « parle » : la lèvre haute reste fixe ; l'ouverture et la
   lèvre basse s'animent (le personnage cause dans son gros plan). Réglable
   en position (y), largeur (w), couleurs, et sourire éventuel. */
function Mouth({ y = 180, dark = "#7a4a34", light = "#b0785a", w = 14, smile = false }) {
  const corner = smile ? y - 4 : y;      // coins relevés si sourire
  const dip = smile ? y + 9 : y + 4;     // creux central de la lèvre haute
  return (
    <g>
      <path d={`M${150 - w} ${corner} Q150 ${dip} ${150 + w} ${corner}`} stroke={dark} strokeWidth="3" fill="none" strokeLinecap="round" />
      <g style={{ transformOrigin: `150px ${y + 1}px`, transformBox: "view-box", animation: "talk 0.6s ease-in-out infinite" }}>
        <path d={`M${150 - w + 3} ${y + 1} Q150 ${y + 9} ${150 + w - 3} ${y + 1} Q150 ${y + 4} ${150 - w + 3} ${y + 1} Z`} fill="#5a2a20" />
        <path d={`M${150 - w + 4} ${y + 7} Q150 ${y + 11} ${150 + w - 4} ${y + 7}`} stroke={light} strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.6" />
      </g>
    </g>
  );
}

/* GUNA — le garde de la porte. Casque de cuir, courte barbe,
   la hampe de sa lance sur l'épaule, le bord de son bouclier
   rond : sévère mais pas méchant. */
export function PortraitGuna() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pGunaHalo" cx="50%" cy="40%" r="62%">
          <stop offset="0%" stopColor="#ffe0a4" stopOpacity="0.45" /><stop offset="60%" stopColor="#e8b880" stopOpacity="0.14" /><stop offset="100%" stopColor="#e8b880" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pGunaSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#cf9f6f" /><stop offset="55%" stopColor="#bd8f61" /><stop offset="100%" stopColor="#9e7248" /></linearGradient>
        <linearGradient id="pGunaLeather" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a5a34" /><stop offset="100%" stopColor="#5a3a20" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pGunaHalo)" />

      {/* LA LANCE, en travers derrière l'épaule : hampe de bois, liure de
          cuir, et un grand fer de lance en feuille — pour qu'on la lise bien */}
      <path d="M52 306 L212 120" stroke="#6e4c2e" strokeWidth="9" strokeLinecap="round" />
      <path d="M52 306 L212 120" stroke="#8a6a44" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <g stroke="#4a2f18" strokeWidth="2.4" strokeLinecap="round"><path d="M204 130 l14 -12 M208 136 l14 -12 M212 142 l14 -12" /></g>
      <path d="M205 114 L221 130 L250 74 Z" fill="#9aa0ac" stroke="#e2e6ee" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M213 122 L247 80" stroke="#e2e6ee" strokeWidth="1.4" opacity="0.85" />
      <path d="M210 120 L238 86" stroke="#6a707c" strokeWidth="1.1" fill="none" opacity="0.55" />

      {/* LE BUSTE : cuirasse de cuir sur les épaules */}
      <path d="M42 340 Q44 258 92 236 Q122 224 150 226 Q178 224 208 236 Q256 258 258 340 Z" fill="url(#pGunaLeather)" />
      <path d="M96 250 q54 -20 108 0" stroke="#5a3a20" strokeWidth="3" fill="none" opacity="0.6" />
      {/* écailles de cuir */}
      <g stroke="#4a2f18" strokeWidth="2" fill="none" opacity="0.55">
        <path d="M104 268 q12 -8 24 0 M140 264 q12 -8 24 0 M176 270 q12 -7 22 0 M120 292 q12 -7 24 0 M158 290 q12 -7 24 0 M100 314 q12 -7 24 0 M148 312 q12 -7 24 0 M192 306 q11 -6 22 0" />
      </g>
      {/* le bord du bouclier rond, à l'épaule droite */}
      <path d="M208 300 A54 54 0 0 1 250 250" stroke="#7a4e2c" strokeWidth="14" fill="none" />
      <path d="M208 300 A54 54 0 0 1 250 250" stroke="#a06a3a" strokeWidth="4" fill="none" opacity="0.6" />

      {/* LE COU */}
      <path d="M134 190 L166 190 L169 240 Q150 248 131 240 Z" fill="url(#pGunaSkin)" />

      {/* LE VISAGE : carré, mâchoire solide */}
      <path d="M150 62 C182 62 197 88 197 118 C198 150 190 176 174 192 C165 201 158 204 150 204 C142 204 135 201 126 192 C110 176 102 150 103 118 C103 88 118 62 150 62 Z" fill="url(#pGunaSkin)" />
      <path d="M109 112 Q105 148 122 176" stroke="#ffe0a4" strokeWidth="5" fill="none" opacity="0.35" strokeLinecap="round" />
      <ellipse cx="104" cy="140" rx="7" ry="11" fill="#bd8f61" />
      <ellipse cx="196" cy="140" rx="7" ry="11" fill="#bd8f61" />

      {/* SOURCILS épais, un peu froncés */}
      <path d="M118 124 Q131 116 145 124" stroke="#3a2a1a" strokeWidth="4.4" fill="none" strokeLinecap="round" />
      <path d="M155 124 Q169 116 182 124" stroke="#3a2a1a" strokeWidth="4.4" fill="none" strokeLinecap="round" />
      {/* YEUX en garde, attentifs */}
      <path d="M120 138 Q130 132 141 137 Q130 143 120 138 Z" fill="#f8efdd" />
      <path d="M159 137 Q170 132 180 138 Q170 143 159 137 Z" fill="#f8efdd" />
      <circle cx="130" cy="138" r="4.2" fill="#2e1d10" /><circle cx="170" cy="138" r="4.2" fill="#2e1d10" />
      <circle cx="131.4" cy="136.5" r="1.3" fill="#fff" /><circle cx="171.4" cy="136.5" r="1.3" fill="#fff" />
      <path d="M119 137 Q130 131 142 136 M158 136 Q170 131 181 137" stroke="#3a2818" strokeWidth="2.4" fill="none" strokeLinecap="round" />

      {/* NEZ discret : juste le dessous, sans trait sur l'arête */}
      <path d="M145 157 Q150 161 155 157 M145 157 Q143 152 147 150 M155 157 Q157 152 153 150" stroke="#96684a" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* BOUCHE qui parle (rasé de près) */}
      <path d="M150 168 q-2 6 0 8" stroke="#96684a" strokeWidth="1.4" fill="none" opacity="0.3" />
      <Mouth y={180} dark="#7a4a34" light="#b0785a" w={15} />

      {/* LE CASQUE de cuir, ajusté, avec une jugulaire */}
      <path d="M100 128 Q92 58 150 52 Q208 58 200 128 Q192 96 172 86 Q160 82 150 82 Q140 82 128 86 Q108 96 100 128 Z" fill="url(#pGunaLeather)" />
      <path d="M100 122 Q150 100 200 122" stroke="#4a2f18" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M150 54 Q126 62 112 96 M150 54 Q174 62 188 96" stroke="#4a2f18" strokeWidth="1.8" fill="none" opacity="0.5" />
      {/* clous du casque */}
      {[[124, 78], [150, 70], [176, 78]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.4" fill="#c8a860" />)}
      {/* jugulaire */}
      <path d="M104 150 Q112 178 128 196 M196 150 Q188 178 172 196" stroke="#5a3a20" strokeWidth="4" fill="none" opacity="0.7" />
    </svg>
  );
}

/* TANNIS — le roi de la cité. Couronne d'or à pointes et gemme
   rouge, barbe soignée, collier d'or, manteau pourpre : l'autorité
   qui juge d'un regard. */
export function PortraitTannis() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pTanHalo" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#ffe6b0" stopOpacity="0.5" /><stop offset="60%" stopColor="#f0c890" stopOpacity="0.16" /><stop offset="100%" stopColor="#f0c890" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pTanSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#cf9f6f" /><stop offset="55%" stopColor="#bd8f61" /><stop offset="100%" stopColor="#9e7248" /></linearGradient>
        <linearGradient id="pTanRobe" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a2a4a" /><stop offset="100%" stopColor="#5a1c34" /></linearGradient>
        <linearGradient id="pTanGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f2cf6a" /><stop offset="100%" stopColor="#c89a2a" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pTanHalo)" />

      {/* LE MANTEAU pourpre, large sur les épaules */}
      <path d="M38 340 Q40 254 92 232 Q122 220 150 222 Q178 220 208 232 Q260 254 262 340 Z" fill="url(#pTanRobe)" />
      <path d="M96 246 Q150 226 204 246" stroke="#3a1222" strokeWidth="3" fill="none" opacity="0.6" />
      {/* bordure brodée d'or au col */}
      <path d="M108 250 Q150 292 192 250" stroke="url(#pTanGold)" strokeWidth="9" fill="none" />
      <path d="M108 250 Q150 292 192 250" stroke="#8a6a1a" strokeWidth="2" fill="none" opacity="0.5" />
      {/* LE COLLIER d'or à pendentif */}
      <path d="M120 250 Q150 280 180 250" stroke="url(#pTanGold)" strokeWidth="5" fill="none" />
      <circle cx="150" cy="276" r="9" fill="url(#pTanGold)" stroke="#a8842a" strokeWidth="1.4" />
      <circle cx="150" cy="276" r="3.4" fill="#c8382e" />

      {/* LE COU */}
      <path d="M134 190 L166 190 L169 240 Q150 248 131 240 Z" fill="url(#pTanSkin)" />

      {/* LE VISAGE : noble, allongé */}
      <path d="M150 64 C181 64 195 90 196 120 C197 148 190 174 175 190 C166 199 158 202 150 202 C142 202 134 199 125 190 C110 174 103 148 104 120 C105 90 119 64 150 64 Z" fill="url(#pTanSkin)" />
      <path d="M110 114 Q106 148 123 176" stroke="#ffe6b0" strokeWidth="5" fill="none" opacity="0.35" strokeLinecap="round" />
      <ellipse cx="105" cy="140" rx="7" ry="11" fill="#bd8f61" /><ellipse cx="195" cy="140" rx="7" ry="11" fill="#bd8f61" />
      {/* pendants d'oreille en or */}
      <circle cx="105" cy="154" r="3.2" fill="url(#pTanGold)" /><circle cx="195" cy="154" r="3.2" fill="url(#pTanGold)" />

      {/* SOURCILS + regard qui juge */}
      <path d="M118 124 Q131 118 145 124" stroke="#3a2a18" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M155 124 Q169 118 182 124" stroke="#3a2a18" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M120 138 Q130 132 141 137 Q130 143 120 138 Z" fill="#f8efdd" />
      <path d="M159 137 Q170 132 180 138 Q170 143 159 137 Z" fill="#f8efdd" />
      <circle cx="130" cy="138" r="4.2" fill="#2e1d10" /><circle cx="170" cy="138" r="4.2" fill="#2e1d10" />
      <circle cx="131.4" cy="136.5" r="1.3" fill="#fff" /><circle cx="171.4" cy="136.5" r="1.3" fill="#fff" />
      <path d="M119 137 Q130 131 142 137 M158 137 Q170 131 181 137" stroke="#3a2818" strokeWidth="2.4" fill="none" strokeLinecap="round" />

      {/* NEZ discret : juste le dessous, sans trait sur l'arête */}
      <path d="M145 158 Q150 162 155 158 M145 158 Q143 153 147 151 M155 158 Q157 153 153 151" stroke="#96684a" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* BOUCHE qui parle (rasé de près) */}
      <path d="M150 168 q-2 6 0 8" stroke="#96684a" strokeWidth="1.4" fill="none" opacity="0.3" />
      <Mouth y={181} dark="#7a4a34" light="#b0785a" w={15} />

      {/* LA COURONNE d'or à pointes + gemme rouge */}
      <path d="M98 120 Q92 78 118 74 L118 60 L131 76 L140 54 L150 78 L160 54 L169 76 L182 60 L182 74 Q208 78 202 120 Q188 98 168 92 Q158 90 150 90 Q142 90 132 92 Q112 98 98 120 Z" fill="url(#pTanGold)" stroke="#a8842a" strokeWidth="1.6" />
      <circle cx="150" cy="70" r="4.6" fill="#c8382e" stroke="#8a1c18" strokeWidth="1" />
      <circle cx="128" cy="88" r="2.6" fill="#3a8a5a" /><circle cx="172" cy="88" r="2.6" fill="#2a6a9a" />
      <path d="M104 112 Q150 92 196 112" stroke="#fff0b0" strokeWidth="1.6" fill="none" opacity="0.7" />
    </svg>
  );
}

/* JALA — la potière. Cheveux bruns noués en chignon, un fichu,
   une trace d'argile sur la joue, robe bleue, sourire ouvert :
   la fierté de l'artisane. */
export function PortraitJala() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pJalaHalo" cx="50%" cy="40%" r="62%">
          <stop offset="0%" stopColor="#ffe4b0" stopOpacity="0.45" /><stop offset="60%" stopColor="#f0cc94" stopOpacity="0.14" /><stop offset="100%" stopColor="#f0cc94" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pJalaSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#d8a97a" /><stop offset="55%" stopColor="#c89a72" /><stop offset="100%" stopColor="#b0855c" /></linearGradient>
        <linearGradient id="pJalaDress" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3a6a8a" /><stop offset="100%" stopColor="#274e6c" /></linearGradient>
        <linearGradient id="pJalaScarf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c8502e" /><stop offset="100%" stopColor="#9a3a20" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pJalaHalo)" />

      {/* mèches brunes sur les épaules */}
      <path d="M100 120 Q84 168 92 214 L110 206 Q100 166 108 126 Z" fill="#3a2a1c" />
      <path d="M200 120 Q216 168 208 214 L190 206 Q200 166 192 126 Z" fill="#3a2a1c" />

      {/* LE BUSTE : robe bleue, tablier de potière */}
      <path d="M44 340 Q46 260 94 238 Q122 226 150 228 Q178 226 206 238 Q254 260 256 340 Z" fill="url(#pJalaDress)" />
      <path d="M118 244 Q150 236 182 244 L176 340 L124 340 Z" fill="#8a6a4a" opacity="0.55" />
      <path d="M96 250 q54 -18 108 0" stroke="#1e3e58" strokeWidth="3" fill="none" opacity="0.6" />
      {/* éclaboussures d'argile sur le tablier */}
      {[[132, 280], [162, 300], [140, 318], [176, 274]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="5" ry="3.4" fill="#c8b090" opacity="0.5" />)}

      {/* LE COU */}
      <path d="M135 190 L165 190 L168 238 Q150 246 132 238 Z" fill="url(#pJalaSkin)" />

      {/* LE VISAGE : rond et avenant */}
      <path d="M150 60 C191 60 208 92 206 130 C204 168 186 198 150 204 C114 198 96 168 94 130 C92 92 109 60 150 60 Z" fill="url(#pJalaSkin)" />
      <path d="M104 116 Q100 152 118 180" stroke="#ffe4b0" strokeWidth="5" fill="none" opacity="0.4" strokeLinecap="round" />
      <ellipse cx="97" cy="142" rx="7" ry="11" fill="#c89a72" /><ellipse cx="203" cy="142" rx="7" ry="11" fill="#c89a72" />

      {/* SOURCILS doux + YEUX rieurs */}
      <path d="M116 125 Q128 118 141 123" stroke="#2c1f14" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M159 123 Q172 118 184 125" stroke="#2c1f14" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M119 136 Q129 128 140 135 Q130 142 119 136 Z" fill="#fdf4e6" />
      <path d="M160 135 Q171 128 181 136 Q170 142 160 135 Z" fill="#fdf4e6" />
      <circle cx="130" cy="135" r="4.4" fill="#3a2416" /><circle cx="170" cy="135" r="4.4" fill="#3a2416" />
      <circle cx="131.6" cy="133.4" r="1.4" fill="#fff" /><circle cx="171.6" cy="133.4" r="1.4" fill="#fff" />
      <path d="M118 135 Q129 127 141 134 M159 134 Q171 127 182 135" stroke="#4a3322" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* NEZ discret + large SOURIRE */}
      <path d="M145 154 Q150 158 155 154 M145 154 Q143 149 147 147 M155 154 Q157 149 153 147" stroke="#a87b54" strokeWidth="1.9" fill="none" strokeLinecap="round" />
      <Mouth y={178} dark="#8a4a34" light="#c07a5a" w={16} smile />
      <ellipse cx="119" cy="156" rx="9" ry="5.5" fill="#e8b98c" opacity="0.4" /><ellipse cx="181" cy="156" rx="9" ry="5.5" fill="#e8b98c" opacity="0.4" />
      {/* la trace d'argile sur la joue */}
      <path d="M176 150 q10 4 12 12" stroke="#c8b090" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.6" />

      {/* CHEVEUX + le fichu rouge noué */}
      <path d="M94 134 Q80 54 150 48 Q220 54 206 134 Q198 108 178 96 Q164 90 150 91 Q136 90 122 96 Q102 108 94 134 Z" fill="#3a2a1c" />
      <path d="M90 108 Q150 74 210 108 L214 82 Q150 50 86 82 Z" fill="url(#pJalaScarf)" />
      <path d="M90 96 Q150 66 210 96" stroke="#7a2c18" strokeWidth="2" fill="none" opacity="0.5" />
      {/* le nœud du fichu, sur le côté */}
      <path d="M206 96 q18 -6 26 8 q-14 2 -20 12 q2 -12 -6 -20 Z" fill="url(#pJalaScarf)" />
      <path d="M96 128 Q102 112 116 104 M204 128 Q198 112 184 104" stroke="#2e2014" strokeWidth="1.6" fill="none" opacity="0.5" />
    </svg>
  );
}

/* AHMID — le marchand. Coiffe de tissu, barbe fournie, regard
   futé et chaleureux, robe ocre, un collier de perles d'échange :
   l'homme qui compte tout. */
export function PortraitAhmid() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pAhmHalo" cx="50%" cy="40%" r="62%">
          <stop offset="0%" stopColor="#ffdca0" stopOpacity="0.45" /><stop offset="60%" stopColor="#e8b878" stopOpacity="0.14" /><stop offset="100%" stopColor="#e8b878" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pAhmSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#c2905e" /><stop offset="55%" stopColor="#b0824f" /><stop offset="100%" stopColor="#946638" /></linearGradient>
        <linearGradient id="pAhmRobe" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#b5803a" /><stop offset="100%" stopColor="#8a5c24" /></linearGradient>
        <linearGradient id="pAhmCloth" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e6dcc4" /><stop offset="100%" stopColor="#c4b493" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pAhmHalo)" />

      {/* le tissu de la coiffe retombe sur les épaules */}
      <path d="M92 118 Q72 176 84 236 L112 226 Q100 172 108 122 Z" fill="url(#pAhmCloth)" />
      <path d="M208 118 Q228 176 216 236 L188 226 Q200 172 192 122 Z" fill="url(#pAhmCloth)" />

      {/* LE BUSTE : robe ocre */}
      <path d="M44 340 Q46 258 94 236 Q122 224 150 226 Q178 224 206 236 Q254 258 256 340 Z" fill="url(#pAhmRobe)" />
      <path d="M96 248 q54 -18 108 0" stroke="#6a4418" strokeWidth="3" fill="none" opacity="0.6" />
      <path d="M150 232 L150 340" stroke="#6a4418" strokeWidth="2.4" opacity="0.4" />
      {/* LE COLLIER de perles d'échange */}
      <path d="M120 250 Q150 278 180 250" stroke="#5a3a1a" strokeWidth="2.4" fill="none" />
      {[[128, 258], [139, 264], [150, 266], [161, 264], [172, 258]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill={i % 2 ? "#3a8a9a" : "#c8a860"} stroke="#5a3a1a" strokeWidth="0.8" />)}

      {/* LE COU */}
      <path d="M135 190 L165 190 L168 238 Q150 246 132 238 Z" fill="url(#pAhmSkin)" />

      {/* LE VISAGE */}
      <path d="M150 62 C189 62 205 92 203 128 C201 164 183 194 150 200 C117 194 99 164 97 128 C95 92 111 62 150 62 Z" fill="url(#pAhmSkin)" />
      <path d="M105 114 Q101 148 119 176" stroke="#ffdca0" strokeWidth="5" fill="none" opacity="0.35" strokeLinecap="round" />
      <ellipse cx="100" cy="140" rx="7" ry="11" fill="#b0824f" /><ellipse cx="200" cy="140" rx="7" ry="11" fill="#b0824f" />

      {/* SOURCILS mobiles + YEUX futés, un peu plissés (il sourit) */}
      <path d="M117 122 Q129 116 143 123" stroke="#2c1c10" strokeWidth="3.6" fill="none" strokeLinecap="round" />
      <path d="M157 123 Q171 116 183 122" stroke="#2c1c10" strokeWidth="3.6" fill="none" strokeLinecap="round" />
      <path d="M119 137 Q130 132 141 137 Q130 141 119 137 Z" fill="#f8efdd" />
      <path d="M159 137 Q170 132 181 137 Q170 141 159 137 Z" fill="#f8efdd" />
      <circle cx="130" cy="137" r="4" fill="#2c1c0e" /><circle cx="170" cy="137" r="4" fill="#2c1c0e" />
      <circle cx="131.3" cy="135.6" r="1.3" fill="#fff" /><circle cx="171.3" cy="135.6" r="1.3" fill="#fff" />
      {/* pattes d'oie du sourire */}
      <path d="M114 138 l-6 -3 M114 141 l-6 2 M186 138 l6 -3 M186 141 l6 2" stroke="#96684a" strokeWidth="1.5" opacity="0.55" />

      {/* NEZ discret : juste le dessous, sans trait sur l'arête */}
      <path d="M145 156 Q150 160 155 156 M145 156 Q143 151 147 149 M155 156 Q157 151 153 149" stroke="#946638" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* BOUCHE qui parle (rasé de près) */}
      <path d="M150 167 q-2 6 0 8" stroke="#946638" strokeWidth="1.4" fill="none" opacity="0.3" />
      <Mouth y={180} dark="#7a4a30" light="#a8785a" w={15} />

      {/* LA COIFFE de tissu, ceinte d'un cordon */}
      <path d="M96 130 Q86 56 150 50 Q214 56 204 130 Q196 100 178 90 Q160 82 150 82 Q140 82 122 90 Q104 100 96 130 Z" fill="url(#pAhmCloth)" />
      <path d="M92 118 Q150 92 208 118" stroke="#8a7a56" strokeWidth="6" fill="none" opacity="0.7" />
      <path d="M92 118 Q150 92 208 118" stroke="#5a4a2c" strokeWidth="1.6" fill="none" opacity="0.6" strokeDasharray="6 5" />
      <path d="M150 52 Q124 60 110 96 M150 52 Q176 60 190 96" stroke="#b0a077" strokeWidth="1.8" fill="none" opacity="0.6" />
    </svg>
  );
}

/* IMIR — le prêtre. Crâne rasé sous un léger voile, traits d'ocre
   rituels sur le front et les joues, amulette d'os en croissant,
   robe claire : la gravité de celui qui parle aux dieux. */
export function PortraitImir() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pImirHalo" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#fdeccb" stopOpacity="0.5" /><stop offset="60%" stopColor="#e6d6b6" stopOpacity="0.15" /><stop offset="100%" stopColor="#e6d6b6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pImirSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#c99a6c" /><stop offset="55%" stopColor="#b78a5e" /><stop offset="100%" stopColor="#9c704a" /></linearGradient>
        <linearGradient id="pImirRobe" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e8e0d0" /><stop offset="100%" stopColor="#c8bda4" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pImirHalo)" />

      {/* LE BUSTE : robe claire de lin, drapé sobre */}
      <path d="M42 340 Q44 256 92 234 Q122 222 150 224 Q178 222 208 234 Q256 256 258 340 Z" fill="url(#pImirRobe)" />
      <path d="M96 248 Q150 228 204 248" stroke="#b0a488" strokeWidth="3" fill="none" opacity="0.6" />
      <path d="M110 246 Q140 300 150 340 M190 246 Q160 300 150 340" stroke="#b0a488" strokeWidth="3" fill="none" opacity="0.5" />
      {/* bande rituelle rouge à l'épaule */}
      <path d="M104 244 Q150 268 150 340" stroke="#a83a2a" strokeWidth="7" fill="none" opacity="0.5" />

      {/* L'AMULETTE d'os en croissant */}
      <path d="M126 250 Q150 264 174 250" stroke="#7a6a4a" strokeWidth="2.4" fill="none" />
      <path d="M150 258 q-16 4 -16 20 q4 -12 16 -12 q12 0 16 12 q0 -16 -16 -20 Z" fill="#eee2c8" stroke="#b0a080" strokeWidth="1.4" />

      {/* LE COU */}
      <path d="M135 190 L165 190 L168 236 Q150 244 132 236 Z" fill="url(#pImirSkin)" />

      {/* LE VISAGE : ascétique, joues creusées */}
      <path d="M150 64 C186 64 200 92 199 126 C198 160 182 190 150 196 C118 190 102 160 101 126 C100 92 114 64 150 64 Z" fill="url(#pImirSkin)" />
      <path d="M108 116 Q104 148 121 174" stroke="#fdeccb" strokeWidth="5" fill="none" opacity="0.4" strokeLinecap="round" />
      <ellipse cx="103" cy="138" rx="6.5" ry="10" fill="#b78a5e" /><ellipse cx="197" cy="138" rx="6.5" ry="10" fill="#b78a5e" />
      {/* creux des joues */}
      <path d="M116 158 Q120 172 130 178 M184 158 Q180 172 170 178" stroke="#9c704a" strokeWidth="2" fill="none" opacity="0.35" />

      {/* SOURCILS calmes + YEUX baissés, sereins */}
      <path d="M118 126 Q130 121 143 125" stroke="#4a3a28" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M157 125 Q170 121 182 126" stroke="#4a3a28" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M120 137 Q130 133 140 137 Q130 141 120 137 Z" fill="#faf1de" />
      <path d="M160 137 Q170 133 180 137 Q170 141 160 137 Z" fill="#faf1de" />
      <circle cx="130" cy="137.5" r="3.6" fill="#33200f" /><circle cx="170" cy="137.5" r="3.6" fill="#33200f" />
      <circle cx="131.2" cy="136.3" r="1.1" fill="#fff" /><circle cx="171.2" cy="136.3" r="1.1" fill="#fff" />
      <path d="M119 136 Q130 131 141 136 M159 136 Q170 131 181 136" stroke="#5c4630" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* NEZ discret + bouche digne qui parle */}
      <path d="M145 157 Q150 161 155 157 M145 157 Q143 152 147 150 M155 157 Q157 152 153 150" stroke="#9c704a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <Mouth y={180} dark="#7a4630" light="#a06a4e" w={14} />

      {/* CRÂNE RASÉ + léger voile clair par-dessus l'arrière du crâne */}
      <path d="M101 128 Q98 66 150 60 Q202 66 199 128 Q188 96 168 86 Q158 82 150 82 Q142 82 132 86 Q112 96 101 128 Z" fill="url(#pImirSkin)" />
      <path d="M100 116 Q96 70 150 62 Q204 70 200 116 Q200 92 150 88 Q100 92 100 116 Z" fill="url(#pImirRobe)" opacity="0.9" />
      <path d="M100 110 Q150 84 200 110" stroke="#b0a488" strokeWidth="1.8" fill="none" opacity="0.6" />
      {/* les traits d'ocre rituels : arc sur le front + une ligne par joue */}
      {[[128, 96], [139, 92], [150, 90], [161, 92], [172, 96]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.6" fill="#b5451f" opacity="0.65" />)}
      <path d="M112 150 l4 16 M188 150 l-4 16" stroke="#b5451f" strokeWidth="3.4" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

/* DOKA — le tailleur de pierre. Bandeau de cuir, barbe courte et
   dure, poussière de granit sur la peau, mâchoire volontaire, un
   éclat de cuivre à l'oreille : la force concentrée. */
export function PortraitDoka() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pDokaHalo" cx="50%" cy="40%" r="62%">
          <stop offset="0%" stopColor="#e8dcc0" stopOpacity="0.4" /><stop offset="60%" stopColor="#c8b898" stopOpacity="0.12" /><stop offset="100%" stopColor="#c8b898" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pDokaSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#c2905e" /><stop offset="55%" stopColor="#b0824f" /><stop offset="100%" stopColor="#946638" /></linearGradient>
        <linearGradient id="pDokaFur" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7a5636" /><stop offset="100%" stopColor="#523a22" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pDokaHalo)" />

      {/* LE BUSTE : torse robuste, une bretelle de cuir, poussière claire */}
      <path d="M40 340 Q42 256 92 234 Q122 222 150 224 Q178 222 208 234 Q258 256 260 340 Z" fill="url(#pDokaSkin)" />
      <path d="M96 246 q54 -14 108 0" stroke="#946638" strokeWidth="2.4" fill="none" opacity="0.4" />
      {/* la bretelle de cuir en travers */}
      <path d="M100 244 Q150 288 212 328" stroke="#5a3a20" strokeWidth="12" fill="none" />
      <path d="M100 244 Q150 288 212 328" stroke="#7a5230" strokeWidth="3" fill="none" opacity="0.6" strokeDasharray="8 7" />
      {/* poussière de granit sur l'épaule */}
      {[[110, 258], [130, 250], [190, 256], [206, 268]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.4" fill="#d8d0c0" opacity="0.5" />)}

      {/* LE COU épais */}
      <path d="M133 190 L167 190 L170 238 Q150 246 130 238 Z" fill="url(#pDokaSkin)" />

      {/* LE VISAGE : large, mâchoire carrée */}
      <path d="M150 62 C184 62 199 88 199 118 C200 150 191 176 174 192 C165 201 158 204 150 204 C142 204 135 201 126 192 C109 176 100 150 101 118 C101 88 116 62 150 62 Z" fill="url(#pDokaSkin)" />
      <path d="M108 112 Q104 148 121 176" stroke="#e8dcc0" strokeWidth="5" fill="none" opacity="0.35" strokeLinecap="round" />
      <ellipse cx="104" cy="140" rx="7" ry="11" fill="#b0824f" /><ellipse cx="196" cy="140" rx="7" ry="11" fill="#b0824f" />
      {/* l'éclat de cuivre à l'oreille */}
      <circle cx="196" cy="152" r="3" fill="#c87838" stroke="#8a4e20" strokeWidth="0.8" />
      {/* poussière claire sur la joue */}
      <path d="M118 158 q8 3 10 10" stroke="#d8d0c0" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.4" />

      {/* SOURCILS abaissés, concentrés */}
      <path d="M116 122 Q129 119 143 127" stroke="#2e2013" strokeWidth="4.2" fill="none" strokeLinecap="round" />
      <path d="M157 127 Q171 119 184 122" stroke="#2e2013" strokeWidth="4.2" fill="none" strokeLinecap="round" />
      {/* pli du front, l'effort */}
      <path d="M144 116 l2 12 M156 116 l-2 12" stroke="#946638" strokeWidth="1.6" fill="none" opacity="0.5" />
      {/* YEUX plissés, fixes */}
      <path d="M119 138 Q130 133 141 138 Q130 143 119 138 Z" fill="#f8efdd" />
      <path d="M159 138 Q170 133 181 138 Q170 143 159 138 Z" fill="#f8efdd" />
      <circle cx="130" cy="138" r="4.2" fill="#2c1c0e" /><circle cx="170" cy="138" r="4.2" fill="#2c1c0e" />
      <circle cx="131.4" cy="136.6" r="1.3" fill="#fff" /><circle cx="171.4" cy="136.6" r="1.3" fill="#fff" />
      <path d="M118 137 Q130 131 142 137 M158 137 Q170 131 182 137" stroke="#3a2818" strokeWidth="2.6" fill="none" strokeLinecap="round" />

      {/* NEZ discret : juste le dessous, sans trait sur l'arête */}
      <path d="M144 158 Q150 162 156 158 M144 158 Q142 153 146 151 M156 158 Q158 153 154 151" stroke="#946638" strokeWidth="2.1" fill="none" strokeLinecap="round" />
      {/* BOUCHE qui parle (rasé de près) */}
      <path d="M150 168 q-2 6 0 8" stroke="#946638" strokeWidth="1.4" fill="none" opacity="0.3" />
      <Mouth y={181} dark="#7a4a34" light="#a8785a" w={14} />

      {/* LE BANDEAU de cuir, cheveux ras dessous */}
      <path d="M100 126 Q94 66 150 60 Q206 66 200 126 Q190 100 172 92 Q160 88 150 88 Q140 88 128 92 Q110 100 100 126 Z" fill="#2e2013" />
      <path d="M96 118 Q150 96 204 118 L204 132 Q150 110 96 132 Z" fill="#7a5030" />
      <path d="M100 121 Q150 100 200 121" stroke="#4a2f18" strokeWidth="1.8" fill="none" opacity="0.7" strokeDasharray="5 5" />
      {/* nœud du bandeau, côté */}
      <path d="M198 122 q16 -4 22 8 q-12 2 -16 10 q0 -12 -6 -18 Z" fill="#7a5030" />
    </svg>
  );
}

/* ÖTZI — l'homme des glaces, le mineur. Capuchon de fourrure serré,
   peau tannée par le froid, joues rougies, regard épuisé mais
   plein d'espoir, buée de son souffle, deux traits de tatouage à
   la tempe : la fragilité qui espère guérir. */
export function PortraitOtzi() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pOtziHalo" cx="50%" cy="40%" r="62%">
          <stop offset="0%" stopColor="#cfe0ec" stopOpacity="0.4" /><stop offset="60%" stopColor="#aac2d4" stopOpacity="0.12" /><stop offset="100%" stopColor="#aac2d4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pOtziSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#c89a72" /><stop offset="55%" stopColor="#b3835a" /><stop offset="100%" stopColor="#94663c" /></linearGradient>
        <linearGradient id="pOtziFur" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a6e4a" /><stop offset="100%" stopColor="#5a4530" /></linearGradient>
        <linearGradient id="pOtziHood" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6e5638" /><stop offset="100%" stopColor="#463320" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pOtziHalo)" />

      {/* buée du souffle, dans le froid */}
      <ellipse cx="196" cy="196" rx="26" ry="12" fill="#e8f0f6" opacity="0.35" style={{ animation: "drift 3.6s ease-in-out infinite" }} />
      <ellipse cx="214" cy="204" rx="16" ry="8" fill="#e8f0f6" opacity="0.25" style={{ animation: "drift 4.2s ease-in-out infinite" }} />

      {/* LE MANTEAU de fourrure épaisse, touffue */}
      <path d="M36 340 Q40 250 90 230 Q120 218 150 220 Q180 218 210 230 Q260 250 264 340 Z" fill="url(#pOtziFur)" />
      <g stroke="#3e2e1c" strokeWidth="2.6" fill="none" opacity="0.6">
        <path d="M92 246 q13 -8 26 0 M138 240 q13 -7 26 0 M184 248 q13 -7 25 0 M74 278 q13 -7 26 0 M120 272 q13 -7 26 0 M170 276 q13 -7 26 0 M96 306 q13 -7 26 0 M150 300 q13 -7 26 0 M200 310 q12 -6 24 0" />
      </g>
      {/* brins d'herbe du manteau (comme le vrai Ötzi) */}
      <g stroke="#7a6a44" strokeWidth="1.4" opacity="0.5"><path d="M104 300 l-2 26 M118 306 l0 26 M188 302 l2 26 M202 308 l0 24" /></g>

      {/* LE COU emmitouflé */}
      <path d="M136 192 L164 192 L167 232 Q150 240 133 232 Z" fill="url(#pOtziSkin)" />

      {/* LE VISAGE : buriné, un peu émacié */}
      <path d="M150 66 C184 66 197 94 196 126 C195 160 179 190 150 196 C121 190 105 160 104 126 C103 94 116 66 150 66 Z" fill="url(#pOtziSkin)" />
      <path d="M111 118 Q107 150 124 176" stroke="#cfe0ec" strokeWidth="5" fill="none" opacity="0.3" strokeLinecap="round" />
      {/* joues rougies par le froid */}
      <ellipse cx="121" cy="158" rx="11" ry="7" fill="#c26a4a" opacity="0.3" /><ellipse cx="179" cy="158" rx="11" ry="7" fill="#c26a4a" opacity="0.3" />
      {/* rides de fatigue */}
      <path d="M118 100 Q150 95 182 100 M124 110 Q150 106 176 110" stroke="#94663c" strokeWidth="1.5" fill="none" opacity="0.45" />

      {/* SOURCILS + YEUX cernés, épuisés mais vivants */}
      <path d="M118 128 Q130 123 143 129" stroke="#3a2a1a" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path d="M157 129 Q170 123 182 128" stroke="#3a2a1a" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path d="M120 140 Q130 135 141 140 Q130 145 120 140 Z" fill="#f4ebd8" />
      <path d="M159 140 Q170 135 180 140 Q170 145 159 140 Z" fill="#f4ebd8" />
      <circle cx="130" cy="140.5" r="3.9" fill="#332013" /><circle cx="170" cy="140.5" r="3.9" fill="#332013" />
      <circle cx="131.2" cy="139.2" r="1.2" fill="#fff" /><circle cx="171.2" cy="139.2" r="1.2" fill="#fff" />
      <path d="M119 139 Q130 134 141 139 M159 139 Q170 134 181 139" stroke="#3a2818" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* cernes */}
      <path d="M122 147 q8 4 16 0 M162 147 q8 4 16 0" stroke="#8a5a3a" strokeWidth="1.6" fill="none" opacity="0.4" />
      {/* les deux traits de tatouage à la tempe */}
      <path d="M108 132 l-10 -2 M108 137 l-10 0" stroke="#20202a" strokeWidth="2.6" strokeLinecap="round" opacity="0.7" />

      {/* NEZ discret : juste le dessous, sans trait sur l'arête */}
      <path d="M145 160 Q150 164 155 160 M145 160 Q143 155 147 153 M155 160 Q157 155 153 153" stroke="#94663c" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* BOUCHE qui parle, fatiguée (rasé de près) */}
      <path d="M150 170 q-2 6 0 8" stroke="#94663c" strokeWidth="1.4" fill="none" opacity="0.3" />
      <Mouth y={182} dark="#7a4630" light="#b07a5a" w={13} />

      {/* LE CAPUCHON de fourrure, serré autour du visage */}
      <path d="M96 138 Q84 54 150 48 Q216 54 204 138 Q206 108 196 90 Q178 66 150 66 Q122 66 104 90 Q94 108 96 138 Z" fill="url(#pOtziHood)" />
      <path d="M96 138 Q84 54 150 48 Q216 54 204 138 Q192 118 182 112 Q168 104 150 104 Q132 104 118 112 Q108 118 96 138 Z" fill="url(#pOtziFur)" opacity="0.9" />
      {/* mèches de fourrure du bord du capuchon */}
      <g stroke="#3e2e1c" strokeWidth="2" fill="none" opacity="0.6">
        <path d="M104 120 q4 -6 10 -6 M120 108 q4 -6 10 -5 M150 104 q0 -7 0 -7 M180 108 q-4 -6 -10 -5 M196 120 q-4 -6 -10 -6" />
      </g>
      <path d="M150 50 Q120 58 106 92 M150 50 Q180 58 194 92" stroke="#3e2e1c" strokeWidth="1.8" fill="none" opacity="0.5" />
    </svg>
  );
}
