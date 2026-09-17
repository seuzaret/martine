import { useState, useMemo } from "react";
import { PortraitAl3x1AVivant } from "../chapters/epilogue/RetrouvaillesAl3x1A.jsx";

/* ============================================================
   MOTEUR — Modale « téléphone » style messagerie type WhatsApp
   ------------------------------------------------------------
   S'ouvre quand le joueur clique sur le téléphone dans le sac.
   Reprend la logique du DialogChoice (message + choix + réponse)
   mais avec un visuel de conversation SMS.
   Props :
     message : { prompt, choices: [{id, label, response, mood?}] }
     prenom  : pour la substitution {prenom}
     onDone  : (choiceId) => void  — appelée après « Fermer »
   ============================================================ */
export default function PhoneMessage({ message, prenom, onDone }) {
  const [picked, setPicked] = useState(null);
  const choices = message.choices || [];
  const noChoice = choices.length === 0;
  const chosen = picked !== null ? choices.find((c) => c.id === picked) : null;
  const fill = (s) => (s || "").replace(/\{prenom\}/g, prenom || "chronaute");
  const hhmm = useMemo(() => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(4,8,16,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 95, backdropFilter: "blur(4px)" }}>
      <div style={{ width: 340, maxHeight: "90vh", background: "#0d1220", border: "6px solid #1a1f2e", borderRadius: 32, boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(127,216,255,0.3)", display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", animation: "fadein 0.35s ease-out" }}>

        {/* Barre statut du téléphone */}
        <div style={{ background: "#000", color: "#e8eef5", fontSize: 11, padding: "4px 16px", display: "flex", justifyContent: "space-between", fontFamily: "ui-monospace,monospace" }}>
          <span>{hhmm}</span>
          <span>▮▮▮▮ 100%</span>
        </div>

        {/* En-tête WhatsApp (vert teal) */}
        <div style={{ background: "#075e54", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", border: "1px solid rgba(255,255,255,0.3)", flex: "0 0 auto", background: "#fff" }}>
            <PortraitAl3x1AVivant mood={chosen?.mood || "neutre"} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Al3x1a</div>
            <div style={{ fontSize: 11, color: "#c8e6cf" }}>en ligne</div>
          </div>
        </div>

        {/* Fil de conversation (fond crème type WhatsApp) */}
        <div style={{ flex: 1, padding: 14, background: "#e5ddd5", overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, minHeight: 180 }}>
          {/* Bulle Al3x1a (gauche, blanche) */}
          <div style={{ alignSelf: "flex-start", maxWidth: "82%", background: "#ffffff", color: "#111b21", padding: "6px 10px 6px 12px", borderRadius: "8px 8px 8px 2px", fontSize: 14, lineHeight: 1.4, boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)" }}>
            {fill(message.prompt)}
            <div style={{ fontSize: 10, color: "#8696a0", marginTop: 2, textAlign: "right" }}>{hhmm}</div>
          </div>

          {chosen && (
            <>
              {/* Réponse joueur (droite, vert clair) */}
              <div style={{ alignSelf: "flex-end", maxWidth: "82%", background: "#d9fdd3", color: "#111b21", padding: "6px 10px 6px 12px", borderRadius: "8px 8px 2px 8px", fontSize: 14, lineHeight: 1.4, boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)" }}>
                {fill(chosen.label)}
                <div style={{ fontSize: 10, color: "#667781", marginTop: 2, textAlign: "right" }}>{hhmm} <span style={{ color: "#53bdeb" }}>✓✓</span></div>
              </div>
              {/* Bulle Al3x1a de retour (blanche) */}
              <div style={{ alignSelf: "flex-start", maxWidth: "82%", background: "#ffffff", color: "#111b21", padding: "6px 10px 6px 12px", borderRadius: "8px 8px 8px 2px", fontSize: 14, lineHeight: 1.4, boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)" }}>
                {fill(chosen.response)}
                <div style={{ fontSize: 10, color: "#8696a0", marginTop: 2, textAlign: "right" }}>{hhmm}</div>
              </div>
            </>
          )}
        </div>

        {/* Zone de saisie / choix — ou juste "Fermer" si aucun choix */}
        {noChoice ? (
          <div style={{ background: "#0a1020", padding: 10, borderTop: "1px solid #1a2536" }}>
            <button onClick={() => onDone(null)}
              style={{ width: "100%", background: "#7fd8ff", color: "#06110b", border: "none", borderRadius: 18, padding: "10px", fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              Fermer ✓
            </button>
          </div>
        ) : !chosen ? (
          <div style={{ background: "#0a1020", padding: 10, display: "flex", flexDirection: "column", gap: 6, borderTop: "1px solid #1a2536" }}>
            {choices.map((c) => (
              <button key={c.id} onClick={() => setPicked(c.id)}
                style={{ background: "#1a2536", color: "#e8eef5", border: "1px solid #2a3648", borderRadius: 18, padding: "8px 14px", fontSize: 13.5, textAlign: "left", cursor: "pointer", fontFamily: "inherit", transition: "background .15s, border-color .15s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#243046"; e.currentTarget.style.borderColor = "#7fd8ff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#1a2536"; e.currentTarget.style.borderColor = "#2a3648"; }}>
                ▸ {fill(c.label)}
              </button>
            ))}
          </div>
        ) : (
          <div style={{ background: "#0a1020", padding: 10, borderTop: "1px solid #1a2536" }}>
            <button onClick={() => onDone(picked)}
              style={{ width: "100%", background: "#7fd8ff", color: "#06110b", border: "none", borderRadius: 18, padding: "10px", fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              Fermer ✓
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
