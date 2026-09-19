import { useState, useEffect, useRef } from "react";
import { LEVELS, ROOM_TO_LEVEL, isLevelUnlocked } from "../levels.js";

/* ============================================================
   JEU 3 — Ascenseur du bunker
   ------------------------------------------------------------
   S'ouvre en trois temps :
     1) idle    : panneau de boutons + niveau courant surligné
     2) moving  : anim descente/montée ~1.6 s, cabine qui vibre
     3) arrived : ding, redirection vers le mini-hub du niveau
   Les niveaux verrouillés sont grisés (info "verrouillé — résous
   les 3 missions"). L'utilisateur peut aussi cliquer directement
   dans la mini-carte latérale, avec le même résultat.
   ============================================================ */
export default function BunkerElevator({ onGo, j3 }) {
  const currentLvl = ROOM_TO_LEVEL[j3?.previousRoom] || "0";
  const [phase, setPhase] = useState("idle");
  const [target, setTarget] = useState(null);
  const rafRef = useRef(null);

  const go = (lvl) => {
    if (!isLevelUnlocked(lvl.id, j3.flags)) return;
    if (lvl.id === currentLvl) { onGo(lvl.hubRoom); return; }
    setTarget(lvl);
    setPhase("moving");
  };

  useEffect(() => {
    if (phase !== "moving") return;
    const t = setTimeout(() => setPhase("arrived"), 1500);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "arrived") return;
    const t = setTimeout(() => onGo(target.hubRoom), 700);
    return () => { clearTimeout(t); cancelAnimationFrame(rafRef.current); };
  }, [phase, target, onGo]);

  const displayLvl = phase === "arrived" ? target : LEVELS.find((l) => l.id === currentLvl);
  const isMoving = phase === "moving";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      <svg viewBox="0 0 700 460" style={{ display: "block", width: "100%", height: "auto", maxHeight: "56vh" }}>
        <defs>
          <linearGradient id="ev-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#28303a" />
            <stop offset="100%" stopColor="#141c26" />
          </linearGradient>
          <linearGradient id="ev-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a4048" />
            <stop offset="100%" stopColor="#0a0e14" />
          </linearGradient>
        </defs>
        {/* Cabine, avec léger tremblement pendant le mouvement */}
        <g style={isMoving ? { animation: "evShake 0.14s ease-in-out infinite" } : {}}>
          {/* Murs de la cabine */}
          <rect width="700" height="460" fill="url(#ev-wall)" />
          {/* Sol */}
          <rect y="380" width="700" height="80" fill="url(#ev-floor)" />
          {/* Panneau lambris */}
          {[80, 200, 500, 620].map((x, i) => (
            <rect key={i} x={x} y="30" width="80" height="330" fill="none" stroke="#0a0e14" strokeWidth="1" opacity="0.7" />
          ))}
          {/* Néon plafond */}
          <rect x="270" y="12" width="160" height="8" rx="2" fill="#e8eef5" opacity={isMoving ? 0.5 : 0.85}>
            {isMoving && <animate attributeName="opacity" values="0.3;0.7;0.3" dur="0.25s" repeatCount="indefinite" />}
          </rect>
          {/* Miroir style ascenseur au fond */}
          <rect x="120" y="60" width="160" height="220" fill="#1a2028" stroke="#5a6270" strokeWidth="2" opacity="0.7" />
          <rect x="128" y="68" width="144" height="204" fill="#2a3540" opacity="0.8" />
          {/* Petit ticker de l'étage au-dessus de la porte */}
          <g transform="translate(500,60)">
            <rect x="0" y="0" width="120" height="46" fill="#0a0806" stroke="#5eff9e" strokeWidth="2" />
            <text x="60" y="16" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#5eff9e" letterSpacing="2">ÉTAGE</text>
            <text x="60" y="38" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="18" fontWeight="900" fill={displayLvl?.color || "#5eff9e"} letterSpacing="3">
              {displayLvl?.id || "?"}
            </text>
          </g>
          {/* Flèche haut/bas si en mouvement */}
          {isMoving && (
            <g transform="translate(560,120)">
              {/* on regarde si target est au-dessus ou au-dessous */}
              {(() => {
                const idxTarget = LEVELS.findIndex((l) => l.id === target.id);
                const idxCur = LEVELS.findIndex((l) => l.id === currentLvl);
                const goingDown = idxTarget > idxCur;
                return (
                  <path d={goingDown ? "M0 -14 L14 6 L-14 6 Z" : "M0 14 L14 -6 L-14 -6 Z"}
                    fill="#ff5030" transform={goingDown ? "rotate(180)" : ""}>
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="0.5s" repeatCount="indefinite" />
                  </path>
                );
              })()}
            </g>
          )}
        </g>
      </svg>

      {/* Panneau de boutons — visible seulement quand on est à l'arrêt */}
      {phase === "idle" && (
        <div style={{ maxWidth: 620, width: "100%", background: "#0a0e14", border: "2px solid #5eff9e", borderRadius: 12, padding: "12px 14px" }}>
          <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 3, color: "#5eff9e", textAlign: "center", marginBottom: 8 }}>
            ⌂ SÉLECTIONNE UN ÉTAGE
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 }}>
            {LEVELS.map((lvl) => {
              const unlocked = isLevelUnlocked(lvl.id, j3.flags);
              const here = lvl.id === currentLvl;
              return (
                <button key={lvl.id} onClick={() => go(lvl)} disabled={!unlocked}
                  title={unlocked ? `${lvl.id} · ${lvl.name}` : "Verrouillé — résous les 3 missions d'abord"}
                  style={{
                    background: here ? lvl.color : (unlocked ? "#141b26" : "#0a0e14"),
                    color: here ? "#0a0806" : (unlocked ? "#e8eef5" : "#5a6678"),
                    border: `2px solid ${unlocked ? lvl.color : "#3a4048"}`,
                    borderRadius: 10, padding: "10px 12px", fontSize: 13, fontWeight: 700,
                    cursor: unlocked ? "pointer" : "not-allowed",
                    fontFamily: "ui-monospace,monospace", letterSpacing: 1,
                    display: "flex", alignItems: "center", gap: 8,
                    opacity: unlocked ? 1 : 0.55,
                  }}>
                  <span style={{ fontSize: 16, fontWeight: 900, minWidth: 26, textAlign: "center" }}>{lvl.id}</span>
                  <span style={{ fontSize: 11, textTransform: "uppercase" }}>{lvl.name}</span>
                  {here && <span style={{ marginLeft: "auto", fontSize: 10 }}>• ICI</span>}
                  {!unlocked && <span style={{ marginLeft: "auto", fontSize: 12 }}>🔒</span>}
                </button>
              );
            })}
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 11, color: "#7a879e", textAlign: "center", fontStyle: "italic" }}>
            Tu peux aussi cliquer directement dans la mini-carte du bunker (à gauche).
          </p>
        </div>
      )}

      {phase === "arrived" && (
        <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 12, letterSpacing: 3, color: "#5eff9e" }}>
          ✓ ARRIVÉE À L'ÉTAGE {target.id} — {target.name.toUpperCase()}
        </div>
      )}

      <style>{`@keyframes evShake { 0%,100% { transform: translate(0,0); } 50% { transform: translate(0,1.2px); } }`}</style>
    </div>
  );
}
