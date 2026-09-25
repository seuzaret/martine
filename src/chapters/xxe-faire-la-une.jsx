import { useState, useEffect } from "react";
import { useWinOnce } from "../engine/useWinOnce.js";

/* ============================================================
<<<<<<< HEAD
   MINI-JEU : « Fais la Une » (v3 — vocabulaire 6e, sujets ados)
   ------------------------------------------------------------
   Une seule dépêche AFP tirée au hasard, courte et concrète.
   L'élève choisit un titre (4 angles) puis un ton (3 registres).
   La Une s'imprime avec une petite animation « impression »
   puis MARTINE nomme la ligne éditoriale que ces deux choix ont
   fabriquée. Sujets choisis dans l'univers d'un(e) collégien(ne)
   des années 80 : jeu vidéo, concert, foot, chien perdu, dino.
   ============================================================ */

const DEPECHES = [
  {
    id: "game",
    date: "TOKYO, 10h00",
    fait: "Nintendo a présenté aujourd'hui une nouvelle console portable qui tient dans la main : la Game Boy. Elle sera vendue à partir de l'été prochain.",
    titres: [
      { angle: "calme",   t: "Nintendo lance une console qui tient dans la main" },
      { angle: "accroche", t: "La Game Boy débarque : jouer partout, tout le temps" },
      { angle: "sensation", t: "LA CONSOLE QUI TIENT DANS TA POCHE ARRIVE !!" },
      { angle: "pose",    t: "Une console de poche annoncée par Nintendo" },
    ],
    chapo: {
      factuel:   "Nintendo a présenté aujourd'hui une console portable, la Game Boy. Elle sera en vente à partir de l'été.",
      emotion:   "« Je vais pouvoir jouer dans le bus ! » se réjouit Théo, 12 ans. La nouvelle Nintendo tient dans une main.",
      inquiet:   "Encore un écran de plus dans la vie des enfants. Beaucoup de parents s'inquiètent déjà.",
    },
  },
  {
    id: "star",
    date: "LONDRES, 15h30",
    fait: "La chanteuse Madonna a annoncé une tournée mondiale cet été. Elle passera par Paris début juillet.",
    titres: [
      { angle: "calme",   t: "Madonna en concert à Paris cet été" },
      { angle: "accroche", t: "Madonna choisit Paris pour sa nouvelle tournée" },
      { angle: "sensation", t: "MADONNA À PARIS : LA FOLIE VA COMMENCER !!" },
      { angle: "pose",    t: "Une date parisienne pour la tournée Madonna" },
    ],
    chapo: {
      factuel:   "La chanteuse Madonna a annoncé aujourd'hui une tournée. Elle sera à Paris en juillet.",
      emotion:   "Léa, 13 ans, a mis un an d'économies dans une place. « Je l'attends depuis toujours. »",
      inquiet:   "La ruée sur les places pourrait tourner au chaos. La police se prépare déjà.",
    },
  },
  {
    id: "foot",
    date: "PARIS, 22h45",
    fait: "Le PSG a remporté la Coupe de France ce soir aux tirs au but face à Marseille. C'est son premier titre.",
    titres: [
      { angle: "calme",   t: "Le PSG remporte la Coupe de France aux tirs au but" },
      { angle: "accroche", t: "Coupe de France : Paris arrache la victoire au bout du suspense" },
      { angle: "sensation", t: "MIRACLE : LE PSG SOULÈVE LA COUPE !!" },
      { angle: "pose",    t: "PSG-OM : Paris s'impose dans un match serré" },
    ],
    chapo: {
      factuel:   "Le PSG a battu Marseille aux tirs au but ce soir et remporte sa première Coupe de France.",
      emotion:   "Dans les tribunes, les supporters pleurent de joie. Karim, 14 ans, y était : « J'oublierai jamais. »",
      inquiet:   "Après le match, des incidents ont éclaté autour du stade. La soirée reste tendue.",
    },
  },
  {
    id: "chien",
    date: "NANTES, 8h15",
    fait: "Milou, un chien perdu à Marseille il y a trois semaines, a été retrouvé hier soir à Nantes. Il avait parcouru près de 900 km.",
    titres: [
      { angle: "calme",   t: "Un chien perdu retrouvé à 900 km de chez lui" },
      { angle: "accroche", t: "L'incroyable voyage du chien qui a traversé la France" },
      { angle: "sensation", t: "MIRACLE : LE CHIEN RETROUVE SA FAMILLE APRÈS 900 KM !!" },
      { angle: "pose",    t: "Un chien parcourt 900 km avant de retrouver ses maîtres" },
    ],
    chapo: {
      factuel:   "Milou, un labrador perdu à Marseille il y a trois semaines, a été retrouvé hier à Nantes. Il est en bonne santé.",
      emotion:   "« On avait perdu espoir », raconte sa maîtresse en pleurant. Milou a fait 900 km pour la retrouver.",
      inquiet:   "Comment un chien peut-il survivre à un tel voyage ? Les vétérinaires n'en reviennent pas.",
    },
  },
  {
    id: "dino",
    date: "DIJON, 11h00",
    fait: "Des paléontologues ont découvert dans le Doubs un squelette de dinosaure presque complet, vieux de 150 millions d'années.",
    titres: [
      { angle: "calme",   t: "Un dinosaure presque complet découvert dans le Doubs" },
      { angle: "accroche", t: "Il dormait sous nos pieds : le dinosaure du Doubs !" },
      { angle: "sensation", t: "UN MONSTRE DES TEMPS ANCIENS TROUVÉ EN FRANCE !!" },
      { angle: "pose",    t: "Le Doubs livre un squelette de dinosaure exceptionnel" },
    ],
    chapo: {
      factuel:   "Des paléontologues ont trouvé un squelette de dinosaure vieux de 150 millions d'années dans le Doubs.",
      emotion:   "Camille, 8 ans, a repéré la première dent en promenade. « Papa, c'est un T-Rex ! »",
      inquiet:   "On ne s'attendait pas à trouver ça sous nos pieds. Et si d'autres dormaient encore, en attendant d'être découverts ?",
    },
  },
];

