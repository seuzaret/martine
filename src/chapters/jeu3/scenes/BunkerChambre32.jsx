import PnjRoom from "../PnjRoom.jsx";
import ChambreVoisinDecor from "../ChambreVoisinDecor.jsx";
import { PNJ_ROOMS } from "../pnj.js";

/* ============================================================
   N-32 · Estev — chambre-bibliothèque d'un ancien enseignant.
   Extras : piles de livres au sol, carnets reliés en cuir sur
   l'étagère, cadre photo sépia au mur, machine à écrire.
   ============================================================ */
export default function BunkerChambre32({ onGo, j3 }) {
  const extras = (
    <>
      {/* Cadre photo sépia au mur */}
      <g transform="translate(280,220)">
        <rect x="-32" y="-24" width="64" height="48" fill="#3a2818" stroke="#0a0806" strokeWidth="1.5" />
        <rect x="-28" y="-20" width="56" height="40" fill="#c8a880" />
        <rect x="-24" y="-16" width="48" height="24" fill="#8a7050" />
        {/* silhouettes */}
        <circle cx="-8" cy="0" r="4" fill="#5a4028" />
        <circle cx="8" cy="0" r="4" fill="#5a4028" />
        <text x="0" y="18" textAnchor="middle" fontFamily="Georgia,serif" fontSize="4" fill="#3a2818">2047</text>
      </g>
      {/* Piles de livres au sol devant le lit */}
      {[[130, 440, 5], [180, 440, 4], [230, 440, 6], [280, 440, 3]].map(([x, y, n], k) => (
        <g key={k} transform={`translate(${x},${y})`}>
          {Array.from({ length: n }).map((_, i) => (
            <rect key={i} x="-14" y={-i * 6} width="28" height="6"
              fill={["#8a3820", "#3a80c8", "#5a4028", "#c8a848", "#5eff9e"][i % 5]}
              stroke="#0a0806" strokeWidth="0.4" />
          ))}
        </g>
      ))}
      {/* Machine à écrire sur le bureau */}
      <g transform="translate(560,318)">
        <rect x="-32" y="4" width="64" height="30" fill="#1a1408" stroke="#3a2818" strokeWidth="1.5" />
        <rect x="-28" y="-6" width="56" height="14" fill="#28303a" stroke="#0a0806" strokeWidth="0.8" />
        {/* Touches */}
        {[0, 1, 2].map((r) => (
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map((c) => (
            <rect key={`${r}${c}`} x={-26 + c * 6} y={12 + r * 6} width="4" height="4" fill="#3a2818" stroke="#5a4028" strokeWidth="0.3" />
          ))
        ))}
        {/* Feuille de papier qui dépasse */}
        <rect x="-14" y="-24" width="28" height="20" fill="#e8dfc8" stroke="#3a2818" strokeWidth="0.5" />
        <line x1="-10" y1="-18" x2="10" y2="-18" stroke="#3a2818" strokeWidth="0.3" />
        <line x1="-10" y1="-14" x2="8" y2="-14" stroke="#3a2818" strokeWidth="0.3" />
        <line x1="-10" y1="-10" x2="4" y2="-10" stroke="#3a2818" strokeWidth="0.3" />
      </g>
      {/* Carnets reliés cuir sur l'étagère (surchage la planche du haut) */}
      <g transform="translate(370,102)">
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={i * 12} y={-24} width="10" height="24" fill={["#5a3818", "#3a2010", "#5a3818", "#3a2010", "#5a3818"][i]} stroke="#c8a848" strokeWidth="0.4" />
        ))}
      </g>
      {/* Étiquette bureau : "CARNET 31" */}
      <g transform="translate(632,348)">
        <rect x="-14" y="-6" width="28" height="12" fill="#e8dfc8" stroke="#3a2818" strokeWidth="0.4" />
        <text x="0" y="3" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="5" fill="#0a0806">CARNET 31</text>
      </g>
    </>
  );
  const bg = <ChambreVoisinDecor num="N-32" accent="#c8a848" litColor="#5a4028" bureauColor="#3a2818" extras={extras} />;
  return <PnjRoom titre="🛏 CHAMBRE N-32 · NIVEAU 0 · ESTEV" bg={bg} pnjList={PNJ_ROOMS.chambreN32} j3={j3} onGo={onGo} />;
}
