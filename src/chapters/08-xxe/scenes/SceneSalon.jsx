import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 8 — Tableau-ÉNIGME : « Voir la Lune depuis son salon ? »
   ------------------------------------------------------------
   Le salon, 1969. Le meuble télé est VIDE : la télévision n'existe
   pas encore. L'enfant (cliquable) agite le journal : ce soir, des
   hommes marchent sur la Lune, à 380 000 km… et on ne verra rien.
   → tube cathodique + caméra → le téléviseur apparaît, la famille
     se rassemble devant les images de la Lune.
   → bande magnétique + boîtier → un magnétoscope apparaît : on peut
     enfin GARDER l'émission.
   Ce décor réagit à l'état du jeu via la prop `made`.
   ============================================================ */

export default function SceneSalon({ collect, action, reveal, made = [] }) {
  const tv = made.includes("msg_television");  // le téléviseur existe
  const cass = made.includes("msg_cassette");  // on peut enregistrer chez soi

  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sa-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a6a3e" /><stop offset="100%" stopColor="#5a4426" /></linearGradient>
        <linearGradient id="sa-win" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#16203a" /><stop offset="100%" stopColor="#38506a" /></linearGradient>
        <linearGradient id="sa-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a5a3a" /><stop offset="100%" stopColor="#43291a" /></linearGradient>
        <linearGradient id="sa-wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9a6a3a" /><stop offset="100%" stopColor="#5a3a1e" /></linearGradient>
        <radialGradient id="sa-screen" cx="50%" cy="50%" r="60%"><stop offset="0%" stopColor="#dfeaf2" /><stop offset="100%" stopColor="#8fa3b8" /></radialGradient>
        <radialGradient id="sa-tvglow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#cfe4ff" stopOpacity="0.5" /><stop offset="100%" stopColor="#cfe4ff" stopOpacity="0" /></radialGradient>
        <filter id="sa-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
        <clipPath id="sa-winclip"><rect x="-58" y="-58" width="116" height="116" /></clipPath>
        <clipPath id="sa-tvclip"><rect x="-52" y="-38" width="104" height="76" rx="10" /></clipPath>
      </defs>

      {/* ═══ papier peint à motifs seventies ═══ */}
      <rect width="1000" height="560" fill="url(#sa-wall)" />
      {[...Array(7)].map((_, r) => [...Array(12)].map((_, c) => (
        <circle key={`${r}-${c}`} cx={40 + c * 86 + (r % 2 ? 43 : 0)} cy={44 + r * 72} r="7" fill="#a8814a" opacity="0.3" />
      )))}
      <rect width="1000" height="560" fill="#2c1c0c" opacity="0.18" filter="url(#sa-grain)" />

      {/* ═══ couche lointaine : la fenêtre + l'antenne râteau ═══ */}
      <PLayer depth={1}>
        <g transform="translate(820,180)">
          <rect x="-60" y="-60" width="120" height="120" fill="url(#sa-win)" />
          <g clipPath="url(#sa-winclip)">
            <path d="M-58 34 L-20 14 L16 34 L52 12 L58 34 L58 58 L-58 58 Z" fill="#141c28" />
            {/* la Lune, là-haut, hors de portée */}
            <circle cx="26" cy="-30" r="13" fill="#e8eef4" />
            <circle cx="21" cy="-34" r="3" fill="#c8d2dc" opacity="0.7" />
            {[[-40, -40], [-14, -22], [44, -46]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.3" fill="#dfe8f0" style={{ animation: `twinkle ${2 + i}s infinite` }} />
            ))}
            {/* l'antenne râteau sur le toit d'en face */}
            <g transform="translate(-30,16)">
              <path d="M0 18 v-22" stroke="#2a2c34" strokeWidth="2.4" />
              {[0, 5, 10].map((d, i) => <path key={i} d={`M${-9 + i} ${-4 + d} h${18 - i * 2}`} stroke="#2a2c34" strokeWidth="1.8" />)}
            </g>
          </g>
          <rect x="-60" y="-60" width="120" height="120" fill="none" stroke="#3a2a18" strokeWidth="8" />
          <path d="M0 -60 v120 M-60 0 h120" stroke="#3a2a18" strokeWidth="4" />
        </g>
        {/* cadre de famille au mur */}
        <g transform="translate(180,150)">
          <rect x="-38" y="-28" width="76" height="56" fill="#d8c8a0" stroke="#5a3f24" strokeWidth="5" />
          <circle cx="-10" cy="-4" r="8" fill="#b09070" /><circle cx="10" cy="-2" r="7" fill="#b09070" />
          <path d="M-26 22 q16 -22 32 0 Z" fill="#9a7a58" />
        </g>
      </PLayer>

      {/* ═══ couche intermédiaire : L'ENFANT + le « ? » + la famille ═══ */}
      <PLayer depth={2}>
        {!tv && (
          <g transform="translate(300,244)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
            <path d="M0 0 q0 -26 26 -26 q26 0 26 22 q0 18 -22 24 l0 8" fill="none" stroke="#ffd166" strokeWidth="4" />
            <circle cx="26" cy="40" r="3" fill="#ffd166" />
          </g>
        )}

      </PLayer>

      {/* ═══ premier plan : parquet, meuble télé, pièces, inventions ═══ */}
      <PLayer depth={3}>
        <rect y="424" width="1000" height="136" fill="url(#sa-floor)" />
        <rect y="426" width="1000" height="134" fill="#241206" opacity="0.32" filter="url(#sa-grain)" />
        {/* tapis seventies */}
        <ellipse cx="470" cy="512" rx="330" ry="46" fill="#a8542c" opacity="0.55" />
        <ellipse cx="470" cy="512" rx="240" ry="32" fill="none" stroke="#d88a4a" strokeWidth="3" opacity="0.4" />

        {/* LE FAUTEUIL et les parents, tournés vers le meuble télé.
            (Ils sont ici, en premier plan : dans la couche du fond, le sol
            les recouvrait et on ne voyait plus que leurs têtes.) */}
        <g transform="translate(800,452)">
          <path d="M-50 58 L-50 -8 Q-50 -26 -32 -26 L32 -26 Q50 -26 50 -8 L50 58 Z" fill="#7a4a3a" />
          <path d="M-50 58 L-50 -8 Q-50 -26 -32 -26 L32 -26 Q50 -26 50 -8 L50 58 Z" fill="#2c1408" opacity="0.28" filter="url(#sa-grain)" />
          <rect x="-42" y="14" width="84" height="16" rx="5" fill="#8a5a48" />
          {/* deux silhouettes assises, de trois quarts vers la gauche */}
          <g transform="translate(-16,-4)">
            <path d="M-11 26 Q-14 0 0 -4 Q14 0 11 26 Z" fill="#3a4658" />
            <circle cx="-2" cy="-14" r="9" fill="#d8a884" />
            <path d="M-11 -18 q2 -10 9 -9 q9 1 8 9 Z" fill="#4a3a30" />
          </g>
          <g transform="translate(20,-2)">
            <path d="M-11 24 Q-14 0 0 -4 Q14 0 11 24 Z" fill="#5a4a5a" />
            <circle cx="-2" cy="-14" r="9" fill="#d8a884" />
            <path d="M-12 -17 q3 -11 10 -10 q10 1 9 10 q-4 -5 -9 -5 q-6 0 -10 5 Z" fill="#6a4a34" />
          </g>
        </g>

        {/* L'ENFANT, debout, le journal à la main */}
        <g transform="translate(450,466)">
          <path d="M-13 6 Q-16 -12 0 -16 Q16 -12 13 6 L11 30 L-11 30 Z" fill="#c8523a" />
          <circle cx="0" cy="-26" r="10" fill="#e8b894" />
          <path d="M-10 -30 q3 -12 11 -11 q10 1 9 11 q-4 -6 -10 -6 q-7 0 -10 6 Z" fill="#5a3a24" />
          {/* le bras qui brandit le journal */}
          <path d="M-11 -4 q-16 -6 -22 -20" stroke="#e8b894" strokeWidth="5" fill="none" strokeLinecap="round" />
          <g transform="translate(-42,-32) rotate(-16)">
            <rect x="-16" y="-12" width="32" height="24" fill="#e8e4da" />
            <path d="M-12 -7 h24 M-12 -2 h24 M-12 3 h16" stroke="#8a8690" strokeWidth="1.5" />
            <circle cx="8" cy="4" r="4" fill="#c8c4bc" />
          </g>
        </g>

        {/* LE MEUBLE TÉLÉ — vide tant que la télévision n'existe pas */}
        <g transform="translate(640,470)">
          {/* le meuble */}
          <rect x="-70" y="26" width="140" height="14" rx="3" fill="url(#sa-wood)" />
          <path d="M-58 40 l-8 34 M58 40 l8 34 M-40 40 v34 M40 40 v34" stroke="#4a2e18" strokeWidth="6" strokeLinecap="round" />

          {!tv && (
            /* le meuble est nu : juste une place vide qui attend */
            <ellipse cx="0" cy="24" rx="56" ry="9" fill="#3a2414" opacity="0.6" />
          )}

          {/* APPARAÎT : LE TÉLÉVISEUR, avec les images de la Lune */}
          {tv && (
            <g transform="translate(0,-16)" style={{ animation: "pulse 0.7s ease-out 2" }}>
              <ellipse cx="0" cy="10" rx="140" ry="76" fill="url(#sa-tvglow)" />
              {/* la caisse en bois */}
              <rect x="-72" y="-52" width="144" height="94" rx="8" fill="#7a4a26" />
              <rect x="-72" y="-52" width="144" height="94" rx="8" fill="#2c1408" opacity="0.26" filter="url(#sa-grain)" />
              {/* l'écran bombé */}
              <rect x="-52" y="-38" width="104" height="76" rx="10" fill="url(#sa-screen)" />
              <g clipPath="url(#sa-tvclip)">
                {/* La Lune en direct — en NOIR ET BLANC : c'est ainsi que 600
                    millions de personnes l'ont vue en 1969. */}
                {/* le ciel noir de l'espace */}
                <rect x="-52" y="-38" width="104" height="76" fill="#1a2028" />
                {/* la Terre, minuscule, tout là-haut */}
                <circle cx="-34" cy="-26" r="6.5" fill="#9aa8b4" />
                <path d="M-38 -28 q4 3 8 0" stroke="#6a7884" strokeWidth="1.4" fill="none" />
                {/* le sol lunaire, clair */}
                <path d="M-52 12 Q-22 2 8 12 Q32 19 52 10 L52 38 L-52 38 Z" fill="#c8ced4" />
                <ellipse cx="-24" cy="26" rx="9" ry="3" fill="#aab0b6" opacity="0.8" />
                <ellipse cx="30" cy="30" rx="7" ry="2.4" fill="#aab0b6" opacity="0.7" />
                {/* le drapeau planté */}
                <g transform="translate(32,2)">
                  <path d="M0 16 v-24" stroke="#e8ecee" strokeWidth="1.8" />
                  <path d="M0 -24 h13 v9 h-13 Z" fill="#e8ecee" />
                  <path d="M0 -24 h13 v9 h-13 Z" fill="none" stroke="#8a9098" strokeWidth="0.8" />
                </g>
                {/* l'astronaute : scaphandre blanc, visière noire (bien lisible) */}
                <g transform="translate(2,4)">
                  <path d="M-7 14 Q-9 -3 0 -7 Q9 -3 7 14 Z" fill="#f2f4f6" stroke="#5a646e" strokeWidth="0.9" />
                  <circle cx="0" cy="-13" r="6.5" fill="#f2f4f6" stroke="#5a646e" strokeWidth="0.9" />
                  <path d="M-4 -14 a4.5 4.5 0 0 1 8 -1 l-8 3 Z" fill="#2a3038" />
                  {/* bras levé, façon salut */}
                  <path d="M6 -1 q9 -3 11 -12" stroke="#f2f4f6" strokeWidth="3.4" fill="none" strokeLinecap="round" />
                  <path d="M-6 0 q-8 2 -9 9" stroke="#f2f4f6" strokeWidth="3.4" fill="none" strokeLinecap="round" />
                  {/* les jambes */}
                  <path d="M-3 13 v6 M3 13 v6" stroke="#f2f4f6" strokeWidth="3.4" strokeLinecap="round" />
                  {/* le sac dorsal */}
                  <rect x="-10" y="-4" width="4" height="10" rx="1" fill="#dfe4e8" stroke="#5a646e" strokeWidth="0.7" />
                </g>
                {/* lignes de balayage du tube */}
                {[...Array(13)].map((_, i) => <path key={i} d={`M-52 ${-36 + i * 6} h104`} stroke="#0e1218" strokeWidth="0.7" opacity="0.22" />)}
                {/* le léger scintillement de l'écran.
                    ⚠️ l'animation est sur le <g>, l'opacité sur le <rect> : une
                    animation CSS d'opacité ÉCRASE l'attribut opacity du SVG
                    (ici, le voile serait passé à 75-100 % et laverait l'image). */}
                <g style={{ animation: "glow 0.5s steps(2) infinite" }}>
                  <rect x="-52" y="-38" width="104" height="76" fill="#eaf2f8" opacity="0.07" />
                </g>
              </g>
              {/* boutons + haut-parleur */}
              <circle cx="62" cy="-24" r="5" fill="#c9a24a" /><circle cx="62" cy="-8" r="5" fill="#c9a24a" />
              <rect x="56" y="6" width="12" height="26" rx="2" fill="#4a2e18" />
              {/* deux antennes « oreilles de lapin » */}
              <path d="M-18 -52 l-24 -34 M18 -52 l24 -34" stroke="#8a8c96" strokeWidth="3" strokeLinecap="round" />
              <circle cx="-42" cy="-86" r="2.6" fill="#b8bcc0" /><circle cx="42" cy="-86" r="2.6" fill="#b8bcc0" />
            </g>
          )}
        </g>

        {/* APPARAÎT : LE MAGNÉTOSCOPE, sous la télé (on peut garder l'émission) */}
        {cass && (
          <g transform="translate(640,522)" style={{ animation: "pulse 0.7s ease-out 2" }}>
            <rect x="-46" y="-14" width="92" height="26" rx="3" fill="#4a4650" />
            <rect x="-46" y="-14" width="92" height="26" rx="3" fill="#16141a" opacity="0.28" filter="url(#sa-grain)" />
            {/* la fente + une cassette qui dépasse */}
            <rect x="-30" y="-8" width="42" height="4" rx="1" fill="#1c1a20" />
            <rect x="-26" y="-12" width="34" height="5" rx="1" fill="#2a2c34" />
            <circle cx="30" cy="2" r="3" fill="#5eff9e" style={{ animation: "pulse 1.6s infinite" }} />
            <rect x="-34" y="2" width="18" height="4" rx="1" fill="#3a3c46" />
          </g>
        )}

        {/* PIÈCE : le tube cathodique, dans sa caisse (tant qu'il n'y a pas de télé) */}
        {!tv && (
          <g transform="translate(310,496)">
            {/* la caisse en bois */}
            <path d="M-46 26 L-40 -8 L40 -8 L46 26 Z" fill="#6a4a2a" />
            <path d="M-46 26 L-40 -8 L40 -8 L46 26 Z" fill="#2c1408" opacity="0.3" filter="url(#sa-grain)" />
            {/* le gros tube de verre qui dépasse */}
            <g transform="translate(0,-22)">
              <path d="M-24 10 L-20 -12 Q0 -20 20 -12 L24 10 Z" fill="#b8ccd8" opacity="0.85" />
              <path d="M-20 -12 Q0 -20 20 -12" stroke="#dfeaf2" strokeWidth="2" fill="none" />
              <rect x="-5" y="10" width="10" height="10" fill="#5a5c66" />
              <path d="M-18 -6 Q0 -13 18 -6" stroke="#eaf4ff" strokeWidth="1.4" fill="none" opacity="0.7" />
            </g>
          </g>
        )}

        {/* PIÈCE : la caméra de télévision sur son pied */}
        {!tv && (
          <g transform="translate(215,462)">
            <path d="M0 40 L-16 74 M0 40 L16 74 M0 40 L2 76" stroke="#2a2c34" strokeWidth="5" strokeLinecap="round" />
            <rect x="-26" y="-16" width="52" height="34" rx="4" fill="#3a3c46" />
            <rect x="-26" y="-16" width="52" height="34" rx="4" fill="#16141a" opacity="0.3" filter="url(#sa-grain)" />
            <circle cx="-34" cy="0" r="9" fill="#1c1c22" />
            <circle cx="-34" cy="0" r="5" fill="#5a5c66" />
            <circle cx="-8" cy="-24" r="9" fill="#2e2c34" stroke="#5a5c66" strokeWidth="2" />
            <circle cx="12" cy="-24" r="9" fill="#2e2c34" stroke="#5a5c66" strokeWidth="2" />
            <circle cx="22" cy="-8" r="3" fill="#c8483a" style={{ animation: "pulse 1.6s infinite" }} />
          </g>
        )}

        {/* PIÈCE : le boîtier plastique, sur l'étagère sous la télé */}
        {!cass && (
          <g transform="translate(640,522)">
            <rect x="-22" y="-10" width="44" height="20" rx="3" fill="#2a2c34" />
            <rect x="-22" y="-10" width="44" height="20" rx="3" fill="none" stroke="#5a5c66" strokeWidth="1.6" />
            <rect x="-14" y="-5" width="28" height="9" rx="1" fill="#4a4650" opacity="0.7" />
            <circle cx="-8" cy="0" r="2.6" fill="#5a5c66" /><circle cx="8" cy="0" r="2.6" fill="#5a5c66" />
          </g>
        )}
      </PLayer>

      <rect width="1000" height="560" fill="#2c1a08" opacity="0.06" style={{ pointerEvents: "none" }} />

      {/* ═══ zones cliquables ═══ */}
      <Hotspot cx={450} cy={452} r={50} label="l'enfant" reveal={reveal} onClick={() => action("enfant")} />
      {!tv && (
        <>
          <Hotspot cx={310} cy={480} r={44} label="tube cathodique" item="tube_cathodique" reveal={reveal} onClick={() => collect("tube_cathodique")} />
          <Hotspot cx={215} cy={454} r={44} label="caméra" item="camera" reveal={reveal} onClick={() => collect("camera")} />
        </>
      )}
      {!cass && (
        <Hotspot cx={640} cy={522} r={30} label="boîtier" item="boitier" reveal={reveal} onClick={() => collect("boitier")} />
      )}
    </svg>
  );
}
