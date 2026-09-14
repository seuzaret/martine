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

/* ---------- PHASE MATERIALIZE : machine + zone cliquable large ---------- */
function MaterializePhase({ onEnter }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* La machine — SVG en fond, NON cliquable (pointer-events:none) */}
      <svg viewBox="0 0 600 500" preserveAspectRatio="xMidYMax meet"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        aria-hidden="true">
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
        <g transform="translate(300 330)" opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.8s" begin="1.2s" fill="freeze" />
          <TimeMachine landed={true} />
        </g>
      </svg>

      {/* Grande zone cliquable invisible qui couvre la MACHINE et sa PORTE.
          Une fois la machine matérialisée (ready), tout clic dessus fait entrer. */}
      {ready && (
        <button onClick={onEnter}
          title="Entrer dans la machine"
          style={{
            position: "absolute", left: "50%", top: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(52%, 420px)", aspectRatio: "0.9",
            background: "transparent", border: "none", cursor: "pointer",
            padding: 0, margin: 0, outline: "none",
            animation: "tvHintPulse 1.8s ease-in-out infinite",
          }}
          aria-label="Entrer dans la machine temporelle" />
      )}

      {/* Bouton ENTRER — visible dès que la machine est prête */}
      {ready && (
        <button onClick={onEnter}
          autoFocus
          style={{
            position: "absolute", left: "50%", bottom: "5%", transform: "translateX(-50%)",
            background: "#5eff9e", color: "#06110b", border: "none",
            borderRadius: 12, padding: "14px 40px", fontSize: 17, fontWeight: 800,
            cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: 4,
            boxShadow: "0 0 22px rgba(94,255,158,0.5)",
            animation: "tvBtnAppear 0.4s ease-out",
          }}>▶ ENTRER DANS LA MACHINE</button>
      )}

      {/* Indice "clique sur la porte" */}
      {ready && (
        <div style={{
          position: "absolute", left: "50%", top: "12%", transform: "translateX(-50%)",
          fontFamily: "ui-monospace,monospace", fontSize: 13, letterSpacing: 2,
          color: "#5eff9e", background: "rgba(4,8,14,0.7)",
          padding: "8px 16px", borderRadius: 8,
          border: "1px solid rgba(94,255,158,0.4)",
          animation: "tvBtnAppear 0.4s ease-out",
          pointerEvents: "none",
        }}>Clique sur la porte de la machine ↓</div>
      )}

      <style>{`
        @keyframes tvBtnAppear { from { opacity: 0; } to { opacity: 1; } }
        @keyframes tvHintPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(94,255,158,0); }
          50%     { box-shadow: 0 0 0 8px rgba(94,255,158,0.15); }
        }
      `}</style>
    </div>
  );
}

