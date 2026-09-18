/* ============================================================
   JEU 3 — SCÈNE : « Couloir central » (hub)
   ------------------------------------------------------------
   Portes en deux rangées. La porte "Niveau -3" (finale) apparaît
   avec un halo rouge dès que les 3 missions sont accomplies.
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

export default function BunkerHub({ onGo, j3 }) {
  /* La porte finale apparaît quand les 3 missions sont accomplies. */
  const finaleUnlocked = !!(j3?.flags?.mission_kova_done && j3?.flags?.mission_appel_done && j3?.flags?.mission_carnet_done);
  const finaleDone = !!j3?.flags?.mission_finale_done;
  /* Portes réparties : 4 en rangée haute (y=90), 3 en rangée basse (y=310),
     et 1 porte finale à droite de la rangée basse si débloquée. */
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

      {/* Trappe finale au sol (niveau -3), visible seulement si débloquée */}
      {finaleUnlocked && (
        <g transform="translate(775,340)" onClick={() => onGo("serveurs")} style={{ cursor: "pointer" }}>
          <circle r="52" fill="none" stroke="#ff5030" strokeWidth="2" strokeDasharray="6 4">
            <animate attributeName="r" values="46;56;46" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <rect x="-40" y="-30" width="80" height="120" fill="#1a0808" stroke="#ff5030" strokeWidth="3" />
          <rect x="-36" y="-26" width="72" height="112" fill="#2a0e08" />
          <text x="0" y="-6" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="12" fontWeight="800" fill="#ff5030">⚠</text>
          <text x="0" y="12" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#ff5030">NIVEAU</text>
          <text x="0" y="24" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fontWeight="800" fill="#ff5030">-3</text>
          <text x="0" y="42" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="6" fill="#ff8080">SERVEURS</text>
          <text x="0" y="52" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="6" fill="#ff8080">MARTINE</text>
          {finaleDone ? (
            <text x="0" y="72" textAnchor="middle" fontSize="12" fill="#5eff9e">✓</text>
          ) : (
            <circle cx="0" cy="72" r="4" fill="#ff5030">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
            </circle>
          )}
        </g>
      )}

      {/* Sous-titre */}
      <text x="450" y="535" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fill="#5a6678" letterSpacing="2">
        {finaleUnlocked
          ? "NIVEAU 4 · UNE NOUVELLE PORTE S'OUVRE VERS LE NIVEAU -3"
          : "NIVEAU 4 · SECTEUR HABITAT · CLIQUE UNE PORTE"}
      </text>
    </svg>
  );
}
