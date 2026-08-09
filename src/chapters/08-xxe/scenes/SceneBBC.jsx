import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 8 — Tableau : Studio BBC, Bush House, Londres,
   5 juin 1944, 21h00. Petit studio insonorisé, lumière tamisée,
   panneau ON AIR à droite. Arthur Smith au pupitre ; il faut
   lui apporter le MICRO (sur la table à gauche), puis lui glisser
   le FEUILLET de Verlaine (posé près du micro).
   Quand msg_radio_londres est transmis : la lampe ON AIR passe
   au rouge, les ondes jaillissent par la fenêtre vers l'Europe.
   ============================================================ */

export default function SceneBBC({ collect, action, reveal, made = [], flags = [] }) {
  const microBranche = !!flags.micro_branche;
  const enOnde = made.includes("msg_radio_londres");

  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="bbc-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4a4238" /><stop offset="100%" stopColor="#2a221a" /></linearGradient>
        <linearGradient id="bbc-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6a5238" /><stop offset="100%" stopColor="#2c1e12" /></linearGradient>
        <linearGradient id="bbc-desk" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7a5636" /><stop offset="100%" stopColor="#432c18" /></linearGradient>
        <radialGradient id="bbc-lamp" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffcf78" stopOpacity="0.5" /><stop offset="100%" stopColor="#ff9540" stopOpacity="0" /></radialGradient>
        <radialGradient id="bbc-red" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ff3820" stopOpacity="0.75" /><stop offset="100%" stopColor="#ff3820" stopOpacity="0" /></radialGradient>
      </defs>

      {/* ═══ FOND — mur du studio, panneaux acoustiques ═══ */}
      <PLayer depth={4}>
        <rect width="1000" height="560" fill="url(#bbc-wall)" />
        {[...Array(4)].map((_, r) => [...Array(10)].map((_, c) => (
          <rect key={`p-${r}-${c}`} x={40 + c * 96} y={40 + r * 72} width="76" height="52" rx="4"
            fill="#3a3228" opacity="0.55" />
        )))}
        {/* halo de la lampe ON AIR quand active */}
        {enOnde && <circle cx="830" cy="150" r="120" fill="url(#bbc-red)" />}
      </PLayer>

      {/* ═══ ondes qui partent par la fenêtre — visible seulement quand émission ═══ */}
      {enOnde && (
        <PLayer depth={3}>
          {[30, 60, 90, 120].map((r, i) => (
            <path key={i} d={`M870 150 a${r} ${r * 0.7} 0 0 1 ${r * 1.5} 0`} fill="none"
              stroke="#ffd166" strokeWidth="2" opacity={0.85 - i * 0.18}
              style={{ animation: "pulse 1.6s ease-in-out infinite" }} />
          ))}
        </PLayer>
      )}

      {/* ═══ PLAN DU MILIEU : la table technique, le pupitre, le pied du micro ═══ */}
      <PLayer depth={2}>
        {/* sol */}
        <rect y="420" width="1000" height="140" fill="url(#bbc-floor)" />
        {/* pendule murale — 21h00 le 5 juin 1944 */}
        <circle cx="490" cy="90" r="34" fill="#f0e8d0" stroke="#3a2c18" strokeWidth="3" />
        <circle cx="490" cy="90" r="2" fill="#1a1006" />
        <path d="M490 90 L490 68 M490 90 L508 88" stroke="#1a1006" strokeWidth="2" strokeLinecap="round" />
        {[0, 90, 180, 270].map((a, i) => {
          const rad = (a * Math.PI) / 180;
          const x1 = 490 + Math.cos(rad) * 26, y1 = 90 + Math.sin(rad) * 26;
          const x2 = 490 + Math.cos(rad) * 30, y2 = 90 + Math.sin(rad) * 30;
          return <path key={i} d={`M${x1} ${y1} L${x2} ${y2}`} stroke="#1a1006" strokeWidth="1.5" />;
        })}

        {/* panneau ON AIR (haut droite) */}
        <rect x="770" y="120" width="120" height="60" rx="8" fill="#2a1608" stroke="#8a5a20" strokeWidth="3" />
        <text x="830" y="158" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="22"
          fontWeight="800" fill={enOnde ? "#ff5030" : "#4a3a2a"}
          style={enOnde ? { filter: "drop-shadow(0 0 6px #ff5030)" } : {}}>
          ON AIR
        </text>

        {/* TABLE de gauche (avec le micro à ramasser + feuillet) */}
        <rect x="60" y="320" width="240" height="18" fill="url(#bbc-desk)" stroke="#2a1608" strokeWidth="2" />
        <rect x="70" y="338" width="14" height="90" fill="#3a2410" />
        <rect x="276" y="338" width="14" height="90" fill="#3a2410" />
        {/* lampe de bureau col-de-cygne (allumée douce) */}
        <path d="M100 320 L100 260 Q100 240 140 240" fill="none" stroke="#4a4038" strokeWidth="4" />
        <path d="M140 232 L152 258 L128 258 Z" fill="#c8963e" />
        <circle cx="140" cy="270" r="18" fill="url(#bbc-lamp)" />

        {/* le MICRO (posé sur la table, cible d'un hotspot) — style micro carbone années 40, gros et rond */}
        {!microBranche && (
          <g transform="translate(200,300)">
            <rect x="-4" y="0" width="8" height="20" fill="#2a2a2a" />
            <ellipse cx="0" cy="-8" rx="18" ry="24" fill="#3a3a3a" stroke="#6a6a6a" strokeWidth="2" />
            <ellipse cx="0" cy="-8" rx="12" ry="18" fill="#1a1a1a" />
            {/* petits trous de la grille */}
            {[[-6, -14], [0, -14], [6, -14], [-6, -6], [0, -6], [6, -6], [-6, 2], [0, 2], [6, 2]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="0.9" fill="#5a5a5a" />
            ))}
          </g>
        )}

        {/* le FEUILLET (Verlaine) — posé sur la table à côté du micro */}
        <g transform="translate(120,306)">
          <rect x="0" y="0" width="46" height="30" fill="#f0e8d0" stroke="#8a5a20" strokeWidth="1"
            transform="rotate(-8)" />
          <path d="M4 6 h32 M4 12 h30 M4 18 h34 M4 24 h28" stroke="#5a4028" strokeWidth="0.7"
            transform="rotate(-8)" />
        </g>
      </PLayer>

      {/* ═══ AVANT-PLAN : ARTHUR au PUPITRE + micro branché (quand posé) ═══ */}
      <PLayer depth={1}>
        {/* PUPITRE du speaker (support de dépôt) */}
        <g>
          <rect x="580" y="360" width="220" height="80" fill="url(#bbc-desk)" stroke="#2a1608" strokeWidth="3" />
          <rect x="580" y="360" width="220" height="14" fill="#5a3818" />
          {/* pied et fils */}
          <rect x="590" y="440" width="14" height="60" fill="#3a2410" />
          <rect x="776" y="440" width="14" height="60" fill="#3a2410" />
          {/* boutons/potards */}
          {[620, 660, 700, 740, 780].map((x, i) => (
            <g key={i}><circle cx={x} cy="392" r="7" fill="#c8963e" stroke="#5a3818" strokeWidth="1.5" /><path d={`M${x} 388 L${x} 396`} stroke="#5a3818" strokeWidth="1.5" /></g>
          ))}
          {/* jack ouvert (à brancher) */}
          <circle cx="820" cy="392" r="9" fill="#0a0604" stroke={microBranche ? "#5eff9e" : "#c8963e"} strokeWidth="2"
            style={microBranche ? {} : { animation: "pulse 1.6s ease-in-out infinite" }} />
        </g>

        {/* silhouette d'ARTHUR derrière le pupitre (dessiné AVANT le micro pour que le
            micro passe devant lui — sinon on ne voit pas la radio) */}
        <g transform="translate(720,300)">
          {/* torse */}
          <path d="M-46 60 Q-40 20 0 14 Q40 20 46 60 L46 100 L-46 100 Z" fill="#1a2438" />
          {/* chemise blanche + cravate */}
          <path d="M-16 22 L0 50 L16 22 L22 60 L-22 60 Z" fill="#efe6d2" />
          <path d="M-4 30 L4 30 L2 60 L0 80 L-2 60 Z" fill="#8a1a1a" />
          {/* col */}
          <path d="M-6 22 L0 32 L6 22 Z" fill="#fff" />
          {/* tête */}
          <ellipse cx="0" cy="0" rx="18" ry="20" fill="#eec8a0" />
          {/* cheveux */}
          <path d="M-16 -8 Q-14 -22 0 -22 Q16 -22 18 -8 Q14 -20 0 -20 Q-14 -20 -16 -8 Z" fill="#3a2418" />
          <path d="M-16 -8 Q-18 -4 -16 0" stroke="#3a2418" strokeWidth="4" fill="none" />
          <path d="M16 -8 Q18 -4 16 0" stroke="#3a2418" strokeWidth="4" fill="none" />
          {/* yeux + moustache */}
          <circle cx="-6" cy="-2" r="1.6" fill="#2a1a10" />
          <circle cx="6" cy="-2" r="1.6" fill="#2a1a10" />
          <path d="M-6 8 q6 -2 12 0" fill="#3a2418" />
          {/* casque autour du cou */}
          <path d="M-18 14 Q0 6 18 14" fill="none" stroke="#2a2a2a" strokeWidth="3" />
          <ellipse cx="-18" cy="15" rx="5" ry="6" fill="#3a3a3a" />
          <ellipse cx="18" cy="15" rx="5" ry="6" fill="#3a3a3a" />
        </g>

        {/* le MICRO EN PLACE (quand branché) — dessiné APRÈS Arthur pour passer DEVANT lui */}
        {microBranche && (
          <g transform="translate(690,340)">
            {/* pied */}
            <rect x="-3" y="0" width="6" height="40" fill="#2a2a2a" />
            <ellipse cx="0" cy="42" rx="16" ry="4" fill="#2a2a2a" />
            {/* tête du micro */}
            <ellipse cx="0" cy="-16" rx="20" ry="26" fill="#3a3a3a" stroke="#6a6a6a" strokeWidth="2" />
            <ellipse cx="0" cy="-16" rx="14" ry="20" fill="#1a1a1a" />
            {[[-8, -24], [0, -24], [8, -24], [-8, -16], [0, -16], [8, -16], [-8, -8], [0, -8], [8, -8]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1" fill="#5a5a5a" />
            ))}
            {/* logo BBC sous le micro */}
            <rect x="-12" y="12" width="24" height="10" fill="#0a0a0a" />
            <text x="0" y="20" fontSize="7" fontFamily="ui-monospace,monospace" fontWeight="800" fill="#e0d8c0" textAnchor="middle">BBC</text>
          </g>
        )}

        {/* « ? » Q&A d'accueil au-dessus d'Arthur (tant que le message n'est pas transmis) */}
        {!enOnde && (
          <g transform="translate(700,240)" style={{ animation: "float 2s ease-in-out infinite" }}>
            <circle r="14" fill="#ffd166" stroke="#8a5a20" strokeWidth="2" />
            <text y="5" textAnchor="middle" fontSize="18" fontWeight="800" fill="#3a2410">?</text>
          </g>
        )}
      </PLayer>

      {/* ═══ zones cliquables ═══ */}
      <Hotspot cx={700} cy={340} r={54} label="Arthur Smith" reveal={reveal} onClick={() => action("arthur")} />
      {!microBranche && (
        <Hotspot cx={200} cy={296} r={30} label="le micro de studio" item="micro" reveal={reveal} onClick={() => collect("micro")} />
      )}
      <Hotspot cx={143} cy={314} r={22} label="le feuillet de Verlaine" item="poeme" reveal={reveal} onClick={() => collect("poeme")} />
      {/* le PUPITRE — cible de dépôt (micro puis poème), reconnu SUPPORT via items.pupitre.support=true */}
      <Hotspot cx={690} cy={390} r={64} label={microBranche ? "le pupitre — glisse-y le feuillet" : "le pupitre — glisse-y le micro"} item="pupitre" reveal={reveal} onClick={() => action("arthur")} />
    </svg>
  );
}
