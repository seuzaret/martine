/* ============================================================
   CHAPITRE 8 — Le XXe siècle : la guerre et ses suites (1944-1946)
   ============================================================
   4 tableaux :
   - T1 PARIS OCCUPÉ (5 juin 1944, après-midi) — Marthe achète une
     couverture au marché noir.
   - T2 STUDIO BBC, Londres (5 juin 1944, 21h) — Arthur émet les
     vers de Verlaine.
   - T3 SALON DUPONT, Paris (nuit) — Marthe capte le signal du
     Débarquement (mini-jeu de réglage TSF).
   - T4 ENIAC, Philadelphie (1946) — Kay McNulty programme
     l'ordinateur né de la guerre. Six femmes effacées de l'Histoire.
   ============================================================ */

import SceneParis from "./scenes/SceneParis.jsx";
import SceneBBC from "./scenes/SceneBBC.jsx";
import SceneSalon from "./scenes/SceneSalon.jsx";
import SceneEniac from "./scenes/SceneEniac.jsx";
import CarteXXe from "./scenes/CarteXXe.jsx";
import { PortraitArthur, PortraitMarthe, PortraitMarchand, PortraitKay } from "./scenes/portraits.jsx";

/* ------------------------------------------------------------
   LES ÉLÉMENTS
   ------------------------------------------------------------ */
const ITEMS = {
  /* T1 — Paris occupé */
  couverture: { name: "Grosse couverture", emoji: "🧣", desc: "Achetée au marché noir : à jeter sur le poste TSF cette nuit pour étouffer le son. Le voisin d'en face est un collabo." },

  /* T2 — le studio BBC */
  micro:   { name: "Micro de studio", emoji: "🎙️", desc: "Un micro sur pied, gros comme un citron. Devant lui, une voix ; derrière lui, des millions d'oreilles en France occupée." },
  poeme:   { name: "Vers de Verlaine", emoji: "📜", desc: "Un feuillet dactylographié : « Les sanglots longs des violons de l'automne… ». À lire à l'antenne au moment convenu — c'est un code." },
  pupitre: { name: "Pupitre du speaker", emoji: "🎛️", support: true, desc: "Le pupitre de la BBC : un micro à brancher, un feuillet à lire. On y assemble le message avant de le lancer sur les ondes." },

  /* T3 — le salon Dupont */
  tsf:      { name: "Poste TSF", emoji: "📻", desc: "Un beau poste en bakélite, cadran lumineux, gros bouton de fréquence. Il faut le brancher et lui tendre un fil pour capter Londres." },
  antenne:  { name: "Fil d'antenne", emoji: "➰", desc: "Un long fil de cuivre. Tendu de la fenêtre au poste, il aide à capter les ondes lointaines — Londres est à 350 km." },
  table:    { name: "Table du salon", emoji: "🪑", support: true, desc: "La table où on va installer discrètement le poste TSF. Ferme les rideaux d'abord." },

  /* T4 — l'ENIAC, Philadelphie 1946 */
  fiches_calcul: { name: "Fiches de calcul", emoji: "📋", desc: "Des colonnes de nombres — les trajectoires d'obus que 20 humains calculaient en 20 heures. L'ENIAC va faire ça en 30 secondes." },
  cables:        { name: "Câbles de programmation", emoji: "🔌", desc: "L'ENIAC ne se programme pas avec du code : on BRANCHE des câbles à la main sur un tableau. Chaque cheminement = une instruction. Programmation physique." },
  eniac_machine: { name: "L'ENIAC", emoji: "🖥️", support: true, desc: "30 tonnes, 18 000 tubes à vide, une salle entière. Il chauffe comme une forge — un tube grille toutes les deux minutes. Insère les fiches, branche le programme, et allume." },
};

/* ------------------------------------------------------------
   LES TABLEAUX
   ------------------------------------------------------------ */
const SCENES = [
  { id: "paris", name: "Paris occupé (5 juin 1944, après-midi)", Component: SceneParis, nextWhen: ["couverture"] },
  { id: "bbc",   name: "Studio BBC, Londres (5 juin 1944, 21h)", Component: SceneBBC,   nextWhen: ["msg_radio_londres"] },
  { id: "salon", name: "Salon Dupont, Paris (nuit, 5 au 6 juin)", Component: SceneSalon, nextWhen: ["msg_debarquement"] },
  { id: "eniac", name: "ENIAC, Philadelphie (1946)",              Component: SceneEniac },
];

