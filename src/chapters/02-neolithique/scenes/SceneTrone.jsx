import Hotspot from "../../../engine/Hotspot.jsx";

/* ============================================================
   CHAPITRE 2 · Tableau 2 — La salle du roi Tannis
   Une salle de la cité : murs de torchis, un trône de pierre et
   de peaux, le roi couronné. Aucun objet à ramasser ici — juste
   le roi, à écouter. (Art « premier jet ».)
   ============================================================ */

export default function SceneTrone({ action, reveal, queteQui }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="tr-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a6e4c" /><stop offset="100%" stopColor="#5e4630" /></linearGradient>
        <linearGradient id="tr-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7a5e3e" /><stop offset="100%" stopColor="#4a3624" /></linearGradient>
        <linearGradient id="tr-stone" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9a9084" /><stop offset="100%" stopColor="#6a6258" /></linearGradient>
        <radialGradient id="tr-glow" cx="50%" cy="40%" r="60%"><stop offset="0%" stopColor="#ffe9a8" stopOpacity="0.4" /><stop offset="100%" stopColor="#ffe9a8" stopOpacity="0" /></radialGradient>
      </defs>

      {/* mur de torchis */}
      <rect width="1000" height="560" fill="url(#tr-wall)" />
      {/* deux torches qui éclairent le trône */}
      {[210, 790].map((x, i) => (
        <g key={i} transform={`translate(${x},210)`}>
          <rect x="-4" y="0" width="8" height="120" fill="#4a3018" />
          <path d="M0 -6 Q-10 -22 0 -40 Q10 -22 0 -6 Z" fill="#ff8a3c" style={{ animation: "flick 0.9s ease-in-out infinite" }} />
          <path d="M0 -8 Q-5 -18 0 -30 Q5 -18 0 -8 Z" fill="#ffd36a" style={{ animation: "flick 0.9s ease-in-out infinite" }} />
        </g>
      ))}
      {/* tentures de peaux au mur */}
      {[360, 640].map((x, i) => <g key={i}><rect x={x - 40} y="120" width="80" height="130" rx="4" fill="#7a4a2e" /><path d={`M${x - 40} 160 h80 M${x - 40} 200 h80`} stroke="#5a3520" strokeWidth="2" opacity="0.6" /></g>)}

      {/* halo doré autour du trône */}
      <ellipse cx="500" cy="330" rx="220" ry="200" fill="url(#tr-glow)" />

      {/* sol */}
      <rect y="400" width="1000" height="160" fill="url(#tr-floor)" />
      <path d="M0 448 h1000 M0 508 h1000 M300 410 v150 M700 410 v150" stroke="#3a2c1c" strokeWidth="1.4" opacity="0.4" />
      <ellipse cx="500" cy="476" rx="360" ry="44" fill="#3a2c1c" opacity="0.3" />

      {/* estrade + LE TRÔNE de pierre et de peaux */}
      <g transform="translate(500,438)">
        <rect x="-96" y="20" width="192" height="20" fill="#6a6258" />
        <path d="M-60 20 L-60 -110 Q-60 -128 -42 -128 L42 -128 Q60 -128 60 -110 L60 20 Z" fill="url(#tr-stone)" />
        <rect x="-52" y="-90" width="104" height="90" fill="#7a4a2e" />
        <path d="M-52 -60 h104 M-52 -30 h104" stroke="#5a3520" strokeWidth="2" opacity="0.5" />
        {/* accoudoirs */}
        <rect x="-72" y="-40" width="20" height="60" rx="4" fill="#6a6258" />
        <rect x="52" y="-40" width="20" height="60" rx="4" fill="#6a6258" />
      </g>

      {/* LE ROI TANNIS, assis, couronné, sceptre en main */}
      <g transform="translate(500,392)">
        {/* corps drapé, riche */}
        <path d="M-24 44 Q-30 -6 0 -22 Q30 -6 24 44 Z" fill="#7a2a4a" />
        <path d="M-24 44 Q-12 8 0 -20 M24 44 Q12 10 2 -18" stroke="#5a1c38" strokeWidth="3" fill="none" />
        {/* collier d'or */}
        <path d="M-14 -6 Q0 6 14 -6" stroke="#e0b040" strokeWidth="4" fill="none" />
        {/* tête + barbe */}
        <circle cx="0" cy="-34" r="12" fill="#c89a6e" />
        <path d="M-8 -24 q8 12 16 0 l-2 12 q-6 4 -12 0 Z" fill="#4a3324" />
        {/* LA COURONNE (bandeau d'or à pointes) */}
        <path d="M-13 -44 L13 -44 L13 -50 L8 -58 L4 -50 L0 -60 L-4 -50 L-8 -58 L-13 -50 Z" fill="#e0b040" stroke="#a8842a" strokeWidth="1" />
        <circle cx="0" cy="-52" r="2" fill="#c8382e" />
        {/* le sceptre */}
        <path d="M18 -12 q14 -2 16 -30" stroke="#c89a6e" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M34 -46 L34 22" stroke="#8a6a3a" strokeWidth="4" strokeLinecap="round" />
        <circle cx="34" cy="-48" r="6" fill="#e0b040" stroke="#a8842a" strokeWidth="1.5" />
      </g>
      {/* le « ? » doré : c'est au tour du roi */}
      {queteQui === "tannis" && (
        <g transform="translate(482,286)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
          <path d="M0 0 q0 -20 20 -20 q20 0 20 17 q0 14 -17 18 l0 6" fill="none" stroke="#ffd166" strokeWidth="4" />
          <circle cx="20" cy="31" r="2.6" fill="#ffd166" />
        </g>
      )}

      {/* jarres de grain (les impôts du roi) */}
      {[[300, 500], [700, 502]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <path d="M-18 -14 Q-24 6 -14 18 Q0 24 14 18 Q24 6 18 -14 Q0 -22 -18 -14 Z" fill="#a86a3a" />
          <ellipse cx="0" cy="-16" rx="12" ry="4" fill="#7a4a26" />
          <path d="M-14 0 q14 6 28 0" stroke="#7a4a26" strokeWidth="1.4" fill="none" opacity="0.6" />
        </g>
      ))}

      <rect width="1000" height="560" fill="#1a1208" opacity="0.06" style={{ pointerEvents: "none" }} />

      {/* zone cliquable : le roi */}
      <Hotspot cx={500} cy={370} r={54} label="le roi Tannis" reveal={reveal} onClick={(p) => action("tannis", p)} />
    </svg>
  );
}
