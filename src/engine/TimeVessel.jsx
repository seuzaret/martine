import { useEffect, useRef, useState } from "react";
import { TemporalCompass } from "./TemporalCompass.jsx";
import { Avatar } from "./Martine.jsx";
import SceneExterieur from "../chapters/01-paleolithique/scenes/SceneExterieur.jsx";

/* ============================================================
   VAISSEAU TEMPOREL — cadre narratif du saut de chapitre.
   Phases :
     1) martine     : grand plan MARTINE, texte en bas centré
                      (fond = "Devant la grotte" nu, sans persos)
     2) materialize : la machine se materialise au centre, posée au sol
     3) cockpit     : vue interieure, gros bouton GO
     4) compass     : TemporalCompass (win -> onDone, caught -> cockpit)
   ============================================================ */

const noop = () => {};
const backdropScene = (
  <SceneExterieur bare collect={noop} action={noop} reveal={null} made={[]} queteQui={null} />
);

/* ---------- LA MACHINE TEMPORELLE (bulle + pieds fusée) ---------- */
function TimeMachine({ landed = false }) {
  return (
    <g>
      <defs>
        <radialGradient id="tmBubble" cx="0.35" cy="0.3" r="0.75">
          <stop offset="0"    stopColor="#eafff7" stopOpacity="0.85" />
          <stop offset="0.35" stopColor="#7fecc4" stopOpacity="0.55" />
          <stop offset="0.85" stopColor="#3aa07a" stopOpacity="0.35" />
          <stop offset="1"    stopColor="#12503a" stopOpacity="0.7" />
        </radialGradient>
        <linearGradient id="tmMetal" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#c8d0d8" />
          <stop offset="1" stopColor="#5a6270" />
        </linearGradient>
        <linearGradient id="tmMetalDark" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#4a525c" />
          <stop offset="1" stopColor="#1a2028" />
        </linearGradient>
        <radialGradient id="tmFlame" cx="0.5" cy="0" r="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.3" stopColor="#a0ffce" stopOpacity="0.9" />
          <stop offset="0.7" stopColor="#5eff9e" stopOpacity="0.6" />
          <stop offset="1" stopColor="#5eff9e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ombre au sol quand posé (les pieds touchent le sol y=150) */}
      {landed && (
        <ellipse cx="0" cy="150" rx="160" ry="16" fill="#0a1408" opacity="0.55" />
      )}

      {/* --- Pieds fusée (3 pattes en tripode, semelles à y=150) --- */}
      <g>
        {[-70, 0, 70].map((x, i) => (
          <g key={i}>
            {/* patte principale : cylindre chromé qui s'évase */}
            <path d={`M ${x - 8} 30 L ${x - 14} 120 L ${x - 22} 148 L ${x + 22} 148 L ${x + 14} 120 L ${x + 8} 30 Z`}
              fill="url(#tmMetal)" stroke="#1a2028" strokeWidth="1.2" />
            {/* rivets */}
            <circle cx={x - 6} cy="50" r="1.4" fill="#0a1420" />
            <circle cx={x + 6} cy="50" r="1.4" fill="#0a1420" />
            <circle cx={x - 8} cy="90" r="1.4" fill="#0a1420" />
            <circle cx={x + 8} cy="90" r="1.4" fill="#0a1420" />
            {/* semelle circulaire qui touche le sol */}
            <ellipse cx={x} cy="150" rx="30" ry="7" fill="url(#tmMetalDark)" stroke="#0a1420" strokeWidth="1.2" />
            <ellipse cx={x} cy="148" rx="30" ry="5" fill="#7a8890" />
          </g>
        ))}
      </g>

      {/* --- Anneau de base sur lequel repose la bulle --- */}
      <ellipse cx="0" cy="30" rx="105" ry="18" fill="url(#tmMetalDark)" stroke="#0a1420" strokeWidth="1.4" />
      <ellipse cx="0" cy="26" rx="105" ry="16" fill="url(#tmMetal)" />
      {[-90, -60, -30, 0, 30, 60, 90].map((x, i) => (
        <circle key={i} cx={x} cy="24" r="1.6" fill="#1a2028" />
      ))}

      {/* --- ANNEAUX D'ENERGIE TEMPORELLE (rotation orbitale) --- */}
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0;360" dur="9s" repeatCount="indefinite" />
        <ellipse cx="0" cy="-40" rx="118" ry="28" fill="none" stroke="#5eff9e" strokeWidth="1.6" opacity="0.5" strokeDasharray="6 4" />
      </g>
      <g>
        <animateTransform attributeName="transform" type="rotate" values="360;0" dur="14s" repeatCount="indefinite" />
        <ellipse cx="0" cy="-30" rx="128" ry="34" fill="none" stroke="#7fd8ff" strokeWidth="1.2" opacity="0.35" strokeDasharray="3 5" />
      </g>

      {/* --- BULLE DE VERRE PRINCIPALE --- */}
      <circle cx="0" cy="-40" r="95" fill="url(#tmBubble)" stroke="#a8f0d0" strokeWidth="1.6" />
      <ellipse cx="-38" cy="-80" rx="30" ry="18" fill="#ffffff" opacity="0.4" transform="rotate(-30 -38 -80)" />
      <ellipse cx="-52" cy="-58" rx="8" ry="16" fill="#ffffff" opacity="0.3" transform="rotate(-20 -52 -58)" />
      <ellipse cx="0" cy="-40" rx="95" ry="95" fill="none" stroke="#3a5a48" strokeWidth="1.5" opacity="0.6" />
      <path d="M -95 -40 L 95 -40" stroke="#3a5a48" strokeWidth="1" opacity="0.5" />
      <path d="M 0 -135 L 0 55" stroke="#3a5a48" strokeWidth="1" opacity="0.4" />

      {/* --- INTERIEUR : cabine visible à travers la bulle --- */}
      <path d="M -50 20 Q -55 5 -50 -8 L 50 -8 Q 55 5 50 20 Z" fill="#0a1620" stroke="#3a5060" strokeWidth="1" opacity="0.85" />
      <rect x="-42" y="-4" width="12" height="6" rx="1" fill="#5eff9e" opacity="0.85" />
      <rect x="-26" y="-4" width="12" height="6" rx="1" fill="#ffd166" opacity="0.85" />
      <rect x="-10" y="-4" width="12" height="6" rx="1" fill="#7fd8ff" opacity="0.85" />
      <rect x="6" y="-4"  width="12" height="6" rx="1" fill="#ff6a7a" opacity="0.85" />
      <rect x="22" y="-4" width="12" height="6" rx="1" fill="#c8a8f0" opacity="0.85" />
      <path d="M -14 -12 L 14 -12 L 16 12 L -16 12 Z" fill="#2a3a4a" opacity="0.6" />
      <path d="M -14 -40 L -14 -12 L 14 -12 L 14 -40 Q 0 -50 -14 -40 Z" fill="#3a4a5a" opacity="0.5" />

      {/* --- PORTE circulaire à l'avant (cliquable) --- */}
      <ellipse cx="0" cy="-30" rx="26" ry="34" fill="#0a1420" stroke="#5eff9e" strokeWidth="2" opacity="0.85" />
      <circle cx="18" cy="-30" r="2" fill="#5eff9e">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
      </circle>

      {/* --- MAT + ANTENNE en haut --- */}
      <rect x="-2.5" y="-158" width="5" height="30" fill="url(#tmMetal)" stroke="#0a1420" strokeWidth="0.8" />
      <circle cx="0" cy="-160" r="4" fill="#ffd166" stroke="#8a5a20" strokeWidth="1">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="1.2s" repeatCount="indefinite" />
      </circle>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="0" cy="-160" r={8 + i * 8} fill="none" stroke="#ffd166" strokeWidth="0.8" opacity="0.4">
          <animate attributeName="r" values={`${8 + i * 6};${28 + i * 6}`} dur="2.4s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0" dur="2.4s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {/* --- Flammes vertes qui pulsent sous les pieds (au-dessus de la semelle) --- */}
      {landed && [-70, 0, 70].map((x, i) => (
        <ellipse key={`f${i}`} cx={x} cy="164" rx="18" ry="10" fill="url(#tmFlame)" opacity="0.7">
          <animate attributeName="ry" values="6;14;6" dur="1.4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.85;0.4" dur="1.4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
        </ellipse>
      ))}
    </g>
  );
}

