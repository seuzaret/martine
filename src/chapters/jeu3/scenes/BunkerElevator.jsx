import { useState, useEffect, useRef } from "react";
import { LEVELS, ROOM_TO_LEVEL, isLevelUnlocked } from "../levels.js";

/* ============================================================
   JEU 3 — Ascenseur du bunker (v3 : gros tableau intégré)
   ------------------------------------------------------------
   Toute l'interface tient dans un unique grand tableau SVG :
   - Ticker LED en haut (ÉTAGE + nom en gros)
   - Grille de 6 boutons d'étage cliquables (au milieu)
   - Poignée d'urgence STOP en bas
   - Cabine réduite à un décor de fond
   3 phases inchangées : idle → moving → arrived.
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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <svg viewBox="0 0 1400 580" style={{ display: "block", width: "100%", height: "auto", maxHeight: "84vh" }}>
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
          {/* Décor cabine : mur + sol + néon */}
          <rect width="1400" height="580" fill="url(#ev-wall)" />
          <rect y="510" width="1400" height="70" fill="#0a0e14" />
          <path d="M0 510 L1400 510" stroke="#3a4048" strokeWidth="2" />
          {/* Néon plafond */}
          <rect x="500" y="20" width="400" height="12" rx="4" fill="#e8eef5" opacity={isMoving ? 0.55 : 0.9}>
            {isMoving && <animate attributeName="opacity" values="0.3;0.7;0.3" dur="0.25s" repeatCount="indefinite" />}
          </rect>
          {/* Câbles bundlés côté droit */}
          <path d="M1390 40 L1390 500" stroke="#c8a848" strokeWidth="4" opacity="0.7" />
          <path d="M1382 40 L1382 500" stroke="#5eff9e" strokeWidth="2.5" opacity="0.55" />
          <path d="M1374 40 L1374 500" stroke="#e83820" strokeWidth="2.5" opacity="0.55" />
          {/* Extincteur au sol à gauche */}
          <g transform="translate(20,440)">
            <rect x="0" y="0" width="42" height="80" fill="#8a1010" stroke="#0a0806" strokeWidth="2" rx="5" />
            <rect x="12" y="-6" width="18" height="10" fill="#3a4048" stroke="#0a0806" strokeWidth="0.8" />
            <text x="21" y="46" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7" fontWeight="800" fill="#fff">FEU</text>
          </g>
          {/* Grille de ventilation côté gauche */}
          <g transform="translate(20,50)">
            <rect x="0" y="0" width="60" height="160" fill="#0a0e14" stroke="#5a6270" strokeWidth="1.2" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <line key={i} x1="4" y1={12 + i * 15} x2="56" y2={12 + i * 15} stroke="#5a6270" strokeWidth="1.2" />
            ))}
          </g>
          {/* Numéro cabine */}
          <g transform="translate(100,530)">
            <rect x="0" y="0" width="110" height="32" fill="#e8dfc8" stroke="#3a2818" strokeWidth="1.5" />
            <text x="55" y="22" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="15" fontWeight="900" fill="#0a0806" letterSpacing="2">CAB · A-3</text>
          </g>

          {/* HALO de couleur derrière le grand tableau */}
          <ellipse cx="700" cy="290" rx="640" ry="270" fill="url(#ev-glow)" />

          {/* ================================================
              GRAND TABLEAU DE COMMANDE — 1200×500, quasi plein cadre
              ================================================ */}
          <g transform="translate(100,40)">
            {/* Cadre extérieur en acier brossé */}
            <rect x="0" y="0" width="1200" height="500" fill="url(#ev-panel)" stroke="#0a0e14" strokeWidth="8" rx="20" />
            {/* Rivets aux quatre coins */}
            {[[24, 24], [1176, 24], [24, 476], [1176, 476]].map(([rx, ry], i) => (
              <g key={i} transform={`translate(${rx},${ry})`}>
                <circle r="11" fill="#141c26" stroke="#5a6270" strokeWidth="1.5" />
                <circle r="4" fill="#5a6270" />
              </g>
            ))}
            {/* Panneau intérieur foncé */}
            <rect x="18" y="18" width="1164" height="464" fill="url(#ev-inner)" stroke="#3a4048" strokeWidth="2" rx="14" />

            {/* TICKER LED en haut : ÉTAGE + nom + flèche */}
            <g transform="translate(600,32)">
              <rect x="-560" y="0" width="1120" height="200" fill="#0a0806" stroke="#5eff9e" strokeWidth="5" rx="8" />
              {/* Petit label */}
              <text x="-540" y="36" fontFamily="ui-monospace,monospace" fontSize="20" fill="#5eff9e" letterSpacing="6">ÉTAGE</text>
              {/* Grand chiffre au centre */}
              <text x="0" y="132" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="130" fontWeight="900"
                fill={displayLvl?.color || "#5eff9e"} letterSpacing="10"
                style={{ filter: `drop-shadow(0 0 12px ${displayLvl?.color || "#5eff9e"})` }}>
                {displayLvl?.id || "?"}
              </text>
              {/* Nom d'étage */}
              <text x="0" y="178" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="22"
                fill="#c8d4e2" letterSpacing="8">
                {(displayLvl?.name || "").toUpperCase()}
              </text>
              {/* Flèche direction quand en mouvement (à droite) */}
              {isMoving && (() => {
                const idxTarget = LEVELS.findIndex((l) => l.id === target.id);
                const idxCur = LEVELS.findIndex((l) => l.id === currentLvl);
                const goingDown = idxTarget > idxCur;
                return (
                  <path d={goingDown ? "M420 60 L520 60 L470 150 Z" : "M420 150 L520 150 L470 60 Z"} fill="#ff5030">
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="0.5s" repeatCount="indefinite" />
                  </path>
                );
              })()}
              {/* Point STATION / EN MARCHE en haut à droite */}
              <g transform="translate(500,30)">
                <circle r="12" fill="#0a0806" stroke="#3a4048" strokeWidth="1.5" />
                <circle r="6" fill={isMoving ? "#ff5030" : "#5eff9e"}>
                  <animate attributeName="opacity" values="0.5;1;0.5" dur={isMoving ? "0.4s" : "1.6s"} repeatCount="indefinite" />
                </circle>
              </g>
              <text x="500" y="62" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fill="#5eff9e" letterSpacing="2">
                {isMoving ? "EN MARCHE" : "STATION."}
              </text>
            </g>

            {/* GRILLE de boutons d'étage — 2 rangées × 3 colonnes, GROS boutons */}
            <g transform="translate(50,280)">
              <text x="550" y="-10" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="16" fill="#c8d4e2" letterSpacing="8">SÉLECTIONNE UN ÉTAGE</text>
              {LEVELS.map((lvl, i) => {
                const unlocked = isLevelUnlocked(lvl.id, j3.flags);
                const here = lvl.id === currentLvl;
                const col = i % 3;
                const row = Math.floor(i / 3);
                const bx = col * 370;
                const by = row * 110;
                return (
                  <g key={lvl.id} transform={`translate(${bx},${by})`}
                    onClick={unlocked ? () => go(lvl) : undefined}
                    style={{ cursor: unlocked ? "pointer" : "not-allowed" }}
                    onMouseEnter={(e) => unlocked && e.currentTarget.querySelector(".hov").setAttribute("opacity", "1")}
                    onMouseLeave={(e) => e.currentTarget.querySelector(".hov").setAttribute("opacity", "0")}>
                    {/* Halo hover */}
                    <rect className="hov" x="-5" y="-5" width="350" height="100" fill="none" stroke={lvl.color} strokeWidth="3" opacity="0" rx="12" />
                    {/* Bouton */}
                    <rect x="0" y="0" width="340" height="90"
                      fill={here ? lvl.color : "#141c26"}
                      stroke={unlocked ? lvl.color : "#3a4048"}
                      strokeWidth="4" rx="10" opacity={unlocked ? 1 : 0.5} />
                    {/* Gros chiffre */}
                    <text x="36" y="66" fontFamily="ui-monospace,monospace" fontSize="48" fontWeight="900"
                      fill={here ? "#0a0806" : lvl.color} letterSpacing="3">{lvl.id}</text>
                    {/* Nom */}
                    <text x="110" y="46" fontFamily="ui-monospace,monospace" fontSize="18" fontWeight="700"
                      fill={here ? "#0a0806" : "#e8eef5"} letterSpacing="3">
                      {lvl.name.toUpperCase()}
                    </text>
                    {/* Indication ICI ou verrou */}
                    <text x="110" y="70" fontFamily="ui-monospace,monospace" fontSize="12"
                      fill={here ? "#0a0806" : "#7a879e"} letterSpacing="2">
                      {here ? "• ICI" : (unlocked ? "" : "🔒 VERROUILLÉ")}
                    </text>
                    {/* Voyant LED à droite */}
                    <circle cx="310" cy="45" r="10" fill="#0a0806" stroke="#3a4048" strokeWidth="1" />
                    <circle cx="310" cy="45" r="5" fill={here ? "#0a0806" : (unlocked ? lvl.color : "#3a4048")}>
                      {here && <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" />}
                    </circle>
                  </g>
                );
              })}
            </g>

            {/* Poignée d'urgence STOP à droite du ticker (verticale) */}
            <g transform="translate(1050,258)">
              <rect x="-50" y="-90" width="100" height="180" fill="#8a1010" stroke="#0a0806" strokeWidth="3" rx="10" />
              <rect x="-32" y="-72" width="64" height="60" fill="#e83820" stroke="#3a0000" strokeWidth="2" rx="6" />
              <text x="0" y="-38" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="22" fontWeight="900" fill="#fff" letterSpacing="4">STOP</text>
              <text x="0" y="10" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fill="#ff8080" letterSpacing="3">URGENCE</text>
              {/* Faux levier */}
              <rect x="-6" y="30" width="12" height="50" fill="#5a6270" stroke="#0a0806" strokeWidth="1" rx="3" />
              <circle cx="0" cy="82" r="10" fill="#c8a848" stroke="#0a0806" strokeWidth="1.5" />
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
          Clique un étage sur le tableau, ou utilise la mini-carte à gauche.
        </p>
      )}
    </div>
  );
}
