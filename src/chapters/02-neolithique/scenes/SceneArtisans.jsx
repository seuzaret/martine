import Hotspot from "../../../engine/Hotspot.jsx";

/* ============================================================
   CHAPITRE 2 · Tableau 3 — Les artisans de la cité
   Le mur de la cité en fond. À GAUCHE : Jala la potière, son
   tour, son four, ses pigments. À DROITE : Ahmid le marchand et
   son troupeau. (Art « premier jet ».)
   ============================================================ */

export default function SceneArtisans({ collect, action, reveal, made = [], queteQui }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ar-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6a90b8" /><stop offset="70%" stopColor="#bcd0dc" /><stop offset="100%" stopColor="#e4dcc4" /></linearGradient>
        <linearGradient id="ar-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c2a878" /><stop offset="100%" stopColor="#9a7e52" /></linearGradient>
        <linearGradient id="ar-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#b09466" /><stop offset="100%" stopColor="#7a6040" /></linearGradient>
        <radialGradient id="ar-fire" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffc068" stopOpacity="0.6" /><stop offset="100%" stopColor="#ff9540" stopOpacity="0" /></radialGradient>
      </defs>

      {/* ciel */}
      <rect width="1000" height="560" fill="url(#ar-sky)" />
      {/* le grand mur de la cité, en fond */}
      <rect y="150" width="1000" height="200" fill="url(#ar-wall)" />
      <path d="M0 150 h1000 M0 210 h1000 M0 270 h1000" stroke="#8a6e46" strokeWidth="2" opacity="0.4" />
      {/* créneaux + une tour */}
      {Array.from({ length: 20 }).map((_, i) => <rect key={i} x={i * 52} y="138" width="30" height="14" fill="#a88a5a" />)}
      <rect x="470" y="96" width="70" height="56" fill="#b09466" /><rect x="470" y="88" width="70" height="12" fill="#9a7e52" />

      {/* sol */}
      <rect y="350" width="1000" height="210" fill="url(#ar-ground)" />
      <ellipse cx="500" cy="470" rx="460" ry="60" fill="#6e5636" opacity="0.22" />

      {/* ═══ CÔTÉ POTIÈRE (gauche) ═══ */}
      {/* le four */}
      <g transform="translate(150,452)">
        <ellipse cx="0" cy="42" rx="80" ry="24" fill="url(#ar-fire)" style={{ animation: "glow 2.6s ease-in-out infinite" }} />
        <path d="M-40 40 Q-46 -6 0 -12 Q46 -6 40 40 Z" fill="#7a5636" />
        <path d="M-22 40 Q-24 4 0 0 Q24 4 22 40 Z" fill="#3a2414" />
        <path d="M-14 40 Q-16 14 0 10 Q16 14 14 40 Z" fill="#ff8a3c" style={{ animation: "glow 1.8s ease-in-out infinite" }} />
        <circle cx="0" cy="26" r="4" fill="#fff2c4" />
      </g>
      {/* le tour du potier + un pot en cours */}
      <g transform="translate(330,470)">
        <ellipse cx="0" cy="30" rx="30" ry="8" fill="#2a1c10" opacity="0.4" />
        <rect x="-6" y="0" width="12" height="30" fill="#5a3f24" />
        <ellipse cx="0" cy="2" rx="28" ry="8" fill="#8a6a42" style={{ animation: "spin 4s linear infinite", transformOrigin: "330px 472px", transformBox: "view-box" }} />
        <path d="M-12 -2 Q-14 -20 0 -24 Q14 -20 12 -2 Z" fill="#a86a3a" />
      </g>
      {/* pots de pigments */}
      <g transform="translate(430,506)">
        {[["#c8382e", -20], ["#2a6a9a", -4], ["#e0b040", 12], ["#3a8a4a", 28]].map(([c, dx], i) => (
          <g key={i} transform={`translate(${dx},0)`}><path d="M-8 -2 Q-9 8 0 9 Q9 8 8 -2 Z" fill="#7a5636" /><ellipse cx="0" cy="-2" rx="7" ry="3" fill={c} /></g>
        ))}
      </g>
      {/* un tas d'argile */}
      <g transform="translate(486,512)"><path d="M-18 4 Q-16 -12 0 -12 Q16 -12 18 4 Z" fill="#8a6a4a" /><ellipse cx="0" cy="4" rx="18" ry="5" fill="#7a5a3a" /></g>

      {/* JALA la potière */}
      <g transform="translate(258,470)">
        <ellipse cx="0" cy="26" rx="20" ry="6" fill="#2a1c10" opacity="0.4" />
        <path d="M-13 26 Q-17 -2 0 -18 Q17 -2 13 26 Z" fill="#3a6a8a" />
        <circle cx="0" cy="-26" r="9" fill="#c89a6e" />
        <path d="M-9 -30 q0 -10 9 -10 q9 0 9 10 q-3 -8 -9 -8 q-6 0 -9 8 Z" fill="#3a2a1c" />
        <path d="M12 -8 q12 4 14 16" stroke="#c89a6e" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      {/* le « ? » de Jala */}
      {queteQui === "jala" && (
        <g transform="translate(240,376)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
          <path d="M0 0 q0 -20 20 -20 q20 0 20 17 q0 14 -17 18 l0 6" fill="none" stroke="#ffd166" strokeWidth="4" />
          <circle cx="20" cy="31" r="2.6" fill="#ffd166" />
        </g>
      )}
      {/* RÉSULTAT : la poterie ornée exposée fièrement */}
      {made.includes("msg_poterie") && (
        <g transform="translate(210,500)" style={{ animation: "fadein 1s ease-out" }}>
          <ellipse cx="0" cy="30" rx="24" ry="7" fill="#2a1c10" opacity="0.4" />
          <path d="M-20 -8 Q-26 4 -18 22 Q-10 32 0 32 Q10 32 18 22 Q26 4 20 -8 Q10 -16 0 -16 Q-10 -16 -20 -8 Z" fill="#b5623a" />
          <path d="M-14 -14 Q0 -20 14 -14 L12 -8 Q0 -12 -12 -8 Z" fill="#9a5030" />
          <path d="M-18 2 l6 -5 l6 5 l6 -5 l6 5" stroke="#2c1810" strokeWidth="2" fill="none" />
          <path d="M-18 11 h36" stroke="#efe0c4" strokeWidth="2.4" opacity="0.85" />
          <circle cx="0" cy="20" r="3" fill="#e8e0d0" stroke="#c8b090" strokeWidth="1" />
        </g>
      )}

      {/* ═══ CÔTÉ MARCHAND (droite) ═══ */}
      {/* le troupeau (moutons) */}
      <g transform="translate(800,478)">
        {[[-40, 0], [0, 8], [40, -4], [70, 10]].map(([dx, dy], i) => (
          <g key={i} transform={`translate(${dx},${dy})`}>
            <ellipse cx="0" cy="14" rx="20" ry="5" fill="#2a1c10" opacity="0.35" />
            <ellipse cx="0" cy="0" rx="18" ry="13" fill="#e4ddcc" />
            <ellipse cx="14" cy="-4" rx="8" ry="7" fill="#4a3a2c" />
            <path d="M-10 12 v8 M-2 13 v8 M6 13 v8 M14 10 v8" stroke="#4a3a2c" strokeWidth="3" strokeLinecap="round" />
          </g>
        ))}
      </g>
      {/* AHMID le marchand */}
      <g transform="translate(680,472)">
        <ellipse cx="0" cy="28" rx="22" ry="6" fill="#2a1c10" opacity="0.4" />
        <path d="M-14 28 Q-18 -4 0 -20 Q18 -4 14 28 Z" fill="#8a5a2e" />
        <path d="M-14 8 q14 6 28 0" stroke="#6a4420" strokeWidth="3" fill="none" />
        <circle cx="0" cy="-28" r="9.5" fill="#b0855c" />
        <path d="M-9 -30 q9 -10 18 0 q-3 8 -9 8 q-6 0 -9 -8 Z" fill="#2c1c12" />
        <path d="M-6 -22 q6 8 12 0" stroke="#2c1c12" strokeWidth="3" fill="none" />
        {/* main tendue vers son troupeau */}
        <path d="M13 -6 q14 -2 20 6" stroke="#b0855c" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      {/* le « ? » d'Ahmid */}
      {queteQui === "ahmid" && (
        <g transform="translate(662,378)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
          <path d="M0 0 q0 -20 20 -20 q20 0 20 17 q0 14 -17 18 l0 6" fill="none" stroke="#ffd166" strokeWidth="4" />
          <circle cx="20" cy="31" r="2.6" fill="#ffd166" />
        </g>
      )}

      <rect width="1000" height="560" fill="#231c10" opacity="0.05" style={{ pointerEvents: "none" }} />

      {/* zones cliquables — personnages */}
      <Hotspot cx={258} cy={444} r={40} label="Jala, la potière" reveal={reveal} onClick={(p) => action("jala", p)} />
      <Hotspot cx={680} cy={446} r={40} label="Ahmid, le marchand" reveal={reveal} onClick={(p) => action("ahmid", p)} />
      {/* objets et supports */}
      <Hotspot cx={330} cy={456} r={40} label="le tour du potier" item="tour" reveal={reveal} onClick={() => collect("tour")} />
      <Hotspot cx={150} cy={452} r={48} label="le four" item="feu" reveal={reveal} onClick={() => collect("feu")} />
      <Hotspot cx={430} cy={500} r={40} label="pigments" item="pigments" reveal={reveal} onClick={() => collect("pigments")} />
      <Hotspot cx={486} cy={508} r={30} label="argile" item="argile" reveal={reveal} onClick={() => collect("argile")} />
      <Hotspot cx={810} cy={474} r={72} label="le troupeau" item="troupeau" reveal={reveal} onClick={() => collect("troupeau")} />
    </svg>
  );
}
