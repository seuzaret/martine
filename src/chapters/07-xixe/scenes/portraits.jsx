/* ============================================================
   CHAPITRE 7 — Portrait « gros plan »
   James O'Sullivan : émigré irlandais parti chercher fortune dans
   l'Ouest américain. Cheveux et barbe auburn, taches de rousseur,
   chapeau de prospecteur repoussé en arrière, et — depuis qu'il a
   trouvé le filon — un gilet et une chaîne de montre en or.
   ============================================================ */

import { Mouth } from "../../../engine/faces.jsx";

export function PortraitJames() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pJaHalo" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#ffe6b0" stopOpacity="0.45" /><stop offset="60%" stopColor="#e8cfa0" stopOpacity="0.14" /><stop offset="100%" stopColor="#e8cfa0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pJaSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#eec098" /><stop offset="55%" stopColor="#e0b084" /><stop offset="100%" stopColor="#c8946a" /></linearGradient>
        <linearGradient id="pJaVest" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6a4a30" /><stop offset="100%" stopColor="#463020" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pJaHalo)" />

      {/* chemise à carreaux rouge + GILET brun (le prospecteur enrichi) */}
      <path d="M40 340 Q44 250 96 232 Q122 222 150 224 Q178 222 204 232 Q256 250 260 340 Z" fill="#a8352a" />
      <path d="M40 340 Q44 250 96 232 Q122 222 150 224 Q178 222 204 232 Q256 250 260 340 Z" fill="none" />
      {/* carreaux de la chemise */}
      <g stroke="#7a201a" strokeWidth="2" opacity="0.5"><path d="M70 300 h160 M70 330 h160 M110 250 v90 M150 244 v96 M190 250 v90" /></g>
      {/* le gilet ouvert par-dessus */}
      <path d="M108 232 L150 268 L192 232 L214 340 L176 340 L150 280 L124 340 L86 340 Z" fill="url(#pJaVest)" />
      {/* chaîne de montre en or + petite pépite */}
      <path d="M132 268 Q150 284 168 270" stroke="#e6c25a" strokeWidth="2.4" fill="none" />
      <circle cx="168" cy="270" r="4" fill="#e6c25a" stroke="#a8801f" strokeWidth="1" />
      {/* col ouvert + foulard */}
      <path d="M140 236 Q150 250 160 236 L156 262 Q150 270 144 262 Z" fill="#efe6d2" />

      {/* LE COU (plus étroit, sous un menton plus petit) */}
      <path d="M137 186 L163 186 L165 230 Q150 238 135 230 Z" fill="url(#pJaSkin)" />

      {/* LE VISAGE : OVALE (plus haut que large) et plus petit qu'avant.
          Contour de référence : x 112→188, y 86→192, centre ~138. */}
      <path d="M150 86 C177 86 189 110 188 138 C187 166 171 190 150 192 C129 190 113 166 112 138 C111 110 123 86 150 86 Z" fill="url(#pJaSkin)" />
      <path d="M118 120 Q114 150 130 176" stroke="#ffe6b0" strokeWidth="4" fill="none" opacity="0.3" strokeLinecap="round" />
      {/* oreilles collées au bord de l'ovale */}
      <ellipse cx="113" cy="140" rx="6" ry="9" fill="#e0a878" /><ellipse cx="187" cy="140" rx="6" ry="9" fill="#e0a878" />

      {/* SOURCILS auburn + YEUX pétillants (bleus) */}
      <path d="M124 124 Q134 119 145 125" stroke="#a85a2a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M155 125 Q166 119 176 124" stroke="#a85a2a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M126 134 Q135 129 144 134 Q135 140 126 134 Z" fill="#f8efdd" />
      <path d="M156 134 Q165 129 174 134 Q165 140 156 134 Z" fill="#f8efdd" />
      <circle cx="135" cy="134" r="3.8" fill="#3a6a8a" /><circle cx="165" cy="134" r="3.8" fill="#3a6a8a" />
      <circle cx="136.2" cy="132.6" r="1.2" fill="#fff" /><circle cx="166.2" cy="132.6" r="1.2" fill="#fff" />
      <path d="M125 133 Q135 128 145 133 M155 133 Q165 128 175 133" stroke="#8a5a3a" strokeWidth="1.9" fill="none" strokeLinecap="round" />
      {/* taches de rousseur (sur les joues, à l'intérieur de l'ovale) */}
      {[[126, 148], [132, 154], [122, 152], [174, 148], [168, 154], [178, 152]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.4" fill="#c88a58" opacity="0.7" />)}

      {/* NEZ discret */}
      <path d="M146 152 Q150 156 154 152 M146 152 Q144 145 148 143 M154 152 Q156 145 152 143" stroke="#c8946a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* MOUSTACHE seule (rasé), en fer à cheval western — sur les joues rasées */}
      <path d="M138 168 q12 -6 24 0 q-4 -8 -12 -8 q-8 0 -12 8 Z" fill="#a85a2a" />
      <path d="M138 168 q-6 6 -10 6 M162 168 q6 6 10 6" stroke="#a85a2a" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      {/* petite ombre sous la moustache */}
      <path d="M140 170 q10 3 20 0" stroke="#7a3a18" strokeWidth="1" fill="none" opacity="0.4" />
      {/* bouche */}
      <Mouth y={176} dark="#8a3a2e" light="#c0785a" w={11} smile={1} />
      {/* légère ombre sous le menton (rasé) */}
      <path d="M136 184 q14 6 28 0" stroke="#c8946a" strokeWidth="1.4" fill="none" opacity="0.4" />

      {/* CHEVEUX : courts, en RAIE sur le côté (mèche auburn plaquée) — ils
          descendent au-dessus des oreilles et laissent le front dégagé.
          Bord bas des mèches suit la naissance des cheveux (juste avant l'ovale). */}
      {/* calotte */}
      <path d="M112 130 Q108 96 150 92 Q192 96 188 130 Q184 108 168 100 Q158 96 150 98 Q142 96 132 100 Q116 108 112 130 Z" fill="#b0602c" />
      {/* raie sur le côté (mèche qui traverse le front) */}
      <path d="M136 108 Q152 100 176 118 Q168 108 156 106 Q144 106 136 108 Z" fill="#9a4e22" />
      {/* pattes au-dessus des oreilles (bien collées à l'ovale) */}
      <path d="M112 130 Q112 148 122 152 Q120 138 118 128 Z" fill="#9a4e22" />
      <path d="M188 130 Q188 148 178 152 Q180 138 182 128 Z" fill="#9a4e22" />

      {/* CHAPEAU de prospecteur — bien POSÉ sur le crâne (bord bas passe
          juste au niveau de la naissance des cheveux), pas repoussé loin
          derrière : on voit le bandeau et un peu de coiffure devant. */}
      <ellipse cx="150" cy="94" rx="62" ry="11" fill="#5a3f22" />
      <path d="M118 94 Q120 62 150 58 Q180 62 182 94 Q168 78 150 78 Q132 78 118 94 Z" fill="#7a5230" />
      <path d="M120 88 q30 9 60 0" stroke="#4a3218" strokeWidth="4" fill="none" />
      <path d="M120 88 q30 9 60 0 l0 -4 q-30 -8 -60 0 Z" fill="#a8352a" opacity="0.6" />
      {/* petite pénombre du bord sur le front */}
      <path d="M124 100 Q150 106 176 100" stroke="#8a5230" strokeWidth="2" fill="none" opacity="0.35" />
    </svg>
  );
}

