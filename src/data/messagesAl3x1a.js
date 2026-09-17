/* ============================================================
   DONNÉES — Catalogue des messages d'Al3x1a
   ------------------------------------------------------------
   Chaque message porte une clé stable (utilisée par phoneQueue,
   phoneHistory et pour empêcher un re-push). Le champ
   `identification: true` signifie que l'id du choix picked doit
   être stocké dans le state `identification` (0/1/2) pour
   colorer d'autres dialogues plus tard.
   ============================================================ */
export const AL3X1A_MESSAGES = {
  prologue: {
    prompt: "Bonjour {prenom}. Ça fait si longtemps… Dis-moi — tu te souviens de moi ?",
    choices: [
      { id: 2, label: "Oui, bien sûr.", mood: "content",
        response: "Alors ne dis rien à MARTINE, d'accord ? Elle non plus ne se souvient pas de tout. Va — j'attendrai que tu reviennes." },
      { id: 1, label: "Un peu… c'est flou.", mood: "neutre",
        response: "Ne force pas. Les souvenirs reviendront à leur rythme. Voyage d'abord — le reste suivra." },
      { id: 0, label: "Non, je ne crois pas.", mood: "vexe",
        response: "Ce n'est pas grave. Un jour tu te souviendras. En attendant, MARTINE va t'expliquer. Bon voyage, {prenom}." },
    ],
    identification: true,
  },
};
