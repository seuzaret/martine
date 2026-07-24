import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 3 — Tableau : la cité d'Uruk (tableau de départ)
   Peinture fine — ocre mésopotamien, chaleur poussiéreuse :
   ziggourat en briques crues, grenier à grain, cour des scribes,
   tas d'argile, four à tablettes, canal. À trouver : argile,
   jetons-comptes, calame, sceau, four, eau.
   ============================================================ */

export default function SceneUruk({ collect, action, reveal, made = [] }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="uk-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a5f82" />
          <stop offset="42%" stopColor="#9a8a86" />
          <stop offset="74%" stopColor="#d0aa6e" />
          <stop offset="100%" stopColor="#eccb86" />
        </linearGradient>
        <radialGradient id="uk-sun" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#fff0c8" /><stop offset="50%" stopColor="#ffd888" stopOpacity="0.6" /><stop offset="100%" stopColor="#ffd888" stopOpacity="0" /></radialGradient>
        <linearGradient id="uk-brick" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c69a5e" /><stop offset="100%" stopColor="#9a6e3e" /></linearGradient>
        <linearGradient id="uk-brick2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#b8894e" /><stop offset="100%" stopColor="#8a5e34" /></linearGradient>
        <linearGradient id="uk-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c2a06a" /><stop offset="35%" stopColor="#a67c46" /><stop offset="100%" stopColor="#6e5230" /></linearGradient>
        <filter id="uk-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="uk-mottle" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="uk-blur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="7" /></filter>
      </defs>

      {/* ═══ ciel chaud et poussiéreux ═══ */}
      <rect width="1000" height="560" fill="url(#uk-sky)" />
      <circle cx="720" cy="180" r="150" fill="url(#uk-sun)" />
      <circle cx="720" cy="180" r="40" fill="#fff0c8" opacity="0.9" />
      <rect y="150" width="1000" height="120" fill="#d8b078" opacity="0.12" filter="url(#uk-blur)" />

      {/* ═══ couche lointaine : la ziggourat + palmiers ═══ */}
      <PLayer depth={1}>
        {/* ligne de désert */}
        <path d="M0 300 Q250 288 500 298 Q750 308 1000 296 L1000 420 L0 420 Z" fill="#b89660" />
        {/* la grande ziggourat à étages */}
        <g transform="translate(260,300)">
          <path d="M-130 0 L130 0 L96 -40 L-96 -40 Z" fill="url(#uk-brick2)" />
          <path d="M-96 -40 L96 -40 L66 -78 L-66 -78 Z" fill="url(#uk-brick)" />
          <path d="M-66 -78 L66 -78 L40 -112 L-40 -112 Z" fill="url(#uk-brick2)" />
          <rect x="-14" y="-112" width="28" height="16" fill="#7a5230" />
          {/* escalier central */}
          <path d="M-8 0 L8 0 L6 -112 L-6 -112 Z" fill="#8a6238" opacity="0.7" />
          {[-30, -66, -100].map((y, i) => <path key={i} d={`M-120 ${y * 0 + [0, -40, -78][i]} h240`} stroke="#6e4c28" strokeWidth="1.5" opacity="0.3" />)}
        </g>
        {/* palmiers dattiers */}
        {[[560, 300, 1], [880, 296, 0.85], [640, 302, 0.7]].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x},${y}) scale(${s})`}>
            <path d="M0 0 L-3 -60 L3 -60 Z" fill="#6e4c2e" />
            <path d="M0 -60 q-30 -6 -46 12 M0 -60 q30 -6 46 12 M0 -60 q-20 -22 -34 -30 M0 -60 q20 -22 34 -30 M0 -60 q0 -26 0 -40" stroke="#4a6a30" strokeWidth="4" fill="none" />
          </g>
        ))}
      </PLayer>

      {/* ═══ couche intermédiaire : bâtiments de briques crues ═══ */}
      <PLayer depth={2}>
        {/* le grenier à grain (droite) */}
        <g transform="translate(760,360)">
          <ellipse cx="0" cy="70" rx="72" ry="12" fill="#3c2c18" opacity="0.4" />
          <path d="M-56 72 L-56 -6 Q0 -40 56 -6 L56 72 Z" fill="url(#uk-brick)" />
          <path d="M-56 72 L-56 -6 Q0 -40 56 -6 L56 72 Z" fill="#5c3f22" opacity="0.35" filter="url(#uk-grain)" />
          <path d="M-56 6 h112 M-56 30 h112 M-56 54 h112" stroke="#6e4c28" strokeWidth="1.5" opacity="0.4" />
          {/* jarres de grain + petite ouverture */}
          <path d="M-16 72 L-16 40 Q0 32 16 40 L16 72 Z" fill="#2c1c10" />
          <text x="0" y="-14" textAnchor="middle" fontSize="12" fill="#5c3f22" opacity="0.6" fontFamily="ui-monospace,monospace">𒀭</text>
        </g>
        {/* maison de briques (gauche) */}
        <g transform="translate(150,380)">
          <rect x="-60" y="-10" width="120" height="80" rx="4" fill="url(#uk-brick2)" />
          <rect x="-60" y="-10" width="120" height="80" rx="4" fill="#5c3f22" opacity="0.3" filter="url(#uk-grain)" />
          <path d="M-60 12 h120 M-60 36 h120" stroke="#6e4c28" strokeWidth="1.5" opacity="0.35" />
          <path d="M-16 70 L-16 30 Q0 24 16 30 L16 70 Z" fill="#241608" />
        </g>
      </PLayer>

      {/* ═══ premier plan : la cour, le canal, l'atelier ═══ */}
      <PLayer depth={3}>
        <rect y="400" width="1000" height="160" fill="url(#uk-ground)" />
        <ellipse cx="500" cy="470" rx="440" ry="60" fill="#8a6c40" opacity="0.4" />
        <rect y="402" width="1000" height="158" fill="#3c2c18" opacity="0.32" filter="url(#uk-mottle)" />
        <rect y="402" width="1000" height="158" fill="#2c1c10" opacity="0.45" filter="url(#uk-grain)" />

        {/* LE CANAL (eau) en bas à gauche */}
        <g>
          <path d="M-10 560 L-10 512 Q120 500 200 520 Q150 548 60 552 Q10 554 -10 560 Z" fill="#7a8e8e" />
          <path d="M-10 520 Q100 508 180 522" stroke="#c9d8d0" strokeWidth="2" fill="none" opacity="0.5" />
          <path d="M20 534 q40 -4 80 2 M0 546 q40 -3 70 1" stroke="#5a7278" strokeWidth="1.6" fill="none" opacity="0.6" style={{ animation: "ripple 3.4s ease-in-out infinite" }} />
          {/* roseaux au bord */}
          {[150, 168, 184].map((x, i) => (
            <path key={i} d={`M${x} 516 q${i % 2 ? 4 : -4} -30 ${i % 2 ? 6 : -3} -50`} stroke="#5c6a2e" strokeWidth="2.5" fill="none" style={{ animation: `sway ${3 + i * 0.4}s ease-in-out infinite`, transformOrigin: `${x}px 516px`, transformBox: "view-box" }} />
          ))}
        </g>

        {/* LE FOUR à tablettes */}
        <g transform="translate(600,460)">
          <ellipse cx="0" cy="36" rx="48" ry="11" fill="#241608" opacity="0.5" />
          <path d="M-38 36 Q-44 -10 0 -18 Q44 -10 38 36 Z" fill="#9a6e3e" />
          <path d="M-38 36 Q-44 -10 0 -18 Q44 -10 38 36 Z" fill="#4c3020" opacity="0.4" filter="url(#uk-grain)" />
          <path d="M-18 36 Q-20 4 0 0 Q20 4 18 36 Z" fill="#ff8a3c" />
          <path d="M-12 36 Q-13 10 0 7 Q13 10 12 36 Z" fill="#ffd36a" />
          <circle cx="0" cy="22" r="4" fill="#fff2c4" style={{ animation: "glow 1.6s ease-in-out infinite" }} />
          <path d="M0 -18 q-8 -18 5 -30" stroke="#c8b8a0" strokeWidth="4" fill="none" opacity="0.35" style={{ animation: "drift 4s ease-in-out infinite" }} filter="url(#uk-blur)" />
        </g>

        {/* TAS D'ARGILE fraîche */}
        <g transform="translate(300,508)">
          <ellipse cx="0" cy="8" rx="44" ry="12" fill="#241608" opacity="0.4" />
          <ellipse cx="0" cy="4" rx="42" ry="13" fill="#7a5236" />
          <ellipse cx="-10" cy="-4" rx="20" ry="12" fill="#8a5e3c" />
          <ellipse cx="14" cy="0" rx="16" ry="10" fill="#96683f" />
          <path d="M-18 -4 q12 -8 26 -2" stroke="#a8784a" strokeWidth="2" fill="none" opacity="0.6" />
        </g>

        {/* LE COMPTABLE DU TEMPLE — debout près du grenier, une tablette dans
            une main, l'autre levée : il n'arrive plus à suivre les entrées. */}
        <g transform="translate(680,486)">
          <ellipse cx="0" cy="26" rx="24" ry="7" fill="#241608" opacity="0.45" />
          {/* la tunique de lin */}
          <path d="M-14 26 Q-18 -4 0 -18 Q18 -4 14 26 Z" fill="#e0d4b8" />
          <path d="M-14 26 Q-18 -4 0 -18 Q18 -4 14 26 Z" fill="#8a7a52" opacity="0.28" filter="url(#uk-grain)" />
          <path d="M-11 8 q11 5 22 0" stroke="#b8a67e" strokeWidth="2" fill="none" />
          {/* la tête, crâne rasé de scribe, barbe tressée */}
          <circle cx="0" cy="-27" r="9" fill="#a8764a" />
          <path d="M-5 -19 q5 8 10 -1" stroke="#3a2416" strokeWidth="3" fill="none" />
          {/* le bras qui tient la tablette */}
          <path d="M-13 -6 q-14 4 -18 14" stroke="#a8764a" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <g transform="translate(-34,12) rotate(-12)">
            <rect x="-9" y="-7" width="18" height="14" rx="2" fill="#a67c46" />
            <path d="M-5 -3 l3 1.6 M0 -3 l3 1.6 M-5 2 l3 1.6" stroke="#5c3f22" strokeWidth="1.1" />
          </g>
          {/* l'autre bras levé, dépité */}
          <path d="M13 -8 q14 -2 18 -14" stroke="#a8764a" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        </g>

        {/* LA COUR DES SCRIBES : natte, tablette, calame, sceau */}
        <g transform="translate(430,500)">
          {/* natte de roseau */}
          <ellipse cx="0" cy="16" rx="70" ry="16" fill="#b89a5e" />
          <ellipse cx="0" cy="16" rx="70" ry="16" fill="#6e5228" opacity="0.3" filter="url(#uk-grain)" />
          <path d="M-60 8 h120 M-62 16 h124 M-58 24 h116" stroke="#8a6e34" strokeWidth="1" opacity="0.5" />
          {/* petite tablette d'argile avec signes cunéiformes */}
          <g transform="translate(-6,4)">
            <rect x="-16" y="-8" width="32" height="22" rx="3" fill="#a67c46" />
            <path d="M-10 -3 l4 2 M-4 -3 l4 2 M2 -3 l4 2 M-10 3 l4 2 M-4 3 l4 2 M-8 9 l4 2 M-2 9 l4 2" stroke="#5c3f22" strokeWidth="1.4" />
          </g>
          {/* calame (roseau taillé) posé */}
          <g transform="translate(30,2) rotate(24)">
            <rect x="-1.5" y="-16" width="3" height="30" rx="1.5" fill="#c9a86a" />
            <path d="M-1.5 -16 l3 0 l-1.5 -4 Z" fill="#8a6e34" />
          </g>
          {/* sceau-cylindre */}
          <g transform="translate(-40,6)">
            <rect x="-8" y="-6" width="16" height="12" rx="5" fill="#4a6a8a" />
            <path d="M-6 -3 h12 M-6 0 h12 M-6 3 h12" stroke="#2c4256" strokeWidth="1" opacity="0.7" />
          </g>
        </g>

        {/* JETONS-comptes devant le grenier */}
        <g transform="translate(760,470)">
          {[[-14, 4], [-4, 8], [6, 3], [16, 9], [-2, -2], [10, -3]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4.5" fill={i % 2 ? "#b23a2a" : "#c85a44"} stroke="#7a2418" strokeWidth="0.8" />
          ))}
          <ellipse cx="0" cy="6" rx="26" ry="8" fill="none" stroke="#7a5236" strokeWidth="1" opacity="0.4" />
        </g>

        {/* épave de MARTINE, dans un coin */}
        <g transform="translate(920,502) rotate(8)">
          <ellipse cx="0" cy="12" rx="26" ry="6" fill="#140b06" opacity="0.5" />
          <path d="M0 -20 Q18 -18 20 -4 Q22 8 11 11 L-11 11 Q-22 8 -20 -4 Q-18 -18 0 -20 Z" fill="#8a6240" />
          <circle cx="-1" cy="-4" r="5.5" fill="#cfeaff" stroke="#5c3a22" strokeWidth="1.4" />
          <rect x="-12" y="3" width="22" height="7" rx="2" fill="#0c1410" stroke="#5c3a22" strokeWidth="1" />
          <text x="-1" y="9" textAnchor="middle" fontSize="5.5" fill="#5eff9e" fontFamily="ui-monospace,monospace" style={{ animation: "pulse 2.2s infinite" }}>−3300</text>
          <circle cx="13" cy="-27" r="2.3" fill="#5eff9e" style={{ animation: "pulse 1.5s infinite" }} />
          <path d="M8 -20 q6 -8 13 -6" stroke="#8a94a8" strokeWidth="2.3" fill="none" strokeLinecap="round" />
        </g>
      </PLayer>

      {/* voile de grain global */}
      <rect width="1000" height="560" fill="#2a1c10" opacity="0.08" style={{ pointerEvents: "none" }} />

      {/* zones cliquables */}
      {/* le « ? » du comptable : une trace qu'on ne puisse pas discuter */}
      {!made.includes("msg_cuneiforme") && (
        <>
          <g transform="translate(672,386)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
            <path d="M0 0 q0 -20 20 -20 q20 0 20 17 q0 14 -17 18 l0 6" fill="none" stroke="#ffd166" strokeWidth="4" />
            <circle cx="20" cy="31" r="2.6" fill="#ffd166" />
          </g>
          <Hotspot cx={692} cy={396} r={28} label="parler au comptable" reveal={reveal} onClick={() => action("comptable")} />
        </>
      )}

      <Hotspot cx={300} cy={500} r={46} label="argile" item="argile" reveal={reveal} onClick={() => collect("argile")} />
      <Hotspot cx={760} cy={470} r={40} label="jetons" item="jetons" reveal={reveal} onClick={() => collect("jetons")} />
      <Hotspot cx={460} cy={502} r={34} label="calame" item="calame" reveal={reveal} onClick={() => collect("calame")} />
      <Hotspot cx={390} cy={506} r={30} label="sceau" item="sceau" reveal={reveal} onClick={() => collect("sceau")} />
      <Hotspot cx={600} cy={462} r={46} label="four" item="four" reveal={reveal} onClick={() => collect("four")} />
      <Hotspot cx={90} cy={528} r={44} label="eau" item="eau" reveal={reveal} onClick={() => collect("eau")} />
      <Hotspot cx={920} cy={498} r={34} label="MARTINE" reveal={reveal} onClick={() => action("wreck")} />
    </svg>
  );
}
