import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 4 — Tableau : la bibliothèque d'Alexandrie
   Peinture fine — grand intérieur, lumière chaude de lampes à
   huile, rayonnages (armaria) pleins de rouleaux, un savant, une
   grande baie ouverte sur la Méditerranée. À trouver : feuille de
   papyrus, umbilicus (bâton), et le grand bâtiment (les rayonnages).
   ============================================================ */

export default function SceneAlexandrie({ collect, action, reveal, made = [] }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ax-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7a5e3e" /><stop offset="100%" stopColor="#4e3a24" /></linearGradient>
        <linearGradient id="ax-out" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5a86a8" /><stop offset="60%" stopColor="#a8c0c4" /><stop offset="100%" stopColor="#e8d0a0" /></linearGradient>
        <linearGradient id="ax-shelf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a6238" /><stop offset="100%" stopColor="#5a3f22" /></linearGradient>
        <linearGradient id="ax-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9a7e58" /><stop offset="100%" stopColor="#5c4830" /></linearGradient>
        <radialGradient id="ax-lamp" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffcf78" stopOpacity="0.6" /><stop offset="100%" stopColor="#ff9540" stopOpacity="0" /></radialGradient>
        <filter id="ax-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="ax-blur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>

      {/* ═══ mur du fond (intérieur chaud) ═══ */}
      <rect width="1000" height="560" fill="url(#ax-wall)" />
      <rect width="1000" height="560" fill="#2a1c10" opacity="0.25" filter="url(#ax-grain)" />

      {/* ═══ couche lointaine : grande baie sur la mer + rayonnages du fond ═══ */}
      <PLayer depth={1}>
        {/* baie ouverte (droite) */}
        <path d="M760 60 h190 v300 h-190 Q740 210 760 60 Z" fill="url(#ax-out)" />
        <path d="M840 90 q40 -6 80 4" stroke="#dfeae4" strokeWidth="2" fill="none" opacity="0.4" />
        <rect x="760" y="60" width="190" height="300" fill="none" stroke="#3a2a18" strokeWidth="8" />
        {/* pilastre entre baie et mur */}
        <rect x="744" y="40" width="20" height="360" fill="#6a4c2e" />
        {/* rayonnages sombres du fond (gauche) */}
        <rect x="40" y="120" width="300" height="250" fill="url(#ax-shelf)" opacity="0.7" />
        {[150, 200, 250, 300].map((y, i) => <path key={i} d={`M46 ${y} h288`} stroke="#3a2818" strokeWidth="3" />)}
      </PLayer>

      {/* ═══ couche intermédiaire : LE GRAND RAYONNAGE plein de rouleaux ═══ */}
      <PLayer depth={2}>
        <g transform="translate(360,110)">
          {/* meuble à casiers (armarium) */}
          <rect x="-160" y="0" width="320" height="290" fill="url(#ax-shelf)" />
          <rect x="-160" y="0" width="320" height="290" fill="#2a1c10" opacity="0.3" filter="url(#ax-grain)" />
          <rect x="-160" y="0" width="320" height="290" fill="none" stroke="#3a2818" strokeWidth="6" />
          {/* étagères */}
          {[58, 116, 174, 232].map((y, i) => <rect key={i} x="-160" y={y} width="320" height="8" fill="#3a2818" />)}
          {/* montants verticaux → casiers */}
          {[-80, 0, 80].map((x, i) => <rect key={i} x={x - 3} y="0" width="6" height="290" fill="#3a2818" />)}
          {/* bouts de rouleaux (cercles) rangés dans les casiers */}
          {[8, 66, 124, 182].map((y, r) =>
            [-136, -116, -96, -56, -36, -16, 24, 44, 64, 104, 124, 144].map((x, c) => (
              <g key={`${r}-${c}`} transform={`translate(${x},${y + 26})`}>
                <circle r="8" fill={["#e8dcc0", "#d8c8a4", "#e0d4b4"][(r + c) % 3]} />
                <circle r="8" fill="none" stroke="#8a6e44" strokeWidth="1" />
                <circle r="3" fill="#b09868" />
                {/* étiquette (titulus) */}
                <rect x="-3" y="7" width="6" height="4" fill="#b23020" opacity="0.7" />
              </g>
            ))
          )}
        </g>
      </PLayer>

      {/* ═══ premier plan : sol, savant, lampe, table de lecture ═══ */}
      <PLayer depth={3}>
        <rect y="400" width="1000" height="160" fill="url(#ax-floor)" />
        <rect y="402" width="1000" height="158" fill="#2c1c10" opacity="0.35" filter="url(#ax-grain)" />
        {/* dalles */}
        <path d="M0 452 h1000 M0 508 h1000 M250 420 v140 M540 420 v140 M780 420 v140" stroke="#4c3a22" strokeWidth="1.4" opacity="0.4" />
        <ellipse cx="500" cy="470" rx="440" ry="52" fill="#7a6240" opacity="0.3" />

        {/* halo de la lampe à huile */}
        <ellipse cx="700" cy="470" rx="150" ry="70" fill="url(#ax-lamp)" style={{ animation: "glow 2.6s ease-in-out infinite" }} />

        {/* LE SAVANT qui lit un rouleau déroulé */}
        <g transform="translate(300,470)">
          <ellipse cx="0" cy="34" rx="26" ry="7" fill="#241608" opacity="0.5" />
          {/* tunique */}
          <path d="M-18 6 Q-24 -18 0 -22 Q24 -18 18 6 L14 32 L-14 32 Z" fill="#c9bfa8" />
          <path d="M-18 6 Q0 12 18 6 L15 20 Q0 26 -15 20 Z" fill="#a89e86" />
          <circle cx="0" cy="-28" r="8" fill="#b48a64" />
          <path d="M-8 -32 q8 -6 16 0 q-3 -7 -8 -7 q-7 0 -8 7" fill="#d8d0c0" />
          {/* rouleau déroulé entre les mains */}
          <path d="M-20 -2 L22 -2 L22 12 L-20 12 Z" fill="#efe6ce" />
          <path d="M-14 2 h30 M-14 6 h24" stroke="#8a6e44" strokeWidth="1" opacity="0.7" />
          <rect x="-24" y="-4" width="6" height="18" rx="3" fill="#8a6238" /><rect x="20" y="-4" width="6" height="18" rx="3" fill="#8a6238" />
        </g>

        {/* TABLE de lecture : feuille de papyrus + umbilicus + lampe */}
        <g transform="translate(690,496)">
          <rect x="-64" y="8" width="128" height="10" rx="2" fill="#6e4c2e" />
          <rect x="-56" y="18" width="8" height="24" fill="#5a3f24" /><rect x="48" y="18" width="8" height="24" fill="#5a3f24" />
          {/* feuille de papyrus vierge */}
          <g transform="translate(-24,-6)">
            <rect x="-26" y="-14" width="52" height="30" rx="2" fill="#efe6ce" transform="rotate(-4)" />
            <path d="M-20 -6 h40 M-20 0 h34 M-20 6 h38" stroke="#d8ccae" strokeWidth="1" opacity="0.7" transform="rotate(-4)" />
          </g>
          {/* umbilicus : un bâton avec pommeaux */}
          <g transform="translate(24,2) rotate(16)">
            <rect x="-2" y="-20" width="4" height="40" rx="2" fill="#8a6238" />
            <circle cx="0" cy="-20" r="4" fill="#c0a060" /><circle cx="0" cy="20" r="4" fill="#c0a060" />
          </g>
          {/* lampe à huile */}
          <g transform="translate(46,-2)">
            <path d="M-12 4 Q-14 -4 0 -6 Q16 -6 14 2 Q12 6 -2 6 Z" fill="#b8935e" />
            <path d="M14 0 q8 -1 12 3" stroke="#b8935e" strokeWidth="4" fill="none" />
            <g style={{ transformOrigin: "26px -2px", transformBox: "view-box", animation: "flick 0.9s ease-in-out infinite" }}>
              <path d="M26 -2 q-3 -8 0 -14 q3 6 0 14 Z" fill="#ffb347" />
              <path d="M26 -2 q-1.5 -5 0 -9 q1.5 4 0 9 Z" fill="#fff2c4" />
            </g>
          </g>
        </g>

        {/* herbes / plantes en pot qui cadrent le bas */}
        <g transform="translate(60,500)"><path d="M0 40 Q-8 6 0 -14 M0 40 Q8 6 0 -14 M0 40 Q-14 12 -10 -4" stroke="#4a6a30" strokeWidth="3" fill="none" /><path d="M-16 40 Q-18 28 -8 24 L10 24 Q18 28 16 40 Z" fill="#8a5a3c" /></g>
      </PLayer>

      {/* voile de grain global */}
      <rect width="1000" height="560" fill="#1a1208" opacity="0.08" style={{ pointerEvents: "none" }} />

      {/* zones cliquables */}
      {/* LE BIBLIOTHÉCAIRE — un rouleau déroulé entre les mains */}
      <g transform="translate(500,476)">
        <ellipse cx="0" cy="28" rx="24" ry="7" fill="#241c10" opacity="0.4" />
        {/* la longue toge */}
        <path d="M-15 28 Q-19 -2 0 -18 Q19 -2 15 28 Z" fill="#eae2d0" />
        <path d="M-15 28 Q-8 6 0 -18 M15 28 Q8 8 2 -14" stroke="#c8bfa8" strokeWidth="2" fill="none" />
        {/* la tête, barbe grecque */}
        <circle cx="0" cy="-27" r="9" fill="#c89a6e" />
        <path d="M-9 -30 q1 -11 9 -10 q10 1 9 11 q-3 -6 -9 -6 q-6 0 -9 5 Z" fill="#8a8078" />
        <path d="M-6 -21 q6 9 12 -1" stroke="#a8a098" strokeWidth="3" fill="none" />
        {/* les deux bras qui tiennent le rouleau ouvert */}
        <path d="M-14 -6 q-12 6 -14 14" stroke="#c89a6e" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        <path d="M14 -6 q12 6 14 14" stroke="#c89a6e" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        <g transform="translate(0,10)">
          <rect x="-26" y="-6" width="52" height="16" rx="1" fill="#e8dcb8" />
          <rect x="-30" y="-9" width="6" height="22" rx="3" fill="#8a6a3a" />
          <rect x="24" y="-9" width="6" height="22" rx="3" fill="#8a6a3a" />
          <path d="M-20 -2 h38 M-20 3 h30" stroke="#a89060" strokeWidth="1.2" />
        </g>
      </g>

      {/* RÉSULTAT (msg_bibliotheque) : un CASIER plein de rouleaux rangés —
          le savoir du monde, classé sous un seul toit (bouts ronds visibles,
          chacun étiqueté) */}
      {made.includes("msg_bibliotheque") && (
        <g transform="translate(792,462)" style={{ animation: "fadein 1s ease-out" }}>
          <ellipse cx="0" cy="46" rx="54" ry="10" fill="#241c10" opacity="0.4" />
          <rect x="-50" y="-40" width="100" height="84" rx="2" fill="#6e4c2e" />
          <rect x="-45" y="-35" width="90" height="74" fill="#3f2a16" />
          <path d="M-45 -11 h90 M-45 13 h90" stroke="#6e4c2e" strokeWidth="4" />
          {[-30, -15, 0, 15, 30].map((x, col) => [-23, 1, 25].map((y, row) => (
            <g key={`${col}-${row}`} transform={`translate(${x},${y})`}>
              <circle cx="0" cy="0" r="6.4" fill="#e8dcb8" stroke="#c8b888" strokeWidth="1" />
              <circle cx="0" cy="0" r="2.4" fill="#c2a86a" />
              <rect x="-2" y="6" width="4" height="3.5" fill={["#a83028", "#2a6a9a", "#3a8a4a"][(col + row) % 3]} />
            </g>
          )))}
        </g>
      )}

      {/* le « ? » du bibliothécaire : tout le savoir sous un seul toit… */}
      {!made.includes("msg_bibliotheque") && (
        <>
          <g transform="translate(492,378)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
            <path d="M0 0 q0 -20 20 -20 q20 0 20 17 q0 14 -17 18 l0 6" fill="none" stroke="#ffd166" strokeWidth="4" />
            <circle cx="20" cy="31" r="2.6" fill="#ffd166" />
          </g>
          <Hotspot cx={512} cy={388} r={28} label="parler au bibliothécaire" reveal={reveal} onClick={() => action("bibliothecaire")} />
        </>
      )}

      <Hotspot cx={360} cy={230} r={130} label="la bibliothèque" item="batiment" reveal={reveal} onClick={() => collect("batiment")} />
      <Hotspot cx={664} cy={484} r={34} label="papyrus" item="papyrus" reveal={reveal} onClick={() => collect("papyrus")} />
      <Hotspot cx={716} cy={492} r={26} label="umbilicus" item="umbilicus" reveal={reveal} onClick={() => collect("umbilicus")} />
    </svg>
  );
}
