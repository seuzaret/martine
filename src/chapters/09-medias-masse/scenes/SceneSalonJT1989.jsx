import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 9 — Tableau : SALON DEVANT LE JT (9 nov. 1989)
   ------------------------------------------------------------
<<<<<<< HEAD
   Vue caméra placée DERRIÈRE le canapé : le canapé occupe le
   premier plan, la famille est DE DOS, tournée vers la TV
   cathodique au fond du salon. La TV projette une lumière
   bleutée qui éclaire les nuques et les dossiers.
=======
   Une famille française rassemblée devant la TV cathodique : à
   l'écran, la chute du Mur de Berlin, EN DIRECT. Papa absorbé,
   Maman au téléphone à fil, l'ado assise au sol, grand-père
   dans le fauteuil. Cliquer sur la TV ouvre le mini-jeu
   « Cadre l'événement » — comment choisir la Une d'images du
   JT du soir change ce qu'on comprend de l'événement.
>>>>>>> origin/main
   ============================================================ */

export default function SceneSalonJT1989({ collect, action, reveal, made = [], inv = [], mode }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
<<<<<<< HEAD
        <linearGradient id="jt-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a2e22" />
          <stop offset="60%" stopColor="#2a1e14" />
          <stop offset="100%" stopColor="#180f08" />
        </linearGradient>
        <linearGradient id="jt-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a2418" />
          <stop offset="100%" stopColor="#1a0e08" />
=======
        {/* mur : papier peint 80s à motifs orange/marron */}
        <linearGradient id="jt-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c89a68" />
          <stop offset="100%" stopColor="#8a6444" />
        </linearGradient>
        <linearGradient id="jt-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a3820" />
          <stop offset="100%" stopColor="#2c1810" />
>>>>>>> origin/main
        </linearGradient>
        <linearGradient id="jt-tv-frame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a08050" />
          <stop offset="100%" stopColor="#5a3a20" />
        </linearGradient>
        <radialGradient id="jt-screen" cx="50%" cy="50%" r="60%">
<<<<<<< HEAD
          <stop offset="0%" stopColor="#c0c8c8" />
          <stop offset="100%" stopColor="#4a5058" />
        </radialGradient>
        <linearGradient id="jt-couch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6a3a1a" />
          <stop offset="100%" stopColor="#3a1e0a" />
        </linearGradient>
        {/* la lumière froide de la TV qui baigne la scène */}
        <radialGradient id="jt-tv-glow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#8ac0e8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#8ac0e8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Mur du fond, en pénombre — soirée */}
      <PLayer depth={5}>
        <rect width="1000" height="420" fill="url(#jt-wall)" />
        {/* motifs discrets papier peint 80s (losanges très pâles) */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((row) => (
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map((col) => {
            const x = 60 + col * 110 + (row % 2) * 55;
            const y = 24 + row * 40;
            return (
              <path key={`p-${row}-${col}`} d={`M${x} ${y} L${x + 8} ${y + 8} L${x} ${y + 16} L${x - 8} ${y + 8} Z`} fill="#5a4232" opacity="0.35" />
=======
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
>>>>>>> origin/main
            );
          })
        ))}
        {/* plinthe */}
<<<<<<< HEAD
        <rect y="416" width="1000" height="4" fill="#1a0e04" />
      </PLayer>

      {/* Sol : parquet + tapis entre le canapé et la TV */}
      <PLayer depth={4}>
        <rect y="420" width="1000" height="140" fill="url(#jt-floor)" />
        {/* lattes de parquet */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line key={i} x1="0" y1={430 + i * 15} x2="1000" y2={430 + i * 15} stroke="#0a0604" strokeWidth="0.6" opacity="0.5" />
        ))}
      </PLayer>

      {/* MEUBLE + TV cathodique au FOND du salon (au milieu du mur) */}
      <PLayer depth={4}>
        {/* meuble bas */}
        <rect x="410" y="340" width="180" height="72" fill="#3a2418" stroke="#1a0e04" strokeWidth="1.5" rx="2" />
        <rect x="414" y="344" width="172" height="6" fill="#4a3020" />
        {/* poignées */}
        <rect x="470" y="386" width="14" height="4" fill="#c9a54a" rx="1" />
        <rect x="516" y="386" width="14" height="4" fill="#c9a54a" rx="1" />

        {/* Magnétoscope VHS posé dessus */}
        <rect x="422" y="324" width="72" height="14" fill="#141414" stroke="#0a0a0a" strokeWidth="1" rx="1" />
        <rect x="426" y="327" width="46" height="4" fill="#2a2a2a" />
        <circle cx="484" cy="331" r="1.6" fill="#c04040">
          <animate attributeName="opacity" values="1;0.35;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <text x="430" y="336" fontFamily="ui-monospace,monospace" fontSize="4" fill="#7fd8ff">REC 20:32</text>

        {/* La TV cathodique — au fond, taille moyenne */}
        <g transform="translate(500,260)">
          <path d="M-98 -60 L98 -60 L86 62 L-86 62 Z" fill="url(#jt-tv-frame)" stroke="#1a0e04" strokeWidth="1.5" />
          <ellipse cx="0" cy="62" rx="88" ry="6" fill="#3a2418" />
          <rect x="-92" y="-56" width="184" height="122" fill="url(#jt-tv-frame)" stroke="#1a0e04" strokeWidth="1.5" rx="4" />
          {/* écran bombé avec l'image du JT */}
          <rect x="-76" y="-46" width="152" height="94" fill="url(#jt-screen)" stroke="#141410" strokeWidth="2" rx="12" />
          {/* image floue "en direct" : mur horizontal + silhouettes de foule */}
          <rect x="-70" y="-8" width="140" height="20" fill="#8a8880" opacity="0.6" />
          {[[-56, -12], [-38, -14], [-16, -10], [8, -14], [26, -10], [46, -13], [62, -11]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={1.6 + (i % 2)} fill="#2a2a20" opacity="0.7" />
          ))}
          {/* bandeau EN DIRECT rouge */}
          <rect x="-76" y="30" width="152" height="14" fill="#a02020" opacity="0.95" />
          <text x="0" y="41" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fontWeight="800" fill="#fff">◉ EN DIRECT — BERLIN</text>
          {/* scanlines cathodiques */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <line key={`sc-${i}`} x1="-76" y1={-44 + i * 10} x2="76" y2={-44 + i * 10} stroke="#000" strokeWidth="0.3" opacity="0.18" />
          ))}
          {/* deux boutons rotatifs à droite */}
          <circle cx="82" cy="-30" r="6" fill="#1a0e04" stroke="#c9a54a" strokeWidth="1" />
          <circle cx="82" cy="-8" r="6" fill="#1a0e04" stroke="#c9a54a" strokeWidth="1" />
        </g>
      </PLayer>

      {/* MAMAN debout à gauche, un peu de 3/4 : combiné à l'oreille */}
      <PLayer depth={2}>
        <g transform="translate(120,440)">
          {/* petite console + poste téléphone à cadran orange */}
          <rect x="-40" y="-24" width="80" height="30" fill="#3a2418" stroke="#1a0e04" strokeWidth="1.2" rx="2" />
          <rect x="-32" y="-42" width="64" height="24" fill="#c85030" stroke="#7a2010" strokeWidth="1" rx="3" />
          <circle cx="-8" cy="-30" r="5" fill="#1a1a1a" />
          <circle cx="-8" cy="-30" r="3" fill="#c85030" />
          {/* base du combiné qui manque (elle le tient à l'oreille) */}
          <path d="M-30 42 Q-24 20 -20 6" stroke="#1a1a1a" strokeWidth="1.4" fill="none" />
        </g>
        <g transform="translate(160,450)">
          {/* corps 3/4 : dos-face — épaulettes années 80 */}
          <path d="M-14 -30 Q0 -34 14 -30 L16 8 L-16 8 Z" fill="#4a6a94" />
          <path d="M-18 -30 L-13 -34 L-13 -22 L-18 -22 Z" fill="#4a6a94" />
          <path d="M18 -30 L13 -34 L13 -22 L18 -22 Z" fill="#4a6a94" />
          <path d="M-16 8 L16 8 L18 44 L-18 44 Z" fill="#2a3a54" />
          <rect x="-6" y="44" width="4" height="20" fill="#c9a878" />
          <rect x="2" y="44" width="4" height="20" fill="#c9a878" />
          <ellipse cx="-4" cy="66" rx="6" ry="2" fill="#1a1410" />
          <ellipse cx="4" cy="66" rx="6" ry="2" fill="#1a1410" />
          {/* bras qui remonte vers l'oreille (elle tient le combiné) */}
          <path d="M-14 -22 L-24 -34 L-22 -40" stroke="#4a6a94" strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* tête vue de 3/4 (léger profil vers la TV à droite) */}
          <circle cx="-4" cy="-40" r="10" fill="#f0d0a8" />
          {/* coupe carrée blonde */}
          <path d="M-14 -46 Q-4 -54 6 -46 L6 -32 L-14 -32 Z" fill="#e8c878" />
