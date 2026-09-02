/* ============================================================
   MOTEUR — Sauvegarde de la progression (localStorage)
   ============================================================
   Utilitaire GÉNÉRIQUE, indépendant du contenu : il stocke et
   relit un « état de partie » brut (un objet quelconque) sous
   une clé du navigateur. App.jsx décide de CE QU'on y met.

   Plusieurs SLOTS coexistent : un pour chaque « jeu » (jeu 1 =
   voyage principal, jeu 2 = enquête Al3x1A…). Chaque slot a sa
   propre progression indépendante — on peut avoir un jeu 1 en
   cours ET un jeu 2 en cours en parallèle sur le même poste.

   Robustesse au format : chaque sauvegarde porte un numéro de
   VERSION. Si une future version du jeu change la structure,
   les vieilles sauvegardes incompatibles sont ignorées
   proprement (on repart à zéro) au lieu de planter.

   Rien de sensible n'est stocké : juste la progression de jeu.
   Pas de compte, pas de serveur — tout reste sur l'appareil,
   et exportable en fichier JSON pour changer de poste au CDI.
   ============================================================ */

const VERSION = 1;
const DEFAULT_SLOT = "jeu1";
/** Compat : les vieilles sauvegardes sans slot vivent sous cette clé. */
const LEGACY_KEY = "martine.save";

function keyFor(slot) {
  return slot === DEFAULT_SLOT ? LEGACY_KEY : `martine.save.${slot}`;
}

/** Lit la sauvegarde d'un slot. Renvoie l'objet d'état, ou null si absent
    / illisible / d'une version incompatible. */
export function loadSave(slot = DEFAULT_SLOT) {
  try {
    const raw = localStorage.getItem(keyFor(slot));
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || data.version !== VERSION) return null;
    return data.state ?? null;
  } catch {
    return null; // JSON corrompu, stockage bloqué… on repart proprement
  }
}

/** Écrit la sauvegarde (appelée automatiquement par App.jsx). */
export function writeSave(state, slot = DEFAULT_SLOT) {
  try {
    localStorage.setItem(keyFor(slot), JSON.stringify({ version: VERSION, savedAt: Date.now(), state }));
  } catch {
    /* stockage plein ou désactivé (navigation privée) : le jeu continue sans sauver */
  }
}

/** Efface la sauvegarde d'un slot (nouvelle partie confirmée). */
export function clearSave(slot = DEFAULT_SLOT) {
  try { localStorage.removeItem(keyFor(slot)); } catch { /* rien à faire */ }
}

/** Y a-t-il une partie à reprendre dans ce slot ? */
export function hasSave(slot = DEFAULT_SLOT) {
  return loadSave(slot) !== null;
}

/** Exporte la sauvegarde en texte JSON (pour téléchargement). */
export function exportSaveString(slot = DEFAULT_SLOT) {
  const raw = localStorage.getItem(keyFor(slot));
  return raw || null;
}

/** Importe une sauvegarde depuis un texte JSON (fichier choisi par
    l'élève). Renvoie true si l'import a réussi. */
export function importSaveString(text, slot = DEFAULT_SLOT) {
  try {
    const data = JSON.parse(text);
    if (!data || data.version !== VERSION || !data.state) return false;
    localStorage.setItem(keyFor(slot), JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}
