/* ============================================================
   CHAPITRE 3 — Mésopotamie & Égypte : naître de l'écriture (−3300)
   ============================================================
   Tableau 1 (Ur) : QUÊTE narrative — le roi Mesannepada accueille
   l'étranger ; son collecteur d'impôt Narâm-Sîn ne retient plus les
   comptes → on invente l'ÉCRITURE (mini-jeu du registre), puis le
   roi la fait sceller. On file ensuite en Égypte (le Nil), puis en
   Phénicie (l'alphabet) — le voyage est montré par la CARTE (🗺).

   ⚠ Liberté narrative assumée : Ur, Mesannepada et Narâm-Sîn ne
   sont pas exactement contemporains de −3300. MARTINE le sait et en
   sourit ; l'essentiel est vrai : l'écriture naît pour COMPTER.
   ============================================================ */

import SceneUruk from "./scenes/SceneUruk.jsx";
import SceneNil from "./scenes/SceneNil.jsx";
import ScenePhenicie from "./scenes/ScenePhenicie.jsx";
import CarteMesopotamie from "./scenes/CarteMesopotamie.jsx";
import { PortraitMesannepada, PortraitNaram } from "./scenes/portraits.jsx";

/* ------------------------------------------------------------
   LES ÉLÉMENTS
   ------------------------------------------------------------ */
const ITEMS = {
  /* Ur */
  roseaux:  { name: "Roseaux du fleuve", emoji: "🌾", desc: "Des tiges droites et creuses, coupées au bord du canal. Taillées en pointe, elles écrivent." },
  couteau:  { name: "Couteau de silex", emoji: "🔪", desc: "Une lame tranchante. De quoi tailler un roseau en biseau — la pointe du scribe." },
  argile:   { name: "Argile fraîche", emoji: "🟤", desc: "Une motte de terre du fleuve, molle et docile. Elle garde tout ce qu'on y presse." },
  calame:   { name: "Calame", emoji: "🖊", desc: "Un roseau taillé en biseau. Enfoncé dans l'argile, il laisse une marque en forme de coin." },
  sceau:    { name: "Sceau-cylindre", emoji: "🔷", desc: "Un petit cylindre de pierre gravé, celui du roi. Roulé sur l'argile, il imprime une image unique — sa signature." },
  /* SUPPORTS (support: true) : fixes, ne vont pas au sac — repérés en cyan
     par le moteur ; on leur APPORTE un objet (glisser dessus). */
  four:     { name: "Four à tablettes", emoji: "🔥", support: true, desc: "La chaleur transforme l'argile molle en pierre. Ce qui en sort peut défier les millénaires." },
  eau:      { name: "Flaque d'eau", emoji: "💧", support: true, desc: "Une flaque, un canal, une averse… l'ennemie jurée de l'argile encore molle." },

  /* Nil */
  papyrus_tiges: { name: "Tiges de papyrus", emoji: "🌿", desc: "La plante-roi du Nil. Fendue et pressée, elle donne des feuilles." },
  pierre:        { name: "Pierre à presser", emoji: "🪨", support: true, desc: "Une pierre plate et lourde : de quoi écraser les tiges jusqu'à ce qu'elles se collent." },
  encre:         { name: "Roseau & encre", emoji: "🪶", desc: "Un pinceau de roseau et de l'encre noire. De quoi tracer de fins signes." },

  /* Phénicie */
  signes:   { name: "Les 22 signes", emoji: "🅰️", desc: "L'idée géniale des marchands : à peine 22 signes, un pour chaque son. Simple. Rapide à apprendre." },
  navires:  { name: "Navires marchands", emoji: "⛵", desc: "Les bateaux phéniciens sillonnent la Méditerranée. Ils transportent des marchandises… et des idées." },

  /* fabriqués */
  tablette_vierge: { name: "Tablette d'argile", emoji: "🟫", desc: "Une galette d'argile aplatie, lisse, prête à recevoir des signes. Il ne manque que la main du scribe." },
  feuille_papyrus:{ name: "Feuille de papyrus", emoji: "📄", desc: "Lisse, légère, souple : on peut la rouler, la transporter, l'offrir. Prête à recevoir l'écriture." },
};

