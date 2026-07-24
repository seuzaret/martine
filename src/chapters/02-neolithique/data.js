/* ============================================================
   CHAPITRE 2 — Néolithique (vers −4500)
   ============================================================
   MÊME STRUCTURE que le chapitre 1 : le moteur (src/engine/)
   lit ce fichier sans savoir ce qu'il contient. Pour modifier
   un texte, une recette, une jauge : tout est ici.
   Les décors sont dans scenes/.
   ============================================================ */

import SceneVillage from "./scenes/SceneVillage.jsx";
import SceneLande from "./scenes/SceneLande.jsx";
import SceneCol from "./scenes/SceneCol.jsx";

/* ------------------------------------------------------------
   LES ÉLÉMENTS
   ------------------------------------------------------------ */
const ITEMS = {
  argile:   { name: "Argile", emoji: "🟫", desc: "Une terre grasse et malléable, au bord de la rivière. Elle garde la forme qu'on lui donne." },
  /* SUPPORTS (support: true) : fixes, ne vont pas au sac — on leur apporte
     un objet. Le moteur les repère automatiquement (couleur cyan). */
  mains:    { name: "Le tour du potier", emoji: "⚙️", support: true, desc: "La roue du potier, qu'on fait tourner du pied. La terre montée dessus prend, toute seule, une belle forme régulière." },
  four:     { name: "Four de potier", emoji: "🔥", support: true, desc: "Une fosse chauffée à blanc. Ce qui en ressort est dur comme la pierre." },
  pigments: { name: "Pigments", emoji: "🎨", desc: "Ocres, oxydes, blanc de craie : de quoi peindre des motifs." },
  minerai:  { name: "Minerai de cuivre", emoji: "🟢", desc: "Une pierre verte (de la malachite). Chauffée très fort, elle « sue » du métal." },
  troupeau: { name: "Le troupeau", emoji: "🐑", support: true, desc: "Moutons et vaches dans l'enclos. De plus en plus nombreux… qui arrive encore à les compter ?" },
  cailloux: { name: "Cailloux noirs", emoji: "⚫", desc: "Une poignée de petits cailloux sombres. Un caillou pour chaque bête : le premier moyen de compter sans se tromper… tant qu'on ne les mélange pas et qu'on n'en perd aucun." },
  dalle:    { name: "Grande dalle", emoji: "🪨", desc: "Un bloc de granit de plusieurs tonnes, couché sur la lande. À dresser." },
  clan:     { name: "Le clan", emoji: "🧑‍🤝‍🧑", desc: "Tout le village, avec cordes et rondins. À plusieurs, on soulève des montagnes." },
  aiguille: { name: "Aiguille d'os", emoji: "🦴", desc: "Fine et pointue. Elle pique la peau juste ce qu'il faut." },
  suie:     { name: "Suie", emoji: "⚫", desc: "Du noir de fumée, dans un petit bol. Frottée dans une piqûre, elle marque à vie." },
  pierre:   { name: "Pierre à marteler", emoji: "⚒️", support: true, desc: "Une enclume de pierre : pour battre le métal et y graver des signes." },
  silex:    { name: "Silex", emoji: "🔪", desc: "Un éclat tranchant. Même au Néolithique, rien de tel pour graver la pierre dure." },

  /* fabriqués */
  pot_cru:     { name: "Pot cru", emoji: "🫙", desc: "Façonné, mais encore fragile : il faut le cuire, sinon il fond à la première pluie." },
  ceramique:   { name: "Céramique", emoji: "⚱️", desc: "Cuit au four, dur et étanche. Une belle surface… qui attend d'être décorée." },
  cuivre:      { name: "Cuivre", emoji: "🟠", desc: "Un lingot de métal rougeoyant, tout juste coulé. Mou, brillant, précieux." },
  dalle_gravee:{ name: "Dalle gravée", emoji: "🗿", desc: "La grande dalle, couverte de spirales et de signes au silex. Reste à la dresser — mais seul, impossible." },
  compte:      { name: "Compte en cailloux", emoji: "🔢", desc: "Un caillou aligné pour chaque bête : le troupeau est compté ! Mais en vrac, ça roule et ça se mélange. Il faudrait les mettre à l'abri, une bonne fois." },
};

