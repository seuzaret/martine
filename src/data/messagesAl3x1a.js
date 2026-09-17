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

  /* Messages reçus à L'ARRIVÉE dans un nouveau chapitre. La clé
     `arrival_${i}` correspond à l'index du chapitre DANS LEQUEL on
     arrive : arrival_1 = Néolithique, ... arrival_9 = XXIe. Al3x1a
     commente ce qu'on vient de vivre et introduit ce qui arrive. */
  arrival_1: {
    prompt: "Bravo pour le clan de Raya. Ton passage a laissé une trace qui traversera 20 000 ans. Là où tu arrives — le Néolithique — les humains ont commencé à cultiver la terre. Ils ne savent pas encore écrire, mais ils comptent. Regarde comment. ✨",
  },
  arrival_2: {
    prompt: "Le Néolithique, c'était la révolution du stockage — grains, troupeaux, murs. Là, tu vas voir naître LA grande invention : l'écriture. Fais attention à tout ce qu'on peut faire tenir sur une seule tablette d'argile.",
  },
  arrival_3: {
    prompt: "Les Mésopotamiens ont posé les bases. Là, tu vas voir l'écriture voyager — les Phéniciens ont mis les lettres sur un bateau. C'est comme ça qu'elles sont arrivées jusqu'à toi.",
  },
  arrival_4: {
    prompt: "L'Antiquité t'a laissé les papyrus. Maintenant, tu arrives dans un monde où le savoir se recopie à la main, dans des monastères. Un livre = un an de travail. Tu comprends pourquoi les moines gardent ça précieusement ?",
  },
  arrival_5: {
    prompt: "Les moines ont copié pendant 800 ans. Là, un homme va inventer une machine qui recopie en une nuit ce qu'un moine copiait en un an. Devine laquelle. 📖",
  },
  arrival_6: {
    prompt: "Gutenberg a industrialisé la lecture. Maintenant on va aller plus loin : la vitesse. La lumière, l'électricité, les ondes. Le monde va se réduire à quelques secondes de télégraphe. ⚡",
  },
  arrival_7: {
    prompt: "Le XIXe a raccourci les distances. Le XXe raccourcit le temps : on peut désormais parler à tout le monde en même temps. Radio, télé, image en direct. Mais qui parle, et qui écoute ? 📻",
  },
  arrival_8: {
    prompt: "L'ère de la télé et de la radio, tu l'as touchée du doigt. Là, tu arrives dans le vertige : Internet, l'ordinateur pour tous, le Web. C'est la démocratisation… mais aussi le bruit. 💻",
  },
  arrival_9: {
    prompt: "Et te voilà de retour dans ton siècle. Ce que tu as vu depuis 20 000 ans, tu vas le comprendre autrement. Prêt·e pour la vue d'ensemble ? 🌍",
  },
};
