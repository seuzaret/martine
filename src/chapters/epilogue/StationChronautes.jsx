import { useState } from "react";

/* ============================================================
   STATION DES CHRONAUTES — la scène du futur
   ------------------------------------------------------------
   S'affiche juste après le saut depuis le DERNIER chapitre.
   Décor post-apo LUMINEUX (dôme géodésique bricolé, panneaux
   solaires patchés, jardins hydroponiques, MARTINE-jumelle
   rangée avec un ruban de deuil). Séquence de dialogues
   scriptée : Elias, Mira, portrait-cadre de Camille.
   Fin de la séquence : bouton « Continuer » → épilogue.
   ============================================================ */

const DIALOGUES = [
  { perso: "elias", mood: "content",
    text: "Te voilà. Tu ne me connais pas encore. Moi, si — j'ai lu tes messages, ceux qui nous sont parvenus. Bienvenue à la station des chronautes." },
  { perso: "elias", mood: "neutre",
    text: "Nous sommes en 2287. Il y a longtemps, tout le numérique s'est éteint d'un coup. Un jour, deux jours, plus rien. Ni serveurs, ni disques, ni photos. Cinq siècles de mémoire humaine, envolés." },
  { perso: "elias", mood: "content",
    text: "On a survécu grâce à ce qui restait sur les vieux murs, dans les vieux livres, gravé, imprimé, brodé. Grâce à toi, à ta traversée des époques, on connaît enfin CE QUI DURE. Tu viens de nous rendre notre mémoire, morceau par morceau." },
  { perso: "mira", mood: "neutre",
    text: "Salut, moi c'est Mira. Je suis l'ingénieure de la station. Cette machine, à côté de la tienne… c'est sa sœur. Elle est là depuis dix ans. Elle attend Camille, sa pilote." },
  { perso: "elias", mood: "vexe",
    text: "Il y a autre chose. Un mal étrange nous ronge : on perd nos souvenirs, un peu chaque jour. Ceux qui l'oublient tout, oublient qu'ils l'oublient. C'est cruel." },
  { perso: "camille", mood: "neutre",
    text: "Camille est partie il y a longtemps, dans le passé, chercher un remède. Elle savait où aller. Elle ne nous a jamais donné signe de vie. On l'attend." },
  { perso: "elias", mood: "content",
    text: "Tu es le seul, aujourd'hui, à avoir traversé les époques comme elle. Tu la retrouverais ?" },
];

