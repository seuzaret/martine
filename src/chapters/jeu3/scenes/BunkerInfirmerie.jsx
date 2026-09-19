import PnjRoom from "../PnjRoom.jsx";
import { PNJ_ROOMS } from "../pnj.js";

/* ============================================================
   Infirmerie (niveau -1) — carrelage clair, ambiance froide.
   Layout : 3 lits médicaux alignés au fond, moniteur central
   ECG, armoire à médicaments à droite, bureau/dossiers, croix
   rouge murale, néons blancs.
   ============================================================ */
export default function BunkerInfirmerie({ onGo, j3 }) {
  const bg = (
    <>
      <defs>
        <linearGradient id="inf-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8d4e2" />
          <stop offset="100%" stopColor="#5a6270" />
        </linearGradient>
        <linearGradient id="inf-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#28303a" />
          <stop offset="100%" stopColor="#0a0e14" />
        </linearGradient>
      </defs>
      <rect width="1000" height="520" fill="url(#inf-wall)" />
      {/* Plafond */}
      <rect x="0" y="0" width="1000" height="60" fill="#3a4048" />
      {/* Néons blancs alignés */}
      {[200, 500, 800].map((x, i) => (
        <rect key={i} x={x - 40} y="20" width="80" height="10" rx="2" fill="#e8eef5" opacity="0.85" />
      ))}
      {/* Ligne de fuite du sol */}
      <rect y="380" width="1000" height="140" fill="url(#inf-floor)" />
      {/* Carrelage : lignes horizontales et diagonales */}
      <path d="M0 380 L1000 380" stroke="#5a6270" strokeWidth="1" opacity="0.6" />
      {[100, 200, 300, 500, 700, 800, 900].map((x, i) => (
        <path key={i} d={`M${x} 380 L${x + (x - 500) * 0.14} 520`} stroke="#0a0e14" strokeWidth="0.6" opacity="0.5" />
      ))}
      <path d="M0 440 L1000 440" stroke="#0a0e14" strokeWidth="0.6" opacity="0.5" />

      {/* CROIX ROUGE MURALE au fond centre */}
      <g transform="translate(500,120)">
        <circle r="46" fill="#fff" stroke="#3a4048" strokeWidth="2" />
        <rect x="-32" y="-8" width="64" height="16" fill="#e83820" />
        <rect x="-8" y="-32" width="16" height="64" fill="#e83820" />
      </g>

      {/* 3 LITS MÉDICAUX alignés au fond, avec perche à sérum */}
      {[[120, 320], [500, 320], [880, 320]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          {/* Structure du lit */}
          <rect x="-60" y="0" width="120" height="34" fill="#e8eef5" stroke="#3a4048" strokeWidth="1.5" />
          <rect x="-60" y="34" width="120" height="8" fill="#3a4048" />
          {/* Pieds */}
          <rect x="-60" y="42" width="6" height="20" fill="#3a4048" />
          <rect x="54" y="42" width="6" height="20" fill="#3a4048" />
          {/* Oreiller + drap plié */}
          <rect x="-56" y="4" width="30" height="14" fill="#f0f4ff" />
          <path d="M-24 4 L44 4 L44 30 L-24 30 Z" fill="#c8d4e2" opacity="0.85" />
          {/* Perche à sérum */}
          <line x1="-54" y1="-36" x2="-54" y2="0" stroke="#8a9098" strokeWidth="1.5" />
          <ellipse cx="-54" cy="-38" rx="7" ry="3" fill="#3a4048" />
          {/* Poche perfusion */}
          <rect x="-58" y="-30" width="8" height="14" rx="2" fill="#7fd8ff" opacity="0.85" stroke="#3a80c8" strokeWidth="0.5" />
          <line x1="-54" y1="-16" x2="-52" y2="4" stroke="#5a7098" strokeWidth="0.5" />
          {/* Numéro de lit */}
          <text x="0" y="60" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#c8d4e2">LIT-{i + 1}</text>
        </g>
      ))}

      {/* MONITEUR CENTRAL au fond (poste de contrôle) */}
      <g transform="translate(500,180)">
        <rect x="-52" y="0" width="104" height="80" fill="#0a1420" stroke="#5eff9e" strokeWidth="1.5" />
        <rect x="-48" y="4" width="96" height="60" fill="#0a1810" />
        {/* Grille ECG */}
        {[[10], [30], [50]].map(([dy], i) => (
          <line key={i} x1="-48" y1={4 + dy} x2="48" y2={4 + dy} stroke="#144030" strokeWidth="0.4" />
        ))}
        <path d="M-48 34 L-32 34 L-24 20 L-12 48 L0 26 L14 40 L26 30 L48 34"
          stroke="#5eff9e" strokeWidth="1.4" fill="none" strokeLinejoin="round">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="1.2s" repeatCount="indefinite" />
        </path>
        <text x="0" y="74" textAnchor="middle" fontSize="6.5" fontFamily="ui-monospace,monospace" fill="#5eff9e">ECG · 72 bpm · STABLE</text>
      </g>

      {/* ARMOIRE À MÉDICAMENTS à droite */}
      <g transform="translate(900,180)">
        <rect x="-40" y="0" width="80" height="180" fill="#c8d4e2" stroke="#3a4048" strokeWidth="2" />
        {/* Étagères de flacons */}
        {[10, 46, 82, 118].map((y, i) => (
          <g key={i}>
            <rect x="-36" y={y} width="72" height="30" fill="none" stroke="#3a4048" strokeWidth="0.6" />
            {[-24, -12, 0, 12, 24].map((dx, k) => (
              <rect key={k} x={dx - 3} y={y + 4} width="6" height="22" fill={["#e83820", "#5eff9e", "#7fd8ff", "#ffd870", "#c8a848"][(i + k) % 5]} stroke="#0a0806" strokeWidth="0.3" opacity="0.8" />
            ))}
          </g>
        ))}
        <text x="0" y="172" textAnchor="middle" fontSize="6.5" fontFamily="ui-monospace,monospace" fill="#3a4048">PHARMACIE</text>
      </g>

      {/* PETIT BUREAU / DOSSIER à gauche */}
      <g transform="translate(100,240)">
        <rect x="0" y="0" width="90" height="8" fill="#5a4028" stroke="#1a0e08" strokeWidth="0.8" />
        <rect x="4" y="8" width="8" height="30" fill="#3a2818" />
        <rect x="78" y="8" width="8" height="30" fill="#3a2818" />
        {/* Chaise */}
        <rect x="30" y="52" width="30" height="4" fill="#3a4048" />
        <rect x="30" y="24" width="4" height="28" fill="#3a4048" />
        <rect x="56" y="24" width="4" height="28" fill="#3a4048" />
        {/* Dossiers empilés */}
        <rect x="8" y="-14" width="14" height="14" fill="#8a3820" stroke="#0a0806" strokeWidth="0.5" />
        <rect x="26" y="-14" width="14" height="14" fill="#3a4048" stroke="#0a0806" strokeWidth="0.5" />
        <rect x="44" y="-14" width="14" height="14" fill="#5a4028" stroke="#0a0806" strokeWidth="0.5" />
        {/* Lampe */}
        <line x1="70" y1="-16" x2="70" y2="0" stroke="#5a6270" strokeWidth="1" />
        <ellipse cx="70" cy="-20" rx="6" ry="3" fill="#c8a848" />
      </g>
    </>
  );
  return <PnjRoom titre="⚕ INFIRMERIE — SECTEUR B" bg={bg} pnjList={PNJ_ROOMS.infirmerie} j3={j3} onGo={onGo} />;
}
