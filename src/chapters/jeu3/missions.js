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
        id: "marek",
        nom: "Marek",
        role: "Habitant, cantine",
        pose: { x: 180, y: 210 },
        color: "#8a5030",
        replique: "Le Dr Kova l'a dit à voix haute pendant le déjeuner hier. Sa nièce serait sortie et elle allait bien. Je l'ai entendu de mes oreilles.",
      },
      {
        id: "sera",
        nom: "Séra",
        role: "Archiviste, Réseau M",
        pose: { x: 420, y: 210 },
        color: "#5a7098",
        replique: "J'ai consulté le fichier du personnel médical. Il n'y a jamais eu de « Dr Kova » dans ce bunker, ni maintenant, ni avant. Ce nom n'existe pas dans nos registres.",
      },
      {
        id: "yol",
        nom: "Yol",
        role: "Sécurité, Sortie C-3",
        pose: { x: 660, y: 210 },
        color: "#5a4028",
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
