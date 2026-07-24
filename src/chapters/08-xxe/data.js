/* ============================================================
   CHAPITRE 8 — Le XXe siècle : les médias entrent à la maison (1969)
   ============================================================
   4 tableaux, chacun bâti comme une ÉNIGME : un personnage pose
   son problème (clic sur lui), le décor ne montre QUE les pièces,
   et l'invention APPARAÎT quand on la fabrique.
   (Le 3e tableau de la spec portait 6 pièces + 3 inventions : on
   l'a coupé en deux — ENIAC d'un côté, labo des années 80 de l'autre.)

   Objet HÉRITAGE : la DISQUETTE, à emporter au chapitre 9 (elle y
   deviendra illisible : la leçon d'obsolescence).
   Voir docs/AJOUTER-UN-CHAPITRE.md.
   ============================================================ */

import SceneStudio from "./scenes/SceneStudio.jsx";
import SceneSalon from "./scenes/SceneSalon.jsx";
import SceneEniac from "./scenes/SceneEniac.jsx";
import SceneLabo from "./scenes/SceneLabo.jsx";

/* ------------------------------------------------------------
   LES ÉLÉMENTS
   ------------------------------------------------------------ */
const ITEMS = {
  /* T1 — le studio de radio, 1940 */
  ondes:            { name: "Ondes radio", emoji: "📶", desc: "Des ondes invisibles qui partent de l'antenne et franchissent les frontières… sans demander la permission." },
  micro:            { name: "Micro", emoji: "🎙️", desc: "Un micro sur pied. Devant lui, une voix ; derrière lui, des millions d'oreilles." },
  bande_magnetique: { name: "Bande magnétique", emoji: "📼", desc: "Un long ruban qui garde le son grâce à des milliers de minuscules aimants. Pratique… mais du coup, un aimant peut tout effacer." },
  /* support: true → fixe dans le décor, ne va pas au sac : on lui apporte
     un objet (le moteur l'affiche en cyan). */
  aimant:           { name: "Gros aimant", emoji: "🧲", support: true, desc: "L'aimant du haut-parleur, dans un coin du studio. À tenir TRÈS loin des bandes enregistrées." },

  /* T2 — le salon, 1969 */
  tube_cathodique: { name: "Tube cathodique", emoji: "📺", desc: "Un gros tube de verre qui dessine une image avec un faisceau, ligne par ligne, très vite." },
  camera:          { name: "Caméra", emoji: "🎥", desc: "Elle filme l'événement là-bas, et l'envoie ici, tout de suite. Le direct." },
  boitier:         { name: "Boîtier plastique", emoji: "📦", desc: "Une petite coque solide. Si on enroulait une bande magnétique à l'intérieur… ce serait facile à ranger, à prêter, à copier." },

  /* T3 — la salle de l'ENIAC, 1946 */
  tubes_vide: { name: "Tubes à vide", emoji: "💡", support: true, desc: "Des ampoules qui font le calcul à la place du cerveau. Il en faut 18 000… et ça chauffe terriblement." },
  calcul:     { name: "Tables de tir", emoji: "🧮", desc: "Des pages et des pages de calculs à faire à la main. Des semaines de travail pour une seule trajectoire." },

  /* T4 — le labo, années 1980 */
  laser:          { name: "Laser", emoji: "🔦", desc: "Un rayon si fin qu'il peut lire des creux minuscules, sans jamais toucher le support. Donc sans l'user." },
  disque_optique: { name: "Disque brillant", emoji: "💿", desc: "Un disque qui fait des arcs-en-ciel. Dessous, des creux gravés si petits qu'on ne les voit pas." },
  ordinateurs:    { name: "Ordinateurs", emoji: "🖥️", desc: "Ils sont devenus petits ! Mais chacun travaille dans son coin, tout seul." },
  reseau:         { name: "Réseau", emoji: "🕸️", desc: "Des câbles pour relier les machines entre elles. Et si une route est coupée, le message prend une autre route." },

  /* HÉRITAGE — à emporter au chapitre 9 ! */
  disquette: { name: "Disquette", emoji: "💾", desc: "Une disquette des années 80. Elle contient un fichier. Garde-la bien : on verra dans 30 ans si on arrive encore à la lire…", heirloom: true },
};

/* ------------------------------------------------------------
   LES TABLEAUX
   ------------------------------------------------------------ */
