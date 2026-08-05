/* ============================================================
   CHAPITRE 7 — Le XIXe siècle : vaincre la distance (1844 → 1915)
   ============================================================
   4 tableaux de COMMUNICATION, en une histoire — la famille O'Sullivan
   à travers l'Atlantique et l'Amérique :
   1. TÉLÉGRAPHE MORSE (Far West, 1844) — JAMES tape « OR » à New York.
   2. CÂBLE TRANSATLANTIQUE (1866) — James dit à sa famille d'Irlande
      « Venez me rejoindre en Amérique ! ».
   3. STATION MARCONI (nuit du 15 avril 1912) — la génération suivante
      embarque à Cobh sur le Titanic. Le paquebot coule. Depuis la
      station à terre, un mini-jeu : quel outil, parmi tant d'autres,
      peut porter secours dans la nuit ? → l'ANTENNE.
   4. TÉLÉPHONE TRANSCONTINENTAL (25 janvier 1915) — SEAN, fils de
      James, à New York, appelle la famille rescapée à San Francisco
      par la nouvelle ligne AT&T (Bell).
   La PILE DE VOLTA (héritage du ch. 6) alimente le télégraphe.
   ============================================================ */

import SceneTelegraphe from "./scenes/SceneTelegraphe.jsx";
import SceneCable from "./scenes/SceneCable.jsx";
import SceneTSF from "./scenes/SceneTSF.jsx";
import SceneTelephone from "./scenes/SceneTelephone.jsx";
import CarteXIXe from "./scenes/CarteXIXe.jsx";
import { PortraitJames, PortraitMarconi, PortraitSean } from "./scenes/portraits.jsx";

/* ------------------------------------------------------------
   LES ÉLÉMENTS
   ------------------------------------------------------------ */
const ITEMS = {
  /* héritage du chapitre 6 (voyage dans la besace) */
  pile: { name: "Pile de Volta", emoji: "⚡", heirloom: true, desc: "Ta pile du chapitre précédent : la source d'électricité qui rend possible tout ce siècle. La voilà enfin utile — apporte-la au télégraphe !" },

  /* T1 — le bureau du télégraphe (western, ~1849) */
  code_morse: { name: "Manipulateur Morse", emoji: "🎛️", support: true, desc: "La touche du télégraphe : elle coupe le courant en impulsions, courtes et longues — les points et les traits du code Morse. Branche-lui du courant, et tape !" },

  /* T2 — la pose du câble (1866) */
  cable: { name: "Câble gainé", emoji: "➿", desc: "Un fil de cuivre isolé de gutta-percha, capable de résister à l'eau et à la pression. Des milliers de kilomètres à dérouler." },
  ocean: { name: "L'océan", emoji: "🌊", support: true, desc: "Entre l'Europe et l'Amérique, des semaines de bateau… ou quelques minutes, si on ose poser un câble au fond." },

  /* T4 — le téléphone (New York, 1915) : combiner l'écouteur et le
     microphone du téléphone à colonne Bell pour joindre San Francisco. */
  micro:    { name: "Microphone (embouchure)", emoji: "🎙️", desc: "Le petit cône noir au sommet de la colonne Bell : c'est là qu'on PARLE. Une membrane à l'intérieur transforme la voix en courant électrique." },
  ecouteur: { name: "Écouteur", emoji: "🎧", desc: "Le petit combiné qu'on colle à l'oreille : à l'autre bout du fil, la voix redevient vibration. Sean l'a en main — accroche-le au microphone pour faire le circuit." },
};

/* ------------------------------------------------------------
   LES TABLEAUX (4 communication, guidés)
   ------------------------------------------------------------ */
const SCENES = [
  { id: "telegraphe", name: "Le bureau du télégraphe",             Component: SceneTelegraphe, nextWhen: ["msg_telegraphe"] },
  { id: "cable",      name: "La pose du câble transatlantique",    Component: SceneCable,      nextWhen: ["msg_cable"] },
  { id: "tsf",        name: "La station Marconi (nuit du Titanic)", Component: SceneTSF,       nextWhen: ["msg_sos"] },
  { id: "telephone",  name: "Le téléphone transcontinental (1915)", Component: SceneTelephone },
];

