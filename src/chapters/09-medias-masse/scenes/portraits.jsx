/* ============================================================
   CHAPITRE 9 — Portraits gros plan
   Nathalie 12 ans (1969, chemise de nuit), Julien 15 ans (1985,
   T-shirt de groupe et walkman autour du cou), Céline 25 ans
   (1990, tailleur épaulettes, coupe carrée).
   ============================================================ */

import { Mouth } from "../../../engine/faces.jsx";

export function PortraitNathalie() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pNaHalo" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#e0d0c8" stopOpacity="0.4" /><stop offset="100%" stopColor="#2a2418" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pNaSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#f4d8b8" /><stop offset="100%" stopColor="#e0b088" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pNaHalo)" />

      {/* chemise de nuit en flanelle rose à motifs (elle a été réveillée à 3h du mat) */}
      <path d="M40 340 Q46 240 100 224 Q126 216 150 218 Q174 216 200 224 Q254 240 260 340 Z" fill="#d89aa8" />
      {/* petits nœuds papillon sur la chemise */}
      {[[110, 260], [150, 268], [190, 260]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <path d="M-4 -3 L4 3 L4 -3 L-4 3 Z" fill="#b06a80" />
          <circle r="1.4" fill="#8a4060" />
        </g>
      ))}
      {/* col carré chemise de nuit */}
      <path d="M136 226 L164 226 L162 250 L138 250 Z" fill="#efc8d0" stroke="#a86a80" strokeWidth="1" />

      {/* cou */}
      <path d="M138 190 L162 190 L164 226 Q150 234 136 226 Z" fill="url(#pNaSkin)" />

      {/* visage petit et rond (enfant) */}
      <path d="M150 92 C176 92 187 116 187 142 C187 168 172 190 150 192 C128 190 113 168 113 142 C113 116 124 92 150 92 Z" fill="url(#pNaSkin)" />
      <ellipse cx="115" cy="144" rx="6" ry="8" fill="#e8b898" />
      <ellipse cx="185" cy="144" rx="6" ry="8" fill="#e8b898" />

      {/* CHEVEUX bruns au carré avec frange droite (typique fin années 60) */}
      <path d="M108 108 Q118 76 150 76 Q186 76 194 108 Q206 112 194 128 Q192 96 150 96 Q108 96 106 128 Q102 112 108 108 Z" fill="#5a3018" />
      {/* frange */}
      <path d="M118 108 Q150 100 184 108 Q182 120 150 118 Q118 120 118 108 Z" fill="#4a2612" />
      {/* barrette rose sur le côté */}
      <path d="M172 100 L192 96 L192 100 L172 104 Z" fill="#e8506a" stroke="#a03050" strokeWidth="1" />

      {/* SOURCILS bruns fins */}
      <path d="M126 128 Q134 124 144 128" stroke="#3a1e10" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M156 128 Q166 124 174 128" stroke="#3a1e10" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* yeux ronds noisette (émerveillée) */}
      <path d="M126 140 Q135 135 144 140 Q135 146 126 140 Z" fill="#f8efdd" />
      <path d="M156 140 Q165 135 174 140 Q165 146 156 140 Z" fill="#f8efdd" />
      <circle cx="135" cy="140" r="4" fill="#5a3818" />
      <circle cx="165" cy="140" r="4" fill="#5a3818" />
      <circle cx="136" cy="138.5" r="1.3" fill="#fff" />
      <circle cx="166" cy="138.5" r="1.3" fill="#fff" />
      <path d="M126 136 Q135 132 144 136" stroke="#3a1e10" strokeWidth="1.2" fill="none" />
      <path d="M156 136 Q165 132 174 136" stroke="#3a1e10" strokeWidth="1.2" fill="none" />

      {/* NEZ en trompette (enfance) */}
      <path d="M147 156 Q150 162 153 156 M148 154 Q146 148 149 146 M152 154 Q154 148 151 146" stroke="#c8a080" strokeWidth="1.6" fill="none" strokeLinecap="round" />

      {/* BOUCHE — grand sourire (émerveillement) */}
      <path d="M138 176 Q150 186 162 176 Q150 182 138 176 Z" fill="#c04858" />
      <path d="M138 176 Q150 178 162 176" stroke="#fff" strokeWidth="1.4" fill="none" />
      <Mouth cx={150} cy={180} />
    </svg>
  );
}

