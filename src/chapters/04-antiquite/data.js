/* ============================================================
   CHAPITRE 4 — Antiquité : Grèce, Rome, Pompéi (an 79)
   ============================================================
   Même structure que les chapitres précédents. Voir
   docs/AJOUTER-UN-CHAPITRE.md.
   ============================================================ */

import ScenePompei from "./scenes/ScenePompei.jsx";
import SceneAlexandrie from "./scenes/SceneAlexandrie.jsx";
import SceneForum from "./scenes/SceneForum.jsx";

/* ------------------------------------------------------------
   LES ÉLÉMENTS
   ------------------------------------------------------------ */
const ITEMS = {
  /* Villa de Pompéi */
  /* SUPPORT (support: true) : le mur est fixe — on ne le met pas au sac,
     on peint DESSUS (le moteur l'affiche en cyan). */
  enduit:   { name: "Enduit frais", emoji: "🧱", support: true, desc: "Un mur tout juste plâtré, encore humide. Peint maintenant, la couleur entrera DANS le mur." },
  pigments: { name: "Pigments", emoji: "🎨", desc: "Rouge cinabre, bleu égyptien, ocres : les couleurs des maîtres de Pompéi." },
  cire:     { name: "Tablette de cire", emoji: "🟨", desc: "Une planchette de bois remplie de cire. On y écrit… et on peut tout lisser pour recommencer." },
  stylet:   { name: "Stylet", emoji: "✒️", desc: "Pointu d'un côté pour écrire, plat de l'autre pour effacer. L'outil du parfait brouillon." },

  /* Bibliothèque d'Alexandrie */
  papyrus:   { name: "Feuille de papyrus", emoji: "📄", desc: "Une belle feuille lisse, prête à devenir un livre." },
  umbilicus: { name: "Umbilicus", emoji: "🪄", desc: "Le bâton central autour duquel on enroule le papyrus pour en faire un rouleau." },
  batiment:  { name: "La grande bibliothèque", emoji: "🏛", support: true, desc: "Le bâtiment d'Alexandrie : des centaines de milliers de rouleaux y dorment déjà. Ton rouleau y a sa place." },

  /* Forum romain */
  marbre:   { name: "Bloc de marbre", emoji: "⬜", support: true, desc: "Blanc, dense, éternel. De quoi graver ce qui ne doit jamais s'effacer." },
  burin:    { name: "Burin", emoji: "🔨", desc: "Un ciseau et un maillet : pour entailler la pierre, lettre après lettre." },
  peau:     { name: "Peau d'animal", emoji: "🟫", desc: "Une peau brute. Bien préparée, elle deviendra un support solide et durable." },
  chaux:    { name: "Chaux & ponce", emoji: "⚪", desc: "De la chaux pour nettoyer la peau, une pierre ponce pour la lisser : la recette du parchemin." },
  plume:    { name: "Plume & encre", emoji: "🪶", desc: "Une plume taillée et de l'encre : de quoi copier un texte entier." },
  grattoir: { name: "Grattoir", emoji: "🔪", desc: "Une lame pour racler le parchemin. Le parchemin coûte cher : autant le réutiliser…" },

  /* fabriqués */
  volumen:   { name: "Volumen (rouleau)", emoji: "📜", desc: "Une longue bande de papyrus enroulée : on la lit en la déroulant peu à peu. Impossible de « sauter à la page 50 »." },
  parchemin: { name: "Parchemin", emoji: "📃", desc: "Une peau devenue page : lisse, solide, réutilisable… et coûteuse." },
};

/* ------------------------------------------------------------
   LES TABLEAUX
   ------------------------------------------------------------ */
const SCENES = [
  { id: "pompei",     name: "La villa de Pompéi",         Component: ScenePompei },
  { id: "alexandrie", name: "La bibliothèque d'Alexandrie", Component: SceneAlexandrie },
  { id: "forum",      name: "Le forum romain",             Component: SceneForum },
];