const WHERE = {
  pile: "dans ta besace — la pile de Volta du chapitre 6 (si tu ne l'as plus, rejoue le chapitre 6)",
  cable: "à la pose du câble transatlantique",
  micro: "au bureau du téléphone (New York, 1915)", ecouteur: "au bureau du téléphone (New York, 1915)",
};

const HIDDEN_BY_FLAG = {};

/* ------------------------------------------------------------
   LES RECETTES
   ------------------------------------------------------------ */
const RECIPES = [
  /* T1 : brancher la pile au manipulateur ouvre le MINI-JEU Morse (« OR »)
     → gagne msg_telegraphe. La pile est consommée. */
  { a: "pile", b: "code_morse", opens: "morse", consume: ["pile"] },
  /* T2 : le câble au fond de l'océan. */
  { a: "cable", b: "ocean", out: "msg_cable", msg: true },
  /* T3 : la station Marconi — l'action « choisir un outil » ouvre le
     mini-jeu TSF (voir ACTIONS.outils). Pas de recette d'objets ici. */
  /* T4 : brancher l'écouteur au microphone du téléphone à colonne Bell. */
  { a: "micro", b: "ecouteur", out: "msg_telephone", msg: true },
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
    fact: "Le 27 juillet 1866, le paquebot Great Eastern achève de poser un câble télégraphique entre Terre-Neuve (Amérique) et l'Irlande — le premier vraiment opérationnel. Avant, une lettre traversait l'Atlantique en deux semaines, en bateau. Maintenant, le message passe en quelques minutes ! Le monde devient plus petit. Et c'est encore vrai aujourd'hui : nos messages voyagent par des câbles cachés au fond de la mer, qu'on ne voit jamais." },
  msg_sos: { title: "SOS du Titanic (TSF)", emoji: "🆘",
    jauges: { vitesse: 5, portee: 4, capacite: 2, durabilite: 1 },
    fact: "Grâce à Marconi, la TSF (télégraphie sans fil) libère le message de tout câble : des ondes, dans l'air, captées par n'importe quel navire à l'écoute. Nuit du 15 avril 1912 : le Titanic coule après avoir embarqué 113 émigrants irlandais à Cobh (Queenstown). L'opérateur radio Jack Phillips lance un signal d'alerte ; le RMS Carpathia le capte à 60 milles marins et fait route vers l'épave. Environ 700 personnes sont sauvées. Après ce drame, une règle mondiale : les navires doivent toujours écouter la radio. Un simple message peut sauver des vies." },
  msg_telephone: { title: "Téléphone transcontinental (Bell)", emoji: "📞",
    jauges: { vitesse: 5, portee: 3, capacite: 4, durabilite: 1 },
    fact: "Le 25 janvier 1915, Alexander Graham Bell inaugure la première ligne téléphonique transcontinentale des États-Unis, 5 500 km de fil entre New York et San Francisco (AT&T). Il répète à Thomas Watson, à l'autre bout, sa phrase historique : « Mr. Watson – Come here – I want to see you ». Après le télégramme (bips codés) et la TSF (bips sans fil), voici la VOIX qui traverse le continent, en direct : ce n'est plus un message qu'on attend, c'est une CONVERSATION. On peut vraiment prendre des nouvelles de ceux qu'on aime, où qu'ils soient." },
};

/* ------------------------------------------------------------
   LES INDICES (bouton 💡)
   ------------------------------------------------------------ */
const HINTS = [
  { needs: ["pile", "code_morse"], out: "msg_telegraphe", text: "Apporte ta pile de Volta au manipulateur Morse : tu pourras alors taper toi-même le message « OR » en points et traits (petit jeu)." },
  { needs: ["cable", "ocean"], out: "msg_cable", text: "Ose dérouler le grand câble tout au fond de l'océan : il reliera l'Irlande et l'Amérique." },
  { needs: ["micro", "ecouteur"], out: "msg_telephone", text: "Sur le téléphone à colonne : accroche l'écouteur au microphone. La voix de Sean partira jusqu'à San Francisco." },
];

