/* ============================================================
   CHAPITRE 4 — Antiquité : la villa de Caius, à Pompéi (an 79)
   ============================================================
   3 tableaux, tous à Pompéi (même fond : la ville + le Vésuve) :
   l'entrée de la villa · la bibliothèque · le jardin & l'atelier.
   QUÊTE : Caius, marchand d'olives, rénove sa villa et prépare
   une grande fête ; il fait venir l'étranger (toi) et ses artisans.
   On note, on invite, on peint, on grave, on écrit — et le Vésuve
   couve, que personne ne regarde…
   ============================================================ */

import SceneEntree from "./scenes/ScenePompei.jsx";
import SceneBibliotheque from "./scenes/SceneAlexandrie.jsx";
import SceneJardin from "./scenes/SceneForum.jsx";
import { PortraitCaius } from "./scenes/portraits.jsx";

/* ------------------------------------------------------------
   LES ÉLÉMENTS
   ------------------------------------------------------------ */
const ITEMS = {
  /* Tableau 1 — l'entrée de la villa */
  voix:     { name: "Ta voix", emoji: "🗣️", desc: "Ta voix peut porter une nouvelle… à condition qu'il y ait du monde pour l'entendre." },
  foule:    { name: "La foule", emoji: "👥", support: true, desc: "La foule de Pompéi, sur la place. Une annonce criée ici fait vite le tour de la ville — mais rien n'en restera demain." },
  pierre:   { name: "Dalle de pierre", emoji: "🪨", support: true, desc: "Une belle dalle à l'entrée de la villa. De quoi graver des lettres que tous verront… pour très longtemps." },

  /* Tableau 2 — la bibliothèque */
  mur:      { name: "Mur enduit frais", emoji: "🧱", support: true, desc: "Un pan de mur tout juste plâtré, encore humide. Peint maintenant, la couleur entrera DANS le mur." },
  pigments: { name: "Pigments", emoji: "🎨", desc: "Rouge cinabre, bleu égyptien, ocres : les couleurs des maîtres de Pompéi." },
  encre:    { name: "Encre", emoji: "🖤", desc: "Un encrier sur le bureau. Avec une bonne page, on peut copier un texte entier." },
  ombilicus:{ name: "Umbilicus", emoji: "🪄", desc: "Le bâton central autour duquel on enroule une page pour en faire un rouleau (volumen)." },
  bibliotheque: { name: "La bibliothèque", emoji: "📚", support: true, desc: "Les rayonnages de Caius. Comme à Alexandrie, on y range les rouleaux pour garder le savoir en un seul lieu." },

  /* Tableau 3 — le jardin & l'atelier */
  cire_abeille: { name: "Cire d'abeille", emoji: "🍯", desc: "De la cire tiède, prise aux ruches du jardin. Coulée sur une planche, elle fait une surface où écrire." },
  planche:  { name: "Planche de bois", emoji: "🪵", desc: "Une planchette bien plane, prise à l'atelier. Creusée et remplie de cire, elle devient une tablette." },
  branche:  { name: "Branche taillée", emoji: "🖊", desc: "Une branchette taillée en pointe : de quoi tracer dans la cire, et lisser pour effacer." },
  vache:    { name: "La vache", emoji: "🐄", support: true, desc: "La vache du jardin. Sa peau, bien préparée, deviendra un support solide : le parchemin." },
  epee:     { name: "Épée", emoji: "⚔️", desc: "Une lame de l'atelier. De quoi prélever et parer une peau." },
  burin:    { name: "Burin", emoji: "🔨", desc: "Un ciseau et un maillet : pour entailler la pierre, lettre après lettre." },
  grattoir: { name: "Grattoir & ponce", emoji: "🔪", desc: "Une lame et une pierre ponce : pour racler et lisser la peau jusqu'à obtenir un parchemin." },

  /* fabriqués */
  tablette_cire: { name: "Tablette de cire", emoji: "🟨", desc: "Une planche remplie de cire : on y écrit au stylet… et on lisse tout pour recommencer. Le brouillon de l'Antiquité." },
  peau:     { name: "Peau brute", emoji: "🟫", desc: "Une peau fraîche. Grattée et poncée, elle deviendra un parchemin." },
  parchemin:{ name: "Parchemin", emoji: "📃", desc: "Une peau devenue page : lisse, solide, durable… mais chère (un troupeau pour un gros livre)." },
  ode:      { name: "L'ode manuscrite", emoji: "📝", desc: "Le poème de Caius, copié à l'encre sur le parchemin. Reste à l'enrouler pour en faire un rouleau." },
  volumen:  { name: "Volumen (rouleau)", emoji: "📜", desc: "Le parchemin enroulé autour de son bâton : un rouleau, qu'on lit en le déroulant. Sa place est à la bibliothèque." },
};

