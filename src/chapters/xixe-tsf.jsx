import { useState, useEffect } from "react";

/* ============================================================
   MINI-JEU : « Sauver le Titanic ! » (choisir l'ANTENNE parmi plusieurs outils)
   ------------------------------------------------------------
   Nuit du 15 avril 1912. Depuis la cabine TSF de Marconi à TERRE, on
   entend les bips de détresse du Titanic qui coule dans l'Atlantique
   Nord. Pas de temps à perdre : parmi tous ces outils sur l'établi,
   lequel permet de faire filer un message DANS L'AIR — sans le
   moindre fil — jusqu'aux navires proches du naufrage ?
   Leçon : la TSF, ce sont les ONDES + l'ANTENNE (les autres outils —
   drapeaux, longue-vue, corne de brume, corde — ne portent qu'à vue
   ou à voix).
   ============================================================ */

const OUTILS = [
  { id: "antenne", nom: "Antenne", ok: true, emoji: "📡",
    svg: (<g><rect x="-2" y="10" width="4" height="34" fill="#8a8c92" /><path d="M0 10 L-14 -18 M0 10 L14 -18 M0 -4 L-8 -22 M0 -4 L8 -22" stroke="#8a8c92" strokeWidth="2.5" /><circle cx="0" cy="-22" r="3" fill="#ffe08a" /></g>),
    raison: "L'antenne lance et capte les ONDES INVISIBLES dans l'air, sans le moindre fil : elles franchissent la mer et l'horizon. C'est la TSF de Marconi." },
  { id: "drapeaux", nom: "Drapeaux", ok: false, emoji: "🚩",
    svg: (<g><path d="M-2 -22 v66" stroke="#3a2c1c" strokeWidth="2" /><path d="M-2 -22 L18 -16 L-2 -10 Z" fill="#c8382e" /><path d="M4 -22 v60" stroke="#3a2c1c" strokeWidth="2" transform="translate(6,0)" /><path d="M4 -22 L-16 -16 L4 -10 Z" fill="#2a6a9a" transform="translate(6,0)" /></g>),
    raison: "Des drapeaux, ça ne se voit qu'à vue d'œil. Dans la nuit noire de l'Atlantique, à des lieues de distance, personne ne les verrait." },
  { id: "longuevue", nom: "Longue-vue", ok: false, emoji: "🔭",
    svg: (<g><rect x="-24" y="-4" width="48" height="10" rx="3" fill="#3a2c1c" transform="rotate(-14)" /><circle cx="-22" cy="0" r="4" fill="#cfeaff" transform="rotate(-14)" /></g>),
    raison: "Une longue-vue sert à VOIR, pas à envoyer un message. Elle ne sauvera personne au fond de la nuit." },
  { id: "corne", nom: "Corne de brume", ok: false, emoji: "📣",
    svg: (<g><path d="M-14 4 L14 -10 L18 10 L-14 20 Z" fill="#6a4c2e" stroke="#3a2c1c" strokeWidth="1.4" /><path d="M-14 4 L-14 20" stroke="#3a2c1c" strokeWidth="2" /></g>),
    raison: "Un son porte à quelques centaines de mètres tout au plus. Le Titanic est à des centaines de kilomètres. Peine perdue." },
  { id: "corde", nom: "Corde & harpon", ok: false, emoji: "🪢",
    svg: (<g><path d="M-16 12 q-6 -20 12 -18 q18 2 12 20 q-6 12 -22 8" stroke="#8a6a3a" strokeWidth="6" fill="none" /><path d="M-16 12 q-6 -20 12 -18 q18 2 12 20 q-6 12 -22 8" stroke="#5a4020" strokeWidth="2" fill="none" opacity="0.6" /></g>),
    raison: "Une corde ne franchit pas l'océan. Il faudrait une invention qui ne tienne à AUCUN fil." },
];