/* ---------- PHASE COCKPIT : paysage teinté + console demi-cercle ---------- */
function CockpitPhase({ onGo, onCancel }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "#050810" }}>
      {/* ---- HAUT : paysage vu depuis le cockpit, teinté jaunâtre ---- */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {backdropScene}
        {/* teinte jaunâtre du verre du cockpit */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(255,205,110,0.28) 0%, rgba(255,175,80,0.22) 60%, rgba(200,130,50,0.35) 100%)",
          mixBlendMode: "multiply",
          pointerEvents: "none",
        }} />
        {/* léger reflet en haut du verre */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "18%",
          background: "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />
        {/* petits reflets diagonaux sur le verre */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          viewBox="0 0 800 500" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 60 20 L 200 30 L 220 100 L 80 90 Z" fill="rgba(255,255,255,0.06)" />
          <path d="M 620 20 L 720 40 L 700 80 L 600 60 Z" fill="rgba(255,255,255,0.05)" />
        </svg>
      </div>

      {/* ---- BAS : console demi-cercle métal avec cadrans et boutons ---- */}
      <div style={{ position: "relative", height: "42%", minHeight: 280, overflow: "visible" }}>
        <svg viewBox="0 0 1000 420" preserveAspectRatio="xMidYMax slice"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
          aria-hidden="true">
          <defs>
            <linearGradient id="ckMetal" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0"    stopColor="#3a4552" />
              <stop offset="0.4"  stopColor="#5a6874" />
              <stop offset="0.7"  stopColor="#2a3542" />
              <stop offset="1"    stopColor="#141c26" />
            </linearGradient>
            <linearGradient id="ckMetalHi" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0"    stopColor="#8a98a8" />
              <stop offset="1"    stopColor="#3a4552" />
            </linearGradient>
            <linearGradient id="ckScreen" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0"    stopColor="#0a2a1a" />
              <stop offset="1"    stopColor="#062010" />
            </linearGradient>
            <radialGradient id="ckKnobG" cx="0.35" cy="0.35" r="0.7">
              <stop offset="0"    stopColor="#b0bcc8" />
              <stop offset="0.6"  stopColor="#4a5460" />
              <stop offset="1"    stopColor="#1a2028" />
            </radialGradient>
            <radialGradient id="ckLedR" cx="0.4" cy="0.4" r="0.7">
              <stop offset="0" stopColor="#ffdcdc" /><stop offset="0.4" stopColor="#ff5030" /><stop offset="1" stopColor="#6a1010" />
            </radialGradient>
            <radialGradient id="ckLedG" cx="0.4" cy="0.4" r="0.7">
              <stop offset="0" stopColor="#e8ffdc" /><stop offset="0.4" stopColor="#5eff9e" /><stop offset="1" stopColor="#0a4020" />
            </radialGradient>
            <radialGradient id="ckLedY" cx="0.4" cy="0.4" r="0.7">
              <stop offset="0" stopColor="#fff4c0" /><stop offset="0.4" stopColor="#ffd166" /><stop offset="1" stopColor="#6a4a10" />
            </radialGradient>
            <radialGradient id="ckLedB" cx="0.4" cy="0.4" r="0.7">
              <stop offset="0" stopColor="#dcf0ff" /><stop offset="0.4" stopColor="#7fd8ff" /><stop offset="1" stopColor="#103a5a" />
            </radialGradient>
          </defs>

          {/* Demi-cercle métallique — la console épouse la courbe du cockpit */}
          <path d="M 0 420 L 0 60 Q 500 -140 1000 60 L 1000 420 Z" fill="url(#ckMetal)" />
          {/* Bord supérieur brillant */}
          <path d="M 0 60 Q 500 -140 1000 60" stroke="url(#ckMetalHi)" strokeWidth="6" fill="none" />
          <path d="M 0 68 Q 500 -132 1000 68" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
          {/* Rivets le long du bord supérieur */}
          {Array.from({ length: 16 }).map((_, i) => {
            const t = i / 15;
            const x = t * 1000;
            const y = 60 - 200 * (4 * t * (1 - t));
            return <circle key={i} cx={x} cy={y + 10} r="3.5" fill="#141c26" stroke="#6a7a88" strokeWidth="1" />;
          })}

          {/* --- Rangée de CADRANS ANALOGIQUES --- */}
          {[
            { cx: 120, cy: 170, hue: "#ffd166" },
            { cx: 260, cy: 130, hue: "#7fd8ff" },
            { cx: 400, cy: 95,  hue: "#5eff9e" },
            { cx: 600, cy: 95,  hue: "#ff9060" },
            { cx: 740, cy: 130, hue: "#c8a8f0" },
            { cx: 880, cy: 170, hue: "#ffd166" },
          ].map((d, i) => (
            <g key={i}>
              {/* cerclage métallique */}
              <circle cx={d.cx} cy={d.cy} r="46" fill="#0a1018" stroke="#8a98a8" strokeWidth="3" />
              <circle cx={d.cx} cy={d.cy} r="42" fill="#0e1a24" stroke="#2a3542" strokeWidth="1" />
              {/* graduations */}
              {Array.from({ length: 11 }).map((_, k) => {
                const a = -Math.PI * 0.75 + (k / 10) * Math.PI * 1.5;
                const x1 = d.cx + Math.cos(a) * 32, y1 = d.cy + Math.sin(a) * 32;
                const x2 = d.cx + Math.cos(a) * 38, y2 = d.cy + Math.sin(a) * 38;
                return <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke={k > 7 ? "#ff5030" : d.hue} strokeWidth={k % 5 === 0 ? 2 : 1.2} />;
              })}
              {/* aiguille animée */}
              <g style={{ transformOrigin: `${d.cx}px ${d.cy}px` }}>
                <animateTransform attributeName="transform" type="rotate"
                  values={`${-60 + i * 8};${30 + i * 4};${-60 + i * 8}`}
                  dur={`${3.5 + i * 0.3}s`} repeatCount="indefinite" />
                <line x1={d.cx} y1={d.cy} x2={d.cx} y2={d.cy - 30} stroke={d.hue} strokeWidth="2.5" strokeLinecap="round" />
                <circle cx={d.cx} cy={d.cy} r="4" fill={d.hue} />
              </g>
              {/* pas de vis */}
              <circle cx={d.cx - 40} cy={d.cy - 40} r="2" fill="#141c26" />
              <circle cx={d.cx + 40} cy={d.cy - 40} r="2" fill="#141c26" />
              <circle cx={d.cx - 40} cy={d.cy + 40} r="2" fill="#141c26" />
              <circle cx={d.cx + 40} cy={d.cy + 40} r="2" fill="#141c26" />
            </g>
          ))}

          {/* --- ECRAN CENTRAL (oscilloscope) --- */}
          <rect x="420" y="170" width="160" height="80" rx="6" fill="url(#ckScreen)" stroke="#8a98a8" strokeWidth="2.5" />
          <rect x="424" y="174" width="152" height="72" rx="4" fill="none" stroke="#0e2818" strokeWidth="1" />
          {/* grille */}
          {[440, 460, 480, 500, 520, 540, 560].map((x) => (
            <line key={x} x1={x} y1="176" x2={x} y2="244" stroke="#144030" strokeWidth="0.5" />
          ))}
          {[190, 210, 230].map((y) => (
            <line key={y} x1="424" y1={y} x2="576" y2={y} stroke="#144030" strokeWidth="0.5" />
          ))}
          {/* onde sinusoïdale animée */}
          <path fill="none" stroke="#5eff9e" strokeWidth="2" strokeLinecap="round"
            d="M 424 210 Q 445 180 465 210 T 505 210 T 545 210 T 585 210">
            <animate attributeName="d" dur="2.4s" repeatCount="indefinite"
              values="M 424 210 Q 445 180 465 210 T 505 210 T 545 210 T 585 210;
                      M 424 210 Q 445 240 465 210 T 505 210 T 545 210 T 585 210;
                      M 424 210 Q 445 180 465 210 T 505 210 T 545 210 T 585 210" />
          </path>
          {/* texte "SIGNAL" */}
          <text x="500" y="240" textAnchor="middle" fontSize="8" fill="#5eff9e" fontFamily="ui-monospace,monospace" letterSpacing="2">SIGNAL LOCK</text>

          {/* --- BOUTONS-POUSSOIRS colorés (grille sous les cadrans) --- */}
          {[
            [80, 260, "ckLedR"], [130, 260, "ckLedY"], [180, 260, "ckLedG"], [230, 260, "ckLedB"],
            [80, 310, "ckLedG"], [130, 310, "ckLedR"], [180, 310, "ckLedY"], [230, 310, "ckLedB"],
            [770, 260, "ckLedB"], [820, 260, "ckLedG"], [870, 260, "ckLedR"], [920, 260, "ckLedY"],
            [770, 310, "ckLedY"], [820, 310, "ckLedR"], [870, 310, "ckLedG"], [920, 310, "ckLedB"],
          ].map(([x, y, g], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="16" fill="#141c26" stroke="#4a5460" strokeWidth="2" />
              <circle cx={x} cy={y} r="11" fill={`url(#${g})`}>
                <animate attributeName="opacity" values="0.6;1;0.6" dur={`${1.2 + (i % 5) * 0.3}s`} begin={`${(i * 0.13) % 2}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={x - 3} cy={y - 3} r="3" fill="#ffffff" opacity="0.35" />
            </g>
          ))}

          {/* --- Grands BOUTONS-ROTATIFS (potentiomètres) --- */}
          {[
            [340, 300, 0], [380, 320, 90], [660, 320, 45], [700, 300, -45],
          ].map(([x, y, rot], i) => (
            <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`}>
              <circle r="22" fill="url(#ckKnobG)" stroke="#141c26" strokeWidth="2" />
              <rect x="-2.5" y="-20" width="5" height="12" rx="1" fill="#141c26" />
              {/* graduations autour */}
              {Array.from({ length: 8 }).map((_, k) => {
                const a = (k / 8) * Math.PI * 2;
                return <line key={k} x1={Math.cos(a) * 26} y1={Math.sin(a) * 26} x2={Math.cos(a) * 30} y2={Math.sin(a) * 30} stroke="#3a4552" strokeWidth="1.5" />;
              })}
            </g>
          ))}

          {/* --- Interrupteurs à bascule --- */}
          {[[300, 250], [720, 250]].map(([x, y], i) => (
            <g key={i}>
              <rect x={x - 20} y={y - 8} width="40" height="16" rx="3" fill="#141c26" stroke="#4a5460" strokeWidth="1.5" />
              <rect x={x - 2} y={y - 20} width="4" height="16" rx="1" fill="url(#ckMetalHi)" stroke="#141c26" strokeWidth="0.6" />
              <circle cx={x} cy={y - 22} r="3.5" fill="url(#ckKnobG)" />
            </g>
          ))}

          {/* --- Petit écran texte à droite --- */}
          <rect x="620" y="255" width="120" height="30" rx="4" fill="#0a1a10" stroke="#4a5460" strokeWidth="1.5" />
          <text x="630" y="275" fontSize="11" fill="#5eff9e" fontFamily="ui-monospace,monospace" letterSpacing="1.5">
            <tspan>T-FLUX: </tspan>
            <tspan fill="#ffd166">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
              READY
            </tspan>
          </text>
          {/* Petit écran texte à gauche */}
          <rect x="260" y="255" width="120" height="30" rx="4" fill="#0a1a10" stroke="#4a5460" strokeWidth="1.5" />
          <text x="270" y="275" fontSize="11" fill="#7fd8ff" fontFamily="ui-monospace,monospace" letterSpacing="1.5">
            NODE: <tspan fill="#ffd166">NEXT ERA</tspan>
          </text>

          {/* --- Volant/manche central (esthétique) --- */}
          <g transform="translate(500 340)">
            <circle r="34" fill="none" stroke="url(#ckMetalHi)" strokeWidth="6" />
            <circle r="30" fill="none" stroke="#141c26" strokeWidth="2" />
            <line x1="-34" y1="0" x2="34" y2="0" stroke="url(#ckMetalHi)" strokeWidth="4" />
            <line x1="0" y1="-34" x2="0" y2="34" stroke="url(#ckMetalHi)" strokeWidth="4" />
            <circle r="9" fill="url(#ckKnobG)" stroke="#141c26" strokeWidth="1.5" />
            <circle r="3" fill="#ff5030">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1.4s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>

        {/* Interface interactive HTML positionnée par-dessus la console */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "flex-start", paddingTop: "3%", gap: 8,
          pointerEvents: "none",
        }}>
          <div style={{
            fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 4,
            color: "#ffd166", textShadow: "0 0 10px rgba(255,209,102,0.7)",
            background: "rgba(4,8,14,0.55)", padding: "5px 14px", borderRadius: 4,
            border: "1px solid rgba(255,209,102,0.4)",
          }}>
            ▶ COCKPIT — MACHINE TEMPORELLE
          </div>
          <p style={{
            margin: "6px 20px 0", maxWidth: 640, textAlign: "center",
            color: "#e8eef5", fontSize: 14, lineHeight: 1.45,
            fontFamily: "Palatino, Georgia, serif",
            background: "rgba(4,8,14,0.55)", padding: "8px 14px", borderRadius: 8,
          }}>
            « Plonge dans le <strong style={{ color: "#7fd8ff" }}>flux temporel</strong>
            {" "}et verrouille le prochain <strong style={{ color: "#ffd166" }}>nœud de communication</strong>. »
          </p>
        </div>

        {/* Bouton GO — grand, positionné juste au-dessus du volant */}
        <button onClick={onGo} autoFocus
          style={{
            position: "absolute", left: "50%", bottom: "18%", transform: "translateX(-50%)",
            background: "linear-gradient(180deg,#ff8a3a,#c0501a)",
            color: "#fff", border: "3px solid #ffd166",
            borderRadius: 999, width: 96, height: 96,
            fontSize: 22, fontWeight: 900, cursor: "pointer",
            fontFamily: "ui-monospace,monospace", letterSpacing: 3,
            boxShadow: "0 0 32px rgba(255,140,60,0.7), inset 0 -6px 12px rgba(0,0,0,0.35), inset 0 6px 12px rgba(255,255,255,0.3)",
            animation: "tvGoPulse 1.6s ease-in-out infinite",
          }} title="Lancer la boussole temporelle">GO</button>

        <button onClick={onCancel}
          style={{
            position: "absolute", right: 14, bottom: 8,
            background: "rgba(0,0,0,0.45)", color: "#8fa3bd",
            border: "1px solid #2a3542",
            borderRadius: 6, padding: "5px 10px", fontSize: 11,
            cursor: "pointer", fontFamily: "ui-monospace,monospace",
          }}>← retour</button>

        <style>{`
          @keyframes tvGoPulse {
            0%,100% { transform: translateX(-50%) scale(1); box-shadow: 0 0 32px rgba(255,140,60,0.7), inset 0 -6px 12px rgba(0,0,0,0.35), inset 0 6px 12px rgba(255,255,255,0.3); }
            50%     { transform: translateX(-50%) scale(1.06); box-shadow: 0 0 48px rgba(255,140,60,0.9), inset 0 -6px 12px rgba(0,0,0,0.35), inset 0 6px 12px rgba(255,255,255,0.3); }
          }
        `}</style>
      </div>
    </div>
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

          {/* Bulle de dialogue + JAUGE VERTICALE à droite */}
          <div style={{
            position: "absolute", left: "50%", bottom: "6%", transform: "translateX(-50%)",
            display: "flex", alignItems: "stretch", gap: 14,
            maxWidth: 820, width: "min(94%, 820px)",
          }}>
            {/* Bulle */}
            <div style={{
              flex: 1,
              background: "#0e1a30", border: "2px solid #5eff9e", borderRadius: 14,
              padding: "20px 26px", color: "#e8eef5",
              boxShadow: "0 0 30px rgba(94,255,158,0.35)",
              textAlign: "center",
            }}>
              <p style={{ margin: 0, fontSize: 18, lineHeight: 1.55 }}>
                « J'ai emmagasiné assez de <strong style={{ color: "#ffd166" }}>flux temporel</strong>
                {" "}pour matérialiser la <strong style={{ color: "#5eff9e" }}>machine temporelle</strong>. »
              </p>
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

            {/* JAUGE VERTICALE : reprend le look de JaugeTemporelle (colonne jaune) */}
            <div style={{
              width: 92, flex: "0 0 auto",
              display: "flex", flexDirection: "column", alignItems: "center",
              background: "linear-gradient(180deg,#141b28,#0c1220)",
              border: "1px solid #26324a", borderRadius: 12,
              padding: "10px 8px", gap: 8,
              boxShadow: "0 0 24px rgba(255,209,102,0.25)",
            }}>
              <div style={{
                fontFamily: "ui-monospace,monospace", fontSize: 9, letterSpacing: 1.5,
                color: "#ffd166", textAlign: "center", lineHeight: 1.35,
              }}>⚡ FLUX<br />TEMPOREL</div>

              {/* La colonne qui se remplit de bas en haut */}
              <div style={{
                flex: "1 1 auto", width: 30, minHeight: 120,
                background: "#0a1119", border: "1px solid #26324a", borderRadius: 8,
                position: "relative", overflow: "hidden",
                display: "flex", flexDirection: "column-reverse",
              }}>
                <div style={{
                  height: `${flux}%`,
                  background: flux >= 100
                    ? "linear-gradient(0deg,#e8934a,#ffd166)"
                    : "linear-gradient(0deg,#2f5a76,#7fd8ff)",
                  boxShadow: flux >= 100 ? "0 0 16px #ffd166" : "none",
                  transition: "height 60ms linear",
                }} />
                {/* graduations : tous les 20 % */}
                {[20, 40, 60, 80].map((y) => (
                  <div key={y} style={{
                    position: "absolute", left: 0, right: 0, bottom: `${y}%`,
                    height: 1, background: "#0a1119",
                  }} />
                ))}
              </div>

              <div style={{
                fontFamily: "ui-monospace,monospace", fontSize: 12, fontWeight: 700,
                color: flux >= 100 ? "#ffd166" : "#8fa3bd",
                textShadow: flux >= 100 ? "0 0 8px rgba(255,209,102,0.7)" : "none",
              }}>{flux}%</div>
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
        <MaterializePhase onEnter={() => setPhase("cockpit")} />
      )}

      {/* ---------- 3. COCKPIT ---------- */}
      {phase === "cockpit" && (
        <CockpitPhase
          onGo={() => setPhase("compass")}
          onCancel={onCancel}
        />
      )}
    </div>
  );
}
