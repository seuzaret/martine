/* ============================================================
   CHAPITRE 8 — TROIS cartes schématiques (une par lieu),
   sélectionnées selon le tableau courant :
   - tab 0 : Paris (jour) — Tour Eiffel + Kommandantur
   - tab 1 : Londres — Tamise + Big Ben + Bush House (BBC)
   - tab 2 : Paris (nuit) — Tour Eiffel + immeuble Dupont
   - tab 3 : Philadelphie — Pennsylvania + Université
   Style schématique volontairement simple, façon plan de jeu.
   ============================================================ */

export default function CarteXXe({ tab = 0 }) {
  const lieux = ['Paris — 5 juin 1944, jour', 'Londres — 5 juin 1944, 21h', 'Paris — nuit du 5 au 6 juin', 'Philadelphie — 1946'];
  return (
    <svg viewBox="0 0 700 440" style={{ display: 'block', width: '100%', height: 'auto' }}>
      <defs>
        <radialGradient id="c8-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd166" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffd166" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* fond crème (parchemin) */}
      <rect width="700" height="440" fill="#efe4c8" />
      {/* bordure décorative */}
      <rect x="8" y="8" width="684" height="424" fill="none" stroke="#5a4028" strokeWidth="2" rx="6" />
      <rect x="14" y="14" width="672" height="412" fill="none" stroke="#8a6840" strokeWidth="0.6" rx="4" />

      {/* Titre du lieu */}
      <text x="350" y="40" textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize="22" fontWeight="700" fill="#3a2010" letterSpacing="1">
        {lieux[tab] || ''}
      </text>

      {tab === 0 && <SubCarteParis nuit={false} />}
      {tab === 1 && <SubCarteLondres />}
      {tab === 2 && <SubCarteParis nuit={true} />}
      {tab === 3 && <SubCartePhiladelphie />}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   PARIS — Seine sinueuse, monuments, marqueur de scène
   nuit=false (T1 jour) : Kommandantur au Ritz, ambiance ocre
   nuit=true  (T3 nuit) : immeuble Dupont, ambiance bleu nuit
   ═══════════════════════════════════════════════════════════ */
function SubCarteParis({ nuit }) {
  const bg = nuit ? '#1e2438' : '#e0d0a0';
  const seineColor = nuit ? '#2a3858' : '#7fb0d0';
  const streetColor = nuit ? '#3a3020' : '#c8a878';
  const monumentFill = nuit ? '#3a2010' : '#c8963e';
  const monumentStroke = nuit ? '#1a0e04' : '#5a3818';
  const labelColor = nuit ? '#efe4c8' : '#3a2010';

  return (
    <>
      {/* fond ville */}
      <rect x="30" y="70" width="640" height="340" fill={bg} stroke="#5a4028" strokeWidth="1.5" />
      {/* étoiles la nuit */}
      {nuit && [[80, 100], [180, 90], [320, 110], [420, 100], [540, 90], [620, 110], [100, 130]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.2" fill="#f0e8d0" opacity="0.75" />
      ))}
      {/* lune */}
      {nuit && <circle cx="600" cy="110" r="16" fill="#f8f0d8" opacity="0.9" />}
      {nuit && <circle cx="606" cy="106" r="14" fill="#1e2438" />}

      {/* la SEINE (courbe sinueuse traversant Paris d'est en ouest) */}
      <path d="M 30 240 Q 150 220 220 250 Q 300 280 400 240 Q 480 210 560 250 Q 620 270 670 250"
        fill="none" stroke={seineColor} strokeWidth="18" strokeLinecap="round" opacity={nuit ? 0.85 : 0.75} />
      <path d="M 30 240 Q 150 220 220 250 Q 300 280 400 240 Q 480 210 560 250 Q 620 270 670 250"
        fill="none" stroke={nuit ? '#5aa0d0' : '#c0e0f0'} strokeWidth="2" opacity="0.55" />
      <text x="120" y="215" fontFamily="Palatino, Georgia, serif" fontStyle="italic" fontSize="12" fill={labelColor} opacity="0.85">la Seine</text>

      {/* Île de la Cité (Notre-Dame) */}
      <ellipse cx="360" cy="253" rx="26" ry="6" fill={nuit ? '#3a4258' : '#a89060'} stroke={monumentStroke} strokeWidth="1" />
      {/* Notre-Dame — 2 tours */}
      <g transform="translate(360,246)">
        <rect x="-8" y="-14" width="6" height="14" fill={monumentFill} stroke={monumentStroke} strokeWidth="0.8" />
        <rect x="2" y="-14" width="6" height="14" fill={monumentFill} stroke={monumentStroke} strokeWidth="0.8" />
        <path d="M-8 -14 L-5 -20 L-2 -14 M2 -14 L5 -20 L8 -14" fill={monumentFill} stroke={monumentStroke} strokeWidth="0.8" />
      </g>
      <text x="360" y="278" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill={labelColor} opacity="0.9">Notre-Dame</text>

      {/* Tour Eiffel */}
      <g transform="translate(180,320)">
        <path d="M-20 0 L-6 -70 L6 -70 L20 0 L15 0 L8 -30 L-8 -30 L-15 0 Z" fill={monumentFill} stroke={monumentStroke} strokeWidth="1.2" />
        <path d="M-10 -30 L10 -30 L8 -50 L-8 -50 Z" fill={monumentFill} stroke={monumentStroke} strokeWidth="1.2" />
        <path d="M-4 -70 L-4 -80 L4 -80 L4 -70" fill={monumentFill} stroke={monumentStroke} strokeWidth="1" />
        {/* petit drapeau nazi (jour) ou tricolore (nuit — clandestin) */}
        {!nuit && (
          <g>
            <path d="M0 -80 L14 -78 L14 -70 L0 -72 Z" fill="#8a1a1a" stroke="#3a0a0a" strokeWidth="0.6" />
            <circle cx="7" cy="-74" r="2.4" fill="#e8dfc8" />
            <text x="7" y="-72.5" textAnchor="middle" fontSize="4" fontWeight="800" fill="#1a1a1a">卐</text>
          </g>
        )}
      </g>
      <text x="180" y="335" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill={labelColor}>Tour Eiffel</text>
      {!nuit && <text x="180" y="346" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7" fill="#8a1a1a" opacity="0.9">occupée par la Wehrmacht</text>}

      {/* Arc de Triomphe */}
      <g transform="translate(90,180)">
        <path d="M-12 12 L-12 -4 L12 -4 L12 12 M-9 12 L-9 2 Q-9 -1 -6 -1 L6 -1 Q9 -1 9 2 L9 12" fill={monumentFill} stroke={monumentStroke} strokeWidth="1" />
      </g>
      <text x="90" y="205" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill={labelColor} opacity="0.9">Arc de Triomphe</text>

      {/* Champs-Élysées comme trait */}
      <path d="M 100 180 L 200 200" stroke={streetColor} strokeWidth="2" opacity="0.6" />

      {/* MARQUEUR de la scène en cours */}
      {!nuit ? (
        // Jour : marqueur sur le Ritz (place Vendôme = QG de la Kommandantur — schématique)
        <>
          <g transform="translate(280,170)">
            <rect x="-24" y="-16" width="48" height="32" fill="#8a1a1a" stroke="#3a0a0a" strokeWidth="1.5" />
            <path d="M-14 -16 h4 v6 h-4 z M-4 -16 h4 v6 h-4 z M6 -16 h4 v6 h-4 z" fill="#c04040" />
            <rect x="-3" y="-8" width="6" height="16" fill="#1a1a1a" />
          </g>
          <text x="280" y="200" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill={labelColor} opacity="0.9">Kommandantur (Place de l'Opéra)</text>
          {/* pastille rouge = la rue du marchand clandestin */}
          <circle r="26" cx="480" cy="180" fill="url(#c8-glow)" style={{ animation: 'glow 2s ease-in-out infinite' }} />
          <circle cx="480" cy="180" r="9" fill="#e8542e" stroke="#efe4c8" strokeWidth="2" />
          <circle cx="480" cy="180" r="14" fill="none" stroke="#e8542e" strokeWidth="2" style={{ animation: 'pulse 1.6s ease-in-out infinite' }} />
          <text x="480" y="158" textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize="14" fontWeight="700" fill={labelColor}>◉ tu es ici</text>
          <text x="480" y="204" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill={labelColor} opacity="0.9">rue du marché noir</text>
        </>
      ) : (
        // Nuit : marqueur sur l'immeuble Dupont
        <>
          <circle r="26" cx="450" cy="180" fill="url(#c8-glow)" style={{ animation: 'glow 2s ease-in-out infinite' }} />
          <circle cx="450" cy="180" r="9" fill="#ffd166" stroke="#1a0e04" strokeWidth="2" />
          <circle cx="450" cy="180" r="14" fill="none" stroke="#ffd166" strokeWidth="2" style={{ animation: 'pulse 1.6s ease-in-out infinite' }} />
          <text x="450" y="158" textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize="14" fontWeight="700" fill={labelColor}>◉ tu es ici</text>
          <text x="450" y="204" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill={labelColor} opacity="0.9">appartement Dupont</text>
          <text x="450" y="216" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#7fe0a8" opacity="0.9">📻 « Ici Londres »</text>
        </>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   LONDRES — Tamise en S, Big Ben, Bush House (BBC)
   ═══════════════════════════════════════════════════════════ */
function SubCarteLondres() {
  return (
    <>
      <rect x="30" y="70" width="640" height="340" fill="#c8d4b0" stroke="#5a4028" strokeWidth="1.5" />
      {/* nuages */}
      {[[100, 100], [300, 90], [500, 110], [610, 100]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="30" ry="8" fill="#f0e4d0" opacity="0.7" />
      ))}

      {/* la TAMISE en S caractéristique */}
      <path d="M 30 300 Q 180 300 250 250 Q 320 200 420 250 Q 500 300 670 260"
        fill="none" stroke="#4a7a90" strokeWidth="20" strokeLinecap="round" opacity="0.85" />
      <path d="M 30 300 Q 180 300 250 250 Q 320 200 420 250 Q 500 300 670 260"
        fill="none" stroke="#8fb0c8" strokeWidth="2" opacity="0.55" />
      <text x="140" y="330" fontFamily="Palatino, Georgia, serif" fontStyle="italic" fontSize="13" fill="#3a2010" opacity="0.85">la Tamise (Thames)</text>

      {/* WESTMINSTER + BIG BEN — clocher élancé */}
      <g transform="translate(320,240)">
        {/* base Westminster */}
        <rect x="-30" y="-6" width="60" height="18" fill="#a89060" stroke="#5a3818" strokeWidth="1" />
        {/* tour Big Ben */}
        <rect x="-8" y="-70" width="16" height="64" fill="#c8a460" stroke="#5a3818" strokeWidth="1" />
        {/* horloge */}
        <circle cx="0" cy="-40" r="6" fill="#f0e4d0" stroke="#3a2010" strokeWidth="1" />
        <path d="M0 -40 L0 -44 M0 -40 L3 -38" stroke="#3a2010" strokeWidth="1" />
        {/* toit pointu */}
        <path d="M-8 -70 L0 -85 L8 -70" fill="#8a5828" stroke="#5a3818" strokeWidth="1" />
      </g>
      <text x="320" y="272" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill="#3a2010">Big Ben · Westminster</text>

      {/* TOWER BRIDGE (2 tours + arches) */}
      <g transform="translate(560,260)">
        <rect x="-30" y="-30" width="8" height="30" fill="#8a6a3a" stroke="#3a2010" strokeWidth="0.8" />
        <rect x="22" y="-30" width="8" height="30" fill="#8a6a3a" stroke="#3a2010" strokeWidth="0.8" />
        <path d="M-30 -20 L-22 -30 L22 -30 L30 -20 Z M-22 -30 L-16 -36 L16 -36 L22 -30 Z" fill="#c89060" stroke="#3a2010" strokeWidth="0.8" />
        <path d="M-30 0 L30 0 L30 -8 L-30 -8 Z" fill="#c89060" stroke="#3a2010" strokeWidth="0.8" />
      </g>
      <text x="560" y="280" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#3a2010" opacity="0.9">Tower Bridge</text>

      {/* BUS ROUGE emblématique */}
      <g transform="translate(160,180)">
        <rect x="-14" y="-8" width="28" height="16" fill="#c02020" stroke="#5a0810" strokeWidth="1" rx="1" />
        <rect x="-10" y="-6" width="20" height="4" fill="#f8e4d0" />
        <circle cx="-8" cy="8" r="3" fill="#1a1a1a" /><circle cx="8" cy="8" r="3" fill="#1a1a1a" />
      </g>

      {/* MARQUEUR : BUSH HOUSE (BBC) */}
      <circle cx="230" cy="190" r="28" fill="url(#c8-glow)" style={{ animation: 'glow 2s ease-in-out infinite' }} />
      <g transform="translate(230,190)">
        {/* silhouette néo-classique de Bush House */}
        <rect x="-30" y="-16" width="60" height="32" fill="#e8d5a8" stroke="#3a2010" strokeWidth="1.5" />
        <path d="M-30 -16 L-24 -24 L24 -24 L30 -16 Z" fill="#8a6a3a" />
        {[-24, -14, -4, 6, 16].map((x, i) => (
          <rect key={i} x={x} y="-10" width="8" height="4" fill="#3a2010" />
        ))}
        <rect x="-4" y="-2" width="8" height="18" fill="#3a2010" />
        {/* antenne */}
        <path d="M0 -24 L0 -42" stroke="#3a2010" strokeWidth="1.5" />
        <circle cx="0" cy="-44" r="2.5" fill="#e8542e" />
        {/* ondes qui partent vers l'est (vers Paris) */}
        {[10, 16, 22].map((r, i) => (
          <path key={i} d={`M0 -44 a${r} ${r * 0.5} 0 0 0 ${r * 2} 0`} fill="none" stroke="#ffd166" strokeWidth="1.2" opacity={0.8 - i * 0.2} />
        ))}
      </g>
      <text x="230" y="230" textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize="14" fontWeight="700" fill="#3a2010">◉ Bush House</text>
      <text x="230" y="246" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill="#3a2010" opacity="0.9">BBC · émission française</text>

      {/* petite étiquette : direction Paris */}
      <text x="640" y="380" textAnchor="end" fontFamily="Palatino, Georgia, serif" fontStyle="italic" fontSize="11" fill="#3a2010" opacity="0.85">
        Paris → 340 km à l'est
      </text>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   PHILADELPHIE — silhouette Pennsylvania + université
   ═══════════════════════════════════════════════════════════ */
function SubCartePhiladelphie() {
  return (
    <>
      <rect x="30" y="70" width="640" height="340" fill="#dee6d0" stroke="#5a4028" strokeWidth="1.5" />
      {/* silhouette schématique des USA (côte est) */}
      <path d="M 60 100 L 500 100 Q 540 120 560 160 L 580 220 L 600 260 Q 610 300 580 340 L 400 380 L 200 370 L 100 340 L 60 260 Z"
        fill="#b8c090" stroke="#5a4028" strokeWidth="1.5" />
      <text x="180" y="180" fontFamily="Palatino, Georgia, serif" fontSize="20" fontWeight="700" fill="#5a4028" opacity="0.6">États-Unis</text>
      <text x="180" y="200" fontFamily="ui-monospace,monospace" fontSize="10" fill="#5a4028" opacity="0.55">(côte est, schématique)</text>

      {/* océan Atlantique à droite */}
      <path d="M 600 260 Q 610 300 580 340 L 670 340 L 670 260 Z" fill="#7fb0c8" opacity="0.6" />
      <text x="620" y="310" fontFamily="Palatino, Georgia, serif" fontStyle="italic" fontSize="9" fill="#2a4858" opacity="0.8">Atlantique</text>

      {/* frontière PA (approximative — rectangle) */}
      <rect x="300" y="220" width="140" height="70" fill="none" stroke="#5a4028" strokeWidth="1.4" strokeDasharray="3 3" />
      <text x="370" y="215" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill="#3a2010">Pennsylvania</text>

      {/* MARQUEUR : PHILADELPHIE / Université */}
      <circle cx="410" cy="270" r="30" fill="url(#c8-glow)" style={{ animation: 'glow 2s ease-in-out infinite' }} />

      {/* immeuble Moore School (schématique — bâtiment universitaire) */}
      <g transform="translate(410,270)">
        <rect x="-24" y="-8" width="48" height="20" fill="#a86840" stroke="#3a1e10" strokeWidth="1.2" />
        {/* colonnades néo-classiques */}
        {[-18, -10, -2, 6, 14].map((x, i) => (
          <rect key={i} x={x} y="-8" width="3" height="20" fill="#e8d5a8" />
        ))}
        {/* fronton triangulaire */}
        <path d="M-24 -8 L0 -20 L24 -8 Z" fill="#a86840" stroke="#3a1e10" strokeWidth="1.2" />
        {/* petits sigles */}
        <text x="0" y="4" textAnchor="middle" fontSize="6" fontFamily="ui-monospace,monospace" fontWeight="800" fill="#f0e4d0">MOORE</text>
      </g>
      <circle cx="410" cy="270" r="14" fill="none" stroke="#e8542e" strokeWidth="2" style={{ animation: 'pulse 1.6s ease-in-out infinite' }} />
      <text x="410" y="248" textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize="14" fontWeight="700" fill="#3a2010">◉ Philadelphie</text>
      <text x="410" y="308" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill="#3a2010" opacity="0.9">Moore School · Univ. of Pennsylvania</text>
      <text x="410" y="320" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fill="#e8542e" opacity="0.9">salle de l'ENIAC · 1946</text>

      {/* New York en repère */}
      <circle cx="480" cy="240" r="3" fill="#3a2010" />
      <text x="486" y="238" fontFamily="ui-monospace,monospace" fontSize="8" fill="#3a2010">New York</text>
      {/* Washington en repère */}
      <circle cx="390" cy="310" r="3" fill="#3a2010" />
      <text x="360" y="322" fontFamily="ui-monospace,monospace" fontSize="8" fill="#3a2010">Washington</text>

      {/* flèche transatlantique vers l'Europe */}
      <path d="M 630 200 Q 660 220 660 260" fill="none" stroke="#c8382e" strokeWidth="1.5" strokeDasharray="3 4" />
      <text x="640" y="180" fontFamily="ui-monospace,monospace" fontSize="9" fill="#8a2010">→ Europe (5 500 km)</text>
    </>
  );
}
