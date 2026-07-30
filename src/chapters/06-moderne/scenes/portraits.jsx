/* ============================================================
   CHAPITRE 6 — Portraits « gros plan »
   Jules (le jeune journaliste), Sigismond (le rédacteur en chef)
   et Alessandro Volta (le savant). Costume fin XVIIIe : col haut,
   jabot, gilet. Même cadre que les autres chapitres.
   ============================================================ */

import { Mouth } from "../../../engine/faces.jsx";

/* JULES — jeune journaliste enthousiaste. Cheveux en catogan, jabot
   défait, une plume glissée derrière l'oreille, l'œil vif. */
export function PortraitJules() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pJuHalo" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#ffe6b0" stopOpacity="0.45" /><stop offset="60%" stopColor="#e8cfa0" stopOpacity="0.14" /><stop offset="100%" stopColor="#e8cfa0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pJuSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#e2b488" /><stop offset="55%" stopColor="#d2a472" /><stop offset="100%" stopColor="#b48454" /></linearGradient>
        <linearGradient id="pJuCoat" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3a5a6a" /><stop offset="100%" stopColor="#243c48" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pJuHalo)" />

      {/* habit bleu à col haut + gilet clair + jabot défait */}
      <path d="M40 340 Q44 250 96 232 Q122 222 150 224 Q178 222 204 232 Q256 250 260 340 Z" fill="url(#pJuCoat)" />
      <path d="M124 234 L150 268 L176 234 L176 340 L124 340 Z" fill="#d8cdae" />
      {/* revers du col */}
      <path d="M124 234 L108 262 L120 300 L150 268 Z" fill="#2c4652" />
      <path d="M176 234 L192 262 L180 300 L150 268 Z" fill="#2c4652" />
      {/* jabot de dentelle un peu froissé */}
      <path d="M150 250 Q142 276 150 306 Q158 276 150 250 Z" fill="#eee7d4" />
      {[262, 278, 294].map((y, i) => <path key={i} d={`M143 ${y} q7 5 14 0`} stroke="#c9be9a" strokeWidth="1.4" fill="none" />)}

      {/* LE COU */}
      <path d="M134 192 L166 192 L169 240 Q150 248 131 240 Z" fill="url(#pJuSkin)" />

      {/* LE VISAGE : jeune, joues pleines */}
      <path d="M150 64 C188 64 203 92 201 128 C199 164 183 196 150 202 C117 196 101 164 99 128 C97 92 112 64 150 64 Z" fill="url(#pJuSkin)" />
      <path d="M104 116 Q100 150 118 178" stroke="#ffe6b0" strokeWidth="5" fill="none" opacity="0.32" strokeLinecap="round" />
      <ellipse cx="99" cy="140" rx="8" ry="11" fill="#d99c68" opacity="0.6" /><ellipse cx="201" cy="140" rx="8" ry="11" fill="#d99c68" opacity="0.6" />

      {/* SOURCILS hauts (curieux) + YEUX vifs */}
      <path d="M116 122 Q129 116 143 123" stroke="#5a3f28" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path d="M157 123 Q171 116 184 122" stroke="#5a3f28" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path d="M118 134 Q129 128 141 134 Q130 141 118 134 Z" fill="#f8efdd" />
      <path d="M159 134 Q171 128 182 134 Q170 141 159 134 Z" fill="#f8efdd" />
      <circle cx="130" cy="134" r="4.4" fill="#4a3320" /><circle cx="170" cy="134" r="4.4" fill="#4a3320" />
      <circle cx="131.6" cy="132.4" r="1.4" fill="#fff" /><circle cx="171.6" cy="132.4" r="1.4" fill="#fff" />
      <path d="M117 133 Q129 127 142 133 M158 133 Q171 127 183 133" stroke="#5a4633" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* NEZ discret + bouche en demi-sourire */}
      <path d="M145 156 Q150 160 155 156 M145 156 Q143 149 147 147 M155 156 Q157 149 153 147" stroke="#b48454" strokeWidth="2" fill="none" strokeLinecap="round" />
      <Mouth y={172} dark="#8a3a2e" light="#c0785a" w={13} smile={1} />

      {/* cheveux bruns en catogan (queue nouée) */}
      <path d="M99 128 Q95 66 150 60 Q205 66 201 128 Q196 100 176 92 Q162 88 150 89 Q138 88 124 92 Q104 100 99 128 Z" fill="#5a3f28" />
      <path d="M99 126 Q92 150 100 176 L114 168 Q106 146 108 128 Z" fill="#4a3220" />
      <path d="M201 126 Q210 156 214 196 L200 198 Q200 156 192 130 Z" fill="#4a3220" />
      {/* petit ruban de la queue */}
      <path d="M202 176 q10 6 4 16 q-8 -2 -8 -10 Z" fill="#7a2a34" />
      {/* la PLUME glissée derrière l'oreille */}
      <g transform="translate(196,150) rotate(28)">
        <path d="M0 0 Q6 -30 2 -52 Q-3 -30 0 0 Z" fill="#f4efe2" stroke="#c9be9a" strokeWidth="1" />
        <path d="M1 -6 V-46" stroke="#c9be9a" strokeWidth="1" />
        <path d="M1 2 l0 8" stroke="#3a2a1a" strokeWidth="2" />
      </g>
    </svg>
  );
}

