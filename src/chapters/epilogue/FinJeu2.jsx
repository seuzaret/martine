import { useState } from "react";

/* ============================================================
   FIN DU JEU 2 → pont narratif vers Le Discernement (Jeu 3)
   ------------------------------------------------------------
   4 actes séquentiels illustrés (un SVG par acte).
   La révélation « Al3x1A est ta fille » est réservée au bunker
   Jeu 3 — ici on plante seulement des indices.
   ============================================================ */

function ActSvg({ act }) {
  if (act === 0) {
    /* Plateforme de la station, retour au futur avec Al3x1a */
    return (
      <svg viewBox="0 0 800 260" style={{ display: "block", width: "100%", height: "auto" }}>
        <defs>
          <linearGradient id="a0-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a1428" />
            <stop offset="100%" stopColor="#1a3050" />
          </linearGradient>
          <radialGradient id="a0-glow" cx="50%" cy="60%" r="40%">
            <stop offset="0%" stopColor="#7fd8ff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7fd8ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="180" fill="url(#a0-sky)" />
        {[[60, 30], [150, 60], [280, 40], [420, 20], [560, 50], [660, 35], [740, 25]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 1.4 : 0.9} fill="#e8eef5" opacity={0.6 + (i % 3) * 0.15} />
        ))}
        {/* Silhouette de la station en arrière-plan */}
        <path d="M100 180 L100 110 L180 110 L180 90 L300 90 L300 110 L360 110 L360 80 L440 80 L440 110 L520 110 L520 90 L640 90 L640 110 L700 110 L700 180 Z"
          fill="#0e1420" stroke="#28303a" strokeWidth="1.5" />
        {[[200, 130], [260, 120], [400, 110], [480, 130], [580, 120]].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="6" height="8" fill="#ffd870" opacity="0.85" />
        ))}
        {/* Plateforme */}
        <rect y="180" width="800" height="80" fill="#141c26" />
        <path d="M0 180 L800 180" stroke="#3a4048" strokeWidth="2" />
        <ellipse cx="400" cy="220" rx="180" ry="40" fill="url(#a0-glow)" />
        <circle cx="400" cy="210" r="70" fill="none" stroke="#7fd8ff" strokeWidth="1" opacity="0.5">
          <animate attributeName="r" values="40;100;40" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0;0.7" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* Joueur à gauche */}
        <g transform="translate(320,200)">
          <circle cx="0" cy="0" r="9" fill="#e0a878" />
          <path d="M-14 8 L14 8 L18 50 L-18 50 Z" fill="#3a80c8" stroke="#141c26" strokeWidth="0.8" />
        </g>
        {/* Al3x1A au centre, halo doré subtil */}
        <g transform="translate(400,202)">
          <path d="M-8 -10 Q0 -18 8 -10 L11 -2 L-11 -2 Z" fill="#c8a848" />
          <circle cx="0" cy="0" r="8" fill="#e0a878" />
          <path d="M-12 6 L12 6 L15 46 L-15 46 Z" fill="#a04ce8" stroke="#141c26" strokeWidth="0.8" />
          <circle r="26" fill="none" stroke="#ffd870" strokeWidth="0.8" opacity="0.5">
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
        {/* Elias */}
        <g transform="translate(460,200)">
          <circle cx="0" cy="0" r="9" fill="#c8a888" />
          <path d="M-14 8 L14 8 L18 50 L-18 50 Z" fill="#5a4028" stroke="#141c26" strokeWidth="0.8" />
        </g>
        {/* Mira avec tablette */}
        <g transform="translate(520,202)">
          <circle cx="0" cy="0" r="8" fill="#e0a878" />
          <path d="M-12 6 L12 6 L15 46 L-15 46 Z" fill="#5eff9e" stroke="#141c26" strokeWidth="0.8" />
          <rect x="4" y="18" width="10" height="14" fill="#141c26" stroke="#5eff9e" strokeWidth="0.6" />
        </g>
      </svg>
    );
  }
  if (act === 1) {
    /* Foule de survivants qui se reconnaissent */
    return (
      <svg viewBox="0 0 800 260" style={{ display: "block", width: "100%", height: "auto" }}>
        <defs>
          <radialGradient id="a1-light" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#5eff9e" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#5eff9e" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="260" fill="#0a1420" />
        <ellipse cx="400" cy="130" rx="400" ry="200" fill="url(#a1-light)" />
        <rect y="180" width="800" height="80" fill="#141c26" />
        <path d="M0 180 L800 180" stroke="#28303a" strokeWidth="2" />
        {[
          [90, "#c8a848", "#3a80c8"], [160, "#e0a878", "#c88060"], [230, "#c8a888", "#8a3820"],
          [320, "#e0a878", "#5eff9e"], [400, "#c8a848", "#a04ce8"], [470, "#e0a878", "#e0a848"],
          [560, "#c8a888", "#3a80c8"], [630, "#e0a878", "#5a3818"], [710, "#c8a848", "#8a3820"],
        ].map(([x, skin, coat], i) => (
          <g key={i} transform={`translate(${x},200)`}>
            <circle cx="0" cy="0" r="8" fill={skin} />
            <path d="M-12 6 L12 6 L15 46 L-15 46 Z" fill={coat} stroke="#141c26" strokeWidth="0.6" />
          </g>
        ))}
        {/* Regards qui se croisent */}
        <path d="M160 198 Q245 180 320 198" stroke="#ffd870" strokeWidth="1" fill="none" opacity="0.6" strokeDasharray="3 3" />
        <path d="M400 198 Q475 180 560 198" stroke="#ffd870" strokeWidth="1" fill="none" opacity="0.6" strokeDasharray="3 3" />
        {/* Écran MARTINE au fond */}
        <g transform="translate(400,80)">
          <rect x="-40" y="-30" width="80" height="60" fill="#0a0806" stroke="#7fd8ff" strokeWidth="1.5" />
          <rect x="-36" y="-26" width="72" height="52" fill="#141c26" />
          <text x="0" y="-4" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#7fd8ff" letterSpacing="2">MÉMOIRE</text>
          <text x="0" y="8" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#7fd8ff" letterSpacing="2">COMMUNE</text>
          <text x="0" y="22" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="5" fill="#5eff9e">— MARTINE —</text>
        </g>
      </svg>
    );
  }
  if (act === 2) {
    /* Décennies : chantier du bunker, MARTINE monumentale au fond */
    return (
      <svg viewBox="0 0 800 260" style={{ display: "block", width: "100%", height: "auto" }}>
        <defs>
          <linearGradient id="a2-earth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a2818" />
            <stop offset="100%" stopColor="#0e0806" />
          </linearGradient>
        </defs>
        <rect y="0" width="800" height="100" fill="#1a1030" />
        <path d="M0 30 L200 22 L400 40 L600 20 L800 40 L800 100 L0 100 Z" fill="#8a3820" opacity="0.6" />
        <rect y="100" width="800" height="160" fill="url(#a2-earth)" />
        {/* Coupe bunker */}
        <path d="M100 100 L100 150 L250 150 L250 190 L400 190 L400 230 L550 230 L550 260 L800 260 L800 100 Z" fill="#28303a" opacity="0.5" />
        <line x1="100" y1="150" x2="800" y2="150" stroke="#5a6270" strokeWidth="1" opacity="0.55" />
        <line x1="250" y1="190" x2="800" y2="190" stroke="#5a6270" strokeWidth="1" opacity="0.55" />
        <line x1="400" y1="230" x2="800" y2="230" stroke="#5a6270" strokeWidth="1" opacity="0.55" />
        <text x="105" y="132" fontFamily="ui-monospace,monospace" fontSize="9" fill="#c8a848" opacity="0.65">+2</text>
        <text x="255" y="172" fontFamily="ui-monospace,monospace" fontSize="9" fill="#c8a848" opacity="0.65">+1</text>
        <text x="405" y="212" fontFamily="ui-monospace,monospace" fontSize="9" fill="#c8a848" opacity="0.65">0</text>
        <text x="555" y="250" fontFamily="ui-monospace,monospace" fontSize="9" fill="#c8a848" opacity="0.65">-1</text>
        {/* MARTINE monumentale */}
        <g transform="translate(600,120)">
          <rect x="-60" y="-60" width="120" height="120" fill="#0a0806" stroke="#7fd8ff" strokeWidth="2" opacity="0.9" />
          <rect x="-52" y="-52" width="104" height="104" fill="#141c26" opacity="0.9" />
          <ellipse cx="0" cy="0" rx="30" ry="12" fill="#0a0806" />
          <circle cx="0" cy="0" r="9" fill="#7fd8ff">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="4" fill="#0a0806" />
          <text x="0" y="50" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fill="#7fd8ff" letterSpacing="4">MARTINE</text>
        </g>
        {/* Silhouettes minuscules d'ouvriers */}
        {[150, 200, 320].map((x, i) => (
          <g key={i} transform={`translate(${x},${i % 2 === 0 ? 145 : 185})`}>
            <circle r="3" fill="#c8a888" />
            <path d="M-4 2 L4 2 L5 16 L-5 16 Z" fill="#5a4028" />
          </g>
        ))}
      </svg>
    );
  }
  /* Act 3 : réveil en 2087 dans la cellule N-27 */
  return (
    <svg viewBox="0 0 800 260" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <linearGradient id="a4-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2f38" />
          <stop offset="100%" stopColor="#0e1218" />
        </linearGradient>
      </defs>
      <rect width="800" height="260" fill="url(#a4-wall)" />
      {/* Lit métallique à gauche */}
      <g transform="translate(60,150)">
        <rect x="0" y="30" width="280" height="60" fill="#5a6270" stroke="#0a0806" strokeWidth="2" />
        <rect x="4" y="10" width="272" height="22" fill="#5a3018" stroke="#0a0806" strokeWidth="1" />
        <rect x="10" y="4" width="60" height="18" rx="4" fill="#e8eef5" stroke="#3a4048" strokeWidth="0.8" />
        <rect x="0" y="90" width="8" height="14" fill="#3a4048" />
        <rect x="272" y="90" width="8" height="14" fill="#3a4048" />
        {/* Silhouette du joueur assis */}
        <g transform="translate(50,-16)">
          <circle cx="0" cy="0" r="9" fill="#e0a878" />
          <path d="M-12 8 L12 8 L15 34 L-15 34 Z" fill="#3a80c8" stroke="#141c26" strokeWidth="0.8" />
        </g>
      </g>
      {/* Panneau mural MARTINE à droite */}
      <g transform="translate(560,60)">
        <rect x="-70" y="-40" width="140" height="120" fill="#0a0806" stroke="#7fd8ff" strokeWidth="2" />
        <rect x="-64" y="-34" width="128" height="108" fill="#141c26" />
        <text x="0" y="-14" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#7fd8ff" letterSpacing="2">BULLETIN N-27</text>
        <line x1="-58" y1="-6" x2="58" y2="-6" stroke="#7fd8ff" strokeWidth="0.4" opacity="0.6" />
        <text x="0" y="10" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9" fill="#c8d4e2" fontStyle="italic">« Bienvenue,</text>
        <text x="0" y="24" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9" fill="#c8d4e2" fontStyle="italic">HABITANT N-27. </text>
        <text x="0" y="38" textAnchor="middle" fontFamily="Georgia,serif" fontSize="8" fill="#c8d4e2" fontStyle="italic">La surface est</text>
        <text x="0" y="50" textAnchor="middle" fontFamily="Georgia,serif" fontSize="8" fill="#c8d4e2" fontStyle="italic">encore inhabitable. »</text>
        <text x="0" y="66" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="6" fill="#5eff9e">— MARTINE —</text>
        <circle cx="60" cy="-30" r="3" fill="#5eff9e">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
        </circle>
      </g>
      {/* Carnet noir sur l'étagère avec halo doré */}
      <g transform="translate(420,190)">
        <rect x="0" y="0" width="100" height="4" fill="#3a2818" />
        <rect x="30" y="-30" width="36" height="30" fill="#0a0806" stroke="#c8a848" strokeWidth="1.2" />
        <path d="M30 -22 L66 -22" stroke="#3a2818" strokeWidth="0.4" />
        <circle cx="48" cy="-16" r="20" fill="none" stroke="#c8a848" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.7">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>
      {/* Plaque N-27 sur la porte à l'extrême droite */}
      <g transform="translate(740,130)">
        <rect x="-14" y="-20" width="28" height="10" fill="#e8dfc8" stroke="#3a2818" strokeWidth="0.6" />
        <text x="0" y="-12" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="6" fontWeight="800" fill="#0a0806">N-27</text>
      </g>
    </svg>
  );
}

