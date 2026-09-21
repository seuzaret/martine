import PnjRoom from "../PnjRoom.jsx";
import ChambreVoisinDecor from "../ChambreVoisinDecor.jsx";
import { PNJ_ROOMS } from "../pnj.js";

/* ============================================================
   N-30 · Yona — chambre ordonnée d'une couturière.
   Extras : machine à coudre sur le bureau, patrons épinglés au
   mur, rouleaux de tissu, mannequin de couture, bocaux à boutons.
   ============================================================ */
export default function BunkerChambre30({ onGo, j3 }) {
  const extras = (
    <>
      {/* Patrons épinglés au mur (papier calque) */}
      {[[260, 160], [320, 150], [380, 165]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <rect x="-24" y="-16" width="48" height="34" fill="#e8dfc8" stroke="#3a2818" strokeWidth="0.5" opacity="0.85" />
          <path d="M-18 -10 Q0 -4 18 -10 Q14 12 -14 12 Z" stroke="#8a5030" strokeWidth="0.6" fill="none" opacity="0.7" />
          {/* Épingle */}
          <circle cx="0" cy="-16" r="1.4" fill="#c8a848" />
        </g>
      ))}
      {/* Machine à coudre ancienne sur le bureau */}
      <g transform="translate(560,320)">
        <rect x="-40" y="10" width="80" height="24" fill="#0a0806" stroke="#3a2818" strokeWidth="1.5" />
        <rect x="-36" y="-8" width="30" height="18" fill="#5a4028" stroke="#0a0806" strokeWidth="1" />
        {/* Bras */}
        <rect x="-6" y="-14" width="52" height="8" rx="2" fill="#0a0806" stroke="#3a2818" strokeWidth="1" />
        {/* Aiguille */}
        <rect x="34" y="-6" width="4" height="16" fill="#5a6270" stroke="#0a0806" strokeWidth="0.5" />
        <line x1="36" y1="10" x2="36" y2="18" stroke="#e8eef5" strokeWidth="0.6" />
        {/* Volant à droite */}
        <circle cx="46" cy="-2" r="6" fill="#3a2818" stroke="#0a0806" strokeWidth="0.6" />
        <circle cx="46" cy="-2" r="1.5" fill="#c8a848" />
        {/* Marque dorée */}
        <text x="0" y="24" textAnchor="middle" fontFamily="Georgia,serif" fontSize="5" fill="#c8a848" fontStyle="italic">Bunker & Fils</text>
      </g>
      {/* Rouleaux de tissu au sol à droite du lit */}
      <g transform="translate(440,430)">
        {[[0, "#8a3820"], [26, "#3a80c8"], [52, "#c8a848"], [78, "#5eff9e"]].map(([dx, c], i) => (
          <g key={i}>
            <rect x={dx} y="0" width="22" height="28" fill={c} stroke="#0a0806" strokeWidth="0.6" />
            <ellipse cx={+dx + 11} cy="0" rx="11" ry="3" fill={c} stroke="#0a0806" strokeWidth="0.6" />
          </g>
        ))}
      </g>
      {/* Mannequin de couture (à côté du bureau) */}
      <g transform="translate(740,340)">
        <path d="M0 0 Q-16 20 -12 50 L12 50 Q16 20 0 0 Z" fill="#8a5030" stroke="#3a2818" strokeWidth="1" />
        <circle cx="0" cy="-4" r="6" fill="#e8dfc8" stroke="#3a2818" strokeWidth="1" />
        <rect x="-2" y="50" width="4" height="26" fill="#3a2818" />
        <path d="M-16 76 L16 76 L14 82 L-14 82 Z" fill="#3a2818" />
        {/* Épingles */}
        <circle cx="4" cy="18" r="0.8" fill="#c8a848" />
        <circle cx="-6" cy="26" r="0.8" fill="#c8a848" />
        <circle cx="6" cy="34" r="0.8" fill="#8a1010" />
      </g>
      {/* Bocaux à boutons sur l'étagère (surchage l'étagère du décor) */}
      <g transform="translate(288,168)">
        <rect x="0" y="0" width="18" height="18" fill="#c8d4e2" opacity="0.4" stroke="#3a4048" strokeWidth="0.5" />
        <rect x="24" y="0" width="18" height="18" fill="#c8d4e2" opacity="0.4" stroke="#3a4048" strokeWidth="0.5" />
      </g>
    </>
  );
  const bg = <ChambreVoisinDecor num="N-30" accent="#c88060" litColor="#8a5030" bureauColor="#5a4028" extras={extras} />;
  return <PnjRoom titre="🛏 CHAMBRE N-30 · NIVEAU 0 · YONA" bg={bg} pnjList={PNJ_ROOMS.chambreN30} j3={j3} onGo={onGo} />;
}
