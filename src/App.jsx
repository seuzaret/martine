import { useState, useEffect, useRef } from "react";
import Martine, { Avatar } from "./engine/Martine.jsx";
import Scene from "./engine/Scene.jsx";
import { InventoryBar } from "./engine/Inventory.jsx";
import { DragProvider } from "./engine/DragDrop.jsx";
import Particles from "./engine/Particles.jsx";
import Gauges from "./engine/Gauges.jsx";
import Frise, { trendSentence } from "./engine/Frise.jsx";
import { playSfx, isMuted, setMuted, startAmbience, stopAmbience } from "./engine/audio.js";
import { loadSave, writeSave, clearSave, hasSave, exportSaveString, importSaveString } from "./engine/save.js";
import { findRecipe, findNearMiss, randomLine } from "./engine/Crafting.js";
import { lastHotspotClick } from "./engine/Hotspot.jsx";
import { CHAPTERS } from "./chapters/index.js";
import { ILLUSTRATIONS } from "./chapters/illustrations.jsx";
import { AlphabetGame } from "./chapters/alphabet.jsx";
import { TabletteGame } from "./chapters/mesopotamie-tablette.jsx";
import { CartoucheGame } from "./chapters/egypte-cartouche.jsx";
import { FactureGame } from "./chapters/moyen-age-facture.jsx";
import { ChappeGame } from "./chapters/moderne-chappe.jsx";
import { MorseGame } from "./chapters/xixe-morse.jsx";
import { TsfGame } from "./chapters/xixe-tsf.jsx";
import { PhotoGame } from "./chapters/xixe-photo.jsx";
import { PhonoGame } from "./chapters/xixe-phono.jsx";
import { CineGame } from "./chapters/xixe-cine.jsx";
import { TsfReglageGame } from "./chapters/xxe-tsf-reglage.jsx";
import { CassetteGame } from "./chapters/xxe-cassette.jsx";
import { GraverCdGame } from "./chapters/xxe-graver-cd.jsx";
import { EniacDebugGame } from "./chapters/xxe-eniac-debug.jsx";
import Mediadex from "./engine/Mediadex.jsx";
import MediaCard from "./engine/MediaCard.jsx";
import { getCardMeta, playCardSound } from "./engine/mediadex.js";
import { SosButton, SosOverlay } from "./engine/SosSignal.jsx";
import { WorldMap, MiniMap } from "./engine/WorldMap.jsx";
import * as EPILOGUE from "./chapters/epilogue/data.js";

/* Police « épique » du titre : on tente d'abord de belles polices gravées
   (souvent présentes sur les PC scolaires via Office), avec repli élégant.
   Aucun fichier chargé : tout reste hors-ligne. */
const TITRE_FONT = "'Cinzel', 'Trajan Pro', 'Copperplate Gothic Bold', 'Perpetua Titling MT', 'Constantia', 'Palatino Linotype', Georgia, serif";

/* ============================================================
   MARTINE — Application principale
   Trois écrans : titre → jeu → fin.
   L'écran de jeu tient sur UNE SEULE VUE, sans défilement :
   ┌──────────────────────────────────────┐
   │ bandeau : lieu · compteur · boutons · saut │
   │ TABLEAU (prend toute la place libre) │
   │ console MARTINE                      │
   │ besace (barre d'icônes)              │
   └──────────────────────────────────────┘
   Plus de creuset : on combine par glisser-déposer (élément →
   élément, ou élément → objet du décor) ou par tap-tap.

   Nettoyage automatique : un élément est retiré de la besace
   quand PLUS AUCUNE recette restante ne l'utilise — jamais
   avant, pour ne jamais bloquer une chaîne (la branche sert
   trois fois !). `made` garde la liste de tout ce qui a déjà
   été créé ou découvert.
   ============================================================ */

/* ============================================================
   LA JAUGE TEMPORELLE — colonne à DROITE du décor (écran large).
   Elle se remplit à chaque trace transmise (chaque personne aidée) ;
   pleine, elle débloque le départ vers l'époque suivante. En dessous,
   un suivi de « trouvailles » (pastilles) montre où l'on en est.
   Aucun état propre : tout vient des props (moteur/contenu séparés).
   ============================================================ */
function JaugeTemporelle({ transmis, requis, total, destination, canJump, onJump, isLast, bloque }) {
  const pct = Math.min(100, Math.round((transmis / requis) * 100));
  return (
    <div style={{ width: 116, flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "center", minHeight: 0,
        background: "linear-gradient(180deg,#141b28,#0c1220)", border: "1px solid #26324a", borderRadius: 12, padding: "9px 8px", gap: 7 }}>
      <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 9, letterSpacing: 1.5, color: "#7fd8ff", textAlign: "center", lineHeight: 1.35 }}>⏳ RETOUR<br />VERS LE FUTUR</div>

      {/* la colonne qui se remplit (de bas en haut) */}
      <div style={{ flex: "1 1 auto", width: 30, minHeight: 54, background: "#0a1119", border: "1px solid #26324a", borderRadius: 8, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column-reverse" }}>
        <div style={{ height: `${pct}%`, background: canJump ? "linear-gradient(0deg,#e8934a,#ffd166)" : "linear-gradient(0deg,#2f5a76,#7fd8ff)", transition: "height .7s cubic-bezier(.3,1.2,.5,1)", boxShadow: canJump ? "0 0 16px #ffd166" : "none" }} />
        {/* graduations : une par trace requise */}
        {Array.from({ length: requis - 1 }).map((_, i) => (
          <div key={i} style={{ position: "absolute", left: 0, right: 0, bottom: `${((i + 1) / requis) * 100}%`, height: 1, background: "#0a1119" }} />
        ))}
      </div>

      <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 12, fontWeight: 700, color: canJump ? "#ffd166" : "#8fa3bd" }}>{Math.min(transmis, requis)}/{requis}</div>

      <button onClick={onJump} disabled={!canJump} title={canJump ? (isLast ? "Voir l'épilogue" : `Partir vers ${destination}`) : (bloque || `Aide encore ${requis - transmis} personne(s)`)}
        style={{ width: "100%", background: canJump ? "#e8934a" : "#141b28", color: canJump ? "#160c02" : "#54607a", border: "none", borderRadius: 8, padding: "8px 4px", fontFamily: "ui-monospace,monospace", fontSize: 11, fontWeight: 800, letterSpacing: 0.5, cursor: canJump ? "pointer" : "not-allowed", lineHeight: 1.3, animation: canJump ? "glow 2.4s ease-in-out infinite" : "none" }}>
        {canJump ? (isLast ? "🌀 FIN" : "🌀 PARTIR") : "🔒"}
      </button>
      {canJump && !isLast && <div style={{ fontSize: 8.5, color: "#e8934a", fontFamily: "ui-monospace,monospace", textAlign: "center", lineHeight: 1.2, marginTop: -3 }}>{destination}</div>}

      {/* suivi des trouvailles : une pastille par invention de l'époque */}
      <div style={{ borderTop: "1px solid #26324a", paddingTop: 6, marginTop: 2, width: "100%" }}>
        <div style={{ fontSize: 8, color: "#6f8099", fontFamily: "ui-monospace,monospace", letterSpacing: 1, textAlign: "center" }}>TROUVAILLES</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center", marginTop: 5 }}>
          {Array.from({ length: total }).map((_, i) => (
            <span key={i} style={{ width: 9, height: 9, borderRadius: "50%",
              background: i < transmis ? "#ffd166" : "#20293c",
              border: i < transmis ? "none" : "1px solid #2c3852",
              boxShadow: i < transmis ? "0 0 5px #ffd16699" : "none" }} />
          ))}
        </div>
        <div style={{ fontSize: 9.5, color: "#8fa3bd", fontFamily: "ui-monospace,monospace", marginTop: 5, textAlign: "center" }}>{transmis}/{total}</div>
      </div>
    </div>
  );
}

