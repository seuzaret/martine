/* ============================================================
   CHAPITRE 7 — Le XIXe siècle : électricité, son & image (1876)
   ============================================================
   6 tableaux : 3 « communication » (télégraphe, câble, TSF) et
   3 « arts » (phonographe, photographie, cinéma).
   La PILE DE VOLTA (héritage du ch. 6) sert au télégraphe.
   Voir docs/AJOUTER-UN-CHAPITRE.md.
   ============================================================ */

import SceneTelegraphe from "./scenes/SceneTelegraphe.jsx";
import SceneCable from "./scenes/SceneCable.jsx";
import SceneTSF from "./scenes/SceneTSF.jsx";
import ScenePhonographe from "./scenes/ScenePhonographe.jsx";
import ScenePhoto from "./scenes/ScenePhoto.jsx";
import SceneLumiere from "./scenes/SceneLumiere.jsx";

/* ------------------------------------------------------------
   LES ÉLÉMENTS
   ------------------------------------------------------------ */
const ITEMS = {
  /* héritage du chapitre 6 (voyage dans la besace) */
  pile: { name: "Pile de Volta", emoji: "⚡", heirloom: true, desc: "Ta pile du chapitre précédent : la source d'électricité qui rend possible tout ce siècle. La voilà enfin utile !" },

  /* T1 — bureau du télégraphe */
  code_morse:  { name: "Manipulateur Morse", emoji: "⌨️", desc: "Une touche qui coupe le courant en impulsions : longues et courtes, points et traits. Le code Morse." },
  membrane:    { name: "Membrane", emoji: "🥁", desc: "Une fine feuille qui vibre au son de la voix. Reliée à l'électricité, elle pourrait transmettre la parole…" },
  electricite: { name: "Courant électrique", emoji: "🔌", desc: "Un fil, un peu de courant : de quoi faire voyager un signal à la vitesse de l'éclair." },

  /* T2 — la pose du câble */
  /* support: true → fixe (structure, environnement, être posté au loin) :
     ne va pas au sac, on lui apporte un objet — le moteur l'affiche en cyan. */
  cable: { name: "Câble gainé", emoji: "➿", desc: "Un fil de cuivre isolé de gutta-percha, capable de résister à l'eau et à la pression. Des milliers de kilomètres à dérouler." },
  ocean: { name: "L'océan", emoji: "🌊", support: true, desc: "Entre l'Europe et l'Amérique, des semaines de bateau… ou quelques minutes, si on ose poser un câble au fond." },

  /* T3 — la cabine de TSF */
  antenne: { name: "Antenne", emoji: "📡", support: true, desc: "Un mât dressé vers le ciel, pour lancer et capter des ondes — sans le moindre fil." },
  ondes:   { name: "Ondes hertziennes", emoji: "📶", desc: "Des ondes invisibles qui voyagent seules dans l'air, franchissant la mer et l'horizon." },
  navire:  { name: "Navire en détresse", emoji: "🚢", support: true, desc: "Au loin, un paquebot lance des appels. La radio peut-elle porter secours dans la nuit ?" },

  /* T4 — le salon du phonographe */
  aiguille:      { name: "Aiguille (saphir)", emoji: "🪡", desc: "Une pointe qui grave les vibrations du son dans un sillon — et sait ensuite le relire." },
  cylindre_cire: { name: "Cylindre de cire", emoji: "🥫", desc: "Le premier support du son enregistré. Fragile : il s'use à chaque écoute et fond à la chaleur." },
  disque:        { name: "Disque plat", emoji: "⚫", desc: "Plat, pressé en série, bien plus solide que la cire : le vrai départ de l'industrie du son." },
  chaleur:       { name: "Chaleur de l'été", emoji: "☀️", support: true, desc: "Le soleil tape sur le rebord de la fenêtre. Pour un cylindre de cire, c'est un danger mortel…" },

  /* T5 — l'atelier du photographe */
  plaque:  { name: "Plaque sensible", emoji: "⬛", desc: "Une plaque enduite de sels d'argent : là où la lumière la touche, l'image se fixe d'elle-même." },
  lumiere: { name: "Lumière", emoji: "🔆", support: true, desc: "Sans elle, pas d'image. C'est elle qui « dessine » sur la plaque — d'où le mot photo-graphie : écrire avec la lumière." },

  /* T6 — l'atelier des Lumière */
  photos:    { name: "Série de photos", emoji: "🖼️", desc: "Une longue bande d'images presque identiques, prises à un instant d'intervalle. Défilées vite… elles bougent ?" },
  manivelle: { name: "Manivelle", emoji: "🎡", desc: "Pour faire défiler la pellicule à la bonne vitesse, image après image : 16 par seconde, et l'œil est trompé." },

  /* fabriqués */
  tsf:         { name: "Poste de TSF", emoji: "📻", desc: "La télégraphie SANS FIL : un message qui voyage dans l'air, sans câble, capté par tout navire à l'écoute." },
  phonographe: { name: "Phonographe", emoji: "🎙️", desc: "La machine d'Edison qui grave et rejoue le son sur un cylindre. Une voix, enfin, qu'on peut réécouter." },
};

