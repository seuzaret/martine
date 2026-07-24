# Jalon M3 — Chapitre 2 : le Néolithique (et validation du pipeline "nouveau chapitre")

> À donner à Claude Code une fois le jalon M2 validé (jauges, messages perdus, sauvegarde).
> **Objectif double** : livrer un 2e chapitre complet ET vérifier que l'architecture
> permet d'ajouter une époque sans toucher au moteur. Si ce jalon se passe bien,
> les chapitres 3 à 9 s'enchaîneront vite sur le même modèle.

---

## Contexte pour Claude Code

Lis d'abord `CLAUDE.md` (section 5, tableau du chapitre 2 — Néolithique). Ce jalon est un
test du principe « moteur ↔ contenu séparés » posé en M0 : **tu ne dois modifier AUCUN
fichier de `src/engine/`**. Si tu es obligé d'y toucher pour faire fonctionner le chapitre 2,
c'est un signal d'alarme : arrête-toi, explique-moi pourquoi, et on décide ensemble.

Avance par sections (1 → 4), montre le résultat après chacune, attends ma validation.
Explique simplement, je ne suis pas développeur.

---

## 1. Structure et données du chapitre

Crée `src/chapters/02-neolithique/` sur le modèle du chapitre 1 :
- `data.js` : items, recettes, dialogues MARTINE, fiches documentaires, valeurs de jauges.
- `scenes/` : les composants des tableaux.

**Cadre** : vers −5000 → −3000. La révolution : les humains se sédentarisent —
villages, agriculture, élevage. Nouveaux besoins de communication : marquer son identité,
son territoire, ses morts, ses biens.

**Transition d'arrivée** : MARTINE atterrit (toujours aussi mal) près d'un village.
Ses répliques doivent souligner le changement : « Tiens, ils ont arrêté de courir après
le gibier. Ils ont des maisons. Et visiblement… des choses à dire. »

### Les 3 tableaux

1. **Le village** — maisons (torchis/bois), four à céramique, champ en arrière-plan,
   enclos avec moutons/vaches, potière au travail, tas d'argile, pigments.
