import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 7 — Tableau-ÉNIGME : « Relier deux continents ? »
   ------------------------------------------------------------
   Le pont d'un navire câblier. L'ingénieur (cliquable) pose son
   problème : de l'autre côté de l'océan, il y a l'Amérique.
   → câble + océan → le câble atteint l'autre rive : un phare
     s'allume au loin et un signal file dans le câble.
   Ce décor réagit à l'état du jeu via la prop `made`.
   ============================================================ */

export default function SceneCable({ collect, action, reveal, made = [] }) {
  const built = made.includes("msg_cable"); // le câble relie les deux continents

  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="cb-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5a7898" /><stop offset="60%" stopColor="#a8bcc4" /><stop offset="100%" stopColor="#e0d8b8" /></linearGradient>
        <linearGradient id="cb-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5a8a9a" /><stop offset="55%" stopColor="#356a7e" /><stop offset="100%" stopColor="#204a5e" /></linearGradient>
        <linearGradient id="cb-deck" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9a7a52" /><stop offset="100%" stopColor="#5e4630" /></linearGradient>
        <linearGradient id="cb-hull" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4a4038" /><stop offset="100%" stopColor="#2a241e" /></linearGradient>
        <radialGradient id="cb-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffe9a8" stopOpacity="0.75" /><stop offset="100%" stopColor="#ffe9a8" stopOpacity="0" /></radialGradient>
        <filter id="cb-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* ═══ ciel marin ═══ */}
      <rect width="1000" height="560" fill="url(#cb-sky)" />
      <circle cx="820" cy="120" r="34" fill="#fff2d0" opacity="0.7" />
      <path d="M160 110 q8 -8 16 0 q8 -8 16 0 M240 140 q6 -6 12 0 q6 -6 12 0" stroke="#4a5460" strokeWidth="2.2" fill="none" opacity="0.5" />

      {/* ═══ couche lointaine : l'océan + (une fois relié) l'AUTRE RIVE ═══ */}
      <PLayer depth={1}>
        <rect y="260" width="1000" height="120" fill="url(#cb-sea)" />
        {[276, 300, 326, 352].map((y, i) => (
          <path key={i} d={`M0 ${y} q110 ${i % 2 ? 5 : -5} 220 0 t220 0 t220 0 t220 0`} stroke="#bfe0dc" strokeWidth="1.5" fill="none" opacity="0.35" style={{ animation: `ripple ${3 + (i % 3)}s ease-in-out infinite` }} />
        ))}
        <path d="M780 266 L860 266 L890 380 L740 380 Z" fill="#f0e6c8" opacity="0.16" />

        {/* APPARAÎT : la côte d'Amérique, atteinte par le câble */}
        {built && (
          <g style={{ animation: "pulse 0.9s ease-out 2" }}>
            <path d="M700 262 Q800 250 900 256 Q960 259 1000 254 L1000 268 L700 268 Z" fill="#5a6a4a" />
            <path d="M700 262 Q800 250 900 256 Q960 259 1000 254 L1000 268 L700 268 Z" fill="#2c3418" opacity="0.35" filter="url(#cb-grain)" />
            {/* un phare qui clignote : le message est arrivé !
                (x ≤ 860 : au-delà, le décor est rogné selon la fenêtre) */}
            <g transform="translate(824,254)">
              <ellipse cx="0" cy="30" rx="40" ry="16" fill="url(#cb-glow)" />
              <path d="M-5 8 L-3 -18 L3 -18 L5 8 Z" fill="#e8e0d0" />
              <path d="M-3 -12 h6 M-3 -4 h6" stroke="#a83828" strokeWidth="2" />
              <circle cx="0" cy="-22" r="3.4" fill="#ffe08a" style={{ animation: "pulse 1.1s infinite" }} />
            </g>
          </g>
        )}
      </PLayer>

      {/* ═══ couche intermédiaire : la mer proche ═══ */}
      <PLayer depth={2}>
        <rect y="360" width="1000" height="80" fill="#2c586e" />
        {[380, 404, 424].map((y, i) => (
          <path key={i} d={`M0 ${y} q120 ${i % 2 ? 6 : -6} 240 0 t240 0 t240 0 t240 0`} stroke="#7ab0b8" strokeWidth="2" fill="none" opacity="0.4" style={{ animation: `ripple ${3 + (i % 3)}s ease-in-out infinite` }} />
        ))}
      </PLayer>

      {/* ═══ premier plan : le pont du navire câblier ═══ */}
      <PLayer depth={3}>
        <path d="M0 560 L0 430 Q250 414 520 434 Q760 452 1000 428 L1000 560 Z" fill="url(#cb-hull)" />
        <rect y="424" width="1000" height="40" fill="url(#cb-deck)" />
        <rect y="424" width="1000" height="40" fill="#2c1c10" opacity="0.3" filter="url(#cb-grain)" />
        <path d="M0 448 h1000 M120 424 v136 M340 424 v136 M560 424 v136 M780 424 v136" stroke="#3a2a18" strokeWidth="1.6" opacity="0.4" />
        <rect y="460" width="1000" height="100" fill="url(#cb-deck)" />
        <rect y="462" width="1000" height="98" fill="#2c1c10" opacity="0.28" filter="url(#cb-grain)" />

        {/* LE GRAND TOURET — plein tant que le câble n'est pas posé, presque vide après */}
        <g transform="translate(300,470)">
          <ellipse cx="0" cy="52" rx="76" ry="14" fill="#160f08" opacity="0.5" />
          <circle cx="0" cy="0" r="58" fill="#5a3f24" />
          <circle cx="0" cy="0" r="58" fill="none" stroke="#3a2814" strokeWidth="4" />
          {!built
            ? [50, 42, 34, 26, 18].map((r, i) => <circle key={i} cx="0" cy="0" r={r} fill="none" stroke={i % 2 ? "#3a3a42" : "#4a4a52"} strokeWidth="6" />)
            : [22, 16].map((r, i) => <circle key={i} cx="0" cy="0" r={r} fill="none" stroke={i % 2 ? "#3a3a42" : "#4a4a52"} strokeWidth="5" opacity="0.8" />)}
          <circle cx="0" cy="0" r="8" fill="#6a6c72" />
          <path d="M-64 52 L-40 8 M64 52 L40 8" stroke="#3a2814" strokeWidth="8" strokeLinecap="round" />
        </g>

        {/* le câble qui file du touret vers la poulie, puis dans la mer */}
        <path d="M356 470 Q520 452 640 448 Q760 444 820 430" stroke="#2c2c34" strokeWidth="6" fill="none" />
        <path d="M356 470 Q520 452 640 448 Q760 444 820 430" stroke="#4a4a54" strokeWidth="2" fill="none" opacity="0.6" />
        {/* APPARAÎT : un signal lumineux qui file dans le câble */}
        {built && (
          <circle r="5" fill="#ffe08a">
            <animateMotion dur="1.8s" repeatCount="indefinite" path="M356 470 Q520 452 640 448 Q760 444 820 430" />
          </circle>
        )}
        {/* poulie de guidage au bord */}
        <g transform="translate(830,428)">
          <circle cx="0" cy="0" r="16" fill="#5a5c62" stroke="#3a3c42" strokeWidth="3" />
          <circle cx="0" cy="0" r="6" fill="#3a3c42" />
        </g>
        <path d="M842 434 Q900 460 940 500" stroke="#2c2c34" strokeWidth="6" fill="none" />
        <ellipse cx="944" cy="502" rx="18" ry="5" fill="#bfe0dc" opacity="0.4" style={{ animation: "ripple 2.6s ease-in-out infinite" }} />

        {/* « ? » de l'énigme, tant que le câble n'est pas posé */}
        {!built && (
          <g transform="translate(516,350)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
            <path d="M0 0 q0 -24 24 -24 q24 0 24 20 q0 17 -20 22 l0 8" fill="none" stroke="#ffd166" strokeWidth="4" />
            <circle cx="24" cy="37" r="3" fill="#ffd166" />
          </g>
        )}

        {/* L'INGÉNIEUR : debout, il regarde vers l'Amérique */}
        <g transform="translate(540,470)">
          <path d="M-13 6 Q-17 -16 0 -20 Q17 -16 13 6 L11 34 L-11 34 Z" fill="#3a3a4a" />
          <path d="M-13 6 Q-17 -16 0 -20 Q17 -16 13 6 L11 34 L-11 34 Z" fill="#12121c" opacity="0.22" filter="url(#cb-grain)" />
          <circle cx="0" cy="-30" r="9" fill="#d8a884" />
          {/* haut-de-forme d'ingénieur */}
          <path d="M-10 -36 h20 M-7 -50 h14 v14 h-14 Z" fill="#241c20" />
          <path d="M-6 -26 q6 8 12 0" stroke="#6a4a38" strokeWidth="3" fill="none" />
          {/* bras tendu vers le large */}
          <path d="M11 -8 q20 -4 30 -18" stroke="#d8a884" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>

        {/* un matelot qui surveille le câble */}
        <g transform="translate(430,452)">
          <path d="M-9 4 Q-12 -12 0 -15 Q12 -12 9 4 L7 22 L-7 22 Z" fill="#3a4a6a" />
          <circle cx="0" cy="-22" r="7" fill="#c8a882" />
          <path d="M-9 -24 h18 M-6 -30 h12 v6 h-12 Z" fill="#e8e4da" />
          <path d="M7 -6 q12 -2 16 6" stroke="#c8a882" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </g>

        <path d="M0 500 h1000" stroke="#3a2a18" strokeWidth="4" opacity="0.5" />
      </PLayer>

      <rect width="1000" height="560" fill="#141810" opacity="0.05" style={{ pointerEvents: "none" }} />

      {/* ═══ zones cliquables ═══ */}
      <Hotspot cx={540} cy={444} r={48} label="l'ingénieur" reveal={reveal} onClick={() => action("field")} />
      {!built && (
        <>
          <Hotspot cx={300} cy={468} r={64} label="câble" item="cable" reveal={reveal} onClick={() => collect("cable")} />
          <Hotspot cx={740} cy={320} r={80} label="océan" item="ocean" reveal={reveal} onClick={() => collect("ocean")} />
        </>
      )}
    </svg>
  );
}
