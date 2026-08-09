/* ============================================================
   CHAPITRE 8 — Le XXe siècle : la radio en temps de guerre
   ============================================================
   2 tableaux, un message qui traverse la Manche.
   - T1 : STUDIO BBC, Bush House, Londres, 5 juin 1944 au soir.
     Arthur Smith, ingénieur du son, prépare l'émission.
     On assemble micro + poème → message émis vers l'Europe occupée.
   - T2 : SALON DUPONT, Paris occupé, quelques heures plus tard.
     Marthe cache une TSF sous une couverture. On règle la
     fréquence (mini-jeu) et le message arrive : c'est le signal
     du Débarquement du 6 juin.
   Le MÊME message vu des deux côtés. EMI : émetteur / canal /
   récepteur / code partagé. La poésie de Verlaine a lancé la
   libération de l'Europe.
   ============================================================ */

import SceneBBC from "./scenes/SceneBBC.jsx";
import SceneSalon from "./scenes/SceneSalon.jsx";
import { PortraitArthur, PortraitMarthe } from "./scenes/portraits.jsx";

/* ------------------------------------------------------------
   LES ÉLÉMENTS
   ------------------------------------------------------------ */
const ITEMS = {
  /* T1 — le studio BBC */
  micro:  { name: "Micro de studio", emoji: "🎙️", desc: "Un micro sur pied, gros comme un citron. Devant lui, une voix ; derrière lui, des millions d'oreilles en France occupée." },
  poeme:  { name: "Vers de Verlaine", emoji: "📜", desc: "Un feuillet dactylographié : « Les sanglots longs des violons de l'automne… ». À lire à l'antenne au moment convenu — c'est un code." },
  pupitre: { name: "Pupitre du speaker", emoji: "🎛️", support: true, desc: "Le pupitre de la BBC : un micro à brancher, un feuillet à lire. On y assemble le message avant de le lancer sur les ondes." },

  /* T2 — le salon Dupont */
  tsf:        { name: "Poste TSF", emoji: "📻", desc: "Un beau poste en bakélite, cadran lumineux, gros bouton de fréquence. Il faut le brancher et lui tendre un fil pour capter Londres." },
  antenne:    { name: "Fil d'antenne", emoji: "➰", desc: "Un long fil de cuivre. Tendu de la fenêtre au poste, il aide à capter les ondes lointaines — Londres est à 350 km." },
  couverture: { name: "Grosse couverture", emoji: "🧣", desc: "Pour étouffer le son : le voisin d'en face est un collabo, il ne faut pas qu'il entende. On la jette sur le poste avant d'allumer." },
  table:      { name: "Table du salon", emoji: "🪑", support: true, desc: "La table où on va installer discrètement le poste TSF. Ferme les rideaux d'abord." },
};

/* ------------------------------------------------------------
   LES TABLEAUX
   ------------------------------------------------------------ */
const SCENES = [
  { id: "bbc",   name: "Studio BBC, Londres (5 juin 1944)", Component: SceneBBC,   nextWhen: ["msg_radio_londres"] },
  { id: "salon", name: "Salon Dupont, Paris occupé (nuit)", Component: SceneSalon },
];

const WHERE = {
  micro:  "au studio BBC (Londres) — posé sur la table du technicien",
  poeme:  "au studio BBC — le feuillet dactylographié sur le pupitre",
  tsf:    "au salon Dupont (Paris) — dans le buffet, planqué",
  antenne: "au salon Dupont — enroulé dans le tiroir",
  couverture: "au salon Dupont — sur le fauteuil",
};

const HIDDEN_BY_FLAG = {};

/* ------------------------------------------------------------
   LES RECETTES
   ------------------------------------------------------------ */
const RECIPES = [
  /* T1 — préparer le message BBC */
  { a: "micro", b: "pupitre", out: "micro_branche", gives: [], consume: ["micro"], flag: "micro_branche",
    line: "🎙️ Tu branches le micro sur le pupitre. La lampe rouge s'allume — on est à l'antenne dans quelques secondes." },
  { a: "poeme", b: "pupitre", out: "msg_radio_londres", msg: true, needsFlag: "micro_branche",
    needMsg: "Attends ! Branche d'abord le micro sur le pupitre. Sans micro, tes vers n'iront pas plus loin que la pièce." },

  /* T2 — préparer la réception à Paris */
  { a: "tsf", b: "table", out: "tsf_posee", gives: [], consume: ["tsf"], flag: "tsf_posee",
    line: "📻 Le poste est sur la table du salon. Il faut encore une antenne et étouffer le son." },
  { a: "antenne", b: "tsf", out: "tsf_reliee", gives: [], consume: ["antenne"], flag: "tsf_reliee", needsFlag: "tsf_posee",
    line: "➰ Tu tends le fil d'antenne de la fenêtre au poste. Le cadran lumineux se met à trembler faiblement." },
  { a: "couverture", b: "tsf", out: "msg_debarquement", msg: true, consume: ["couverture"], needsFlag: "tsf_reliee",
    line: "🧣 Tu jettes la couverture sur le poste et tu tournes le bouton dans le brouillage… soudain, à travers la friture : « Les sanglots longs des violons de l'automne… » — Marthe pleure. C'est le signal du Débarquement." },
];

/* ------------------------------------------------------------
   LES MESSAGES (fiches + jauges 1 à 5)
   ------------------------------------------------------------ */
