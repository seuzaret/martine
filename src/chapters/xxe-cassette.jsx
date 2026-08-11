import { useState, useEffect, useRef } from "react";

/* ============================================================
   MINI-JEU : « Enregistrer le tube sur cassette » (1985)
   ------------------------------------------------------------
   La radio joue en boucle : ça alterne DJ qui parle, jingle
   pub, DJ qui parle, LE TUBE. Le curseur défile sur la
   timeline ; le joueur doit presser PLAY+REC PILE au début
   du tube, sinon l'enregistrement commence trop tôt (DJ
   par-dessus) ou trop tard (raté le début).
   Leçon : avec la cassette, chacun devient enregistreur —
   la première fois que la copie à domicile est possible.
   ============================================================ */

/* Segments du programme radio (durée relative, texte parlé) */
const SEGMENTS = [
  { type: "dj",     dur: 1.6,  label: "…et voilà pour la météo. Restez avec nous sur Skyrap, tout de suite…" },
  { type: "pub",    dur: 1.4,  label: "🎵 (jingle) MEUBLES CONFORIMA — le confort à petit prix ! 🎵" },
  { type: "dj",     dur: 1.4,  label: "…on enchaîne avec le nouveau tube qui cartonne partout en Europe…" },
  { type: "tube",   dur: 2.2,  label: "🎸 ♪♪ LE TUBE ! ♪♪ (intro guitare + batterie qui démarre) 🎸" },
  { type: "dj",     dur: 1.6,  label: "…c'était le nouveau single, à retrouver en 45-tours chez votre disquaire…" },
];
const TOTAL = SEGMENTS.reduce((s, x) => s + x.dur, 0);

/* Un petit son de clac quand on presse PLAY+REC */
let AC = null;
function playClack() {
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    if (AC.state === "suspended") AC.resume();
    const t = AC.currentTime;
    const o = AC.createOscillator(); o.type = "square"; o.frequency.value = 180;
    const g = AC.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.15, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
    o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + 0.09);
  } catch { /* pas d'audio */ }
}
/* Petit sifflement quand ratée */
function playRate() {
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    if (AC.state === "suspended") AC.resume();
    const t = AC.currentTime;
    const o = AC.createOscillator(); o.type = "sawtooth"; o.frequency.value = 220;
    o.frequency.exponentialRampToValueAtTime(60, t + 0.4);
    const g = AC.createGain();
    g.gain.setValueAtTime(0.05, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
    o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + 0.42);
  } catch {}
}

/* Convertit une position (0..TOTAL) en type et libellé courant */
function segmentAt(pos) {
  let acc = 0;
  for (const s of SEGMENTS) {
    if (pos >= acc && pos < acc + s.dur) return { ...s, start: acc };
    acc += s.dur;
  }
  return SEGMENTS[SEGMENTS.length - 1];
}

