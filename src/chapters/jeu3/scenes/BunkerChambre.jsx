/* ============================================================
   JEU 3 — SCÈNE : « Ma chambre » (N-27)
   ------------------------------------------------------------
   La cellule d'habitation du joueur. Placeholder pour l'instant :
   même décor que le réveil, avec un panneau infos et un bouton
   pour retourner au couloir.
   ============================================================ */
export default function BunkerChambre({ onGo }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <svg viewBox="0 0 800 460" style={{ display: "block", width: "100%", height: "auto", maxHeight: "56vh" }}>
        <defs>
          <linearGradient id="bc-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2f38" />
            <stop offset="100%" stopColor="#141820" />
          </linearGradient>
        </defs>
        <rect width="800" height="460" fill="url(#bc-wall)" />
        <rect x="0" y="0" width="800" height="60" fill="#1a1e26" />
        <rect x="260" y="20" width="280" height="14" rx="3" fill="#e8eef5" opacity="0.85" />
        <rect x="0" y="380" width="800" height="80" fill="#0e1218" />
        {/* Lit */}
        <g transform="translate(150,300)">
          <rect x="0" y="0" width="260" height="80" fill="#3a4048" stroke="#0a0e14" strokeWidth="2" />
          <path d="M4 6 Q60 -4 130 8 Q200 20 256 6 L256 40 Q200 48 130 40 Q60 34 4 40 Z" fill="#5a6270" />
          <rect x="6" y="4" width="60" height="22" rx="4" fill="#8a9098" />
        </g>
        {/* Étagère */}
        <g transform="translate(60,240)">
          <rect x="0" y="0" width="80" height="4" fill="#3a4048" />
          <rect x="0" y="60" width="80" height="4" fill="#3a4048" />
          <rect x="6" y="-30" width="8" height="30" fill="#5a3818" />
          <rect x="18" y="-24" width="8" height="24" fill="#8a3820" />
          <rect x="52" y="-20" width="20" height="20" fill="#c8b090" />
        </g>
        {/* Grand panneau d'affichage mural (écran officiel du bunker) */}
        <g transform="translate(500,110)">
          <rect x="0" y="0" width="220" height="140" fill="#0e1a30" stroke="#5eff9e" strokeWidth="2" />
          <text x="110" y="24" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fill="#5eff9e" letterSpacing="2">◈ RÉSEAU M</text>
          <text x="110" y="52" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill="#c8d4e2">Bienvenue, HABITANT N-27.</text>
          <text x="110" y="68" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill="#c8d4e2">Niveau 4 · Secteur H</text>
          <text x="110" y="94" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#7a879e">Rappel : la surface est</text>
          <text x="110" y="106" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#7a879e">encore inhabitable.</text>
          <text x="110" y="128" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7" fill="#5eff9e" letterSpacing="1">— MARTINE, Réseau M —</text>
        </g>
      </svg>
      <div style={{ maxWidth: 700, textAlign: "center" }}>
        <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "#8fa3bd", margin: 0, fontStyle: "italic" }}>
          Rien de familier ici. Un panneau signé « MARTINE, Réseau M » diffuse en boucle qu'il est interdit de sortir. Tu ne te souviens pas d'avoir vécu ici — mais tous les objets sont à toi.
        </p>
        <div style={{ marginTop: 16 }}>
          <button onClick={() => onGo("hub")}
            style={{ background: "#141b26", color: "#7fd8ff", border: "1px solid #3a80c8", borderRadius: 10, padding: "10px 22px", fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
            ← Retour au couloir
          </button>
        </div>
      </div>
    </div>
  );
}
