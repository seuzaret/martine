/* ============================================================
   CHAPITRE 5 — Moyen Âge : du manuscrit à l'imprimerie (1450)
   ============================================================
   2 périodes, façon Mésopotamie (navigation guidée) :
   AVANT l'imprimerie — le château du seigneur Charles Bannister
   (la broderie de ses exploits) puis le monastère du moine Jorge
   (assembler le codex, commander une copie de Galien, et PAYER la
   note salée : un livre coûtait une fortune).
   APRÈS — l'atelier de Gutenberg : la presse qui change tout.
   ============================================================ */

import SceneChateau from "./scenes/SceneChateau.jsx";
import SceneMonastere from "./scenes/SceneScriptorium.jsx";
import SceneGutenberg from "./scenes/SceneGutenberg.jsx";
import { PortraitCharles, PortraitJorge } from "./scenes/portraits.jsx";

/* ------------------------------------------------------------
   LES ÉLÉMENTS
   ------------------------------------------------------------ */
const ITEMS = {
  /* Le château */
  fil_laine: { name: "Fil de laine coloré", emoji: "🧶", desc: "Teint de couleurs vives : rouge, ocre, bleu. De quoi broder tout un récit, image après image." },
  toile_lin: { name: "Toile de lin", emoji: "🟫", desc: "Une longue bande de lin écru, tendue sur le mur : la surface d'un immense récit cousu." },

  /* Le monastère */
  parchemin: { name: "Feuilles de parchemin", emoji: "📃", desc: "Des feuilles de peau prêtes à écrire. Si chères qu'un livre entier vaut un troupeau." },
  aiguille:  { name: "Aiguille & fil à relier", emoji: "🪡", desc: "Pour plier les feuilles en cahiers et les COUDRE : c'est ainsi qu'on fabrique un livre à pages." },
  /* SUPPORTS (support:true) : fixes, on leur APPORTE un objet (cyan). */
  rayon:     { name: "Les rayonnages", emoji: "📚", support: true, desc: "Les étagères du scriptorium, où dorment les précieux manuscrits recopiés à la main." },
  flamme:    { name: "Flamme de la bougie", emoji: "🔥", support: true, desc: "Une bougie vacille près des parchemins. La hantise du copiste : une abbaye entière peut brûler en une nuit." },

  /* L'atelier de Gutenberg */
  plomb_fondu: { name: "Plomb fondu", emoji: "🫗", desc: "Un métal en fusion, coulé dans des moules. Il durcit en un instant en petites lettres identiques." },
  moule:       { name: "Moule à lettres", emoji: "🔠", desc: "Une matrice pour couler des caractères tous semblables — et réutilisables à l'infini." },
  presse:      { name: "Presse à vis", emoji: "🗜️", support: true, desc: "Une grosse vis qui écrase la feuille sur les lettres encrées. La même page, encore et encore." },

  /* fabriqués */
  codex:      { name: "Codex (livre à pages)", emoji: "📕", desc: "Des feuilles pliées et cousues : un LIVRE À PAGES qu'on feuillette. Fini le rouleau — on saute à la page voulue." },
  caracteres: { name: "Caractères mobiles", emoji: "🔡", desc: "Des centaines de petites lettres de plomb, qu'on assemble en mots, puis en pages, puis qu'on démonte pour recommencer." },
};

/* ------------------------------------------------------------
   LES TABLEAUX (2 périodes ; navigation guidée = linéaire)
   nextWhen : ce qu'il faut avoir fait pour PARTIR au lieu suivant.
   ------------------------------------------------------------ */
const SCENES = [
  { id: "chateau",   name: "Le château de Charles Bannister", Component: SceneChateau,  nextWhen: ["msg_broderie"] },
  { id: "monastere", name: "Le monastère du frère Jorge",      Component: SceneMonastere, nextWhen: ["paye"] },
  { id: "gutenberg", name: "L'atelier de Gutenberg",           Component: SceneGutenberg },
];