/* ============================================================
   COMPOSANT PRINCIPAL
   ============================================================ */
export function TimeVessel({ nextLabel, onDone, onCancel }) {
  const [phase, setPhase] = useState("martine");
  const [flux, setFlux] = useState(0);
  const rafRef = useRef(null);

  /* Anime la jauge de flux temporel : 0 → 100 % en ~3.2 s */
  useEffect(() => {
    if (phase !== "martine") return;
    const start = performance.now();
    const dur = 3200;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 2);
      setFlux(Math.round(eased * 100));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  /* ---------- PHASE COMPASS : le mini-jeu ---------- */
  if (phase === "compass") {
    return (
      <TemporalCompass
        nextLabel={nextLabel}
        onLock={() => onDone?.()}
        onCaught={() => setPhase("cockpit")}
        onClose={() => setPhase("cockpit")}
      />
    );
  }

  /* ---------- FOND : le tableau prehistorique "devant la grotte" NU ---------- */
  const backdrop = (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {backdropScene}
      <div style={{ position: "absolute", inset: 0, background: "rgba(4,8,14,0.35)" }} />
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 90, background: "#080d16", overflow: "hidden", fontFamily: "Palatino, Georgia, serif" }}>
      {backdrop}

      {/* ---------- 1. MARTINE ANNONCE (gros plan) ---------- */}
      {phase === "martine" && (
        <>
          {/* MARTINE : GRAND PLAN, ancrée à gauche */}
          <div style={{
            position: "absolute", top: "50%", left: "22%", transform: "translate(-50%, -50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
          }}>
            <div style={{
              padding: 24, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(94,255,158,0.4) 0%, rgba(94,255,158,0) 70%)",
              animation: "tvMartineGlow 2.8s ease-in-out infinite",
            }}>
              <Avatar mood="content" size={340} talking />
            </div>
            <div style={{
              fontFamily: "ui-monospace,monospace", fontSize: 13, letterSpacing: 3, color: "#5eff9e",
              background: "rgba(4,8,14,0.7)", padding: "6px 14px", borderRadius: 6,
            }}>▶ MARTINE</div>
          </div>

          {/* Bulle de dialogue : CENTREE EN BAS */}
          <div style={{
            position: "absolute", left: "50%", bottom: "6%", transform: "translateX(-50%)",
            maxWidth: 720, width: "min(90%, 720px)",
          }}>
            <div style={{
              background: "#0e1a30", border: "2px solid #5eff9e", borderRadius: 14,
              padding: "20px 26px", color: "#e8eef5",
              boxShadow: "0 0 30px rgba(94,255,158,0.35)",
              textAlign: "center",
            }}>
              <p style={{ margin: 0, fontSize: 18, lineHeight: 1.55 }}>
                « J'ai emmagasiné assez de <strong style={{ color: "#ffd166" }}>flux temporel</strong>
                {" "}pour matérialiser la <strong style={{ color: "#5eff9e" }}>machine temporelle</strong>. »
              </p>

              {/* JAUGE de flux temporel : bleu → vert qui se remplit avec le texte */}
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                margin: "16px auto 0", maxWidth: 520,
              }}>
                <div style={{
                  fontFamily: "ui-monospace,monospace", fontSize: 11,
                  letterSpacing: 2, color: "#7fd8ff", whiteSpace: "nowrap",
                }}>FLUX TEMPOREL</div>
                <div style={{
                  flex: 1, height: 18, borderRadius: 10,
                  background: "linear-gradient(90deg, #0e2a4a 0%, #123a5c 100%)",
                  border: "1.5px solid #2a5078", overflow: "hidden",
                  boxShadow: "inset 0 0 8px rgba(0,0,0,0.5)", position: "relative",
                }}>
                  <div style={{
                    height: "100%", width: `${flux}%`,
                    background: "linear-gradient(90deg, #3aa07a 0%, #5eff9e 60%, #b0ffdc 100%)",
                    boxShadow: "0 0 12px rgba(94,255,158,0.7)",
                    transition: "width 60ms linear",
                  }} />
                  {/* reflet qui glisse par-dessus */}
                  <div style={{
                    position: "absolute", top: 2, left: 0, height: 4, width: "100%",
                    background: "linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.4) 50%, transparent 80%)",
                    animation: "tvGaugeShine 2s linear infinite",
                    opacity: 0.8, pointerEvents: "none",
                  }} />
                </div>
                <div style={{
                  fontFamily: "ui-monospace,monospace", fontSize: 12, fontWeight: 800,
                  color: flux >= 100 ? "#b0ffdc" : "#5eff9e", minWidth: 44, textAlign: "right",
                  textShadow: flux >= 100 ? "0 0 8px rgba(94,255,158,0.9)" : "none",
                }}>{flux}%</div>
              </div>

              <p style={{ margin: "12px 0 0", fontSize: 15, lineHeight: 1.5, color: "#c8d4e2" }}>
                Regarde — elle apparaît sous nos yeux.
              </p>
              <button onClick={() => setPhase("materialize")}
                autoFocus
                style={{
                  marginTop: 14, background: "#5eff9e", color: "#06110b", border: "none",
                  borderRadius: 12, padding: "12px 34px", fontSize: 15, fontWeight: 800,
                  cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: 3,
                  boxShadow: "0 0 18px rgba(94,255,158,0.45)",
                }}>▶ CONTINUER</button>
            </div>
          </div>

          <style>{`
            @keyframes tvMartineGlow { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } }
            @keyframes tvGaugeShine { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
          `}</style>
        </>
      )}

      {/* ---------- 2. MATERIALISATION DE LA MACHINE (centrée, posée) ---------- */}
      {phase === "materialize" && (
        <div style={{ position: "absolute", inset: 0 }}>
          {/* La machine — centrée horizontalement, semelles au sol */}
          <svg viewBox="0 0 600 500" preserveAspectRatio="xMidYMax meet"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            aria-hidden="true">
            {/* halo vert croissant, centré */}
            <defs>
              <radialGradient id="tvHaloBig" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0"    stopColor="#b0ffdc" stopOpacity="0.9" />
                <stop offset="0.45" stopColor="#5eff9e" stopOpacity="0.5" />
                <stop offset="1"    stopColor="#5eff9e" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="300" cy="300" r="320" fill="url(#tvHaloBig)">
              <animate attributeName="r" values="20;380;340" keyTimes="0;0.65;1" dur="2s" repeatCount="1" fill="freeze" />
              <animate attributeName="opacity" values="0;1;0.7" keyTimes="0;0.55;1" dur="2s" repeatCount="1" fill="freeze" />
            </circle>

            {/* Machine dessinée à (300, 330) — les pieds (y=150 local) touchent y=480 ≈ sol */}
            <g transform="translate(300 330)" opacity="0">
              <animate attributeName="opacity" values="0;1" dur="0.8s" begin="1.2s" fill="freeze" />
              <TimeMachine landed={true} />
            </g>
          </svg>

          {/* Bouton ENTRER — au-dessus en HTML pour être toujours cliquable */}
          <button onClick={() => setPhase("cockpit")}
            autoFocus
            style={{
              position: "absolute", left: "50%", bottom: "5%", transform: "translateX(-50%)",
              opacity: 0, animation: "tvBtnAppear 0.6s ease-out 2.2s forwards",
              background: "#5eff9e", color: "#06110b", border: "none",
              borderRadius: 12, padding: "14px 40px", fontSize: 17, fontWeight: 800,
              cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: 4,
              boxShadow: "0 0 22px rgba(94,255,158,0.5)",
            }}>▶ ENTRER</button>
          <style>{`
            @keyframes tvBtnAppear { to { opacity: 1; } }
          `}</style>
        </div>
      )}

      {/* ---------- 3. COCKPIT ---------- */}
      {phase === "cockpit" && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            {backdropScene}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(4,20,10,0.15) 0%, rgba(4,20,10,0.35) 100%)" }} />
            <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} aria-hidden="true">
              <path d="M 0 0 L 0 450 L 60 380 Q 400 340 740 380 L 800 450 L 800 0 Z"
                fill="#0e1a30" />
              {[80, 170, 260, 350, 440, 530, 620, 720].map((x, i) => (
                <circle key={i} cx={x} cy="365" r="3" fill="#5eff9e" opacity="0.6" />
              ))}
              <path d="M 60 380 Q 400 340 740 380" stroke="#5eff9e" strokeWidth="2" fill="none" opacity="0.7" />
            </svg>
          </div>
          <div style={{
            background: "linear-gradient(180deg, #14202c 0%, #0a1420 100%)",
            borderTop: "3px solid #2a4058",
            padding: "20px 20px 26px",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
          }}>
            <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 3, color: "#5eff9e" }}>
              ▶ COCKPIT — MACHINE TEMPORELLE
            </div>
            <p style={{ margin: 0, maxWidth: 640, textAlign: "center", color: "#c8d4e2", fontSize: 15, lineHeight: 1.5 }}>
              « Pour avancer dans l'histoire, il faut <strong style={{ color: "#7fd8ff" }}>plonger dans le flux temporel</strong>
              {" "}et trouver le prochain <strong style={{ color: "#ffd166" }}>nœud de communication</strong> à verrouiller. »
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 4 }}>
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
