import PnjRoom from "../PnjRoom.jsx";
import { PNJ_ROOMS } from "../pnj.js";

/* Infirmerie — carrelage clair, lits médicaux, moniteurs */
export default function BunkerInfirmerie({ onGo, j3 }) {
  const bg = (
    <>
      <defs>
        <linearGradient id="inf-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8d4e2" />
          <stop offset="100%" stopColor="#5a6270" />
        </linearGradient>
      </defs>
      <rect width="800" height="400" fill="url(#inf-wall)" />
      <rect x="0" y="0" width="800" height="50" fill="#3a4048" />
      <rect x="260" y="16" width="280" height="12" rx="3" fill="#e8eef5" opacity="0.85" />
      <rect x="0" y="330" width="800" height="70" fill="#28303a" />
      {/* Lits médicaux */}
      {[80, 620].map((x, i) => (
        <g key={i} transform={`translate(${x},260)`}>
          <rect x="0" y="0" width="100" height="30" fill="#e8eef5" stroke="#3a4048" strokeWidth="1.5" />
          <rect x="0" y="30" width="100" height="6" fill="#3a4048" />
          {/* Oreiller */}
          <rect x="4" y="4" width="24" height="12" fill="#f0f4ff" />
          {/* Perche */}
          <line x1="8" y1="-30" x2="8" y2="0" stroke="#8a9098" strokeWidth="2" />
          <ellipse cx="8" cy="-32" rx="6" ry="3" fill="#3a4048" />
        </g>
      ))}
      {/* Moniteur central */}
      <g transform="translate(360,100)">
        <rect x="0" y="0" width="80" height="60" fill="#0a1420" stroke="#5eff9e" strokeWidth="1.5" />
        <rect x="4" y="4" width="72" height="42" fill="#0a1810" />
        <path d="M4 26 L20 26 L24 12 L32 40 L40 20 L52 32 L60 24 L76 26" stroke="#5eff9e" strokeWidth="1.2" fill="none" />
        <text x="40" y="56" textAnchor="middle" fontSize="6" fontFamily="ui-monospace,monospace" fill="#5eff9e">ECG · 72 bpm</text>
      </g>
      {/* Croix rouge murale */}
      <g transform="translate(140,90)">
        <rect x="-14" y="-4" width="28" height="8" fill="#e83820" />
        <rect x="-4" y="-14" width="8" height="28" fill="#e83820" />
      </g>
    </>
  );
  return <PnjRoom titre="⚕ INFIRMERIE — SECTEUR B" bg={bg} pnjList={PNJ_ROOMS.infirmerie} j3={j3} onGo={onGo} />;
}