/* ------------------------------------------------------------
   LES TABLEAUX (ordre de navigation ‹ ›)
   ------------------------------------------------------------ */
const SCENES = [
  { id: "village", name: "Le village",            Component: SceneVillage },
  { id: "lande",   name: "La lande aux mégalithes", Component: SceneLande },
  { id: "col",     name: "Le col de la montagne",   Component: SceneCol },
];

/* Où trouver chaque élément de base (pour les indices). */
const WHERE = {
  argile: "au village",
  pigments: "au village", cailloux: "au village",
  dalle: "sur la lande aux mégalithes", clan: "sur la lande aux mégalithes",
  silex: "sur la lande aux mégalithes",
  minerai: "au col de la montagne", aiguille: "au col de la montagne",
  suie: "au col de la montagne",
};

const HIDDEN_BY_FLAG = {};

/* ------------------------------------------------------------
   LES RECETTES
   ------------------------------------------------------------ */
const RECIPES = [
  { a: "argile", b: "mains", out: "pot_cru",
    line: "Sur le tour qui tourne, la terre se centre et les parois montent toutes seules : un POT prend forme. Encore mou, il faut le cuire." },
  { a: "pot_cru", b: "four", out: "ceramique",
    line: "Passé au feu, le pot durcit et devient étanche : de la CÉRAMIQUE. Le premier matériau que l'humanité fabrique de toutes pièces." },
  { a: "ceramique", b: "pigments", out: "msg_poterie", msg: true },
  /* le mégalithe se fait en 2 temps : on GRAVE la dalle au silex,
     puis tout le CLAN la dresse. */
  { a: "silex", b: "dalle", out: "dalle_gravee",
    line: "Au silex, tu couvres la dalle de spirales et de signes — comme les gravures de Gavrinis. Reste à la dresser." },
  { a: "clan", b: "dalle_gravee", out: "msg_megalithe", msg: true },
  { a: "aiguille", b: "suie", out: "msg_tatouage", msg: true },
  { a: "minerai", b: "four", out: "cuivre",
    line: "Chauffée à blanc, la pierre verte « sue » du métal rouge : du CUIVRE. Un support tout neuf — mais il faudra le marteler pour y graver." },
  { a: "cuivre", b: "pierre", out: "msg_hache", msg: true },
  /* Compter en 2 temps — l'ANCÊTRE DE L'ÉCRITURE :
     1) un caillou par bête (mais ça roule, ça se perd) ;
     2) on enferme ces cailloux dans une boule d'argile scellée →
        impossible de tricher sur le nombre. C'est presque de l'écriture…
        mais la boule ne dit ni QUELLES bêtes ni le prix → reste un
        fragment (perdu) qui appelle le chapitre 3. */
  { a: "troupeau", b: "cailloux", out: "compte",
    line: "Tu poses un caillou par bête : ton troupeau est compté ! Mais ces cailloux en vrac, un coup de vent, une main maladroite… et le compte est faux. Il faut les mettre à l'abri." },
  { a: "compte", b: "argile", out: "msg_comptage", msg: true, perdu: true },
];

/* ------------------------------------------------------------
   LES MESSAGES (fiches documentaires + jauges 1 à 5)
   Échelle commune à tous les chapitres (voir data.js du ch.1).
   ------------------------------------------------------------ */
