import { LEVELS, ROOM_TO_LEVEL, isLevelUnlocked } from "./levels.js";

/* ============================================================
   JEU 3 — Mini-carte latérale du bunker (coupe verticale)
   ------------------------------------------------------------
   Vue en coupe : chaque niveau est une bande colorée empilée.
   L'étage courant du joueur est mis en surbrillance. Les
   niveaux verrouillés apparaissent en grisé. Cliquable :
   chaque étage débloqué renvoie vers son mini-hub.
   ============================================================ */
export default function BunkerMinimap({ room, flags, onGo }) {
  const currentLevel = ROOM_TO_LEVEL[room] ?? null;
  return (
    <div style={{
      width: 100, flex: "0 0 auto",
      display: "flex", flexDirection: "column",
      padding: 8, background: "#0a1020", borderRight: "1px solid #1a2536",
      fontFamily: "ui-monospace,monospace",
      overflowY: "auto",
    }}>
      <div style={{ fontSize: 9, letterSpacing: 2, color: "#5a6678", textAlign: "center", marginBottom: 8 }}>
        BUNKER
      </div>
      <svg viewBox="0 0 100 340" style={{ width: "100%", height: "auto", display: "block" }}>
        {/* Fond : une coupe verticale du terrain */}
        <defs>
          <linearGradient id="mm-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5a4028" />
            <stop offset="100%" stopColor="#1a0e08" />
          </linearGradient>
        </defs>
        {/* Sol/roche */}
        <rect x="10" y="4" width="80" height="332" fill="url(#mm-ground)" />
        {/* Ligne de surface au sommet */}
        <rect x="4" y="4" width="92" height="4" fill="#3a2818" />
        {/* Ciel étoilé au-dessus */}
        <rect x="4" y="0" width="92" height="4" fill="#0a0e18" />
        {/* Chaque niveau (de haut en bas) */}
        {LEVELS.map((lvl, i) => {
          const y = 10 + i * 62;
          const unlocked = isLevelUnlocked(lvl.id, flags);
          const isHere = currentLevel === lvl.id;
          const canClick = unlocked;
          return (
            <g key={lvl.id}
              onClick={canClick ? () => onGo(lvl.hubRoom) : undefined}
              style={{ cursor: canClick ? "pointer" : "default", opacity: unlocked ? 1 : 0.35 }}>
              {/* Cabine du niveau */}
              <rect x="14" y={y} width="72" height="56"
                fill={isHere ? lvl.color : "#1a2028"}
                fillOpacity={isHere ? 0.85 : 1}
                stroke={unlocked ? lvl.color : "#3a4048"}
                strokeWidth={isHere ? 2.5 : 1.2} />
              {/* Encoche haut/bas pour signifier une porte de niveau */}
              <rect x="42" y={y - 2} width="16" height="4" fill="#0a0e14" />
              {/* Étiquette niveau */}
              <text x="20" y={y + 14} fontSize="8" fontWeight="800"
                fill={isHere ? "#0a0806" : lvl.color} letterSpacing="1">
                {lvl.id}
              </text>
              {/* Nom */}
              <text x="20" y={y + 26} fontSize="6" fill={isHere ? "#0a0806" : "#c8d4e2"}>
                {lvl.name.toUpperCase()}
              </text>
              {/* Icône verrou si inaccessible */}
              {!unlocked && (
                <g transform={`translate(72,${y + 24})`}>
                  <rect x="-4" y="0" width="8" height="6" fill="#8a7050" stroke="#0a0806" strokeWidth="0.5" />
                  <path d="M-2 0 L-2 -3 Q0 -5 2 -3 L2 0" fill="none" stroke="#8a7050" strokeWidth="0.8" />
                </g>
              )}
              {/* Petit rond blanc = position du joueur */}
              {isHere && (
                <circle cx="72" cy={y + 44} r="3" fill="#fff" stroke="#0a0806" strokeWidth="0.5">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="1.6s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        })}
      </svg>
      <div style={{ fontSize: 8.5, color: "#5a6678", textAlign: "center", marginTop: 6, lineHeight: 1.4 }}>
        Clique un<br />étage pour<br />t'y rendre
      </div>
    </div>
  );
}