/* ------------------------------------------------------------
   LES TABLEAUX  (tous à Pompéi ; navigation libre dans la villa)
   ------------------------------------------------------------ */
const SCENES = [
  { id: "entree",       name: "L'entrée de la villa", Component: SceneEntree },
  { id: "bibliotheque", name: "La bibliothèque",      Component: SceneBibliotheque },
  { id: "jardin",       name: "Le jardin & l'atelier", Component: SceneJardin },
];

const WHERE = {
  voix: "à l'entrée de la villa, près d'Argos",
  pigments: "dans la bibliothèque", encre: "sur le bureau de la bibliothèque", ombilicus: "dans la bibliothèque",
  cire_abeille: "aux ruches du jardin", planche: "à l'atelier du jardin", branche: "près de l'arbre du jardin",
  epee: "à l'atelier du jardin", burin: "à l'atelier du jardin", grattoir: "à l'atelier du jardin",
};

const HIDDEN_BY_FLAG = {};

/* ------------------------------------------------------------
   LES RECETTES
   ------------------------------------------------------------ */
const RECIPES = [
  /* Noter les travaux : la tablette de cire (support effaçable) */
  { a: "cire_abeille", b: "planche", out: "tablette_cire",
    line: "Tu coules la cire tiède sur la planche creusée : une TABLETTE DE CIRE, prête à écrire." },
  { a: "tablette_cire", b: "branche", out: "msg_cire", msg: true },

  /* Lancer les invitations : la voix + la foule (annonce publique) */
  { a: "voix", b: "foule", out: "invites", gives: [], consume: ["voix"], flag: "invited",
    line: "Tu cries l'invitation de Caius sur la place : la foule se la répète de bouche à oreille, et toute la ville est au courant avant midi. Rapide et large… mais demain, il n'en restera rien." },

  /* La fresque sur le mur frais */
  { a: "pigments", b: "mur", out: "msg_fresque", msg: true },

  /* Graver la gloire de Rome dans la pierre */
  { a: "burin", b: "pierre", out: "msg_inscription", msg: true },

  /* L'ode : peau → parchemin → écrit → rouleau → bibliothèque */
  { a: "vache", b: "epee", out: "peau",
    line: "Tu prélèves et pares une peau sur la bête : brute et poilue, elle ne vaut encore rien pour écrire." },
  { a: "grattoir", b: "peau", out: "parchemin",
    line: "Grattée à la lame, lissée à la ponce : la peau devient PARCHEMIN. Solide et durable… mais il en faut un troupeau pour un gros livre." },
  { a: "parchemin", b: "encre", out: "ode",
    line: "À l'encre, tu copies l'ode de Caius sur le parchemin : un vrai manuscrit. Cher — le savoir écrit redevient un luxe de riches." },
  { a: "ode", b: "ombilicus", out: "volumen",
    line: "Tu enroules le parchemin autour de son bâton : un VOLUMEN. On le lira en le déroulant — impossible de sauter à la page 50." },
  { a: "volumen", b: "bibliotheque", out: "msg_bibliotheque", msg: true },
];

/* ------------------------------------------------------------
   LES MESSAGES (fiches + jauges 1 à 5)
   ------------------------------------------------------------ */
