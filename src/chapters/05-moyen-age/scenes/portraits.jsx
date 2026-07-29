/* ============================================================
   CHAPITRE 5 — Portraits « gros plan »
   Charles Bannister (seigneur) et le frère Jorge (moine copiste).
   Même cadre que les autres chapitres. Libres de droits.
   ============================================================ */

import { Mouth } from "../../../engine/faces.jsx";

/* CHARLES BANNISTER — seigneur. Cercle d'or (couronne comtale),
   manteau doublé d'hermine, barbe courte, regard fier. */
export function PortraitCharles() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pChHalo" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#ffe6b0" stopOpacity="0.5" /><stop offset="60%" stopColor="#f0c890" stopOpacity="0.16" /><stop offset="100%" stopColor="#f0c890" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pChSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#d8a878" /><stop offset="55%" stopColor="#c89868" /><stop offset="100%" stopColor="#a87848" /></linearGradient>
        <linearGradient id="pChRobe" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7a2a34" /><stop offset="100%" stopColor="#521c24" /></linearGradient>
        <linearGradient id="pChGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f2cf6a" /><stop offset="100%" stopColor="#c89a2a" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pChHalo)" />

      {/* le manteau seigneurial + col d'hermine (blanc moucheté de noir) */}
      <path d="M38 340 Q40 250 92 232 Q122 220 150 222 Q178 220 208 232 Q260 250 262 340 Z" fill="url(#pChRobe)" />
      <path d="M70 250 Q150 300 230 250 L222 292 Q150 336 78 292 Z" fill="#efe9dc" />
      {[[110, 276], [135, 288], [160, 290], [185, 284], [95, 262], [205, 264]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} l3 6 l3 -6 l-3 4 Z`} fill="#2a2018" />
      ))}
      {/* fermail d'or au col */}
      <circle cx="150" cy="256" r="9" fill="url(#pChGold)" stroke="#a8842a" strokeWidth="1.4" /><circle cx="150" cy="256" r="3.2" fill="#8a2a34" />

      {/* LE COU */}
      <path d="M134 192 L166 192 L169 240 Q150 248 131 240 Z" fill="url(#pChSkin)" />

      {/* LE VISAGE : plein, fier */}
      <path d="M150 64 C189 64 205 92 203 128 C201 164 184 196 150 202 C116 196 99 164 97 128 C95 92 111 64 150 64 Z" fill="url(#pChSkin)" />
      <path d="M104 116 Q100 150 118 178" stroke="#ffe6b0" strokeWidth="5" fill="none" opacity="0.35" strokeLinecap="round" />
      <ellipse cx="98" cy="140" rx="7" ry="11" fill="#c89868" /><ellipse cx="202" cy="140" rx="7" ry="11" fill="#c89868" />

      {/* SOURCILS + YEUX fiers */}
      <path d="M116 124 Q129 118 143 125" stroke="#4a3020" strokeWidth="3.6" fill="none" strokeLinecap="round" />
      <path d="M157 125 Q171 118 184 124" stroke="#4a3020" strokeWidth="3.6" fill="none" strokeLinecap="round" />
      <path d="M118 136 Q129 130 141 136 Q130 143 118 136 Z" fill="#f8efdd" />
      <path d="M159 136 Q171 130 182 136 Q170 143 159 136 Z" fill="#f8efdd" />
      <circle cx="130" cy="136" r="4.4" fill="#3a2416" /><circle cx="170" cy="136" r="4.4" fill="#3a2416" />
      <circle cx="131.5" cy="134.4" r="1.4" fill="#fff" /><circle cx="171.5" cy="134.4" r="1.4" fill="#fff" />
      <path d="M117 135 Q129 129 142 135 M158 135 Q171 129 183 135" stroke="#4a3322" strokeWidth="2.4" fill="none" strokeLinecap="round" />

      {/* NEZ discret */}
      <path d="M145 156 Q150 160 155 156 M145 156 Q143 150 147 148 M155 156 Q157 150 153 148" stroke="#a87848" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* la bouche + barbe courte encadrant */}
      <path d="M112 150 Q108 188 138 206 Q150 214 162 206 Q192 188 188 150 Q170 172 150 174 Q130 172 112 150 Z" fill="#5a3f24" />
      <g stroke="#3a2818" strokeWidth="1.3" fill="none" opacity="0.5"><path d="M124 160 q6 24 22 40 M176 160 q-6 24 -22 40 M150 176 v34" /></g>
      <Mouth y={166} dark="#7a3a2e" light="#b0785a" w={13} />
      {/* moustache */}
      <path d="M132 158 q18 -7 36 0" stroke="#4a3020" strokeWidth="3.4" fill="none" strokeLinecap="round" />

      {/* CHEVEUX mi-longs (mode médiévale) */}
      <path d="M96 130 Q92 66 150 60 Q208 66 204 130 Q198 104 178 96 Q164 92 150 93 Q136 92 122 96 Q102 104 96 130 Z" fill="#5a3f24" />
      <path d="M96 128 Q94 168 100 196 L114 190 Q104 156 108 128 Z" fill="#4a3020" />
      <path d="M204 128 Q206 168 200 196 L186 190 Q196 156 192 128 Z" fill="#4a3020" />
      {/* LE CERCLE D'OR (couronne comtale) */}
      <path d="M100 108 Q150 86 200 108 L200 118 Q150 96 100 118 Z" fill="url(#pChGold)" stroke="#a8842a" strokeWidth="1.2" />
      {[124, 150, 176].map((x, i) => <circle key={i} cx={x} cy={i % 2 ? 100 : 98} r="3" fill={i === 1 ? "#8a2a34" : "#2a6a9a"} />)}
    </svg>
  );
}

/* FRÈRE JORGE — moine copiste. Tonsure (crâne rasé cerné de cheveux),
   coule brune, visage serein et savant. */
export function PortraitJorge() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pJoHalo" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#fdeccb" stopOpacity="0.5" /><stop offset="60%" stopColor="#e6d6b6" stopOpacity="0.15" /><stop offset="100%" stopColor="#e6d6b6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pJoSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#d0a072" /><stop offset="55%" stopColor="#bf9066" /><stop offset="100%" stopColor="#a3764e" /></linearGradient>
        <linearGradient id="pJoRobe" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7a5a38" /><stop offset="100%" stopColor="#4e3a22" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pJoHalo)" />

      {/* la COULE (robe à capuchon) brune */}
      <path d="M36 340 Q40 244 92 226 Q122 214 150 216 Q178 214 208 226 Q260 244 264 340 Z" fill="url(#pJoRobe)" />
      {/* le capuchon rabattu dans le dos + l'encolure */}
      <path d="M96 236 Q150 214 204 236 Q150 262 96 236 Z" fill="#3e2e1a" />
      <path d="M110 244 Q150 292 150 340 M190 244 Q150 292 150 340" stroke="#3e2e1a" strokeWidth="3" fill="none" opacity="0.5" />
      {/* corde à la taille (esquissée sous le col) */}
      <path d="M116 254 Q150 268 184 254" stroke="#c8b488" strokeWidth="3" fill="none" opacity="0.7" />

      {/* LE COU */}
      <path d="M135 190 L165 190 L168 236 Q150 244 132 236 Z" fill="url(#pJoSkin)" />

      {/* LE VISAGE : doux, un peu émacié (jeûne + études) */}
      <path d="M150 64 C186 64 200 92 199 126 C198 160 182 190 150 196 C118 190 102 160 101 126 C100 92 114 64 150 64 Z" fill="url(#pJoSkin)" />
      <path d="M108 116 Q104 148 121 174" stroke="#fdeccb" strokeWidth="5" fill="none" opacity="0.4" strokeLinecap="round" />
      <ellipse cx="103" cy="138" rx="6.5" ry="10" fill="#bf9066" /><ellipse cx="197" cy="138" rx="6.5" ry="10" fill="#bf9066" />
      {/* joues creusées */}
      <path d="M116 158 Q120 172 130 178 M184 158 Q180 172 170 178" stroke="#a3764e" strokeWidth="2" fill="none" opacity="0.3" />

      {/* SOURCILS calmes + YEUX doux */}
      <path d="M118 126 Q130 121 143 126" stroke="#4a3a28" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M157 126 Q170 121 182 126" stroke="#4a3a28" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M120 137 Q130 133 140 137 Q130 141 120 137 Z" fill="#faf1de" />
      <path d="M160 137 Q170 133 180 137 Q170 141 160 137 Z" fill="#faf1de" />
      <circle cx="130" cy="137.5" r="3.7" fill="#33200f" /><circle cx="170" cy="137.5" r="3.7" fill="#33200f" />
      <circle cx="131.2" cy="136.2" r="1.1" fill="#fff" /><circle cx="171.2" cy="136.2" r="1.1" fill="#fff" />
      <path d="M119 136 Q130 131 141 136 M159 136 Q170 131 181 136" stroke="#5c4630" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* NEZ discret + bouche sereine */}
      <path d="M145 157 Q150 161 155 157 M145 157 Q143 152 147 150 M155 157 Q157 152 153 150" stroke="#a3764e" strokeWidth="2" fill="none" strokeLinecap="round" />
      <Mouth y={178} dark="#7a4630" light="#a06a4e" w={12} />

      {/* LA TONSURE : crâne rasé au sommet, couronne de cheveux */}
      <path d="M101 126 Q98 66 150 60 Q202 66 199 126 Q188 96 168 86 Q158 82 150 82 Q142 82 132 86 Q112 96 101 126 Z" fill="url(#pJoSkin)" />
      {/* la couronne de cheveux (bruns) autour du crâne rasé */}
      <path d="M99 128 Q97 108 108 100 Q112 118 111 132 Z" fill="#6a5238" />
      <path d="M201 128 Q203 108 192 100 Q188 118 189 132 Z" fill="#6a5238" />
      <path d="M101 128 Q104 150 112 168 L120 162 Q110 146 111 130 Z" fill="#6a5238" />
      <path d="M199 128 Q196 150 188 168 L180 162 Q190 146 189 130 Z" fill="#6a5238" />
      <path d="M108 122 q42 -14 84 0" stroke="#5a4630" strokeWidth="2" fill="none" opacity="0.4" />
    </svg>
  );
}