const WHERE = {
  couverture: "à Paris occupé — chez le marchand clandestin, sous l'arcade",
  micro:      "au studio BBC (Londres) — posé sur la table du technicien",
  poeme:      "au studio BBC — le feuillet dactylographié sur le pupitre",
  tsf:        "au salon Dupont (Paris) — dans le buffet, planqué",
  antenne:    "au salon Dupont — bobine accrochée à la fenêtre",
  fiches_calcul: "à l'ENIAC (Philadelphie) — pile de fiches sur la table de Kay",
  cables:        "à l'ENIAC — le rouleau de câbles à côté du plugboard",
};

const HIDDEN_BY_FLAG = {};

/* ------------------------------------------------------------
   LES RECETTES
   ------------------------------------------------------------ */
const RECIPES = [
  /* T2 — préparer le message BBC */
  { a: "micro", b: "pupitre", out: "micro_branche", gives: [], consume: ["micro"], flag: "micro_branche",
    line: "🎙️ Tu branches le micro sur le pupitre. La lampe rouge s'allume — on est à l'antenne dans quelques secondes." },
  { a: "poeme", b: "pupitre", out: "msg_radio_londres", msg: true, needsFlag: "micro_branche",
    needMsg: "Attends ! Branche d'abord le micro sur le pupitre. Sans micro, tes vers n'iront pas plus loin que la pièce." },

  /* T3 — préparer la réception à Paris */
  { a: "tsf", b: "table", out: "tsf_posee", gives: [], consume: ["tsf"], flag: "tsf_posee",
    line: "📻 Le poste est sur la table du salon. Il faut encore une antenne et étouffer le son." },
  { a: "antenne", b: "tsf", out: "tsf_reliee", gives: [], consume: ["antenne"], flag: "tsf_reliee", needsFlag: "tsf_posee",
    line: "➰ Tu tends le fil d'antenne de la fenêtre au poste. Le cadran lumineux se met à trembler faiblement." },
  { a: "couverture", b: "tsf", out: "tsf_prete", gives: [], consume: ["couverture"], flag: "tsf_prete", needsFlag: "tsf_reliee",
    line: "🧣 Tu jettes la grosse couverture sur le poste. Le son est étouffé — les voisins n'entendront rien. Maintenant, cherche la BBC dans le brouillage (clique sur la TSF)." },

  /* T4 — ENIAC : deux étapes avant l'allumage */
  { a: "fiches_calcul", b: "eniac_machine", out: "fiches_chargees", gives: [], consume: ["fiches_calcul"], flag: "fiches_chargees",
    line: "📋 Kay insère la pile de fiches de calcul dans le lecteur — trajectoires d'obus, coordonnées, vitesse initiale. Il manque encore le programme, à câbler à la main." },
  { a: "cables", b: "eniac_machine", out: "msg_eniac", msg: true, consume: ["cables"], needsFlag: "fiches_chargees",
    line: "🔌 Kay branche les câbles un à un sur le plugboard — chaque cheminement électrique code une instruction. Elle tire le grand levier. Les 18 000 tubes s'allument, la salle vibre, le résultat sort en 30 secondes. Ce que Kay a fait à la main, on l'appelle aujourd'hui : PROGRAMMER." },
];

/* ------------------------------------------------------------
   LES MESSAGES (fiches + jauges 1 à 5)
   ------------------------------------------------------------ */
