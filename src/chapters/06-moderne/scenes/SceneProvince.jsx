import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 6 — Tableau 1 : en province, le vol de la montgolfière
   Peinture fine — place d'un bourg, matin clair : une MONTGOLFIÈRE
   décorée s'élève au-dessus de la foule ébahie. Au premier plan,
   JULES le journaliste écrit fébrilement ; à droite, un relais de
   poste prêt à emporter son article vers Paris.
   À trouver : la plume & l'encrier. Supports : la montgolfière
   (on écrit à son sujet) et le relais de chevaux (on y confie le pli).
   ============================================================ */

export default function SceneProvince({ collect, action, reveal, made = [], queteQui }) {
  const envoye = made.includes("msg_poste");
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="pv-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8fb4d8" /><stop offset="55%" stopColor="#c2d6e2" /><stop offset="100%" stopColor="#ece2c4" /></linearGradient>
        <linearGradient id="pv-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a89066" /><stop offset="100%" stopColor="#5e4c34" /></linearGradient>
        <linearGradient id="pv-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d8c49a" /><stop offset="100%" stopColor="#a88c60" /></linearGradient>
        <linearGradient id="pv-roof" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a5236" /><stop offset="100%" stopColor="#5e3620" /></linearGradient>
        <linearGradient id="pv-balloon" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2a5a9a" /><stop offset="100%" stopColor="#1c3a68" /></linearGradient>
        <filter id="pv-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="pv-mottle" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* ═══ ciel ═══ */}
      <rect width="1000" height="560" fill="url(#pv-sky)" />
      <circle cx="140" cy="96" r="30" fill="#fff4d0" opacity="0.85" />
      {[[260, 96, 120], [820, 76, 140]].map(([x, y, w], i) => <ellipse key={i} cx={x} cy={y} rx={w} ry={12} fill="#f2f2e8" opacity="0.5" />)}

      {/* ═══ LA MONTGOLFIÈRE qui s'élève (flotte doucement) ═══ */}
      <g transform="translate(560,168)">
        <g style={{ transformOrigin: "560px 168px", transformBox: "view-box", animation: "floaty 5s ease-in-out infinite" }}>
          {/* enveloppe décorée façon Montgolfier */}
          <path d="M0 -104 C64 -104 84 -52 78 -14 C74 12 48 34 0 40 C-48 34 -74 12 -78 -14 C-84 -52 -64 -104 0 -104 Z" fill="url(#pv-balloon)" />
          {/* fuseaux + guirlandes dorées */}
          <path d="M0 -104 V40 M-40 -96 Q-58 -30 -30 38 M40 -96 Q58 -30 30 38" stroke="#c8a84a" strokeWidth="2" fill="none" opacity="0.7" />
          <path d="M-78 -14 Q0 6 78 -14 M-70 -46 Q0 -30 70 -46" stroke="#c8a84a" strokeWidth="2.4" fill="none" opacity="0.8" />
          {[-52, -18, 18, 52].map((x, i) => <path key={i} d={`M${x} -80 q6 -8 12 0`} stroke="#e0c060" strokeWidth="2" fill="none" opacity="0.6" />)}
          {/* soleil brodé au centre (emblème royal) */}
          <circle cx="0" cy="-40" r="12" fill="#e0c060" opacity="0.85" />
          {[...Array(8)].map((_, i) => <path key={i} d="M0 -56 v-6" stroke="#e0c060" strokeWidth="2" transform={`rotate(${i * 45} 0 -40)`} />)}
          {/* cordages + nacelle */}
          <path d="M-58 20 L-14 56 M58 20 L14 56 M-30 34 L-6 56 M30 34 L6 56" stroke="#7a6a4a" strokeWidth="1.4" />
          <path d="M-16 56 L16 56 L12 74 L-12 74 Z" fill="#7a5230" />
          <path d="M-16 56 L16 56 L12 74 L-12 74 Z" fill="none" stroke="#4a3218" strokeWidth="1.4" />
          {/* la flamme du brûleur */}
          <g style={{ animation: "glow 1.2s ease-in-out infinite" }}>
            <path d="M0 54 q-6 -12 0 -20 q6 8 0 20 Z" fill="#ffb347" />
            <path d="M0 52 q-3 -7 0 -12 q3 5 0 12 Z" fill="#fff2c4" />
          </g>
        </g>
      </g>

      {/* ═══ couche lointaine : le bourg ═══ */}
      <PLayer depth={1}>
        <path d="M0 320 Q250 300 500 314 Q750 328 1000 306 L1000 380 L0 380 Z" fill="#8a9a66" />
        {[[120, 316, "#a83a2a"], [210, 320, "#3a6a8a"], [300, 314, "#8a6a3a"], [860, 316, "#a83a2a"], [930, 320, "#3a6a8a"]].map(([x, y, c], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <rect x="-26" y="-58" width="52" height="58" fill="url(#pv-wall)" />
            <path d="M-32 -58 L0 -84 L32 -58 Z" fill={c} />
            <rect x="-8" y="-30" width="16" height="30" fill="#3a2c1c" />
          </g>
        ))}
        {/* le clocher du bourg */}
        <g transform="translate(430,314)">
          <rect x="-20" y="-92" width="40" height="92" fill="url(#pv-wall)" />
          <path d="M-24 -92 L0 -128 L24 -92 Z" fill="#6a6052" />
          <rect x="-8" y="-70" width="16" height="24" rx="8" fill="#3a2c1c" />
        </g>
      </PLayer>

      {/* ═══ couche intermédiaire : la foule des badauds qui regarde en l'air ═══ */}
      <PLayer depth={2}>
        {[[340, 388, "#7a3a4a"], [386, 392, "#3a5a7a"], [430, 386, "#6a5a2a"], [476, 392, "#5a3a6a"], [636, 388, "#7a4a2a"], [684, 392, "#3a5a4a"], [730, 386, "#8a3a3a"]].map(([x, y, c], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <path d="M-13 44 Q-16 2 0 -6 Q16 2 13 44 Z" fill={c} />
            {/* tête levée vers le ciel */}
            <circle cx="1" cy="-14" r="8" fill="#cc9c6c" />
            <path d={`M-7 -18 q8 -6 16 -2`} stroke="#3a2c1c" strokeWidth="3" fill="none" />
            {/* un bras qui pointe le ballon */}
            <path d="M8 -2 q14 -8 16 -22" stroke={c} strokeWidth="5" fill="none" strokeLinecap="round" />
          </g>
        ))}
      </PLayer>

      {/* ═══ premier plan : place, Jules, la plume, le relais ═══ */}
      <PLayer depth={3}>
        <rect y="430" width="1000" height="130" fill="url(#pv-ground)" />
        <rect y="432" width="1000" height="128" fill="#2c2012" opacity="0.3" filter="url(#pv-mottle)" />
        <path d="M0 486 h1000 M260 430 v130 M540 430 v130 M800 430 v130" stroke="#4a3a24" strokeWidth="1.4" opacity="0.4" />
        <ellipse cx="500" cy="500" rx="460" ry="42" fill="#6e5836" opacity="0.25" />

        {/* JULES le journaliste, penché sur son carnet, la plume à la main */}
        <g transform="translate(200,472)">
          <ellipse cx="0" cy="46" rx="26" ry="7" fill="#160f08" opacity="0.4" />
          {/* habit bleu */}
          <path d="M-16 46 Q-20 2 0 -8 Q20 2 16 46 Z" fill="#2c4658" />
          <path d="M-11 8 q11 6 22 0" stroke="#1c3040" strokeWidth="2.5" fill="none" />
          {/* jabot clair */}
          <path d="M0 -4 Q-4 14 0 30 Q4 14 0 -4 Z" fill="#e6dfc8" />
          {/* tête + catogan */}
          <circle cx="0" cy="-22" r="9" fill="#d2a472" />
          <path d="M-9 -24 q9 -7 18 0 q-2 -8 -9 -8 q-7 0 -9 8" fill="#5a3f28" />
          <path d="M8 -22 q8 2 8 12" stroke="#5a3f28" strokeWidth="3" fill="none" />
          {/* bras qui écrit sur un carnet */}
          <path d="M10 2 q16 2 20 12" stroke="#2c4658" strokeWidth="6" fill="none" strokeLinecap="round" />
          <g transform="translate(30,16) rotate(-8)">
            <rect x="-14" y="-8" width="28" height="18" rx="1.5" fill="#efe9d6" />
            <path d="M-9 -3 h18 M-9 2 h14" stroke="#8a7a5a" strokeWidth="1" opacity="0.7" />
            {/* la plume qui court */}
            <path d="M8 -4 q10 -12 6 -22" stroke="#f4efe2" strokeWidth="2.5" fill="none" />
          </g>
        </g>

        {/* LA PLUME & L'ENCRIER, sur une petite caisse près de Jules */}
        <g transform="translate(120,504)">
          <path d="M-22 8 L22 8 L18 -6 L-18 -6 Z" fill="#7a5636" />
          <path d="M-18 -6 L18 -6" stroke="#4a3218" strokeWidth="1.2" opacity="0.6" />
          {/* encrier */}
          <path d="M-12 2 Q-13 -6 -4 -8 L4 -8 Q13 -6 12 2 Z" fill="#2a2620" />
          <ellipse cx="0" cy="-8" rx="8" ry="3" fill="#0c0a08" />
          {/* la plume plantée dedans */}
          <g transform="translate(2,-8) rotate(20)">
            <path d="M0 0 Q6 -26 2 -46 Q-3 -26 0 0 Z" fill="#f4efe2" stroke="#c9be9a" strokeWidth="1" />
            <path d="M1 -4 V-40" stroke="#c9be9a" strokeWidth="1" />
          </g>
        </g>

        {/* LE RELAIS DE POSTE (à droite) : un cheval sellé + le postillon,
            prêts à emporter l'article vers Paris */}
        <g transform="translate(770,460)">
          <ellipse cx="0" cy="48" rx="46" ry="9" fill="#241608" opacity="0.4" />
          {/* le cheval */}
          <path d="M-34 8 Q-40 -16 -10 -18 L28 -14 Q44 -12 42 4 Q40 18 24 18 L-20 16 Q-34 16 -34 8 Z" fill="#5a3f2a" />
          <path d="M30 -10 Q50 -16 54 -38 L64 -38" stroke="#5a3f2a" strokeWidth="13" strokeLinecap="round" fill="none" />
          <path d="M60 -42 q11 -2 13 9 l-7 7 q-11 0 -11 -9 Z" fill="#5a3f2a" />
          <path d="M56 -48 q-2 -9 5 -11" stroke="#5a3f2a" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M38 -20 q-4 9 -11 11 M45 -26 q-3 9 -9 13" stroke="#241608" strokeWidth="3" fill="none" />
          <path d="M-24 14 L-26 48 M-6 16 L-6 48 M16 16 L18 48 M32 12 L36 46" stroke="#3a2618" strokeWidth="6" strokeLinecap="round" />
          {/* selle + sacoche de courrier */}
          <path d="M-14 -14 q14 -8 30 0 l-2 8 q-14 -6 -26 0 Z" fill="#3a2414" />
          <rect x="-20" y="-6" width="14" height="14" rx="2" fill="#6e4c2e" /><circle cx="-13" cy="1" r="2.4" fill="#a83828" />
          {/* le postillon debout, tenant la bride */}
          <g transform="translate(-52,2)">
            <path d="M-9 4 Q-12 -14 0 -17 Q12 -14 9 4 L7 26 L-7 26 Z" fill="#3a4a8a" />
            <circle cx="0" cy="-24" r="7.5" fill="#cc9c6c" />
            <path d="M-9 -28 h18 l-3 -5 h-12 Z" fill="#2c2c3a" />
            <path d="M8 -8 q14 -2 20 6" stroke="#cc9c6c" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          </g>
        </g>

        {/* épave de MARTINE, échouée dans un coin de la place */}
        <g transform="translate(930,512) rotate(8)">
          <ellipse cx="0" cy="12" rx="24" ry="6" fill="#0a0603" opacity="0.6" />
          <path d="M0 -18 Q16 -16 18 -4 Q20 8 10 10 L-10 10 Q-20 8 -18 -4 Q-16 -16 0 -18 Z" fill="#8a6240" />
          <circle cx="-1" cy="-4" r="5" fill="#cfeaff" stroke="#5c3a22" strokeWidth="1.4" />
          <rect x="-12" y="2" width="22" height="7" rx="2" fill="#0c1410" stroke="#5c3a22" strokeWidth="1" />
          <text x="-1" y="8" textAnchor="middle" fontSize="5.5" fill="#5eff9e" fontFamily="ui-monospace,monospace" style={{ animation: "pulse 2.2s infinite" }}>1783</text>
          <circle cx="12" cy="-25" r="2.2" fill="#5eff9e" style={{ animation: "pulse 1.5s infinite" }} />
        </g>

        {/* RÉSULTAT (msg_poste) : le courrier part au galop, l'article en sacoche */}
        {envoye && (
          <g transform="translate(500,452)" style={{ animation: "fadein 1s ease-out" }}>
            <ellipse cx="20" cy="20" rx="30" ry="6" fill="#c8b088" opacity="0.35" style={{ animation: "drift 3s ease-in-out infinite" }} />
            <path d="M-18 8 Q-22 -8 -6 -10 L18 -10 Q26 -8 24 0 Q20 8 -18 8 Z" fill="#4a3222" />
            <path d="M18 -10 Q28 -14 32 -26 L38 -24 Q34 -10 22 -8 Z" fill="#4a3222" />
            <path d="M-14 6 l-8 14 M-2 7 l-2 16 M16 6 l8 14 M24 2 l10 10" stroke="#4a3222" strokeWidth="3.4" strokeLinecap="round" />
            <path d="M-2 -12 Q0 -24 8 -24 Q14 -22 12 -12 Z" fill="#3a4a8a" />
            <circle cx="6" cy="-26" r="4" fill="#cc9c6c" />
          </g>
        )}
      </PLayer>

      {/* voile de grain global */}
      <rect width="1000" height="560" fill="#231a10" opacity="0.05" style={{ pointerEvents: "none" }} />

      {/* ═══ zones cliquables ═══ */}
      {/* le « ? » de Jules */}
      {queteQui === "jules" && (
        <>
          <g transform="translate(182,398)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
            <path d="M0 0 q0 -20 20 -20 q20 0 20 17 q0 14 -17 18 l0 6" fill="none" stroke="#ffd166" strokeWidth="4" />
            <circle cx="20" cy="31" r="2.6" fill="#ffd166" />
          </g>
          <Hotspot cx={200} cy={452} r={30} label="parler à Jules" reveal={reveal} onClick={() => action("jules")} />
        </>
      )}

      {/* la montgolfière (support : on écrit à son sujet) */}
      <Hotspot cx={560} cy={150} r={78} label="la montgolfière" item="montgolfiere" reveal={reveal} onClick={() => collect("montgolfiere")} />
      {/* la plume & l'encrier */}
      <Hotspot cx={120} cy={500} r={30} label="plume & encrier" item="plume" reveal={reveal} onClick={() => collect("plume")} />
      {/* le relais de chevaux (support : on y confie le pli) */}
      <Hotspot cx={772} cy={452} r={60} label="relais de chevaux" item="chevaux" reveal={reveal} onClick={() => collect("chevaux")} />
      {/* l'épave de MARTINE */}
      <Hotspot cx={930} cy={506} r={28} label="MARTINE" reveal={reveal} onClick={() => action("wreck")} />
          {/* AMBIANCE : petit vol d'oiseaux qui traverse le ciel */}
      <g opacity="0.75">
        <animateTransform attributeName="transform" type="translate"
          values="-40,0; 1050,-20" dur="28s" repeatCount="indefinite" />
        <path d="M0 130 q6 -8 12 0 q6 -8 12 0" stroke="#1a1408" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M28 142 q6 -8 12 0 q6 -8 12 0" stroke="#1a1408" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M54 128 q6 -8 12 0 q6 -8 12 0" stroke="#1a1408" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
</svg>
  );
}