/* ------------------------------------------------------------
   LES TABLEAUX (3 communication · 3 arts)
   ------------------------------------------------------------ */
const SCENES = [
  { id: "telegraphe", name: "Le bureau du télégraphe",     Component: SceneTelegraphe },
  { id: "cable",      name: "La pose du câble transatlantique", Component: SceneCable },
  { id: "tsf",        name: "La cabine de TSF",             Component: SceneTSF },
  { id: "phono",      name: "Le salon du phonographe",      Component: ScenePhonographe },
  { id: "photo",      name: "L'atelier du photographe",     Component: ScenePhoto },
  { id: "lumiere",    name: "L'atelier des frères Lumière", Component: SceneLumiere },
];

const WHERE = {
  pile: "dans ta besace — la pile de Volta du chapitre 6 (si tu ne l'as plus, rejoue le chapitre 6)",
  code_morse: "au bureau du télégraphe", membrane: "au bureau du télégraphe", electricite: "au bureau du télégraphe",
  cable: "à la pose du câble transatlantique",
  ondes: "à la cabine de TSF",
  aiguille: "au salon du phonographe", cylindre_cire: "au salon du phonographe",
  disque: "au salon du phonographe",
  plaque: "à l'atelier du photographe",
  photos: "à l'atelier des frères Lumière", manivelle: "à l'atelier des frères Lumière",
};

const HIDDEN_BY_FLAG = {};

/* ------------------------------------------------------------
   LES RECETTES
   ------------------------------------------------------------ */
const RECIPES = [
  /* communication */
  { a: "pile", b: "code_morse", out: "msg_telegraphe", msg: true },
  { a: "membrane", b: "electricite", out: "msg_telephone", msg: true },
  { a: "cable", b: "ocean", out: "msg_cable", msg: true },
  { a: "antenne", b: "ondes", out: "tsf",
    line: "Une antenne, et voilà des ondes qui filent dans l'air SANS AUCUN FIL : la TSF de Marconi. Le message se libère enfin des câbles." },
  { a: "tsf", b: "navire", out: "msg_sos", msg: true },
  /* arts */
  { a: "aiguille", b: "cylindre_cire", out: "phonographe",
    line: "Une aiguille qui grave les vibrations sur un cylindre de cire : le PHONOGRAPHE d'Edison (1877). Il enregistre le son… mais la cire est fragile. Passe au disque plat pour faire mieux." },
  { a: "phonographe", b: "disque", out: "msg_gramophone", msg: true },
  /* MESSAGE PERDU : le cylindre de cire, mais laissé à la chaleur. */
  { a: "cylindre_cire", b: "chaleur", out: "msg_voix", msg: true, perdu: true },
  { a: "plaque", b: "lumiere", out: "msg_photo", msg: true },
  { a: "photos", b: "manivelle", out: "msg_cinema", msg: true },
];

/* ------------------------------------------------------------
   LES MESSAGES (fiches + jauges 1 à 5)
   ------------------------------------------------------------ */
