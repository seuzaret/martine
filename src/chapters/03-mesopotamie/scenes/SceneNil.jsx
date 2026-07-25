import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 3 — Tableau : les bords du Nil
   Peinture fine — lumière chaude d'Égypte, le fleuve, une
   felouque, une palmeraie, un mur de temple couvert de
   hiéroglyphes, l'atelier de papyrus.
   À trouver : tiges de papyrus, pierre à presser, roseau & encre.
   ============================================================ */

export default function SceneNil({ collect, action, reveal, made = [] }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="nl-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3f6a94" />
          <stop offset="45%" stopColor="#8fb0c4" />
          <stop offset="76%" stopColor="#e2c084" />
          <stop offset="100%" stopColor="#f4dca0" />
        </linearGradient>
        <radialGradient id="nl-sun" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#fff4d0" /><stop offset="50%" stopColor="#ffe09a" stopOpacity="0.6" /><stop offset="100%" stopColor="#ffe09a" stopOpacity="0" /></radialGradient>
        <linearGradient id="nl-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a9c4c0" /><stop offset="45%" stopColor="#6a98a0" /><stop offset="100%" stopColor="#41707a" /></linearGradient>
        <linearGradient id="nl-sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d8b878" /><stop offset="100%" stopColor="#9a7642" /></linearGradient>
        <linearGradient id="nl-temple" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d8b47e" /><stop offset="100%" stopColor="#a67c46" /></linearGradient>
        <filter id="nl-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="nl-blur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="7" /></filter>
      </defs>

      {/* ═══ ciel d'Égypte ═══ */}
      <rect width="1000" height="560" fill="url(#nl-sky)" />
      <circle cx="240" cy="170" r="150" fill="url(#nl-sun)" />
      <circle cx="240" cy="170" r="42" fill="#fff4d0" opacity="0.95" />
      {/* héron / ibis au loin */}
      <path d="M620 120 q8 -8 16 0 M660 138 q6 -6 12 0" stroke="#3c3a4a" strokeWidth="2.4" fill="none" opacity="0.6" />

      {/* ═══ couche lointaine : rive d'en face + temple à hiéroglyphes ═══ */}
      <PLayer depth={1}>
        <path d="M0 300 Q250 290 500 298 Q750 306 1000 296 L1000 380 L0 380 Z" fill="#c69a5e" />
        {/* le pylône du temple, couvert de signes */}
        <g transform="translate(760,300)">
          <path d="M-90 0 L-78 -110 L-40 -118 L-40 0 Z" fill="url(#nl-temple)" />
          <path d="M90 0 L78 -110 L40 -118 L40 0 Z" fill="url(#nl-temple)" />
          <rect x="-40" y="-96" width="80" height="96" fill="#8a6238" />
          {/* rangées de hiéroglyphes */}
          {[-84, -66, -48, -30].map((y, i) => (
            <text key={i} x="-64" y={y} fontSize="10" fill="#5c3f22" opacity="0.55" fontFamily="ui-monospace,monospace">𓂀𓁶𓆓</text>
          ))}
          <path d="M-40 -18 L40 -18 L34 0 L-34 0 Z" fill="#241608" />
        </g>
        {/* palmeraie */}
        {[[120, 300, 1], [180, 296, 0.8], [900, 298, 0.9], [60, 302, 0.7]].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x},${y}) scale(${s})`}>
            <path d="M0 0 L-3 -64 L3 -64 Z" fill="#6e4c2e" />
            <path d="M0 -64 q-32 -6 -50 14 M0 -64 q32 -6 50 14 M0 -64 q-22 -24 -36 -32 M0 -64 q22 -24 36 -32 M0 -64 q0 -28 0 -42" stroke="#4a6a30" strokeWidth="4" fill="none" />
          </g>
        ))}
      </PLayer>

      {/* ═══ couche intermédiaire : le Nil + la felouque ═══ */}
      <PLayer depth={2}>
        <rect y="330" width="1000" height="96" fill="url(#nl-water)" />
        {/* reflet du soleil */}
        <path d="M200 336 L280 336 L300 420 L180 420 Z" fill="#ffe09a" opacity="0.25" />
        {[344, 366, 388, 408].map((y, i) => (
          <path key={i} d={`M0 ${y} q120 ${i % 2 ? 4 : -4} 240 0 t240 0 t240 0 t240 0`} stroke="#cfe0da" strokeWidth="1.5" fill="none" opacity="0.4" />
        ))}
        {/* la felouque (barque à voile triangulaire) */}
        <g transform="translate(520,360)">
          <path d="M-46 30 Q0 44 46 30 L38 40 Q0 50 -38 40 Z" fill="#6e4c2e" />
          <path d="M0 30 L0 -54" stroke="#5a3f24" strokeWidth="3" />
          <path d="M0 -54 L44 26 L0 26 Z" fill="#f0e6d0" />
          <path d="M0 -54 L44 26" stroke="#c9b890" strokeWidth="1.5" />
          <path d="M0 -30 L-30 26 L0 26 Z" fill="#e6dcc6" opacity="0.9" />
        </g>
      </PLayer>

      {/* ═══ premier plan : berge, atelier de papyrus ═══ */}
      <PLayer depth={3}>
        <path d="M0 560 L0 420 Q250 404 520 426 Q760 444 1000 418 L1000 560 Z" fill="url(#nl-sand)" />
        <path d="M0 560 L0 420 Q250 404 520 426 Q760 444 1000 418 L1000 560 Z" fill="#3c2c18" opacity="0.3" filter="url(#nl-grain)" />
        <ellipse cx="500" cy="500" rx="440" ry="52" fill="#8a6c40" opacity="0.35" />

        {/* massif de PAPYRUS qui pousse (tiges à ombelles) */}
        <g transform="translate(180,470)">
          {[[-26, 0, 1], [-10, 6, 1.1], [8, -2, 0.95], [24, 8, 1.05], [0, 10, 0.9]].map(([dx, dy, s], i) => (
            <g key={i} transform={`translate(${dx},${dy}) scale(${s})`}>
              <path d={`M0 40 q${i % 2 ? 4 : -4} -40 0 -78`} stroke="#5c7a30" strokeWidth="4" fill="none" style={{ animation: `sway ${3 + i * 0.5}s ease-in-out infinite`, transformOrigin: "0px 40px", transformBox: "view-box" }} />
              <g style={{ animation: `sway ${3 + i * 0.5}s ease-in-out infinite`, transformOrigin: "0px 40px", transformBox: "view-box" }}>
                {[0, 40, 80, 120, 160].map((a) => <path key={a} d={`M0 -78 l${Math.cos(a * Math.PI / 180) * 16} ${-Math.sin(a * Math.PI / 180) * 16 - 4}`} stroke="#6a8a3a" strokeWidth="1.6" />)}
              </g>
            </g>
          ))}
        </g>

        {/* ATELIER : tiges coupées + PIERRE à presser + roseau & encre */}
        <g transform="translate(470,510)">
          {/* natte */}
          <ellipse cx="0" cy="14" rx="80" ry="16" fill="#c2a066" />
          <ellipse cx="0" cy="14" rx="80" ry="16" fill="#6e5228" opacity="0.28" filter="url(#nl-grain)" />
          {/* tiges de papyrus coupées, alignées */}
          <g transform="translate(-46,6)">
            {[-10, -4, 2, 8, 14].map((x, i) => <rect key={i} x={x} y={-6} width="4" height="20" rx="1" fill="#8a9a4a" />)}
            <path d="M-12 -7 h30" stroke="#6a7a34" strokeWidth="1.4" />
          </g>
          {/* la pierre à presser */}
          <g transform="translate(20,4)">
            <ellipse cx="0" cy="10" rx="26" ry="7" fill="#241608" opacity="0.4" />
            <path d="M-24 8 Q-26 -6 -8 -10 L14 -10 Q26 -8 24 6 Q22 12 8 12 L-12 12 Q-24 12 -24 8 Z" fill="#8a8278" />
            <path d="M-18 -2 Q0 -7 20 -2" stroke="#b8b0a4" strokeWidth="1.4" fill="none" opacity="0.6" />
          </g>
          {/* pot d'encre + roseau */}
          <g transform="translate(90,6)">
            <path d="M-8 -2 Q-9 8 0 9 Q9 8 8 -2 Z" fill="#7a5636" />
            <ellipse cx="0" cy="-2" rx="7" ry="3.2" fill="#1c1c22" />
            <g transform="translate(4,-6) rotate(30)"><rect x="-1" y="-14" width="2" height="24" rx="1" fill="#c9a86a" /><path d="M-1 -14 h2 l-1 -3 Z" fill="#3a3a3a" /></g>
          </g>
        </g>

        {/* LE SCRIBE ÉGYPTIEN — debout, il soupèse une lourde tablette d'argile
            et regarde d'un air navré l'âne déjà surchargé. */}
        <g transform="translate(700,478)">
          <ellipse cx="0" cy="28" rx="24" ry="7" fill="#2a1c10" opacity="0.45" />
          {/* le pagne blanc plissé */}
          <path d="M-13 28 Q-17 -2 0 -17 Q17 -2 13 28 Z" fill="#eee6d2" />
          <path d="M-13 28 Q-17 -2 0 -17 Q17 -2 13 28 Z" fill="#8a7a52" opacity="0.24" />
          <path d="M-8 10 v18 M0 12 v16 M8 10 v18" stroke="#c8bc9e" strokeWidth="1.4" />
          {/* la tête, perruque noire de scribe */}
          <circle cx="0" cy="-26" r="9" fill="#b07a4a" />
          <path d="M-9 -28 q0 -12 9 -12 q9 0 9 12 l-2 8 l-4 -9 l-6 0 l-4 9 Z" fill="#241812" />
          {/* le collier large */}
          <path d="M-8 -17 q8 6 16 0" stroke="#c9a24a" strokeWidth="2.5" fill="none" />
          {/* le bras qui soupèse la tablette, l'air sceptique */}
          <path d="M13 -6 q14 4 17 14" stroke="#b07a4a" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <g transform="translate(34,12) rotate(10)">
            <rect x="-9" y="-7" width="18" height="14" rx="2" fill="#a67c46" />
            <path d="M-5 -3 l3 1.6 M0 -3 l3 1.6" stroke="#5c3f22" strokeWidth="1.1" />
          </g>
        </g>

        {/* herbes de berge */}
        <g opacity="0.9">
          <path d="M-4 560 q10 -28 4 -44 M18 560 q3 -22 14 -36 M960 560 q-6 -22 2 -36 M984 560 q4 -18 12 -28" stroke="#3a4a1c" strokeWidth="4" fill="none" />
        </g>
      </PLayer>

      {/* RÉSULTAT (msg_hieroglyphes) : une feuille de PAPYRUS légère,
          couverte de hiéroglyphes tracés au roseau et à l'encre */}
      {made.includes("msg_hieroglyphes") && (
        <g transform="translate(720,508)" style={{ animation: "fadein 1s ease-out" }}>
          <ellipse cx="0" cy="24" rx="42" ry="8" fill="#20140a" opacity="0.4" />
          <path d="M-38 -20 Q-44 -1 -38 18 L38 18 Q44 -1 38 -20 Z" fill="#e6d09a" />
          <path d="M-38 -20 Q-44 -1 -38 18" stroke="#c8a860" strokeWidth="4" fill="none" />
          <path d="M38 -20 Q44 -1 38 18" stroke="#c8a860" strokeWidth="4" fill="none" />
          <path d="M-34 -8 h68 M-34 1 h68 M-34 10 h68" stroke="#d0b878" strokeWidth="0.8" opacity="0.4" />
          {/* hiéroglyphes stylisés (œil, eau, oiseau, jambes, soleil…) */}
          <g stroke="#3a2a14" strokeWidth="1.5" fill="none" strokeLinecap="round">
            <path d="M-30 -11 q4 -4 9 0 q-4 4 -9 0 M-26 -9 v3" />
            <path d="M-14 -12 q3 -3 6 0 t6 0" />
            <path d="M4 -13 q4 -3 9 -1 l-3 3 M13 -11 l3 -1" />
            <path d="M24 -13 v5 l-3 3 M24 -8 l3 3" />
            <circle cx="-28" cy="7" r="3" />
            <path d="M-14 11 v-9 M-14 3 l3 -2" />
            <path d="M2 10 h7 v-5" />
            <path d="M20 10 q4 -4 8 0 q-4 4 -8 0" />
          </g>
        </g>
      )}

      {/* voile de grain global */}
      <rect width="1000" height="560" fill="#2a1c10" opacity="0.07" style={{ pointerEvents: "none" }} />

      {/* zones cliquables */}
      {/* le « ? » du scribe : il lui faudrait un support LÉGER */}
      {!made.includes("msg_hieroglyphes") && (
        <>
          <g transform="translate(692,376)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
            <path d="M0 0 q0 -20 20 -20 q20 0 20 17 q0 14 -17 18 l0 6" fill="none" stroke="#ffd166" strokeWidth="4" />
            <circle cx="20" cy="31" r="2.6" fill="#ffd166" />
          </g>
          <Hotspot cx={712} cy={386} r={28} label="parler au scribe" reveal={reveal} onClick={() => action("scribe")} />
        </>
      )}

      <Hotspot cx={180} cy={452} r={54} label="papyrus" item="papyrus_tiges" reveal={reveal} onClick={() => collect("papyrus_tiges")} />
      <Hotspot cx={488} cy={514} r={30} label="pierre" item="pierre" reveal={reveal} onClick={() => collect("pierre")} />
      <Hotspot cx={560} cy={514} r={30} label="encre" item="encre" reveal={reveal} onClick={() => collect("encre")} />
    </svg>
  );
}
