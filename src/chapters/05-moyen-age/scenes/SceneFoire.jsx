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

export default function SceneFoire({ collect, action, reveal }) {
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
        {/* collines lointaines vertes */}
        <path d="M0 360 L0 260 Q200 240 400 250 Q600 260 800 245 L1000 250 L1000 360 Z" fill="#5a6a48" opacity="0.6" />
        {/* MOULIN à vent silhouette */}
        <g transform="translate(820,320)">
          <rect x="-14" y="0" width="28" height="60" fill="#8a6a48" stroke="#3a2818" strokeWidth="0.6" />
          <path d="M-16 0 L16 0 L14 -14 L-14 -14 Z" fill="#3a2818" />
          <circle cx="0" cy="-14" r="5" fill="#5a3818" stroke="#2a1408" strokeWidth="0.6" />
          {/* ailes */}
          <g style={{ animation: "float 4s ease-in-out infinite" }}>
            <path d="M0 -14 L-40 -50 L-46 -44 L-6 -8 Z" fill="#e0c088" stroke="#5a3818" strokeWidth="0.6" />
            <path d="M0 -14 L40 -50 L46 -44 L6 -8 Z" fill="#e0c088" stroke="#5a3818" strokeWidth="0.6" />
            <path d="M0 -14 L-40 22 L-34 26 L4 -10 Z" fill="#e0c088" stroke="#5a3818" strokeWidth="0.6" />
            <path d="M0 -14 L40 22 L34 26 L-4 -10 Z" fill="#e0c088" stroke="#5a3818" strokeWidth="0.6" />
          </g>
        </g>
      </PLayer>

      <PLayer depth={4}>
        {/* BANDEROLE au-dessus de la scène */}
        <g transform="translate(500,150)">
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

        {/* Ephemere : plume d'oie taillée + libelle jeté */}
        <g transform="translate(160,542) rotate(-15)">
          <path d="M0 -14 Q4 -10 4 0 Q4 8 -2 12 Q-4 8 -4 0 Q-4 -10 0 -14 Z" fill="#f0e8d0" stroke="#5a3818" strokeWidth="0.4" />
          <path d="M0 -12 L0 10 M-2 14 L2 14" stroke="#5a3818" strokeWidth="0.5" />
        </g>
        <g transform="translate(920,544) rotate(30)">
          <rect x="-10" y="-6" width="20" height="14" fill="#f0e8d0" stroke="#5a3818" strokeWidth="0.4" />
          <path d="M-8 -3 h16 M-8 0 h16 M-8 3 h14 M-8 6 h12" stroke="#5a3818" strokeWidth="0.3" />
        </g>
      </PLayer>

      <Hotspot cx={240} cy={370} r={40} label="le libraire de la foire" reveal={reveal} onClick={() => action("libraire")} />
      <Hotspot cx={400} cy={460} r={30} label="un client curieux" reveal={reveal} onClick={() => action("client_livre")} />
      <Hotspot cx={680} cy={460} r={40} label="le colporteur avec sa hotte" reveal={reveal} onClick={() => action("colporteur")} />
      <Hotspot cx={240} cy={410} r={60} label="livres imprimés reliés" reveal={reveal} onClick={() => action("livres_etal")} />
      <Hotspot cx={500} cy={160} r={80} label="banderole « Buchmesse »" reveal={reveal} onClick={() => action("banderole")} />
      <Hotspot cx={820} cy={280} r={60} label="moulin à vent au loin" reveal={reveal} onClick={() => action("moulin_vent")} />
      <Hotspot cx={160} cy={542} r={14} label="plume d'oie taillée" item="plume_taillee" reveal={reveal} onClick={() => collect("plume_taillee")} />
      <Hotspot cx={920} cy={544} r={16} label="libelle abandonné" item="libelle" reveal={reveal} onClick={() => collect("libelle")} />
    </svg>
  );
}