/* ------------------------------------------------------------
   LES TABLEAUX
   ------------------------------------------------------------ */
const SCENES = [
  /* `nextWhen` : ce qu'il faut avoir transmis pour pouvoir PARTIR au lieu
     suivant (mode linéaire : pas de flèches, un signal apparaît près de
     MARTINE quand ces messages sont faits). */
  { id: "uruk",     name: "La cité d'Ur",        Component: SceneUruk, nextWhen: ["msg_cuneiforme", "msg_sceau"] },
  { id: "nil",      name: "Les bords du Nil",     Component: SceneNil, nextWhen: ["msg_hieroglyphes"] },
  { id: "phenicie", name: "La côte phénicienne",  Component: ScenePhenicie },
];

const WHERE = {
  roseaux: "au bord du canal, dans la cité d'Ur", couteau: "dans la cité d'Ur",
  argile: "au bord du canal, dans la cité d'Ur", sceau: "auprès du roi, dans la cité d'Ur",
  papyrus_tiges: "sur les bords du Nil", encre: "sur les bords du Nil",
  signes: "sur la côte phénicienne", navires: "sur la côte phénicienne",
};

const HIDDEN_BY_FLAG = {};

/* ------------------------------------------------------------
   LES RECETTES
   (le cunéiforme n'est PAS ici : il s'obtient par le mini-jeu du
   registre — voir chapters/mesopotamie-tablette.jsx)
   ------------------------------------------------------------ */
const RECIPES = [
  { a: "roseaux", b: "couteau", out: "calame",
    line: "Tu tailles le roseau en biseau : voilà un CALAME, la pointe du scribe. Enfoncé dans l'argile, il laissera des marques en forme de coins." },
  { a: "calame", b: "argile", out: "tablette_vierge",
    line: "Tu aplatis l'argile en une belle galette lisse : une TABLETTE, prête à écrire. Reste à y porter le registre du collecteur. ⚠ Tant qu'elle n'est pas cuite, garde-la LOIN de l'eau : molle, elle fondrait !" },
  /* MESSAGE PERDU : la tablette laissée à l'eau avant d'être cuite. */
  { a: "tablette_vierge", b: "eau", out: "msg_effacee", msg: true, perdu: true },
  { a: "sceau", b: "argile", out: "msg_sceau", msg: true },
  { a: "papyrus_tiges", b: "pierre", out: "feuille_papyrus",
    line: "Fendues, pressées, séchées : les tiges se collent en une FEUILLE de papyrus, légère et souple." },
  { a: "feuille_papyrus", b: "encre", out: "msg_hieroglyphes", msg: true },
  { a: "signes", b: "navires", out: "msg_alphabet", msg: true },
];

/* ------------------------------------------------------------
   LES MESSAGES (fiches + jauges 1 à 5)
   ------------------------------------------------------------ */
