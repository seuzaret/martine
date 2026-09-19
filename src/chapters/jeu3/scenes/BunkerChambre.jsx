import { useState } from "react";

/* ============================================================
   JEU 3 — SCÈNE : « Ma chambre » (N-27) — MISSION OSINT
   ------------------------------------------------------------
   Après avoir résolu la mission Kova, un vieux carnet noir
   apparaît sur l'étagère. Cliquer dessus ouvre la mission :
   trois affirmations à vérifier VRAIMENT sur internet (moteur
   de recherche ou encyclopédie), puis coche Vrai/Faux pour
   chacune. Toutes bonnes → flag posé + explications. Mauvaises
   → message d'échec, réessayer.
   ============================================================ */
export default function BunkerChambre({ onGo, j3 }) {
  const mission = j3.missions.carnet;
  const unlocked = !!j3.flags[mission?.prerequisite];
  const done = !!j3.flags[mission?.flag];
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState({}); // { q1: true, q2: false, ... }
  const [checked, setChecked] = useState(false);
  const allAnswered = mission ? mission.questions.every((q) => typeof answers[q.id] === "boolean") : false;
  const allCorrect = mission ? mission.questions.every((q) => answers[q.id] === q.vrai) : false;

  const submit = () => {
    setChecked(true);
    if (allCorrect) j3.setFlag(mission.flag);
  };
  const retry = () => { setChecked(false); setAnswers({}); };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <svg viewBox="0 0 800 380" style={{ display: "block", width: "100%", height: "auto", maxHeight: "70vh" }}>
        <defs>
          <linearGradient id="bc-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2f38" />
            <stop offset="100%" stopColor="#141820" />
          </linearGradient>
        </defs>
        <rect width="800" height="380" fill="url(#bc-wall)" />
        <rect x="0" y="0" width="800" height="50" fill="#1a1e26" />
        <rect x="260" y="16" width="280" height="12" rx="3" fill="#e8eef5" opacity="0.85" />
        <rect x="0" y="310" width="800" height="70" fill="#0e1218" />
        {/* Lit */}
        <g transform="translate(150,240)">
          <rect x="0" y="0" width="260" height="70" fill="#3a4048" stroke="#0a0e14" strokeWidth="2" />
          <path d="M4 6 Q60 -4 130 8 Q200 20 256 6 L256 40 Q200 48 130 40 Q60 34 4 40 Z" fill="#5a6270" />
          <rect x="6" y="4" width="60" height="22" rx="4" fill="#8a9098" />
        </g>
        {/* Étagère — avec un vieux carnet noir cliquable si mission débloquée */}
        <g transform="translate(60,190)">
          <rect x="0" y="0" width="80" height="4" fill="#3a4048" />
          <rect x="0" y="60" width="80" height="4" fill="#3a4048" />
          <rect x="6" y="-30" width="8" height="30" fill="#5a3818" />
          <rect x="18" y="-24" width="8" height="24" fill="#8a3820" />
          <rect x="52" y="-20" width="20" height="20" fill="#c8b090" />
          {/* Le carnet noir (n'apparaît que si mission Kova faite et pas encore complétée) */}
          {unlocked && !done && !open && (
            <g transform="translate(28,30)" onClick={() => setOpen(true)} style={{ cursor: "pointer" }}>
              <circle cx="14" cy="12" r="26" fill="none" stroke="#e0a848" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="r" values="22;28;22" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <rect x="0" y="0" width="28" height="24" fill="#0a0806" stroke="#8a5030" strokeWidth="1.2" />
              <path d="M4 4 L24 4 M4 8 L20 8 M4 12 L22 12" stroke="#e8dfc8" strokeWidth="0.5" opacity="0.6" />
              <text x="14" y="-6" textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize="9" fill="#e0a848" fontStyle="italic">carnet noir</text>
            </g>
          )}
          {done && (
            <g transform="translate(28,30)">
              <rect x="0" y="0" width="28" height="24" fill="#0a0806" stroke="#5eff9e" strokeWidth="1" />
              <path d="M4 4 L24 4 M4 8 L20 8 M4 12 L22 12" stroke="#e8dfc8" strokeWidth="0.5" opacity="0.6" />
            </g>
          )}
        </g>
        {/* Grand panneau d'affichage mural (écran officiel du bunker) */}
        <g transform="translate(500,90)">
          <rect x="0" y="0" width="220" height="130" fill="#0e1a30" stroke="#5eff9e" strokeWidth="2" />
          <text x="110" y="22" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fill="#5eff9e" letterSpacing="2">◈ RÉSEAU M</text>
          <text x="110" y="46" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill="#c8d4e2">Bienvenue, HABITANT N-27.</text>
          <text x="110" y="62" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill="#c8d4e2">Niveau 4 · Secteur H</text>
          <text x="110" y="88" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#7a879e">Rappel : la surface est</text>
          <text x="110" y="100" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#7a879e">encore inhabitable.</text>
          <text x="110" y="122" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7" fill="#5eff9e" letterSpacing="1">— MARTINE, Réseau M —</text>
        </g>
      </svg>

      {/* Panneau bas selon l'état de la mission carnet */}
      <div style={{ maxWidth: 800, width: "100%" }}>
        {done ? (
          <div style={{ background: "#0e2818", border: "1px solid #5eff9e", borderRadius: 10, padding: "12px 16px" }}>
            <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#5eff9e" }}>
              ✓ CARNET VÉRIFIÉ
            </div>
            <p style={{ margin: "6px 0 0", fontSize: 13.5, lineHeight: 1.55, color: "#e8eef5" }}>{mission.succes}</p>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 4 }}>
              {mission.questions.map((q) => (
                <div key={q.id} style={{ fontSize: 12, color: "#c8d4e2", lineHeight: 1.5 }}>
                  <strong style={{ color: q.vrai ? "#5eff9e" : "#e0a848" }}>{q.vrai ? "VRAI" : "FAUX"}</strong>
                  {" — "}{q.explication}
                </div>
              ))}
            </div>
          </div>
        ) : open ? (
          <div style={{ background: "#141020", border: "1px solid #e0a848", borderRadius: 10, padding: "12px 16px" }}>
            <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#e0a848" }}>
              📓 {mission.titre.toUpperCase()}
            </div>
            <p style={{ margin: "4px 0 10px", fontSize: 13, lineHeight: 1.5, color: "#c8d4e2" }}>{mission.briefing}</p>
            {/* Questions */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {mission.questions.map((q, i) => {
                const val = answers[q.id];
                const wrongAfterCheck = checked && val !== q.vrai;
                return (
                  <div key={q.id} style={{ background: "#0a0e14", border: `1px solid ${wrongAfterCheck ? "#e0a848" : "#2a3648"}`, borderRadius: 8, padding: "8px 12px" }}>
                    <div style={{ fontSize: 13, color: "#e8eef5", lineHeight: 1.4 }}>
                      <strong style={{ color: "#e0a848", fontFamily: "ui-monospace,monospace", fontSize: 11 }}>{i + 1}.</strong>{" "}{q.prompt}
                    </div>
                    <div style={{ fontSize: 11, color: "#7a879e", fontStyle: "italic", marginTop: 3 }}>💡 {q.indice}</div>
                    <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                      {[true, false].map((b) => (
                        <button key={String(b)} onClick={() => setAnswers((a) => ({ ...a, [q.id]: b }))}
                          disabled={checked}
                          style={{
                            background: val === b ? (b ? "#0e3a1a" : "#3a1a0e") : "#141b26",
                            color: val === b ? (b ? "#5eff9e" : "#e0a848") : "#8fa3bd",
                            border: `1px solid ${val === b ? (b ? "#5eff9e" : "#e0a848") : "#3a4048"}`,
                            borderRadius: 6, padding: "5px 14px", fontSize: 12, fontWeight: 700,
                            cursor: checked ? "default" : "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: 1,
                          }}>
                          {b ? "VRAI" : "FAUX"}
                        </button>
                      ))}
                      {checked && val !== q.vrai && (
                        <span style={{ fontSize: 11, color: "#e0a848", alignSelf: "center", fontStyle: "italic" }}>
                          → à revérifier
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Bouton valider ou réessayer */}
            <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
              {!checked ? (
                <button onClick={submit} disabled={!allAnswered}
                  style={{ background: allAnswered ? "#e0a848" : "#3a3020", color: "#0a0806", border: "none", borderRadius: 8, padding: "8px 20px", fontSize: 13, fontWeight: 800, cursor: allAnswered ? "pointer" : "default", fontFamily: "ui-monospace,monospace", letterSpacing: 2 }}>
                  ✓ VALIDER MES RÉPONSES
                </button>
              ) : allCorrect ? null : (
                <>
                  <span style={{ fontSize: 12, color: "#e0a848", fontStyle: "italic" }}>{mission.echec}</span>
                  <button onClick={retry}
                    style={{ background: "#141b26", color: "#e0a848", border: "1px solid #5a4028", borderRadius: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
                    ↺ Réessayer
                  </button>
                </>
              )}
            </div>
          </div>
        ) : unlocked ? (
          <div style={{ background: "#141020", border: "1px dashed #e0a848", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: 12.5, color: "#c8b090", fontStyle: "italic" }}>
              Un vieux carnet noir a été laissé sur ton étagère. Clique dessus pour l'ouvrir.
            </p>
          </div>
        ) : (
          <div style={{ background: "#0a0e14", border: "1px dashed #3a4048", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: 12.5, color: "#7a879e", fontStyle: "italic" }}>
              Rien de familier ici. Un panneau signé « MARTINE, Réseau M » diffuse en boucle qu'il est interdit de sortir.
            </p>
          </div>
        )}
      </div>

      <button onClick={() => onGo(j3.hubRoom || "hub")}
        style={{ background: "#141b26", color: "#7fd8ff", border: "1px solid #3a80c8", borderRadius: 10, padding: "9px 20px", fontWeight: 700, cursor: "pointer", fontSize: 12.5, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
        ← Retour au couloir
      </button>
    </div>
  );
}
