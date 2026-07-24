# Ajouter un chapitre à MARTINE

Ce guide explique, **sans jargon**, comment créer une nouvelle époque.
Le principe du jeu : **le moteur ne change jamais**, on n'ajoute que du *contenu*.
Tu peux faire tout ça accompagné de Claude Code — montre-lui ce fichier.

> Règle d'or : on ne touche **jamais** au dossier `src/engine/`.
> Un chapitre = un dossier dans `src/chapters/`, plus une ligne dans le registre.

---

## 1. Créer le dossier du chapitre

Copie la structure d'un chapitre existant (le plus simple : `02-neolithique/`) :

```
src/chapters/
└── 03-mon-epoque/
    ├── data.js          ← tout le texte et les recettes (LE fichier à remplir)
    └── scenes/          ← les décors (un fichier .jsx par tableau)
        ├── SceneA.jsx
        ├── SceneB.jsx
        └── SceneC.jsx
```

## 2. Déclarer le chapitre dans le registre

Ouvre `src/chapters/index.js` et ajoute ton chapitre **dans l'ordre du voyage** :

```js
import ch01 from "./01-paleolithique/data.js";
import ch02 from "./02-neolithique/data.js";
import ch03 from "./03-mon-epoque/data.js";   // ← nouvelle ligne

export const CHAPTERS = [ch01, ch02, ch03];    // ← l'ajouter ici
```

C'est tout : le saut temporel chargera automatiquement le chapitre suivant,
le menu de sélection l'affichera, la frise cumulera ses découvertes.

---

## 3. Remplir `data.js`

C'est le cœur. Tout y est commenté en français. Les blocs à remplir :

### a) La fiche du chapitre (en bas du fichier)
```js
const chapter = {
  id: "03-mon-epoque",
  bandeau: "CHAPITRE 3 · −3300",   // petit texte en haut de l'écran de jeu
  date: "−3300",                    // s'affiche sur l'écran de MARTINE
  epoque: "Mésopotamie",            // nom court (menu + écran de transition)
  emoji: "🏺",
  titre: "MARTINE",
  sousTitre: "Machine À Remonter le Temps Intelligente Néanmoins Excellente",
  presentationTitre: "Chapitre 3 — Mésopotamie.",
  presentation: "…",                // texte de l'écran titre
  accroche: "…",                    // petite phrase d'appel
  finTexte: "… {pct} …",            // écran de fin ; {pct} = % de recharge
  required: 3,                      // nb de messages pour débloquer le saut
  startScene: 0,                    // tableau de départ (0 = le premier)
  destination: "ANTIQUITÉ",         // affiché sur le bouton de saut
  /* + tous les blocs ci-dessous : items, scenes, where, recipes… */
};
export default chapter;
```

