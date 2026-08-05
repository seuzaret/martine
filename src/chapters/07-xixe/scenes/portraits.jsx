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

      {/* NEZ discret + sourire */}
      <path d="M146 152 Q150 156 154 152 M146 152 Q144 145 148 143 M154 152 Q156 145 152 143" stroke="#c8946a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <Mouth y={163} dark="#8a3a2e" light="#c0785a" w={12} smile={1} />

      {/* moustache + BARBE auburn qui ÉPOUSE le bas de l'ovale : le contour
          extérieur suit exactement la mâchoire/le menton du visage. */}
      <path d="M112 138 Q112 168 138 188 Q150 195 162 188 Q188 168 188 138 Q170 160 150 162 Q130 160 112 138 Z" fill="#b0602c" />
      <path d="M130 150 q20 -6 40 0" stroke="#a85a2a" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <g stroke="#8a4820" strokeWidth="1.2" fill="none" opacity="0.5"><path d="M124 146 q6 24 26 42 M176 146 q-6 24 -26 42 M150 162 v30" /></g>

      {/* CHEVEUX auburn : calotte qui ÉPOUSE le haut de l'ovale (bord bas =
          la ligne des cheveux sur le front), avant le chapeau. */}
      <path d="M112 140 Q110 92 150 88 Q190 92 188 140 Q182 112 166 104 Q158 100 150 101 Q142 100 134 104 Q118 112 112 140 Z" fill="#b0602c" />
      <path d="M112 140 Q110 118 118 108 Q116 128 116 142 Z" fill="#9a4e22" />
      <path d="M188 140 Q190 118 182 108 Q184 128 184 142 Z" fill="#9a4e22" />

      {/* CHAPEAU de prospecteur, repoussé en arrière (on voit le front + les
          mèches ; la coiffe passe DERRIÈRE le haut du crâne). */}
      <ellipse cx="150" cy="78" rx="60" ry="11" fill="#5a3f22" />
      <path d="M118 80 Q120 50 150 46 Q180 50 182 80 Q168 64 150 64 Q132 64 118 80 Z" fill="#7a5230" />
      <path d="M120 74 q30 9 60 0" stroke="#4a3218" strokeWidth="4" fill="none" />
      <path d="M120 74 q30 9 60 0 l0 -4 q-30 -8 -60 0 Z" fill="#a8352a" opacity="0.6" />
    </svg>
  );
}
