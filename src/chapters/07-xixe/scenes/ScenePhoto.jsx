import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 7 — Tableau-ÉNIGME : « Garder un instant avec la lumière ? »
   ------------------------------------------------------------
   L'atelier du photographe. La grande chambre en bois est là
   (c'est l'outil), mais AUCUNE photo n'existe encore. Daguerre
   (cliquable) pose sa question.
   → plaque + lumière → la photo se révèle et vient sécher sur
     le fil : le premier instant conservé.
   Ce décor réagit à l'état du jeu via la prop `made`.
   ============================================================ */

export default function ScenePhoto({ collect, action, reveal, made = [] }) {
  const built = made.includes("msg_photo"); // la photographie existe

  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="pt-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4a4e56" /><stop offset="100%" stopColor="#2c3038" /></linearGradient>
        <linearGradient id="pt-glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#eaf4ff" /><stop offset="100%" stopColor="#b8d4e6" /></linearGradient>
        <linearGradient id="pt-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6a5642" /><stop offset="100%" stopColor="#38291c" /></linearGradient>
        <linearGradient id="pt-wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a5a30" /><stop offset="100%" stopColor="#4a2e16" /></linearGradient>
        <linearGradient id="pt-beam" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fff6dc" stopOpacity="0.5" /><stop offset="100%" stopColor="#fff6dc" stopOpacity="0" /></linearGradient>
        <radialGradient id="pt-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffe9a8" stopOpacity="0.7" /><stop offset="100%" stopColor="#ffe9a8" stopOpacity="0" /></radialGradient>
        <filter id="pt-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* ═══ mur d'atelier ═══ */}
      <rect width="1000" height="560" fill="url(#pt-wall)" />
      <rect width="1000" height="560" fill="#12161c" opacity="0.22" filter="url(#pt-grain)" />

      {/* ═══ couche lointaine : la verrière ═══ */}
      <PLayer depth={1}>
        <g transform="translate(760,150)">
          <rect x="-150" y="-130" width="300" height="260" fill="url(#pt-glass)" />
          {[-100, -50, 0, 50, 100].map((x, i) => <path key={i} d={`M${x} -130 v260`} stroke="#2c3038" strokeWidth="4" />)}
          {[-80, -30, 20, 70].map((y, i) => <path key={i} d={`M-150 ${y} h300`} stroke="#2c3038" strokeWidth="4" />)}
          <rect x="-150" y="-130" width="300" height="260" fill="none" stroke="#1c2028" strokeWidth="9" />
          <circle cx="-40" cy="-70" r="26" fill="#fff6dc" opacity="0.7" />
        </g>
      </PLayer>

      {/* ═══ couche intermédiaire : rideau de fond + LE FAISCEAU de lumière ═══ */}
      <PLayer depth={2}>
        <path d="M120 120 Q160 300 140 440 L340 440 Q330 280 350 120 Z" fill="#5a5044" opacity="0.7" />
        <path d="M150 120 q6 160 -2 320 M210 120 q10 160 0 320 M280 120 q4 160 -4 320" stroke="#4a4034" strokeWidth="3" fill="none" opacity="0.6" />
        <path d="M640 40 L900 120 L560 470 L360 430 Z" fill="url(#pt-beam)" style={{ animation: "glow 4s ease-in-out infinite" }} />
      </PLayer>

      {/* ═══ premier plan : la chambre, Daguerre, la plaque, la photo ═══ */}
      <PLayer depth={3}>
        <rect y="420" width="1000" height="140" fill="url(#pt-floor)" />
        <rect y="422" width="1000" height="138" fill="#1c1208" opacity="0.32" filter="url(#pt-grain)" />
        <path d="M0 456 h1000 M0 500 h1000 M160 420 v140 M420 420 v140 M680 420 v140 M900 420 v140" stroke="#241810" strokeWidth="1.4" opacity="0.4" />
        <ellipse cx="480" cy="486" rx="440" ry="44" fill="#1c1208" opacity="0.26" />

        {/* LA CHAMBRE PHOTOGRAPHIQUE sur trépied (l'outil, toujours là) */}
        <g transform="translate(440,420)">
          <path d="M0 0 L-46 130 M0 0 L44 128 M0 0 L4 132" stroke="#3a2414" strokeWidth="8" strokeLinecap="round" />
          <path d="M-46 130 l-10 6 M44 128 l10 6" stroke="#3a2414" strokeWidth="8" strokeLinecap="round" />
          <g transform="translate(0,-30)">
            <rect x="-58" y="-34" width="34" height="60" rx="3" fill="url(#pt-wood)" />
            {[...Array(6)].map((_, i) => <rect key={i} x={-24 + i * 12} y="-30" width="12" height="52" fill={i % 2 ? "#2c1c10" : "#3a2616"} />)}
            <rect x="48" y="-34" width="20" height="60" rx="3" fill="url(#pt-wood)" />
            <circle cx="58" cy="-4" r="15" fill="#1c1c22" />
            <circle cx="58" cy="-4" r="10" fill="#3a3a44" />
            <circle cx="58" cy="-4" r="5" fill="#c9b26a" />
            <path d="M-58 -38 Q-84 -20 -78 30 L-40 30 L-40 -34 Z" fill="#12100e" opacity="0.85" />
          </g>
        </g>

        {/* « ? » tant que la photo n'existe pas */}
        {!built && (
          <g transform="translate(236,364)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
            <path d="M0 0 q0 -24 24 -24 q24 0 24 20 q0 17 -20 22 l0 8" fill="none" stroke="#ffd166" strokeWidth="4" />
            <circle cx="24" cy="37" r="3" fill="#ffd166" />
          </g>
        )}

        {/* DAGUERRE : il soulève le drap noir, la main vers la lumière */}
        <g transform="translate(260,486)">
          <path d="M-13 6 Q-17 -16 0 -20 Q17 -16 13 6 L11 34 L-11 34 Z" fill="#3a3830" />
          <path d="M-13 6 Q-17 -16 0 -20 Q17 -16 13 6 L11 34 L-11 34 Z" fill="#12100a" opacity="0.25" filter="url(#pt-grain)" />
          <circle cx="0" cy="-30" r="9" fill="#d8a884" />
          <path d="M-9 -34 q2 -11 10 -10 q9 1 8 10 Z" fill="#5a4a3a" />
          <path d="M-6 -26 q6 7 12 0" stroke="#5a4a3a" strokeWidth="2.5" fill="none" />
          {/* bras levé vers le rayon */}
          <path d="M12 -8 q22 -10 28 -30" stroke="#d8a884" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>

        {/* LA TABLE de préparation */}
        <g transform="translate(760,486)">
          <rect x="-80" y="-6" width="160" height="14" rx="2" fill="url(#pt-wood)" />
          <rect x="-70" y="8" width="12" height="46" fill="#3a2414" /><rect x="58" y="8" width="12" height="46" fill="#3a2414" />

          {/* PIÈCE : la plaque sensible dans son châssis (tant qu'il n'y a pas de photo) */}
          {!built && (
            <g transform="translate(-18,-16)">
              <rect x="-34" y="-4" width="68" height="46" rx="2" fill="#5a3f24" />
              <rect x="-27" y="2" width="54" height="34" fill="#14161c" />
              <rect x="-24" y="-8" width="48" height="34" rx="1" fill="#2a2e36" />
              <path d="M-22 -6 L22 -4" stroke="#8aa0b0" strokeWidth="2" opacity="0.6" />
              <path d="M-20 4 L18 8" stroke="#6a7c8a" strokeWidth="1.4" opacity="0.5" />
            </g>
          )}
          {/* APPARAÎT : le bac de révélation, la photo dedans */}
          {built && (
            <g transform="translate(-18,-14)" style={{ animation: "pulse 0.7s ease-out 2" }}>
              <rect x="-36" y="-6" width="72" height="26" rx="3" fill="#2a3a3a" />
              <rect x="-32" y="-2" width="64" height="18" rx="2" fill="#4a6a6a" opacity="0.8" />
              <path d="M-30 6 q30 -5 60 0" stroke="#9ac0c0" strokeWidth="1.4" fill="none" opacity="0.7" style={{ animation: "ripple 2.4s ease-in-out infinite" }} />
            </g>
          )}
          <g transform="translate(44,-10)">
            <rect x="-6" y="-16" width="12" height="22" rx="2" fill="#6a8a4a" opacity="0.85" />
            <rect x="-4" y="-20" width="8" height="6" fill="#4a3220" />
          </g>
        </g>

        {/* APPARAÎT : LA PHOTO qui sèche sur un fil — l'instant est gardé ! */}
        {built && (
          <g style={{ animation: "pulse 0.9s ease-out 2" }}>
            {/* le fil */}
            <path d="M600 400 q90 14 180 4" stroke="#6a5a44" strokeWidth="1.6" fill="none" />
            <g transform="translate(690,436)">
              <ellipse cx="0" cy="0" rx="80" ry="60" fill="url(#pt-glow)" />
              {/* pince à linge */}
              <rect x="-3" y="-38" width="6" height="10" rx="1.5" fill="#8a6a3a" />
              {/* le tirage : un portrait sépia */}
              <g style={{ animation: "sway 4s ease-in-out infinite" }}>
                <rect x="-30" y="-30" width="60" height="72" rx="2" fill="#efe3c6" />
                <rect x="-26" y="-26" width="52" height="58" fill="#b99a72" />
                {/* le portrait */}
                <circle cx="0" cy="-6" r="12" fill="#8a6a4a" />
                <path d="M-18 32 q18 -26 36 0 Z" fill="#7a5a3e" />
                <rect x="-26" y="-26" width="52" height="58" fill="none" stroke="#8a7250" strokeWidth="1" />
              </g>
            </g>
          </g>
        )}

        {/* tabouret */}
        <g transform="translate(120,500)">
          <ellipse cx="0" cy="-20" rx="26" ry="9" fill="#5a3f24" />
          <path d="M-20 -18 l-8 40 M20 -18 l8 40 M-14 -14 l4 44 M14 -14 l-4 44" stroke="#3a2414" strokeWidth="5" strokeLinecap="round" />
        </g>
      </PLayer>

      <rect width="1000" height="560" fill="#101418" opacity="0.06" style={{ pointerEvents: "none" }} />

      {/* ═══ zones cliquables ═══ */}
      <Hotspot cx={260} cy={460} r={50} label="le photographe" reveal={reveal} onClick={() => action("daguerre")} />
      {!built && (
        <>
          <Hotspot cx={742} cy={470} r={40} label="plaque sensible" item="plaque" reveal={reveal} onClick={() => collect("plaque")} />
          <Hotspot cx={720} cy={150} r={90} label="lumière" item="lumiere" reveal={reveal} onClick={() => collect("lumiere")} />
        </>
      )}
    </svg>
  );
}
