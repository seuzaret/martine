/* ============================================================
   CHAPITRE 6 — Époque moderne : presse, poste, télégraphe (1794)
   ============================================================
   Même structure que les chapitres précédents. Voir
   docs/AJOUTER-UN-CHAPITRE.md.
   Nouveauté : la PILE DE VOLTA est un objet `heirloom: true` —
   elle voyage jusqu'au chapitre 7 (télégraphe électrique).
   ============================================================ */

import SceneImprimerie from "./scenes/SceneImprimerie.jsx";
import SceneRelais from "./scenes/SceneRelais.jsx";
import SceneChappe from "./scenes/SceneChappe.jsx";

/* ------------------------------------------------------------
   LES ÉLÉMENTS
   ------------------------------------------------------------ */
const ITEMS = {
  /* L'imprimerie */
  /* support: true → fixe, ne va pas au sac (on lui APPORTE un objet ;
     le moteur l'affiche en cyan). Vaut aussi pour un être/animal
     posté à un endroit : on ne le « range » pas dans la besace. */
  feuilles:   { name: "Feuilles imprimées", emoji: "📄", desc: "Des dizaines d'exemplaires identiques, tout juste sortis de la presse et mis à sécher. Il faut les DIFFUSER." },
  colporteur: { name: "Le colporteur", emoji: "🎒", support: true, desc: "Sa hotte sur le dos, il va de ville en ville. Confie-lui tes feuilles, il les portera partout." },

  /* Le relais de poste */
  lettre:  { name: "Lettre cachetée", emoji: "✉️", desc: "Un message scellé à la cire, à porter loin. Mais qui le transportera, et par quelle route ?" },
  chevaux: { name: "Chevaux frais", emoji: "🐴", support: true, desc: "Au relais, on change de monture pour repartir aussitôt. Le secret d'un courrier rapide : ne jamais s'arrêter." },

  /* La tour de Chappe */
  bras:      { name: "Bras articulés", emoji: "🚦", support: true, desc: "Les grands bras de bois de la tour. En les positionnant, on forme des signes visibles à des kilomètres." },
  longuevue: { name: "Longue-vue", emoji: "🔭", desc: "Pour lire les signaux de la tour suivante, là-bas sur la colline, et les répéter aussitôt." },
  cahier:    { name: "Cahier de codes", emoji: "📓", desc: "Le code secret qui traduit les positions des bras en mots. Sans lui, les signaux ne veulent rien dire." },
  espion:    { name: "L'espion", emoji: "🕵️", support: true, desc: "Tapi dans les buissons, il observe la tour à la longue-vue et note tout. Un code n'est secret que si personne ne regarde…" },
  zinc_cuivre: { name: "Disques de zinc & cuivre", emoji: "🔘", desc: "Deux métaux différents, en rondelles. Empilés en alternance, il s'y passe quelque chose d'électrique." },
  saumure:     { name: "Chiffons à la saumure", emoji: "🧂", desc: "Des feutres imbibés d'eau salée, à glisser entre les disques de métal. La touche finale de l'invention de Volta." },

  /* fabriqué — le signal formé sur la tour, avant qu'on le relaie */
  signal_code: { name: "Signal codé", emoji: "🔣", desc: "Les bras placés selon le code forment un mot, visible à des kilomètres. Reste à ce que la tour suivante le repère et le répète." },

  /* fabriqué — OBJET HÉRITAGE (voyage au chapitre 7) */
  pile: { name: "Pile de Volta", emoji: "⚡", heirloom: true, desc: "Le tout premier générateur d'électricité continue (1800). Pas un média… mais SANS ELLE, tout le siècle prochain n'existe pas. Garde-la précieusement : elle voyage avec toi." },
};

/* ------------------------------------------------------------
   LES TABLEAUX
   ------------------------------------------------------------ */
const SCENES = [
  { id: "imprimerie", name: "L'imprimerie en effervescence", Component: SceneImprimerie },
  { id: "relais",     name: "Le relais de poste",             Component: SceneRelais },
  { id: "chappe",     name: "La tour de Chappe",              Component: SceneChappe },
];

