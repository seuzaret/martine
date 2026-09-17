/* ============================================================
   JEU 3 — SCÈNE : « Salle des Archives » (A-01)
   ------------------------------------------------------------
   Placeholder pour la PR J3-A. Ici on cherchera plus tard des
   traces d'Al3x1a effacée des registres (fil rouge du jeu 3).
   Pour l'instant : décor + bouton retour.
   ============================================================ */
export default function BunkerArchives({ onGo }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <svg viewBox="0 0 800 460" style={{ display: "block", width: "100%", height: "auto", maxHeight: "56vh" }}>
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
        <rect width="800" height="460" fill="url(#ar-wall)" />
        <rect x="0" y="0" width="800" height="60" fill="#0a0e14" />
        <rect x="200" y="20" width="400" height="10" rx="2" fill="#e8eef5" opacity="0.55" />
        <rect x="0" y="380" width="800" height="80" fill="#050810" />
        {/* Rangées d'étagères de dossiers, perspective */}
        {[[80, 100, 220], [280, 120, 260], [520, 100, 220]].map(([x, y, h], i) => (
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
        <g transform="translate(360,240)">
          <circle cx="40" cy="60" r="70" fill="url(#ar-terminal)" />
          <rect x="0" y="0" width="80" height="70" fill="#141c26" stroke="#5eff9e" strokeWidth="2" />
          <rect x="4" y="4" width="72" height="52" fill="#0a1a10" />
          <text x="40" y="20" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="6" fill="#5eff9e">RECHERCHE</text>
          <text x="40" y="34" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="5" fill="#5eff9e">◆ ◆ ◆ ◆ ◆</text>
          <text x="40" y="46" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="5" fill="#5eff9e">_____________</text>
          {/* Clavier */}
          <rect x="0" y="72" width="80" height="20" fill="#28303a" stroke="#0a0e14" strokeWidth="1" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect key={i} x={4 + i * 9} y={76} width="7" height="4" fill="#5a6270" />
          ))}
        </g>
      </svg>
      <div style={{ maxWidth: 700, textAlign: "center" }}>
        <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "#8fa3bd", margin: 0, fontStyle: "italic" }}>
          « Salle des Archives. Chaque habitant qui a vécu ici est fiché quelque part. Reviens quand tu sauras qui chercher. »
        </p>
        <p style={{ fontSize: 11.5, lineHeight: 1.4, color: "#5a7098", margin: "10px 0 0", fontFamily: "ui-monospace,monospace" }}>
          (Placeholder — recherche dans les fichiers à venir dans une PR future)
        </p>
        <div style={{ marginTop: 14 }}>
          <button onClick={() => onGo("hub")}
            style={{ background: "#141b26", color: "#7fd8ff", border: "1px solid #3a80c8", borderRadius: 10, padding: "10px 22px", fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
            ← Retour au couloir
          </button>
        </div>
      </div>
    </div>
  );
}
