import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 7 — Tableau-ÉNIGME : « Un message plus vite qu'un cheval ! »
   ------------------------------------------------------------
   Le bureau du télégraphe. Un télégraphiste (cliquable) pose son
   problème. Sur le bureau, les pièces : manipulateur Morse,
   membrane, courant. RIEN n'est « déjà inventé ».
   → pile + Morse → une bande de points-traits sort de l'appareil.
   → membrane + courant → un téléphone apparaît sur le mur.
   Ce décor réagit à l'état du jeu via la prop `made`.
   ============================================================ */

export default function SceneTelegraphe({ collect, action, reveal, made = [] }) {
  const tg = made.includes("msg_telegraphe"); // télégraphe transmis
  const tel = made.includes("msg_telephone"); // téléphone transmis

  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="tg-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6a5844" /><stop offset="100%" stopColor="#3e3226" /></linearGradient>
        <linearGradient id="tg-win" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6a86a0" /><stop offset="60%" stopColor="#b0b8a8" /><stop offset="100%" stopColor="#d8c898" /></linearGradient>
        <linearGradient id="tg-desk" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a5e38" /><stop offset="100%" stopColor="#5a3f24" /></linearGradient>
        <linearGradient id="tg-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7a6448" /><stop offset="100%" stopColor="#403020" /></linearGradient>
        <radialGradient id="tg-lamp" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffcf78" stopOpacity="0.55" /><stop offset="100%" stopColor="#ff9540" stopOpacity="0" /></radialGradient>
        <radialGradient id="tg-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffe9a8" stopOpacity="0.7" /><stop offset="100%" stopColor="#ffe9a8" stopOpacity="0" /></radialGradient>
        <filter id="tg-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
        <clipPath id="tg-winclip"><rect x="-58" y="-64" width="116" height="128" /></clipPath>
      </defs>

      {/* ═══ mur du bureau ═══ */}
      <rect width="1000" height="560" fill="url(#tg-wall)" />
      <rect width="1000" height="560" fill="#241a10" opacity="0.26" filter="url(#tg-grain)" />

      {/* ═══ couche lointaine : fenêtre sur la ligne télégraphique, pendule, cartes ═══ */}
      <PLayer depth={1}>
        <g transform="translate(760,180)">
          <rect x="-60" y="-66" width="120" height="132" fill="url(#tg-win)" />
          <g clipPath="url(#tg-winclip)">
            <rect x="-58" y="34" width="116" height="30" fill="#8a8a5e" />
            {[[-40, 40, 1], [-8, 34, 0.8], [18, 30, 0.62], [40, 27, 0.48]].map(([px, py, s], i) => (
              <g key={i} transform={`translate(${px},${py}) scale(${s})`}>
                <rect x="-2" y="-56" width="4" height="56" fill="#4a3728" />
                <path d="M-12 -50 h24 M-12 -42 h24" stroke="#4a3728" strokeWidth="2" />
              </g>
            ))}
            <path d="M-52 -6 Q-8 -18 60 -30 M-52 2 Q-8 -8 60 -24" stroke="#2c2418" strokeWidth="1" fill="none" opacity="0.7" />
          </g>
          <rect x="-60" y="-66" width="120" height="132" fill="none" stroke="#2e2418" strokeWidth="7" />
          <path d="M0 -66 v132 M-60 0 h120" stroke="#2e2418" strokeWidth="3.5" />
        </g>
        {/* pendule murale */}
        <g transform="translate(150,140)">
          <circle cx="0" cy="0" r="30" fill="#e8dcc0" stroke="#5a3f24" strokeWidth="6" />
          <path d="M0 0 L0 -18 M0 0 L11 5" stroke="#3a2c1c" strokeWidth="2.5" />
          <rect x="-6" y="30" width="12" height="36" fill="#5a3f24" />
        </g>
        {/* carte des lignes */}
        <g transform="translate(360,140)">
          <rect x="-52" y="-36" width="104" height="72" fill="#d8c8a0" />
          <rect x="-52" y="-36" width="104" height="72" fill="none" stroke="#5a3f24" strokeWidth="4" />
          <path d="M-38 18 L-8 -8 L18 6 L40 -16 M-8 -8 L-26 -20 M18 6 L34 20" stroke="#a83828" strokeWidth="1.4" fill="none" />
          {[[-38, 18], [-8, -8], [18, 6], [40, -16], [-26, -20]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.2" fill="#7a2418" />)}
        </g>
      </PLayer>

      {/* ═══ couche intermédiaire : LE TÉLÉGRAPHISTE + le « ? » de l'énigme ═══ */}
      <PLayer depth={2}>
        {/* « ? » tant qu'il reste une invention à trouver */}
        {!(tg && tel) && (
          <g transform="translate(560,214)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
            <path d="M0 0 q0 -26 26 -26 q26 0 26 22 q0 18 -22 24 l0 8" fill="none" stroke="#ffd166" strokeWidth="4" />
            <circle cx="26" cy="40" r="3" fill="#ffd166" />
          </g>
        )}
        {/* le télégraphiste assis derrière le bureau */}
        <g transform="translate(520,360)">
          <path d="M-30 100 Q-38 24 -6 10 Q10 4 26 10 Q40 24 34 100 Z" fill="#3a3040" />
          <path d="M-30 100 Q-38 24 -6 10 Q10 4 26 10 Q40 24 34 100 Z" fill="#160c10" opacity="0.22" filter="url(#tg-grain)" />
          <circle cx="2" cy="-8" r="15" fill="#d8a884" />
          {/* cheveux + moustache */}
          <path d="M-13 -12 q-2 -18 16 -17 q17 1 12 16 q-5 -7 -14 -7 q-11 0 -14 8 Z" fill="#4a3a30" />
          <path d="M-5 -2 q7 3 14 0" stroke="#4a3a30" strokeWidth="2.5" fill="none" />
          {/* gilet + bras vers l'appareil */}
          <path d="M-6 18 q10 30 22 46" stroke="#2c2432" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M18 60 q22 4 40 18" stroke="#d8a884" strokeWidth="6" fill="none" strokeLinecap="round" />
        </g>
      </PLayer>

      {/* ═══ premier plan : bureau, pièces, inventions, épave ═══ */}
      <PLayer depth={3}>
        <rect y="400" width="1000" height="160" fill="url(#tg-floor)" />
        <rect y="402" width="1000" height="158" fill="#241a10" opacity="0.34" filter="url(#tg-grain)" />
        <ellipse cx="500" cy="474" rx="440" ry="52" fill="#5e4a30" opacity="0.3" />
        <ellipse cx="330" cy="452" rx="180" ry="90" fill="url(#tg-lamp)" style={{ animation: "glow 2.6s ease-in-out infinite" }} />

        {/* LE GRAND BUREAU */}
        <g transform="translate(430,486)">
          <rect x="-210" y="8" width="440" height="16" rx="3" fill="url(#tg-desk)" />
          <rect x="-200" y="24" width="14" height="40" fill="#4a3220" /><rect x="196" y="24" width="14" height="40" fill="#4a3220" />
        </g>

        {/* PIÈCE : le manipulateur Morse (tant que le télégraphe n'est pas fait) */}
        {!tg && (
          <g transform="translate(300,478)">
            <rect x="-30" y="2" width="60" height="8" rx="2" fill="#3a2c1c" />
            <circle cx="-8" cy="-2" r="8" fill="#3a3a44" />
            <rect x="-30" y="-6" width="24" height="4" rx="2" fill="#8a8c92" />
            <circle cx="-8" cy="-2" r="4" fill="#c98a4a" />
            <g transform="translate(18,-4)">
              <rect x="-8" y="-10" width="16" height="14" rx="2" fill="#6a6c72" />
              <rect x="-5" y="-16" width="10" height="6" fill="#8a8c92" />
              <path d="M-6 -18 q0 -6 6 -6" stroke="#5a5c62" strokeWidth="2" fill="none" />
            </g>
          </g>
        )}
        {/* APPARAÎT : la bande de papier avec points et traits (télégraphe fait) */}
        {tg && (
          <g transform="translate(300,470)" style={{ animation: "pulse 0.7s ease-out 2" }}>
            <ellipse cx="0" cy="8" rx="70" ry="30" fill="url(#tg-glow)" />
            <rect x="-30" y="-2" width="60" height="10" rx="2" fill="#3a2c1c" />
            <circle cx="-8" cy="-6" r="8" fill="#3a3a44" />
            {/* la bande qui se déroule vers l'avant */}
            <path d="M20 0 q40 6 92 26" stroke="#f2ead6" strokeWidth="14" fill="none" strokeLinecap="round" />
            <g fill="#2c2418">
              {[[38, 6], [52, 10], [70, 15], [86, 20], [104, 26]].map(([x, y], i) => (
                i % 2
                  ? <rect key={i} x={x} y={y - 2} width="9" height="3" rx="1.5" />
                  : <circle key={i} cx={x} cy={y} r="1.8" />
              ))}
            </g>
          </g>
        )}

        {/* PIÈCE : la membrane (pour le téléphone) */}
        {!tel && (
          <g transform="translate(430,476)">
            <rect x="-4" y="2" width="8" height="24" fill="#4a3220" />
            <circle cx="0" cy="-6" r="14" fill="#6a5238" />
            <circle cx="0" cy="-6" r="10" fill="#3a2c1c" />
            <ellipse cx="0" cy="-6" rx="7" ry="7" fill="#c8c0b0" />
            <path d="M-7 -6 a7 7 0 0 1 14 0" stroke="#8a7a5a" strokeWidth="1" fill="none" />
          </g>
        )}
        {/* PIÈCE : le courant (pile/batterie à fils) — sert au téléphone */}
        {!tel && (
          <g transform="translate(600,486)">
            <rect x="-24" y="-4" width="48" height="26" rx="3" fill="#4a5a3a" />
            <rect x="-24" y="-4" width="48" height="26" rx="3" fill="#2c3620" opacity="0.4" filter="url(#tg-grain)" />
            <rect x="-14" y="-12" width="8" height="8" fill="#b8bcc0" /><rect x="6" y="-12" width="8" height="8" fill="#c98a4a" />
            <path d="M-10 -12 q-16 -8 -30 6 M10 -12 q16 -8 30 4" stroke="#2c2418" strokeWidth="1.6" fill="none" />
            <circle cx="-2" cy="-14" r="1.6" fill="#ffe08a" style={{ animation: "spark 1.8s linear infinite" }} />
          </g>
        )}
        {/* APPARAÎT : le téléphone mural (téléphone fait) */}
        {tel && (
          <g transform="translate(600,452)" style={{ animation: "pulse 0.7s ease-out 2" }}>
            <ellipse cx="0" cy="20" rx="60" ry="30" fill="url(#tg-glow)" />
            {/* caisse en bois */}
            <rect x="-24" y="-20" width="48" height="70" rx="5" fill="#6a4628" />
            <rect x="-24" y="-20" width="48" height="70" rx="5" fill="#2c1c10" opacity="0.3" filter="url(#tg-grain)" />
            {/* deux cloches */}
            <circle cx="-11" cy="-8" r="7" fill="#c9a24a" /><circle cx="11" cy="-8" r="7" fill="#c9a24a" />
            {/* microphone conique au centre */}
            <path d="M-9 6 L9 6 L4 22 L-4 22 Z" fill="#2c1c10" />
            {/* écouteur suspendu sur le côté */}
            <path d="M22 4 q16 2 14 22" stroke="#2c1c10" strokeWidth="3" fill="none" />
            <ellipse cx="36" cy="30" rx="6" ry="9" fill="#3a2c1c" />
            {/* manivelle latérale */}
            <circle cx="-24" cy="24" r="5" fill="#8a8c92" />
            <path d="M-24 24 l-10 4" stroke="#8a8c92" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {/* épave de MARTINE dans un coin (x ≤ 860 : au-delà, le décor est
            rogné sur les bords selon la taille de la fenêtre) */}
        <g transform="translate(856,506) rotate(8)">
          <ellipse cx="0" cy="12" rx="26" ry="6" fill="#0a0603" opacity="0.6" />
          <path d="M0 -20 Q18 -18 20 -4 Q22 8 11 11 L-11 11 Q-22 8 -20 -4 Q-18 -18 0 -20 Z" fill="#8a6240" />
          <circle cx="-1" cy="-4" r="5.5" fill="#cfeaff" stroke="#5c3a22" strokeWidth="1.4" />
          <rect x="-13" y="3" width="24" height="7" rx="2" fill="#0c1410" stroke="#5c3a22" strokeWidth="1" />
          <text x="-1" y="9" textAnchor="middle" fontSize="5.5" fill="#5eff9e" fontFamily="ui-monospace,monospace" style={{ animation: "pulse 2.2s infinite" }}>1876</text>
          <circle cx="13" cy="-27" r="2.3" fill="#5eff9e" style={{ animation: "pulse 1.5s infinite" }} />
          <path d="M8 -20 q6 -8 13 -6" stroke="#8a94a8" strokeWidth="2.3" fill="none" strokeLinecap="round" />
        </g>
      </PLayer>

      {/* voile de grain global */}
      <rect width="1000" height="560" fill="#181008" opacity="0.08" style={{ pointerEvents: "none" }} />

      {/* ═══ zones cliquables ═══ */}
      {/* le télégraphiste : pose son problème */}
      <Hotspot cx={520} cy={370} r={54} label="le télégraphiste" reveal={reveal} onClick={() => action("operator")} />
      {!tg && (
        <Hotspot cx={300} cy={476} r={40} label="Morse" item="code_morse" reveal={reveal} onClick={() => collect("code_morse")} />
      )}
      {!tel && (
        <>
          <Hotspot cx={430} cy={474} r={30} label="membrane" item="membrane" reveal={reveal} onClick={() => collect("membrane")} />
          <Hotspot cx={600} cy={482} r={40} label="courant" item="electricite" reveal={reveal} onClick={() => collect("electricite")} />
        </>
      )}
      <Hotspot cx={856} cy={502} r={34} label="MARTINE" reveal={reveal} onClick={() => action("wreck")} />
    </svg>
  );
}