const NEAR_MISS = [
  { pair: ["cable", "micro"], line: "Un câble et un microphone, ce n'est pas le téléphone : Bell utilise déjà des fils tirés d'un continent à l'autre. Cherche l'écouteur pour compléter le circuit." },
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
  "Une cabane de télégraphe en plein Far West : JAMES O'SULLIVAN, émigré irlandais, débarque tout excité — il a trouvé un FILON D'OR ! Il faut télégraphier la nouvelle à ses cousins de New York en une seconde, puis, devenu riche, joindre sa famille restée en Irlande par un câble sous l'océan.",
  "Une génération plus tard, en 1912, la famille embarque à Cobh sur le Titanic… le paquebot coule dans la nuit — mais la TSF de Marconi peut sauver les survivants. Puis, en 1915, SEAN, le fils de James, décroche à New York pour appeler par la toute nouvelle ligne téléphonique transcontinentale, jusqu'à San Francisco.",
];

const ACTIONS = {
  wreck: { mood: "vexe", say: "Oui, j'ai grillé trois fusibles du télégraphe en atterrissant. L'opérateur a cru à un orage magnétique. Recharge-moi avant qu'il ne comprenne." },

  /* Les personnages — leurs vraies répliques d'étape sont dans QUETE. */
  james: { mood: "content",
    bubble: "James O'Sullivan, pour vous servir ! Émigré d'Irlande, venu chercher fortune ici. Et je l'ai trouvée !",
    say: "James O'Sullivan : un Irlandais parti tenter sa chance dans l'Ouest américain." },
  marconi: { mood: "vexe",
    bubble: "Guglielmo Marconi. Un paquebot coule au large et nous captons ses bips de détresse. Il faut agir — MAINTENANT.",
    say: "Marconi : père de la TSF (télégraphie sans fil). L'urgence de sa vie : sauver les rescapés du Titanic." },
  sean: { mood: "neutre",
    bubble: "Sean O'Sullivan, fils de James. Depuis 1912, la famille s'est installée à San Francisco — et depuis peu, une prouesse : la ligne téléphonique traverse tout le pays !",
    say: "Sean O'Sullivan : la génération suivante, en 1915. Il va appeler la famille à San Francisco par la première ligne transcontinentale Bell." },

  /* clique sur l'ÉTABLI d'outils à la station Marconi → mini-jeu TSF */
  outils: { modal: "tsf" },
};

/* ------------------------------------------------------------
   LA QUÊTE — James (télégraphe + câble), Marconi (TSF), Sean (téléphone).
   ------------------------------------------------------------ */