const WHERE = {
  fil_laine: "au château", toile_lin: "au château",
  parchemin: "au monastère", aiguille: "au monastère",
  plomb_fondu: "à l'atelier de Gutenberg", moule: "à l'atelier de Gutenberg",
};

const HIDDEN_BY_FLAG = {};

/* ------------------------------------------------------------
   LES RECETTES
   ------------------------------------------------------------ */
const RECIPES = [
  /* Château : la broderie des exploits (façon Bayeux) */
  { a: "fil_laine", b: "toile_lin", out: "msg_broderie", msg: true },

  /* Monastère : assembler le codex, puis le confier au rayon (manuscrit) */
  { a: "parchemin", b: "aiguille", out: "codex",
    line: "Plié en cahiers, cousu, relié : voici le CODEX — un livre à pages. Révolution du format : on l'annote, on l'indexe, on saute où l'on veut." },
  { a: "codex", b: "rayon", out: "msg_manuscrit", msg: true },
  /* MESSAGE PERDU : le codex unique pris dans un incendie. */
  { a: "codex", b: "flamme", out: "msg_oeuvre", msg: true, perdu: true },

  /* Gutenberg : les caractères mobiles + la presse */
  { a: "plomb_fondu", b: "moule", out: "caracteres",
    line: "Coulé dans le moule, le plomb donne des centaines de lettres identiques : les CARACTÈRES MOBILES. On les assemble, on imprime, on démonte, on recommence." },
  { a: "caracteres", b: "presse", out: "msg_imprimerie", msg: true },
];

/* ------------------------------------------------------------
   LES MESSAGES (fiches + jauges 1 à 5)
   ------------------------------------------------------------ */
const MESSAGES = {
  msg_broderie: { title: "Broderie de Bayeux", emoji: "🧵",
    jauges: { vitesse: 1, portee: 3, capacite: 4, durabilite: 4 },
    fact: "Près de 70 mètres de lin brodé de laine, racontant en images la conquête de l'Angleterre par Guillaume en 1066. Une BD géante, lisible même par ceux qui ne lisent pas les mots. Mais cette histoire est celle du VAINQUEUR, commandée par ses proches : c'est de la propagande. La question à se poser devant tout message : qui l'a commandé, et pour dire quoi ? (Étonnamment, cette broderie fragile a survécu près de 1000 ans.)",
    wiki: "https://fr.wikipedia.org/wiki/Tapisserie_de_Bayeux" },
  msg_manuscrit: { title: "Manuscrit enluminé", emoji: "📖",
    jauges: { vitesse: 2, portee: 2, capacite: 4, durabilite: 4 },
    fact: "Au scriptorium, des moines copient les livres à la main, un par un, pendant des mois. Ils enluminent les pages : lettrines dorées, miniatures peintes. Le résultat est magnifique… mais chaque livre coûte une fortune et prend une éternité. Le savoir écrit reste rare, cher, et CONTRÔLÉ par l'Église : celui qui copie choisit ce qui sera recopié — donc ce qui survivra." },
  msg_imprimerie: { title: "Imprimerie de Gutenberg", emoji: "🖨️",
    jauges: { vitesse: 3, portee: 5, capacite: 4, durabilite: 3 },
    fact: "Vers 1450, à Mayence, Gutenberg assemble des lettres de plomb mobiles et une presse à vis : la même page peut être tirée à des centaines d'exemplaires, vite et à bas prix. C'est LE grand basculement de l'histoire des médias. Les livres se multiplient, leur prix s'effondre, les lecteurs explosent — et les idées ÉCHAPPENT au contrôle (la Réforme se diffuse par l'imprimé). Pour la première fois, un message touche des MASSES. Journaux, tracts, affiches : tout en découle." },
  /* MESSAGE PERDU */
  msg_oeuvre: { title: "Œuvre disparue", emoji: "📕", perdu: true,
    jauges: { vitesse: 1, portee: 1, capacite: 4, durabilite: 1 },
    fact: "Ce livre n'existait qu'en UN seul exemplaire, copié à la main. Une bougie renversée, un incendie d'abbaye… et il disparaît pour toujours, avec tout ce qu'il contenait. Combien d'œuvres se sont ainsi évanouies ? Tant qu'un texte n'existe qu'en un exemplaire, il ne tient qu'à un fil. La bonne nouvelle arrive justement : en multipliant les copies, l'imprimerie va rendre les œuvres bien plus difficiles à faire disparaître." },
};

