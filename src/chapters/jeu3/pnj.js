/* ============================================================
   JEU 3 — Catalogue des PNJ « ambiants » (Cluedo)
   ------------------------------------------------------------
   Chaque PNJ a un id unique + une pose (x, y aux PIEDS du perso),
   un jeu de couleurs (haut, bas, peau, cheveux), une orientation
   (facing "front"/"left"/"right"), une posture (poseKind "stand"
   ou "sit"), un accessoire de métier optionnel, et surtout une
   activité (activity) qui remplace les bras et anime un geste
   caractéristique du métier.
   ============================================================ */
export const PNJ_ROOMS = {
  cantine: [
    { id: "cantine_nel",  nom: "Nel",  role: "Serveuse",
      pose: { x: 240, y: 400 }, color: "#8a5030", pants: "#3a2010", hair: "#5a3018",
      facing: "right", accessory: "apron", activity: "wipe",
      replique: "Je vois passer tout le monde ici. Personne ne mange plus à la même table depuis le mois dernier. Il y a comme une méfiance." },
    { id: "cantine_dor",  nom: "Dor",  role: "Cuisinier",
      pose: { x: 500, y: 400 }, color: "#c8d4e2", pants: "#3a2818", hair: "#1a1408",
      facing: "front", accessory: "apron", activity: "stir",
      replique: "Les rations viennent d'en-haut, du niveau 1. On me les donne, je les cuisine, je ne pose pas de questions. C'est comme ça depuis toujours." },
    { id: "cantine_via",  nom: "Via",  role: "Habitante",
      pose: { x: 780, y: 400 }, color: "#8a3820", pants: "#28303a", hair: "#3a1808",
      facing: "left", activity: "cup",
      replique: "Il paraît qu'un enfant a disparu au niveau 2. Personne ne veut me dire son nom. Tu crois qu'il est vraiment parti dehors ?" },
  ],
  infirmerie: [
    { id: "infirmerie_lin", nom: "Lin", role: "Médecin",
      pose: { x: 300, y: 400 }, color: "#7fd8ff", pants: "#3a4048", hair: "#5a4028",
      facing: "front", accessory: "coat", activity: "write",
      replique: "Je soigne des toux, des chutes, des yeux fatigués par les néons. Aucun cas de contamination extérieure depuis vingt ans. Aucun." },
    { id: "infirmerie_ora", nom: "Ora", role: "Aide-soignante",
      pose: { x: 700, y: 400 }, color: "#c8d4e2", pants: "#3a4048", hair: "#3a2818",
      facing: "front", accessory: "coat", activity: "clipboard",
      replique: "MARTINE contrôle nos dossiers médicaux. Tout ce que je note est envoyé à elle. Parfois, j'ai l'impression qu'elle réécrit ce que j'ai écrit." },
  ],
  atelier: [
    { id: "atelier_kev",  nom: "Kev",  role: "Ingénieur systèmes",
      pose: { x: 260, y: 400 }, color: "#3a4048", pants: "#28303a", hair: "#2a2018",
      facing: "front", accessory: "toolbelt", activity: "wrench",
      replique: "MARTINE tourne sur des serveurs du niveau -3. J'y suis descendu une fois pour une maintenance. Ce n'est pas une simple IA — quelqu'un l'a modifiée après 2050." },
    { id: "atelier_tam",  nom: "Tam",  role: "Mécanicienne",
      pose: { x: 520, y: 400 }, color: "#5a4028", pants: "#3a2010", hair: "#8a3820",
      facing: "front", accessory: "hardhat", activity: "hammer",
      replique: "Je répare des ventilos et des pompes toute la journée. Les filtres sont neufs — trop neufs. Pourquoi refaire des filtres à air si l'air dehors est empoisonné ?" },
    { id: "atelier_yon",  nom: "Yon",  role: "Électricien",
      pose: { x: 780, y: 400 }, color: "#c8a848", pants: "#3a2818", hair: "#3a1808",
      facing: "right", accessory: "toolbelt", activity: "torch",
      replique: "Le réseau électrique est stable — sauf tous les 40 jours pile. Coupure d'une minute, exactement. Ça vient d'en haut, pas d'en bas. Cherche pas plus loin, on te dira que c'est normal." },
  ],
  chapelle: [
    { id: "chapelle_anselme", nom: "Anselme", role: "Ancien",
      pose: { x: 260, y: 388 }, color: "#5a3818", pants: "#3a2010", hair: "#f0e4c8", skin: "#c8a888",
      facing: "front", poseKind: "sit", accessory: "robe", activity: "pray",
      replique: "J'ai vécu à la surface, jeune. Il y avait des oiseaux. Aujourd'hui on nous dit qu'il n'y a plus rien. Je ne sais plus qui croire." },
    { id: "chapelle_iris",   nom: "Iris",    role: "Fidèle",
      pose: { x: 760, y: 400 }, color: "#8a5030", pants: "#5a4028", hair: "#8a5030",
      facing: "front", accessory: "robe", activity: "pray",
      replique: "MARTINE nous protège. Elle a toujours dit la vérité. Ceux qui doutent finissent par disparaître — signe qu'ils avaient tort, non ?" },
  ],
};
