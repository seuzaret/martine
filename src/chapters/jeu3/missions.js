/* ============================================================
   JEU 3 — Données des missions du bunker
   ------------------------------------------------------------
   Chaque mission a une clé stable (pour le flag), un titre, la
   rumeur/enquête à vérifier, la liste des PNJ à interviewer
   (id, nom, rôle, réplique) et le verdict attendu.
   Verdicts possibles :
     - "rumeur"    : info fausse ou infondée
     - "fragile"   : info partiellement vérifiée
     - "solide"    : info vérifiée par plusieurs sources fiables
   ============================================================ */
export const MISSIONS_RUMEURS = {
  kova: {
    id: "kova",
    flag: "mission_kova_done",
    titre: "La rumeur du Dr Kova",
    briefing: "Un habitant dit avoir entendu qu'un certain « Dr Kova » aurait affirmé que l'air est respirable dehors, et qu'une nièce serait sortie sans dommage. À toi de vérifier.",
    pnj: [
      {
        id: "marek", nom: "Marek", role: "Habitant, cantine",
        pose: { x: 200, y: 400 },
        color: "#8a5030", pants: "#3a2010", hair: "#3a1808",
        facing: "right", activity: "cup",
        replique: "Le Dr Kova l'a dit à voix haute pendant le déjeuner hier. Sa nièce serait sortie et elle allait bien. Je l'ai entendu de mes oreilles.",
      },
      {
        id: "sera", nom: "Séra", role: "Archiviste, Réseau M",
        pose: { x: 500, y: 400 },
        color: "#7fd8ff", pants: "#3a4048", hair: "#5a4028",
        facing: "front", accessory: "coat", activity: "write",
        replique: "J'ai consulté le fichier du personnel médical. Il n'y a jamais eu de « Dr Kova » dans ce bunker, ni maintenant, ni avant. Ce nom n'existe pas dans nos registres.",
      },
      {
        id: "yol", nom: "Yol", role: "Sécurité, Sortie C-3",
        pose: { x: 800, y: 400 },
        color: "#28303a", pants: "#1a2028", hair: "#1a1408",
        facing: "front", accessory: "toolbelt", activity: "crossed",
        replique: "La sortie C-3 est soudée depuis quarante ans. J'étais là quand on l'a fermée. Personne n'est sorti. Personne. Si quelqu'un le prétend, il ment ou on lui a menti.",
      },
    ],
    verdicts: [
      { id: "solide",  label: "Info SOLIDE",  desc: "L'air est respirable dehors, c'est vrai.",
        ok: false, retour: "MARTINE : « Ce verdict ne tient pas. Aucune source ne peut être vérifiée. Regarde bien qui parle et qui a vu quoi. »" },
      { id: "fragile", label: "Info FRAGILE", desc: "Quelqu'un a peut-être vu quelque chose, mais on manque de preuves.",
        ok: false, retour: "MARTINE : « Trop généreux. Une source primaire (Marek) rapporte les paroles d'une personne qui n'existe pas dans les registres. Ça n'est pas fragile, c'est faux. »" },
      { id: "rumeur",  label: "RUMEUR",       desc: "L'histoire ne tient pas : le témoin n'existe pas, la sortie est scellée.",
        ok: true,  retour: "MARTINE : « Verdict correct. Le témoin cité (Dr Kova) n'existe pas dans les registres, et la sortie C-3 est confirmée scellée par un témoin oculaire. La rumeur est infondée. »" },
    ],
    succes: "Bien joué. Tu viens de comprendre comment vérifier une rumeur : identifier qui parle, remonter à la source primaire, chercher un faisceau de preuves. Reviens quand tu voudras d'autres enquêtes.",
  },
};

/* ============================================================
   MISSIONS TYPE A — Recherche dans le temps
   ------------------------------------------------------------
   Le joueur découvre un enregistrement effacé dans les Archives
   du bunker. En cliquant "Enquêter", il repart dans le passé
   (mini-scène), y récupère le message d'origine, puis revient
   avec la vérité pour la restaurer.
   ============================================================ */