const QUETE = [
  { perso: "james", portrait: "james", auto: true,
    bubble: "Bénie soit la Sainte Patronne ! James O'Sullivan, émigré d'Irlande — et regarde cette pépite : j'ai trouvé le FILON, un vrai, plein d'or ! Il faut prévenir mes cousins à New York avant que la nouvelle s'ébruite. Vite, le télégraphe ! Mais l'appareil est mort… il lui faut du courant. Cette drôle de pile que tu tiens — c'est exactement ça !",
    say: "James a trouvé de l'or et veut télégraphier « OR » à New York, vite ! Apporte ta pile de Volta au manipulateur : tu taperas le message toi-même en Morse.",
    attend: "msg_telegraphe",
    suite: "Message reçu à New York en une seconde ! Mais James pense déjà à sa famille restée en IRLANDE, de l'autre côté de l'océan… Suis-le à bord du navire câblier." },

  { perso: "james", portrait: "james",
    bubble: "Me voilà riche, grâce à Dieu ! Mais mon cœur est resté en Irlande, avec ma vieille mère et mes sœurs. Je voudrais leur écrire : « Venez me rejoindre, il y a de la place pour tout le monde ! ». Seulement, une lettre par bateau met DEUX SEMAINES à traverser l'Atlantique… Comment faire parvenir un message par-delà les océans ?",
    say: "La question de James : franchir l'océan vite. La réponse — un CÂBLE au fond de la mer (câble + océan), justement relié à l'Irlande. Le monde rétrécit d'un coup.",
    attend: "msg_cable",
    suite: "Le câble touche l'Irlande : le message de James file à Cobh en quelques minutes. Sa famille recevra bien la nouvelle. Le temps passe alors — 46 ans plus tard, une nuit d'avril 1912…" },

  { perso: "marconi", portrait: "marconi", auto: true,
    bubble: "Nous sommes en 1912. Une génération après James, sa famille a enfin décidé d'émigrer : ils ont embarqué à Cobh sur le paquebot le plus grand du monde, le Titanic. Cette nuit, ma station capte ses BIPS DE DÉTRESSE — il coule dans l'Atlantique. Vite ! Parmi tous les outils de mon établi, lequel peut porter secours SANS AUCUN FIL, à des centaines de kilomètres ?",
    say: "Clique sur l'établi de Marconi : un mini-jeu s'ouvre. Choisis l'outil capable d'envoyer un message par-dessus la mer, dans la nuit — sans fil.",
    attend: "msg_sos",
    suite: "Les rescapés sont recueillis par le Carpathia ! La famille O'Sullivan s'installe à San Francisco. Trois ans plus tard, à New York, un jeune homme décroche un téléphone…" },

  { perso: "sean", portrait: "sean", auto: true,
    bubble: "Sean O'Sullivan, fils de James, à votre service ! On est le 25 janvier 1915, et une prouesse vient d'être achevée : la première ligne téléphonique TRANSCONTINENTALE d'AT&T — 5 500 km de fil entre New York et San Francisco ! Bell l'a inaugurée hier. Cette fois, ce n'est plus un télégramme : ma tante et ma mère vont ENTENDRE ma voix, en direct. Aide-moi à brancher le combiné.",
    say: "Sur le téléphone à colonne Bell : accroche l'ÉCOUTEUR au MICROPHONE. La voix de Sean partira le long de la ligne jusqu'à San Francisco. Ce n'est plus un message : c'est une CONVERSATION en direct.",
    attend: "msg_telephone",
    suite: "« Allô, San Francisco ? » — les voix se croisent d'un océan à l'autre. Ma jauge déborde : de la plume au fil, du fil au câble, du câble aux ondes, des ondes à la VOIX en direct. Le XXe siècle nous attend." },
];

/* ------------------------------------------------------------
   LA FICHE DU CHAPITRE
   ------------------------------------------------------------ */
const chapter = {
  id: "07-xixe",
  bandeau: "CHAPITRE 7 · XIXe SIÈCLE",
  date: "1844-1915",
  epoque: "XIXe siècle",
  emoji: "📟",

  titre: "MARTINE",
  sousTitre: "Machine À Remonter le Temps Intelligente Néanmoins Excellente",
  presentationTitre: "Chapitre 7 — Vaincre la distance, avec les O'Sullivan.",
  presentation: "Grâce à ta pile de Volta, l'électricité fait voyager le message plus vite que l'homme. Suis la famille O'Sullivan : James télégraphie son filon d'or de l'Ouest, dit « Venez ! » à l'Irlande par le câble sous l'océan ; sa famille embarque sur le Titanic — la TSF de Marconi les sauve ; et son fils Sean, à New York en 1915, appelle San Francisco au téléphone.",
  accroche: "Tape en Morse 📟 · pose le câble transatlantique 🌊 · sauve avec la TSF 🆘 · téléphone à travers le pays 📞",

  finTitre: "SAUT TEMPOREL RÉUSSI",
  finTexte: "« Circuits rechargés à {pct} %. Quel siècle pressé ! Le message file désormais autour du globe en un éclair — par fil, par câble sous la mer, par ondes dans l'air, et pour finir en VOIX vivante d'un océan à l'autre. Mais regarde ta frise : plus c'est rapide et puissant, moins ça dure. Prochain saut : le XXe siècle. La radio et la télévision vont entrer dans chaque foyer… et l'ordinateur va naître. » — MARTINE",

  required: 4,
  startScene: 0,
  destination: "XXe SIÈCLE",
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
  quete: QUETE,
  portraits: { james: PortraitJames, marconi: PortraitMarconi, sean: PortraitSean },
  carte: CarteXIXe,
};

export default chapter;