const MESSAGES = {
  msg_poterie: { title: "Poterie décorée", emoji: "🏺",
    jauges: { vitesse: 2, portee: 2, capacite: 2, durabilite: 4 },
    fact: "Un pot cuit, orné de motifs peints ou incisés : chaque village, chaque culture a ses dessins. Ces motifs ne « disent » rien avec des mots, mais ils signent : « c'est nous qui l'avons fait ». C'est l'ancêtre lointain de la marque et du logo. Et pour les archéologues, une aubaine : en suivant les styles de poterie, on date les sites et on « trace » les peuples sur des milliers de kilomètres. La terre cuite, elle, ne pourrit pas — cassée en tessons, elle traverse les millénaires.",
    wiki: "https://fr.wikipedia.org/wiki/Poterie" },
  msg_megalithe: { title: "Mégalithe", emoji: "🗿",
    jauges: { vitesse: 1, portee: 3, capacite: 1, durabilite: 5 },
    fact: "Des dizaines d'hommes tirent une dalle de plusieurs tonnes pour la dresser. Un mégalithe, c'est un message monumental : pour les morts qu'on y enterre, pour les dieux, et pour les voisins — « ce territoire est à nous ». Le cairn de Barnenez, en Bretagne, date de ~−4500 : plus vieux que les pyramides d'Égypte ! Visible de loin, presque éternel… mais muet : sans écriture, nous ignorons encore ce que ses bâtisseurs voulaient exactement nous dire.",
    wiki: "https://fr.wikipedia.org/wiki/Cairn_de_Barnenez" },
  msg_tatouage: { title: "Tatouage", emoji: "✒️",
    jauges: { vitesse: 1, portee: 1, capacite: 2, durabilite: 4 },
    fact: "En 1991, deux randonneurs découvrent dans un glacier des Alpes un homme mort il y a ~5300 ans : « Ötzi ». Sa peau porte 61 tatouages, faits en frottant de la suie dans de fines incisions. Le corps devient support : un message qu'on porte à vie — identité, appartenance à un groupe, peut-être même des points de soin sur les articulations douloureuses. La glace l'a conservé cinq millénaires… mais un tatouage disparaît avec celui qui le porte." },
  msg_hache: { title: "Hache de cuivre gravée", emoji: "🪓",
    jauges: { vitesse: 2, portee: 2, capacite: 2, durabilite: 3 },
    fact: "Fondre le minerai, couler le métal, le marteler, le graver : le cuivre est un support tout neuf, brillant, précieux. On y grave des signes de propriété, de prestige. Mais le métal a un secret : on peut le refondre. Un message gravé dans le cuivre peut être effacé pour toujours — puis le métal resservira pour un autre objet. Durable et pourtant effaçable : le premier support « recyclable »… et falsifiable." },
  /* MESSAGE PERDU — mais surtout : l'ANCÊTRE DE L'ÉCRITURE */
  msg_comptage: { title: "L'ancêtre de l'écriture", emoji: "🔘", perdu: true,
    jauges: { vitesse: 1, portee: 1, capacite: 2, durabilite: 2 },
    fact: "Trop de bêtes pour compter de tête ! Le berger trouve mieux que le sac : il enferme un petit caillou par bête dans une boule d'argile, qu'il scelle. Impossible, désormais, de tricher sur le nombre. Ce geste porte un nom : un « calcul » — du latin calculus, « petit caillou » (c'est de là que vient notre mot CALCULER). Et c'est presque de l'écriture ! Presque, car la boule dit COMBIEN, mais pas QUELLES bêtes, ni le prix convenu ; et si elle se casse, tout est perdu. Il manque le dernier pas : dessiner les signes sur l'argile au lieu d'y cacher des cailloux. Ce sera l'affaire du prochain saut — la Mésopotamie.",
    wiki: "https://fr.wikipedia.org/wiki/Bulle-enveloppe" },
};

/* ------------------------------------------------------------
   LES INDICES (bouton 💡)
   ------------------------------------------------------------ */