const MESSAGES = {
  msg_radio_londres: { title: "« Ici Londres » — la radio libre", emoji: "📻",
    jauges: { vitesse: 5, portee: 5, capacite: 2, durabilite: 1 },
    fact: "Dès juillet 1940, la BBC diffuse depuis Londres l'émission « Les Français parlent aux Français », en français, à destination de la France occupée. Écouter Londres est INTERDIT et sévèrement puni — mais des millions de gens le font, en cachette, sous une couverture. La radio franchit les frontières fermées : la censure ne peut pas fermer le ciel. À la fin de chaque émission, des « messages personnels » sont lus — de courtes phrases sans queue ni tête, en réalité des SIGNAUX CODÉS destinés aux réseaux de résistance." },
  msg_eniac: { title: "ENIAC & les six femmes effacées", emoji: "🖥️",
    jauges: { vitesse: 4, portee: 1, capacite: 3, durabilite: 2 },
    fact: "1946, université de Pennsylvanie. L'ENIAC prend vie : 30 tonnes, 18 000 tubes à vide, une salle entière. Il calcule en 30 secondes ce que 20 humains font en 20 heures. Il est né MILITAIRE — pour l'artillerie, puis pour la bombe H. Ce que l'Histoire a longtemps oublié : il est PROGRAMMÉ par SIX FEMMES — Kay McNulty, Betty Snyder, Betty Jean Jennings, Marlyn Wescoff, Frances Bilas, Ruth Lichterman. On les appelait « les ENIAC Girls ». Pendant 50 ans, elles sont restées des « opératrices » anonymes alors qu'elles avaient inventé la programmation moderne. Les femmes ont longtemps été effacées de l'histoire des sciences. Aujourd'hui encore : quand tu lis une invention, cherche QUI l'a vraiment faite. L'invisibilité est un choix, pas un hasard." },
  msg_debarquement: { title: "Le signal du Débarquement", emoji: "🌊",
    jauges: { vitesse: 5, portee: 4, capacite: 2, durabilite: 1 },
    fact: "5 juin 1944, 21h15. La BBC diffuse : « Les sanglots longs des violons de l'automne bercent mon cœur d'une langueur monotone. » Ce vers de Verlaine est un CODE : les deux vers, échelonnés depuis le 1ᵉʳ juin, signalent aux réseaux de résistance que le Débarquement a lieu dans les 48 heures. Trains sabotés, ponts coupés, lignes téléphoniques arrachées. Le 6 juin à l'aube, 156 000 soldats alliés touchent la Normandie. Une phrase de poésie, glissée dans la radio ennemie, a lancé la libération de l'Europe. La même émission passe partout — c'est le CODE PARTAGÉ qui décide qui comprend et qui n'entend qu'un poème." },
};

/* ------------------------------------------------------------
   LES INDICES (bouton 💡)
   ------------------------------------------------------------ */
const HINTS = [
  { needs: ["couverture"], out: "couverture", text: "Ramasse la grosse couverture chez le marchand clandestin, sous l'arcade (elle servira à étouffer le son de la TSF chez Marthe)." },
  { needs: ["micro", "pupitre"], out: "micro_branche", text: "Glisse le micro sur le pupitre du speaker : la lampe rouge s'allume, on est à l'antenne." },
  { needs: ["poeme", "pupitre"], out: "msg_radio_londres", text: "Une fois le micro branché, glisse le feuillet de Verlaine sur le pupitre : Arthur lit les vers à l'antenne." },
  { needs: ["tsf", "table"], out: "tsf_posee", text: "Sors le poste TSF du buffet et pose-le sur la table du salon (glisse la TSF sur la table)." },
  { needs: ["antenne", "tsf"], out: "tsf_reliee", text: "Tends le fil d'antenne de la fenêtre au poste (glisse l'antenne sur la TSF)." },
  { needs: ["couverture", "tsf"], out: "tsf_prete", text: "Jette la couverture sur le poste pour étouffer le son, puis clique sur la TSF pour chercher Londres." },
  { needs: ["fiches_calcul", "eniac_machine"], out: "fiches_chargees", text: "Glisse la pile de fiches de calcul sur l'ENIAC : Kay les charge dans le lecteur." },
  { needs: ["cables", "eniac_machine"], out: "msg_eniac", text: "Glisse les câbles sur l'ENIAC : Kay câble le programme à la main, puis allume." },
];

const NEAR_MISS = [
  { pair: ["poeme", "tsf"], line: "Le poème est à LIRE depuis Londres, pas à mettre sur le poste de Paris ! Retourne au studio BBC." },
  { pair: ["couverture", "micro"], line: "Une couverture sur un micro ? Étouffer sa propre émission serait ballot ! La couverture est pour PARIS, pas Londres." },
];

const FAIL_LINES = [
  "Bzzt. Cette combinaison n'a pas de sens en 1944.",
  "Non — cherche un émetteur d'un côté, un récepteur de l'autre.",
  "Mes archives de guerre restent muettes là-dessus.",
];

const INTRO = [
  "1944. La France est occupée depuis quatre ans, la presse censurée, les frontières fermées. Un seul média franchit encore les murs : les ondes de la radio.",
  "Aujourd'hui, dans les rues de Paris, Marthe Dupont achète une grosse couverture au marché noir. Ce soir, à Londres, Arthur Smith prépare une émission. Cette nuit, un poème va traverser la Manche et lancer la libération.",
];

