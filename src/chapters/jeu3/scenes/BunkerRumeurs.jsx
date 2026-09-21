import { useState } from "react";
import PnjSprite from "../PnjSprite.jsx";
import { PNJ_ROOMS } from "../pnj.js";

/* ============================================================
   JEU 3 — SCÈNE : « Bureau des Rumeurs » (R-01) — MISSION TUTO
   ------------------------------------------------------------
   Salle élargie (viewBox 1200×580) — mieux proportionnée à la
   halle vraiment fréquentée qu'elle est censée être. Décor étoffé :
   comptoir massif, grand tableau d'affichage, deux rayonnages de
   dossiers, table basse avec tabourets, lampes suspendues.
   Les 3 PNJ de mission (Marek, Séra, Yol) + 3 PNJ ambiants
   cliquables (visiteurs, ado, retraité) dessinés avec PnjSprite,
   orientations et activités variées.
   ============================================================ */
export default function BunkerRumeurs({ onGo, j3 }) {
  const mission = j3.missions.kova;
  const done = j3.flags[mission.flag];
  const heardAll = mission.pnj.every((p) => j3.heardPnj[p.id]);
  const ambient = PNJ_ROOMS.rumeurs || [];
  const [selected, setSelected] = useState(null);
  const [verdict, setVerdict] = useState(null);
  /* selected peut désigner un PNJ de mission OU un PNJ ambiant */
  const currentMissionPnj = selected ? mission.pnj.find((p) => p.id === selected) : null;
  const currentAmbient = selected ? ambient.find((p) => p.id === selected) : null;
  const currentPnj = currentMissionPnj || currentAmbient;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      {/* Bandeau mission */}
      <div style={{ maxWidth: 1100, width: "100%", background: "#0e1a30", border: "1px solid #5a4028", borderRadius: 10, padding: "9px 14px" }}>
        <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 10, letterSpacing: 2, color: "#e0a848" }}>
          🎯 MISSION · {mission.titre.toUpperCase()}
        </div>
        <p style={{ margin: "3px 0 0", fontSize: 13, lineHeight: 1.45, color: "#c8d4e2" }}>
          {mission.briefing}
        </p>
      </div>

      <svg viewBox="0 0 1200 580" style={{ display: "block", width: "100%", height: "auto", maxHeight: "68vh" }}>
        <defs>
          <linearGradient id="br-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2418" />
            <stop offset="100%" stopColor="#141008" />
          </linearGradient>
          <linearGradient id="br-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a2818" />
            <stop offset="100%" stopColor="#0e0a04" />
          </linearGradient>
          <radialGradient id="br-lamp" cx="50%" cy="0%" r="60%">
            <stop offset="0%" stopColor="#c8a848" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#c8a848" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1200" height="580" fill="url(#br-wall)" />
        <rect y="430" width="1200" height="150" fill="url(#br-floor)" />
        <path d="M0 430 L1200 430" stroke="#0a0806" strokeWidth="1" />
        {/* Perspective sol : lignes de dalles */}
        {[100, 300, 600, 900, 1100].map((x, i) => (
          <path key={i} d={`M${x} 430 L${x + (x - 600) * 0.12} 580`} stroke="#0a0806" strokeWidth="0.6" opacity="0.55" />
        ))}
        <path d="M0 500 L1200 500" stroke="#0a0806" strokeWidth="0.5" opacity="0.5" />

        {/* Plafond + poutres + lampes suspendues */}
        <rect x="0" y="0" width="1200" height="60" fill="#1a1408" />
        <path d="M0 60 L1200 60" stroke="#3a2010" strokeWidth="2" />
        {[250, 600, 950].map((x, i) => (
          <g key={i}>
            <line x1={x} y1="60" x2={x} y2="90" stroke="#3a2010" strokeWidth="2" />
            <path d={`M${x - 24} 90 L${x + 24} 90 L${x + 18} 108 L${x - 18} 108 Z`} fill="#5a4028" stroke="#0a0806" strokeWidth="1" />
            <circle cx={x} cy="106" r="4" fill="#ffd870">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <ellipse cx={x} cy="132" rx="90" ry="26" fill="url(#br-lamp)" />
          </g>
        ))}

        {/* Enseigne murale « BUREAU DES RUMEURS · R-01 » */}
        <g transform="translate(600,70)">
          <rect x="-160" y="-16" width="320" height="30" fill="#e8dfc8" stroke="#3a2010" strokeWidth="2" />
          <text x="0" y="6" textAnchor="middle" fontFamily="Georgia,serif" fontSize="16" fontWeight="700" fill="#3a2010" letterSpacing="4">BUREAU DES RUMEURS · R-01</text>
        </g>

        {/* Grand tableau d'affichage centré (au fond) — plus grand */}
        <g transform="translate(600,220)">
          <rect x="-220" y="-70" width="440" height="180" fill="#5a3818" stroke="#3a2010" strokeWidth="4" />
          <rect x="-214" y="-64" width="428" height="168" fill="#3a2818" opacity="0.7" />
          {/* Papiers punaisés (plus nombreux) */}
          {[
            [-170, -40, "#e8dfc8", -5],
            [ -90, -50, "#c8b090",  3],
            [ -10, -30, "#e8dfc8", -3],
            [  80, -46, "#f0e4c8",  4],
            [ 170, -34, "#e8dfc8", -2],
            [-160,  30, "#c8b090",  6],
            [ -70,  46, "#e8dfc8",  2],
            [  20,  38, "#f0e4c8", -4],
            [ 100,  50, "#e8dfc8",  3],
            [ 180,  40, "#c8b090", -6],
          ].map(([x, y, c, r], i) => (
            <g key={i} transform={`translate(${x},${y}) rotate(${r})`}>
              <rect x="-26" y="-16" width="52" height="34" fill={c} stroke="#5a4028" strokeWidth="0.6" />
              <line x1="-22" y1="-8" x2="22" y2="-8" stroke="#5a4028" strokeWidth="0.5" opacity="0.5" />
              <line x1="-22" y1="-2" x2="18" y2="-2" stroke="#5a4028" strokeWidth="0.5" opacity="0.5" />
              <line x1="-22" y1="4"  x2="20" y2="4"  stroke="#5a4028" strokeWidth="0.5" opacity="0.5" />
              <line x1="-22" y1="10" x2="14" y2="10" stroke="#5a4028" strokeWidth="0.5" opacity="0.5" />
              <circle cx="0" cy="-16" r="1.7" fill={i % 3 === 0 ? "#e83820" : "#c8a848"} />
            </g>
          ))}
        </g>

        {/* Comptoir massif — traverse presque toute la salle */}
        <g transform="translate(90,380)">
          <rect x="0" y="0" width="1020" height="50" fill="#5a3818" stroke="#1a0e08" strokeWidth="2" />
          <path d="M0 0 L1020 0" stroke="#8a5030" strokeWidth="3" />
          {/* Rainures verticales de coffrage */}
          {[0, 200, 400, 600, 800, 1020].map((x, i) => (
            <line key={i} x1={x} y1="0" x2={x} y2="50" stroke="#3a2010" strokeWidth="1" opacity="0.7" />
          ))}
          {/* Registre ouvert au centre */}
          <g transform="translate(500,-24)">
            <path d="M-40 0 L40 0 L40 24 L-40 24 Z" fill="#e8dfc8" stroke="#5a4028" strokeWidth="1" />
            <path d="M0 0 L0 24" stroke="#5a4028" strokeWidth="1" />
            {[6, 12, 18].map((y) => (
              <g key={y}>
                <line x1="-34" y1={y} x2="-6" y2={y} stroke="#5a4028" strokeWidth="0.4" />
                <line x1="6" y1={y} x2="34" y2={y} stroke="#5a4028" strokeWidth="0.4" />
              </g>
            ))}
            {/* Plume */}
            <path d="M32 -2 L40 -10 L38 -4 Z" fill="#3a2818" />
          </g>
          {/* Encrier + tampon officiel */}
          <g transform="translate(700,-14)">
            <rect x="-8" y="0" width="16" height="14" fill="#28303a" stroke="#0a0806" strokeWidth="0.8" />
            <ellipse cx="0" cy="0" rx="6" ry="2" fill="#0a0806" />
            <rect x="20" y="4" width="20" height="10" fill="#8a1010" stroke="#0a0806" strokeWidth="0.6" />
            <text x="30" y="12" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="4" fontWeight="800" fill="#e8dfc8">VU</text>
          </g>
          {/* Tas de dossiers */}
          <g transform="translate(180,-16)">
            {[0, 1, 2].map((i) => (
              <rect key={i} x={-24 + i * 4} y={-i * 4} width="60" height="16" fill={["#5a2818", "#8a5030", "#3a2818"][i]} stroke="#1a0e08" strokeWidth="0.6" />
            ))}
          </g>
          {/* Interphone / sonnette */}
          <g transform="translate(880,-16)">
            <rect x="-14" y="0" width="28" height="18" fill="#3a4048" stroke="#0a0806" strokeWidth="0.8" />
            <circle cx="0" cy="9" r="5" fill="#c8a848" />
            <circle cx="0" cy="9" r="2" fill="#8a5030" />
          </g>
        </g>

        {/* Étagère de dossiers gauche */}
        <g transform="translate(30,170)">
          {[0, 60, 120].map((y, k) => (
            <g key={k}>
              <rect x="0" y={y} width="80" height="4" fill="#3a2818" />
              {[0, 14, 28, 42, 56, 70].map((x, i) => (
                <rect key={x} x={x} y={y - 34} width="12" height="34"
                  fill={["#8a3820", "#5a2818", "#8a5030", "#5a4028", "#8a3820", "#5a2818"][(i + k) % 6]}
                  stroke="#1a0e08" strokeWidth="0.4" />
              ))}
            </g>
          ))}
          <rect x="-4" y="-40" width="88" height="4" fill="#3a2818" />
          <text x="40" y="150" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7" fill="#c8a848">DOSSIERS A-M</text>
        </g>

        {/* Étagère de dossiers droite */}
        <g transform="translate(1090,170)">
          {[0, 60, 120].map((y, k) => (
            <g key={k}>
              <rect x="0" y={y} width="80" height="4" fill="#3a2818" />
              {[0, 14, 28, 42, 56, 70].map((x, i) => (
                <rect key={x} x={x} y={y - 34} width="12" height="34"
                  fill={["#5a4028", "#8a5030", "#5a2818", "#8a3820", "#5a4028", "#8a5030"][(i + k) % 6]}
                  stroke="#1a0e08" strokeWidth="0.4" />
              ))}
            </g>
          ))}
          <rect x="-4" y="-40" width="88" height="4" fill="#3a2818" />
          <text x="40" y="150" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7" fill="#c8a848">DOSSIERS N-Z</text>
        </g>

        {/* Table basse ronde avec tabourets à gauche du comptoir */}
        <g transform="translate(160,500)">
          <ellipse cx="0" cy="0" rx="52" ry="14" fill="#5a3818" stroke="#1a0e08" strokeWidth="1.5" />
          <ellipse cx="0" cy="-3" rx="52" ry="14" fill="#8a5030" stroke="#1a0e08" strokeWidth="1" />
          <rect x="-3" y="0" width="6" height="30" fill="#3a2010" />
          {/* Deux tasses de café dessus */}
          <ellipse cx="-18" cy="-4" rx="6" ry="3" fill="#e8dfc8" stroke="#5a4028" strokeWidth="0.5" />
          <ellipse cx="-18" cy="-6" rx="4" ry="1.5" fill="#3a2010" />
          <ellipse cx="16" cy="-4" rx="6" ry="3" fill="#c8b090" stroke="#5a4028" strokeWidth="0.5" />
        </g>
        {/* Tabouret rond isolé */}
        <g transform="translate(1040,510)">
          <ellipse cx="0" cy="0" rx="18" ry="6" fill="#3a2010" stroke="#0a0806" strokeWidth="1" />
          <ellipse cx="0" cy="-3" rx="18" ry="6" fill="#5a4028" stroke="#0a0806" strokeWidth="0.8" />
          <rect x="-2" y="0" width="4" height="26" fill="#3a2010" />
        </g>

        {/* Horloge murale au-dessus des étagères gauche */}
        <g transform="translate(70,130)">
          <circle r="18" fill="#e8dfc8" stroke="#3a2010" strokeWidth="2" />
          <line x1="0" y1="0" x2="0" y2="-12" stroke="#0a0806" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="0" y1="0" x2="8" y2="4" stroke="#0a0806" strokeWidth="1" strokeLinecap="round" />
          <circle r="1.5" fill="#0a0806" />
          {[0, 90, 180, 270].map((a) => (
            <line key={a} x1={12 * Math.cos((a * Math.PI) / 180)} y1={12 * Math.sin((a * Math.PI) / 180)}
              x2={16 * Math.cos((a * Math.PI) / 180)} y2={16 * Math.sin((a * Math.PI) / 180)}
              stroke="#3a2010" strokeWidth="1" />
          ))}
        </g>

        {/* Plante en pot au fond droit */}
        <g transform="translate(1130,410)">
          <path d="M-14 0 L14 0 L10 30 L-10 30 Z" fill="#5a3818" stroke="#1a0e08" strokeWidth="1" />
          <path d="M-14 -30 Q-6 -46 0 -20 M0 -40 Q4 -58 12 -30 M6 -30 Q14 -40 20 -22 M-14 -14 Q-20 -30 -8 -30" stroke="#3a6828" strokeWidth="2" fill="none" />
          <ellipse cx="0" cy="-8" rx="16" ry="4" fill="#3a2010" opacity="0.5" />
        </g>

        {/* PNJ DE MISSION — dessinés en premier */}
        {mission.pnj.map((p) => (
          <PnjSprite key={p.id}
            x={p.pose.x} y={p.pose.y}
            color={p.color} pants={p.pants} hair={p.hair}
            facing={p.facing || "front"} accessory={p.accessory || null}
            activity={p.activity || null}
            nom={p.nom} role={p.role}
            heard={!!j3.heardPnj[p.id]}
            active={selected === p.id}
            onClick={done ? undefined : () => { setSelected(p.id); j3.hear(p.id); setVerdict(null); }} />
        ))}

        {/* PNJ AMBIANTS — cliquables, sans logique de verdict */}
        {ambient.map((p) => (
          <PnjSprite key={p.id}
            x={p.pose.x} y={p.pose.y}
            color={p.color} pants={p.pants} hair={p.hair} skin={p.skin}
            facing={p.facing || "front"} accessory={p.accessory || null}
            pose={p.poseKind || "stand"} activity={p.activity || null}
            nom={p.nom} role={p.role}
            heard={!!j3.heardPnj[p.id]}
            active={selected === p.id}
            onClick={() => { setSelected(p.id); j3.hear(p.id); setVerdict(null); }} />
        ))}
      </svg>

      {/* Zone dialogue / verdict */}
      <div style={{ maxWidth: 1100, width: "100%", minHeight: 90 }}>
        {done ? (
          <div style={{ background: "#0e2818", border: "1px solid #5eff9e", borderRadius: 10, padding: "12px 16px" }}>
            <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#5eff9e" }}>
              ✓ MISSION ACCOMPLIE
            </div>
            <p style={{ margin: "4px 0 0", fontSize: 13.5, lineHeight: 1.5, color: "#e8eef5" }}>
              {mission.succes}
            </p>
          </div>
        ) : verdict ? (
          <div style={{ background: verdict.ok ? "#0e2818" : "#2a1408", border: `1px solid ${verdict.ok ? "#5eff9e" : "#e0a848"}`, borderRadius: 10, padding: "12px 16px" }}>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: "#e8eef5" }}>
              {verdict.retour}
            </p>
            {!verdict.ok && (
              <button onClick={() => setVerdict(null)}
                style={{ marginTop: 10, background: "#141b26", color: "#e0a848", border: "1px solid #5a4028", borderRadius: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer", fontFamily: "ui-monospace,monospace" }}>
                ↺ Réessayer
              </button>
            )}
          </div>
        ) : currentPnj ? (
          <div style={{ background: "#141020", border: `1px solid ${currentAmbient ? "#8fa3bd" : "#3a80c8"}`, borderRadius: 10, padding: "12px 16px" }}>
            <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: currentAmbient ? "#8fa3bd" : "#7fd8ff" }}>
              {currentPnj.nom.toUpperCase()} · {currentPnj.role}{currentAmbient ? " · (témoignage secondaire)" : ""}
            </div>
            <p style={{ margin: "4px 0 0", fontSize: 14, lineHeight: 1.5, color: "#e8eef5" }}>
              « {currentPnj.replique} »
            </p>
          </div>
        ) : (
          <div style={{ background: "#0a0e14", border: "1px dashed #3a4048", borderRadius: 10, padding: "12px 16px", textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: 13, color: "#7a879e", fontStyle: "italic" }}>
              Clique un PNJ dans la salle pour l'écouter. Seuls Marek, Séra et Yol comptent pour la mission — les autres sont là pour la couleur.
              {heardAll ? " Tu peux maintenant rendre ton verdict." : ` (mission : ${Object.keys(j3.heardPnj).filter((k) => mission.pnj.some((p) => p.id === k)).length} / ${mission.pnj.length})`}
            </p>
          </div>
        )}
      </div>

      {!done && heardAll && !verdict && (
        <div style={{ maxWidth: 1100, width: "100%" }}>
          <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#e0a848", textAlign: "center", marginBottom: 6 }}>
            🎯 RENDS TON VERDICT
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {mission.verdicts.map((v) => (
              <button key={v.id} onClick={() => {
                setVerdict({ ok: v.ok, retour: v.retour });
                if (v.ok) j3.setFlag(mission.flag);
              }}
                title={v.desc}
                style={{ background: "#141b26", color: "#e8eef5", border: "1px solid #3a4048", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: 1, minWidth: 160 }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#e0a848"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#3a4048"; }}>
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <button onClick={() => onGo(j3.hubRoom || "hub")}
        style={{ background: "#141b26", color: "#7fd8ff", border: "1px solid #3a80c8", borderRadius: 10, padding: "10px 22px", fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: "ui-monospace,monospace", letterSpacing: 1, marginTop: 4 }}>
        ← Retour au couloir
      </button>
    </div>
  );
}
