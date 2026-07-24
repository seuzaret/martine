/* ============================================================
   CHAPITRE 1 — Paléolithique (vers −18 000)
   ============================================================
   CE FICHIER CONTIENT TOUT LE CONTENU DU CHAPITRE.
   Pour modifier un texte, une recette, un indice : c'est ici.
   Les décors (dessins) sont dans le dossier scenes/.
   Le moteur du jeu (src/engine/) n'a jamais besoin d'être touché.
   ============================================================ */

import SceneInterieur from "./scenes/SceneInterieur.jsx";
import SceneExterieur from "./scenes/SceneExterieur.jsx";
import SceneCampement from "./scenes/SceneCampement.jsx";
import SceneRiviere from "./scenes/SceneRiviere.jsx";

/* ------------------------------------------------------------
   LES ÉLÉMENTS
   id : { name (nom affiché), emoji, desc (texte quand on le ramasse) }
   ------------------------------------------------------------ */
const ITEMS = {
  branche:  { name: "Branche souple", emoji: "🌿", desc: "Du noisetier, souple et solide. De quoi fabriquer bien des choses." },
  liane:    { name: "Liane", emoji: "🪢", desc: "Fibre végétale, résistante et élastique. Ça s'étire… et ça revient." },
  silex:    { name: "Silex taillé", emoji: "🔪", desc: "Un éclat fraîchement taillé, tranchant comme un rasoir." },
  ocre:     { name: "Ocre rouge", emoji: "🟠", desc: "Pigment minéral. Broyé, mélangé à de la graisse : de la peinture." },
  /* SUPPORTS (support: true) : fixes, ne vont PAS dans le sac. On leur
     APPORTE un objet (glisser un outil dessus). Le moteur les affiche
     d'une autre couleur (cyan) et refuse de les ramasser. */
  paroi:    { name: "Paroi de la grotte", emoji: "🪨", support: true, desc: "Immense, lisse, à l'abri du vent et de la pluie. Un écran naturel." },
  feu:      { name: "Feu de camp", emoji: "🔥", support: true, desc: "Chaleur, lumière… et le lieu où le clan se rassemble le soir." },
  voix:     { name: "Ta voix", emoji: "🗣️", desc: "Le tout premier média. Livré d'origine avec chaque être humain." },
  tronc:    { name: "Tronc creux", emoji: "🪵", desc: "Un tronc échoué, évidé par l'eau. Ça résonne quand on tape dessus." },
  /* SUPPORT (support: true) : le cerf ne se ramasse PAS. Il boit à la
     rivière, dans le décor : on lui envoie l'ARC ARMÉ (glisser dessus)
     pour le chasser. */
  cerf:     { name: "Cerf", emoji: "🦌", support: true, desc: "Il boit à la rivière, aux aguets. Impossible de l'approcher à pied — il faut le viser de loin, à l'arc." },
  arc:      { name: "Arc", emoji: "🏹", desc: "Branche courbée + liane tendue. Il ne manque qu'un projectile." },
  fleche:   { name: "Flèche", emoji: "➶", desc: "Branche droite, pointe de silex. Elle vole droit." },
  arcarme:  { name: "Arc armé", emoji: "🎯", desc: "Arc + flèche. Prêt pour la chasse." },
  peau:     { name: "Peau de cerf", emoji: "🟤", desc: "Grattée au silex, séchée. Une surface souple… on pourrait y peindre." },
  os:       { name: "Os", emoji: "🦴", desc: "Un long os de cerf, léger et creux à l'intérieur. Tel quel, il ne fait aucun bruit." },
  os_creux: { name: "Os creux percé", emoji: "🪈", desc: "L'os, percé de quelques trous bien placés. Un tube percé, rien de plus… il lui manque un souffle." },
  charbon:  { name: "Charbon de bois", emoji: "⚫", desc: "Bois passé au feu. Ça noircit les doigts — et tout ce qu'on touche." },
};

/* ------------------------------------------------------------
   LES TABLEAUX (dans l'ordre de navigation ‹ ›)
   Component = le dessin correspondant, dans scenes/
   ------------------------------------------------------------ */