const SCENES = [
  { id: "studio", name: "Le studio de radio (1940)", Component: SceneStudio },
  { id: "salon",  name: "Le salon (1969)",           Component: SceneSalon },
  { id: "eniac",  name: "La salle de l'ENIAC (1946)", Component: SceneEniac },
  { id: "labo",   name: "Le labo (années 1980)",     Component: SceneLabo },
];

const WHERE = {
  ondes: "au studio de radio", micro: "au studio de radio",
  bande_magnetique: "au studio de radio",
  tube_cathodique: "au salon", camera: "au salon", boitier: "au salon",
  calcul: "à la salle de l'ENIAC",
  laser: "au labo des années 1980", disque_optique: "au labo des années 1980",
  ordinateurs: "au labo des années 1980", reseau: "au labo des années 1980",
  disquette: "au labo des années 1980 (prends-la : elle servira au chapitre suivant !)",
};

const HIDDEN_BY_FLAG = {};

/* ------------------------------------------------------------
   LES RECETTES
   ------------------------------------------------------------ */
const RECIPES = [
  { a: "ondes", b: "micro", out: "msg_radio", msg: true },
  { a: "tube_cathodique", b: "camera", out: "msg_television", msg: true },
  { a: "bande_magnetique", b: "boitier", out: "msg_cassette", msg: true },
  { a: "tubes_vide", b: "calcul", out: "msg_eniac", msg: true },
  { a: "laser", b: "disque_optique", out: "msg_cd", msg: true },
  { a: "ordinateurs", b: "reseau", out: "msg_internet", msg: true },
  /* MESSAGE PERDU : la MÊME bande magnétique, mais posée près de l'aimant.
     Même objet, deux destins — comme la tablette d'argile du chapitre 3. */
  { a: "bande_magnetique", b: "aimant", out: "msg_bande", msg: true, perdu: true },
];

/* ------------------------------------------------------------
   LES MESSAGES (fiches + jauges 1 à 5)
   ------------------------------------------------------------ */
const MESSAGES = {
  msg_radio: { title: "Radio — l'appel du 18 juin 1940", emoji: "📻",
    jauges: { vitesse: 5, portee: 5, capacite: 2, durabilite: 1 },
    fact: "Un micro, des ondes, et une voix traverse la mer jusqu'à un pays occupé. En 1940, la radio parle à des millions de gens d'un coup, en direct, malgré la censure et les frontières fermées. Mais le même appareil sert à informer, à résister… et à faire de la propagande : tout dépend de qui tient le micro. Et une chose étonnante : l'appel du 18 juin n'a jamais été enregistré. Il n'en reste aucun son, seulement le texte. Un message peut devenir célèbre bien après avoir été prononcé." },
  msg_television: { title: "Télévision", emoji: "📺",
    jauges: { vitesse: 5, portee: 5, capacite: 3, durabilite: 1 },
    fact: "En 1969, 600 millions de personnes regardent en même temps les premiers pas sur la Lune, assises dans leur salon. La télévision fait entrer le monde en direct chez toi. Mais attention : ce monde est CHOISI. Une rédaction décide quels sujets passent, combien de temps, et surtout ce qu'on ne montre pas. Regarder le journal télévisé, ce n'est pas voir le monde : c'est voir ce que quelqu'un a sélectionné pour toi." },
  msg_cassette: { title: "Cassette & VHS", emoji: "📼",
    jauges: { vitesse: 2, portee: 3, capacite: 3, durabilite: 2 },
    fact: "Une bande magnétique dans un boîtier : voilà la cassette (1963), puis la VHS. Pour la première fois, chacun peut ENREGISTRER chez soi : la radio, la télé, la musique des copains. On copie, on prête, on échange. L'industrie crie déjà au piratage ! Mais la bande s'abîme, se démagnétise, et chaque copie est un peu moins bonne que l'original." },
  msg_eniac: { title: "ENIAC, le premier ordinateur", emoji: "🖥️",
    jauges: { vitesse: 4, portee: 1, capacite: 3, durabilite: 2 },
    fact: "En 1946, l'ENIAC est le premier grand ordinateur électronique : 30 tonnes, une salle entière, 18 000 tubes à vide qui chauffent. Il est né pour l'armée, afin de calculer des trajectoires d'obus. Il fait en quelques secondes ce qui prenait des semaines à la main. Aujourd'hui, le téléphone dans ta poche est des millions de fois plus puissant que cette machine géante." },
  msg_cd: { title: "CD & DVD", emoji: "💿",
    jauges: { vitesse: 2, portee: 4, capacite: 4, durabilite: 2 },
    fact: "En 1982, le CD arrive : fini la bande, un laser lit des creux minuscules gravés sur un disque brillant. On le vend comme un support « inaltérable », qui durerait toujours. Sauf que non : beaucoup de CD gravés dans les années 90 sont déjà illisibles, leur couche se décolle — on appelle ça la « maladie du disque ». Le support qui devait tout garder ne tient parfois même pas 30 ans." },
  msg_internet: { title: "Internet & le Web", emoji: "🌐",
    jauges: { vitesse: 5, portee: 5, capacite: 5, durabilite: 2 },
    fact: "En 1969, on relie quelques ordinateurs entre eux : c'est ARPANET, l'ancêtre d'Internet, prévu pour continuer à marcher même si une partie tombe en panne. En 1989, Tim Berners-Lee invente le Web et l'offre gratuitement au monde entier. Résultat : chacun devient à la fois lecteur ET auteur. Il n'y a plus un seul crieur public, plus de filtre obligatoire. C'est formidable… et ça veut dire que c'est à TOI de vérifier, de croiser et de douter." },
  /* MESSAGE PERDU */
  msg_bande: { title: "Bande effacée", emoji: "🧲", perdu: true,
    jauges: { vitesse: 2, portee: 1, capacite: 3, durabilite: 1 },
    fact: "Tu avais enregistré des heures de son sur ta bande magnétique… et tu l'as posée à côté d'un gros aimant. En une seconde, tout est effacé. Il ne reste rien du tout. La bande garde le son grâce à des milliers de minuscules aimants : approche un autre aimant, et tout disparaît. Des archives entières de radio et de télé ont été perdues comme ça — ou tout simplement réenregistrées par-dessus, pour économiser des bandes." },
};