/* -------------------- PORTRAITS SVG -------------------- */
function PortraitElias({ mood = "neutre" }) {
  const eyes = mood === "content" ? -1 : mood === "vexe" ? 1.5 : 0;
  return (
    <svg viewBox="0 0 200 240" style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <linearGradient id="el-tunique" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c8a878" /><stop offset="100%" stopColor="#8a6848" /></linearGradient>
      </defs>
      <rect width="200" height="240" fill="#2a3040" />
      {/* halo doux derrière */}
      <circle cx="100" cy="90" r="80" fill="#f8e0a0" opacity="0.15" />
      {/* épaules et tunique en lin brut */}
      <path d="M20 240 L20 190 Q20 160 60 150 L140 150 Q180 160 180 190 L180 240 Z" fill="url(#el-tunique)" stroke="#5a3818" strokeWidth="1.5" />
      {/* col ouvert */}
      <path d="M60 150 L100 175 L140 150" stroke="#5a3818" strokeWidth="1.5" fill="none" />
      {/* cou */}
      <ellipse cx="100" cy="135" rx="18" ry="14" fill="#e0b898" />
      {/* tête */}
      <ellipse cx="100" cy="80" rx="52" ry="60" fill="#e0b898" stroke="#5a3818" strokeWidth="1.5" />
      {/* cheveux blancs mi-longs */}
      <path d="M52 60 Q60 20 100 18 Q140 20 148 60 Q152 90 145 105 L138 100 Q140 60 130 45 Q100 30 70 45 Q60 60 62 100 L55 105 Q48 90 52 60 Z" fill="#e8e8e0" stroke="#8a8880" strokeWidth="1" />
      {/* barbe blanche courte */}
      <path d="M60 115 Q80 145 100 148 Q120 145 140 115 Q140 130 125 140 Q100 145 75 140 Q60 130 60 115 Z" fill="#e8e8e0" stroke="#8a8880" strokeWidth="0.6" />
      {/* moustache */}
      <path d="M78 108 Q90 112 100 110 Q110 112 122 108 Q118 115 100 115 Q82 115 78 108 Z" fill="#e8e8e0" />
      {/* yeux sages */}
      <ellipse cx="82" cy="82" rx="6" ry="4" fill="#f8f4e8" />
      <ellipse cx="118" cy="82" rx="6" ry="4" fill="#f8f4e8" />
      <circle cx={82 + eyes} cy="82" r="2.6" fill="#2a3860" />
      <circle cx={118 + eyes} cy="82" r="2.6" fill="#2a3860" />
      {/* sourcils blancs broussailleux */}
      <path d="M74 72 q6 -4 16 -2 M112 70 q6 -4 16 2" stroke="#e8e8e0" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* rides autour des yeux */}
      <path d="M70 88 q4 4 8 4 M126 88 q-4 4 -8 4" stroke="#8a6828" strokeWidth="0.6" fill="none" opacity="0.5" />
      {/* nez */}
      <path d="M100 88 L96 105 L104 105" stroke="#8a6828" strokeWidth="1" fill="none" />
      {/* bouche */}
      {mood === "content"
        ? <path d="M84 122 Q100 132 116 122" stroke="#5a3818" strokeWidth="2" fill="none" strokeLinecap="round" />
        : mood === "vexe"
        ? <path d="M84 128 Q100 122 116 128" stroke="#5a3818" strokeWidth="2" fill="none" strokeLinecap="round" />
        : <path d="M86 125 L114 125" stroke="#5a3818" strokeWidth="2" strokeLinecap="round" />}
      {/* petite médaille pendue au cou (symbole des chronautes) */}
      <circle cx="100" cy="180" r="8" fill="#c8a848" stroke="#8a6820" strokeWidth="1" />
      <path d="M100 172 L100 168" stroke="#8a6820" strokeWidth="1" />
      <text x="100" y="184" textAnchor="middle" fontSize="10" fontWeight="800" fill="#5a4020">🕰</text>
    </svg>
  );
}