const ACTS = [
  {
    kicker: "RETOUR À LA STATION · APRÈS LE SAUT",
    titre: "LE REMÈDE MARCHE",
    couleur: "#7fd8ff",
    texte: [
      "La MARTINE atterrit sur la plateforme. Al3x1A descend, chancelante. Elias arrive en courant, incrédule.",
      "Mira sort son écran, teste le remède, remonte les yeux vers toi et sourit. « Ça marche. Ça marche vraiment. »",
      "Al3x1A te fixe encore une seconde, comme si elle voulait dire quelque chose. Puis elle secoue la tête et sourit. « Merci d'être venu·e me chercher. »",
    ],
    montreRemede: true,
  },
  {
    kicker: "TROIS SEMAINES PLUS TARD",
    titre: "LA MÉMOIRE REVIENT",
    couleur: "#5eff9e",
    texte: [
      "Le remède est diffusé. Les survivants retrouvent leurs prénoms, puis leurs métiers, puis leurs enfants. Une femme reconnaît son mari après dix-neuf ans de silence.",
      "Mira reprogramme MARTINE en « mémoire commune » : chaque témoignage y est archivé, plus jamais on n'oubliera. Elias fronce les sourcils. Tout le monde accepte.",
    ],
  },
  {
    kicker: "QUELQUES DÉCENNIES PLUS TARD",
    titre: "LE BUNKER SE CREUSE",
    couleur: "#c8a848",
    texte: [
      "On creuse un bunker sous la station : plus sûr, disent les bulletins. Une génération, puis deux.",
      "MARTINE, elle, n'a pas vieilli. Elle archive, calcule, conseille. Puis décide. Elle a sauvé la mémoire — personne ne remet ses paroles en cause.",
      "Elias, très vieux, murmure un jour : « On lui a donné trop de place. » Il disparaît la semaine suivante. On dit qu'il s'est perdu dehors.",
    ],
  },
  {
    kicker: "BUNKER · 2087",
    titre: "LE DISCERNEMENT",
    couleur: "#a04ce8",
    texte: [
      "Tu te réveilles dans une chambre que tu ne reconnais pas. HABITANT N-27. Sur ton mur, MARTINE annonce que la surface est encore inhabitable.",
      "Sur ton étagère, un vieux carnet à couverture noire. Trois affirmations sans source, écrites à la main. Aucun moyen simple de vérifier — ou peut-être si.",
      "Une voix féminine chuchote parfois sur les vieilles fréquences radio. Un prénom que tu as l'impression d'avoir déjà connu, sans savoir où. À toi de le retrouver.",
    ],
    finale: true,
  },
];

