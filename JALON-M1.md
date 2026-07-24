# Jalon M1 — Drag & drop, effets de réussite, sons

> À donner à Claude Code une fois le jalon M0 terminé (projet Vite+React qui tourne,
> moteur séparé du contenu, chapitre 1 jouable en local).
> **Prérequis** : `npm run dev` fonctionne et le jeu s'affiche dans le navigateur.
> Objectif de ce jalon : transformer l'interface "clic simple" en vraie manipulation
> tactile avec retours visuels et sonores satisfaisants.

---

## Contexte pour Claude Code

Ce fichier complète `CLAUDE.md` (lis-le d'abord). Ici on ne touche PAS au contenu
historique ni aux recettes : on améliore uniquement le **moteur d'interface**.
Tout doit rester compatible **tablette tactile** ET **souris** ET **vidéoprojecteur**.

Travaille par petites étapes, montre-moi le résultat dans le navigateur après chaque
sous-partie (1, 2, 3…), et attends ma validation avant de continuer. Je ne suis pas
développeur : explique chaque étape en une ou deux phrases simples.

---

## 1. Inventaire en glisser-déposer (le cœur du jalon)

**Comportement attendu :**
- L'inventaire est une barre d'icônes persistante en bas de l'écran.
- On peut **saisir un élément** et le **faire glisser** :
  - soit vers un **second élément** de l'inventaire → tente la combinaison des deux,
  - soit vers un **objet du décor** (ex. glisser le charbon sur la paroi de la grotte),
  - soit vers la **zone "creuset" de MARTINE** (une zone centrale d'assemblage).
- Pendant le glisser : l'élément suit le doigt/curseur, légèrement agrandi, avec une ombre portée.
- Les **cibles valides s'illuminent** doucement quand l'élément survole une zone où un dépôt est possible (halo vert tendre).
- Au relâchement : si la combinaison existe → animation de réussite ; sinon → l'élément revient à sa place avec un petit rebond.

**Contrainte technique impérative :**
- Implémente avec les **Pointer Events** (`onPointerDown` / `onPointerMove` / `onPointerUp`),
  PAS l'API HTML5 `draggable` (inutilisable au doigt sur tablette).
- Gère correctement `setPointerCapture` pour que le glisser ne "décroche" pas.
- Empêche le scroll de la page pendant un glisser tactile (`touch-action: none` sur les éléments manipulables).
- Garde une **alternative au clic** : un tap simple sur un élément puis un tap sur une cible doit aussi fonctionner (pour les élèves qui ne "trouvent" pas le drag, et pour l'usage souris au vidéoprojecteur).

**Accessibilité :**
- Navigation possible au **clavier** : flèches pour sélectionner un élément, Entrée pour le prendre/déposer.
- Zone de saisie d'au moins 44×44 px (doigts d'enfants).

---

## 2. Effets de réussite ("game juice")

Quand une combinaison réussit et produit un **objet** :
- L'objet créé apparaît dans l'inventaire avec un effet **"pop"** (scale de 0 → 1.2 → 1, léger ressort).
- Une volée de **particules dorées** part du point de fusion (une dizaine de petits ronds qui s'éloignent et s'estompent). Fais un petit composant `<Particles />` réutilisable, sans librairie lourde (CSS ou canvas simple).
- Un **halo lumineux** pulse une fois autour du creuset.

Quand une combinaison produit un **message** (cristal) :
- Même chose, en plus spectaculaire (halo plus large, plus de particules).
- Puis la **carte documentaire** s'ouvre (déjà existante) avec les 4 jauges animées (voir jalon M2, mais prépare le composant `<Gauges />` en placeholder ici si simple).

Quand une combinaison **échoue** :
- Tremblement court de la zone de craft (`shake`), petit son "bzzt", réplique de MARTINE.
- Les deux éléments **reviennent** à leur place dans l'inventaire (ne pas les consommer).

Toutes les animations doivent respecter `prefers-reduced-motion` (désactivées si l'utilisateur le demande).

**Librairie :** tu peux utiliser `framer-motion` si ça simplifie nettement, sinon CSS pur. Discute-en avec moi avant de l'ajouter.

---

## 3. Sons

- Crée un module `src/engine/audio.js` avec une petite API simple :
  `playSfx('success' | 'craft' | 'fail' | 'pickup' | 'message' | 'jump')`.
- Utilise des sons courts **libres de droits (CC0)**. Ne télécharge rien automatiquement sans me prévenir : propose-moi une liste de sons depuis freesound.org (licence CC0) ou génère des sons de synthèse simples avec l'**API Web Audio** (bips cristallins, "bzzt" d'erreur) — cette 2e option évite tout problème de licence et de fichiers, je la préfère si la qualité est correcte.
- Ambiance par époque **optionnelle** : une boucle discrète (vent de la grotte, crépitement du feu). Prévois l'emplacement mais laisse-la désactivée par défaut.
- **Bouton 🔇 global** en haut de l'écran : coupe tout le son. L'état est mémorisé (localStorage).
- Le son ne démarre qu'après une **première interaction** de l'utilisateur (contrainte des navigateurs).

---

## 4. Polish visuel de l'inventaire et du creuset

- Le "creuset de MARTINE" : une zone centrale identifiable (un petit réceptacle dessiné, cohérent avec l'esthétique de la soucoupe). Quand un élément y est déposé, il "flotte" dedans.
- Deux emplacements visibles dans le creuset (élément 1 + élément 2) avec un "+" au milieu et un bouton "combiner" — mais le glisser-déposer direct doit aussi marcher sans passer par les emplacements.
- Compteur de découvertes et progression toujours visibles.

---

## Ce qu'il ne faut PAS faire dans ce jalon
- Ne pas ajouter de nouveau chapitre (c'est M3).
- Ne pas implémenter la logique complète des jauges ni des "messages perdus" (c'est M2) — juste préparer les emplacements si trivial.
- Ne pas refondre l'architecture moteur/contenu validée en M0.

---

## Critère de validation du jalon
Sur le chapitre 1, au doigt sur une tablette **et** à la souris :
1. Je peux glisser "charbon" sur "paroi" et obtenir la peinture rupestre avec particules + son.
2. Une combinaison ratée fait trembler la zone, joue un "bzzt", et me rend mes éléments.
3. Le bouton 🔇 coupe le son et s'en souvient au rechargement.
4. Tout reste lisible et cliquable en plein écran sur vidéoprojecteur.