function PortraitMira({ mood = "neutre" }) {
  const eyes = mood === "content" ? -1 : mood === "vexe" ? 1.5 : 0;
  return (
    <svg viewBox="0 0 200 240" style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <linearGradient id="mi-veste" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3a5878" /><stop offset="100%" stopColor="#1a3858" /></linearGradient>
      </defs>
      <rect width="200" height="240" fill="#2a3040" />
      <circle cx="100" cy="90" r="80" fill="#7fd8ff" opacity="0.12" />
      {/* épaules / veste d'ingénieure avec pièces cousues */}
      <path d="M20 240 L20 185 Q20 155 55 148 L145 148 Q180 155 180 185 L180 240 Z" fill="url(#mi-veste)" stroke="#0e1830" strokeWidth="1.5" />
      {/* poche avec outils */}
      <rect x="60" y="180" width="30" height="24" fill="#2a4868" stroke="#0e1830" strokeWidth="0.8" />
      <path d="M68 176 L68 172 L76 172 L76 176 M82 176 L82 172 L88 172 L88 176" stroke="#c8b8a0" strokeWidth="1.4" />
      {/* col en V */}
      <path d="M60 148 L100 168 L140 148" stroke="#0e1830" strokeWidth="1.5" fill="none" />
      {/* cou */}
      <ellipse cx="100" cy="135" rx="16" ry="12" fill="#c8946a" />
      {/* tête ovale */}
      <ellipse cx="100" cy="80" rx="50" ry="58" fill="#c8946a" stroke="#5a3818" strokeWidth="1.5" />
      {/* tresses noires attachées de chaque côté */}
      <path d="M52 60 Q52 30 78 22 Q92 20 100 22 Q108 20 122 22 Q148 30 148 60 L150 90 L142 88 Q145 60 138 45 Q125 30 100 28 Q75 30 62 45 Q55 60 58 88 L50 90 Z" fill="#1a1408" />
      {/* tresses qui descendent */}
      <path d="M52 70 Q42 100 46 140 L52 138 Q50 100 58 74 Z" fill="#1a1408" />
      <path d="M148 70 Q158 100 154 140 L148 138 Q150 100 142 74 Z" fill="#1a1408" />
      {/* rubans de couleur dans les tresses */}
      <rect x="45" y="115" width="10" height="4" fill="#e86028" />
      <rect x="145" y="115" width="10" height="4" fill="#7fd8ff" />
      {/* yeux vifs */}
      <ellipse cx="82" cy="82" rx="6" ry="4.5" fill="#f8f4e8" />
      <ellipse cx="118" cy="82" rx="6" ry="4.5" fill="#f8f4e8" />
      <circle cx={82 + eyes} cy="82" r="2.8" fill="#2a1810" />
      <circle cx={118 + eyes} cy="82" r="2.8" fill="#2a1810" />
      {/* sourcils marqués */}
      <path d="M74 72 q6 -3 16 -1 M112 71 q6 -3 16 1" stroke="#1a1408" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {/* nez */}
      <path d="M100 88 L97 105 L103 105" stroke="#8a5828" strokeWidth="1" fill="none" />
      {/* bouche */}
      {mood === "content"
        ? <path d="M84 120 Q100 130 116 120" stroke="#5a1818" strokeWidth="2" fill="none" strokeLinecap="round" />
        : mood === "vexe"
        ? <path d="M84 126 Q100 120 116 126" stroke="#5a1818" strokeWidth="2" fill="none" strokeLinecap="round" />
        : <path d="M86 124 L114 124" stroke="#5a1818" strokeWidth="2" strokeLinecap="round" />}
      {/* rouge à lèvres discret */}
      <path d="M84 120 Q100 128 116 120" stroke="#c85028" strokeWidth="0.8" fill="none" opacity="0.6" />
      {/* boucle d'oreille en spirale */}
      <circle cx="50" cy="100" r="3" fill="none" stroke="#c8a848" strokeWidth="1.2" />
      <circle cx="150" cy="100" r="3" fill="none" stroke="#c8a848" strokeWidth="1.2" />
    </svg>
  );
}

