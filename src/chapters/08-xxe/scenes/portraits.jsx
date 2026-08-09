/* ============================================================
   CHAPITRE 8 — Portraits « gros plan »
   ------------------------------------------------------------
   Arthur Smith : ingénieur du son à la BBC, Bush House, Londres.
   La quarantaine, cheveux bruns lissés, moustache fine, chemise
   blanche, cravate sombre, casque de studio autour du cou.
   Marthe Dupont : veuve de 14-18, 68 ans, Parisienne, cheveux
   gris en chignon, châle noir, air digne — dure à cuire.
   ============================================================ */

import { Mouth } from "../../../engine/faces.jsx";

export function PortraitArthur() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pArHalo" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#b0c8e0" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#3a4a60" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pArSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#eec8a0" /><stop offset="100%" stopColor="#c8946a" /></linearGradient>
        <linearGradient id="pArShirt" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f0e8d8" /><stop offset="100%" stopColor="#c8bfa8" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pArHalo)" />

      {/* veste sombre + chemise blanche + cravate rayée BBC */}
      <path d="M40 340 Q46 244 100 228 Q126 220 150 222 Q174 220 200 228 Q254 244 260 340 Z" fill="#1a2438" />
      <path d="M100 232 L150 268 L200 232 L214 340 L86 340 Z" fill="url(#pArShirt)" />
      {/* cravate rayée */}
      <path d="M140 234 L160 234 L156 280 L150 340 L144 280 Z" fill="#8a1a1a" />
      <path d="M143 246 L157 246 M144 258 L156 258 M144 270 L156 270 M145 282 L155 282" stroke="#e0a848" strokeWidth="1.2" />
      {/* col de chemise */}
      <path d="M136 228 L150 258 L164 228 L154 224 L150 232 L146 224 Z" fill="#fff" />

      {/* casque de studio autour du cou (headphones) */}
      <path d="M110 220 Q150 200 190 220" fill="none" stroke="#2a2a2a" strokeWidth="4" />
      <ellipse cx="110" cy="222" rx="10" ry="12" fill="#3a3a3a" stroke="#1a1a1a" strokeWidth="1.5" />
      <ellipse cx="190" cy="222" rx="10" ry="12" fill="#3a3a3a" stroke="#1a1a1a" strokeWidth="1.5" />
      <ellipse cx="110" cy="222" rx="6" ry="8" fill="#6a4a30" />
      <ellipse cx="190" cy="222" rx="6" ry="8" fill="#6a4a30" />

      {/* cou */}
      <path d="M137 186 L163 186 L165 226 Q150 234 135 226 Z" fill="url(#pArSkin)" />

      {/* visage ovale */}
      <path d="M150 84 C178 84 190 108 189 138 C188 168 172 190 150 192 C128 190 112 168 111 138 C110 108 122 84 150 84 Z" fill="url(#pArSkin)" />
      {/* ombre latérale */}
      <path d="M116 118 Q112 150 128 176" stroke="#c8946a" strokeWidth="4" fill="none" opacity="0.3" strokeLinecap="round" />
      {/* oreilles */}
      <ellipse cx="112" cy="140" rx="6" ry="9" fill="#e0a878" />
      <ellipse cx="188" cy="140" rx="6" ry="9" fill="#e0a878" />

      {/* CHEVEUX bruns bien peignés en arrière, raie à droite */}
      <path d="M112 108 Q130 78 150 78 Q182 78 194 108 Q198 96 188 84 Q166 62 148 62 Q120 62 108 92 Q104 100 112 108 Z" fill="#3a2418" />
      {/* raie */}
      <path d="M162 78 Q170 88 178 100" stroke="#5a3828" strokeWidth="1.5" fill="none" />

      {/* SOURCILS + YEUX (bruns, sérieux) */}
      <path d="M124 122 Q134 118 145 122" stroke="#2a1a10" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M155 122 Q166 118 176 122" stroke="#2a1a10" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M126 134 Q135 130 144 134 Q135 140 126 134 Z" fill="#f8efdd" />
      <path d="M156 134 Q165 130 174 134 Q165 140 156 134 Z" fill="#f8efdd" />
      <circle cx="135" cy="134" r="3.6" fill="#4a2f1a" />
      <circle cx="165" cy="134" r="3.6" fill="#4a2f1a" />
      <circle cx="136" cy="132.8" r="1.1" fill="#fff" />
      <circle cx="166" cy="132.8" r="1.1" fill="#fff" />

      {/* NEZ */}
      <path d="M146 152 Q150 158 154 152 M146 152 Q144 146 148 144 M154 152 Q156 146 152 144" stroke="#c8946a" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* MOUSTACHE fine (style années 40) */}
      <path d="M140 168 q10 -4 20 0 q-4 -3 -10 -3 q-6 0 -10 3 Z" fill="#3a2418" />

      {/* BOUCHE */}
      <Mouth cx={150} cy={178} />
    </svg>
  );
}

