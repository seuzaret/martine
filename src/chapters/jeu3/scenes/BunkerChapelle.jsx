import PnjRoom from "../PnjRoom.jsx";
import { PNJ_ROOMS } from "../pnj.js";

/* Chapelle des Anciens — lieu de recueillement, bougies, effigie MARTINE */
export default function BunkerChapelle({ onGo, j3 }) {
  const bg = (
    <>
      <defs>
        <linearGradient id="chp-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a2818" />
          <stop offset="100%" stopColor="#141008" />
        </linearGradient>
        <radialGradient id="chp-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd870" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffd870" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#chp-wall)" />
      <rect x="0" y="0" width="800" height="50" fill="#1a0e08" />
      <rect x="260" y="16" width="280" height="12" rx="3" fill="#c8a848" opacity="0.55" />
      <rect x="0" y="330" width="800" height="70" fill="#0e0a04" />

      {/* Autel central avec effigie de MARTINE (silhouette du vaisseau) */}
      <g transform="translate(400,140)">
        <circle r="60" fill="url(#chp-glow)" />
        {/* Bulle stylisée */}
        <ellipse cx="0" cy="-6" rx="30" ry="24" fill="#7fecc4" opacity="0.55" stroke="#3aa07a" strokeWidth="1.5" />
        {/* Base + tripode simplifié */}
        <rect x="-32" y="18" width="64" height="6" fill="#3a4048" />
        {[-24, 0, 24].map((x) => (
          <path key={x} d={`M${x - 4} 24 L${x - 8} 44 L${x + 8} 44 L${x + 4} 24 Z`} fill="#5a6270" stroke="#0a0806" strokeWidth="0.8" />
        ))}
        {/* Auréole "réseau M" */}
        <text x="0" y="-40" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill="#ffd870" letterSpacing="3">M</text>
      </g>
      {/* Bougies au sol devant l'autel */}
      {[300, 340, 380, 420, 460, 500].map((x) => (
        <g key={x} transform={`translate(${x},240)`}>
          <rect x="-3" y="0" width="6" height="16" fill="#e8dfc8" />
          <path d="M0 -6 Q-2 -3 0 0 Q2 -3 0 -6 Z" fill="#ffd870">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="1.4s" repeatCount="indefinite" />
          </path>
        </g>
      ))}
      {/* Bancs de recueillement */}
      {[150, 620].map((x) => (
        <g key={x} transform={`translate(${x},290)`}>
          <rect x="0" y="0" width="30" height="6" fill="#5a3818" />
          <rect x="2" y="6" width="4" height="18" fill="#3a2010" />
          <rect x="24" y="6" width="4" height="18" fill="#3a2010" />
        </g>
      ))}
    </>
  );
  return <PnjRoom titre="✧ CHAPELLE DES ANCIENS — SECTEUR D" bg={bg} pnjList={PNJ_ROOMS.chapelle} j3={j3} onGo={onGo} />;
}
