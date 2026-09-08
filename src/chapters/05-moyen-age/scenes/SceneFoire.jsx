import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 5 — Tableau adjacent : LA FOIRE AUX LIVRES DE
   FRANCFORT
   ------------------------------------------------------------
   Fin XVe siècle : la première foire aux livres imprimés du
   monde. Étal du libraire avec des livres empilés reliés en
   cuir, colporteur avec sa hotte pleine de libelles bon marché,
   client curieux, cliente qui feuillette une page, banderole
   « Buchmesse » tendue au-dessus, moulin à vent au loin.
   ============================================================ */

export default function SceneFoire({ collect, action, reveal, inv = [] }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="fo-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#b0c0d0" /><stop offset="100%" stopColor="#e8d8b0" /></linearGradient>
        <linearGradient id="fo-toile" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e0c088" /><stop offset="100%" stopColor="#8a6828" /></linearGradient>
        <linearGradient id="fo-sol" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a08858" /><stop offset="100%" stopColor="#5a4830" /></linearGradient>
        <linearGradient id="fo-livre" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a4028" /><stop offset="100%" stopColor="#4a1810" /></linearGradient>
        <linearGradient id="fo-livre2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3a5828" /><stop offset="100%" stopColor="#1a2810" /></linearGradient>
        <linearGradient id="fo-livre3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5a3818" /><stop offset="100%" stopColor="#2a1408" /></linearGradient>
      </defs>

      <PLayer depth={5}>
        <rect width="1000" height="360" fill="url(#fo-sky)" />
        {/* nuages */}
        <ellipse cx="200" cy="70" rx="100" ry="7" fill="#f0e0c0" opacity="0.55" />
        <ellipse cx="560" cy="90" rx="120" ry="8" fill="#f0e0c0" opacity="0.5" />
        <ellipse cx="820" cy="60" rx="80" ry="6" fill="#f0e0c0" opacity="0.5" />
        {/* collines lointaines vertes */}
        <path d="M0 360 L0 260 Q200 240 400 250 Q600 260 800 245 L1000 250 L1000 360 Z" fill="#5a6a48" opacity="0.6" />

        {/* SKYLINE MEDIEVALE : silhouette continue de toits, murailles et
            un clocher — remplit l'horizon a la place du vide. */}
        <g opacity="0.85">
          {/* muraille de la ville avec creneaux */}
          <path d="M0 300 L1000 300 L1000 360 L0 360 Z" fill="#7a6248" />
          {/* creneaux de la muraille */}
          {Array.from({ length: 25 }).map((_, i) => (
            <rect key={i} x={i * 40} y="292" width="24" height="10" fill="#7a6248" />
          ))}
          <path d="M0 300 h1000" stroke="#3a2814" strokeWidth="1.5" />
          {/* meurtrieres */}
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x={i * 84 + 20} y="326" width="4" height="12" fill="#1a1408" />
          ))}
        </g>

        {/* MAISONS DE LA VILLE derriere la muraille — toits pentus, colombages */}
        {[
          { x: 60, y: 270, w: 68, h: 34, wall: "#e0d0a8", roof: "#8a4028" },
          { x: 130, y: 258, w: 52, h: 46, wall: "#c8b494", roof: "#7a3018" },
          { x: 190, y: 264, w: 60, h: 40, wall: "#d8c8a4", roof: "#8a4028" },
          { x: 250, y: 250, w: 46, h: 54, wall: "#e0d0a8", roof: "#6a2818" },
          { x: 300, y: 270, w: 72, h: 34, wall: "#c8b494", roof: "#7a3018" },
          { x: 380, y: 262, w: 54, h: 42, wall: "#d8c8a4", roof: "#8a4028" },
          { x: 440, y: 256, w: 58, h: 48, wall: "#e0d0a8", roof: "#6a2818" },
          { x: 510, y: 268, w: 68, h: 36, wall: "#c8b494", roof: "#8a4028" },
          { x: 585, y: 264, w: 50, h: 40, wall: "#e0d0a8", roof: "#7a3018" },
          { x: 645, y: 258, w: 62, h: 46, wall: "#d8c8a4", roof: "#8a4028" },
          { x: 715, y: 268, w: 58, h: 36, wall: "#c8b494", roof: "#6a2818" },
          { x: 900, y: 262, w: 66, h: 42, wall: "#e0d0a8", roof: "#8a4028" },
        ].map((h, i) => (
          <g key={i}>
            {/* mur */}
            <rect x={h.x} y={h.y} width={h.w} height={h.h} fill={h.wall} />
            <rect x={h.x} y={h.y} width={h.w} height={h.h} fill="#5a3818" opacity="0.12" />
            {/* colombages en croix de saint-Andre */}
            <path d={`M${h.x} ${h.y} L${h.x + h.w} ${h.y + h.h} M${h.x + h.w} ${h.y} L${h.x} ${h.y + h.h}`} stroke="#3a2410" strokeWidth="0.6" opacity="0.6" />
            <path d={`M${h.x} ${h.y + h.h * 0.5} h${h.w}`} stroke="#3a2410" strokeWidth="0.6" opacity="0.6" />
            {/* toit pentu (2 pans) */}
            <path d={`M${h.x - 4} ${h.y} L${h.x + h.w / 2} ${h.y - h.h * 0.55} L${h.x + h.w + 4} ${h.y} Z`} fill={h.roof} />
            <path d={`M${h.x - 4} ${h.y} L${h.x + h.w / 2} ${h.y - h.h * 0.55}`} stroke="#241010" strokeWidth="0.4" />
            {/* petite fenetre carree */}
            <rect x={h.x + h.w * 0.35} y={h.y + h.h * 0.3} width="6" height="7" fill="#3a2818" />
            {/* cheminee qui fume sur certains toits */}
            {i % 3 === 0 && (
              <g>
                <rect x={h.x + h.w * 0.75} y={h.y - h.h * 0.35} width="4" height={h.h * 0.35} fill="#5a3818" />
                <path d={`M${h.x + h.w * 0.75 + 2} ${h.y - h.h * 0.35} q-4 -8 2 -14 q-6 4 0 -12`} stroke="#c8c0b0" strokeWidth="3" fill="none" opacity="0.5">
                  <animate attributeName="opacity" values="0.3;0.6;0.3" dur={`${4 + (i % 3)}s`} repeatCount="indefinite" />
                </path>
              </g>
            )}
          </g>
        ))}

        {/* GRANDE EGLISE au centre — deux tours, une fleche pointue */}
        <g transform="translate(780,240)">
          {/* nef */}
          <rect x="-40" y="0" width="80" height="64" fill="#d8c8a4" />
          <rect x="-40" y="0" width="80" height="64" fill="#5a3818" opacity="0.12" />
          <path d="M-40 0 L0 -22 L40 0 Z" fill="#7a3018" />
          {/* tour de gauche */}
          <rect x="-50" y="-32" width="24" height="96" fill="#d8c8a4" />
          <rect x="-50" y="-32" width="24" height="96" fill="#5a3818" opacity="0.15" />
          <path d="M-50 -32 L-38 -60 L-26 -32 Z" fill="#5a2818" />
          {/* tour de droite avec fleche */}
          <rect x="26" y="-40" width="24" height="104" fill="#d8c8a4" />
          <rect x="26" y="-40" width="24" height="104" fill="#5a3818" opacity="0.15" />
          <path d="M26 -40 L38 -90 L50 -40 Z" fill="#5a2818" />
          <path d="M38 -90 L38 -104" stroke="#3a1810" strokeWidth="1.5" />
          <circle cx="38" cy="-105" r="1.6" fill="#c8a848" />
          {/* petite rose */}
          <circle cx="0" cy="24" r="8" fill="#3a2818" />
          <circle cx="0" cy="24" r="6" fill="#8a4028" opacity="0.6" />
          {/* portail ogival */}
          <path d="M-10 64 L-10 40 Q0 30 10 40 L10 64 Z" fill="#241408" />
          {/* fenetres latérales */}
          <rect x="-42" y="10" width="6" height="18" fill="#3a2818" />
          <rect x="-42" y="34" width="6" height="18" fill="#3a2818" />
          <rect x="36" y="2" width="6" height="18" fill="#3a2818" />
          <rect x="36" y="26" width="6" height="18" fill="#3a2818" />
        </g>

        {/* MOULIN à vent silhouette (garde, deplace un peu vers la droite) */}
        <g transform="translate(920,320)">
          <rect x="-14" y="0" width="28" height="40" fill="#8a6a48" stroke="#3a2818" strokeWidth="0.6" />
          <path d="M-16 0 L16 0 L14 -14 L-14 -14 Z" fill="#3a2818" />
          <circle cx="0" cy="-14" r="5" fill="#5a3818" stroke="#2a1408" strokeWidth="0.6" />
          <g style={{ transformOrigin: "0px -14px" }}>
            <animateTransform attributeName="transform" type="rotate"
              values="0; 360" dur="14s" repeatCount="indefinite" />
            <path d="M0 -14 L-40 -50 L-46 -44 L-6 -8 Z" fill="#e0c088" stroke="#5a3818" strokeWidth="0.6" />
            <path d="M0 -14 L40 -50 L46 -44 L6 -8 Z" fill="#e0c088" stroke="#5a3818" strokeWidth="0.6" />
            <path d="M0 -14 L-40 22 L-34 26 L4 -10 Z" fill="#e0c088" stroke="#5a3818" strokeWidth="0.6" />
            <path d="M0 -14 L40 22 L34 26 L-4 -10 Z" fill="#e0c088" stroke="#5a3818" strokeWidth="0.6" />
          </g>
        </g>
      </PLayer>

      <PLayer depth={4}>
        {/* BANDEROLE au-dessus de la scène — flottante au vent */}
        <g transform="translate(500,150)" style={{ animation: "float 5s ease-in-out infinite" }}>
          <path d="M-300 -8 q300 40 600 0 L300 24 q-300 30 -600 0 Z" fill="#c85028" stroke="#5a1810" strokeWidth="1" />
          <path d="M-300 -8 q300 40 600 0" fill="none" stroke="#f0c848" strokeWidth="1.2" />
          <path d="M-300 24 q-300 30 -600 0" fill="none" stroke="#f0c848" strokeWidth="0.8" />
          <text x="0" y="18" textAnchor="middle" fontSize="28" fontFamily="Georgia, serif" fontWeight="700" fill="#f0e8d0">BUCHMESSE · MCDLXXX</text>
          {/* petits nœuds aux extrémités */}
          <path d="M-300 -8 l-10 12 M-300 24 l-10 -12" stroke="#5a1810" strokeWidth="1.2" />
          <path d="M300 -8 l10 12 M300 24 l10 -12" stroke="#5a1810" strokeWidth="1.2" />
        </g>
      </PLayer>

      <PLayer depth={3}>
        {/* ÉTAL DU LIBRAIRE : grande table sous auvent */}
        <g transform="translate(240,400)">
          {/* poteaux de bois */}
          <rect x="-120" y="-30" width="4" height="150" fill="#5a3818" stroke="#2a1408" strokeWidth="0.4" />
          <rect x="116" y="-30" width="4" height="150" fill="#5a3818" stroke="#2a1408" strokeWidth="0.4" />
          {/* auvent en toile */}
          <path d="M-136 -30 L136 -30 L120 -68 L-120 -68 Z" fill="url(#fo-toile)" stroke="#5a3818" strokeWidth="0.8" />
          <path d="M-120 -50 h240 M-116 -60 h232" stroke="#8a6828" strokeWidth="0.5" />
          {/* franges */}
          <path d="M-136 -30 l4 8 l4 -8 l4 8 l4 -8 l4 8 l4 -8 l4 8 l4 -8 l4 8 l4 -8 l4 8 l4 -8 l4 8 l4 -8 l4 8 l4 -8 l4 8 l4 -8 l4 8 l4 -8 l4 8 l4 -8 l4 8 l4 -8 l4 8 l4 -8 l4 8 l4 -8" stroke="#5a3818" strokeWidth="1.2" fill="none" />
          {/* plateau */}
          <rect x="-116" y="0" width="232" height="20" fill="#8a5a2e" stroke="#2a1408" strokeWidth="0.8" />
          {/* nappe qui pend */}
          <path d="M-116 20 L116 20 L120 40 L-120 40 Z" fill="#7a2044" stroke="#3a1428" strokeWidth="0.4" />

          {/* LIVRES empilés à plat sur le plateau */}
          {[[-90, 0], [-40, 0], [10, 0], [60, 0]].map(([x, y], i) => (
            <g key={`p${i}`} transform={`translate(${x},${y})`}>
              <rect x="-16" y="-16" width="32" height="16" fill={i % 3 === 0 ? "url(#fo-livre)" : i % 3 === 1 ? "url(#fo-livre2)" : "url(#fo-livre3)"} stroke="#1a0e04" strokeWidth="0.6" />
              <path d="M-14 -12 h28 M-14 -6 h28" stroke="#c8a848" strokeWidth="0.5" />
              <circle cx="0" cy="-9" r="1.5" fill="#c8a848" />
            </g>
          ))}
          {/* Livre ouvert de démonstration au centre */}
          <g transform="translate(0,-4)">
            <path d="M-30 -14 L30 -14 L28 6 L-28 6 Z" fill="#f0e8d0" stroke="#5a3818" strokeWidth="0.6" />
            <path d="M0 -14 L0 6" stroke="#5a3818" strokeWidth="1" />
            {/* lignes de texte imprimé */}
            <path d="M-26 -10 h20 M-26 -6 h20 M-26 -2 h20 M-26 2 h18 M6 -10 h22 M6 -6 h22 M6 -2 h22 M6 2 h20" stroke="#5a3818" strokeWidth="0.3" />
            {/* lettrine rouge */}
            <rect x="-26" y="-12" width="3" height="4" fill="#8a2818" />
          </g>
          {/* Livres debout à droite comme sur un présentoir */}
          <g transform="translate(90,-8)">
            {[[-16, 0], [-10, 2], [-4, -1], [2, 0], [8, 1], [14, 0], [20, 2]].map(([x, y], i) => (
              <rect key={i} x={x} y={-30 + y} width="5" height="30" fill={i % 3 === 0 ? "url(#fo-livre)" : i % 3 === 1 ? "url(#fo-livre2)" : "url(#fo-livre3)"} stroke="#1a0e04" strokeWidth="0.4" />
            ))}
          </g>
        </g>
      </PLayer>

      <PLayer depth={2}>
        {/* sol de terre battue */}
        <rect y="440" width="1000" height="120" fill="url(#fo-sol)" />
        {/* pavés */}
        {Array.from({ length: 24 }).map((_, i) => {
          const x = (i * 45) % 1000;
          const y = 440 + Math.floor(i / 20) * 60;
          return <path key={i} d={`M${x} ${y} l40 0 l-4 22 l-36 0 z`} fill="none" stroke="#3a2010" strokeWidth="0.4" opacity="0.4" />;
        })}
        {/* petits pavés supplémentaires */}
        {[[500, 490], [700, 500], [900, 510]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="6" ry="2" fill="#5a4028" opacity="0.6" />
        ))}
        {/* SILHOUETTES DE FOULE lointaine derrière (têtes seulement) */}
        <g opacity="0.65">
          {[[80, 430, "#5a3818"], [110, 434, "#8a5828"], [140, 428, "#3a2818"], [560, 428, "#5a3818"], [590, 434, "#3a2818"], [860, 432, "#8a5828"], [890, 428, "#3a2818"], [820, 434, "#5a2818"]].map(([x, y, col], i) => (
            <g key={i}>
              <ellipse cx={x} cy={y} rx="6" ry="7" fill="#a06838" opacity="0.7" />
              <path d={`M${x - 4} ${y - 4} q4 -6 8 0`} stroke={col} strokeWidth="1.2" fill="none" />
              <path d={`M${x - 8} ${y + 5} L${x - 8} ${y + 24} L${x + 8} ${y + 24} L${x + 8} ${y + 5} Z`} fill={col} />
            </g>
          ))}
        </g>
        {/* Feuilles qui volent (libelles emportés par le vent) */}
        {[[380, 340, 2.4], [600, 360, 3], [800, 340, 2.8]].map(([x, y, d], i) => (
          <g key={i} transform={`translate(${x},${y}) rotate(${(i * 30) - 15})`} style={{ animation: `float ${d}s ease-in-out infinite` }} opacity="0.8">
            <rect x="-6" y="-4" width="12" height="9" fill="#f0e8d0" stroke="#5a3818" strokeWidth="0.3" />
            <path d="M-4 -2 h8 M-4 0 h8 M-4 2 h6" stroke="#5a3818" strokeWidth="0.25" />
          </g>
        ))}
      </PLayer>

      <PLayer depth={1}>
        {/* LE LIBRAIRE derrière son étal */}
        <g transform="translate(240,412)">
          <ellipse cx="0" cy="0" rx="18" ry="3" fill="#0a0604" opacity="0.4" />
          {/* torse — houppelande verte médiévale */}
          <path d="M-16 -8 Q-18 -34 0 -40 Q18 -34 16 -8 Z" fill="#3a5828" stroke="#1a2810" strokeWidth="0.5" />
          <path d="M-8 -30 L-8 -8 M8 -30 L8 -8" stroke="#5a7838" strokeWidth="0.4" />
          {/* épaules */}
          <ellipse cx="-16" cy="-24" rx="5" ry="4" fill="#c8946a" />
          <ellipse cx="16" cy="-24" rx="5" ry="4" fill="#c8946a" />
          {/* bras qui tient un livre ouvert vers le client */}
          <path d="M-14 -22 L-24 -14" stroke="#c8946a" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M14 -22 L26 -14" stroke="#c8946a" strokeWidth="3.5" strokeLinecap="round" />
          {/* tête */}
          <ellipse cx="0" cy="-52" rx="10" ry="12" fill="#c8946a" stroke="#5a3818" strokeWidth="0.5" />
          {/* toque médiévale rouge */}
          <path d="M-11 -54 q0 -10 4 -14 q10 -6 20 0 q4 4 4 14 z" fill="#7a2044" stroke="#3a1428" strokeWidth="0.5" />
          <ellipse cx="0" cy="-64" rx="8" ry="2" fill="#5a1428" />
          <circle cx="-3" cy="-52" r="1.2" fill="#0a0806" />
          <circle cx="3" cy="-52" r="1.2" fill="#0a0806" />
          <path d="M-4 -44 q4 3 8 0" stroke="#5a2818" strokeWidth="0.8" fill="none" />
          <path d="M-3 -38 q3 6 6 0" stroke="#3a2418" strokeWidth="1.4" fill="none" />
        </g>
        <g transform="translate(240,342)" style={{ animation: "float 2s ease-in-out infinite" }}>
          <circle r="14" fill="#ffd166" stroke="#8a5a20" strokeWidth="2" />
          <text y="5" textAnchor="middle" fontSize="18" fontWeight="800" fill="#3a2410">!</text>
        </g>

        {/* CLIENT curieux qui se penche sur les livres */}
        <g transform="translate(400,486)">
          <ellipse cx="0" cy="42" rx="20" ry="4" fill="#0a0604" opacity="0.55" />
          {/* jambes */}
          <path d="M-6 42 L-6 8 M6 42 L6 8" stroke="#6a4020" strokeWidth="6" strokeLinecap="round" />
          {/* buste penché en avant, cape marron */}
          <path d="M-16 12 Q-18 -14 -4 -20 Q14 -14 18 8 Q10 14 -8 14 Z" fill="#8a5a2e" stroke="#3a1810" strokeWidth="0.5" />
          {/* tête inclinée */}
          <ellipse cx="4" cy="-24" rx="10" ry="12" fill="#c8946a" transform="rotate(20 4 -24)" />
          {/* chapeau conique bleu */}
          <path d="M-4 -30 q0 -12 6 -14 q8 4 12 -2 q2 4 -2 12 z" fill="#3a5878" stroke="#1a2848" strokeWidth="0.5" transform="rotate(20 4 -32)" />
          {/* main tendue vers un livre */}
          <path d="M14 -6 L26 4" stroke="#c8946a" strokeWidth="3.5" strokeLinecap="round" />
        </g>

        {/* COLPORTEUR avec sa hotte à libelles */}
        <g transform="translate(680,486)">
          <ellipse cx="0" cy="44" rx="24" ry="4" fill="#0a0604" opacity="0.55" />
          {/* jambes en chausses grises */}
          <path d="M-6 44 L-6 8 M6 44 L6 8" stroke="#6a6858" strokeWidth="6" strokeLinecap="round" />
          {/* pourpoint marron */}
          <path d="M-14 10 Q-16 -14 0 -20 Q16 -14 14 10 Z" fill="#8a5a2e" stroke="#3a1810" strokeWidth="0.5" />
          {/* HOTTE en osier sur le dos */}
          <g transform="translate(0,-4)">
            <path d="M-18 -22 L18 -22 L14 14 L-14 14 Z" fill="#8a5a2e" stroke="#2a1408" strokeWidth="0.6" />
            <path d="M-16 -14 h32 M-15 -6 h30 M-14 2 h28 M-13 10 h26" stroke="#3a2010" strokeWidth="0.4" />
            <path d="M-18 -22 L18 -22" stroke="#3a2010" strokeWidth="1" />
            {/* libelles qui dépassent */}
            <rect x="-8" y="-32" width="8" height="14" fill="#f0e8d0" stroke="#5a3818" strokeWidth="0.3" transform="rotate(-8 -4 -25)" />
            <rect x="2" y="-34" width="7" height="12" fill="#f0e8d0" stroke="#5a3818" strokeWidth="0.3" transform="rotate(10 5 -28)" />
            <rect x="-2" y="-30" width="8" height="14" fill="#e8d8b8" stroke="#5a3818" strokeWidth="0.3" />
          </g>
          {/* bras qui tient une feuille au bout des doigts */}
          <path d="M-14 -6 L-32 -12" stroke="#c8946a" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="-38" y="-16" width="12" height="14" fill="#f0e8d0" stroke="#5a3818" strokeWidth="0.4" />
          <path d="M-36 -12 h8 M-36 -8 h8 M-36 -4 h8" stroke="#5a3818" strokeWidth="0.3" />
          {/* tête */}
          <ellipse cx="0" cy="-30" rx="10" ry="12" fill="#c8946a" stroke="#5a3818" strokeWidth="0.5" />
          <path d="M-9 -34 q-2 -8 4 -10 q6 4 8 -2 q4 4 6 -2 q4 6 3 12" stroke="#3a2418" strokeWidth="1.4" fill="none" />
          <circle cx="-3" cy="-30" r="1.2" fill="#0a0806" />
          <circle cx="3" cy="-30" r="1.2" fill="#0a0806" />
          <path d="M-3 -22 q3 3 6 0" stroke="#3a2418" strokeWidth="1.2" fill="none" />
        </g>

        {/* ═══ AJOUTS DE DECOR : rendre la foire vraiment vivante ═══ */}

        {/* SECOND ETAL a droite : un vendeur de rouleaux/parchemins avec
            son etagere plus modeste. */}
        <g transform="translate(830,440)">
          {/* toile tendue simple, plus petite */}
          <rect x="-56" y="-30" width="4" height="70" fill="#5a3818" />
          <rect x="52" y="-30" width="4" height="70" fill="#5a3818" />
          <path d="M-66 -30 L66 -30 L56 -56 L-56 -56 Z" fill="#8a6a3a" stroke="#3a1810" strokeWidth="0.6" />
          {/* plateau avec pile de rouleaux et un ou deux livres */}
          <rect x="-58" y="0" width="116" height="12" fill="#7a4a24" stroke="#2a1408" strokeWidth="0.6" />
          {/* rouleaux de parchemin */}
          {[[-40, -8], [-24, -8], [-8, -8], [8, -8], [26, -8], [42, -8]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x},${y})`}>
              <ellipse cx="0" cy="0" rx="6" ry="2" fill="#f0e4c8" stroke="#5a3818" strokeWidth="0.4" />
              <circle cx="-4" cy="0" r="1.2" fill="#5a3818" />
              <circle cx="4" cy="0" r="1.2" fill="#5a3818" />
            </g>
          ))}
          {/* petit vendeur derriere son etal */}
          <g transform="translate(0,-16)">
            <ellipse cx="0" cy="-24" rx="7" ry="8" fill="#c8946a" />
            <path d="M-10 -12 Q-12 6 0 12 Q12 6 10 -12 Z" fill="#3a5878" stroke="#1a2848" strokeWidth="0.4" />
            <circle cx="-2" cy="-24" r="0.8" fill="#0a0604" />
            <circle cx="2" cy="-24" r="0.8" fill="#0a0604" />
          </g>
        </g>

        {/* GROS TONNEAU DE VIN AU MILIEU avec deux gobelets renverses,
            un pichet — ambiance festive. */}
        <g transform="translate(510,510)">
          <ellipse cx="0" cy="26" rx="30" ry="5" fill="#0a0604" opacity="0.5" />
          <path d="M-24 22 Q-30 -18 0 -22 Q30 -18 24 22 Z" fill="#8a5a2e" stroke="#3a1810" strokeWidth="0.8" />
          <path d="M-27 -6 h54 M-27 8 h54" stroke="#3a1810" strokeWidth="1.6" opacity="0.7" />
          <path d="M-24 22 L-30 26 M24 22 L30 26" stroke="#3a1810" strokeWidth="1.2" />
          {/* robinet */}
          <rect x="-2" y="6" width="4" height="4" fill="#7a5a30" />
          <path d="M0 10 v3" stroke="#5a3818" strokeWidth="1" />
          {/* gobelet renverse a cote */}
          <g transform="translate(24,22)">
            <path d="M-3 0 l6 0 l-1 -6 l-4 0 Z" fill="#8a7038" stroke="#3a2010" strokeWidth="0.3" />
          </g>
        </g>

        {/* CHIEN qui erre au sol devant l'etal — silhouette qui bouge
            legerement. */}
        <g>
          <animateTransform attributeName="transform" type="translate"
            values="380,530; 500,532; 380,530" dur="24s" repeatCount="indefinite" />
          {/* corps */}
          <ellipse cx="0" cy="0" rx="14" ry="6" fill="#8a5a2e" stroke="#3a1810" strokeWidth="0.5" />
          {/* tete */}
          <circle cx="-13" cy="-2" r="5" fill="#8a5a2e" stroke="#3a1810" strokeWidth="0.4" />
          {/* oreilles pendantes */}
          <path d="M-16 -4 q-3 -1 -3 4 q3 1 3 -2 Z" fill="#5a3a1e" />
          <path d="M-10 -4 q3 -1 3 4 q-3 1 -3 -2 Z" fill="#5a3a1e" />
          {/* pattes */}
          <path d="M-8 5 v6 M-2 6 v6 M6 5 v6 M12 4 v6" stroke="#3a1810" strokeWidth="2" strokeLinecap="round" />
          {/* queue qui frétille */}
          <g style={{ transformOrigin: "14px 0px" }}>
            <animateTransform attributeName="transform" type="rotate"
              values="-15; 20; -15" dur="1.2s" repeatCount="indefinite" />
            <path d="M14 -2 q6 -4 8 -8" stroke="#5a3a1e" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          </g>
          {/* oeil */}
          <circle cx="-14" cy="-3" r="0.5" fill="#0a0604" />
        </g>

        {/* COUPLE de badauds au fond, silhouettes discretes qui parlent */}
        <g transform="translate(760,470)" opacity="0.9">
          <g transform="translate(-10,0)">
            <ellipse cx="0" cy="-24" rx="6" ry="7" fill="#c8946a" />
            <path d="M-9 -14 Q-11 8 0 12 Q11 8 9 -14 Z" fill="#5a3818" stroke="#1a0e04" strokeWidth="0.4" />
          </g>
          <g transform="translate(10,-2)">
            <ellipse cx="0" cy="-24" rx="6" ry="7" fill="#c8946a" />
            <path d="M-9 -14 Q-11 8 0 12 Q11 8 9 -14 Z" fill="#8a2828" stroke="#3a0a0a" strokeWidth="0.4" />
            {/* coiffe blanche */}
            <path d="M-6 -30 q0 -4 6 -5 q6 1 6 5" fill="#f0e8d0" stroke="#7a5a34" strokeWidth="0.4" />
          </g>
        </g>

        {/* CAISSES EMPILEES au premier plan gauche */}
        <g transform="translate(60,520)">
          <rect x="-24" y="-20" width="48" height="20" fill="#7a4a24" stroke="#2a1408" strokeWidth="0.6" />
          <rect x="-24" y="-40" width="48" height="20" fill="#8a5a2e" stroke="#2a1408" strokeWidth="0.6" />
          <path d="M-24 -30 h48 M-20 -20 v20 M0 -40 v40 M20 -40 v40" stroke="#3a1810" strokeWidth="0.5" opacity="0.6" />
        </g>

        {/* FEUILLE DE PAPIER qui vole dans le vent (a la place des oiseaux) —
            trajectoire en zigzag descendant. Rotation continue. */}
        <g opacity="0.9">
          <animateTransform attributeName="transform" type="translate"
            values="-30,180; 220,140; 460,220; 700,150; 940,230; 1060,180"
            dur="18s" repeatCount="indefinite" />
          <g>
            <animateTransform attributeName="transform" type="rotate"
              values="0; 360; 720" dur="6s" repeatCount="indefinite" />
            <rect x="-8" y="-10" width="16" height="20" fill="#f0e8d0" stroke="#5a3818" strokeWidth="0.4" />
            <path d="M-6 -6 h12 M-6 -2 h12 M-6 2 h10 M-6 6 h8" stroke="#5a3818" strokeWidth="0.3" />
          </g>
        </g>

        {/* Ephemere : plume taillée + libelle jeté (disparaissent au ramassage) */}
        {!inv.includes("plume_taillee") && (
        <g transform="translate(160,542) rotate(-15)">
          <path d="M0 -14 Q4 -10 4 0 Q4 8 -2 12 Q-4 8 -4 0 Q-4 -10 0 -14 Z" fill="#f0e8d0" stroke="#5a3818" strokeWidth="0.4" />
          <path d="M0 -12 L0 10 M-2 14 L2 14" stroke="#5a3818" strokeWidth="0.5" />
        </g>
        )}
        {!inv.includes("libelle") && (
        <g transform="translate(920,544) rotate(30)">
          <rect x="-10" y="-6" width="20" height="14" fill="#f0e8d0" stroke="#5a3818" strokeWidth="0.4" />
          <path d="M-8 -3 h16 M-8 0 h16 M-8 3 h14 M-8 6 h12" stroke="#5a3818" strokeWidth="0.3" />
        </g>
        )}
      </PLayer>

      <Hotspot cx={240} cy={370} r={40} label="le libraire de la foire" reveal={reveal} onClick={() => action("libraire")} />
      <Hotspot cx={400} cy={460} r={30} label="un client curieux" reveal={reveal} onClick={() => action("client_livre")} />
      <Hotspot cx={680} cy={460} r={40} label="le colporteur avec sa hotte" reveal={reveal} onClick={() => action("colporteur")} />
      <Hotspot cx={240} cy={410} r={60} label="livres imprimés reliés" reveal={reveal} onClick={() => action("livres_etal")} />
      <Hotspot cx={500} cy={160} r={80} label="banderole « Buchmesse »" reveal={reveal} onClick={() => action("banderole")} />
      <Hotspot cx={820} cy={280} r={60} label="moulin à vent au loin" reveal={reveal} onClick={() => action("moulin_vent")} />
      <Hotspot cx={160} cy={542} r={14} label="plume d'oie taillée" item="plume_taillee" reveal={reveal} onClick={() => collect("plume_taillee")} />
      <Hotspot cx={920} cy={544} r={16} label="libelle abandonné" item="libelle" reveal={reveal} onClick={() => collect("libelle")} />
      {/* (oiseaux retires : c'est la feuille de papier qui vole ajoutee
          plus haut qui porte l'ambiance de vent maintenant) */}
</svg>
  );
}
