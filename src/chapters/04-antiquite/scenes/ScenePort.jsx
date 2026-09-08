import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 4 — Tableau adjacent : LE PORT DE POMPÉI
   ------------------------------------------------------------
   Sur les quais de pierre du port, la baie de Naples : amphores
   marquées à la peinture (tituli picti = étiquettes de l'antiquité),
   navire marchand à voile carrée qui charge, débardeur, marchand
   au comptoir avec sa liste sur volumen. Au fond, le VÉSUVE fume
   drôlement — mais personne ne s'inquiète (encore).
   ============================================================ */

export default function ScenePort({ collect, action, reveal, inv = [] }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="po-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#88a0c0" /><stop offset="60%" stopColor="#e8c898" /><stop offset="100%" stopColor="#f0d0a0" /></linearGradient>
        <linearGradient id="po-mer" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4a80a8" /><stop offset="100%" stopColor="#1a4868" /></linearGradient>
        <linearGradient id="po-quai" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a09080" /><stop offset="100%" stopColor="#5a4838" /></linearGradient>
        <linearGradient id="po-amphore" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e0a878" /><stop offset="100%" stopColor="#8a5828" /></linearGradient>
        <radialGradient id="po-soleil" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#fff4c8" /><stop offset="70%" stopColor="#f8d878" stopOpacity="0.4" /><stop offset="100%" stopColor="#f8c058" stopOpacity="0" /></radialGradient>
      </defs>

      <PLayer depth={5}>
        <rect width="1000" height="380" fill="url(#po-sky)" />
        {/* soleil */}
        <circle cx="140" cy="140" r="120" fill="url(#po-soleil)" />
        <circle cx="140" cy="140" r="34" fill="#fff4c8" />
        {/* nuages */}
        <ellipse cx="360" cy="90" rx="90" ry="6" fill="#f0e0c0" opacity="0.55" />
        <ellipse cx="620" cy="120" rx="120" ry="8" fill="#f0e0c0" opacity="0.5" />
        {/* mouettes */}
        <g opacity="0.6" transform="translate(280,180)">
          <path d="M0 0 q-3 -3 -6 0 M0 0 q3 -3 6 0" stroke="#3a2818" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M18 12 q-3 -3 -6 0 M18 12 q3 -3 6 0" stroke="#3a2818" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M-22 14 q-3 -3 -6 0 M-22 14 q3 -3 6 0" stroke="#3a2818" strokeWidth="1" fill="none" strokeLinecap="round" />
        </g>
      </PLayer>

      <PLayer depth={4}>
        {/* LE VÉSUVE — au fond, imposant, fumée ANORMALEMENT dense */}
        <g transform="translate(720,340)">
          {/* silhouette du volcan */}
          <path d="M-220 0 L-100 -200 L-30 -200 L120 0 Z" fill="#5a5060" opacity="0.85" />
          {/* face ombrée à droite */}
          <path d="M-30 -200 L120 0 L60 0 L-20 -190 Z" fill="#3a3040" opacity="0.7" />
          {/* neige/roche au sommet */}
          <path d="M-100 -200 L-30 -200 L-40 -212 L-90 -212 Z" fill="#8a7098" opacity="0.75" />
          {/* cratère */}
          <ellipse cx="-65" cy="-208" rx="30" ry="6" fill="#3a2418" />
          {/* PANACHE de fumée dense qui monte, un peu inquiétant */}
          <g style={{ animation: "float 4s ease-in-out infinite" }}>
            <ellipse cx="-70" cy="-236" rx="40" ry="20" fill="#a09880" opacity="0.85" />
            <ellipse cx="-40" cy="-260" rx="52" ry="26" fill="#8a8078" opacity="0.75" />
            <ellipse cx="-90" cy="-286" rx="46" ry="22" fill="#7a7068" opacity="0.7" />
            <ellipse cx="-30" cy="-306" rx="60" ry="26" fill="#a09880" opacity="0.6" />
            <ellipse cx="-70" cy="-330" rx="70" ry="26" fill="#a09880" opacity="0.5" />
          </g>
          {/* petit rougeoiement suspect à la base du panache */}
          <ellipse cx="-65" cy="-214" rx="14" ry="4" fill="#e86028" opacity="0.55" />
          {/* étincelles fines qui montent du cratère */}
          {[[-70, -220], [-60, -216], [-55, -224]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="0.8" fill="#f8d848" opacity="0.85" style={{ animation: `float ${1.4 + i * 0.3}s ease-in-out infinite` }} />
          ))}
        </g>
        {/* fines cendres qui commencent à voler dans le ciel */}
        {[[220, 200, 2.4], [420, 180, 3], [660, 210, 2], [340, 240, 2.8], [520, 220, 3.4]].map(([x, y, d], i) => (
          <circle key={i} cx={x} cy={y} r="0.9" fill="#5a5060" opacity="0.5" style={{ animation: `float ${d}s ease-in-out infinite` }} />
        ))}
        {/* Collines de la baie de Naples à gauche */}
        <path d="M0 380 L0 300 Q100 280 200 300 Q300 320 400 305 L400 380 Z" fill="#8a7098" opacity="0.55" />
      </PLayer>

      <PLayer depth={3}>
        {/* mer */}
        <rect y="340" width="1000" height="100" fill="url(#po-mer)" />
        {/* vagues */}
        <path d="M0 360 q60 -3 120 0 q60 3 120 0 q60 -3 120 0 q60 3 120 0 q60 -3 120 0 q60 3 120 0 q60 -3 120 0 q60 3 120 0" stroke="#a8d0e8" strokeWidth="0.8" fill="none" opacity="0.7" />
        <path d="M0 385 q60 -3 120 0 q60 3 120 0 q60 -3 120 0 q60 3 120 0 q60 -3 120 0" stroke="#78a8c8" strokeWidth="0.8" fill="none" opacity="0.65" />
        {/* reflets solaires */}
        {[[120, 370], [340, 380], [560, 375], [880, 385]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="16" ry="1.6" fill="#f8f8e8" opacity="0.55" style={{ animation: `float ${2.4 + (i % 3) * 0.3}s ease-in-out infinite` }} />
        ))}
        {/* Reflet SOMBRE du Vésuve sur l'eau */}
        <path d="M620 340 L720 400 L820 340 Z" fill="#3a3040" opacity="0.35" />
        <path d="M700 380 Q720 375 740 380" stroke="#5a5060" strokeWidth="0.6" fill="none" opacity="0.5" />
        {/* NAVIRE MARCHAND romain (corbita) à quai — voile carrée */}
        <g transform="translate(720,370)">
          {/* coque large et arrondie */}
          <path d="M-80 0 Q-70 20 60 20 Q80 12 80 0 L-80 0 Z" fill="#5a3818" stroke="#2a1810" strokeWidth="0.8" />
          {/* bordage */}
          <path d="M-80 0 L-90 -14 M80 0 L90 -14" stroke="#3a2010" strokeWidth="1.2" />
          {/* pont */}
          <path d="M-80 0 L80 0" stroke="#3a2010" strokeWidth="1" />
          {/* mât + vergue */}
          <path d="M-10 0 L-10 -70" stroke="#3a2010" strokeWidth="1.5" />
          <path d="M-50 -66 L30 -66" stroke="#3a2010" strokeWidth="1.5" />
          {/* voile carrée */}
          <path d="M-48 -66 L-48 -20 L28 -20 L28 -66 Z" fill="#e8dcc0" stroke="#8a7860" strokeWidth="0.6" />
          <path d="M-48 -50 h76 M-48 -34 h76" stroke="#a09078" strokeWidth="0.5" />
          {/* voile enflée par le vent */}
          <path d="M-48 -66 Q-10 -30 28 -66" fill="none" stroke="#8a7860" strokeWidth="0.4" />
          {/* col de cygne à la poupe */}
          <path d="M-80 0 L-90 -12 L-84 -18 L-78 -12 Q-80 -6 -78 0 Z" fill="#5a3818" stroke="#2a1810" strokeWidth="0.6" />
          {/* amphores empilées sur le pont */}
          <g transform="translate(20,-4)">
            <path d="M-4 0 Q-4 -14 0 -18 M4 0 Q4 -14 0 -18" stroke="#5a3818" strokeWidth="0.6" fill="none" />
            <path d="M-4 -18 L4 -18 L4 -4 L-4 -4 Z" fill="#8a5828" />
          </g>
        </g>
      </PLayer>

      <PLayer depth={2}>
        {/* quai en dalles */}
        <rect y="440" width="1000" height="120" fill="url(#po-quai)" />
        {/* joints entre dalles */}
        {[0, 120, 240, 360, 480, 600, 720, 840].map((x, i) => (
          <path key={i} d={`M${x} 440 L${x} 560`} stroke="#2a2010" strokeWidth="0.8" opacity="0.5" />
        ))}
        <path d="M0 490 L1000 490" stroke="#2a2010" strokeWidth="0.8" opacity="0.5" />
        {/* bord du quai vers la mer */}
        <path d="M0 440 L1000 440" stroke="#1a1408" strokeWidth="2" />
        {/* anneaux d'amarrage en bronze */}
        <g transform="translate(500,440)">
          <circle r="8" fill="#8a5828" stroke="#3a1810" strokeWidth="0.8" />
          <circle r="4" fill="none" stroke="#3a1810" strokeWidth="1" />
          <path d="M-8 0 q4 20 40 6" stroke="#5a3818" strokeWidth="1.4" fill="none" opacity="0.7" />
        </g>
        <g transform="translate(200,440)">
          <circle r="8" fill="#8a5828" stroke="#3a1810" strokeWidth="0.8" />
          <circle r="4" fill="none" stroke="#3a1810" strokeWidth="1" />
        </g>
        {/* PILE D'AMPHORES marquées (tituli picti) au premier plan */}
        <g transform="translate(220,510)">
          {/* rang du bas */}
          {[-70, -20, 30, 80].map((x, i) => (
            <g key={`b${i}`} transform={`translate(${x},0)`}>
              <ellipse cx="0" cy="30" rx="18" ry="3" fill="#0a0604" opacity="0.55" />
              {/* corps amphore ovoïde */}
              <path d="M-12 0 Q-16 -6 -6 -14 M12 0 Q16 -6 6 -14" stroke="#5a3818" strokeWidth="0.6" fill="none" />
              <path d="M-14 8 Q-14 26 -6 30 L6 30 Q14 26 14 8 Q14 -12 0 -16 Q-14 -12 -14 8 Z" fill="url(#po-amphore)" stroke="#3a1810" strokeWidth="0.7" />
              {/* poignées */}
              <path d="M-14 -4 Q-20 -8 -14 -14 M14 -4 Q20 -8 14 -14" stroke="#5a3818" strokeWidth="2" fill="none" />
              {/* titulus pictus : étiquette peinte en rouge */}
              <text x="0" y="10" textAnchor="middle" fontSize="4" fill="#8a2818" fontFamily="Georgia, serif" fontWeight="700">GARVM</text>
              <text x="0" y="16" textAnchor="middle" fontSize="3" fill="#8a2818" fontFamily="Georgia, serif">CAII·IV</text>
            </g>
          ))}
          {/* rang du haut */}
          {[-45, 5, 55].map((x, i) => (
            <g key={`t${i}`} transform={`translate(${x},-30)`}>
              <path d="M-14 8 Q-14 26 -6 30 L6 30 Q14 26 14 8 Q14 -12 0 -16 Q-14 -12 -14 8 Z" fill="url(#po-amphore)" stroke="#3a1810" strokeWidth="0.7" />
              <path d="M-14 -4 Q-20 -8 -14 -14 M14 -4 Q20 -8 14 -14" stroke="#5a3818" strokeWidth="2" fill="none" />
              <text x="0" y="12" textAnchor="middle" fontSize="4" fill="#8a2818" fontFamily="Georgia, serif" fontWeight="700">VIN</text>
            </g>
          ))}
        </g>
      </PLayer>

      <PLayer depth={1}>
        {/* LE MARCHAND au comptoir, notant sur son volumen */}
        <g transform="translate(560,500)">
          {/* comptoir de pierre */}
          <rect x="-40" y="20" width="80" height="30" fill="url(#po-quai)" stroke="#2a1810" strokeWidth="0.6" />
          <ellipse cx="0" cy="50" rx="44" ry="4" fill="#0a0604" opacity="0.55" />
          {/* volumen ouvert sur le comptoir */}
          <g transform="translate(0,18)">
            <rect x="-30" y="-6" width="60" height="14" fill="#e8d0a0" stroke="#5a3818" strokeWidth="0.5" />
            <path d="M-30 -6 L-36 -8 L-36 8 L-30 8 Z M30 -6 L36 -8 L36 8 L30 8 Z" fill="#c8a878" stroke="#5a3818" strokeWidth="0.5" />
            <path d="M-24 -3 h48 M-24 0 h48 M-24 3 h48 M-24 6 h48" stroke="#5a3818" strokeWidth="0.3" />
          </g>
          {/* torse penché du marchand qui écrit */}
          <path d="M-14 20 Q-16 -10 0 -18 Q16 -10 14 20 Z" fill="#a06838" stroke="#3a2010" strokeWidth="0.5" />
          {/* toge blanche par-dessus */}
          <path d="M-16 8 L-20 20 L16 20 L20 8 Q4 -6 -16 8 Z" fill="#f0e8d0" stroke="#8a7860" strokeWidth="0.4" />
          <path d="M-4 -14 L-4 8" stroke="#7a2044" strokeWidth="1.4" />
          {/* bras qui tient un stylet */}
          <path d="M12 -4 L28 12" stroke="#c8946a" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M28 12 L34 20" stroke="#3a2418" strokeWidth="1" strokeLinecap="round" />
          {/* tête */}
          <ellipse cx="0" cy="-28" rx="10" ry="12" fill="#c8946a" stroke="#5a3818" strokeWidth="0.5" />
          <path d="M-9 -32 q-2 -8 4 -10 q6 4 8 -2 q4 4 6 -2 q4 6 3 12" stroke="#3a2418" strokeWidth="1.4" fill="none" />
          <circle cx="-3" cy="-28" r="1.2" fill="#0a0806" />
          <circle cx="3" cy="-28" r="1.2" fill="#0a0806" />
          {/* petite barbe soignée */}
          <path d="M-4 -20 q4 3 8 0" stroke="#3a2418" strokeWidth="1.2" fill="none" />
        </g>
        <g transform="translate(560,436)" style={{ animation: "float 2s ease-in-out infinite" }}>
          <circle r="14" fill="#ffd166" stroke="#8a5a20" strokeWidth="2" />
          <text y="5" textAnchor="middle" fontSize="18" fontWeight="800" fill="#3a2410">?</text>
        </g>

        {/* Débardeur qui porte une amphore sur l'épaule */}
        <g transform="translate(400,510)">
          <ellipse cx="0" cy="30" rx="20" ry="4" fill="#0a0604" opacity="0.5" />
          {/* jambes musclées */}
          <path d="M-6 30 L-6 4 M6 30 L6 4" stroke="#a06838" strokeWidth="6" strokeLinecap="round" />
          {/* torse nu */}
          <path d="M-14 4 Q-16 -18 0 -24 Q16 -18 14 4 Z" fill="#a06838" stroke="#3a2010" strokeWidth="0.5" />
          {/* pagne */}
          <path d="M-14 4 L14 4 L18 20 L-18 20 Z" fill="#c88a52" stroke="#5a3818" strokeWidth="0.4" />
          {/* bras qui tient une amphore sur l'épaule */}
          <path d="M-12 -12 L-24 -22" stroke="#a06838" strokeWidth="3.5" strokeLinecap="round" />
          <g transform="translate(-24,-30)">
            <path d="M-10 6 Q-10 22 -4 26 L4 26 Q10 22 10 6 Q10 -8 0 -12 Q-10 -8 -10 6 Z" fill="url(#po-amphore)" stroke="#3a1810" strokeWidth="0.6" />
            <path d="M-10 -2 Q-16 -6 -10 -12 M10 -2 Q16 -6 10 -12" stroke="#5a3818" strokeWidth="1.4" fill="none" />
          </g>
          {/* tête */}
          <ellipse cx="0" cy="-34" rx="9" ry="10" fill="#a06838" stroke="#3a2010" strokeWidth="0.5" />
          <path d="M-8 -36 q-2 -6 4 -8 q6 4 8 -2" stroke="#3a2418" strokeWidth="1.2" fill="none" />
        </g>

        {/* Ephemere : oursin séché + morceau de corde (disparaissent au ramassage) */}
        {!inv.includes("oursin") && (
        <g transform="translate(160,538)">
          <circle r="8" fill="#5a4028" stroke="#2a1810" strokeWidth="0.5" />
          {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((a, i) => {
            const rad = (a * Math.PI) / 180;
            return <line key={i} x1={Math.cos(rad) * 8} y1={Math.sin(rad) * 8} x2={Math.cos(rad) * 14} y2={Math.sin(rad) * 14} stroke="#3a2010" strokeWidth="0.7" />;
          })}
        </g>
        )}
        {!inv.includes("cordage") && (
        <g transform="translate(860,540) rotate(20)">
          <path d="M-14 0 q-2 6 6 4 q6 -4 12 4 q4 -4 12 -4" stroke="#8a7048" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M-14 0 q-2 6 6 4 q6 -4 12 4 q4 -4 12 -4" stroke="#c8a878" strokeWidth="1" fill="none" strokeLinecap="round" />
        </g>
        )}
      </PLayer>

      <Hotspot cx={560} cy={480} r={40} label="le marchand qui note ses comptes" reveal={reveal} onClick={() => action("marchand_port")} />
      <Hotspot cx={400} cy={500} r={30} label="le débardeur avec son amphore" reveal={reveal} onClick={() => action("debardeur")} />
      <Hotspot cx={220} cy={510} r={70} label="pile d'amphores étiquetées" reveal={reveal} onClick={() => action("amphores_port")} />
      <Hotspot cx={720} cy={340} r={60} label="navire marchand à quai" reveal={reveal} onClick={() => action("navire_port")} />
      <Hotspot cx={670} cy={200} r={80} label="LE VÉSUVE qui fume drôlement" reveal={reveal} onClick={() => action("vesuve_port")} />
      <Hotspot cx={160} cy={538} r={14} label="oursin séché" item="oursin" reveal={reveal} onClick={() => collect("oursin")} />
      <Hotspot cx={860} cy={540} r={18} label="bout de cordage" item="cordage" reveal={reveal} onClick={() => collect("cordage")} />
      {/* Un seul oiseau blanc (mouette) qui traverse de DROITE a GAUCHE. */}
      <g opacity="0.95">
        <animateTransform attributeName="transform" type="translate"
          values="1080,110; -40,130; 1080,110" dur="28s" repeatCount="indefinite" />
        <path d="M0 0 q7 -9 14 0 q7 -9 14 0" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
</svg>
  );
}
