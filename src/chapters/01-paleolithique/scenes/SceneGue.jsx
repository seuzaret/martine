import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 1 — Tableau : LE GUÉ DE LA RIVIÈRE
   ------------------------------------------------------------
   La rivière s'élargit ici, avec une série de grosses pierres
   qui affleurent : le passage à gué pour rejoindre l'autre rive
   (forêt profonde). Poissons visibles, un pêcheur sur la berge.
   ============================================================ */

export default function SceneGue({ collect, action, reveal, made = [] }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="gu-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a8b8c8" /><stop offset="100%" stopColor="#c8d0b0" /></linearGradient>
        <linearGradient id="gu-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6a90a8" /><stop offset="100%" stopColor="#3a5878" /></linearGradient>
        <linearGradient id="gu-rive" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5a4028" /><stop offset="100%" stopColor="#2a1a10" /></linearGradient>
      </defs>

      <PLayer depth={4}>
        <rect width="1000" height="240" fill="url(#gu-sky)" />
        {/* forêt profonde sur l'autre rive */}
        <path d="M0 240 L0 180 Q100 140 200 180 Q300 130 400 170 Q500 120 600 160 Q700 140 800 170 Q900 130 1000 180 L1000 240 Z" fill="#2a3818" opacity="0.9" />
        {/* silhouettes de bouleaux */}
        {[80, 180, 320, 460, 620, 780, 920].map((x, i) => (
          <g key={i} transform={`translate(${x},240)`}>
            <path d={`M-2 0 L-2 -${60 + (i % 3) * 12} L2 -${60 + (i % 3) * 12} L2 0 Z`} fill="#e8e0d0" />
            <path d="M-1 -30 h2 M-1 -45 h2" stroke="#3a2818" strokeWidth="0.6" />
            <ellipse cx="0" cy={-(70 + (i % 3) * 12)} rx="18" ry="12" fill="#3a5820" opacity="0.85" />
          </g>
        ))}
      </PLayer>

      <PLayer depth={3}>
        {/* la rivière large — bande d'eau bleu-gris qui traverse */}
        <rect y="240" width="1000" height="200" fill="url(#gu-water)" />
        {/* remous, courants */}
        {[260, 300, 340, 380, 420].map((y, i) => (
          <path key={i} d={`M0 ${y} q80 -${4 + i} 160 0 q80 ${4 + i} 160 0 q80 -${4 + i} 160 0 q80 ${4 + i} 160 0 q80 -${4 + i} 160 0`} stroke="#a0c0d8" strokeWidth="1.2" fill="none" opacity={0.35 + (i % 2) * 0.15} />
        ))}
        {/* reflets brillants */}
        {[[120, 320], [340, 300], [560, 340], [780, 310], [880, 360]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="16" ry="2" fill="#f0f4e8" opacity="0.4" />
        ))}

        {/* 5 GROSSES PIERRES du gué en zigzag */}
        {[[120, 380], [260, 340], [420, 380], [580, 340], [740, 380]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <ellipse cx="0" cy="10" rx="42" ry="6" fill="#1a1408" opacity="0.5" />
            <path d="M-40 0 Q-30 -20 0 -22 Q30 -20 40 0 L36 8 Q0 12 -36 8 Z" fill="#7a6a58" stroke="#3a2818" strokeWidth="1.5" />
            <ellipse cx="-10" cy="-8" rx="12" ry="6" fill="#8a7a68" opacity="0.7" />
            <path d="M-20 -2 q10 -6 20 -2" stroke="#5a4a38" strokeWidth="0.8" fill="none" opacity="0.6" />
          </g>
        ))}

        {/* Poissons dans l'eau */}
        {[[180, 400], [360, 420], [500, 400], [660, 420], [820, 400]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y})`} style={{ animation: `float ${2 + (i % 3) * 0.4}s ease-in-out infinite` }}>
            <path d="M0 0 Q-10 -3 -14 0 Q-10 3 0 0 L8 -2 L12 -6 L8 -2 L12 2 L8 2 L0 0 Z" fill="#5a7080" stroke="#2a3848" strokeWidth="0.6" />
            <circle cx="-8" cy="-1" r="1" fill="#0a0806" />
          </g>
        ))}
      </PLayer>

      <PLayer depth={2}>
        {/* berge proche (au sol) */}
        <path d="M0 440 L1000 440 L1000 560 L0 560 Z" fill="url(#gu-rive)" />
        {/* cailloux au bord */}
        {[[80, 460], [220, 470], [560, 470], [720, 460], [880, 468]].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} q-6 -6 -12 -2 q-4 6 4 8 q10 2 12 -8 Z`} fill="#4a3820" />
        ))}
        {/* herbes hautes qui cadrent */}
        <g opacity="0.85">
          <path d="M40 560 q10 -30 4 -46 M62 560 q3 -24 14 -38" stroke="#3a4a20" strokeWidth="3.5" fill="none" />
          <path d="M940 560 q-8 -28 -2 -44 M962 560 q4 -24 12 -36" stroke="#3a4a20" strokeWidth="3.5" fill="none" />
          <path d="M400 560 q-5 -16 2 -26 M540 560 q5 -16 -1 -24" stroke="#4a5828" strokeWidth="3" fill="none" />
        </g>
      </PLayer>

      <PLayer depth={1}>
        {/* Le PÊCHEUR ancestral sur la berge, canne en bois */}
        <g transform="translate(120,470)">
          {/* jambes assises */}
          <ellipse cx="0" cy="30" rx="26" ry="8" fill="#5a3818" />
          {/* torse penché */}
          <path d="M-18 20 Q-16 -14 0 -20 Q16 -14 18 20 Z" fill="#8a5828" />
          <path d="M-20 -8 Q0 -20 20 -8 L22 12 Q0 4 -22 12 Z" fill="#5a3818" opacity="0.85" />
          {/* tête */}
          <ellipse cx="0" cy="-30" rx="12" ry="14" fill="#c8946a" />
          <path d="M-10 -34 q-4 -6 3 -12 q5 8 7 -2 q3 8 6 -2 q5 6 5 12 z" fill="#3a2418" />
          <circle cx="-3" cy="-30" r="1.4" fill="#2a1a10" />
          <circle cx="3" cy="-30" r="1.4" fill="#2a1a10" />
          {/* canne à pêche = branche */}
          <path d="M10 -10 L120 -80" stroke="#5a3818" strokeWidth="3" strokeLinecap="round" />
          <path d="M120 -80 L200 -30" stroke="#8a8078" strokeWidth="0.6" fill="none" />
          {/* petit poisson au bout ? plus tard */}
        </g>
        {/* « ? » de dialogue */}
        <g transform="translate(120,420)" style={{ animation: "float 2s ease-in-out infinite" }}>
          <circle r="14" fill="#ffd166" stroke="#8a5a20" strokeWidth="2" />
          <text y="5" textAnchor="middle" fontSize="18" fontWeight="800" fill="#3a2410">?</text>
        </g>

        {/* Objets d'époque décoratifs (ephemere) : escargot, petite fleur, caillou */}
        <g transform="translate(680,528)">
          {/* coquille en spirale */}
          <ellipse cx="0" cy="0" rx="10" ry="7" fill="#8a6a48" stroke="#3a2818" strokeWidth="1" />
          <path d="M-2 -1 q3 -3 6 0 q-2 2 -6 0 Z" fill="#5a4028" opacity="0.7" />
          <path d="M-3 -2 q4 -4 8 0 q-3 3 -8 0 Z M-2 0 q3 -2 5 0 q-2 1.5 -5 0 Z" fill="none" stroke="#5a4028" strokeWidth="0.5" />
          {/* corps qui sort */}
          <path d="M-10 3 Q-16 5 -18 3" stroke="#8a7060" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* antennes */}
          <path d="M-16 1 l-2 -3 M-14 2 l-2 -3" stroke="#5a4028" strokeWidth="0.5" strokeLinecap="round" />
        </g>
        <g transform="translate(340,540)">
          {/* petite fleur bleue */}
          {[0, 72, 144, 216, 288].map((a, i) => {
            const rad = (a * Math.PI) / 180;
            return <circle key={i} cx={Math.cos(rad) * 3} cy={Math.sin(rad) * 3} r="2.5" fill="#7fb0e0" />;
          })}
          <circle cx="0" cy="0" r="1.5" fill="#e0a848" />
          <path d="M0 3 L0 12" stroke="#3a5820" strokeWidth="1" />
        </g>
        <g transform="translate(560,548)">
          <ellipse cx="0" cy="0" rx="8" ry="5" fill="#8a8078" stroke="#3a3028" strokeWidth="0.6" />
          <path d="M-3 -1 q4 -3 6 0" stroke="#5a5048" strokeWidth="0.5" fill="none" />
        </g>
      </PLayer>

      {/* ═══ zones cliquables ═══ */}
      <Hotspot cx={120} cy={450} r={40} label="le pêcheur" reveal={reveal} onClick={() => action("pecheur")} />
      <Hotspot cx={400} cy={370} r={80} label="traverser le gué (pierres)" reveal={reveal} onClick={() => action("traverser_gue")} />
      {[[180, 400], [360, 420], [500, 400], [660, 420], [820, 400]].map(([x, y], i) => (
        <Hotspot key={i} cx={x} cy={y} r={16} label="poisson dans l'eau" reveal={reveal} onClick={() => action("pecher")} />
      ))}
      <Hotspot cx={680} cy={528} r={18} label="escargot" item="escargot" reveal={reveal} onClick={() => collect("escargot")} />
      <Hotspot cx={340} cy={540} r={14} label="petite fleur" item="fleur" reveal={reveal} onClick={() => collect("fleur")} />
      <Hotspot cx={560} cy={548} r={14} label="joli caillou" item="caillou_rond" reveal={reveal} onClick={() => collect("caillou_rond")} />
    </svg>
  );
}