const SCENES = [
  { id: "interieur", name: "Au fond de la grotte", Component: SceneInterieur },
  { id: "exterieur", name: "Devant la grotte",     Component: SceneExterieur },
  { id: "campement", name: "Le campement",         Component: SceneCampement },
  { id: "riviere",   name: "La rivière",           Component: SceneRiviere },
];

/* Pour les indices : où trouver chaque élément de base. */
const WHERE = {
  liane: "devant la grotte", ocre: "devant la grotte",
  silex: "au fond de la grotte",
  voix: "au campement", branche: "au campement",
  tronc: "à la rivière",
};

/* Éléments qui disparaissent du jeu quand un drapeau est levé
   (ici : plus de cerf à trouver une fois la chasse réussie). */
const HIDDEN_BY_FLAG = { hunted: ["cerf"] };

/* ------------------------------------------------------------
   LES RECETTES : a + b → out
   - line : réplique de MARTINE en cas de réussite
   - msg: true → c'est un MESSAGE pour le futur (fiche documentaire)
   - Recette-événement (ex. la chasse) :
       gives   : éléments gagnés
       consume : éléments retirés de la besace
       flag    : drapeau levé (les décors peuvent y réagir)
   ------------------------------------------------------------ */
const RECIPES = [
  { a: "branche", b: "liane",  out: "arc",
    line: "Une branche qui plie, une liane qui tire : un ARC. Les humains viennent d'inventer le stockage d'énergie." },
  { a: "branche", b: "silex",  out: "fleche",
    line: "Branche droite + pointe de silex = FLÈCHE. Aérodynamique validée par mes capteurs." },
  { a: "arc",     b: "fleche", out: "arcarme",
    line: "Arc armé. Rappel de sécurité : ne vise que le gibier, pas la machine temporelle." },
  { a: "arcarme", b: "cerf",   out: "chasse", gives: ["peau", "os"], consume: ["cerf"], flag: "hunted",
    line: "Chasse réussie, d'une seule flèche. Respect au cerf : rien ne sera gaspillé. Tu récupères une PEAU et un OS. Retiens : avant de communiquer, les humains ont d'abord dû survivre — et la chasse a fourni les premiers supports." },
  { a: "branche", b: "feu",    out: "charbon",
    line: "Du bois, du feu, et voilà du CHARBON. Le premier crayon de l'humanité sort du foyer." },
  /* le charbon se fait aussi bien avec un gros tronc qu'avec une branche :
     du bois, du feu, et le bois noirci qui reste sert à dessiner. */
  { a: "tronc",   b: "feu",    out: "charbon",
    line: "Tu pousses le tronc dans les braises. Le bois se consume lentement, noircit, et tu en retires du CHARBON — de quoi tracer bien des traits." },
  /* la flûte se fait en 2 temps : on PERCE l'os au silex, puis il faut
     y mettre son SOUFFLE — un instrument muet n'est pas un message. */
  { a: "os",      b: "silex",  out: "os_creux",
    line: "Au silex, tu perces l'os de quelques trous bien placés. Et… rien. Aucun son. Ce n'est encore qu'un tube percé : il lui manque quelque chose de vivant." },
  { a: "os_creux", b: "voix",  out: "msg_flute", msg: true },
  { a: "charbon", b: "paroi",  out: "msg_peinture", msg: true },
  { a: "ocre",    b: "paroi",  out: "msg_mains", msg: true },
  { a: "peau",    b: "charbon", out: "msg_peau", msg: true },
  { a: "peau",    b: "ocre",   out: "msg_peau", msg: true },
  { a: "peau",    b: "tronc",  out: "msg_tambour", msg: true },
  /* La MODE, un mode de communication : au silex, on découpe et ajuste la
     peau/le cuir → un vêtement, une parure. S'habiller, c'est déjà DIRE
     qui on est (son groupe, son rang). */
  { a: "silex",   b: "peau",   out: "msg_mode", msg: true },
  { a: "voix",    b: "feu",    out: "msg_veillee", msg: true },
  /* MESSAGE PERDU (perdu: true) : la combinaison réussit, mais le
     support ne parvient pas au futur → fragment au lieu de cristal.
     Ne compte pas pour le saut temporel. */
  { a: "tronc",   b: "silex",  out: "msg_baton", msg: true, perdu: true },
];

