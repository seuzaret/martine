/* ============================================================
   FIN DU JEU 2 — retour au futur avec le remède
   ------------------------------------------------------------
   Écran statique de conclusion : Elias et Mira accueillent le
   joueur avec Al3x1A, le remède est administré, la mémoire des
   survivants revient. Teaser du jeu 3 : « Le Discernement ».
   ============================================================ */

export default function FinJeu2({ prenom, remede, onRetour }) {
  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 50% 30%, #14233a 0%, #080d16 70%)", padding: 20, fontFamily: "Palatino, Georgia, serif", color: "#e8eef5" }}>
      <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 58, marginTop: 18 }}>🌀</div>
        <div style={{ fontFamily: "ui-monospace,monospace", color: "#7fd8ff", letterSpacing: 3, fontSize: 12, marginTop: 6 }}>JEU 2 · AL3X1A</div>
        <h1 style={{ fontFamily: "ui-monospace,monospace", color: "#7fd8ff", letterSpacing: 3, fontSize: 24, marginTop: 8 }}>RETOUR À LA STATION</h1>

        <div style={{ background: "#101827", border: "1px solid #2a3648", borderRadius: 12, padding: "16px 20px", marginTop: 18, textAlign: "left" }}>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "#e8eef5", margin: 0 }}>
            La MARTINE atterrit sur la plateforme, Al3x1A à côté de toi{prenom ? `, ${prenom}` : ""}. Elias arrive en courant, incrédule. Mira sort son écran, teste le remède, remonte les yeux vers toi et sourit — le premier sourire vrai depuis longtemps.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "#e8eef5", margin: "12px 0 0" }}>
            « Ça marche, » dit Mira. « Ça marche vraiment. »
          </p>
        </div>

        {/* Remède ramené */}
        {remede && (
          <div style={{ background: "#0e1420", border: "2px solid #7fd8ff", borderRadius: 12, padding: "16px 20px", marginTop: 14, display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ fontSize: 44 }}>{remede.emoji}</div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 10, letterSpacing: 2, color: "#7fd8ff" }}>REMÈDE ADMINISTRÉ</div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{remede.name}</div>
              <div style={{ fontSize: 12, color: "#c8d4e2", opacity: 0.85, marginTop: 3 }}>{remede.desc}</div>
            </div>
          </div>
        )}

        {/* Teaser du JEU 3 */}
        <div style={{ border: "2px dashed #a04ce8", borderRadius: 12, padding: "18px 20px", marginTop: 18, background: "radial-gradient(ellipse at 50% 50%, rgba(160,76,232,0.08), transparent)" }}>
          <div style={{ fontSize: 38, marginBottom: 6 }}>🌀</div>
          <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 3, color: "#a04ce8", marginBottom: 4 }}>À BIENTÔT DANS LES FILS DU TEMPS</div>
          <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 22, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", background: "linear-gradient(100deg, #a04ce8 0%, #7fd8ff 60%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", lineHeight: 1.2 }}>
            Le Discernement
          </div>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#c8d4e2", margin: "10px auto 0", maxWidth: 420, fontStyle: "italic" }}>
            La mémoire revient, mais un autre problème guette : plus personne ne sait distinguer le vrai du faux dans le monde qui se rebâtit. Bientôt, ta prochaine mission…
          </p>
        </div>

        <div style={{ marginTop: 24, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <button onClick={onRetour}
            style={{ background: "#141b26", color: "#c8d4e2", border: "1px solid #2a3648", borderRadius: 10, padding: "12px 24px", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
            ← Retour au menu
          </button>
        </div>
      </div>
    </div>
  );
}
