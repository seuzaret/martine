import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 9 — Tableau : SALON DEVANT LE JT (9 nov. 1989)
   ------------------------------------------------------------
   Une famille française rassemblée devant la TV cathodique : à
   l'écran, la chute du Mur de Berlin, EN DIRECT. Papa absorbé,
   Maman au téléphone à fil, l'ado assise au sol, grand-père
   dans le fauteuil. Cliquer sur la TV ouvre le mini-jeu
   « Cadre l'événement » — comment choisir la Une d'images du
   JT du soir change ce qu'on comprend de l'événement.
   ============================================================ */

export default function SceneSalonJT1989({ collect, action, reveal, made = [], inv = [], mode }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        {/* mur : papier peint 80s à motifs orange/marron */}
        <linearGradient id="jt-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c89a68" />
          <stop offset="100%" stopColor="#8a6444" />
        </linearGradient>
        <linearGradient id="jt-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a3820" />
          <stop offset="100%" stopColor="#2c1810" />
        </linearGradient>
        <linearGradient id="jt-tv-frame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a08050" />
          <stop offset="100%" stopColor="#5a3a20" />
        </linearGradient>
        <radialGradient id="jt-screen" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#a8a8a0" />
          <stop offset="100%" stopColor="#585850" />
        </radialGradient>
        <linearGradient id="jt-couch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a0663a" />
          <stop offset="100%" stopColor="#6a3a1a" />
        </linearGradient>
        <linearGradient id="jt-lamp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8b048" />
          <stop offset="100%" stopColor="#a06a1a" />
        </linearGradient>
        <radialGradient id="jt-lampglow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#ffe0a0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffe0a0" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Mur du fond */}
      <PLayer depth={5}>
        <rect width="1000" height="420" fill="url(#jt-wall)" />
        {/* motifs papier peint 80s — petits losanges orange/marron */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((row) => (
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map((col) => {
            const x = 60 + col * 110 + (row % 2) * 55;
            const y = 40 + row * 44;
            return (
              <g key={`p-${row}-${col}`} opacity="0.35">
                <path d={`M${x} ${y} L${x + 10} ${y + 10} L${x} ${y + 20} L${x - 10} ${y + 10} Z`} fill="#7a4a2a" />
              </g>
            );
          })
        ))}
        {/* plinthe */}
        <rect y="416" width="1000" height="6" fill="#4a2c18" />
      </PLayer>

      {/* Sol parquet */}
      <PLayer depth={2}>
        <rect y="420" width="1000" height="140" fill="url(#jt-floor)" />
        {/* lattes du parquet */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <line key={`fl-${i}`} x1="0" y1={430 + i * 15} x2="1000" y2={430 + i * 15} stroke="#2a1408" strokeWidth="0.6" opacity="0.55" />
        ))}
        {/* joints verticaux irréguliers */}
        {[[80, 430, 445], [220, 445, 460], [350, 430, 445], [480, 445, 460], [620, 430, 445], [760, 445, 460], [880, 430, 445]].map(([x, y1, y2], i) => (
          <line key={`jv-${i}`} x1={x} y1={y1} x2={x} y2={y2} stroke="#1a0e04" strokeWidth="0.8" opacity="0.6" />
        ))}
        {/* tapis à motifs — dessous du canapé et de la TV */}
        <ellipse cx="500" cy="510" rx="360" ry="34" fill="#7a2a2a" opacity="0.85" />
        <ellipse cx="500" cy="510" rx="340" ry="30" fill="none" stroke="#c9a54a" strokeWidth="1.5" opacity="0.7" />
        {/* motifs géométriques du tapis */}
        {[-3, -2, -1, 0, 1, 2, 3].map((i) => (
          <g key={`t-${i}`} opacity="0.55">
            <circle cx={500 + i * 80} cy="510" r="7" fill="none" stroke="#c9a54a" strokeWidth="1.2" />
          </g>
        ))}
      </PLayer>

      {/* MEUBLE TV + télé cathodique centrale */}
      <PLayer depth={3}>
        {/* meuble bois foncé */}
        <rect x="380" y="340" width="240" height="90" fill="#4a2c18" stroke="#2a1408" strokeWidth="1.5" rx="3" />
        <rect x="384" y="344" width="232" height="8" fill="#5a3620" />
        {/* poignées tiroirs */}
        <rect x="450" y="390" width="16" height="4" fill="#c9a54a" rx="1" />
        <rect x="534" y="390" width="16" height="4" fill="#c9a54a" rx="1" />

        {/* Magnétoscope VHS sur le meuble */}
        <rect x="400" y="322" width="90" height="18" fill="#1a1a1a" stroke="#0a0a0a" strokeWidth="1" rx="1" />
        <rect x="404" y="326" width="60" height="6" fill="#3a3a3a" />
        <circle cx="478" cy="331" r="2" fill="#c04040">
          <animate attributeName="opacity" values="1;0.35;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <text x="410" y="337" fontFamily="ui-monospace,monospace" fontSize="5" fill="#7fd8ff">REC 20:32</text>

        {/* La TV cathodique — grosse, épaisse, brune */}
        <g transform="translate(500,240)">
          {/* meuble arrière */}
          <path d="M-140 -70 L140 -70 L120 90 L-120 90 Z" fill="url(#jt-tv-frame)" stroke="#2a1408" strokeWidth="2" />
          {/* bombement bas */}
          <ellipse cx="0" cy="90" rx="122" ry="8" fill="#5a3a20" />
          {/* face avant */}
          <rect x="-130" y="-64" width="260" height="150" fill="url(#jt-tv-frame)" stroke="#2a1408" strokeWidth="2" rx="4" />
          {/* écran cathodique bombé, avec image JT */}
          <rect x="-108" y="-52" width="216" height="118" fill="url(#jt-screen)" stroke="#1a1a1a" strokeWidth="2.5" rx="16" />
          {/* image floue "en direct" : ligne pointillée d'horizon + silhouettes qui pourraient être une foule */}
          <path d="M-96 20 L96 20" stroke="#3a3a30" strokeWidth="1" opacity="0.6" />
          {[[-70, 15], [-45, 12], [-20, 16], [10, 14], [35, 17], [60, 13], [80, 16]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={2 + (i % 2)} fill="#2a2a20" opacity="0.7" />
          ))}
          {/* mur horizontal au fond de l'écran */}
          <rect x="-96" y="-10" width="192" height="20" fill="#8a8880" opacity="0.55" />
          {/* fine ligne "défilement" / scanlines */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
            <line key={`sc-${i}`} x1="-108" y1={-50 + i * 10} x2="108" y2={-50 + i * 10} stroke="#000" strokeWidth="0.3" opacity="0.2" />
          ))}
          {/* bandeau titre du JT en bas de l'écran, rouge */}
          <rect x="-108" y="46" width="216" height="18" fill="#a02020" opacity="0.9" />
          <text x="0" y="59" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="11" fontWeight="800" fill="#fff">◉ EN DIRECT — BERLIN</text>
          {/* petit reflet sur l'écran */}
          <path d="M-100 -46 Q-80 -30 -60 -46" stroke="#fff" strokeWidth="1.2" fill="none" opacity="0.35" />
          {/* deux gros boutons rotatifs à droite */}
          <circle cx="112" cy="-30" r="10" fill="#2a1408" stroke="#c9a54a" strokeWidth="1.5" />
          <circle cx="112" cy="0" r="10" fill="#2a1408" stroke="#c9a54a" strokeWidth="1.5" />
          <rect x="106" y="20" width="12" height="4" fill="#5a3a20" />
          <rect x="106" y="30" width="12" height="4" fill="#5a3a20" />
        </g>

        {/* petit halo TV sur les meubles alentour, effet nuit */}
        <ellipse cx="500" cy="240" rx="220" ry="80" fill="#a8c8e0" opacity="0.12" style={{ animation: "glow 3s ease-in-out infinite" }} />
      </PLayer>

      {/* CANAPÉ velours cotelé à droite avec Papa + ado */}
      <PLayer depth={2}>
        <g transform="translate(760,430)">
          {/* dossier */}
          <rect x="-120" y="-80" width="240" height="60" fill="url(#jt-couch)" rx="8" />
          {/* rainures velours */}
          {[-90, -60, -30, 0, 30, 60, 90].map((x) => (
            <line key={x} x1={x} y1="-78" x2={x} y2="-22" stroke="#4a1e0a" strokeWidth="0.6" opacity="0.5" />
          ))}
          {/* assise */}
          <rect x="-130" y="-20" width="260" height="30" fill="url(#jt-couch)" rx="6" />
          {/* accoudoirs */}
          <rect x="-140" y="-70" width="22" height="80" fill="url(#jt-couch)" rx="8" />
          <rect x="118" y="-70" width="22" height="80" fill="url(#jt-couch)" rx="8" />

          {/* PAPA — assis au centre, absorbé, muet */}
          <g transform="translate(-40,-40)">
            {/* corps */}
            <path d="M-22 30 Q-20 -10 0 -12 Q20 -10 22 30 Z" fill="#3a4a5a" />
            {/* pantalon */}
            <rect x="-18" y="30" width="36" height="16" fill="#2a1c14" />
            {/* tête */}
            <circle cx="0" cy="-24" r="10" fill="#e8bfa0" />
            {/* moustache 80s */}
            <path d="M-6 -19 Q0 -17 6 -19" stroke="#3a2418" strokeWidth="1.6" fill="none" />
            {/* cheveux courts avec mèche */}
            <path d="M-9 -30 Q0 -36 9 -30 L9 -25 Q4 -30 -3 -28 Z" fill="#3a2418" />
            {/* mains sur les genoux */}
            <circle cx="-14" cy="26" r="3" fill="#e8bfa0" />
            <circle cx="14" cy="26" r="3" fill="#e8bfa0" />
            {/* cigarette qui fume tranquillement (années 80…) */}
            <line x1="14" y1="26" x2="22" y2="20" stroke="#f0eae0" strokeWidth="1.5" />
            <ellipse cx="22" cy="20" rx="1.2" ry="0.6" fill="#ff8a30">
              <animate attributeName="opacity" values="1;0.4;1" dur="2.4s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="26" cy="14" rx="3" ry="1.5" fill="#e8e0d0" opacity="0.5">
              <animate attributeName="opacity" values="0.5;0" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="cy" values="14;4" dur="2.4s" repeatCount="indefinite" />
            </ellipse>
          </g>

          {/* GRAND-PÈRE dans le fauteuil (rendu à droite du canapé) */}
        </g>

        {/* FAUTEUIL séparé + grand-père */}
        <g transform="translate(920,432)">
          <rect x="-46" y="-72" width="92" height="90" fill="#5a2020" rx="10" />
          <rect x="-56" y="-30" width="112" height="24" fill="#5a2020" rx="6" />
          <rect x="-60" y="-70" width="18" height="80" fill="#5a2020" rx="8" />
          <rect x="42" y="-70" width="18" height="80" fill="#5a2020" rx="8" />

          {/* Grand-père */}
          <g transform="translate(0,-38)">
            <path d="M-18 26 Q-16 -10 0 -12 Q16 -10 18 26 Z" fill="#8a7a6a" />
            <circle cx="0" cy="-22" r="9" fill="#e8c8a8" />
            {/* cheveux blancs, calvitie */}
            <path d="M-8 -28 Q0 -32 8 -28" stroke="#f0eae0" strokeWidth="4" fill="none" />
            {/* lunettes rondes */}
            <circle cx="-4" cy="-22" r="2.5" fill="none" stroke="#1a1a1a" strokeWidth="0.8" />
            <circle cx="4" cy="-22" r="2.5" fill="none" stroke="#1a1a1a" strokeWidth="0.8" />
            <path d="M-1.5 -22 L1.5 -22" stroke="#1a1a1a" strokeWidth="0.6" />
            {/* mains posées */}
            <circle cx="-14" cy="20" r="3" fill="#e8c8a8" />
            <circle cx="14" cy="20" r="3" fill="#e8c8a8" />
          </g>
        </g>
      </PLayer>

      {/* CONSOLE téléphone à fil (à gauche) + Maman debout */}
      <PLayer depth={2}>
        <g transform="translate(120,430)">
          {/* petite console basse */}
          <rect x="-40" y="-24" width="80" height="30" fill="#4a2c18" stroke="#2a1408" strokeWidth="1.5" rx="2" />
          {/* poste téléphone à cadran orange 80s */}
          <rect x="-32" y="-42" width="64" height="24" fill="#c85030" stroke="#7a2010" strokeWidth="1" rx="3" />
          <circle cx="-8" cy="-30" r="6" fill="#1a1a1a" />
          <circle cx="-8" cy="-30" r="4" fill="#c85030" />
          {/* combiné surélevé, câble en spirale */}
          <path d="M4 -42 Q6 -50 22 -50 L34 -50 L34 -44 L20 -44 Q6 -44 4 -38 Z" fill="#c85030" stroke="#7a2010" strokeWidth="1" />
          {/* le câble spiralé qui pend jusqu'à Maman */}
          <path d="M22 -40 Q28 -20 32 -8 Q30 4 22 12 Q28 22 26 32" stroke="#1a1a1a" strokeWidth="1.4" fill="none" />
        </g>

        {/* MAMAN debout, combiné à l'oreille */}
        <g transform="translate(160,440)">
          {/* jupe crayon années 80, épaulettes */}
          <path d="M-16 -30 Q0 -34 16 -30 L18 8 L-18 8 Z" fill="#4a6a94" />
          {/* épaulettes très marquées */}
          <path d="M-20 -30 L-14 -34 L-14 -22 L-20 -22 Z" fill="#4a6a94" />
          <path d="M20 -30 L14 -34 L14 -22 L20 -22 Z" fill="#4a6a94" />
          {/* jupe */}
          <path d="M-18 8 L18 8 L20 40 L-20 40 Z" fill="#2a3a54" />
          <rect x="-6" y="40" width="4" height="24" fill="#c9a878" />
          <rect x="2" y="40" width="4" height="24" fill="#c9a878" />
          {/* escarpins */}
          <ellipse cx="-4" cy="66" rx="6" ry="2" fill="#1a1410" />
          <ellipse cx="4" cy="66" rx="6" ry="2" fill="#1a1410" />
          {/* bras qui tient le combiné à l'oreille */}
          <path d="M-14 -22 L-24 -34 L-24 -42" stroke="#4a6a94" strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* tête + coupe carrée blond */}
          <circle cx="-6" cy="-40" r="10" fill="#f0d0a8" />
          <path d="M-16 -46 Q-6 -54 4 -46 L4 -30 L-16 -30 Z" fill="#e8c878" />
          {/* combiné à l'oreille */}
          <rect x="-24" y="-46" width="10" height="10" fill="#c85030" stroke="#7a2010" strokeWidth="0.6" rx="1" />
        </g>
      </PLayer>

      {/* ADO assise au sol devant la TV, dos au spectateur */}
      <PLayer depth={2}>
        <g transform="translate(370,510)">
          {/* silhouette de dos */}
          <path d="M-16 -18 Q0 -22 16 -18 L18 20 L-18 20 Z" fill="#e878a0" />
          {/* cheveux long noir */}
          <path d="M-10 -22 Q-14 -8 -10 6 M10 -22 Q14 -8 10 6" stroke="#1a1a1a" strokeWidth="8" fill="none" />
          <circle cx="0" cy="-28" r="9" fill="#f0d0a8" />
          {/* petit chouchou rose sur la tête */}
          <ellipse cx="4" cy="-36" rx="4" ry="2.5" fill="#f8b0c8" />
          {/* pantalon en jean */}
          <path d="M-14 20 L14 20 L12 34 L-12 34 Z" fill="#3a5074" />
        </g>

        {/* journal papier ouvert sur la table basse — dépassé par le direct TV */}
        <g transform="translate(590,506)">
          <rect x="-30" y="-14" width="60" height="26" fill="#f0e8d8" stroke="#8a7458" strokeWidth="0.8" />
          <line x1="-24" y1="-10" x2="24" y2="-10" stroke="#3a2418" strokeWidth="0.6" />
          <line x1="-24" y1="-6" x2="18" y2="-6" stroke="#3a2418" strokeWidth="0.4" />
          <line x1="-24" y1="-2" x2="24" y2="-2" stroke="#3a2418" strokeWidth="0.4" />
          <line x1="-24" y1="2" x2="20" y2="2" stroke="#3a2418" strokeWidth="0.4" />
          <line x1="-24" y1="6" x2="24" y2="6" stroke="#3a2418" strokeWidth="0.4" />
          <text x="0" y="-11" textAnchor="middle" fontFamily="Georgia,serif" fontSize="4" fontWeight="800" fill="#3a2418">L'ÉDITION DU JOUR</text>
        </g>
      </PLayer>

      {/* Petite lampe halogène sur pied, à droite du fauteuil */}
      <PLayer depth={1}>
        <g transform="translate(50,440)">
          <rect x="-3" y="-140" width="6" height="140" fill="#3a3020" />
          <path d="M-16 -160 L16 -160 L14 -142 L-14 -142 Z" fill="url(#jt-lamp)" />
          <ellipse cx="0" cy="-160" rx="24" ry="6" fill="url(#jt-lampglow)" style={{ animation: "glow 3s ease-in-out infinite" }} />
          <circle cx="0" cy="0" r="12" fill="#3a3020" />
        </g>
      </PLayer>

      {/* voile de grain global */}
      <rect width="1000" height="560" fill="#141008" opacity="0.06" style={{ pointerEvents: "none" }} />

      {/* zones cliquables */}
      {/* La TV — ouvre le mini-jeu « Cadre l'événement » */}
      {!made.includes("msg_evenement") && mode !== "jeu2" && (
        <Hotspot cx={500} cy={240} r={80} label="regarder le direct du JT" reveal={reveal} onClick={() => action("cadrer_evenement")} />
      )}
      {/* PNJ */}
      <Hotspot cx={720} cy={392} r={34} label="parler à Papa" reveal={reveal} onClick={() => action("papa_jt")} />
      <Hotspot cx={160} cy={410} r={30} label="parler à Maman" reveal={reveal} onClick={() => action("maman_jt")} />
      <Hotspot cx={370} cy={490} r={28} label="parler à l'ado" reveal={reveal} onClick={() => action("ado_jt")} />
      <Hotspot cx={920} cy={400} r={30} label="parler à Grand-père" reveal={reveal} onClick={() => action("grandpere_jt")} />
    </svg>
  );
}