/* ------------------------------------------------------------
   LES MESSAGES POUR LE FUTUR (fiches documentaires)

   Chaque message porte 4 JAUGES notées de 1 à 5 (le fil rouge
   pédagogique du jeu). Échelle commune à TOUS les chapitres :
   🏃 vitesse    1=il faut se déplacer · 2=voyage avec un porteur
                 3=instantané à portée de voix/vue
                 4=instantané sur des km · 5=instantané mondial
   🌍 portee     1=quelques personnes · 2=un clan/village
                 3=une région · 4=un pays · 5=le monde
   📦 capacite   1=une seule idée · 2=quelques signes/une émotion
                 3=un récit/une image · 4=des récits entiers · 5=tout
   ⏳ durabilite 1=disparaît aussitôt · 2=des décennies
                 3=des siècles · 4=des millénaires
                 5=des dizaines de millénaires
   ------------------------------------------------------------ */
const MESSAGES = {
  msg_peinture: { title: "Peinture rupestre", emoji: "🐂",
    jauges: { vitesse: 1, portee: 1, capacite: 3, durabilite: 5 },
    fact: "Au charbon et aux pigments, les humains couvrent les parois de chevaux, bisons, aurochs — comme à Lascaux, vers −18 000. Ces images nous « parlent » encore 20 000 ans plus tard : c'est le plus ancien média conservé. Un message sans mots, mais pas sans sens — et sans son auteur pour l'expliquer : à nous d'interpréter, prudemment.",
    wiki: "https://fr.wikipedia.org/wiki/Grotte_de_Lascaux" },
  msg_mains: { title: "Mains négatives", emoji: "🖐️",
    jauges: { vitesse: 1, portee: 1, capacite: 1, durabilite: 5 },
    fact: "Main plaquée sur la roche, ocre soufflé autour : une main « en négatif ». La grotte de Gargas, dans les Hautes-Pyrénées, en compte plus de 200, vieilles de 27 000 ans ! Le message le plus simple du monde : « J'existe, j'étais là. » L'ancêtre lointain de la signature… et du selfie.",
    wiki: "https://fr.wikipedia.org/wiki/Grotte_de_Gargas" },
  msg_flute: { title: "Flûte en os", emoji: "🪈",
    jauges: { vitesse: 3, portee: 1, capacite: 2, durabilite: 4 },
    fact: "Un os creux, quelques trous percés au silex : une flûte. Les plus anciennes connues ont 35 000 ans (grotte de Hohle Fels) — et la grotte d'Isturitz, au Pays basque, en a livré plus de vingt ! La musique transmet des émotions sans aucun mot : un langage qui n'a pas besoin de traduction. (L'os a survécu 35 000 ans… mais les mélodies, elles, sont perdues à jamais.)",
    wiki: "https://fr.wikipedia.org/wiki/Grottes_d'Isturitz_et_d'Oxocelhaya" },
  msg_tambour: { title: "Tambour", emoji: "🥁",
    jauges: { vitesse: 4, portee: 2, capacite: 2, durabilite: 1 },
    fact: "Une peau tendue sur un tronc creux : le son porte loin, bien plus loin que la voix. Frapper des rythmes codés, c'est envoyer un message à distance — bien plus tard, les « tambours parleurs » d'Afrique transmettront des nouvelles de village en village, à des kilomètres. Le son fut le premier réseau longue distance… mais un son ne laisse aucune trace, et peau et bois pourrissent." },
  msg_peau: { title: "Peau ornée", emoji: "🟤",
    jauges: { vitesse: 2, portee: 2, capacite: 3, durabilite: 2 },
    fact: "Des signes peints sur une peau : un récit qu'on peut rouler, transporter, offrir. Mais attention : contrairement à la pierre, la peau pourrit — presque rien de tel ne nous est parvenu. Grande leçon des médias : un message ne survit que si son SUPPORT survit. (La vraie écriture, elle, naîtra vers −3300 en Mésopotamie.)" },
  msg_mode: { title: "Parure & vêtement (la mode)", emoji: "🧥",
    jauges: { vitesse: 1, portee: 2, capacite: 2, durabilite: 2 },
    fact: "Au silex, on découpe et on assemble la peau : un vêtement. Mais dès le Paléolithique, se couvrir ne sert pas qu'à avoir chaud — on perce des coquillages, des dents, on taille des perles d'ivoire pour se PARER. La mode est un mode de communication : d'un coup d'œil, la parure dit le groupe, le rang, l'âge, le clan de celui qui la porte. C'est un des plus vieux langages visuels, un message qu'on porte sur soi. À Sungir (Russie), une sépulture d'il y a ~34 000 ans a livré 13 300 perles d'ivoire de mammouth, cousues sur les habits d'un chef et de deux enfants : la panoplie du prestige.",
    wiki: "https://fr.wikipedia.org/wiki/Sungir" },
  msg_veillee: { title: "Veillée du récit", emoji: "🌙",
    jauges: { vitesse: 3, portee: 2, capacite: 4, durabilite: 1 },
    fact: "Le soir, autour du feu, les anciens racontent : mythes, techniques de chasse, histoire du clan. Pendant des dizaines de milliers d'années, TOUT le savoir passe par la parole. Sa limite : à chaque fois qu'on le répète, le récit se déforme un peu — comme un secret qui passe d'oreille en oreille. Sans trace écrite, impossible de vérifier la version « originale »." },
  /* MESSAGE PERDU (perdu: true) : durabilité au plancher. */
  msg_baton: { title: "Bois gravé", emoji: "🪵", perdu: true,
    jauges: { vitesse: 1, portee: 1, capacite: 2, durabilite: 1 },
    fact: "Sur un bâton, un tronc, on entaille des signes au silex : un compte, un nom, un message. C'était sans doute le support le PLUS utilisé de toute la Préhistoire — le bois est partout, tendre, facile à graver. Mais voilà : le bois pourrit, brûle, se perd. Des dizaines de milliers de messages de bois ont existé… et pas UN SEUL ne nous est parvenu. C'est la grande injustice de l'archéologie : ce qui a le plus servi a le plus disparu. Un message ne survit que si son support survit." },
};