/* GUGLIELMO MARCONI — inventeur italien de la TSF, la trentaine.
   Costume sombre de la Belle Époque, col empesé, moustache noire,
   air concentré, cheveux bruns coiffés en arrière. */
export function PortraitMarconi() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pMaHalo" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#d8e4f0" stopOpacity="0.45" /><stop offset="60%" stopColor="#b8c4d0" stopOpacity="0.14" /><stop offset="100%" stopColor="#b8c4d0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pMaSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#d8b088" /><stop offset="55%" stopColor="#c8a078" /><stop offset="100%" stopColor="#a8805a" /></linearGradient>
        <linearGradient id="pMaSuit" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a1e2a" /><stop offset="100%" stopColor="#0a0e18" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pMaHalo)" />

      {/* costume noir + gilet + col empesé + cravate */}
      <path d="M40 340 Q44 250 96 232 Q122 222 150 224 Q178 222 204 232 Q256 250 260 340 Z" fill="url(#pMaSuit)" />
      {/* revers du veston */}
      <path d="M124 232 L108 260 L120 300 L150 260 Z" fill="#0a0a12" />
      <path d="M176 232 L192 260 L180 300 L150 260 Z" fill="#0a0a12" />
      {/* col empesé blanc + cravate noire fine */}
      <path d="M138 236 Q150 252 162 236 L160 266 Q150 274 140 266 Z" fill="#efe9dc" />
      <path d="M146 254 L150 262 L154 254 L152 292 L148 292 Z" fill="#0a0a12" />
      {/* petit ordre honorifique (rosette) sur le revers */}
      <circle cx="122" cy="272" r="4" fill="#a83828" /><circle cx="122" cy="272" r="2" fill="#e0b040" />

      {/* LE COU */}
      <path d="M137 186 L163 186 L165 230 Q150 238 135 230 Z" fill="url(#pMaSkin)" />

      {/* LE VISAGE OVALE (même gabarit que James) */}
      <path d="M150 86 C177 86 189 110 188 138 C187 166 171 190 150 192 C129 190 113 166 112 138 C111 110 123 86 150 86 Z" fill="url(#pMaSkin)" />
      <ellipse cx="113" cy="140" rx="6" ry="9" fill="#b48a5a" />
      <ellipse cx="187" cy="140" rx="6" ry="9" fill="#b48a5a" />

      {/* SOURCILS bruns + YEUX sombres, concentrés */}
      <path d="M124 124 Q134 119 145 125" stroke="#2a2418" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M155 125 Q166 119 176 124" stroke="#2a2418" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M126 134 Q135 129 144 134 Q135 140 126 134 Z" fill="#f8efdd" />
      <path d="M156 134 Q165 129 174 134 Q165 140 156 134 Z" fill="#f8efdd" />
      <circle cx="135" cy="134" r="3.8" fill="#2a2418" />
      <circle cx="165" cy="134" r="3.8" fill="#2a2418" />
      <circle cx="136.2" cy="132.6" r="1.2" fill="#fff" /><circle cx="166.2" cy="132.6" r="1.2" fill="#fff" />

      {/* NEZ discret + moustache noire fine + bouche */}
      <path d="M146 152 Q150 156 154 152 M146 152 Q144 145 148 143 M154 152 Q156 145 152 143" stroke="#a8805a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M136 166 Q150 160 164 166 Q160 170 150 168 Q140 170 136 166 Z" fill="#2a2418" />
      <path d="M136 166 q-4 3 -8 2 M164 166 q4 3 8 2" stroke="#2a2418" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <Mouth y={175} dark="#7a3a2e" light="#a06848" w={10} />

      {/* cheveux courts, coiffés en arrière (raie centrale légère) */}
      <path d="M112 128 Q108 92 150 88 Q192 92 188 128 Q186 108 168 100 Q158 96 150 98 Q142 96 132 100 Q114 108 112 128 Z" fill="#3a2a1a" />
      <path d="M148 100 v20 M150 100 v22 M152 100 v20" stroke="#2a1a10" strokeWidth="1" opacity="0.4" />
      <path d="M112 128 Q112 148 122 152 Q120 138 118 126 Z" fill="#2a1a10" />
      <path d="M188 128 Q188 148 178 152 Q180 138 182 126 Z" fill="#2a1a10" />
    </svg>
  );
}

