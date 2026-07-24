/* ============================================================
   LES REPRODUCTIONS DES FICHES
   ------------------------------------------------------------
   Petites illustrations documentaires affichées dans l'encadré
   d'un message (fiche). Elles sont DESSINÉES ici, à la main :
   donc libres de droit par construction, et affichées sans
   aucune connexion (rien n'est chargé depuis Internet).

   Pour AJOUTER une reproduction à une fiche :
   1. écris un petit composant SVG (comme `FluteIsturitz` ci-dessous) ;
   2. relie-le à l'identifiant du message dans `ILLUSTRATIONS`.
   Un message sans entrée ici s'affiche simplement sans image.

   (Le lien « En savoir plus » vers Wikipédia, lui, se met dans
   le champ `wiki` du message, dans le data.js du chapitre.)
   ============================================================ */

/* Les flûtes en os d'Isturitz (Paléolithique supérieur) : un os
   d'oiseau évidé, percé de trous pour les doigts. */
function FluteIsturitz() {
  return (
    <svg viewBox="0 0 320 120" style={{ display: "block", width: "100%", height: "auto" }} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="il-os" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#efe4c8" />
          <stop offset="55%" stopColor="#e0d2b0" />
          <stop offset="100%" stopColor="#c3b491" />
        </linearGradient>
        <radialGradient id="il-trou" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#4a3826" />
          <stop offset="100%" stopColor="#1c130a" />
        </radialGradient>
      </defs>

      {/* le corps de la flûte, un os long légèrement courbé */}
      <path d="M28 70 Q40 54 78 52 L250 46 Q286 45 296 58 Q300 64 296 70 Q286 84 250 82 L78 78 Q40 78 28 70 Z" fill="url(#il-os)" stroke="#a89468" strokeWidth="1.5" />
      {/* l'ombre douce sous l'os */}
      <path d="M40 80 Q160 92 286 74" stroke="#00000022" strokeWidth="7" fill="none" strokeLinecap="round" />
      {/* l'embouchure, à gauche (extrémité travaillée) */}
      <ellipse cx="33" cy="66" rx="7" ry="12" fill="#d8c9a4" stroke="#a89468" strokeWidth="1.4" />
      <ellipse cx="33" cy="66" rx="3.2" ry="6.5" fill="url(#il-trou)" />
      {/* l'extrémité droite, cassure d'os ancienne */}
      <path d="M290 52 q10 6 0 16 q-6 -8 0 -16 Z" fill="#b6a67e" />
      {/* les trous pour les doigts */}
      {[110, 150, 190, 230].map((x, i) => (
        <g key={i}>
          <ellipse cx={x} cy={60 + (i % 2) * 1.5} rx="7" ry="5.5" fill="url(#il-trou)" />
          <ellipse cx={x} cy={58 + (i % 2) * 1.5} rx="7.6" ry="2.2" fill="#fff" opacity="0.18" />
        </g>
      ))}
      {/* fines incisions décoratives + craquelures de l'os */}
      <path d="M70 56 l6 8 M262 52 l5 9 M96 54 q3 6 0 12 M208 50 q3 6 0 12" stroke="#a89468" strokeWidth="1" opacity="0.6" fill="none" />
      {/* quelques piqûres de matière (grain de l'os) */}
      {[[60, 72], [136, 70], [176, 51], [244, 72], [284, 64]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="0.9" fill="#a89468" opacity="0.5" />
      ))}
    </svg>
  );
}

/* La peinture rupestre de Lascaux : un cheval à l'ocre, cerné de charbon. */
/* (Le cheval de Lascaux et la main négative de Gargas ont été retirés :
   les figures/animaux dessinés en SVG « à l'aveugle » rendaient mal. Ces
   deux fiches gardent leur lien « En savoir plus » vers Wikipédia, sans
   dessin, en attendant de vraies illustrations.) */

