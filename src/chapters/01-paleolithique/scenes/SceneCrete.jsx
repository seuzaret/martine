import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 1 — Tableau : LE POINT DE VUE (crête)
   ------------------------------------------------------------
   Une crête rocheuse en surplomb. Panorama vaste : la plaine
   avec un troupeau au loin, la rivière qui serpente, un aigle
   qui passe. Lieu d'observation calme, sans action complexe.
   ============================================================ */

export default function SceneCrete({ collect, action, reveal, made = [], inv = [] }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="cr-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c0c8d8" /><stop offset="40%" stopColor="#e8d8b0" /><stop offset="80%" stopColor="#f0c88a" /><stop offset="100%" stopColor="#b8a078" /></linearGradient>
        <linearGradient id="cr-plaine" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a89068" /><stop offset="50%" stopColor="#886a40" /><stop offset="100%" stopColor="#5a4028" /></linearGradient>
        <linearGradient id="cr-rock" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a7868" /><stop offset="60%" stopColor="#5a4838" /><stop offset="100%" stopColor="#2a1a10" /></linearGradient>
        <radialGradient id="cr-sun" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#fff4c8" stopOpacity="1" /><stop offset="40%" stopColor="#f8e098" stopOpacity="0.9" /><stop offset="100%" stopColor="#f8c058" stopOpacity="0" /></radialGradient>
        <filter id="cr-grain"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="9" /><feColorMatrix values="0 0 0 0 0.3 0 0 0 0 0.2 0 0 0 0 0.1 0 0 0 0.3 0" /></filter>
      </defs>

      <PLayer depth={5}>
        {/* ciel dégradé matin, plus riche */}
        <rect width="1000" height="380" fill="url(#cr-sky)" />
        {/* halo solaire */}
        <circle cx="720" cy="140" r="120" fill="url(#cr-sun)" />
        {/* rayons de soleil */}
        <g opacity="0.35" transform="translate(720,140)">
          {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((a, i) => {
            const rad = (a * Math.PI) / 180;
            return <line key={i} x1={Math.cos(rad) * 50} y1={Math.sin(rad) * 50} x2={Math.cos(rad) * 90} y2={Math.sin(rad) * 90} stroke="#fff4c8" strokeWidth="1.5" strokeLinecap="round" />;
          })}
        </g>
        {/* soleil */}
        <circle cx="720" cy="140" r="42" fill="#f8f0d0" opacity="0.85" />
        <circle cx="720" cy="140" r="28" fill="#fff8d8" opacity="0.95" />
        {/* nuages allongés — plusieurs couches */}
        {[[80, 100, 90, 8], [280, 80, 100, 10], [500, 110, 110, 9], [860, 90, 80, 7], [180, 130, 60, 5], [620, 60, 70, 6]].map(([x, y, rx, ry], i) => (
          <g key={i}>
            <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="#f8f0d8" opacity="0.75" />
            <ellipse cx={x - rx / 3} cy={y + ry - 1} rx={rx - 20} ry={ry - 2} fill="#f0e0c0" opacity="0.55" />
          </g>
        ))}
        {/* Vol d'oiseaux en V au loin */}
        <g opacity="0.55" transform="translate(300,180)">
          {[[0, 0], [-14, 6], [14, 6], [-26, 12], [26, 12], [-38, 18], [38, 18]].map(([x, y], i) => (
            <path key={i} d={`M${x} ${y} q-3 -3 -6 0 M${x} ${y} q3 -3 6 0`} stroke="#2a1e10" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          ))}
        </g>
        {/* AIGLE qui plane — mieux dessiné */}
        <g transform="translate(500,200)" style={{ animation: "float 4s ease-in-out infinite" }}>
          {/* ombre légère sous les ailes */}
          <path d="M0 4 Q-40 -4 -50 4 Q-40 8 -20 8 L20 8 Q40 8 50 4 Q40 -4 0 4 Z" fill="#0a0604" opacity="0.35" />
          {/* ailes déployées avec forme + rémiges */}
          <path d="M0 0 Q-40 -10 -54 0 Q-42 4 -20 4 L20 4 Q42 4 54 0 Q40 -10 0 0 Z" fill="#2a1e10" />
          {/* plumes primaires en éventail */}
          <path d="M-50 2 l-8 -2 M-46 4 l-6 -1 M-42 4 l-5 -1 M50 2 l8 -2 M46 4 l6 -1 M42 4 l5 -1" stroke="#1a1408" strokeWidth="1" strokeLinecap="round" />
          {/* corps + tête */}
          <ellipse cx="0" cy="1" rx="6" ry="3" fill="#1a1408" />
          <circle cx="0" cy="-3" r="2" fill="#3a2818" />
          <path d="M-1 -5 l-1 -1 M1 -5 l1 -1" stroke="#f0c848" strokeWidth="0.4" />
          {/* queue en éventail */}
          <path d="M-8 4 L-4 14 L0 4 L4 14 L8 4" fill="#2a1e10" />
        </g>
      </PLayer>

      <PLayer depth={4}>
        {/* chaîne lointaine bleu-lavande (arrière) */}
        <path d="M0 380 L0 280 L100 230 L200 260 L320 210 L440 250 L560 220 L680 260 L800 220 L900 250 L1000 240 L1000 380 Z" fill="#8898b0" opacity="0.5" />
        {/* couche intermédiaire un peu plus sombre */}
        <path d="M0 380 L0 260 L120 200 L220 240 L340 180 L460 220 L580 190 L700 230 L820 200 L1000 240 L1000 380 Z" fill="#6a7898" opacity="0.7" />
        {/* neige au sommet des plus hauts pics */}
        <path d="M120 200 l14 8 l-8 6 l-4 -6 z M340 180 l16 12 l-10 4 l-6 -8 z M580 190 l12 8 l-6 4 l-6 -6 z" fill="#f0f0e8" opacity="0.75" />
      </PLayer>

      <PLayer depth={3}>
        {/* la plaine en contrebas */}
        <path d="M0 380 L1000 380 L1000 480 L0 480 Z" fill="url(#cr-plaine)" />
        {/* texture grain sur la plaine */}
        <rect x="0" y="380" width="1000" height="100" filter="url(#cr-grain)" opacity="0.35" />
        {/* touches de végétation basse (buissons) sur la plaine */}
        {[[80, 470], [140, 465], [240, 472], [520, 470], [620, 465], [720, 472], [880, 468]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <ellipse cx="0" cy="0" rx="10" ry="3" fill="#4a5828" opacity="0.7" />
            <ellipse cx="-4" cy="-2" rx="5" ry="2.5" fill="#5a6a30" opacity="0.7" />
            <ellipse cx="4" cy="-2" rx="5" ry="2.5" fill="#5a6a30" opacity="0.7" />
          </g>
        ))}
        {/* rivière qui serpente — plus détaillée */}
        <path d="M0 430 Q200 410 400 430 Q600 450 800 425 Q900 415 1000 425 L1000 445 Q900 435 800 445 Q600 470 400 450 Q200 430 0 450 Z" fill="#6a95b0" opacity="0.9" />
        {/* reflets sur la rivière */}
        <path d="M100 428 q60 -4 120 0 M400 442 q80 6 160 0 M700 432 q60 -2 120 0" stroke="#c8dce8" strokeWidth="0.8" fill="none" opacity="0.65" />
        {/* berges sombres */}
        <path d="M0 430 Q200 410 400 430 Q600 450 800 425 Q900 415 1000 425" stroke="#3a4858" strokeWidth="0.6" fill="none" opacity="0.7" />
        {/* TROUPEAU au loin — bisons esquissés avec bosse */}
        {[[280, 445, 1], [310, 448, 0.9], [335, 442, 1.1], [360, 448, 0.85], [388, 445, 1], [412, 450, 0.9], [440, 442, 1.1], [468, 448, 0.85], [268, 452, 0.75]].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x},${y}) scale(${s})`}>
            {/* ombre au sol */}
            <ellipse cx="0" cy="4" rx="9" ry="1.5" fill="#0a0604" opacity="0.5" />
            {/* corps */}
            <ellipse cx="0" cy="0" rx="9" ry="4.5" fill="#3a2818" />
            {/* bosse caractéristique du bison */}
            <ellipse cx="-4" cy="-3" rx="5" ry="3" fill="#4a3020" />
            {/* tête */}
            <ellipse cx="-8" cy="-1" rx="3.5" ry="2.5" fill="#2a1a10" />
            {/* pattes */}
            <path d="M-6 4 v3 M-2 4 v3 M4 4 v3 M6 4 v3" stroke="#2a1a10" strokeWidth="1" />
          </g>
        ))}
      </PLayer>

      <PLayer depth={2}>
        {/* premier plan : la crête rocheuse où on est */}
        <path d="M0 480 L120 470 L220 490 L340 475 L460 495 L580 480 L700 490 L820 478 L1000 490 L1000 560 L0 560 Z" fill="url(#cr-rock)" />
        {/* strates de la roche */}
        <path d="M0 500 q200 4 400 -2 q200 -4 400 2 q100 3 200 -2" stroke="#3a2818" strokeWidth="0.8" fill="none" opacity="0.55" />
        <path d="M0 522 q200 -6 400 0 q200 6 400 -2 q100 -3 200 2" stroke="#4a3828" strokeWidth="0.6" fill="none" opacity="0.55" />
        {/* affleurements rocheux avec plus de profondeur */}
        <g>
          <path d="M180 510 Q220 486 280 496 Q320 486 360 510 L360 540 L180 540 Z" fill="#6a5848" stroke="#2a1810" strokeWidth="0.8" />
          <path d="M188 508 Q220 492 280 502 Q320 492 356 508" stroke="#8a7868" strokeWidth="0.6" fill="none" opacity="0.7" />
          {/* fissure */}
          <path d="M220 510 l4 24 M300 500 l-2 30" stroke="#1a0e04" strokeWidth="0.7" fill="none" opacity="0.7" />
        </g>
        <g>
          <path d="M620 510 Q660 486 720 496 Q780 486 840 510 L840 540 L620 540 Z" fill="#6a5848" stroke="#2a1810" strokeWidth="0.8" />
          <path d="M628 508 Q660 492 720 502 Q780 492 836 508" stroke="#8a7868" strokeWidth="0.6" fill="none" opacity="0.7" />
          <path d="M680 500 l-3 26 M760 502 l2 30" stroke="#1a0e04" strokeWidth="0.7" fill="none" opacity="0.7" />
        </g>
        {/* mousses / lichens variés (orange + vert) */}
        {[[100, 495], [400, 485], [560, 500], [880, 495]].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} q6 -4 12 0 q-6 4 -12 0 Z`} fill="#5a6a30" opacity="0.75" />
        ))}
        {[[160, 512], [420, 502], [540, 518], [740, 502], [820, 522]].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} q4 -3 8 0 q-4 3 -8 0 Z`} fill="#c88030" opacity="0.55" />
        ))}
        {/* petites herbes sauvages penchées par le vent (à droite = vent d'ouest) */}
        {[[80, 480], [280, 480], [400, 485], [480, 490], [600, 480], [700, 486], [880, 484], [950, 488]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <path d="M0 0 q3 -12 -2 -18 M4 0 q6 -14 0 -20 M-4 0 q3 -10 -3 -14" stroke="#5a6828" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.85" />
          </g>
        ))}
        {/* petits cailloux éparpillés */}
        {[[60, 545], [420, 550], [560, 548], [880, 546], [940, 552]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="4" ry="1.5" fill="#5a4838" stroke="#1a0e08" strokeWidth="0.3" />
        ))}
      </PLayer>

      <PLayer depth={1}>
        {/* petit CAIRN de pierres empilées à gauche (repère de chasseurs) — mieux modelé */}
        <g transform="translate(240,470)">
          <ellipse cx="0" cy="18" rx="30" ry="4" fill="#0a0604" opacity="0.6" />
          <ellipse cx="0" cy="10" rx="22" ry="9" fill="url(#cr-rock)" stroke="#1a1408" strokeWidth="1" />
          <ellipse cx="-8" cy="7" rx="10" ry="4" fill="#8a7868" opacity="0.55" />
          <ellipse cx="-2" cy="-2" rx="15" ry="7" fill="url(#cr-rock)" stroke="#1a1408" strokeWidth="1" />
          <ellipse cx="-6" cy="-5" rx="7" ry="3" fill="#8a7868" opacity="0.55" />
          <ellipse cx="1" cy="-13" rx="10" ry="5" fill="url(#cr-rock)" stroke="#1a1408" strokeWidth="1" />
          <ellipse cx="-2" cy="-15" rx="4" ry="2" fill="#8a7868" opacity="0.55" />
          <ellipse cx="0" cy="-21" rx="6" ry="3" fill="url(#cr-rock)" stroke="#1a1408" strokeWidth="1" />
          {/* petite plume de rite plantée sur le sommet */}
          <path d="M0 -24 q3 -8 -1 -14 q-3 6 1 14 Z" fill="#c88848" stroke="#5a2818" strokeWidth="0.4" />
          <path d="M0 -24 L0 -36" stroke="#3a2418" strokeWidth="0.6" />
        </g>

        {/* Personnage debout au bord (l'aîné qui observe) — plus détaillé */}
        <g transform="translate(800,480)">
          {/* ombre au sol */}
          <ellipse cx="0" cy="44" rx="22" ry="4" fill="#0a0604" opacity="0.55" />
          {/* longue tunique en peau */}
          <path d="M-16 40 L-14 -10 Q-14 -22 -6 -22 L6 -22 Q14 -22 14 -10 L16 40 Z" fill="#5a3818" stroke="#2a1810" strokeWidth="0.8" />
          {/* franges et coutures de la tunique */}
          <path d="M-14 -4 q14 6 28 0 M-14 8 q14 -3 28 3 M-14 20 q14 6 28 0" stroke="#3a2010" strokeWidth="0.6" fill="none" opacity="0.8" />
          <path d="M-16 40 l0 4 M-10 40 l0 4 M-4 40 l0 4 M2 40 l0 4 M8 40 l0 4 M14 40 l0 4" stroke="#3a2010" strokeWidth="1.2" strokeLinecap="round" />
          {/* ceinture */}
          <rect x="-14" y="10" width="28" height="3" fill="#3a2010" />
          {/* épaule/bras qui tient bâton */}
          <ellipse cx="14" cy="-10" rx="5" ry="4" fill="#7a4820" />
          <path d="M15 -8 L20 -22" stroke="#c8946a" strokeWidth="4" strokeLinecap="round" />
          {/* tête */}
          <ellipse cx="0" cy="-32" rx="12" ry="14" fill="#c8946a" stroke="#5a3818" strokeWidth="0.6" />
          {/* cheveux gris/blancs longs (aîné) */}
          <path d="M-12 -36 q0 -10 6 -12 q6 2 8 -4 q4 6 8 4 q6 4 8 10 q-2 4 -4 4 q-4 -2 -8 0 q-4 -2 -8 0 q-4 -2 -10 -2 z" fill="#c0b8a8" />
          {/* barbe blanche */}
          <path d="M-9 -26 q3 8 9 8 q6 0 9 -8 q0 8 -4 12 q-5 3 -10 0 q-4 -4 -4 -12 z" fill="#e0d8c8" />
          {/* yeux + rides */}
          <circle cx="-3.5" cy="-32" r="1.5" fill="#2a1a10" />
          <circle cx="3.5" cy="-32" r="1.5" fill="#2a1a10" />
          <path d="M-6 -34 q3 -1 5 0 M2 -34 q3 -1 5 0" stroke="#5a3818" strokeWidth="0.5" fill="none" />
          <path d="M-6 -30 q3 1 5 0 M2 -30 q3 1 5 0" stroke="#8a5828" strokeWidth="0.4" fill="none" opacity="0.7" />
          {/* nez */}
          <path d="M0 -32 l-1 5 l1 1" stroke="#8a5828" strokeWidth="0.6" fill="none" />
          {/* collier de dents/coquillages */}
          <path d="M-8 -20 q8 3 16 0" stroke="#3a2010" strokeWidth="0.6" fill="none" />
          {[-6, -3, 0, 3, 6].map((cx, i) => (
            <path key={i} d={`M${cx} -18 l1 3 l-2 0 z`} fill="#f0e8d0" stroke="#5a3818" strokeWidth="0.3" />
          ))}
          {/* bâton de marche décoré */}
          <path d="M20 -22 L28 44" stroke="#3a2418" strokeWidth="4" strokeLinecap="round" />
          <path d="M22 -12 q4 0 4 4 M24 4 q4 0 4 4 M26 20 q4 0 4 4" stroke="#5a3818" strokeWidth="0.6" fill="none" />
          {/* petit tissu au sommet du bâton */}
          <path d="M20 -22 q-6 -2 -8 4 q-2 4 4 4 z" fill="#c85028" stroke="#5a1810" strokeWidth="0.4" />
        </g>
        <g transform="translate(800,432)" style={{ animation: "float 2s ease-in-out infinite" }}>
          <circle r="14" fill="#ffd166" stroke="#8a5a20" strokeWidth="2" />
          <text y="5" textAnchor="middle" fontSize="18" fontWeight="800" fill="#3a2410">?</text>
        </g>

        {/* Objets ephemere : disparaissent une fois ramassés */}
        {!inv.includes("plume") && (
        <g transform="translate(440,506) rotate(20)">
          <path d="M0 -14 Q4 -10 4 0 Q4 8 -2 12 Q-4 8 -4 0 Q-4 -10 0 -14 Z" fill="#8a6a48" stroke="#3a2818" strokeWidth="0.5" />
          <path d="M0 -12 L0 10" stroke="#3a2818" strokeWidth="0.5" />
          {[-8, -4, 0, 4, 8].map((y, i) => (<path key={i} d={`M-2 ${y} l-2 ${-1 - (i%2)} M2 ${y} l2 ${-1 - (i%2)}`} stroke="#5a4028" strokeWidth="0.3" />))}
        </g>
        )}
        {!inv.includes("champignon") && (
        <g transform="translate(140,520)">
          <path d="M-8 0 Q-8 -10 0 -12 Q8 -10 8 0 Z" fill="#c8382e" stroke="#5a1810" strokeWidth="0.6" />
          <circle cx="-3" cy="-6" r="1.2" fill="#f0e4c8" />
          <circle cx="3" cy="-4" r="1" fill="#f0e4c8" />
          <circle cx="0" cy="-9" r="0.8" fill="#f0e4c8" />
          <rect x="-2" y="0" width="4" height="7" fill="#e8dfc8" stroke="#5a4028" strokeWidth="0.4" />
        </g>
        )}
        {!inv.includes("feuille_morte") && (
        <g transform="translate(700,536) rotate(45)">
          <path d="M0 0 q-10 -12 -16 -6 q-4 6 8 12 q12 4 8 -6 Z" fill="#c8632a" stroke="#5a2810" strokeWidth="0.8" />
          <path d="M-2 0 q-6 -6 -10 -4" stroke="#5a2810" strokeWidth="0.5" fill="none" />
        </g>
        )}
      </PLayer>

      {/* ═══ zones cliquables ═══ */}
      <Hotspot cx={800} cy={460} r={40} label="l'aîné qui observe" reveal={reveal} onClick={() => action("aine")} />
      <Hotspot cx={240} cy={470} r={30} label="petit cairn de pierres" reveal={reveal} onClick={() => action("cairn")} />
      <Hotspot cx={340} cy={447} r={40} label="troupeau au loin" reveal={reveal} onClick={() => action("troupeau_loin")} />
      <Hotspot cx={500} cy={205} r={30} label="un aigle qui plane" reveal={reveal} onClick={() => action("aigle")} />
      <Hotspot cx={440} cy={506} r={16} label="plume d'oiseau" item="plume" reveal={reveal} onClick={() => collect("plume")} />
      <Hotspot cx={140} cy={520} r={14} label="champignon" item="champignon" reveal={reveal} onClick={() => collect("champignon")} />
      <Hotspot cx={700} cy={536} r={14} label="feuille morte" item="feuille_morte" reveal={reveal} onClick={() => collect("feuille_morte")} />
    </svg>
  );
}
