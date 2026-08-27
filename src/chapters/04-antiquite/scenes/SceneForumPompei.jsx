import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 4 — Tableau adjacent : LE FORUM DE POMPÉI
   ------------------------------------------------------------
   Le cœur civique : colonnade du forum, temple de Jupiter à
   gauche, mur couvert de graffitis politiques et amoureux,
   crieur public (praeco) sur son escabeau, une grande stèle
   d'edile en train d'être gravée. Vésuve gris au loin.
   ============================================================ */

export default function SceneForumPompei({ collect, action, reveal }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="fp-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8ea8c8" /><stop offset="70%" stopColor="#e8c898" /><stop offset="100%" stopColor="#f0d0a0" /></linearGradient>
        <linearGradient id="fp-marbre" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f0e8d8" /><stop offset="100%" stopColor="#c8bca0" /></linearGradient>
        <linearGradient id="fp-mur" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d8a878" /><stop offset="100%" stopColor="#8a6838" /></linearGradient>
        <linearGradient id="fp-dalles" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a09080" /><stop offset="100%" stopColor="#5a4838" /></linearGradient>
        <filter id="fp-grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" /><feColorMatrix values="0 0 0 0 0.3 0 0 0 0 0.2 0 0 0 0 0.1 0 0 0 0.35 0" /></filter>
      </defs>

      {/* ═══ Base plein cadre : ciel EN HAUT + dallage EN BAS,
              posés DERRIÈRE toutes les couches parallax pour éviter
              tout « décor flottant dans le vide » quand on pan. ═══ */}
      <rect width="1000" height="380" fill="url(#fp-sky)" />
      <rect y="380" width="1000" height="180" fill="url(#fp-dalles)" />

      <PLayer depth={5}>
        {/* soleil pâle dans le ciel */}
        <circle cx="180" cy="80" r="80" fill="#f8e8b8" opacity="0.35" />
        <circle cx="180" cy="80" r="24" fill="#f8e0a0" opacity="0.7" />
        {/* nuages hauts */}
        <ellipse cx="360" cy="60" rx="90" ry="6" fill="#f0e0c0" opacity="0.55" />
        <ellipse cx="540" cy="90" rx="120" ry="7" fill="#f0e0c0" opacity="0.5" />
        {/* ═══ LE VÉSUVE, imposant, au fond du golfe ═══ */}
        <g transform="translate(640,320)">
          {/* silhouette du volcan bleu-gris (perspective lointaine) */}
          <path d="M-200 0 L-60 -200 L20 -200 L200 0 Z" fill="#6a6070" opacity="0.85" />
          {/* face ombrée à droite */}
          <path d="M20 -200 L200 0 L120 0 L10 -190 Z" fill="#3a3040" opacity="0.55" />
          {/* neige au sommet */}
          <path d="M-60 -200 L20 -200 L10 -210 L-50 -210 Z" fill="#a89898" opacity="0.75" />
          {/* cratère fumant */}
          <ellipse cx="-20" cy="-205" rx="30" ry="6" fill="#2a2018" />
          <path d="M-30 -212 q4 -14 -2 -22 q-4 -8 4 -18" stroke="#c8b8a0" strokeWidth="4" fill="none" opacity="0.5" strokeLinecap="round" />
          <path d="M0 -210 q-4 -12 2 -22 q4 -8 -2 -18" stroke="#c8b8a0" strokeWidth="3" fill="none" opacity="0.45" strokeLinecap="round" />
        </g>
        {/* deux mouettes qui passent */}
        <g opacity="0.55" transform="translate(360,180)" style={{ animation: "float 4s ease-in-out infinite" }}>
          <path d="M0 0 q-3 -3 -6 0 M0 0 q3 -3 6 0" stroke="#3a2818" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M22 12 q-3 -3 -6 0 M22 12 q3 -3 6 0" stroke="#3a2818" strokeWidth="1" fill="none" strokeLinecap="round" />
        </g>
      </PLayer>

      <PLayer depth={4}>
        {/* ═══ LA VILLE DE POMPÉI ═══
            Toits en tuiles rouges qui s'étalent au pied du Vésuve.
            Deux couches : lointaine (petites maisons floues) puis
            proche (maisons plus détaillées avec fenêtres et cours). */}
        {/* Couche lointaine : toits en enfilade */}
        {Array.from({ length: 24 }).map((_, i) => {
          const x = -20 + i * 44;
          const h = 40 + (i * 7) % 18;
          const y = 320 - h;
          return (
            <g key={`f${i}`} opacity="0.65">
              <rect x={x} y={y} width={40} height={h} fill="#a06848" stroke="#5a3020" strokeWidth="0.4" />
              {/* toit à 2 pentes */}
              <path d={`M${x - 2} ${y} L${x + 42} ${y} L${x + 32} ${y - 12} L${x + 8} ${y - 12} Z`} fill="#8a3820" stroke="#3a1010" strokeWidth="0.4" />
            </g>
          );
        })}
        {/* Couche proche : maisons plus détaillées */}
        {Array.from({ length: 12 }).map((_, i) => {
          const x = -10 + i * 88;
          const h = 60 + (i * 11) % 26;
          const y = 340 - h;
          return (
            <g key={`n${i}`} opacity="0.85">
              {/* mur ocre */}
              <rect x={x} y={y} width={80} height={h + 20} fill="#c8a06a" stroke="#5a3020" strokeWidth="0.5" />
              {/* frise haut de mur */}
              <rect x={x} y={y + 4} width={80} height="3" fill="#8a5030" />
              {/* fenêtres */}
              <rect x={x + 12} y={y + 20} width="10" height="14" fill="#3a2010" />
              <rect x={x + 58} y={y + 20} width="10" height="14" fill="#3a2010" />
              <rect x={x + 12} y={y + 44} width="10" height="14" fill="#3a2010" />
              <rect x={x + 58} y={y + 44} width="10" height="14" fill="#3a2010" />
              {/* toit à 2 pentes en tuiles */}
              <path d={`M${x - 4} ${y} L${x + 84} ${y} L${x + 66} ${y - 20} L${x + 14} ${y - 20} Z`} fill="#a83820" stroke="#3a1010" strokeWidth="0.5" />
              {/* stries de tuiles */}
              <path d={`M${x + 16} ${y - 18} l${52} 0 M${x + 14} ${y - 12} l${56} 0 M${x + 8} ${y - 4} l${68} 0`} stroke="#7a1810" strokeWidth="0.4" />
              {/* petite cheminée */}
              <rect x={x + 40} y={y - 30} width="8" height="12" fill="#5a3020" />
            </g>
          );
        })}
        {/* colline verte discrète au pied du Vésuve */}
        <path d="M300 340 Q500 300 700 340 L1000 340 L1000 380 L200 380 Z" fill="#5a6848" opacity="0.5" />
        {/* Temple de Jupiter à gauche (fronton triangulaire + colonnes) — grand plan */}
        <g transform="translate(180,320)">
          {/* podium */}
          <rect x="-110" y="0" width="220" height="24" fill="url(#fp-marbre)" stroke="#5a5040" strokeWidth="0.6" />
          {/* colonnes doriques */}
          {[-90, -54, -18, 18, 54, 90].map((x, i) => (
            <g key={i} transform={`translate(${x},0)`}>
              <rect x="-6" y="-100" width="12" height="100" fill="url(#fp-marbre)" stroke="#8a7860" strokeWidth="0.5" />
              {/* cannelures */}
              <path d="M-4 -100 L-4 0 M0 -100 L0 0 M4 -100 L4 0" stroke="#a89878" strokeWidth="0.3" />
              {/* chapiteau */}
              <rect x="-8" y="-108" width="16" height="8" fill="#e0d0b8" stroke="#5a5040" strokeWidth="0.5" />
            </g>
          ))}
          {/* architrave + frise */}
          <rect x="-108" y="-114" width="216" height="10" fill="url(#fp-marbre)" stroke="#5a5040" strokeWidth="0.6" />
          {/* fronton triangulaire */}
          <path d="M-108 -114 L108 -114 L0 -170 Z" fill="url(#fp-marbre)" stroke="#5a5040" strokeWidth="1" />
          <path d="M-108 -114 L108 -114 L0 -170 Z" fill="none" stroke="#8a7860" strokeWidth="0.6" />
          {/* aigle romain au centre du fronton */}
          <path d="M-8 -140 q4 -8 8 -4 q4 -4 8 4 q0 4 -4 4 l-8 0 q-4 0 -4 -4 Z" fill="#8a6838" />
        </g>
      </PLayer>

      <PLayer depth={3}>
        {/* dallage du forum */}
        <rect y="380" width="1000" height="180" fill="url(#fp-dalles)" />
        {/* grandes dalles rectangulaires */}
        {[[0, 400], [140, 400], [280, 400], [420, 400], [560, 400], [700, 400], [840, 400],
          [70, 440], [210, 440], [350, 440], [490, 440], [630, 440], [770, 440], [910, 440],
          [0, 480], [140, 480], [280, 480], [420, 480], [560, 480], [700, 480], [840, 480]].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="140" height="38" fill="none" stroke="#3a3020" strokeWidth="0.8" opacity="0.55" />
        ))}
        {/* MUR à graffitis à droite */}
        <g transform="translate(560,300)">
          <rect x="0" y="0" width="340" height="130" fill="url(#fp-mur)" stroke="#5a3820" strokeWidth="1" />
          <rect x="0" y="0" width="340" height="130" fill="#3a2010" opacity="0.25" filter="url(#fp-grain)" />
          {/* GRAFFITIS colorés (rouge cinabre, noir de suie) */}
          <text x="16" y="24" fontSize="12" fill="#8a2818" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="700">CAIVS · MARCVS · AED · OVF</text>
          <text x="16" y="46" fontSize="11" fill="#3a2010" fontFamily="Georgia, serif">LVCILIA · AMAT · MARCELLVM</text>
          <path d="M14 60 L60 60" stroke="#3a2010" strokeWidth="1" />
          <text x="16" y="80" fontSize="10" fill="#8a2818" fontFamily="Georgia, serif">HIC · BIBIMVS · III · DENARIOS</text>
          <text x="16" y="102" fontSize="11" fill="#3a2010" fontFamily="Georgia, serif" fontStyle="italic">ADMIROR · TE · PARIES · NON · CECIDISSE</text>
          <text x="16" y="122" fontSize="9" fill="#8a2818" fontFamily="Georgia, serif">RVFVS · EST · HIC</text>
          {/* petit cœur */}
          <path d="M290 40 q-4 -8 -10 -4 q-4 4 4 10 l6 6 l6 -6 q8 -6 4 -10 q-6 -4 -10 4 Z" fill="#8a2818" opacity="0.75" />
          {/* main peinte à la sanguine (empreinte au mur) */}
          <path d="M180 30 q-3 0 -3 5 l0 12 q0 3 3 3 l14 0 q3 0 3 -3 l0 -12 q0 -5 -3 -5 Z" fill="#8a2818" opacity="0.55" />
          <path d="M182 35 l0 -5 M186 35 l0 -6 M190 35 l0 -5 M194 35 l0 -4" stroke="#8a2818" strokeWidth="1" opacity="0.55" />
          {/* silhouette de gladiateur maladroite */}
          <g transform="translate(280,90)">
            <circle r="4" fill="#3a2010" />
            <path d="M0 4 L0 20 M-6 12 L6 12 M-4 20 L-6 32 M4 20 L6 32" stroke="#3a2010" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M6 10 L14 6 L14 4" stroke="#3a2010" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </g>
        </g>
        {/* stèle en cours de gravure au centre */}
        <g transform="translate(440,470)">
          <ellipse cx="0" cy="52" rx="42" ry="6" fill="#0a0604" opacity="0.55" />
          <rect x="-32" y="-90" width="64" height="140" fill="url(#fp-marbre)" stroke="#5a5040" strokeWidth="1" />
          <path d="M-32 -90 L32 -90 L0 -110 Z" fill="url(#fp-marbre)" stroke="#5a5040" strokeWidth="1" />
          <text x="0" y="-60" textAnchor="middle" fontSize="9" fill="#5a4030" fontFamily="Georgia, serif" fontWeight="700">SPQR</text>
          <text x="0" y="-42" textAnchor="middle" fontSize="7" fill="#5a4030" fontFamily="Georgia, serif">M·HOLCONIVS</text>
          <text x="0" y="-30" textAnchor="middle" fontSize="7" fill="#5a4030" fontFamily="Georgia, serif">RVFVS · DVOVIR</text>
          <text x="0" y="-18" textAnchor="middle" fontSize="7" fill="#5a4030" fontFamily="Georgia, serif">POMPEIIS</text>
          {/* lignes non encore gravées */}
          <path d="M-24 -6 h48 M-24 6 h48 M-24 18 h48" stroke="#8a7860" strokeWidth="0.3" opacity="0.5" />
        </g>
      </PLayer>

      <PLayer depth={2}>
        {/* PRAECO — le crieur public sur un escabeau, main levée */}
        <g transform="translate(200,510)">
          {/* escabeau de bois */}
          <rect x="-20" y="10" width="40" height="18" fill="#8a5a2e" stroke="#3a1810" strokeWidth="0.6" />
          <rect x="-16" y="28" width="6" height="18" fill="#3a2010" />
          <rect x="10" y="28" width="6" height="18" fill="#3a2010" />
          <ellipse cx="0" cy="48" rx="24" ry="3" fill="#0a0604" opacity="0.5" />
          {/* jambes */}
          <path d="M-8 10 L-8 -18 M8 10 L8 -18" stroke="#e8dcc0" strokeWidth="6" strokeLinecap="round" />
          {/* toge blanche */}
          <path d="M-16 8 Q-20 -20 -4 -30 Q4 -32 12 -30 Q20 -20 16 8 Z" fill="#f0e8d0" stroke="#8a7860" strokeWidth="0.6" />
          <path d="M-14 -12 Q-4 -22 14 -8 Q4 0 -14 -6 Z" fill="#e0d8c0" stroke="#8a7860" strokeWidth="0.4" />
          {/* bande pourpre (laticlave) */}
          <path d="M-4 -28 L-4 8" stroke="#7a2044" strokeWidth="2" />
          {/* bras droit levé haranguant */}
          <path d="M12 -22 L26 -46" stroke="#c8946a" strokeWidth="4" strokeLinecap="round" />
          <path d="M26 -46 L34 -50" stroke="#c8946a" strokeWidth="3" strokeLinecap="round" />
          {/* tête + cheveux courts romains */}
          <ellipse cx="0" cy="-42" rx="10" ry="12" fill="#c8946a" stroke="#5a3818" strokeWidth="0.5" />
          <path d="M-9 -46 q-2 -8 4 -10 q6 4 8 -2 q4 4 6 -2 q4 6 3 12" stroke="#3a2418" strokeWidth="1.4" fill="none" />
          {/* traits */}
          <circle cx="-3" cy="-42" r="1.2" fill="#0a0806" />
          <circle cx="3" cy="-42" r="1.2" fill="#0a0806" />
          <path d="M-3 -36 q3 2 6 0" stroke="#5a2818" strokeWidth="0.8" fill="none" />
          {/* rouleau dans la main gauche */}
          <path d="M-16 -12 L-24 -8" stroke="#c8946a" strokeWidth="3" strokeLinecap="round" />
          <g transform="translate(-26,-8) rotate(30)">
            <rect x="-2" y="-8" width="12" height="10" fill="#e8d0a0" stroke="#5a3818" strokeWidth="0.5" />
            <path d="M-2 -6 h12 M-2 -4 h12 M-2 -2 h12" stroke="#8a5828" strokeWidth="0.3" />
          </g>
        </g>
        <g transform="translate(200,432)" style={{ animation: "float 2s ease-in-out infinite" }}>
          <circle r="14" fill="#ffd166" stroke="#8a5a20" strokeWidth="2" />
          <text y="5" textAnchor="middle" fontSize="18" fontWeight="800" fill="#3a2410">!</text>
        </g>

        {/* Un lapidicida (graveur) accroupi devant la stèle */}
        <g transform="translate(390,516)">
          <ellipse cx="0" cy="18" rx="18" ry="3" fill="#0a0604" opacity="0.5" />
          <path d="M-14 14 Q-10 4 -2 6 L12 16 Q18 20 14 20 L-14 20 Q-18 18 -14 14 Z" fill="#7a4820" />
          <path d="M-12 10 Q-14 -12 0 -18 Q14 -12 12 10 Z" fill="#a86828" stroke="#3a2010" strokeWidth="0.5" />
          <ellipse cx="0" cy="-24" rx="8" ry="10" fill="#c8946a" transform="rotate(20 0 -24)" />
          <path d="M-6 -26 q4 -6 8 -4 q4 2 5 4" stroke="#3a2418" strokeWidth="1.2" fill="none" />
          {/* bras avec burin et maillet */}
          <path d="M-12 -6 L-24 -14 L-32 -20" stroke="#c8946a" strokeWidth="3" strokeLinecap="round" />
          <path d="M12 -6 L22 -12" stroke="#c8946a" strokeWidth="3" strokeLinecap="round" />
          <rect x="22" y="-16" width="8" height="4" fill="#5a3818" />
          <path d="M-34 -22 L-28 -30" stroke="#3a2418" strokeWidth="1.4" strokeLinecap="round" />
        </g>

        {/* Ephemere : denier romain + amphore cassée */}
        <g transform="translate(680,534)">
          <circle r="8" fill="#c8a848" stroke="#8a6820" strokeWidth="0.6" />
          <text y="3" textAnchor="middle" fontSize="8" fontWeight="700" fill="#5a4010">C</text>
        </g>
        <g transform="translate(880,542) rotate(30)">
          <path d="M-8 -6 L-2 8 L8 6 L4 -8 Z" fill="#c88a52" stroke="#3a1810" strokeWidth="0.5" />
          <path d="M-8 -6 L-14 -12 M8 6 L14 12" stroke="#5a3818" strokeWidth="0.8" />
          <path d="M-2 8 L8 6" stroke="#3a1810" strokeWidth="1" />
        </g>
      </PLayer>

      <Hotspot cx={200} cy={470} r={40} label="le crieur public (praeco)" reveal={reveal} onClick={() => action("praeco")} />
      <Hotspot cx={390} cy={498} r={30} label="le lapidicida (graveur)" reveal={reveal} onClick={() => action("lapidicida")} />
      <Hotspot cx={440} cy={430} r={40} label="stèle d'édile en gravure" reveal={reveal} onClick={() => action("stele_edile")} />
      <Hotspot cx={720} cy={360} r={80} label="mur de graffitis" reveal={reveal} onClick={() => action("graffitis")} />
      <Hotspot cx={180} cy={220} r={70} label="temple de Jupiter" reveal={reveal} onClick={() => action("temple")} />
      <Hotspot cx={750} cy={220} r={40} label="le Vésuve, au loin…" reveal={reveal} onClick={() => action("vesuve_forum")} />
      <Hotspot cx={680} cy={534} r={14} label="denier romain" item="denier" reveal={reveal} onClick={() => collect("denier")} />
      <Hotspot cx={880} cy={542} r={16} label="tesson d'amphore" item="tesson" reveal={reveal} onClick={() => collect("tesson")} />
    </svg>
  );
}
