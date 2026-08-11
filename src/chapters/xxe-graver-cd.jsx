import { useState, useEffect } from "react";

/* ============================================================
   MINI-JEU : « Graver un CD-Rom » (Bureau, 1990)
   ------------------------------------------------------------
   Interface façon Windows 3.0 : fenêtre « Mon PC » à gauche
   avec des fichiers, fenêtre « CD-R (D:) 650 Mo » à droite.
   Il faut sélectionner un lot de fichiers qui rentre dans la
   capacité du CD (650 Mo) et lancer la gravure.
   Leçon EMI : la CAPACITÉ des supports change tout — la
   disquette faisait 1,44 Mo, le CD 650 Mo (450× plus), un
   disque dur d'aujourd'hui 4 000 000 Mo. Ce qui « tient » sur
   un support définit ce qu'on peut transmettre.
   ============================================================ */

const CAPA_MO = 650;

/* Une petite bibliothèque de fichiers 1990 crédibles.
   Tailles en méga-octets. */
const FILES = [
  { id: "autoexec", nom: "AUTOEXEC.BAT",       size: 0.001, icon: "⚙️" },
  { id: "doc",      nom: "Note_reunion.txt",   size: 0.008, icon: "📄" },
  { id: "rapport",  nom: "Rapport_final.doc",  size: 0.240, icon: "📝" },
  { id: "compta",   nom: "Comptabilite.xls",   size: 1.8,   icon: "📊" },
  { id: "photo",    nom: "Photo_Noel_89.bmp",  size: 2.4,   icon: "🖼️" },
  { id: "musique",  nom: "Musique_bureau.wav", size: 24,    icon: "🎵" },
  { id: "clients",  nom: "Base_clients.mdb",   size: 118,   icon: "💼" },
  { id: "jeu",      nom: "DOOM.exe",           size: 12,    icon: "🎮" },
  { id: "photos",   nom: "Photos_ete_1989.zip", size: 68,    icon: "📸" },
  { id: "backup",   nom: "Backup_projet_v3.zip", size: 380,  icon: "💾" },
  { id: "iso",      nom: "Windows95_beta.iso", size: 620,   icon: "💿" },
];

const fmtSize = (mo) => {
  if (mo < 1) return `${Math.round(mo * 1000)} Ko`;
  return `${mo.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} Mo`;
};

