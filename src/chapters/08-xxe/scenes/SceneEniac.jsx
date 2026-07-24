import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 8 — Tableau-ÉNIGME : « Calculer plus vite qu'un cerveau ? »
   ------------------------------------------------------------
   Une immense salle militaire, 1946. Les armoires sont VIDES et
   éteintes. L'ingénieure (cliquable) croule sous les calculs faits
   à la main.
   → tubes à vide + tables de tir → les 18 000 tubes s'allument,
     la salle s'éclaire, les voyants clignotent : l'ENIAC démarre.
   Ce décor réagit à l'état du jeu via la prop `made`.
   ============================================================ */

export default function SceneEniac({ collect, action, reveal, made = [] }) {
  const on = made.includes("msg_eniac"); // la machine tourne

  /* les armoires : mêmes positions avant/après, mais éteintes ou allumées */
  const BAIES = [60, 200, 340, 620, 760];

  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="en-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3e444c" /><stop offset="100%" stopColor="#22262c" /></linearGradient>
        <linearGradient id="en-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4a4e54" /><stop offset="100%" stopColor="#212429" /></linearGradient>
        <linearGradient id="en-baie" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#4a4e56" /><stop offset="50%" stopColor="#3a3e46" /><stop offset="100%" stopColor="#2a2e36" /></linearGradient>
        <radialGradient id="en-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffc860" stopOpacity="0.55" /><stop offset="100%" stopColor="#ffc860" stopOpacity="0" /></radialGradient>
        <filter id="en-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* ═══ la salle ═══ */}
      <rect width="1000" height="560" fill="url(#en-wall)" />
      <rect width="1000" height="560" fill="#141820" opacity="0.26" filter="url(#en-grain)" />
      {/* lueur générale quand la machine chauffe */}
      {on && <ellipse cx="480" cy="300" rx="520" ry="260" fill="url(#en-glow)" style={{ animation: "glow 2.4s ease-in-out infinite" }} />}

      {/* ═══ couche lointaine : le plafond, les néons, la pancarte ═══ */}
      <PLayer depth={1}>
        {[160, 480, 800].map((x, i) => (
          <g key={i} transform={`translate(${x},60)`}>
            <rect x="-52" y="-6" width="104" height="12" rx="3" fill="#5a6068" />
            <rect x="-46" y="-3" width="92" height="6" rx="2" fill="#cfe0ea" opacity={on ? 0.85 : 0.3} />
          </g>
        ))}
        {/* pancarte militaire */}
        <g transform="translate(480,150)">
          <rect x="-92" y="-24" width="184" height="48" rx="3" fill="#3a4a3a" stroke="#22301f" strokeWidth="4" />
          <text x="0" y="-3" textAnchor="middle" fontSize="12" fill="#c8d8b8" fontFamily="ui-monospace,monospace" letterSpacing="1.5">U.S. ARMY · 1946</text>
          <text x="0" y="14" textAnchor="middle" fontSize="10" fill="#9ab08a" fontFamily="ui-monospace,monospace" letterSpacing="1">30 TONNES · 18 000 TUBES</text>
        </g>
      </PLayer>

      {/* ═══ couche intermédiaire : LES BAIES de l'ENIAC ═══ */}
      <PLayer depth={2}>
        {BAIES.map((x, b) => (
          <g key={b} transform={`translate(${x},250)`}>
            {/* l'armoire */}
            <rect x="0" y="-70" width="112" height="220" rx="4" fill="url(#en-baie)" />
            <rect x="0" y="-70" width="112" height="220" rx="4" fill="#12161c" opacity="0.28" filter="url(#en-grain)" />
            <rect x="8" y="-62" width="96" height="204" rx="3" fill="#1e222a" />
            {/* les rangées de tubes : éteints (gris) ou allumés (orange) */}
            {[...Array(7)].map((_, r) => (
              <g key={r}>
                {[...Array(4)].map((_, c) => {
                  const i = b * 28 + r * 4 + c;
                  return (
                    <g key={c} transform={`translate(${22 + c * 23},${-48 + r * 28})`}>
                      {/* ⚠️ animation sur le <g>, opacité sur la forme : une
                          animation CSS d'opacité écrase l'attribut opacity. */}
                      <g style={on ? { animation: `pulse ${1.2 + (i % 7) * 0.3}s infinite` } : undefined}>
                        <rect x="-5" y="-9" width="10" height="18" rx="5" fill={on ? "#ffb347" : "#3a3e46"} />
                      </g>
                      {on && (
                        <g style={{ animation: `glow ${1.4 + (i % 5) * 0.3}s infinite` }}>
                          <circle cx="0" cy="0" r="7" fill="#ffc860" opacity="0.28" />
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>
            ))}
            {/* voyants du bas */}
            <g transform="translate(56,132)">
              {[-30, -10, 10, 30].map((dx, i) => (
                <circle key={i} cx={dx} cy="0" r="3.4" fill={on ? (i % 2 ? "#5eff9e" : "#ff6a4a") : "#2a2e36"}
                  style={on ? { animation: `pulse ${0.8 + i * 0.4}s infinite` } : undefined} />
              ))}
            </g>
          </g>
        ))}
        {/* les câbles au sol entre les baies */}
        <path d="M172 380 q60 22 120 0 M452 380 q80 26 168 0 M732 380 q60 20 120 0" stroke="#1a1e24" strokeWidth="7" fill="none" opacity="0.8" />
      </PLayer>

      {/* ═══ premier plan : le sol, l'ingénieure, les pièces ═══ */}
      <PLayer depth={3}>
        <rect y="400" width="1000" height="160" fill="url(#en-floor)" />
        <rect y="402" width="1000" height="158" fill="#12161c" opacity="0.34" filter="url(#en-grain)" />
        <path d="M0 440 h1000 M0 490 h1000 M170 400 v160 M450 400 v160 M730 400 v160" stroke="#1a1e24" strokeWidth="1.4" opacity="0.5" />
        <ellipse cx="480" cy="470" rx="440" ry="42" fill="#101418" opacity="0.28" />

        {/* « ? » tant que la machine ne tourne pas */}
        {!on && (
          <g transform="translate(432,318)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
            <path d="M0 0 q0 -24 24 -24 q24 0 24 20 q0 17 -20 22 l0 8" fill="none" stroke="#ffd166" strokeWidth="4" />
            <circle cx="24" cy="37" r="3" fill="#ffd166" />
          </g>
        )}

        {/* L'INGÉNIEURE, sa pile de calculs à la main */}
        <g transform="translate(470,470)">
          <path d="M-14 8 Q-18 -16 0 -21 Q18 -16 14 8 L12 40 L-12 40 Z" fill="#4a5a6a" />
          <path d="M-14 8 Q-18 -16 0 -21 Q18 -16 14 8 L12 40 L-12 40 Z" fill="#101418" opacity="0.24" filter="url(#en-grain)" />
          <circle cx="0" cy="-31" r="10" fill="#e0b090" />
          {/* cheveux relevés années 40 */}
          <path d="M-10 -35 q1 -13 10 -12 q11 1 10 12 q-4 -6 -10 -6 q-7 0 -10 6 Z" fill="#4a3428" />
          <path d="M8 -40 q9 -3 8 7" stroke="#4a3428" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* le bras qui tend la pile de feuilles */}
          <path d="M-13 -4 q-20 2 -26 16" stroke="#e0b090" strokeWidth="5" fill="none" strokeLinecap="round" />
          <g transform="translate(-44,18) rotate(-8)">
            <rect x="-15" y="-11" width="30" height="22" fill="#e8e4da" />
            <rect x="-15" y="-14" width="30" height="22" fill="#f2eee4" />
            <path d="M-11 -9 h22 M-11 -4 h22 M-11 1 h16" stroke="#9a96a0" strokeWidth="1.3" />
          </g>
        </g>

        {/* PIÈCE : la caisse de TUBES À VIDE */}
        {!on && (
          <g transform="translate(180,494)">
            <path d="M-44 24 L-38 -6 L38 -6 L44 24 Z" fill="#6a5a3a" />
            <path d="M-44 24 L-38 -6 L38 -6 L44 24 Z" fill="#221c08" opacity="0.3" filter="url(#en-grain)" />
            <path d="M-38 -6 L38 -6" stroke="#8a7a52" strokeWidth="2" />
            {/* des tubes qui dépassent de la paille */}
            {[-24, -8, 8, 24].map((x, i) => (
              <g key={i} transform={`translate(${x},${-16 - (i % 2) * 6})`}>
                <rect x="-6" y="-14" width="12" height="22" rx="6" fill="#c8d8e0" opacity="0.9" />
                <path d="M-3 -8 v12 M3 -8 v12" stroke="#8a9aa4" strokeWidth="1.2" />
                <rect x="-4" y="8" width="8" height="4" fill="#5a5c66" />
              </g>
            ))}
          </g>
        )}

        {/* PIÈCE : les TABLES DE TIR (piles de calculs sur un bureau) */}
        {!on && (
          <g transform="translate(830,486)">
            <rect x="-56" y="-6" width="112" height="12" rx="2" fill="#5a4a38" />
            <rect x="-48" y="6" width="10" height="40" fill="#3a2e20" /><rect x="38" y="6" width="10" height="40" fill="#3a2e20" />
            {/* deux piles de feuilles */}
            <g transform="translate(-22,-22)">
              {[0, 3, 6, 9].map((d, i) => <rect key={i} x={-17 + i} y={-d} width="34" height="16" fill={i % 2 ? "#f2eee4" : "#e4e0d6"} />)}
            </g>
            <g transform="translate(24,-16) rotate(6)">
              {[0, 3, 6].map((d, i) => <rect key={i} x={-15 + i} y={-d} width="30" height="12" fill={i % 2 ? "#f2eee4" : "#e4e0d6"} />)}
              <path d="M-10 -8 h20 M-10 -4 h20" stroke="#9a96a0" strokeWidth="1" />
            </g>
          </g>
        )}

        {/* APPARAÎT : la bande imprimée que la machine recrache */}
        {on && (
          <g transform="translate(830,470)" style={{ animation: "pulse 0.7s ease-out 2" }}>
            <rect x="-56" y="10" width="112" height="12" rx="2" fill="#5a4a38" />
            <rect x="-48" y="22" width="10" height="40" fill="#3a2e20" /><rect x="38" y="22" width="10" height="40" fill="#3a2e20" />
            {/* le listing sort en accordéon */}
            <path d="M-30 8 l16 -10 l16 10 l16 -10 l16 10 l14 -8" stroke="#f2eee4" strokeWidth="12" fill="none" strokeLinejoin="round" />
            <g fill="#5a5c66" fontSize="5" fontFamily="ui-monospace,monospace">
              <text x="-26" y="2">0110</text><text x="6" y="2">1001</text><text x="36" y="0">0111</text>
            </g>
          </g>
        )}
      </PLayer>

      <rect width="1000" height="560" fill="#0e1218" opacity="0.06" style={{ pointerEvents: "none" }} />

      {/* ═══ zones cliquables ═══ */}
      <Hotspot cx={470} cy={444} r={50} label="l'ingénieure" reveal={reveal} onClick={() => action("ingenieure")} />
      {!on && (
        <>
          <Hotspot cx={180} cy={478} r={46} label="tubes à vide" item="tubes_vide" reveal={reveal} onClick={() => collect("tubes_vide")} />
          <Hotspot cx={830} cy={470} r={46} label="tables de tir" item="calcul" reveal={reveal} onClick={() => collect("calcul")} />
        </>
      )}
    </svg>
  );
}
