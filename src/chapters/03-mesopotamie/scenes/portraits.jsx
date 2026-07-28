/* ============================================================
   CHAPITRE 3 — Portraits « gros plan »
   Le roi Mesannepada et le collecteur d'impôt Narâm-Sîn.
   Même cadre que les autres chapitres (halo, buste, cou, visage
   ovale, yeux/nez/bouche animée), avec les codes sumériens :
   grands yeux soulignés, barbe bouclée royale, coiffe d'Ur,
   châle de laine à touffes (kaunakès). Libres de droits.
   ============================================================ */

import { Mouth } from "../../../engine/faces.jsx";

/* MESANNEPADA — roi d'Ur. Longue barbe noire bouclée en rangées,
   coiffe royale à bourrelet, châle de laine à touffes (kaunakès),
   grands yeux soulignés de khôl : l'autorité sumérienne. */
export function PortraitMesannepada() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pMesHalo" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#ffe6b0" stopOpacity="0.5" /><stop offset="60%" stopColor="#f0c890" stopOpacity="0.16" /><stop offset="100%" stopColor="#f0c890" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pMesSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#cf9f6f" /><stop offset="55%" stopColor="#bd8f61" /><stop offset="100%" stopColor="#9e7248" /></linearGradient>
        <linearGradient id="pMesWool" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e6dcc4" /><stop offset="100%" stopColor="#c4b493" /></linearGradient>
        <linearGradient id="pMesCap" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a67c46" /><stop offset="100%" stopColor="#75552e" /></linearGradient>
        <linearGradient id="pMesGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f2cf6a" /><stop offset="100%" stopColor="#c89a2a" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pMesHalo)" />

      {/* LE CHÂLE de laine à touffes (kaunakès) sur les épaules */}
      <path d="M38 340 Q40 254 92 232 Q122 220 150 222 Q178 220 208 232 Q260 254 262 340 Z" fill="url(#pMesWool)" />
      {/* les rangées de touffes de laine */}
      <g fill="none" stroke="#b0a077" strokeWidth="2" opacity="0.7">
        {[250, 274, 298, 322].map((y, r) => (
          <path key={r} d={`M60 ${y} q10 10 20 0 q10 10 20 0 q10 10 20 0 q10 10 20 0 q10 10 20 0 q10 10 20 0 q10 10 20 0 q10 10 20 0 q10 10 20 0`} />
        ))}
      </g>
      {/* liseré d'or au col */}
      <path d="M110 250 Q150 288 190 250" stroke="url(#pMesGold)" strokeWidth="7" fill="none" />
      <circle cx="150" cy="272" r="7" fill="url(#pMesGold)" stroke="#a8842a" strokeWidth="1.2" />

      {/* LE COU */}
      <path d="M134 190 L166 190 L169 240 Q150 248 131 240 Z" fill="url(#pMesSkin)" />

      {/* LE VISAGE : noble, allongé */}
      <path d="M150 64 C181 64 195 90 196 120 C197 148 190 174 175 190 C166 199 158 202 150 202 C142 202 134 199 125 190 C110 174 103 148 104 120 C105 90 119 64 150 64 Z" fill="url(#pMesSkin)" />
      <path d="M110 114 Q106 148 123 176" stroke="#ffe6b0" strokeWidth="5" fill="none" opacity="0.35" strokeLinecap="round" />
      <ellipse cx="105" cy="140" rx="7" ry="11" fill="#bd8f61" /><ellipse cx="195" cy="140" rx="7" ry="11" fill="#bd8f61" />

      {/* SOURCILS épais qui se rejoignent (code sumérien) + GRANDS YEUX au khôl */}
      <path d="M116 124 Q135 116 150 122 Q165 116 184 124" stroke="#2e2014" strokeWidth="4.2" fill="none" strokeLinecap="round" />
      <path d="M117 138 Q130 130 143 137 Q130 146 117 138 Z" fill="#f8efdd" />
      <path d="M157 137 Q170 130 183 138 Q170 146 157 138 Z" fill="#f8efdd" />
      <circle cx="130" cy="138" r="5" fill="#2e1d10" /><circle cx="170" cy="138" r="5" fill="#2e1d10" />
      <circle cx="131.6" cy="136.2" r="1.5" fill="#fff" /><circle cx="171.6" cy="136.2" r="1.5" fill="#fff" />
      {/* trait de khôl allongé vers les tempes */}
      <path d="M116 138 Q130 129 144 136 M156 136 Q170 129 184 138" stroke="#2a1c12" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M116 138 l-7 -1 M184 138 l7 -1" stroke="#2a1c12" strokeWidth="2.2" strokeLinecap="round" />

      {/* NEZ discret, sans trait sur l'arête */}
      <path d="M145 158 Q150 162 155 158 M145 158 Q143 153 147 151 M155 158 Q157 153 153 151" stroke="#96684a" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* LA GRANDE BARBE bouclée en rangées (code royal mésopotamien) */}
      <path d="M110 150 Q106 196 120 224 Q135 246 150 248 Q165 246 180 224 Q194 196 190 150 Q170 172 150 174 Q130 172 110 150 Z" fill="#2e2013" />
      {/* rangées de boucles */}
      <g fill="none" stroke="#1e150c" strokeWidth="1.8" opacity="0.6">
        {[168, 184, 200, 216].map((y, r) => (
          <path key={r} d={`M120 ${y} q7 7 14 0 q7 7 14 0 q7 7 14 0 q7 7 14 0`} />
        ))}
      </g>
      <path d="M150 176 L150 244" stroke="#1e150c" strokeWidth="1.4" opacity="0.4" />
      {/* la bouche, par-dessus la barbe */}
      <Mouth y={168} dark="#5a3524" light="#a8785a" w={13} />

      {/* LA COIFFE ROYALE à bourrelet (le « bonnet d'Ur ») */}
      <path d="M100 122 Q94 74 150 68 Q206 74 200 122 Q190 100 172 92 Q158 88 150 88 Q142 88 128 92 Q110 100 100 122 Z" fill="url(#pMesCap)" />
      <path d="M96 116 Q150 92 204 116 Q204 104 150 100 Q96 104 96 116 Z" fill="#8a6636" />
      <path d="M96 116 Q150 92 204 116" stroke="#5a3f22" strokeWidth="2" fill="none" opacity="0.6" />
      {/* touffes du bourrelet + bande d'or */}
      <g fill="none" stroke="#5a3f22" strokeWidth="1.6" opacity="0.6"><path d="M104 112 q8 6 16 0 q8 6 16 0 q8 6 16 0 q8 6 16 0 q8 6 16 0 q8 6 16 0" /></g>
      <path d="M108 84 Q150 70 192 84" stroke="url(#pMesGold)" strokeWidth="4" fill="none" opacity="0.9" />
    </svg>
  );
}