/* ------------------------------------------------------------
   LES INDICES (bouton 💡)
   ------------------------------------------------------------ */
const HINTS = [
  { needs: ["ondes", "micro"], out: "msg_radio", text: "Le speaker veut parler à tout un pays occupé. Donne-lui un micro, et des ondes qui passent par-dessus les frontières : la radio !" },
  { needs: ["tube_cathodique", "camera"], out: "msg_television", text: "Une caméra qui filme là-bas, un tube cathodique qui redessine l'image ici : c'est la télévision." },
  { needs: ["bande_magnetique", "boitier"], out: "msg_cassette", text: "Enroule ta bande magnétique dans un boîtier : tu obtiens la cassette, et tu peux enregistrer chez toi." },
  { needs: ["tubes_vide", "calcul"], out: "msg_eniac", text: "Ces calculs prennent des semaines à la main. Confie-les à 18 000 tubes à vide : voilà l'ENIAC." },
  { needs: ["laser", "disque_optique"], out: "msg_cd", text: "Un laser assez fin pour lire des creux minuscules sur un disque brillant : c'est le CD." },
  { needs: ["ordinateurs", "reseau"], out: "msg_internet", text: "Des ordinateurs tout seuls, c'est triste. Relie-les par un réseau : Internet, puis le Web." },
  { needs: ["bande_magnetique", "aimant"], out: "msg_bande", text: "Surtout, n'approche pas ta bande magnétique du gros aimant : tout serait effacé d'un coup !" },
];

const NEAR_MISS = [
  { pair: ["micro", "tube_cathodique"], line: "Un micro sur un tube cathodique ? Le micro capte le SON. Pour l'image, il te faut une caméra." },
  { pair: ["laser", "bande_magnetique"], line: "Un laser sur une bande magnétique ? Non : le laser lit des creux sur un disque. La bande, elle, se lit avec une tête aimantée." },
  { pair: ["ordinateurs", "tubes_vide"], line: "Les tubes à vide, c'est l'ANCÊTRE. Tes ordinateurs des années 80 n'en veulent plus — ils veulent un réseau." },
  { pair: ["camera", "ondes"], line: "Presque ! Mais pour l'instant, tes ondes ne savent porter que du son. Le micro d'abord." },
  { pair: ["disque_optique", "aimant"], line: "Bonne intuition… mais non : un aimant n'efface PAS un CD. Le CD, lui, s'abîme tout seul en vieillissant." },
];

const FAIL_LINES = [
  "Bzzt. Le XXe siècle n'a rien retenu de cette idée.",
  "Combinaison rejetée. Un signal, un support : reviens aux bases.",
  "Mes archives restent muettes là-dessus. Réessaie.",
  "Erreur : ces deux-là ne feront pas un message.",
  "Zéro invention détectée. On tente autre chose ?",
];

