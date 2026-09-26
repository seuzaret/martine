import { useState, useEffect } from "react";
import { useWinOnce } from "../engine/useWinOnce.js";

/* ============================================================
   MINI-JEU : « Fais la Une » (v4)
   ------------------------------------------------------------
   Robert le kioskier a un ami dans une rédaction — celle du
   [journal tiré au sort]. Le rédacteur en chef appelle : il a
   besoin d'un coup de main pour composer la Une du soir. Chaque
   journal vise un PUBLIC CIBLE différent : jeunes, adultes
   pressés, fans de sports, amateurs de people, curieux de
   sciences… À partir de la même dépêche AFP, l'élève choisit
   un titre et un ton ADAPTÉS au public de son journal.

   Structure :
   - présentation du journal + public cible
   - explication de ce qu'est une dépêche AFP + affichage
   - choix du titre parmi 4 angles
   - choix du ton du chapô parmi 3 registres
   - impression animée de la Une
   - MARTINE dit si le résultat colle bien au public visé
   ============================================================ */

const JOURNAUX = [
  {
    id: "reporter",
    nom: "Le Petit Reporter",
    couleur: "#e0a848",
    cible: "collégiens et lycéens (12-16 ans)",
    ligne: "un hebdo jeunesse : rythmé, curieux, expliquant sans être scolaire.",
    prefer: { titre: ["accroche"], ton: ["emotion"] },
  },
  {
    id: "grand",
    nom: "Le Grand Quotidien",
    couleur: "#4a6a90",
    cible: "adultes actifs, pressés, cadres et enseignants",
    ligne: "un quotidien de référence : sobre, précis, fiable.",
    prefer: { titre: ["pose", "calme"], ton: ["factuel"] },
  },
  {
    id: "star",
    nom: "Star Magazine",
    couleur: "#c04a70",
    cible: "amateurs de célébrités, de faits divers spectaculaires",
    ligne: "un hebdo grand public qui joue sur les émotions et le sensationnel.",
    prefer: { titre: ["sensation"], ton: ["inquiet", "emotion"] },
  },
];

/* dépêches AFP simples, sujets ados */
const DEPECHES = [
  {
    id: "game",
    date: "TOKYO, 10h00",
    fait: "Nintendo a présenté aujourd'hui une nouvelle console portable qui tient dans la main : la Game Boy. Elle sera vendue à partir de l'été prochain.",
    titres: [
      { angle: "calme",     t: "Nintendo lance une console qui tient dans la main" },
      { angle: "accroche",  t: "La Game Boy débarque : jouer partout, tout le temps" },
      { angle: "sensation", t: "LA CONSOLE QUI TIENT DANS TA POCHE ARRIVE !!" },
      { angle: "pose",      t: "Une console de poche annoncée par Nintendo" },
    ],
    chapo: {
      factuel: "Nintendo a présenté aujourd'hui une console portable, la Game Boy. Elle sera en vente à partir de l'été.",
      emotion: "« Je vais pouvoir jouer dans le bus ! » se réjouit Théo, 12 ans. La nouvelle Nintendo tient dans une main.",
      inquiet: "Encore un écran de plus dans la vie des enfants. Beaucoup de parents s'inquiètent déjà.",
    },
  },
  {
    id: "star",
    date: "LONDRES, 15h30",
    fait: "La chanteuse Madonna a annoncé une tournée mondiale cet été. Elle passera par Paris début juillet.",
    titres: [
      { angle: "calme",     t: "Madonna en concert à Paris cet été" },
      { angle: "accroche",  t: "Madonna choisit Paris pour sa nouvelle tournée" },
      { angle: "sensation", t: "MADONNA À PARIS : LA FOLIE VA COMMENCER !!" },
      { angle: "pose",      t: "Une date parisienne pour la tournée Madonna" },
    ],
    chapo: {
      factuel: "La chanteuse Madonna a annoncé aujourd'hui une tournée. Elle sera à Paris en juillet.",
      emotion: "Léa, 13 ans, a mis un an d'économies dans une place. « Je l'attends depuis toujours. »",
      inquiet: "La ruée sur les places pourrait tourner au chaos. La police se prépare déjà.",
    },
  },
  {
    id: "foot",
    date: "PARIS, 22h45",
    fait: "Le PSG a remporté la Coupe de France ce soir aux tirs au but face à Marseille. C'est son premier titre.",
    titres: [
      { angle: "calme",     t: "Le PSG remporte la Coupe de France aux tirs au but" },
      { angle: "accroche",  t: "Coupe de France : Paris arrache la victoire au bout du suspense" },
      { angle: "sensation", t: "MIRACLE : LE PSG SOULÈVE LA COUPE !!" },
      { angle: "pose",      t: "PSG-OM : Paris s'impose dans un match serré" },
    ],
    chapo: {
      factuel: "Le PSG a battu Marseille aux tirs au but ce soir et remporte sa première Coupe de France.",
      emotion: "Dans les tribunes, les supporters pleurent de joie. Karim, 14 ans, y était : « J'oublierai jamais. »",
      inquiet: "Après le match, des incidents ont éclaté autour du stade. La soirée reste tendue.",
    },
  },
  {
    id: "chien",
    date: "NANTES, 8h15",
    fait: "Milou, un chien perdu à Marseille il y a trois semaines, a été retrouvé hier soir à Nantes. Il avait parcouru près de 900 km.",
    titres: [
      { angle: "calme",     t: "Un chien perdu retrouvé à 900 km de chez lui" },
      { angle: "accroche",  t: "L'incroyable voyage du chien qui a traversé la France" },
      { angle: "sensation", t: "MIRACLE : LE CHIEN RETROUVE SA FAMILLE APRÈS 900 KM !!" },
      { angle: "pose",      t: "Un chien parcourt 900 km avant de retrouver ses maîtres" },
    ],
    chapo: {
      factuel: "Milou, un labrador perdu à Marseille il y a trois semaines, a été retrouvé hier à Nantes. Il est en bonne santé.",
      emotion: "« On avait perdu espoir », raconte sa maîtresse en pleurant. Milou a fait 900 km pour la retrouver.",
      inquiet: "Comment un chien peut-il survivre à un tel voyage ? Les vétérinaires n'en reviennent pas.",
    },
  },
  {
    id: "dino",
    date: "DIJON, 11h00",
    fait: "Des paléontologues ont découvert dans le Doubs un squelette de dinosaure presque complet, vieux de 150 millions d'années.",
    titres: [
      { angle: "calme",     t: "Un dinosaure presque complet découvert dans le Doubs" },
      { angle: "accroche",  t: "Il dormait sous nos pieds : le dinosaure du Doubs !" },
      { angle: "sensation", t: "UN MONSTRE DES TEMPS ANCIENS TROUVÉ EN FRANCE !!" },
      { angle: "pose",      t: "Le Doubs livre un squelette de dinosaure exceptionnel" },
    ],
    chapo: {
      factuel: "Des paléontologues ont trouvé un squelette de dinosaure vieux de 150 millions d'années dans le Doubs.",
      emotion: "Camille, 8 ans, a repéré la première dent en promenade. « Papa, c'est un T-Rex ! »",
      inquiet: "On ne s'attendait pas à trouver ça sous nos pieds. Et si d'autres dormaient encore, en attendant d'être découverts ?",
    },
  },
];