export function PortraitKay() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pKaHalo" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#c8d8e0" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2a3040" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pKaSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#f0d0b0" /><stop offset="100%" stopColor="#c8a080" /></linearGradient>
        <linearGradient id="pKaSuit" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4a6a80" /><stop offset="100%" stopColor="#243848" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pKaHalo)" />

      {/* tailleur bleu-gris + col chemise blanche */}
      <path d="M40 340 Q46 244 100 228 Q126 220 150 222 Q174 220 200 228 Q254 244 260 340 Z" fill="url(#pKaSuit)" />
      <path d="M100 232 L150 268 L200 232 L212 340 L88 340 Z" fill="#efe6d2" />
      {/* revers du tailleur */}
      <path d="M108 234 L150 262 L192 234 L184 254 L150 274 L116 254 Z" fill="url(#pKaSuit)" />
      {/* broche ronde de blouse */}
      <circle cx="150" cy="276" r="3.5" fill="#c8963e" stroke="#8a5a20" strokeWidth="1" />
      {/* col ras-du-cou */}
      <path d="M136 230 L150 254 L164 230 L156 226 L150 234 L144 226 Z" fill="#fff" />

      {/* cou */}
      <path d="M137 190 L163 190 L165 226 Q150 234 135 226 Z" fill="url(#pKaSkin)" />

      {/* visage jeune ovale */}
      <path d="M150 86 C179 86 191 110 190 138 C189 168 173 190 150 192 C127 190 111 168 110 138 C109 110 121 86 150 86 Z" fill="url(#pKaSkin)" />
      <path d="M116 120 Q112 150 128 176" stroke="#c8a080" strokeWidth="4" fill="none" opacity="0.28" strokeLinecap="round" />
      <ellipse cx="112" cy="140" rx="6" ry="9" fill="#dfa878" />
      <ellipse cx="188" cy="140" rx="6" ry="9" fill="#dfa878" />

      {/* CHEVEUX bruns coiffure victory rolls typique des années 40 */}
      <path d="M108 108 Q120 78 150 78 Q192 78 198 106 Q204 96 200 84 Q182 60 148 60 Q116 62 104 92 Q102 100 108 108 Z" fill="#5a3020" />
      {/* rouleaux de côté */}
      <ellipse cx="114" cy="102" rx="14" ry="18" fill="#6a3820" />
      <ellipse cx="186" cy="102" rx="14" ry="18" fill="#6a3820" />
      <ellipse cx="114" cy="102" rx="8" ry="12" fill="#5a3020" opacity="0.6" />
      <ellipse cx="186" cy="102" rx="8" ry="12" fill="#5a3020" opacity="0.6" />
      {/* frange latérale à droite */}
      <path d="M172 92 Q182 100 176 118" stroke="#7a4028" strokeWidth="1.5" fill="none" />

      {/* SOURCILS bruns arqués */}
      <path d="M124 124 Q134 118 145 124" stroke="#3a2010" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M155 124 Q166 118 176 124" stroke="#3a2010" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {/* yeux noisette pétillants */}
      <path d="M126 136 Q135 132 144 136 Q135 142 126 136 Z" fill="#f8efdd" />
      <path d="M156 136 Q165 132 174 136 Q165 142 156 136 Z" fill="#f8efdd" />
      <circle cx="135" cy="136" r="3.6" fill="#5a3818" />
      <circle cx="165" cy="136" r="3.6" fill="#5a3818" />
      <circle cx="136" cy="134.8" r="1.1" fill="#fff" />
      <circle cx="166" cy="134.8" r="1.1" fill="#fff" />
      {/* cils */}
      <path d="M126 133 Q135 128 144 133" stroke="#3a2010" strokeWidth="1.4" fill="none" />
      <path d="M156 133 Q165 128 174 133" stroke="#3a2010" strokeWidth="1.4" fill="none" />

      {/* NEZ fin */}
      <path d="M146 154 Q150 160 154 154 M147 152 Q144 145 148 143 M153 152 Q156 145 152 143" stroke="#c8a080" strokeWidth="1.6" fill="none" strokeLinecap="round" />

      {/* BOUCHE — rouge à lèvres années 40 */}
      <path d="M138 174 Q150 170 162 174 Q150 182 138 174 Z" fill="#a83020" />
      <path d="M140 174 Q150 172 160 174" stroke="#c04030" strokeWidth="0.6" fill="none" />
      <Mouth cx={150} cy={180} />
    </svg>
  );
}