/* SIGISMOND — rédacteur en chef, la cinquantaine. Bésicles sur le nez,
   catogan poudré grisonnant, habit sobre, air malin et sûr de lui. */
export function PortraitSigismond() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pSiHalo" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#fdeccb" stopOpacity="0.45" /><stop offset="60%" stopColor="#e6d6b6" stopOpacity="0.14" /><stop offset="100%" stopColor="#e6d6b6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pSiSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#d8ac80" /><stop offset="55%" stopColor="#c89c70" /><stop offset="100%" stopColor="#a87c50" /></linearGradient>
        <linearGradient id="pSiCoat" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5a4030" /><stop offset="100%" stopColor="#3a281c" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pSiHalo)" />

      {/* habit brun sobre + gilet bordeaux + cravate blanche */}
      <path d="M36 340 Q40 248 94 230 Q122 220 150 222 Q178 220 206 230 Q260 248 264 340 Z" fill="url(#pSiCoat)" />
      <path d="M120 232 L150 266 L180 232 L180 340 L120 340 Z" fill="#6a2530" />
      <path d="M120 232 L104 260 L118 300 L150 266 Z" fill="#4a3226" />
      <path d="M180 232 L196 260 L182 300 L150 266 Z" fill="#4a3226" />
      {/* cravate/col montant blanc */}
      <path d="M138 236 Q150 252 162 236 L160 262 Q150 272 140 262 Z" fill="#efe9dc" />
      {/* boutons du gilet */}
      {[280, 300, 320].map((y, i) => <circle key={i} cx="150" cy={y} r="3" fill="#c8a84a" />)}

      {/* LE COU */}
      <path d="M134 192 L166 192 L169 240 Q150 248 131 240 Z" fill="url(#pSiSkin)" />

      {/* LE VISAGE : mûr, un peu empâté */}
      <path d="M150 66 C190 66 205 94 203 130 C201 166 184 198 150 204 C116 198 99 166 97 130 C95 94 110 66 150 66 Z" fill="url(#pSiSkin)" />
      <ellipse cx="98" cy="142" rx="9" ry="11" fill="#c07a4a" opacity="0.5" /><ellipse cx="202" cy="142" rx="9" ry="11" fill="#c07a4a" opacity="0.5" />
      <path d="M120 100 q30 -6 60 0" stroke="#a87c50" strokeWidth="1.6" fill="none" opacity="0.4" />

      {/* SOURCILS gris fournis + YEUX perçants */}
      <path d="M116 124 Q129 118 143 125" stroke="#8a8072" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M157 125 Q171 118 184 124" stroke="#8a8072" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M119 136 Q129 131 140 136 Q130 142 119 136 Z" fill="#f8efdd" />
      <path d="M160 136 Q171 131 181 136 Q170 142 160 136 Z" fill="#f8efdd" />
      <circle cx="130" cy="136" r="4" fill="#3a2a1a" /><circle cx="170" cy="136" r="4" fill="#3a2a1a" />
      <circle cx="131.3" cy="134.6" r="1.2" fill="#fff" /><circle cx="171.3" cy="134.6" r="1.2" fill="#fff" />

      {/* NEZ + bouche pincée, entendue */}
      <path d="M144 158 Q150 163 156 158 M144 158 Q142 150 146 148 M156 158 Q158 150 154 148" stroke="#a87c50" strokeWidth="2" fill="none" strokeLinecap="round" />
      <Mouth y={174} dark="#7a3a30" light="#a8684e" w={12} />

      {/* LES BÉSICLES (petites lunettes rondes) posées sur le nez */}
      <g stroke="#3a3026" strokeWidth="2.2" fill="none">
        <circle cx="130" cy="137" r="13" /><circle cx="170" cy="137" r="13" />
        <path d="M143 135 h14" /><path d="M117 133 l-16 -6 M183 133 l16 -6" />
      </g>
      <circle cx="130" cy="137" r="12" fill="#bcd0d4" opacity="0.18" /><circle cx="170" cy="137" r="12" fill="#bcd0d4" opacity="0.18" />

      {/* cheveux poudrés grisonnants + rouleaux sur les tempes */}
      <path d="M97 130 Q92 66 150 60 Q208 66 203 130 Q198 100 176 92 Q162 88 150 89 Q138 88 124 92 Q102 100 97 130 Z" fill="#c8bfb0" />
      <ellipse cx="100" cy="150" rx="12" ry="10" fill="#c8bfb0" /><ellipse cx="200" cy="150" rx="12" ry="10" fill="#c8bfb0" />
      <ellipse cx="100" cy="150" rx="12" ry="10" fill="none" stroke="#a89f90" strokeWidth="1.2" opacity="0.6" />
      <ellipse cx="200" cy="150" rx="12" ry="10" fill="none" stroke="#a89f90" strokeWidth="1.2" opacity="0.6" />
      <path d="M110 96 q40 -12 80 0" stroke="#b0a798" strokeWidth="1.6" fill="none" opacity="0.6" />
    </svg>
  );
}

