/* ============================================================
   CHAPITRE 5 — Moyen Âge : du codex à Gutenberg (1450)
   ============================================================
   Même structure que les chapitres précédents. Voir
   docs/AJOUTER-UN-CHAPITRE.md.
   ============================================================ */

import SceneScriptorium from "./scenes/SceneScriptorium.jsx";
import SceneChateau from "./scenes/SceneChateau.jsx";
import SceneGutenberg from "./scenes/SceneGutenberg.jsx";

/* ------------------------------------------------------------
   LES ÉLÉMENTS
   ------------------------------------------------------------ */
const ITEMS = {
  /* Le scriptorium */
  parchemin: { name: "Parchemin", emoji: "📃", desc: "Des feuilles de peau prêtes à être écrites. Solides, mais si chères qu'un livre vaut un troupeau." },
  aiguille:  { name: "Aiguille & fil", emoji: "🪡", desc: "Pour plier les feuilles en cahiers et les COUDRE ensemble : c'est ainsi qu'on fabrique un livre à pages." },
  /* SUPPORTS (support: true) : fixes dans le décor — on ne les met pas au
     sac, on leur apporte un objet (le moteur les affiche en cyan). Ici même
     le moine (assis à son pupitre) et la flamme comptent comme « lieux »
     fixes où l'on apporte le codex. */
  moine:     { name: "Le moine copiste", emoji: "🧑‍🦲", support: true, desc: "Penché sur son pupitre, il recopie et enlumine, des mois durant. La patience faite homme." },
  flamme:    { name: "Flamme", emoji: "🔥", support: true, desc: "Une bougie vacille près des parchemins. La hantise du copiste : une abbaye entière peut brûler en une nuit." },

  /* Le château et le bourg */
  fil_laine: { name: "Fil de laine", emoji: "🧶", desc: "Teint de couleurs vives : rouge, ocre, bleu. De quoi broder tout un récit." },
  toile_lin: { name: "Toile de lin", emoji: "🟫", desc: "Une longue bande de lin écru, tendue : la surface d'un immense récit cousu." },
  verre:     { name: "Verre coloré", emoji: "🟦", desc: "Des morceaux de verre teinté dans la masse. Assemblés, ils raconteront à la lumière du jour." },
  plomb:     { name: "Baguettes de plomb", emoji: "⚙️", desc: "De fines rainures de plomb pour sertir les morceaux de verre les uns aux autres." },
  voix:      { name: "Ta voix", emoji: "🗣️", desc: "Le média d'origine, toujours là. Sur une place bondée, elle atteint tous ceux qui ne savent pas lire." },
  place:     { name: "La place du marché", emoji: "🏘️", support: true, desc: "Le cœur du bourg : on y vend, on y échange, on y apprend les nouvelles. Un public tout trouvé." },
  soleil:    { name: "Lumière du jour", emoji: "☀️", support: true, desc: "Le soleil sur la chapelle. Sans elle, un vitrail n'est qu'un mur sombre : c'est la lumière qui, en le traversant, fait vivre les images." },

  /* L'atelier de Gutenberg */
  plomb_fondu: { name: "Plomb fondu", emoji: "🫗", desc: "Un métal en fusion, coulé dans des moules. Il durcit en un instant en petites lettres identiques." },
  moule:       { name: "Moule à lettres", emoji: "🔠", desc: "Une matrice pour couler des caractères tous parfaitement semblables — et réutilisables à l'infini." },
  presse:      { name: "Presse à vis", emoji: "🗜️", support: true, desc: "Une grosse vis qui écrase la feuille sur les lettres encrées. La même page, encore et encore." },

  /* fabriqués */
  vitrail_serti: { name: "Vitrail serti", emoji: "🪟", desc: "Les morceaux de verre, tenus par les baguettes de plomb. Un beau panneau… mais dans la pénombre, il ne raconte rien. Il lui manque la lumière." },
  codex:      { name: "Codex", emoji: "📕", desc: "Des feuilles pliées et cousues : un LIVRE À PAGES qu'on feuillette. Fini le rouleau — on peut sauter à la page voulue." },
  caracteres: { name: "Caractères mobiles", emoji: "🔡", desc: "Des centaines de petites lettres de plomb, qu'on assemble en mots, puis en pages, puis qu'on démonte pour recommencer." },
};

/* ------------------------------------------------------------
   LES TABLEAUX
   ------------------------------------------------------------ */
const SCENES = [
  { id: "scriptorium", name: "Le scriptorium",         Component: SceneScriptorium },
  { id: "chateau",     name: "Le château et le bourg",  Component: SceneChateau },
  { id: "gutenberg",   name: "L'atelier de Gutenberg",  Component: SceneGutenberg },
];