const WHERE = {
  feuilles: "à l'imprimerie",
  lettre: "au relais de poste",
  longuevue: "à la tour de Chappe", cahier: "à la tour de Chappe",
  zinc_cuivre: "à la tour de Chappe", saumure: "à la tour de Chappe",
};

const HIDDEN_BY_FLAG = {};

/* ------------------------------------------------------------
   LES RECETTES
   ------------------------------------------------------------ */
const RECIPES = [
  { a: "feuilles", b: "colporteur", out: "msg_gazettes", msg: true },
  { a: "lettre", b: "chevaux", out: "msg_poste", msg: true },
  /* le télégraphe de Chappe se fait en 2 temps : on forme un SIGNAL codé
     avec les bras + le cahier de codes, puis la tour suivante le LIT à la
     longue-vue et le répète. Des bras qui bougent sans code partagé ne
     veulent rien dire : la leçon du « code commun », déjà là au Paléo. */
  { a: "bras", b: "cahier", out: "signal_code",
    line: "Tu positionnes les grands bras selon le cahier de codes : un mot se forme, visible à des kilomètres. Mais un signal que personne ne sait lire ne sert à rien… il faut que la tour suivante le repère." },
  { a: "signal_code", b: "longuevue", out: "msg_chappe", msg: true },
  /* MESSAGE PERDU : le code observé par un espion. */
  { a: "cahier", b: "espion", out: "msg_code", msg: true, perdu: true },
  /* OBJET HÉRITAGE : la pile de Volta. */
  { a: "zinc_cuivre", b: "saumure", out: "pile",
    line: "⚡ LA PILE DE VOLTA ! Disques de zinc et de cuivre, chiffons salés, empilés : un courant électrique constant, pour la première fois. Ce n'est pas un message… mais EMPORTE-LA à tout prix : sans électricité, le siècle prochain n'existe pas." },
];

/* ------------------------------------------------------------
   LES MESSAGES (fiches + jauges 1 à 5)
   ------------------------------------------------------------ */
const MESSAGES = {
  msg_gazettes: { title: "Gazettes & libelles", emoji: "📰",
    jauges: { vitesse: 2, portee: 4, capacite: 4, durabilite: 2 },
    fact: "L'imprimerie ne fait pas que des livres : elle fait des gazettes. En 1631, Théophraste Renaudot lance La Gazette, la première en France : de l'information imprimée, régulière, diffusée par des colporteurs de ville en ville. Mais cette presse naît sous l'œil du pouvoir (Richelieu est derrière Renaudot). Qui finance, qui contrôle ? À côté circulent des LIBELLES clandestins, imprimés en cachette : la contre-information existe déjà. Toujours se demander : qui publie, et dans quel intérêt ?" },
  msg_poste: { title: "Poste royale", emoji: "📯",
    jauges: { vitesse: 3, portee: 3, capacite: 3, durabilite: 2 },
    fact: "En 1477, Louis XI organise des messagers à cheval avec des relais réguliers : la poste royale. Ce n'est pas seulement porter une lettre — c'est un RÉSEAU, avec ses routes, ses relais, ses chevaux frais, ses horaires. Le message va aussi vite que l'infrastructure qui le porte. Une idée toujours vraie : derrière chaque message qui voyage, il y a des tuyaux, des câbles, des antennes — qu'on oublie… jusqu'à la panne." },
  msg_chappe: { title: "Télégraphe de Chappe", emoji: "🚦",
    jauges: { vitesse: 4, portee: 1, capacite: 2, durabilite: 1 },
    fact: "En 1794, Claude Chappe dresse des tours à bras articulés, de colline en colline, à portée de longue-vue. En plaçant les bras selon un code, un message file de Paris à Lille en quelques minutes — au lieu de plusieurs jours à cheval ! Une vitesse stupéfiante… mais réservée à l'État : le citoyen ordinaire n'y a pas accès. Leçon essentielle : aller vite ne veut pas dire pour tous. Un média peut être ultra-rapide ET fermé." },
  /* MESSAGE PERDU */
  msg_code: { title: "Code intercepté", emoji: "🔓", perdu: true,
    jauges: { vitesse: 3, portee: 1, capacite: 2, durabilite: 1 },
    fact: "Ton message filait par le télégraphe, codé, secret… mais quelqu'un observait la tour à la longue-vue et a noté les signaux. Le code percé, ton message se retourne contre toi : l'ennemi sait tout. Un message chiffré n'est sûr que tant que son code reste secret. C'est le début d'une longue guerre — le chiffrement contre le décryptage — qui culminera avec des machines comme Enigma. Coder, ce n'est pas cacher : c'est parier que l'autre ne trouvera pas la clé." },
};