const ACTIONS = {
  wreck: { mood: "vexe", say: "J'ai atterri dans une rue de Paris. Un vélo-taxi m'a prise pour une bombe. Recharge-moi vite — on est en pleine guerre." },

  marchand: { mood: "neutre",
    bubble: "Une grosse couverture, madame ? J'en ai une chaude — mais pas de ticket, hein ? On se comprend. Et cette nuit, écoutez Londres, ça vaut le coup.",
    say: "Le marchand clandestin : marché noir sous une arcade. Il vend ce qui manque, il informe qui écoute." },

  patrouille: { mood: "vexe",
    bubble: "Halt ! Papiere !",
    say: "Une patrouille allemande. Ne t'attarde pas — les contrôles sont brutaux depuis le mois de mai." },

  affiche: { mood: "neutre",
    bubble: "« VERBOTEN — Écoute des radios ennemies : peine de prison. »",
    say: "Une affiche de la Kommandantur. Ce qui est interdit dit ce que l'occupant craint : la voix libre." },

  arthur: { mood: "neutre",
    bubble: "Arthur Smith, BBC. Ce soir on transmet les messages personnels. Le plus important : « Les sanglots longs des violons de l'automne ». Branche le micro, puis lis les vers.",
    say: "Arthur Smith : il fait passer les messages codés vers la France occupée." },

  marthe: { mood: "neutre",
    bubble: "Chut ! Marthe Dupont. Cette nuit on écoute Londres — c'est interdit, on s'en fiche. Sors la TSF du buffet, tends l'antenne, jette la couverture pour étouffer le son.",
    say: "Marthe Dupont : elle va écouter Radio Londres, comme des millions de Français en cachette." },

  /* action ouvrant le mini-jeu de réglage de fréquence sur la TSF prête */
  tsf_bouton: { modal: "tsf_reglage", needsFlag: "tsf_prete",
    needMsg: "Le poste n'est pas encore prêt : pose-le sur la table, tends l'antenne, jette la couverture. ENSUITE tu pourras chercher Londres." },

  kay: { mood: "neutre",
    bubble: "Kay McNulty. Née en Irlande, émigrée à Philadelphie. Je suis mathématicienne — on nous a recrutées à six pour calculer les trajectoires d'obus à la main. Depuis qu'ils ont construit l'ENIAC, on le PROGRAMME — mais l'armée nous appelle des « opératrices ». Aide-moi : charge les fiches, branche les câbles, allume la bête.",
    say: "Kay McNulty : l'une des six programmeuses de l'ENIAC. Effacées de l'Histoire pendant 50 ans, alors qu'elles ont inventé la programmation moderne." },
};

/* ------------------------------------------------------------
   LA FICHE DU CHAPITRE
   ------------------------------------------------------------ */
const chapter = {
  id: "08-xxe",
  bandeau: "CHAPITRE 8 · XXe SIÈCLE",
  date: "5-6 juin 1944",
  epoque: "XXe siècle",
  emoji: "📻",

  titre: "MARTINE",
  sousTitre: "Machine À Remonter le Temps Intelligente Néanmoins Excellente",
  presentationTitre: "Chapitre 8 — La radio en temps de guerre.",
  presentation: "France occupée, 1944. La presse est censurée, les frontières fermées, mais les ondes passent par-dessus les murs. Cette nuit, un message codé de la BBC va lancer la libération de l'Europe. Suis Marthe à Paris et Arthur à Londres.",
  accroche: "Paris occupé 🇩🇪 · Studio BBC 📻 · Salon parisien 🧣 · Un poème → un débarquement 🌊",

  finTitre: "SAUT TEMPOREL RÉUSSI",
  finTexte: "« Circuits rechargés à {pct} %. Un vers de Verlaine, glissé dans les ondes ennemies, a lancé la libération de l'Europe. La radio franchit les murs et les frontières… mais elle n'existe que le temps qu'elle passe. Pas de trace, pas d'archive : l'appel du 18 juin, jamais enregistré, n'existe plus qu'en TEXTE. Prochain saut : ton époque. » — MARTINE",

  required: 3,
  startScene: 0,
  destination: "XXIe SIÈCLE",
  linear: true,

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
  portraits: {
    arthur: PortraitArthur,
    marthe: PortraitMarthe,
    marchand: PortraitMarchand,
    kay: PortraitKay,
  },
  carte: CarteXXe,
};

export default chapter;
