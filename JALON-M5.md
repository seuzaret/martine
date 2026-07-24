# Jalon M5 — Chapitres 6 à 9 + Épilogue : de Gutenberg au streaming

> À donner à Claude Code une fois le jalon M4 validé (chapitres 1 à 5 jouables et enchaînés).
> Dernier jalon de contenu : quatre chapitres + l'épilogue jouable + le carnet imprimable.
> **Ne pas modifier `src/engine/`** sans justification préalable.
> Après ce jalon, le jeu est complet ; il ne restera que M6 (finitions & mise en ligne).

---

## Méthode de travail

Comme en M4 : **un chapitre à la fois** (6 → 7 → 8 → 9 → épilogue), validation entre chaque.
Pour chaque chapitre, soumets-moi **avant de figer** : le tableau des jauges et les textes
des fiches (exactitude historique = priorité, je relis). Explique simplement.
Réfère-toi au tableau de progression de `CLAUDE.md` (section 5).

**Attention au rythme des jauges** : c'est dans ces chapitres que la courbe s'inverse
spectaculairement — vitesse/portée/capacité explosent, durabilité s'effondre. Les valeurs
doivent le faire sentir sans exagération caricaturale.

---

## CHAPITRE 6 — Époque moderne (1450 → 1800)

**Idée forte** : l'imprimé se diffuse (presse, libelles), et l'État organise des **réseaux**
de transmission (poste, télégraphe optique). L'électricité pointe à la toute fin.

### Tableaux (3)
1. **L'imprimerie en effervescence** — presses en marche, feuilles qui sèchent, colporteur
   qui remplit sa hotte de gazettes et libelles.
2. **Le relais de poste** — auberge-relais, chevaux frais, postillon, malle de lettres,
   carte du réseau royal au mur.
3. **La tour de Chappe** — colline, tour à bras articulés, opérateur à la longue-vue,
   autre tour visible à l'horizon ; sur la table : le cahier de codes. Dans un coin
   d'atelier : la pile de Volta (à collecter → objet `heirloom: true`, il voyagera au ch. 7).

### Recettes
| Recette | Résultat | Type |
|---|---|---|
| feuilles imprimées + colporteur | **gazettes & libelles** (La Gazette, 1631) | ⭐ |
| lettre + relais de chevaux | **poste royale** (Louis XI, 1477) | ⭐ |
| bras articulés + longue-vue | **télégraphe de Chappe** (1794) | ⭐ |
| cahier de codes + espion | **code intercepté** | 💨 perdu |
| zinc & cuivre + empilement (Volta) | pile électrique (1800) — objet héritage | objet ⚡ |

### Angles EMI
- **Gazettes** : la presse naît… avec le soutien du pouvoir (Richelieu derrière Renaudot) ;
  qui finance, qui contrôle ? Les libelles clandestins = la contre-information existe déjà.
- **Poste royale** : un RÉSEAU organisé, avec relais, horaires, tarifs — l'infrastructure
  compte autant que le message.
- **Chappe** : Paris-Lille en quelques minutes, par signaux visuels codés — réservé à
  l'État ; le citoyen n'y a pas accès. Vitesse ≠ démocratisation.