const MESSAGES = {
  msg_radio_londres: { title: "« Ici Londres » — la radio libre", emoji: "📻",
    jauges: { vitesse: 5, portee: 5, capacite: 2, durabilite: 1 },
    fact: "Dès juillet 1940, la BBC diffuse depuis Londres l'émission « Les Français parlent aux Français », en français, à destination de la France occupée. Écouter Londres est INTERDIT et sévèrement puni — mais des millions de gens le font, en cachette, sous une couverture. La radio franchit les frontières fermées : la censure ne peut pas fermer le ciel. À la fin de chaque émission, des « messages personnels » sont lus — de courtes phrases sans queue ni tête, en réalité des SIGNAUX CODÉS destinés aux réseaux de résistance." },
  msg_debarquement: { title: "Le signal du Débarquement", emoji: "🌊",
    jauges: { vitesse: 5, portee: 4, capacite: 2, durabilite: 1 },
    fact: "5 juin 1944, 21h15. La BBC diffuse : « Les sanglots longs des violons de l'automne bercent mon cœur d'une langueur monotone. » Ce vers de Verlaine est un CODE : les deux vers, échelonnés depuis le 1ᵉʳ juin, signalent aux réseaux de résistance que le Débarquement a lieu dans les 48 heures. Trains sabotés, ponts coupés, lignes téléphoniques arrachées. Le 6 juin à l'aube, 156 000 soldats alliés touchent la Normandie. Une phrase de poésie, glissée dans la radio ennemie, a lancé la libération de l'Europe. La même émission passe partout — c'est le CODE PARTAGÉ qui décide qui comprend et qui n'entend qu'un poème." },
};

/* ------------------------------------------------------------
   LES INDICES (bouton 💡)
   ------------------------------------------------------------ */
const HINTS = [
  { needs: ["micro", "pupitre"], out: "micro_branche", text: "Glisse le micro sur le pupitre du speaker : la lampe rouge s'allume, on est à l'antenne." },
  { needs: ["poeme", "pupitre"], out: "msg_radio_londres", text: "Une fois le micro branché, glisse le feuillet de Verlaine sur le pupitre : Arthur lit les vers à l'antenne." },
  { needs: ["tsf", "table"], out: "tsf_posee", text: "Sors le poste TSF du buffet et pose-le sur la table du salon (glisse la TSF sur la table)." },
  { needs: ["antenne", "tsf"], out: "tsf_reliee", text: "Tends le fil d'antenne de la fenêtre au poste (glisse l'antenne sur la TSF)." },
  { needs: ["couverture", "tsf"], out: "msg_debarquement", text: "Jette la grosse couverture sur le poste pour étouffer le son (glisse la couverture sur la TSF) — Marthe cherche alors la BBC dans le brouillage." },
];

const NEAR_MISS = [
  { pair: ["poeme", "tsf"], line: "Le poème est à LIRE depuis Londres, pas à mettre sur le poste de Paris ! Retourne au studio BBC." },
  { pair: ["couverture", "table"], line: "La couverture, c'est pour étouffer le son du POSTE, pas de la table. Installe d'abord la TSF." },
];

const FAIL_LINES = [
  "Bzzt. Cette combinaison n'a pas de sens en 1944.",
  "Non — cherche un émetteur d'un côté, un récepteur de l'autre.",
  "Mes archives de guerre restent muettes là-dessus.",
];

const INTRO = [
  "1944. La France est occupée depuis quatre ans, la presse censurée, les frontières fermées. Un seul média franchit encore les murs : les ondes de la radio.",
  "À Londres, dans un petit studio de la BBC, Arthur Smith prépare l'émission du soir. À Paris, dans un salon aux rideaux tirés, Marthe Dupont sort le poste TSF caché dans le buffet. Ils ne se connaîtront jamais. Mais cette nuit, un message va les relier.",
  "Aide les deux : envoie le message depuis Londres, puis capte-le à Paris. La poésie va lancer la libération.",
];

const ACTIONS = {
  wreck: { mood: "vexe", say: "J'ai atterri dans un studio de la BBC. On m'a prise pour une bombe volante. Recharge-moi vite, on est en pleine guerre." },

  arthur: { mood: "neutre",
    bubble: "Arthur Smith, ingénieur du son à la BBC. Cette nuit, on transmet les messages personnels aux réseaux de résistance. Le plus important : « Les sanglots longs des violons de l'automne ». Aide-moi : branche le micro, puis lis les vers.",
    say: "Arthur Smith : il fait passer les messages codés vers la France occupée." },

  marthe: { mood: "neutre",
    bubble: "Chut ! Marthe Dupont, veuve de 14-18. Cette nuit on écoute Londres. C'est interdit, mais on s'en fiche. Aide-moi à installer la TSF : sors-la, tends l'antenne, jette la couverture pour étouffer le son.",
    say: "Marthe Dupont : elle écoute Radio Londres en cachette, comme des millions de Français." },

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
  presentation: "France occupée, 1944. La presse est censurée, les frontières fermées, mais les ondes passent par-dessus les murs. Cette nuit, un message codé de la BBC va lancer la libération de l'Europe. Aide Arthur à Londres, puis Marthe à Paris.",
  accroche: "Studio BBC 📻 · Salon parisien 🧣 · Un poème → un débarquement 🌊",

  finTitre: "SAUT TEMPOREL RÉUSSI",
  finTexte: "« Circuits rechargés à {pct} %. Un vers de Verlaine, glissé dans les ondes ennemies, a lancé la libération de l'Europe. La radio franchit les murs et les frontières… mais elle n'existe que le temps qu'elle passe. Pas de trace, pas d'archive : l'appel du 18 juin, jamais enregistré, n'existe plus qu'en TEXTE. Prochain saut : ton époque. » — MARTINE",

  required: 2,
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
  },
};

export default chapter;