/* Une poterie néolithique décorée : ses motifs = la « marque » du groupe. */
function PoterieDecoree() {
  return (
    <svg viewBox="0 0 320 120" style={{ display: "block", width: "100%", height: "auto" }} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="il-terre" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#a85a30" /><stop offset="50%" stopColor="#c47a44" /><stop offset="100%" stopColor="#8a4a26" /></linearGradient>
      </defs>
      {/* le pot */}
      <path d="M132 30 Q126 22 142 20 L178 20 Q194 22 188 30 Q214 46 208 78 Q202 104 160 104 Q118 104 112 78 Q106 46 132 30 Z" fill="url(#il-terre)" stroke="#5c3018" strokeWidth="2.2" />
      {/* le col */}
      <path d="M138 24 h44 M134 34 q26 8 52 0" stroke="#5c3018" strokeWidth="1.6" fill="none" opacity="0.7" />
      {/* bandes de motifs incisés (chevrons + points) */}
      {[46, 84].map((y, r) => (
        <g key={r}>
          {[...Array(9)].map((_, i) => (
            <path key={i} d={`M${120 + i * 10} ${y} l5 6 l5 -6`} stroke="#efe0c4" strokeWidth="1.8" fill="none" opacity="0.85" />
          ))}
        </g>
      ))}
      {[...Array(9)].map((_, i) => <circle key={i} cx={122 + i * 9.4} cy="66" r="1.6" fill="#efe0c4" opacity="0.8" />)}
      {/* ombre au sol */}
      <ellipse cx="160" cy="108" rx="46" ry="5" fill="#00000033" />
    </svg>
  );
}

/* Un dolmen : le message monumental, visible de loin et presque éternel. */
function Megalithe() {
  return (
    <svg viewBox="0 0 320 120" style={{ display: "block", width: "100%", height: "auto" }} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="il-granit" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9a948a" /><stop offset="100%" stopColor="#63605a" /></linearGradient>
      </defs>
      {/* la lande */}
      <path d="M10 106 q150 -10 300 0" stroke="#5a6a3a" strokeWidth="3" fill="none" opacity="0.6" />
      {[[40, 104], [280, 104], [160, 108]].map(([x, y], i) => <path key={i} d={`M${x} ${y} q-4 -10 -8 -13 M${x} ${y} q2 -11 7 -14`} stroke="#4a5a2c" strokeWidth="2" fill="none" opacity="0.6" />)}
      {/* les deux piliers */}
      <path d="M92 104 L98 52 L120 52 L114 104 Z" fill="url(#il-granit)" stroke="#40403a" strokeWidth="2" />
      <path d="M206 104 L212 52 L234 52 L228 104 Z" fill="url(#il-granit)" stroke="#40403a" strokeWidth="2" />
      {/* la grande dalle de couverture */}
      <path d="M74 54 Q160 36 250 50 L242 30 Q160 16 82 34 Z" fill="url(#il-granit)" stroke="#40403a" strokeWidth="2" />
      {/* grain de la pierre */}
      <path d="M96 64 q6 14 2 34 M214 62 q5 16 0 36 M104 40 q40 -8 130 4" stroke="#4a4842" strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
  );
}

/* Une tablette d'argile cunéiforme : l'écriture née de la comptabilité. */
function TabletteCuneiforme() {
  const wedge = (x, y, k) => (
    <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${k % 2 ? 8 : -6})`} fill="#5a3f22">
      <path d="M0 0 l6 -2.4 l-1 4 Z" />
      <path d="M0.5 1 l7 3" stroke="#5a3f22" strokeWidth="1.1" />
    </g>
  );
  return (
    <svg viewBox="0 0 320 120" style={{ display: "block", width: "100%", height: "auto" }} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="il-argile" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#cdae74" /><stop offset="100%" stopColor="#a8864e" /></linearGradient>
      </defs>
      {/* la tablette, coins arrondis */}
      <path d="M78 26 Q74 22 82 22 L238 24 Q248 24 248 34 L246 90 Q246 98 236 98 L84 96 Q74 96 74 88 L76 34 Q76 28 78 26 Z" fill="url(#il-argile)" stroke="#7a5a30" strokeWidth="2" />
      {/* lignes de séparation des « cases » comptables */}
      {[44, 62, 80].map((y, i) => <path key={i} d={`M86 ${y} q76 4 150 0`} stroke="#8a6a3a" strokeWidth="1" opacity="0.5" />)}
      {[160].map((x) => <path key={x} d="M160 32 v58" stroke="#8a6a3a" strokeWidth="1" opacity="0.4" />)}
      {/* les signes en clous */}
      {[34, 52, 70, 88].map((y) => [...Array(11)].map((_, i) => wedge(94 + i * 13, y - 2, i + y)))}
    </svg>
  );
}

/* La table : identifiant de message → composant de reproduction.
   (À compléter au fil des fiches.) */
export const ILLUSTRATIONS = {
  msg_flute: FluteIsturitz,
  msg_poterie: PoterieDecoree,
  msg_megalithe: Megalithe,
  msg_cuneiforme: TabletteCuneiforme,
};
