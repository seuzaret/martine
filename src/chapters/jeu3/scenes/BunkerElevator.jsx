import { useState, useEffect, useRef } from "react";
import { LEVELS, ROOM_TO_LEVEL, isLevelUnlocked } from "../levels.js";

/* ============================================================
   JEU 3 — Ascenseur du bunker (v4 : plein cadre, aspect équilibré)
   ------------------------------------------------------------
   viewBox 1200×620 (aspect ~1.9, proche de la fenêtre réelle),
   maxHeight 86vh. Panneau de commande de 1080×540 quasi plein
   cadre, avec :
   - Ticker LED géant au-dessus
   - Grille 6 boutons d'étage cliquables
   - Poignée d'urgence STOP verticale à droite
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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: "100%" }}>
      <svg viewBox="0 0 1200 620" style={{ display: "block", width: "100%", height: "auto", maxHeight: "86vh" }}>
        <defs>
          <linearGradient id="ev-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#28303a" />
            <stop offset="100%" stopColor="#0a0e14" />
          </linearGradient>
          <linearGradient id="ev-panel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5a6270" />
            <stop offset="100%" stopColor="#28303a" />
          </linearGradient>
          <linearGradient id="ev-inner" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a2028" />
            <stop offset="100%" stopColor="#0a0e14" />
          </linearGradient>
          <radialGradient id="ev-glow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={displayLvl?.color || "#5eff9e"} stopOpacity="0.35" />
            <stop offset="100%" stopColor={displayLvl?.color || "#5eff9e"} stopOpacity="0" />
          </radialGradient>
        </defs>

        <g style={isMoving ? { animation: "evShake 0.14s ease-in-out infinite" } : {}}>
          {/* Cabine : mur + sol + néon */}
          <rect width="1200" height="620" fill="url(#ev-wall)" />
          <rect y="550" width="1200" height="70" fill="#0a0e14" />
          <path d="M0 550 L1200 550" stroke="#3a4048" strokeWidth="2" />
          {/* Néon plafond */}
          <rect x="400" y="14" width="400" height="12" rx="4" fill="#e8eef5" opacity={isMoving ? 0.55 : 0.9}>
            {isMoving && <animate attributeName="opacity" values="0.3;0.7;0.3" dur="0.25s" repeatCount="indefinite" />}
          </rect>
          {/* Câbles droit */}
          <path d="M1190 40 L1190 540" stroke="#c8a848" strokeWidth="4" opacity="0.7" />
          <path d="M1182 40 L1182 540" stroke="#5eff9e" strokeWidth="2.5" opacity="0.55" />
          <path d="M1174 40 L1174 540" stroke="#e83820" strokeWidth="2.5" opacity="0.55" />
          {/* Extincteur au sol */}
          <g transform="translate(20,480)">
            <rect x="0" y="0" width="42" height="80" fill="#8a1010" stroke="#0a0806" strokeWidth="2" rx="5" />
            <rect x="12" y="-6" width="18" height="10" fill="#3a4048" stroke="#0a0806" strokeWidth="0.8" />
            <text x="21" y="46" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7" fontWeight="800" fill="#fff">FEU</text>
          </g>
          {/* Ventilation gauche */}
          <g transform="translate(16,50)">
            <rect x="0" y="0" width="56" height="160" fill="#0a0e14" stroke="#5a6270" strokeWidth="1.2" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <line key={i} x1="4" y1={12 + i * 15} x2="52" y2={12 + i * 15} stroke="#5a6270" strokeWidth="1.2" />
            ))}
          </g>
          {/* Numéro cabine */}
          <g transform="translate(90,570)">
            <rect x="0" y="0" width="120" height="34" fill="#e8dfc8" stroke="#3a2818" strokeWidth="1.5" />
            <text x="60" y="24" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="17" fontWeight="900" fill="#0a0806" letterSpacing="2">CAB · A-3</text>
          </g>

          {/* HALO couleur d'étage en fond */}
          <ellipse cx="600" cy="310" rx="580" ry="290" fill="url(#ev-glow)" />

          {/* ================================================
              GRAND TABLEAU DE COMMANDE — 1080×540, quasi plein cadre
              ================================================ */}
          <g transform="translate(80,40)">
            {/* Cadre acier brossé */}
            <rect x="0" y="0" width="1040" height="500" fill="url(#ev-panel)" stroke="#0a0e14" strokeWidth="8" rx="20" />
            {/* Rivets 4 coins */}
            {[[24, 24], [1016, 24], [24, 476], [1016, 476]].map(([rx, ry], i) => (
              <g key={i} transform={`translate(${rx},${ry})`}>
                <circle r="12" fill="#141c26" stroke="#5a6270" strokeWidth="1.5" />
                <circle r="4" fill="#5a6270" />
              </g>
            ))}
            {/* Intérieur foncé */}
            <rect x="20" y="20" width="1000" height="460" fill="url(#ev-inner)" stroke="#3a4048" strokeWidth="2" rx="14" />

            {/* TICKER LED géant */}
            <g transform="translate(520,36)">
              <rect x="-480" y="0" width="960" height="180" fill="#0a0806" stroke="#5eff9e" strokeWidth="5" rx="8" />
              {/* Label ÉTAGE */}
              <text x="-460" y="34" fontFamily="ui-monospace,monospace" fontSize="20" fill="#5eff9e" letterSpacing="6">ÉTAGE</text>
              {/* Chiffre géant */}
              <text x="0" y="128" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="140" fontWeight="900"
                fill={displayLvl?.color || "#5eff9e"} letterSpacing="10"
                style={{ filter: `drop-shadow(0 0 14px ${displayLvl?.color || "#5eff9e"})` }}>
                {displayLvl?.id || "?"}
              </text>
              {/* Nom d'étage */}
              <text x="0" y="164" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="24"
                fill="#c8d4e2" letterSpacing="8">
                {(displayLvl?.name || "").toUpperCase()}
              </text>
              {/* Flèche direction si en mouvement */}
              {isMoving && (() => {
                const idxTarget = LEVELS.findIndex((l) => l.id === target.id);
                const idxCur = LEVELS.findIndex((l) => l.id === currentLvl);
                const goingDown = idxTarget > idxCur;
                return (
                  <path d={goingDown ? "M340 50 L440 50 L390 140 Z" : "M340 140 L440 140 L390 50 Z"} fill="#ff5030">
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="0.5s" repeatCount="indefinite" />
                  </path>
                );
              })()}
              {/* Voyant STATION / EN MARCHE */}
              <g transform="translate(420,32)">
                <circle r="14" fill="#0a0806" stroke="#3a4048" strokeWidth="1.5" />
                <circle r="7" fill={isMoving ? "#ff5030" : "#5eff9e"}>
                  <animate attributeName="opacity" values="0.5;1;0.5" dur={isMoving ? "0.4s" : "1.6s"} repeatCount="indefinite" />
                </circle>
              </g>
              <text x="420" y="66" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="11" fill="#5eff9e" letterSpacing="2">
                {isMoving ? "EN MARCHE" : "STATION."}
              </text>
            </g>

            {/* GRILLE de 6 boutons d'étage */}
            <g transform="translate(40,260)">
              <text x="480" y="-12" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="17" fill="#c8d4e2" letterSpacing="8">SÉLECTIONNE UN ÉTAGE</text>
              {LEVELS.map((lvl, i) => {
                const unlocked = isLevelUnlocked(lvl.id, j3.flags);
                const here = lvl.id === currentLvl;
                const col = i % 3;
                const row = Math.floor(i / 3);
                const bx = col * 320;
                const by = row * 108;
                return (
                  <g key={lvl.id} transform={`translate(${bx},${by})`}
                    onClick={unlocked ? () => go(lvl) : undefined}
                    style={{ cursor: unlocked ? "pointer" : "not-allowed" }}
                    onMouseEnter={(e) => unlocked && e.currentTarget.querySelector(".hov").setAttribute("opacity", "1")}
                    onMouseLeave={(e) => e.currentTarget.querySelector(".hov").setAttribute("opacity", "0")}>
                    <rect className="hov" x="-5" y="-5" width="308" height="98" fill="none" stroke={lvl.color} strokeWidth="3" opacity="0" rx="12" />
                    <rect x="0" y="0" width="298" height="88"
                      fill={here ? lvl.color : "#141c26"}
                      stroke={unlocked ? lvl.color : "#3a4048"}
                      strokeWidth="4" rx="10" opacity={unlocked ? 1 : 0.5} />
                    <text x="32" y="66" fontFamily="ui-monospace,monospace" fontSize="46" fontWeight="900"
                      fill={here ? "#0a0806" : lvl.color} letterSpacing="3">{lvl.id}</text>
                    <text x="102" y="46" fontFamily="ui-monospace,monospace" fontSize="18" fontWeight="700"
                      fill={here ? "#0a0806" : "#e8eef5"} letterSpacing="3">
                      {lvl.name.toUpperCase()}
                    </text>
                    <text x="102" y="68" fontFamily="ui-monospace,monospace" fontSize="12"
                      fill={here ? "#0a0806" : "#7a879e"} letterSpacing="2">
                      {here ? "• ICI" : (unlocked ? "" : "🔒 VERROUILLÉ")}
                    </text>
                    <circle cx="268" cy="44" r="10" fill="#0a0806" stroke="#3a4048" strokeWidth="1" />
                    <circle cx="268" cy="44" r="5" fill={here ? "#0a0806" : (unlocked ? lvl.color : "#3a4048")}>
                      {here && <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" />}
                    </circle>
                  </g>
                );
              })}
            </g>

            {/* Poignée d'urgence STOP à droite du ticker (verticale) */}
            <g transform="translate(920,240)">
              <rect x="-56" y="-88" width="112" height="176" fill="#8a1010" stroke="#0a0806" strokeWidth="3" rx="10" />
              <rect x="-36" y="-70" width="72" height="56" fill="#e83820" stroke="#3a0000" strokeWidth="2" rx="6" />
              <text x="0" y="-38" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="24" fontWeight="900" fill="#fff" letterSpacing="4">STOP</text>
              <text x="0" y="14" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="11" fill="#ff8080" letterSpacing="3">URGENCE</text>
              <rect x="-6" y="34" width="12" height="42" fill="#5a6270" stroke="#0a0806" strokeWidth="1" rx="3" />
              <circle cx="0" cy="80" r="10" fill="#c8a848" stroke="#0a0806" strokeWidth="1.5" />
            </g>
          </g>
        </g>

        <style>{`@keyframes evShake { 0%,100% { transform: translate(0,0); } 50% { transform: translate(0,1.2px); } }`}</style>
      </svg>

      {phase === "arrived" && (
        <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 12, letterSpacing: 3, color: "#5eff9e" }}>
          ✓ ARRIVÉE À L'ÉTAGE {target.id} — {target.name.toUpperCase()}
        </div>
      )}
      {phase === "idle" && (
        <p style={{ margin: 0, fontSize: 11, color: "#7a879e", textAlign: "center", fontStyle: "italic" }}>
          Clique un étage, ou utilise la mini-carte à gauche.
        </p>
      )}
    </div>
  );
}