const HINTS = [
  { needs: ["argile", "mains"], out: "pot_cru", text: "De l'argile molle sur le tour du potier qui tourne : façonne un pot." },
  { needs: ["pot_cru", "four"], out: "ceramique", text: "Ton pot est encore fragile. Que se passe-t-il quand on le met au feu ?" },
  { needs: ["ceramique", "pigments"], out: "msg_poterie", text: "Une belle surface cuite, des pigments… et si tu la décorais aux couleurs de ton village ?" },
  { needs: ["silex", "dalle"], out: "dalle_gravee", text: "Avant de dresser cette dalle, marque-la : un silex tranchant, et tu peux y graver spirales et signes." },
  { needs: ["clan", "dalle_gravee"], out: "msg_megalithe", text: "La dalle est gravée mais pèse des tonnes. Seul, impossible. Tout le village, avec cordes et rondins…" },
  { needs: ["aiguille", "suie"], out: "msg_tatouage", text: "Une aiguille fine, de la suie noire… un message qu'on porte directement sur la peau ?" },
  { needs: ["minerai", "four"], out: "cuivre", text: "Cette pierre verte cache du métal. Il lui faut une chaleur extrême — le four du potier, poussé à fond." },
  { needs: ["cuivre", "pierre"], out: "msg_hache", text: "Le cuivre est mou. Sur une enclume de pierre, tu peux le marteler en forme… et y graver des signes." },
  { needs: ["troupeau", "cailloux"], out: "compte", text: "Un caillou noir par bête : c'est la plus vieille façon de compter un troupeau. Pose-les côte à côte." },
  { needs: ["compte", "argile"], out: "msg_comptage", text: "Tes cailloux roulent et se perdent ? Enferme-les dans une boule d'argile scellée : personne ne pourra plus tricher. C'est ainsi qu'est née l'écriture." },
];

/* Répliques « presque ! » (erreurs logiques) */
const NEAR_MISS = [
  { pair: ["argile", "four"], line: "Enfourner de l'argile encore molle et informe ? Tu obtiens une brique tordue. Façonne-la d'abord entre tes mains." },
  { pair: ["troupeau", "pigments"], line: "Peindre un numéro sur chaque mouton ? Malin… mais la pluie lave tout en une nuit. Il te faut un vrai support durable." },
  { pair: ["cuivre", "four"], line: "Oui, le cuivre refond au four — et tu tournes en rond. Pour laisser un message, il faut le GRAVER : direction l'enclume." },
  { pair: ["dalle", "mains"], line: "Un tour de potier pour dresser une dalle de plusieurs tonnes ? Ça n'a rien à voir. Il te faut tout le clan, avec cordes et rondins." },
  { pair: ["argile", "pigments"], line: "Peindre de l'argile crue ? Les couleurs partiront à la cuisson. Cuis d'abord, décore ensuite." },
];

/* Répliques d'échec génériques */
const FAIL_LINES = [
  "Bzzt. Le Néolithique n'a pas retenu cette idée-là.",
  "Combinaison rejetée. Reviens aux bases : un support + un outil.",
  "Hmm. Créatif… mais mes archives historiques restent muettes. Réessaie.",
  "Erreur : ces deux-là ne feront pas un message.",
  "Mes capteurs ne voient venir aucune invention. On tente autre chose ?",
];

/* Intro de MARTINE à l'arrivée */
const INTRO = [
  "Impact numéro deux. Cette fois les humains se sont POSÉS : des maisons, des champs, des bêtes… et déjà des voisins qu'on redoute.",
  "Tout le village a le même souci : ne plus rien perdre. La potière veut signer ses pots, le berger n'arrive plus à compter son troupeau, Ötzi cherche une marque qui ne s'efface jamais.",
  "Et le chef vit dans la peur des guerriers d'en face : il veut une tombe ÉNORME pour ses rois, visible de loin — « cette terre est à nous, et pour toujours ».",
  "Aide-les à laisser leur trace : chaque réussite remplit ma jauge. Trois suffiront. Fouille le village, la lande et la montagne.",
];

