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

      {/* LE COU */}
      <path d="M134 192 L166 192 L169 240 Q150 248 131 240 Z" fill="url(#pJaSkin)" />

      {/* LE VISAGE : franc, joufflu, taches de rousseur */}
      <path d="M150 66 C189 66 204 94 202 130 C200 165 184 197 150 203 C116 197 100 165 98 130 C96 94 111 66 150 66 Z" fill="url(#pJaSkin)" />
      <path d="M104 116 Q100 150 118 178" stroke="#ffe6b0" strokeWidth="5" fill="none" opacity="0.3" strokeLinecap="round" />
      <ellipse cx="98" cy="140" rx="8" ry="11" fill="#e0a878" opacity="0.6" /><ellipse cx="202" cy="140" rx="8" ry="11" fill="#e0a878" opacity="0.6" />
      {/* taches de rousseur */}
      {[[112, 134], [120, 142], [108, 148], [188, 134], [180, 142], [192, 148]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.6" fill="#c88a58" opacity="0.7" />)}

      {/* SOURCILS auburn + YEUX pétillants (bleus) */}
      <path d="M116 122 Q129 116 143 123" stroke="#a85a2a" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path d="M157 123 Q171 116 184 122" stroke="#a85a2a" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path d="M118 134 Q129 128 141 134 Q130 141 118 134 Z" fill="#f8efdd" />
      <path d="M159 134 Q171 128 182 134 Q170 141 159 134 Z" fill="#f8efdd" />
      <circle cx="130" cy="134" r="4.2" fill="#3a6a8a" /><circle cx="170" cy="134" r="4.2" fill="#3a6a8a" />
      <circle cx="131.4" cy="132.4" r="1.4" fill="#fff" /><circle cx="171.4" cy="132.4" r="1.4" fill="#fff" />
      <path d="M117 133 Q129 127 142 133 M158 133 Q171 127 183 133" stroke="#8a5a3a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* rides de sourire */}
      <path d="M106 150 q4 8 12 12 M194 150 q-4 8 -12 12" stroke="#c8946a" strokeWidth="1.6" fill="none" opacity="0.4" />

      {/* NEZ + grand sourire */}
      <path d="M145 156 Q150 160 155 156 M145 156 Q143 149 147 147 M155 156 Q157 149 153 147" stroke="#c8946a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <Mouth y={170} dark="#8a3a2e" light="#c0785a" w={14} smile={1} />

      {/* moustache + BARBE auburn fournie */}
      <path d="M130 158 q20 -6 40 0" stroke="#b0602c" strokeWidth="3.6" fill="none" strokeLinecap="round" />
      <path d="M110 152 Q106 192 138 208 Q150 216 162 208 Q194 192 190 152 Q172 176 150 178 Q128 176 110 152 Z" fill="#b0602c" />
      <g stroke="#8a4820" strokeWidth="1.3" fill="none" opacity="0.5"><path d="M124 162 q6 26 24 42 M176 162 q-6 26 -24 42 M150 178 v34" /></g>

      {/* CHAPEAU de prospecteur, repoussé en arrière (mèches auburn devant) */}
      <path d="M100 118 Q96 80 150 74 Q204 80 200 118 Q192 96 172 90 Q160 86 150 88 Q140 86 128 90 Q108 96 100 118 Z" fill="#b0602c" />
      <g transform="translate(0,-4)">
        <ellipse cx="150" cy="70" rx="66" ry="12" fill="#7a5230" />
        <path d="M116 72 Q118 40 150 36 Q182 40 184 72 Z" fill="#8a6238" />
        <path d="M116 66 q34 10 68 0" stroke="#5a3f22" strokeWidth="4" fill="none" />
        <path d="M116 66 q34 10 68 0 l0 -4 q-34 -9 -68 0 Z" fill="#a8352a" opacity="0.7" />
      </g>
    </svg>
  );
}