const TONS = [
  { angle: "factuel", label: "Direct — juste les faits" },
  { angle: "emotion", label: "Sensible — raconté par les gens" },
  { angle: "inquiet", label: "Inquiet — avec du mystère" },
];

const ANGLE_LABEL = { calme: "calme", accroche: "qui accroche", sensation: "qui frappe fort", pose: "posé" };
const ANGLE_COLOR = { calme: "#3a5a7a", accroche: "#7a5a2a", sensation: "#a03028", pose: "#3a5a3a" };

/* Est-ce que la combinaison (titre + ton) colle au public cible du journal ? */
function verdict(journal, titreAngle, tonAngle) {
  const okTitre = journal.prefer.titre.includes(titreAngle);
  const okTon   = journal.prefer.ton.includes(tonAngle);
  if (okTitre && okTon) {
    return {
      note: "✓ Parfait pour ton public",
      color: "#5eff9e",
      text: `Le rédac chef sourit : ta Une est exactement dans l'esprit de ${journal.nom}. Ton public — ${journal.cible} — va se sentir chez lui.`,
    };
  }
  if (okTitre || okTon) {
    return {
      note: "≈ Correct, mais un peu à côté",
      color: "#ffd166",
      text: `C'est pas mal, mais l'un des deux choix (titre ou ton) ne colle pas tout à fait au style de ${journal.nom}. Ton public risque de trouver la Une un peu bizarre.`,
    };
  }
  return {
    note: "✗ Décalé par rapport à ta cible",
    color: "#ff8a6a",
    text: `Cette Une pourrait très bien marcher — mais dans un AUTRE journal. Le public de ${journal.nom} attend autre chose. On garde cette maquette pour un confrère.`,
  };
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

export function FaireLaUneGame({ onClose, onWin }) {
  const [journal] = useState(() => pick(JOURNAUX));
  const [dep] = useState(() => pick(DEPECHES));
  const [step, setStep] = useState(0); // 0=journal, 1=dépêche+explication, 2=titre, 3=ton, 4=impression
  const [titre, setTitre] = useState(null);
  const [ton, setTon] = useState(null);
  const [pressStep, setPressStep] = useState(0);
  const [done, setDone] = useState(false);
  useWinOnce(done, onWin);

  useEffect(() => {
    if (step !== 4) return;
    setPressStep(0);
    const timers = [
      setTimeout(() => setPressStep(1), 260),
      setTimeout(() => setPressStep(2), 720),
      setTimeout(() => setPressStep(3), 1180),
      setTimeout(() => setPressStep(4), 1700),
      setTimeout(() => setDone(true), 1900),
    ];
    return () => timers.forEach(clearTimeout);
  }, [step]);

  return (
    <div onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(4,8,14,0.82)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 70, backdropFilter: "blur(3px)" }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ background: "#f6efdf", color: "#1c1a10", border: "2px solid #8a6a3a", borderRadius: 14, padding: 20, maxWidth: 700, width: "100%", maxHeight: "94vh", overflowY: "auto", boxShadow: "0 12px 48px rgba(0,0,0,0.6)", fontFamily: "Georgia, serif" }}>
        <div style={{ textAlign: "center", fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#8a5a2a" }}>📞 RÉDACTION EN LIGNE — 1980</div>
        <h2 style={{ textAlign: "center", margin: "6px 0 4px", color: "#3a2214", fontSize: 22 }}>Fais la Une</h2>

        {/* ═════ 0 : présentation du journal + public cible ═════ */}
        {step === 0 && (
          <>
            <p style={{ fontSize: 13.5, lineHeight: 1.55, textAlign: "center", margin: "0 0 12px", color: "#3a2e1e" }}>
              Le téléphone du kiosque sonne. C'est un journal qui a besoin d'aide pour composer sa Une. Robert te tend le combiné.
            </p>
            <div style={{ background: "#fff", border: `2px solid ${journal.couleur}`, borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 10, letterSpacing: 2, color: journal.couleur, marginBottom: 6 }}>▸ TU AIDES CE JOURNAL</div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 900, color: "#1c1a10", marginBottom: 6 }}>{journal.nom}</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "#3a2e1e" }}>
                <strong>Public visé :</strong> {journal.cible}<br />
                <strong>Style de la maison :</strong> {journal.ligne}
              </div>
            </div>
            <p style={{ fontSize: 12.5, lineHeight: 1.5, color: "#5a4028", marginTop: 12, fontStyle: "italic", textAlign: "center" }}>
              À toi d'adapter la Une pour ce public-là. Un titre qui plaît à un public de collégiens ne parlera pas forcément à des adultes pressés.
            </p>
            <button onClick={() => setStep(1)}
              style={{ marginTop: 14, width: "100%", background: "#8a5a2a", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: "pointer", fontSize: 14, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              1/3 · Recevoir la dépêche AFP →
            </button>
          </>
        )}

        {/* ═════ 1 : explication AFP + dépêche brute ═════ */}
        {step === 1 && (
          <>
            <div style={{ background: "#fffbe8", border: "1px dashed #a08040", borderRadius: 8, padding: "10px 12px", marginBottom: 12, fontSize: 12.5, lineHeight: 1.5, color: "#3a2e1e" }}>
              <strong style={{ color: "#8a5a2a" }}>Une dépêche AFP, c'est quoi ?</strong><br />
              L'<strong>Agence France-Presse</strong> (AFP) reçoit les infos du monde entier et les envoie aux journaux, sous forme de messages courts et neutres. Chaque journal en fait ensuite ce qu'il veut : titre, ton, image, place dans le journal.
            </div>
            <div style={{ background: "#fff", border: "1px dashed #8a6a3a", borderRadius: 8, padding: "14px 16px", fontFamily: "ui-monospace, monospace" }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: "#8a5a2a", marginBottom: 8, borderBottom: "1px solid #c9b48c", paddingBottom: 6 }}>DÉPÊCHE AFP · {dep.date}</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.5, margin: 0, color: "#1c1a10" }}>{dep.fait}</p>
            </div>
            <button onClick={() => setStep(2)}
              style={{ marginTop: 14, width: "100%", background: "#8a5a2a", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: "pointer", fontSize: 14, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              2/3 · Choisir un titre pour {journal.nom} →
            </button>
          </>
        )}

        {/* ═════ 2 : choix du titre ═════ */}
        {step === 2 && (
          <>
            <p style={{ fontSize: 13, lineHeight: 1.5, textAlign: "center", margin: "0 0 12px", color: "#3a2e1e" }}>
              Rappelle-toi : tu écris pour <strong style={{ color: journal.couleur }}>{journal.nom}</strong> — {journal.cible}.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {dep.titres.map((t) => {
                const sel = titre?.t === t.t;
                return (
                  <button key={t.t} onClick={() => setTitre(t)}
                    style={{ textAlign: "left", background: sel ? "#fffbe8" : "#fff", border: `2px solid ${sel ? ANGLE_COLOR[t.angle] : "#c9b48c"}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", fontFamily: "Georgia, serif" }}>
                    <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 10, letterSpacing: 1, color: ANGLE_COLOR[t.angle], fontWeight: 800, marginBottom: 4 }}>TITRE {ANGLE_LABEL[t.angle].toUpperCase()}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#1c1a10", lineHeight: 1.3 }}>{t.t}</div>
                  </button>
                );
              })}
            </div>
            <button onClick={() => setStep(3)} disabled={!titre}
              style={{ marginTop: 14, width: "100%", background: titre ? "#8a5a2a" : "#c9b48c", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: titre ? "pointer" : "not-allowed", fontSize: 14, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              3/3 · Choisir le ton du chapô →
            </button>
          </>
        )}

        {/* ═════ 3 : choix du ton ═════ */}
        {step === 3 && (
          <>
            <p style={{ fontSize: 13, lineHeight: 1.5, textAlign: "center", margin: "0 0 12px", color: "#3a2e1e" }}>
              Comment vas-tu écrire le petit texte sous le titre ?
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {TONS.map((T) => {
                const sel = ton?.angle === T.angle;
                return (
                  <button key={T.angle} onClick={() => setTon(T)}
                    style={{ textAlign: "left", background: sel ? "#fffbe8" : "#fff", border: `2px solid ${sel ? "#8a5a2a" : "#c9b48c"}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", fontFamily: "Georgia, serif" }}>
                    <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 10, letterSpacing: 1, color: "#8a5a2a", fontWeight: 800 }}>{T.label}</div>
                  </button>
                );
              })}
            </div>
            <button onClick={() => setStep(4)} disabled={!ton}
              style={{ marginTop: 14, width: "100%", background: ton ? "#8a5a2a" : "#c9b48c", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: ton ? "pointer" : "not-allowed", fontSize: 14, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              ✓ Imprimer la Une !
            </button>
          </>
        )}

        {/* ═════ 4 : impression animée + verdict ═════ */}
        {step === 4 && (() => {
          const V = verdict(journal, titre.angle, ton.angle);
          return (
            <>
              <div style={{ background: "#fff", border: `2px solid ${journal.couleur}`, borderRadius: 8, padding: 18, boxShadow: "0 4px 16px rgba(0,0,0,0.15)", position: "relative", overflow: "hidden", minHeight: 220 }}>
                {pressStep < 4 && (
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, rgba(60,40,20,0.12) 50%, transparent 100%)", animation: "inkPass 1.6s ease-out 1", pointerEvents: "none" }} />
                )}
                {/* Nameplate du journal, à sa couleur */}
                <div style={{ opacity: pressStep >= 1 ? 1 : 0, transition: "opacity .4s", fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 900, textAlign: "center", borderBottom: `3px double ${journal.couleur}`, paddingBottom: 6, marginBottom: 12, color: journal.couleur, letterSpacing: 2 }}>
                  {journal.nom.toUpperCase()}
                </div>
                <div style={{ opacity: pressStep >= 2 ? 1 : 0, transform: pressStep >= 2 ? "translateY(0)" : "translateY(6px)", transition: "opacity .4s, transform .4s", fontSize: 22, fontWeight: 900, lineHeight: 1.2, color: "#1c1a10", marginBottom: 10 }}>
                  {titre.t}
                </div>
                <div style={{ opacity: pressStep >= 3 ? 1 : 0, transition: "opacity .5s", fontSize: 14.5, lineHeight: 1.55, color: "#2a2418" }}>
                  {dep.chapo[ton.angle]}
                </div>
                {pressStep >= 3 && (
                  <div style={{ marginTop: 14, borderTop: "1px solid #c9b48c", paddingTop: 10, fontSize: 11.5, color: "#7a6248", fontStyle: "italic" }}>
                    Suite en pages intérieures — voir aussi : brèves, sports, télé.
                  </div>
                )}
              </div>

              {pressStep >= 4 && (
                <div style={{ marginTop: 14, background: "#101827", border: `1px solid ${V.color}44`, borderRadius: 10, padding: "12px 14px", color: "#e8eef5", animation: "fadein .4s" }}>
                  <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 1.5, color: V.color, fontWeight: 800, marginBottom: 6 }}>{V.note}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>{V.text}</p>
                  <p style={{ fontSize: 13, lineHeight: 1.55, margin: "8px 0 0", color: "#c8d4e2", fontStyle: "italic" }}>
                    « À partir de la MÊME dépêche AFP, chaque journal fabrique la Une qui parle à SON public. C'est ça, une ligne éditoriale : un choix, adapté à ceux qu'on veut atteindre. » — MARTINE
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
          );
        })()}

        <style>{`
          @keyframes inkPass { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        `}</style>
      </div>
    </div>
  );
}
