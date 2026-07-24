/* ============================================================
   Registre des chapitres — l'ORDRE du voyage temporel.
   Pour ajouter un chapitre : créer son dossier (data.js +
   scenes/), l'importer ici, et l'ajouter à la liste au bon
   endroit. Le moteur (App.jsx) charge automatiquement le
   suivant à chaque saut. (Voir docs/AJOUTER-UN-CHAPITRE.md)
   ============================================================ */

import ch01 from "./01-paleolithique/data.js";
import ch02 from "./02-neolithique/data.js";
import ch03 from "./03-mesopotamie/data.js";
import ch04 from "./04-antiquite/data.js";
import ch05 from "./05-moyen-age/data.js";
import ch06 from "./06-moderne/data.js";
import ch07 from "./07-xixe/data.js";
import ch08 from "./08-xxe/data.js";
import ch09 from "./09-xxie/data.js";

export const CHAPTERS = [ch01, ch02, ch03, ch04, ch05, ch06, ch07, ch08, ch09];