/* Camille apparaît dans un CADRE-photo posé sur la MARTINE-jumelle. */
function PortraitCamilleCadre({ mood = "neutre" }) {
  return (
    <svg viewBox="0 0 200 240" style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <linearGradient id="ca-tunique" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a0a0b0" /><stop offset="100%" stopColor="#606878" /></linearGradient>
      </defs>
      <rect width="200" height="240" fill="#181820" />
      {/* cadre-photo en bois patiné */}
      <rect x="16" y="16" width="168" height="208" fill="none" stroke="#8a6838" strokeWidth="8" />
      <rect x="22" y="22" width="156" height="196" fill="#2a2830" />
      {/* halo mémoire */}
      <circle cx="100" cy="100" r="70" fill="#f0e0c0" opacity="0.12" />
      {/* ruban noir de deuil sur le coin haut-droit du cadre */}
      <path d="M170 20 L184 20 L184 40 L172 46 L162 40 Z" fill="#1a1408" opacity="0.9" />
      <path d="M174 24 l6 8" stroke="#3a2818" strokeWidth="0.6" />
      {/* épaules / tunique de voyage grise */}
      <path d="M30 220 L30 175 Q30 150 60 143 L140 143 Q170 150 170 175 L170 220 Z" fill="url(#ca-tunique)" stroke="#3a4048" strokeWidth="1.2" />
      {/* insigne chronaute sur l'épaule (petit compas) */}
      <circle cx="60" cy="165" r="7" fill="#c8a848" stroke="#5a4020" strokeWidth="0.8" />
      <path d="M60 160 L60 170 M55 165 L65 165" stroke="#5a4020" strokeWidth="0.8" />
      {/* cou */}
      <ellipse cx="100" cy="132" rx="15" ry="12" fill="#d0a888" />
      {/* tête ovale */}
      <ellipse cx="100" cy="80" rx="48" ry="56" fill="#d0a888" stroke="#5a3818" strokeWidth="1.2" />
      {/* cheveux mi-longs attachés (chignon flou), traits androgynes */}
      <path d="M55 62 Q60 25 100 22 Q140 25 145 62 L148 90 L140 88 Q142 60 132 45 Q100 30 68 45 Q58 60 60 88 L52 90 Z" fill="#4a3828" />
      {/* frange souple */}
      <path d="M65 55 Q75 40 100 42 Q125 40 135 55 Q125 62 100 60 Q75 62 65 55 Z" fill="#3a2818" />
      {/* petit chignon sur le côté */}
      <ellipse cx="145" cy="70" rx="8" ry="6" fill="#4a3828" />
      {/* yeux calmes, ouverts */}
      <ellipse cx="82" cy="82" rx="6" ry="4" fill="#f8f4e8" />
      <ellipse cx="118" cy="82" rx="6" ry="4" fill="#f8f4e8" />
      <circle cx="82" cy="82" r="2.6" fill="#3a2818" />
      <circle cx="118" cy="82" r="2.6" fill="#3a2818" />
      {/* sourcils fins et doux */}
      <path d="M74 74 q8 -3 16 -1 M112 73 q8 -3 16 1" stroke="#3a2818" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* nez fin */}
      <path d="M100 88 L98 105 L102 105" stroke="#8a5828" strokeWidth="0.8" fill="none" />
      {/* léger sourire mystérieux */}
      <path d="M86 122 Q100 128 114 122" stroke="#5a2818" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* légère cicatrice fine sur la joue (souvenir de voyage) */}
      <path d="M124 92 l4 8" stroke="#8a5828" strokeWidth="0.6" opacity="0.6" />
      {/* légende sous le portrait */}
      <text x="100" y="235" textAnchor="middle" fontSize="9" fontFamily="ui-monospace,monospace" letterSpacing="1.5" fill="#8a7860">CAMILLE — DISPARUE 2277</text>
    </svg>
  );
}

const PORTRAITS = { elias: PortraitElias, mira: PortraitMira, camille: PortraitCamilleCadre };
const NAMES = { elias: "Elias", mira: "Mira", camille: "Photo de Camille" };

