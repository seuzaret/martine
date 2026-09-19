/* ============================================================
   JEU 3 — Sprite PNJ (v2, corps complet + orientation + tenue)
   ------------------------------------------------------------
   Personnage entier (tête + torse + bras + jambes) dessiné dans
   un SVG parent. Trois "faces" possibles pour ne pas toujours
   regarder le joueur, deux "poses" (debout / assis), et un
   accessoire de métier optionnel (blouse, tablier, ceinture
   d'outils, robe, casque).

   Props :
     x, y        — position dans le SVG parent (pieds au sol à y)
     color       — couleur du haut (tunique/veste)
     pants       — couleur du bas (défaut #3a2818)
     hair        — couleur des cheveux (défaut brun foncé)
     skin        — couleur de peau (défaut ocre)
     facing      — "front" | "left" | "right"   (défaut "front")
     pose        — "stand" | "sit"              (défaut "stand")
     accessory   — "apron" | "coat" | "toolbelt" | "robe" | "hardhat" | null
     nom, role   — étiquettes affichées sous le personnage
     heard       — pastille verte ✓ si vrai
     active      — halo doré pulsant si vrai
     onClick     — callback clic
   ============================================================ */
export default function PnjSprite({
  x, y, color = "#5a5060", pants = "#3a2818", hair = "#2a1808", skin = "#e0a878",
  facing = "front", pose = "stand", accessory = null,
  nom = "?", role = "", heard = false, active = false, onClick,
}) {
  return (
    <g transform={`translate(${x},${y})`} onClick={onClick} style={{ cursor: onClick ? "pointer" : "default" }}>
      {/* Halo actif */}
      {active && (
        <circle cx="0" cy="-40" r="66" fill="none" stroke="#ffd166" strokeWidth="2" strokeDasharray="4 4">
          <animate attributeName="r" values="60;72;60" dur="1.6s" repeatCount="indefinite" />
        </circle>
      )}
      {/* Ombre au sol */}
      <ellipse cx="0" cy="0" rx="18" ry="4" fill="#000" opacity="0.35" />

      {/* Corps selon la pose */}
      {pose === "sit" ? <SitBody color={color} pants={pants} skin={skin} facing={facing} /> :
                        <StandBody color={color} pants={pants} skin={skin} facing={facing} />}

      {/* Accessoire de métier (par-dessus la tunique) */}
      {accessory && <Accessory kind={accessory} facing={facing} pose={pose} />}

      {/* Tête + cheveux + visage — orientation selon `facing` */}
      <Head hair={hair} skin={skin} facing={facing} />

      {/* Pastille "déjà entendu" */}
      {heard && (
        <g transform="translate(20,-96)">
          <circle r="8" fill="#5eff9e" stroke="#0a0806" strokeWidth="1.2" />
          <path d="M-4 0 L-1 3 L5 -3" stroke="#0a0806" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}

      {/* Étiquettes nom + rôle sous les pieds */}
      <text x="0" y="20" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fontWeight="700" fill="#e8dfc8">{nom}</text>
      <text x="0" y="31" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#8a7050">{role}</text>
    </g>
  );
}

/* ═══ CORPS DEBOUT ═══ */
function StandBody({ color, pants, skin, facing }) {
  const armColor = skin;
  if (facing === "left") {
    return (
      <g>
        {/* Jambes */}
        <rect x="-8" y="-40" width="7" height="40" fill={pants} stroke="#0a0806" strokeWidth="0.6" />
        <rect x="1"  y="-40" width="7" height="40" fill={pants} stroke="#0a0806" strokeWidth="0.6" opacity="0.85" />
        <ellipse cx="-4" cy="-1" rx="6" ry="2" fill="#141c26" />
        <ellipse cx="4"  cy="-1" rx="6" ry="2" fill="#141c26" opacity="0.85" />
        {/* Torse (buste tourné 3/4 gauche) */}
        <path d="M-14 -84 Q-18 -70 -16 -42 L 12 -42 Q 14 -70 10 -84 Z" fill={color} stroke="#0a0806" strokeWidth="0.8" />
        {/* Bras qui va vers l'avant (vue gauche) */}
        <path d="M-14 -80 Q-24 -70 -22 -56 Q-20 -50 -14 -50" stroke={armColor} strokeWidth="7" fill="none" strokeLinecap="round" />
        <circle cx="-14" cy="-50" r="4" fill={skin} stroke="#8a5030" strokeWidth="0.6" />
      </g>
    );
  }
  if (facing === "right") {
    return (
      <g>
        <rect x="-8" y="-40" width="7" height="40" fill={pants} stroke="#0a0806" strokeWidth="0.6" opacity="0.85" />
        <rect x="1"  y="-40" width="7" height="40" fill={pants} stroke="#0a0806" strokeWidth="0.6" />
        <ellipse cx="-4" cy="-1" rx="6" ry="2" fill="#141c26" opacity="0.85" />
        <ellipse cx="4"  cy="-1" rx="6" ry="2" fill="#141c26" />
        <path d="M-10 -84 Q-14 -70 -12 -42 L 16 -42 Q 18 -70 14 -84 Z" fill={color} stroke="#0a0806" strokeWidth="0.8" />
        {/* Bras qui va vers l'avant (droite) */}
        <path d="M14 -80 Q24 -70 22 -56 Q20 -50 14 -50" stroke={armColor} strokeWidth="7" fill="none" strokeLinecap="round" />
        <circle cx="14" cy="-50" r="4" fill={skin} stroke="#8a5030" strokeWidth="0.6" />
      </g>
    );
  }
  /* front (défaut) */
  return (
    <g>
      {/* Jambes */}
      <rect x="-9" y="-40" width="8" height="40" fill={pants} stroke="#0a0806" strokeWidth="0.6" />
      <rect x="1"  y="-40" width="8" height="40" fill={pants} stroke="#0a0806" strokeWidth="0.6" />
      <ellipse cx="-5" cy="-1" rx="6" ry="2" fill="#141c26" />
      <ellipse cx="5"  cy="-1" rx="6" ry="2" fill="#141c26" />
      {/* Torse trapèzoïdal */}
      <path d="M-16 -84 Q-20 -68 -18 -42 L 18 -42 Q 20 -68 16 -84 Z" fill={color} stroke="#0a0806" strokeWidth="0.8" />
      {/* Encolure */}
      <path d="M-8 -84 Q0 -80 8 -84" stroke="#0a0806" strokeWidth="0.6" fill="none" opacity="0.5" />
      {/* Bras le long du corps */}
      <path d="M-18 -80 Q-26 -66 -22 -50" stroke={skin} strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M 18 -80 Q 26 -66 22 -50" stroke={skin} strokeWidth="7" fill="none" strokeLinecap="round" />
      {/* Mains */}
      <circle cx="-22" cy="-50" r="4" fill={skin} stroke="#8a5030" strokeWidth="0.6" />
      <circle cx=" 22" cy="-50" r="4" fill={skin} stroke="#8a5030" strokeWidth="0.6" />
    </g>
  );
}

/* ═══ CORPS ASSIS (sur un banc, jambes pendantes) ═══ */
function SitBody({ color, pants, skin }) {
  return (
    <g>
      {/* Jambes assises (repliées vers l'avant) */}
      <path d="M-10 -30 Q-14 -6 -6 0 L 6 0 Q 14 -6 10 -30 Z" fill={pants} stroke="#0a0806" strokeWidth="0.6" />
      {/* Pieds */}
      <ellipse cx="-5" cy="0" rx="6" ry="2" fill="#141c26" />
      <ellipse cx="5"  cy="0" rx="6" ry="2" fill="#141c26" />
      {/* Torse un peu penché en avant */}
      <path d="M-16 -74 Q-20 -60 -16 -32 L 16 -32 Q 20 -60 16 -74 Z" fill={color} stroke="#0a0806" strokeWidth="0.8" />
      {/* Bras croisés sur les cuisses */}
      <path d="M-16 -60 Q-8 -50 0 -46 Q 8 -50 16 -60" stroke={skin} strokeWidth="7" fill="none" strokeLinecap="round" />
    </g>
  );
}

/* ═══ TÊTE (avec cheveux et visage — orientation) ═══ */
function Head({ hair, skin, facing }) {
  return (
    <g transform="translate(0,-96)">
      {/* cou */}
      <rect x="-4" y="6" width="8" height="10" fill={skin} stroke="#5a3018" strokeWidth="0.5" />
      {/* tête ovale */}
      <ellipse rx="12" ry="14" fill={skin} stroke="#5a3018" strokeWidth="0.8" />
      {/* Cheveux : la coupe change avec l'orientation */}
      {facing === "front" && (
        <path d="M-11 -6 q0 -14 6 -16 q4 2 5 -4 q3 4 5 -2 q4 3 6 8 q0 8 -1 14 Z" fill={hair} />
      )}
      {facing === "left" && (
        <path d="M-11 -6 q0 -14 6 -16 q6 -2 8 4 q0 12 -2 16 L-4 -2 Z" fill={hair} />
      )}
      {facing === "right" && (
        <path d="M11 -6 q0 -14 -6 -16 q-6 -2 -8 4 q0 12 2 16 L4 -2 Z" fill={hair} />
      )}
      {/* Visage : yeux + bouche différents selon l'orientation */}
      {facing === "front" && (
        <>
          <circle cx="-4" cy="0" r="1.3" fill="#0a0806" />
          <circle cx=" 4" cy="0" r="1.3" fill="#0a0806" />
          <path d="M-3 5 Q0 7 3 5" stroke="#5a2818" strokeWidth="0.9" fill="none" strokeLinecap="round" />
        </>
      )}
      {facing === "left" && (
        <>
          {/* Un œil visible (le gauche), nez qui saille à gauche */}
          <circle cx="-2" cy="0" r="1.3" fill="#0a0806" />
          <path d="M-10 2 Q-11 4 -9 5" stroke="#5a3018" strokeWidth="0.5" fill="none" />
          <path d="M-4 5 Q-1 6 1 5" stroke="#5a2818" strokeWidth="0.9" fill="none" strokeLinecap="round" />
        </>
      )}
      {facing === "right" && (
        <>
          <circle cx="2" cy="0" r="1.3" fill="#0a0806" />
          <path d="M10 2 Q11 4 9 5" stroke="#5a3018" strokeWidth="0.5" fill="none" />
          <path d="M4 5 Q1 6 -1 5" stroke="#5a2818" strokeWidth="0.9" fill="none" strokeLinecap="round" />
        </>
      )}
    </g>
  );
}

/* ═══ ACCESSOIRES DE MÉTIER ═══ */
function Accessory({ kind, facing, pose }) {
  const isSit = pose === "sit";
  const bodyTop = isSit ? -74 : -84;
  const bodyBot = isSit ? -32 : -42;
  switch (kind) {
    case "apron": {
      /* Tablier blanc/beige avec attache autour du cou */
      return (
        <g>
          {/* Bavette */}
          <path d={`M-10 ${bodyTop + 10} L 10 ${bodyTop + 10} L 12 ${bodyBot} L -12 ${bodyBot} Z`}
            fill="#e8dfc8" stroke="#8a7050" strokeWidth="0.6" />
          {/* Attaches cou */}
          <path d={`M-6 ${bodyTop + 10} Q-8 ${bodyTop - 6} 0 ${bodyTop - 4}`} stroke="#8a7050" strokeWidth="0.7" fill="none" />
          <path d={`M 6 ${bodyTop + 10} Q 8 ${bodyTop - 6} 0 ${bodyTop - 4}`} stroke="#8a7050" strokeWidth="0.7" fill="none" />
          {/* Poche */}
          <rect x="-6" y={bodyTop + 22} width="12" height="8" fill="none" stroke="#8a7050" strokeWidth="0.5" />
        </g>
      );
    }
    case "coat": {
      /* Blouse blanche ouverte */
      return (
        <g>
          <path d={`M-18 ${bodyTop} L-18 ${bodyBot} L 18 ${bodyBot} L 18 ${bodyTop} Z`}
            fill="#e8eef5" stroke="#3a4048" strokeWidth="0.6" opacity="0.9" />
          {/* Revers ouvert (V au niveau du cou) */}
          <path d={`M-6 ${bodyTop + 2} L 0 ${bodyTop + 14} L 6 ${bodyTop + 2}`}
            fill="#141c26" stroke="#3a4048" strokeWidth="0.5" />
          {/* Boutons */}
          <circle cx="0" cy={bodyTop + 20} r="1" fill="#3a4048" />
          <circle cx="0" cy={bodyTop + 30} r="1" fill="#3a4048" />
          {/* Petite poche */}
          <rect x="-14" y={bodyTop + 24} width="8" height="6" fill="none" stroke="#3a4048" strokeWidth="0.4" />
        </g>
      );
    }
    case "toolbelt": {
      /* Ceinture d'outils à la taille */
      const yBelt = bodyBot - 4;
      return (
        <g>
          <rect x="-18" y={yBelt} width="36" height="6" fill="#3a2010" stroke="#0a0806" strokeWidth="0.5" />
          <rect x="-18" y={yBelt + 6} width="36" height="10" fill="#5a3818" stroke="#0a0806" strokeWidth="0.4" opacity="0.75" />
          {/* Outils suspendus */}
          <rect x="-14" y={yBelt + 5} width="3" height="10" fill="#8a5030" />
          <rect x="-4" y={yBelt + 5} width="3" height="12" fill="#5a6270" />
          <rect x="6" y={yBelt + 5} width="4" height="10" fill="#c8a848" />
        </g>
      );
    }
    case "robe": {
      /* Longue robe qui descend jusqu'aux pieds */
      return (
        <g>
          <path d={`M-16 ${bodyTop + 6} L-22 -4 L 22 -4 L 16 ${bodyTop + 6} Z`}
            fill="#3a2818" stroke="#1a0e08" strokeWidth="0.6" opacity="0.9" />
          {/* Corde à la taille */}
          <path d="M-16 -50 L 16 -50" stroke="#c8a848" strokeWidth="1.2" />
          {/* Petit médaillon */}
          <circle cx="0" cy={bodyTop + 24} r="3" fill="#c8a848" stroke="#5a4020" strokeWidth="0.5" />
        </g>
      );
    }
    case "hardhat": {
      /* Casque de chantier — position au-dessus de la tête */
      return (
        <g transform="translate(0,-108)">
          <path d="M-14 4 Q0 -14 14 4 Z" fill="#e0a848" stroke="#5a3818" strokeWidth="0.8" />
          <rect x="-14" y="4" width="28" height="3" fill="#5a3818" />
          {/* Lampe frontale */}
          <circle cx="0" cy="-2" r="2.5" fill="#fff" stroke="#5a3818" strokeWidth="0.5" />
        </g>
      );
    }
    default:
      return null;
  }
}
