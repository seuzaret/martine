/* ============================================================
   JEU 3 — Couloir du niveau -1 (Services)
   ------------------------------------------------------------
   Quatre portes : Rumeurs, Archives, Infirmerie, Atelier.
   Ambiance froide bleu-vert (néons blancs). Ascenseur à gauche.
   ============================================================ */
const DOORS = [
  { id: "rumeurs",    code: "R-01", label: "Bureau des Rumeurs",     color: "#3a2818" },
  { id: "archives",   code: "A-01", label: "Salle des Archives",     color: "#28303a" },
  { id: "infirmerie", code: "I-01", label: "Infirmerie",             color: "#5a6270" },
  { id: "atelier",    code: "T-01", label: "Atelier des Ingénieurs", color: "#5a4028" },
];

export default function BunkerHubBas({ onGo }) {
  return (
    <svg viewBox="0 0 1000 460" style={{ display: "block", width: "100%", height: "auto", maxHeight: "62vh" }}>
      <defs>
        <linearGradient id="hb-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2028" />
          <stop offset="100%" stopColor="#050810" />
        </linearGradient>
      </defs>
      <rect width="1000" height="460" fill="url(#hb-wall)" />
      {/* Câbles au plafond */}
      <path d="M0 20 L1000 20" stroke="#3a4048" strokeWidth="3" opacity="0.8" />
      <path d="M0 30 L1000 30" stroke="#5eff9e" strokeWidth="1.2" opacity="0.4" />
      {/* Néons froids */}
      {[200, 500, 800].map((x, i) => (
        <g key={i}>
          <rect x={x - 30} y="44" width="60" height="4" fill="#e8eef5" opacity="0.75" />
          <circle cx={x} cy="80" r="60" fill="#7fd8ff" opacity="0.05" />
        </g>
      ))}
      {/* Sol technique */}
      <rect y="370" width="1000" height="90" fill="#050810" />
      {[100, 250, 400, 600, 750, 900].map((x) => (
        <rect key={x} x={x - 8} y="380" width="16" height="6" fill="#3a4048" opacity="0.7" />
      ))}

      {/* Ascenseur à gauche */}
      <g transform="translate(30,140)" onClick={() => onGo("elevator")} style={{ cursor: "pointer" }}
        onMouseEnter={(e) => e.currentTarget.querySelector(".el-hov").setAttribute("opacity", "1")}
        onMouseLeave={(e) => e.currentTarget.querySelector(".el-hov").setAttribute("opacity", "0")}>
        <rect className="el-hov" x="-6" y="-6" width="112" height="212" fill="none" stroke="#7fd8ff" strokeWidth="2" opacity="0" />
        <rect x="0" y="0" width="100" height="200" fill="#28303a" stroke="#0a0e14" strokeWidth="3" />
        <rect x="4" y="4" width="92" height="192" fill="#141c26" />
        <line x1="50" y1="12" x2="50" y2="188" stroke="#5eff9e" strokeWidth="1.2" />
        <rect x="14" y="30" width="72" height="36" fill="#0e1a10" stroke="#5eff9e" strokeWidth="1.2" />
        <text x="50" y="52" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fontWeight="800" fill="#5eff9e" letterSpacing="1">-1</text>
        <circle cx="50" cy="90" r="6" fill="#5eff9e">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <text x="50" y="220" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill="#c8d4e2" letterSpacing="2">ASCENSEUR</text>
      </g>

      {/* 4 portes en une rangée à droite du couloir */}
      {DOORS.map((door, i) => {
        const x = 200 + i * 195;
        return (
          <g key={door.id} transform={`translate(${x},140)`}
            onClick={() => onGo(door.id)} style={{ cursor: "pointer" }}
            onMouseEnter={(e) => e.currentTarget.querySelector(".db-hov").setAttribute("opacity", "1")}
            onMouseLeave={(e) => e.currentTarget.querySelector(".db-hov").setAttribute("opacity", "0")}>
            <rect className="db-hov" x="-8" y="-8" width="146" height="216" fill="none" stroke="#5eff9e" strokeWidth="2" opacity="0" />
            <rect x="0" y="0" width="130" height="200" fill={door.color} stroke="#0a0806" strokeWidth="3" />
            <rect x="4" y="4" width="122" height="192" fill={door.color} stroke="#0a0806" strokeWidth="1" opacity="0.6" />
            <circle cx="110" cy="100" r="4" fill="#c8a848" />
            <rect x="18" y="30" width="94" height="38" fill="#e8eef5" stroke="#3a2818" strokeWidth="1.5" />
            <text x="65" y="46" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="12" fill="#0a0806" fontWeight="700">{door.code}</text>
            <text x="65" y="58" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="6.5" fill="#5a4028">{door.label.toUpperCase()}</text>
            <circle cx="65" cy="76" r="3" fill="#5eff9e">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}

      <text x="500" y="440" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fill="#5a6678" letterSpacing="2">
        NIVEAU -1 · SECTEUR TECHNIQUE ET SERVICES
      </text>
    </svg>
  );
}
