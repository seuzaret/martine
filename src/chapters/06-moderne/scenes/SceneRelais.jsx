import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 6 — Tableau : le relais de poste
   Peinture fine — cour d'auberge en fin d'après-midi : la
   malle-poste, des chevaux frais, le postillon, une malle de
   lettres, la carte du réseau royal sur le mur.
   À trouver : la lettre cachetée, les chevaux frais.
   ============================================================ */

export default function SceneRelais({ collect, action, reveal, made = [] }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="re-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5a78a8" /><stop offset="55%" stopColor="#b0a0a0" /><stop offset="100%" stopColor="#e8c88a" /></linearGradient>
        <linearGradient id="re-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d8c49a" /><stop offset="100%" stopColor="#a88c60" /></linearGradient>
        <linearGradient id="re-roof" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a5236" /><stop offset="100%" stopColor="#5e3620" /></linearGradient>
        <linearGradient id="re-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a89066" /><stop offset="100%" stopColor="#5e4c34" /></linearGradient>
        <filter id="re-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="re-mottle" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* ═══ ciel de fin d'après-midi ═══ */}
      <rect width="1000" height="560" fill="url(#re-sky)" />
      <circle cx="180" cy="150" r="34" fill="#fff0c8" opacity="0.8" />
      {[[300, 100, 120], [640, 80, 150]].map(([x, y, w], i) => <ellipse key={i} cx={x} cy={y} rx={w} ry={10} fill="#e8cca0" opacity="0.4" />)}

      {/* ═══ couche lointaine : collines + route qui s'éloigne ═══ */}
      <PLayer depth={1}>
        <path d="M0 300 Q250 280 500 296 Q750 312 1000 288 L1000 400 L0 400 Z" fill="#8a8a5e" />
        {/* la route du réseau qui monte vers l'horizon */}
        <path d="M440 400 Q480 340 500 300 Q510 320 560 400 Z" fill="#b09a68" opacity="0.6" />
        {[80, 900].map((x, i) => <path key={i} d={`M${x} 300 q-6 -40 0 -56 q6 16 0 56 Z`} fill="#4a5a34" opacity="0.8" />)}
      </PLayer>

      {/* ═══ couche intermédiaire : l'auberge-relais ═══ */}
      <PLayer depth={2}>
        <g transform="translate(240,300)">
          <rect x="-130" y="-96" width="260" height="96" fill="url(#re-wall)" />
          <rect x="-130" y="-96" width="260" height="96" fill="#6e5232" opacity="0.25" filter="url(#re-grain)" />
          {/* colombages */}
          <path d="M-130 -48 h260 M-70 -96 v96 M0 -96 v96 M70 -96 v96" stroke="#6e4c2e" strokeWidth="4" opacity="0.6" />
          {/* toit */}
          <path d="M-146 -96 L0 -150 L146 -96 Z" fill="url(#re-roof)" />
          {/* porche + porte cochère */}
          <path d="M-40 0 L-40 -60 Q0 -80 40 -60 L40 0 Z" fill="#3a2814" />
          {/* fenêtres */}
          {[-100, 100].map((x, i) => <rect key={i} x={x - 14} y="-70" width="28" height="34" fill="#5a6a70" stroke="#6e4c2e" strokeWidth="3" />)}
          {/* enseigne « POSTE » */}
          <g transform="translate(-120,-70)">
            <path d="M0 0 h-26" stroke="#4a3220" strokeWidth="3" />
            <rect x="-52" y="0" width="30" height="22" rx="2" fill="#3a2c1c" />
            <path d="M-48 8 h22 M-48 14 h16" stroke="#e0c060" strokeWidth="2" />
          </g>
          {/* la CARTE DU RÉSEAU accrochée sous le porche */}
          <g transform="translate(96,-40)">
            <rect x="-22" y="-16" width="44" height="34" fill="#efe6ce" />
            <rect x="-22" y="-16" width="44" height="34" fill="none" stroke="#6e4c2e" strokeWidth="2" />
            {/* réseau de routes + points-relais */}
            <path d="M-14 10 L-2 -6 L10 4 L16 -10 M-2 -6 L-16 -8 M10 4 L14 12" stroke="#a83828" strokeWidth="1" fill="none" />
            {[[-14, 10], [-2, -6], [10, 4], [16, -10], [-16, -8]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.6" fill="#7a2418" />)}
          </g>
        </g>
      </PLayer>

      {/* ═══ premier plan : cour pavée, malle-poste, chevaux, lettres ═══ */}
      <PLayer depth={3}>
        <rect y="400" width="1000" height="160" fill="url(#re-ground)" />
        <rect y="402" width="1000" height="158" fill="#2c2012" opacity="0.3" filter="url(#re-mottle)" />
        <path d="M0 452 h1000 M0 510 h1000 M300 410 v150 M600 410 v150 M800 410 v150" stroke="#4a3a24" strokeWidth="1.4" opacity="0.4" />
        <ellipse cx="500" cy="474" rx="440" ry="52" fill="#6e5836" opacity="0.3" />

        {/* la MALLE-POSTE (voiture) */}
        <g transform="translate(430,470)">
          {/* roues */}
          <g stroke="#3a2814" strokeWidth="3" fill="none"><circle cx="-40" cy="34" r="20" /><circle cx="44" cy="34" r="24" /></g>
          <circle cx="-40" cy="34" r="4" fill="#3a2814" /><circle cx="44" cy="34" r="4" fill="#3a2814" />
          {/* caisse */}
          <path d="M-58 24 L-56 -8 Q-54 -22 -38 -22 L44 -22 Q58 -22 58 -6 L60 24 Z" fill="#5a3f24" />
          <path d="M-58 24 L-56 -8 Q-54 -22 -38 -22 L44 -22 Q58 -22 58 -6 L60 24 Z" fill="#2c1c10" opacity="0.2" filter="url(#re-grain)" />
          <rect x="-40" y="-14" width="30" height="20" rx="2" fill="#3a2c1c" />
          <path d="M-38 -12 h26 M-38 -6 h20" stroke="#6a5230" strokeWidth="1" opacity="0.6" />
          {/* malle de courrier sur le toit */}
          <rect x="8" y="-34" width="44" height="16" rx="2" fill="#6e4c2e" />
          <path d="M8 -26 h44" stroke="#4a3220" strokeWidth="2" />
        </g>

        {/* MALLE DE LETTRES ouverte au sol + une lettre cachetée */}
        <g transform="translate(270,506)">
          <path d="M-34 12 L34 12 L30 -6 L-30 -6 Z" fill="#6e4c2e" />
          <path d="M-30 -6 L30 -6 L26 -20 L-26 -20 Z" fill="#5a3f24" />
          {/* lettres qui débordent */}
          {[[-14, -2, -6], [2, -4, 4], [16, -1, -3]].map(([x, y, r], i) => (
            <g key={i} transform={`translate(${x},${y}) rotate(${r})`}>
              <rect x="-12" y="-8" width="24" height="16" fill="#efe6ce" />
              <path d="M-12 -8 L0 0 L12 -8" stroke="#c9b892" strokeWidth="1" fill="none" />
              <circle cx="0" cy="2" r="3" fill="#a83828" />
            </g>
          ))}
        </g>

        {/* CHEVAUX FRAIS tenus par le postillon */}
        <g transform="translate(720,458)">
          {/* deux chevaux stylisés */}
          {[[0, 0, 1], [56, 8, 0.9]].map(([dx, dy, s], i) => (
            <g key={i} transform={`translate(${dx},${dy}) scale(${s})`}>
              <ellipse cx="0" cy="42" rx="34" ry="7" fill="#241608" opacity="0.4" />
              {/* corps */}
              <path d="M-30 6 Q-34 -14 -8 -16 L26 -12 Q40 -10 38 4 Q36 16 22 16 L-18 14 Q-30 14 -30 6 Z" fill={i ? "#6a4a30" : "#3a2c22"} />
              {/* cou + tête */}
              <path d="M28 -8 Q46 -14 50 -34 L58 -34" stroke={i ? "#6a4a30" : "#3a2c22"} strokeWidth="12" strokeLinecap="round" fill="none" />
              <path d="M54 -38 q10 -2 12 8 l-6 6 q-10 0 -10 -8 Z" fill={i ? "#6a4a30" : "#3a2c22"} />
              <path d="M50 -44 q-2 -8 4 -10" stroke={i ? "#6a4a30" : "#3a2c22"} strokeWidth="4" fill="none" strokeLinecap="round" />
              {/* crinière */}
              <path d="M34 -18 q-4 8 -10 10 M40 -24 q-3 8 -8 12" stroke="#241608" strokeWidth="3" fill="none" />
              {/* pattes */}
              <path d="M-22 12 L-24 42 M-6 14 L-6 42 M14 14 L16 42 M28 10 L32 40" stroke={i ? "#4a3020" : "#241a12"} strokeWidth="5" strokeLinecap="round" />
            </g>
          ))}
          {/* le postillon */}
          <g transform="translate(-30,4)">
            <path d="M-9 4 Q-12 -12 0 -15 Q12 -12 9 4 L7 22 L-7 22 Z" fill="#3a4a8a" />
            <circle cx="0" cy="-22" r="7" fill="#c8a882" />
            <path d="M-10 -26 h20" stroke="#2c2c3a" strokeWidth="4" />
            <path d="M6 -6 q12 -2 16 6" stroke="#c8a882" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          </g>
        </g>

        {/* auge d'eau + botte de foin */}
        <g transform="translate(880,510)"><path d="M-20 -6 L20 -6 L16 10 L-16 10 Z" fill="#5a3f24" /><ellipse cx="0" cy="-6" rx="20" ry="4" fill="#5a7278" /></g>

        {/* RÉSULTAT (msg_poste) : un COURRIER part au galop sur la route,
            la lettre dans sa sacoche — le relais fait son office */}
        {made.includes("msg_poste") && (
          <g transform="translate(468,432)" style={{ animation: "fadein 1s ease-out" }}>
            <ellipse cx="20" cy="18" rx="28" ry="6" fill="#c8b088" opacity="0.35" style={{ animation: "drift 3s ease-in-out infinite" }} />
            <g fill="#3a2c20">
              <path d="M-18 6 Q-20 -6 -8 -8 L14 -8 Q22 -8 24 -2 Q26 4 18 6 Q0 8 -18 6 Z" />
              <path d="M14 -8 Q24 -12 28 -22 L34 -20 Q30 -8 20 -6 Z" />
              <path d="M-14 4 l-8 12 M-4 5 l-2 14 M14 4 l8 12 M20 2 l10 8" stroke="#3a2c20" strokeWidth="3" strokeLinecap="round" />
              <path d="M-18 0 q-10 2 -14 10" stroke="#3a2c20" strokeWidth="4" fill="none" strokeLinecap="round" />
            </g>
            <path d="M-4 -10 Q-2 -22 6 -22 Q12 -20 10 -10 Z" fill="#3a4a8a" />
            <circle cx="4" cy="-24" r="4" fill="#c8a882" />
            <rect x="-9" y="-6" width="8" height="8" rx="1.5" fill="#6e4c2e" />
          </g>
        )}
      </PLayer>

      {/* voile de grain global */}
      <rect width="1000" height="560" fill="#231a10" opacity="0.05" style={{ pointerEvents: "none" }} />

      {/* zones cliquables */}
      {/* le « ? » du postillon : changer de cheval, pas de cavalier */}
      {!made.includes("msg_poste") && (
        <>
          <g transform="translate(656,334)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
            <path d="M0 0 q0 -20 20 -20 q20 0 20 17 q0 14 -17 18 l0 6" fill="none" stroke="#ffd166" strokeWidth="4" />
            <circle cx="20" cy="31" r="2.6" fill="#ffd166" />
          </g>
          <Hotspot cx={676} cy={344} r={26} label="parler au postillon" reveal={reveal} onClick={() => action("postillon")} />
        </>
      )}

      <Hotspot cx={270} cy={498} r={48} label="lettre" item="lettre" reveal={reveal} onClick={() => collect("lettre")} />
      <Hotspot cx={730} cy={452} r={78} label="chevaux" item="chevaux" reveal={reveal} onClick={() => collect("chevaux")} />
    </svg>
  );
}
