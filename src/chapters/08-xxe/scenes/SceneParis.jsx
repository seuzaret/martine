import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 8 — Tableau : Paris occupé, 5 juin 1944, après-midi.
   Une rue parisienne haussmannienne. Au fond, la Tour Eiffel
   avec un immense drapeau à croix gammée. Sur le trottoir, une
   patrouille allemande, des affiches VERBOTEN, un marchand
   clandestin sous une arcade. Marthe arrive, panier au bras :
   il faut lui trouver une grosse couverture pour cette nuit.
   ============================================================ */

export default function SceneParis({ collect, action, reveal, made = [], mode }) {
  const acheteFait = made.includes("couverture");

  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="pa-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a89880" /><stop offset="100%" stopColor="#7a6a5a" /></linearGradient>
        <linearGradient id="pa-street" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5a5048" /><stop offset="100%" stopColor="#2a2420" /></linearGradient>
        <linearGradient id="pa-facade" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c8b090" /><stop offset="100%" stopColor="#8a7860" /></linearGradient>
      </defs>

      {/* ═══ CIEL brumeux (Paris en guerre : lumière triste) ═══ */}
      <PLayer depth={5}>
        <rect width="1000" height="360" fill="url(#pa-sky)" />
        {/* nuages gris */}
        {[[120, 60], [420, 40], [780, 80]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="80" ry="14" fill="#e8dfc8" opacity="0.5" />
        ))}
      </PLayer>

      {/* ═══ TOUR EIFFEL en fond + drapeau à croix gammée (silhouette grise) ═══ */}
      <PLayer depth={4}>
        <g transform="translate(500,290)">
          {/* silhouette de la Tour Eiffel */}
          <path d="M-64 0 L-16 -220 L16 -220 L64 0 L38 0 L20 -80 L-20 -80 L-38 0 Z" fill="#4a4038" opacity="0.85" />
          {/* premier étage */}
          <path d="M-38 -60 L38 -60 L34 -80 L-34 -80 Z" fill="#4a4038" opacity="0.85" />
          {/* deuxième étage */}
          <path d="M-24 -140 L24 -140 L20 -160 L-20 -160 Z" fill="#4a4038" opacity="0.85" />
          {/* treillis (croix stylisées) */}
          {[-56, -40, -24, 0, 24, 40, 56].map((x, i) => (
            <path key={i} d={`M${x} 0 L${x * 0.3} -220`} stroke="#3a3028" strokeWidth="0.6" opacity="0.5" />
          ))}
          {/* drapeau nazi au sommet — rouge avec disque blanc, croix gammée noire stylisée */}
          <g transform="translate(0,-238)">
            <path d="M0 0 L44 0 L44 30 L0 34 Z" fill="#8a1a1a" stroke="#3a0a0a" strokeWidth="1" />
            <circle cx="22" cy="16" r="8" fill="#e8dfc8" />
            {/* croix gammée simplifiée */}
            <path d="M18 12 L22 16 L18 20 M22 12 L26 16 L22 20 M18 16 L26 16 M22 12 L22 20" stroke="#1a1a1a" strokeWidth="1.4" fill="none" />
          </g>
        </g>
      </PLayer>

      {/* ═══ FAÇADES haussmanniennes ═══ */}
      <PLayer depth={3}>
        {/* immeuble gauche */}
        <g>
          <rect x="0" y="80" width="360" height="380" fill="url(#pa-facade)" stroke="#5a4838" strokeWidth="2" />
          {/* corniches horizontales */}
          <path d="M0 200 h360 M0 300 h360 M0 400 h360" stroke="#5a4838" strokeWidth="2" />
          {/* fenêtres avec balconnets */}
          {[100, 200, 300].map((y, r) => [40, 130, 220, 310].map((x, c) => (
            <g key={`${r}-${c}`}>
              <rect x={x} y={y + 18} width="46" height="60" fill="#3a3830" stroke="#2a2418" strokeWidth="1.5" />
              <path d={`M${x - 4} ${y + 78} L${x + 50} ${y + 78} L${x + 46} ${y + 84} L${x} ${y + 84} Z`} fill="#5a4838" />
              {/* volets ouverts */}
              <rect x={x - 8} y={y + 18} width="8" height="60" fill="#4a3020" opacity="0.8" />
              <rect x={x + 46} y={y + 18} width="8" height="60" fill="#4a3020" opacity="0.8" />
            </g>
          )))}
          {/* toit mansardé */}
          <path d="M0 80 L360 80 L340 40 L20 40 Z" fill="#3a3028" />
        </g>

        {/* immeuble droit */}
        <g>
          <rect x="700" y="80" width="300" height="380" fill="url(#pa-facade)" stroke="#5a4838" strokeWidth="2" />
          <path d="M700 200 h300 M700 300 h300 M700 400 h300" stroke="#5a4838" strokeWidth="2" />
          {[100, 200, 300].map((y, r) => [720, 810, 900].map((x, c) => (
            <g key={`${r}-${c}`}>
              <rect x={x} y={y + 18} width="46" height="60" fill="#3a3830" stroke="#2a2418" strokeWidth="1.5" />
              <rect x={x - 8} y={y + 18} width="8" height="60" fill="#4a3020" opacity="0.8" />
              <rect x={x + 46} y={y + 18} width="8" height="60" fill="#4a3020" opacity="0.8" />
            </g>
          )))}
          <path d="M700 80 L1000 80 L980 40 L720 40 Z" fill="#3a3028" />
        </g>
      </PLayer>

      {/* ═══ AFFICHES / propagande sur les murs ═══ */}
      <PLayer depth={2.5}>
        {/* Affiche VERBOTEN sur le mur gauche */}
        <g transform="translate(20,300)">
          <rect x="0" y="0" width="70" height="90" fill="#e8dfc8" stroke="#3a0a0a" strokeWidth="1.5" />
          <text x="35" y="18" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fontWeight="800" fill="#8a1a1a">VERBOTEN</text>
          <path d="M6 26 h58 M6 34 h58" stroke="#3a0a0a" strokeWidth="0.4" />
          <text x="35" y="48" textAnchor="middle" fontFamily="Georgia,serif" fontSize="6.5" fill="#3a0a0a">Écoute des</text>
          <text x="35" y="56" textAnchor="middle" fontFamily="Georgia,serif" fontSize="6.5" fill="#3a0a0a">radios ennemies</text>
          <text x="35" y="66" textAnchor="middle" fontFamily="Georgia,serif" fontSize="6.5" fill="#3a0a0a">= PRISON</text>
          <text x="35" y="82" textAnchor="middle" fontFamily="Georgia,serif" fontSize="5.5" fontStyle="italic" fill="#5a1a1a">Der Militärbefehlshaber</text>
        </g>

        {/* Affiche « Vive Pétain » ou similaire (Vichy) */}
        <g transform="translate(920,320)">
          <rect x="0" y="0" width="60" height="76" fill="#e8dfc8" stroke="#5a4028" strokeWidth="1.5" />
          <text x="30" y="16" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9" fontWeight="800" fill="#5a1a10">TRAVAIL</text>
          <text x="30" y="30" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9" fontWeight="800" fill="#5a1a10">FAMILLE</text>
          <text x="30" y="44" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9" fontWeight="800" fill="#5a1a10">PATRIE</text>
          <path d="M12 52 h36" stroke="#5a1a10" strokeWidth="0.6" />
          <path d="M18 66 h24 v4 h-24 z" fill="#5a1a10" />
        </g>
      </PLayer>

      {/* ═══ SOL (rue pavée) ═══ */}
      <PLayer depth={2}>
        <rect y="440" width="1000" height="120" fill="url(#pa-street)" />
        {/* trottoir */}
        <rect y="440" width="1000" height="20" fill="#7a6a5c" />
        <path d="M0 460 h1000" stroke="#3a3028" strokeWidth="1.5" />
        {/* pavés */}
        {[...Array(6)].map((_, r) => [...Array(20)].map((_, c) => (
          <rect key={`p-${r}-${c}`} x={c * 50 + (r % 2 ? 25 : 0)} y={470 + r * 16} width="46" height="12" rx="1"
            fill="#4a4238" opacity="0.5" />
        )))}
      </PLayer>

      {/* ═══ ARCADE avec le marchand clandestin ═══ */}
      <PLayer depth={1.5}>
        <g transform="translate(120,320)">
          {/* arche de pierre */}
          <path d="M-70 130 L-70 30 Q0 -30 70 30 L70 130 Z" fill="#4a4038" stroke="#2a2418" strokeWidth="2" />
          <path d="M-60 130 L-60 40 Q0 -18 60 40 L60 130 Z" fill="#2a2418" />
          {/* étal à l'intérieur : couverture + objets divers */}
          {!acheteFait && (
            <g>
              {/* couverture pliée sur l'étal */}
              <path d="M-30 88 L30 88 L34 108 Q0 116 -34 108 Z" fill="#5a2a1a" stroke="#2a1008" strokeWidth="1.5" />
              <path d="M-24 96 h48 M-24 104 h48" stroke="#3a1408" strokeWidth="0.6" opacity="0.7" />
              {/* motifs à carreaux */}
              <path d="M-16 88 v22 M0 88 v24 M16 88 v22" stroke="#3a1408" strokeWidth="0.6" opacity="0.6" />
            </g>
          )}
          {/* boîte de savons rares */}
          <rect x="-52" y="98" width="18" height="10" fill="#8a6540" stroke="#3a2418" strokeWidth="0.8" />
          <rect x="36" y="98" width="16" height="10" fill="#6a5040" stroke="#3a2418" strokeWidth="0.8" />

          {/* le MARCHAND clandestin, silhouette debout à côté de l'étal */}
          <g transform="translate(-18,60)">
            {/* casquette */}
            <path d="M-14 -6 Q0 -12 14 -6 L12 -2 L-12 -2 Z" fill="#3a2818" />
            <rect x="-14" y="-2" width="28" height="2" fill="#3a2818" />
            {/* tête */}
            <ellipse cx="0" cy="6" rx="8" ry="10" fill="#dfa888" />
            {/* moustache */}
            <path d="M-4 10 q4 -2 8 0" stroke="#3a2818" strokeWidth="1.5" fill="none" />
            {/* buste + manteau brun */}
            <path d="M-14 22 Q-12 16 0 14 Q12 16 14 22 L14 60 L-14 60 Z" fill="#5a3820" stroke="#2a1608" strokeWidth="1" />
            <path d="M-4 18 v40" stroke="#3a2410" strokeWidth="1" />
          </g>

          {/* « ? » d'accueil au-dessus du marchand */}
          {!acheteFait && (
            <g transform="translate(-18,32)" style={{ animation: "float 2s ease-in-out infinite" }}>
              <circle r="12" fill="#ffd166" stroke="#8a5a20" strokeWidth="1.8" />
              <text y="4" textAnchor="middle" fontSize="16" fontWeight="800" fill="#3a2410">?</text>
            </g>
          )}
        </g>
      </PLayer>

      {/* ═══ PATROUILLE allemande — 2 silhouettes ═══ */}
      <PLayer depth={1}>
        <g transform="translate(560,410)">
          {/* soldat 1 (casque, uniforme feldgrau) */}
          <g transform="translate(0,0)">
            {/* casque stahlhelm */}
            <path d="M-9 -4 Q0 -14 9 -4 L11 2 L-11 2 Z" fill="#4a5040" stroke="#2a3020" strokeWidth="1" />
            <path d="M-11 2 h22 v3 h-22 z" fill="#3a4030" />
            {/* visage */}
            <ellipse cx="0" cy="10" rx="6" ry="7" fill="#dfa888" />
            {/* buste uniforme */}
            <path d="M-14 20 Q-12 16 0 14 Q12 16 14 20 L14 60 L-14 60 Z" fill="#5a6050" stroke="#2a3020" strokeWidth="1" />
            {/* ceinturon */}
            <rect x="-14" y="40" width="28" height="4" fill="#2a2018" />
            {/* fusil sur épaule (trait diagonal) */}
            <path d="M8 8 L20 40" stroke="#3a2818" strokeWidth="2" />
            {/* jambes */}
            <rect x="-10" y="60" width="8" height="30" fill="#4a5040" />
            <rect x="2" y="60" width="8" height="30" fill="#4a5040" />
            <rect x="-11" y="88" width="10" height="4" fill="#1a1a1a" />
            <rect x="1" y="88" width="10" height="4" fill="#1a1a1a" />
          </g>
          {/* soldat 2 (un peu en arrière) */}
          <g transform="translate(40,4)">
            <path d="M-9 -4 Q0 -14 9 -4 L11 2 L-11 2 Z" fill="#4a5040" stroke="#2a3020" strokeWidth="1" />
            <path d="M-11 2 h22 v3 h-22 z" fill="#3a4030" />
            <ellipse cx="0" cy="10" rx="6" ry="7" fill="#dfa888" />
            <path d="M-14 20 Q-12 16 0 14 Q12 16 14 20 L14 60 L-14 60 Z" fill="#5a6050" stroke="#2a3020" strokeWidth="1" />
            <rect x="-14" y="40" width="28" height="4" fill="#2a2018" />
            <path d="M8 8 L20 40" stroke="#3a2818" strokeWidth="2" />
            <rect x="-10" y="60" width="8" height="30" fill="#4a5040" />
            <rect x="2" y="60" width="8" height="30" fill="#4a5040" />
            <rect x="-11" y="88" width="10" height="4" fill="#1a1a1a" />
            <rect x="1" y="88" width="10" height="4" fill="#1a1a1a" />
          </g>
        </g>

        {/* MARTHE, silhouette qui passe sur le trottoir, panier au bras */}
        <g transform="translate(400,430)">
          <ellipse cx="0" cy="0" rx="10" ry="12" fill="#dfa888" />
          {/* chignon gris */}
          <path d="M-8 -6 Q-6 -14 0 -14 Q6 -14 8 -6 Z" fill="#8a8a8a" />
          <ellipse cx="8" cy="0" rx="4" ry="5" fill="#7a7a7a" />
          {/* robe noire + châle */}
          <path d="M-18 20 Q-14 12 0 10 Q14 12 18 20 L20 80 L-20 80 Z" fill="#1a1a1a" />
          <path d="M-22 22 Q0 12 22 22 L20 40 Q0 32 -20 40 Z" fill="#0a0a0a" />
          {/* panier au bras */}
          <ellipse cx="18" cy="46" rx="8" ry="6" fill="#8a6540" stroke="#3a2418" strokeWidth="1" />
          <path d="M12 44 q6 -6 12 0" stroke="#3a2418" strokeWidth="1.4" fill="none" />
          {/* jambes bas noirs */}
          <rect x="-8" y="80" width="6" height="20" fill="#4a4038" />
          <rect x="2" y="80" width="6" height="20" fill="#4a4038" />
        </g>

        {/* ANACHRONISME : télécommande TV moderne dans le caniveau, entre les pavés */}
        {!made.includes("telecommande") && mode !== "jeu2" && (
          <g transform="translate(750,520) rotate(20)">
            <rect x={-9} y={-24} width={18} height={48} rx={3} fill="#1a1a1a" stroke="#3a3a3a" strokeWidth="1" />
            {/* écran LCD en haut */}
            <rect x={-6} y={-20} width={12} height={5} rx={0.6} fill="#2a3050" />
            {/* boutons */}
            <circle cx={-4} cy={-10} r={2} fill="#c8382e" />
            <circle cx={4} cy={-10} r={2} fill="#5a5a5a" />
            <circle cx={0} cy={-4} r={2.5} fill="#5eff9e" />
            {[[-4, 2], [4, 2], [-4, 8], [4, 8], [-4, 14], [4, 14], [0, 20]].map(([bx, by], i) => (
              <rect key={i} x={bx - 2} y={by - 1.4} width={4} height={2.8} rx={0.6} fill="#5a5a5a" />
            ))}
            {/* petit sigle marque */}
            <text x={0} y={-15.5} textAnchor="middle" fontSize="2.4" fontFamily="ui-monospace,monospace" fill="#c8d4e2">TV42</text>
          </g>
        )}
      </PLayer>

      {/* ═══ zones cliquables ═══ */}
      <Hotspot cx={102} cy={380} r={54} label="marchand clandestin (sous l'arcade)" reveal={reveal} onClick={() => action("marchand")} />
      {!acheteFait && (
        <Hotspot cx={110} cy={418} r={26} label="grosse couverture" item="couverture" reveal={reveal} onClick={() => collect("couverture")} />
      )}
      <Hotspot cx={600} cy={438} r={44} label="patrouille allemande" reveal={reveal} onClick={() => action("patrouille")} />
      <Hotspot cx={55} cy={345} r={30} label="affiche VERBOTEN" reveal={reveal} onClick={() => action("affiche")} />
      <Hotspot cx={950} cy={358} r={26} label="affiche de Vichy" reveal={reveal} onClick={() => action("affiche")} />
      {mode !== "jeu2" && (
        <Hotspot cx={750} cy={520} r={24} label="… quelque chose ne va pas ici" item="telecommande" reveal={reveal} onClick={() => collect("telecommande")} />
      )}
    </svg>
  );
}