const MESSAGES = {
  msg_cuneiforme: { title: "Écriture cunéiforme", emoji: "🔠",
    jauges: { vitesse: 2, portee: 2, capacite: 4, durabilite: 5 },
    fact: "Vers −3300, dans les cités de Sumer (Uruk, Ur…), on ne compte plus les moutons de tête : trop nombreux. On presse dans l'argile molle, avec un roseau taillé (le calame), des signes en forme de coins : l'écriture cunéiforme. Elle naît pour la COMPTABILITÉ — stocks de grain, impôts, contrats. Détail énorme : le message survit désormais à celui qui l'a émis, sans se déformer. Fini le récit qui s'abîme d'oreille en oreille (le chapitre 1 !) — l'Histoire, avec un grand H, commence là. Et cuite (souvent par accident, dans l'incendie d'un palais), l'argile devient presque éternelle : on a retrouvé des centaines de milliers de tablettes.",
    wiki: "https://fr.wikipedia.org/wiki/Écriture_cunéiforme" },
  msg_sceau: { title: "Sceau / signature", emoji: "🔏",
    jauges: { vitesse: 2, portee: 2, capacite: 1, durabilite: 5 },
    fact: "Un petit cylindre de pierre gravé, qu'on roule sur l'argile fraîche : il y laisse une empreinte unique, impossible à imiter. Un sceau ne dit pas grand-chose, mais il prouve QUI a écrit, qui possède, qui s'engage. C'est l'ancêtre direct de la signature, du cachet officiel… et, à sa manière, du certificat et de la signature numérique d'aujourd'hui : comment être sûr de l'identité de celui qui envoie un message ?" },
  msg_hieroglyphes: { title: "Hiéroglyphes", emoji: "📜",
    jauges: { vitesse: 3, portee: 2, capacite: 4, durabilite: 2 },
    fact: "En Égypte, on écrit sur du PAPYRUS : les tiges de la plante du Nil, tranchées, pressées, séchées, deviennent une feuille légère qu'on roule et qu'on transporte. Le Nil se change en autoroute à messages. On y trace des hiéroglyphes à l'encre. Mais ce support léger est FRAGILE : sans le climat très sec de l'Égypte, presque rien n'aurait survécu. Et écrire reste le privilège d'une petite élite de scribes — savoir écrire, c'est déjà un pouvoir." },
  msg_alphabet: { title: "Alphabet phénicien", emoji: "🔤",
    jauges: { vitesse: 2, portee: 4, capacite: 3, durabilite: 3 },
    fact: "Les Phéniciens, marchands de toute la Méditerranée, en ont assez des centaines de signes du cunéiforme et des hiéroglyphes. Ils ramènent tout à ~22 signes, un par son : l'ALPHABET. Un code simple s'apprend vite et se diffuse partout — porté non par un empire, mais par le COMMERCE, de port en port. Nos lettres A, B, C en descendent (alpha, bêta…). La leçon : pour toucher le plus de monde, un code simple bat un code savant." },
  /* MESSAGE PERDU */
  msg_effacee: { title: "Tablette effacée", emoji: "🟫", perdu: true,
    jauges: { vitesse: 1, portee: 1, capacite: 3, durabilite: 1 },
    fact: "Tu avais tout écrit sur l'argile… mais tu l'as laissée molle, sous la pluie. En une nuit, elle est redevenue une motte de boue : le message a fondu. Terrible ironie de l'archéologie : les tablettes qui nous sont parvenues sont souvent celles qu'un INCENDIE a cuites par accident. Sans cette chance, elles auraient disparu comme celle-ci. La survie d'un message tient parfois à un pur hasard." },
};

/* ------------------------------------------------------------
   LES INDICES (bouton 💡)
   ------------------------------------------------------------ */
const HINTS = [
  { needs: ["roseaux", "couteau"], out: "calame", text: "Ces roseaux sont creux et droits. Taille-en un en pointe avec le couteau : tu auras un calame." },
  { needs: ["calame", "argile"], out: "tablette_vierge", text: "Aplatis une motte d'argile en galette lisse : une tablette, prête pour ton calame." },
  { needs: ["tablette_vierge", "eau"], out: "msg_effacee", text: "Surtout, ne laisse pas cette tablette molle près de l'eau : elle fondrait…" },
  { needs: ["sceau", "argile"], out: "msg_sceau", text: "Le cylindre gravé du roi : roule-le sur un peu d'argile fraîche, il y laissera sa marque." },
  { needs: ["papyrus_tiges", "pierre"], out: "feuille_papyrus", text: "Ces tiges de papyrus : fends-les, puis écrase-les bien sous une pierre lourde." },
  { needs: ["feuille_papyrus", "encre"], out: "msg_hieroglyphes", text: "Une belle feuille lisse, un roseau, de l'encre… trace tes hiéroglyphes." },
  { needs: ["signes", "navires"], out: "msg_alphabet", text: "Ces 22 signes si simples : confie-les aux navires marchands, ils les porteront de port en port." },
];

const NEAR_MISS = [
  { pair: ["roseaux", "argile"], line: "Planter des roseaux bruts dans l'argile ? Taille-les d'abord en calame, sinon ça ne marque rien." },
  { pair: ["tablette_vierge", "four"], line: "Cuire une tablette VIERGE ? Tu obtiendrais une jolie brique muette. Écris D'ABORD ton registre dessus." },
  { pair: ["papyrus_tiges", "encre"], line: "Écrire sur des tiges brutes ? L'encre coule entre les fibres. Fabrique d'abord une vraie feuille." },
  { pair: ["sceau", "four"], line: "Cuire ton sceau de pierre ? Il ne craint pas le feu — mais ce n'est pas là qu'il laisse un message. Roule-le sur l'argile." },
  { pair: ["navires", "argile"], line: "Charger des tonnes d'argile sur un navire ? Il coule. Les Phéniciens, eux, transportent quelque chose de bien plus léger : une idée." },
];