const MESSAGES = {
  msg_telegraphe: { title: "Télégraphe électrique", emoji: "📡",
    jauges: { vitesse: 5, portee: 3, capacite: 2, durabilite: 1 },
    fact: "Avec l'électricité (merci la pile de Volta !), on envoie de petits signaux dans un fil : c'est le code Morse, des points et des traits. Pour la première fois, un message va plus vite qu'un cheval : il arrive presque tout de suite, même très loin. C'est aussi la naissance des agences de presse : quelques bureaux vendent la même nouvelle à tous les journaux. Encore aujourd'hui, une bonne habitude : se demander d'où vient l'info." },
  msg_cable: { title: "Câble transatlantique", emoji: "🌊",
    jauges: { vitesse: 5, portee: 4, capacite: 2, durabilite: 2 },
    fact: "En 1866, on pose un immense câble au fond de l'océan pour relier l'Europe et l'Amérique. Avant, une lettre traversait l'Atlantique en deux semaines, en bateau. Maintenant, le message passe en quelques minutes ! Le monde devient plus petit. Et c'est encore vrai aujourd'hui : nos messages voyagent par des câbles cachés au fond de la mer, qu'on ne voit jamais." },
  msg_telephone: { title: "Téléphone", emoji: "📞",
    jauges: { vitesse: 5, portee: 2, capacite: 3, durabilite: 1 },
    fact: "En 1876, Bell invente le téléphone. Une fine membrane vibre quand on parle, et le fil transporte la voix jusqu'à l'autre bout. Pour la première fois, on entend quelqu'un parler en direct, à distance. Ce n'est plus un message qu'on attend : c'est une vraie conversation, tout de suite, même si la personne est très loin." },
  msg_gramophone: { title: "Gramophone & disque", emoji: "💿",
    jauges: { vitesse: 2, portee: 3, capacite: 3, durabilite: 3 },
    fact: "En gravant les vibrations du son dans la cire, puis sur un disque, on réussit un exploit : GARDER le son ! Avant, une voix ou une musique disparaissait aussitôt. Maintenant, on peut réécouter quelqu'un, même longtemps après. C'est aussi le début des disques de musique, qu'on achète et qu'on collectionne." },
  msg_photo: { title: "Photographie", emoji: "📷",
    jauges: { vitesse: 2, portee: 3, capacite: 3, durabilite: 3 },
    fact: "Une plaque spéciale, un peu de lumière, et l'image apparaît toute seule : c'est la photographie. On croit alors tenir une preuve : « la photo ne ment pas ». Mais attention : dès le début, on peut la retoucher, la mettre en scène, choisir ce qu'on montre… et ce qu'on cache. Une image n'est jamais tout à fait neutre : demande-toi toujours qui l'a prise, et pourquoi." },
  msg_cinema: { title: "Cinématographe", emoji: "🎞️",
    jauges: { vitesse: 1, portee: 4, capacite: 4, durabilite: 2 },
    fact: "En 1895, à Lyon, les frères Lumière font défiler des photos très vite : l'image se met à bouger, c'est le cinéma ! Dans le noir, toute une salle rit ou a peur en même temps. Mais la pellicule est fragile et prend feu facilement : beaucoup des tout premiers films ont brûlé ou se sont abîmés. Le cinéma est magique… mais très fragile." },
  msg_sos: { title: "SOS du Titanic", emoji: "🆘",
    jauges: { vitesse: 5, portee: 4, capacite: 2, durabilite: 1 },
    fact: "Nuit de 1912 : le Titanic coule. Grâce à la TSF (la radio sans fil de Marconi), il lance un signal d'alerte dans les airs. D'autres bateaux l'entendent et arrivent : environ 700 personnes sont sauvées. Après ce drame, une règle est créée : les navires doivent toujours écouter la radio. Un simple message peut sauver des vies." },
  /* MESSAGE PERDU */
  msg_voix: { title: "Voix fondue", emoji: "🕯️", perdu: true,
    jauges: { vitesse: 2, portee: 1, capacite: 3, durabilite: 1 },
    fact: "Tu avais enregistré une voix sur un cylindre de cire… mais la cire fond à la chaleur et s'abîme à chaque écoute. Un été trop chaud, et le cylindre coule : la voix a disparu pour toujours. Beaucoup d'enregistrements très anciens se sont perdus comme ça. Plus un support est moderne et pratique… plus il est souvent fragile." },
};

