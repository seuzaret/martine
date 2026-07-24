/* ============================================================
   CHAPITRE 3 — Mésopotamie & Égypte : naître de l'écriture (−3300)
   ============================================================
   Même structure que les chapitres précédents. Le moteur lit ce
   fichier sans connaître son contenu. Voir docs/AJOUTER-UN-CHAPITRE.md.
   ============================================================ */

import SceneUruk from "./scenes/SceneUruk.jsx";
import SceneNil from "./scenes/SceneNil.jsx";
import ScenePhenicie from "./scenes/ScenePhenicie.jsx";

/* ------------------------------------------------------------
   LES ÉLÉMENTS
   ------------------------------------------------------------ */
const ITEMS = {
  /* Uruk */
  argile:   { name: "Argile fraîche", emoji: "🟤", desc: "Une motte de terre du fleuve, molle et docile. Elle garde tout ce qu'on y presse." },
  jetons:   { name: "Jetons-comptes", emoji: "🔴", desc: "De petits jetons d'argile : un par mouton, un par sac de grain. Comment les garder en mémoire ?" },
  calame:   { name: "Calame", emoji: "🖊", desc: "Un roseau taillé en biseau. Enfoncé dans l'argile, il laisse une marque en forme de coin." },
  sceau:    { name: "Sceau-cylindre", emoji: "🔷", desc: "Un petit cylindre de pierre gravé. Roulé sur l'argile, il imprime une image unique — ta marque." },
  /* SUPPORTS (support: true) : fixes, ne vont pas au sac — repérés en cyan
     par le moteur ; on leur APPORTE un objet (glisser dessus). */
  four:     { name: "Four à tablettes", emoji: "🔥", support: true, desc: "La chaleur transforme l'argile molle en pierre. Ce qui en sort peut défier les millénaires." },
  eau:      { name: "Flaque d'eau", emoji: "💧", support: true, desc: "Une flaque, un canal, une averse… l'ennemie jurée de l'argile encore molle." },

  /* Nil */
  papyrus_tiges: { name: "Tiges de papyrus", emoji: "🌿", desc: "La plante-roi du Nil. Fendue et pressée, elle donne des feuilles." },
  pierre:        { name: "Pierre à presser", emoji: "🪨", support: true, desc: "Une pierre plate et lourde : de quoi écraser les tiges jusqu'à ce qu'elles se collent." },
  encre:         { name: "Roseau & encre", emoji: "🪶", desc: "Un pinceau de roseau et de l'encre noire. De quoi tracer de fins signes." },

  /* Phénicie */
  signes:   { name: "Les 22 signes", emoji: "🅰️", desc: "L'idée géniale des marchands : à peine 22 signes, un pour chaque son. Simple. Rapide à apprendre." },
  navires:  { name: "Navires marchands", emoji: "⛵", desc: "Les bateaux phéniciens sillonnent la Méditerranée. Ils transportent des marchandises… et des idées." },

  /* fabriqués */
  calculi:       { name: "Bulle scellée", emoji: "🟠", desc: "Les jetons enfermés dans une boule d'argile scellée : le tout premier « registre » comptable." },
  tablette_crue: { name: "Tablette crue", emoji: "🟫", desc: "Une tablette d'argile couverte de signes… mais encore molle. Il faut la cuire, ou tout est perdu." },
  feuille_papyrus:{ name: "Feuille de papyrus", emoji: "📄", desc: "Lisse, légère, souple : on peut la rouler, la transporter, l'offrir. Prête à recevoir l'écriture." },
};

/* ------------------------------------------------------------
   LES TABLEAUX
   ------------------------------------------------------------ */
const SCENES = [
  { id: "uruk",     name: "La cité d'Uruk",       Component: SceneUruk },
  { id: "nil",      name: "Les bords du Nil",      Component: SceneNil },
  { id: "phenicie", name: "La côte phénicienne",   Component: ScenePhenicie },
];

const WHERE = {
  argile: "dans la cité d'Uruk", jetons: "dans la cité d'Uruk", calame: "dans la cité d'Uruk",
  sceau: "dans la cité d'Uruk",
  papyrus_tiges: "sur les bords du Nil", encre: "sur les bords du Nil",
  signes: "sur la côte phénicienne", navires: "sur la côte phénicienne",
};

