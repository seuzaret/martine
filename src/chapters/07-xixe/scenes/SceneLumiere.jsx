import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 7 — Tableau-ÉNIGME : « Et si les photos bougeaient ? »
   ------------------------------------------------------------
   L'atelier des frères Lumière, à Lyon. Sur le pied, RIEN encore :
   juste une bande de photos qui pend et une manivelle sur le banc.
   Louis Lumière (cliquable) pose sa question.
   → photos + manivelle → le cinématographe se monte, le faisceau
     jaillit et l'image se met à BOUGER sur le drap.
   Ce décor réagit à l'état du jeu via la prop `made`.
   ============================================================ */

export default function SceneLumiere({ collect, action, reveal, made = [] }) {
  const built = made.includes("msg_cinema"); // le cinéma est né

  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="lm-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6a6250" /><stop offset="100%" stopColor="#3e3a2e" /></linearGradient>
        <linearGradient id="lm-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7a6042" /><stop offset="100%" stopColor="#3a2c1c" /></linearGradient>
        <linearGradient id="lm-wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9a6a3a" /><stop offset="100%" stopColor="#5a3a1e" /></linearGradient>
        <linearGradient id="lm-beam" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#fff4d0" stopOpacity="0.75" /><stop offset="100%" stopColor="#fff4d0" stopOpacity="0.08" /></linearGradient>
        <radialGradient id="lm-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffe9a8" stopOpacity="0.7" /><stop offset="100%" stopColor="#ffe9a8" stopOpacity="0" /></radialGradient>
        <filter id="lm-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* ═══ mur d'atelier ═══ */}
      <rect width="1000" height="560" fill="url(#lm-wall)" />
      <rect width="1000" height="560" fill="#1c1810" opacity="0.24" filter="url(#lm-grain)" />
      <rect y="360" width="1000" height="60" fill="#4a3a26" opacity="0.5" />
      <path d="M0 360 h1000" stroke="#2c2014" strokeWidth="3" />

      {/* ═══ couche lointaine : l'affiche « La Sortie de l'usine Lumière » ═══ */}
      <PLayer depth={1}>
        <g transform="translate(790,176)">
          <rect x="-92" y="-106" width="184" height="212" fill="#e8dcc0" stroke="#5a3f24" strokeWidth="7" />
          <rect x="-92" y="-106" width="184" height="212" fill="#2c1c10" opacity="0.08" filter="url(#lm-grain)" />
          <rect x="-80" y="-92" width="160" height="64" fill="#c9b78a" />
          <text x="0" y="-52" textAnchor="middle" fontSize="14" fill="#7a2418" fontFamily="Georgia,serif" fontWeight="bold">CINÉMATOGRAPHE</text>
          <text x="0" y="-36" textAnchor="middle" fontSize="10" fill="#3a2c1c" fontFamily="Georgia,serif">Lumière</text>
          {/* la scène : les ouvrières et ouvriers sortent de l'usine */}
          <g transform="translate(0,36)">
            {/* la façade de l'usine + le grand portail */}
            <rect x="-76" y="-30" width="152" height="58" fill="#8a7a5e" />
            <path d="M-30 28 L-30 -22 Q0 -32 30 -22 L30 28 Z" fill="#3a3028" />
            {/* la foule qui sort */}
            {[-52, -38, -22, -6, 10, 26, 42, 56].map((x, i) => (
              <g key={i} transform={`translate(${x},${16 + (i % 2) * 4})`}>
                <path d="M-3 12 Q-4 0 0 -2 Q4 0 3 12 Z" fill={i % 3 ? "#4a3a30" : "#2c2420"} />
                <circle cx="0" cy="-6" r="2.6" fill="#c8a882" />
                {i % 2 === 0 && <path d="M-5 -8 h10" stroke="#2c2420" strokeWidth="1.6" />}
              </g>
            ))}
          </g>
          <text x="0" y="94" textAnchor="middle" fontSize="9.5" fill="#3a2c1c" fontFamily="Georgia,serif" fontStyle="italic">La Sortie de l'usine Lumière · 1895</text>
        </g>
      </PLayer>

      {/* ═══ couche intermédiaire : LA BANDE DE PHOTOS suspendue (la pièce) ═══ */}
      <PLayer depth={2}>
        {!built && (
          <g transform="translate(300,120)">
            <path d="M-120 0 h240" stroke="#3a2c1c" strokeWidth="5" />
            <path d="M-90 2 Q-90 200 -40 250 Q10 200 60 250 Q110 200 100 2" stroke="#241c14" strokeWidth="26" fill="none" opacity="0.9" />
            {[...Array(9)].map((_, i) => {
              const t = i / 8;
              return (
                <g key={i} transform={`translate(${-70 + Math.sin(t * 3) * 6},${20 + i * 22})`}>
                  <rect x="-12" y="-9" width="24" height="18" fill="#cdbfa4" />
                  <circle cx="-6" cy="-4" r="3" fill="#9a8a68" />
                  <path d="M-8 4 q8 -6 16 0" stroke="#7a6a48" strokeWidth="1.4" fill="none" />
                </g>
              );
            })}
            {[...Array(8)].map((_, i) => (
              <g key={i} transform={`translate(${86 - Math.sin(i / 8 * 3) * 6},${40 + i * 22})`}>
                <rect x="-12" y="-9" width="24" height="18" fill="#cdbfa4" />
                <circle cx="6" cy="-4" r="3" fill="#9a8a68" />
                <path d="M-8 4 q8 -6 16 0" stroke="#7a6a48" strokeWidth="1.4" fill="none" />
              </g>
            ))}
          </g>
        )}

        {/* APPARAÎT : le grand drap tendu + l'image qui BOUGE */}
        {built && (
          <g style={{ animation: "pulse 0.9s ease-out 2" }}>
            {/* le drap */}
            <rect x="150" y="96" width="300" height="200" rx="4" fill="#e8e2d0" />
            <rect x="150" y="96" width="300" height="200" rx="4" fill="#2c2418" opacity="0.06" filter="url(#lm-grain)" />
            <path d="M150 96 h300 M150 296 h300" stroke="#5a4a34" strokeWidth="5" />
            {/* l'image projetée : la sortie de l'usine, qui vacille */}
            {/* scintillement du projecteur : on joue sur l'OPACITÉ (glow), pas
                sur un scale — un scale CSS sur du SVG part de l'origine (0,0)
                et déplacerait toute l'image au lieu de la faire vaciller. */}
            <g style={{ animation: "glow 0.28s steps(2) infinite" }} opacity="0.92">
              <rect x="166" y="112" width="268" height="168" fill="#b9ac8e" />
              <rect x="166" y="230" width="268" height="50" fill="#8a7c60" />
              <path d="M240 230 L240 150 Q300 132 360 150 L360 230 Z" fill="#4a4038" />
              {/* les ouvrières et ouvriers qui sortent, et avancent vers nous.
                  ⚠️ le <g> extérieur porte la POSITION (transform SVG), le <g>
                  intérieur porte l'ANIMATION : une animation CSS écrase le
                  transform SVG si les deux sont sur le même élément. */}
              {[186, 216, 248, 280, 312, 344, 376, 408].map((x, i) => (
                <g key={i} transform={`translate(${x},${244 + (i % 2) * 10}) scale(1.7)`}>
                  <g style={{ animation: `drift ${1.6 + (i % 4) * 0.4}s ease-in-out infinite` }}>
                    <path d="M-4 14 Q-5 -1 0 -4 Q5 -1 4 14 Z" fill={i % 3 ? "#2c2018" : "#161009"} />
                    <circle cx="0" cy="-9" r="3.4" fill="#5a4632" />
                    {i % 2 === 0 && <path d="M-6 -12 h12" stroke="#161009" strokeWidth="2" />}
                  </g>
                </g>
              ))}
            </g>
          </g>
        )}
      </PLayer>

      {/* ═══ premier plan : parquet, le pied, le cinématographe, la manivelle ═══ */}
      <PLayer depth={3}>
        <rect y="418" width="1000" height="142" fill="url(#lm-floor)" />
        <rect y="420" width="1000" height="140" fill="#1c1208" opacity="0.34" filter="url(#lm-grain)" />
        <path d="M0 452 h1000 M0 498 h1000 M160 418 v142 M420 418 v142 M680 418 v142 M900 418 v142" stroke="#241810" strokeWidth="1.4" opacity="0.4" />
        <ellipse cx="500" cy="484" rx="450" ry="44" fill="#1c1208" opacity="0.26" />

        {/* LE PIED — nu tant que la machine n'est pas montée */}
        <g transform="translate(560,440)">
          <rect x="-8" y="10" width="16" height="70" fill="#3a2414" />
          <path d="M-28 82 h56 M-22 84 l-8 8 M22 84 l8 8" stroke="#3a2414" strokeWidth="7" strokeLinecap="round" />
          {!built && <ellipse cx="0" cy="8" rx="34" ry="8" fill="#4a2e18" />}

          {/* APPARAÎT : LE CINÉMATOGRAPHE monté, qui projette */}
          {built && (
            <g transform="translate(0,-24)" style={{ animation: "pulse 0.7s ease-out 2" }}>
              <ellipse cx="0" cy="0" rx="110" ry="56" fill="url(#lm-glow)" />
              <rect x="-46" y="-30" width="82" height="54" rx="4" fill="url(#lm-wood)" />
              <rect x="-46" y="-30" width="82" height="54" rx="4" fill="#160c04" opacity="0.22" filter="url(#lm-grain)" />
              <rect x="-40" y="-24" width="70" height="42" rx="2" fill="none" stroke="#3a2414" strokeWidth="2" />
              {/* objectif tourné vers le drap (à gauche) */}
              <rect x="-64" y="-14" width="18" height="26" rx="2" fill="#2c1c10" />
              <circle cx="-72" cy="-2" r="11" fill="#1c1c22" />
              <circle cx="-72" cy="-2" r="6" fill="#ffe9a8" style={{ animation: "glow 0.3s steps(2) infinite" }} />
              {/* les deux bobines qui tournent */}
              <circle cx="-24" cy="-40" r="16" fill="#3a2c1c" stroke="#5a3f24" strokeWidth="3" style={{ transformOrigin: "-24px -40px", animation: "spin 2s linear infinite" }} />
              <circle cx="14" cy="-40" r="16" fill="#3a2c1c" stroke="#5a3f24" strokeWidth="3" style={{ transformOrigin: "14px -40px", animation: "spin 2s linear infinite" }} />
              {/* la manivelle qui tourne */}
              <g transform="translate(40,2)">
                <circle cx="0" cy="0" r="7" fill="#6a6c72" />
                <path d="M0 0 l16 6 l-4 8" stroke="#8a8c92" strokeWidth="5" fill="none" strokeLinecap="round" style={{ transformOrigin: "0px 0px", animation: "spin 1s linear infinite" }} />
              </g>
            </g>
          )}
        </g>
        {/* LE FAISCEAU : un cône qui part de l'objectif et s'ouvre sur le drap */}
        {built && (
          <path d="M492 414 L452 104 L452 290 Z" fill="url(#lm-beam)" style={{ animation: "glow 0.34s steps(2) infinite" }} />
        )}

        {/* « ? » tant que le cinéma n'existe pas */}
        {!built && (
          <g transform="translate(676,344)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
            <path d="M0 0 q0 -24 24 -24 q24 0 24 20 q0 17 -20 22 l0 8" fill="none" stroke="#ffd166" strokeWidth="4" />
            <circle cx="24" cy="37" r="3" fill="#ffd166" />
          </g>
        )}

        {/* LOUIS LUMIÈRE, près du pied */}
        <g transform="translate(700,486)">
          <path d="M-13 6 Q-17 -16 0 -20 Q17 -16 13 6 L11 34 L-11 34 Z" fill="#33323e" />
          <path d="M-13 6 Q-17 -16 0 -20 Q17 -16 13 6 L11 34 L-11 34 Z" fill="#12101a" opacity="0.24" filter="url(#lm-grain)" />
          <circle cx="0" cy="-30" r="9" fill="#d8a884" />
          <path d="M-9 -34 q2 -11 10 -10 q9 1 8 10 Z" fill="#3a2c24" />
          {/* barbe taillée */}
          <path d="M-7 -27 q7 9 14 0" stroke="#3a2c24" strokeWidth="3" fill="none" />
          {/* bras vers la machine */}
          <path d="M-12 -8 q-22 -2 -32 12" stroke="#d8a884" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>

        {/* PIÈCE : la manivelle posée sur le banc (tant que le cinéma n'existe pas) */}
        {!built && (
          <g transform="translate(220,494)">
            <rect x="-60" y="-6" width="120" height="12" rx="2" fill="url(#lm-wood)" />
            <rect x="-52" y="6" width="10" height="40" fill="#3a2414" /><rect x="42" y="6" width="10" height="40" fill="#3a2414" />
            <g transform="translate(0,-14)">
              <circle cx="-6" cy="0" r="8" fill="#6a6c72" />
              <circle cx="-6" cy="0" r="3" fill="#3a3c42" />
              <path d="M-6 0 l24 -2 l2 12" stroke="#8a8c92" strokeWidth="6" fill="none" strokeLinecap="round" />
              <circle cx="20" cy="10" r="5" fill="#4a3220" />
            </g>
          </g>
        )}
      </PLayer>

      <rect width="1000" height="560" fill="#141008" opacity="0.06" style={{ pointerEvents: "none" }} />

      {/* ═══ zones cliquables ═══ */}
      <Hotspot cx={700} cy={460} r={50} label="Louis Lumière" reveal={reveal} onClick={() => action("louis")} />
      {!built && (
        <>
          <Hotspot cx={300} cy={230} r={70} label="série de photos" item="photos" reveal={reveal} onClick={() => collect("photos")} />
          <Hotspot cx={220} cy={484} r={44} label="manivelle" item="manivelle" reveal={reveal} onClick={() => collect("manivelle")} />
        </>
      )}
    </svg>
  );
}
