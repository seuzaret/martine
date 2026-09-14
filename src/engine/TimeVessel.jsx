import { useState } from "react";
import { TemporalCompass } from "./TemporalCompass.jsx";

/* ============================================================
   VAISSEAU TEMPOREL — cadre narratif du saut de chapitre.
   Phases enchainees :
     1) martine     : MARTINE gros plan, annonce qu'elle est chargee.
     2) materialize : le vaisseau se materialise (halo vert grandissant).
     3) cockpit     : vue interieure, gros bouton GO.
     4) compass     : la boussole temporelle (TemporalCompass).
        - win  -> onDone() (le parent enchaine sur le tableau suivant)
        - caught -> retour a la phase cockpit
   ============================================================ */

export function TimeVessel({ nextLabel, onDone, onCancel }) {
  const [phase, setPhase] = useState("martine");

  /* Petit fond commun (ciel bleu nuit + horizon prehistorique) pour
     donner de l'ambiance avant l'ouverture du vaisseau. */
  const backdrop = (
    <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-hidden="true">
      <defs>
        <linearGradient id="tvSky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#132444" />
          <stop offset="1" stopColor="#3a5a78" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#tvSky)" />
      {/* etoiles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <circle key={i} cx={(i * 137) % 800} cy={(i * 79) % 240} r={(i % 3) * 0.4 + 0.5} fill="#d0dcee" opacity={0.4 + (i % 4) * 0.1} />
      ))}
      {/* horizon prehistorique */}
      <path d="M 0 320 Q 200 280 400 310 Q 600 340 800 300 L 800 450 L 0 450 Z" fill="#2a3a24" opacity="0.9" />
      <path d="M 0 350 Q 180 322 360 342 Q 540 360 800 328 L 800 450 L 0 450 Z" fill="#1a2618" />
      {/* volcan lointain */}
      <path d="M 540 335 L 605 260 L 670 335 Z" fill="#1a1610" opacity="0.85" />
      <path d="M 605 260 L 610 240 L 618 258 L 614 268 L 605 260 Z" fill="#e04a30" opacity="0.75" />
      {/* silhouette arbre prehistorique */}
      <path d="M 120 330 Q 118 300 130 285 Q 145 275 148 265 M 130 285 Q 118 275 108 280"
        stroke="#0a0a0a" strokeWidth="4" fill="none" strokeLinecap="round" />
      <ellipse cx="128" cy="272" rx="24" ry="14" fill="#1a2a10" />
    </svg>
  );

  /* ---------- PHASE COMPASS : le mini-jeu de la boussole ---------- */
  if (phase === "compass") {
    return (
      <TemporalCompass
        nextLabel={nextLabel}
        onLock={() => onDone?.()}
        onCaught={() => setPhase("cockpit")}
        onClose={() => setPhase("cockpit")} /* ESC pendant le jeu = retour cockpit */
      />
    );
  }

  /* ---------- PHASES NARRATIVES ---------- */
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 90, background: "#080d16", overflow: "hidden", fontFamily: "Palatino, Georgia, serif" }}>
      {backdrop}

      {/* ---------- 1. MARTINE ANNONCE ---------- */}
      {phase === "martine" && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ maxWidth: 620, textAlign: "center" }}>
            {/* MARTINE gros plan : cercle vert avec initiale */}
            <div style={{
              width: 180, height: 180, margin: "0 auto 22px", borderRadius: "50%",
              background: "radial-gradient(circle at 35% 30%, #b0ffdc 0%, #5eff9e 55%, #14b070 100%)",
              boxShadow: "0 0 60px rgba(94,255,158,0.6), inset -8px -14px 20px rgba(0,60,30,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "ui-monospace,monospace", fontSize: 92, fontWeight: 900, color: "#06110b",
              animation: "tvMartinePulse 2.6s ease-in-out infinite",
            }}>M</div>
            <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 12, letterSpacing: 3, color: "#5eff9e" }}>
              ▶ MARTINE — CANAL PRIORITAIRE
            </div>
            <div style={{
              marginTop: 12, background: "#0e1a30", border: "2px solid #5eff9e", borderRadius: 14,
              padding: "18px 22px", color: "#e8eef5", boxShadow: "0 0 30px rgba(94,255,158,0.35)",
            }}>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55 }}>
                « J'ai emmagasiné assez de <strong style={{ color: "#ffd166" }}>flux temporel</strong> pour matérialiser le
                {" "}<strong style={{ color: "#5eff9e" }}>vaisseau temporel</strong>. »
              </p>
              <p style={{ margin: "10px 0 0", fontSize: 15, lineHeight: 1.5, color: "#c8d4e2" }}>
                Approche — je vais le faire apparaître.
              </p>
            </div>
            <button onClick={() => setPhase("materialize")}
              autoFocus
              style={{
                marginTop: 20, background: "#5eff9e", color: "#06110b", border: "none",
                borderRadius: 12, padding: "14px 34px", fontSize: 16, fontWeight: 800, cursor: "pointer",
                fontFamily: "ui-monospace,monospace", letterSpacing: 3,
                boxShadow: "0 0 20px rgba(94,255,158,0.5)",
              }}>▶ CONTINUER</button>
          </div>
          <style>{`@keyframes tvMartinePulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }`}</style>
        </div>
      )}

      {/* ---------- 2. MATERIALISATION DU VAISSEAU ---------- */}
      {phase === "materialize" && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <svg viewBox="0 0 800 500" style={{ width: "100%", maxWidth: 900, height: "auto" }} aria-hidden="true">
            {/* halo vert grandissant */}
            <defs>
              <radialGradient id="tvHalo" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0"    stopColor="#b0ffdc" stopOpacity="0.9" />
                <stop offset="0.45" stopColor="#5eff9e" stopOpacity="0.55" />
                <stop offset="1"    stopColor="#5eff9e" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="400" cy="250" r="240" fill="url(#tvHalo)">
              <animate attributeName="r" values="20;320;280" keyTimes="0;0.7;1" dur="2.2s" repeatCount="1" fill="freeze" />
              <animate attributeName="opacity" values="0;1;0.6" keyTimes="0;0.6;1" dur="2.2s" repeatCount="1" fill="freeze" />
            </circle>

            {/* vaisseau (soucoupe iso stylisée), fade-in */}
            <g opacity="0">
              <animate attributeName="opacity" values="0;1" keyTimes="0;1" dur="0.9s" begin="1.2s" fill="freeze" />
              {/* coque du dessous (ombre) */}
              <ellipse cx="400" cy="290" rx="220" ry="34" fill="#1a2618" opacity="0.7" />
              {/* corps principal */}
              <ellipse cx="400" cy="270" rx="220" ry="52" fill="#3a4a4a" stroke="#0a1420" strokeWidth="2" />
              <ellipse cx="400" cy="266" rx="220" ry="46" fill="#5a7a80" opacity="0.75" />
              {/* dome/cockpit vitre */}
              <ellipse cx="400" cy="238" rx="120" ry="42" fill="#2a4058" stroke="#0a1420" strokeWidth="2" />
              <ellipse cx="400" cy="234" rx="118" ry="38" fill="#7fd8ff" opacity="0.5" />
              <ellipse cx="360" cy="218" rx="45" ry="14" fill="#e8f5ff" opacity="0.55" />
              {/* hublots latéraux */}
              {[220, 300, 500, 580].map((cx, i) => (
                <circle key={i} cx={cx} cy="272" r="7" fill="#5eff9e" stroke="#0a1420" strokeWidth="1.4">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur={`${1.4 + i * 0.3}s`} repeatCount="indefinite" />
                </circle>
              ))}
              {/* PORTE cliquable (au centre du corps) */}
              <g style={{ cursor: "pointer" }} onClick={() => setPhase("cockpit")}>
                <rect x="384" y="258" width="32" height="42" rx="4" fill="#0a1420" stroke="#5eff9e" strokeWidth="2" />
                <circle cx="410" cy="280" r="1.8" fill="#5eff9e" />
                <text x="400" y="330" textAnchor="middle" fontSize="14" fontWeight="800"
                  fill="#5eff9e" fontFamily="ui-monospace,monospace" letterSpacing="2">
                  ▶ ENTRER
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="1.4s" repeatCount="indefinite" />
                </text>
              </g>
              {/* rayons de lumière verte sous le vaisseau */}
              {[-100, -50, 0, 50, 100].map((dx, i) => (
                <line key={i} x1={400 + dx} y1="300" x2={400 + dx * 1.8} y2="440"
                  stroke="#5eff9e" strokeWidth="1.5" opacity="0.35">
                  <animate attributeName="opacity" values="0.15;0.5;0.15" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                </line>
              ))}
            </g>
          </svg>
        </div>
      )}

      {/* ---------- 3. COCKPIT ---------- */}
      {phase === "cockpit" && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
          {/* Grande vitre panoramique donnant sur l'exterieur */}
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            {backdrop}
            {/* cadre en arc de la vitre */}
            <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-hidden="true">
              <path d="M 0 0 L 0 450 L 60 380 Q 400 340 740 380 L 800 450 L 800 0 Z"
                fill="#0e1a30" />
              {/* rivets sur le cadre */}
              {[80, 170, 260, 350, 440, 530, 620, 720].map((x, i) => (
                <circle key={i} cx={x} cy="365" r="3" fill="#5eff9e" opacity="0.6" />
              ))}
              {/* Contour vitre lumineux */}
              <path d="M 60 380 Q 400 340 740 380" stroke="#5eff9e" strokeWidth="2" fill="none" opacity="0.7" />
            </svg>
          </div>
          {/* Console de bord */}
          <div style={{
            background: "linear-gradient(180deg, #14202c 0%, #0a1420 100%)",
            borderTop: "3px solid #2a4058",
            padding: "20px 20px 26px",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
          }}>
            <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 3, color: "#5eff9e" }}>
              ▶ COCKPIT — VAISSEAU TEMPOREL
            </div>
            <p style={{ margin: 0, maxWidth: 640, textAlign: "center", color: "#c8d4e2", fontSize: 15, lineHeight: 1.5 }}>
              « Pour avancer dans l'histoire, il faut <strong style={{ color: "#7fd8ff" }}>plonger dans le flux temporel</strong>
              {" "}et trouver le prochain <strong style={{ color: "#ffd166" }}>nœud de communication</strong> à verrouiller. »
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 4 }}>
              {/* voyants */}
              {["#5eff9e", "#ffd166", "#7fd8ff"].map((c, i) => (
                <div key={i} style={{
                  width: 14, height: 14, borderRadius: "50%", background: c,
                  boxShadow: `0 0 12px ${c}`,
                  animation: `tvLed 1.3s ease-in-out ${i * 0.3}s infinite`,
                }} />
              ))}
              <button onClick={() => setPhase("compass")}
                autoFocus
                style={{
                  background: "#5eff9e", color: "#06110b", border: "none",
                  borderRadius: 12, padding: "16px 44px", fontSize: 18, fontWeight: 800, cursor: "pointer",
                  fontFamily: "ui-monospace,monospace", letterSpacing: 4,
                  boxShadow: "0 0 24px rgba(94,255,158,0.55)",
                }}>▶ GO</button>
              {["#7fd8ff", "#ffd166", "#5eff9e"].map((c, i) => (
                <div key={`r${i}`} style={{
                  width: 14, height: 14, borderRadius: "50%", background: c,
                  boxShadow: `0 0 12px ${c}`,
                  animation: `tvLed 1.3s ease-in-out ${0.5 + i * 0.3}s infinite`,
                }} />
              ))}
            </div>
            <button onClick={onCancel}
              style={{
                marginTop: 4, background: "transparent", color: "#8fa3bd", border: "none",
                fontSize: 12, cursor: "pointer", fontFamily: "ui-monospace,monospace",
              }}>← Retourner à l'époque</button>
          </div>
          <style>{`@keyframes tvLed { 0%,100% { opacity: 0.35; } 50% { opacity: 1; } }`}</style>
        </div>
      )}
    </div>
  );
}