/* ------------------------------------------------------------
   LA FACTURE du livre de Galien (modifiable par l'enseignant).
   `euroParLt` : ordre de grandeur d'un « livre tournois » en euros
   d'aujourd'hui, pour saisir le prix fou d'un livre médiéval.
   ------------------------------------------------------------ */
const FACTURE = {
  titre: "La note du frère Jorge — une copie du traité de Galien",
  lignes: [
    { poste: "Acquérir le traité de Galien (le trouver, négocier)", lt: 8 },
    { poste: "Parchemin & reliure du codex", lt: 6 },
    { poste: "Copie à la main (un an de travail du moine)", lt: 10 },
    { poste: "Enluminures & lettrines à l'or fin", lt: 5 },
    { poste: "Transport par escorte sûre", lt: 1 },
  ],
  euroParLt: 150,
  note: "30 livres tournois, c'était PLUSIEURS ANNÉES de salaire d'un ouvrier — le prix d'une petite maison. Un seul livre valait un trésor : voilà pourquoi le savoir restait réservé aux riches et à l'Église… jusqu'à l'imprimerie.",
  coins: [10, 5, 1],
};

/* ------------------------------------------------------------
   LES INDICES (bouton 💡)
   ------------------------------------------------------------ */
const HINTS = [
  { needs: ["fil_laine", "toile_lin"], out: "msg_broderie", text: "Du fil de laine coloré, une longue toile de lin : brode les exploits du seigneur, image après image." },
  { needs: ["parchemin", "aiguille"], out: "codex", text: "Ces feuilles de parchemin : plie-les en cahiers et couds-les pour faire un vrai livre à pages." },
  { needs: ["codex", "rayon"], out: "msg_manuscrit", text: "Ton codex recopié et enluminé : range-le sur les rayonnages, parmi les précieux manuscrits." },
  { needs: ["codex", "flamme"], out: "msg_oeuvre", text: "Attention à cette bougie près de ton codex unique… un rien, et tout part en fumée." },
  { needs: ["plomb_fondu", "moule"], out: "caracteres", text: "Coule le plomb fondu dans le moule à lettres : tu obtiendras des caractères tous identiques." },
  { needs: ["caracteres", "presse"], out: "msg_imprimerie", text: "Range tes caractères en pages, encre-les, et écrase la feuille avec la presse à vis. Encore. Et encore." },
];

const NEAR_MISS = [
  { pair: ["parchemin", "rayon"], line: "Ranger une feuille volante sur l'étagère ? Fais-en d'abord un livre : plie, couds, relie." },
  { pair: ["fil_laine", "aiguille"], line: "Broder sans support ? Il te faut une grande toile de lin à couvrir." },
  { pair: ["caracteres", "flamme"], line: "Approcher tes lettres de plomb de la flamme ? Le plomb fond ! Garde-les pour la presse." },
  { pair: ["plomb_fondu", "presse"], line: "Écraser du plomb fondu à la presse ? Coule-le d'abord en LETTRES dans le moule." },
];

const FAIL_LINES = [
  "Bzzt. Le Moyen Âge n'a pas retenu cette idée.",
  "Combinaison rejetée. Un support, un outil : reviens aux bases.",
  "Mes archives médiévales restent muettes là-dessus. Réessaie.",
  "Erreur : ces deux-là ne feront pas un message.",
  "Zéro invention détectée. On tente autre chose ?",
];