export function PortraitMarchand() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pMcHalo" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#e8c8a0" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#3a2818" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pMcSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#e0b088" /><stop offset="100%" stopColor="#a87860" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pMcHalo)" />

      {/* manteau brun long + écharpe grise */}
      <path d="M40 340 Q46 244 100 228 Q126 220 150 222 Q174 220 200 228 Q254 244 260 340 Z" fill="#5a3820" />
      <path d="M100 232 L150 268 L200 232 L214 340 L86 340 Z" fill="#4a2c18" />
      {/* écharpe en laine grise nouée */}
      <path d="M110 230 Q150 218 190 230 L192 258 Q150 246 108 258 Z" fill="#8a8a8a" />
      <path d="M118 246 Q150 240 182 246" stroke="#6a6a6a" strokeWidth="1.4" fill="none" />
      {/* boutons du manteau */}
      <circle cx="150" cy="278" r="3" fill="#3a2018" />
      <circle cx="150" cy="298" r="3" fill="#3a2018" />

      {/* cou */}
      <path d="M137 190 L163 190 L165 228 Q150 236 135 228 Z" fill="url(#pMcSkin)" />

      {/* visage plus carré */}
      <path d="M150 88 C180 88 192 114 190 142 C188 170 172 190 150 192 C128 190 112 170 110 142 C108 114 120 88 150 88 Z" fill="url(#pMcSkin)" />
      <path d="M116 122 Q112 152 128 178" stroke="#a87860" strokeWidth="4" fill="none" opacity="0.35" strokeLinecap="round" />
      <ellipse cx="112" cy="142" rx="6" ry="9" fill="#c89878" />
      <ellipse cx="188" cy="142" rx="6" ry="9" fill="#c89878" />

      {/* CASQUETTE à visière (gavroche parisien) */}
      <path d="M108 108 Q140 78 168 78 Q192 78 198 100 Q202 96 200 88 Q192 66 160 66 Q120 68 106 92 Q102 100 108 108 Z" fill="#3a2818" />
      {/* visière */}
      <path d="M96 108 Q130 106 202 108 L200 116 Q140 118 96 118 Z" fill="#2a1810" />

      {/* SOURCILS bruns, air rusé */}
      <path d="M124 126 Q134 122 145 126" stroke="#3a2418" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M155 126 Q166 122 176 126" stroke="#3a2418" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      {/* yeux noisette, un peu rétrécis (complice) */}
      <path d="M126 138 Q135 134 144 138 Q135 143 126 138 Z" fill="#f8efdd" />
      <path d="M156 138 Q165 134 174 138 Q165 143 156 138 Z" fill="#f8efdd" />
      <circle cx="135" cy="138" r="3.4" fill="#5a3a1a" />
      <circle cx="165" cy="138" r="3.4" fill="#5a3a1a" />
      <circle cx="136" cy="136.8" r="1" fill="#fff" />
      <circle cx="166" cy="136.8" r="1" fill="#fff" />

      {/* NEZ un peu fort */}
      <path d="M146 156 Q150 164 154 156 M144 156 Q140 148 148 145 M156 156 Q160 148 152 145" stroke="#a87860" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* MOUSTACHE nourrie (marché noir des années 40) */}
      <path d="M132 170 q18 -4 36 0 q-6 -4 -18 -4 q-12 0 -18 4 Z" fill="#3a2418" />
      <path d="M142 170 q8 -2 16 0" stroke="#2a1810" strokeWidth="0.6" fill="none" />

      {/* BOUCHE petite, en coin */}
      <Mouth cx={150} cy={182} />
    </svg>
  );
}