/* -------------------- DÉCOR DE LA STATION -------------------- */
function DecorStation() {
  return (
    <svg viewBox="0 0 1000 560" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="st-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5878a8" /><stop offset="60%" stopColor="#c8b878" /><stop offset="100%" stopColor="#e0c898" /></linearGradient>
        <linearGradient id="st-sol" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a7858" /><stop offset="100%" stopColor="#3a2818" /></linearGradient>
        <linearGradient id="st-dome" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a8b8c8" stopOpacity="0.7" /><stop offset="100%" stopColor="#5a6878" stopOpacity="0.85" /></linearGradient>
        <radialGradient id="st-sun" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#fff4c8" stopOpacity="0.7" /><stop offset="100%" stopColor="#f8c058" stopOpacity="0" /></radialGradient>
      </defs>
      {/* CIEL doux post-apo lumineux */}
      <rect width="1000" height="380" fill="url(#st-sky)" />
      {/* soleil chaleureux */}
      <circle cx="180" cy="120" r="100" fill="url(#st-sun)" />
      <circle cx="180" cy="120" r="28" fill="#fff4c8" opacity="0.9" />
      {/* nuages */}
      <ellipse cx="440" cy="90" rx="120" ry="8" fill="#f0e0c0" opacity="0.55" />
      <ellipse cx="740" cy="130" rx="100" ry="6" fill="#f0e0c0" opacity="0.5" />
      {/* Collines lointaines avec vestiges de villes */}
      <path d="M0 340 L0 260 Q100 240 200 250 Q300 260 400 245 Q500 260 600 240 Q700 260 800 245 Q900 260 1000 250 L1000 340 Z" fill="#6a7898" opacity="0.6" />
      {/* silhouettes de gratte-ciels effondrés au loin */}
      {[[220, 260, 40, 60], [340, 245, 30, 75], [610, 240, 45, 80], [780, 250, 35, 65], [880, 245, 40, 70]].map(([x, y, w, h], i) => (
        <g key={i} opacity="0.7">
          <path d={`M${x} ${y} L${x} ${y - h} L${x + w * 0.6} ${y - h + 8} L${x + w * 0.6} ${y - h * 0.7} L${x + w} ${y - h * 0.6} L${x + w} ${y}`} fill="#3a4858" />
          {/* fenêtres cassées */}
          <path d={`M${x + 4} ${y - h * 0.7} l3 3 M${x + 12} ${y - h * 0.5} l3 3 M${x + 20} ${y - h * 0.3} l3 3`} stroke="#7a8898" strokeWidth="0.5" opacity="0.6" />
        </g>
      ))}
      {/* nature reprend ses droits — mousses vertes sur les vestiges */}
      <path d="M200 258 q6 -6 12 0 M340 244 q4 -4 8 0 M620 240 q6 -4 12 0" stroke="#5a7048" strokeWidth="1.5" fill="none" opacity="0.7" />

      {/* SOL de terre battue avec chemin en dalles */}
      <rect y="340" width="1000" height="220" fill="url(#st-sol)" />
      {/* jardins hydroponiques en rangs (arrière-plan) */}
      {[[100, 380], [220, 388], [340, 380], [880, 388]].map(([x, y], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx="60" ry="8" fill="#3a4a28" opacity="0.7" />
          {[0, 15, 30, 45].map((dx, j) => (
            <path key={j} d={`M${x - 40 + dx * 2} ${y - 4} q2 -8 4 -12`} stroke="#4a6a30" strokeWidth="1.4" fill="none" />
          ))}
        </g>
      ))}

      {/* ÉOLIENNE bricolée à gauche */}
      <g transform="translate(80,340)">
        <rect x="-3" y="0" width="6" height="-80" fill="#8a8890" />
        <circle cx="0" cy="-80" r="4" fill="#5a5860" />
        {/* pales en tôle rouillée */}
        <g style={{ animation: "spin 8s linear infinite", transformOrigin: "0 -80px" }}>
          <path d="M0 -80 L-3 -110 L3 -110 Z" fill="#a06848" />
          <path d="M0 -80 L26 -70 L26 -66 Z" fill="#a06848" />
          <path d="M0 -80 L-3 -50 L3 -50 Z" fill="#a06848" />
          <path d="M0 -80 L-26 -90 L-26 -94 Z" fill="#a06848" />
        </g>
      </g>

      {/* PANNEAUX SOLAIRES patchés à droite */}
      <g transform="translate(900,360)">
        {/* structure */}
        <path d="M-40 0 L40 0 L60 -60 L-20 -60 Z" fill="#1a2038" stroke="#3a4058" strokeWidth="1" />
        {/* cellules avec quelques manquantes/patch */}
        {[[-30, -50], [-10, -50], [10, -50], [30, -50], [-25, -30], [-5, -30], [15, -30], [35, -30], [-20, -10], [0, -10], [20, -10], [40, -10]].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="16" height="14" fill={i === 3 || i === 8 ? "#5a3818" : "#3a5090"} stroke="#0a1830" strokeWidth="0.4" />
        ))}
        {/* support */}
        <rect x="-4" y="0" width="8" height="20" fill="#5a5860" />
      </g>

      {/* DÔME GÉODÉSIQUE bricolé au centre-arrière */}
      <g transform="translate(500,380)">
        {/* base */}
        <ellipse cx="0" cy="10" rx="140" ry="12" fill="#1a1408" opacity="0.55" />
        {/* dôme */}
        <path d="M-140 8 A 140 100 0 0 1 140 8 Z" fill="url(#st-dome)" stroke="#3a4858" strokeWidth="1.5" />
        {/* nervures géodésiques (triangles) */}
        <path d="M-140 8 L-90 -70 L-30 -95 L30 -95 L90 -70 L140 8 M-140 8 L-70 -90 L0 -100 L70 -90 L140 8 M-90 -70 L-30 -95 L-70 -50 L-30 -95 L0 -60 L30 -95 L70 -50 L90 -70" stroke="#3a4858" strokeWidth="0.8" fill="none" opacity="0.7" />
        {/* patch de bâche colorée sur un triangle (pièce cousue) */}
        <path d="M-70 -50 L-30 -95 L0 -60 Z" fill="#a04828" opacity="0.5" />
        {/* porte au centre */}
        <path d="M-16 8 L-16 -20 Q-16 -30 0 -30 Q16 -30 16 -20 L16 8 Z" fill="#3a2818" stroke="#1a1408" strokeWidth="0.8" />
        <circle cx="10" cy="-10" r="1.4" fill="#c8a848" />
        {/* lumière chaleureuse qui filtre */}
        <path d="M-14 6 L14 6 L14 -18 L-14 -18 Z" fill="#f8d878" opacity="0.35" />
        {/* antenne + reception au sommet */}
        <path d="M0 -105 L0 -130" stroke="#5a5860" strokeWidth="1.5" />
        <circle cx="0" cy="-135" r="4" fill="#5eff9e" style={{ animation: "pulse 2s infinite" }} />
      </g>

      {/* MARTINE-JUMELLE (Camille) posée sur une plateforme à droite du dôme */}
      <g transform="translate(720,410)">
        {/* plateforme */}
        <rect x="-40" y="0" width="80" height="30" fill="#5a5860" stroke="#1a1408" strokeWidth="1" />
        <rect x="-42" y="-2" width="84" height="4" fill="#3a4048" />
        {/* corps noix de la MARTINE, poussière/patine */}
        <ellipse cx="0" cy="-24" rx="30" ry="28" fill="#7a5028" stroke="#3a1810" strokeWidth="1.5" opacity="0.85" />
        <path d="M-22 -34 q22 -8 44 0 M-24 -24 q24 -6 48 0 M-22 -14 q22 -6 44 0" stroke="#3a1810" strokeWidth="0.4" fill="none" opacity="0.5" />
        {/* œil éteint (gris/noir) */}
        <circle cx="0" cy="-28" r="10" fill="#3a3838" stroke="#1a1408" strokeWidth="1" />
        <circle cx="0" cy="-28" r="4" fill="#1a1808" />
        {/* antenne pliée */}
        <path d="M0 -50 L4 -60 L-2 -68" stroke="#3a2018" strokeWidth="1.5" fill="none" />
        <circle cx="-2" cy="-68" r="2.4" fill="#5a5858" />
        {/* RUBAN NOIR DE DEUIL noué autour du milieu */}
        <path d="M-32 -20 Q0 -14 32 -20 L34 -14 Q0 -8 -34 -14 Z" fill="#1a1408" stroke="#0a0806" strokeWidth="0.5" />
        <path d="M-4 -10 L-8 4 L-2 -2 L2 -2 L8 4 L4 -10" fill="#1a1408" stroke="#0a0806" strokeWidth="0.5" />
        {/* petite plaque gravée */}
        <rect x="-24" y="8" width="48" height="10" fill="#c8b8a0" stroke="#5a4028" strokeWidth="0.5" />
        <text x="0" y="16" textAnchor="middle" fontSize="6" fontFamily="Georgia, serif" fontWeight="700" fill="#3a2818">CAMILLE · 2277</text>
      </g>

      {/* ELIAS debout au centre-gauche */}
      <g transform="translate(340,430)">
        <ellipse cx="0" cy="94" rx="30" ry="4" fill="#0a0604" opacity="0.55" />
        {/* jambes en pantalon de lin */}
        <rect x="-14" y="30" width="10" height="70" fill="#8a6848" stroke="#5a3820" strokeWidth="0.6" />
        <rect x="4" y="30" width="10" height="70" fill="#8a6848" stroke="#5a3820" strokeWidth="0.6" />
        {/* tunique large */}
        <path d="M-24 40 Q-26 -14 -4 -24 L4 -24 Q26 -14 24 40 Z" fill="#c8a878" stroke="#5a3818" strokeWidth="0.8" />
        <path d="M-6 -22 L-6 40 M6 -22 L6 40" stroke="#8a6848" strokeWidth="0.5" />
        {/* épaules */}
        <ellipse cx="-22" cy="-12" rx="6" ry="5" fill="#e0b898" />
        <ellipse cx="22" cy="-12" rx="6" ry="5" fill="#e0b898" />
        {/* bras qui s'ouvrent en accueil */}
        <path d="M-22 -10 Q-38 8 -42 32" stroke="#e0b898" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M22 -10 Q38 8 42 32" stroke="#e0b898" strokeWidth="8" fill="none" strokeLinecap="round" />
        {/* tête */}
        <ellipse cx="0" cy="-42" rx="14" ry="18" fill="#e0b898" stroke="#5a3818" strokeWidth="0.8" />
        {/* cheveux blancs */}
        <path d="M-12 -50 q4 -18 12 -20 q8 2 12 20 q-4 -4 -12 -2 q-8 -2 -12 2 Z" fill="#e8e8e0" />
        {/* barbe */}
        <path d="M-9 -34 q9 12 18 0 q-1 8 -5 12 q-5 3 -8 0 q-4 -4 -5 -12 z" fill="#e8e8e0" />
        <circle cx="-4" cy="-42" r="1.4" fill="#2a3860" />
        <circle cx="4" cy="-42" r="1.4" fill="#2a3860" />
        {/* médaille au cou */}
        <circle cx="0" cy="-12" r="5" fill="#c8a848" stroke="#8a6820" strokeWidth="0.6" />
      </g>

      {/* MIRA à droite du dôme, s'appuie sur la MARTINE-jumelle */}
      <g transform="translate(660,470)">
        <ellipse cx="0" cy="54" rx="24" ry="4" fill="#0a0604" opacity="0.55" />
        {/* jambes en salopette */}
        <rect x="-10" y="-4" width="8" height="60" fill="#3a5878" stroke="#0e1830" strokeWidth="0.6" />
        <rect x="2" y="-4" width="8" height="60" fill="#3a5878" stroke="#0e1830" strokeWidth="0.6" />
        {/* torse en veste d'ingénieure */}
        <path d="M-18 4 Q-20 -22 -4 -30 L4 -30 Q20 -22 18 4 Z" fill="#3a5878" stroke="#0e1830" strokeWidth="0.6" />
        {/* poche outils */}
        <rect x="-14" y="-14" width="12" height="14" fill="#2a4868" stroke="#0e1830" strokeWidth="0.4" />
        <path d="M-11 -18 L-11 -22 L-6 -22 L-6 -18" stroke="#c8b8a0" strokeWidth="1.2" />
        {/* épaules bronzées */}
        <ellipse cx="-16" cy="-18" rx="5" ry="4" fill="#c8946a" />
        <ellipse cx="16" cy="-18" rx="5" ry="4" fill="#c8946a" />
        {/* bras droit qui pointe la MARTINE-jumelle (main tendue) */}
        <path d="M18 -14 Q30 -22 44 -30" stroke="#c8946a" strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* tête */}
        <ellipse cx="0" cy="-42" rx="12" ry="14" fill="#c8946a" stroke="#5a3818" strokeWidth="0.6" />
        {/* tresses attachées */}
        <path d="M-12 -50 q4 -14 12 -14 q8 0 12 14 q-4 -2 -12 0 q-8 -2 -12 0 Z" fill="#1a1408" />
        <path d="M-12 -40 L-14 -14 M12 -40 L14 -14" stroke="#1a1408" strokeWidth="3" strokeLinecap="round" />
        {/* rubans dans les tresses */}
        <rect x="-15" y="-24" width="4" height="2" fill="#e86028" />
        <rect x="11" y="-24" width="4" height="2" fill="#7fd8ff" />
        <circle cx="-4" cy="-42" r="1.4" fill="#2a1810" />
        <circle cx="4" cy="-42" r="1.4" fill="#2a1810" />
      </g>
    </svg>
  );
}

