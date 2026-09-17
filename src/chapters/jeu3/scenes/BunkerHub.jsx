/* ============================================================
   JEU 3 — SCÈNE : « Couloir central » (hub)
   ------------------------------------------------------------
   Le couloir principal du bunker : 7 portes cliquables réparties
   sur deux rangées, chacune étiquetée avec son code et son nom.
   Perspective vers le fond, néons au plafond, silhouette lointaine.
   ============================================================ */
const DOORS = [
  { id: "chambre",    code: "N-27", label: "Ma chambre",              color: "#5a4028" },
  { id: "rumeurs",    code: "R-01", label: "Bureau des Rumeurs",      color: "#3a2818" },
  { id: "archives",   code: "A-01", label: "Salle des Archives",      color: "#28303a" },
  { id: "cantine",    code: "C-01", label: "Cantine commune",         color: "#3a3a2a" },
  { id: "infirmerie", code: "I-01", label: "Infirmerie",              color: "#5a6270" },
  { id: "atelier",    code: "T-01", label: "Atelier des Ingénieurs",  color: "#5a4028" },
  { id: "chapelle",   code: "X-01", label: "Chapelle des Anciens",    color: "#3a2018" },
];

export default function BunkerHub({ onGo }) {
  /* Portes réparties : 4 en rangée haute (y=90), 3 en rangée basse (y=310).
     Largeur 120px, espacement uniforme. */
  const doorPos = (i) => {
    if (i < 4) return { x: 60 + i * 205, y: 90 };
    return { x: 160 + (i - 4) * 205, y: 310 };
  };
  return (
    <svg viewBox="0 0 900 550" style={{ display: "block", width: "100%", height: "auto", maxHeight: "66vh" }}>
      <defs>
        <linearGradient id="bh-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2f38" />
          <stop offset="100%" stopColor="#0e1218" />
        </linearGradient>
      </defs>
      {/* Fond mur + sol */}
      <rect width="900" height="550" fill="url(#bh-wall)" />
      <rect y="290" width="900" height="20" fill="#0a0e14" />
      {/* Tuyauteries au plafond */}
      <path d="M0 40 L900 40" stroke="#3a4048" strokeWidth="4" opacity="0.8" />
      <path d="M0 50 L900 50" stroke="#5a4028" strokeWidth="2.5" opacity="0.7" />
      {/* Néons entre les deux rangées */}
      {[120, 320, 520, 720].map((x, i) => (
        <g key={i}>
          <rect x={x - 6} y="270" width="12" height="4" fill="#e8eef5" opacity="0.7" />
          <rect x={x + 40} y="270" width="12" height="4" fill="#e8eef5" opacity="0.7" />
        </g>
      ))}

      {/* Les 7 portes */}
      {DOORS.map((door, i) => {
        const { x, y } = doorPos(i);
        return (
          <g key={door.id} transform={`translate(${x},${y})`}
            onClick={() => onGo(door.id)}
            style={{ cursor: "pointer" }}
            onMouseEnter={(e) => e.currentTarget.querySelector(".door-hover").setAttribute("opacity", "1")}
            onMouseLeave={(e) => e.currentTarget.querySelector(".door-hover").setAttribute("opacity", "0")}>
            <rect className="door-hover" x="-8" y="-8" width="136" height="196" fill="none" stroke="#7fd8ff" strokeWidth="2" opacity="0" />
            <rect x="0" y="0" width="120" height="180" fill={door.color} stroke="#0a0806" strokeWidth="3" />
            <rect x="4" y="4" width="112" height="172" fill={door.color} stroke="#0a0806" strokeWidth="1" opacity="0.6" />
            <circle cx="100" cy="90" r="4" fill="#c8a848" />
            <rect x="16" y="26" width="88" height="34" fill="#e8eef5" stroke="#3a2818" strokeWidth="1.5" />
            <text x="60" y="41" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="12" fill="#0a0806" fontWeight="700">{door.code}</text>
            <text x="60" y="54" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="6.5" fill="#5a4028">{door.label.toUpperCase()}</text>
            <circle cx="60" cy="72" r="3" fill="#5eff9e">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}

      {/* Sous-titre */}
      <text x="450" y="535" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fill="#5a6678" letterSpacing="2">
        NIVEAU 4 · SECTEUR HABITAT · CLIQUE UNE PORTE
      </text>
    </svg>
  );
}
