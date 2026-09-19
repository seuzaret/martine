/* ============================================================
   JEU 3 — Catalogue des PNJ « ambiants » (Cluedo)
   ------------------------------------------------------------
   Chaque PNJ a un id UNIQUE dans tout le jeu (préfixé par la
   salle) pour être suivi via `j3.heardPnj[id]`. Positions
   ajustées pour un décor 1000×520 (élargi en PR J3-H).
   ============================================================ */
export const PNJ_ROOMS = {
  cantine: [
    { id: "cantine_nel",  nom: "Nel",  role: "Serveuse",
      pose: { x: 220, y: 300 }, color: "#8a5030", hair: "#5a3018",
      replique: "Je vois passer tout le monde ici. Personne ne mange plus à la même table depuis le mois dernier. Il y a comme une méfiance." },
    { id: "cantine_dor",  nom: "Dor",  role: "Cuisinier",
      pose: { x: 500, y: 300 }, color: "#5a5060", hair: "#1a1408",
      replique: "Les rations viennent d'en-haut, du niveau 1. On me les donne, je les cuisine, je ne pose pas de questions. C'est comme ça depuis toujours." },
    { id: "cantine_via",  nom: "Via",  role: "Habitante",
      pose: { x: 780, y: 300 }, color: "#8a3820", hair: "#3a1808",
      replique: "Il paraît qu'un enfant a disparu au niveau 2. Personne ne veut me dire son nom. Tu crois qu'il est vraiment parti dehors ?" },
  ],
  infirmerie: [
    { id: "infirmerie_lin", nom: "Lin", role: "Médecin",
      pose: { x: 260, y: 300 }, color: "#e8eef5", hair: "#5a4028",
      replique: "Je soigne des toux, des chutes, des yeux fatigués par les néons. Aucun cas de contamination extérieure depuis vingt ans. Aucun." },
    { id: "infirmerie_ora", nom: "Ora", role: "Aide-soignante",
      pose: { x: 560, y: 300 }, color: "#c8d4e2", hair: "#3a2818",
      replique: "MARTINE contrôle nos dossiers médicaux. Tout ce que je note est envoyé à elle. Parfois, j'ai l'impression qu'elle réécrit ce que j'ai écrit." },
  ],
  atelier: [
    { id: "atelier_kev",  nom: "Kev",  role: "Ingénieur systèmes",
      pose: { x: 240, y: 300 }, color: "#3a4048", hair: "#2a2018",
      replique: "MARTINE tourne sur des serveurs du niveau -3. J'y suis descendu une fois pour une maintenance. Ce n'est pas une simple IA — quelqu'un l'a modifiée après 2050." },
    { id: "atelier_tam",  nom: "Tam",  role: "Mécanicienne",
      pose: { x: 520, y: 300 }, color: "#5a4028", hair: "#8a3820",
      replique: "Je répare des ventilos et des pompes toute la journée. Les filtres sont neufs — trop neufs. Pourquoi refaire des filtres à air si l'air dehors est empoisonné ?" },
    { id: "atelier_yon",  nom: "Yon",  role: "Électricien",
      pose: { x: 800, y: 300 }, color: "#c8a848", hair: "#3a1808",
      replique: "Le réseau électrique est stable — sauf tous les 40 jours pile. Coupure d'une minute, exactement. Ça vient d'en haut, pas d'en bas. Cherche pas plus loin, on te dira que c'est normal." },
  ],
  chapelle: [
    { id: "chapelle_anselme", nom: "Anselme", role: "Ancien",
      pose: { x: 240, y: 300 }, color: "#5a3818", hair: "#f0e4c8",
      replique: "J'ai vécu à la surface, jeune. Il y avait des oiseaux. Aujourd'hui on nous dit qu'il n'y a plus rien. Je ne sais plus qui croire." },
    { id: "chapelle_iris",   nom: "Iris",    role: "Fidèle",
      pose: { x: 760, y: 300 }, color: "#c8b090", hair: "#8a5030",
      replique: "MARTINE nous protège. Elle a toujours dit la vérité. Ceux qui doutent finissent par disparaître — signe qu'ils avaient tort, non ?" },
  ],
};