const WHERE = {
  pigments: "dans la villa de Pompéi",
  cire: "dans la villa de Pompéi", stylet: "dans la villa de Pompéi",
  papyrus: "à la bibliothèque d'Alexandrie", umbilicus: "à la bibliothèque d'Alexandrie",
  burin: "sur le forum romain", peau: "sur le forum romain",
  chaux: "sur le forum romain", plume: "sur le forum romain", grattoir: "sur le forum romain",
};

const HIDDEN_BY_FLAG = {};

/* ------------------------------------------------------------
   LES RECETTES
   ------------------------------------------------------------ */
const RECIPES = [
  { a: "enduit", b: "pigments", out: "msg_fresque", msg: true },
  { a: "cire", b: "stylet", out: "msg_cire", msg: true },
  { a: "papyrus", b: "umbilicus", out: "volumen",
    line: "Enroulé autour de son bâton, le papyrus devient un VOLUMEN : un rouleau. On le lit en le déroulant — pas moyen de sauter des pages." },
  { a: "volumen", b: "batiment", out: "msg_bibliotheque", msg: true },
  { a: "peau", b: "chaux", out: "parchemin",
    line: "Nettoyée à la chaux, grattée, poncée : la peau devient PARCHEMIN. Solide, durable… mais il en faut un troupeau pour un gros livre." },
  { a: "parchemin", b: "plume", out: "msg_manuscrit", msg: true },
  /* MESSAGE PERDU : le même parchemin, mais gratté pour être réutilisé. */
  { a: "parchemin", b: "grattoir", out: "msg_palimpseste", msg: true, perdu: true },
  { a: "marbre", b: "burin", out: "msg_inscription", msg: true },
];

/* ------------------------------------------------------------
   LES MESSAGES (fiches + jauges 1 à 5)
   ------------------------------------------------------------ */
const MESSAGES = {
  msg_fresque: { title: "Fresque de Pompéi", emoji: "🖼️",
    jauges: { vitesse: 1, portee: 3, capacite: 3, durabilite: 4 },
    fact: "Sur un enduit encore frais, on peint à même le mur : les couleurs pénètrent le plâtre et deviennent le mur lui-même — la fresque. À Pompéi, figée par la cendre du Vésuve en l'an 79, les villas en sont couvertes. Et sur les murs des rues, des milliers de GRAFFITIS — publicités électorales, insultes, déclarations d'amour, comptes de taverne : les « réseaux sociaux » de l'Antiquité, gelés d'un coup par la lave. L'image qui décore, qui vend, qui bavarde." },
  msg_cire: { title: "Tablette de cire", emoji: "🪧",
    jauges: { vitesse: 2, portee: 1, capacite: 2, durabilite: 1 },
    fact: "Une planchette de bois remplie de cire : on y écrit au stylet, puis d'un coup du dos plat on LISSE tout pour recommencer. C'est le premier support réinscriptible de l'Histoire — le brouillon, la liste, l'exercice d'écolier. Il ne dure pas, et c'est justement le but. Son lointain descendant ? L'ardoise… et la mémoire réinscriptible de nos ordinateurs (la RAM), qu'on efface et réécrit des milliards de fois." },
  msg_bibliotheque: { title: "Bibliothèque d'Alexandrie", emoji: "📚",
    jauges: { vitesse: 1, portee: 3, capacite: 5, durabilite: 2 },
    fact: "Rassembler en un seul lieu TOUT le savoir du monde : le rêve d'Alexandrie, jusqu'à ~700 000 rouleaux. Une capacité de stockage inouïe. Mais tout est réuni au même endroit, sur un support fragile… et la bibliothèque disparaît. La leçon-mère de l'archivage, encore vraie aujourd'hui : un stock UNIQUE qui brûle, et tout est perdu. Il faut des copies, des sauvegardes réparties — jamais tous ses œufs dans le même panier." },
  msg_manuscrit: { title: "Manuscrit sur parchemin", emoji: "📖",
    jauges: { vitesse: 2, portee: 2, capacite: 4, durabilite: 4 },
    fact: "Une peau d'animal traitée à la chaux, grattée, poncée : le parchemin. Bien plus solide que le papyrus, il ne craint pas l'humidité et dure des siècles. Mais il coûte cher — parfois un troupeau entier pour un gros livre. Résultat : le savoir écrit redevient un LUXE, réservé à ceux qui peuvent payer. Un meilleur support, oui — mais pour beaucoup moins de gens." },
  msg_inscription: { title: "Inscription monumentale", emoji: "🏛",
    jauges: { vitesse: 1, portee: 3, capacite: 2, durabilite: 5 },
    fact: "Graver la loi dans le marbre, sur le forum, là où tout le monde passe : voilà comment on PUBLIE officiellement dans l'Antiquité. « Nul n'est censé ignorer la loi » prend ici son sens littéral. Lent à produire, immobile… mais public, solennel et quasi éternel. Aujourd'hui encore, on grave dans la pierre ce qu'on veut rendre incontestable : monuments, plaques, mémoriaux." },
  /* MESSAGE PERDU */
  msg_palimpseste: { title: "Palimpseste", emoji: "📜", perdu: true,
    jauges: { vitesse: 1, portee: 1, capacite: 4, durabilite: 1 },
    fact: "Le parchemin est si rare qu'on le RÉUTILISE : on gratte un vieux texte pour en écrire un neuf par-dessus. Le nouveau texte est sauvé… mais l'ancien a disparu, effacé pour récupérer le support. Des œuvres entières de l'Antiquité se sont ainsi évanouies sous d'autres textes. (Parfois, la lumière ultraviolette fait resurgir le texte gratté : le passé qui refait surface.)" },
};