const MESSAGES = {
  msg_cire: { title: "Tablette de cire", emoji: "🪧",
    jauges: { vitesse: 2, portee: 1, capacite: 2, durabilite: 1 },
    fact: "Une planchette de bois remplie de cire : on y écrit au stylet, puis d'un coup du dos plat on LISSE tout pour recommencer. C'est le premier support réinscriptible de l'Histoire — le brouillon, la liste de courses, l'exercice d'écolier. Il ne dure pas, et c'est justement le but. Son lointain descendant ? L'ardoise… et la mémoire réinscriptible de nos ordinateurs (la RAM), qu'on efface et réécrit des milliards de fois." },
  msg_fresque: { title: "Fresque de Pompéi", emoji: "🖼️",
    jauges: { vitesse: 1, portee: 3, capacite: 3, durabilite: 4 },
    fact: "Sur un enduit encore frais, on peint à même le mur : les couleurs pénètrent le plâtre et deviennent le mur lui-même — la fresque. À Pompéi, figée par la cendre du Vésuve en l'an 79, les villas en sont couvertes. Et sur les murs des rues, des milliers de GRAFFITIS — publicités électorales, insultes, déclarations d'amour, comptes de taverne : les « réseaux sociaux » de l'Antiquité, gelés d'un coup par la lave. L'image qui décore, qui vend, qui bavarde.",
    wiki: "https://fr.wikipedia.org/wiki/Peinture_romaine" },
  msg_inscription: { title: "Inscription monumentale", emoji: "🏛",
    jauges: { vitesse: 1, portee: 3, capacite: 2, durabilite: 5 },
    fact: "Graver la gloire (ou la loi) dans la pierre, à l'entrée, là où tout le monde passe : voilà comment on PUBLIE officiellement dans l'Antiquité. « Nul n'est censé ignorer la loi » prend ici son sens littéral. Lent à produire, immobile… mais public, solennel et quasi éternel. Aujourd'hui encore, on grave dans la pierre ce qu'on veut rendre incontestable : monuments, plaques, mémoriaux." },
  msg_bibliotheque: { title: "Le rouleau à la bibliothèque", emoji: "📚",
    jauges: { vitesse: 1, portee: 3, capacite: 5, durabilite: 2 },
    fact: "Peau → parchemin → manuscrit → rouleau : un vrai livre antique, rangé à la bibliothèque. Le rêve d'Alexandrie était de rassembler en un seul lieu TOUT le savoir du monde — jusqu'à ~700 000 rouleaux. Une capacité de stockage inouïe… mais tout au même endroit, sur un support fragile. Et Alexandrie a brûlé. La leçon-mère de l'archivage, encore vraie aujourd'hui : un stock UNIQUE qui disparaît, et tout est perdu. Il faut des COPIES, réparties — jamais tous ses œufs dans le même panier." },
};

/* ------------------------------------------------------------
   LES INDICES (bouton 💡)
   ------------------------------------------------------------ */
const HINTS = [
  { needs: ["cire_abeille", "planche"], out: "tablette_cire", text: "Coule la cire d'abeille sur la planche : tu auras une tablette où écrire." },
  { needs: ["tablette_cire", "branche"], out: "msg_cire", text: "Une tablette de cire, une branche taillée en pointe : note la liste des travaux — et souviens-toi qu'on peut tout effacer." },
  { needs: ["voix", "foule"], out: "invites", text: "Va sur la place avec Argos : crie l'invitation de Caius à toute la foule." },
  { needs: ["pigments", "mur"], out: "msg_fresque", text: "Le mur de la bibliothèque est encore frais : peins-le MAINTENANT avec les pigments." },
  { needs: ["burin", "pierre"], out: "msg_inscription", text: "Cette dalle à l'entrée, ce burin : grave la gloire de Rome pour que tous la voient — et pour l'éternité." },
  { needs: ["vache", "epee"], out: "peau", text: "Pour un parchemin, il faut d'abord une peau : la vache du jardin, une lame…" },
  { needs: ["grattoir", "peau"], out: "parchemin", text: "Gratte et ponce la peau jusqu'à la rendre lisse : un beau parchemin." },
  { needs: ["parchemin", "encre"], out: "ode", text: "Sur ce parchemin, à l'encre du bureau, copie l'ode de Caius." },
  { needs: ["ode", "ombilicus"], out: "volumen", text: "Enroule ton manuscrit autour du bâton (umbilicus) : ça fait un rouleau." },
  { needs: ["volumen", "bibliotheque"], out: "msg_bibliotheque", text: "Range ton rouleau à la bibliothèque, parmi les autres — comme à Alexandrie." },
];