export function GraverCdGame({ onClose, onWin }) {
  const [selected, setSelected] = useState([]); // ids sélectionnés = dans le CD
  const [phase, setPhase] = useState("choix");  // "choix" → "grave" → "done"
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const total = FILES.filter((f) => selected.includes(f.id))
    .reduce((s, f) => s + f.size, 0);
  const pct = Math.min(100, (total / CAPA_MO) * 100);
  const trop = total > CAPA_MO;
  const vide = total === 0;

  const toggle = (id) => {
    if (phase !== "choix") return;
    setErrorMsg("");
    setSelected((v) => v.includes(id) ? v.filter((x) => x !== id) : [...v, id]);
  };

  const graver = () => {
    if (vide) { setErrorMsg("Ton CD est VIDE — sélectionne au moins un fichier."); return; }
    if (trop) { setErrorMsg("Ton CD est trop PLEIN ! Retire quelques fichiers."); return; }
    setPhase("grave");
  };

  /* animation de gravure : 3 secondes environ, puis fiche */
  useEffect(() => {
    if (phase !== "grave") return;
    const id = setInterval(() => setProgress((p) => {
      if (p >= 100) { clearInterval(id); setTimeout(() => setPhase("done"), 500); return 100; }
      return p + 3.5;
    }), 100);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => { if (phase === "done") onWin?.(); }, [phase]); // eslint-disable-line

  return (
    <div onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(4,8,14,0.88)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 70, backdropFilter: "blur(3px)" }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ background: "#c8c0b0", border: "3px solid #0a0a0a", boxShadow: "4px 4px 0 #0a0a0a, 8px 8px 24px rgba(0,0,0,0.6)", maxWidth: 720, width: "100%", maxHeight: "94vh", overflowY: "auto", color: "#0a0a0a", fontFamily: "'MS Sans Serif', 'Arial', sans-serif" }}>
        {/* Barre de titre Windows 3.0 */}
        <div style={{ background: "#0a3878", color: "#fff", padding: "4px 8px", display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 700, fontSize: 12 }}>
          <span>💿 Assistant de Gravure CD-Rom — Céline (1990)</span>
          <span style={{ background: "#c8c0b0", color: "#0a0a0a", padding: "0 6px", border: "1px solid #0a0a0a", cursor: "pointer" }} onClick={onClose}>×</span>
        </div>
        {/* Barre de menu */}
        <div style={{ background: "#c8c0b0", borderBottom: "1px solid #6a6a6a", padding: "2px 8px", fontSize: 11 }}>
          <span style={{ marginRight: 12 }}>Fichier</span>
          <span style={{ marginRight: 12 }}>Édition</span>
          <span style={{ marginRight: 12 }}>Affichage</span>
          <span>?</span>
        </div>

        <div style={{ padding: 12 }}>
          {phase === "choix" && (
            <>
              <p style={{ fontSize: 12.5, margin: "0 0 10px", background: "#fff", border: "1px inset #6a6a6a", padding: "6px 10px" }}>
                Sélectionne les fichiers à graver sur le CD-R (capacité <b>650 Mo</b>). Clique un fichier pour l'ajouter/le retirer.
              </p>

              {/* Les deux fenêtres côte à côte */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {/* MON PC (source) */}
                <div style={{ background: "#fff", border: "2px inset #6a6a6a" }}>
                  <div style={{ background: "#c8c0b0", padding: "3px 8px", borderBottom: "1px solid #6a6a6a", fontSize: 11, fontWeight: 700 }}>
                    🖥️ Mon PC — C:\
                  </div>
                  <div style={{ maxHeight: 260, overflowY: "auto" }}>
                    {FILES.filter((f) => !selected.includes(f.id)).map((f) => (
                      <div key={f.id} onClick={() => toggle(f.id)}
                        style={{ padding: "4px 8px", cursor: "pointer", display: "flex", justifyContent: "space-between", fontSize: 11.5, borderBottom: "1px dotted #c8c0b0" }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "#0a3878"}
                        onMouseLeave={(e) => e.currentTarget.style.background = ""}
                        onMouseDown={(e) => e.currentTarget.style.color = "#fff"}
                        onMouseUp={(e) => e.currentTarget.style.color = ""}>
                        <span>{f.icon} {f.nom}</span>
                        <span style={{ color: "#6a6a6a" }}>{fmtSize(f.size)}</span>
                      </div>
                    ))}
                    {FILES.length === selected.length && (
                      <div style={{ padding: 20, textAlign: "center", color: "#6a6a6a", fontSize: 11, fontStyle: "italic" }}>
                        (Dossier vide)
                      </div>
                    )}
                  </div>
                </div>

                {/* CD-R (cible) */}
                <div style={{ background: "#fff", border: "2px inset #6a6a6a" }}>
                  <div style={{ background: "#c8c0b0", padding: "3px 8px", borderBottom: "1px solid #6a6a6a", fontSize: 11, fontWeight: 700 }}>
                    💿 CD-R (D:) — Gravure en cours
                  </div>
                  <div style={{ maxHeight: 260, overflowY: "auto" }}>
                    {selected.length === 0 ? (
                      <div style={{ padding: 20, textAlign: "center", color: "#6a6a6a", fontSize: 11, fontStyle: "italic" }}>
                        (CD vide — sélectionne des fichiers à gauche)
                      </div>
                    ) : selected.map((id) => {
                      const f = FILES.find((x) => x.id === id);
                      return (
                        <div key={id} onClick={() => toggle(id)}
                          style={{ padding: "4px 8px", cursor: "pointer", display: "flex", justifyContent: "space-between", fontSize: 11.5, borderBottom: "1px dotted #c8c0b0" }}>
                          <span>{f.icon} {f.nom}</span>
                          <span style={{ color: "#6a6a6a" }}>{fmtSize(f.size)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Jauge de capacité */}
              <div style={{ marginTop: 10, background: "#fff", border: "2px inset #6a6a6a", padding: "6px 10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, marginBottom: 4 }}>
                  <span><b>Espace utilisé :</b> {fmtSize(total)}</span>
                  <span style={{ color: trop ? "#c00000" : "#0a0a0a" }}><b>Capacité :</b> {CAPA_MO} Mo</span>
                </div>
                <div style={{ height: 14, background: "#e8e0d0", border: "1px inset #6a6a6a", overflow: "hidden", position: "relative" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: trop ? "#c00000" : pct > 90 ? "#c88030" : "#0a70a0", transition: "width .2s ease" }} />
                  {trop && (
                    <div style={{ position: "absolute", top: 0, right: 4, bottom: 0, color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center" }}>DÉPASSEMENT !</div>
                  )}
                </div>
              </div>

              {errorMsg && (
                <div style={{ marginTop: 8, background: "#fff8d8", border: "2px inset #c8a848", padding: "6px 10px", fontSize: 12, color: "#804000" }}>
                  ⚠ {errorMsg}
                </div>
              )}

              {/* Boutons */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 6, marginTop: 12 }}>
                <button onClick={onClose}
                  style={{ background: "#c8c0b0", border: "2px outset #e8e0d0", padding: "5px 20px", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
                  Annuler
                </button>
                <button onClick={graver}
                  style={{ background: vide || trop ? "#a89880" : "#c8c0b0", border: "2px outset #e8e0d0", padding: "5px 24px", fontSize: 12, fontWeight: 700, cursor: vide || trop ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
                  🔥 Graver
                </button>
              </div>
            </>
          )}

          {phase === "grave" && (
            <div style={{ padding: "40px 20px" }}>
              <div style={{ background: "#fff", border: "2px inset #6a6a6a", padding: 14 }}>
                <div style={{ fontSize: 13, marginBottom: 10 }}>
                  🔥 Gravure en cours de <b>{selected.length}</b> fichier{selected.length > 1 ? "s" : ""} sur CD-R (D:)…
                </div>
                <div style={{ height: 22, background: "#e8e0d0", border: "1px inset #6a6a6a", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${progress}%`, background: "#0a70a0", transition: "width .1s linear" }} />
                </div>
                <div style={{ fontSize: 11, marginTop: 6, color: "#5a5a5a", fontFamily: "ui-monospace,monospace" }}>
                  {progress < 30 ? "Vérification de la géométrie du disque…" :
                   progress < 60 ? "Écriture des pistes 1 à N…" :
                   progress < 90 ? "Finalisation de la session…" :
                   "Éjection…"}
                </div>
              </div>
            </div>
          )}

          {phase === "done" && (
            <div>
              <div style={{ background: "#fff", border: "2px inset #6a6a6a", padding: 14, marginBottom: 10 }}>
                <div style={{ fontSize: 14, marginBottom: 8, color: "#0a7010", fontWeight: 700 }}>
                  ✓ Gravure terminée avec succès !
                </div>
                <div style={{ fontSize: 12, marginBottom: 6 }}>
                  {selected.length} fichier{selected.length > 1 ? "s" : ""} · {fmtSize(total)} sur {CAPA_MO} Mo
                </div>
              </div>
              <div style={{ background: "#0e1420", border: "1px solid #2a3648", padding: "12px 14px", color: "#e8eef5", fontFamily: "Palatino, Georgia, serif", fontSize: 13.5, lineHeight: 1.6 }}>
                « Un CD-Rom peut contenir <b>650 Mo</b> — soit 450 fois une disquette 3½" (1,44 Mo), soit 200 000 pages de texte. En 1990, c'est vertigineux : on tient une petite bibliothèque dans un disque de 12 cm. On te le vend « inaltérable » — durera 100 ans, disent les fabricants. La réalité 30 ans plus tard : beaucoup de CD gravés dans les années 90 sont ILLISIBLES, la couche métallique s'oxyde et se décolle (la « maladie du disque »). La CAPACITÉ ne garantit rien sur la DURABILITÉ. On verra ce que la disquette de Julien nous réserve au prochain chapitre… » — MARTINE
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
                <button onClick={onClose}
                  style={{ background: "#c8c0b0", border: "2px outset #e8e0d0", padding: "5px 24px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  Continuer
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Barre d'état Windows 3.0 */}
        <div style={{ background: "#c8c0b0", borderTop: "1px solid #6a6a6a", padding: "3px 8px", fontSize: 10.5, display: "flex", justifyContent: "space-between", color: "#3a3a3a" }}>
          <span>Prêt</span>
          <span>{selected.length} fichier(s) — {fmtSize(total)}</span>
        </div>
      </div>
    </div>
  );
}