export function PortraitJulien() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pJuHalo" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#c8d0e0" stopOpacity="0.35" /><stop offset="100%" stopColor="#241a2a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pJuSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#f0c8a0" /><stop offset="100%" stopColor="#c89070" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pJuHalo)" />

      {/* T-shirt noir de groupe rock + veste en jean */}
      <path d="M40 340 Q48 244 100 228 Q126 220 150 222 Q174 220 200 228 Q252 244 260 340 Z" fill="#3a5680" />
      {/* T-shirt noir */}
      <path d="M96 232 L150 268 L204 232 L212 340 L88 340 Z" fill="#1a1a1a" />
      {/* logo/texte du groupe imprimé */}
      <text x="150" y="290" textAnchor="middle" fontFamily="ui-monospace,monospace" fontWeight="800" fontSize="14" fill="#e8506a" style={{ letterSpacing: "2px" }}>ROCK</text>
      <path d="M120 300 h60" stroke="#8a2030" strokeWidth="1" opacity="0.8" />

      {/* écouteurs de walkman autour du cou (câble rouge coquette) */}
      <path d="M115 220 Q150 236 185 220" fill="none" stroke="#e83820" strokeWidth="2" />
      <circle cx="115" cy="220" r="8" fill="#3a3a3a" stroke="#1a1a1a" strokeWidth="1" />
      <circle cx="185" cy="220" r="8" fill="#3a3a3a" stroke="#1a1a1a" strokeWidth="1" />
      <circle cx="115" cy="220" r="4" fill="#f8b800" />
      <circle cx="185" cy="220" r="4" fill="#f8b800" />

      {/* cou */}
      <path d="M138 190 L162 190 L164 226 Q150 234 136 226 Z" fill="url(#pJuSkin)" />

      {/* visage jeune homme */}
      <path d="M150 88 C179 88 191 112 190 140 C189 168 173 190 150 192 C127 190 111 168 110 140 C109 112 121 88 150 88 Z" fill="url(#pJuSkin)" />
      <ellipse cx="112" cy="142" rx="6" ry="9" fill="#dfa878" />
      <ellipse cx="188" cy="142" rx="6" ry="9" fill="#dfa878" />

      {/* CHEVEUX bruns coupe mulet fin années 80 (court devant, long derrière) */}
      <path d="M108 108 Q120 70 150 68 Q182 66 196 108 Q210 130 194 156 Q198 118 150 92 Q104 118 108 108 Z" fill="#3a2010" />
      {/* mèche sur le front */}
      <path d="M130 92 Q150 102 172 96 Q158 110 150 108 Q142 110 130 92 Z" fill="#2a1608" />

      {/* SOURCILS bruns épais */}
      <path d="M124 126 Q134 122 145 126" stroke="#2a1608" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <path d="M155 126 Q166 122 176 126" stroke="#2a1608" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      {/* yeux verts */}
      <path d="M126 138 Q135 133 144 138 Q135 144 126 138 Z" fill="#f8efdd" />
      <path d="M156 138 Q165 133 174 138 Q165 144 156 138 Z" fill="#f8efdd" />
      <circle cx="135" cy="138" r="3.6" fill="#4a7a48" />
      <circle cx="165" cy="138" r="3.6" fill="#4a7a48" />
      <circle cx="136" cy="136.8" r="1.1" fill="#fff" />
      <circle cx="166" cy="136.8" r="1.1" fill="#fff" />

      {/* NEZ */}
      <path d="M146 156 Q150 164 154 156 M146 154 Q144 146 148 144 M154 154 Q156 146 152 144" stroke="#c89070" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* petite pilosité duvet */}
      <path d="M140 172 q10 -2 20 0" stroke="#3a2010" strokeWidth="0.8" fill="none" opacity="0.6" />

      {/* BOUCHE — sourire décontracté */}
      <Mouth cx={150} cy={182} />
    </svg>
  );
}