/* NARÂM-SÎN — le collecteur d'impôt. Crâne rasé de scribe, visage
   rasé et soucieux, une tablette d'argile et un calame en main,
   tunique de lin : l'homme qui doit tout compter, et n'y arrive plus. */
export function PortraitNaram() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pNarHalo" cx="50%" cy="40%" r="62%">
          <stop offset="0%" stopColor="#fdeccb" stopOpacity="0.5" /><stop offset="60%" stopColor="#e6d6b6" stopOpacity="0.15" /><stop offset="100%" stopColor="#e6d6b6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pNarSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#c99a6c" /><stop offset="55%" stopColor="#b78a5e" /><stop offset="100%" stopColor="#9c704a" /></linearGradient>
        <linearGradient id="pNarLin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e8e0d0" /><stop offset="100%" stopColor="#cabfa4" /></linearGradient>
        <linearGradient id="pNarClay" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c9a878" /><stop offset="100%" stopColor="#9a7648" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pNarHalo)" />

      {/* LE BUSTE : tunique de lin, drapé sobre */}
      <path d="M42 340 Q44 256 92 234 Q122 222 150 224 Q178 222 208 234 Q256 256 258 340 Z" fill="#e6ddcc" />
      <path d="M96 248 Q150 228 204 248" stroke="#b0a488" strokeWidth="3" fill="none" opacity="0.6" />
      <path d="M110 246 Q140 300 150 340 M190 246 Q160 300 150 340" stroke="#b0a488" strokeWidth="2.6" fill="none" opacity="0.5" />

      {/* LA TABLETTE d'argile + le calame, tenus contre la poitrine */}
      <g transform="translate(96,286) rotate(-10)">
        <rect x="-26" y="-20" width="52" height="42" rx="5" fill="url(#pNarClay)" stroke="#7a5636" strokeWidth="1.4" />
        <g stroke="#5c3f22" strokeWidth="1.3" opacity="0.8">
          <path d="M-18 -12 l5 2.5 M-11 -12 l5 2.5 M-4 -12 l5 2.5 M-18 -4 l5 2.5 M-11 -4 l5 2.5 M-18 4 l5 2.5 M-11 4 l5 2.5 M-4 4 l5 2.5" />
        </g>
      </g>
      {/* la main gauche qui tient la tablette */}
      <path d="M120 250 q-14 12 -20 26" stroke="url(#pNarSkin)" strokeWidth="9" fill="none" strokeLinecap="round" />
      {/* le calame, dans l'autre main */}
      <g transform="translate(196,268) rotate(28)"><rect x="-2" y="-26" width="4" height="46" rx="2" fill="#c9a86a" /><path d="M-2 -26 l4 0 l-2 -5 Z" fill="#8a6e34" /></g>
      <path d="M182 252 q10 6 14 16" stroke="url(#pNarSkin)" strokeWidth="9" fill="none" strokeLinecap="round" />

      {/* LE COU */}
      <path d="M135 190 L165 190 L168 236 Q150 244 132 236 Z" fill="url(#pNarSkin)" />

      {/* LE VISAGE : rasé, un peu tendu */}
      <path d="M150 64 C186 64 200 92 199 126 C198 160 182 190 150 196 C118 190 102 160 101 126 C100 92 114 64 150 64 Z" fill="url(#pNarSkin)" />
      <path d="M108 116 Q104 148 121 174" stroke="#fdeccb" strokeWidth="5" fill="none" opacity="0.4" strokeLinecap="round" />
      <ellipse cx="103" cy="138" rx="6.5" ry="10" fill="#b78a5e" /><ellipse cx="197" cy="138" rx="6.5" ry="10" fill="#b78a5e" />

      {/* SOURCILS légèrement froncés (soucieux) + GRANDS YEUX au khôl */}
      <path d="M118 126 Q130 120 143 127" stroke="#3a2a18" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path d="M157 127 Q170 120 182 126" stroke="#3a2a18" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path d="M120 138 Q130 131 141 137 Q130 145 120 138 Z" fill="#f8efdd" />
      <path d="M159 137 Q170 131 180 138 Q170 145 159 137 Z" fill="#f8efdd" />
      <circle cx="130" cy="138" r="4.6" fill="#2e1d10" /><circle cx="170" cy="138" r="4.6" fill="#2e1d10" />
      <circle cx="131.4" cy="136.3" r="1.4" fill="#fff" /><circle cx="171.4" cy="136.3" r="1.4" fill="#fff" />
      <path d="M119 138 Q130 130 142 137 M158 137 Q170 130 181 138" stroke="#2a1c12" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {/* petit pli du front, le souci du compte */}
      <path d="M144 116 l2 10 M156 116 l-2 10" stroke="#9c704a" strokeWidth="1.5" fill="none" opacity="0.5" />

      {/* NEZ discret, sans trait sur l'arête */}
      <path d="M145 158 Q150 162 155 158 M145 158 Q143 153 147 151 M155 158 Q157 153 153 151" stroke="#9c704a" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* la bouche qui parle */}
      <Mouth y={178} dark="#7a4630" light="#a06a4e" w={13} />

      {/* CRÂNE RASÉ de scribe (peau nue, léger reflet) */}
      <path d="M101 126 Q98 66 150 60 Q202 66 199 126 Q188 96 168 86 Q158 82 150 82 Q142 82 132 86 Q112 96 101 126 Z" fill="url(#pNarSkin)" />
      <path d="M118 82 Q150 70 182 82" stroke="#e8d6b8" strokeWidth="3" fill="none" opacity="0.35" strokeLinecap="round" />
    </svg>
  );
}