const FAIL_LINES = [
  "Bzzt. Ni Sumer ni l'Égypte n'ont retenu cette idée.",
  "Combinaison rejetée. Un support, un outil : reviens aux bases.",
  "Mes archives cunéiformes restent muettes là-dessus. Réessaie.",
  "Erreur : ces deux-là ne feront pas un message.",
  "Zéro invention détectée. On tente autre chose ?",
];

const INTRO = [
  "Ur, vers −3300 ! Une vraie cité : des murs, un roi, un temple… et surtout des IMPÔTS. Or, devine pourquoi l'écriture est sur le point de naître ici : pas pour la poésie — pour compter le grain et les bêtes.",
  "Le roi Mesannepada t'accueille. Son collecteur, Narâm-Sîn, se noie dans les comptes : impossible de tout retenir de tête. Aide-le à INVENTER une trace qu'on ne puisse pas discuter.",
  "Puis le roi voudra sa signature dans l'argile, et tu descendras le fleuve vers l'Égypte, et la côte des Phéniciens. Suis la carte 🗺 — et recharge-moi une écriture après l'autre.",
];

const ACTIONS = {
  wreck: { mood: "vexe", say: "Oui, encore un atterrissage « créatif ». Note-le sur une tablette si tu veux, mais recharge-moi d'abord." },

  /* LE ROI ET SON COLLECTEUR — `bubble` = leurs paroles, `say` = MARTINE.
     Leurs vraies répliques d'étape sont dans QUETE ; ceci sert de repli. */
  mesannepada: { mood: "neutre",
    bubble: "Je suis Mesannepada, roi d'Ur. Rends-toi utile, étranger, et tu seras traité en ami.",
    say: "Un vrai roi, dans une vraie cité. On est loin de la grotte du chapitre 1 !" },
  naram: { mood: "vexe",
    bubble: "Le berger jure vingt bêtes, le prêtre en note dix-huit… et moi, je perds la tête ! Il me faut une trace SÛRE.",
    say: "Et c'est comme ça, pour compter, que va naître l'écriture. Fabrique-lui de quoi noter." },

  /* ouvre le mini-jeu du registre (« 6 bœufs et 3 blés dans l'étable ») */
  tablette: { modal: "tablette" },

  /* Nil & Phénicie (inchangés) */
  scribe: { mood: "neutre",
    bubble: "L'argile, c'est solide : ça durera mille ans. Mais le pharaon veut que son ordre parte à l'autre bout du royaume, et ce pauvre âne n'en porte que vingt tablettes ! Il me faudrait un support LÉGER. Quelque chose qui pousse ici, au bord de l'eau…",
    say: "Léger et transportable : le papyrus. Plus pratique que l'argile… mais bien plus fragile. On n'a rien sans rien." },
  marchand: { mood: "neutre",
    bubble: "J'ai appris le cunéiforme : sept cents signes ! Des années de travail. Mes marins, eux, ne savent pas écrire — et dans chaque port, il faut noter la cargaison. Il me faudrait un code si SIMPLE qu'on l'apprenne en quelques jours. Vingt signes, trente au plus.",
    say: "Un code simple se répand plus vite qu'un code compliqué : c'est tout le secret de l'alphabet. Tiens, touche la tablette du scribe pour l'essayer toi-même !" },
  alphabet: { modal: "alphabet" },
};

/* ------------------------------------------------------------
   LA QUÊTE — l'histoire d'Ur, étape par étape (façon ch.2).
   perso : qui parle · portrait : gros plan · attend : ce qu'il faut
   accomplir · suite : phrase de MARTINE quand c'est réussi.
   ------------------------------------------------------------ */
