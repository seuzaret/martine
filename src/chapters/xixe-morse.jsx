import { useState, useEffect, useRef } from "react";

/* ============================================================
   MINI-JEU : « Le télégraphe Morse » (taper un message en Morse)
   ------------------------------------------------------------
   Bureau du télégraphe, ligne Baltimore–Washington (1844). Le joueur
   transmet le message « OR » (la ruée vers l'or !) en points et traits,
   au manipulateur Morse, avec le vrai « bip » court/long du télégraphe.
   Leçon : le Morse est un CODE — points et traits — que l'émetteur et le
   récepteur doivent partager pour se comprendre.
   O = – – –    R = · – ·
   ============================================================ */

const LETTERS = [
  { ch: "O", morse: ["-", "-", "-"] },
  { ch: "R", morse: [".", "-", "."] },
];

/* un petit « bip » de télégraphe (WebAudio) : court pour le point,
   long pour le trait. Aucun fichier à charger. */
let AC = null;
function beep(long) {
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    if (AC.state === "suspended") AC.resume();
    const o = AC.createOscillator(), g = AC.createGain();
    o.type = "square"; o.frequency.value = 620;
    o.connect(g); g.connect(AC.destination);
    const t = AC.currentTime, d = long ? 0.26 : 0.09;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.16, t + 0.01);
    g.gain.setValueAtTime(0.16, t + d);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.03);
    o.start(t); o.stop(t + d + 0.05);
  } catch { /* audio indisponible : le jeu marche quand même */ }
}

