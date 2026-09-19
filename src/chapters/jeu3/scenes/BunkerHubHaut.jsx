/* ============================================================
   JEU 3 — Couloir du niveau +1 (Communal)
   ------------------------------------------------------------
   Deux portes : Cantine, Chapelle. Ambiance beige-doré (jour
   filtré par des puits de lumière artificiels).
   ============================================================ */
const DOORS = [
  { id: "cantine",  code: "C-01", label: "Cantine commune",       color: "#3a3a2a" },
  { id: "chapelle", code: "X-01", label: "Chapelle des Anciens",  color: "#3a2018" },
];

export default function BunkerHubHaut({ onGo }) {
  return (
    <svg viewBox="0 0 900 460" style={{ display: "block", width: "100%", height: "auto", maxHeight: "70vh" }}>
      <defs>
        <linearGradient id="hh-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a2f18" />
          <stop offset="100%" stopColor="#1a1408" />
        </linearGradient>
      </defs>
      <rect width="900" height="460" fill="url(#hh-wall)" />
      {/* Tuyauteries + néons chauds */}
      <path d="M0 30 L900 30" stroke="#5a4028" strokeWidth="4" opacity="0.85" />
      {[150, 400, 650].map((x, i) => (
        <g key={i}>
          <rect x={x - 30} y="50" width="60" height="6" rx="1" fill="#ffd870" opacity="0.75" />
          <circle cx={x} cy="90" r="60" fill="#ffd870" opacity="0.08" />
        </g>
      ))}
      {/* Sol carrelé */}
      <rect y="360" width="900" height="100" fill="#0e0a04" />
      {[0, 100, 200, 400, 500, 700, 800].map((x) => (
        <path key={x} d={`M${x} 360 L${x - 40} 460`} stroke="#3a2818" strokeWidth="1" opacity="0.55" />
      ))}
      <path d="M0 400 L900 400" stroke="#2a1808" strokeWidth="1" opacity="0.6" />
      {/* Ascenseur à gauche */}
      <g transform="translate(30,140)" onClick={() => onGo("elevator")} style={{ cursor: "pointer" }}
        onMouseEnter={(e) => e.currentTarget.querySelector(".el-hov").setAttribute("opacity", "1")}
        onMouseLeave={(e) => e.currentTarget.querySelector(".el-hov").setAttribute("opacity", "0")}>
        <rect className="el-hov" x="-6" y="-6" width="112" height="212" fill="none" stroke="#7fd8ff" strokeWidth="2" opacity="0" />
        <rect x="0" y="0" width="100" height="200" fill="#28303a" stroke="#0a0e14" strokeWidth="3" />
        <rect x="4" y="4" width="92" height="192" fill="#141c26" />
        {/* Porte à deux battants */}
        <line x1="50" y1="12" x2="50" y2="188" stroke="#5eff9e" strokeWidth="1.2" />
        <rect x="14" y="30" width="72" height="36" fill="#0e1a10" stroke="#5eff9e" strokeWidth="1.2" />
        <text x="50" y="52" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fontWeight="800" fill="#5eff9e" letterSpacing="1">+1</text>
        <circle cx="50" cy="90" r="6" fill="#5eff9e">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <text x="50" y="220" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill="#c8d4e2" letterSpacing="2">ASCENSEUR</text>
      </g>

      {/* Les 2 portes de ce niveau, à droite du couloir */}
      {DOORS.map((door, i) => {
        const x = 250 + i * 300;
        return (
          <g key={door.id} transform={`translate(${x},130)`}
            onClick={() => onGo(door.id)} style={{ cursor: "pointer" }}
            onMouseEnter={(e) => e.currentTarget.querySelector(".dh-hov").setAttribute("opacity", "1")}
            onMouseLeave={(e) => e.currentTarget.querySelector(".dh-hov").setAttribute("opacity", "0")}>
            <rect className="dh-hov" x="-10" y="-10" width="180" height="220" fill="none" stroke="#c88060" strokeWidth="2" opacity="0" />
            <rect x="0" y="0" width="160" height="200" fill={door.color} stroke="#0a0806" strokeWidth="3" />
            <rect x="4" y="4" width="152" height="192" fill={door.color} stroke="#0a0806" strokeWidth="1" opacity="0.6" />
            <circle cx="140" cy="100" r="5" fill="#c8a848" />
            <rect x="24" y="30" width="112" height="40" fill="#e8dfc8" stroke="#3a2818" strokeWidth="1.5" />
            <text x="80" y="46" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="14" fill="#0a0806" fontWeight="700">{door.code}</text>
            <text x="80" y="60" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7.5" fill="#5a4028">{door.label.toUpperCase()}</text>
            <circle cx="80" cy="80" r="3.5" fill="#5eff9e">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}

      {/* Bandeau bas */}
      <text x="450" y="440" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fill="#5a6678" letterSpacing="2">
        NIVEAU +1 · SECTEUR COMMUNAL
      </text>
    </svg>
  );
}
