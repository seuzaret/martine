/* ============================================================
   CHAPITRE 7 — Le XIXe siècle : vaincre la distance (1844 → 1912)
   ============================================================
   Recentré sur 3 tableaux de COMMUNICATION, en une histoire :
   1. LE TÉLÉGRAPHE MORSE (bureau western, ligne Baltimore–Washington,
      1844) — mini-jeu : taper le message « OR » en points et traits.
   2. LE CÂBLE TRANSATLANTIQUE (1866) — relier l'Europe et l'Amérique
      par le fond de l'océan.
   3. LA TSF (radio sans fil de Marconi) — le SOS du Titanic (1912).
   La PILE DE VOLTA (héritage du ch. 6) alimente le télégraphe.
   (Les arts — phonographe, photo, cinéma — sont mis de côté pour un
   futur chapitre.)
   ============================================================ */

import SceneTelegraphe from "./scenes/SceneTelegraphe.jsx";
import SceneCable from "./scenes/SceneCable.jsx";
import SceneTSF from "./scenes/SceneTSF.jsx";
import CarteXIXe from "./scenes/CarteXIXe.jsx";

/* ------------------------------------------------------------
   LES ÉLÉMENTS
   ------------------------------------------------------------ */
const ITEMS = {
  /* héritage du chapitre 6 (voyage dans la besace) */
  pile: { name: "Pile de Volta", emoji: "⚡", heirloom: true, desc: "Ta pile du chapitre précédent : la source d'électricité qui rend possible tout ce siècle. La voilà enfin utile — apporte-la au télégraphe !" },

  /* T1 — le bureau du télégraphe (western, Baltimore–Washington 1844) */
  /* support: true → fixe, on lui APPORTE un objet (le moteur l'affiche en cyan). */
  code_morse: { name: "Manipulateur Morse", emoji: "🎛️", support: true, desc: "La touche du télégraphe : elle coupe le courant en impulsions, courtes et longues — les points et les traits du code Morse. Branche-lui du courant, et tape !" },

  /* T2 — la pose du câble */
  cable: { name: "Câble gainé", emoji: "➿", desc: "Un fil de cuivre isolé de gutta-percha, capable de résister à l'eau et à la pression. Des milliers de kilomètres à dérouler." },
  ocean: { name: "L'océan", emoji: "🌊", support: true, desc: "Entre l'Europe et l'Amérique, des semaines de bateau… ou quelques minutes, si on ose poser un câble au fond." },

  /* T3 — la cabine de TSF */
  antenne: { name: "Antenne", emoji: "📡", support: true, desc: "Un mât dressé vers le ciel, pour lancer et capter des ondes — sans le moindre fil." },
  ondes:   { name: "Ondes hertziennes", emoji: "📶", desc: "Des ondes invisibles qui voyagent seules dans l'air, franchissant la mer et l'horizon." },
  navire:  { name: "Navire en détresse", emoji: "🚢", support: true, desc: "Au loin, un paquebot lance des appels dans la nuit. La radio peut-elle porter secours ?" },

  /* fabriqué */
  tsf: { name: "Poste de TSF", emoji: "📻", desc: "La télégraphie SANS FIL : un message qui voyage dans l'air, sans câble, capté par tout navire à l'écoute." },
};

/* ------------------------------------------------------------
   LES TABLEAUX (3 communication)
   ------------------------------------------------------------ */
const SCENES = [
  { id: "telegraphe", name: "Le bureau du télégraphe",           Component: SceneTelegraphe },
  { id: "cable",      name: "La pose du câble transatlantique",  Component: SceneCable },
  { id: "tsf",        name: "La cabine de TSF",                  Component: SceneTSF },
];

const WHERE = {
  pile: "dans ta besace — la pile de Volta du chapitre 6 (si tu ne l'as plus, rejoue le chapitre 6)",
  cable: "à la pose du câble transatlantique",
  ondes: "à la cabine de TSF",
};

const HIDDEN_BY_FLAG = {};

/* ------------------------------------------------------------
   LES RECETTES
   ------------------------------------------------------------ */