/* -------------------- LE COMPOSANT PRINCIPAL -------------------- */
export default function StationChronautes({ prenom, onContinue }) {
  const [idx, setIdx] = useState(0);
  const step = DIALOGUES[idx];
  const isLast = idx >= DIALOGUES.length - 1;
  const Portrait = PORTRAITS[step.perso];
  const persoName = NAMES[step.perso];

  return (
    <div style={{ height: "100dvh", overflow: "hidden", background: "#080d16", display: "flex", flexDirection: "column", position: "relative" }}>
      {/* Décor plein cadre */}
      <div style={{ position: "absolute", inset: 0 }}>
        <DecorStation />
      </div>
      {/* bandeau titre */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "10px 12px 0", background: "linear-gradient(180deg,#0c1220ee 0%,#0c122000 100%)" }}>
        <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 3, color: "#ffd166" }}>ÉPILOGUE · LA STATION DES CHRONAUTES · 2287</div>
      </div>

      {/* espaceur pour laisser voir le décor */}
      <div style={{ flex: 1 }} />

      {/* Portrait + dialogue collés en bas */}
      <div style={{ position: "relative", zIndex: 2, padding: "12px 20px 20px", background: "linear-gradient(180deg,#0c122000 0%,#0c1220ee 40%,#080d16 100%)", display: "flex", gap: 16, alignItems: "flex-end" }}>
        {/* portrait */}
        <div style={{ width: 160, height: 190, flex: "0 0 auto", borderRadius: 12, overflow: "hidden", border: "2px solid #ffd166", boxShadow: "0 8px 32px rgba(0,0,0,0.65)" }}>
          <Portrait mood={step.mood} />
        </div>
        {/* bulle de dialogue */}
        <div style={{ flex: 1, background: "#0e1420ee", border: "1px solid #2a3648", borderRadius: 12, padding: "12px 16px", minHeight: 140, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#ffd166", marginBottom: 6 }}>
              {persoName.toUpperCase()}
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "#e8eef5", margin: 0 }}>
              « {step.text.replace("{prenom}", prenom || "chronaute")} »
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
            <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, color: "#8fa3bd" }}>{idx + 1} / {DIALOGUES.length}</div>
            {!isLast ? (
              <button onClick={() => setIdx(idx + 1)}
                style={{ background: "#141b26", color: "#ffd166", border: "1px solid #5a4a20", borderRadius: 10, padding: "9px 18px", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
                Suite ▸
              </button>
            ) : (
              <button onClick={onContinue}
                style={{ background: "#e8934a", color: "#160c02", border: "none", borderRadius: 10, padding: "10px 22px", fontWeight: 800, cursor: "pointer", fontSize: 14, fontFamily: "ui-monospace,monospace", letterSpacing: 1, boxShadow: "0 0 18px rgba(232,150,74,0.55)", animation: "glow 2.4s ease-in-out infinite" }}>
                Continuer ▸
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