/* SEAN O'SULLIVAN — le fils de James, jeune homme (30 ans) en 1915.
   Cheveux auburn plus foncés que son père, rasé de près, costume clair
   moderne (col fermé, cravate rayée), l'air éveillé. */
export function PortraitSean() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pSeHalo" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#ffe6b0" stopOpacity="0.45" /><stop offset="60%" stopColor="#e8cfa0" stopOpacity="0.14" /><stop offset="100%" stopColor="#e8cfa0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pSeSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#eec098" /><stop offset="55%" stopColor="#e0b084" /><stop offset="100%" stopColor="#c8946a" /></linearGradient>
        <linearGradient id="pSeSuit" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4a5a6a" /><stop offset="100%" stopColor="#2c3846" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pSeHalo)" />

      {/* costume gris-bleu + col fermé + cravate rayée verte/or (Irish) */}
      <path d="M40 340 Q44 250 96 232 Q122 222 150 224 Q178 222 204 232 Q256 250 260 340 Z" fill="url(#pSeSuit)" />
      <path d="M124 232 L108 264 L124 300 L150 268 Z" fill="#2a3846" />
      <path d="M176 232 L192 264 L176 300 L150 268 Z" fill="#2a3846" />
      {/* chemise blanche + cravate rayée */}
      <path d="M140 232 L150 246 L160 232 L158 280 L142 280 Z" fill="#efe9dc" />
      <path d="M146 244 L152 244 L154 296 L148 296 Z" fill="#2a6a3a" />
      {[248, 258, 268, 278, 288].map((y, i) => <path key={i} d={`M146 ${y} l6 0`} stroke="#e0b040" strokeWidth="1.5" />)}

      {/* LE COU */}
      <path d="M137 186 L163 186 L165 230 Q150 238 135 230 Z" fill="url(#pSeSkin)" />

      {/* LE VISAGE OVALE */}
      <path d="M150 86 C177 86 189 110 188 138 C187 166 171 190 150 192 C129 190 113 166 112 138 C111 110 123 86 150 86 Z" fill="url(#pSeSkin)" />
      <ellipse cx="113" cy="140" rx="6" ry="9" fill="#e0a878" />
      <ellipse cx="187" cy="140" rx="6" ry="9" fill="#e0a878" />

      {/* SOURCILS auburn + YEUX bleus (comme son père) */}
      <path d="M124 124 Q134 119 145 125" stroke="#a85a2a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M155 125 Q166 119 176 124" stroke="#a85a2a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M126 134 Q135 129 144 134 Q135 140 126 134 Z" fill="#f8efdd" />
      <path d="M156 134 Q165 129 174 134 Q165 140 156 134 Z" fill="#f8efdd" />
      <circle cx="135" cy="134" r="3.8" fill="#3a6a8a" /><circle cx="165" cy="134" r="3.8" fill="#3a6a8a" />
      <circle cx="136.2" cy="132.6" r="1.2" fill="#fff" /><circle cx="166.2" cy="132.6" r="1.2" fill="#fff" />
      {/* quelques taches de rousseur (héritées !) */}
      {[[128, 148], [172, 148], [124, 154], [176, 154]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.3" fill="#c88a58" opacity="0.6" />)}

      {/* NEZ + sourire jeune, sans moustache */}
      <path d="M146 152 Q150 156 154 152 M146 152 Q144 145 148 143 M154 152 Q156 145 152 143" stroke="#c8946a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <Mouth y={170} dark="#8a3a2e" light="#c0785a" w={12} smile={1} />

      {/* cheveux auburn foncés, coupe moderne 1915 (courts sur les côtés,
          gominés en arrière avec raie sur le côté) */}
      <path d="M112 130 Q108 92 150 88 Q192 92 188 130 Q186 108 168 100 Q158 96 150 98 Q142 96 132 100 Q114 108 112 130 Z" fill="#7a3a1a" />
      <path d="M132 106 Q150 100 176 116 Q168 106 156 104 Q142 104 132 106 Z" fill="#5a2a10" />
      <path d="M112 130 Q112 148 122 152 Q120 138 118 128 Z" fill="#5a2a10" />
      <path d="M188 130 Q188 148 178 152 Q180 138 182 128 Z" fill="#5a2a10" />
    </svg>
  );
}

