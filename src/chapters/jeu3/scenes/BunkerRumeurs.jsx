import { useState } from "react";
import PnjSprite from "../PnjSprite.jsx";

/* ============================================================
   JEU 3 — SCÈNE : « Bureau des Rumeurs » (R-01) — MISSION TUTO
   ------------------------------------------------------------
   Décor élargi (viewBox 1000×520), comptoir en bois massif au
   fond, 3 PNJ (Marek habitant, Séra archiviste, Yol sécurité)
   dessinés avec PnjSprite en corps entier, tenues et orientations
   variées. Reste inchangée la mécanique de la mission Kova
   (interviewer les 3, poser un verdict).
   ============================================================ */
export default function BunkerRumeurs({ onGo, j3 }) {
  const mission = j3.missions.kova;
  const done = j3.flags[mission.flag];
  const heardAll = mission.pnj.every((p) => j3.heardPnj[p.id]);
  const [selected, setSelected] = useState(null);
  const [verdict, setVerdict] = useState(null);
  const currentPnj = selected ? mission.pnj.find((p) => p.id === selected) : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      {/* Bandeau mission */}
      <div style={{ maxWidth: 900, width: "100%", background: "#0e1a30", border: "1px solid #5a4028", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 10, letterSpacing: 2, color: "#e0a848" }}>
          🎯 MISSION · {mission.titre.toUpperCase()}
        </div>
        <p style={{ margin: "4px 0 0", fontSize: 13.5, lineHeight: 1.45, color: "#c8d4e2" }}>
          {mission.briefing}
        </p>
      </div>

      <svg viewBox="0 0 1000 520" style={{ display: "block", width: "100%", height: "auto", maxHeight: "70vh" }}>
        <defs>
          <linearGradient id="br-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2418" />
            <stop offset="100%" stopColor="#141008" />
          </linearGradient>
          <linearGradient id="br-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a2818" />
            <stop offset="100%" stopColor="#0e0a04" />
          </linearGradient>
        </defs>
        <rect width="1000" height="520" fill="url(#br-wall)" />
        <rect y="380" width="1000" height="140" fill="url(#br-floor)" />
        <path d="M0 380 L1000 380" stroke="#0a0806" strokeWidth="1" />
        {/* Plafond avec néons doux */}
        <rect x="0" y="0" width="1000" height="50" fill="#1a1408" />
        {[220, 500, 780].map((x, i) => (
          <rect key={i} x={x - 40} y="20" width="80" height="8" rx="2" fill="#c8a848" opacity="0.75" />
        ))}
        {/* Grand tableau d'affichage au fond avec papiers punaisés */}
        <g transform="translate(500,110)">
          <rect x="-160" y="-40" width="320" height="140" fill="#5a3818" stroke="#3a2010" strokeWidth="3" />
          <rect x="-154" y="-34" width="308" height="128" fill="#3a2818" opacity="0.7" />
          {/* Papiers punaisés */}
          {[
            [-120, -20, "#e8dfc8", -5],
            [-40,  -30, "#c8b090", 3],
            [30,   -10, "#e8dfc8", -3],
            [110,  -20, "#f0e4c8", 4],
            [-100, 40, "#e8dfc8", 2],
            [10,   50, "#c8b090", -4],
            [100,  40, "#e8dfc8", 3],
          ].map(([x, y, c, r], i) => (
            <g key={i} transform={`translate(${x},${y}) rotate(${r})`}>
              <rect x="-24" y="-14" width="48" height="30" fill={c} stroke="#5a4028" strokeWidth="0.6" />
              {/* Lignes de texte */}
              <line x1="-20" y1="-8" x2="20" y2="-8" stroke="#5a4028" strokeWidth="0.5" opacity="0.5" />
              <line x1="-20" y1="-2" x2="16" y2="-2" stroke="#5a4028" strokeWidth="0.5" opacity="0.5" />
              <line x1="-20" y1="4"  x2="18" y2="4"  stroke="#5a4028" strokeWidth="0.5" opacity="0.5" />
              {/* Punaise */}
              <circle cx="0" cy="-14" r="1.5" fill="#e83820" />
            </g>
          ))}
        </g>
        {/* Comptoir massif en bois qui traverse presque toute la salle */}
        <g transform="translate(100,340)">
          <rect x="0" y="0" width="800" height="40" fill="#5a3818" stroke="#1a0e08" strokeWidth="2" />
          <path d="M0 0 L800 0" stroke="#8a5030" strokeWidth="3" />
          {/* Registre ouvert posé sur le comptoir */}
          <g transform="translate(360,-20)">
            <path d="M-30 0 L30 0 L30 20 L-30 20 Z" fill="#e8dfc8" stroke="#5a4028" strokeWidth="1" />
            <path d="M0 0 L0 20" stroke="#5a4028" strokeWidth="1" />
            <line x1="-24" y1="8" x2="-4" y2="8" stroke="#5a4028" strokeWidth="0.4" />
            <line x1="-24" y1="13" x2="-6" y2="13" stroke="#5a4028" strokeWidth="0.4" />
            <line x1="4" y1="8" x2="24" y2="8" stroke="#5a4028" strokeWidth="0.4" />
            <line x1="4" y1="13" x2="22" y2="13" stroke="#5a4028" strokeWidth="0.4" />
          </g>
        </g>
        {/* Étagère de dossiers à l'extrémité gauche */}
        <g transform="translate(50,150)">
          <rect x="0" y="0" width="70" height="4" fill="#3a2818" />
          {[0, 12, 24, 36, 48, 60].map((x, i) => (
            <rect key={x} x={x} y="-30" width="10" height="30" fill={["#8a3820", "#5a2818", "#8a5030", "#5a4028", "#8a3820", "#5a2818"][i]} />
          ))}
          <rect x="0" y="70" width="70" height="4" fill="#3a2818" />
          {[0, 12, 24, 36, 48, 60].map((x, i) => (
            <rect key={x} x={x} y="40" width="10" height="30" fill={["#5a4028", "#8a5030", "#5a2818", "#8a3820", "#5a4028", "#8a5030"][i]} />
          ))}
        </g>

        {/* Les 3 PNJ derrière (ou devant) le comptoir — corps entiers via PnjSprite */}
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
      </svg>

      {/* Zone dialogue / verdict */}
      <div style={{ maxWidth: 900, width: "100%", minHeight: 90 }}>
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
          <div style={{ background: "#141020", border: "1px solid #3a80c8", borderRadius: 10, padding: "12px 16px" }}>
            <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#7fd8ff" }}>
              {currentPnj.nom.toUpperCase()} · {currentPnj.role}
            </div>
            <p style={{ margin: "4px 0 0", fontSize: 14, lineHeight: 1.5, color: "#e8eef5" }}>
              « {currentPnj.replique} »
            </p>
          </div>
        ) : (
          <div style={{ background: "#0a0e14", border: "1px dashed #3a4048", borderRadius: 10, padding: "12px 16px", textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: 13, color: "#7a879e", fontStyle: "italic" }}>
              Clique un PNJ dans la salle pour l'écouter.
              {heardAll ? " Tu peux maintenant rendre ton verdict." : ` (${Object.keys(j3.heardPnj).filter((k) => mission.pnj.some((p) => p.id === k)).length} / ${mission.pnj.length})`}
            </p>
          </div>
        )}
      </div>

      {!done && heardAll && !verdict && (
        <div style={{ maxWidth: 900, width: "100%" }}>
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