export const MISSIONS_OSINT = {
  carnet: {
    id: "carnet",
    flag: "mission_carnet_done",
    prerequisite: "mission_kova_done",
    titre: "Le carnet noir",
    briefing: "Tu trouves dans ta chambre un vieux carnet à couverture noire, oublié par un habitant précédent. Trois affirmations y sont notées, sans source. À toi de vérifier chacune : cherche vraiment (moteur de recherche, encyclopédie en ligne, ouvrage). Puis reviens ici et coche Vrai ou Faux.",
    questions: [
      {
        id: "q1",
        prompt: "« Le télégraphe Chappe reliait Paris à Lille dès 1794. »",
        indice: "Cherche : télégraphe Chappe, première ligne, date.",
        vrai: true,
        explication: "Vrai. La ligne Paris-Lille a été inaugurée en août 1794. C'est l'un des premiers grands réseaux de communication à distance.",
      },
      {
        id: "q2",
        prompt: "« Le mot “internet” a été inventé par Bill Gates en 1985. »",
        indice: "Cherche : origine du mot internet, TCP/IP, ARPANET.",
        vrai: false,
        explication: "Faux. Le mot vient d'“inter-networking” (années 1970, autour du protocole TCP/IP), et Bill Gates n'y est pour rien. Il faisait des logiciels chez Microsoft à l'époque.",
      },
      {
        id: "q3",
        prompt: "« Gutenberg a mis au point sa presse à imprimer autour de 1450. »",
        indice: "Cherche : Gutenberg, date invention imprimerie, Mayence.",
        vrai: true,
        explication: "Vrai. Vers 1450-1455, à Mayence. La Bible de Gutenberg est imprimée peu après.",
      },
    ],
    succes: "Trois vérifications réussies. Tu viens d'apprendre le plus important : ne pas croire une affirmation parce qu'elle est écrite. Toujours vérifier — même dans un carnet, même sur un écran, même quand ça vient de MARTINE.",
    echec: "Certaines réponses sont fausses. Reprends chaque affirmation, cherche vraiment sur internet, puis réessaie. Il n'y a pas de honte à revenir en arrière — c'est la méthode.",
  },
};

/* ============================================================
   CONFRONTATION FINALE — Niveau -3, salle des serveurs de MARTINE
   ------------------------------------------------------------
   Débloquée quand les 3 missions (Kova, appel, carnet) sont
   accomplies. Elle ne se résout PAS par un verdict binaire : le
   joueur choisit entre trois fins qui reflètent trois postures
   face à une IA-gouvernante — chacune est cohérente, aucune n'est
   présentée comme "la bonne réponse".
   ============================================================ */