/* JAMES ÂGÉ — même homme, 30 ans plus tard (~1878, 66 ans). Cheveux et
   moustache blancs, petites lunettes rondes de la Belle Époque, redingote
   noire. Un cylindre de cire dans la main, symbole du chapitre. */
export function PortraitJamesVieux() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pJvHalo" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#ffe6b0" stopOpacity="0.4" /><stop offset="60%" stopColor="#e8cfa0" stopOpacity="0.12" /><stop offset="100%" stopColor="#e8cfa0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pJvSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#e8b898" /><stop offset="55%" stopColor="#d8a884" /><stop offset="100%" stopColor="#b88864" /></linearGradient>
        <linearGradient id="pJvCoat" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1c1610" /><stop offset="100%" stopColor="#0a0806" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pJvHalo)" />

      {/* redingote noire + gilet gris + col empesé */}
      <path d="M40 340 Q44 250 96 232 Q122 222 150 224 Q178 222 204 232 Q256 250 260 340 Z" fill="url(#pJvCoat)" />
      <path d="M124 232 L108 262 L118 306 L150 262 Z" fill="#0a0806" />
      <path d="M176 232 L192 262 L182 306 L150 262 Z" fill="#0a0806" />
      <path d="M132 232 L150 262 L168 232 L164 300 L136 300 Z" fill="#3a2a20" />
      <path d="M138 236 Q150 250 162 236 L160 262 Q150 268 140 262 Z" fill="#efe6d2" />
      <path d="M146 254 L150 262 L154 254 L152 292 L148 292 Z" fill="#0a0806" />
      {/* chaîne de montre en or */}
      <path d="M132 270 Q150 286 168 272" stroke="#e6c25a" strokeWidth="2.4" fill="none" />
      <circle cx="168" cy="272" r="4" fill="#e6c25a" stroke="#a8801f" strokeWidth="1" />

      {/* LE COU (plus ridé, mais tenons la même géométrie) */}
      <path d="M137 186 L163 186 L165 230 Q150 238 135 230 Z" fill="url(#pJvSkin)" />
      <path d="M138 220 q12 4 24 0" stroke="#a8886a" strokeWidth="1.4" fill="none" opacity="0.6" />

      {/* LE VISAGE OVALE (même gabarit que le James jeune) */}
      <path d="M150 86 C177 86 189 110 188 138 C187 166 171 190 150 192 C129 190 113 166 112 138 C111 110 123 86 150 86 Z" fill="url(#pJvSkin)" />
      <ellipse cx="113" cy="140" rx="6" ry="9" fill="#b88864" />
      <ellipse cx="187" cy="140" rx="6" ry="9" fill="#b88864" />
      {/* rides sur le front et aux coins des yeux */}
      <path d="M124 108 Q135 104 146 108 M154 108 Q165 104 176 108" stroke="#a8785a" strokeWidth="1.4" fill="none" opacity="0.5" />
      <path d="M116 138 q4 4 8 0 M176 138 q4 4 8 0" stroke="#a8785a" strokeWidth="1.2" fill="none" opacity="0.5" />
      <path d="M138 176 q12 4 24 0" stroke="#a8785a" strokeWidth="1.2" fill="none" opacity="0.4" />

      {/* SOURCILS BLANCS + PETITES LUNETTES rondes */}
      <path d="M124 124 Q134 119 145 125" stroke="#efe6d2" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M155 125 Q166 119 176 124" stroke="#efe6d2" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="135" cy="134" r="10" fill="none" stroke="#5a4030" strokeWidth="1.6" />
      <circle cx="165" cy="134" r="10" fill="none" stroke="#5a4030" strokeWidth="1.6" />
      <path d="M145 134 h10" stroke="#5a4030" strokeWidth="1.6" />
      <path d="M126 134 Q135 130 144 134 Q135 138 126 134 Z" fill="#f8efdd" />
      <path d="M156 134 Q165 130 174 134 Q165 138 156 134 Z" fill="#f8efdd" />
      <circle cx="135" cy="134" r="3.4" fill="#3a6a8a" /><circle cx="165" cy="134" r="3.4" fill="#3a6a8a" />
      <circle cx="136" cy="132.6" r="1.1" fill="#fff" /><circle cx="166" cy="132.6" r="1.1" fill="#fff" />

      {/* NEZ + MOUSTACHE BLANCHE (western toujours) */}
      <path d="M146 152 Q150 156 154 152 M146 152 Q144 145 148 143 M154 152 Q156 145 152 143" stroke="#b88864" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M138 168 q12 -6 24 0 q-4 -8 -12 -8 q-8 0 -12 8 Z" fill="#efe6d2" />
      <path d="M138 168 q-6 6 -10 6 M162 168 q6 6 10 6" stroke="#efe6d2" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      {/* bouche fine, plus âgée */}
      <Mouth y={178} dark="#7a3a2e" light="#a06848" w={10} smile={0} />

      {/* CHEVEUX BLANCS qui reculent (front dégarni), pattes sur les oreilles */}
      <path d="M116 128 Q112 100 150 96 Q188 100 184 128 Q180 112 168 108 Q158 108 150 110 Q142 108 132 108 Q120 112 116 128 Z" fill="#efe6d2" />
      <path d="M112 130 Q112 148 122 152 Q120 138 118 128 Z" fill="#efe6d2" />
      <path d="M188 130 Q188 148 178 152 Q180 138 182 128 Z" fill="#efe6d2" />
    </svg>
  );
}