export function PortraitCeline() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pCeHalo" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#f0d0c8" stopOpacity="0.35" /><stop offset="100%" stopColor="#2a1a18" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pCeSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#f4d8b8" /><stop offset="100%" stopColor="#d0a080" /></linearGradient>
        <linearGradient id="pCeSuit" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5a2030" /><stop offset="100%" stopColor="#3a1420" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pCeHalo)" />

      {/* tailleur bordeaux avec ÉPAULETTES très marquées années 90 */}
      <path d="M30 340 Q40 244 100 228 Q126 220 150 222 Q174 220 200 228 Q260 244 270 340 Z" fill="url(#pCeSuit)" />
      {/* renforts épaulettes en carré */}
      <path d="M60 240 L100 228 L112 250 L74 262 Z" fill="#4a1826" />
      <path d="M240 240 L200 228 L188 250 L226 262 Z" fill="#4a1826" />
      {/* blouse chemisier crème */}
      <path d="M108 232 L150 264 L192 232 L188 280 L112 280 Z" fill="#f0e0d0" />
      {/* nœud lavallière */}
      <path d="M138 236 L162 236 L156 260 L150 254 L144 260 Z" fill="#c02830" />

      {/* cou */}
      <path d="M138 190 L162 190 L164 226 Q150 234 136 226 Z" fill="url(#pCeSkin)" />

      {/* visage */}
      <path d="M150 88 C179 88 191 112 190 140 C189 168 173 190 150 192 C127 190 111 168 110 140 C109 112 121 88 150 88 Z" fill="url(#pCeSkin)" />
      <ellipse cx="112" cy="142" rx="6" ry="9" fill="#dfa888" />
      <ellipse cx="188" cy="142" rx="6" ry="9" fill="#dfa888" />

      {/* CHEVEUX coupe carrée volumineuse années 90, blonds vénitiens */}
      <path d="M100 108 Q108 68 150 66 Q192 68 202 108 Q212 156 204 196 Q216 130 192 92 Q170 76 150 78 Q130 76 108 92 Q84 130 96 196 Q88 156 100 108 Z" fill="#c89060" />
      {/* frange décalée */}
      <path d="M118 96 Q150 108 178 100 Q168 116 150 116 Q132 116 118 96 Z" fill="#a87040" />

      {/* boucles d'oreilles perles */}
      <circle cx="108" cy="164" r="3" fill="#f0e0c8" stroke="#a88060" strokeWidth="0.6" />
      <circle cx="192" cy="164" r="3" fill="#f0e0c8" stroke="#a88060" strokeWidth="0.6" />

      {/* SOURCILS bruns arqués (années 90 fines) */}
      <path d="M126 124 Q134 120 145 124" stroke="#5a3818" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M155 124 Q166 120 174 124" stroke="#5a3818" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* yeux bleu-vert avec maquillage discret */}
      <path d="M120 132 h20 M160 132 h20" stroke="#3a2020" strokeWidth="0.6" opacity="0.5" />
      <path d="M126 138 Q135 133 144 138 Q135 144 126 138 Z" fill="#f8efdd" />
      <path d="M156 138 Q165 133 174 138 Q165 144 156 138 Z" fill="#f8efdd" />
      <circle cx="135" cy="138" r="3.6" fill="#3a6a80" />
      <circle cx="165" cy="138" r="3.6" fill="#3a6a80" />
      <circle cx="136" cy="136.8" r="1.1" fill="#fff" />
      <circle cx="166" cy="136.8" r="1.1" fill="#fff" />

      {/* NEZ fin */}
      <path d="M146 154 Q150 162 154 154 M147 152 Q145 145 148 143 M153 152 Q155 145 152 143" stroke="#c89070" strokeWidth="1.6" fill="none" strokeLinecap="round" />

      {/* BOUCHE bordeaux — rouge à lèvres années 90 */}
      <path d="M138 176 Q150 173 162 176 Q150 184 138 176 Z" fill="#7a1020" />
      <path d="M140 176 Q150 174 160 176" stroke="#a02030" strokeWidth="0.6" fill="none" />
      <Mouth cx={150} cy={180} />
    </svg>
  );
}