=======
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
>>>>>>> origin/main
          {/* combiné à l'oreille */}
          <rect x="-24" y="-46" width="10" height="10" fill="#c85030" stroke="#7a2010" strokeWidth="0.6" rx="1" />
        </g>
      </PLayer>

<<<<<<< HEAD
      {/* GRAND-PÈRE dans son fauteuil bordeaux, à droite, vu de 3/4 dos */}
      <PLayer depth={2}>
        <g transform="translate(890,440)">
          {/* fauteuil (vu presque de dos, incliné vers la TV à gauche) */}
          <path d="M-52 -76 L52 -80 L58 34 L-58 34 Z" fill="#5a2020" />
          <path d="M-64 -30 L64 -34 L64 -12 L-64 -12 Z" fill="#5a2020" />
          {/* accoudoir visible à droite */}
          <rect x="42" y="-72" width="20" height="90" fill="#4a1818" rx="8" />

          {/* Grand-père, on voit sa nuque + un peu de son profil (regard vers la TV côté gauche) */}
          <g transform="translate(-8,-40)">
            {/* haut du crâne / nuque avec cheveux blancs */}
            <ellipse cx="0" cy="-4" rx="14" ry="18" fill="#e8c8a8" />
            <path d="M-14 -12 Q-10 -22 0 -22 Q10 -22 14 -12 L14 -6 L-14 -6 Z" fill="#f0eae0" />
            {/* petite oreille visible côté gauche */}
            <ellipse cx="-13" cy="-2" rx="2.5" ry="4" fill="#e0b898" />
            {/* branche de lunettes qui dépasse */}
            <line x1="-13" y1="-4" x2="-6" y2="-2" stroke="#1a1a1a" strokeWidth="0.8" />
            {/* épaules avec gilet gris-beige */}
            <path d="M-16 12 Q0 8 16 12 L16 30 L-16 30 Z" fill="#7a6a5a" />
          </g>
        </g>
      </PLayer>

      {/* Tapis au SOL entre le canapé (au premier plan) et la TV */}
      <PLayer depth={3}>
        <ellipse cx="500" cy="480" rx="320" ry="26" fill="#7a2a2a" opacity="0.75" />
        <ellipse cx="500" cy="480" rx="300" ry="22" fill="none" stroke="#c9a54a" strokeWidth="1.2" opacity="0.7" />
        {[-3, -2, -1, 0, 1, 2, 3].map((i) => (
          <circle key={i} cx={500 + i * 68} cy="480" r="6" fill="none" stroke="#c9a54a" strokeWidth="0.9" opacity="0.55" />
        ))}
        {/* ADO assise au sol devant le canapé, dos au spectateur */}
        <g transform="translate(400,504)">
          {/* silhouette de dos */}
          <path d="M-16 -18 Q0 -22 16 -18 L18 20 L-18 20 Z" fill="#e878a0" />
          {/* cheveux longs noirs */}
          <path d="M-10 -22 Q-14 -8 -10 6 M10 -22 Q14 -8 10 6" stroke="#1a1a1a" strokeWidth="8" fill="none" />
          <circle cx="0" cy="-28" r="9" fill="#f0d0a8" />
          {/* chouchou rose */}
          <ellipse cx="4" cy="-36" rx="4" ry="2.5" fill="#f8b0c8" />
          {/* jambes en jean par terre */}
          <path d="M-14 20 L14 20 L12 34 L-12 34 Z" fill="#3a5074" />
        </g>
      </PLayer>

      {/* CANAPÉ AU PREMIER PLAN, VU DE DOS, avec papa + un(e) autre membre
         de la famille dont on ne voit que la nuque */}
      <PLayer depth={1}>
        <g transform="translate(500,540)">
          {/* dossier haut du canapé, vu de dos, large et bas de l'écran */}
          <rect x="-260" y="-140" width="520" height="100" fill="url(#jt-couch)" rx="14" />
          {/* rainures velours cotelé */}
          {[-220, -180, -140, -100, -60, -20, 20, 60, 100, 140, 180, 220].map((x) => (
            <line key={x} x1={x} y1="-138" x2={x} y2="-42" stroke="#2a0e04" strokeWidth="0.6" opacity="0.5" />
          ))}
          {/* haut arrondi du dossier */}
          <path d="M-260 -140 Q0 -168 260 -140" fill="none" stroke="#2a0e04" strokeWidth="2" />
          {/* accoudoirs qui remontent sur les côtés */}
          <rect x="-282" y="-140" width="24" height="120" fill="url(#jt-couch)" rx="10" />
          <rect x="258" y="-140" width="24" height="120" fill="url(#jt-couch)" rx="10" />
          {/* base */}
          <rect x="-282" y="-40" width="564" height="40" fill="#2a0e04" />

          {/* PAPA, vu de dos — juste nuque + haut des épaules qui dépassent */}
          <g transform="translate(-90,-130)">
            {/* haut du crâne */}
            <ellipse cx="0" cy="-8" rx="14" ry="16" fill="#e8bfa0" />
            {/* cheveux courts brun */}
            <path d="M-13 -16 Q0 -22 13 -16 L13 -4 L-13 -4 Z" fill="#3a2418" />
            {/* col du pull qui dépasse au-dessus du dossier */}
            <path d="M-18 10 L18 10 L18 18 L-18 18 Z" fill="#3a4a5a" opacity="0.85" />
            {/* main qui tient une cigarette, dépasse sur le côté droit du dossier */}
            <g transform="translate(30,26)">
              <ellipse cx="0" cy="0" rx="4" ry="3" fill="#e8bfa0" />
              <line x1="4" y1="0" x2="14" y2="-4" stroke="#f0eae0" strokeWidth="1.4" />
              <ellipse cx="14" cy="-4" rx="1.2" ry="0.6" fill="#ff8a30">
                <animate attributeName="opacity" values="1;0.4;1" dur="2.4s" repeatCount="indefinite" />
              </ellipse>
              {/* fumée qui monte */}
              <ellipse cx="18" cy="-14" rx="2.5" ry="1.3" fill="#e8e0d0" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="cy" values="-14;-26" dur="2.4s" repeatCount="indefinite" />
              </ellipse>
              <ellipse cx="22" cy="-22" rx="3.5" ry="1.6" fill="#d8d0c0" opacity="0.35">
                <animate attributeName="opacity" values="0.35;0" dur="3s" begin="0.4s" repeatCount="indefinite" />
                <animate attributeName="cy" values="-22;-38" dur="3s" begin="0.4s" repeatCount="indefinite" />
              </ellipse>
            </g>
          </g>

          {/* Un frère ou sœur assis(e) sur le canapé, à droite, vue de dos */}
          <g transform="translate(70,-128)">
            <ellipse cx="0" cy="-6" rx="13" ry="15" fill="#f0d0a8" />
            {/* cheveux mi-longs châtains */}
            <path d="M-13 -12 Q0 -20 13 -12 L14 8 L-14 8 Z" fill="#7a5030" />
            {/* col d'un T-shirt orange 80s qui dépasse */}
            <path d="M-16 10 L16 10 L18 18 L-18 18 Z" fill="#c85030" opacity="0.9" />
          </g>