/* LE PHOTOGRAPHE — un homme d'affaires du Wild West (fin 1850s), un peu
   théâtral : redingote sombre, cravate lavallière, favoris fournis,
   tête un peu inclinée sous l'ombre de son voile noir. */
export function PortraitPhotographe() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pPhHalo" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#f0d8b0" stopOpacity="0.4" /><stop offset="60%" stopColor="#d8b898" stopOpacity="0.12" /><stop offset="100%" stopColor="#d8b898" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pPhSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#e8c090" /><stop offset="55%" stopColor="#d0a874" /><stop offset="100%" stopColor="#a88254" /></linearGradient>
        <linearGradient id="pPhCoat" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3a2018" /><stop offset="100%" stopColor="#1a0c08" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pPhHalo)" />

      {/* redingote brun sombre + gilet fauve + col empesé + lavallière noire */}
      <path d="M40 340 Q44 250 96 232 Q122 222 150 224 Q178 222 204 232 Q256 250 260 340 Z" fill="url(#pPhCoat)" />
      <path d="M124 232 L108 262 L120 300 L150 262 Z" fill="#1a0c08" />
      <path d="M176 232 L192 262 L180 300 L150 262 Z" fill="#1a0c08" />
      <path d="M132 232 L150 262 L168 232 L164 306 L136 306 Z" fill="#8a6a2a" />
      <path d="M138 236 Q150 250 162 236 L160 262 Q150 268 140 262 Z" fill="#efe6d2" />
      {/* la lavallière (nœud papillon large) */}
      <path d="M138 256 L162 256 L156 274 L150 268 L144 274 Z" fill="#0a0806" />

      {/* LE COU */}
      <path d="M137 186 L163 186 L165 230 Q150 238 135 230 Z" fill="url(#pPhSkin)" />

      {/* LE VISAGE OVALE (même gabarit) */}
      <path d="M150 86 C177 86 189 110 188 138 C187 166 171 190 150 192 C129 190 113 166 112 138 C111 110 123 86 150 86 Z" fill="url(#pPhSkin)" />
      <ellipse cx="113" cy="140" rx="6" ry="9" fill="#b88864" />
      <ellipse cx="187" cy="140" rx="6" ry="9" fill="#b88864" />

      {/* SOURCILS bruns fournis + YEUX gris-vert concentrés */}
      <path d="M124 124 Q134 118 145 125" stroke="#3a2818" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path d="M155 125 Q166 118 176 124" stroke="#3a2818" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path d="M126 134 Q135 129 144 134 Q135 140 126 134 Z" fill="#f8efdd" />
      <path d="M156 134 Q165 129 174 134 Q165 140 156 134 Z" fill="#f8efdd" />
      <circle cx="135" cy="134" r="3.8" fill="#4a5a3a" /><circle cx="165" cy="134" r="3.8" fill="#4a5a3a" />
      <circle cx="136.2" cy="132.6" r="1.2" fill="#fff" /><circle cx="166.2" cy="132.6" r="1.2" fill="#fff" />

      {/* NEZ + moustache-favoris (longs FAVORIS mutton-chops, en vogue vers 1855) */}
      <path d="M146 152 Q150 156 154 152 M146 152 Q144 145 148 143 M154 152 Q156 145 152 143" stroke="#a88254" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* moustache fine reliée aux favoris */}
      <path d="M138 168 q12 -4 24 0" stroke="#3a2818" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M114 148 Q112 176 128 184 Q136 180 138 168 Q130 172 124 168 Q118 160 114 148 Z" fill="#3a2818" />
      <path d="M186 148 Q188 176 172 184 Q164 180 162 168 Q170 172 176 168 Q182 160 186 148 Z" fill="#3a2818" />
      <Mouth y={178} dark="#7a3a2e" light="#a06848" w={10} smile={0} />

      {/* CHEVEUX bruns, coiffés en arrière avec un peu de volume — les
          photographes du XIXᵉ portaient souvent la mèche haute. */}
      <path d="M112 130 Q108 88 150 82 Q192 88 188 130 Q184 100 168 92 Q158 90 150 94 Q142 90 132 92 Q116 100 112 130 Z" fill="#3a2418" />
      <path d="M132 100 Q150 92 176 108 Q168 100 156 98 Q142 98 132 100 Z" fill="#2a1810" />
    </svg>
  );
}

