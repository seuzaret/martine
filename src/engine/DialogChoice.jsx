import { useState } from "react";

/* ============================================================
   MOTEUR — Dialogue à choix (micro-interaction).
   ------------------------------------------------------------
   Une bulle du PNJ + 2-4 boutons de réponse. Après clic sur un
   choix, le PNJ répond (réplique retour), puis un bouton
   "Suite" appelle onDone(choiceId). Réutilisable pour Al3x1a,
   MARTINE, ou tout PNJ qui parle au joueur.
   Props :
     speaker  — libellé au-dessus de la bulle (ex: "AL3X1A")
     portrait — composant React (fonction) qui rend un portrait
                 dans une boîte 150x180. Reçoit prop mood.
     accent   — couleur de la bordure/lettrage (défaut #7fd8ff)
     prompt   — texte du PNJ (le "{prenom}" est remplacé)
     choices  — [{ id, label, response, mood? }] 2-4 items
     prenom   — pour la substitution
     onDone   — (choiceId) => void
   ============================================================ */
export default function DialogChoice({
  speaker, portrait: Portrait, accent = "#7fd8ff",
  prompt, choices, prenom, onDone,
}) {
  const [picked, setPicked] = useState(null);
  const chosen = picked !== null ? choices.find((c) => c.id === picked) : null;
  const fill = (s) => (s || "").replace(/\{prenom\}/g, prenom || "chronaute");

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(4,8,16,0.95)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 95 }}>
      <div style={{ maxWidth: 640, width: "100%", background: "#0e1420", border: `3px solid ${accent}`, borderRadius: 16, padding: 20, boxShadow: `0 12px 48px rgba(0,0,0,0.75), 0 0 40px ${accent}55`, animation: "fadein 0.35s ease-out" }}>
        <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 3, color: accent, textAlign: "center", marginBottom: 10 }}>
          💬 DIALOGUE
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{ width: 150, height: 180, flex: "0 0 auto", borderRadius: 12, overflow: "hidden", border: `2px solid ${accent}`, boxShadow: "0 6px 22px rgba(0,0,0,0.6)" }}>
            <Portrait mood={chosen?.mood || "neutre"} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 12, letterSpacing: 2, color: accent, marginBottom: 8 }}>{speaker}</div>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: "#e8eef5", margin: 0 }}>
              « {fill(chosen ? chosen.response : prompt)} »
            </p>

            {!chosen ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
                {choices.map((c) => (
                  <button key={c.id} onClick={() => setPicked(c.id)}
                    style={{ background: "#141b26", color: "#e8eef5", border: "1px solid #2a3648", borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: "Palatino, Georgia, serif", textAlign: "left", cursor: "pointer", transition: "border-color .15s, background .15s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.background = "#1a2536"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2a3648"; e.currentTarget.style.background = "#141b26"; }}>
                    ▸ {fill(c.label)}
                  </button>
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
                <button onClick={() => onDone(picked)}
                  style={{ background: accent, color: "#06110b", border: "none", borderRadius: 10, padding: "10px 22px", fontWeight: 800, cursor: "pointer", fontSize: 14, fontFamily: "ui-monospace,monospace", letterSpacing: 1.5 }}>
                  Suite ▸
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
