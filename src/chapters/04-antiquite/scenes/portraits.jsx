/* ============================================================
   CHAPITRE 4 — Portraits « gros plan »
   Caius, le riche marchand d'olives de Pompéi. Même cadre que
   les autres chapitres, avec les codes romains : toge blanche à
   bande, cheveux courts ramenés sur le front, visage rasé de près,
   air prospère et un brin vaniteux. Libre de droits.
   ============================================================ */

import { Mouth } from "../../../engine/faces.jsx";

export function PortraitCaius() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pCaiHalo" cx="50%" cy="40%" r="62%">
          <stop offset="0%" stopColor="#ffe6b0" stopOpacity="0.5" /><stop offset="60%" stopColor="#f0c890" stopOpacity="0.16" /><stop offset="100%" stopColor="#f0c890" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pCaiSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#d8a878" /><stop offset="55%" stopColor="#c89868" /><stop offset="100%" stopColor="#a87848" /></linearGradient>
        <linearGradient id="pCaiToge" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f4efe2" /><stop offset="100%" stopColor="#d8cfb8" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pCaiHalo)" />

      {/* LA TOGE blanche drapée, une bande pourpre (clavus) */}
      <path d="M40 340 Q42 250 92 232 Q122 220 150 222 Q178 220 208 232 Q258 250 260 340 Z" fill="url(#pCaiToge)" />
      {/* les plis du drapé */}
      <path d="M96 250 Q120 300 108 340 M150 236 Q150 300 150 340 M204 250 Q180 300 192 340" stroke="#c4b898" strokeWidth="2.5" fill="none" opacity="0.6" />
      {/* la bande pourpre en écharpe (marque du notable) */}
      <path d="M108 240 Q150 268 176 340" stroke="#8a2a4a" strokeWidth="12" fill="none" opacity="0.85" />
      <path d="M108 240 Q150 268 176 340" stroke="#5a1c34" strokeWidth="3" fill="none" opacity="0.5" />

      {/* LE COU */}
      <path d="M134 190 L166 190 L169 240 Q150 248 131 240 Z" fill="url(#pCaiSkin)" />

      {/* LE VISAGE : plein, sûr de lui */}
      <path d="M150 62 C191 62 208 92 206 130 C204 168 186 198 150 204 C114 198 96 168 94 130 C92 92 109 62 150 62 Z" fill="url(#pCaiSkin)" />
      <path d="M104 116 Q100 152 118 180" stroke="#ffe6b0" strokeWidth="5" fill="none" opacity="0.35" strokeLinecap="round" />
      <ellipse cx="97" cy="142" rx="7" ry="11" fill="#c89868" /><ellipse cx="203" cy="142" rx="7" ry="11" fill="#c89868" />
      {/* une petite bague à l'oreille ? non — un notable rasé, joues pleines */}
      <path d="M116 168 Q122 182 134 186 M184 168 Q178 182 166 186" stroke="#a87848" strokeWidth="2" fill="none" opacity="0.3" />

      {/* SOURCILS + YEUX assurés, un rien hautains */}
      <path d="M116 124 Q129 119 142 125" stroke="#3a2a1a" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path d="M158 125 Q171 119 184 124" stroke="#3a2a1a" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path d="M118 136 Q129 130 140 136 Q130 143 118 136 Z" fill="#f8efdd" />
      <path d="M160 136 Q171 130 182 136 Q170 143 160 136 Z" fill="#f8efdd" />
      <circle cx="130" cy="136" r="4.4" fill="#33200f" /><circle cx="170" cy="136" r="4.4" fill="#33200f" />
      <circle cx="131.5" cy="134.4" r="1.4" fill="#fff" /><circle cx="171.5" cy="134.4" r="1.4" fill="#fff" />
      <path d="M117 135 Q129 129 141 135 M159 135 Q171 129 183 135" stroke="#4a3322" strokeWidth="2.4" fill="none" strokeLinecap="round" />

      {/* NEZ droit et fort (profil romain), discret sur l'arête */}
      <path d="M145 156 Q150 160 155 156 M145 156 Q143 150 148 137 M155 156 Q157 150 152 137" stroke="#a87848" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* la bouche qui parle (rasé de près) */}
      <path d="M150 168 q-2 6 0 8" stroke="#a87848" strokeWidth="1.4" fill="none" opacity="0.3" />
      <Mouth y={180} dark="#8a4a34" light="#c07a5a" w={15} />
      {/* léger double menton de bon vivant */}
      <path d="M128 196 q22 10 44 0" stroke="#a87848" strokeWidth="2" fill="none" opacity="0.3" />

      {/* CHEVEUX COURTS ramenés en mèches sur le front (mode romaine) */}
      <path d="M96 132 Q90 66 150 60 Q210 66 204 132 Q198 108 180 100 Q166 96 150 97 Q134 96 120 100 Q102 108 96 132 Z" fill="#4a3020" />
      {/* les petites mèches en virgule sur le front */}
      <g fill="#3a2416">
        {[-34, -22, -10, 2, 14, 26].map((dx, i) => (
          <path key={i} d={`M${150 + dx} 98 q${i % 2 ? 5 : -5} 8 ${i % 2 ? -2 : 2} 12 q3 -6 ${i % 2 ? -3 : 3} -12 Z`} />
        ))}
      </g>
      <path d="M104 118 Q150 100 196 118" stroke="#2e1c10" strokeWidth="1.6" fill="none" opacity="0.5" />
      {/* couronne de feuillage discrète (pour la fête) posée sur les cheveux */}
      <path d="M100 96 Q150 74 200 96" stroke="#6a8a3a" strokeWidth="3" fill="none" opacity="0.8" />
      {[-40, -26, -12, 2, 16, 30, 42].map((dx, i) => (
        <path key={i} d={`M${150 + dx} ${90 + Math.abs(dx) * 0.14} l${i % 2 ? 5 : -5} -7`} stroke="#6a8a3a" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.8" />
      ))}
    </svg>
  );
}
