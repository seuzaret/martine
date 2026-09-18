/* ============================================================
   JEU 3 — SCÈNE : « Salle des Archives » (A-01)
   ------------------------------------------------------------
   Après avoir résolu la mission Kova, un enregistrement corrompu
   apparaît dans la liste — cliquer dessus permet de lancer une
   mission de type A (Recherche dans le temps). Le voyage lui-même
   se fait dans une scène séparée (`BunkerVoyage`, room "voyage").
   ============================================================ */
export default function BunkerArchives({ onGo, j3 }) {
  const mission = j3.missions.appel;
  const unlocked = !!j3.flags[mission?.prerequisite];
  const done = !!j3.flags[mission?.flag];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      <svg viewBox="0 0 800 380" style={{ display: "block", width: "100%", height: "auto", maxHeight: "46vh" }}>
        <defs>
          <linearGradient id="ar-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a2028" />
            <stop offset="100%" stopColor="#050810" />
          </linearGradient>
          <radialGradient id="ar-terminal" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5eff9e" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#5eff9e" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="380" fill="url(#ar-wall)" />
        <rect x="0" y="0" width="800" height="50" fill="#0a0e14" />
        <rect x="200" y="16" width="400" height="10" rx="2" fill="#e8eef5" opacity="0.55" />
        <rect x="0" y="310" width="800" height="70" fill="#050810" />
        {/* Étagères d'archives */}
        {[[60, 80, 200], [260, 100, 220], [500, 80, 200]].map(([x, y, h], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <rect x="0" y="0" width="120" height={h} fill="#28303a" stroke="#0a0e14" strokeWidth="2" />
            {[0, 40, 80, 120, 160].filter((k) => k < h).map((k) => (
              <g key={k} transform={`translate(0,${k})`}>
                <rect x="6" y="6" width="14" height="28" fill="#8a3820" />
                <rect x="24" y="6" width="14" height="28" fill="#5a4028" />
                <rect x="42" y="6" width="14" height="28" fill="#3a2818" />
                <rect x="60" y="6" width="14" height="28" fill="#8a5030" />
                <rect x="78" y="6" width="14" height="28" fill="#5a2818" />
                <rect x="96" y="6" width="14" height="28" fill="#5a4028" />
              </g>
            ))}
          </g>
        ))}
        {/* Terminal d'archive au centre */}
        <g transform="translate(340,180)">
          <circle cx="60" cy="60" r="80" fill="url(#ar-terminal)" />
          <rect x="0" y="0" width="120" height="90" fill="#141c26" stroke="#5eff9e" strokeWidth="2" />
          <rect x="4" y="4" width="112" height="70" fill="#0a1a10" />
          <text x="60" y="20" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#5eff9e">CONSULTATION</text>
          <text x="60" y="34" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="6" fill="#5eff9e">◆ 12 042 entrées</text>
          {unlocked && !done && (
            <>
              <text x="60" y="50" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="6" fill="#e0a848">⚠ 1 record corrompu</text>
              <text x="60" y="62" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="5" fill="#e0a848">18/06/2087 · Vermet L.</text>
            </>
          )}
          {done && (
            <text x="60" y="52" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="6" fill="#5eff9e">✓ Record restauré</text>
          )}
          {/* Clavier */}
          <rect x="0" y="90" width="120" height="20" fill="#28303a" stroke="#0a0e14" strokeWidth="1" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect key={i} x={4 + i * 14} y={94} width="10" height="4" fill="#5a6270" />
          ))}
        </g>
      </svg>

      {/* Panneau bas : état de la mission A */}
      <div style={{ maxWidth: 800, width: "100%" }}>
        {done ? (
          <div style={{ background: "#0e2818", border: "1px solid #5eff9e", borderRadius: 10, padding: "12px 16px" }}>
            <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#5eff9e" }}>
              ✓ RECORD RESTAURÉ
            </div>
            <p style={{ margin: "6px 0 0", fontSize: 13.5, lineHeight: 1.55, color: "#e8eef5" }}>
              {mission.messageOriginal}
            </p>
            <p style={{ margin: "8px 0 0", fontSize: 12, color: "#8fa3bd", fontStyle: "italic" }}>
              {mission.succes}
            </p>
          </div>
        ) : unlocked ? (
          <div style={{ background: "#2a1408", border: "1px solid #e0a848", borderRadius: 10, padding: "12px 16px" }}>
            <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#e0a848" }}>
              ⚠ RECORD CORROMPU · {mission.dateCible}
            </div>
            <p style={{ margin: "4px 0 0", fontSize: 13.5, lineHeight: 1.5, color: "#c8d4e2" }}>
              {mission.briefing}
            </p>
            <button onClick={() => onGo("voyage")} autoFocus
              style={{ marginTop: 10, background: "#e0a848", color: "#0a0806", border: "none", borderRadius: 10, padding: "10px 22px", fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: 2 }}>
              ▶ ENQUÊTER (retour dans le temps)
            </button>
          </div>
        ) : (
          <div style={{ background: "#0a0e14", border: "1px dashed #3a4048", borderRadius: 10, padding: "12px 16px", textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: 12.5, color: "#7a879e", fontStyle: "italic" }}>
              Rien à consulter pour l'instant. Résous d'abord la mission des Rumeurs et reviens : un record corrompu pourrait apparaître.
            </p>
          </div>
        )}
      </div>

      <button onClick={() => onGo("hub")}
        style={{ background: "#141b26", color: "#7fd8ff", border: "1px solid #3a80c8", borderRadius: 10, padding: "9px 20px", fontWeight: 700, cursor: "pointer", fontSize: 12.5, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
        ← Retour au couloir
      </button>
    </div>
  );
}