const INTRO = [
  "XXe siècle : les médias entrent dans toutes les maisons. Mais le même appareil peut informer, faire RÉSISTER… ou mentir. Tout dépend de qui tient le micro.",
  "Quatre personnes, une même urgence. Un homme veut faire passer sa voix par-dessus un pays occupé et censuré. Un enfant veut VOIR, en direct, des hommes marcher sur la Lune. Une ingénieure veut calculer plus vite qu'un cerveau. Et Berners-Lee veut relier tous les ordinateurs du monde.",
  "Aide-les : chaque message recharge ma jauge. Trois suffiront. Et n'oublie pas la disquette du labo : elle te suivra jusqu'à ton époque…",
];

const ACTIONS = {
  wreck: { mood: "vexe", say: "J'ai atterri dans un studio de radio en pleine guerre. Le technicien a cru à un bombardement. Recharge-moi vite, j'ai une réputation à tenir." },

  /* LES PERSONNAGES — `bubble` = leurs paroles, `say` = MARTINE. */
  speaker: { mood: "neutre",
    bubble: "Mon pays est occupé. Les journaux sont censurés, les frontières fermées, le courrier contrôlé. Et pourtant je dois parler à des millions de gens, ce soir. Comment faire passer ma voix par-dessus tout ça ?",
    say: "La radio ! Elle franchit les frontières fermées, droit dans les foyers. Mais le même micro sert aussi à mentir — écoute toujours QUI parle." },

  enfant: { mood: "neutre",
    bubble: "Ce soir, des hommes vont marcher sur la LUNE ! Mais on ne verra rien : c'est à 380 000 kilomètres… Comment on pourrait voir, depuis notre salon, ce qui se passe là-haut, au moment MÊME où ça se passe ?",
    say: "La télévision : le monde en direct dans le salon. Un monde CHOISI par une rédaction, ne l'oublie jamais. Il lui faut une caméra et un tube cathodique." },

  ingenieure: { mood: "neutre",
    bubble: "Calculer une seule trajectoire à la main me prend des semaines. Et j'en ai des milliers à faire ! Comment calculer plus vite qu'un cerveau humain ? Et si des milliers d'ampoules faisaient le calcul à ma place ?",
    say: "L'ENIAC : le premier ordinateur. Trente tonnes, né militaire… et des millions de fois moins puissant que ton téléphone. Donne-lui ses tubes." },

  berners: { mood: "neutre",
    bubble: "J'ai des ordinateurs partout dans le monde… mais chacun travaille dans son coin, ils ne se parlent pas. Et si je les reliais tous, pour que n'importe qui puisse lire ET écrire ?",
    say: "Internet, puis le Web : chacun devient à la fois lecteur ET auteur. Plus de filtre unique — à toi de vérifier et de douter. Relie-les !" },
};

/* ------------------------------------------------------------
   LA FICHE DU CHAPITRE
   ------------------------------------------------------------ */
const chapter = {
  id: "08-xxe",
  bandeau: "CHAPITRE 8 · 1969",
  date: "1969",
  epoque: "XXe siècle",
  emoji: "📺",

  titre: "MARTINE",
  sousTitre: "Machine À Remonter le Temps Intelligente Néanmoins Excellente",
  presentationTitre: "Chapitre 8 — Le siècle des médias de masse.",
  presentation: "De 1900 à 1990, la radio puis la télévision entrent dans chaque maison et parlent à des millions de gens en même temps — pour informer, pour résister, ou pour mentir. Pendant ce temps naissent l'ordinateur et le réseau qui va tout relier. Explore quatre lieux et aide ceux qui y cherchent une solution.",
  accroche: "La radio 📻 · la télévision 📺 · l'ENIAC 🖥️ · la cassette 📼 · le CD 💿 · Internet 🌐",

  finTitre: "SAUT TEMPOREL RÉUSSI",
  finTexte: "« Circuits rechargés à {pct} %. Quel siècle bavard ! Le message atteint maintenant la planète entière en direct… mais regarde bien ta frise : la durabilité est tombée au fond du trou. Une émission en direct ne laisse RIEN. Une bande s'efface. Un CD « inaltérable » meurt en 30 ans. Prochain saut : ton époque. Et j'espère que tu as pris une disquette — j'ai une petite expérience à te proposer. » — MARTINE",

  required: 3,
  startScene: 0,
  destination: "XXIe SIÈCLE",

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
