/* ============================================================
   JEU 2 — Données : notes d'Al3x1A + configuration par époque
   ============================================================
   Une entrée par chapitre (index CHAPTERS). Contient :
   - support         : le support caractéristique de l'époque (juste
                       pour l'affichage stylisé de la note)
   - noteWrongText   : texte quand la note est trouvée dans une
                       MAUVAISE époque (ambiance, pas décisive)
   - noteRightText   : texte quand la note est dans la BONNE époque
                       (indice précis sur où Al3x1A est caché·e)
   - noteSpots       : TROIS emplacements candidats du hotspot note
                       (tirage au sort à chaque nouvelle partie de jeu
                       2). Champs {tab, cx, cy, r, hint}. Le `hint` est
                       le nom du lieu utilisé par les dialogues des PNJ.
   - al3x1aSpots     : TROIS cachettes candidates d'Al3x1A dans cette
                       époque si c'est la cible. Même format que
                       noteSpots.
   - remede          : nom + emoji + description du remède issu de
                       cette époque
   ============================================================ */

export const JEU2 = [
  /* 0 — Paléolithique : peinture rupestre */
  {
    support: "peinture rupestre",
    noteSpots: [
      { tab: 0, cx: 550, cy: 280, r: 34, hint: "au fond de la grotte, sur la Grande Paroi" },
      { tab: 3, cx: 460, cy: 470, r: 34, hint: "au campement, sur les pierres du foyer, près du feu" },
      { tab: 6, cx: 260, cy: 340, r: 40, hint: "au gué, sur une des grandes pierres près du pêcheur" },
    ],
    al3x1aSpots: [
      { tab: 4, cx: 700, cy: 380, r: 60, hint: "sur le point de vue" },
      { tab: 3, cx: 700, cy: 380, r: 60, hint: "au campement, près du feu" },
      { tab: 5, cx: 400, cy: 400, r: 60, hint: "au bord de la rivière" },
    ],
    noteWrongText: "Journal, jour ? — Le clan m'a accueilli·e. J'ai laissé cette trace ici. Ce n'est pas ce que je cherche. Je repars.",
    noteRightText: "Journal — Trouvé ! L'ocre rouge de la Grande Paroi contient quelque chose que le futur a oublié. Je le récolte. Si tu lis ceci, je suis restée dans le coin, à l'ombre. Ma MARTINE fait des siennes.",
    remede: { id: "ocre_pigment_vivant", name: "Ocre à pigment vivant", emoji: "🎨", desc: "Une pincée d'ocre rouge de Lascaux, chargée de bactéries millénaires que le futur a perdues. Régénère la mémoire cellulaire." },
  },
  /* 1 — Néolithique */
  {
    support: "gravure sur mégalithe",
    noteSpots: [
      { tab: 0, cx: 649, cy: 187, r: 30, hint: "à la porte de la cité, sur la fenêtre noire de la tour de guet" },
      { tab: 3, cx: 140, cy: 270, r: 34, hint: "dans la plaine, sur le menhir déjà dressé à gauche" },
      { tab: 2, cx: 150, cy: 440, r: 40, hint: "chez les artisans, sur le four à poterie de la potière" },
    ],
    al3x1aSpots: [
      { tab: 3, cx: 620, cy: 400, r: 60, hint: "à l'ombre d'un menhir dans la plaine" },
      { tab: 4, cx: 500, cy: 380, r: 60, hint: "à l'entrée de la mine de cuivre" },
      { tab: 2, cx: 500, cy: 400, r: 60, hint: "chez les artisans, derrière le four" },
    ],
    noteWrongText: "Gravé à la pointe de silex — Halte de quelques jours. Ces lieux sont émouvants mais rien pour moi ici. Je repars.",
    noteRightText: "Gravé à la pointe de silex — J'y suis. Les rites cachent une plante qui n'existe plus au futur. Je la ramasse. Je t'attends non loin, dans ce lieu.",
    remede: { id: "herbe_menhir", name: "Herbe du mégalithe", emoji: "🌿", desc: "Une herbe rare qui poussait au pied des menhirs il y a 6000 ans, disparue depuis. Ses fibres portent des enzymes anti-oubli." },
  },
  /* 2 — Mésopotamie / Égypte */
  {
    support: "tablette d'argile cunéiforme",
    noteSpots: [
      { tab: 0, cx: 560, cy: 420, r: 34, hint: "à la cité d'Ur, sur la porte sombre du grenier" },
      { tab: 2, cx: 520, cy: 320, r: 34, hint: "sur le mât de la felouque, au bord du Nil" },
      { tab: 4, cx: 308, cy: 265, r: 34, hint: "sur la grande tour au fond, sur la côte phénicienne" },
    ],
    al3x1aSpots: [
      { tab: 4, cx: 500, cy: 400, r: 60, hint: "à l'ombre des cèdres, côte phénicienne" },
      { tab: 0, cx: 300, cy: 420, r: 60, hint: "dans une ruelle d'Ur, derrière la ziggourat" },
      { tab: 5, cx: 550, cy: 400, r: 60, hint: "au port de Byblos, entre les navires" },
    ],
    noteWrongText: "Tablette d'argile — Journée bien remplie. Beaucoup de trouvailles, mais rien de décisif pour moi. Je continue.",
    noteRightText: "Tablette d'argile — Trouvé. Une argile ancienne contient une bactérie qui régénère les tissus abîmés. Je la récupère. Je me suis abrité·e non loin.",
    remede: { id: "argile_bacterienne", name: "Argile de Sumer", emoji: "🟤", desc: "Une motte d'argile antique des rives de l'Euphrate, hébergeant des micro-organismes qui restaurent les mémoires effacées." },
  },
  /* 3 — Antiquité */
  {
    support: "rouleau de papyrus",
    noteSpots: [
      { tab: 4, cx: 175, cy: 220, r: 40, hint: "à la bibliothèque, sur le mur enduit frais (à gauche)" },
      { tab: 2, cx: 440, cy: 410, r: 34, hint: "au forum, sur la stèle SPQR au centre" },
      { tab: 4, cx: 450, cy: 200, r: 34, hint: "à la bibliothèque, en haut du meuble à rouleaux" },
    ],
    al3x1aSpots: [
      { tab: 5, cx: 500, cy: 400, r: 60, hint: "dans le jardin de la villa, à l'ombre" },
      { tab: 4, cx: 500, cy: 400, r: 60, hint: "à la bibliothèque, derrière les rayonnages" },
      { tab: 1, cx: 400, cy: 400, r: 60, hint: "aux thermes, dans un coin discret" },
    ],
    noteWrongText: "Rouleau de papyrus — Pompéi est belle mais je m'ennuie. Rien à trouver ici. Je pars vers le nord.",
    noteRightText: "Rouleau de papyrus — Ici. Une plante qui poussait à l'ombre du Vésuve avant l'éruption. Perdue depuis pour tout le monde. Je m'installe à l'abri, non loin.",
    remede: { id: "silphium_pompei", name: "Silphium romain", emoji: "🌱", desc: "Une plante médicinale que les Romains adoraient, disparue depuis. Ses graines fossilisées ont préservé leurs vertus mnémotechniques." },
  },
  /* 4 — Moyen Âge */
  {
    support: "enluminure marginale",
    noteSpots: [
      { tab: 0, cx: 500, cy: 300, r: 34, hint: "au château, derrière la tenture au-dessus du trône" },
      { tab: 1, cx: 400, cy: 400, r: 34, hint: "au monastère, dans les marges d'un manuscrit" },
      { tab: 4, cx: 500, cy: 400, r: 34, hint: "sur la place du bourg, sur une banderole" },
    ],
    al3x1aSpots: [
      { tab: 1, cx: 480, cy: 400, r: 60, hint: "entre les rayonnages du scriptorium" },
      { tab: 4, cx: 500, cy: 420, r: 60, hint: "sur la place du bourg, sous un auvent" },
      { tab: 5, cx: 500, cy: 400, r: 60, hint: "sur le chantier de la cathédrale, sous un échafaudage" },
    ],
    noteWrongText: "Enluminure — Ce lieu est paisible. J'ai laissé un mot. Mais ce que je cherche n'est pas ici.",
    noteRightText: "Enluminure — Trouvé ! Un onguent oublié dans le folklore local. Je m'installe non loin, discrètement — cherche-moi entre les recoins.",
    remede: { id: "onguent_moine", name: "Onguent du copiste", emoji: "🖋️", desc: "Un baume à base d'or fin et d'herbes médiévales, jadis appliqué aux copistes fatigués. Restaure la vivacité mentale." },
  },
  /* 5 — Époque moderne */
  {
    support: "gazette imprimée",
    noteSpots: [
      { tab: 0, cx: 500, cy: 340, r: 34, hint: "en province, sous la montgolfière" },
      { tab: 1, cx: 500, cy: 380, r: 34, hint: "à l'imprimerie, sur la presse" },
      { tab: 2, cx: 500, cy: 300, r: 34, hint: "après la Révolution, sur le mur de la tour Chappe" },
    ],
    al3x1aSpots: [
      { tab: 1, cx: 500, cy: 400, r: 60, hint: "à l'imprimerie, derrière une pile de gazettes" },
      { tab: 2, cx: 500, cy: 400, r: 60, hint: "au pied de la tour Chappe, dans les hautes herbes" },
      { tab: 0, cx: 500, cy: 420, r: 60, hint: "en province, dans la foule autour de la montgolfière" },
    ],
    noteWrongText: "Feuille imprimée — Journée bruyante. Trois exemplaires tirés. Rien à trouver ici, je continue.",
    noteRightText: "Feuille imprimée — Bingo ! L'encre à base de plomb contient un composé oublié. Je me tiens non loin, camouflé·e.",
    remede: { id: "encre_gutenberg", name: "Encre au plomb Gutenberg", emoji: "🖤", desc: "L'encre originale de Gutenberg, dont la composition secrète stabilisait les impressions… et, semble-t-il, les mémoires." },
  },
  /* 6 — XIXe siècle */
  {
    support: "télégramme Morse",
    noteSpots: [
      { tab: 0, cx: 500, cy: 320, r: 34, hint: "au bureau du télégraphe, sur le mur derrière le manipulateur" },
      { tab: 1, cx: 500, cy: 350, r: 34, hint: "au studio du daguerréotype, sur le mur du fond" },
      { tab: 4, cx: 550, cy: 380, r: 34, hint: "à la station Marconi, près du poste" },
    ],
    al3x1aSpots: [
      { tab: 1, cx: 500, cy: 400, r: 60, hint: "au studio du photographe, dans un coin" },
      { tab: 5, cx: 500, cy: 400, r: 60, hint: "au Nickelodeon, dans la salle sombre" },
      { tab: 4, cx: 600, cy: 400, r: 60, hint: "à la station Marconi, derrière l'antenne" },
    ],
    noteWrongText: "Télégramme — STOP — Passage rapide — STOP — Rien pour moi ici — STOP — Je continue — STOP",
    noteRightText: "Télégramme — STOP — Trouvé — STOP — Le sel argentique fixe la mémoire — STOP — Je suis non loin — STOP — Vite — STOP",
    remede: { id: "sel_argentique", name: "Sel argentique Daguerre", emoji: "📸", desc: "Le sel d'argent des premières plaques photographiques, capable de fixer non seulement la lumière mais aussi les souvenirs volatils." },
  },
  /* 7 — XXe siècle */
  {
    support: "cassette audio",
    noteSpots: [
      { tab: 0, cx: 500, cy: 340, r: 34, hint: "à Paris occupé, sous l'arcade du marché noir" },
      { tab: 2, cx: 500, cy: 400, r: 34, hint: "au salon Dupont, sous le buffet" },
      { tab: 3, cx: 500, cy: 380, r: 34, hint: "à l'ENIAC, entre deux cartes perforées" },
    ],
    al3x1aSpots: [
      { tab: 2, cx: 500, cy: 400, r: 60, hint: "au salon Dupont, entre le fauteuil et la télé" },
      { tab: 1, cx: 500, cy: 400, r: 60, hint: "au studio BBC, dans une régie voisine" },
      { tab: 3, cx: 500, cy: 400, r: 60, hint: "à l'ENIAC, entre les armoires de tubes" },
    ],
    noteWrongText: "Cassette audio — (bruit blanc, voix) — Enregistré à la volée. Rien trouvé ici. J'y vais.",
    noteRightText: "Cassette audio — (voix urgente) — Trouvé ! Une bande spéciale peut réencoder les souvenirs abîmés. Je suis coincé·e non loin, écouteur au vent.",
    remede: { id: "bande_magnetique", name: "Bande magnétique mnésique", emoji: "🎞️", desc: "Une bande magnétique de qualité studio, capable d'enregistrer et de restituer les schémas mnémoniques du cerveau humain." },
  },
  /* 8 — Médias de masse */
  {
    support: "CD gravé",
    noteSpots: [
      { tab: 0, cx: 500, cy: 340, r: 34, hint: "au salon 1969, sur le meuble télé" },
      { tab: 1, cx: 500, cy: 380, r: 34, hint: "dans la chambre 1985, dans la pile de cassettes" },
      { tab: 2, cx: 500, cy: 360, r: 34, hint: "au bureau 1990, à côté du PC" },
    ],
    al3x1aSpots: [
      { tab: 1, cx: 500, cy: 400, r: 60, hint: "dans la chambre 1985, sous le poster de l'affiche" },
      { tab: 2, cx: 500, cy: 400, r: 60, hint: "au bureau 1990, derrière le meuble à disquettes" },
      { tab: 0, cx: 500, cy: 420, r: 60, hint: "au salon 1969, à côté du fauteuil du père" },
    ],
    noteWrongText: "CD gravé — Note en fichier .txt. Halte à l'ère des médias. Rien à récupérer, je continue.",
    noteRightText: "CD gravé — Trouvé ! Le laser lit un code mnémonique inscrit sur des disques spéciaux. Je suis planqué·e non loin.",
    remede: { id: "cd_mnemonique", name: "CD mnémonique", emoji: "💿", desc: "Un disque optique dont la couche réfléchissante contient un code binaire capable de réactiver les zones mémorielles endormies." },
  },
  /* 9 — XXIe siècle */
  {
    support: "smartphone",
    noteSpots: [
      { tab: 0, cx: 500, cy: 340, r: 34, hint: "dans ta chambre, sur le lit" },
      { tab: 0, cx: 620, cy: 380, r: 34, hint: "dans ta chambre, sur le bureau" },
      { tab: 1, cx: 400, cy: 380, r: 34, hint: "au datacenter, entre les racks de serveurs" },
    ],
    al3x1aSpots: [
      { tab: 1, cx: 500, cy: 400, r: 60, hint: "au datacenter, entre les racks de serveurs" },
      { tab: 0, cx: 300, cy: 420, r: 60, hint: "dans ta chambre, derrière le bureau" },
      { tab: 1, cx: 700, cy: 380, r: 60, hint: "au datacenter, à côté du climatiseur" },
    ],
    noteWrongText: "Note mémo — Journée dans une chambre d'ado. Leurs écrans sont fascinants, mais rien pour moi. Je repars.",
    noteRightText: "Note mémo — TROUVÉ ENFIN. Une souche bactérienne dans les datacenters, utile. Je me cache non loin. Viens vite.",
    remede: { id: "data_bacterienne", name: "Datacenter symbiotique", emoji: "🖥️", desc: "Une souche bactérienne cultivée dans les racks à basse température, qui régénère les circuits neuronaux à l'échelle moléculaire." },
  },
];