/* ------------------------------------------------------------
   LES INDICES (bouton 💡)
   ------------------------------------------------------------ */
const HINTS = [
  { needs: ["pile", "code_morse"], out: "msg_telegraphe", text: "Le télégraphiste a besoin de courant. Ta pile de Volta + son manipulateur Morse = le télégraphe électrique !" },
  { needs: ["membrane", "electricite"], out: "msg_telephone", text: "Pour faire passer une VOIX dans un fil : une membrane qui vibre + un peu de courant. C'est le téléphone." },
  { needs: ["cable", "ocean"], out: "msg_cable", text: "Ose dérouler le grand câble tout au fond de l'océan : il reliera l'Europe et l'Amérique." },
  { needs: ["antenne", "ondes"], out: "tsf", text: "Une antenne qui lance des ondes dans l'air : voilà comment envoyer un message SANS fil." },
  { needs: ["tsf", "navire"], out: "msg_sos", text: "Le navire coule ! Avec la TSF, envoie-lui un message : la radio peut le sauver." },
  { needs: ["aiguille", "cylindre_cire"], out: "phonographe", text: "L'inventeur veut garder une voix. Une aiguille pour graver + un cylindre de cire pour recevoir le son : le phonographe." },
  { needs: ["phonographe", "disque"], out: "msg_gramophone", text: "La cire s'abîme vite. Grave plutôt sur un disque plat, plus solide : le gramophone." },
  { needs: ["cylindre_cire", "chaleur"], out: "msg_voix", text: "Attention : ne laisse pas ton cylindre de cire au soleil, il fondrait !" },
  { needs: ["plaque", "lumiere"], out: "msg_photo", text: "Une plaque qui réagit à la lumière + un rayon de lumière : l'image se dessine toute seule." },
  { needs: ["photos", "manivelle"], out: "msg_cinema", text: "Fais défiler tes photos très vite avec la manivelle : elles vont se mettre à bouger !" },
];

const NEAR_MISS = [
  { pair: ["membrane", "code_morse"], line: "Une membrane sur un manipulateur Morse ? Le Morse transporte des points, pas des voix. Pour la parole, il te faut du courant et un fil." },
  { pair: ["cable", "ondes"], line: "Un câble ET des ondes, en même temps ? Choisis ton camp : le fil sous l'océan, ou les ondes dans l'air." },
  { pair: ["disque", "chaleur"], line: "Le disque plat, lui, ne craint pas trop la chaleur — c'est le cylindre de cire, le fragile. Rien ne se passe ici." },
  { pair: ["plaque", "manivelle"], line: "Une seule plaque et une manivelle ne font pas un film : il te faut toute une SÉRIE de photos à faire défiler." },
  { pair: ["antenne", "electricite"], line: "L'antenne veut des ONDES à lancer, pas juste du courant. Cherche mieux." },
];

const FAIL_LINES = [
  "Bzzt. Le XIXe siècle n'a pas retenu cette idée.",
  "Combinaison rejetée. Un signal, un support : reviens aux bases.",
  "Mes archives électriques restent muettes là-dessus. Réessaie.",
  "Erreur : ces deux-là ne feront pas un message.",
  "Zéro invention détectée. On tente autre chose ?",
];

const INTRO = [
  "Tu as bien la pile de Volta ? Sans elle, ce siècle ne tourne pas. Bienvenue au XIXe : le siècle pressé, celui qui veut tout aller PLUS VITE et tout GARDER.",
  "Six inventeurs, six obsessions. Trois veulent vaincre la distance : le télégraphiste (une seconde d'un bout à l'autre !), l'ingénieur du câble (le poser sous l'océan), Marconi (sans le moindre fil, pour secourir un navire qui coule).",
  "Trois veulent voler du temps : Edison veut garder une voix pour toujours, Daguerre fixer un instant de lumière, Louis Lumière faire BOUGER les images. Clique sur chacun, écoute-le, aide-le. Trois messages, et on repart.",
];

