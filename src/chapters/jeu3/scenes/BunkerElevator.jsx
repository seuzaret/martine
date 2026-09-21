import { useState, useEffect, useRef } from "react";
import { LEVELS, ROOM_TO_LEVEL, isLevelUnlocked } from "../levels.js";

/* ============================================================
   JEU 3 — Ascenseur du bunker (v2 : plus grand, plus mécanique)
   ------------------------------------------------------------
   ViewBox 1000×560. Cabine détaillée : parois lambris, deux
   miroirs, néon plafond, panneau de bord avec ticker d'étage
   et gros bouton d'appel, câbles et poulies visibles par une
   trappe, ventilation d'appoint, poignée d'urgence rouge.
   3 phases : idle → moving (shake) → arrived (ding).
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
      <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "auto", maxHeight: "70vh" }}>
        <defs>
          <linearGradient id="ev-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#28303a" />
            <stop offset="100%" stopColor="#0a0e14" />
          </linearGradient>
          <linearGradient id="ev-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a4048" />
            <stop offset="100%" stopColor="#0a0e14" />
          </linearGradient>
          <linearGradient id="ev-panel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5a6270" />
            <stop offset="100%" stopColor="#2a303a" />
          </linearGradient>
          <radialGradient id="ev-neon" cx="50%" cy="0%" r="60%">
            <stop offset="0%" stopColor="#e8eef5" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#e8eef5" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g style={isMoving ? { animation: "evShake 0.14s ease-in-out infinite" } : {}}>
          {/* Murs + sol de la cabine */}
          <rect width="1000" height="560" fill="url(#ev-wall)" />
          <rect y="470" width="1000" height="90" fill="url(#ev-floor)" />
          <path d="M0 470 L1000 470" stroke="#0a0e14" strokeWidth="2" />
          {/* Sol dalles métalliques */}
          {[120, 260, 400, 600, 740, 880].map((x, i) => (
            <path key={i} d={`M${x} 470 L${x + (x - 500) * 0.13} 560`} stroke="#0a0e14" strokeWidth="0.8" opacity="0.6" />
          ))}
          <path d="M0 520 L1000 520" stroke="#0a0e14" strokeWidth="0.6" opacity="0.5" />

          {/* Panneau plafond avec trappe visible sur les câbles */}
          <rect x="0" y="0" width="1000" height="60" fill="#141820" stroke="#0a0e14" strokeWidth="2" />
          {/* Trappe centrale ouverte : on voit les câbles descendre */}
          <g transform="translate(500,10)">
            <rect x="-60" y="0" width="120" height="34" fill="#0a0806" stroke="#5a6270" strokeWidth="1.5" />
            {/* Câbles + poulie */}
            <line x1="-30" y1="0" x2="-30" y2="34" stroke="#5a6270" strokeWidth="2" />
            <line x1="30" y1="0" x2="30" y2="34" stroke="#5a6270" strokeWidth="2" />
            <line x1="-30" y1="0" x2="-30" y2="-8" stroke="#5a6270" strokeWidth="2" />
            <line x1="30" y1="0" x2="30" y2="-8" stroke="#5a6270" strokeWidth="2" />
            {/* Deuxième néon derrière */}
            <rect x="-40" y="4" width="80" height="4" fill="#7fd8ff" opacity="0.35" />
          </g>
          {/* Néon principal */}
          <rect x="360" y="66" width="280" height="10" rx="3" fill="#e8eef5" opacity={isMoving ? 0.55 : 0.9}>
            {isMoving && <animate attributeName="opacity" values="0.3;0.7;0.3" dur="0.25s" repeatCount="indefinite" />}
          </rect>
          <ellipse cx="500" cy="100" rx="300" ry="60" fill="url(#ev-neon)" />

          {/* Panneau lambris latéraux */}
          {[40, 160, 780, 900].map((x, i) => (
            <rect key={i} x={x} y="80" width="100" height="380" fill="none" stroke="#0a0e14" strokeWidth="1" opacity="0.7" />
          ))}
          {[40, 160, 780, 900].map((x, i) => (
            <rect key={i} x={x + 20} y="100" width="60" height="10" fill="#3a4048" stroke="#0a0e14" strokeWidth="0.4" opacity="0.7" />
          ))}

          {/* Deux miroirs / hublots sur le mur du fond */}
          <g>
            <rect x="270" y="120" width="180" height="240" fill="#1a2028" stroke="#5a6270" strokeWidth="2" opacity="0.85" />
            <rect x="278" y="128" width="164" height="224" fill="#2a3540" opacity="0.65" />
            {/* Reflet vertical */}
            <rect x="290" y="140" width="6" height="200" fill="#e8eef5" opacity="0.15" />
          </g>

          {/* Panneau de bord à droite (gros) : ticker d'étage + boutons + poignée d'urgence */}
          <g transform="translate(600,110)">
            {/* Cadre du panneau */}
            <rect x="0" y="0" width="180" height="300" fill="url(#ev-panel)" stroke="#0a0e14" strokeWidth="3" rx="6" />
            <rect x="8" y="8" width="164" height="284" fill="#141c26" stroke="#3a4048" strokeWidth="0.8" />
            {/* Ticker d'étage LED */}
            <rect x="20" y="20" width="140" height="60" fill="#0a0806" stroke="#5eff9e" strokeWidth="2" />
            <text x="90" y="38" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill="#5eff9e" letterSpacing="3">ÉTAGE</text>
            <text x="90" y="66" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="24" fontWeight="900" fill={displayLvl?.color || "#5eff9e"} letterSpacing="4">
              {displayLvl?.id || "?"}
            </text>
            {/* Petit sous-titre nom d'étage */}
            <text x="90" y="98" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7" fill="#c8d4e2" letterSpacing="2">
              {(displayLvl?.name || "").toUpperCase()}
            </text>
            {/* Flèche direction (grande) */}
            <g transform="translate(90,140)">
              {isMoving ? (() => {
                const idxTarget = LEVELS.findIndex((l) => l.id === target.id);
                const idxCur = LEVELS.findIndex((l) => l.id === currentLvl);
                const goingDown = idxTarget > idxCur;
                return (
                  <path d={goingDown ? "M-20 -14 L20 -14 L0 20 Z" : "M-20 14 L20 14 L0 -20 Z"} fill="#ff5030">
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="0.5s" repeatCount="indefinite" />
                  </path>
                );
              })() : (
                <g>
                  <path d="M-20 -14 L20 -14 L0 -30 Z" fill="#3a4048" />
                  <path d="M-20 14 L20 14 L0 30 Z" fill="#3a4048" />
                </g>
              )}
            </g>
            {/* Rangée de LEDs statut */}
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i} transform={`translate(${28 + i * 30},200)`}>
                <circle r="6" fill="#0a0806" stroke="#3a4048" strokeWidth="0.6" />
                <circle r="3" fill={i === 2 ? "#5eff9e" : (i % 2 === 0 ? "#e0a848" : "#3a4048")}>
                  {i === 2 && <animate attributeName="opacity" values="0.5;1;0.5" dur="1.6s" repeatCount="indefinite" />}
                </circle>
              </g>
            ))}
            {/* Poignée d'urgence rouge */}
            <g transform="translate(90,240)">
              <rect x="-40" y="0" width="80" height="34" fill="#8a1010" stroke="#0a0806" strokeWidth="1.5" rx="3" />
              <rect x="-20" y="6" width="40" height="18" fill="#e83820" stroke="#3a0000" strokeWidth="1" rx="2" />
              <text x="0" y="20" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fontWeight="900" fill="#fff">STOP</text>
              <text x="0" y="46" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="5" fill="#ff8080">URGENCE</text>
            </g>
          </g>

          {/* Grille de ventilation à gauche haut */}
          <g transform="translate(220,120)">
            <rect x="0" y="0" width="40" height="80" fill="#0a0e14" stroke="#5a6270" strokeWidth="1" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line key={i} x1="4" y1={10 + i * 12} x2="36" y2={10 + i * 12} stroke="#5a6270" strokeWidth="1" />
            ))}
          </g>
          {/* Câbles bundlés le long du mur droit */}
          <g>
            <path d="M990 60 L990 460" stroke="#c8a848" strokeWidth="3" opacity="0.7" />
            <path d="M985 60 L985 460" stroke="#5eff9e" strokeWidth="2" opacity="0.6" />
            <path d="M980 60 L980 460" stroke="#e83820" strokeWidth="2" opacity="0.6" />
            {/* Attaches */}
            {[140, 240, 340, 440].map((y) => (
              <rect key={y} x="978" y={y} width="14" height="4" fill="#3a4048" stroke="#0a0806" strokeWidth="0.4" />
            ))}
          </g>
          {/* Extincteur au sol à gauche */}
          <g transform="translate(90,410)">
            <rect x="0" y="0" width="24" height="60" fill="#8a1010" stroke="#0a0806" strokeWidth="1.5" rx="4" />
            <rect x="6" y="-4" width="12" height="8" fill="#3a4048" stroke="#0a0806" strokeWidth="0.8" />
            <text x="12" y="34" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="4" fontWeight="800" fill="#fff">FEU</text>
          </g>

          {/* Numéro de cabine (autocollant sur porte) */}
          <g transform="translate(500,430)">
            <rect x="-40" y="-12" width="80" height="24" fill="#e8dfc8" stroke="#3a2818" strokeWidth="1" />
            <text x="0" y="6" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="12" fontWeight="900" fill="#0a0806" letterSpacing="2">CAB · A-3</text>
          </g>
        </g>
      </svg>

      {/* Panneau de boutons — visible seulement quand on est à l'arrêt */}
      {phase === "idle" && (
        <div style={{ maxWidth: 820, width: "100%", background: "#0a0e14", border: "2px solid #5eff9e", borderRadius: 12, padding: "12px 14px" }}>
          <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 3, color: "#5eff9e", textAlign: "center", marginBottom: 8 }}>
            ⌂ SÉLECTIONNE UN ÉTAGE
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 8 }}>
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