/* affiche un outil (icône SVG dessinée à la main) */
function OutilCard({ o, onClick, disabled, verdict }) {
  const isWrong = verdict === o.id + ":no";
  const isRight = verdict === o.id + ":yes";
  return (
    <button onClick={onClick} disabled={disabled}
      title={o.nom}
      style={{
        width: 100, height: 100, borderRadius: 14, cursor: disabled ? "default" : "pointer",
        background: isRight ? "#0e2a1a" : isWrong ? "#2a0e10" : "#101827",
        border: `2px solid ${isRight ? "#5eff9e" : isWrong ? "#e8934a" : "#2a3648"}`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
        boxShadow: isRight ? "0 0 14px #5eff9e88" : "none", transition: "all .25s",
      }}>
      <svg viewBox="-32 -32 64 64" style={{ width: 46, height: 46 }}>{o.svg}</svg>
      <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, color: isRight ? "#5eff9e" : isWrong ? "#e8934a" : "#e8eef5" }}>{o.nom}</div>
    </button>
  );
}

export function TsfGame({ onClose, onWin }) {
  const [verdict, setVerdict] = useState(null); // "id:yes" ou "id:no"
  const [won, setWon] = useState(false);
  useEffect(() => { if (won) onWin?.(); }, [won]); // eslint-disable-line react-hooks/exhaustive-deps

  const tenter = (o) => {
    if (won) return;
    if (o.ok) { setVerdict(o.id + ":yes"); setTimeout(() => setWon(true), 850); }
    else setVerdict(o.id + ":no");
  };

  const outilVerdict = verdict && OUTILS.find((o) => verdict.startsWith(o.id + ":"));

  return (
    <div onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(4,8,14,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 70, backdropFilter: "blur(3px)" }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ background: "#0e1420", border: "2px solid #7fb0e066", borderRadius: 18, padding: 20, maxWidth: 640, width: "100%", maxHeight: "92vh", overflowY: "auto", boxShadow: "0 12px 48px rgba(0,0,0,0.6)", color: "#e8eef5", fontFamily: "Palatino, Georgia, serif" }}>
        <div style={{ textAlign: "center", fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#7fb0e0" }}>🌊 NUIT DU 15 AVRIL 1912 · STATION MARCONI</div>
        <h2 style={{ textAlign: "center", margin: "6px 0 4px", color: "#ffd166", fontSize: 21 }}>Un paquebot coule dans l'Atlantique !</h2>
        <p style={{ textAlign: "center", fontSize: 13.5, color: "#c8d4e2", margin: "0 0 14px", lineHeight: 1.55 }}>
          On entend ses bips de détresse. Parmi ces outils, lequel peut envoyer un message <strong>dans l'air, sans fil</strong>, jusqu'aux navires les plus proches — pour faire arriver les secours à temps ?
        </p>

        {!won ? (
          <>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 14 }}>
              {OUTILS.map((o) => (
                <OutilCard key={o.id} o={o} verdict={verdict} disabled={!!(verdict && verdict.endsWith(":yes"))}
                  onClick={() => tenter(o)} />
              ))}
            </div>
            <div style={{ minHeight: 60, background: outilVerdict ? "#101827" : "transparent", border: outilVerdict ? "1px solid #2a3648" : "none", borderRadius: 10, padding: outilVerdict ? "10px 14px" : 0 }}>
              {outilVerdict && (
                <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: verdict.endsWith(":no") ? "#e8934a" : "#c8e0b8", fontStyle: "italic" }}>
                  <strong>{verdict.endsWith(":no") ? "Bzzt, non : " : "OUI ! "}</strong>{outilVerdict.raison}
                </p>
              )}
            </div>
          </>
        ) : (
          <div>
            <div style={{ background: "#0e1a24", border: "1px solid #2a4648", borderRadius: 12, padding: "14px 16px" }}>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: "#e8eef5", margin: 0 }}>
                « L'antenne monte, l'étincelle claque, les ondes filent dans la nuit… Le RMS Carpathia capte les bips à 60 milles marins et met le cap sur le naufrage. Environ 700 personnes sauvées, dont beaucoup d'émigrants irlandais de 3ᵉ classe. Sans la TSF de Marconi, personne n'aurait jamais su à temps. Après le drame, une règle mondiale : les navires DOIVENT rester à l'écoute des ondes. Un simple message peut sauver des vies. » — MARTINE
              </p>
            </div>
            <p style={{ textAlign: "center", margin: "12px 0 0", color: "#7fe0a8", fontSize: 13, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              ✓ SOS transmis — le Carpathia arrive !
            </p>
            <button onClick={onClose}
              style={{ marginTop: 10, width: "100%", background: "#7fb0e0", color: "#06121e", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: "pointer", fontSize: 15, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              Continuer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
