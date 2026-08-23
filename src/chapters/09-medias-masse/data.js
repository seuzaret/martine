/* ============================================================
   CHAPITRE 9 — Médias de masse (1969-1990)
   ============================================================
   3 tableaux, la fin du XXe siècle :
   - T1 SALON, 21 juillet 1969, 3h56 : Nathalie et sa mère
     regardent Armstrong marcher sur la Lune en direct. Antenne
     à orienter pour avoir l'image nette. 600 millions de
     spectateurs simultanés — record historique.
   - T2 CHAMBRE D'ADO, 1985 : Julien enregistre un tube de la
     radio sur cassette. Il a aussi une DISQUETTE 3½ » sur son
     bureau (héritage pour le chapitre suivant).
   - T3 BUREAU, 1990 : Céline sur un PC beige. Elle grave un
     CD-Rom. La disquette de Julien vient dormir dans le tiroir…
     jusqu'au chapitre suivant, où on essaiera de la lire.
   ============================================================ */

import SceneSalon1969 from "./scenes/SceneSalon1969.jsx";
import SceneChambre1985 from "./scenes/SceneChambre1985.jsx";
import SceneBureau1990 from "./scenes/SceneBureau1990.jsx";
import CarteMedias from "./scenes/CarteMedias.jsx";
import { PortraitNathalie, PortraitJulien, PortraitCeline } from "./scenes/portraits.jsx";

/* ------------------------------------------------------------
   LES ÉLÉMENTS
   ------------------------------------------------------------ */
const ITEMS = {
  /* ANACHRONISME */
  airpods: { name: "AirPods", emoji: "🎧", anachronic: true, desc: "Des AirPods d'Apple — commercialisés en 2016. Dans une chambre d'ado de 1985, ça détonne au milieu des cassettes." },

  /* T1 — le salon 1969 */
  antenne_rateau: { name: "Antenne râteau", emoji: "📡", desc: "L'antenne du toit, redescendue au salon pour bricolage. Une fois posée sur la TV, il faudra encore l'orienter." },
  antenne_lapin:  { name: "Oreilles de lapin", emoji: "📶", desc: "Deux tiges télescopiques en V à poser sur le téléviseur pour affiner la réception. Sans elles, l'image reste neigeuse." },
  television:     { name: "Téléviseur cathodique", emoji: "📺", support: true, desc: "Un gros meuble bois avec un tube au centre, deux gros boutons rotatifs. Aujourd'hui, un rendez-vous mondial." },

  /* T1 — les JOUETS et bric-à-brac de Nathalie (fausses pistes).
     Marqués `ephemere: true` → ils disparaissent de ton sac
     dès que tu changes de tableau. Ils ne servent à rien : c'est
     pour rendre la recherche de l'antenne moins évidente. */
  poupee:         { name: "Poupée en robe rose", emoji: "🪆", ephemere: true, desc: "Une poupée bien coiffée. Ravissante — mais totalement inutile pour capter la Lune." },
  ours:           { name: "Ours en peluche", emoji: "🧸", ephemere: true, desc: "Doux, rassurant, et sans la moindre antenne intégrée. Repose-le, va." },
  cubes:          { name: "Cubes en bois A/B", emoji: "🎲", ephemere: true, desc: "Pour apprendre l'alphabet. La lettre H comme… « Homme sur la Lune ». Mais ça n'aide pas la réception." },
  balle:          { name: "Balle rayée", emoji: "🏐", ephemere: true, desc: "Elle rebondit très bien. Voilà. C'est tout." },
  livre_enfant:   { name: "Petit livre vert", emoji: "📗", ephemere: true, desc: "Un livre d'images. Nathalie l'a déjà lu trois fois. Il ne remplace pas une antenne." },
  toupie:         { name: "Toupie violette", emoji: "🪀", ephemere: true, desc: "Elle tourne à merveille. Elle ne capte hélas aucune onde hertzienne." },
  pot_ceramique:  { name: "Pot en céramique", emoji: "🏺", ephemere: true, desc: "Purement décoratif. Souvenir de Vallauris — vraiment inutile ici." },
  reveil_vintage: { name: "Radio-réveil", emoji: "⏰", ephemere: true, desc: "Il affiche 3:56 en digits rouges. Pas le temps de rêver — la Lune n'attend pas !" },
  photo_encadree: { name: "Photo de famille", emoji: "🖼️", ephemere: true, desc: "Papa, maman, Nathalie sur la plage. Émouvant, mais toujours pas d'image sur la télé." },
  vase_fleurs:    { name: "Petit vase à fleurs", emoji: "🌹", ephemere: true, desc: "Fleurs artificielles poussiéreuses. Ça ne se mange pas, ça ne capte rien." },

  /* T2 — la chambre d'ado 1985 */
  cassette_vierge: { name: "Cassette vierge", emoji: "📼", desc: "Une TDK 60 minutes. Face A pour les tubes, face B pour les slows. À enrouler avant d'enregistrer — un stylo Bic pour rembobiner si besoin." },
  radio_cassette:  { name: "Radio-cassette double platine", emoji: "🎚️", support: true, desc: "L'objet-culte de 1985 : radio FM à droite, deux platines à gauche pour copier. Une cassette qui joue, une qui enregistre." },

  /* HÉRITAGE pour ch.10 — la disquette 3½ » de Julien */
  disquette: { name: "Disquette 3½ »", emoji: "💾", heirloom: true, desc: "Une disquette Verbatim toute neuve. Julien y sauvegarde ses parties de jeu vidéo. Il t'en donne une : « Elle durera bien 100 ans, non ? » On verra dans 30 ans." },

  /* T3 — le bureau 1990 */
  cd_vierge:  { name: "CD-Rom vierge", emoji: "💿", desc: "Un disque brillant qui fait des arcs-en-ciel. On grave avec un laser des creux si petits qu'on ne les voit pas. Vendu « inaltérable ». Vraiment ?" },
  pc_beige:   { name: "PC beige (unité centrale)", emoji: "🖥️", support: true, desc: "Une tour beige avec un lecteur de disquette 3½ », un lecteur CD, un ventilateur bruyant. Windows 3.0. On y grave, on y calcule, on y écrit." },
};