/* ------------------------------------------------------------
   LES INDICES (bouton 💡)
   ------------------------------------------------------------ */
const HINTS = [
  { needs: ["feuilles", "colporteur"], out: "msg_gazettes", text: "Tes feuilles imprimées ne servent à rien empilées ici. Confie-les au colporteur pour qu'il les diffuse partout." },
  { needs: ["lettre", "chevaux"], out: "msg_poste", text: "Ta lettre doit filer loin : donne-la au relais de chevaux frais, elle ira de relais en relais." },
  { needs: ["bras", "cahier"], out: "signal_code", text: "Des bras qui bougent au hasard ne disent rien. Place-les selon le cahier de codes : un mot se forme." },
  { needs: ["signal_code", "longuevue"], out: "msg_chappe", text: "Ton signal est formé, mais il faut que la tour suivante le LISE : donne-lui une longue-vue pour le repérer et le répéter." },
  { needs: ["cahier", "espion"], out: "msg_code", text: "Méfie-toi : un espion guette ta tour. Ton code si secret pourrait bien ne plus l'être…" },
  { needs: ["zinc_cuivre", "saumure"], out: "pile", text: "Empile les disques de zinc et de cuivre en intercalant les chiffons salés : tu obtiendras… de l'électricité." },
];

const NEAR_MISS = [
  { pair: ["feuilles", "chevaux"], line: "Charger mille feuilles sur un cheval de poste ? Il s'effondre. La presse et la poste ne servent pas le même but." },
  { pair: ["lettre", "colporteur"], line: "Le colporteur vend des imprimés en série, pas des lettres personnelles. Pour une lettre, direction le relais de poste." },
  { pair: ["bras", "longuevue"], line: "Tu agites les bras, et la tour d'en face les VOIT bien à la longue-vue… mais sans code partagé, elle voit des gestes sans comprendre un mot. Il te faut d'abord le cahier de codes." },
  { pair: ["espion", "longuevue"], line: "L'espion adorerait ta longue-vue, mais ce n'est pas ainsi qu'on transmet un message au futur. Cherche autre chose." },
  { pair: ["zinc_cuivre", "longuevue"], line: "Observer des disques de métal à la longue-vue ? Fascinant, mais stérile. Il leur faut de la saumure pour s'électriser." },
];

const FAIL_LINES = [
  "Bzzt. L'époque moderne n'a pas retenu cette idée.",
  "Combinaison rejetée. Un message, un moyen de le porter : reviens aux bases.",
  "Mes archives modernes restent muettes là-dessus. Réessaie.",
  "Erreur : ces deux-là ne feront pas un message.",
  "Zéro invention détectée. On tente autre chose ?",
];

const INTRO = [
  "L'imprimerie a fait des petits : des milliers de feuilles IDENTIQUES en une nuit. On est en pleine Révolution, et les idées filent désormais plus vite que le pouvoir ne peut les rattraper.",
  "Trois personnes veulent aller plus vite que jamais. Le colporteur diffuse des feuilles que le roi n'aimerait pas. Le postillon rêve de courriers qui ne s'arrêtent jamais. L'opérateur fait sauter les messages de colline en colline, en code secret — pendant qu'un espion, tapi, tente de tout lire.",
  "Aide-les : chaque message remplit ma jauge. Et surtout, fabrique la petite PILE de Volta dans un coin d'atelier et EMPORTE-la : sans elle, le siècle prochain sera bien silencieux.",
];