/* Actions spéciales des décors (zones qui ne ramassent rien) */
const ACTIONS = {
  wreck: { mood: "vexe", say: "Oui, je me suis encore plantée dans un champ. Non, je ne veux pas en parler. Ramasse, combine, recharge — dans cet ordre." },

  /* LES GENS DU NÉOLITHIQUE — `bubble` = leurs paroles, `say` = MARTINE. */
  potiere: { mood: "neutre",
    bubble: "Nos pots sont beaux. Mais ceux du village d'en face aussi, et ils leur ressemblent. À la foire, quand tout est mélangé, plus personne ne sait qui a fait quoi. Et si je traçais dessus des motifs, toujours les mêmes, qu'on reconnaîtrait comme les NÔTRES ?",
    say: "Un dessin qui dit « c'est nous » : la toute première marque, l'ancêtre du logo. Donne-lui de quoi décorer." },

  berger: { mood: "vexe",
    bubble: "Demain, je descends tout le troupeau au marché pour le vendre. Mais ils sont trop nombreux ! Hier encore je me suis trompé en comptant, et l'acheteur a failli m'avoir. Comment être sûr de mon compte — et savoir combien j'ai vendu, et à qui ?",
    say: "Un petit caillou noir par bête, d'abord : voilà ton compte. Puis enferme-les dans une boule d'argile scellée, et plus personne ne peut tricher. Regarde bien, pilote : tu es en train d'assister à la naissance de l'écriture." },

  chef: { mood: "neutre",
    bubble: "De l'autre côté de la lande, un clan de guerriers nous guette — j'ai peur pour les miens. Mes rois reposent sous cette terre : je veux leur dresser une tombe ÉNORME, visible de très loin, qu'on ne puisse ni brûler, ni emporter, ni effacer. Que ces guerriers sachent que cette terre est la nôtre, pour toujours.",
    say: "Un message monumental : visible de loin, presque éternel. Il te faudra du monde pour dresser ça." },

  otzi: { mood: "neutre",
    bubble: "J'ai mal, ici, et aux genoux. Le guérisseur dit qu'il faut marquer les points, et que la marque doit rester. Mais tout s'efface : la boue, l'ocre, la peinture… Comment faire une marque qui ne partira JAMAIS, même en me lavant ?",
    say: "Le corps devient support : un message qu'on porte à vie. Il faut le faire ENTRER dans la peau." },
};

/* ------------------------------------------------------------
   LA FICHE DU CHAPITRE
   ------------------------------------------------------------ */
const chapter = {
  id: "02-neolithique",
  bandeau: "CHAPITRE 2 · −4500",
  date: "−4500",
  epoque: "Néolithique",
  emoji: "🌾",

  titre: "MARTINE",
  sousTitre: "Machine À Remonter le Temps Intelligente Néanmoins Excellente",
  presentationTitre: "Chapitre 2 — Néolithique.",
  presentation: "Les humains se sont posés : villages, champs, troupeaux. De nouveaux besoins de communication apparaissent — marquer son identité, son territoire, ses morts, ses biens. Explore le village, la lande aux mégalithes et le col de la montagne.",
  accroche: "Cuis la première céramique 🏺 · dresse un mégalithe 🗿 · tatoue Ötzi ✒️ · forge le cuivre 🪓",

  finTitre: "SAUT TEMPOREL RÉUSSI",
  finTexte: "« Circuits rechargés à {pct} %. Le Néolithique t'a montré des messages de pierre, de terre, de peau, de métal… et surtout la LIMITE de la mémoire : trop de bêtes à compter, trop d'échanges à retenir. La prochaine invention va tout changer — un système de petits signes pour NOTER. On appellera ça l'écriture. Prochain saut : la Mésopotamie… » — MARTINE",

  required: 3,
  startScene: 0,
  destination: "MÉSOPOTAMIE",

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