/* ------------------------------------------------------------
   LES TABLEAUX
   ------------------------------------------------------------ */
const SCENES = [
  { id: "salon69",  name: "Salon, 21 juillet 1969, 3h56 du matin", Component: SceneSalon1969,   nextWhen: ["msg_tv_lune"] },
  { id: "chambre",  name: "Chambre d'ado, 1985",                    Component: SceneChambre1985, nextWhen: ["msg_cassette"] },
  { id: "bureau",   name: "Bureau, 1990",                            Component: SceneBureau1990 },
];

const WHERE = {
  antenne_rateau: "au salon 1969 — posée par terre à côté de la TV",
  antenne_lapin:  "au salon 1969 — sur le meuble TV",
  cassette_vierge: "chambre d'ado 1985 — pile de cassettes sur le bureau",
  disquette: "chambre d'ado 1985 — sur l'étagère à côté du ZX Spectrum (Julien te la donne)",
  cd_vierge: "bureau 1990 — pile de CD-Rom vierges sur le bureau",
};

const HIDDEN_BY_FLAG = {};

/* ------------------------------------------------------------
   LES RECETTES
   ------------------------------------------------------------ */
const RECIPES = [
  /* T1 — assembler l'antenne pour capter la Lune */
  { a: "antenne_rateau", b: "television", out: "rateau_pose", gives: [], consume: ["antenne_rateau"], flag: "rateau_pose",
    line: "📡 Tu poses l'antenne râteau sur le toit — enfin, en bricolage, sur le meuble TV. L'image se dessine mais reste neigeuse : il manque les oreilles de lapin." },
  { a: "antenne_lapin", b: "television", out: "msg_tv_lune", msg: true, consume: ["antenne_lapin"], needsFlag: "rateau_pose",
    line: "📶 Tu poses les oreilles de lapin, tu les ajustes en V. L'image se stabilise — noir et blanc mais net. Sur l'écran, Armstrong descend l'échelle du LM. « That's one small step for man, one giant leap for mankind. »" },

  /* T2 — insérer la cassette dans la platine (ouvre ensuite le mini-jeu PLAY+REC) */
  { a: "cassette_vierge", b: "radio_cassette", out: "cassette_chargee", gives: [], consume: ["cassette_vierge"], flag: "cassette_chargee",
    line: "📼 Tu glisses la cassette dans la platine de droite. Clac. Maintenant clique sur la radio-cassette : il va falloir attendre le bon moment pour presser PLAY+REC." },

  /* T3 — insérer le CD dans le lecteur, ouvre ensuite le mini-jeu de gravure */
  { a: "cd_vierge", b: "pc_beige", out: "cd_charge", gives: [], consume: ["cd_vierge"], flag: "cd_charge",
    line: "💿 Tu glisses le CD-Rom vierge dans le lecteur. Windows 3.0 détecte le disque. Reste à choisir ce qu'on grave dessus — clique sur le PC pour lancer l'assistant de gravure." },
];

