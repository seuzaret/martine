import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 5 — Tableau 2 : le monastère du frère Jorge
   Peinture fine — pénombre chaude d'un scriptorium : voûtes,
   fenêtre en ogive, une grande ARMOIRE À MANUSCRITS (les
   rayonnages), le frère Jorge penché sur son pupitre à la bougie.
   On assemble un codex (parchemin + aiguille), on le range aux
   rayonnages (→ manuscrit enluminé)… ou on l'approche trop de la
   flamme (→ œuvre perdue). Puis Jorge présente sa NOTE DE FRAIS.
   ============================================================ */

export default function SceneMonastere({ collect, action, reveal, made = [], flags = {}, queteQui }) {
  const manuscrit = made.includes("msg_manuscrit");
  const factureDue = manuscrit && !flags.paye;
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sc-stone" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4a4038" /><stop offset="100%" stopColor="#2c2620" /></linearGradient>
        <linearGradient id="sc-win" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6a86a8" /><stop offset="60%" stopColor="#a8c0c8" /><stop offset="100%" stopColor="#d8d0b0" /></linearGradient>
        <linearGradient id="sc-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5a4e40" /><stop offset="100%" stopColor="#332a22" /></linearGradient>
        <radialGradient id="sc-candle" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffcf78" stopOpacity="0.6" /><stop offset="100%" stopColor="#ff9540" stopOpacity="0" /></radialGradient>
        <filter id="sc-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="sc-blur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>

      {/* ═══ mur de pierre (fond) ═══ */}
      <rect width="1000" height="560" fill="url(#sc-stone)" />
      <rect width="1000" height="560" fill="#1c1610" opacity="0.3" filter="url(#sc-grain)" />

      {/* ═══ couche lointaine : voûtes, fenêtre en ogive ═══ */}
      <PLayer depth={1}>
        {[180, 500, 820].map((x, i) => (
          <path key={i} d={`M${x - 130} 200 Q${x} 40 ${x + 130} 200`} fill="none" stroke="#3a322a" strokeWidth="16" opacity="0.7" />
        ))}
        <g transform="translate(500,60)">
          <path d="M-58 200 L-58 40 Q0 -30 58 40 L58 200 Z" fill="url(#sc-win)" />
          <path d="M-58 200 L-58 40 Q0 -30 58 40 L58 200 Z" fill="none" stroke="#2c2620" strokeWidth="8" />
          <path d="M0 200 V-10 M-58 90 H58 M-58 140 H58" stroke="#2c2620" strokeWidth="4" />
          <path d="M-30 200 V30 M30 200 V30" stroke="#3a322a" strokeWidth="2.5" opacity="0.7" />
        </g>
        <path d="M470 260 L530 260 L580 420 L420 420 Z" fill="#cdd4c0" opacity="0.12" filter="url(#sc-blur)" />
      </PLayer>

      {/* ═══ couche intermédiaire : LES RAYONNAGES, chandelier ═══ */}
      <PLayer depth={2}>
        {/* la grande ARMOIRE À MANUSCRITS = les rayonnages (support « rayon ») */}
        <g transform="translate(120,300)">
          <rect x="-84" y="-124" width="168" height="228" fill="#3a2c1e" />
          <rect x="-84" y="-124" width="168" height="228" fill="#1c1208" opacity="0.35" filter="url(#sc-grain)" />
          <rect x="-84" y="-124" width="168" height="228" fill="none" stroke="#241608" strokeWidth="4" />
          {[-80, -30, 20, 70].map((y, r) => (
            <g key={r}>
              <rect x="-78" y={y + 40} width="156" height="6" fill="#241608" />
              {[-66, -46, -26, -6, 14, 34, 54].map((x, c) => (
                <rect key={c} x={x} y={y} width="14" height="40" rx="1.5" fill={["#7a3a2a", "#5a4a2e", "#3a5236", "#6a5230"][(r + c) % 4]} />
              ))}
            </g>
          ))}
        </g>
        {/* chandelier suspendu */}
        <g transform="translate(760,120)">
          <path d="M0 0 v-70" stroke="#2c2620" strokeWidth="2" />
          <path d="M-40 0 h80" stroke="#4a4038" strokeWidth="4" />
          {[-40, 0, 40].map((x, i) => (
            <g key={i} transform={`translate(${x},0)`}>
              <rect x="-2" y="-14" width="4" height="14" fill="#e8dcc0" />
              <g style={{ transformOrigin: `0px -16px`, transformBox: "view-box", animation: `flick ${0.8 + i * 0.2}s ease-in-out infinite` }}>
                <path d="M0 -14 q-2 -6 0 -11 q2 5 0 11 Z" fill="#ffb347" />
              </g>
            </g>
          ))}
        </g>
      </PLayer>

      {/* ═══ premier plan : sol, Jorge au pupitre, parchemins, note ═══ */}
      <PLayer depth={3}>
        <rect y="400" width="1000" height="160" fill="url(#sc-floor)" />
        <rect y="402" width="1000" height="158" fill="#1c1208" opacity="0.4" filter="url(#sc-grain)" />
        <path d="M0 452 h1000 M0 510 h1000 M280 410 v150 M600 410 v150 M820 410 v150" stroke="#241a12" strokeWidth="1.6" opacity="0.5" />

        {/* halo de la bougie du copiste */}
        <ellipse cx="640" cy="450" rx="200" ry="110" fill="url(#sc-candle)" style={{ animation: "glow 2.6s ease-in-out infinite" }} />

        {/* LE FRÈRE JORGE au pupitre : coule brune, tonsure, penché */}
        <g transform="translate(560,470)">
          <ellipse cx="0" cy="34" rx="30" ry="7" fill="#160f08" opacity="0.6" />
          <path d="M-20 6 Q-26 -22 0 -26 Q26 -22 20 6 L16 32 L-16 32 Z" fill="#5a4632" />
          <path d="M-20 6 Q0 12 20 6 L17 18 Q0 24 -17 18 Z" fill="#463726" />
          {/* corde à la taille */}
          <path d="M-16 4 Q0 12 16 4" stroke="#c8b488" strokeWidth="2" fill="none" opacity="0.7" />
          {/* tête : couronne de cheveux + tonsure rasée */}
          <circle cx="0" cy="-22" r="8" fill="#c8a882" />
          <path d="M-8 -24 Q-9 -32 0 -33 Q9 -32 8 -24 Q4 -28 0 -28 Q-4 -28 -8 -24 Z" fill="#6a5238" />
          {/* bras qui écrit */}
          <path d="M14 -6 q14 4 18 14" stroke="#5a4632" strokeWidth="6" fill="none" strokeLinecap="round" />
        </g>
        {/* le pupitre + page enluminée + bougie (la flamme = support) */}
        <g transform="translate(620,486)">
          <path d="M-40 20 L40 20 L48 -6 L-32 -6 Z" fill="#5a3f24" />
          <rect x="-40" y="20" width="8" height="24" fill="#3a2814" /><rect x="34" y="20" width="8" height="24" fill="#3a2814" />
          <g transform="translate(4,6)">
            <rect x="-30" y="-14" width="56" height="22" rx="1" fill="#efe6ce" transform="skewX(-14)" />
            <rect x="-24" y="-10" width="12" height="14" fill="#a8202a" transform="skewX(-14)" />
            <rect x="-22" y="-8" width="8" height="10" fill="#e0b040" transform="skewX(-14)" />
            <path d="M-6 -8 h22 M-8 -3 h22 M-10 2 h20" stroke="#5a4a3a" strokeWidth="1" opacity="0.7" transform="skewX(-14)" />
          </g>
          <g transform="translate(40,-6)">
            <rect x="-3" y="-16" width="6" height="16" fill="#e8dcc0" />
            <g style={{ transformOrigin: "0px -18px", transformBox: "view-box", animation: "flick 0.85s ease-in-out infinite" }}>
              <path d="M0 -16 q-3 -8 0 -14 q3 6 0 14 Z" fill="#ffb347" />
              <path d="M0 -16 q-1.5 -5 0 -9 q1.5 4 0 9 Z" fill="#fff2c4" />
            </g>
          </g>
        </g>

        {/* PILE DE PARCHEMINS (feuilles à plier) */}
        <g transform="translate(220,506)">
          <g transform="rotate(-3)">
            <rect x="-40" y="-8" width="76" height="26" rx="1" fill="#e0d6bc" />
            <rect x="-44" y="-3" width="76" height="26" rx="1" fill="#e8dcc4" />
            <rect x="-42" y="2" width="76" height="26" rx="1" fill="#efe6ce" />
            <path d="M-34 12 h56 M-34 18 h44" stroke="#c9b892" strokeWidth="1" opacity="0.6" />
          </g>
        </g>
        {/* l'aiguille & le fil à relier, sur un cahier plié */}
        <g transform="translate(320,514)">
          <path d="M-24 4 L24 4 L20 -8 L-20 -8 Z" fill="#c9b892" />
          <path d="M-20 -8 L20 -8 M0 -8 L0 4" stroke="#8a7a56" strokeWidth="1.2" opacity="0.7" />
          <g transform="translate(6,-2) rotate(-30)">
            <rect x="-1" y="-14" width="2" height="22" rx="1" fill="#cfcfd6" />
            <circle cx="0" cy="-14" r="1.6" fill="#cfcfd6" />
            <path d="M0 8 q10 4 8 14" stroke="#a8302a" strokeWidth="1.6" fill="none" />
          </g>
        </g>

        {/* épave de MARTINE dans un coin du cloître */}
        <g transform="translate(900,506) rotate(8)">
          <ellipse cx="0" cy="12" rx="26" ry="6" fill="#0a0603" opacity="0.6" />
          <path d="M0 -20 Q18 -18 20 -4 Q22 8 11 11 L-11 11 Q-22 8 -20 -4 Q-18 -18 0 -20 Z" fill="#8a6240" />
          <circle cx="-1" cy="-4" r="5.5" fill="#cfeaff" stroke="#5c3a22" strokeWidth="1.4" />
          <rect x="-13" y="3" width="24" height="7" rx="2" fill="#0c1410" stroke="#5c3a22" strokeWidth="1" />
          <text x="-1" y="9" textAnchor="middle" fontSize="5.5" fill="#5eff9e" fontFamily="ui-monospace,monospace" style={{ animation: "pulse 2.2s infinite" }}>1450</text>
          <circle cx="13" cy="-27" r="2.3" fill="#5eff9e" style={{ animation: "pulse 1.5s infinite" }} />
          <path d="M8 -20 q6 -8 13 -6" stroke="#8a94a8" strokeWidth="2.3" fill="none" strokeLinecap="round" />
        </g>

        {/* RÉSULTAT (msg_manuscrit) : la page ENLUMINÉE rangée près du pupitre */}
        {manuscrit && (
          <g transform="translate(440,500)" style={{ animation: "fadein 1s ease-out" }}>
            <ellipse cx="0" cy="46" rx="34" ry="8" fill="#100a06" opacity="0.5" />
            <rect x="-30" y="-40" width="60" height="82" rx="2" fill="#efe4c8" />
            <rect x="-30" y="-40" width="60" height="82" rx="2" fill="none" stroke="#c9a860" strokeWidth="2" />
            <rect x="-25" y="-35" width="50" height="72" fill="none" stroke="#b8923a" strokeWidth="1.4" />
            <path d="M-25 -35 q-4 20 0 40 q4 20 0 32" stroke="#3a6a4a" strokeWidth="1.4" fill="none" />
            {[[-25, -24, "#a83028"], [-25, -4, "#2a6ab0"], [-25, 16, "#e0b040"], [25, -14, "#a83028"], [25, 12, "#2a6ab0"]].map(([x, y, c], i) => (
              <circle key={i} cx={x} cy={y} r="2.4" fill={c} />
            ))}
            <rect x="-22" y="-31" width="17" height="19" fill="#a83028" />
            <rect x="-22" y="-31" width="17" height="19" fill="none" stroke="#e0b040" strokeWidth="1.4" />
            <text x="-13.5" y="-16" textAnchor="middle" fontSize="15" fill="#f0e4c4" fontFamily="Palatino, Georgia, serif" style={{ fontWeight: 700 }}>G</text>
            <path d="M-3 -28 h25 M-3 -22 h22 M-3 -16 h25 M-20 -6 h42 M-20 0 h38 M-20 6 h42 M-20 24 h40 M-20 30 h32" stroke="#5a4632" strokeWidth="1.2" opacity="0.7" />
            <rect x="2" y="12" width="18" height="14" fill="#2a5a7a" />
            <rect x="2" y="12" width="18" height="14" fill="none" stroke="#e0b040" strokeWidth="1" />
            <circle cx="11" cy="18" r="3" fill="#e0b040" />
          </g>
        )}

        {/* LA NOTE DE FRAIS + bourse — apparaît une fois le manuscrit prêt,
            tant qu'on n'a pas payé. Un rouleau scellé et quelques pièces. */}
        {factureDue && (
          <g transform="translate(748,506)" style={{ animation: "fadein 0.8s ease-out" }}>
            <ellipse cx="0" cy="14" rx="34" ry="7" fill="#100a06" opacity="0.5" />
            {/* halo d'appel */}
            <circle cx="-4" cy="-6" r="34" fill="#ffd166" opacity="0.14" style={{ animation: "glow 2.4s ease-in-out infinite" }} />
            {/* le rouleau (la note) */}
            <g transform="rotate(-8)">
              <rect x="-30" y="-14" width="52" height="26" rx="3" fill="#efe6ce" />
              <path d="M-30 -14 q-6 13 0 26 M22 -14 q6 13 0 26" fill="#e0d4b4" />
              <path d="M-22 -6 h34 M-22 0 h30 M-22 6 h34" stroke="#7a5a30" strokeWidth="1.2" opacity="0.7" />
              {/* sceau de cire rouge + ruban */}
              <circle cx="-4" cy="16" r="6" fill="#a8202a" />
              <path d="M-4 16 l-6 10 M-4 16 l6 10" stroke="#a8202a" strokeWidth="2" />
            </g>
            {/* deux pièces d'or à côté */}
            {[[26, 8], [34, 12]].map(([x, y], i) => (
              <g key={i}><circle cx={x} cy={y} r="7" fill="#e6c25a" stroke="#a8801f" strokeWidth="1.2" /><text x={x} y={y + 3} textAnchor="middle" fontSize="6" fill="#7a5a10" fontFamily="ui-monospace,monospace">lt</text></g>
            ))}
          </g>
        )}
      </PLayer>

      {/* voile de grain global */}
      <rect width="1000" height="560" fill="#100a06" opacity="0.1" style={{ pointerEvents: "none" }} />

      {/* ═══ zones cliquables ═══ */}
      {/* le « ? » du frère Jorge (tant qu'il guide, AVANT le manuscrit ;
          ensuite c'est la note de frais qui appelle l'attention) */}
      {queteQui === "jorge" && !manuscrit && (
        <>
          <g transform="translate(552,346)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
            <path d="M0 0 q0 -20 20 -20 q20 0 20 17 q0 14 -17 18 l0 6" fill="none" stroke="#ffd166" strokeWidth="4" />
            <circle cx="20" cy="31" r="2.6" fill="#ffd166" />
          </g>
          <Hotspot cx={572} cy={356} r={28} label="parler au frère Jorge" reveal={reveal} onClick={() => action("jorge")} />
        </>
      )}

      {/* la NOTE DE FRAIS à régler (ouvre la facture + le paiement) */}
      {factureDue && (
        <Hotspot cx={744} cy={500} r={40} label="la note de frais (à régler)" reveal={reveal} onClick={() => action("facture")} />
      )}

      {/* les supports (cyan) : les rayonnages et la flamme */}
      <Hotspot cx={120} cy={300} r={90} label="les rayonnages" item="rayon" reveal={reveal} onClick={() => collect("rayon")} />
      <Hotspot cx={660} cy={470} r={26} label="la flamme de la bougie" item="flamme" reveal={reveal} onClick={() => collect("flamme")} />

      {/* les éléments à ramasser */}
      <Hotspot cx={220} cy={504} r={46} label="feuilles de parchemin" item="parchemin" reveal={reveal} onClick={() => collect("parchemin")} />
      <Hotspot cx={320} cy={510} r={34} label="aiguille & fil à relier" item="aiguille" reveal={reveal} onClick={() => collect("aiguille")} />
      <Hotspot cx={900} cy={502} r={32} label="MARTINE" reveal={reveal} onClick={() => action("wreck")} />
    </svg>
  );
}
