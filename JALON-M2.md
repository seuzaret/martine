# Jalon M2 — Les 4 jauges, les "messages perdus" et la sauvegarde

> À donner à Claude Code une fois le jalon M1 validé (glisser-déposer, effets et sons
> fonctionnels sur le chapitre 1).
> **C'est le jalon le plus important du projet** : il installe le fil rouge pédagogique.
> Sans lui, le jeu est un joli crafting ; avec lui, il devient un vrai jeu sérieux EMI.

---

## Contexte pour Claude Code

Lis d'abord `CLAUDE.md` (section 2 « fil rouge pédagogique » et section 5 « progression »).
Ici on ajoute la couche de SENS par-dessus le moteur existant. On ne crée toujours pas de
nouveau chapitre (c'est M3) : on enrichit le chapitre 1 et on prépare les structures pour
que tous les chapitres suivants en héritent gratuitement.

Avance par sections (1 → 4), montre le résultat dans le navigateur après chacune,
attends ma validation. Explique simplement, je ne suis pas développeur.

---

## 1. Les 4 jauges de chaque message

Chaque **message** (cristal) porte désormais 4 valeurs, notées de 1 à 5 :

| Jauge | Icône | Sens |
|---|---|---|
| Vitesse | 🏃 | rapidité de transmission |
| Portée | 🌍 | nombre de personnes atteignables |
| Capacité | 📦 | quantité d'information transportable |
| Durabilité | ⏳ | temps de survie du support |

**À faire :**
- Ajoute ces 4 valeurs dans les données de chaque message du chapitre 1 (`data.js`).
  Valeurs indicatives déjà proposées dans CLAUDE.md ; complète les manquantes avec des
  ordres de grandeur cohérents et **soumets-moi le tableau pour relecture** avant de figer.
- Crée un composant réutilisable `<Gauges values={...} />` dans `src/engine/` :
  4 barres horizontales, chacune avec son icône, son libellé, et un remplissage animé
  (l'animation part de 0 et monte jusqu'à la valeur quand la carte s'ouvre).
- Code couleur : durabilité en teinte distincte (par ex. ambre) pour qu'on la repère
  d'un coup d'œil — c'est elle qui racontera l'histoire.
- Les jauges s'affichent dans la **carte documentaire** du message, sous le texte.

---

## 2. La "frise des supports" (visualisation de la tendance)

C'est le pay-off pédagogique. Objectif : montrer que vitesse/portée/capacité montent
au fil du temps pendant que la durabilité chute.

**À faire :**
- Dans le **Carnet de bord** (📔) et sur l'**écran de fin de chapitre**, ajoute une petite
  **frise chronologique** des messages découverts : chaque message = un point sur une ligne
  de temps, avec ses 4 mini-jauges au survol/tap.
- Prévois que cette frise soit **cumulative entre chapitres** (elle se remplira au fil du jeu).
  Stocke donc les messages découverts avec leur époque et leurs valeurs dans un état global
  persistant (voir section 4).
- Sur l'écran de fin, ajoute une phrase dynamique qui commente la tendance observée
  jusqu'ici (calculée à partir des valeurs, pas codée en dur).

Pas besoin d'un graphe complexe : une ligne, des points, des mini-barres suffisent.
Si tu veux un vrai petit graphique, `recharts` est autorisé — propose-le-moi avant.

---

## 3. Les "messages perdus" (mécanique-clé)

Certaines combinaisons valides produisent un message qui **ne parvient pas au futur**.
Marqués `perdu: true` dans les données (déjà notés 💨 dans CLAUDE.md : bâton de bois gravé
au chapitre 1, plus tard palimpseste, disquette, format obsolète…).

**Comportement attendu :**
- La combinaison réussit visuellement… puis le message **s'envole et se désintègre en
  poussière** (animation distincte de la réussite : il monte, puis se dissout).
- MARTINE ne délivre PAS un cristal mais un **"fragment"** (jeton grisé), avec une carte
  d'explication au ton différent : ce qu'était le message, et **pourquoi il n'a pas survécu**
  (le bois pourrit, la bande se démagnétise, le format n'est plus lisible…).
- Le fragment compte pour la **collection** et la frise (durabilité très basse, visible),
  mais **ne compte PAS** dans les "messages requis pour le saut temporel".
- Distingue clairement, dans le Carnet, les messages **transmis** (cristal) des messages
  **perdus** (fragment), avec un petit récapitulatif : « X messages transmis, Y perdus en route ».

**Intention pédagogique à garder en tête** (pour les textes) : un message ne survit que si
son support survit ET reste lisible. C'est une leçon d'archivistique, pas une punition de jeu —
le ton doit être « regarde ce qu'on a perdu », pas « tu as raté ».

---

## 4. Sauvegarde de la progression

- Crée `src/engine/save.js` gérant la persistance via `localStorage` :
  - chapitre courant, tableau courant,
  - inventaire, messages découverts (transmis + perdus) avec époque et valeurs,
  - état du son (repris de M1).
- Sauvegarde **automatique** à chaque événement important (découverte, changement de lieu, saut d'époque).
- Sur l'écran titre : bouton **"Reprendre"** (si une sauvegarde existe) et **"Nouvelle partie"**
  (avec confirmation, car ça efface la progression).
- Gère proprement le cas où le format de sauvegarde évolue (un numéro de version dans l'objet
  sauvegardé ; si incompatible, on repart proprement sans planter).
- Rends la sauvegarde **exportable/importable** en JSON (deux petits boutons dans un menu
  réglages) : utile pour qu'un élève reprenne sa partie sur un autre poste du CDI, sans compte.

---

## Ce qu'il ne faut PAS faire dans ce jalon
- Pas de nouveau chapitre (M3).
- Pas de refonte du drag & drop ni des effets (validés en M1).
- Pas de système de comptes/serveur : tout reste local (localStorage + export JSON).

---

## Critères de validation
1. Quand je crée la peinture rupestre, sa carte montre 4 jauges animées, durabilité au max.
2. Quand je crée le "bâton de bois gravé", il s'envole en poussière et je reçois un fragment
   avec une explication ; il n'est pas compté dans les messages requis pour sauter.
3. Le Carnet et l'écran de fin montrent une frise avec mes découvertes et une phrase sur la tendance.
4. Je ferme l'onglet, je le rouvre : "Reprendre" restaure exactement où j'en étais.
5. Je peux exporter ma partie en fichier JSON et la réimporter sur un autre navigateur.