/* ------------------------------------------------------------
   LES MESSAGES (fiches + jauges 1 à 5)
   ------------------------------------------------------------ */
const MESSAGES = {
  msg_tv_lune: { title: "Passer à la TV", emoji: "🌕",
    jauges: { vitesse: 5, portee: 5, capacite: 3, durabilite: 2 },
    fact: "21 juillet 1969, 3h56 (heure de Paris). Neil Armstrong pose le pied sur la Lune. Grâce au satellite (Intelsat III), l'image et le son voyagent en direct jusqu'aux téléviseurs de la planète : environ 600 millions de spectateurs regardent en même temps — un humain sur quatre. C'est le PLUS GRAND rendez-vous médiatique de l'Histoire à ce moment. Fait moins connu : la phrase d'Armstrong était préparée depuis des semaines. Et un point d'EMI : la TV met le monde en direct dans le salon, mais un MONDE CHOISI — une rédaction décide quel plan on montre, combien de temps, avec quel commentaire. Regarder le journal télévisé, ce n'est pas voir le monde, c'est voir ce que quelqu'un a sélectionné pour toi." },
  msg_cassette: { title: "Enregistrer une cassette", emoji: "📼",
    jauges: { vitesse: 3, portee: 3, capacite: 3, durabilite: 2 },
    fact: "Cassette audio (Philips, 1963) puis magnétoscope VHS (JVC, 1976) : pour la PREMIÈRE FOIS de l'Histoire, chaque foyer peut ENREGISTRER chez soi la radio, la télé, la musique des copains — puis la copier, la prêter, l'échanger. L'industrie du disque crie déjà au « piratage » (le débat Napster de la fin des années 90 commence là). Mais attention : la bande magnétique se démagnétise avec le temps, se casse, s'aimante par erreur (un simple aimant peut tout effacer). Des archives entières de radio et de télé ont été perdues : les bandes étaient trop chères, on effaçait pour ré-enregistrer par-dessus. Un support qui EXISTE ne garantit pas la SURVIE du message." },
  msg_cd: { title: "CD-Rom & disque optique", emoji: "💿",
    jauges: { vitesse: 3, portee: 4, capacite: 4, durabilite: 2 },
    fact: "CD audio (Philips + Sony, 1982) puis CD-Rom pour l'ordinateur (1985) : un laser lit des creux minuscules gravés sur une couche métallique sous du plastique. On vend le CD comme un support « inaltérable » qui durerait à jamais. La réalité, 30 ans plus tard : beaucoup de CD gravés dans les années 90 sont ILLISIBLES — la couche métallique s'oxyde et se décolle, on appelle ça la « maladie du disque ». Le support censé tout garder ne tient parfois même pas 20 ans. Prochaine étape (chapitre suivant) : on verra ce que devient une disquette héritée d'ici, 30 ans plus tard…" },
};

/* ------------------------------------------------------------
   LES INDICES (bouton 💡)
   ------------------------------------------------------------ */
const HINTS = [
  { needs: ["antenne_rateau", "television"], out: "rateau_pose", text: "Pose d'abord l'antenne râteau sur le téléviseur (glisse-la sur la TV)." },
  { needs: ["antenne_lapin", "television"], out: "msg_tv_lune", text: "Puis pose les oreilles de lapin sur la TV pour affiner : l'image devient nette." },
  { needs: ["cassette_vierge", "radio_cassette"], out: "msg_cassette", text: "Glisse la cassette vierge dans la radio-cassette : Julien enregistre le tube de la radio." },
  { needs: ["cd_vierge", "pc_beige"], out: "msg_cd", text: "Glisse le CD-Rom vierge dans le lecteur du PC : Céline le grave." },
];

const NEAR_MISS = [
  { pair: ["cassette_vierge", "television"], line: "Une cassette dans la TV ? Non — la TV cathodique n'a pas de lecteur. Va dans la chambre d'ado, la radio-cassette t'attend." },
  { pair: ["cd_vierge", "radio_cassette"], line: "Un CD dans une radio-cassette ? En 1985, on ne mélange pas encore les formats. Le CD, c'est pour le PC du bureau." },
];

const FAIL_LINES = [
  "Bzzt. Cette combinaison n'a pas de sens à cette époque.",
  "Non — le média du salon, le média de la chambre et le média du bureau ne se mélangent pas encore.",
  "Erreur : ces deux-là ne feront pas un message ici.",
];