export function MorseGame({ onClose, onWin }) {
  const [li, setLi] = useState(0);   // lettre courante
  const [si, setSi] = useState(0);   // symbole courant dans la lettre
  const [flash, setFlash] = useState(null);
  const [press, setPress] = useState(false);
  const [won, setWon] = useState(false);
  const downAt = useRef(0);

  useEffect(() => { if (won) onWin?.(); }, [won]); // eslint-disable-line react-hooks/exhaustive-deps

  /* saisir un symbole (point ou trait) */
  const input = (sym) => {
    if (won) return;
    beep(sym === "-");
    const attendu = LETTERS[li].morse[si];
    if (sym === attendu) {
      const nsi = si + 1;
      if (nsi >= LETTERS[li].morse.length) {
        const nli = li + 1;
        if (nli >= LETTERS.length) { setSi(nsi); setTimeout(() => setWon(true), 400); return; }
        setLi(nli); setSi(0);
      } else setSi(nsi);
      setFlash(null);
    } else {
      setFlash(`Raté ! Ce n'est pas le bon signal pour le « ${LETTERS[li].ch} ». On recommence cette lettre.`);
      setSi(0);
    }
  };

  /* le manipulateur : appui court = point, appui long = trait */
  const keyDown = () => { if (won) return; setPress(true); downAt.current = Date.now(); };
  const keyUp = () => { if (won || !press) return; setPress(false); input(Date.now() - downAt.current >= 250 ? "-" : "."); };

  const symDone = (l, s) => l < li || (l === li && s < si);

  return (
    <div onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(4,8,14,0.82)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 70, backdropFilter: "blur(3px)" }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ background: "#17110a", border: "2px solid #c8963e66", borderRadius: 18, padding: 20, maxWidth: 560, width: "100%", maxHeight: "92vh", overflowY: "auto", boxShadow: "0 12px 48px rgba(0,0,0,0.6)", color: "#efe6d2", fontFamily: "Palatino, Georgia, serif" }}>
        <div style={{ textAlign: "center", fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#e0a848" }}>📟 TÉLÉGRAPHE DU FAR WEST · POUR NEW YORK</div>
        <h2 style={{ textAlign: "center", margin: "6px 0 4px", color: "#ffd166", fontSize: 21 }}>Le message de Jessie : « OR »</h2>
        <p style={{ textAlign: "center", fontSize: 13, color: "#d8c9a8", margin: "0 0 14px" }}>
          Au télégraphe, chaque lettre est un CODE de points et de traits. Tape-les avec le manipulateur (appui bref = point ·, appui long = trait —), ou avec les deux boutons.
        </p>

        {!won ? (
          <>
            {/* le message à taper, lettre par lettre, avec sa progression */}
            <div style={{ display: "flex", justifyContent: "center", gap: 26, marginBottom: 14 }}>
              {LETTERS.map((L, l) => (
                <div key={l} style={{ textAlign: "center", padding: "8px 14px", borderRadius: 10, background: l === li ? "#2a2013" : "transparent", border: l === li ? "1px solid #c8963e" : "1px solid transparent" }}>
                  <div style={{ fontSize: 30, fontWeight: 800, color: l < li ? "#5eff9e" : l === li ? "#ffd166" : "#8a7c60", fontFamily: "'Cinzel',Georgia,serif" }}>{L.ch}</div>
                  <div style={{ display: "flex", gap: 5, justifyContent: "center", marginTop: 4 }}>
                    {L.morse.map((m, s) => (
                      <span key={s} style={{
                        display: "inline-block", width: m === "-" ? 22 : 11, height: 11, borderRadius: 6,
                        background: symDone(l, s) ? "#5eff9e" : (l === li && s === si ? "#ffd166" : "#4a4030"),
                        boxShadow: l === li && s === si ? "0 0 8px #ffd166" : "none",
                      }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p style={{ minHeight: 18, textAlign: "center", color: "#e0a848", fontSize: 12.5, fontStyle: "italic", margin: "0 0 8px" }}>{flash}</p>

            {/* LE MANIPULATEUR MORSE (appui bref/long) */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <svg viewBox="0 0 200 90" style={{ width: 200, height: 90, cursor: "pointer", userSelect: "none" }}
                onPointerDown={keyDown} onPointerUp={keyUp} onPointerLeave={() => press && keyUp()}>
                <rect x="20" y="62" width="160" height="16" rx="4" fill="#3a2a1a" />
                <rect x="30" y="52" width="24" height="12" rx="2" fill="#7a5a2a" />
                {/* le bras du manipulateur, qui s'abaisse à l'appui */}
                <g transform={`translate(120,${press ? 50 : 44}) rotate(${press ? 4 : 0})`} style={{ transition: "transform .05s" }}>
                  <rect x="-84" y="-5" width="104" height="10" rx="5" fill="#b8b0a0" stroke="#8a8272" strokeWidth="1.5" />
                  <circle cx="18" cy="0" r="12" fill={press ? "#e0a848" : "#c8963e"} stroke="#8a5a1e" strokeWidth="2" />
                  <circle cx="-70" cy="0" r="4" fill="#5a4a3a" />
                </g>
                <circle cx="150" cy="62" r="4" fill={press ? "#ffe08a" : "#5a4a3a"} style={{ filter: press ? "drop-shadow(0 0 6px #ffe08a)" : "none" }} />
              </svg>
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={() => input(".")}
                style={{ width: 90, height: 54, borderRadius: 12, cursor: "pointer", border: "2px solid #8a7c60", background: "#241c12", color: "#ffd166", fontSize: 26, fontWeight: 800 }}>·<div style={{ fontSize: 10, fontFamily: "ui-monospace,monospace" }}>point</div></button>
              <button onClick={() => input("-")}
                style={{ width: 90, height: 54, borderRadius: 12, cursor: "pointer", border: "2px solid #8a7c60", background: "#241c12", color: "#ffd166", fontSize: 22, fontWeight: 800 }}>—<div style={{ fontSize: 10, fontFamily: "ui-monospace,monospace" }}>trait</div></button>
            </div>
          </>
        ) : (
          <div style={{ marginTop: 4 }}>
            <div style={{ background: "#0e1420", border: "1px solid #2a3648", borderRadius: 12, padding: "14px 16px" }}>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: "#e8eef5", margin: 0 }}>
                « · – · — bip ! — À New York, l'aiguille du récepteur a tremblé exactement dans le même ordre : O… R… « OR » ! La famille de Jessie va exulter. Le message a traversé le pays en une SECONDE, là où une diligence mettait des semaines. Voilà la magie de l'électricité et d'un CODE partagé : sans le même code des deux côtés, ces bips ne voudraient rien dire. » — MARTINE
              </p>
            </div>
            <p style={{ textAlign: "center", margin: "12px 0 0", color: "#7fe0a8", fontSize: 13, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              ✓ Message « OR » transmis à New York !
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
