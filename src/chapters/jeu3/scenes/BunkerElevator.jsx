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
      <svg viewBox="0 0 1000 640" style={{ display: "block", width: "100%", height: "auto", maxHeight: "78vh" }}>
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
          {/* Décor cabine simplifié : mur + sol + néon */}
          <rect width="1000" height="640" fill="url(#ev-wall)" />
          <rect y="560" width="1000" height="80" fill="#0a0e14" />
          <path d="M0 560 L1000 560" stroke="#3a4048" strokeWidth="2" />
          {/* Néon plafond */}
          <rect x="380" y="18" width="240" height="10" rx="3" fill="#e8eef5" opacity={isMoving ? 0.55 : 0.9}>
            {isMoving && <animate attributeName="opacity" values="0.3;0.7;0.3" dur="0.25s" repeatCount="indefinite" />}
          </rect>
          {/* Câbles bundlés côté droit */}
          <path d="M990 40 L990 550" stroke="#c8a848" strokeWidth="3" opacity="0.7" />
          <path d="M984 40 L984 550" stroke="#5eff9e" strokeWidth="2" opacity="0.55" />
          <path d="M978 40 L978 550" stroke="#e83820" strokeWidth="2" opacity="0.55" />
          {/* Extincteur au sol à gauche */}
          <g transform="translate(30,500)">
            <rect x="0" y="0" width="30" height="60" fill="#8a1010" stroke="#0a0806" strokeWidth="1.5" rx="4" />
            <rect x="8" y="-5" width="14" height="9" fill="#3a4048" stroke="#0a0806" strokeWidth="0.8" />
            <text x="15" y="34" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="5" fontWeight="800" fill="#fff">FEU</text>
          </g>
          {/* Grille de ventilation côté gauche */}
          <g transform="translate(30,60)">
            <rect x="0" y="0" width="50" height="120" fill="#0a0e14" stroke="#5a6270" strokeWidth="1" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <line key={i} x1="4" y1={10 + i * 14} x2="46" y2={10 + i * 14} stroke="#5a6270" strokeWidth="1" />
            ))}
          </g>
          {/* Numéro cabine */}
          <g transform="translate(120,590)">
            <rect x="0" y="0" width="80" height="24" fill="#e8dfc8" stroke="#3a2818" strokeWidth="1" />
            <text x="40" y="17" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="12" fontWeight="900" fill="#0a0806" letterSpacing="2">CAB · A-3</text>
          </g>

          {/* HALO de couleur derrière le grand tableau */}
          <ellipse cx="500" cy="320" rx="440" ry="280" fill="url(#ev-glow)" />

          {/* ================================================
              GRAND TABLEAU DE COMMANDE — occupe la majeure partie
              ================================================ */}
          <g transform="translate(120,60)">
            {/* Cadre extérieur en acier brossé */}
            <rect x="0" y="0" width="760" height="480" fill="url(#ev-panel)" stroke="#0a0e14" strokeWidth="6" rx="16" />
            {/* Rivets aux quatre coins */}
            {[[20, 20], [740, 20], [20, 460], [740, 460]].map(([rx, ry], i) => (
              <g key={i} transform={`translate(${rx},${ry})`}>
                <circle r="8" fill="#141c26" stroke="#5a6270" strokeWidth="1" />
                <circle r="3" fill="#5a6270" />
              </g>
            ))}
            {/* Panneau intérieur foncé */}
            <rect x="16" y="16" width="728" height="448" fill="url(#ev-inner)" stroke="#3a4048" strokeWidth="1.5" rx="10" />

            {/* TICKER LED en haut : ÉTAGE + nom + flèche */}
            <g transform="translate(380,30)">
              <rect x="-320" y="0" width="640" height="150" fill="#0a0806" stroke="#5eff9e" strokeWidth="4" rx="6" />
              {/* Petit label */}
              <text x="-306" y="26" fontFamily="ui-monospace,monospace" fontSize="14" fill="#5eff9e" letterSpacing="4">ÉTAGE</text>
              {/* Grand chiffre au centre */}
              <text x="0" y="98" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="82" fontWeight="900"
                fill={displayLvl?.color || "#5eff9e"} letterSpacing="8"
                style={{ filter: `drop-shadow(0 0 8px ${displayLvl?.color || "#5eff9e"})` }}>
                {displayLvl?.id || "?"}
              </text>
              {/* Nom d'étage */}
              <text x="0" y="132" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="16"
                fill="#c8d4e2" letterSpacing="6">
                {(displayLvl?.name || "").toUpperCase()}
              </text>
              {/* Flèche direction quand en mouvement */}
              {isMoving && (() => {
                const idxTarget = LEVELS.findIndex((l) => l.id === target.id);
                const idxCur = LEVELS.findIndex((l) => l.id === currentLvl);
                const goingDown = idxTarget > idxCur;
                return (
                  <path d={goingDown ? "M234 42 L302 42 L268 108 Z" : "M234 108 L302 108 L268 42 Z"} fill="#ff5030">
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="0.5s" repeatCount="indefinite" />
                  </path>
                );
              })()}
              {/* Point ARRÊT / EN MARCHE en haut à droite */}
              <g transform="translate(280,20)">
                <circle r="8" fill="#0a0806" stroke="#3a4048" strokeWidth="1" />
                <circle r="4" fill={isMoving ? "#ff5030" : "#5eff9e"}>
                  <animate attributeName="opacity" values="0.5;1;0.5" dur={isMoving ? "0.4s" : "1.6s"} repeatCount="indefinite" />
                </circle>
              </g>
              <text x="280" y="46" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7" fill="#5eff9e">
                {isMoving ? "EN MARCHE" : "STATION."}
              </text>
            </g>

            {/* GRILLE de boutons d'étage — au milieu du panneau */}
            <g transform="translate(60,210)">
              <text x="320" y="-8" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="12" fill="#c8d4e2" letterSpacing="6">SÉLECTIONNE UN ÉTAGE</text>
              {LEVELS.map((lvl, i) => {
                const unlocked = isLevelUnlocked(lvl.id, j3.flags);
                const here = lvl.id === currentLvl;
                const col = i % 3;
                const row = Math.floor(i / 3);
                const bx = col * 216;
                const by = row * 90;
                return (
                  <g key={lvl.id} transform={`translate(${bx},${by})`}
                    onClick={unlocked ? () => go(lvl) : undefined}
                    style={{ cursor: unlocked ? "pointer" : "not-allowed" }}
                    onMouseEnter={(e) => unlocked && e.currentTarget.querySelector(".hov").setAttribute("opacity", "1")}
                    onMouseLeave={(e) => e.currentTarget.querySelector(".hov").setAttribute("opacity", "0")}>
                    {/* Halo hover */}
                    <rect className="hov" x="-4" y="-4" width="208" height="78" fill="none" stroke={lvl.color} strokeWidth="2" opacity="0" rx="10" />
                    {/* Bouton */}
                    <rect x="0" y="0" width="200" height="70"
                      fill={here ? lvl.color : "#141c26"}
                      stroke={unlocked ? lvl.color : "#3a4048"}
                      strokeWidth="3" rx="8" opacity={unlocked ? 1 : 0.5} />
                    {/* Gros chiffre */}
                    <text x="24" y="46" fontFamily="ui-monospace,monospace" fontSize="30" fontWeight="900"
                      fill={here ? "#0a0806" : lvl.color} letterSpacing="2">{lvl.id}</text>
                    {/* Nom */}
                    <text x="70" y="34" fontFamily="ui-monospace,monospace" fontSize="12" fontWeight="700"
                      fill={here ? "#0a0806" : "#e8eef5"} letterSpacing="2">
                      {lvl.name.toUpperCase()}
                    </text>
                    {/* Indication ICI ou verrou */}
                    <text x="70" y="52" fontFamily="ui-monospace,monospace" fontSize="9"
                      fill={here ? "#0a0806" : "#7a879e"} letterSpacing="1">
                      {here ? "• ICI" : (unlocked ? "" : "🔒 VERROUILLÉ")}
                    </text>
                    {/* Petit voyant LED à droite */}
                    <circle cx="180" cy="35" r="6" fill="#0a0806" stroke="#3a4048" strokeWidth="0.6" />
                    <circle cx="180" cy="35" r="3" fill={here ? "#0a0806" : (unlocked ? lvl.color : "#3a4048")}>
                      {here && <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" />}
                    </circle>
                  </g>
                );
              })}
            </g>

            {/* Poignée d'urgence STOP en bas */}
            <g transform="translate(380,420)">
              <rect x="-100" y="0" width="200" height="36" fill="#8a1010" stroke="#0a0806" strokeWidth="2" rx="6" />
              <rect x="-60" y="6" width="120" height="24" fill="#e83820" stroke="#3a0000" strokeWidth="1.5" rx="3" />
              <text x="0" y="24" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="16" fontWeight="900" fill="#fff" letterSpacing="6">STOP</text>
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