/* ------------------------------------------------------------
   LES INDICES (bouton 💡)
   ------------------------------------------------------------ */
const HINTS = [
  { needs: ["enduit", "pigments"], out: "msg_fresque", text: "Le mur est encore frais. Peins-le MAINTENANT : les couleurs entreront dans le plâtre." },
  { needs: ["cire", "stylet"], out: "msg_cire", text: "Une tablette de cire, un stylet pointu : écris — et souviens-toi que tu pourras tout effacer." },
  { needs: ["papyrus", "umbilicus"], out: "volumen", text: "Cette feuille de papyrus : enroule-la autour du bâton pour en faire un rouleau." },
  { needs: ["volumen", "batiment"], out: "msg_bibliotheque", text: "Ton rouleau mérite une place parmi les autres. Direction le grand bâtiment d'Alexandrie." },
  { needs: ["peau", "chaux"], out: "parchemin", text: "Cette peau : traite-la à la chaux et ponce-la bien pour en faire un parchemin." },
  { needs: ["parchemin", "plume"], out: "msg_manuscrit", text: "Un beau parchemin, une plume : copie un texte entier, page après page." },
  { needs: ["parchemin", "grattoir"], out: "msg_palimpseste", text: "Le parchemin coûte cher… tu pourrais gratter l'ancien texte pour réécrire dessus. Mais que devient l'ancien ?" },
  { needs: ["marbre", "burin"], out: "msg_inscription", text: "Ce bloc de marbre, ce burin : grave-y ce qui doit durer pour l'éternité." },
];

const NEAR_MISS = [
  { pair: ["marbre", "plume"], line: "Écrire sur le marbre à la plume ? L'encre glisse et sèche mal. Le marbre, ça se GRAVE — prends un burin." },
  { pair: ["peau", "plume"], line: "Écrire sur une peau brute, encore poilue ? Prépare-la d'abord : chaux, grattoir, ponce." },
  { pair: ["cire", "burin"], line: "Un burin sur de la cire ? Tu vas traverser la planche. Un simple stylet suffit." },
  { pair: ["papyrus", "plume"], line: "Une feuille volante, ça se perd. Fais-en d'abord un rouleau bien tenu autour de son bâton." },
  { pair: ["volumen", "grattoir"], line: "Gratter un rouleau de papyrus ? Il se déchire. C'est le parchemin, lui, qu'on réutilise." },
];

const FAIL_LINES = [
  "Bzzt. Ni la Grèce ni Rome n'ont retenu cette idée.",
  "Combinaison rejetée. Un support, un outil : reviens aux bases.",
  "Mes archives latines restent muettes là-dessus. Réessaie.",
  "Erreur : ces deux-là ne feront pas un message.",
  "Zéro invention détectée. On tente autre chose ?",
];

