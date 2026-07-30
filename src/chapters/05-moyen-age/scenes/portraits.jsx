/* ============================================================
   CHAPITRE 5 — Portraits « gros plan »
   Charles Bannister (seigneur), le frère Jorge (moine copiste) et
   Johannes Gutenberg (imprimeur de Mayence).
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

/* JOHANNES GUTENBERG — imprimeur de Mayence. Bonnet souple, robe
   d'artisan-bourgeois à col de fourrure, longue barbe grisonnante. */
export function PortraitGutenberg() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pGuHalo" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#ffe6b0" stopOpacity="0.45" /><stop offset="60%" stopColor="#e8cfa0" stopOpacity="0.14" /><stop offset="100%" stopColor="#e8cfa0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pGuSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#d6a678" /><stop offset="55%" stopColor="#c69668" /><stop offset="100%" stopColor="#a67648" /></linearGradient>
        <linearGradient id="pGuRobe" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3a5248" /><stop offset="100%" stopColor="#243a32" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pGuHalo)" />

      {/* robe d'artisan-bourgeois + large col de fourrure brune */}
      <path d="M34 340 Q38 248 92 230 Q122 218 150 220 Q178 218 208 230 Q262 248 266 340 Z" fill="url(#pGuRobe)" />
      {/* col de fourrure (deux pans qui descendent) */}
      <path d="M150 232 Q120 236 96 250 Q84 300 92 340 L128 340 Q126 292 150 268 Z" fill="#6a5238" />
      <path d="M150 232 Q180 236 204 250 Q216 300 208 340 L172 340 Q174 292 150 268 Z" fill="#6a5238" />
      {/* moucheté de la fourrure */}
      {[[104, 288], [116, 316], [186, 288], [196, 314], [110, 262], [190, 262]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} q3 6 6 0`} stroke="#3a2c1e" strokeWidth="2" fill="none" />
      ))}

      {/* LE COU */}
      <path d="M134 194 L166 194 L169 242 Q150 250 131 242 Z" fill="url(#pGuSkin)" />

      {/* LE VISAGE : mûr, front dégarni, pommettes marquées */}
      <path d="M150 66 C188 66 203 94 201 130 C199 166 183 198 150 204 C117 198 101 166 99 130 C97 94 112 66 150 66 Z" fill="url(#pGuSkin)" />
      <path d="M104 118 Q100 152 118 180" stroke="#ffe6b0" strokeWidth="5" fill="none" opacity="0.32" strokeLinecap="round" />
      <ellipse cx="99" cy="142" rx="7" ry="10" fill="#c69668" /><ellipse cx="201" cy="142" rx="7" ry="10" fill="#c69668" />
      {/* rides du front */}
      <path d="M124 96 q26 -7 52 0 M120 106 q30 -6 60 0" stroke="#a67648" strokeWidth="1.6" fill="none" opacity="0.4" />

      {/* SOURCILS broussailleux + YEUX attentifs */}
      <path d="M116 126 Q129 119 143 127" stroke="#7a6a54" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M157 127 Q171 119 184 126" stroke="#7a6a54" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M118 138 Q129 132 141 138 Q130 145 118 138 Z" fill="#f8efdd" />
      <path d="M159 138 Q171 132 182 138 Q170 145 159 138 Z" fill="#f8efdd" />
      <circle cx="130" cy="138" r="4.2" fill="#4a3320" /><circle cx="170" cy="138" r="4.2" fill="#4a3320" />
      <circle cx="131.4" cy="136.4" r="1.3" fill="#fff" /><circle cx="171.4" cy="136.4" r="1.3" fill="#fff" />
      <path d="M117 137 Q129 131 142 137 M158 137 Q171 131 183 137" stroke="#5a4633" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* NEZ discret */}
      <path d="M145 158 Q150 162 155 158 M145 158 Q143 151 147 149 M155 158 Q157 151 153 149" stroke="#a67648" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* moustache + LONGUE BARBE grisonnante, légèrement fourchue */}
      <path d="M126 168 q24 -8 48 0" stroke="#8a7c66" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M108 158 Q104 210 128 240 Q140 252 150 250 Q160 252 172 240 Q196 210 192 158 Q176 184 150 186 Q124 184 108 158 Z" fill="#b6ab96" />
      <path d="M150 186 q-3 34 -8 58 M150 186 q3 34 8 58" stroke="#8f846e" strokeWidth="1.6" fill="none" opacity="0.6" />
      <g stroke="#9a8f78" strokeWidth="1.2" fill="none" opacity="0.55"><path d="M122 176 q8 30 26 52 M178 176 q-8 30 -26 52 M136 182 q4 30 14 50 M164 182 q-4 30 -14 50" /></g>
      <Mouth y={172} dark="#7a3a2e" light="#b0785a" w={12} />

      {/* cheveux gris aux tempes (front dégarni) */}
      <path d="M99 132 Q96 172 104 200 L118 194 Q108 162 110 134 Z" fill="#8a7c66" />
      <path d="M201 132 Q204 172 196 200 L182 194 Q192 162 190 134 Z" fill="#8a7c66" />

      {/* LE BONNET souple d'artisan (toque) */}
      <path d="M100 116 Q98 66 150 60 Q202 66 200 116 Q198 92 176 82 Q162 76 150 77 Q138 76 124 82 Q102 92 100 116 Z" fill="#2c3a34" />
      <path d="M100 116 Q150 96 200 116 L200 108 Q150 88 100 108 Z" fill="#20302a" />
      <path d="M150 60 Q168 60 178 70 Q160 66 150 67 Q140 66 122 70 Q132 60 150 60 Z" fill="#3a4a44" />
    </svg>
  );
}

/* LE PAPETIER — artisan du moulin à papier. Coiffe de toile, tablier de
   cuir, manches retroussées, barbe courte, air jovial et robuste. */
export function PortraitPapetier() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pPaHalo" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#e6f0f4" stopOpacity="0.45" /><stop offset="60%" stopColor="#cadce2" stopOpacity="0.14" /><stop offset="100%" stopColor="#cadce2" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pPaSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#dcac7c" /><stop offset="55%" stopColor="#cc9c6c" /><stop offset="100%" stopColor="#ac7c4c" /></linearGradient>
        <linearGradient id="pPaApron" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a5a34" /><stop offset="100%" stopColor="#5a3a1e" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pPaHalo)" />

      {/* chemise de toile écrue, manches retroussées */}
      <path d="M40 340 Q44 250 96 232 Q122 222 150 224 Q178 222 204 232 Q256 250 260 340 Z" fill="#c2b492" />
      <path d="M40 340 Q44 250 96 232 Q122 222 150 224 Q178 222 204 232 Q256 250 260 340 Z" fill="#8a7c5a" opacity="0.2" />
      {/* le tablier de cuir par-dessus */}
      <path d="M108 236 Q150 250 192 236 L204 340 L96 340 Z" fill="url(#pPaApron)" />
      <path d="M108 236 Q150 250 192 236 L204 340 L96 340 Z" fill="none" stroke="#3a2412" strokeWidth="2" opacity="0.5" />
      {/* bavette + bretelles du tablier */}
      <path d="M126 234 L120 210 M174 234 L180 210" stroke="#5a3a1e" strokeWidth="6" strokeLinecap="round" />
      <path d="M124 250 h52 v10 h-52 Z" fill="#6a4424" />
      {/* taches d'humidité du métier */}
      {[[120, 300], [176, 296], [150, 320]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="7" ry="5" fill="#4a2e16" opacity="0.4" />)}

      {/* LE COU */}
      <path d="M134 194 L166 194 L169 242 Q150 250 131 242 Z" fill="url(#pPaSkin)" />

      {/* LE VISAGE : rond, robuste */}
      <path d="M150 66 C189 66 205 94 203 130 C201 166 184 198 150 204 C116 198 99 166 97 130 C95 94 111 66 150 66 Z" fill="url(#pPaSkin)" />
      <path d="M104 118 Q100 152 118 180" stroke="#ffe6b0" strokeWidth="5" fill="none" opacity="0.3" strokeLinecap="round" />
      <ellipse cx="98" cy="142" rx="8" ry="11" fill="#cc9c6c" /><ellipse cx="202" cy="142" rx="8" ry="11" fill="#cc9c6c" />

      {/* SOURCILS + YEUX francs, joviaux */}
      <path d="M116 125 Q129 119 143 126" stroke="#6a4a2e" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path d="M157 126 Q171 119 184 125" stroke="#6a4a2e" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path d="M118 137 Q129 131 141 137 Q130 144 118 137 Z" fill="#f8efdd" />
      <path d="M159 137 Q171 131 182 137 Q170 144 159 137 Z" fill="#f8efdd" />
      <circle cx="130" cy="137" r="4.3" fill="#4a3320" /><circle cx="170" cy="137" r="4.3" fill="#4a3320" />
      <circle cx="131.4" cy="135.5" r="1.3" fill="#fff" /><circle cx="171.4" cy="135.5" r="1.3" fill="#fff" />
      <path d="M117 136 Q129 130 142 136 M158 136 Q171 130 183 136" stroke="#5a4633" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* rides de sourire */}
      <path d="M108 150 q4 8 10 12 M192 150 q-4 8 -10 12" stroke="#ac7c4c" strokeWidth="1.6" fill="none" opacity="0.35" />

      {/* NEZ discret + bouche souriante */}
      <path d="M145 157 Q150 161 155 157 M145 157 Q143 150 147 148 M155 157 Q157 150 153 148" stroke="#ac7c4c" strokeWidth="2" fill="none" strokeLinecap="round" />
      <Mouth y={172} dark="#8a3a2e" light="#c0785a" w={14} smile={1} />

      {/* barbe courte encadrant */}
      <path d="M118 152 Q114 186 138 204 Q150 212 162 204 Q186 186 182 152 Q168 172 150 174 Q132 172 118 152 Z" fill="#7a6a52" />
      <g stroke="#5a4c38" strokeWidth="1.2" fill="none" opacity="0.5"><path d="M128 162 q6 22 22 38 M172 162 q-6 22 -22 38 M150 176 v30" /></g>
      <path d="M130 158 q20 -7 40 0" stroke="#6a5a42" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* cheveux courts + COIFFE de toile (bonnet du papetier) */}
      <path d="M100 128 Q96 92 118 82 Q112 100 116 122 Z" fill="#6a5a44" />
      <path d="M200 128 Q204 92 182 82 Q188 100 184 122 Z" fill="#6a5a44" />
      <path d="M102 112 Q100 66 150 60 Q200 66 198 112 Q196 88 174 80 Q160 75 150 76 Q140 75 126 80 Q104 88 102 112 Z" fill="#eae4d4" />
      <path d="M102 112 Q150 92 198 112 L198 104 Q150 84 102 104 Z" fill="#d8d0bc" />
      <path d="M112 92 q38 -14 76 0" stroke="#c8c0aa" strokeWidth="1.6" fill="none" opacity="0.7" />
    </svg>
  );
}
