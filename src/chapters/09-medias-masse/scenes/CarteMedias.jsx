/* ============================================================
   CHAPITRE 9 — Carte : frise chronologique 1960 → 1990
   Les 3 tableaux se passent tous « à la maison » — ce n'est pas
   la géographie qui structure l'époque, c'est le temps. Chaque
   arrêt correspond à un média qui entre dans le foyer.
   ============================================================ */

const ETAPES = [
  { tab: 0, an: 1969, nom: "Le salon",   sous: "TV Lune, direct mondial",     emoji: "📺" },
  { tab: 1, an: 1985, nom: "La chambre", sous: "cassette + magnétoscope",     emoji: "📼" },
  { tab: 2, an: 1990, nom: "Le bureau",  sous: "PC beige, disquette, CD-Rom", emoji: "💿" },
];

const T0 = 1960;
const T1 = 1995;

function pctFor(an) {
  return ((an - T0) / (T1 - T0)) * 100;
}

export default function CarteMedias({ tab = 0 }) {
  return (
    <svg viewBox="0 0 700 440" style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <linearGradient id="c9-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2a3040" /><stop offset="100%" stopColor="#0e1420" /></linearGradient>
        <linearGradient id="c9-line" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#5a7a90" /><stop offset="100%" stopColor="#c8a848" /></linearGradient>
        <radialGradient id="c9-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffd166" stopOpacity="0.85" /><stop offset="100%" stopColor="#ffd166" stopOpacity="0" /></radialGradient>
      </defs>

      {/* fond nuit étoilée (années 60-90 = âge médiatique) */}
      <rect width="700" height="440" fill="url(#c9-bg)" />
      {/* petites étoiles */}
      {[[80, 60], [180, 90], [320, 40], [480, 80], [610, 50], [140, 130], [420, 130], [560, 130], [70, 200]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.4" fill="#f0e8d0" opacity={0.4 + (i % 3) * 0.2} />
      ))}

      {/* titre */}
      <text x="350" y="46" textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize="20" fill="#c8b090" letterSpacing="2">Les médias entrent à la maison</text>
      <text x="350" y="68" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="11" fill="#8a7860" letterSpacing="3">1960 · · · · · 1990</text>

      {/* ═══ FRISE CHRONOLOGIQUE ═══ */}
      {/* la ligne du temps */}
      <line x1="80" y1="220" x2="620" y2="220" stroke="url(#c9-line)" strokeWidth="4" strokeLinecap="round" />
      {/* graduations aux décennies */}
      {[1960, 1970, 1980, 1990].map((an, i) => {
        const x = 80 + (pctFor(an) / 100) * 540;
        return (
          <g key={i}>
            <line x1={x} y1="212" x2={x} y2="228" stroke="#5a7a90" strokeWidth="1.5" />
            <text x={x} y="248" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9.5" fill="#8a9aa8">{an}</text>
          </g>
        );
      })}

      {/* les 3 étapes le long de la frise */}
      {ETAPES.map((e) => {
        const ici = e.tab === tab;
        const x = 80 + (pctFor(e.an) / 100) * 540;
        return (
          <g key={e.tab}>
            {/* trait vertical vers la timeline */}
            <line x1={x} y1="140" x2={x} y2="212" stroke={ici ? "#e8542e" : "#5a7a90"} strokeWidth="1.5" strokeDasharray={ici ? "" : "3 3"} />

            {/* étiquette date au-dessus */}
            <text x={x} y="128" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize={ici ? 14 : 12} fontWeight={ici ? 700 : 400} fill={ici ? "#ffd166" : "#c8b090"}>{e.an}</text>

            {/* halo si actif */}
            {ici && <circle cx={x} cy="220" r="30" fill="url(#c9-glow)" style={{ animation: "glow 2s ease-in-out infinite" }} />}

            {/* point sur la timeline */}
            <circle cx={x} cy="220" r={ici ? 10 : 6} fill={ici ? "#e8542e" : "#7a3a24"} stroke="#f0e8d0" strokeWidth="2" />
            {ici && <circle cx={x} cy="220" r="16" fill="none" stroke="#e8542e" strokeWidth="2" style={{ animation: "pulse 1.6s ease-in-out infinite" }} />}

            {/* carte descriptive sous la timeline */}
            <g transform={`translate(${x},296)`}>
              <rect x="-70" y="0" width="140" height="80" rx="8" fill={ici ? "rgba(232,84,46,0.15)" : "rgba(90,122,144,0.15)"} stroke={ici ? "#e8542e" : "#5a7a90"} strokeWidth={ici ? 2 : 1} />
              <text x="0" y="26" textAnchor="middle" fontSize="24">{e.emoji}</text>
              <text x="0" y="50" textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize={ici ? 15 : 13} fontWeight={ici ? 700 : 400} fill={ici ? "#ffd166" : "#c8b090"}>{e.nom}</text>
              <text x="0" y="68" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill={ici ? "#c8b090" : "#8a9aa8"}>{e.sous}</text>
            </g>

            {ici && <text x={x} y="404" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="11" fill="#e8542e" fontWeight="700">◉ tu es ici</text>}
          </g>
        );
      })}

      {/* petit clin d'œil pédagogique */}
      <text x="350" y="424" textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontStyle="italic" fontSize="11" fill="#7a889a" opacity="0.85">
        En 30 ans, la télé, le magnéto et l'ordinateur envahissent chaque foyer.
      </text>
    </svg>
  );
}
