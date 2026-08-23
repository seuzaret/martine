import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 1 — Tableau : LE POINT DE VUE (crête)
   ------------------------------------------------------------
   Une crête rocheuse en surplomb. Panorama vaste : la plaine
   avec un troupeau au loin, la rivière qui serpente, un aigle
   qui passe. Lieu d'observation calme, sans action complexe.
   ============================================================ */

export default function SceneCrete({ collect, action, reveal, made = [] }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="cr-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c8d0d8" /><stop offset="50%" stopColor="#e0d8b0" /><stop offset="100%" stopColor="#a0a878" /></linearGradient>
        <linearGradient id="cr-plaine" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a09068" /><stop offset="100%" stopColor="#6a5838" /></linearGradient>
        <linearGradient id="cr-rock" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7a6a58" /><stop offset="100%" stopColor="#3a2a18" /></linearGradient>
      </defs>

      <PLayer depth={5}>
        {/* ciel dégradé matin */}
        <rect width="1000" height="380" fill="url(#cr-sky)" />
        {/* soleil pâle */}
        <circle cx="720" cy="140" r="42" fill="#f8f0d0" opacity="0.8" />
        <circle cx="720" cy="140" r="26" fill="#fff4c8" opacity="0.9" />
        {/* nuages allongés */}
        {[[80, 100], [280, 80], [500, 110], [860, 90]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="90" ry="8" fill="#f0e8d0" opacity="0.6" />
        ))}
        {/* AIGLE qui plane */}
        <g transform="translate(500,200)" style={{ animation: "float 4s ease-in-out infinite" }}>
          <path d="M0 0 Q-40 -8 -50 0 Q-40 4 -20 4 L20 4 Q40 4 50 0 Q40 -8 0 0 Z" fill="#2a1e10" />
          <path d="M-15 4 L-8 12 L0 4 L8 12 L15 4" fill="#2a1e10" />
        </g>
      </PLayer>

      <PLayer depth={4}>
        {/* montagnes lointaines bleutées */}
        <path d="M0 380 L0 260 L120 200 L220 240 L340 180 L460 220 L580 190 L700 230 L820 200 L1000 240 L1000 380 Z" fill="#7a8098" opacity="0.65" />
      </PLayer>

      <PLayer depth={3}>
        {/* la plaine en contrebas */}
        <path d="M0 380 L1000 380 L1000 480 L0 480 Z" fill="url(#cr-plaine)" />
        {/* rivière qui serpente */}
        <path d="M0 430 Q200 410 400 430 Q600 450 800 425 Q900 415 1000 425 L1000 445 Q900 435 800 445 Q600 470 400 450 Q200 430 0 450 Z" fill="#6a90a8" opacity="0.85" />
        {/* TROUPEAU au loin (petits points sombres) */}
        {[[280, 445], [310, 448], [335, 442], [360, 448], [388, 445], [412, 450], [440, 442], [468, 448], [268, 452]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <ellipse cx="0" cy="0" rx="8" ry="4" fill="#3a2818" />
            <ellipse cx="-6" cy="-2" rx="3" ry="2" fill="#3a2818" />
          </g>
        ))}
      </PLayer>

      <PLayer depth={2}>
        {/* premier plan : la crête rocheuse où on est */}
        <path d="M0 480 L120 470 L220 490 L340 475 L460 495 L580 480 L700 490 L820 478 L1000 490 L1000 560 L0 560 Z" fill="url(#cr-rock)" />
        {/* affleurements rocheux */}
        <path d="M180 510 Q220 490 280 500 Q320 490 360 510 L360 540 L180 540 Z" fill="#5a4838" />
        <path d="M620 510 Q660 490 720 500 Q780 490 840 510 L840 540 L620 540 Z" fill="#5a4838" />
        {/* mousses / lichens */}
        {[[100, 495], [400, 485], [560, 500], [880, 495]].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} q6 -4 12 0 q-6 4 -12 0 Z`} fill="#5a6a30" opacity="0.7" />
        ))}
      </PLayer>

      <PLayer depth={1}>
        {/* petit CAIRN de pierres empilées à gauche (repère de chasseurs) */}
        <g transform="translate(240,470)">
          <ellipse cx="0" cy="16" rx="26" ry="4" fill="#1a1408" opacity="0.5" />
          <ellipse cx="0" cy="10" rx="20" ry="8" fill="#5a4838" stroke="#1a1408" strokeWidth="1" />
          <ellipse cx="-2" cy="-2" rx="14" ry="6" fill="#6a5848" stroke="#1a1408" strokeWidth="1" />
          <ellipse cx="1" cy="-12" rx="9" ry="5" fill="#5a4838" stroke="#1a1408" strokeWidth="1" />
          <ellipse cx="0" cy="-20" rx="5" ry="3" fill="#7a6858" stroke="#1a1408" strokeWidth="1" />
        </g>

        {/* Personnage debout au bord (l'aîné qui observe) */}
        <g transform="translate(800,480)">
          {/* buste */}
          <path d="M-14 40 L-14 -10 Q-14 -20 -6 -20 L6 -20 Q14 -20 14 -10 L14 40 Z" fill="#5a3818" />
          <ellipse cx="0" cy="-30" rx="12" ry="14" fill="#c8946a" />
          <path d="M-10 -34 q0 -8 6 -10 q6 2 8 -4 q4 6 8 4 q6 4 8 10 z" fill="#8a8078" />
          <circle cx="-3" cy="-30" r="1.4" fill="#2a1a10" />
          <circle cx="3" cy="-30" r="1.4" fill="#2a1a10" />
          {/* bâton */}
          <path d="M18 -30 L26 40" stroke="#3a2418" strokeWidth="4" strokeLinecap="round" />
        </g>
        <g transform="translate(800,432)" style={{ animation: "float 2s ease-in-out infinite" }}>
          <circle r="14" fill="#ffd166" stroke="#8a5a20" strokeWidth="2" />
          <text y="5" textAnchor="middle" fontSize="18" fontWeight="800" fill="#3a2410">?</text>
        </g>

        {/* Objets d'époque décoratifs (ephemere) : plume, champignon, feuille */}
        <g transform="translate(440,506) rotate(20)">
          {/* plume brune tachetée */}
          <path d="M0 -14 Q4 -10 4 0 Q4 8 -2 12 Q-4 8 -4 0 Q-4 -10 0 -14 Z" fill="#8a6a48" stroke="#3a2818" strokeWidth="0.5" />
          <path d="M0 -12 L0 10" stroke="#3a2818" strokeWidth="0.5" />
          {/* barbes */}
          {[-8, -4, 0, 4, 8].map((y, i) => (<path key={i} d={`M-2 ${y} l-2 ${-1 - (i%2)} M2 ${y} l2 ${-1 - (i%2)}`} stroke="#5a4028" strokeWidth="0.3" />))}
        </g>
        <g transform="translate(140,520)">
          {/* champignon rouge à points blancs */}
          <path d="M-8 0 Q-8 -10 0 -12 Q8 -10 8 0 Z" fill="#c8382e" stroke="#5a1810" strokeWidth="0.6" />
          <circle cx="-3" cy="-6" r="1.2" fill="#f0e4c8" />
          <circle cx="3" cy="-4" r="1" fill="#f0e4c8" />
          <circle cx="0" cy="-9" r="0.8" fill="#f0e4c8" />
          {/* pied */}
          <rect x="-2" y="0" width="4" height="7" fill="#e8dfc8" stroke="#5a4028" strokeWidth="0.4" />
        </g>
        <g transform="translate(700,536) rotate(45)">
          <path d="M0 0 q-10 -12 -16 -6 q-4 6 8 12 q12 4 8 -6 Z" fill="#c8632a" stroke="#5a2810" strokeWidth="0.8" />
          <path d="M-2 0 q-6 -6 -10 -4" stroke="#5a2810" strokeWidth="0.5" fill="none" />
        </g>
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