/* SNÉFROU — pharaon d'Égypte. Coiffe némès rayée bleu-or, cobra
   uraeus au front, barbe postiche tressée, large collier ousekh :
   le fils du Soleil qui veut son nom pour l'éternité. */
export function PortraitSnefrou() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pSneHalo" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#ffe6b0" stopOpacity="0.5" /><stop offset="60%" stopColor="#f0c890" stopOpacity="0.16" /><stop offset="100%" stopColor="#f0c890" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pSneSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#d29a5e" /><stop offset="55%" stopColor="#c08a4e" /><stop offset="100%" stopColor="#9e6c38" /></linearGradient>
        <linearGradient id="pSneGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f2cf6a" /><stop offset="100%" stopColor="#c89a2a" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pSneHalo)" />

      {/* les PANS du némès (rayés bleu/or) qui tombent sur la poitrine */}
      {[-1, 1].map((s) => (
        <g key={s} transform={`translate(${150 + s * 66},0)`}>
          <path d={`M${-22 * s} 128 L${26 * s} 128 L${20 * s} 300 L${-16 * s} 300 Z`} fill="#e8c04a" />
          {[140, 156, 172, 188, 204, 220, 236, 252, 268, 284].map((y, i) => (
            <path key={i} d={`M${-22 * s + s * (y - 128) * 0.03} ${y} L${26 * s - s * (y - 128) * 0.03} ${y}`} stroke={i % 2 ? "#2f6a9a" : "#b8902a"} strokeWidth="6" opacity="0.9" />
          ))}
        </g>
      ))}

      {/* LE COLLIER OUSEKH large (rangées de perles) sur les épaules */}
      <path d="M40 340 Q42 250 92 236 Q122 224 150 226 Q178 224 208 236 Q258 250 260 340 Z" fill="#e8c04a" />
      <g fill="none" strokeLinecap="round">
        <path d="M96 252 Q150 292 204 252" stroke="#2f6a9a" strokeWidth="7" opacity="0.85" />
        <path d="M92 268 Q150 314 208 268" stroke="#c8382e" strokeWidth="6" opacity="0.8" />
        <path d="M88 284 Q150 334 212 284" stroke="#3a8a6a" strokeWidth="6" opacity="0.8" />
      </g>
      {[110, 128, 146, 164, 182, 200].map((x, i) => <path key={i} d={`M${x} 244 L${x} 250`} stroke="#8a6a1a" strokeWidth="2" />)}

      {/* LE COU */}
      <path d="M134 196 L166 196 L169 240 Q150 248 131 240 Z" fill="url(#pSneSkin)" />

      {/* LE VISAGE : jeune, régulier */}
      <path d="M150 70 C184 70 198 96 197 128 C196 160 182 190 150 198 C118 190 104 160 103 128 C102 96 116 70 150 70 Z" fill="url(#pSneSkin)" />
      <path d="M110 118 Q106 150 123 178" stroke="#ffe6b0" strokeWidth="5" fill="none" opacity="0.35" strokeLinecap="round" />
      <ellipse cx="106" cy="142" rx="6.5" ry="10" fill="#c08a4e" /><ellipse cx="194" cy="142" rx="6.5" ry="10" fill="#c08a4e" />

      {/* SOURCILS + GRANDS YEUX au khôl allongé (code égyptien) */}
      <path d="M116 128 Q130 121 144 128" stroke="#241812" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M156 128 Q170 121 184 128" stroke="#241812" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M117 140 Q130 133 143 139 Q130 147 117 140 Z" fill="#f8efdd" />
      <path d="M157 139 Q170 133 183 140 Q170 147 157 139 Z" fill="#f8efdd" />
      <circle cx="130" cy="140" r="4.8" fill="#241812" /><circle cx="170" cy="140" r="4.8" fill="#241812" />
      <circle cx="131.5" cy="138.2" r="1.5" fill="#fff" /><circle cx="171.5" cy="138.2" r="1.5" fill="#fff" />
      <path d="M116 140 Q130 132 144 139 M156 139 Q170 132 184 140" stroke="#1c1410" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      {/* trait de khôl prolongé vers les tempes */}
      <path d="M116 140 l-9 -1 M184 140 l9 -1" stroke="#1c1410" strokeWidth="2.4" strokeLinecap="round" />

      {/* NEZ discret, sans trait sur l'arête */}
      <path d="M145 160 Q150 164 155 160 M145 160 Q143 155 147 153 M155 160 Q157 155 153 153" stroke="#9e6c38" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* la bouche qui parle */}
      <Mouth y={178} dark="#8a4a34" light="#c08a5a" w={13} />

      {/* la BARBE POSTICHE tressée (code royal), droite sous le menton */}
      <g transform="translate(150,196)">
        <path d="M-8 0 L8 0 L6 44 Q0 52 -6 44 Z" fill="#2e2013" />
        <path d="M-6 8 h12 M-6 18 h12 M-6 28 h12 M-6 38 h11" stroke="#1e150c" strokeWidth="1.6" opacity="0.6" />
      </g>

      {/* LE NÉMÈS sur le crâne (calotte or + rayures bleues) + bandeau */}
      <path d="M99 126 Q92 60 150 56 Q208 60 201 126 Q200 98 150 94 Q100 98 99 126 Z" fill="#e8c04a" />
      {[-40, -26, -12, 2, 16, 30].map((dx, i) => (
        <path key={i} d={`M${150 + dx} 96 Q${150 + dx * 0.7} 74 ${150 + dx * 0.5} 60`} stroke="#2f6a9a" strokeWidth="5" fill="none" opacity="0.85" />
      ))}
      <path d="M96 122 Q150 100 204 122 L204 132 Q150 110 96 132 Z" fill="url(#pSneGold)" />
      <path d="M96 122 Q150 100 204 122" stroke="#8a6a1a" strokeWidth="1.6" fill="none" opacity="0.6" />
      {/* le CObra URAEUS dressé au front */}
      <g transform="translate(150,110)">
        <path d="M0 8 Q-7 2 -5 -8 Q-2 -16 3 -14 Q0 -6 2 2 Z" fill="url(#pSneGold)" stroke="#8a6a1a" strokeWidth="1" />
        <path d="M3 -14 q6 -3 9 1 q-5 1 -7 4 q1 -3 -2 -5 Z" fill="#3a8a6a" />
        <circle cx="1" cy="-10" r="1.3" fill="#c8382e" />
      </g>
    </svg>
  );
}