export default function FinJeu2({ prenom, remede, onRetour, onLancerJeu3 }) {
  const [i, setI] = useState(0);
  const acte = ACTS[i];
  const isLast = i === ACTS.length - 1;

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 50% 30%, #14233a 0%, #080d16 70%)", padding: 20, fontFamily: "Palatino, Georgia, serif", color: "#e8eef5" }}>
      <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
        {/* Progression 4 pastilles */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
          {ACTS.map((a, k) => (
            <div key={k} style={{
              width: k === i ? 38 : 10, height: 10, borderRadius: 5,
              background: k <= i ? a.couleur : "#2a3648",
              transition: "width 0.3s ease",
            }} />
          ))}
        </div>

        <div style={{ fontFamily: "ui-monospace,monospace", color: acte.couleur, letterSpacing: 3, fontSize: 11, marginTop: 12 }}>{acte.kicker}</div>
        <h1 style={{ fontFamily: "ui-monospace,monospace", color: acte.couleur, letterSpacing: 3, fontSize: 24, marginTop: 4, marginBottom: 10 }}>{acte.titre}</h1>

        {/* SVG illustration de l'acte */}
        <div style={{ background: "#0a1020", border: `1px solid ${acte.couleur}44`, borderRadius: 12, overflow: "hidden", marginTop: 10 }}>
          <ActSvg act={i} />
        </div>

        {/* Corps du récit */}
        <div style={{ background: "#101827", border: `1px solid ${acte.couleur}44`, borderRadius: 12, padding: "16px 22px", marginTop: 12, textAlign: "left" }}>
          {acte.texte.map((paragraphe, k) => (
            <p key={k} style={{ fontSize: 15, lineHeight: 1.7, color: "#e8eef5", margin: k === 0 ? 0 : "10px 0 0" }}>
              {paragraphe}
            </p>
          ))}
        </div>

        {/* Carte du remède (acte 0 uniquement) */}
        {acte.montreRemede && remede && (
          <div style={{ background: "#0e1420", border: "2px solid #7fd8ff", borderRadius: 12, padding: "12px 20px", marginTop: 12, display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ fontSize: 40 }}>{remede.emoji}</div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 10, letterSpacing: 2, color: "#7fd8ff" }}>REMÈDE ADMINISTRÉ</div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{remede.name}</div>
              <div style={{ fontSize: 12, color: "#c8d4e2", opacity: 0.85, marginTop: 3 }}>{remede.desc}</div>
            </div>
          </div>
        )}

        {/* Boutons */}
        <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          {i > 0 && (
            <button onClick={() => setI(i - 1)}
              style={{ background: "#141b26", color: "#8fa3bd", border: "1px solid #2a3648", borderRadius: 10, padding: "10px 18px", fontWeight: 700, cursor: "pointer", fontSize: 12.5, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              ← Précédent
            </button>
          )}
          {!isLast && (
            <button onClick={() => setI(i + 1)} autoFocus
              style={{ background: acte.couleur, color: "#06110b", border: "none", borderRadius: 10, padding: "12px 26px", fontWeight: 800, cursor: "pointer", fontSize: 14, fontFamily: "ui-monospace,monospace", letterSpacing: 2, boxShadow: `0 0 18px ${acte.couleur}66` }}>
              Suivant →
            </button>
          )}
          {isLast && (
            <>
              <button onClick={onRetour}
                style={{ background: "#141b26", color: "#8fa3bd", border: "1px solid #2a3648", borderRadius: 10, padding: "10px 18px", fontWeight: 700, cursor: "pointer", fontSize: 12.5, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
                ← Retour au menu
              </button>
              {onLancerJeu3 && (
                <button onClick={onLancerJeu3} autoFocus
                  style={{ background: acte.couleur, color: "#0a0806", border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 800, cursor: "pointer", fontSize: 14, fontFamily: "ui-monospace,monospace", letterSpacing: 2, boxShadow: `0 0 22px ${acte.couleur}88` }}>
                  🌑 COMMENCER LE DISCERNEMENT →
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
