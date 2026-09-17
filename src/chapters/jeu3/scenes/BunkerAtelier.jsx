import PnjRoom from "../PnjRoom.jsx";
import { PNJ_ROOMS } from "../pnj.js";

/* Atelier des Ingénieurs — pièces détachées, établis, tuyaux */
export default function BunkerAtelier({ onGo, j3 }) {
  const bg = (
    <>
      <defs>
        <linearGradient id="atl-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2418" />
          <stop offset="100%" stopColor="#141008" />
        </linearGradient>
      </defs>
      <rect width="800" height="400" fill="url(#atl-wall)" />
      <rect x="0" y="0" width="800" height="50" fill="#1a1408" />
      <rect x="260" y="16" width="280" height="12" rx="3" fill="#c8a848" opacity="0.7" />
      <rect x="0" y="330" width="800" height="70" fill="#0e0a04" />
      {/* Établi long avec pièces détachées */}
      <g transform="translate(80,280)">
        <rect x="0" y="0" width="640" height="20" fill="#5a4028" stroke="#1a0e08" strokeWidth="2" />
        {/* Outils */}
        {[
          [40, "#8a5030"], [80, "#3a4048"], [140, "#5a6270"],
          [520, "#c8a848"], [580, "#3a4048"], [620, "#8a5030"],
        ].map(([x, c], i) => (
          <rect key={i} x={x} y="-14" width="14" height="14" fill={c} stroke="#1a0e08" strokeWidth="1" />
        ))}
      </g>
      {/* Tuyauteries verticales à droite */}
      <g>
        <rect x="720" y="70" width="10" height="260" fill="#3a4048" />
        <rect x="740" y="70" width="10" height="260" fill="#5a6270" />
        <rect x="760" y="70" width="10" height="260" fill="#3a4048" />
        {[110, 180, 250].map((y) => (
          <circle key={y} cx="745" cy={y} r="6" fill="#c8a848" stroke="#1a0e08" strokeWidth="1" />
        ))}
      </g>
      {/* Ventilateur mural à gauche */}
      <g transform="translate(80,130)">
        <rect x="-30" y="-30" width="60" height="60" fill="#28303a" stroke="#0a0806" strokeWidth="2" />
        <circle r="24" fill="#141c26" />
        {/* Pales */}
        <g style={{ transformOrigin: "0 0", animation: "atlSpin 3s linear infinite" }}>
          {[0, 90, 180, 270].map((a) => (
            <path key={a} d={`M0 0 L14 -4 L20 0 L14 4 Z`} fill="#5a6270" transform={`rotate(${a})`} />
          ))}
        </g>
        <circle r="3" fill="#c8a848" />
      </g>
      <style>{`@keyframes atlSpin { from { transform: rotate(0); } to { transform: rotate(360deg); } }`}</style>
    </>
  );
  return <PnjRoom titre="⚙ ATELIER DES INGÉNIEURS — SECTEUR C" bg={bg} pnjList={PNJ_ROOMS.atelier} j3={j3} onGo={onGo} />;
}