/* ------------------------------------------------------------
   LES INDICES (bouton 💡) — le premier indice dont l'élève
   possède tous les ingrédients (needs) est proposé.
   ------------------------------------------------------------ */
const HINTS = [
  { needs: ["branche", "liane"], out: "arc", text: "Quelque chose qui plie… avec quelque chose qui s'étire. Ça pourrait propulser." },
  { needs: ["branche", "silex"], out: "fleche", text: "Une branche bien droite avec une pointe qui coupe : ça pourrait voler." },
  { needs: ["arc", "fleche"], out: "arcarme", text: "Tu as l'arme et le projectile. Réunis-les." },
  { needs: ["arcarme"], out: "chasse", text: "Ton arc est armé ! Le cerf boit à la rivière, là-bas. Vise-le : glisse ton arc directement sur lui." },
  { needs: ["branche", "feu"], out: "charbon", text: "Que devient le bois quand il passe dans le feu ? Un outil pour dessiner, peut-être." },
  { needs: ["os", "silex"], out: "os_creux", text: "Cet os est creux à l'intérieur… perce-le avec quelque chose de bien pointu." },
  { needs: ["os_creux", "voix"], out: "msg_flute", text: "Ton os percé ne fera jamais un bruit tout seul. Il lui faut ton souffle." },
  { needs: ["charbon", "paroi"], out: "msg_peinture", text: "Tu as de quoi tracer du noir. Et au fond de la grotte, un immense écran de pierre…" },
  { needs: ["ocre", "paroi"], out: "msg_mains", text: "Du pigment rouge, une paroi… et ta main comme pochoir ?" },
  { needs: ["peau", "charbon"], out: "msg_peau", text: "La peau du cerf est une surface souple. De quoi y tracer un récit ?" },
  { needs: ["peau", "tronc"], out: "msg_tambour", text: "Une peau bien tendue sur quelque chose qui résonne…" },
  { needs: ["silex", "peau"], out: "msg_mode", text: "Avec un silex, tu peux tailler la peau : un vêtement, une parure. Et s'habiller, n'est-ce pas déjà dire qui on est ?" },
  { needs: ["voix", "feu"], out: "msg_veillee", text: "Le soir, le clan se rassemble quelque part. Ta voix y trouverait un public." },
  { needs: ["tronc", "silex"], out: "msg_baton", text: "Un morceau de bois, un silex tranchant… tu pourrais y graver des signes. Mais le bois traverse-t-il vraiment le temps ?" },
];