const QUETE = [
  { perso: "mesannepada", portrait: "mesannepada", auto: true,
    bubble: "Étranger, te voilà devant Ur, ma cité entre les fleuves. Je suis le roi Mesannepada. Ici, on ne vole ni le grain ni les impôts — et on se rend utile. Va donc voir Narâm-Sîn, mon collecteur : il se noie dans ses comptes. Aide-le, et tu seras des nôtres.",
    say: "Un roi, des murs, des impôts… nous voilà en pleine cité ! Et c'est justement pour compter ces impôts qu'on va inventer l'écriture. File voir le collecteur ›." },

  { perso: "naram", portrait: "naram",
    bubble: "Ah, un peu d'aide ! Écoute mon malheur : je dois noter ce qui entre à l'étable du roi — aujourd'hui, SIX bœufs et TROIS ballots de blé. Mais de mémoire, tout se mélange, et chacun me ment ! Trouve-moi un moyen de garder une trace qu'on ne puisse pas discuter.",
    say: "Voilà l'acte de naissance de l'écriture. Il te faut un calame (taille un roseau au couteau), puis une tablette d'argile — et grave le registre : 6 bœufs, 3 blés.",
    attend: "msg_cuneiforme",
    suite: "Le registre est gravé, cuit dans l'Histoire ! Le roi Mesannepada a eu vent de ton exploit : retourne le voir." },

  { perso: "mesannepada", portrait: "mesannepada",
    bubble: "Magnifique ! Voilà des comptes qu'on ne peut plus contester. Mais pour qu'on sache que ce registre vient de MOI, il y manque ma marque. Prends mon sceau-cylindre et scelle l'argile.",
    say: "Le sceau-cylindre du roi, roulé sur l'argile fraîche : sa signature. L'ancêtre du cachet officiel — et du certificat numérique.",
    attend: "msg_sceau",
    suite: "Ta marque royale est dans l'argile. Le roi te laisse partir — vers l'Égypte, en descendant le fleuve." },

  { perso: "mesannepada", portrait: "mesannepada",
    bubble: "Tu es venu étranger, tu repars scribe honoraire d'Ur. Ta drôle de machine t'appelle. Descends le fleuve vers l'Égypte : là-bas, on écrit sur une plante du bord de l'eau. Et souviens-toi d'Ur.",
    say: "Cap sur le Nil (tableau 2 › ou la carte 🗺). Le papyrus t'y attend — léger, transportable… et bien plus fragile que l'argile." },
];

/* ------------------------------------------------------------
   LA FICHE DU CHAPITRE
   ------------------------------------------------------------ */
const chapter = {
  id: "03-mesopotamie",
  bandeau: "CHAPITRE 3 · −3300",
  date: "−3300",
  epoque: "Mésopotamie",
  emoji: "🏺",

  titre: "MARTINE",
  sousTitre: "Machine À Remonter le Temps Intelligente Néanmoins Excellente",
  presentationTitre: "Chapitre 3 — Naissance de l'écriture.",
  presentation: "Vers −3300, dans la cité d'Ur, les humains inventent un outil qui va tout changer : l'écriture. Elle naît de la comptabilité, dans l'argile. Aide le roi Mesannepada et son collecteur d'impôt, puis descends le fleuve vers l'Égypte et la côte phénicienne pour découvrir hiéroglyphes et alphabet.",
  accroche: "Grave le cunéiforme 🔠 · scelle le sceau du roi 🔏 · trace des hiéroglyphes 📜 · diffuse l'alphabet 🔤",

  finTitre: "SAUT TEMPOREL RÉUSSI",
  finTexte: "« Circuits rechargés à {pct} %. Tu viens d'assister au grand basculement : l'Histoire commence quand on écrit. Un message peut désormais survivre à son auteur, voyager loin, se copier. Mais tout est encore rare, réservé aux scribes… Prochain saut : l'Antiquité — Grèce, Rome, Pompéi. Là-bas, on va stocker le savoir par centaines de milliers de rouleaux. Que peut-il bien arriver à une bibliothèque ? » — MARTINE",

  required: 3,
  startScene: 0,
  destination: "ANTIQUITÉ",
  linear: true,   // navigation guidée : pas de flèches, on avance au signal de MARTINE

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
  portraits: { mesannepada: PortraitMesannepada, naram: PortraitNaram },
  carte: CarteMesopotamie,
};

export default chapter;