const RECIPES = [
  /* T1 : brancher la pile au manipulateur ouvre le MINI-JEU Morse
     (taper « OR ») → le télégraphe électrique. */
  { a: "pile", b: "code_morse", opens: "morse" },
  /* T2 : le câble au fond de l'océan. */
  { a: "cable", b: "ocean", out: "msg_cable", msg: true },
  /* T3 : la TSF (antenne + ondes), puis l'appel au navire en détresse. */
  { a: "antenne", b: "ondes", out: "tsf",
    line: "Une antenne, et voilà des ondes qui filent dans l'air SANS AUCUN FIL : la TSF de Marconi. Le message se libère enfin des câbles." },
  { a: "tsf", b: "navire", out: "msg_sos", msg: true },
];

/* ------------------------------------------------------------
   LES MESSAGES (fiches + jauges 1 à 5)
   ------------------------------------------------------------ */
const MESSAGES = {
  msg_telegraphe: { title: "Télégraphe électrique (Morse)", emoji: "📟",
    jauges: { vitesse: 5, portee: 3, capacite: 2, durabilite: 1 },
    fact: "En 1844, Samuel Morse relie Baltimore à Washington par un simple fil électrique. Grâce à la pile, il envoie de petits signaux — des points et des traits, le code Morse — et un message traverse le pays en une SECONDE, là où un cheval mettait des jours. Mais attention : ces bips ne veulent rien dire sans le CODE partagé des deux côtés. C'est aussi la naissance des agences de presse (Havas, 1835 → AFP) : quelques bureaux vendent la même nouvelle à tous les journaux. Bonne habitude, encore aujourd'hui : se demander d'où vient l'info." },
  msg_cable: { title: "Câble transatlantique", emoji: "🌊",
    jauges: { vitesse: 5, portee: 4, capacite: 2, durabilite: 2 },
    fact: "En 1866, on pose un immense câble au fond de l'océan pour relier l'Europe et l'Amérique. Avant, une lettre traversait l'Atlantique en deux semaines, en bateau. Maintenant, le message passe en quelques minutes ! Le monde devient plus petit. Et c'est encore vrai aujourd'hui : nos messages voyagent par des câbles cachés au fond de la mer, qu'on ne voit jamais." },
  msg_sos: { title: "SOS du Titanic (TSF)", emoji: "🆘",
    jauges: { vitesse: 5, portee: 4, capacite: 2, durabilite: 1 },
    fact: "Grâce à Marconi, la TSF (télégraphie sans fil) libère le message de tout câble : des ondes, dans l'air, captées par n'importe quel navire à l'écoute. Nuit de 1912 : le Titanic coule et lance son signal d'alerte dans les airs. D'autres bateaux l'entendent et arrivent : environ 700 personnes sont sauvées. Après ce drame, une règle mondiale : les navires doivent toujours écouter la radio. Un simple message peut sauver des vies." },
};

/* ------------------------------------------------------------
   LES INDICES (bouton 💡)
   ------------------------------------------------------------ */
const HINTS = [
  { needs: ["pile", "code_morse"], out: "msg_telegraphe", text: "Le télégraphiste a besoin de courant. Apporte ta pile de Volta au manipulateur Morse : tu pourras alors taper toi-même le message en points et traits (petit jeu)." },
  { needs: ["cable", "ocean"], out: "msg_cable", text: "Ose dérouler le grand câble tout au fond de l'océan : il reliera l'Europe et l'Amérique." },
  { needs: ["antenne", "ondes"], out: "tsf", text: "Une antenne qui lance des ondes dans l'air : voilà comment envoyer un message SANS fil." },
  { needs: ["tsf", "navire"], out: "msg_sos", text: "Le navire coule ! Avec la TSF, envoie-lui un message : la radio peut le sauver." },
];

const NEAR_MISS = [
  { pair: ["cable", "ondes"], line: "Un câble ET des ondes, en même temps ? Choisis ton camp : le fil sous l'océan, ou les ondes dans l'air." },
  { pair: ["antenne", "cable"], line: "L'antenne veut des ONDES à lancer dans l'air, pas un câble à traîner au fond de l'eau. Cherche mieux." },
  { pair: ["pile", "ocean"], line: "Jeter ta précieuse pile à l'océan ? Malheureux ! Garde-la pour le télégraphe." },
];

const FAIL_LINES = [
  "Bzzt. Le XIXe siècle n'a pas retenu cette idée.",
  "Combinaison rejetée. Un signal, un support : reviens aux bases.",
  "Mes archives électriques restent muettes là-dessus. Réessaie.",
  "Erreur : ces deux-là ne feront pas un message.",
  "Zéro invention détectée. On tente autre chose ?",
];

