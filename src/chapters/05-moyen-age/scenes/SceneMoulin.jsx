import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 5 — Tableau : le moulin à papier (extérieur)
   Peinture fine — au bord de la rivière : un MOULIN À EAU dont
   la roue tourne, l'atelier du papetier avec sa CUVE et ses
   feuilles qui sèchent, et un CHIFFONNIER qui parcourt le chemin
   en criant sa marchandise, sa hotte pleine de vieux chiffons.
   On ramasse les chiffons, on les broie dans la cuve → du PAPIER
   (la recette venue de Chine, bien moins cher que le parchemin).
   ============================================================ */

export default function SceneMoulin({ collect, action, reveal, made = [], queteQui }) {
  const papier = made.includes("papier");
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="mo-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8fb0cc" /><stop offset="55%" stopColor="#c2d2d8" /><stop offset="100%" stopColor="#e6e2c8" /></linearGradient>
        <linearGradient id="mo-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6a94a0" /><stop offset="100%" stopColor="#3e6270" /></linearGradient>
        <linearGradient id="mo-stone" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9a9080" /><stop offset="100%" stopColor="#6a6052" /></linearGradient>
        <linearGradient id="mo-wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a6238" /><stop offset="100%" stopColor="#5a3f24" /></linearGradient>
        <linearGradient id="mo-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9a8a5e" /><stop offset="100%" stopColor="#5e5030" /></linearGradient>
        <filter id="mo-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="mo-mottle" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* ═══ ciel ═══ */}
      <rect width="1000" height="560" fill="url(#mo-sky)" />
      {[[200, 90, 130], [560, 66, 160], [760, 116, 100]].map(([x, y, w], i) => (
        <ellipse key={i} cx={x} cy={y} rx={w} ry={13} fill="#f2f2e8" opacity="0.55" />
      ))}
      <circle cx="150" cy="104" r="30" fill="#fff4d0" opacity="0.85" />

      {/* ═══ couche lointaine : collines, arbres, le moulin ═══ */}
      <PLayer depth={1}>
        <path d="M0 300 Q250 280 500 292 Q750 304 1000 286 L1000 360 L0 360 Z" fill="#8a9a6a" />
        <path d="M0 330 Q300 314 620 326 Q820 334 1000 322 L1000 380 L0 380 Z" fill="#79895c" />
        {/* quelques arbres */}
        {[[90, 320], [300, 312], [430, 322]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <rect x="-4" y="-4" width="8" height="26" fill="#6a4c2e" />
            <circle cx="0" cy="-18" r="22" fill="#5a7a44" /><circle cx="-14" cy="-8" r="16" fill="#658149" /><circle cx="14" cy="-8" r="16" fill="#557040" />
          </g>
        ))}

        {/* LE MOULIN À EAU (bâtiment de pierre + colombages, à droite) */}
        <g transform="translate(800,300)">
          {/* corps du bâtiment */}
          <rect x="-70" y="-120" width="150" height="180" fill="url(#mo-stone)" />
          <rect x="-70" y="-120" width="150" height="180" fill="#2c2418" opacity="0.22" filter="url(#mo-grain)" />
          {/* étage à colombages */}
          <rect x="-70" y="-120" width="150" height="60" fill="url(#mo-wood)" />
          <path d="M-70 -90 h150 M-30 -120 v60 M10 -120 v60 M50 -120 v60 M-70 -120 l40 60 M50 -120 l30 60" stroke="#4a3218" strokeWidth="3" opacity="0.5" />
          {/* toit */}
          <path d="M-84 -120 L5 -168 L94 -120 Z" fill="#7a4632" />
          <path d="M-84 -120 L5 -168" stroke="#5a3020" strokeWidth="3" opacity="0.6" />
          {/* petite lucarne + fenêtres */}
          <rect x="-8" y="-150" width="26" height="18" fill="#3a2c1c" />
          {[-46, 40].map((x, i) => <rect key={i} x={x} y="-40" width="22" height="30" rx="2" fill="#2c2418" />)}
        </g>
      </PLayer>

      {/* ═══ couche intermédiaire : la roue, la rivière, feuilles au séchoir ═══ */}
      <PLayer depth={2}>
        {/* LA RIVIÈRE en travers */}
        <rect y="392" width="1000" height="72" fill="url(#mo-water)" />
        <rect y="394" width="1000" height="70" fill="#2a3e46" opacity="0.22" filter="url(#mo-mottle)" />
        {[406, 424, 444].map((y, i) => <path key={i} d={`M0 ${y} q120 -6 240 0 q120 6 240 0 q120 -6 240 0 q120 6 240 0`} stroke="#bcd2d4" strokeWidth="1.6" fill="none" opacity="0.4" />)}

        {/* LA ROUE À AUBES du moulin (tourne) — collée au flanc gauche du bâtiment */}
        <g transform="translate(704,404)">
          <ellipse cx="6" cy="6" rx="86" ry="86" fill="#000" opacity="0.12" />
          {/* axe */}
          <circle cx="0" cy="0" r="9" fill="#4a3218" />
          {/* la roue qui tourne : animation SUR UN G IMBRIQUÉ (ne casse pas la position) */}
          <g style={{ transformOrigin: "704px 404px", transformBox: "view-box", animation: "spin 9s linear infinite" }}>
            <circle cx="0" cy="0" r="82" fill="none" stroke="#6a4c2e" strokeWidth="9" />
            <circle cx="0" cy="0" r="58" fill="none" stroke="#5a3f24" strokeWidth="5" />
            {[...Array(12)].map((_, i) => (
              <g key={i} transform={`rotate(${i * 30})`}>
                <rect x="-5" y="-82" width="10" height="30" fill="#7a5636" />
                <path d="M-14 -82 h28 v-10 h-28 Z" fill="#6a4c2e" />
                <path d="M-3 -58 v58" stroke="#5a3f24" strokeWidth="3" />
              </g>
            ))}
          </g>
          {/* éclaboussures en bas de la roue */}
          <g style={{ animation: "glow 1.4s ease-in-out infinite" }}>
            <ellipse cx="0" cy="80" rx="30" ry="8" fill="#dfeef0" opacity="0.6" />
            <circle cx="-16" cy="72" r="3" fill="#eef6f6" opacity="0.7" /><circle cx="14" cy="76" r="2.4" fill="#eef6f6" opacity="0.7" />
          </g>
        </g>

        {/* SÉCHOIR : des feuilles de papier suspendues à une corde sous un auvent */}
        <g transform="translate(300,300)">
          {/* poteaux + auvent */}
          <rect x="-140" y="-6" width="8" height="150" fill="#6a4c2e" /><rect x="128" y="-6" width="8" height="150" fill="#6a4c2e" />
          <path d="M-150 -6 L146 -6 L138 -26 L-142 -26 Z" fill="#8a5a34" />
          <path d="M-132 22 q140 18 260 0" stroke="#5a4630" strokeWidth="2" fill="none" />
          {[-110, -70, -30, 10, 50, 90].map((x, i) => (
            <g key={i} transform={`translate(${x},24)`}>
              <rect x="-16" y="0" width="32" height="42" fill="#efe9d6" transform={`rotate(${i % 2 ? 2 : -2})`} />
              <rect x="-16" y="0" width="32" height="42" fill="#cabf9a" opacity="0.25" transform={`rotate(${i % 2 ? 2 : -2})`} />
              <circle cx="0" cy="0" r="2" fill="#5a4630" />
            </g>
          ))}
        </g>
      </PLayer>

      {/* ═══ premier plan : berge, la cuve + le papetier, le chiffonnier ═══ */}
      <PLayer depth={3}>
        <rect y="452" width="1000" height="108" fill="url(#mo-ground)" />
        <rect y="454" width="1000" height="106" fill="#2c2214" opacity="0.3" filter="url(#mo-mottle)" />
        <ellipse cx="500" cy="500" rx="460" ry="44" fill="#7a6844" opacity="0.25" />

        {/* LA CUVE DU PAPETIER + le papetier qui puise avec le tamis */}
        <g transform="translate(560,472)">
          <ellipse cx="0" cy="44" rx="62" ry="12" fill="#160f08" opacity="0.4" />
          {/* la cuve (grande) */}
          <path d="M-48 -16 L48 -16 L40 40 L-40 40 Z" fill="url(#mo-wood)" />
          <path d="M-48 -16 L48 -16 L40 40 L-40 40 Z" fill="#2a1c10" opacity="0.22" filter="url(#mo-grain)" />
          <path d="M-28 -16 L-24 40 M0 -16 v56 M28 -16 L24 40" stroke="#4a3218" strokeWidth="1.4" opacity="0.5" />
          <path d="M-46 -3 L46 -3 M-43 20 L43 20" stroke="#3a2412" strokeWidth="3" />
          {/* surface d'eau + pâte de chiffon */}
          <ellipse cx="0" cy="-16" rx="47" ry="12" fill="#9aa29a" />
          <ellipse cx="0" cy="-16" rx="47" ry="12" fill="#d8dcd2" opacity="0.28" />
          {[[-20, -18], [8, -15], [24, -19], [-6, -14], [16, -18]].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="4" ry="1.8" fill="#eef0e8" opacity="0.8" />
          ))}
          {/* le papetier, tablier de cuir, qui plonge le tamis */}
          <g transform="translate(-62,-6)">
            <path d="M-16 40 Q-20 2 0 -8 Q20 2 16 40 Z" fill="#8a5a34" />
            <path d="M-13 8 q13 6 26 0" stroke="#5a3a1e" strokeWidth="2.5" fill="none" />
            <circle cx="0" cy="-20" r="10" fill="#cc9c6c" />
            <path d="M-10 -24 q10 -6 20 0 q-2 -8 -10 -8 q-8 0 -10 8" fill="#eae4d4" />
            {/* bras tendus vers la cuve, tenant le tamis */}
            <path d="M12 -8 q20 -2 34 8" stroke="#cc9c6c" strokeWidth="5" fill="none" strokeLinecap="round" />
            <g transform="translate(48,2) rotate(12)">
              <rect x="-3" y="-14" width="30" height="20" rx="2" fill="#8a6a3a" />
              <rect x="1" y="-10" width="22" height="12" fill="#cabf90" />
              <path d="M1 -4 h22 M8 -10 v12 M15 -10 v12" stroke="#9a8a5a" strokeWidth="0.7" opacity="0.7" />
            </g>
          </g>
        </g>

        {/* LE CHIFFONNIER : hotte de chiffons sur le dos, main en porte-voix,
            il crie sa marchandise (à gauche, sur le chemin) */}
        <g transform="translate(150,486)">
          <ellipse cx="0" cy="40" rx="34" ry="9" fill="#160f08" opacity="0.4" />
          {/* la hotte d'osier pleine de chiffons colorés (dans le dos) */}
          <g transform="translate(20,-2)">
            <path d="M-4 6 Q-8 -22 14 -26 Q34 -22 30 6 Z" fill="#9a6a3a" />
            <path d="M-2 -4 q16 5 30 0 M0 -14 q14 5 26 0" stroke="#6e4c24" strokeWidth="1.4" fill="none" opacity="0.6" />
            {[["#a8302a", 2, -24], ["#2a6a9a", 16, -28], ["#c8b060", 26, -22], ["#3a8a4a", 10, -22], ["#8a4a8a", 22, -14]].map(([c, x, y], i) => (
              <path key={i} d={`M${x} ${y} q5 -6 10 0 q-2 5 -5 6 q-4 -1 -5 -6`} fill={c} />
            ))}
          </g>
          {/* le personnage, tunique brune, bâton de marche */}
          <path d="M-16 40 Q-20 0 -2 -10 Q16 -2 12 40 Z" fill="#6e5030" />
          <path d="M-14 16 q12 6 24 0" stroke="#4e3820" strokeWidth="2.5" fill="none" />
          <circle cx="-4" cy="-24" r="9" fill="#cc9c6c" />
          {/* chaperon (capuche pointue) */}
          <path d="M-14 -26 Q-6 -40 6 -30 Q10 -22 2 -18 Q-12 -18 -14 -26 Z" fill="#7a3a2a" />
          <path d="M6 -30 q10 -2 12 8" stroke="#7a3a2a" strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* main en porte-voix près de la bouche */}
          <path d="M-12 -8 q-14 4 -16 -8" stroke="#cc9c6c" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <path d="M-26 -18 q-4 6 2 10" stroke="#cc9c6c" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* bâton */}
          <path d="M12 -6 L22 40" stroke="#5a3f24" strokeWidth="3" strokeLinecap="round" />

          {/* la bulle « Chiffons ! » qui pulse */}
          <g transform="translate(-58,-52)" style={{ animation: "glow 1.8s ease-in-out infinite" }}>
            <rect x="-2" y="-16" width="70" height="26" rx="7" fill="#fbf6e8" />
            <path d="M34 10 l-6 12 l16 -6 Z" fill="#fbf6e8" />
            <text x="33" y="2" textAnchor="middle" fontSize="13" fill="#7a3020" fontFamily="Palatino, Georgia, serif" style={{ fontWeight: 700 }}>Chiffons !</text>
          </g>
        </g>

        {/* RÉSULTAT (papier) : une belle feuille blanche fraîchement formée,
            posée sur un feutre, qui « pop » et brille doucement */}
        {papier && (
          <g transform="translate(760,498)" style={{ animation: "fadein 1s ease-out" }}>
            <ellipse cx="0" cy="18" rx="34" ry="8" fill="#160f08" opacity="0.4" />
            {/* pile de feutres + la feuille blanche dessus */}
            <path d="M-30 14 L30 14 L26 6 L-26 6 Z" fill="#8a7a56" />
            <path d="M-28 8 L28 8 L24 0 L-24 0 Z" fill="#a89a72" />
            <g transform="rotate(-3)">
              <rect x="-26" y="-30" width="52" height="34" rx="1.5" fill="#f6f2e6" style={{ filter: "drop-shadow(0 0 7px #fff6d8)" }} />
              <rect x="-26" y="-30" width="52" height="34" rx="1.5" fill="none" stroke="#d8d0bc" strokeWidth="1" />
              <path d="M-18 -22 h36 M-18 -14 h30 M-18 -6 h36" stroke="#dfd8c4" strokeWidth="1.4" opacity="0.7" />
            </g>
          </g>
        )}
      </PLayer>

      {/* voile global chaud */}
      <rect width="1000" height="560" fill="#221a0c" opacity="0.05" style={{ pointerEvents: "none" }} />

      {/* ═══ zones cliquables ═══ */}
      {/* le « ? » du papetier (tant qu'il guide la quête) */}
      {queteQui === "papetier" && (
        <>
          <g transform="translate(542,346)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
            <path d="M0 0 q0 -20 20 -20 q20 0 20 17 q0 14 -17 18 l0 6" fill="none" stroke="#ffd166" strokeWidth="4" />
            <circle cx="20" cy="31" r="2.6" fill="#ffd166" />
          </g>
          <Hotspot cx={486} cy={462} r={26} label="parler au papetier" reveal={reveal} onClick={() => action("papetier")} />
        </>
      )}

      {/* le chiffonnier (crie sa marchandise) et sa hotte de chiffons —
          zones séparées : cliquer l'homme = l'écouter ; la hotte = prendre */}
      <Hotspot cx={136} cy={480} r={22} label="le chiffonnier" reveal={reveal} onClick={() => action("chiffonnier")} />
      <Hotspot cx={184} cy={466} r={22} label="vieux chiffons de lin" item="chiffons" reveal={reveal} onClick={() => collect("chiffons")} />
      {/* la cuve du papetier (support : on y broie les chiffons) */}
      <Hotspot cx={565} cy={472} r={42} label="la cuve du papetier" item="cuve" reveal={reveal} onClick={() => collect("cuve")} />
    </svg>
  );
}
