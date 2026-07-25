import Hotspot from "../../../engine/Hotspot.jsx";

/* ============================================================
   CHAPITRE 2 · Tableau 1 — La porte de la cité
   Muraille de bois + porte, toits carrés blancs derrière (façon
   Göbekli Tepe / Çatalhöyük), la mer à gauche avec un coquillage
   sur la grève, et Guna le garde qui barre le passage.
   (Art « premier jet » : propre et lisible, à embellir ensuite.)
   ============================================================ */

export default function SceneMuraille({ collect, action, reveal, queteQui }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="mu-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a5a86" /><stop offset="55%" stopColor="#9ab0c4" /><stop offset="100%" stopColor="#e8dcc0" />
        </linearGradient>
        <linearGradient id="mu-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8aa6ac" /><stop offset="100%" stopColor="#5c7a80" /></linearGradient>
        <linearGradient id="mu-wood" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#7a5230" /><stop offset="50%" stopColor="#9a6c40" /><stop offset="100%" stopColor="#5a3f24" /></linearGradient>
        <linearGradient id="mu-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c2a878" /><stop offset="100%" stopColor="#8a6e46" /></linearGradient>
      </defs>

      {/* ciel + soleil levant */}
      <rect width="1000" height="560" fill="url(#mu-sky)" />
      <circle cx="230" cy="150" r="46" fill="#ffe9a8" opacity="0.9" />
      <circle cx="230" cy="150" r="80" fill="#ffe9a8" opacity="0.25" />

      {/* la mer, à gauche */}
      <rect x="0" y="300" width="320" height="80" fill="url(#mu-sea)" />
      {[316, 336, 356].map((y, i) => <path key={i} d={`M0 ${y} q40 ${i % 2 ? 3 : -3} 80 0 t80 0 t80 0 t80 0`} stroke="#c4d0d0" strokeWidth="1.4" fill="none" opacity="0.4" />)}

      {/* toits carrés blancs de la cité, derrière la muraille */}
      {[[430, 250], [500, 238], [572, 250], [640, 242], [706, 252], [770, 244]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 26} y={y} width="52" height="60" fill="#e6e0d2" />
          <rect x={x - 26} y={y} width="52" height="10" fill="#cfc7b4" />
          <rect x={x - 10} y={y + 26} width="20" height="16" fill="#3a2c1c" />
        </g>
      ))}

      {/* le sol */}
      <rect y="380" width="1000" height="180" fill="url(#mu-ground)" />
      <ellipse cx="600" cy="470" rx="440" ry="46" fill="#6e5636" opacity="0.25" />

      {/* LA MURAILLE DE BOIS + la porte */}
      <g>
        <rect x="330" y="230" width="670" height="200" fill="#5a3f24" opacity="0.25" />
        {/* pieux verticaux */}
        {Array.from({ length: 22 }).map((_, i) => {
          const x = 340 + i * 30;
          if (x > 560 && x < 700) return null; // l'ouverture de la porte
          return <g key={i}><rect x={x} y="240" width="24" height="190" fill="url(#mu-wood)" /><path d={`M${x} 240 l12 -14 l12 14 Z`} fill="#6e4c2e" /></g>;
        })}
        {/* les deux battants de la porte, ouverts */}
        <rect x="566" y="270" width="60" height="160" fill="#4a3018" />
        <rect x="634" y="270" width="60" height="160" fill="#4a3018" />
        <path d="M566 270 h60 M634 270 h60" stroke="#2c1c0e" strokeWidth="4" />
        {/* linteau au-dessus de la porte */}
        <rect x="556" y="256" width="148" height="18" fill="#6e4c2e" />
      </g>

      {/* GUNA, le garde, lance à la main, devant la porte */}
      <g transform="translate(360,436)">
        <ellipse cx="0" cy="26" rx="24" ry="7" fill="#2a1c10" opacity="0.4" />
        {/* corps : tunique de peau + ceinture */}
        <path d="M-15 26 Q-19 -4 0 -20 Q19 -4 15 26 Z" fill="#7a5636" />
        <path d="M-15 8 q15 6 30 0" stroke="#5a3f24" strokeWidth="3" fill="none" />
        {/* tête + cheveux */}
        <circle cx="0" cy="-28" r="9.5" fill="#c89a6e" />
        <path d="M-9 -32 q1 -10 9 -9 q10 1 9 10 q-4 -6 -9 -6 q-7 0 -9 5 Z" fill="#3a2a1c" />
        {/* barbe courte */}
        <path d="M-6 -22 q6 7 12 0" stroke="#4a3324" strokeWidth="3" fill="none" />
        {/* bras + LA LANCE, dressée */}
        <path d="M12 -8 q14 -2 18 8" stroke="#c89a6e" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        <path d="M30 -44 L30 40" stroke="#6e4c2e" strokeWidth="4" strokeLinecap="round" />
        <path d="M30 -44 l-5 12 l5 4 l5 -4 Z" fill="#8a8c92" />
        {/* petit bouclier rond */}
        <circle cx="-16" cy="0" r="12" fill="#8a5a34" stroke="#5a3f24" strokeWidth="2" />
        <circle cx="-16" cy="0" r="3" fill="#c8a860" />
      </g>
      {/* le « ? » doré : c'est au tour de Guna */}
      {queteQui === "guna" && (
        <g transform="translate(342,340)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
          <path d="M0 0 q0 -20 20 -20 q20 0 20 17 q0 14 -17 18 l0 6" fill="none" stroke="#ffd166" strokeWidth="4" />
          <circle cx="20" cy="31" r="2.6" fill="#ffd166" />
        </g>
      )}

      {/* LE COQUILLAGE, sur la grève, à gauche */}
      <g transform="translate(150,432)">
        <ellipse cx="0" cy="10" rx="20" ry="6" fill="#2a1c10" opacity="0.3" />
        <path d="M0 8 Q-18 4 -14 -10 Q-6 -20 0 -14 Q6 -20 14 -10 Q18 4 0 8 Z" fill="#f0e2cc" />
        <path d="M0 6 L-8 -8 M0 6 L0 -12 M0 6 L8 -8" stroke="#d0b898" strokeWidth="1.4" />
      </g>

      {/* léger voile */}
      <rect width="1000" height="560" fill="#231c10" opacity="0.05" style={{ pointerEvents: "none" }} />

      {/* zones cliquables */}
      <Hotspot cx={362} cy={410} r={40} label="Guna, le garde" reveal={reveal} onClick={(p) => action("guna", p)} />
      <Hotspot cx={150} cy={426} r={36} label="coquillage" item="coquillage" reveal={reveal} onClick={() => collect("coquillage")} />
    </svg>
  );
}