export function CassetteGame({ onClose, onWin }) {
  const [pos, setPos] = useState(0);         // position de lecture 0..TOTAL, boucle
  const [attempts, setAttempts] = useState(0);
  const [verdict, setVerdict] = useState(null); // "top", "trop tot", "trop tard", null
  const [won, setWon] = useState(false);
  const raf = useRef(null);
  const lastT = useRef(null);

  useEffect(() => {
    if (won) return;
    lastT.current = performance.now();
    const tick = (t) => {
      const dt = (t - (lastT.current || t)) / 1000;
      lastT.current = t;
      setPos((p) => (p + dt * 0.6) % TOTAL); // vitesse : ~ un cycle complet en 14 s
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [won]);

  useEffect(() => { if (won) onWin?.(); }, [won]); // eslint-disable-line

  const seg = segmentAt(pos);
  const tubeSeg = SEGMENTS.find((s) => s.type === "tube");
  let tubeStart = 0; for (const s of SEGMENTS) { if (s.type === "tube") break; tubeStart += s.dur; }
  const tubeEnd = tubeStart + tubeSeg.dur;

  const presser = () => {
    if (won) return;
    playClack();
    setAttempts((n) => n + 1);
    /* fenêtre acceptable : les 0.5 premières secondes du tube (« pile au bon moment ») */
    if (pos >= tubeStart && pos < tubeStart + 0.55) {
      setVerdict("top");
      setTimeout(() => setWon(true), 700);
    } else if (pos < tubeStart) {
      setVerdict("trop_tot");
      playRate();
    } else if (pos > tubeStart + 0.55 && pos < tubeEnd) {
      setVerdict("trop_tard");
      playRate();
    } else {
      setVerdict("hors_zone");
      playRate();
    }
  };

  const cursorPct = (pos / TOTAL) * 100;
  const tubeStartPct = (tubeStart / TOTAL) * 100;
  const tubeEndPct = (tubeEnd / TOTAL) * 100;

  return (
    <div onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(4,8,14,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 70, backdropFilter: "blur(3px)" }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ background: "#17110a", border: "2px solid #c8963e66", borderRadius: 18, padding: 20, maxWidth: 560, width: "100%", maxHeight: "92vh", overflowY: "auto", boxShadow: "0 12px 48px rgba(0,0,0,0.6)", color: "#efe6d2", fontFamily: "Palatino, Georgia, serif" }}>
        <div style={{ textAlign: "center", fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#e0a848" }}>📼 CHAMBRE DE JULIEN · 17H · 1985</div>
        <h2 style={{ textAlign: "center", margin: "6px 0 4px", color: "#ffd166", fontSize: 21 }}>Enregistrer le tube sans le DJ !</h2>

        {!won ? (
          <>
            <p style={{ textAlign: "center", fontSize: 13, color: "#d8c9a8", margin: "0 0 12px" }}>
              Écoute la radio. Presse <strong>PLAY+REC</strong> PILE au moment où le tube commence — pas pendant que le DJ parle.
            </p>

            {/* la radio-cassette dessinée en gros au centre */}
            <svg viewBox="0 0 400 130" style={{ width: "100%", height: "auto", background: "#1a1006", borderRadius: 8, border: "2px solid #5a4028", marginBottom: 10 }}>
              {/* boîtier */}
              <rect x="20" y="20" width="360" height="90" rx="6" fill="#3a3830" stroke="#0a0806" strokeWidth="2" />
              <rect x="20" y="20" width="360" height="14" fill="#5a5850" />
              {/* haut-parleurs latéraux */}
              <circle cx="55" cy="70" r="22" fill="#0a0806" stroke="#6a6a6a" strokeWidth="1.4" />
              <circle cx="55" cy="70" r="16" fill="#2a2820" />
              {[6, 10, 14].map((r, i) => <circle key={i} cx="55" cy="70" r={r} fill="none" stroke="#5a5850" strokeWidth="0.5" />)}
              <circle cx="345" cy="70" r="22" fill="#0a0806" stroke="#6a6a6a" strokeWidth="1.4" />
              <circle cx="345" cy="70" r="16" fill="#2a2820" />
              {[6, 10, 14].map((r, i) => <circle key={i} cx="345" cy="70" r={r} fill="none" stroke="#5a5850" strokeWidth="0.5" />)}
              {/* deux platines */}
              <rect x="110" y="42" width="80" height="34" fill="#0a0806" stroke="#6a6a6a" strokeWidth="0.8" />
              <rect x="118" y="50" width="64" height="18" fill="#3a3a3a" />
              <circle cx="128" cy="59" r="4" fill="#8a8a8a" /><circle cx="172" cy="59" r="4" fill="#8a8a8a" />
              <rect x="210" y="42" width="80" height="34" fill="#0a0806" stroke="#c8963e" strokeWidth="0.8" />
              <rect x="218" y="50" width="64" height="18" fill={verdict === "top" ? "#e0a848" : "#3a3a3a"} />
              <circle cx="228" cy="59" r="4" fill={verdict === "top" ? "#f8b800" : "#8a8a8a"} />
              <circle cx="272" cy="59" r="4" fill={verdict === "top" ? "#f8b800" : "#8a8a8a"} />
              {/* LED REC */}
              <circle cx="278" cy="30" r="3" fill={verdict === "top" ? "#e83820" : "#3a1a10"}
                style={verdict === "top" ? { animation: "pulse 0.5s ease-in-out infinite" } : {}} />
              <text x="285" y="32" fontSize="7" fontFamily="ui-monospace,monospace" fontWeight="800" fill={verdict === "top" ? "#e83820" : "#5a3018"}>REC</text>
              {/* barre de boutons */}
              {[[124, 96, "⏮"], [148, 96, "⏹"], [172, 96, "▶"], [196, 96, "⏭"], [232, 96, "⏹"], [258, 96, "▶"], [284, 96, "⏺"]].map(([x, y, lbl], i) => (
                <g key={i}>
                  <rect x={x - 8} y={y - 6} width="16" height="12" fill={i === 6 ? "#c02010" : "#8a8a8a"} stroke="#3a3a3a" strokeWidth="0.4" rx="1" />
                  <text x={x} y={y + 2} textAnchor="middle" fontSize="7" fill="#fff">{lbl}</text>
                </g>
              ))}
              {/* antenne télescopique */}
              <path d="M370 20 L390 -18" stroke="#8a8a8a" strokeWidth="1.6" />
              <circle cx="390" cy="-18" r="2" fill="#8a8a8a" />
            </svg>

            {/* ce qu'on ENTEND en ce moment */}
            <div style={{ background: "#0e1420", border: "1px solid #2a3648", borderRadius: 8, padding: "10px 14px", minHeight: 46, marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontFamily: "ui-monospace,monospace", color: "#7a6a4a", letterSpacing: 1 }}>ON ENTEND :</div>
              <div style={{ fontSize: 13.5, color: seg.type === "tube" ? "#7fe0a8" : seg.type === "pub" ? "#c8a8e0" : "#c8b090", fontStyle: "italic", fontFamily: "Georgia,serif" }}>{seg.label}</div>
            </div>

            {/* timeline sans indices de position — le joueur doit se fier à ce qu'il entend */}
            <div style={{ position: "relative", height: 16, background: "#1a140a", border: "1px solid #5a4028", borderRadius: 4, overflow: "hidden", marginBottom: 8 }}>
              {/* fine ligne des segments (juste des séparations discrètes) */}
              {(() => { let acc = 0; const seps = []; for (let i = 0; i < SEGMENTS.length - 1; i++) { acc += SEGMENTS[i].dur; seps.push(<div key={i} style={{ position: "absolute", left: `${(acc / TOTAL) * 100}%`, top: 0, bottom: 0, width: 1, background: "#3a2818" }} />); } return seps; })()}
              {/* curseur de lecture qui défile */}
              <div style={{ position: "absolute", left: `${cursorPct}%`, top: 0, bottom: 0, width: 2, background: "#ffd166", transform: "translateX(-1px)" }} />
            </div>

            {/* verdict de la dernière tentative */}
            <div style={{ minHeight: 22, marginBottom: 8, textAlign: "center", fontSize: 12.5, fontStyle: "italic",
              color: verdict === "top" ? "#7fe0a8" : verdict ? "#e0a848" : "transparent" }}>
              {verdict === "top" && "✓ Pile au bon moment !"}
              {verdict === "trop_tot" && "Trop tôt — tu enregistres le DJ par-dessus le tube !"}
              {verdict === "trop_tard" && "Trop tard — début du tube raté."}
              {verdict === "hors_zone" && "Raté — le tube n'est même pas encore passé."}
              {!verdict && " "}
            </div>

            {/* Le gros bouton PLAY+REC */}
            <button onPointerDown={presser}
              style={{ width: "100%", background: "#e83820", color: "#fff", border: "2px solid #a02010", borderRadius: 10, padding: "18px", fontWeight: 800, cursor: "pointer", fontSize: 20, fontFamily: "ui-monospace,monospace", letterSpacing: 3 }}>
              ⏵ PLAY + ⏺ REC
            </button>
            <div style={{ fontSize: 10.5, textAlign: "center", color: "#a89878", marginTop: 6 }}>
              tentatives : {attempts} — reste calme, écoute bien
            </div>
          </>
        ) : (
          <div style={{ marginTop: 4 }}>
            <div style={{ background: "#0e1420", border: "1px solid #2a3648", borderRadius: 12, padding: "14px 16px" }}>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: "#e8eef5", margin: 0 }}>
                « Tu as attrapé le tube dès la première note. Cassette Philips en 1963, magnétoscope VHS en 1976 : pour la PREMIÈRE FOIS de l'Histoire, chaque foyer peut enregistrer chez soi ce qui passe à la radio ou à la télé — puis copier, prêter, échanger. L'industrie du disque crie déjà au « piratage » (le débat Napster de la fin des années 90 commence là). Attention : la bande se démagnétise, se casse, s'aimante. Des archives entières de radio et de télé ont été perdues. Un support qui EXISTE ne garantit pas la SURVIE du message. » — MARTINE
              </p>
            </div>
            <p style={{ textAlign: "center", margin: "12px 0 0", color: "#7fe0a8", fontSize: 13, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              ✓ Tube enregistré — Julien te fait un high-five !
            </p>
            <button onClick={onClose}
              style={{ marginTop: 10, width: "100%", background: "#e0a848", color: "#1a1206", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: "pointer", fontSize: 15, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              Continuer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