const WHERE = {
  parchemin: "au scriptorium", aiguille: "au scriptorium",
  fil_laine: "au château et au bourg", toile_lin: "au château et au bourg",
  verre: "au château et au bourg", plomb: "au château et au bourg",
  voix: "au château et au bourg",
  plomb_fondu: "à l'atelier de Gutenberg", moule: "à l'atelier de Gutenberg",
};

const HIDDEN_BY_FLAG = {};

/* ------------------------------------------------------------
   LES RECETTES
   ------------------------------------------------------------ */
const RECIPES = [
  { a: "parchemin", b: "aiguille", out: "codex",
    line: "Plié en cahiers, cousu, relié : voici le CODEX — un livre à pages. Révolution du format : on l'annote, on l'indexe, on saute où l'on veut." },
  { a: "codex", b: "moine", out: "msg_manuscrit", msg: true },
  /* MESSAGE PERDU : le même codex, mais pris dans un incendie. */
  { a: "codex", b: "flamme", out: "msg_oeuvre", msg: true, perdu: true },
  { a: "fil_laine", b: "toile_lin", out: "msg_broderie", msg: true },
  /* le vitrail se fait en 2 temps : on SERTIT le verre dans le plomb, puis
     il faut la LUMIÈRE DU JOUR pour qu'il « raconte ». Un vitrail dans le
     noir n'est qu'un mur : c'est le medium (la lumière) qui fait le message. */
  { a: "verre", b: "plomb", out: "vitrail_serti",
    line: "Tu sertis les morceaux de verre dans les rainures de plomb : un panneau prend forme. Mais posé contre un mur sombre, il reste éteint et muet…" },
  { a: "vitrail_serti", b: "soleil", out: "msg_vitrail", msg: true },
  { a: "voix", b: "place", out: "msg_crieur", msg: true },
  { a: "plomb_fondu", b: "moule", out: "caracteres",
    line: "Coulé dans le moule, le plomb donne des centaines de lettres identiques : les CARACTÈRES MOBILES. On les assemble, on imprime, on démonte, on recommence." },
  { a: "caracteres", b: "presse", out: "msg_imprimerie", msg: true },
];

/* ------------------------------------------------------------
   LES MESSAGES (fiches + jauges 1 à 5)
   ------------------------------------------------------------ */
const MESSAGES = {
  msg_manuscrit: { title: "Manuscrit enluminé", emoji: "📖",
    jauges: { vitesse: 2, portee: 2, capacite: 4, durabilite: 4 },
    fact: "Au scriptorium, des moines copient les livres à la main, un par un, pendant des mois. Ils enluminent les pages : lettrines dorées, miniatures peintes. Le résultat est magnifique… mais chaque livre coûte une fortune et prend une éternité. Le savoir écrit reste rare, cher, et CONTRÔLÉ par l'Église : celui qui copie choisit ce qui sera recopié — donc ce qui survivra." },
  msg_broderie: { title: "Broderie de Bayeux", emoji: "🧵",
    jauges: { vitesse: 1, portee: 3, capacite: 4, durabilite: 4 },
    fact: "Près de 70 mètres de lin brodé de laine, racontant en images la conquête de l'Angleterre par Guillaume en 1066. Une BD géante, lisible même par ceux qui ne lisent pas les mots. Mais cette histoire est racontée du point de vue du VAINQUEUR, commandée par ses proches : c'est de la propagande. La question à se poser devant tout message : qui l'a commandé, et pour dire quoi ? (Étonnamment, cette broderie fragile a survécu près de 1000 ans.)" },
  msg_vitrail: { title: "Vitrail", emoji: "🌈",
    jauges: { vitesse: 1, portee: 3, capacite: 3, durabilite: 5 },
    fact: "Dans les cathédrales, on raconte la Bible en verre coloré et plomb : le vitrail. Dans un monde où presque personne ne sait lire, l'image lumineuse EST le média — la « bande dessinée » de pierre et de couleur, animée par la lumière du jour. Un principe toujours vrai : un bon média s'adapte à son public. Et le verre traverse les siècles — beaucoup de vitraux médiévaux brillent encore." },
  msg_crieur: { title: "Crieur public", emoji: "📣",
    jauges: { vitesse: 3, portee: 2, capacite: 2, durabilite: 1 },
    fact: "« Oyez, oyez ! » Sur la place du marché, le crieur annonce à voix haute les nouvelles, les lois, les ventes — pour les 95 % de gens qui ne savent pas lire. C'est l'information officielle… mais à sens unique et CONTRÔLÉE : le crieur ne dit que ce que le pouvoir veut faire savoir. Rapide et vivant — mais l'instant d'après, il n'en reste rien : la parole s'envole, comme la veillée de la Préhistoire." },
  msg_imprimerie: { title: "Imprimerie de Gutenberg", emoji: "🖨️",
    jauges: { vitesse: 3, portee: 5, capacite: 4, durabilite: 3 },
    fact: "Vers 1450, à Mayence, Gutenberg assemble des lettres de plomb mobiles et une presse à vis : la même page peut être tirée à des centaines d'exemplaires, vite et à bas prix. C'est LE grand basculement de l'histoire des médias. Les livres se multiplient, leur prix s'effondre, les lecteurs explosent — et les idées ÉCHAPPENT au contrôle (la Réforme se diffuse par l'imprimé). Pour la première fois, un message touche des MASSES. Journaux, tracts, affiches : tout en découle." },
  /* MESSAGE PERDU */
  msg_oeuvre: { title: "Œuvre disparue", emoji: "📕", perdu: true,
    jauges: { vitesse: 1, portee: 1, capacite: 4, durabilite: 1 },
    fact: "Ce livre n'existait qu'en UN seul exemplaire, copié à la main. Une bougie renversée, un incendie d'abbaye… et il disparaît pour toujours, avec tout ce qu'il contenait. Combien d'œuvres se sont ainsi évanouies ? Tant qu'un texte n'existe qu'en un exemplaire, il ne tient qu'à un fil. La bonne nouvelle arrive justement : en multipliant les copies, l'imprimerie va rendre les œuvres bien plus difficiles à faire disparaître." },
};