const NEAR_MISS = [
  { pair: ["pierre", "encre"], line: "Écrire sur la pierre à l'encre ? Ça glisse et ça sèche mal. La pierre, ça se GRAVE — prends un burin." },
  { pair: ["peau", "encre"], line: "Écrire sur une peau brute et poilue ? Prépare-la d'abord : gratte-la et ponce-la en parchemin." },
  { pair: ["tablette_cire", "burin"], line: "Un burin sur la cire ? Tu traverses la planche. Une simple branche taillée suffit." },
  { pair: ["parchemin", "ombilicus"], line: "Enrouler un parchemin VIERGE ? Écris d'abord l'ode dessus, sinon ton rouleau ne raconte rien." },
  { pair: ["voix", "pierre"], line: "Crier vers une pierre ? Elle n'écoute pas. Pour une annonce, il te faut une FOULE." },
];

const FAIL_LINES = [
  "Bzzt. Ni la Grèce ni Rome n'ont retenu cette idée.",
  "Combinaison rejetée. Un support, un outil : reviens aux bases.",
  "Mes archives latines restent muettes là-dessus. Réessaie.",
  "Erreur : ces deux-là ne feront pas un message.",
  "Zéro invention détectée. On tente autre chose ?",
];

const INTRO = [
  "Du marbre, des colonnes, une villa cossue… on a changé de standing ! Nous voilà à Pompéi, l'an 79, chez Caius, marchand d'olives. Ne regarde pas trop la montagne, là, au fond : le Vésuve couve — et personne ici ne le sait encore.",
  "Caius rénove sa maison et prépare une grande fête. Il a fait venir des artisans… dont toi, l'étranger. Il va falloir tout noter, inviter la ville, peindre, graver, écrire.",
  "Aide-le : chaque support inventé remplit ma jauge. Trois suffiront pour repartir. Et devine laquelle de ces belles idées va très mal finir…",
];

const ACTIONS = {
  wreck: { mood: "vexe", say: "Oui, je me suis posée dans l'atrium. Non, ce n'était pas prévu. Et non, tu ne graveras pas ça sur la dalle de Caius." },

  /* Caius (repli ; ses vraies répliques sont dans QUETE) */
  caius: { mood: "neutre",
    bubble: "Ma villa doit être la plus belle de Pompéi pour ma fête ! Aide mes artisans, l'étranger.",
    say: "Un riche marchand qui veut éblouir ses invités. À Pompéi, comme partout : montrer qu'on a réussi." },

  /* Argos, l'esclave, à l'entrée (contexte des invitations) */
  argos: { mood: "neutre",
    bubble: "Je suis Argos, l'homme de confiance de Caius. Pour la fête, il faut prévenir toute la ville — mais je n'ai pas de quoi écrire mille invitations ! Le plus simple : la crier sur la place.",
    say: "Pas de papier pour mille personnes ? On CRIE l'annonce à la foule. Vite et large… mais ça ne laisse aucune trace : demain, plus rien." },
};

/* ------------------------------------------------------------
   LA QUÊTE — Caius commande les préparatifs de sa fête.
   ------------------------------------------------------------ */
