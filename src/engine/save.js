/* ============================================================
   MOTEUR — Sauvegarde de la progression (localStorage)
   ============================================================
   Utilitaire GÉNÉRIQUE, indépendant du contenu : il stocke et
   relit un « état de partie » brut (un objet quelconque) sous
   une clé du navigateur. App.jsx décide de CE QU'on y met.

   Robustesse au format : chaque sauvegarde porte un numéro de
   VERSION. Si une future version du jeu change la structure,
   les vieilles sauvegardes incompatibles sont ignorées
   proprement (on repart à zéro) au lieu de planter.

   Rien de sensible n'est stocké : juste la progression de jeu.
   Pas de compte, pas de serveur — tout reste sur l'appareil,
   et exportable en fichier JSON pour changer de poste au CDI.
   ============================================================ */

const KEY = "martine.save";
const VERSION = 1;

/** Lit la sauvegarde. Renvoie l'objet d'état, ou null si absent
    / illisible / d'une version incompatible. */
export function loadSave() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || data.version !== VERSION) return null;
    return data.state ?? null;
  } catch {
    return null; // JSON corrompu, stockage bloqué… on repart proprement
  }
}

/** Écrit la sauvegarde (appelée automatiquement par App.jsx). */
export function writeSave(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ version: VERSION, savedAt: Date.now(), state }));
  } catch {
    /* stockage plein ou désactivé (navigation privée) : le jeu continue sans sauver */
  }
}

/** Efface la sauvegarde (nouvelle partie confirmée). */
export function clearSave() {
  try { localStorage.removeItem(KEY); } catch { /* rien à faire */ }
}

/** Y a-t-il une partie à reprendre ? */
export function hasSave() {
  return loadSave() !== null;
}

/** Exporte la sauvegarde en texte JSON (pour téléchargement). */
export function exportSaveString() {
  const raw = localStorage.getItem(KEY);
  return raw || null;
}

/** Importe une sauvegarde depuis un texte JSON (fichier choisi par
    l'élève). Renvoie true si l'import a réussi. */
export function importSaveString(text) {
  try {
    const data = JSON.parse(text);
    if (!data || data.version !== VERSION || !data.state) return false;
    localStorage.setItem(KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}