/* ------------------------------------------------------------
   LES INDICES (bouton 💡)
   ------------------------------------------------------------ */
const HINTS = [
  { needs: ["parchemin", "aiguille"], out: "codex", text: "Ces feuilles de parchemin : plie-les en cahiers et couds-les ensemble pour faire un vrai livre à pages." },
  { needs: ["codex", "moine"], out: "msg_manuscrit", text: "Ton codex est vierge. Confie-le au moine copiste : il le recopiera et l'enluminera." },
  { needs: ["codex", "flamme"], out: "msg_oeuvre", text: "Attention à cette bougie près de ton codex unique… un rien, et tout part en fumée." },
  { needs: ["fil_laine", "toile_lin"], out: "msg_broderie", text: "Du fil de laine, une longue toile de lin : brode un récit tout entier, image après image." },
  { needs: ["verre", "plomb"], out: "vitrail_serti", text: "Ces morceaux de verre coloré : sertis-les dans le plomb pour former le panneau du vitrail." },
  { needs: ["vitrail_serti", "soleil"], out: "msg_vitrail", text: "Ton vitrail est monté, mais éteint. Place-le face à la lumière du jour : elle le traversera et fera vivre les images." },
  { needs: ["voix", "place"], out: "msg_crieur", text: "Sur la place du marché bondée, ta voix peut annoncer les nouvelles à ceux qui ne lisent pas." },
  { needs: ["plomb_fondu", "moule"], out: "caracteres", text: "Coule le plomb fondu dans le moule à lettres : tu obtiendras des caractères tous identiques." },
  { needs: ["caracteres", "presse"], out: "msg_imprimerie", text: "Range tes caractères en pages, encre-les, et écrase la feuille avec la presse à vis. Encore. Et encore." },
];

const NEAR_MISS = [
  { pair: ["parchemin", "moine"], line: "Le moine fixe ta feuille volante avec perplexité. Fais-en d'abord un livre : plie, couds, relie." },
  { pair: ["voix", "flamme"], line: "Crier au feu ? Utile, mais ce n'est pas un message pour le futur. Trouve un vrai public." },
  { pair: ["verre", "presse"], line: "Écraser du verre coloré sous la presse ? Tu obtiens des miettes brillantes. Le verre se sertit au plomb, pas à la vis." },
  { pair: ["verre", "soleil"], line: "Tu lèves tes bouts de verre coloré vers le soleil : joli reflet ! Mais sans plomb pour les tenir ensemble, ça reste des morceaux épars, pas un vitrail." },
  { pair: ["caracteres", "moine"], line: "Le pauvre moine regarde tes lettres de plomb d'un air inquiet : elles vont lui voler son travail. Il te faut une presse, pas un copiste." },
  { pair: ["fil_laine", "aiguille"], line: "Broder sans support ? Il te faut une grande toile de lin à couvrir." },
];