const HIDDEN_BY_FLAG = {};

/* ------------------------------------------------------------
   LES RECETTES
   ------------------------------------------------------------ */
const RECIPES = [
  { a: "argile", b: "jetons", out: "calculi",
    line: "Tu enfermes les jetons-comptes dans une boule d'argile scellée : le premier REGISTRE. On sait enfin combien de moutons, sans compter de tête." },
  { a: "calculi", b: "calame", out: "tablette_crue",
    line: "Idée lumineuse : plutôt que cacher les jetons, on IMPRIME leur forme sur l'argile plate, au calame. Une tablette naît — mais encore molle." },
  { a: "tablette_crue", b: "four", out: "msg_cuneiforme", msg: true },
  /* MESSAGE PERDU : la même tablette, mais laissée à l'eau. */
  { a: "tablette_crue", b: "eau", out: "msg_effacee", msg: true, perdu: true },
  { a: "sceau", b: "argile", out: "msg_sceau", msg: true },
  { a: "papyrus_tiges", b: "pierre", out: "feuille_papyrus",
    line: "Fendues, pressées, séchées : les tiges se collent en une FEUILLE de papyrus, légère et souple." },
  { a: "feuille_papyrus", b: "encre", out: "msg_hieroglyphes", msg: true },
  { a: "signes", b: "navires", out: "msg_alphabet", msg: true },
];

/* ------------------------------------------------------------
   LES MESSAGES (fiches + jauges 1 à 5)
   ------------------------------------------------------------ */
const MESSAGES = {
  msg_cuneiforme: { title: "Écriture cunéiforme", emoji: "🔠",
    jauges: { vitesse: 2, portee: 2, capacite: 4, durabilite: 5 },
    fact: "Vers −3300, à Uruk, on ne compte plus les moutons de tête : trop nombreux. On presse dans l'argile molle, avec un roseau taillé (le calame), des signes en forme de coins : l'écriture cunéiforme. Elle naît pour la COMPTABILITÉ — stocks de grain, impôts, contrats. Détail énorme : le message survit désormais à celui qui l'a émis, sans se déformer. Fini le récit qui s'abîme d'oreille en oreille (le chapitre 1 !) — l'Histoire, avec un grand H, commence là. Et cuite (souvent par accident, dans l'incendie d'un palais), l'argile devient presque éternelle : on a retrouvé des centaines de milliers de tablettes.",
    wiki: "https://fr.wikipedia.org/wiki/Écriture_cunéiforme" },
  msg_sceau: { title: "Sceau / signature", emoji: "🔏",
    jauges: { vitesse: 2, portee: 2, capacite: 1, durabilite: 5 },
    fact: "Un petit cylindre de pierre gravé, qu'on roule sur l'argile fraîche : il y laisse une empreinte unique, impossible à imiter. Un sceau ne dit pas grand-chose, mais il prouve QUI a écrit, qui possède, qui s'engage. C'est l'ancêtre direct de la signature, du cachet officiel… et, à sa manière, du certificat et de la signature numérique d'aujourd'hui : comment être sûr de l'identité de celui qui envoie un message ?" },
  msg_hieroglyphes: { title: "Hiéroglyphes", emoji: "📜",
    jauges: { vitesse: 3, portee: 2, capacite: 4, durabilite: 2 },
    fact: "En Égypte, on écrit sur du PAPYRUS : les tiges de la plante du Nil, tranchées, pressées, séchées, deviennent une feuille légère qu'on roule et qu'on transporte. Le Nil se change en autoroute à messages. On y trace des hiéroglyphes à l'encre. Mais ce support léger est FRAGILE : sans le climat très sec de l'Égypte, presque rien n'aurait survécu. Et écrire reste le privilège d'une petite élite de scribes — savoir écrire, c'est déjà un pouvoir." },
  msg_alphabet: { title: "Alphabet phénicien", emoji: "🔤",
    jauges: { vitesse: 2, portee: 4, capacite: 3, durabilite: 3 },
    fact: "Les Phéniciens, marchands de toute la Méditerranée, en ont assez des centaines de signes du cunéiforme et des hiéroglyphes. Ils ramènent tout à ~22 signes, un par son : l'ALPHABET. Un code simple s'apprend vite et se diffuse partout — porté non par un empire, mais par le COMMERCE, de port en port. Nos lettres A, B, C en descendent (alpha, bêta…). La leçon : pour toucher le plus de monde, un code simple bat un code savant." },
  /* MESSAGE PERDU */
  msg_effacee: { title: "Tablette effacée", emoji: "🟫", perdu: true,
    jauges: { vitesse: 1, portee: 1, capacite: 3, durabilite: 1 },
    fact: "Tu avais tout écrit sur l'argile… mais tu l'as laissée molle, sous la pluie. En une nuit, elle est redevenue une motte de boue : le message a fondu. Terrible ironie de l'archéologie : les tablettes qui nous sont parvenues sont souvent celles qu'un INCENDIE a cuites par accident. Sans cette chance, elles auraient disparu comme celle-ci. La survie d'un message tient parfois à un pur hasard." },
};