const INTRO = [
  "Du marbre, des colonnes… on a changé de standing. Nous voilà à Pompéi, l'an 79. Ne regarde pas trop la montagne, là, au fond : le Vésuve couve — et personne ici ne le sait encore.",
  "Ironie du sort : dans cette ville qui va disparaître, tout le monde veut que ça DURE. Le peintre doit faire parler un mur sans un mot. Le bibliothécaire d'Alexandrie garde tout le savoir du monde sous un seul toit — et n'en dort plus. Le magistrat veut afficher la loi pour que nul ne puisse dire qu'il l'ignorait.",
  "Aide-les à peindre, graver, conserver : chaque message remplit ma jauge. Trois suffiront. Et devine laquelle de ces belles idées va très mal finir…",
];

const ACTIONS = {
  wreck: { mood: "vexe", say: "Oui, je me suis posée dans l'atrium. Non, ce n'était pas prévu. Et non, tu ne graveras pas ça sur le forum." },

  /* LES GENS DE L'ANTIQUITÉ — `bubble` = leurs paroles, `say` = MARTINE. */
  pictor: { mood: "neutre",
    bubble: "Mon maître veut que ses invités, en entrant, sachent TOUT de suite qu'il est riche et cultivé. Sans un mot, juste en regardant les murs ! Alors dis-moi : comment on fait parler un mur ? Et comment éviter que ça ne s'écaille dès l'hiver prochain ?",
    say: "Une image qui frime pour son propriétaire… la publicité existait déjà. Peins-la dans l'enduit FRAIS, elle tiendra." },

  bibliothecaire: { mood: "vexe",
    bubble: "Le roi veut TOUS les livres du monde, ici, sous un seul toit. Chaque navire qui entre au port est fouillé, et le moindre rouleau recopié pour nous. Mais c'est ça qui m'empêche de dormir : tout le savoir du monde dans UN seul bâtiment… Il suffirait d'une flamme.",
    say: "Il a raison d'avoir peur : Alexandrie a brûlé. La grande leçon ? Toujours faire des COPIES de sauvegarde." },

  magistrat: { mood: "vexe",
    bubble: "J'ai fait proclamer la loi par un crieur, sur cette place, devant tout le monde. Le lendemain, la moitié de la ville jurait ne l'avoir jamais entendue ! Il me faut l'afficher pour que PERSONNE ne puisse dire qu'il l'ignorait. Quelque chose que tous voient, et qui ne bouge plus jamais.",
    say: "« Nul n'est censé ignorer la loi. » Pour ça, il faut la graver dans une matière qui dure : le marbre." },
};

/* ------------------------------------------------------------
   LA FICHE DU CHAPITRE
   ------------------------------------------------------------ */
const chapter = {
  id: "04-antiquite",
  bandeau: "CHAPITRE 4 · AN 79",
  date: "an 79",
  epoque: "Antiquité",
  emoji: "🏛",

  titre: "MARTINE",
  sousTitre: "Machine À Remonter le Temps Intelligente Néanmoins Excellente",
  presentationTitre: "Chapitre 4 — L'Antiquité classique.",
  presentation: "De la Grèce à Rome (−500 à 500), l'écrit se diversifie : l'image qui décore les murs, le support qu'on efface et réécrit, et surtout le rêve de tout stocker en un seul lieu. Explore la villa de Pompéi, la bibliothèque d'Alexandrie et le forum romain.",
  accroche: "Peins une fresque 🖼️ · gratte la cire 🪧 · remplis Alexandrie 📚 · grave le marbre 🏛",

  finTitre: "SAUT TEMPOREL RÉUSSI",
  finTexte: "« Circuits rechargés à {pct} %. Tu as vu le meilleur et le pire : la bibliothèque qui rêve de tout garder… et qui brûle. La grande leçon : un savoir sans COPIES ne tient qu'à un fil. Justement, au prochain saut, les humains vont changer le FORMAT du livre (des pages !), puis inventer une machine qui copie tout par centaines : l'imprimerie. Direction le Moyen Âge et Gutenberg. » — MARTINE",

  required: 3,
  startScene: 0,
  destination: "MOYEN ÂGE",

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
