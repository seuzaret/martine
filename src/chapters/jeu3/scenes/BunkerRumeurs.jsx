import { useState } from "react";

/* ============================================================
   JEU 3 — SCÈNE : « Bureau des Rumeurs » (R-01) — MISSION TUTO
   ------------------------------------------------------------
   Trois PNJ derrière le comptoir. Le joueur clique chacun pour
   entendre sa réplique. Une fois les trois entendus, il peut
   rendre son verdict (rumeur / fragile / solide). Bon verdict :
   flag posé + félicitations. Mauvais verdict : commentaire
   MARTINE, on peut réessayer.
   L'état "PNJ entendus" et le flag de mission vivent dans j3
   (parent Jeu3) pour survivre à un aller-retour dans le hub.
   ============================================================ */
export default function BunkerRumeurs({ onGo, j3 }) {
  const mission = j3.missions.kova;
  const done = j3.flags[mission.flag];
  const heardAll = mission.pnj.every((p) => j3.heardPnj[p.id]);
  const [selected, setSelected] = useState(null);   // pnj id actuellement affiché
  const [verdict, setVerdict] = useState(null);     // {ok, retour} après un choix
  const currentPnj = selected ? mission.pnj.find((p) => p.id === selected) : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      {/* Bandeau mission */}
      <div style={{ maxWidth: 800, width: "100%", background: "#0e1a30", border: "1px solid #5a4028", borderRadius: 10, padding: "10px 14px" }}>
        <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 10, letterSpacing: 2, color: "#e0a848" }}>
          🎯 MISSION · {mission.titre.toUpperCase()}
        </div>
        <p style={{ margin: "4px 0 0", fontSize: 13.5, lineHeight: 1.45, color: "#c8d4e2" }}>
          {mission.briefing}
        </p>
      </div>

      <svg viewBox="0 0 800 400" style={{ display: "block", width: "100%", height: "auto", maxHeight: "45vh" }}>
        <defs>
          <linearGradient id="br-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2418" />
            <stop offset="100%" stopColor="#141008" />
          </linearGradient>
        </defs>
        <rect width="800" height="400" fill="url(#br-wall)" />
        <rect x="0" y="0" width="800" height="50" fill="#1a1408" />
        <rect x="260" y="16" width="280" height="12" rx="3" fill="#e0a848" opacity="0.7" />
        <rect x="0" y="330" width="800" height="70" fill="#0e0a04" />

        {/* Comptoir massif */}
        <g transform="translate(80,270)">
          <rect x="0" y="0" width="640" height="60" fill="#5a3818" stroke="#1a0e08" strokeWidth="2" />
          <path d="M0 0 L640 0" stroke="#8a5030" strokeWidth="3" />
        </g>

        {/* Étagère de dossiers à gauche */}
        <g transform="translate(30,80)">
          <rect x="0" y="0" width="60" height="6" fill="#3a2818" />
          {[0, 12, 24, 36].map((x, i) => (
            <rect key={x} x={x} y="-24" width="10" height="24" fill={["#8a3820", "#5a2818", "#8a5030", "#5a4028"][i]} />
          ))}
          <rect x="0" y="60" width="60" height="6" fill="#3a2818" />
          {[0, 12, 24, 36].map((x, i) => (
            <rect key={x} x={x} y="36" width="10" height="24" fill={["#5a4028", "#8a5030", "#5a2818", "#8a3820"][i]} />
          ))}
        </g>

        {/* Les trois PNJ derrière le comptoir */}
        {mission.pnj.map((p) => {
          const heard = j3.heardPnj[p.id];
          const active = selected === p.id;
          return (
            <g key={p.id} transform={`translate(${p.pose.x},${p.pose.y})`}
              onClick={() => { setSelected(p.id); j3.hear(p.id); setVerdict(null); }}
              style={{ cursor: done ? "default" : "pointer" }}>
              {/* halo si actif */}
              {active && (
                <circle cx="0" cy="20" r="66" fill="none" stroke="#ffd166" strokeWidth="2" strokeDasharray="4 4">
                  <animate attributeName="r" values="60;70;60" dur="1.6s" repeatCount="indefinite" />
                </circle>
              )}
              {/* corps (buste) */}
              <ellipse cx="0" cy="60" rx="38" ry="22" fill={p.color} stroke="#0a0806" strokeWidth="1.5" />
              {/* tête */}
              <ellipse cx="0" cy="15" rx="18" ry="20" fill="#e0a878" stroke="#5a3018" strokeWidth="1" />
              {/* cheveux */}
              <path d="M-16 0 q0 -18 8 -20 q8 2 10 -6 q4 8 10 -2 q4 6 8 8 q4 8 4 20 z" fill="#2a1808" />
              {/* yeux */}
              <circle cx="-5" cy="15" r="1.6" fill="#0a0806" />
              <circle cx="5" cy="15" r="1.6" fill="#0a0806" />
              {/* bouche */}
              <path d="M-3 24 Q0 26 3 24" stroke="#5a2818" strokeWidth="1" fill="none" strokeLinecap="round" />
              {/* pastille verte "déjà entendu" */}
              {heard && (
                <g transform="translate(24,-4)">
                  <circle r="8" fill="#5eff9e" stroke="#0a0806" strokeWidth="1.2" />
                  <path d="M-4 0 L-1 3 L5 -3" stroke="#0a0806" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              )}
              {/* nom + rôle */}
              <text x="0" y="96" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fontWeight="700" fill="#e8dfc8">{p.nom}</text>
              <text x="0" y="107" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#8a7050">{p.role}</text>
            </g>
          );
        })}
      </svg>

      {/* Zone dialogue / verdict */}
      <div style={{ maxWidth: 800, width: "100%", minHeight: 90 }}>
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
              Clique un PNJ derrière le comptoir pour l'écouter.
              {heardAll ? " Tu peux maintenant rendre ton verdict." : ` (${Object.keys(j3.heardPnj).filter((k) => mission.pnj.some((p) => p.id === k)).length} / ${mission.pnj.length})`}
            </p>
          </div>
        )}
      </div>

      {/* Zone verdict — apparaît quand tous les PNJ ont été entendus */}
      {!done && heardAll && !verdict && (
        <div style={{ maxWidth: 800, width: "100%" }}>
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

      <button onClick={() => onGo("hub")}
        style={{ background: "#141b26", color: "#7fd8ff", border: "1px solid #3a80c8", borderRadius: 10, padding: "10px 22px", fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: "ui-monospace,monospace", letterSpacing: 1, marginTop: 4 }}>
        ← Retour au couloir
      </button>
    </div>
  );
}
