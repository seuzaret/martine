/* ============================================================
   JEU 3 — SCÈNE : « Couloir central » (hub)
   ------------------------------------------------------------
   Le couloir principal du bunker : 3 portes cliquables qui
   mènent aux pièces. Chaque porte est étiquetée. Position au
   fond : silhouette floue d'un autre habitant qui passe (ambiance).
   ============================================================ */
export default function BunkerHub({ onGo }) {
  return (
    <svg viewBox="0 0 900 500" style={{ display: "block", width: "100%", height: "auto", maxHeight: "62vh" }}>
      <defs>
        <linearGradient id="bh-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2f38" />
          <stop offset="100%" stopColor="#0e1218" />
        </linearGradient>
        <linearGradient id="bh-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1e26" />
          <stop offset="100%" stopColor="#050810" />
        </linearGradient>
        <radialGradient id="bh-endlight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7fd8ff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#7fd8ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Murs + sol */}
      <rect width="900" height="500" fill="url(#bh-wall)" />
      <rect y="360" width="900" height="140" fill="url(#bh-floor)" />
      {/* Perspective (couloir qui s'enfonce) */}
      <path d="M0 0 L400 240 L500 240 L900 0 Z" fill="#050810" opacity="0.55" />
      <path d="M400 240 L500 240 L500 320 L400 320 Z" fill="#0a0e14" />
      <circle cx="450" cy="280" r="60" fill="url(#bh-endlight)" />
      {/* Silhouette lointaine qui passe */}
      <ellipse cx="450" cy="315" rx="8" ry="18" fill="#1a1e26" opacity="0.7" />
      {/* Néons au plafond */}
      {[80, 260, 640, 820].map((x, i) => (
        <g key={i} transform={`translate(${x},0)`}>
          <rect x="-6" y="10" width="12" height="60" fill="#1a1e26" />
          <rect x="-4" y="14" width="8" height="52" fill="#e8eef5" opacity="0.75" />
        </g>
      ))}

      {/* Tuyauteries au plafond (ambiance industrielle) */}
      <path d="M0 80 L900 80" stroke="#3a4048" strokeWidth="5" opacity="0.8" />
      <path d="M0 90 L900 90" stroke="#5a4028" strokeWidth="3" opacity="0.7" />
      {[100, 300, 500, 700].map((x) => (
        <rect key={x} x={x - 4} y="80" width="8" height="8" fill="#8a5030" />
      ))}

      {/* Portes numérotées avec étiquettes cliquables */}
      {[
        { x: 100, id: "chambre",  code: "N-27",  label: "Ma chambre",           color: "#5a4028" },
        { x: 380, id: "rumeurs",  code: "R-01",  label: "Bureau des Rumeurs",   color: "#3a2818" },
        { x: 660, id: "archives", code: "A-01",  label: "Salle des Archives",   color: "#28303a" },
      ].map((door) => (
        <g key={door.id} transform={`translate(${door.x},170)`}
          onClick={() => onGo(door.id)}
          style={{ cursor: "pointer" }}
          onMouseEnter={(e) => e.currentTarget.querySelector(".door-hover").setAttribute("opacity", "1")}
          onMouseLeave={(e) => e.currentTarget.querySelector(".door-hover").setAttribute("opacity", "0")}>
          {/* Cadre halo au survol */}
          <rect className="door-hover" x="-8" y="-8" width="156" height="216" fill="none" stroke="#7fd8ff" strokeWidth="2" opacity="0" />
          {/* La porte */}
          <rect x="0" y="0" width="140" height="200" fill={door.color} stroke="#0a0806" strokeWidth="3" />
          <rect x="4" y="4" width="132" height="192" fill={door.color} stroke="#0a0806" strokeWidth="1" opacity="0.6" />
          {/* Poignée */}
          <circle cx="118" cy="100" r="4" fill="#c8a848" />
          {/* Plaque */}
          <rect x="20" y="30" width="100" height="34" fill="#e8eef5" stroke="#3a2818" strokeWidth="1.5" />
          <text x="70" y="45" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="12" fill="#0a0806" fontWeight="700">{door.code}</text>
          <text x="70" y="58" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7" fill="#5a4028">{door.label.toUpperCase()}</text>
          {/* Petit voyant sous la plaque */}
          <circle cx="70" cy="76" r="3" fill="#5eff9e">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Sol : joints de dalles vus en perspective */}
      {[0, 200, 400, 500, 700, 900].map((x) => (
        <path key={x} d={`M${x} 360 L${400 + (x - 400) * 0.15} 500`} stroke="#0a0806" strokeWidth="1" opacity="0.6" />
      ))}
      <path d="M0 400 L900 400" stroke="#0a0806" strokeWidth="1" opacity="0.5" />
      <path d="M0 440 L900 440" stroke="#0a0806" strokeWidth="1" opacity="0.4" />

      {/* Titre discret en bas */}
      <text x="450" y="490" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fill="#5a6678" letterSpacing="2">
        NIVEAU 4 · SECTEUR HABITAT · CLIQUE UNE PORTE
      </text>
    </svg>
  );
}
