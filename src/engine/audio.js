/* ============================================================
   MOTEUR — Sons en synthèse Web Audio
   ============================================================
   Aucun fichier audio : le navigateur SYNTHÉTISE les sons
   (oscillateurs + enveloppes de volume). Avantages : zéro
   téléchargement, zéro question de licence, poids nul.

   API : playSfx('pickup'|'craft'|'success'|'message'|'fail'|'jump'|'dissolve')
   - pickup   : petit blip doux (on ramasse un élément)
   - craft    : deux notes montantes (objet fabriqué)
   - success  : arpège joyeux (événement réussi, ex. la chasse)
   - message  : arpège cristallin + scintillement (message transmis)
   - fail     : "bzzt" grave (combinaison ratée)
   - jump     : glissando ascendant (saut temporel)
   - dissolve : glissando descendant doux (message PERDU en route)

   Règle des navigateurs : le son ne peut démarrer qu'après une
   première interaction de l'utilisateur. Comme playSfx n'est
   appelé que depuis des clics/gestes, la règle est respectée :
   le contexte audio est créé (ou réveillé) au premier son.

   Le bouton 🔇 appelle setMuted() ; l'état est mémorisé dans
   localStorage et survit au rechargement de la page.
   ============================================================ */

let ctx = null;
let muted = typeof localStorage !== "undefined" && localStorage.getItem("martine.muted") === "1";

function ensureCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

/** Joue une note : fréquence f (→ f1 si glissando), départ décalé
    de t secondes, durée d, forme d'onde type, volume v. */
function tone(c, { f, f1, t = 0, d = 0.15, type = "sine", v = 0.2 }) {
  const o = c.createOscillator();
  const g = c.createGain();
  const now = c.currentTime + t;
  o.type = type;
  o.frequency.setValueAtTime(f, now);
  if (f1) o.frequency.exponentialRampToValueAtTime(f1, now + d);
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(v, now + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, now + d);
  o.connect(g);
  g.connect(c.destination);
  o.start(now);
  o.stop(now + d + 0.05);
}

/* Les recettes sonores (fréquences en Hz — do5 = 523, mi5 = 659…) */
const SFX = {
  pickup: (c) => tone(c, { f: 520, f1: 700, d: 0.1, type: "sine", v: 0.18 }),
  craft: (c) => {
    tone(c, { f: 523, d: 0.12, type: "triangle", v: 0.2 });
    tone(c, { f: 659, t: 0.09, d: 0.16, type: "triangle", v: 0.2 });
  },
  success: (c) => [523, 659, 784].forEach((f, i) =>
    tone(c, { f, t: i * 0.09, d: 0.15, type: "triangle", v: 0.2 })),
  message: (c) => {
    [523, 659, 784, 1047].forEach((f, i) =>
      tone(c, { f, t: i * 0.11, d: 0.3, type: "sine", v: 0.16 }));
    tone(c, { f: 2093, t: 0.44, d: 0.5, type: "sine", v: 0.06 }); // scintillement final
  },
  fail: (c) => {
    tone(c, { f: 140, f1: 80, d: 0.28, type: "sawtooth", v: 0.16 });
    tone(c, { f: 146, f1: 78, d: 0.28, type: "square", v: 0.07 }); // légère dissonance = "bzzt"
  },
  jump: (c) => {
    tone(c, { f: 180, f1: 1200, d: 0.7, type: "sine", v: 0.2 });
    tone(c, { f: 90, f1: 600, d: 0.7, type: "triangle", v: 0.1 });
  },
  /* message perdu : glissando DESCENDANT et doux, mélancolique
     (l'inverse du "jump" ascendant) — le message s'évapore, sans
     dureté : ce n'est pas un échec, c'est une disparition. */
  dissolve: (c) => {
    tone(c, { f: 660, f1: 165, d: 0.6, type: "sine", v: 0.13 });
    tone(c, { f: 330, f1: 90, t: 0.05, d: 0.72, type: "triangle", v: 0.07 });
  },
};

/** Joue un effet sonore (silencieux si le son est coupé ou indisponible). */
export function playSfx(name) {
  if (muted) return;
  try {
    const c = ensureCtx();
    SFX[name]?.(c);
  } catch {
    /* pas d'audio sur cet appareil : le jeu continue sans son */
  }
}

export function isMuted() { return muted; }

export function setMuted(m) {
  muted = m;
  try { localStorage.setItem("martine.muted", m ? "1" : "0"); } catch { /* stockage indisponible */ }
}

/* ------------------------------------------------------------
   Ambiances par époque (vent de la grotte, crépitement du feu…)
   EMPLACEMENT PRÉVU, DÉSACTIVÉ PAR DÉFAUT (choix du jalon M1).
   Pour l'activer plus tard : générer ou charger une boucle
   discrète ici, la démarrer au changement de tableau.
   ------------------------------------------------------------ */
export function startAmbience(/* sceneId */) { /* volontairement vide */ }
export function stopAmbience() { /* volontairement vide */ }