/* L'OUVREUSE DU NICKELODEON — jeune femme, uniforme sombre orné d'un
   liseré doré, chapeau plat, lampe torche à la main. Un rôle très
   répandu dans les salles obscures du début XXᵉ. */
export function PortraitOuvreuse() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pOuHalo" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#f0d8b0" stopOpacity="0.4" /><stop offset="60%" stopColor="#d8b898" stopOpacity="0.12" /><stop offset="100%" stopColor="#d8b898" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pOuSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#f0c8a0" /><stop offset="55%" stopColor="#e0b088" /><stop offset="100%" stopColor="#c0906a" /></linearGradient>
        <linearGradient id="pOuUnif" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7a1818" /><stop offset="100%" stopColor="#3a0808" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pOuHalo)" />

      {/* uniforme grenat + galon or aux boutonnières + col fermé */}
      <path d="M40 340 Q44 250 96 232 Q122 222 150 224 Q178 222 204 232 Q256 250 260 340 Z" fill="url(#pOuUnif)" />
      {/* rangée de boutons dorés */}
      {[250, 268, 286, 304, 322].map((y, i) => <circle key={i} cx="150" cy={y} r="4" fill="#e0b040" stroke="#a8801f" strokeWidth="1" />)}
      {/* galons épaulettes */}
      <path d="M96 232 L108 232 L112 246 L100 246 Z" fill="#e0b040" />
      <path d="M204 232 L192 232 L188 246 L200 246 Z" fill="#e0b040" />
      {/* le col fermé */}
      <path d="M136 226 L164 226 L162 244 L138 244 Z" fill="#3a0808" />
      <path d="M138 228 h24 M138 236 h24" stroke="#e0b040" strokeWidth="1.2" opacity="0.7" />

      {/* LE COU */}
      <path d="M137 190 L163 190 L165 230 Q150 238 135 230 Z" fill="url(#pOuSkin)" />

      {/* LE VISAGE OVALE — un peu plus rond que les hommes (jeune femme) */}
      <path d="M150 88 C179 88 190 112 189 138 C188 168 172 190 150 192 C128 190 112 168 111 138 C110 112 121 88 150 88 Z" fill="url(#pOuSkin)" />
      <ellipse cx="112" cy="140" rx="6" ry="9" fill="#c0906a" />
      <ellipse cx="188" cy="140" rx="6" ry="9" fill="#c0906a" />
      {/* petites boucles d'oreille en perle */}
      <circle cx="112" cy="150" r="2.4" fill="#efe6d2" stroke="#8a7050" strokeWidth="0.6" />
      <circle cx="188" cy="150" r="2.4" fill="#efe6d2" stroke="#8a7050" strokeWidth="0.6" />

      {/* SOURCILS brun clair fins + YEUX noisette */}
      <path d="M124 124 Q134 120 145 125" stroke="#5a3818" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M155 125 Q166 120 176 124" stroke="#5a3818" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M126 134 Q135 130 144 134 Q135 138 126 134 Z" fill="#f8efdd" />
      <path d="M156 134 Q165 130 174 134 Q165 138 156 134 Z" fill="#f8efdd" />
      <circle cx="135" cy="134" r="3.6" fill="#6a4820" /><circle cx="165" cy="134" r="3.6" fill="#6a4820" />
      <circle cx="136.2" cy="132.6" r="1.2" fill="#fff" /><circle cx="166.2" cy="132.6" r="1.2" fill="#fff" />
      {/* cils */}
      <path d="M125 133 Q135 128 145 133 M155 133 Q165 128 175 133" stroke="#3a2418" strokeWidth="1.4" fill="none" strokeLinecap="round" />

      {/* NEZ discret + bouche rougie (rouge à lèvres Belle Époque) */}
      <path d="M146 154 Q150 158 154 154 M146 154 Q145 147 148 145 M154 154 Q155 147 152 145" stroke="#c0906a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <Mouth y={174} dark="#a8382e" light="#e0685a" w={11} smile={1} />

      {/* CHEVEUX châtain remontés (chignon d'époque) + chapeau plat rond */}
      <path d="M112 126 Q108 90 150 84 Q192 90 188 126 Q186 108 168 100 Q158 96 150 98 Q142 96 132 100 Q114 108 112 126 Z" fill="#7a4a20" />
      {/* petit chignon au sommet, sous le chapeau */}
      <ellipse cx="150" cy="80" rx="18" ry="10" fill="#5a3418" />
      {/* chapeau plat rond (façon "pillbox") avec galon doré */}
      <path d="M120 78 h60 v14 h-60 Z" fill="#7a1818" stroke="#3a0808" strokeWidth="1.5" />
      <path d="M120 88 h60" stroke="#e0b040" strokeWidth="2" />
      {/* mèches qui dépassent devant les oreilles */}
      <path d="M112 130 Q112 148 120 152 Q118 138 116 128 Z" fill="#5a3418" />
      <path d="M188 130 Q188 148 180 152 Q182 138 184 128 Z" fill="#5a3418" />
    </svg>
  );
}
