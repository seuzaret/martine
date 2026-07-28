import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";
import { PompeiDefs, PompeiFond } from "./fond.jsx";

/* ============================================================
   CHAPITRE 4 · Tableau 1 — L'entrée de la villa de Caius
   Colonnes, une belle dalle à graver, la foule sur la place, le
   Vésuve au fond. Caius accueille l'étranger ; Argos, son esclave,
   attend pour lancer les invitations.
   ============================================================ */

export default function SceneEntree({ collect, action, reveal, made = [], queteQui }) {
  const grave = made.includes("msg_inscription");
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <PompeiDefs />
        <linearGradient id="e4-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c8b48a" /><stop offset="100%" stopColor="#8a7452" /></linearGradient>
        <linearGradient id="e4-col" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#e8dcc4" /><stop offset="50%" stopColor="#d4c4a4" /><stop offset="100%" stopColor="#b0a080" /></linearGradient>
        <linearGradient id="e4-red" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a83a2c" /><stop offset="100%" stopColor="#7e2a20" /></linearGradient>
      </defs>

      <PompeiFond />

      {/* ═══ couche intermédiaire : la façade de la villa ═══ */}
      <PLayer depth={2}>
        {/* mur rouge pompéien à gauche */}
        <rect x="40" y="176" width="150" height="234" fill="url(#e4-red)" />
        <rect x="40" y="176" width="150" height="234" fill="#4e1a14" opacity="0.25" filter="url(#pf-grain)" />
        <rect x="56" y="196" width="118" height="150" fill="none" stroke="#e8c86a" strokeWidth="3" />
        {/* le grand porche : deux colonnes + fronton */}
        <g>
          <path d="M300 176 L700 176 L660 130 L340 130 Z" fill="#d8cdb4" />
          <path d="M300 176 L700 176 L660 130 L340 130 Z" fill="#8a7a58" opacity="0.15" filter="url(#pf-grain)" />
          <path d="M500 118 L340 130 L660 130 Z" fill="#c8462e" />
          {[360, 640].map((x, i) => (
            <g key={i}>
              <rect x={x - 18} y="176" width="36" height="234" fill="url(#e4-col)" />
              {[...Array(5)].map((_, k) => <path key={k} d={`M${x - 14 + k * 6} 184 v224`} stroke="#a89870" strokeWidth="1" opacity="0.4" />)}
              <rect x={x - 24} y="176" width="48" height="16" fill="#d8c8a8" />
              <rect x={x - 22} y="404" width="44" height="10" fill="#c0b088" />
            </g>
          ))}
          {/* la porte, dans l'ombre */}
          <rect x="452" y="230" width="96" height="180" fill="#2c1c12" />
          <path d="M500 230 v180 M452 230 h96" stroke="#160f08" strokeWidth="3" />
        </g>
      </PLayer>

      {/* ═══ premier plan : le parvis, la dalle, les gens ═══ */}
      <PLayer depth={3}>
        <rect y="400" width="1000" height="160" fill="url(#e4-floor)" />
        <rect y="402" width="1000" height="158" fill="#3c2c18" opacity="0.26" filter="url(#pf-mottle)" />
        <g opacity="0.32" stroke="#6e5836" strokeWidth="1"><path d="M0 446 h1000 M0 496 h1000" />{[...Array(18)].map((_, i) => <path key={i} d={`M${i * 58} 410 v150`} />)}</g>
        <ellipse cx="500" cy="474" rx="450" ry="54" fill="#7a6240" opacity="0.28" />

        {/* LA DALLE À GRAVER, à l'entrée (support) */}
        <g transform="translate(150,470)">
          <ellipse cx="0" cy="34" rx="60" ry="12" fill="#241608" opacity="0.35" />
          <rect x="-52" y="-24" width="104" height="58" rx="4" fill="#d8cdb4" />
          <rect x="-52" y="-24" width="104" height="58" rx="4" fill="#8a7a58" opacity="0.2" filter="url(#pf-grain)" />
          <rect x="-52" y="-24" width="104" height="8" fill="#e8e0cc" />
          {grave ? (
            <g style={{ animation: "fadein 1s ease-out" }} fill="#4a3826">
              <text x="0" y="-6" textAnchor="middle" fontSize="12" fontFamily="'Cinzel','Trajan Pro',Georgia,serif" letterSpacing="1">CAIVS · POMPEIS</text>
              <text x="0" y="10" textAnchor="middle" fontSize="10" fontFamily="'Cinzel','Trajan Pro',Georgia,serif" letterSpacing="1">GLORIA · ROMAE</text>
              <path d="M-44 20 h88" stroke="#6a5236" strokeWidth="1" opacity="0.6" />
            </g>
          ) : (
            <g stroke="#b0a888" strokeWidth="1.2" opacity="0.5"><path d="M-40 -8 h80 M-40 2 h80 M-40 12 h60" /></g>
          )}
        </g>

        {/* LA FOULE sur la place (support) : petites silhouettes */}
        <g transform="translate(800,486)">
          {[[-40, 0, "#8a5a3a"], [-18, 6, "#9a6a4a"], [4, -2, "#7a4a34"], [26, 8, "#a86a4a"], [46, 2, "#8a5a3a"], [10, 14, "#6a4a34"]].map(([x, y, c], i) => (
            <g key={i} transform={`translate(${x},${y})`}>
              <path d="M-8 24 Q-10 -2 0 -12 Q10 -2 8 24 Z" fill={c} />
              <circle cx="0" cy="-18" r="6" fill="#c89868" />
            </g>
          ))}
        </g>

        {/* CAIUS le marchand, en toge, au centre */}
        <g transform="translate(430,478)">
          <ellipse cx="0" cy="28" rx="24" ry="7" fill="#241608" opacity="0.4" />
          <path d="M-16 28 Q-22 -6 0 -20 Q22 -6 16 28 Z" fill="#efe7d2" />
          <path d="M-14 6 q14 8 28 0 M-12 18 q12 6 24 0" stroke="#c4b898" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M-10 -10 Q0 4 16 24" stroke="#8a2a4a" strokeWidth="5" fill="none" opacity="0.8" />
          <circle cx="0" cy="-30" r="9.5" fill="#c89868" />
          <path d="M-9 -33 q9 -8 18 0 q-2 -7 -9 -7 q-7 0 -9 7 Z" fill="#4a3020" />
          <path d="M-11 -30 q11 -8 22 0" stroke="#6a8a3a" strokeWidth="2" fill="none" opacity="0.7" />
          {/* bras ouvert, accueillant */}
          <path d="M14 -6 q16 2 20 14" stroke="#c89868" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        </g>
        {queteQui === "caius" && (
          <g transform="translate(412,378)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
            <path d="M0 0 q0 -20 20 -20 q20 0 20 17 q0 14 -17 18 l0 6" fill="none" stroke="#ffd166" strokeWidth="4" />
            <circle cx="20" cy="31" r="2.6" fill="#ffd166" />
          </g>
        )}

        {/* ARGOS l'esclave, tunique courte, près de la foule */}
        <g transform="translate(640,486)">
          <ellipse cx="0" cy="24" rx="20" ry="6" fill="#241608" opacity="0.4" />
          <path d="M-12 24 Q-15 -2 0 -15 Q15 -2 12 24 Z" fill="#b89a6a" />
          <path d="M-10 6 q10 4 20 0" stroke="#96784a" strokeWidth="2" fill="none" />
          <circle cx="0" cy="-24" r="8" fill="#b0855c" />
          <path d="M-8 -26 q8 -7 16 0 q-2 -6 -8 -6 q-6 0 -8 6 Z" fill="#3a2a1c" />
          {/* main en porte-voix vers la foule */}
          <path d="M11 -8 q10 -4 16 2" stroke="#b0855c" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M27 -8 q6 2 6 8 q-6 -1 -8 3" fill="none" stroke="#b0855c" strokeWidth="2.4" strokeLinecap="round" />
        </g>

        {/* épave de MARTINE dans un coin */}
        <g transform="translate(920,506) rotate(8)">
          <ellipse cx="0" cy="12" rx="26" ry="6" fill="#140b06" opacity="0.5" />
          <path d="M0 -20 Q18 -18 20 -4 Q22 8 11 11 L-11 11 Q-22 8 -20 -4 Q-18 -18 0 -20 Z" fill="#8a6240" />
          <circle cx="-1" cy="-4" r="5.5" fill="#cfeaff" stroke="#5c3a22" strokeWidth="1.4" />
          <rect x="-13" y="3" width="24" height="7" rx="2" fill="#0c1410" stroke="#5c3a22" strokeWidth="1" />
          <text x="-1" y="9" textAnchor="middle" fontSize="5.5" fill="#5eff9e" fontFamily="ui-monospace,monospace" style={{ animation: "pulse 2.2s infinite" }}>an 79</text>
          <circle cx="13" cy="-27" r="2.3" fill="#5eff9e" style={{ animation: "pulse 1.5s infinite" }} />
          <path d="M8 -20 q6 -8 13 -6" stroke="#8a94a8" strokeWidth="2.3" fill="none" strokeLinecap="round" />
        </g>
      </PLayer>

      <rect width="1000" height="560" fill="#231a10" opacity="0.06" style={{ pointerEvents: "none" }} />

      {/* zones cliquables */}
      <Hotspot cx={430} cy={452} r={40} label="Caius, le marchand" reveal={reveal} onClick={(p) => action("caius", p)} />
      <Hotspot cx={640} cy={462} r={34} label="Argos, l'esclave" reveal={reveal} onClick={(p) => action("argos", p)} />
      <Hotspot cx={600} cy={452} r={26} label="ta voix" item="voix" reveal={reveal} onClick={() => collect("voix")} />
      <Hotspot cx={800} cy={472} r={60} label="la foule" item="foule" reveal={reveal} onClick={() => collect("foule")} />
      <Hotspot cx={150} cy={468} r={54} label="la dalle à graver" item="pierre" reveal={reveal} onClick={() => collect("pierre")} />
      <Hotspot cx={920} cy={502} r={32} label="MARTINE" reveal={reveal} onClick={() => action("wreck")} />
    </svg>
  );
}