const INTRO = [
  "Le Moyen Âge, vers 1450. Dehors, la peste rôde et vide des villages entiers ; et le peu qu'on sait pour soigner dort dans des livres qu'un seul moine recopie… à la bougie.",
  "Le seigneur Charles Bannister t'accueille dans son château : aide-le à gérer son domaine. Il veut d'abord qu'on brode ses exploits. Puis, un paysan supplie qu'on soigne son fils — et le remède est dans un livre, au monastère.",
  "Tu iras chez le frère Jorge assembler un codex et PAYER la copie de Galien (accroche-toi, c'est cher !). Alors seulement s'ouvrira la grande nouveauté : l'imprimerie. Trois traces me suffisent pour repartir.",
];

const ACTIONS = {
  wreck: { mood: "vexe", say: "Oui, j'ai atterri dans la cour du château. Les gardes ont cru à un dragon de fer. Recharge-moi avant qu'ils ne sortent les lances." },

  /* Charles Bannister & le frère Jorge : leurs vraies répliques sont dans QUETE. */
  charles: { mood: "neutre",
    bubble: "Je suis Charles Bannister, seigneur de ce château. Sers-moi bien, l'étranger, et tu seras logé et nourri.",
    say: "Un seigneur médiéval : il tient la terre, la justice, et veut qu'on chante sa gloire." },
  jorge: { mood: "neutre",
    bubble: "Bienvenue au monastère, voyageur. Ici, nous gardons et recopions le savoir du monde, une page à la fois.",
    say: "Le moine copiste : la mémoire du monde tient sur ses épaules… et sur une seule bougie." },
  gutenberg: { mood: "neutre",
    bubble: "Un moine met un an à copier un livre, et y glisse des fautes. Moi, j'en veux MILLE, tous pareils ! Il me faut des lettres SÉPARÉES, qu'on range et qu'on réutilise.",
    say: "Ça, c'est LA grande idée : les caractères mobiles. Fonds-lui des lettres de plomb, et donne-lui une presse." },

  /* le paysan et le prêtre, devant le trône (contexte de la quête de Galien) */
  paysan: { mood: "vexe",
    bubble: "Pitié, mon seigneur ! Mon fils brûle de fièvre. Le médecin est parti soigner les pestiférés… Où trouver un remède ?",
    say: "La peste vide les villages, et les médecins manquent. Le savoir qui sauve est enfermé dans de rares livres." },
  pretre: { mood: "neutre",
    bubble: "Le savoir des médecins anciens — Galien, Hippocrate — dort dans les livres des monastères. Le seigneur en a justement commandé une copie au frère Jorge. Va la chercher… mais prépare ta bourse.",
    say: "Le remède existe, écrit noir sur blanc dans un traité de Galien. Mais un livre coûte une fortune : direction le monastère." },

  /* ouvre la FACTURE + le jeu de paiement (quand le codex/manuscrit est prêt) */
  facture: { modal: "facture" },
};

/* ------------------------------------------------------------
   LA QUÊTE — Charles au château, Jorge au monastère.
   ------------------------------------------------------------ */