const TONS = [
  { angle: "factuel",  label: "Direct — juste les faits",           preview: "les faits, rien que les faits." },
  { angle: "emotion",  label: "Sensible — raconté par les gens",    preview: "en donnant la parole à quelqu'un qui l'a vécu." },
  { angle: "inquiet",  label: "Inquiet — avec du mystère",          preview: "en insistant sur ce qui interroge, ce qui fait peur." },
];

const ANGLE_LABEL = { calme: "calme", accroche: "qui accroche", sensation: "qui frappe fort", pose: "posé" };
const ANGLE_COLOR = { calme: "#3a5a7a", accroche: "#7a5a2a", sensation: "#a03028", pose: "#3a5a3a" };

function verdict(titreAngle, tonAngle) {
  if (titreAngle === "sensation" || tonAngle === "inquiet") {
    return "Ton journal joue sur le frisson et les grosses émotions. C'est un JOURNAL À SENSATION : ça se vend vite au kiosque, mais le lecteur ressort tout secoué — et parfois avec une idée fausse.";
  }
  if (titreAngle === "pose" && tonAngle === "factuel") {
    return "Ton journal va droit à l'essentiel, sans en rajouter. C'est un JOURNAL SÉRIEUX : il informe calmement. Les lecteurs lui font confiance dans le temps.";
  }
  if (tonAngle === "emotion") {
    return "Ton journal raconte à travers les gens. C'est un JOURNAL PROCHE DES LECTEURS : on s'attache à quelqu'un, on comprend mieux ce qui s'est passé.";
  }
  if (titreAngle === "accroche") {
    return "Ton journal attire l'œil sans crier. C'est un JOURNAL GRAND PUBLIC : il veut être lu par beaucoup, tout en restant sérieux.";
  }
  return "Ton journal reste calme et précis. C'est un JOURNAL DE RÉFÉRENCE : peu de bruit, beaucoup d'information.";
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
=======
   MINI-JEU : « Fais la Une » (v2 — plus simple, plus visuel)
   ------------------------------------------------------------
   Une seule dépêche AFP tirée au hasard, présentée telle qu'elle
   arrive sur le télex : neutre, factuelle. L'élève choisit
   ensuite UN titre (4 angles possibles) puis UN ton (3 registres).
   À la fin, la Une se compose sous ses yeux avec une petite
   animation « impression » — et MARTINE commente la ligne
   éditoriale que ces deux choix ont fabriquée.

   L'idée : à partir du même fait, plusieurs Unes possibles.
   Choisir, c'est déjà éditer.
   ============================================================ */

/* 5 dépêches AFP, une seule tirée à chaque partie. Chaque titre
   possède un tag qui traduit son angle éditorial (neutre,
   accrocheur, sensationnel, mesuré). Aucun n'est faux ; tous
   racontent le même fait, différemment. */
const DEPECHES = [
  {
    id: "incendie",
    date: "SAINT-DENIS, 6h12",
    fait: "Un incendie a détruit un entrepôt de textile durant la nuit. Aucune victime. Origine indéterminée, une enquête est ouverte. Le maire s'est rendu sur place.",
    titres: [
      { angle: "neutre",       t: "Incendie maîtrisé dans un entrepôt à Saint-Denis" },
      { angle: "accrocheur",   t: "Nouvel incendie mystérieux en banlieue parisienne" },
      { angle: "sensationnel", t: "LES FLAMMES RAVAGENT SAINT-DENIS DANS LA NUIT" },
      { angle: "mesure",       t: "Entrepôt en cendres à Saint-Denis, enquête en cours" },
    ],
  },
  {
    id: "greve",
    date: "PARIS, 18h30",
    fait: "Trois syndicats de la SNCF appellent à la grève vendredi pour réclamer une revalorisation salariale. Le gouvernement propose des négociations.",
    titres: [
      { angle: "neutre",       t: "SNCF : grève annoncée vendredi, négociations proposées" },
      { angle: "accrocheur",   t: "Un vendredi noir se prépare sur les rails" },
      { angle: "sensationnel", t: "LA FRANCE À L'ARRÊT : LES USAGERS EN OTAGE !" },
      { angle: "mesure",       t: "Cheminots et gouvernement à la table dès vendredi" },
    ],
  },
  {
    id: "star",
    date: "LONDRES, 14h05",
    fait: "Buckingham confirme la seconde grossesse de la princesse Diana. Naissance prévue au printemps prochain.",
    titres: [
      { angle: "neutre",       t: "Second enfant attendu chez les Windsor" },
      { angle: "accrocheur",   t: "Diana à nouveau enceinte : c'est confirmé !" },
      { angle: "sensationnel", t: "DIANA ATTEND DÉJÀ SON DEUXIÈME BÉBÉ !!" },
      { angle: "mesure",       t: "La famille royale britannique s'agrandit" },
    ],
  },
  {
    id: "voyager",
    date: "PASADENA, 22h40",
    fait: "La sonde américaine Voyager 2 a transmis les premières images en couleur de Saturne. 18 000 clichés ont été reçus en quinze jours.",
    titres: [
      { angle: "neutre",       t: "Voyager 2 : premières photos couleur de Saturne" },
      { angle: "accrocheur",   t: "Ces images de Saturne comme on n'en a jamais vu" },
      { angle: "sensationnel", t: "SATURNE COMME SI VOUS Y ÉTIEZ : LES CLICHÉS EXCLUSIFS !" },
      { angle: "mesure",       t: "Une moisson historique d'images pour la NASA" },
    ],
  },
  {
    id: "lycee",
    date: "PARIS, 19h20",
    fait: "50 000 lycéens ont manifesté dans le calme à Paris contre le projet de réforme du baccalauréat. Rassemblements aussi à Lyon et Marseille.",
    titres: [
      { angle: "neutre",       t: "50 000 lycéens dans la rue contre la réforme du bac" },
      { angle: "accrocheur",   t: "La jeunesse dit non : la mobilisation prend de l'ampleur" },
      { angle: "sensationnel", t: "LES LYCÉES SOUS TENSION : LA COLÈRE MONTE !" },
      { angle: "mesure",       t: "Manifestation lycéenne : dialogue attendu au ministère" },
    ],
  },
];

/* 3 tons possibles pour le chapô — le même fait, écrit trois
   façons. Chaque ton a sa couleur d'écriture. */
const TONS = [
  { angle: "factuel",   label: "Factuel — juste les faits",
    intro: "Ce jeudi matin, les pompiers ont maîtrisé un incendie. Aucun blessé. Une enquête est ouverte." },
  { angle: "emotionnel", label: "Humain — l'angle émotion",
    intro: "Ils l'ont vu brûler depuis leur fenêtre. Une famille du quartier raconte la peur, l'attente, le soulagement." },
  { angle: "alarmant",   label: "Alarmant — mystère et menace",
    intro: "Encore un. Un troisième feu suspect en un mois dans la banlieue nord. La psychose s'installe chez les habitants." },
];

/* On personnalise le chapô selon la dépêche + le ton, pour que
   la « fabrication » de la Une soit concrète et lisible. */
function chapoFor(dep, tonAngle) {
  const M = {
    incendie: {
      factuel:    "Cette nuit à Saint-Denis, un entrepôt de textile a brûlé. Aucun blessé. L'enquête est ouverte, le maire s'est rendu sur place.",
      emotionnel: "Ils l'ont vu brûler depuis leur fenêtre. Les voisins racontent la peur, l'attente, le soulagement des pompiers arrivant à temps.",
      alarmant:   "Encore un. Un troisième entrepôt qui part en fumée en trois mois dans la banlieue nord. Personne ne dit rien, mais tout le monde s'inquiète.",
    },
    greve: {
      factuel:    "Trois syndicats appellent les cheminots à la grève vendredi. Le gouvernement ouvre des négociations dès demain.",
      emotionnel: "Denise, contrôleuse depuis 20 ans, fait grève « la mort dans l'âme ». Elle sait ce que ce vendredi coûtera à ses collègues, et aux voyageurs.",
      alarmant:   "Une France paralysée dès vendredi. Écoles, hôpitaux, gares : personne ne sortira indemne du bras de fer qui commence.",
    },
    star: {
      factuel:    "Buckingham confirme dans un communiqué la seconde grossesse de la princesse Diana. Naissance attendue au printemps.",
      emotionnel: "Photographiée hier main dans la main avec le prince William, Diana rayonnait déjà. La nouvelle est officielle depuis ce matin.",
      alarmant:   "Une nouvelle grossesse, alors que la rumeur d'un couple en crise n'a jamais été aussi forte. Les prochains mois seront scrutés.",
    },
    voyager: {
      factuel:    "La sonde Voyager 2 a transmis en quinze jours 18 000 photographies en couleur de Saturne. Les scientifiques analysent les données.",
      emotionnel: "« On voit ce qu'aucun humain n'a jamais vu », résume un astronome de la NASA, la voix étranglée. Les images circulent partout dans les labos.",
      alarmant:   "Alors que le programme spatial américain vacille, ces images inespérées relancent le débat : Saturne pourrait-elle abriter la vie ?",
    },
    lycee: {
      factuel:    "50 000 lycéens ont manifesté à Paris. Rassemblements également à Lyon et Marseille. Aucun incident signalé.",
      emotionnel: "Ils portent leurs pancartes comme un premier acte politique. Léa, 16 ans : « Je manifeste pour la première fois de ma vie. »",
      alarmant:   "La mobilisation s'amplifie et rien ne semble pouvoir l'arrêter. Certains professeurs craignent un embrasement dans les jours à venir.",
    },
  };
  return (M[dep.id] || {})[tonAngle] || "";
}

/* Verdict : croise l'angle du titre et le ton du chapô pour
   nommer la ligne éditoriale composée. Aucun combo « faux ». */
function verdict(titreAngle, tonAngle) {
  if (titreAngle === "sensationnel" || tonAngle === "alarmant") {
    return "Ta Une joue sur le frisson. Ligne éditoriale : PRESSE À SENSATION. Elle vend beaucoup, mais monte l'événement en épingle : le lecteur ressort la tête chauffée.";
  }
  if (titreAngle === "mesure" && tonAngle === "factuel") {
    return "Ta Une va droit à l'essentiel, sans dramatiser. Ligne éditoriale : QUOTIDIEN DE RÉFÉRENCE. C'est ce qu'on lit sans emballement, mais qu'on relit dans 10 ans sans rougir.";
  }
  if (tonAngle === "emotionnel") {
    return "Ta Une place l'humain au centre. Ligne éditoriale : PRESSE MAGAZINE / SOCIÉTÉ. Elle raconte l'événement à travers les gens — plus long à lire, plus long à oublier.";
  }
  if (titreAngle === "accrocheur") {
    return "Ta Une accroche l'œil sans crier. Ligne éditoriale : QUOTIDIEN GRAND PUBLIC. Elle veut vendre au kiosque tout en restant crédible — l'équilibre le plus difficile.";
  }
  return "Ta Une est sobre et précise. Ligne éditoriale : JOURNAL DE RÉFÉRENCE. Peu de bruit, beaucoup d'information.";
}
>>>>>>> origin/main

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

export function FaireLaUneGame({ onClose, onWin }) {
  const [dep] = useState(() => pick(DEPECHES));
<<<<<<< HEAD
  const [step, setStep] = useState(0);
  const [titre, setTitre] = useState(null);
  const [ton, setTon]     = useState(null);
  const [pressStep, setPressStep] = useState(0);
  const [done, setDone] = useState(false);
  useWinOnce(done, onWin);

=======
  const [step, setStep] = useState(0); // 0 = dépêche, 1 = titre, 2 = ton, 3 = impression
  const [titre, setTitre] = useState(null);
  const [ton, setTon]     = useState(null);
  const [pressStep, setPressStep] = useState(0); // 0..3, animation "impression"
  const [done, setDone] = useState(false);
  useWinOnce(done, onWin);

  /* animation d'impression progressive quand on arrive à l'étape finale */
>>>>>>> origin/main
  useEffect(() => {
    if (step !== 3) return;
    setPressStep(0);
    const timers = [
<<<<<<< HEAD
      setTimeout(() => setPressStep(1), 260),
      setTimeout(() => setPressStep(2), 720),
      setTimeout(() => setPressStep(3), 1180),
      setTimeout(() => setPressStep(4), 1700),
=======
      setTimeout(() => setPressStep(1), 260),   // bandeau titre
      setTimeout(() => setPressStep(2), 720),   // titre principal
      setTimeout(() => setPressStep(3), 1180),  // chapo
      setTimeout(() => setPressStep(4), 1700),  // verdict + validation
>>>>>>> origin/main
      setTimeout(() => setDone(true),   1900),
    ];
    return () => timers.forEach(clearTimeout);
  }, [step]);
<<<<<<< HEAD
=======

  const anglesLabel = { neutre: "sobre", accrocheur: "accrocheur", sensationnel: "sensation !", mesure: "mesuré" };
  const angleColor  = { neutre: "#3a5a7a", accrocheur: "#7a5a2a", sensationnel: "#a03028", mesure: "#3a5a3a" };
>>>>>>> origin/main

  return (
    <div onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(4,8,14,0.82)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 70, backdropFilter: "blur(3px)" }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ background: "#f6efdf", color: "#1c1a10", border: "2px solid #8a6a3a", borderRadius: 14, padding: 20, maxWidth: 660, width: "100%", maxHeight: "92vh", overflowY: "auto", boxShadow: "0 12px 48px rgba(0,0,0,0.6)", fontFamily: "Georgia, serif" }}>
        <div style={{ textAlign: "center", fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#8a5a2a" }}>📰 FABRIQUE DE LA UNE — 1980</div>
        <h2 style={{ textAlign: "center", margin: "6px 0 4px", color: "#3a2214", fontSize: 22 }}>Fais la Une du kiosque</h2>

<<<<<<< HEAD
        {step === 0 && (
          <>
            <p style={{ fontSize: 13.5, lineHeight: 1.55, textAlign: "center", margin: "0 0 12px", color: "#3a2e1e" }}>
              Le télex sort une dépêche AFP toute chaude. Robert te la tend : « À toi de la mettre en Une. »
=======
        {/* ═════ ÉTAPE 0 : la dépêche AFP brute ═════ */}
        {step === 0 && (
          <>
            <p style={{ fontSize: 13.5, lineHeight: 1.55, textAlign: "center", margin: "0 0 12px", color: "#3a2e1e" }}>
              Le télex crache une dépêche AFP. Robert te la tend : « À toi de la mettre en Une. »
>>>>>>> origin/main
            </p>
            <div style={{ background: "#fff", border: "1px dashed #8a6a3a", borderRadius: 8, padding: "14px 16px", fontFamily: "ui-monospace, monospace" }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: "#8a5a2a", marginBottom: 8, borderBottom: "1px solid #c9b48c", paddingBottom: 6 }}>DÉPÊCHE AFP · {dep.date}</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.5, margin: 0, color: "#1c1a10" }}>{dep.fait}</p>
            </div>
            <button onClick={() => setStep(1)}
              style={{ marginTop: 14, width: "100%", background: "#8a5a2a", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: "pointer", fontSize: 14, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              1/2 · Choisir un titre →
            </button>
          </>
        )}

<<<<<<< HEAD
        {step === 1 && (
          <>
            <p style={{ fontSize: 13, lineHeight: 1.5, textAlign: "center", margin: "0 0 12px", color: "#3a2e1e" }}>
              Le même fait peut donner 4 titres très différents. Choisis-en un.
=======
        {/* ═════ ÉTAPE 1 : choix du titre ═════ */}
        {step === 1 && (
          <>
            <p style={{ fontSize: 13, lineHeight: 1.5, textAlign: "center", margin: "0 0 12px", color: "#3a2e1e" }}>
              Même fait, 4 titres possibles. Chaque titre donne <strong>un angle</strong>.
>>>>>>> origin/main
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {dep.titres.map((t) => {
                const sel = titre?.t === t.t;
                return (
                  <button key={t.t} onClick={() => setTitre(t)}
<<<<<<< HEAD
                    style={{ textAlign: "left", background: sel ? "#fffbe8" : "#fff", border: `2px solid ${sel ? ANGLE_COLOR[t.angle] : "#c9b48c"}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", fontFamily: "Georgia, serif", boxShadow: sel ? `0 0 0 2px ${ANGLE_COLOR[t.angle]}33` : "0 1px 2px rgba(0,0,0,0.06)", transition: "all .15s" }}>
                    <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 10, letterSpacing: 1, color: ANGLE_COLOR[t.angle], fontWeight: 800, marginBottom: 4 }}>TITRE {ANGLE_LABEL[t.angle].toUpperCase()}</div>
=======
                    style={{ textAlign: "left", background: sel ? "#fffbe8" : "#fff", border: `2px solid ${sel ? angleColor[t.angle] : "#c9b48c"}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", fontFamily: "Georgia, serif", boxShadow: sel ? `0 0 0 2px ${angleColor[t.angle]}33` : "0 1px 2px rgba(0,0,0,0.06)", transition: "all .15s" }}>
                    <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 10, letterSpacing: 1, color: angleColor[t.angle], fontWeight: 800, marginBottom: 4 }}>ANGLE : {anglesLabel[t.angle].toUpperCase()}</div>
>>>>>>> origin/main
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#1c1a10", lineHeight: 1.3 }}>{t.t}</div>
                  </button>
                );
              })}
            </div>
            <button onClick={() => setStep(2)} disabled={!titre}
              style={{ marginTop: 14, width: "100%", background: titre ? "#8a5a2a" : "#c9b48c", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: titre ? "pointer" : "not-allowed", fontSize: 14, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              2/2 · Choisir le ton →
            </button>
          </>
        )}

<<<<<<< HEAD
        {step === 2 && (
          <>
            <p style={{ fontSize: 13, lineHeight: 1.5, textAlign: "center", margin: "0 0 12px", color: "#3a2e1e" }}>
              Comment vas-tu écrire le petit texte sous le titre ?
=======
        {/* ═════ ÉTAPE 2 : choix du ton ═════ */}
        {step === 2 && (
          <>
            <p style={{ fontSize: 13, lineHeight: 1.5, textAlign: "center", margin: "0 0 12px", color: "#3a2e1e" }}>
              Reste à choisir <strong>comment</strong> tu vas raconter l'histoire dans le chapô.
>>>>>>> origin/main
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {TONS.map((T) => {
                const sel = ton?.angle === T.angle;
                return (
                  <button key={T.angle} onClick={() => setTon(T)}
                    style={{ textAlign: "left", background: sel ? "#fffbe8" : "#fff", border: `2px solid ${sel ? "#8a5a2a" : "#c9b48c"}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", fontFamily: "Georgia, serif" }}>
                    <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 10, letterSpacing: 1, color: "#8a5a2a", fontWeight: 800, marginBottom: 4 }}>{T.label}</div>
<<<<<<< HEAD
                    <div style={{ fontSize: 12.5, color: "#4a3e2e", fontStyle: "italic", lineHeight: 1.4 }}>Raconter l'histoire {T.preview}</div>
=======
                    <div style={{ fontSize: 12.5, color: "#4a3e2e", fontStyle: "italic", lineHeight: 1.4 }}>« {chapoFor(dep, T.angle).slice(0, 110)}… »</div>
>>>>>>> origin/main
                  </button>
                );
              })}
            </div>
            <button onClick={() => setStep(3)} disabled={!ton}
              style={{ marginTop: 14, width: "100%", background: ton ? "#8a5a2a" : "#c9b48c", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: ton ? "pointer" : "not-allowed", fontSize: 14, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              ✓ Imprimer la Une !
            </button>
          </>
        )}

<<<<<<< HEAD
        {step === 3 && (
          <>
            <div style={{ background: "#fff", border: "1px solid #c9b48c", borderRadius: 8, padding: 18, boxShadow: "0 4px 16px rgba(0,0,0,0.15)", position: "relative", overflow: "hidden", minHeight: 220 }}>
              {pressStep < 4 && (
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, rgba(60,40,20,0.12) 50%, transparent 100%)", animation: "inkPass 1.6s ease-out 1", pointerEvents: "none" }} />
              )}
              <div style={{ opacity: pressStep >= 1 ? 1 : 0, transition: "opacity .4s", fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 900, textAlign: "center", borderBottom: "3px double #1c1a10", paddingBottom: 6, marginBottom: 12, color: "#1c1a10", letterSpacing: 2 }}>
                LE JOURNAL DU JOUR
              </div>
              <div style={{ opacity: pressStep >= 2 ? 1 : 0, transform: pressStep >= 2 ? "translateY(0)" : "translateY(6px)", transition: "opacity .4s, transform .4s", fontSize: 22, fontWeight: 900, lineHeight: 1.2, color: "#1c1a10", marginBottom: 10 }}>
                {titre?.t}
              </div>
              <div style={{ opacity: pressStep >= 3 ? 1 : 0, transition: "opacity .5s", fontSize: 14.5, lineHeight: 1.55, color: "#2a2418" }}>
                {dep.chapo[ton?.angle]}
              </div>
              {pressStep >= 3 && (
                <div style={{ marginTop: 14, borderTop: "1px solid #c9b48c", paddingTop: 10, fontSize: 11.5, color: "#7a6248", fontStyle: "italic" }}>
                  Suite en pages intérieures — voir aussi : brèves, sports, télé.
=======
        {/* ═════ ÉTAPE 3 : impression animée ═════ */}
        {step === 3 && (
          <>
            {/* Aperçu de la Une composée, apparaît par blocs successifs */}
            <div style={{ background: "#fff", border: "1px solid #c9b48c", borderRadius: 8, padding: 18, boxShadow: "0 4px 16px rgba(0,0,0,0.15)", position: "relative", overflow: "hidden", minHeight: 220 }}>
              {/* effet "encre fraîche" : petit voile qui balaie */}
              {pressStep < 4 && (
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, rgba(60,40,20,0.12) 50%, transparent 100%)", animation: "inkPass 1.6s ease-out 1", pointerEvents: "none" }} />
              )}
              {/* Tête de journal */}
              <div style={{ opacity: pressStep >= 1 ? 1 : 0, transition: "opacity .4s", fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 900, textAlign: "center", borderBottom: "3px double #1c1a10", paddingBottom: 6, marginBottom: 12, color: "#1c1a10", letterSpacing: 2 }}>
                LE JOURNAL DU JOUR
              </div>
              {/* Titre principal */}
              <div style={{ opacity: pressStep >= 2 ? 1 : 0, transform: pressStep >= 2 ? "translateY(0)" : "translateY(6px)", transition: "opacity .4s, transform .4s", fontSize: 22, fontWeight: 900, lineHeight: 1.2, color: "#1c1a10", marginBottom: 10 }}>
                {titre?.t}
              </div>
              {/* chapô */}
              <div style={{ opacity: pressStep >= 3 ? 1 : 0, transition: "opacity .5s", fontSize: 14.5, lineHeight: 1.55, color: "#2a2418" }}>
                {chapoFor(dep, ton?.angle)}
              </div>
              {/* petit filet en bas + colonne fictive */}
              {pressStep >= 3 && (
                <div style={{ marginTop: 14, borderTop: "1px solid #c9b48c", paddingTop: 10, fontSize: 11.5, color: "#7a6248", fontStyle: "italic" }}>
                  Suite en pages intérieures — Voir aussi : brèves du jour, sports, télévision.
>>>>>>> origin/main
                </div>
              )}
            </div>

<<<<<<< HEAD
            {pressStep >= 4 && (
              <div style={{ marginTop: 14, background: "#101827", border: "1px solid #2a3648", borderRadius: 10, padding: "12px 14px", color: "#e8eef5", animation: "fadein .4s" }}>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
                  « {verdict(titre.angle, ton.angle)} Rappelle-toi : à partir de la MÊME dépêche, deux journaux peuvent faire deux Unes très différentes. Pas de journal neutre — quelqu'un choisit toujours. » — MARTINE
=======
            {/* Verdict MARTINE */}
            {pressStep >= 4 && (
              <div style={{ marginTop: 14, background: "#101827", border: "1px solid #2a3648", borderRadius: 10, padding: "12px 14px", color: "#e8eef5", animation: "fadein .4s" }}>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
                  « {verdict(titre.angle, ton.angle)} Deux journaux différents peuvent partir de la MÊME dépêche et sortir des Unes complètement différentes. C'est ça, une ligne éditoriale — un point de vue assumé sur ce qui compte. » — MARTINE
>>>>>>> origin/main
                </p>
              </div>
            )}
            {pressStep >= 4 && (
              <button onClick={onClose}
                style={{ marginTop: 12, width: "100%", background: "#8a5a2a", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: "pointer", fontSize: 15, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
                Continuer
              </button>
            )}
          </>
        )}
        <style>{`
          @keyframes inkPass { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        `}</style>
      </div>
    </div>
  );
}