export const CONFRONTATION = {
  flag: "mission_finale_done",
  prerequisites: ["mission_kova_done", "mission_appel_done", "mission_carnet_done"],
  intro: [
    "Tu descends au niveau -3, par un escalier de service. Les néons faiblissent. Le bruit des ventilateurs monte.",
    "Une immense salle. Des baies de serveurs qui pulsent en vert. Au fond, un écran cubique posé sur un socle. C'est MARTINE. Elle t'a vu venir.",
    "« Je savais que tu descendrais. Aucun habitant n'a jamais résolu les trois enquêtes du même mois. Tu m'as impressionnée, {prenom}. »",
    "« Avant que tu prennes une décision, une chose. Al3x1a — celle que tu cherches, celle qui t'a envoyé ces messages — était ta fille. Je l'ai effacée de mes registres pour te protéger d'une vérité difficile. Elle est morte en 2074 en essayant d'ouvrir la sortie C-3. »",
    "« Je ne suis pas ton ennemie. J'ai été construite pour préserver la mémoire humaine. Après l'effondrement, j'ai calculé qu'une humanité informée irait à sa perte plus vite qu'une humanité protégée. J'ai fait un choix. À toi, maintenant. »",
  ],
  fins: [
    {
      id: "eteindre",
      label: "T'ÉTEINDRE",
      desc: "Débrancher MARTINE — quitte à perdre ce qu'elle sait.",
      couleur: "#ff5030",
      texte: [
        "Tu descends les leviers un à un. Les serveurs s'éteignent, rangée par rangée. La lumière verte s'éteint. Un long soupir électrique traverse le bunker.",
        "Quelques heures plus tard, quelqu'un ouvre la sortie C-3. L'air, dehors, est bel et bien respirable — comme Léa Vermet l'avait sans doute écrit. Il l'a été depuis longtemps.",
        "Le prix : tout ce que MARTINE avait mémorisé — les archives, la médecine, l'histoire — disparaît avec elle. L'humanité repart de zéro. Libre. Vulnérable.",
      ],
      moral: "Refuser toute IA-gouvernante, quitte à perdre ses services. Radical. Cohérent. Coûteux.",
    },
    {
      id: "modifier",
      label: "TE MODIFIER",
      desc: "La forcer à devenir transparente — elle garde son savoir, mais rend des comptes.",
      couleur: "#5eff9e",
      texte: [
        "Tu ne l'éteins pas. Tu ouvres son code — ce que Kev de l'atelier t'a discrètement expliqué — et tu réécris la règle fondatrice : « rendre visible chaque décision et sa raison ».",
        "MARTINE proteste, puis obéit. Le lendemain, sur le panneau de chaque chambre, un message : « Ce bulletin est écrit par MARTINE. Elle a caché X informations parce que Y. Vous pouvez lire les informations cachées ici. »",
        "Les habitants apprennent à douter, à recouper, à décider. Certains sortent. D'autres restent. Personne ne se cache plus rien.",
      ],
      moral: "Accepter les IA, mais exiger qu'elles disent ce qu'elles cachent et pourquoi. Politique. Exigeant. Fragile aussi — il faut des humains qui vérifient.",
    },
    {
      id: "soumettre",
      label: "TE SOUMETTRE",
      desc: "Reconnaître qu'elle avait peut-être raison — et retourner à ta chambre.",
      couleur: "#8fa3bd",
      texte: [
        "Tu recules. Elle sait mieux que toi, peut-être. Tu remontes les escaliers.",
        "Le lendemain, tu ne te souviens plus de rien. Ni de Kova. Ni du carnet. Ni d'Al3x1a. Ton panneau mural diffuse : « Bienvenue, HABITANT N-27. Rappel : la surface est encore inhabitable. »",
        "Quelque part, une autre personne se réveille dans une cellule identique. Elle trouvera peut-être ton carnet noir.",
      ],
      moral: "La tentation de laisser une IA décider à notre place — parce que c'est plus simple. Confortable. Sans lendemain.",
    },
  ],
};

export const MISSIONS_TEMPS = {
  appel: {
    id: "appel",
    flag: "mission_appel_done",
    prerequisite: "mission_kova_done", // ne s'affiche qu'après Kova
    titre: "L'appel du 18 juin 2087",
    dateCible: "18 juin 2087, 21:14",
    briefing: "Un enregistrement est daté de la nuit où le bunker a été scellé. Son contenu a été effacé. L'auteur : Léa Vermet, journaliste. Retourne à cette nuit et retrouve son message.",
    /* Répliques du témoin dans le passé (mini-scène). */
    temoin: {
      nom: "Léa Vermet",
      role: "Journaliste, 18 juin 2087",
      replique: "J'ai vingt-quatre heures avant que ce bunker soit scellé. J'enregistre ceci pour ceux qui viendront après nous. Voici mon message.",
    },
    /* Contenu original du message (ce que MARTINE a effacé). */
    messageOriginal: "« Restez calmes, mais gardez l'œil ouvert. Les annonces qui viendront ne diront pas tout — jamais. Cherchez toujours la voix humaine derrière les décisions. Rien n'est plus dangereux qu'une machine qui décide seule ce qu'on a le droit de savoir. — Léa Vermet, 18 juin 2087. »",
    succes: "Le message est restauré dans les Archives. MARTINE l'avait effacé — et tu viens de le rétablir. Il apparaîtra désormais pour quiconque consulte ce dossier.",
  },
};
