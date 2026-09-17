import PnjRoom from "../PnjRoom.jsx";
import { PNJ_ROOMS } from "../pnj.js";

/* Cantine — grande salle avec tables et distributeur automatique */
export default function BunkerCantine({ onGo, j3 }) {
  const bg = (
    <>
      <defs>
        <linearGradient id="cnt-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a3a2a" />
          <stop offset="100%" stopColor="#141410" />
        </linearGradient>
      </defs>
      <rect width="800" height="400" fill="url(#cnt-wall)" />
      <rect x="0" y="0" width="800" height="50" fill="#1a1a10" />
      <rect x="260" y="16" width="280" height="12" rx="3" fill="#e8eef5" opacity="0.5" />
      <rect x="0" y="330" width="800" height="70" fill="#0e0e08" />
      {/* Longues tables communes */}
      {[80, 340, 600].map((x, i) => (
        <g key={i} transform={`translate(${x},280)`}>
          <rect x="0" y="0" width="130" height="14" fill="#8a7050" stroke="#3a2818" strokeWidth="1.5" />
          <rect x="4" y="14" width="6" height="30" fill="#5a4028" />
          <rect x="120" y="14" width="6" height="30" fill="#5a4028" />
        </g>
      ))}
      {/* Distributeur au fond */}
      <g transform="translate(340,90)">
        <rect x="0" y="0" width="120" height="120" fill="#28303a" stroke="#0a0e14" strokeWidth="2" />
        <rect x="6" y="6" width="108" height="60" fill="#0e1a10" />
        <text x="60" y="30" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#5eff9e">RATIONS</text>
        <text x="60" y="42" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#5eff9e">JOUR 15 042</text>
        <rect x="20" y="80" width="80" height="25" fill="#0a0806" />
      </g>
    </>
  );
  return <PnjRoom titre="🍲 CANTINE COMMUNE — NIVEAU 4" bg={bg} pnjList={PNJ_ROOMS.cantine} j3={j3} onGo={onGo} />;
}