export function PortraitMarthe() {
  return (
    <svg viewBox="0 0 300 340" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="pMaHalo" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#e8d8b0" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#403a2a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pMaSkin" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stopColor="#efd0b0" /><stop offset="100%" stopColor="#c8a080" /></linearGradient>
      </defs>
      <circle cx="150" cy="138" r="130" fill="url(#pMaHalo)" />

      {/* robe noire + châle noir à franges */}
      <path d="M40 340 Q48 250 106 230 Q128 224 150 226 Q172 224 194 230 Q252 250 260 340 Z" fill="#1a1a1a" />
      {/* franges du châle */}
      {[70, 90, 110, 130, 150, 170, 190, 210, 230].map((x, i) => (
        <path key={i} d={`M${x} 250 v${8 + (i % 3) * 3}`} stroke="#2a2a2a" strokeWidth="1.6" />
      ))}
      {/* broche or (souvenir du mari mort en 14-18) */}
      <circle cx="150" cy="248" r="5" fill="#c8963e" stroke="#8a5a20" strokeWidth="1" />
      <circle cx="150" cy="248" r="1.8" fill="#5a3a10" />

      {/* cou */}
      <path d="M137 190 L163 190 L165 228 Q150 236 135 228 Z" fill="url(#pMaSkin)" />

      {/* visage ovale, plus étroit (âgée) */}
      <path d="M150 88 C176 88 188 112 187 140 C186 168 170 192 150 194 C130 192 114 168 113 140 C112 112 124 88 150 88 Z" fill="url(#pMaSkin)" />
      {/* ombre + rides latérales */}
      <path d="M118 122 Q114 152 130 178" stroke="#a88060" strokeWidth="3" fill="none" opacity="0.35" strokeLinecap="round" />
      <path d="M126 156 Q124 162 128 166" stroke="#a88060" strokeWidth="1.4" fill="none" opacity="0.55" />
      <path d="M172 156 Q174 162 170 166" stroke="#a88060" strokeWidth="1.4" fill="none" opacity="0.55" />
      {/* oreilles */}
      <ellipse cx="114" cy="142" rx="6" ry="9" fill="#dfa888" />
      <ellipse cx="186" cy="142" rx="6" ry="9" fill="#dfa888" />

      {/* CHIGNON gris tiré en arrière (silhouette de la coiffure) */}
      <path d="M116 106 Q136 82 150 82 Q184 82 196 112 Q206 106 200 90 Q186 66 150 66 Q118 66 106 96 Q106 106 116 106 Z" fill="#8a8a8a" />
      {/* boule du chignon derrière la nuque */}
      <ellipse cx="205" cy="130" rx="14" ry="18" fill="#7a7a7a" />
      <path d="M198 120 Q212 128 208 148" stroke="#5a5a5a" strokeWidth="1.2" fill="none" opacity="0.7" />
      {/* mèches grises encadrant */}
      <path d="M120 106 Q108 138 118 172" stroke="#8a8a8a" strokeWidth="4" fill="none" />

      {/* SOURCILS gris + YEUX bleu délavé (âge + rigueur) */}
      <path d="M124 126 Q134 122 145 126" stroke="#7a7a7a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M155 126 Q166 122 176 126" stroke="#7a7a7a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {/* pattes d'oie */}
      <path d="M120 134 l-4 -2 M120 138 l-4 0 M120 142 l-4 2" stroke="#a88060" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M180 134 l4 -2 M180 138 l4 0 M180 142 l4 2" stroke="#a88060" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M126 138 Q135 134 144 138 Q135 144 126 138 Z" fill="#f8efdd" />
      <path d="M156 138 Q165 134 174 138 Q165 144 156 138 Z" fill="#f8efdd" />
      <circle cx="135" cy="138" r="3.4" fill="#5a7a90" />
      <circle cx="165" cy="138" r="3.4" fill="#5a7a90" />
      <circle cx="136" cy="136.8" r="1" fill="#fff" />
      <circle cx="166" cy="136.8" r="1" fill="#fff" />

      {/* NEZ un peu marqué */}
      <path d="M146 156 Q150 164 154 156 M146 156 Q142 148 148 145 M154 156 Q158 148 152 145" stroke="#b48468" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* rides du sillon nasogénien */}
      <path d="M138 172 Q134 180 140 186" stroke="#a88060" strokeWidth="1.2" fill="none" opacity="0.5" />
      <path d="M162 172 Q166 180 160 186" stroke="#a88060" strokeWidth="1.2" fill="none" opacity="0.5" />

      {/* BOUCHE (lèvres fines, âgée) */}
      <Mouth cx={150} cy={182} />
    </svg>
  );
}