const ACTIONS = {
  wreck: { mood: "vexe", say: "Oui, j'ai grillé trois fusibles du télégraphe en atterrissant. L'opérateur a cru à un orage magnétique. Recharge-moi avant qu'il ne comprenne." },

  /* LES INVENTEURS — chacun POSE son problème en mots simples (niveau 6e),
     avec une petite piste. C'est l'énigme du tableau : à toi de trouver de
     quoi l'aider. */
  operator: { mood: "neutre",
    bubble: "Une lettre met des jours à cheval. Moi, je veux qu'un message traverse le pays en une seconde ! Mon secret : de l'électricité et un code de points et de traits. Il ne me manque que le courant…",
    say: "Le télégraphe : enfin plus vite que le cheval ! Ta pile de Volta tombe à pic — sers-t'en." },

  field: { mood: "neutre",
    bubble: "De l'autre côté de cet océan, il y a l'Amérique. Un bateau met deux semaines pour y porter une lettre. Et si je posais un très long câble tout au fond de l'eau, pour envoyer le message en quelques minutes ?",
    say: "Relier deux continents par le fond de la mer : le monde rétrécit d'un coup. Ose dérouler ce câble." },

  marconi: { mood: "neutre",
    bubble: "Là-bas, un navire est en train de couler. Aucun fil ne le relie à la terre… Alors comment appeler à l'aide ? Mon idée : envoyer le message SANS aucun fil, dans l'air, grâce à des ondes !",
    say: "La TSF, la radio sans fil : une antenne, des ondes, et on peut sauver ce navire dans la nuit." },

  edison: { mood: "neutre",
    bubble: "Je voudrais qu'une voix puisse être réécoutée, même des années plus tard. Mais le son s'envole tout de suite… comment le garder ? Le son fait vibrer l'air ; et si une aiguille gravait ces vibrations dans de la cire ?",
    say: "Enregistrer le son : pour la première fois, une voix survivra à celui qui l'a poussée. Aiguille + cire !" },

  daguerre: { mood: "neutre",
    bubble: "Regarde ce rayon de lumière. Et si la lumière dessinait toute seule ce qu'elle touche, et gardait ce moment pour toujours ? Il me faut juste une plaque qui réagit à la lumière.",
    say: "La photographie : la « preuve » par l'image… qu'on truque pourtant dès le premier jour. Donne-lui plaque et lumière." },

  louis: { mood: "neutre",
    bubble: "J'ai une longue bande de photos, presque toutes pareilles. Et si je les faisais défiler très vite ?… Peut-être que l'image va se mettre à bouger !",
    say: "Le cinéma ! Des photos qui s'animent, et une salle entière qui vibre en même temps. Tourne la manivelle." },
};

/* ------------------------------------------------------------
   LA FICHE DU CHAPITRE
   ------------------------------------------------------------ */
const chapter = {
  id: "07-xixe",
  bandeau: "CHAPITRE 7 · 1876",
  date: "1876",
  epoque: "XIXe siècle",
  emoji: "📡",

  titre: "MARTINE",
  sousTitre: "Machine À Remonter le Temps Intelligente Néanmoins Excellente",
  presentationTitre: "Chapitre 7 — Le XIXe siècle électrique.",
  presentation: "De 1800 à 1900, l'électricité fait voyager le message plus vite que l'homme (télégraphe, câble sous-marin, téléphone), et le son comme l'image deviennent enregistrables (phonographe, photographie, cinéma). Explore six lieux : trois de communication, trois d'arts.",
  accroche: "Le télégraphe 📡 · le câble 🌊 · le téléphone 📞 · le son enregistré 💿 · la photo 📷 · le cinéma 🎞️",

  finTitre: "SAUT TEMPOREL RÉUSSI",
  finTexte: "« Circuits rechargés à {pct} %. Quel siècle ! Le message file désormais autour du globe en un éclair, et pour la première fois on peut GARDER une voix, un visage, un mouvement. Mais regarde ta frise : plus c'est rapide et puissant, moins ça dure — un cylindre de cire fond, une pellicule brûle. Prochain saut : le XXe siècle. La radio et la télévision vont entrer dans chaque foyer… et l'ordinateur va naître. » — MARTINE",

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
};

export default chapter;