const INTRO = [
  "Le XXe siècle finit avec un boom : la télévision entre dans chaque salon, le magnétoscope dans chaque chambre, l'ordinateur dans chaque bureau. Chacun devient à la fois SPECTATEUR et enregistreur — un basculement historique.",
  "Trois arrêts : 21 juillet 1969, l'Homme sur la Lune en direct devant 600 millions de spectateurs. 1985, un ado enregistre les tubes à la radio pour se faire sa cassette. 1990, une jeune femme grave son premier CD-Rom.",
  "Chaque support promet la durée éternelle. Mais la bande se démagnétise, le CD s'oxyde, la disquette devient illisible. Ne quitte pas ce chapitre sans la disquette que Julien te donne — elle survivra jusqu'au chapitre suivant. Enfin, si elle survit.",
];

const ACTIONS = {
  wreck: { mood: "vexe", say: "J'ai atterri dans un salon des années 60, en plein direct lunaire. Un enfant a cru à un vaisseau spatial. Recharge-moi, on a beaucoup de médias à voir." },

  nathalie: { mood: "content",
    bubble: "Nathalie, 12 ans ! Cette nuit, papa m'a réveillée à 3h du matin : les Américains marchent sur la LUNE ! Sauf que l'image est TOUTE NEIGEUSE. Aide-moi à régler l'antenne, sinon je vais rater l'Histoire !",
    say: "Nathalie : 600 millions de personnes regardent en même temps. Il faut vite régler l'antenne râteau, puis les oreilles de lapin." },

  julien: { mood: "content",
    bubble: "Julien, 15 ans ! Mon groupe préféré passe à 17h à la radio ! J'ai une cassette TDK 60 minutes prête dans la platine de droite. Aide-moi à appuyer sur PLAY+REC pile au bon moment pour l'avoir sans le speaker par-dessus.",
    say: "Julien : avec la cassette, chacun peut enregistrer chez soi. L'industrie du disque n'est PAS contente." },

  platine_rec: { modal: "cassette", needsFlag: "cassette_chargee",
    needMsg: "Il faut d'abord glisser une cassette dans la platine." },

  celine: { mood: "neutre",
    bubble: "Céline, 25 ans, cadre en informatique. On vient de me livrer un GRAVEUR de CD-Rom au bureau — la classe ! Aide-moi à graver mon premier disque. On dit qu'un CD dure 100 ans… on verra bien.",
    say: "Céline : le CD-Rom, censé être « inaltérable ». Sauf que 30 ans plus tard, la couche métallique se décolle." },

  graver_cd: { modal: "graver_cd", needsFlag: "cd_charge",
    needMsg: "Insère d'abord un CD-Rom vierge dans le lecteur du PC (glisse la pile de CD sur l'unité centrale)." },
};

/* ------------------------------------------------------------
   LA FICHE DU CHAPITRE
   ------------------------------------------------------------ */
const chapter = {
  id: "09-medias-masse",
  bandeau: "CHAPITRE 9 · MÉDIAS DE MASSE",
  date: "1969-1990",
  epoque: "Fin XXe siècle",
  emoji: "📺",

  titre: "MARTINE",
  sousTitre: "Machine À Remonter le Temps Intelligente Néanmoins Excellente",
  presentationTitre: "Chapitre 9 — Les médias entrent à la maison.",
  presentation: "En vingt ans, la télévision, le magnétoscope, le CD et l'ordinateur envahissent chaque foyer. Chacun devient à la fois spectateur, enregistreur et graveur. Explore trois arrêts : la Lune en direct (1969), une chambre d'ado (1985), un bureau (1990). Et n'oublie pas la disquette que Julien te donne : on la retrouvera dans 30 ans…",
  accroche: "TV cathodique 📺 · cassettes 📼 · CD-Rom 💿 · disquette 3½ » 💾",

  finTitre: "SAUT TEMPOREL RÉUSSI",
  finTexte: "« Circuits rechargés à {pct} %. Vingt ans, trois révolutions : le direct mondial, l'enregistrement à domicile, la gravure numérique. Chaque support s'est vendu comme « inaltérable ». Regarde ta frise : la durabilité continue de plonger. Prochain saut : ton époque. Et j'ai gardé la disquette de Julien, on va voir ce qu'elle vaut aujourd'hui… » — MARTINE",

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
    nathalie: PortraitNathalie,
    julien: PortraitJulien,
    celine: PortraitCeline,
  },
  carte: CarteMedias,
};

export default chapter;
