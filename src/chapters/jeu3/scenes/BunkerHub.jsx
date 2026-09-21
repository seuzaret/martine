/* ============================================================
   JEU 3 — Couloir du niveau 0 (Habitat) — v2 : 4 chambres
   ------------------------------------------------------------
   Long couloir : ascenseur à gauche, puis 4 portes de chambres
   côte à côte (N-24 Lior, N-27 le joueur, N-30 Yona, N-32 Estev).
   Ambiance bleutée neutre. Trappe rouge « Niveau -3 » au fond
   quand débloquée.
   ============================================================ */
export default function BunkerHub({ onGo, j3 }) {
  const finaleDone = !!j3?.flags?.mission_finale_done;

  const doors = [
    { room: "chambreN24", num: "N-24", nom: "LIOR",  color: "#3a80c8" },
    { room: "chambre",    num: "N-27", nom: "MOI",   color: "#c88060", mine: true },
    { room: "chambreN30", num: "N-30", nom: "YONA",  color: "#c8a848" },
    { room: "chambreN32", num: "N-32", nom: "ESTEV", color: "#5eff9e" },
  ];

  return (
    <svg viewBox="0 0 1200 480" style={{ display: "block", width: "100%", height: "auto", maxHeight: "70vh" }}>
      <defs>
        <linearGradient id="hb0-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2f38" />
          <stop offset="100%" stopColor="#0e1218" />
        </linearGradient>
        <linearGradient id="hb0-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2028" />
          <stop offset="100%" stopColor="#0a0e14" />
        </linearGradient>
      </defs>
      <rect width="1200" height="480" fill="url(#hb0-wall)" />
      {/* Tuyauteries */}
      <path d="M0 30 L1200 30" stroke="#3a4048" strokeWidth="4" opacity="0.8" />
      <path d="M0 40 L1200 40" stroke="#5a4028" strokeWidth="2.5" opacity="0.7" />
      {/* Néons */}
      {[180, 400, 620, 840, 1060].map((x, i) => (
        <g key={i}>
          <rect x={x - 30} y="52" width="60" height="4" fill="#e8eef5" opacity="0.85" />
          <ellipse cx={x} cy="60" rx="90" ry="24" fill="#7fd8ff" opacity="0.06" />
        </g>
      ))}
      {/* Sol */}
      <rect y="370" width="1200" height="110" fill="url(#hb0-floor)" />
      <path d="M0 390 L1200 390" stroke="#1a2028" strokeWidth="1" />
      {/* Numéros de niveau sur le mur */}
      <text x="600" y="120" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="46" fill="#7fd8ff" opacity="0.12" fontWeight="900" letterSpacing="10">NIVEAU 0 · HABITAT</text>

      {/* Ascenseur à gauche */}
      <g transform="translate(30,140)" onClick={() => onGo("elevator")} style={{ cursor: "pointer" }}
        onMouseEnter={(e) => e.currentTarget.querySelector(".el-hov").setAttribute("opacity", "1")}
        onMouseLeave={(e) => e.currentTarget.querySelector(".el-hov").setAttribute("opacity", "0")}>
        <rect className="el-hov" x="-6" y="-6" width="132" height="232" fill="none" stroke="#7fd8ff" strokeWidth="2" opacity="0" />
        <rect x="0" y="0" width="120" height="220" fill="#28303a" stroke="#0a0e14" strokeWidth="3" />
        <rect x="4" y="4" width="112" height="212" fill="#141c26" />
        <line x1="60" y1="14" x2="60" y2="208" stroke="#5eff9e" strokeWidth="1.4" />
        <rect x="18" y="30" width="84" height="42" fill="#0e1a10" stroke="#5eff9e" strokeWidth="1.4" />
        <text x="60" y="54" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="12" fontWeight="800" fill="#5eff9e" letterSpacing="2">↕</text>
        <text x="60" y="66" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="6" fill="#5eff9e" letterSpacing="2">0</text>
        <circle cx="60" cy="102" r="7" fill="#5eff9e">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <text x="60" y="240" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fill="#c8d4e2" letterSpacing="3">ASCENSEUR</text>
      </g>

      {/* Les 4 portes de chambres */}
      {doors.map((d, i) => {
        const x = 220 + i * 200;
        const hoverCls = `dh${i}`;
        return (
          <g key={d.room} transform={`translate(${x},140)`}
            onClick={() => onGo(d.room)} style={{ cursor: "pointer" }}
            onMouseEnter={(e) => e.currentTarget.querySelector(`.${hoverCls}`).setAttribute("opacity", "1")}
            onMouseLeave={(e) => e.currentTarget.querySelector(`.${hoverCls}`).setAttribute("opacity", "0")}>
            {/* Halo hover */}
            <rect className={hoverCls} x="-8" y="-8" width="176" height="236" fill="none" stroke={d.color} strokeWidth="2" opacity="0" />
            {/* Chambranle */}
            <rect x="-4" y="-4" width="168" height="228" fill="#3a2818" stroke="#0a0806" strokeWidth="2" />
            {/* Porte */}
            <rect x="0" y="0" width="160" height="220" fill={d.mine ? "#5a4028" : "#3a2818"} stroke="#0a0806" strokeWidth="1.5" />
            <rect x="4" y="4" width="152" height="212" fill="#5a4028" opacity="0.55" stroke="#0a0806" strokeWidth="0.6" />
            {/* Poignée */}
            <circle cx="140" cy="110" r="5" fill="#c8a848" />
            {/* Plaque numéro + nom */}
            <rect x="20" y="32" width="120" height="44" fill="#e8dfc8" stroke="#3a2818" strokeWidth="1.5" />
            <text x="80" y="52" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="16" fill="#0a0806" fontWeight="700">{d.num}</text>
            <text x="80" y="66" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#5a4028" letterSpacing="1">{d.mine ? "MA CHAMBRE" : d.nom}</text>
            {/* Voyant */}
            <circle cx="80" cy="88" r="3.5" fill={d.color}>
              <animate attributeName="opacity" values="0.4;1;0.4" dur={`${1.6 + i * 0.15}s`} repeatCount="indefinite" />
            </circle>
            {/* Étoile discrète pour ma chambre */}
            {d.mine && (
              <text x="80" y="200" textAnchor="middle" fontFamily="Georgia,serif" fontSize="14" fill="#c88060" opacity="0.85">★</text>
            )}
          </g>
        );
      })}

      {/* Trappe rouge « Niveau -3 » quand débloquée (raccourci d'urgence) */}
      {j3?.flags?.mission_kova_done && j3?.flags?.mission_appel_done && j3?.flags?.mission_carnet_done && (
        <g transform="translate(1110,280)" onClick={() => onGo("serveurs")} style={{ cursor: "pointer" }}>
          <circle r="52" fill="none" stroke="#ff5030" strokeWidth="2" strokeDasharray="6 4">
            <animate attributeName="r" values="46;56;46" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <rect x="-40" y="-30" width="80" height="90" fill="#1a0808" stroke="#ff5030" strokeWidth="3" />
          <rect x="-36" y="-26" width="72" height="82" fill="#2a0e08" />
          <text x="0" y="-6" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="12" fontWeight="800" fill="#ff5030">⚠</text>
          <text x="0" y="10" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#ff5030">NIVEAU</text>
          <text x="0" y="22" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fontWeight="800" fill="#ff5030">-3</text>
          <text x="0" y="42" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="6" fill="#ff8080">SERVEURS</text>
          {finaleDone && <text x="0" y="72" textAnchor="middle" fontSize="12" fill="#5eff9e">✓</text>}
        </g>
      )}

      <text x="600" y="460" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fill="#5a6678" letterSpacing="2">
        NIVEAU 0 · SECTEUR HABITAT · 4 CHAMBRES OCCUPÉES · ASCENSEUR À GAUCHE
      </text>
    </svg>
  );
}