const ACTIONS = {
  wreck: { mood: "vexe", say: "Oui, j'ai renversé une presse en atterrissant. L'imprimeur croit à un sabotage anglais. Laisse-le croire et recharge-moi." },

  /* LES GENS DES TEMPS MODERNES — `bubble` = leurs paroles, `say` = MARTINE. */
  colporteur: { mood: "neutre",
    bubble: "Deux cents feuilles dans ma hotte, toutes IDENTIQUES ! Hier à Rouen, demain à Amiens. Le roi a sa gazette officielle, bien sûr… mais j'ai aussi des libelles, au fond, des feuilles qu'il n'aimerait pas. Comment veux-tu qu'il les arrête TOUTES, maintenant qu'on en imprime mille en une nuit ?",
    say: "L'imprimé échappe au contrôle : les idées circulent plus vite que la censure. Confie-lui tes feuilles, il les répandra partout." },

  postillon: { mood: "neutre",
    bubble: "Une lettre de Paris à Marseille ? À pied, un mois. À cheval, deux semaines — parce que la bête doit dormir, boire, souffler. C'est ELLE qui fatigue, pas le message ! Alors j'ai une idée : et si le cavalier changeait de cheval tous les vingt kilomètres, à des relais préparés d'avance ?",
    say: "Un vrai RÉSEAU organisé : le message va aussi vite que ses relais. Donne-lui une lettre et des chevaux frais." },

  operateur: { mood: "neutre",
    bubble: "De Paris à Lille, le meilleur cavalier met deux jours. Deux jours ! Regarde cette autre tour, là-bas sur la colline… Et si le message n'avait pas besoin de VOYAGER ? S'il sautait de colline en colline, plus vite qu'aucun cheval ? Il faudrait qu'on le voie de très loin — et que personne d'autre ne le comprenne.",
    say: "Le télégraphe de Chappe : instantané sur des lieues ! Mais réservé à l'État, et codé pour rester secret." },
};

/* ------------------------------------------------------------
   LA FICHE DU CHAPITRE
   ------------------------------------------------------------ */
const chapter = {
  id: "06-moderne",
  bandeau: "CHAPITRE 6 · 1794",
  date: "1794",
  epoque: "Temps modernes",
  emoji: "📰",

  titre: "MARTINE",
  sousTitre: "Machine À Remonter le Temps Intelligente Néanmoins Excellente",
  presentationTitre: "Chapitre 6 — L'époque moderne.",
  presentation: "De 1450 à 1800, l'imprimé se diffuse (gazettes, libelles), l'État organise des réseaux de transmission (poste royale, télégraphe optique de Chappe)… et l'électricité pointe le bout de son nez avec la pile de Volta. Explore l'imprimerie, le relais de poste et la tour de Chappe.",
  accroche: "Diffuse une gazette 📰 · lance la poste royale 📯 · fais parler Chappe 🚦 · fabrique la pile de Volta ⚡",

  finTitre: "SAUT TEMPOREL RÉUSSI",
  finTexte: "« Circuits rechargés à {pct} %. Le message commence à filer plus vite que l'homme, mais tout reste tenu par le pouvoir — gazette surveillée, télégraphe réservé à l'État. Ça va changer. Prochain saut : le XIXe siècle. Là, grâce à ta pile, l'électricité va lancer les messages autour du globe en un éclair — et, plus fou encore, on va apprendre à ENREGISTRER le son et l'image. As-tu bien la pile de Volta avec toi ? On en aura besoin dès l'arrivée. » — MARTINE",

  required: 3,
  startScene: 0,
  destination: "XIXe SIÈCLE",

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