/* ------------------------------------------------------------
   LES INDICES (bouton 💡)
   ------------------------------------------------------------ */
const HINTS = [
  { needs: ["argile", "jetons"], out: "calculi", text: "Trop de jetons à retenir. Et si tu les scellais tous ensemble dans une boule d'argile ?" },
  { needs: ["calculi", "calame"], out: "tablette_crue", text: "Pourquoi cacher les jetons dans une boule ? Aplatis l'argile et imprimes-y leur forme au calame." },
  { needs: ["tablette_crue", "four"], out: "msg_cuneiforme", text: "Ta tablette est couverte de signes mais encore molle. Passe-la au feu pour qu'elle traverse le temps." },
  { needs: ["tablette_crue", "eau"], out: "msg_effacee", text: "Surtout, ne laisse pas cette tablette molle dehors : l'eau la guette…" },
  { needs: ["sceau", "argile"], out: "msg_sceau", text: "Ton cylindre gravé, roule-le sur un peu d'argile fraîche : il y laissera ta marque." },
  { needs: ["papyrus_tiges", "pierre"], out: "feuille_papyrus", text: "Ces tiges de papyrus : fends-les, puis écrase-les bien sous une pierre lourde." },
  { needs: ["feuille_papyrus", "encre"], out: "msg_hieroglyphes", text: "Une belle feuille lisse, un roseau, de l'encre… trace tes hiéroglyphes." },
  { needs: ["signes", "navires"], out: "msg_alphabet", text: "Ces 22 signes si simples : confie-les aux navires marchands, ils les porteront de port en port." },
];

const NEAR_MISS = [
  { pair: ["jetons", "calame"], line: "Graver des jetons un par un ? Tu y passerais la nuit. Il te faut d'abord les rassembler dans l'argile." },
  { pair: ["argile", "four"], line: "Cuire de l'argile vierge te donne… une brique. Jolie, mais elle ne raconte rien. Écris D'ABORD." },
  { pair: ["papyrus_tiges", "encre"], line: "Écrire sur des tiges brutes ? L'encre coule entre les fibres. Fabrique d'abord une vraie feuille." },
  { pair: ["sceau", "four"], line: "Cuire ton sceau de pierre ? Il ne craint pas le feu — mais ce n'est pas là qu'il laisse un message. Roule-le sur l'argile." },
  { pair: ["navires", "argile"], line: "Charger des tonnes d'argile sur un navire ? Il coule. Les Phéniciens, eux, transportent quelque chose de bien plus léger : une idée." },
];

const FAIL_LINES = [
  "Bzzt. Ni Sumer ni l'Égypte n'ont retenu cette idée.",
  "Combinaison rejetée. Un support, un outil : reviens aux bases.",
  "Mes archives cunéiformes restent muettes là-dessus. Réessaie.",
  "Erreur : ces deux-là ne feront pas un message.",
  "Zéro invention détectée. On tente autre chose ?",
];

const INTRO = [
  "Enfin ! Ici, on ne compte plus les moutons de tête : on ÉCRIT. Uruk, vers −3300 — et devine pourquoi l'écriture est née : pour les impôts, pas pour la poésie.",
  "Trois personnes, trois murs à briser. Le comptable du temple n'arrive plus à suivre les livraisons. Le scribe du pharaon veut un support léger pour porter ses ordres au loin. Le marchand phénicien rêve d'un code si simple qu'on l'apprend en un jour.",
  "Aide-les : chaque écriture inventée recharge ma jauge. Trois, et on file vers l'Antiquité. Argile d'Uruk, papyrus du Nil, côte des Phéniciens — à toi.",
];