const QUETE = [
  { perso: "caius", portrait: "caius", auto: true,
    bubble: "Bienvenue chez moi, l'étranger ! Je suis Caius, le plus gros marchand d'olives de Pompéi, et je rénove ma villa pour une fête inoubliable. J'ai fait venir des artisans — sers-toi de leurs outils. Commençons par le commencement : trouve-moi de quoi NOTER toutes les courses et tous les travaux à faire.",
    say: "De quoi noter, effacer, recommencer : une TABLETTE DE CIRE. Cire d'abeille + planche (à l'atelier du jardin), puis une branche taillée en pointe pour écrire dedans.",
    attend: "msg_cire",
    suite: "Parfait, tout est noté ! Maintenant, préviens la ville : va sur la place avec mon esclave Argos pour lancer les invitations." },

  { perso: "caius", portrait: "caius",
    bubble: "Il me faut du MONDE à ma fête ! Accompagne Argos sur la place et lance les invitations à tout Pompéi.",
    say: "Pas le temps d'écrire mille cartons : on CRIE l'annonce. Ta voix + la foule sur la place.",
    attend: "invited",
    suite: "Toute la ville est invitée ! Maintenant, place au décor : je veux d'abord une belle FRESQUE sur mon mur." },

  { perso: "caius", portrait: "caius",
    bubble: "Que mes invités, en entrant, voient tout de suite mon goût et ma richesse ! Je veux une belle fresque sur le mur frais de ma bibliothèque.",
    say: "Une image qui frime pour son propriétaire… la pub existait déjà ! Peins les pigments sur le mur ENCORE FRAIS : la couleur entrera dans le plâtre et tiendra des siècles.",
    attend: "msg_fresque",
    suite: "Splendide fresque ! Puis je veux graver la GLOIRE DE ROME à mon entrée, que tout le monde la voie." },

  { perso: "caius", portrait: "caius",
    bubble: "À l'entrée, sur la belle dalle de pierre, grave la gloire de Rome — et la mienne au passage ! Que tous ceux qui passent la lisent, aujourd'hui et dans mille ans.",
    say: "« Nul n'est censé l'ignorer » : on grave dans la pierre, à l'entrée, là où tout le monde passe. Burin (à l'atelier) + la dalle de l'entrée.",
    attend: "msg_inscription",
    suite: "Magnifique, c'est gravé pour l'éternité ! Dernière chose : une ODE à la montagne, écrite et rangée dans ma bibliothèque." },

  { perso: "caius", portrait: "caius",
    bubble: "J'ai composé une ode à cette belle montagne qui domine la baie (le Vésuve, oui). Va me chercher du PARCHEMIN, copie mon poème, et range-le bien dans ma bibliothèque, comme à Alexandrie.",
    say: "Le parchemin, c'est de la peau : la vache + une épée → peau ; grattoir → parchemin ; encre → l'ode écrite ; umbilicus → rouleau ; puis range-le à la bibliothèque.",
    attend: "msg_bibliotheque",
    suite: "Mon ode est en sûreté dans ma bibliothèque ! Tout est prêt pour la fête. Va donc te reposer, l'étranger — moi je surveille cette montagne, elle fume drôlement aujourd'hui…" },

  { perso: "caius", portrait: "caius",
    bubble: "Grâce à toi, ma villa est prête et ma fête sera la plus belle de Pompéi ! Ta drôle de machine t'appelle… File, l'étranger. Et si un jour on parle encore de moi, ce sera grâce à ce que tu as gravé et écrit ici.",
    say: "Il ne le sait pas, mais c'est le Vésuve qui gardera Pompéi pour l'éternité, sous la cendre… Ma jauge est pleine : le bouton PARTIR nous emmène au Moyen Âge." },
];

/* ------------------------------------------------------------
   LA FICHE DU CHAPITRE
   ------------------------------------------------------------ */
const chapter = {
  id: "04-antiquite",
  bandeau: "CHAPITRE 4 · AN 79",
  date: "an 79",
  epoque: "Antiquité",
  emoji: "🏛",

  titre: "MARTINE",
  sousTitre: "Machine À Remonter le Temps Intelligente Néanmoins Excellente",
  presentationTitre: "Chapitre 4 — L'Antiquité, à Pompéi.",
  presentation: "An 79, à Pompéi : le marchand Caius rénove sa villa pour une grande fête. Aide ses artisans à tout noter (la tablette de cire), inviter la ville, peindre une fresque, graver la pierre et copier un manuscrit à ranger dans sa bibliothèque. Le tout à l'ombre d'un Vésuve qui couve…",
  accroche: "Note sur la cire 🪧 · peins une fresque 🖼️ · grave le marbre 🏛 · copie un manuscrit 📚",

  finTitre: "SAUT TEMPOREL RÉUSSI",
  finTexte: "« Circuits rechargés à {pct} %. Tu as vu le meilleur et le pire : la bibliothèque qui rêve de tout garder… sur un support fragile, au même endroit. La grande leçon : un savoir sans COPIES ne tient qu'à un fil. Au prochain saut, les humains vont changer le FORMAT du livre (des pages !), puis inventer une machine qui copie tout par centaines : l'imprimerie. Direction le Moyen Âge et Gutenberg. » — MARTINE",

  required: 3,
  startScene: 0,
  destination: "MOYEN ÂGE",

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
  portraits: { caius: PortraitCaius },
};

export default chapter;
