import { useState } from "react";
import PnjSprite from "../PnjSprite.jsx";

/* ============================================================
   JEU 3 — SCÈNE : « Bureau des Rumeurs » (R-01) — MISSION TUTO
   ------------------------------------------------------------
   Salle refaite plus grande et plus élaborée (viewBox 1200×620,
   maxHeight 76vh) tout en gardant la logique mission (Marek,
   Séra, Yol → verdict). Décor :
   - Plafond avec ventilateur qui tourne, tuyauterie, 4 lampes
     suspendues à halo
   - Enseigne murale néon « BUREAU DES RUMEURS · R-01 »
   - Trois cadres « AVIS OFFICIEL » encadrés au mur
   - Grand tableau d'affichage central avec papiers punaisés
   - Deux gros classeurs à tiroirs (côté droit)
   - Une bibliothèque de dossiers reliés (côté gauche)
   - Kiosque à affichage vitré au premier plan
   - Comptoir traversant avec registre, encrier, tampon, téléphone
   - Fontaine à eau, plante en pot, deux tables rondes façon
     coffee corner, horloge, extincteur
   - Sol lattes bois en perspective
   ============================================================ */
export default function BunkerRumeurs({ onGo, j3 }) {
  const mission = j3.missions.kova;
  const done = j3.flags[mission.flag];
  const heardAll = mission.pnj.every((p) => j3.heardPnj[p.id]);
  const [selected, setSelected] = useState(null);
  const [verdict, setVerdict] = useState(null);
  const currentPnj = selected ? mission.pnj.find((p) => p.id === selected) : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: "100%" }}>
      {/* Bandeau mission compact (une seule ligne) */}
      <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#e0a848" }}>
        🎯 MISSION · {mission.titre.toUpperCase()} — clique un PNJ pour l'écouter
      </div>

      <svg viewBox="0 0 1200 620" style={{ display: "block", width: "100%", height: "auto", maxHeight: "78vh" }}>
        <defs>
          <linearGradient id="br-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2418" />
            <stop offset="100%" stopColor="#141008" />
          </linearGradient>
          <linearGradient id="br-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a2818" />
            <stop offset="100%" stopColor="#0e0a04" />
          </linearGradient>
          <radialGradient id="br-lamp" cx="50%" cy="0%" r="60%">
            <stop offset="0%" stopColor="#c8a848" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#c8a848" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="br-counter" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8a5030" />
            <stop offset="100%" stopColor="#3a2010" />
          </linearGradient>
          <linearGradient id="br-cabinet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5a4028" />
            <stop offset="100%" stopColor="#2a1808" />
          </linearGradient>
        </defs>

        {/* Mur + sol */}
        <rect width="1200" height="620" fill="url(#br-wall)" />
        <rect y="440" width="1200" height="180" fill="url(#br-floor)" />
        <path d="M0 440 L1200 440" stroke="#0a0806" strokeWidth="1.5" />
        {/* Sol lattes bois en perspective */}
        {[80, 260, 460, 740, 940, 1120].map((x, i) => (
          <path key={i} d={`M${x} 440 L${x + (x - 600) * 0.14} 620`} stroke="#0a0604" strokeWidth="0.8" opacity="0.55" />
        ))}
        <path d="M0 510 L1200 510" stroke="#0a0604" strokeWidth="0.5" opacity="0.5" />
        <path d="M0 570 L1200 570" stroke="#0a0604" strokeWidth="0.4" opacity="0.4" />
        {/* Plinthe */}
        <rect y="436" width="1200" height="6" fill="#1a0e08" />

        {/* PLAFOND avec poutre principale + tuyaux + 4 lampes suspendues */}
        <rect x="0" y="0" width="1200" height="60" fill="#1a1408" />
        <path d="M0 60 L1200 60" stroke="#3a2010" strokeWidth="3" />
        <path d="M0 26 L1200 26" stroke="#c8a848" strokeWidth="6" opacity="0.85" />
        <path d="M0 42 L1200 42" stroke="#5a4028" strokeWidth="2" opacity="0.75" />
        {/* Attaches */}
        {[120, 340, 600, 860, 1080].map((x, i) => (
          <rect key={i} x={x - 6} y="22" width="12" height="12" fill="#3a2010" stroke="#0a0806" strokeWidth="0.5" />
        ))}
        {/* Ventilateur central au plafond */}
        <g transform="translate(600,80)">
          <line x1="0" y1="0" x2="0" y2="-24" stroke="#3a2010" strokeWidth="2" />
          <circle r="10" fill="#28303a" stroke="#0a0806" strokeWidth="1" />
          <g style={{ transformOrigin: "0 0", animation: "brFan 5s linear infinite" }}>
            {[0, 90, 180, 270].map((a) => (
              <path key={a} d="M0 0 L60 -6 L64 0 L60 6 Z" fill="#c8b090" stroke="#0a0806" strokeWidth="0.6" transform={`rotate(${a})`} />
            ))}
          </g>
          <circle r="4" fill="#c8a848" />
        </g>
        {/* 4 lampes suspendues avec halo */}
        {[200, 400, 800, 1000].map((x, i) => (
          <g key={i}>
            <line x1={x} y1="60" x2={x} y2="98" stroke="#3a2010" strokeWidth="2" />
            <path d={`M${x - 26} 98 L${x + 26} 98 L${x + 20} 118 L${x - 20} 118 Z`} fill="#5a4028" stroke="#0a0806" strokeWidth="1" />
            <circle cx={x} cy="116" r="5" fill="#ffd870">
              <animate attributeName="opacity" values="0.6;1;0.6" dur={`${2.4 + i * 0.2}s`} repeatCount="indefinite" />
            </circle>
            <ellipse cx={x} cy="150" rx="90" ry="30" fill="url(#br-lamp)" />
          </g>
        ))}

        {/* Enseigne néon en haut du mur */}
        <g transform="translate(600,90)">
          <rect x="-220" y="-22" width="440" height="44" fill="#0e0a04" stroke="#e0a848" strokeWidth="2" rx="4" />
          <rect x="-214" y="-16" width="428" height="32" fill="#141008" opacity="0.6" />
          <text x="0" y="8" textAnchor="middle" fontFamily="Georgia,serif" fontSize="22" fontWeight="800" fill="#e0a848" letterSpacing="6" style={{ filter: "drop-shadow(0 0 4px #c8a848)" }}>
            BUREAU DES RUMEURS · R-01
          </text>
        </g>

        {/* Bibliothèque de dossiers reliés à gauche (7 rangées) */}
        <g transform="translate(30,140)">
          <rect x="-4" y="-6" width="120" height="294" fill="#2a1808" stroke="#0a0604" strokeWidth="2" />
          {[0, 40, 80, 120, 160, 200, 240].map((y, k) => (
            <g key={y}>
              <rect x="0" y={y} width="112" height="4" fill="#3a2010" />
              {[0, 15, 30, 45, 60, 75, 90].map((x, i) => (
                <rect key={x} x={x} y={y - 34} width="13" height="34"
                  fill={["#8a3820", "#5a2818", "#8a5030", "#5a4028", "#c8a848", "#8a3820", "#3a2818"][(i + k) % 7]}
                  stroke="#1a0e08" strokeWidth="0.4" />
              ))}
            </g>
          ))}
          <text x="56" y="298" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#c8a848" letterSpacing="2">DOSSIERS A-Z</text>
        </g>

        {/* GRAND tableau d'affichage central — nouveau format, dominant */}
        <g transform="translate(600,270)">
          {/* Cadre extérieur épais bois foncé */}
          <rect x="-340" y="-130" width="680" height="260" fill="#3a2010" stroke="#0a0604" strokeWidth="6" rx="4" />
          {/* Liège brun */}
          <rect x="-326" y="-116" width="652" height="232" fill="#5a3818" stroke="#3a2010" strokeWidth="1.5" />
          <rect x="-320" y="-110" width="640" height="220" fill="#8a5030" opacity="0.35" />
          {/* Texture liège : petits points */}
          {Array.from({ length: 80 }).map((_, i) => {
            const x = -318 + (i * 47) % 636;
            const y = -108 + Math.floor((i * 47) / 636) * 28 + (i % 3) * 4;
            return <circle key={i} cx={x} cy={y} r="0.8" fill="#3a2010" opacity="0.35" />;
          })}
          {/* Bande étiquette en haut */}
          <rect x="-160" y="-156" width="320" height="26" fill="#e8dfc8" stroke="#3a2010" strokeWidth="1.5" />
          <text x="0" y="-138" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fontWeight="800" fill="#8a1010" letterSpacing="4">RUMEURS DE LA SEMAINE</text>

          {/* Papiers punaisés — plus grands, mieux répartis */}
          {[
            [-256, -76, "#e8dfc8", -5, "Sortie C-3", "Un habitant dit avoir vu une nièce revenir vivante du dehors.", "M."],
            [-124, -84, "#f4ecd0", 3, "Rations", "3 cageots par jour. Le compte est trop juste.", "B."],
            [10, -76, "#e8dfc8", -3, "Voix radio", "Sur la bande 87 FM, une voix féminine qui n'est pas M.", "L."],
            [148, -84, "#f0e4c8", 4, "Filtres", "Filtres air neufs — pourquoi si l'extérieur est mort ?", "T."],
            [270, -76, "#c8b090", -4, "Coupures 40j", "Coupure électrique d'une minute pile toutes les 40 nuits.", "Y."],
            [-256, 40, "#e8dfc8", 2, "Tissu neuf", "Rouleaux de coton qui arrivent chaque mois.", "Y."],
            [-124, 50, "#c8b090", -3, "Livre effacé", "Champ de blé page 42 — livre disparu depuis.", "E."],
            [10, 42, "#f4ecd0", 4, "Fatigue", "3 voisins par mois passés à l'infirmerie sans reparaître.", "M."],
            [148, 50, "#e8dfc8", -3, "Carnets", "30 carnets comparant archives / récits Anciens.", "E."],
            [270, 40, "#f0e4c8", 5, "Anniv. M.", "Célébration officielle prévue — présence attendue.", "M."],
          ].map(([x, y, c, r, titre, texte, sig], i) => (
            <g key={i} transform={`translate(${x},${y}) rotate(${r})`}>
              {/* Ombre du papier */}
              <rect x="-52" y="-32" width="104" height="66" fill="#0a0604" opacity="0.35" transform="translate(2,3)" />
              {/* Papier */}
              <rect x="-52" y="-32" width="104" height="66" fill={c} stroke="#5a4028" strokeWidth="0.6" />
              {/* Titre du papier */}
              <text x="-46" y="-20" fontFamily="ui-monospace,monospace" fontSize="7" fontWeight="800" fill="#8a1010" letterSpacing="1">{titre}</text>
              <line x1="-46" y1="-14" x2="46" y2="-14" stroke="#5a4028" strokeWidth="0.5" opacity="0.6" />
              {/* Texte manuscrit */}
              <foreignObject x="-46" y="-10" width="92" height="30">
                <div xmlns="http://www.w3.org/1999/xhtml"
                  style={{ font: "italic 6.5px Georgia,serif", color: "#3a2010", lineHeight: 1.15, textAlign: "justify" }}>
                  {texte}
                </div>
              </foreignObject>
              {/* Signature */}
              <text x="42" y="30" textAnchor="end" fontFamily="Georgia,serif" fontSize="6" fontStyle="italic" fill="#5a4028">— {sig}</text>
              {/* Punaise */}
              <circle cx="0" cy="-30" r="2.2" fill={i % 3 === 0 ? "#e83820" : (i % 3 === 1 ? "#c8a848" : "#3a80c8")} stroke="#0a0604" strokeWidth="0.3" />
              <circle cx="0" cy="-30" r="1" fill="#fff" opacity="0.6" />
            </g>
          ))}
        </g>

        {/* Deux gros classeurs à tiroirs à droite */}
        {[0, 1].map((k) => (
          <g key={k} transform={`translate(${1080 + (k * -140)},${160 + k * 4})`}>
            <rect x="0" y="0" width="90" height="270" fill="url(#br-cabinet)" stroke="#0a0604" strokeWidth="2" />
            {[0, 1, 2, 3, 4].map((r) => (
              <g key={r} transform={`translate(4,${8 + r * 52})`}>
                <rect x="0" y="0" width="82" height="44" fill="#5a3818" stroke="#0a0604" strokeWidth="0.6" />
                <rect x="0" y="0" width="82" height="44" fill="#8a5030" stroke="#3a2010" strokeWidth="0.5" opacity="0.55" />
                <rect x="30" y="16" width="22" height="6" fill="#c8a848" stroke="#3a2010" strokeWidth="0.4" />
                <rect x="6" y="6" width="20" height="8" fill="#e8dfc8" stroke="#5a4028" strokeWidth="0.3" />
                <text x="16" y="12" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="4" fontWeight="800" fill="#3a2010">
                  {String.fromCharCode(65 + k * 5 + r)}
                </text>
              </g>
            ))}
          </g>
        ))}
        {/* Petite plante sur le classeur avant */}
        <g transform="translate(985,158)">
          <rect x="-10" y="0" width="20" height="10" fill="#5a3018" />
          <path d="M-6 0 Q-4 -14 -8 -6 M0 0 Q4 -18 -2 -8 M6 0 Q8 -12 12 -4" stroke="#3a6828" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>

        {/* Comptoir massif traversant */}
        <g transform="translate(180,400)">
          <rect x="0" y="0" width="820" height="42" fill="url(#br-counter)" stroke="#1a0e08" strokeWidth="2" />
          <path d="M0 0 L820 0" stroke="#c8a848" strokeWidth="2" opacity="0.5" />
          {[0, 180, 360, 540, 720, 820].map((x, i) => (
            <line key={i} x1={x} y1="0" x2={x} y2="42" stroke="#3a2010" strokeWidth="0.8" opacity="0.7" />
          ))}
          {/* Registre + plume */}
          <g transform="translate(120,-22)">
            <path d="M-38 0 L38 0 L38 22 L-38 22 Z" fill="#e8dfc8" stroke="#5a4028" strokeWidth="1" />
            <path d="M0 0 L0 22" stroke="#5a4028" strokeWidth="0.8" />
            {[6, 12, 18].map((y) => (
              <g key={y}>
                <line x1="-32" y1={y} x2="-6" y2={y} stroke="#5a4028" strokeWidth="0.4" />
                <line x1="6" y1={y} x2="32" y2={y} stroke="#5a4028" strokeWidth="0.4" />
              </g>
            ))}
            <path d="M30 -2 L40 -12 L38 -4 Z" fill="#3a2818" />
          </g>
          {/* Encrier + tampon */}
          <g transform="translate(300,-14)">
            <rect x="-8" y="0" width="16" height="14" fill="#28303a" stroke="#0a0806" strokeWidth="0.8" />
            <ellipse cx="0" cy="0" rx="6" ry="2" fill="#0a0806" />
            <rect x="18" y="4" width="22" height="10" fill="#8a1010" stroke="#0a0806" strokeWidth="0.6" />
            <text x="29" y="12" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="4" fontWeight="800" fill="#e8dfc8">VU</text>
          </g>
          {/* Téléphone à cadran */}
          <g transform="translate(500,-30)">
            <rect x="-20" y="18" width="40" height="12" fill="#28303a" stroke="#0a0806" strokeWidth="0.8" />
            <ellipse cx="0" cy="6" rx="18" ry="10" fill="#28303a" stroke="#0a0806" strokeWidth="1" />
            <ellipse cx="0" cy="6" rx="10" ry="6" fill="#0a0806" />
            <ellipse cx="0" cy="6" rx="6" ry="4" fill="#c8a848" />
            <rect x="-24" y="-4" width="48" height="8" rx="3" fill="#3a2010" stroke="#0a0806" strokeWidth="0.6" />
            <path d="M22 12 q6 4 -2 8 q6 4 -2 8 q6 4 -2 8" stroke="#0a0806" strokeWidth="0.8" fill="none" />
          </g>
          {/* Tas de dossiers */}
          <g transform="translate(690,-24)">
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={-30 + i * 4} y={-i * 4} width="70" height="18" fill={["#5a2818", "#8a5030", "#3a2818", "#8a3820"][i]} stroke="#1a0e08" strokeWidth="0.6" />
            ))}
          </g>
          {/* Étiquette « COMPTOIR » */}
          <rect x="380" y="14" width="70" height="14" fill="#e8dfc8" stroke="#3a2010" strokeWidth="0.5" />
          <text x="415" y="24" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7" fontWeight="800" fill="#3a2010">COMPTOIR</text>
        </g>

        {/* Kiosque à affichage vitré au premier plan gauche */}
        <g transform="translate(90,470)">
          <rect x="-4" y="0" width="150" height="120" fill="#3a2010" stroke="#0a0604" strokeWidth="2" />
          <rect x="0" y="4" width="142" height="94" fill="#e8dfc8" stroke="#3a2010" strokeWidth="1" />
          <text x="71" y="20" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fontWeight="800" fill="#8a1010" letterSpacing="1">« LA VOIX »</text>
          <text x="71" y="34" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="5" fill="#5a4028">N°4 087 · JOUR 14 998</text>
          <line x1="10" y1="42" x2="132" y2="42" stroke="#5a4028" strokeWidth="0.4" />
          {[48, 56, 64, 72, 80, 88].map((y) => (
            <line key={y} x1="10" y1={y} x2={y % 16 === 0 ? 100 : 120} y2={y} stroke="#5a4028" strokeWidth="0.3" opacity="0.55" />
          ))}
          <rect x="8" y="118" width="6" height="18" fill="#3a2010" />
          <rect x="132" y="118" width="6" height="18" fill="#3a2010" />
        </g>

        {/* Fontaine à eau à droite */}
        <g transform="translate(1060,470)">
          <rect x="0" y="0" width="60" height="120" fill="#5a6270" stroke="#0a0604" strokeWidth="2" />
          <rect x="4" y="4" width="52" height="34" fill="#3a80c8" opacity="0.7" stroke="#0a0604" strokeWidth="0.6" />
          <circle cx="30" cy="18" r="2" fill="#e8eef5" opacity="0.7">
            <animate attributeName="cy" values="30;6;30" dur="3s" repeatCount="indefinite" />
          </circle>
          <rect x="24" y="52" width="12" height="6" fill="#c8a848" />
          <path d="M30 58 L30 66" stroke="#7fd8ff" strokeWidth="1" opacity="0.7" />
          <rect x="22" y="66" width="16" height="14" fill="#c8d4e2" stroke="#5a6270" strokeWidth="0.5" opacity="0.7" />
          <rect x="8" y="86" width="44" height="20" fill="#0a0604" stroke="#5a6270" strokeWidth="0.5" />
          <text x="30" y="118" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="5" fill="#c8a848">H₂O</text>
        </g>

        {/* Table ronde + tabouret + tasses au centre-premier plan */}
        <g transform="translate(340,540)">
          <ellipse cx="0" cy="0" rx="56" ry="14" fill="#5a3818" stroke="#1a0e08" strokeWidth="1.5" />
          <ellipse cx="0" cy="-3" rx="56" ry="14" fill="#8a5030" stroke="#1a0e08" strokeWidth="1" />
          <rect x="-3" y="0" width="6" height="30" fill="#3a2010" />
          <ellipse cx="-24" cy="-4" rx="7" ry="3" fill="#e8dfc8" stroke="#5a4028" strokeWidth="0.5" />
          <ellipse cx="-24" cy="-6" rx="4" ry="1.5" fill="#3a2010" />
          <ellipse cx="18" cy="-4" rx="7" ry="3" fill="#c8b090" stroke="#5a4028" strokeWidth="0.5" />
          <ellipse cx="-2" cy="-5" rx="4" ry="1.5" fill="#3a4048" stroke="#0a0806" strokeWidth="0.3" />
        </g>
        <g transform="translate(280,556)">
          <ellipse cx="0" cy="0" rx="14" ry="5" fill="#3a2010" stroke="#0a0806" strokeWidth="0.8" />
          <ellipse cx="0" cy="-3" rx="14" ry="5" fill="#5a4028" stroke="#0a0806" strokeWidth="0.6" />
          <rect x="-2" y="0" width="4" height="24" fill="#3a2010" />
        </g>
        {/* Deuxième table ronde à droite */}
        <g transform="translate(760,548)">
          <ellipse cx="0" cy="0" rx="50" ry="12" fill="#5a3818" stroke="#1a0e08" strokeWidth="1.5" />
          <ellipse cx="0" cy="-3" rx="50" ry="12" fill="#8a5030" stroke="#1a0e08" strokeWidth="1" />
          <rect x="-3" y="0" width="6" height="26" fill="#3a2010" />
          {/* Journal ouvert */}
          <g transform="translate(0,-8)">
            <rect x="-22" y="-6" width="44" height="10" fill="#e8dfc8" stroke="#5a4028" strokeWidth="0.5" />
            <line x1="-18" y1="-3" x2="18" y2="-3" stroke="#5a4028" strokeWidth="0.3" />
            <line x1="-18" y1="0" x2="14" y2="0" stroke="#5a4028" strokeWidth="0.3" />
            <line x1="-18" y1="3" x2="16" y2="3" stroke="#5a4028" strokeWidth="0.3" />
          </g>
        </g>
        {/* Horloge murale au fond gauche */}
        <g transform="translate(90,140)">
          <circle r="20" fill="#e8dfc8" stroke="#3a2010" strokeWidth="2" />
          <circle r="16" fill="#f4ecd0" />
          {[0, 90, 180, 270].map((a) => (
            <line key={a} x1={13 * Math.cos((a * Math.PI) / 180)} y1={13 * Math.sin((a * Math.PI) / 180)}
              x2={17 * Math.cos((a * Math.PI) / 180)} y2={17 * Math.sin((a * Math.PI) / 180)}
              stroke="#3a2010" strokeWidth="1.2" />
          ))}
          <line x1="0" y1="0" x2="0" y2="-13" stroke="#0a0806" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="0" y1="0" x2="9" y2="5" stroke="#0a0806" strokeWidth="1" strokeLinecap="round" />
          <circle r="1.6" fill="#0a0806" />
          <text x="0" y="10" textAnchor="middle" fontFamily="Georgia,serif" fontSize="4" fill="#5a4028" fontStyle="italic">M.</text>
        </g>

        {/* Plante en pot au premier plan droit */}
        <g transform="translate(1010,570)">
          <path d="M-16 0 L16 0 L12 40 L-12 40 Z" fill="#5a3818" stroke="#1a0e08" strokeWidth="1" />
          <path d="M-14 -30 Q-6 -50 0 -22 M0 -46 Q6 -58 12 -30 M6 -30 Q14 -42 20 -22 M-14 -14 Q-22 -34 -8 -30 M-4 -38 Q2 -50 8 -34" stroke="#3a6828" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <ellipse cx="0" cy="-8" rx="16" ry="4" fill="#3a2010" opacity="0.5" />
        </g>

        {/* Extincteur au sol à gauche */}
        <g transform="translate(230,550)">
          <rect x="0" y="0" width="18" height="46" fill="#8a1010" stroke="#0a0806" strokeWidth="1" rx="3" />
          <rect x="5" y="-3" width="8" height="6" fill="#3a4048" stroke="#0a0806" strokeWidth="0.5" />
          <text x="9" y="24" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="3" fontWeight="800" fill="#fff">FEU</text>
        </g>

        {/* PNJ de mission */}
        {mission.pnj.map((p) => (
          <PnjSprite key={p.id}
            x={p.pose.x} y={p.pose.y}
            color={p.color} pants={p.pants} hair={p.hair}
            facing={p.facing || "front"} accessory={p.accessory || null}
            activity={p.activity || null}
            nom={p.nom} role={p.role}
            heard={!!j3.heardPnj[p.id]}
            active={selected === p.id}
            onClick={done ? undefined : () => { setSelected(p.id); j3.hear(p.id); setVerdict(null); }} />
        ))}

        <style>{`@keyframes brFan { from { transform: rotate(0); } to { transform: rotate(360deg); } }`}</style>
      </svg>

      {/* Zone dialogue / verdict */}
      <div style={{ maxWidth: 900, width: "100%", minHeight: 90 }}>
        {done ? (
          <div style={{ background: "#0e2818", border: "1px solid #5eff9e", borderRadius: 10, padding: "12px 16px" }}>
            <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#5eff9e" }}>
              ✓ MISSION ACCOMPLIE
            </div>
            <p style={{ margin: "4px 0 0", fontSize: 13.5, lineHeight: 1.5, color: "#e8eef5" }}>
              {mission.succes}
            </p>
          </div>
        ) : verdict ? (
          <div style={{ background: verdict.ok ? "#0e2818" : "#2a1408", border: `1px solid ${verdict.ok ? "#5eff9e" : "#e0a848"}`, borderRadius: 10, padding: "12px 16px" }}>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: "#e8eef5" }}>
              {verdict.retour}
            </p>
            {!verdict.ok && (
              <button onClick={() => setVerdict(null)}
                style={{ marginTop: 10, background: "#141b26", color: "#e0a848", border: "1px solid #5a4028", borderRadius: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer", fontFamily: "ui-monospace,monospace" }}>
                ↺ Réessayer
              </button>
            )}
          </div>
        ) : currentPnj ? (
          <div style={{ background: "#141020", border: "1px solid #3a80c8", borderRadius: 10, padding: "12px 16px" }}>
            <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#7fd8ff" }}>
              {currentPnj.nom.toUpperCase()} · {currentPnj.role}
            </div>
            <p style={{ margin: "4px 0 0", fontSize: 14, lineHeight: 1.5, color: "#e8eef5" }}>
              « {currentPnj.replique} »
            </p>
          </div>
        ) : (
          <div style={{ background: "#0a0e14", border: "1px dashed #3a4048", borderRadius: 10, padding: "10px 14px" }}>
            <p style={{ margin: 0, fontSize: 12.5, color: "#c8d4e2", lineHeight: 1.4 }}>
              <span style={{ color: "#e0a848", fontWeight: 700 }}>Briefing : </span>{mission.briefing}
            </p>
            <p style={{ margin: "6px 0 0", fontSize: 12, color: "#7a879e", fontStyle: "italic" }}>
              Clique un PNJ dans la salle pour l'écouter.
              {heardAll ? " Tu peux maintenant rendre ton verdict." : ` (${Object.keys(j3.heardPnj).filter((k) => mission.pnj.some((p) => p.id === k)).length} / ${mission.pnj.length})`}
            </p>
          </div>
        )}
      </div>

      {!done && heardAll && !verdict && (
        <div style={{ maxWidth: 900, width: "100%" }}>
          <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#e0a848", textAlign: "center", marginBottom: 6 }}>
            🎯 RENDS TON VERDICT
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {mission.verdicts.map((v) => (
              <button key={v.id} onClick={() => {
                setVerdict({ ok: v.ok, retour: v.retour });
                if (v.ok) j3.setFlag(mission.flag);
              }}
                title={v.desc}
                style={{ background: "#141b26", color: "#e8eef5", border: "1px solid #3a4048", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: 1, minWidth: 160 }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#e0a848"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#3a4048"; }}>
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <button onClick={() => onGo(j3.hubRoom || "hub")}
        style={{ background: "#141b26", color: "#7fd8ff", border: "1px solid #3a80c8", borderRadius: 10, padding: "10px 22px", fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: "ui-monospace,monospace", letterSpacing: 1, marginTop: 4 }}>
        ← Retour au couloir
      </button>
    </div>
  );
}