const INTRO = [
  "Tu as bien la pile de Volta ? Sans elle, ce siècle ne tourne pas. Bienvenue au XIXe : le siècle pressé, celui qui veut vaincre la DISTANCE.",
  "D'abord une cabane de télégraphe, en plein Far West : Jessie Tombstone, prospecteur, débarque tout excité — il a trouvé un FILON D'OR et veut prévenir sa famille à New York en une seconde ! À toi de taper son message en Morse, avec ta pile pour alimenter l'appareil.",
  "Ensuite, on pose un câble géant au fond de l'Atlantique pour relier deux continents ; enfin, avec Marconi, on lance des ondes SANS fil pour sauver un navire dans la nuit. Trois messages, et on repart.",
];

const ACTIONS = {
  wreck: { mood: "vexe", say: "Oui, j'ai grillé trois fusibles du télégraphe en atterrissant. L'opérateur a cru à un orage magnétique. Recharge-moi avant qu'il ne comprenne." },

  /* Les personnages — ils posent leur problème en mots simples (niveau 6e). */
  jessie: { mood: "content",
    bubble: "Nom d'un coyote ! JESSIE TOMBSTONE, prospecteur ! Regarde cette pépite — j'ai trouvé le FILON, un vrai, plein d'or ! Faut prévenir ma famille à New York avant que la nouvelle s'ébruite : on va être riches ! Vite, le télégraphe ! Mais l'appareil est mort… il lui faut du courant. Cette drôle de pile que tu tiens — c'est exactement ça !",
    say: "Jessie a trouvé de l'or et veut télégraphier « OR » à New York, vite ! Apporte ta pile de Volta au manipulateur : tu taperas le message toi-même en Morse." },
  field: { mood: "neutre",
    bubble: "De l'autre côté de cet océan, il y a l'Amérique. Un bateau met deux semaines pour y porter une lettre. Et si je posais un très long câble tout au fond de l'eau, pour envoyer le message en quelques minutes ?",
    say: "Relier deux continents par le fond de la mer : le monde rétrécit d'un coup. Ose dérouler ce câble." },
  marconi: { mood: "neutre",
    bubble: "Là-bas, un navire est en train de couler. Aucun fil ne le relie à la terre… Alors comment appeler à l'aide ? Mon idée : envoyer le message SANS aucun fil, dans l'air, grâce à des ondes !",
    say: "La TSF, la radio sans fil : une antenne, des ondes, et on peut sauver ce navire dans la nuit." },
};

/* ------------------------------------------------------------
   LA FICHE DU CHAPITRE
   ------------------------------------------------------------ */
const chapter = {
  id: "07-xixe",
  bandeau: "CHAPITRE 7 · XIXe SIÈCLE",
  date: "1844-1912",
  epoque: "XIXe siècle",
  emoji: "📟",

  titre: "MARTINE",
  sousTitre: "Machine À Remonter le Temps Intelligente Néanmoins Excellente",
  presentationTitre: "Chapitre 7 — Vaincre la distance.",
  presentation: "Grâce à ta pile de Volta, l'électricité fait voyager le message plus vite que l'homme. Sur la nouvelle ligne Baltimore–Washington, tape un message en Morse ; pose un câble géant au fond de l'Atlantique pour relier deux continents ; puis, avec Marconi, lance des ondes SANS fil pour sauver un navire dans la nuit.",
  accroche: "Tape en Morse 📟 · pose le câble transatlantique 🌊 · lance la TSF 🆘",

  finTitre: "SAUT TEMPOREL RÉUSSI",
  finTexte: "« Circuits rechargés à {pct} %. Quel siècle pressé ! Le message file désormais autour du globe en un éclair — par fil, par câble sous la mer, puis sans aucun fil dans les airs. Mais regarde ta frise : plus c'est rapide et puissant, moins ça dure. Prochain saut : le XXe siècle. La radio et la télévision vont entrer dans chaque foyer… et l'ordinateur va naître. » — MARTINE",

  required: 3,
  startScene: 0,
  destination: "XXe SIÈCLE",

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
  carte: CarteXIXe,
};

export default chapter;