/* Répliques spéciales pour les erreurs « logiques » (presque !) */
const NEAR_MISS = [
  { pair: ["arc", "cerf"], line: "Un arc sans flèche ? Le cerf te remercie pour la petite brise." },
  { pair: ["fleche", "cerf"], line: "Lancer une flèche à la main… ambitieux. Il te faudrait un engin pour la propulser. Un arc, par exemple." },
  { pair: ["silex", "cerf"], line: "Approcher un cerf avec un silex ? Il court à 60 km/h. Toi non. Trouve une arme à distance." },
  { pair: ["voix", "paroi"], line: "OHÉ !… ohé… ohé… Joli écho. Mais l'écho ne transmet rien au futur : il radote." },
  { pair: ["voix", "cerf"], line: "Tu as parlé au cerf. Il t'a écouté poliment, puis il a continué à boire. Le dialogue inter-espèces attendra." },
  { pair: ["ocre", "feu"], line: "Chauffer l'ocre le fonce — joli, mais ce n'est pas encore un message." },
  { pair: ["os", "voix"], line: "Tu souffles de toutes tes forces dans un os plein. Résultat : tu es rouge, et l'os est toujours muet. Il faudrait d'abord y percer des trous." },
];

/* Répliques d'échec génériques (piochées au hasard) */
const FAIL_LINES = [
  "Bzzt. Ces deux-là n'ont rien à se dire. Essaie autre chose.",
  "Combinaison rejetée. Même mes circuits de secours sont perplexes.",
  "Hmm. Créatif, mais l'Histoire n'a pas retenu cette invention — il y a une raison.",
  "Erreur 404 : invention non trouvée.",
  "Mes capteurs détectent 0 % d'idée et 100 % de bricolage. On réessaie ?",
];

/* Introduction de MARTINE au lancement du chapitre */
const INTRO = [
  "⚠ IMPACT en −18 000. Mes circuits de retour sont grillés. Pour repartir, je carbure à une seule chose : les MESSAGES que les humains laissent au futur.",
  "Regarde ce clan. L'ancienne se meurt, et tout son savoir avec elle. L'enfant veut crier « j'existe ». Le conteur a peur d'oublier quelles baies tuent. Chacun cherche à laisser une trace… sans savoir comment.",
  "Aide-les, un par un. Chaque trace qu'ils réussissent à laisser remplit ma jauge temporelle, à droite. Trois suffiront pour repartir — mais tu peux tout trouver.",
  "Un détail : ici, avant de parler au futur, il faut survivre. Un cerf t'attend à la rivière. Explore avec ‹ › et touche ce qui t'intrigue.",
];

/* Actions spéciales des décors (zones cliquables qui ne ramassent rien).
   say : réplique de MARTINE · goto : numéro du tableau où aller (0 = premier)
   mood : expression de l'avatar ("neutre", "content", "vexe") */