/* ALESSANDRO VOLTA — le savant, la quarantaine. Cheveux naturels
   brun-gris, habit vert élégant, jabot fin, regard réfléchi et curieux. */
export function PortraitVolta() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pVoHalo" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#d8f0e2" stopOpacity="0.45" /><stop offset="60%" stopColor="#c2dcc8" stopOpacity="0.14" /><stop offset="100%" stopColor="#c2dcc8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pVoSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#dcac80" /><stop offset="55%" stopColor="#cc9c70" /><stop offset="100%" stopColor="#ac7c50" /></linearGradient>
        <linearGradient id="pVoCoat" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3a5a44" /><stop offset="100%" stopColor="#243c2e" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pVoHalo)" />

      {/* habit vert brodé + jabot fin */}
      <path d="M38 340 Q42 248 94 230 Q122 220 150 222 Q178 220 206 230 Q258 248 262 340 Z" fill="url(#pVoCoat)" />
      <path d="M126 232 L150 266 L174 232 L174 340 L126 340 Z" fill="#e6dfc8" />
      <path d="M126 232 L110 260 L122 300 L150 266 Z" fill="#2c4636" />
      <path d="M174 232 L190 260 L178 300 L150 266 Z" fill="#2c4636" />
      {/* jabot */}
      <path d="M150 248 Q141 278 150 308 Q159 278 150 248 Z" fill="#f0ebda" />
      {[264, 282, 300].map((y, i) => <path key={i} d={`M143 ${y} q7 5 14 0`} stroke="#cbc0a0" strokeWidth="1.3" fill="none" />)}
      {/* broderie dorée du revers */}
      <path d="M118 250 q-4 24 6 46 M182 250 q4 24 -6 46" stroke="#c8a84a" strokeWidth="1.6" fill="none" opacity="0.7" />

      {/* LE COU */}
      <path d="M134 192 L166 192 L169 240 Q150 248 131 240 Z" fill="url(#pVoSkin)" />

      {/* LE VISAGE : fin, pommettes marquées */}
      <path d="M150 66 C187 66 202 94 200 130 C198 165 182 197 150 203 C118 197 102 165 100 130 C98 94 113 66 150 66 Z" fill="url(#pVoSkin)" />
      <path d="M105 118 Q101 150 119 178" stroke="#fdeccb" strokeWidth="5" fill="none" opacity="0.32" strokeLinecap="round" />
      <ellipse cx="100" cy="142" rx="7.5" ry="10" fill="#c07a4a" opacity="0.5" /><ellipse cx="200" cy="142" rx="7.5" ry="10" fill="#c07a4a" opacity="0.5" />

      {/* SOURCILS + YEUX réfléchis (un léger regard vers le haut) */}
      <path d="M117 125 Q129 120 142 126" stroke="#5a4a36" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M158 126 Q171 120 183 125" stroke="#5a4a36" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M119 136 Q129 131 140 136 Q130 142 119 136 Z" fill="#f8efdd" />
      <path d="M160 136 Q171 131 181 136 Q170 142 160 136 Z" fill="#f8efdd" />
      <circle cx="129" cy="135" r="4.1" fill="#3f2c1a" /><circle cx="169" cy="135" r="4.1" fill="#3f2c1a" />
      <circle cx="130.4" cy="133.6" r="1.3" fill="#fff" /><circle cx="170.4" cy="133.6" r="1.3" fill="#fff" />
      <path d="M118 135 Q129 130 141 135 M159 135 Q171 130 182 135" stroke="#5a4633" strokeWidth="2.1" fill="none" strokeLinecap="round" />

      {/* NEZ fin + bouche calme, songeuse */}
      <path d="M145 157 Q150 161 155 157 M145 157 Q143 150 147 148 M155 157 Q157 150 153 148" stroke="#ac7c50" strokeWidth="2" fill="none" strokeLinecap="round" />
      <Mouth y={173} dark="#7a3a30" light="#a8684e" w={12} />

      {/* cheveux naturels brun-gris, ondulés, dégagés du front */}
      <path d="M100 130 Q95 68 150 62 Q205 68 200 130 Q194 98 172 90 Q160 86 150 87 Q140 86 128 90 Q106 98 100 130 Z" fill="#6a5a48" />
      <path d="M100 128 Q94 156 100 190 L116 184 Q106 156 110 130 Z" fill="#5a4c3a" />
      <path d="M200 128 Q206 156 200 190 L184 184 Q194 156 190 130 Z" fill="#5a4c3a" />
      <path d="M110 96 q40 -12 80 0" stroke="#7a6a54" strokeWidth="1.8" fill="none" opacity="0.5" />
      {/* mèches grises */}
      <path d="M108 108 q40 -10 84 0" stroke="#9a8f7c" strokeWidth="1.2" fill="none" opacity="0.5" />
    </svg>
  );
}
