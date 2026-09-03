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
   - noteHotspot     : { tab, cx, cy, r } — emplacement du hotspot
                       de la note dans le décor (tab = index du tableau)
   - al3x1aHotspot   : { tab, cx, cy, r } — cachette d'Al3x1A si
                       cette époque est la cible du tirage
   - remede          : nom + emoji + description du remède issu de
                       cette époque
   ============================================================ */

export const JEU2 = [
  /* 0 — Paléolithique : peinture rupestre */
  {
    support: "peinture rupestre",
    noteHotspot: { tab: 0, cx: 550, cy: 280, r: 34 },
    al3x1aHotspot: { tab: 3, cx: 700, cy: 380, r: 60 },
    noteWrongText: "Journal, jour ? — Le clan m'a accueilli·e. J'ai laissé cette trace sur la paroi, dans l'ocre. Ce n'est pas ici que je trouverai ce que je cherche. Je repars.",
    noteRightText: "Journal — Trouvé ! L'ocre rouge de la Grande Paroi contient quelque chose que le futur a oublié. Je le récolte. Si tu lis ceci, je suis restée près de la rivière, à l'ombre. Ma MARTINE fait des siennes.",
    remede: { id: "ocre_pigment_vivant", name: "Ocre à pigment vivant", emoji: "🎨", desc: "Une pincée d'ocre rouge de Lascaux, chargée de bactéries millénaires que le futur a perdues. Régénère la mémoire cellulaire." },
  },
  /* 1 — Néolithique : gravure sur mégalithe ou tatouage */
  {
    support: "gravure sur mégalithe",
    noteHotspot: { tab: 0, cx: 500, cy: 280, r: 34 },
    al3x1aHotspot: { tab: 1, cx: 620, cy: 400, r: 60 },
    noteWrongText: "Gravé à la pointe de silex — Halte de quelques jours. Ces pierres sont émouvantes mais ne sont pas ce que je cherche. Je pars vers le sud.",
    noteRightText: "Gravé à la pointe de silex — J'y suis. Les rites du mégalithe cachent une plante qui n'existe plus au futur. Je la ramasse. Je t'attends dans l'ombre du grand menhir.",
    remede: { id: "herbe_menhir", name: "Herbe du mégalithe", emoji: "🌿", desc: "Une herbe rare qui poussait au pied des menhirs il y a 6000 ans, disparue depuis. Ses fibres portent des enzymes anti-oubli." },
  },
  /* 2 — Mésopotamie / Égypte : tablette d'argile cunéiforme */
  {
    support: "tablette d'argile cunéiforme",
    noteHotspot: { tab: 0, cx: 500, cy: 320, r: 34 },
    al3x1aHotspot: { tab: 2, cx: 500, cy: 400, r: 60 },
    noteWrongText: "Tablette d'argile — Journée dans les archives d'Uruk. Beaucoup de tablettes, mais rien pour moi. Je descends vers le Nil.",
    noteRightText: "Tablette d'argile — Trouvé au fond des archives. Une argile ancienne contient une bactérie qui régénère les tissus abîmés. Je la récupère. Je me suis abrité·e sur la côte phénicienne, près des cèdres.",
    remede: { id: "argile_bacterienne", name: "Argile de Sumer", emoji: "🟤", desc: "Une motte d'argile antique des rives de l'Euphrate, hébergeant des micro-organismes qui restaurent les mémoires effacées." },
  },
  /* 3 — Antiquité : papyrus ou inscription romaine */
  {
    support: "rouleau de papyrus",
    noteHotspot: { tab: 3, cx: 500, cy: 380, r: 34 },
    al3x1aHotspot: { tab: 5, cx: 500, cy: 400, r: 60 },
    noteWrongText: "Rouleau de papyrus — Pompéi est belle mais je m'ennuie. Rien à trouver ici. Je pars pour Byzance… non, plutôt vers le nord.",
    noteRightText: "Rouleau de papyrus — Ici. Une plante qui poussait à l'ombre du Vésuve avant l'éruption. Perdue depuis pour tout le monde. Je m'installe dans les thermes, à l'abri.",
    remede: { id: "silphium_pompei", name: "Silphium romain", emoji: "🌱", desc: "Une plante médicinale que les Romains adoraient, disparue depuis. Ses graines fossilisées ont préservé leurs vertus mnémotechniques." },
  },
  /* 4 — Moyen Âge : enluminure marginale */
  {
    support: "enluminure marginale",
    noteHotspot: { tab: 0, cx: 500, cy: 300, r: 34 },
    al3x1aHotspot: { tab: 1, cx: 480, cy: 400, r: 60 },
    noteWrongText: "Enluminure — Ce monastère est paisible. J'ai laissé un mot dans les marges d'un livre. Mais ce que je cherche n'est pas ici.",
    noteRightText: "Enluminure — Trouvé ! Le frère Jorge connaît un onguent oublié. Je m'attarde au scriptorium — cherche-moi entre les rayonnages.",
    remede: { id: "onguent_moine", name: "Onguent du copiste", emoji: "🖋️", desc: "Un baume à base d'or fin et d'herbes médiévales, jadis appliqué aux copistes fatigués. Restaure la vivacité mentale." },
  },
  /* 5 — Époque moderne : gazette imprimée */
  {
    support: "gazette imprimée",
    noteHotspot: { tab: 0, cx: 500, cy: 340, r: 34 },
    al3x1aHotspot: { tab: 0, cx: 460, cy: 400, r: 60 },
    noteWrongText: "Feuille imprimée — Journée bruyante à l'atelier de Gutenberg. J'imprime cette note en 3 exemplaires. Rien à trouver ici, je continue.",
    noteRightText: "Feuille imprimée — Bingo ! L'encre à base de plomb de Gutenberg contient un composé oublié qui aide à fixer les souvenirs. Je me tiens près de la presse, camouflé·e derrière une pile de feuilles.",
    remede: { id: "encre_gutenberg", name: "Encre au plomb Gutenberg", emoji: "🖤", desc: "L'encre originale de Gutenberg, dont la composition secrète stabilisait les impressions… et, semble-t-il, les mémoires." },
  },
  /* 6 — XIXe siècle : télégramme Morse ou plaque photographique */
  {
    support: "télégramme Morse",
    noteHotspot: { tab: 0, cx: 500, cy: 320, r: 34 },
    al3x1aHotspot: { tab: 2, cx: 500, cy: 400, r: 60 },
    noteWrongText: "Télégramme — STOP — Passage rapide au bureau Morse — STOP — Rien pour moi ici — STOP — Je continue vers l'ouest — STOP",
    noteRightText: "Télégramme — STOP — Trouvé — STOP — Le sel argentique des plaques photo contient un composé qui fixe la mémoire — STOP — Je suis dans le studio du photographe — STOP — Vite — STOP",
    remede: { id: "sel_argentique", name: "Sel argentique Daguerre", emoji: "📸", desc: "Le sel d'argent des premières plaques photographiques, capable de fixer non seulement la lumière mais aussi les souvenirs volatils." },
  },
  /* 7 — XXe siècle : cassette audio ou photo argentique */
  {
    support: "cassette audio",
    noteHotspot: { tab: 0, cx: 500, cy: 340, r: 34 },
    al3x1aHotspot: { tab: 1, cx: 500, cy: 400, r: 60 },
    noteWrongText: "Cassette audio — (bruit blanc, voix qui parle) — Enregistré à la volée. Rien trouvé ici, mais bonjour du passé. J'y vais.",
    noteRightText: "Cassette audio — (voix urgente) — Trouvé ! Une bande magnétique spéciale peut réencoder les souvenirs endommagés. Je suis coincé·e dans le salon TV, entre le fauteuil et la télé, écouteur au vent.",
    remede: { id: "bande_magnetique", name: "Bande magnétique mnésique", emoji: "🎞️", desc: "Une bande magnétique de qualité studio, capable d'enregistrer et de restituer les schémas mnémoniques du cerveau humain." },
  },
  /* 8 — Médias de masse (ex-9) : disque CD/DVD */
  {
    support: "CD gravé",
    noteHotspot: { tab: 0, cx: 500, cy: 340, r: 34 },
    al3x1aHotspot: { tab: 1, cx: 500, cy: 400, r: 60 },
    noteWrongText: "CD gravé — Note en fichier .txt. Halte à l'ère des médias de masse. Rien à récupérer, je continue.",
    noteRightText: "CD gravé — Trouvé ! Le laser des lecteurs CD peut lire un code mnémonique inscrit sur des disques spéciaux. Je suis planqué·e près des vieux ordinateurs, sous la pile de disques.",
    remede: { id: "cd_mnemonique", name: "CD mnémonique", emoji: "💿", desc: "Un disque optique dont la couche réfléchissante contient un code binaire capable de réactiver les zones mémorielles endormies." },
  },
  /* 9 — XXIe siècle : smartphone corrompu */
  {
    support: "smartphone",
    noteHotspot: { tab: 0, cx: 500, cy: 340, r: 34 },
    al3x1aHotspot: { tab: 1, cx: 500, cy: 400, r: 60 },
    noteWrongText: "Note mémo (smartphone) — Journée dans une chambre d'ado 2020. Rien pour moi, mais leurs écrans sont fascinants. Je repars.",
    noteRightText: "Note mémo (smartphone) — TROUVÉ ENFIN. Les datacenters conservent des données bactériennes utiles. Je me cache dans le datacenter, entre les racks de serveurs. Viens vite.",
    remede: { id: "data_bacterienne", name: "Datacenter symbiotique", emoji: "🖥️", desc: "Une souche bactérienne cultivée dans les racks à basse température, qui régénère les circuits neuronaux à l'échelle moléculaire." },
  },
];
