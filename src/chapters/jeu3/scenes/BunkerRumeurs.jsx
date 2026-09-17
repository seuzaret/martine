/* ============================================================
   JEU 3 — SCÈNE : « Bureau des Rumeurs » (R-01)
   ------------------------------------------------------------
   Placeholder pour la PR J3-A. C'est ici que les missions de
   type B (vérification de sources / autorité / faisceau de
   preuves) vivront. Pour l'instant, une PNJ silhouettée dit
   qu'elle n'a rien à te dire, et un bouton de retour.
   ============================================================ */
export default function BunkerRumeurs({ onGo }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <svg viewBox="0 0 800 460" style={{ display: "block", width: "100%", height: "auto", maxHeight: "56vh" }}>
        <defs>
          <linearGradient id="br-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2418" />
            <stop offset="100%" stopColor="#141008" />
          </linearGradient>
        </defs>
        <rect width="800" height="460" fill="url(#br-wall)" />
        <rect x="0" y="0" width="800" height="60" fill="#1a1408" />
        <rect x="260" y="20" width="280" height="14" rx="3" fill="#e0a848" opacity="0.7" />
        <rect x="0" y="380" width="800" height="80" fill="#0e0a04" />
        {/* Comptoir en bois massif */}
        <g transform="translate(140,240)">
          <rect x="0" y="0" width="520" height="140" fill="#5a3818" stroke="#1a0e08" strokeWidth="2" />
          <path d="M0 0 L520 0" stroke="#8a5030" strokeWidth="3" />
          {/* Panonceaux "chuchotements" sur le comptoir */}
          {[80, 220, 360].map((x, i) => (
            <g key={i} transform={`translate(${x},20)`}>
              <rect x="0" y="0" width="80" height="40" fill="#e8dfc8" stroke="#5a4028" strokeWidth="1" transform="rotate(-3)" />
              <text x="40" y="18" textAnchor="middle" fontFamily="Palatino,Georgia,serif" fontSize="8" fill="#3a2010" transform="rotate(-3)">on dit que…</text>
              <text x="40" y="30" textAnchor="middle" fontFamily="Palatino,Georgia,serif" fontSize="7" fontStyle="italic" fill="#5a4028" transform="rotate(-3)">(à vérifier)</text>
            </g>
          ))}
        </g>
        {/* PNJ silhouettée derrière le comptoir */}
        <g transform="translate(400,180)">
          <ellipse cx="0" cy="60" rx="42" ry="22" fill="#1a1e26" />
          <ellipse cx="0" cy="20" rx="14" ry="16" fill="#3a2818" />
          <path d="M-12 8 q0 -14 6 -14 q6 2 6 -4 q4 6 8 -2 q4 4 4 12 z" fill="#1a0e08" />
        </g>
        {/* Étagère de dossiers */}
        <g transform="translate(60,120)">
          <rect x="0" y="0" width="60" height="6" fill="#3a2818" />
          {[0, 12, 24, 36].map((x) => (
            <rect key={x} x={x} y="-24" width="10" height="24" fill={["#8a3820", "#5a2818", "#8a5030", "#5a4028"][x / 12]} />
          ))}
          <rect x="0" y="60" width="60" height="6" fill="#3a2818" />
          {[0, 12, 24, 36, 48].map((x) => (
            <rect key={x} x={x} y="36" width="10" height="24" fill={["#5a4028", "#8a5030", "#5a2818", "#8a3820", "#5a4028"][x / 12]} />
          ))}
        </g>
      </svg>
      <div style={{ maxWidth: 700, textAlign: "center" }}>
        <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "#c8b090", margin: 0, fontStyle: "italic" }}>
          « Bureau des Rumeurs. C'est ici qu'on trie ce qu'on entend. Reviens quand tu auras une rumeur à vérifier. »
        </p>
        <p style={{ fontSize: 11.5, lineHeight: 1.4, color: "#8a7050", margin: "10px 0 0", fontFamily: "ui-monospace,monospace" }}>
          (Placeholder — mission de vérification à venir en PR J3-B)
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