const QUETE = [
  { perso: "charles", portrait: "charles", auto: true,
    bubble: "Approche, l'étranger ! Je suis Charles Bannister, seigneur de ces terres. Aide-moi à tenir mon château et tu seras des nôtres. Pour commencer : je veux que mes exploits guerriers soient racontés à tous, sur une grande tenture — que chacun sache qui je suis, même ceux qui ne lisent pas.",
    say: "Un seigneur qui veut sa gloire en images : la BD géante de l'époque, façon broderie de Bayeux. Fil de laine coloré + la grande toile de lin, au fond de la salle.",
    attend: "msg_broderie",
    suite: "Superbe tenture ! Mais écoute ce paysan agenouillé : la peste brûle son fils, et le médecin est parti soigner les pestiférés. Le remède dort dans un traité de Galien que j'ai fait copier au monastère. Va le chercher chez le frère Jorge — et prépare ta bourse, un livre ne se donne pas. Le signal t'y mènera." },

  { perso: "jorge", portrait: "jorge",
    bubble: "Bienvenue au monastère, voyageur. Tu viens pour la commande du seigneur ? Elle sera prête — mais d'abord, aide-moi à assembler ce codex : plie les feuilles de parchemin, couds-les, et range-le aux rayonnages. On garde ainsi le savoir du monde, une page à la fois.",
    say: "Assemble le livre : parchemin + aiguille → codex, puis range-le aux rayonnages (il devient un manuscrit enluminé). Ensuite, Jorge te présentera sa note…",
    attend: "msg_manuscrit",
    suite: "Beau travail ! Le frère Jorge va maintenant chercher ta commande — et te présenter l'addition. Ouvre la NOTE DE FRAIS (elle brille près du pupitre) et règle-la." },

  { perso: "jorge", portrait: null,
    bubble: "Voici ta copie du traité de Galien, recopiée et enluminée à la main pendant près d'un an. Mais un livre ne se donne pas, voyageur : règle d'abord ma note. Tu verras ce que coûte le savoir, en ce temps-là.",
    say: "La note de frais brille près du pupitre : ouvre-la, découvre le prix FOU d'un livre médiéval, et paie la somme exacte avec les pièces.",
    attend: "paye",
    suite: "Payé ! Tu emportes le traité de Galien : le fils du paysan sera soigné. Reste à découvrir la merveille qui va TOUT changer — l'atelier de Gutenberg. Le signal t'y conduit." },

  { perso: "gutenberg", portrait: null,
    bubble: "Bienvenue dans mon atelier ! Regarde cette merveille : avec mes lettres de plomb et ma presse, je vais copier ce livre non pas une fois en un an… mais MILLE fois, tous pareils. Fonds-moi des caractères et actionne la presse.",
    say: "L'imprimerie : caractères mobiles (plomb fondu + moule) puis la presse. Le grand basculement — le savoir enfin pour tous.",
    attend: "msg_imprimerie",
    suite: "Mille exemplaires ! Le savoir échappe enfin au monastère et aux riches. Ma jauge déborde : le bouton PARTIR nous emmène aux Temps modernes." },
];

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
  presentationTitre: "Chapitre 5 — Du manuscrit à l'imprimerie.",
  presentation: "Vers 1450 : le seigneur Charles Bannister veut sa gloire brodée, et la peste réclame des remèdes enfermés dans de rares livres. Au monastère du frère Jorge, assemble un codex et paie la copie (hors de prix !) d'un traité de Galien. Puis découvre la machine qui change tout : l'imprimerie de Gutenberg.",
  accroche: "Brode Bayeux 🧵 · relie un codex 📕 · paie une fortune 💰 · imprime avec Gutenberg 🖨️",

  finTitre: "SAUT TEMPOREL RÉUSSI",
  finTexte: "« Circuits rechargés à {pct} %. Tu viens de vivre LE grand basculement : avant l'imprimerie, un seul livre valait une petite maison et le savoir dormait dans les monastères ; après, il se copie par milliers et échappe au contrôle. Regarde ta frise : la portée et la capacité explosent… mais ce qui est rapide et puissant dure de moins en moins. Garde ça en tête. Prochain saut : les Temps modernes — la presse, la poste, le télégraphe. » — MARTINE",

  required: 3,
  startScene: 0,
  destination: "TEMPS MODERNES",
  linear: true,   // 2 périodes guidées : on avance au signal de MARTINE

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
  quete: QUETE,
  portraits: { charles: PortraitCharles, jorge: PortraitJorge },
  facture: FACTURE,
};

export default chapter;