- **Message perdu (code intercepté)** : un message codé n'est sûr que tant que le code
  est secret — intercepté et décodé, il se retourne contre son émetteur. Premier pas vers
  la question du chiffrement (et un pont vers Enigma qu'on pourra évoquer au ch. 8).
- **Pile de Volta** : pas un média, mais LA clé du siècle suivant — d'où son statut
  d'objet-héritage qui franchit le saut temporel (première utilisation du mécanisme
  `heirloom` préparé en M3 : vérifie qu'il fonctionne).

---

## CHAPITRE 7 — XIXe siècle (1800 → 1900)

**Idée forte** : l'électricité fait voyager le message **plus vite que l'homme** ;
le son et l'image deviennent **enregistrables** — une voix, un visage survivent au temps.

### Tableaux (3)
1. **Le bureau du télégraphe** — manipulateur Morse, bandes de papier perforées, cartes
   des lignes, horloge ; par la fenêtre, poteaux et fils à perte de vue.
2. **Le salon 1880** — phonographe à cylindre puis gramophone à pavillon, téléphone
   mural, portraits photographiques encadrés, daguerréotype sur un guéridon.
3. **L'atelier des frères Lumière (Lyon)** — cinématographe, pellicules, affiche de la
   première séance (1895), lanterne de projection.

### Recettes
| Recette | Résultat | Type |
|---|---|---|
| pile de Volta (héritage) + code Morse | **télégraphe électrique** (1837) | ⭐ |
| câble gainé + océan | **câble transatlantique** (1858/1866) | ⭐ |
| membrane + électricité | **téléphone** (Bell, 1876) | ⭐ |
| aiguille + cylindre de cire | phonographe (1877) | objet |
| phonographe + disque plat | **gramophone & disque** (Berliner, 1887) | ⭐ |
| plaque sensible + lumière | **photographie** (Niépce 1826, Daguerre 1839) | ⭐ |
| photos + manivelle | **cinématographe Lumière** (1895) | ⭐ |
| antenne + ondes | TSF (Marconi) | objet |
| TSF + navire en détresse | **le SOS du Titanic** (1912) | ⭐ |
| cylindre de cire + chaleur de l'été | **voix fondue** | 💨 perdu |

### Angles EMI
- **Télégraphe** : l'info plus vite que le cheval → naissance des agences de presse
  (Havas 1835, ancêtre de l'AFP) ; aujourd'hui encore, une énorme part de l'info mondiale
  vient de quelques agences — remonter à la source, réflexe n°1.
- **Câble transatlantique** : le monde « rétrécit » ; poser un câble au fond de l'océan =
  l'infrastructure invisible dont dépendent les messages (comme les câbles sous-marins
  d'Internet aujourd'hui).
- **Téléphone** : la voix en direct à distance — la conversation privée entre dans le réseau.
- **Gramophone** : LE SON ENREGISTRÉ — pour la première fois de l'histoire humaine, une
  voix survit à son locuteur. (Et une industrie naît : la musique devient un objet qu'on vend.)
- **Photographie** : la « preuve » par l'image… truquée dès les débuts (retouches, mises
  en scène) ; une image n'est jamais neutre : cadrage, moment, contexte.
- **Cinématographe** : l'image animée, l'émotion collective en salle — le spectacle de masse.
- **SOS du Titanic (1912)** : la TSF sauve ~700 personnes ; le drame impose des règles
  mondiales (veille radio obligatoire) — quand un média devient vital, la société le réglemente.
- **Message perdu (cylindre fondu)** : les premiers enregistrements sur cire fondaient à
  la chaleur, s'usaient à chaque écoute — des milliers de voix du XIXe ont disparu.
  La durabilité chute : le message moderne est puissant mais périssable.

---

## CHAPITRE 8 — XXe siècle (1900 → 1990)

**Idée forte** : les médias de masse entrent dans les foyers (radio, TV) — et dans les
guerres ; l'ordinateur naît ; les supports magnétiques et optiques se succèdent à toute vitesse.

### Tableaux (3)
1. **Le studio de radio, 1940** — micro sur pied, lampe « ON AIR », horloge, script ;
   ambiance grave (l'appel du 18 juin).
2. **Le salon, 1969** — téléviseur noir et blanc (les images de la Lune !), famille
   assise, antenne râteau par la fenêtre, électrophone et vinyles.
3. **La salle informatique** — armoires de l'ENIAC côté « musée », puis micro-ordinateur
   des années 80, disquettes, cassettes, premier modem qui grésille.

### Recettes
| Recette | Résultat | Type |
|---|---|---|
| ondes + micro | **radio** (appel du 18 juin 1940) | ⭐ |
| tube cathodique + caméra | **télévision** (1er JT français : 1949) | ⭐ |
| tubes à vide + calcul balistique | **ENIAC** (1946, ~30 tonnes) | ⭐ |
| bande magnétique + boîtier | **cassette & VHS & disquette** | ⭐ |
| laser + disque | **CD (1982) & DVD (1995)** | ⭐ |
| ordinateurs + réseau | **Internet (ARPANET 1969) & Web (1989)** | ⭐ |
| bande magnétique + aimant du haut-parleur | **bande effacée** | 💨 perdu |

### Angles EMI
- **Radio en guerre** : information, propagande, résistance — le même canal sert aux
  trois ; l'appel du 18 juin : une voix presque inaudible sur le moment, devenue mythe
  après coup (la mémoire d'un message se construit aussi APRÈS lui).
- **Télévision** : le monde en direct dans le salon — mais un monde CHOISI (sujets,
  cadrages, durée) ; regarder le JT, c'est voir la sélection d'une rédaction. En 1969,
  600 millions d'humains regardent les mêmes images de la Lune : l'événement planétaire.
- **ENIAC** : l'ordinateur naît militaire, énorme (30 tonnes) — ton smartphone est des
  millions de fois plus puissant.
- **Magnétique** : enregistrer CHEZ SOI (cassette, VHS) — chacun peut copier, dupliquer,
  échanger ; l'industrie crie au piratage… déjà.
- **CD/DVD** : le numérique optique, vendu « inaltérable »… les premiers CD gravés des
  années 90 sont déjà en train de mourir (maladie du disque).
- **Internet & Web** : conçu pour résister aux pannes ; le Web offert gratuitement au
  monde par Berners-Lee (CERN, 1989) — chacun devient émetteur ET récepteur : plus de
  crieur unique, plus de filtre obligatoire → vérifier, croiser, douter.
- **Message perdu (bande effacée)** : un simple aimant, et des heures d'enregistrement
  disparaissent ; la BBC et l'INA ont effacé/réutilisé des bandes d'émissions mythiques —
  perdues à jamais. Effacer coûtait moins cher que stocker : choix économique, perte culturelle.

---

## CHAPITRE 9 — XXIe siècle (2000 → aujourd'hui)

**Idée forte** : tout converge dans la poche ; le support semble disparaître (streaming,
cloud)… en réalité il est **chez quelqu'un d'autre**.

### Tableaux (2)
1. **La chambre d'ado** — smartphone, tablette, console, PC, écouteurs, chargeurs partout ;
   par la fenêtre, une antenne-relais.
2. **Le datacenter** — allées de serveurs à perte de vue, LED clignotantes, câbles,
   climatisation ; un technicien minuscule dans l'immensité.

### Recettes
| Recette | Résultat | Type |
|---|---|---|
| mémoire flash + poche | **clé USB, carte SD, SSD** | ⭐ |
| écran tactile + réseau mobile | **smartphone** (2007) | ⭐ |
| serveurs lointains + abonnement | **streaming & cloud** | ⭐ |
| disquette (souvenir du ch. 8) + PC moderne | **fichier illisible** | 💨 perdu |
| photos d'enfance + service fermé | **compte supprimé** | 💨 perdu |

### Angles EMI
- **Flash** : des bibliothèques d'Alexandrie entières dans une poche — capacité ×10⁹ en
  un siècle ; durée de vie réelle d'une clé USB : ~10 ans. Alexandrie tenait mieux.
- **Smartphone** : TOUS les médias du jeu dans un seul objet (appareil photo, téléphone,
  télé, radio, journal, courrier, bibliothèque…) — et un objet qui capte l'attention par
  design : à qui profite ton temps d'écran ?
- **Streaming/cloud** : « plus de support » ? Si — il est chez quelqu'un d'autre.
  Posséder ou accéder ? Que devient ta musique si le service ferme, ton exposé si le
  compte saute ? La question du chapitre : à qui confies-tu tes messages ?
- **Perdu 1 (disquette)** : 30 ans ont suffi — le lecteur n'existe plus, le format non
  plus. L'obsolescence n'efface pas le message : elle le rend illisible, ce qui revient au même.
- **Perdu 2 (compte supprimé)** : des années de photos dans un service qui ferme ou un
  compte perdu — la mémoire personnelle externalisée est fragile. (Évoquer la solution :
  copies multiples, formats ouverts, et les institutions d'archivage comme la BnF qui
  archive le web français.)

---

## L'ÉPILOGUE JOUABLE — « Ton message pour +20 000 ans »

MARTINE est rechargée. Avant de ramener le joueur, elle pose LA question :

> « Une dernière chose, humain. Tu as vu 20 000 ans de messages. À ton tour :
> tu veux laisser un message aux humains de +20 000 ans. **Quel support choisis-tu ?** »

**Mécanique** : le joueur compose son choix — un support parmi ceux du voyage
(paroi gravée, argile cuite, parchemin, papier imprimé, vinyle, CD, clé USB, cloud…).
Chaque choix déclenche une **réponse argumentée de MARTINE** (pas de « bonne » réponse
unique — chaque support a ses forces et faiblesses, jauges à l'appui), et se conclut par :

> « Les scientifiques d'aujourd'hui se posent EXACTEMENT ta question — par exemple pour
> avertir du danger des déchets nucléaires dans 100 000 ans. Leur piste la plus sérieuse ?
> … la pierre gravée. Comme à Lascaux. La boucle est bouclée. »

Puis : **frise finale complète** des 9 époques (le grand récit des jauges), statistiques
de la partie (messages transmis / perdus), et le monologue de conclusion de MARTINE
reprenant le fil rouge : *plus petit, plus rapide, plus dense… plus fragile, plus vite
illisible. La technique change ; la question reste : qui parle, à qui, pourquoi — et
comment faire DURER ?*

Termine par une invitation au débat (pensée pour la classe) : « Et toi, qu'est-ce qui
mérite d'être transmis ? » — sans réponse dans le jeu : c'est la question du prof.

---

## Le carnet imprimable

- Depuis le Carnet de bord : bouton **« Version imprimable »** → une vue épurée
  (CSS `@media print`) : titre, prénom de l'élève (champ libre), liste des fiches
  découvertes par époque, frise des jauges simplifiée, la question de l'épilogue.
- Noir et blanc propre, 2-3 pages A4 max, sans les décors. C'est la **trace écrite**
  de la séance.

---

## Ce qu'il ne faut PAS faire
- Pas de modification de `src/engine/` sans justification (l'épilogue est un « chapitre »
  spécial : s'il exige une extension du moteur, propose-la-moi d'abord, proprement).
- Pas de dépendance nouvelle sans validation.
- Pas de finitions accessibilité/déploiement (c'est M6) — mais ne crée rien qui les rende
  plus difficiles.

## Critères de validation
1. Les chapitres 6→9 s'enchaînent depuis le 5 ; la pile de Volta franchit le saut 6→7 (héritage).
2. Toutes les recettes fonctionnent, jauges et fiches relues.
3. La frise finale montre clairement la tendance sur 9 époques ; la disquette du ch. 8
   ressurgit bien au ch. 9 comme « fichier illisible ».
4. L'épilogue est jouable : chaque support choisi reçoit une réponse argumentée distincte.
5. Le carnet imprimable sort proprement sur 2-3 pages A4.
6. Une partie complète, du crash en −18 000 à l'épilogue, se joue sans accroc,
   avec sauvegarde/reprise à n'importe quel point.