=======
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
>>>>>>> origin/main
        </g>
      </PLayer>

      {/* voile de grain global */}
      <rect width="1000" height="560" fill="#141008" opacity="0.06" style={{ pointerEvents: "none" }} />

      {/* zones cliquables */}
<<<<<<< HEAD
      {/* La TV — ouvre le mini-jeu Cadrer l'événement */}
      {!made.includes("msg_evenement") && mode !== "jeu2" && (
        <Hotspot cx={500} cy={260} r={80} label="regarder le direct du JT" reveal={reveal} onClick={() => action("cadrer_evenement")} />
      )}
      {/* PNJ — cliquer sur les têtes qui dépassent du dossier / autour du canapé */}
      <Hotspot cx={410} cy={410} r={26} label="parler à Papa" reveal={reveal} onClick={() => action("papa_jt")} />
      <Hotspot cx={155} cy={410} r={28} label="parler à Maman" reveal={reveal} onClick={() => action("maman_jt")} />
      <Hotspot cx={400} cy={484} r={28} label="parler à l'ado" reveal={reveal} onClick={() => action("ado_jt")} />
      <Hotspot cx={880} cy={402} r={30} label="parler à Grand-père" reveal={reveal} onClick={() => action("grandpere_jt")} />
=======
      {/* La TV — ouvre le mini-jeu « Cadre l'événement » */}
      {!made.includes("msg_evenement") && mode !== "jeu2" && (
        <Hotspot cx={500} cy={240} r={80} label="regarder le direct du JT" reveal={reveal} onClick={() => action("cadrer_evenement")} />
      )}
      {/* PNJ */}
      <Hotspot cx={720} cy={392} r={34} label="parler à Papa" reveal={reveal} onClick={() => action("papa_jt")} />
      <Hotspot cx={160} cy={410} r={30} label="parler à Maman" reveal={reveal} onClick={() => action("maman_jt")} />
      <Hotspot cx={370} cy={490} r={28} label="parler à l'ado" reveal={reveal} onClick={() => action("ado_jt")} />
      <Hotspot cx={920} cy={400} r={30} label="parler à Grand-père" reveal={reveal} onClick={() => action("grandpere_jt")} />
>>>>>>> origin/main
    </svg>
  );
}