### b) Les ÉLÉMENTS (`ITEMS`)
Chaque objet ramassable ou fabriqué :
```js
argile: { name: "Argile", emoji: "🟤", desc: "Phrase dite quand on le ramasse." },
```
- Un objet rare qui doit **voyager d'une époque à l'autre** reçoit `heirloom: true`
  (et doit exister — même id — dans le chapitre d'arrivée).

### c) Les TABLEAUX (`SCENES`)
```js
const SCENES = [
  { id: "uruk", name: "La cité d'Uruk", Component: SceneUruk },
  …
];
```

### d) Les RECETTES (`RECIPES`) — le cœur du jeu
Chaque recette combine **2 éléments** :
```js
{ a: "argile", b: "jetons", out: "calculi", line: "Réplique de MARTINE en cas de réussite." },
{ a: "tablette", b: "calame", out: "msg_cuneiforme", msg: true },          // ⭐ un message
{ a: "tablette", b: "eau",   out: "msg_effacee", msg: true, perdu: true },  // 💨 message perdu
```
- `msg: true` → c'est un **message** (cristal + fiche documentaire + 4 jauges).
- `perdu: true` (avec `msg: true`) → **message perdu** : il s'envole en poussière,
  donne un *fragment* gris, compte pour la frise mais **pas** pour le saut.
- Recette-événement (rare) : `gives: [...]`, `consume: [...]`, `flag: "xxx"`
  (voir la chasse au cerf du chapitre 1).

### e) Les MESSAGES (`MESSAGES`) — fiches + jauges
```js
msg_cuneiforme: {
  title: "Écriture cunéiforme", emoji: "🔠",
  jauges: { vitesse: 2, portee: 2, capacite: 4, durabilite: 5 },  // chacune de 1 à 5
  fact: "Le texte documentaire, relu pour l'exactitude historique.",
},
```
Pour un **message perdu**, ajoute `perdu: true` dans sa fiche aussi.

**Barème des jauges (commun à TOUTES les époques, 1 à 5) :**
| | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| 🏃 Vitesse | il faut se déplacer | un porteur (jours) | instantané à portée de voix/vue | instantané sur des km | instantané mondial |
| 🌍 Portée | quelques personnes | un clan/village | une région | un pays | le monde |
| 📦 Capacité | une seule idée | quelques signes | un récit/une image | des récits entiers | tout |
| ⏳ Durabilité | disparaît aussitôt | des décennies | des siècles | des millénaires | des dizaines de millénaires |

### f) Le reste
- `WHERE` : où trouver chaque élément de base (sert au bouton 💡 Indice).
- `HINTS` : un indice par recette.
- `NEAR_MISS` : répliques drôles pour les erreurs « logiques ».
- `FAIL_LINES` : répliques d'échec au hasard.
- `INTRO` : ce que dit MARTINE en arrivant dans l'époque.
- `ACTIONS` : zones du décor qui ne ramassent rien (ex. examiner l'épave).

---

## 4. Dessiner les tableaux (`scenes/`)

Copie une scène existante (`02-neolithique/scenes/SceneVillage.jsx`) et adapte-la.
Points essentiels, sans changer le moteur :

- **viewBox `0 0 1000 560`** (toujours le même cadre).
- 3 couches de profondeur pour la parallaxe : `<PLayer depth={1}>` (lointain, bouge
  peu), `depth={2}` (intermédiaire), `depth={3}` (premier plan, bouge le plus).
- Les **zones cliquables** en bas du fichier, HORS des couches :
  ```jsx
  <Hotspot cx={470} cy={500} r={46} label="argile" item="argile"
           reveal={reveal} onClick={() => collect("argile")} />
  ```
  - `item="argile"` rend la zone **combinable** : on peut y glisser un autre
    élément pour combiner (« sur le décor »).
  - une zone sans `item` mais avec `onClick={() => action("xxx")}` déclenche une
    action (voir `ACTIONS`).
- Textures : réutilise les filtres `feTurbulence` (grain fin + marbrures) des
  scènes existantes ; garde une **palette et une lumière propres au tableau**
  (ex. ocre mésopotamien, lumière méditerranéenne, pénombre de bougies).

---

## 5. Comment on combine (important pour concevoir les recettes)

Depuis le chapitre 2, **on ne combine plus dans la besace**. Le joueur combine :
- soit en glissant un élément **sur un objet du décor** (la zone a un `item=`),
- soit en le glissant dans le **creuset de MARTINE** (coin haut-droit du tableau).

Conséquence pratique : une recette entre **deux objets fabriqués** (qui n'existent
pas dans le décor) se fait forcément **par le creuset** — c'est prévu, ça marche,
mais garde-le en tête pour écrire des indices clairs.

---

## 6. Tester

Lance le jeu (`npm run dev`) et vérifie, pour ton chapitre :
1. les 3 tableaux s'affichent et les objets se ramassent ;
2. **chaque recette** fonctionne (objet, message, message perdu) ;
3. les fiches et les 4 jauges s'affichent ;
4. le message perdu s'envole en poussière et donne un fragment ;
5. le saut charge le chapitre, la frise cumule les époques ;
6. depuis le menu titre, on peut reprendre / rejouer.

Un `npm run build` sans erreur = tout est cohérent.

---

## Rappel des règles
- **Jamais** de modification de `src/engine/` (si un besoin apparaît, on en discute).
- Textes en français, ton de MARTINE (fiches sérieuses, répliques pince-sans-rire).
- Dates et faits **sourcés** : les fiches sont relues pour l'exactitude historique.