2. **La lande aux mégalithes** (ambiance Bretagne, clin d'œil au cairn de Barnenez) —
   lande, mer au loin, un dolmen en construction (grande dalle, rondins, cordes),
   villageois qui tirent, menhirs dressés.
3. **Le col de montagne** (l'homme des glaces) — neige, glacier, un homme équipé
   (arc, hache en cuivre), feu de bivouac, aiguille d'os et bol de suie près de lui.

### Items et recettes (base : tableau CLAUDE.md, précisé ici)

| Recette | Résultat | Type |
|---|---|---|
| argile + mains | pot cru | objet |
| pot cru + four | céramique | objet |
| céramique + pigments | **poterie décorée** | ⭐ message |
| grande dalle + villageois (cordes & rondins) | **mégalithe** (cairn de Barnenez, ~−4500) | ⭐ message |
| aiguille d'os + suie | **tatouage** (Ötzi, ~−3300, 61 tatouages) | ⭐ message |
| minerai + four | cuivre | objet |
| cuivre + martelage (pierre) | **hache-lingot gravée** | ⭐ message |
| troupeau + mémoire | **comptage impossible** | 💨 message perdu |

**Le message perdu de ce chapitre** est spécial : « troupeau + mémoire » échoue non pas
parce que le support pourrit, mais parce que **la mémoire humaine ne suffit plus** —
trop de bêtes, trop d'échanges. La carte du fragment doit conclure : *« Il faudrait
pouvoir NOTER… Rendez-vous au prochain saut. »* → c'est le teasing direct du chapitre 3
(naissance de l'écriture comptable en Mésopotamie).

**Valeurs de jauges** : propose-les (1 à 5) pour chaque message et soumets-moi le tableau
avant de figer. Ordres de grandeur attendus : mégalithe = durabilité 5 mais capacité 1-2 ;
tatouage = portée 1 (une personne !) mais durabilité 4 (toute une vie, et 5000 ans dans
la glace) ; poterie = équilibré.

### Fiches documentaires (à rédiger, je relirai)

Ton EMI de chaque fiche :
- **Poterie décorée** : les motifs identifient le groupe qui l'a faite — l'ancêtre de la
  marque et du logo ; les archéologues datent et « tracent » les cultures grâce à eux.
- **Mégalithe** : un message pour les morts, pour les dieux, pour les voisins (« ce
  territoire est à nous ») — monumental, collectif, quasi éternel… mais muet : sans
  écriture, on ignore encore ce qu'ils voulaient dire exactement. Mentionner Barnenez
  (~−4500, plus vieux que les pyramides) et Carnac.
- **Tatouage** : Ötzi, retrouvé dans un glacier des Alpes en 1991, 61 tatouages —
  le corps comme support d'un message porté à vie ; identité, appartenance, peut-être soin.
- **Hache en cuivre** : le métal, nouveau support — gravable, précieux, refondable…
  donc falsifiable et recyclable : un message sur métal peut être effacé pour toujours.

---

## 2. Enchaînement des chapitres

- À la fin du chapitre 1, le bouton « SAUT TEMPOREL → NÉOLITHIQUE » doit maintenant
  **charger réellement le chapitre 2** (écran de transition : tourbillon temporel simple +
  réplique de MARTINE + titre de la nouvelle époque et sa date).
- L'inventaire est **remis à zéro** à chaque époque (on ne transporte pas le silex au
  Néolithique)… **sauf exceptions scénarisées** : prévois dans les données un champ
  `heirloom: true` pour les rares objets qui voyagent (aucun pour l'instant, mais la
  pile de Volta en aura besoin au chapitre 7 — prépare juste le mécanisme).
- La frise des supports et le total de messages, eux, sont **cumulatifs** (déjà en place M2).
- Le menu titre affiche désormais la **sélection de chapitre** : chapitres terminés
  rejouables, chapitre courant, chapitres futurs verrouillés (cadenas + date en teasing).

---

## 3. Décors

Même exigence visuelle que le chapitre 1 (SVG semi-réaliste, crépuscule ou ambiances
propres à chaque tableau, 3-4 couches de parallaxe si M1 l'a mis en place) :
- village : fin de journée dorée, fumées des foyers ;
- lande : ciel breton changeant, mer grise au loin, granit ;
- col : lumière froide bleutée, neige, haleine visible.
Petites animations discrètes : fumée, moutons qui bougent la tête, neige qui tombe.
Le style doit rester cohérent avec le chapitre 1 (mêmes épaisseurs de trait, même
logique de palette par tableau).

---

## 4. Vérification du pipeline

À la fin, rédige un court fichier `docs/AJOUTER-UN-CHAPITRE.md` qui documente, en
français simple, les étapes pour créer un chapitre 3 : quels fichiers créer, quelle
structure de données, comment déclarer les tableaux, les recettes, les jauges, le
message perdu. Ce document doit être utilisable par un enseignant non-développeur
accompagné de Claude Code.

---

## Ce qu'il ne faut PAS faire
- Ne pas modifier `src/engine/` (voir contexte — c'est le test du jalon).
- Ne pas créer les chapitres 3+ (ce sera M4).
- Ne pas ajouter de dépendance sans me demander.

---

## Critères de validation
1. Depuis une partie du chapitre 1 terminée, le saut m'amène au village néolithique.
2. Les 3 tableaux sont explorables, cohérents visuellement avec le chapitre 1.
3. Toutes les recettes du tableau ci-dessus fonctionnent, jauges et fiches comprises.
4. « Troupeau + mémoire » produit le fragment avec le teasing de l'écriture.
5. La frise cumule bien les découvertes des deux époques.
6. Le menu titre permet de rejouer le chapitre 1 ou de reprendre au chapitre 2.
7. `src/engine/` n'a pas été modifié (ou les modifications m'ont été justifiées).
8. Le fichier docs/AJOUTER-UN-CHAPITRE.md existe et est compréhensible.