const FAIL_LINES = [
  "Bzzt. Le Moyen Âge n'a pas retenu cette idée.",
  "Combinaison rejetée. Un support, un outil : reviens aux bases.",
  "Mes archives médiévales restent muettes là-dessus. Réessaie.",
  "Erreur : ces deux-là ne feront pas un message.",
  "Zéro invention détectée. On tente autre chose ?",
];

const INTRO = [
  "Le Moyen Âge. Dehors, la peste rôde et vide des villages entiers ; et le peu qu'on sait pour soigner dort dans des livres qu'un seul moine recopie… à la bougie.",
  "Trois personnes, un même combat : sauver le savoir. Le copiste met huit mois par livre et tremble pour ses remèdes si le feu prend. Le crieur doit annoncer la maladie à une foule qui ne sait pas lire. Et un certain Gutenberg rêve de copier tout par milliers.",
  "Aide-les : chaque trace recharge ma jauge. Trois suffiront. Car à la fin de cette époque, la machine de Gutenberg va TOUT changer…",
];

const ACTIONS = {
  wreck: { mood: "vexe", say: "Oui, j'ai atterri dans le cloître. Le moine a cru à un miracle. Je l'ai laissé croire. Recharge-moi avant qu'il ne prévienne l'évêque." },

  /* LES GENS DU MOYEN ÂGE — `bubble` = leurs paroles, `say` = MARTINE. */
  copiste: { mood: "neutre",
    bubble: "Voilà huit mois que je recopie ce traité de remèdes — presque les seuls qu'on ait contre la peste qui vide les villages. Huit mois pour UN exemplaire ! Et il n'existe qu'ici, sur ce pupitre, avec cette bougie qui vacille juste à côté. Si le feu prenait, ces remèdes disparaîtraient avec lui.",
    say: "Un seul exemplaire, rare et cher : le savoir reste fragile et contrôlé par l'Église. Fais-en d'abord un vrai livre à pages." },

  crieur: { mood: "neutre",
    bubble: "Regarde cette place : trois cents personnes. Et là-dedans, peut-être quinze qui savent lire. QUINZE ! L'affiche du seigneur, autant la coller au fond d'un puits. Alors dis-moi : comment on annonce quelque chose à des gens qui ne lisent pas ?",
    say: "À la voix ! L'info officielle pour les 95 % qui ne lisent pas… mais à sens unique, et il n'en reste rien une fois criée." },

  gutenberg: { mood: "neutre",
    bubble: "Un moine met huit mois à copier un livre, et il y glisse forcément des fautes. Moi, j'en veux MILLE, tous exactement pareils ! J'ai gravé la page entière dans ce bloc de bois : une seule faute, et on jette tout. Il me faudrait des lettres SÉPARÉES, qu'on range, qu'on démonte, et qu'on réutilise pour la page d'après.",
    say: "Ça, c'est LA grande idée : les caractères mobiles. Fonds-lui des lettres de plomb, et donne-lui une presse." },
};

/* ------------------------------------------------------------
   LA FICHE DU CHAPITRE
   ------------------------------------------------------------ */
const chapter = {
  id: "05-moyen-age",
  bandeau: "CHAPITRE 5 · 1450",
  date: "1450",
  epoque: "Moyen Âge",
  emoji: "📖",

  titre: "MARTINE",
  sousTitre: "Machine À Remonter le Temps Intelligente Néanmoins Excellente",
  presentationTitre: "Chapitre 5 — Du codex à Gutenberg.",
  presentation: "Du Ve siècle à 1450, le livre change de forme (le codex à pages), reste rare et cher (copié à la main par les moines)… puis l'imprimerie fait tout basculer. Explore le scriptorium, le château et son bourg, et l'atelier de Gutenberg.",
  accroche: "Relie un codex 📕 · brode Bayeux 🧵 · sertis un vitrail 🌈 · crie sur la place 📣 · imprime avec Gutenberg 🖨️",

  finTitre: "SAUT TEMPOREL RÉUSSI",
  finTexte: "« Circuits rechargés à {pct} %. Tu viens de vivre LE grand basculement : avec l'imprimerie, un message touche enfin des masses, et les idées échappent au contrôle. Regarde ta frise depuis la Préhistoire : la portée et la capacité ont explosé… mais tu remarques autre chose ? Ce qui est rapide et puissant dure de moins en moins. Garde ça en tête. Prochain saut : les Temps modernes, la presse, le télégraphe — le monde va se mettre à accélérer pour de bon. » — MARTINE",

  required: 3,
  startScene: 0,
  destination: "TEMPS MODERNES",

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