const ACTIONS = {
  wreck: { mood: "vexe", say: "Oui, encore un atterrissage « créatif ». Note-le sur une tablette si tu veux, mais recharge-moi d'abord." },

  /* LES GENS DE L'ÉCRITURE NAISSANTE — `bubble` = leurs paroles, `say` = MARTINE. */
  comptable: { mood: "vexe",
    bubble: "Ce matin, le berger jure qu'il a livré vingt moutons. Le prêtre en a noté dix-huit. Aucun des deux ne ment : ils ont juste OUBLIÉ ! Le temple reçoit de l'orge, de l'huile, des bêtes toute la journée. Il me faudrait une trace qu'on ne puisse pas discuter.",
    say: "Et c'est comme ça, pour compter, que naît l'écriture. Donne-lui de l'argile et un roseau taillé." },

  scribe: { mood: "neutre",
    bubble: "L'argile, c'est solide : ça durera mille ans. Mais le pharaon veut que son ordre parte à l'autre bout du royaume, et ce pauvre âne n'en porte que vingt tablettes ! Il me faudrait un support LÉGER. Quelque chose qui pousse ici, au bord de l'eau…",
    say: "Léger et transportable : le papyrus. Plus pratique que l'argile… mais bien plus fragile. On n'a rien sans rien." },

  marchand: { mood: "neutre",
    bubble: "J'ai appris le cunéiforme : sept cents signes ! Des années de travail. Mes marins, eux, ne savent pas écrire — et dans chaque port, il faut noter la cargaison. Il me faudrait un code si SIMPLE qu'on l'apprenne en quelques jours. Vingt signes, trente au plus.",
    say: "Un code simple se répand plus vite qu'un code compliqué : c'est tout le secret de l'alphabet. Tiens, touche la tablette du scribe pour l'essayer toi-même !" },

  /* ouvre le mini-jeu « Écris MARTINE dans le premier alphabet » */
  alphabet: { modal: "alphabet" },
};

/* ------------------------------------------------------------
   LA FICHE DU CHAPITRE
   ------------------------------------------------------------ */
const chapter = {
  id: "03-mesopotamie",
  bandeau: "CHAPITRE 3 · −3300",
  date: "−3300",
  epoque: "Mésopotamie",
  emoji: "🏺",

  titre: "MARTINE",
  sousTitre: "Machine À Remonter le Temps Intelligente Néanmoins Excellente",
  presentationTitre: "Chapitre 3 — Naissance de l'écriture.",
  presentation: "Vers −3300, les humains inventent un outil qui va tout changer : l'écriture. Elle naît de la comptabilité, à Uruk, dans l'argile. Explore la cité d'Uruk, les bords du Nil et la côte phénicienne pour découvrir le cunéiforme, les hiéroglyphes et l'alphabet.",
  accroche: "Grave le cunéiforme 🔠 · scelle ta signature 🔏 · trace des hiéroglyphes 📜 · diffuse l'alphabet 🔤",

  finTitre: "SAUT TEMPOREL RÉUSSI",
  finTexte: "« Circuits rechargés à {pct} %. Tu viens d'assister au grand basculement : l'Histoire commence quand on écrit. Un message peut désormais survivre à son auteur, voyager loin, se copier. Mais tout est encore rare, réservé aux scribes… Prochain saut : l'Antiquité — Grèce, Rome, Pompéi. Là-bas, on va stocker le savoir par centaines de milliers de rouleaux. Que peut-il bien arriver à une bibliothèque ? » — MARTINE",

  required: 3,
  startScene: 0,
  destination: "ANTIQUITÉ",

  items: ITEMS,
  scenes: SCENES,
  where: WHERE,
  hiddenByFlag: HIDDEN_BY_FLAG,
  recipes: RECIPES,
  messages: MESSAGES,
  hints: HINTS,
  nearMiss: NEAR_MISS,
  failLines: FAIL_LINES,
  intro: INTRO,
  actions: ACTIONS,
};

export default chapter;
