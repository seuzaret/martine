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
  /* la flûte en os : une petite mélodie pentatonique, soufflée.
     Jouée quand la flûte est créée (voir `sfx` dans les MESSAGES). */
  flute: (c) => {
    [[587, 0.0], [784, 0.26], [659, 0.52], [880, 0.78], [784, 1.08]].forEach(([f, t]) => {
      tone(c, { f, t, d: 0.34, type: "sine", v: 0.15 });
      tone(c, { f: f * 2, t, d: 0.3, type: "triangle", v: 0.03 }); // souffle léger à l'octave
    });
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
   AMBIANCES — boucles discrètes, synthétisées elles aussi.
   Un tableau peut en demander une via `ambience: "…"` dans la
   liste SCENES de son data.js ; App démarre/arrête au changement
   de tableau. Volumes très bas : c'est un fond, pas un premier plan.

   "grotte" : un tambour sourd comme un battement de cœur, et des
   voix graves qui psalmodient — les chants du clan, au loin.
   ------------------------------------------------------------ */

/** Une voix qui psalmodie : attaque lente, deux voix légèrement
    désaccordées + une octave grave, comme un chœur lointain. */
function hum(c, f) {
  [f, f * 1.006, f / 2].forEach((ff, i) => {
    const o = c.createOscillator();
    const g = c.createGain();
    const now = c.currentTime;
    o.type = i === 2 ? "triangle" : "sine";
    o.frequency.setValueAtTime(ff, now);
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(i === 2 ? 0.018 : 0.028, now + 0.55);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
    o.connect(g);
    g.connect(c.destination);
    o.start(now);
    o.stop(now + 1.6);
  });
}

let amb = null; // { timer } : l'ambiance en cours

export function startAmbience(sceneId) {
  if (muted || amb || sceneId !== "grotte") return;
  /* ⚠ RÈGLE D'OR : on ne CRÉE JAMAIS le contexte audio ici (on serait
     hors d'un clic de l'utilisateur, et Firefox bloquerait alors TOUT le
     son du jeu). L'ambiance attend sagement que le premier effet sonore
     — déclenché par un clic — ait créé et débloqué le contexte. */
  const chant = [98, 110, 87.3, 98]; // sol, la, fa, sol — la mélopée
  let mesure = 0;
  const timer = setInterval(() => {
    if (muted || !ctx || ctx.state !== "running") return;
    try {
      /* le tambour : deux battements, comme un cœur (boum… boum) */
      tone(ctx, { f: 92, f1: 50, d: 0.22, type: "sine", v: 0.055 });
      tone(ctx, { f: 88, f1: 48, t: 0.34, d: 0.2, type: "sine", v: 0.035 });
      /* une mesure sur deux, la voix psalmodie */
      if (mesure % 2 === 0) hum(ctx, chant[(mesure / 2) % chant.length]);
      mesure++;
    } catch {
      /* pas d'audio : le jeu continue sans ambiance */
    }
  }, 1500);
  amb = { timer };
}

export function stopAmbience() {
  if (amb) { clearInterval(amb.timer); amb = null; }
}