const ACTIONS = {
  wreck: { mood: "vexe", say: "Oui, c'est moi, là, plantée dans le sol. Un seul commentaire sur ma ressemblance avec une noix, UN SEUL, et je te laisse au Paléolithique." },
  cave:  { goto: 0, say: "Tu entres dans la grotte. Il y fait sombre… mais la lumière du matin éclaire une paroi magnifique, au fond." },

  /* LES GENS DU CLAN — un par lieu. Chacun a un problème, et c'est SON
     problème qui donne envie de fabriquer quelque chose. Clique sur eux. */
  /* Chaque personnage a maintenant DEUX voix :
     - `bubble` : ses propres paroles, dans un phylactère à côté de lui ;
     - `say`    : le commentaire de MARTINE, dans sa console (les deux
                  s'affichent en même temps). */
  ancienne: { mood: "neutre",
    bubble: "Je suis la plus vieille, ici. Je connais les chemins, les bêtes, les baies qui tuent. Quand je mourrai, tout ça mourra avec moi… Ce mur, lui, était là avant nous. Il sera là après. Si seulement je pouvais y laisser quelque chose.",
    say: "Tu l'entends ? Elle cherche à faire DURER un savoir plus longtemps qu'une seule vie. Un message pour le futur, ni plus ni moins." },

  enfant: { mood: "content",
    bubble: "Regarde mes mains, toutes rouges d'ocre ! Dis… si je posais ma main bien à plat sur le rocher et que je soufflais de la poudre tout autour, est-ce qu'elle resterait là pour toujours ?",
    say: "« J'existe, j'étais là. » Le plus simple des messages du monde… et le lointain ancêtre du selfie, ma foi." },

  conteur: { mood: "neutre",
    bubble: "Chaque soir, je raconte au clan d'où nous venons et quelles baies tuent. Mais hier, mon petit-fils a redit l'histoire à sa façon… et il s'est trompé sur les baies ! Comment faire pour qu'elle ne change plus jamais ?",
    say: "L'oral se déforme à chaque fois qu'on le répète — un secret qui passe d'oreille en oreille. Et là, l'erreur peut tuer. Il faudrait pouvoir FIXER les mots quelque part." },

  chasseur: { mood: "neutre",
    bubble: "Avant de laisser des messages, il faut manger ! Le cerf est là… mais il court à soixante, et moi non. Si j'avance, il fuit. Il me faudrait un moyen de le toucher de loin.",
    say: "Avant de communiquer, survivre. Aide-le à fabriquer de quoi chasser à distance — l'arc n'est pas loin." },
};

/* ------------------------------------------------------------
   LA FICHE DU CHAPITRE — c'est l'objet que lit le moteur.
   ------------------------------------------------------------ */
const chapter = {
  id: "01-paleolithique",
  bandeau: "CHAPITRE 1 · −18 000",       // petit texte en haut de l'écran de jeu
  date: "−18 000",                       // affichée sur l'écran de bord de MARTINE
  epoque: "Paléolithique",               // nom de l'époque (menu, transitions)
  emoji: "🦣",

  /* Écran titre */
  titre: "MARTINE",
  sousTitre: "Machine À Remonter le Temps Intelligente Néanmoins Excellente",
  presentation: "Un accident temporel vous a projetés en −18 000. Explore quatre lieux — la grotte, le campement, la rivière — trouve des éléments cachés dans le décor et combine-les deux par deux pour fabriquer des outils… et laisser des messages pour le futur.",
  presentationTitre: "Chapitre 1 — Préhistoire.",
  accroche: "Fabrique un arc 🏹 · chasse 🦌 · invente la flûte, le tambour, la peinture…",

  /* Écran de fin — {pct} sera remplacé par le pourcentage de recharge */
  finTitre: "SAUT TEMPOREL RÉUSSI",
  finTexte: "« Circuits rechargés à {pct} %. Tu viens de vivre la grande leçon de la Préhistoire : un média, c'est toujours une idée + un support + un outil — et souvent, il faut d'abord fabriquer le support. Prochaine escale : l'Antiquité, où les humains inventent un truc fou nommé écriture… » — MARTINE",

  /* Règles du chapitre */
  required: 3,          // nombre de messages pour débloquer le saut temporel
  startScene: 1,        // on démarre devant la grotte
  destination: "NÉOLITHIQUE", // affiché sur le bouton de saut

  /* Contenu */
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