export default function App() {
  /* Le chapitre COURANT est choisi dans le registre CHAPTERS.
     Il devient dynamique : le saut temporel charge le suivant. */
  const [chapterIndex, setChapterIndex] = useState(0);
  const chapter = CHAPTERS[chapterIndex];

  /* Messages TRANSMIS du chapitre courant (compteur « X/N » + saut).
     Les messages perdus (fragments) en sont exclus : ils comptent
     pour la frise/collection cumulative, mais pas pour le saut. */
  const ALL_MSGS = Object.keys(chapter.messages).filter((id) => !chapter.messages[id].perdu);

  /* Un élément est-il encore utile ? (au moins une recette pas
     encore réalisée l'utilise) — utilise le chapitre courant.
     Les objets « héritage » (heirloom) ne sont JAMAIS nettoyés :
     ils ne servent pas dans ce chapitre, mais voyageront au suivant.
     `keep` : objet à conserver dans la besace même si aucune RECETTE ne
     l'utilise (ex. ingrédients d'un mini-jeu : encre, calame, papyrus). */
  const isUseful = (id, made) =>
    chapter.items[id]?.heirloom ||
    chapter.items[id]?.keep ||
    chapter.recipes.some((r) => (r.a === id || r.b === id) && !made.includes(r.out));
  const cleanup = (invArr, made) => invArr.filter((id) => isUseful(id, made));

  const [screen, setScreen] = useState("title"); // title | play | transition | end
  const [transitionTo, setTransitionTo] = useState(null); // chapitre visé pendant la transition
  const [maxReached, setMaxReached] = useState(0); // plus haut chapitre débloqué (menu titre)
  const [tab, setTab] = useState(CHAPTERS[0].startScene); // tableau courant
  const [dialog, setDialog] = useState({ lines: CHAPTERS[0].intro, idx: 0, mood: "neutre" });
  const [inv, setInv] = useState([]);            // besace (identifiants d'objets)
  const [msgs, setMsgs] = useState([]);          // messages transmis au futur
  const [collection, setCollection] = useState([]); // frise cumulative : {id, titre, emoji, date, jauges, perdu}
  const [made, setMade] = useState([]);          // tout ce qui a déjà été créé/découvert
  const [flags, setFlags] = useState({});        // drapeaux d'événements (ex. hunted)
  const [quete, setQuete] = useState(0);         // étape en cours de la quête du chapitre (voir data.js)
  const [portraitOpen, setPortraitOpen] = useState(false); // le gros plan de l'étape est-il affiché ?
  const [modal, setModal] = useState(null);      // fiche documentaire ou carnet
  const [bubble, setBubble] = useState(null);    // phylactère d'un personnage {text, x, y}
  const [shake, setShake] = useState(false);     // animation d'échec (besace)
  const [sparkle, setSparkle] = useState(false); // halo de réussite (tableau)
  const [reveal, setReveal] = useState(false);   // bouton 👁
  const [fx, setFx] = useState(null);            // particules {x, y, big, key}
  const [dust, setDust] = useState(null);        // effet poussière d'un message perdu {x, y, emoji, key}
  const [muted, setMutedState] = useState(isMuted()); // bouton 🔇 (mémorisé)
  const [cheat, setCheat] = useState(false);     // mode triche (dev) — tape « triche » pour l'ouvrir
  const [epiChoice, setEpiChoice] = useState(null); // épilogue : le support choisi par le joueur
  const [prenom, setPrenom] = useState("");      // carnet imprimable : le prénom de l'élève
  const [mediadex, setMediadex] = useState([]);  // msg_ids des cartes-inventions découvertes
  const [cardShowing, setCardShowing] = useState(null); // {card, message} pendant l'apparition
  const [showMediadex, setShowMediadex] = useState(false); // l'écran Mediadex plein écran est-il ouvert ?
  const [sosPending, setSosPending] = useState(null);   // msg_id dont on peut encore émettre le SOS
  const [sosOpen, setSosOpen] = useState(false);         // l'animation Morse est-elle en cours ?
  const [sosSent, setSosSent] = useState([]);            // msg_ids pour lesquels le SOS a été émis
  const [flux, setFlux] = useState(0);                   // ⚡ jauge globale de « flux temporel »
  const [fluxBubble, setFluxBubble] = useState(null);    // {delta, key} — anim +N/-N flottante
  const [sosChooserOpen, setSosChooserOpen] = useState(false); // choix du support SOS fin de chapitre
  /* Confort de lecture (accessibilité) — mémorisé sur l'appareil, à part
     de la sauvegarde de partie (une même classe garde ses réglages). */
  const [a11y, setA11y] = useState(() => {
    try { return { gros: false, dys: false, calme: false, ...JSON.parse(localStorage.getItem("martine.a11y") || "{}") }; }
    catch { return { gros: false, dys: false, calme: false }; }
  });
  const [isFull, setIsFull] = useState(false);   // plein écran (mode classe)
  /* Le décor est en 16/9 : sur un écran LARGE il est bloqué par la hauteur et
     il reste de la place perdue sur les côtés → on met la besace en colonne à
     gauche (le décor gagne ~38 % de surface sur un 1366×768). Sur un écran
     étroit ou une tablette 4/3, c'est la largeur qui manque : la besace
     revient en bas, où le pouce l'atteint. */
  const REQ_LARGE = "(min-width: 1000px) and (min-aspect-ratio: 8/5)";
  const [large, setLarge] = useState(() => typeof window !== "undefined" && window.matchMedia(REQ_LARGE).matches);
  useEffect(() => {
    const mq = window.matchMedia(REQ_LARGE);
    /* on écoute AUSSI le redimensionnement : c'est la ceinture et les
       bretelles (passage en plein écran, rotation d'une tablette…). */
    const sync = () => setLarge(mq.matches);
    mq.addEventListener("change", sync);
    window.addEventListener("resize", sync);
    return () => { mq.removeEventListener("change", sync); window.removeEventListener("resize", sync); };
  }, []);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next); setMutedState(next);
    /* on vient d'ACTIVER le son ? un petit bip de confirmation, joué dans
       ce clic (donc autorisé par Firefox) : test direct que le son sort. */
    if (!next) setTimeout(() => playSfx("test"), 40);
  };
  /* `mood` pilote l'expression de l'avatar : "neutre" | "content" | "vexe" */
  const say = (line, mood = "neutre") => setDialog({ lines: Array.isArray(line) ? line : [line], idx: 0, mood });
  const flash = () => { setSparkle(true); setTimeout(() => setSparkle(false), 800); };

  /* Volée de particules au point de la combinaison.
     `big` : version amplifiée pour les messages transmis au futur. */
  const boom = (point, big = false) => {
    const p = point && point.x ? point : { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    setFx({ ...p, big, key: Date.now() });
    setTimeout(() => setFx(null), 1100);
  };

  /* Effet « poussière » d'un message perdu : le pictogramme s'envole
     du point de la combinaison et se désintègre. */
  const poof = (point, emoji) => {
    const p = point && point.x ? point : { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    setDust({ ...p, emoji, key: Date.now() });
    setTimeout(() => setDust(null), 1000);
  };

  /* SAUVEGARDE AUTOMATIQUE : dès qu'un élément important change
     pendant une partie, on écrit l'état dans le navigateur. On ne
     sauvegarde PAS sur l'écran titre (pour ne pas écraser une
     partie existante avec un état vide). */
  useEffect(() => {
    if (screen === "play" || screen === "end") {
      writeSave({ chapterIndex, maxReached, screen, tab, inv, msgs, made, flags, collection, quete, mediadex, sosSent, flux });
    }
  }, [chapterIndex, maxReached, screen, tab, inv, msgs, made, flags, collection, quete, mediadex, sosSent, flux]);

  /* CONFORT DE LECTURE : applique les classes sur <html> (le CSS fait le
     reste, moteur compris) et mémorise le choix sur l'appareil. */
  useEffect(() => {
    const r = document.documentElement;
    r.classList.toggle("a11y-gros", a11y.gros);
    r.classList.toggle("a11y-dys", a11y.dys);
    r.classList.toggle("a11y-calme", a11y.calme);
    try { localStorage.setItem("martine.a11y", JSON.stringify(a11y)); } catch { /* stockage indisponible */ }
  }, [a11y]);

  /* la bulle d'un personnage disparaît quand on change de tableau */
  useEffect(() => { setBubble(null); }, [tab]);

  /* le bouton SOS en attente se ferme dès qu'on change de tableau ou de
     chapitre (on n'accumule pas les SOS non émis entre deux scènes). */
  useEffect(() => { setSosPending(null); setSosOpen(false); }, [tab, chapterIndex]);

  /* les objets marqués `ephemere: true` (fausses pistes d'un tableau —
     jouets, bric-à-brac…) disparaissent du sac dès qu'on change de
     tableau. Le champ `made` reste : ils ne réapparaîtront pas si on
     revient dans le décor. */
  useEffect(() => {
    const items = chapter?.items || {};
    setInv((v) => v.filter((id) => !items[id]?.ephemere));
  }, [tab, chapterIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  /* …et dès qu'on clique AILLEURS (n'importe où sur l'écran). L'écouteur
     est en phase de CAPTURE : si le clic vise un autre personnage, la bulle
     s'efface d'abord, puis son action réaffiche aussitôt la nouvelle. */
  useEffect(() => {
    if (!bubble) return;
    const fermer = () => setBubble(null);
    document.addEventListener("click", fermer, true);
    return () => document.removeEventListener("click", fermer, true);
  }, [bubble]);

  /* Dimensionnement du décor : on mesure la place disponible (la cellule
     centrale) et on calcule le PLUS GRAND cadre au ratio 1000/560 qui y
     tient ENTIÈREMENT — largeur OU hauteur selon ce qui limite. Ainsi le
     décor n'est jamais « trop zoomé » (pas de rognage au-delà de la légère
     sur-échelle de la parallaxe), quelle que soit la taille d'écran. */
  const decorCellRef = useRef(null);
  const [decorBox, setDecorBox] = useState(null);
  useEffect(() => {
    const el = decorCellRef.current;
    if (!el) return;
    const R = 1000 / 560;
    const mesurer = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      const box = w / h > R ? { w: Math.round(h * R), h } : { w, h: Math.round(w / R) };
      setDecorBox(box);
    };
    mesurer();
    const ro = new ResizeObserver(mesurer);
    ro.observe(el);
    return () => ro.disconnect();
  }, [screen]);

  /* PLEIN ÉCRAN (mode classe) : suit l'état réel du navigateur, car on
     peut aussi en sortir avec la touche Échap. */
  useEffect(() => {
    const onFsChange = () => setIsFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);
  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else document.documentElement.requestFullscreen?.();
  };

  /* MODE TRICHE (pour l'enseignant, pas les élèves) : tape le mot
     « triche » au clavier n'importe où pour afficher/masquer le
     petit panneau de test. Aucun conflit avec les raccourcis du
     navigateur. Tout est dans App.jsx (le moteur n'est pas touché). */
  useEffect(() => {
    let buf = "";
    const onKey = (e) => {
      if (e.key && e.key.length === 1) {
        buf = (buf + e.key.toLowerCase()).slice(-6);
        if (buf === "triche") setCheat((c) => !c);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Actions du mode triche */
  const cheatGiveAll = () => setInv(Object.keys(chapter.items)); // tous les éléments du chapitre dans la besace
  const cheatUnlockAll = () => setMaxReached(CHAPTERS.length - 1); // débloque tous les chapitres du menu
  const cheatFillFrise = () => {                                  // remplit la frise de TOUTES les époques
    const all = [];
    CHAPTERS.forEach((ch) => Object.entries(ch.messages).forEach(([id, m]) =>
      all.push({ id, titre: m.title, emoji: m.emoji, date: ch.date, jauges: m.jauges, fact: m.fact, perdu: !!m.perdu })));
    setCollection(all);
  };

  /* Démarre une NOUVELLE partie (tout remis à zéro, chapitre 1). */
  const newGame = () => {
    setChapterIndex(0); setMaxReached(0);
    setInv([]); setMsgs([]); setMade([]); setFlags({}); setCollection([]); setQuete(0);
    setTab(CHAPTERS[0].startScene); setDialog({ lines: CHAPTERS[0].intro, idx: 0, mood: "neutre" });
    setScreen("play");
  };

  /* Charge un chapitre. L'inventaire et l'état du chapitre repartent
     de zéro (nouvelle époque)… SAUF les objets « héritage »
     (heirloom: true) qui voyagent d'une époque à l'autre — à
     condition d'exister aussi dans le chapitre d'arrivée. La frise
     et les messages découverts, eux, sont CUMULATIFS. */
  const goToChapter = (i) => {
    const carried = inv.filter((id) => chapter.items[id]?.heirloom && CHAPTERS[i].items[id]);
    setChapterIndex(i);
    setMaxReached((m) => Math.max(m, i));
    setInv(carried); setMsgs([]); setMade([]); setFlags({}); setQuete(0);
    setTab(CHAPTERS[i].startScene);
    setDialog({ lines: CHAPTERS[i].intro, idx: 0, mood: "neutre" });
    setScreen("play");
  };

  /* Rejoue un chapitre depuis le menu titre (repart de son début,
     sans toucher à la frise/collection cumulative). Les objets
     HÉRITAGE (heirloom) du chapitre sont pré-remplis dans le sac
     pour qu'un enseignant puisse tester une époque sans avoir dû
     rejouer toutes les précédentes. */
  const playChapter = (i) => {
    const seed = Object.entries(CHAPTERS[i].items || {})
      .filter(([, it]) => it.heirloom).map(([id]) => id);
    setChapterIndex(i);
    setMaxReached((m) => Math.max(m, i));
    setInv(seed); setMsgs([]); setMade([]); setFlags({}); setQuete(0);
    setTab(CHAPTERS[i].startScene);
    setDialog({ lines: CHAPTERS[i].intro, idx: 0, mood: "neutre" });
    setScreen("play");
  };

  /* Reprend la partie sauvegardée (bouton « Reprendre »). */
  const resume = () => {
    const s = loadSave();
    if (!s) { newGame(); return; }
    const i = s.chapterIndex ?? 0;
    setChapterIndex(i);
    setMaxReached(s.maxReached ?? i);
    setInv(s.inv || []); setMsgs(s.msgs || []); setMade(s.made || []);
    setFlags(s.flags || {}); setCollection(s.collection || []); setQuete(s.quete || 0);
    setMediadex(s.mediadex || []); setSosSent(s.sosSent || []); setFlux(s.flux || 0);
    setTab(s.tab ?? CHAPTERS[i].startScene);
    setDialog({ lines: ["Reprise du voyage. Je remets les circuits en route là où on s'était arrêtés."], idx: 0, mood: "neutre" });
    setScreen(s.screen === "end" ? "end" : "play");
  };

  /* Ramasser un élément dans le décor.
     Les SUPPORTS (support: true dans le data.js — ex. la paroi, le feu,
     le four) ne se ramassent PAS : ils sont fixes, on les laisse dans le
     décor et on leur APPORTE un objet (glisser un outil dessus, ou le
     sélectionner puis toucher le support). Seuls les OUTILS vont au sac. */
  const collect = (id) => {
    const it = chapter.items[id];
    if (it.support) {
      say(`${it.emoji} ${it.name} — ${it.desc} Ça ne se range pas dans le sac : apporte-lui un objet (glisse quelque chose dessus).`);
      return;
    }
    if (!inv.includes(id)) {
      setInv((v) => [...v, id]);
      /* on garde une trace « obtenu » (même après usage) pour que les décors
         puissent réagir durablement — ex. la ruche décrochée, le bœuf abattu. */
      setMade((v) => (v.includes(id) ? v : [...v, id]));
      playSfx("pickup");
      say(`${it.emoji} ${it.name} — ${it.desc}`);
    } else {
      say(`${it.name} : déjà noté. ${it.desc}`);
    }
  };

  /* Action spéciale d'un décor (ex. entrer dans la grotte) */
  const action = (name, point) => {
    const act = chapter.actions[name];
    if (!act) return;
    /* certaines « actions » ouvrent un mini-jeu (ex. l'alphabet). Elles
       peuvent exiger un drapeau préalable — sinon MARTINE explique ce qui
       manque via `needMsg`, et la modale reste fermée. */
    if (act.modal) {
      if (act.needsFlag) {
        const list = Array.isArray(act.needsFlag) ? act.needsFlag : [act.needsFlag];
        const manque = list.find((f) => !flags[f] && !made.includes(f));
        if (manque) { say(act.needMsg || "Il y a une étape à faire avant.", "vexe"); return; }
      }
      setModal({ type: act.modal }); return;
    }
    if (act.goto !== undefined) setTab(act.goto);
    /* LA QUÊTE (si le chapitre en a une) : quand on clique le personnage
       de l'étape en cours, il dit SA réplique d'étape (pas sa réplique
       par défaut). Une étape sans tâche (`attend`) passe aussitôt à la
       suivante : le « ? » doré se déplace. */
    const step = chapter.quete?.[quete];
    /* étape en GROS PLAN : cliquer le personnage ouvre son portrait
       (le texte, l'avancée et le `say` passent par le bouton Continuer) */
    if (step && step.perso === name && step.portrait) {
      setBubble(null);
      setPortraitOpen(true);
      return;
    }
    let bubbleText = act.bubble, sayText = act.say, mood = act.mood;
    if (step && step.perso === name) {
      bubbleText = step.bubble ?? act.bubble;
      sayText = step.say ?? act.say;
      mood = step.mood ?? act.mood;
      if (!step.attend) {
        setQuete((q) => q + 1);
        /* une étape peut OCTROYER un drapeau en s'achevant (ex. l'accord
           du seigneur qui remet la bourse) → jalon de navigation. */
        if (step.grant) grantFlag(step.grant);
        if (step.suite) setTimeout(() => say(`➜ ${step.suite}`), 1400);
      }
    }
    /* un personnage qui a des paroles propres (`bubble`) les affiche en
       phylactère à côté de lui (ancré à la dernière position cliquée) ;
       MARTINE, elle, commente dans sa console (`say`). Les deux tombent
       en même temps. */
    const pt = point || lastHotspotClick;
    if (bubbleText) setBubble({ text: bubbleText, x: pt.x, y: pt.y });
    else setBubble(null);
    if (sayText) say(sayText, mood);
  };

  /* La quête avance toute seule quand la tâche de l'étape est accomplie
     (un objet/message de `made`, ou un drapeau ; une liste = un parmi).
     MARTINE annonce la suite un instant après le feu d'artifice. */
  useEffect(() => {
    const step = chapter.quete?.[quete];
    if (!step || !step.attend) return;
    const liste = Array.isArray(step.attend) ? step.attend : [step.attend];
    if (liste.some((id) => made.includes(id) || flags[id])) {
      setQuete((q) => q + 1);
      if (step.suite) setTimeout(() => say(`➜ ${step.suite}`), 1800);
    }
  }, [made, flags, quete]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Le gros plan : il s'ouvre TOUT SEUL sur les étapes `auto` (l'accueil
     d'Ana) et se referme dès que l'étape change — pour les autres, c'est
     le clic sur le personnage qui l'ouvre (voir `action`). */
  useEffect(() => {
    const st = chapter.quete?.[quete];
    setPortraitOpen(!!(st?.portrait && st.auto));
    /* dépendance sur `tab` (pas `quete`) : l'encart auto s'ouvre à
       l'ARRIVÉE sur un nouveau tableau. Si on le déclenchait sur `quete`,
       la fin d'une étape ouvrirait le portrait du perso suivant sur
       l'ancien tableau (bug « un tableau trop tôt »). */
  }, [tab, chapterIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  /* AMBIANCE SONORE : si le tableau courant en déclare une (champ
     `ambience` dans les SCENES du data.js), elle démarre en douceur et
     s'arrête dès qu'on change de tableau, d'écran, ou qu'on coupe le son. */
  useEffect(() => {
    const amb = screen === "play" && !muted ? chapter.scenes[tab]?.ambience : null;
    if (amb) startAmbience(amb);
    return stopAmbience;
  }, [screen, chapterIndex, tab, muted]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ⚡ Modifie la jauge de FLUX TEMPOREL avec une petite bulle animée
     +N / -N flottante. Peut passer en négatif (plafond du chapitre non
     bloquant pour l'instant — on calibrera). */
  const bumpFlux = (delta) => {
    if (!delta) return;
    setFlux((v) => Math.round((v + delta) * 10) / 10); // arrondi 0.1
    setFluxBubble({ delta, key: Date.now() });
    setTimeout(() => setFluxBubble((b) => (b && b.key ? null : b)), 1400);
  };

  /* Ouvre la CARTE-INVENTION (façon Pokémon) si le message a une image
     Wikimedia dans le Mediadex. La carte apparaît par-dessus la fiche
     pédagogique et se ferme au bout de quelques secondes. Idempotent.
     Déclenche aussi le bouton SOS flottant : le joueur peut émettre le
     signal de détresse ··· −−− ··· pour être retrouvé par l'équipe. */
  const unlockCard = (msgId, msgData) => {
    // Le SOS n'apparaît plus par transmission — il se choisit en fin de chapitre
    // Carte-invention (uniquement si mappée dans le Mediadex)
    const card = getCardMeta(msgId);
    if (!card) return;
    setMediadex((v) => v.includes(msgId) ? v : [...v, msgId]);
    setTimeout(() => {
      setCardShowing({ card, message: msgData });
      playCardSound(muted);
    }, 500);
  };

  /* Octroyer un message SANS combinaison d'objets — pour les mini-jeux
     (ex. réussir « Écris MARTINE » transmet vraiment l'alphabet).
     Idempotent : pas de doublon si le cristal est déjà obtenu. */
  const grantMessage = (id) => {
    if (made.includes(id)) return;
    const m = chapter.messages[id];
    if (!m) return;
    setMade((v) => (v.includes(id) ? v : [...v, id]));
    setMsgs((v) => (v.includes(id) ? v : [...v, id]));
    setCollection((c) => c.some((x) => x.id === id) ? c
      : [...c, { id, titre: m.title, emoji: m.emoji, date: chapter.date, jauges: m.jauges, fact: m.fact, perdu: false }]);
    flash(); playSfx("message");
    bumpFlux(3);
    say(`◆ « ${m.title} » transmis au futur ! Tu l'as gagné en l'écrivant toi-même. Mes circuits se rechargent.`, "content");
    unlockCard(id, m);
  };

  /* Octroyer un OBJET (dans la besace) — pour les mini-jeux qui font GAGNER
     un ingrédient à combiner ensuite (ex. l'alphabet, à mettre sur les navires). */
  const grantItem = (id) => {
    if (inv.includes(id)) return;
    const it = chapter.items[id];
    if (!it) return;
    setMade((v) => (v.includes(id) ? v : [...v, id]));
    setInv((v) => (v.includes(id) ? v : [...v, id]));
    flash(); playSfx("craft");
    say(`✨ Tu as gagné : ${it.emoji} ${it.name}. ${it.desc}`, "content");
  };

  /* Poser un DRAPEAU d'événement franchi (ex. « paye » : la note du
     copiste réglée). On l'inscrit AUSSI dans `made` car les jalons de
     navigation (nextWhen) et de quête (attend) le cherchent là. */
  const grantFlag = (id) => {
    setMade((v) => (v.includes(id) ? v : [...v, id]));
    setFlags((f) => ({ ...f, [id]: true }));
    flash(); playSfx("message");
  };

  const doReveal = () => { setReveal(true); setTimeout(() => setReveal(false), 2200); };

  /* Un élément est-il caché par un drapeau ? (ex. le cerf après la chasse) */
  const isHidden = (id) =>
    Object.entries(chapter.hiddenByFlag || {}).some(([flag, ids]) => flags[flag] && ids.includes(id));

  /* Tenter la combinaison de deux éléments — appelé par le
     glisser-déposer et par le tap sur une cible.
     `point` : position à l'écran, pour les particules. */
  const combinePair = (a, b, point) => {
    const rec = findRecipe(chapter.recipes, a, b);
    if (rec) {
      /* `needsInv` : objets qu'il faut AUSSI avoir en main pour que la
         recette parte (ex. la forme encrée avant de presser une feuille).
         Vaut pour TOUS les types de recettes. */
      if (rec.needsInv) {
        const manque = rec.needsInv.find((id) => !inv.includes(id));
        if (manque) { setShake(true); setTimeout(() => setShake(false), 500); playSfx("fail"); say(rec.needMsg || `Il te manque : ${chapter.items[manque]?.name}.`, "vexe"); return; }
      }
      /* `needsFlag` : ÉTAT préalable requis (drapeau ou jalon `made`), sans
         objet dans le sac — ex. la presse déjà composée/encrée. */
      if (rec.needsFlag) {
        const list = Array.isArray(rec.needsFlag) ? rec.needsFlag : [rec.needsFlag];
        const manque = list.find((f) => !flags[f] && !made.includes(f));
        if (manque) { setShake(true); setTimeout(() => setShake(false), 500); playSfx("fail"); say(rec.needMsg || "Il manque une étape avant celle-ci.", "vexe"); return; }
      }
      /* recette qui OUVRE un mini-jeu (ex. encre + papyrus → cartouche).
         Honore `consume` : les ingrédients consommés partent du sac
         immédiatement (ex. la pile de Volta apporte le courant au
         télégraphe et n'a plus lieu d'être ensuite). */
      if (rec.opens) {
        if (rec.consume) setInv((v) => cleanup(v.filter((x) => !rec.consume.includes(x)), made));
        boom(point); playSfx("craft");
        setModal({ type: rec.opens });
        return;
      }
      /* déjà réalisé ? pas de doublon */
      if (made.includes(rec.out)) {
        say(rec.perdu
          ? "Celui-là s'est déjà perdu une fois. Le bois pourrit tout aussi bien la seconde."
          : rec.msg
            ? "Déjà transmis, celui-là. Mes cristaux refusent les doublons — question de principe."
            : "Déjà fabriqué. L'artisanat, oui ; la surproduction, non.", "vexe");
        return;
      }
      const newMade = [...made, rec.out];
      setMade(newMade);

      /* Recette-événement (ex. la chasse) : donne/retire des objets, lève un drapeau */
      if (rec.gives) {
        if (rec.flag) setFlags((f) => ({ ...f, [rec.flag]: true }));
        setInv((v) => cleanup([...v.filter((x) => !(rec.consume || []).includes(x)), ...rec.gives.filter((g) => !v.includes(g))], newMade));
        flash(); boom(point); playSfx("success");
        say(rec.line, "content");
        return;
      }
      /* Message PERDU : la combinaison réussit… mais le support ne
         parvient pas au futur. Fragment (pas cristal), il rejoint la
         collection/frise mais PAS `msgs` (donc pas le saut). Ton
         mélancolique, jamais punitif. */
      if (rec.msg && rec.perdu) {
        const m = chapter.messages[rec.out];
        setCollection((c) => c.some((x) => x.id === rec.out) ? c : [...c, { id: rec.out, titre: m.title, emoji: m.emoji, date: chapter.date, jauges: m.jauges, fact: m.fact, perdu: true }]);
        setInv((v) => cleanup(v.filter((x) => !(rec.consume || []).includes(x)), newMade));
        poof(point, m.emoji); playSfx("dissolve");
        say(`💨 « ${m.title} »… envolé. Le message a bien existé, mais son support ne nous est jamais parvenu. Tu récupères un fragment — et une leçon.`, "neutre");
        setTimeout(() => setModal({ type: "lost", id: rec.out }), 850);
        return;
      }
      /* Message pour le futur : gros feu d'artifice, PUIS la fiche documentaire */
      if (rec.msg) {
        const m = chapter.messages[rec.out];
        setMsgs((v) => [...v, rec.out]);
        setCollection((c) => c.some((x) => x.id === rec.out) ? c : [...c, { id: rec.out, titre: m.title, emoji: m.emoji, date: chapter.date, jauges: m.jauges, fact: m.fact, perdu: false }]);
        setInv((v) => cleanup(v.filter((x) => !(rec.consume || []).includes(x)), newMade));
        flash(); boom(point, true); playSfx("message");
        /* certains messages ont leur propre son (ex. la flûte joue sa
           mélodie) : il part juste après l'arpège de transmission */
        if (m.sfx) setTimeout(() => playSfx(m.sfx), 950);
        say(`◆ « ${chapter.messages[rec.out].title} » transmis au futur ! Mes circuits se rechargent, je sens l'excellence revenir.`, "content");
        bumpFlux(3);
        setTimeout(() => setModal({ type: "fact", id: rec.out }), 750);
        unlockCard(rec.out, m);
        return;
      }
      /* Objet fabriqué classique */
      setInv((v) => cleanup([...v.filter((x) => !(rec.consume || []).includes(x)), rec.out], newMade));
      flash(); boom(point); playSfx("craft");
      say(`✨ NOUVEL OBJET : ${chapter.items[rec.out].emoji} ${chapter.items[rec.out].name}. ${rec.line}`, "content");
      return;
    }
    /* Échec : réplique « presque ! » si prévue, sinon réplique au hasard.
       Les éléments ne sont jamais consommés : ils restent dans la besace. */
    const nm = findNearMiss(chapter.nearMiss, a, b);
    setShake(true); setTimeout(() => setShake(false), 500);
    playSfx("fail");
    /* -1 flux si t'aurais dû savoir (near-miss), -0.5 sinon (bzzt aléatoire) */
    bumpFlux(nm ? -1 : -0.5);
    say(nm ? nm.line : randomLine(chapter.failLines), "vexe");
  };

  /* Résolution d'un dépôt : élément `src` lâché sur la cible `key`.
     On combine directement dans la besace (un élément sur un autre,
     kind "item") ou sur un objet du décor (kind "hot"). */
  const handleDrop = (src, key, point) => {
    const [kind, val] = key.split(":");
    if ((kind === "item" || kind === "hot") && val !== src) combinePair(src, val, point);
  };

  /* Bouton 💡 : propose le prochain indice utile */
  const hint = () => {
    const h = chapter.hints.find((h) => h.needs.every((n) => inv.includes(n)) && !made.includes(h.out) && !msgs.includes(h.out));
    if (h) { say(`💡 Indice : ${h.text}`); return; }
    const missing = Object.keys(chapter.where).find((id) => !inv.includes(id) && !isHidden(id) && isUseful(id, made));
    if (missing) say(`💡 Indice : il reste des choses à découvrir ${chapter.where[missing]}. Observe bien le décor… (le bouton 👁 peut aider)`);
    else say("💡 Tu as tout trouvé. Il ne reste plus qu'à combiner — glisse un élément sur un autre, ou sur le décor.");
  };

  const restart = () => {
    setChapterIndex(0);
    setInv([]); setMsgs([]); setMade([]); setFlags({}); setCollection([]); setQuete(0);
    setTab(CHAPTERS[0].startScene); setScreen("title");
  };

  /* Exporter : télécharge la progression dans un petit fichier .json
     (pour la reprendre sur un autre poste du CDI). */
  const doExport = () => {
    const text = exportSaveString();
    if (!text) { say("Rien à exporter pour l'instant — commence une partie d'abord."); return; }
    const blob = new Blob([text], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "martine-sauvegarde.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  /* Importer : lit le fichier .json choisi par l'élève et reprend
     la partie qu'il contient. */
  const doImport = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (importSaveString(String(reader.result))) {
        setModal(null);
        resume();
      } else {
        /* message affiché DANS le menu réglages (visible par-dessus) */
        setModal({ type: "settings", error: "Ce fichier n'est pas une sauvegarde MARTINE valide. Vérifie que c'est bien le bon fichier .json." });
      }
    };
    reader.readAsText(file);
  };

  /* Les objets HÉRITAGE (heirloom) du chapitre courant DOIVENT être en
     besace avant de partir SI le chapitre suivant les attend (ex. la
     disquette de ch8 pour ch9). On ne bloque PAS quand l'heirloom est
     consommé dans le chapitre lui-même (ex. la pile de Volta brûlée au
     télégraphe Morse, absente de ch8). */
  const nextItems = CHAPTERS[chapterIndex + 1]?.items || {};
  const heritagesManquants = Object.entries(chapter.items)
    .filter(([id, it]) => it.heirloom && nextItems[id] && !inv.includes(id))
    .map(([, it]) => it.name);
  const canJump = msgs.length >= chapter.required && heritagesManquants.length === 0;
  const jumpBloque = msgs.length >= chapter.required && heritagesManquants.length > 0
    ? `Fabrique d'abord : ${heritagesManquants.join(", ")}` : null;
  const isLastChapter = chapterIndex >= CHAPTERS.length - 1;
  /* Saut temporel : écran de transition vers le chapitre suivant s'il
     existe. Après le DERNIER chapitre, place à l'ÉPILOGUE : MARTINE pose
     sa question (« ton message pour +20 000 ans »), puis on enchaîne sur
     l'écran de bilan. */
  const jump = () => {
    if (!canJump) return;
    playSfx("jump");
    /* Avant le saut : le joueur choisit UN support SOS parmi les inventions
       du chapitre. Le choix octroie des points de flux temporel selon la
       durabilité du support. Ensuite l'animation Morse joue, puis le saut. */
    setSosChooserOpen(true);
  };

  /* petit style commun des boutons du bandeau */
  const headBtn = { background: "#141b26", border: "1px solid #2a3648", color: "#c8d4e2", borderRadius: 10, padding: "7px 11px", cursor: "pointer", fontSize: 13 };

  /* Panneau du MODE TRICHE — visible seulement après avoir tapé
     « triche ». Réutilisé dans tous les écrans. */
  const cheatBtn = { background: "#2a1638", border: "1px solid #7a3ca8", color: "#e8d4ff", borderRadius: 7, padding: "6px 8px", cursor: "pointer", fontSize: 11, textAlign: "left", width: "100%", fontFamily: "ui-monospace,monospace" };
  const cheatPanel = cheat && (
    <div style={{ position: "fixed", left: 8, bottom: 8, zIndex: 300, width: 208, background: "rgba(18,8,28,0.96)", border: "1px solid #a04ce8", borderRadius: 10, padding: 10, boxShadow: "0 6px 24px rgba(0,0,0,0.6)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 1, color: "#c88aff", fontWeight: 700 }}>🎛️ TRICHE</span>
        <button onClick={() => setCheat(false)} style={{ background: "none", border: "none", color: "#8a7a9a", cursor: "pointer", fontSize: 14 }}>✕</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <button style={cheatBtn} onClick={cheatGiveAll}>🎒 Tout ramasser (ce chapitre)</button>
        <button style={cheatBtn} onClick={cheatUnlockAll}>🔓 Débloquer tous les chapitres</button>
        <button style={cheatBtn} onClick={cheatFillFrise}>◆ Remplir la frise (toutes époques)</button>
      </div>
      <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 10, color: "#8a7a9a", margin: "8px 0 4px" }}>Aller au chapitre :</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {CHAPTERS.map((ch, i) => (
          <button key={ch.id} onClick={() => playChapter(i)} title={ch.epoque}
            style={{ ...cheatBtn, width: 30, textAlign: "center", padding: "6px 0" }}>{i + 1}</button>
        ))}
      </div>
      <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 9.5, color: "#6a5a7a", marginTop: 8 }}>tape « triche » pour fermer</div>
    </div>
  );

  /* Un interrupteur on/off réutilisable (avec case à cocher accessible). */
  const Toggle = ({ on, onToggle, label, hint }) => (
    <label style={{ display: "flex", alignItems: "flex-start", gap: 10, background: on ? "#14251c" : "#141b26", border: `1px solid ${on ? "#2a5a3a" : "#2a3648"}`, borderRadius: 10, padding: "10px 12px", cursor: "pointer" }}>
      <input type="checkbox" checked={on} onChange={onToggle} style={{ width: 20, height: 20, accentColor: "#5eff9e", marginTop: 1, flex: "0 0 auto", cursor: "pointer" }} />
      <span>
        <span style={{ fontWeight: 700, color: "#e8eef5", fontSize: 14 }}>{label}</span>
        <span style={{ display: "block", fontSize: 12, color: "#a8b6c8", marginTop: 2, lineHeight: 1.4 }}>{hint}</span>
      </span>
    </label>
  );

  /* Menu Réglages : confort de lecture + exporter / importer la sauvegarde.
     Réutilisé depuis l'écran titre et depuis le jeu (bouton ⚙). */
  const SettingsModal = () => (
    <div style={overlay} onClick={() => setModal(null)}>
      <div style={{ ...card, maxHeight: "88vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginTop: 0, color: "#5eff9e", fontFamily: "ui-monospace,monospace", letterSpacing: 2, fontSize: 16 }}>⚙ RÉGLAGES</h2>

        {/* ---- Confort de lecture (accessibilité) ---- */}
        <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 10.5, letterSpacing: 2, color: "#7a879e", margin: "2px 0 8px" }}>👁 CONFORT DE LECTURE</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <Toggle on={a11y.gros} onToggle={() => setA11y((s) => ({ ...s, gros: !s.gros }))}
            label="Texte plus grand" hint="Pour le vidéoprojecteur et le fond de la classe." />
          <Toggle on={a11y.dys} onToggle={() => setA11y((s) => ({ ...s, dys: !s.dys }))}
            label="Lecture facilitée (dys)" hint="Police plus simple et lettres plus espacées." />
          <Toggle on={a11y.calme} onToggle={() => setA11y((s) => ({ ...s, calme: !s.calme }))}
            label="Animations calmes" hint="Réduit les mouvements et les scintillements." />
          <button onClick={toggleFullscreen} style={{ background: "#141b26", color: "#c8d4e2", border: "1px solid #2a3648", borderRadius: 10, padding: "11px 12px", fontWeight: 700, cursor: "pointer", fontSize: 14, textAlign: "left" }}>
            {isFull ? "⛶ Quitter le plein écran" : "⛶ Plein écran (mode classe)"}
          </button>
        </div>

        <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 10.5, letterSpacing: 2, color: "#7a879e", margin: "16px 0 8px" }}>💾 SAUVEGARDE</div>
        <p style={{ fontSize: 13.5, color: "#c8d4e2", lineHeight: 1.6, marginTop: 4 }}>
          Ta partie est enregistrée sur cet ordinateur. Pour la continuer sur un
          autre poste (au CDI, à la maison), <strong>exporte</strong> ton fichier ici,
          puis <strong>importe</strong>-le là-bas.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
          <button onClick={doExport} style={{ background: "#1a2536", color: "#5eff9e", border: "1px solid #2a4a38", borderRadius: 10, padding: "12px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
            ⬇ Exporter ma partie (fichier .json)
          </button>
          <label style={{ background: "#1a2536", color: "#ffd166", border: "1px solid #4a4228", borderRadius: 10, padding: "12px", fontWeight: 700, cursor: "pointer", fontSize: 14, textAlign: "center" }}>
            ⬆ Importer une partie…
            <input type="file" accept="application/json,.json" style={{ display: "none" }}
              onChange={(e) => doImport(e.target.files?.[0])} />
          </label>
        </div>
        {modal?.error && (
          <p style={{ fontSize: 12.5, color: "#ff9b8a", marginTop: 10, lineHeight: 1.5 }}>⚠ {modal.error}</p>
        )}
        <button onClick={() => setModal(null)} style={{ marginTop: 14, width: "100%", background: "transparent", color: "#8fa3bd", border: "1px solid #2a3648", borderRadius: 10, padding: "10px", fontWeight: 700, cursor: "pointer" }}>
          Fermer
        </button>
      </div>
    </div>
  );

  /* ---------- écran titre ---------- */
  if (screen === "title") {
    const saved = loadSave();
    const saveExists = saved !== null;
    /* chapitres débloqués : le plus haut atteint, lu aussi dans la
       sauvegarde (car `maxReached` repart à 0 tant qu'on n'a pas repris) */
    const menuMax = Math.max(maxReached, saved?.maxReached ?? saved?.chapterIndex ?? 0);
    return (
      <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 50% 30%, #14233a 0%, #080d16 70%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "Palatino, Georgia, serif" }}>
        {cheatPanel}
        <div style={{ maxWidth: 560, textAlign: "center" }}>
          {/* bannière illustrée : LES FILS DU TEMPS qui se croisent et se
              relient d'une époque à l'autre — le fil rouge du jeu, littéral. */}
          <svg viewBox="0 0 520 72" style={{ width: "100%", maxWidth: 460, height: "auto", display: "block", margin: "0 auto -4px" }} aria-hidden="true">
            {["#d69a4e", "#c8483a", "#5ab0a0", "#ffd166", "#7fb0e0"].map((c, i) => (
              <path key={i}
                d={`M12 ${22 + i * 6} C 150 ${8 + i * 8}, 150 ${52 + i * 4}, 268 ${34 + i * 4} S 400 ${14 + i * 7}, 508 ${30 + i * 5}`}
                fill="none" stroke={c} strokeWidth="2.3" strokeLinecap="round" opacity="0.85" />
            ))}
            {/* les « nœuds » du temps : de petites perles-époques sur les fils */}
            {[[60, 26, "#d69a4e"], [160, 40, "#c8483a"], [268, 34, "#ffd166"], [372, 24, "#5ab0a0"], [470, 34, "#7fb0e0"]].map(([x, y, c], i) => (
              <circle key={i} cx={x} cy={y} r="3.4" fill={c} style={{ animation: `pulse ${2 + i * 0.5}s ease-in-out infinite` }} />
            ))}
          </svg>
          <h1 style={{ fontFamily: TITRE_FONT, fontSize: "clamp(38px,9.5vw,72px)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", margin: "4px 0 0", lineHeight: 1.08, background: "linear-gradient(100deg, #e8a24a 0%, #ffd166 40%, #e86a4a 80%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", textShadow: "0 2px 22px rgba(232,150,74,0.3)" }}>
            Les fils du temps
          </h1>
          {/* MARTINE, désormais la compagne de voyage */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, marginTop: 10 }}>
            <div style={{ animation: "floaty 4s ease-in-out infinite" }}>
              <Avatar mood="content" size={46} date={chapter.date} />
            </div>
            <span style={{ color: "#d8e2ee", fontSize: 16, fontStyle: "italic" }}>avec <strong style={{ fontStyle: "normal", color: "#5eff9e", fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>MARTINE</strong></span>
          </div>
          <p style={{ color: "#8fa3bd", fontSize: 11.5, letterSpacing: 1, marginTop: 4, fontFamily: "ui-monospace,monospace" }}>
            {chapter.sousTitre}
          </p>
          <p style={{ color: "#d8e2ee", fontSize: 16.5, lineHeight: 1.6, marginTop: 22 }}>
            <strong>{chapter.presentationTitre}</strong> {chapter.presentation}
          </p>
          <p style={{ color: "#8fa3bd", fontSize: 13.5, marginTop: 10 }}>
            {chapter.accroche}
          </p>
          <div style={{ marginTop: 26, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            {saveExists ? (
              <>
                <button onClick={resume}
                  style={{ background: "#5eff9e", color: "#06110b", border: "none", borderRadius: 12, padding: "14px 34px", fontSize: 16, fontWeight: 800, cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: 2, boxShadow: "0 0 24px rgba(94,255,158,0.4)" }}>
                  ▶ REPRENDRE
                </button>
                <button onClick={() => setModal({ type: "confirmNew" })}
                  style={{ background: "transparent", color: "#8fa3bd", border: "1px solid #2a3648", borderRadius: 12, padding: "9px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "ui-monospace,monospace" }}>
                  ↺ Nouvelle partie
                </button>
              </>
            ) : (
              <button onClick={newGame}
                style={{ background: "#5eff9e", color: "#06110b", border: "none", borderRadius: 12, padding: "14px 34px", fontSize: 16, fontWeight: 800, cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: 2, boxShadow: "0 0 24px rgba(94,255,158,0.4)" }}>
                ▶ DÉMARRER
              </button>
            )}
            <div style={{ display: "flex", gap: 20, marginTop: 4 }}>
              <button onClick={() => setModal({ type: "settings" })}
                style={{ background: "transparent", color: "#5a6678", border: "none", cursor: "pointer", fontSize: 12, fontFamily: "ui-monospace,monospace" }}>
                ⚙ Réglages · sauvegarde
              </button>
              <button onClick={() => setShowMediadex(true)}
                style={{ background: "transparent", color: "#c8963e", border: "none", cursor: "pointer", fontSize: 12, fontFamily: "ui-monospace,monospace" }}>
                🃏 Mediadex
              </button>
            </div>
          </div>

          {/* SÉLECTION DE CHAPITRE : terminés/en cours jouables,
              futurs verrouillés (cadenas + date en teasing) */}
          <div style={{ marginTop: 28, borderTop: "1px solid #1e2a3a", paddingTop: 16 }}>
            <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 10.5, letterSpacing: 2, color: "#7a879e", marginBottom: 10 }}>
              ⏳ LE VOYAGE
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {CHAPTERS.map((ch, i) => {
                const unlocked = i <= menuMax;
                return (
                  <button key={ch.id} disabled={!unlocked}
                    onClick={() => unlocked && playChapter(i)}
                    title={unlocked ? `Jouer : ${ch.epoque}` : `Verrouillé — atteins d'abord le saut précédent`}
                    style={{
                      display: "flex", alignItems: "center", gap: 10, textAlign: "left",
                      background: unlocked ? "#101a28" : "#0b1017",
                      border: `1px solid ${unlocked ? "#2a3f52" : "#1a222e"}`,
                      borderRadius: 10, padding: "10px 14px",
                      cursor: unlocked ? "pointer" : "not-allowed",
                      color: unlocked ? "#e8eef5" : "#4a5568",
                      fontFamily: "Palatino, Georgia, serif",
                    }}>
                    <span style={{ fontSize: 22, filter: unlocked ? "none" : "grayscale(1) opacity(0.5)" }}>{unlocked ? ch.emoji : "🔒"}</span>
                    <span style={{ flex: 1 }}>
                      <span style={{ fontWeight: 700 }}>Chapitre {i + 1} — {unlocked ? ch.epoque : "?"}</span>
                      <span style={{ display: "block", fontSize: 11, color: unlocked ? "#8fa3bd" : "#3a4656", fontFamily: "ui-monospace,monospace" }}>{ch.date}</span>
                    </span>
                    {unlocked
                      ? <span style={{ fontSize: 12, color: "#5eff9e", fontFamily: "ui-monospace,monospace" }}>▶</span>
                      : <span style={{ fontSize: 11, color: "#3a4656", fontFamily: "ui-monospace,monospace" }}>à venir</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* menu réglages (export / import de la sauvegarde) */}
        {modal?.type === "settings" && <SettingsModal />}

        {/* confirmation avant d'effacer une partie */}
        {modal?.type === "confirmNew" && (
          <div style={overlay} onClick={() => setModal(null)}>
            <div style={card} onClick={(e) => e.stopPropagation()}>
              <h2 style={{ marginTop: 0, color: "#e8934a", fontSize: 20, textAlign: "center" }}>Effacer la partie en cours ?</h2>
              <p style={{ fontSize: 14, color: "#c8d4e2", lineHeight: 1.6 }}>
                Une nouvelle partie remplacera définitivement ta progression sauvegardée.
                Pense à l'<strong>exporter</strong> d'abord si tu veux la garder.
              </p>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button onClick={() => setModal(null)} style={{ flex: 1, background: "#1a2536", color: "#e8eef5", border: "1px solid #2a3648", borderRadius: 10, padding: "12px", fontWeight: 700, cursor: "pointer" }}>Annuler</button>
                <button onClick={() => { clearSave(); setModal(null); newGame(); }} style={{ flex: 1, background: "#e8934a", color: "#111", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: "pointer" }}>Nouvelle partie</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ---------- écran de transition entre deux époques ---------- */
  if (screen === "transition") {
    const target = CHAPTERS[transitionTo];
    return (
      <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 50% 40%, #1a2f4a 0%, #060a12 75%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "Palatino, Georgia, serif", color: "#e8eef5" }}>
        {cheatPanel}
        <div style={{ maxWidth: 520, textAlign: "center" }}>
          <div style={{ fontSize: 96, animation: "spinGrow 1.2s ease-out" }}>🌀</div>
          <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 12, letterSpacing: 4, color: "#5eff9e", marginTop: 10 }}>SAUT TEMPOREL EN COURS</div>
          <h1 style={{ fontFamily: "ui-monospace,monospace", color: "#e8934a", fontSize: "clamp(26px,6vw,40px)", letterSpacing: 2, margin: "10px 0 2px" }}>
            {target.epoque}
          </h1>
          <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 15, color: "#8fa3bd" }}>{target.emoji} Chapitre {transitionTo + 1} · {target.date}</div>
          <p style={{ fontFamily: "ui-monospace,monospace", fontSize: 14, color: "#c8ffdd", lineHeight: 1.6, marginTop: 22, textShadow: "0 0 6px rgba(94,255,158,0.3)" }}>
            « Direction {target.epoque}. Accroche-toi — l'atterrissage, ce n'est toujours pas ma spécialité. »
          </p>
          <button onClick={() => goToChapter(transitionTo)}
            style={{ marginTop: 24, background: "#5eff9e", color: "#06110b", border: "none", borderRadius: 12, padding: "13px 30px", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: 2, boxShadow: "0 0 24px rgba(94,255,158,0.4)" }}>
            ATTERRIR →
          </button>
        </div>
      </div>
    );
  }

  /* ---------- écran ÉPILOGUE : « Ton message pour +20 000 ans » ----------
     Pas de décor, pas de besace : une question, des supports, et une
     réponse argumentée de MARTINE. Il n'y a pas de bonne réponse — le
     but est de lancer le débat en classe. Tout le texte vient de
     src/chapters/epilogue/data.js. */
  if (screen === "epilogue") {
    const choisi = EPILOGUE.SUPPORTS.find((s) => s.id === epiChoice);
    return (
      <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 50% 20%, #1a2f4a 0%, #080d16 70%)", padding: 20, fontFamily: "Palatino, Georgia, serif", color: "#e8eef5" }}>
        {cheatPanel}
        <div style={{ maxWidth: 660, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 14 }}>
            <Avatar mood={choisi ? "content" : "neutre"} size={92} date="+20 000" />
          </div>
          <div style={{ fontFamily: "ui-monospace,monospace", color: "#5eff9e", letterSpacing: 3, fontSize: 11, marginTop: 8 }}>
            ÉPILOGUE
          </div>

          {!choisi ? (
            <>
              {EPILOGUE.QUESTION.map((l, i) => (
                <p key={i} style={{ fontSize: 15.5, lineHeight: 1.65, color: "#c8d4e2", margin: "10px 0" }}>« {l} »</p>
              ))}
              <h1 style={{ fontFamily: "ui-monospace,monospace", color: "#ffd166", fontSize: 24, letterSpacing: 2, marginTop: 20 }}>
                {EPILOGUE.QUESTION_TITRE}
              </h1>
              <p style={{ color: "#8fa3bd", fontSize: 12.5, fontStyle: "italic", marginTop: 2 }}>
                Il n'y a pas de bonne réponse. Choisis, et écoute ce que MARTINE en pense.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 10, marginTop: 20, marginBottom: 40 }}>
                {EPILOGUE.SUPPORTS.map((s) => (
                  <button key={s.id} onClick={() => { playSfx("craft"); setEpiChoice(s.id); }}
                    style={{ background: "#101827", border: "1px solid #2a3648", borderRadius: 12, padding: "14px 10px", cursor: "pointer", color: "#e8eef5", fontFamily: "Palatino, Georgia, serif", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 30 }}>{s.emoji}</span>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</span>
                    <span style={{ fontFamily: "ui-monospace,monospace", fontSize: 10, color: "#8fa3bd" }}>
                      ⏳ durabilité {s.jauges.durabilite}/5
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 52, marginTop: 10 }}>{choisi.emoji}</div>
              <h1 style={{ fontFamily: "ui-monospace,monospace", color: "#ffd166", fontSize: 22, letterSpacing: 1, margin: "4px 0 0" }}>
                {choisi.name}
              </h1>
              {/* la réponse argumentée de MARTINE */}
              <div style={{ background: "#101827", border: "1px solid #2a3648", borderRadius: 12, padding: "14px 18px", marginTop: 14, textAlign: "left" }}>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "#e8eef5", margin: 0 }}>« {choisi.reponse} » — MARTINE</p>
                <div style={{ marginTop: 12 }}><Gauges values={choisi.jauges} /></div>
              </div>
              {/* la chute : la même quel que soit le choix */}
              <div style={{ background: "#0e1420", border: "1px solid #5a4a20", borderRadius: 12, padding: "14px 18px", marginTop: 12, textAlign: "left" }}>
                <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#ffd166", fontStyle: "italic", margin: 0 }}>« {EPILOGUE.CHUTE} »</p>
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", margin: "20px 0 40px" }}>
                <button onClick={() => setEpiChoice(null)}
                  style={{ background: "transparent", color: "#8fa3bd", border: "1px solid #2a3648", borderRadius: 12, padding: "11px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "ui-monospace,monospace" }}>
                  ← Essayer un autre support
                </button>
                <button onClick={() => setScreen("end")}
                  style={{ background: "#5eff9e", color: "#06110b", border: "none", borderRadius: 12, padding: "12px 26px", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: 1.5, boxShadow: "0 0 24px rgba(94,255,158,0.35)" }}>
                  LE BILAN DU VOYAGE →
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  /* ---------- écran fin ---------- */
  if (screen === "end") {
    return (
      <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 50% 20%, #1a2f4a 0%, #080d16 70%)", padding: 20, fontFamily: "Palatino, Georgia, serif", color: "#e8eef5" }}>
        {cheatPanel}
        <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 58, marginTop: 18 }}>🌀</div>
          <h1 style={{ fontFamily: "ui-monospace,monospace", color: "#5eff9e", letterSpacing: 3, fontSize: 26 }}>{chapter.finTitre}</h1>
          <p style={{ fontSize: 16.5, lineHeight: 1.65, color: "#c8d4e2" }}>
            {chapter.finTexte.replace("{pct}", Math.round((msgs.length / ALL_MSGS.length) * 100))}
          </p>
          <p style={{ fontFamily: "ui-monospace,monospace", color: "#5eff9e", fontSize: 18, marginTop: 14 }}>
            ◆ {msgs.length} / {ALL_MSGS.length} messages découverts
          </p>
          {/* la frise du voyage + la leçon calculée à partir des jauges */}
          <div style={{ textAlign: "left", background: "#0e1420", border: "1px solid #2a3648", borderRadius: 12, padding: "10px 14px" }}>
            <Frise collection={collection} />
            {trendSentence(collection) && (
              <p style={{ fontSize: 13.5, fontStyle: "italic", color: "#ffd166", lineHeight: 1.6, margin: "4px 0 2px" }}>
                📈 « {trendSentence(collection)} » — MARTINE
              </p>
            )}
          </div>

          {/* Le MOT DE LA FIN : seulement au bout du voyage (dernier chapitre),
              après l'épilogue. Puis la question laissée ouverte pour la classe. */}
          {isLastChapter && (
            <>
              <div style={{ background: "#101827", border: "1px solid #2a3648", borderRadius: 12, padding: "14px 18px", marginTop: 14, textAlign: "left" }}>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "#e8eef5", margin: 0 }}>« {EPILOGUE.CONCLUSION} » — MARTINE</p>
              </div>
              <div style={{ border: "2px solid #ffd166", borderRadius: 12, padding: "16px 18px", marginTop: 12 }}>
                <h2 style={{ fontFamily: "ui-monospace,monospace", color: "#ffd166", fontSize: 17, letterSpacing: 1, margin: "0 0 8px" }}>
                  {EPILOGUE.DEBAT_TITRE}
                </h2>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: "#c8d4e2", fontStyle: "italic", margin: 0 }}>« {EPILOGUE.DEBAT} »</p>
              </div>
            </>
          )}

          <div style={{ textAlign: "left", marginTop: 18 }}>
            {ALL_MSGS.map((id) =>
              msgs.includes(id) ? (
                <div key={id} style={{ background: "#101827", border: "1px solid #2a3648", borderRadius: 12, padding: "10px 14px", marginBottom: 8 }}>
                  <strong>{chapter.messages[id].emoji} {chapter.messages[id].title}</strong>
                  <p style={{ fontSize: 13, color: "#b8c4d4", margin: "4px 0 0", lineHeight: 1.5 }}>{chapter.messages[id].fact}</p>
                </div>
              ) : (
                <div key={id} style={{ background: "#0d1320", border: "1px dashed #2a3648", borderRadius: 12, padding: "10px 14px", marginBottom: 8, color: "#7a879e" }}>
                  ❓ Message non découvert — rejoue pour le trouver !
                </div>
              )
            )}
          </div>
          <button onClick={restart}
            style={{ margin: "18px 0 40px", background: "transparent", color: "#5eff9e", border: "2px solid #5eff9e", borderRadius: 12, padding: "12px 26px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "ui-monospace,monospace" }}>
            ↺ REJOUER LE CHAPITRE
          </button>
        </div>
      </div>
    );
  }

  /* ---------- écran de jeu : une seule vue, sans défilement ---------- */
  /* `made` (tout ce qui a été fabriqué) et `inv` sont transmis aux décors
     pour qu'ils puissent RÉAGIR : faire apparaître une invention une fois
     assemblée, réagir à un objet ramassé, etc. Un décor qui n'en a pas
     besoin les ignore simplement (rétro-compatible). */
  /* `queteQui` : le personnage de l'étape en cours — les décors y posent
     le « ? » doré (null quand la quête est finie ou absente). */
  const sceneProps = { collect, action, reveal, flags, made, inv, queteQui: chapter.quete?.[quete]?.perso ?? null };

  /* ---- le carnet imprimable : découvertes regroupées par époque ----
     Les jauges sont dessinées en ■/□ : ça reste lisible en noir et blanc,
     même sur une photocopie de photocopie. */
  const epoques = [];
  collection.forEach((c) => {
    const derniere = epoques[epoques.length - 1];
    if (derniere && derniere.date === c.date) derniere.items.push(c);
    else epoques.push({ date: c.date, items: [c] });
  });
  const printBar = (n) => "■".repeat(n) + "□".repeat(Math.max(0, 5 - n));

  /* Le « plus » d'une fiche : une reproduction dessinée (si elle existe pour
     ce message) et un lien « En savoir plus » vers Wikipédia (champ `wiki`
     du message). Les deux sont facultatifs : une fiche sans rien de tout ça
     s'affiche exactement comme avant. */
  const FicheExtras = ({ id }) => {
    const m = chapter.messages[id];
    const Illo = ILLUSTRATIONS[id];
    if (!Illo && !m.wiki) return null;
    return (
      <>
        {Illo && (
          <div style={{ marginTop: 12, background: "#14100a", border: "1px solid #3a3020", borderRadius: 10, padding: "10px 10px 6px" }}>
            <Illo />
            <div style={{ fontSize: 10.5, color: "#8a97ad", fontStyle: "italic", textAlign: "center", marginTop: 4, fontFamily: "ui-monospace,monospace" }}>reproduction dessinée</div>
          </div>
        )}
        {m.wiki && (
          <a href={m.wiki} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-block", marginTop: 10, fontSize: 13, color: "#7fd8ff", fontWeight: 700, textDecoration: "none" }}>
            🔗 En savoir plus sur Wikipédia →
          </a>
        )}
      </>
    );
  };

  return (
    <DragProvider items={chapter.items} onDrop={handleDrop}>
    <div style={{ height: "100dvh", display: "flex", flexDirection: "column", overflow: "hidden", background: "#080d16", fontFamily: "Palatino, Georgia, serif", color: "#e8eef5" }}>
      {cheatPanel}

      {/* la signature du jeu, CENTRÉE — avec le chapitre · date sur la même
          ligne (à gauche). Présente sur chaque tableau. */}
      <div style={{ position: "relative", textAlign: "center", padding: "6px 12px 0", minHeight: 20 }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontFamily: "ui-monospace,monospace", fontSize: 10, letterSpacing: 2, color: "#e8934a", whiteSpace: "nowrap" }}>{chapter.bandeau}</span>
        <span style={{ fontFamily: TITRE_FONT, fontSize: 19, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", background: "linear-gradient(100deg, #e8a24a, #ffd166 45%, #e86a4a)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
          Les fils du temps
        </span>
        {/* la date de destination, sous le titre, en vert MARTINE (afficheur de bord) */}
        <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 12.5, fontWeight: 700, letterSpacing: 3, color: "#5eff9e", textShadow: "0 0 10px rgba(94,255,158,0.45)", marginTop: 1 }}>
          {chapter.date}
        </div>
      </div>

      {/* le lieu · compteur · boutons · saut temporel */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "2px 12px 6px", flexWrap: "wrap" }}>
        <span style={{ fontSize: 17, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0 }}>{chapter.emoji} {chapter.scenes[tab].name}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ fontFamily: "ui-monospace,monospace", fontSize: 13, color: "#5eff9e" }} title="Messages transmis au futur">◆ {msgs.length}/{ALL_MSGS.length}</span>
          <span style={{ position: "relative", fontFamily: "ui-monospace,monospace", fontSize: 13, color: "#ffd166" }} title="Flux temporel — nécessaire pour rentrer chez toi">
            ⚡ {flux}
            {fluxBubble && (
              <span style={{ position: "absolute", left: "50%", top: -18, transform: "translateX(-50%)",
                fontSize: 13, fontWeight: 800, letterSpacing: 1,
                color: fluxBubble.delta > 0 ? "#5eff9e" : "#ff7a5a",
                animation: "fluxRise 1.3s ease-out forwards",
                pointerEvents: "none", whiteSpace: "nowrap" }}>
                {fluxBubble.delta > 0 ? "+" : ""}{fluxBubble.delta}
              </span>
            )}
          </span>
          <button onClick={toggleMute} title={muted ? "Réactiver le son" : "Couper le son"} style={{ ...headBtn, color: muted ? "#5a6678" : "#c8d4e2" }}>{muted ? "🔇" : "🔊"}</button>
          <button onClick={hint} style={{ ...headBtn, color: "#ffd166" }}>💡</button>
          <button onClick={doReveal} title="Révéler brièvement les zones" style={headBtn}>👁</button>
          {/* Bouton 🗺 retiré : chaque tableau porte déjà son propre décor situé.
              Les cartes chapitre restent codées côté data.js et pourront être
              réactivées si besoin — décommenter la ligne suivante. */}
          {/* {chapter.carte && <button onClick={() => setModal({ type: "carte" })} title="Où sommes-nous ? (carte)" style={headBtn}>🗺</button>} */}
          <button onClick={() => setModal({ type: "journal" })} style={headBtn}>📔</button>
          <button onClick={() => setShowMediadex(true)} title={`Mediadex (${mediadex.length} cartes)`} style={headBtn}>🃏</button>
          <button onClick={() => setModal({ type: "settings" })} title="Réglages · sauvegarde" style={headBtn}>⚙</button>
          {/* sur écran large, le saut est dans la jauge temporelle à droite ;
              sur écran étroit, on garde le bouton compact ici. */}
          {!large && (
            <button onClick={jump} disabled={!canJump}
              title={canJump ? `Saut vers ${chapter.destination}` : (jumpBloque || `${chapter.required} messages requis pour le saut`)}
              style={{ background: canJump ? "#e8934a" : "#1a2230", color: canJump ? "#111" : "#4a5568", border: "none", borderRadius: 10, padding: "7px 12px", fontSize: 13, fontWeight: 800, cursor: canJump ? "pointer" : "not-allowed", fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              🌀 {canJump ? `SAUT → ${chapter.destination}` : `${msgs.length}/${chapter.required}`}
            </button>
          )}
        </div>
      </div>

      {/* Le décor occupe toute la place restante. Sur écran large, il partage
          cette rangée avec la besace, en colonne à gauche (voir `large`). */}
      <div style={{ flex: 1, minHeight: 0, padding: "0 12px", display: "flex", justifyContent: "center", gap: 8 }}>
        {/* écran large : la besace en colonne à gauche du décor */}
        {large && (
          <div style={{ width: 104, flex: "0 0 auto", display: "flex", flexDirection: "column", minHeight: 0 }}>
            <InventoryBar items={chapter.items} inv={inv} shake={shake} vertical />
            {/* mini-carte dockée sous la besace (si le chapitre a une carte) */}
            {chapter.carte && <MiniMap Carte={chapter.carte} tab={tab} label={chapter.scenes[tab].name} onOpen={() => setModal({ type: "carte" })} />}
          </div>
        )}
        <div ref={decorCellRef} style={{ flex: 1, minWidth: 0, display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
          {/* taille exacte calculée (le plus grand cadre 1000/560 qui tient
              dans la cellule) → jamais rogné, jamais de débordement. */}
          <div style={{ width: decorBox ? decorBox.w : "100%", height: decorBox ? decorBox.h : "100%", position: "relative" }}>
            <Scene scenes={chapter.scenes} tab={tab} onTab={setTab} sceneProps={sceneProps} sparkle={sparkle} linear={chapter.linear}
              canAdvance={!!(chapter.linear && !chapter.scenes[tab].free && chapter.scenes[tab + 1] && (chapter.scenes[tab].nextWhen || []).every((id) => made.includes(id)))} />
          </div>
        </div>
        {/* écran large : la jauge temporelle à droite */}
        {large && (
          <JaugeTemporelle transmis={msgs.length} requis={chapter.required} total={ALL_MSGS.length}
            destination={chapter.destination} canJump={canJump} onJump={jump} isLast={isLastChapter} bloque={jumpBloque} />
        )}
      </div>

      {/* console MARTINE + le SIGNAL D'AVANCÉE (mode linéaire) : en l'absence
          de flèches, un repère lumineux clignote près de MARTINE dès que le
          tableau courant est bouclé, et emmène au lieu suivant. */}
      <div style={{ padding: "8px 12px 6px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 980, position: "relative" }}>
          {(() => {
            const next = chapter.scenes[tab + 1];
            const ready = chapter.linear && next && !chapter.scenes[tab].free
              && (chapter.scenes[tab].nextWhen || []).every((id) => made.includes(id));
            if (!ready) return null;
            return (
              <button onClick={() => setTab(tab + 1)} title={`Partir pour ${next.name}`}
                style={{ position: "absolute", left: "50%", top: -18, transform: "translateX(-50%)", zIndex: 6, display: "flex", alignItems: "center", gap: 8, background: "#5eff9e", color: "#06110b", border: "none", borderRadius: 20, padding: "7px 16px", fontFamily: "ui-monospace,monospace", fontWeight: 800, fontSize: 13, letterSpacing: 1, cursor: "pointer", boxShadow: "0 0 20px rgba(94,255,158,0.65)", whiteSpace: "nowrap", animation: "floaty 1.7s ease-in-out infinite" }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#06110b", animation: "pulse 1s infinite" }} />
                ➜ Partir pour {next.name}
              </button>
            );
          })()}
          <Martine lines={dialog.lines} idx={dialog.idx} mood={dialog.mood} date={chapter.date} onNext={() => setDialog((d) => ({ ...d, idx: d.idx + 1 }))} />
        </div>
      </div>

      {/* besace : en bas, seulement sur écran étroit / tablette */}
      {!large && <InventoryBar items={chapter.items} inv={inv} shake={shake} />}

      {/* particules de réussite (au point de la combinaison) */}
      {fx && <Particles key={fx.key} x={fx.x} y={fx.y} big={fx.big} />}

      {/* message perdu : le pictogramme s'envole et se désintègre */}
      {dust && (
        <span key={dust.key} style={{ position: "fixed", left: dust.x, top: dust.y, zIndex: 90, pointerEvents: "none", fontSize: 42, filter: "grayscale(0.5)", animation: "dissolve 1s ease-out forwards" }}>
          {dust.emoji}
        </span>
      )}

      {/* ---------- modales ---------- */}
      {modal?.type === "fact" && (
        <div style={overlay} onClick={() => setModal(null)}>
          <div style={{ ...card, maxHeight: "88vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: "center", fontSize: 46 }}>{chapter.messages[modal.id].emoji}</div>
            <div style={{ textAlign: "center", fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#5eff9e" }}>◆ MESSAGE TRANSMIS AU FUTUR</div>
            <h2 style={{ textAlign: "center", margin: "6px 0 10px", color: "#e8934a", fontSize: 22 }}>{chapter.messages[modal.id].title}</h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "#d8e2ee", margin: 0 }}>{chapter.messages[modal.id].fact}</p>
            {/* les 4 jauges — s'afficheront quand les fiches en auront (jalon M2) */}
            <Gauges values={chapter.messages[modal.id].jauges} />
            <FicheExtras id={modal.id} />
            <button onClick={() => setModal(null)} style={{ marginTop: 16, width: "100%", background: "#e8934a", color: "#111", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: "pointer", fontSize: 15 }}>
              Continuer
            </button>
          </div>
        </div>
      )}

      {/* carte d'un message PERDU : ton gris, pas de « transmis au futur » */}
      {modal?.type === "lost" && (
        <div style={overlay} onClick={() => setModal(null)}>
          <div style={{ ...card, borderColor: "#5a667866", maxHeight: "88vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: "center", fontSize: 46, filter: "grayscale(0.7)", opacity: 0.75 }}>{chapter.messages[modal.id].emoji}</div>
            <div style={{ textAlign: "center", fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#8fa3bd" }}>💨 MESSAGE PERDU EN ROUTE</div>
            <h2 style={{ textAlign: "center", margin: "6px 0 10px", color: "#8fa3bd", fontSize: 22 }}>{chapter.messages[modal.id].title}</h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "#c8d4e2", margin: 0 }}>{chapter.messages[modal.id].fact}</p>
            <Gauges values={chapter.messages[modal.id].jauges} />
            <FicheExtras id={modal.id} />
            <div style={{ fontSize: 12, color: "#7a879e", fontStyle: "italic", marginTop: 10 }}>
              Ce fragment rejoint ta frise, mais ne recharge pas MARTINE : un message perdu ne parvient pas au futur.
            </div>
            <button onClick={() => setModal(null)} style={{ marginTop: 14, width: "100%", background: "#5a6678", color: "#0e1420", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: "pointer", fontSize: 15 }}>
              Continuer
            </button>
          </div>
        </div>
      )}

      {/* ---- PHYLACTÈRE : les paroles d'un personnage, à côté de lui ----
          Ancré au point renvoyé par la zone cliquable. Se place au-dessus du
          personnage (ou en dessous s'il est trop haut), et se recadre pour ne
          pas sortir de l'écran. Un clic dessus le referme. */}
      {/* LE GROS PLAN de la quête : quand l'étape en cours porte
          `portrait`, le personnage s'avance devant l'écran pour parler
          (ex. Ana qui accueille le joueur). Le bouton fait avancer la
          quête ; s'il y a un `say`, MARTINE enchaîne. */}
      {screen === "play" && portraitOpen && (() => {
        const st = chapter.quete?.[quete];
        const Portrait = st?.portrait && chapter.portraits?.[st.portrait];
        if (!Portrait) return null;
        const nom = st.nom ?? st.perso.charAt(0).toUpperCase() + st.perso.slice(1);
        return (
          <div style={{ position: "fixed", inset: 0, zIndex: 65, background: "rgba(4,8,14,0.8)", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 20, maxWidth: 860, animation: "fadein .5s ease-out" }}>
              <div style={{ width: "min(44vh, 300px)", flex: "0 0 auto" }}><Portrait /></div>
              <div style={{ flex: "1 1 300px", maxWidth: 400 }}>
                <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 12, letterSpacing: 2, color: "#ffd166", marginBottom: 8 }}>✦ {nom.toUpperCase()}</div>
                <div style={{ background: "#f4e8cc", color: "#2a1c10", border: "1px solid #cbb489", borderRadius: 16, padding: "16px 18px", fontFamily: "Palatino, Georgia, serif", fontSize: 16.5, lineHeight: 1.6, boxShadow: "0 12px 40px rgba(0,0,0,0.5)" }}>
                  {st.bubble}
                </div>
                {/* fermer = avancer si l'étape n'a pas de tâche à accomplir ;
                    sinon on referme simplement, et MARTINE donne son indice */}
                <button onClick={() => { setPortraitOpen(false); if (!st.attend) { setQuete((q) => q + 1); if (st.grant) grantFlag(st.grant); if (st.suite) setTimeout(() => say(`➜ ${st.suite}`), 1400); } if (st.say) say(st.say, st.mood); }}
                  style={{ marginTop: 14, width: "100%", background: "#e8934a", color: "#1a0e02", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: "pointer", fontSize: 15, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
                  Continuer
                </button>
              </div>
            </div>
          </div>
        );
      })()}
      {bubble && (() => {
        const W = Math.min(300, window.innerWidth - 24);
        const dessous = bubble.y < 240;               // perso trop haut → bulle en dessous
        const cx = Math.min(Math.max(bubble.x, 12 + W / 2), window.innerWidth - 12 - W / 2);
        return (
          <div onClick={() => setBubble(null)}
            style={{
              position: "fixed", zIndex: 60, left: cx, width: W, transform: "translateX(-50%)",
              ...(dessous ? { top: bubble.y + 18 } : { bottom: window.innerHeight - bubble.y + 16 }),
              background: "#f4e8cc", color: "#2a1c10", border: "1px solid #cbb489", borderRadius: 14,
              padding: "11px 14px", fontFamily: "Palatino, Georgia, serif", fontSize: 14.5, lineHeight: 1.5,
              boxShadow: "0 8px 26px rgba(0,0,0,0.5)", cursor: "pointer", animation: "fadein .18s ease-out",
            }}>
            {bubble.text}
            <div style={{ fontSize: 10, color: "#8a7250", fontStyle: "italic", marginTop: 5, textAlign: "right" }}>clique n'importe où pour fermer</div>
            {/* la petite pointe du phylactère, vers le personnage */}
            <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", width: 0, height: 0,
              borderLeft: "10px solid transparent", borderRight: "10px solid transparent",
              ...(dessous ? { top: -11, borderBottom: "12px solid #f4e8cc" } : { bottom: -11, borderTop: "12px solid #f4e8cc" }) }} />
          </div>
        );
      })()}

      {modal?.type === "settings" && <SettingsModal />}

      {modal?.type === "alphabet" && (
        <AlphabetGame onClose={() => setModal(null)} onWin={() => grantItem("signes")} />
      )}

      {modal?.type === "tablette" && (
        <TabletteGame onClose={() => setModal(null)} onWin={() => grantMessage("msg_cuneiforme")} />
      )}

      {modal?.type === "cartouche" && (
        <CartoucheGame onClose={() => setModal(null)} onWin={() => grantMessage("msg_hieroglyphes")} />
      )}

      {modal?.type === "facture" && (
        <FactureGame facture={chapter.facture} onClose={() => setModal(null)}
          onWin={() => { grantFlag("paye"); grantItem("traite_galien"); }} />
      )}

      {modal?.type === "chappe" && (
        <ChappeGame onClose={() => setModal(null)} onWin={() => grantItem("signal_code")} />
      )}

      {modal?.type === "morse" && (
        <MorseGame onClose={() => setModal(null)} onWin={() => grantMessage("msg_telegraphe")} />
      )}

      {modal?.type === "tsf" && (
        <TsfGame onClose={() => setModal(null)} onWin={() => grantMessage("msg_sos")} />
      )}

      {modal?.type === "photo" && (
        <PhotoGame onClose={() => setModal(null)} onWin={() => grantMessage("msg_daguerreotype")} />
      )}

      {modal?.type === "phono" && (
        <PhonoGame onClose={() => setModal(null)} onWin={() => grantMessage("msg_phonographe")} />
      )}

      {modal?.type === "cine" && (
        <CineGame onClose={() => setModal(null)} onWin={() => grantMessage("msg_cinema")} />
      )}

      {modal?.type === "tsf_reglage" && (
        <TsfReglageGame onClose={() => setModal(null)} onWin={() => grantMessage("msg_debarquement")} />
      )}

      {modal?.type === "cassette" && (
        <CassetteGame onClose={() => setModal(null)} onWin={() => grantMessage("msg_cassette")} />
      )}

      {modal?.type === "graver_cd" && (
        <GraverCdGame onClose={() => setModal(null)} onWin={() => grantMessage("msg_cd")} />
      )}

      {modal?.type === "eniac_debug" && (
        <EniacDebugGame onClose={() => setModal(null)} onWin={() => grantMessage("msg_eniac")} />
      )}

      {/* CARTE-INVENTION (façon Pokémon) qui apparaît quand un nouveau message est transmis */}
      {cardShowing && (
        <MediaCard card={cardShowing.card} message={cardShowing.message}
          onClose={() => setCardShowing(null)} />
      )}

      {/* MEDIADEX plein écran (bouton 🃏) */}
      {showMediadex && (
        <Mediadex unlocked={mediadex} onClose={() => setShowMediadex(false)} />
      )}

      {/* ANIMATION SOS Morse ··· −−− ··· jouée après le choix en fin de chapitre */}
      {sosOpen && (
        <SosOverlay muted={muted} onDone={() => {
          setSosOpen(false);
          // le vrai saut temporel se fait après l'animation
          if (isLastChapter) { setEpiChoice(null); setScreen("epilogue"); }
          else { setTransitionTo(chapterIndex + 1); setScreen("transition"); }
        }} />
      )}

      {/* ─── CHOIX du support SOS en fin de chapitre ─── */}
      {sosChooserOpen && (() => {
        const chapMsgs = msgs.filter((id) => chapter.messages?.[id]).map((id) => ({ id, ...chapter.messages[id] }));
        const alreadyChosen = sosSent.find((id) => chapMsgs.some((m) => m.id === id));
        return (
          <div style={{ position: "fixed", inset: 0, background: "rgba(4,8,14,0.88)", zIndex: 85, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, backdropFilter: "blur(4px)" }}>
            <div style={{ maxWidth: 720, width: "100%", maxHeight: "94vh", overflowY: "auto", background: "#17110a", border: "2px solid #c8963e", borderRadius: 16, padding: 24, color: "#efe6d2", fontFamily: "Palatino, Georgia, serif" }}>
              <div style={{ textAlign: "center", fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 3, color: "#e0a848" }}>🆘 CHOIX DU SUPPORT SOS · CHAPITRE {chapterIndex + 1}</div>
              <h2 style={{ textAlign: "center", margin: "8px 0 12px", color: "#ffd166", fontSize: 22 }}>Quel support portera ton SOS ?</h2>
              <p style={{ textAlign: "center", fontSize: 13.5, color: "#c8b090", margin: "0 0 18px" }}>
                Tu ne peux en choisir <strong>qu'un seul</strong> par chapitre. Plus la <strong>durabilité</strong> du support est haute, plus ton signal atteint l'équipe de sauvetage — donc plus de flux temporel gagné.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
                {chapMsgs.map((m) => {
                  const dur = m.jauges?.durabilite ?? 1;
                  return (
                    <button key={m.id}
                      onClick={() => {
                        setSosSent((v) => v.includes(m.id) ? v : [...v, m.id]);
                        bumpFlux(dur);
                        setSosChooserOpen(false);
                        setSosOpen(true); // lance l'animation Morse, qui enchaînera sur le saut
                      }}
                      style={{ background: "#2a1608", border: "2px solid #5a4028", borderRadius: 10, padding: "18px 14px", cursor: "pointer", color: "inherit", fontFamily: "inherit", textAlign: "center", transition: "transform .15s, border-color .15s, box-shadow .15s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#e0a848"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 22px rgba(200,150,62,0.35)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#5a4028"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                      <div style={{ fontSize: 40, marginBottom: 6 }}>{m.emoji}</div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: "#ffd166", lineHeight: 1.3 }}>{m.title}</div>
                    </button>
                  );
                })}
              </div>
              {alreadyChosen && (
                <p style={{ textAlign: "center", marginTop: 14, color: "#e08048", fontSize: 12 }}>⚠ Tu as déjà choisi un support pour ce chapitre. Le nouveau remplacera l'ancien.</p>
              )}
              <div style={{ marginTop: 16, textAlign: "center", fontSize: 11, color: "#7a6a4a", fontStyle: "italic" }}>
                (Un vieux dessin pariétal dure plus longtemps qu'une cassette — c'est ça, la leçon.)
              </div>
            </div>
          </div>
        );
      })()}

      {modal?.type === "carte" && (
        <WorldMap Carte={chapter.carte} tab={tab} titre={chapter.epoque} onClose={() => setModal(null)} />
      )}

      {modal?.type === "journal" && (
        <div style={overlay} onClick={() => setModal(null)}>
          <div style={{ ...card, maxHeight: "80vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginTop: 0, color: "#5eff9e", fontFamily: "ui-monospace,monospace", letterSpacing: 2, fontSize: 16 }}>📔 CARNET DE BORD</h2>
            {collection.length === 0 && <p style={{ color: "#8fa3bd", fontStyle: "italic" }}>Aucune découverte pour l'instant. Explore, combine, transmets !</p>}
            <Frise collection={collection} />
            {/* récapitulatif cumulatif : transmis (cristaux) vs perdus (fragments) */}
            {collection.length > 0 && (
              <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11.5, margin: "2px 0 10px" }}>
                <span style={{ color: "#5eff9e" }}>◆ {collection.filter((c) => !c.perdu).length} transmis</span>
                <span style={{ color: "#5a6678" }}> · </span>
                <span style={{ color: "#8fa3bd" }}>💨 {collection.filter((c) => c.perdu).length} perdu(s) en route</span>
              </div>
            )}
            {/* toutes les découvertes du voyage — lues dans la collection
                (auto-suffisante), donc valables d'un chapitre à l'autre */}
            {collection.filter((c) => !c.perdu).map((c) => (
              <div key={c.id} style={{ background: "#141b26", borderRadius: 10, padding: "10px 12px", marginBottom: 8 }}>
                <strong>{c.emoji} {c.titre} <span style={{ color: "#8fa3bd", fontWeight: 400, fontSize: 11 }}>· {c.date}</span></strong>
                <p style={{ fontSize: 13, color: "#b8c4d4", margin: "4px 0 0", lineHeight: 1.5 }}>{c.fact}</p>
              </div>
            ))}
            {/* les fragments (messages perdus) — grisés */}
            {collection.filter((c) => c.perdu).map((c) => (
              <div key={c.id} style={{ background: "#0f1420", border: "1px dashed #3a4656", borderRadius: 10, padding: "10px 12px", marginBottom: 8 }}>
                <strong style={{ color: "#8fa3bd" }}>💨 {c.titre} <span style={{ fontWeight: 400, fontSize: 11 }}>· {c.date} · perdu en route</span></strong>
                <p style={{ fontSize: 13, color: "#8a96a6", margin: "4px 0 0", lineHeight: 1.5 }}>{c.fact}</p>
              </div>
            ))}
            <div style={{ fontSize: 12, color: "#7a879e", margin: "8px 0" }}>
              {ALL_MSGS.length - msgs.length} message(s) encore à transmettre dans ce chapitre.
            </div>

            {/* ---- la sortie papier : trace écrite de la séance ---- */}
            <div style={{ borderTop: "1px solid #2a3648", paddingTop: 12, marginTop: 4 }}>
              <label style={{ fontSize: 12, color: "#8fa3bd", display: "block", marginBottom: 6 }}>
                Ton prénom (il s'imprimera sur le carnet) :
              </label>
              <input value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder="Prénom"
                style={{ width: "100%", background: "#141b26", border: "1px solid #2a3648", borderRadius: 8, padding: "9px 10px", color: "#e8eef5", fontSize: 14, fontFamily: "inherit", marginBottom: 8 }} />
              <button onClick={() => window.print()} disabled={collection.length === 0}
                style={{ width: "100%", background: collection.length ? "#e8934a" : "#2a2a2a", color: collection.length ? "#1a0e02" : "#5a6678", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: collection.length ? "pointer" : "default", fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
                🖨 VERSION IMPRIMABLE
              </button>
            </div>

            <button onClick={() => setModal(null)} style={{ width: "100%", background: "#1a2536", color: "#e8eef5", border: "1px solid #2a3648", borderRadius: 10, padding: "12px", fontWeight: 700, cursor: "pointer", marginTop: 8 }}>
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* ============================================================
          LE CARNET IMPRIMABLE — invisible à l'écran (voir global.css) :
          à l'impression, c'est la SEULE chose qui sort. C'est la trace
          écrite que l'élève garde à la fin de la séance.
          ============================================================ */}
      <div className="carnet-print">
        <div style={{ borderBottom: "2px solid #000", paddingBottom: 8, marginBottom: 14 }}>
          <h1 style={{ fontSize: 22, margin: 0, letterSpacing: 2 }}>MARTINE — Carnet de bord</h1>
          <p style={{ fontSize: 10, margin: "3px 0 0", fontStyle: "italic" }}>
            Machine À Remonter le Temps Intelligente Néanmoins Excellente — 20 000 ans de messages
          </p>
          <p style={{ fontSize: 13, margin: "12px 0 0" }}>
            Prénom : <span style={{ borderBottom: "1px solid #000", display: "inline-block", minWidth: 240, fontWeight: 700 }}>{prenom || " "}</span>
          </p>
        </div>

        <p style={{ fontSize: 12, margin: "0 0 14px" }}>
          <strong>{collection.filter((c) => !c.perdu).length}</strong> message(s) transmis au futur
          {"  ·  "}
          <strong>{collection.filter((c) => c.perdu).length}</strong> message(s) perdu(s) en route
        </p>

        {epoques.map((ep) => (
          <div key={ep.date} className="cp-epoque" style={{ marginBottom: 14 }}>
            <h2 style={{ fontSize: 13, letterSpacing: 1, margin: "0 0 6px", borderBottom: "1px solid #000", paddingBottom: 2 }}>
              {ep.date}
            </h2>
            {ep.items.map((c) => (
              <div key={c.id} className="cp-fiche" style={{ marginBottom: 9, paddingLeft: 4 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700 }}>
                  {c.perdu ? "✗ " : "◆ "}{c.titre}
                  {c.perdu && <span style={{ fontWeight: 400, fontStyle: "italic" }}> — perdu en route</span>}
                </div>
                {/* les 4 jauges, en noir et blanc */}
                <div style={{ fontSize: 9.5, fontFamily: "ui-monospace, monospace", margin: "2px 0" }}>
                  Vitesse {printBar(c.jauges.vitesse)} &nbsp; Portée {printBar(c.jauges.portee)} &nbsp;
                  Capacité {printBar(c.jauges.capacite)} &nbsp; Durabilité {printBar(c.jauges.durabilite)}
                </div>
                <p style={{ fontSize: 10.5, lineHeight: 1.45, margin: 0, textAlign: "justify" }}>{c.fact}</p>
              </div>
            ))}
          </div>
        ))}

        {/* la question de l'épilogue + de la place pour répondre à la main */}
        <div className="cp-epoque" style={{ borderTop: "2px solid #000", marginTop: 8, paddingTop: 10 }}>
          <p style={{ fontSize: 10.5, lineHeight: 1.5, margin: "0 0 10px", fontStyle: "italic", textAlign: "justify" }}>
            « {EPILOGUE.CONCLUSION} » — MARTINE
          </p>
          <h2 style={{ fontSize: 13, margin: "0 0 6px" }}>{EPILOGUE.DEBAT_TITRE}</h2>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ borderBottom: "1px solid #888", height: 19 }} />
          ))}
        </div>
      </div>
    </div>
    </DragProvider>
  );
}

const overlay = { position: "fixed", inset: 0, background: "rgba(4,8,14,0.82)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 50, backdropFilter: "blur(3px)" };
const card = { background: "#0e1420", border: "2px solid #e8934a66", borderRadius: 18, padding: 20, maxWidth: 480, width: "100%", boxShadow: "0 12px 48px rgba(0,0,0,0.6)", animation: "popIn .25s ease-out" };
