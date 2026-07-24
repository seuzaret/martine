# Mettre MARTINE en ligne

> Guide pour l'enseignant·e. Aucune connaissance technique requise :
> on fabrique un dossier, on le dépose sur un hébergement, c'est tout.
> MARTINE est un site **statique** : pas de base de données, pas de PHP,
> pas de serveur à faire tourner. Les parties des élèves se sauvegardent
> toutes seules **dans leur propre navigateur**.

---

## 1. Fabriquer la version finale (le dossier `dist/`)

Dans un terminal **PowerShell**, à la racine du projet
(`C:\Users\FS\Nextcloud2\Martine`), copie-colle ces deux lignes :

```powershell
$env:Path = "$env:LOCALAPPDATA\Programs\nodejs;$env:Path"
npm run build
```

> La première ligne est **importante sur ce PC** : elle dit d'utiliser le
> bon Node.js (sinon un vieux Node caché prend la main et le build échoue).

Au bout de quelques secondes, un dossier **`dist/`** apparaît. Il contient :

```
dist/
├── index.html          ← la page à ouvrir
└── assets/             ← le jeu (un fichier .js et un fichier .css)
```

**C'est ce dossier `dist/`, et lui seul, qu'on met en ligne.** Le reste du
projet (le dossier `src/`, etc.) ne sert qu'à fabriquer le jeu ; il ne va
JAMAIS sur l'hébergement.

> ⚠️ Ne teste pas en double-cliquant sur `dist/index.html` : ouvert « en
> direct » depuis le disque, le navigateur bloque le jeu pour des raisons de
> sécurité. Pour un aperçu en local, lance plutôt :
> ```powershell
> $env:Path = "$env:LOCALAPPDATA\Programs\nodejs;$env:Path"
> npm run preview
> ```
> puis ouvre l'adresse affichée (du type `http://localhost:4173`).
> Une fois EN LIGNE sur un hébergement, tout fonctionne normalement.

---

## 2. Déposer le jeu — 3 possibilités

### A. Ton hébergement mutualisé (le plus simple ici)

Tu as déjà un hébergement (celui prévu pour le PHP). Parfait : MARTINE n'a
même pas besoin de PHP.

1. Avec un logiciel FTP (FileZilla, ou l'explorateur de fichiers de ton
   hébergeur), crée un dossier, par exemple **`martine`**, à la racine du
   site (souvent `www/` ou `public_html/`).
2. Dépose **le contenu du dossier `dist/`** dedans : le fichier
   `index.html` ET le dossier `assets/`.
   *(On copie ce qu'il y a À L'INTÉRIEUR de `dist/`, pas le dossier
   `dist` lui-même — sinon l'adresse aurait un `/dist/` en trop.)*
3. Le jeu est accessible à l'adresse :
   **`https://ton-site.fr/martine/`**

C'est fini. Pour le partager aux élèves, donne-leur ce lien (ou un QR code).

### B. GitHub Pages (gratuit)

Si le projet est sur GitHub : dans les réglages du dépôt → **Pages**,
choisis de publier le dossier `dist/` (ou pousse son contenu sur une
branche `gh-pages`). GitHub te donne une adresse en `…github.io/…`.

### C. itch.io (gratuit, pensé pour les jeux)

1. Compresse le **contenu** de `dist/` en un fichier **`.zip`**
   (clic droit → « Envoyer vers → Dossier compressé »).
2. Sur itch.io : *Upload new project* → type **HTML**, coche *« This file
   will be played in the browser »*, envoie le `.zip`.
3. itch.io héberge et donne une page de jeu prête à partager.

---

## 3. Bon à savoir pour la classe

- **Les sauvegardes restent sur l'appareil.** Un élève qui change de poste
  (du CDI à la maison, par ex.) ne retrouve pas sa partie automatiquement :
  il doit l'**exporter** (bouton ⚙ Réglages → *Exporter ma partie*) puis
  l'**importer** sur l'autre poste. C'est prévu et volontaire (pas de
  compte, pas de données envoyées ailleurs — rien ne quitte l'ordinateur).
- **Confort de lecture.** Dans ⚙ Réglages : *Texte plus grand* (pour le
  vidéoprojecteur), *Lecture facilitée* (élèves dys), *Animations calmes*,
  et *Plein écran*. Ces choix se mémorisent par poste.
- **Le carnet imprimable** (📔 → *Version imprimable*) sort la trace écrite
  de la séance, en noir et blanc, prête à photocopier.

---

## 4. Mettre à jour le jeu plus tard

Tu as ajouté un chapitre ou corrigé un texte ?

1. Refais un `npm run build` (étape 1).
2. Redépose le nouveau contenu de `dist/` par-dessus l'ancien (écrase les
   fichiers). Les élèves verront la nouvelle version au prochain
   rechargement de la page — leurs sauvegardes en cours sont conservées.
