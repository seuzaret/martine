import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 5 — Tableau : l'atelier de Gutenberg (Mayence)
   Peinture fine — atelier de bois chaud, feuilles imprimées qui
   sèchent sur une corde, la fonte du plomb, la casse de
   caractères, et la grande presse à vis. À trouver : plomb
   fondu, moule à lettres, presse à vis.
   ============================================================ */

export default function SceneGutenberg({ collect, action, reveal, made = [] }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="gt-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7a5e40" /><stop offset="100%" stopColor="#4e3a26" /></linearGradient>
        <linearGradient id="gt-win" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6a8ea8" /><stop offset="100%" stopColor="#c8d0c0" /></linearGradient>
        <linearGradient id="gt-wood" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#7a5230" /><stop offset="50%" stopColor="#9a6c40" /><stop offset="100%" stopColor="#5a3f24" /></linearGradient>
        <linearGradient id="gt-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a6e4c" /><stop offset="100%" stopColor="#4e3a26" /></linearGradient>
        <radialGradient id="gt-fire" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffc068" stopOpacity="0.6" /><stop offset="100%" stopColor="#ff9540" stopOpacity="0" /></radialGradient>
        <filter id="gt-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="gt-blur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>

      {/* ═══ mur de l'atelier ═══ */}
      <rect width="1000" height="560" fill="url(#gt-wall)" />
      <rect width="1000" height="560" fill="#2a1c10" opacity="0.28" filter="url(#gt-grain)" />

      {/* ═══ couche lointaine : fenêtre + poutres + feuilles qui sèchent ═══ */}
      <PLayer depth={1}>
        {/* fenêtre à petits carreaux */}
        <g transform="translate(160,180)">
          <rect x="-70" y="-80" width="140" height="160" fill="url(#gt-win)" />
          <rect x="-70" y="-80" width="140" height="160" fill="none" stroke="#3a2a18" strokeWidth="8" />
          <path d="M0 -80 v160 M-70 -20 h140 M-70 40 h140" stroke="#3a2a18" strokeWidth="4" />
        </g>
        {/* poutre + corde à sécher, feuilles imprimées suspendues */}
        <path d="M0 130 h1000" stroke="#3a2818" strokeWidth="10" />
        <path d="M300 150 q200 20 640 0" stroke="#5a4630" strokeWidth="2" fill="none" />
        {[360, 440, 520, 600, 680, 760, 840].map((x, i) => (
          <g key={i} transform={`translate(${x},152)`}>
            <rect x="-22" y="0" width="44" height="58" fill="#efe6ce" transform={`rotate(${i % 2 ? 2 : -2})`} />
            <path d="M-16 10 h32 M-16 18 h26 M-16 26 h30 M-16 34 h22 M-16 42 h28" stroke="#5a4a3a" strokeWidth="1" opacity="0.7" transform={`rotate(${i % 2 ? 2 : -2})`} />
            <circle cx="0" cy="0" r="2" fill="#5a4630" />
          </g>
        ))}
      </PLayer>

      {/* ═══ couche intermédiaire : étagères, casse de caractères ═══ */}
      <PLayer depth={2}>
        {/* étagère à outils */}
        <g transform="translate(430,300)">
          <rect x="-70" y="-40" width="140" height="10" fill="#5a3f24" />
          {[-56, -36, -16, 20, 44].map((x, i) => <rect key={i} x={x} y="-70" width="10" height="30" fill="#8a6a42" />)}
          <ellipse cx="4" cy="-46" rx="16" ry="6" fill="#6e4c2e" />
        </g>
      </PLayer>

      {/* ═══ premier plan : fonte, casse, la GRANDE PRESSE ═══ */}
      <PLayer depth={3}>
        <rect y="400" width="1000" height="160" fill="url(#gt-floor)" />
        <rect y="402" width="1000" height="158" fill="#2c1c10" opacity="0.35" filter="url(#gt-grain)" />
        <path d="M0 456 h1000 M0 512 h1000 M300 410 v150 M780 410 v150" stroke="#3a2a18" strokeWidth="1.6" opacity="0.5" />
        <ellipse cx="500" cy="474" rx="440" ry="52" fill="#6e5232" opacity="0.3" />

        {/* LA FONTE DU PLOMB : creuset sur un petit foyer */}
        <g transform="translate(200,478)">
          <ellipse cx="0" cy="30" rx="120" ry="34" fill="url(#gt-fire)" style={{ animation: "glow 2.6s ease-in-out infinite" }} />
          {/* foyer */}
          <path d="M-30 34 Q-34 8 0 4 Q34 8 30 34 Z" fill="#4a3020" />
          <path d="M-16 34 Q-18 12 0 9 Q18 12 16 34 Z" fill="#ff8a3c" />
          <circle cx="0" cy="22" r="4" fill="#fff2c4" style={{ animation: "glow 1.6s ease-in-out infinite" }} />
          {/* creuset avec louche */}
          <g transform="translate(0,-4)">
            <path d="M-14 -6 Q-16 8 0 10 Q16 8 14 -6 Z" fill="#5a5c62" />
            <ellipse cx="0" cy="-6" rx="13" ry="4.5" fill="#c9c4a0" />
            <ellipse cx="0" cy="-6" rx="8" ry="2.6" fill="#ffcf78" style={{ animation: "glow 2s ease-in-out infinite" }} />
            <path d="M12 -4 q12 -2 16 -12" stroke="#6a5c48" strokeWidth="3" fill="none" />
          </g>
        </g>

        {/* LA CASSE de caractères + le moule à lettres */}
        <g transform="translate(360,504)">
          {/* casier compartimenté rempli de petites lettres */}
          <rect x="-52" y="-14" width="104" height="30" rx="2" fill="#5a3f24" />
          <path d="M-52 -4 h104 M-52 6 h104 M-30 -14 v30 M-8 -14 v30 M14 -14 v30 M36 -14 v30" stroke="#3a2814" strokeWidth="1.4" />
          {/* petites lettres de plomb (points brillants) */}
          {[-42, -20, 2, 24, 44].map((x, r) => [-9, 1, 11].map((y, c) => (
            <rect key={`${r}-${c}`} x={x} y={y} width="4" height="6" fill="#b8bcc4" />
          )))}
          {/* le moule à lettres, posé devant */}
          <g transform="translate(-2,22)">
            <rect x="-16" y="-6" width="32" height="14" rx="2" fill="#6a6c72" />
            <rect x="-4" y="-4" width="8" height="10" fill="#3a3c42" />
            <path d="M-16 0 h32" stroke="#4a4c52" strokeWidth="1.2" />
          </g>
        </g>

        {/* LA CUVE DU PAPETIER (support) : eau + pâte de chiffons, un tamis */}
        <g transform="translate(110,490)">
          <ellipse cx="0" cy="34" rx="42" ry="8" fill="#160f08" opacity="0.5" />
          {/* cuve en bois */}
          <path d="M-34 -12 L34 -12 L28 30 L-28 30 Z" fill="#6e4c2e" />
          <path d="M-34 -12 L34 -12 L28 30 L-28 30 Z" fill="#2a1c10" opacity="0.28" filter="url(#gt-grain)" />
          <path d="M-20 -12 L-17 30 M0 -12 v42 M20 -12 L17 30" stroke="#5a3f24" strokeWidth="1.2" opacity="0.5" />
          <path d="M-33 -1 L33 -1 M-31 15 L31 15" stroke="#4a3218" strokeWidth="2" />
          {/* surface d'eau + pâte de chiffon qui flotte */}
          <ellipse cx="0" cy="-12" rx="33" ry="8.5" fill="#9aa29a" />
          <ellipse cx="0" cy="-12" rx="33" ry="8.5" fill="#d8dcd2" opacity="0.28" />
          {[[-14, -13], [6, -11], [16, -14], [-4, -10], [10, -13]].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="3.2" ry="1.5" fill="#eef0e8" opacity="0.8" />
          ))}
          {/* le tamis (forme) appuyé sur le bord */}
          <g transform="translate(30,2) rotate(16)">
            <rect x="-4" y="-30" width="30" height="42" rx="2" fill="#8a6a3a" />
            <rect x="0" y="-26" width="22" height="34" fill="#cabf90" />
            <path d="M0 -18 h22 M0 -10 h22 M0 -2 h22 M7 -26 v34 M14 -26 v34" stroke="#9a8a5a" strokeWidth="0.8" opacity="0.7" />
          </g>
        </g>

        {/* LE TAS DE VIEUX CHIFFONS (la matière première du papier) */}
        <g transform="translate(440,520)">
          <ellipse cx="0" cy="10" rx="28" ry="6" fill="#160f08" opacity="0.5" />
          <path d="M-26 8 Q-22 -12 0 -9 Q24 -13 26 8 Z" fill="#d8cdb4" />
          <path d="M-26 8 Q-22 -12 0 -9 Q24 -13 26 8 Z" fill="#2a1c10" opacity="0.1" filter="url(#gt-grain)" />
          {/* plis de tissu, teintes de lin/chanvre */}
          <path d="M-18 6 Q-12 -8 2 -6 Q14 -4 18 6" stroke="#b0a488" strokeWidth="2" fill="none" opacity="0.7" />
          <path d="M-10 8 Q0 -6 14 2" stroke="#c2b89a" strokeWidth="3" fill="none" />
          <path d="M2 8 q9 -9 18 -3" stroke="#eae2ce" strokeWidth="2.4" fill="none" />
          <path d="M-22 4 q6 -8 14 -6" stroke="#c8bfa4" strokeWidth="2" fill="none" />
        </g>

        {/* LA GRANDE PRESSE À VIS (la pièce maîtresse) */}
        <g transform="translate(680,430)">
          {/* bâti en bois */}
          <rect x="-70" y="-30" width="20" height="150" fill="url(#gt-wood)" />
          <rect x="50" y="-30" width="20" height="150" fill="url(#gt-wood)" />
          <rect x="-78" y="-40" width="156" height="16" fill="#6e4c2e" />
          <rect x="-78" y="112" width="156" height="14" fill="#6e4c2e" />
          {/* la grande vis centrale */}
          <rect x="-8" y="-24" width="16" height="70" fill="#8a8c92" />
          {[-20, -10, 0, 10, 20, 30].map((y, i) => <path key={i} d={`M-8 ${y} l16 4`} stroke="#5a5c62" strokeWidth="2" />)}
          {/* la barre (levier) qu'on pousse */}
          <path d="M8 -12 h84" stroke="#5a3f24" strokeWidth="8" strokeLinecap="round" />
          <circle cx="96" cy="-12" r="7" fill="#6e4c2e" />
          {/* le plateau qui presse + la feuille */}
          <rect x="-44" y="46" width="88" height="16" fill="#7a5636" />
          <rect x="-40" y="60" width="80" height="4" fill="#3a2c1c" />
          {/* la forme encrée dessous + une feuille imprimée qui dépasse */}
          <rect x="-40" y="66" width="80" height="30" fill="#2c2620" />
          <rect x="-30" y="72" width="60" height="30" fill="#efe6ce" transform="rotate(-2)" />
          <path d="M-22 82 h44 M-22 88 h34 M-22 94 h40" stroke="#5a4a3a" strokeWidth="1" opacity="0.7" />
          {/* imprimeur qui actionne */}
          <g transform="translate(110,60)">
            <path d="M-11 4 Q-14 -14 0 -18 Q14 -14 11 4 L8 30 L-8 30 Z" fill="#5a4a30" />
            <circle cx="0" cy="-24" r="8" fill="#c8a882" />
            <path d="M-8 -8 q-14 -2 -18 -18" stroke="#c8a882" strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>
        </g>

        {/* RÉSULTAT (msg_imprimerie) : une PILE de feuilles toutes IDENTIQUES,
            tout juste sorties de la presse — la production en série. */}
        {made.includes("msg_imprimerie") && (
          <g transform="translate(606,548)" style={{ animation: "fadein 1s ease-out" }}>
            <ellipse cx="0" cy="8" rx="34" ry="8" fill="#160f08" opacity="0.5" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <g key={i} transform={`translate(${(i % 2 ? 3 : -3)},${-i * 5}) rotate(${i % 2 ? -1.6 : 1.6})`}>
                <rect x="-26" y="-34" width="52" height="40" fill="#efe6ce" />
                <path d="M-18 -27 h36 M-18 -21 h28 M-18 -15 h34 M-18 -9 h24 M-18 -3 h32" stroke="#5a4a3a" strokeWidth="1" opacity="0.6" />
              </g>
            ))}
          </g>
        )}

        {/* GUTENBERG — il tient un bloc de bois gravé, fendu : sa page ratée.
            C'est ce ratage qui va lui donner l'idée des lettres séparées. */}
        <g transform="translate(486,478)">
          <ellipse cx="0" cy="30" rx="24" ry="7" fill="#160f08" opacity="0.6" />
          {/* la robe longue d'artisan-bourgeois */}
          <path d="M-15 30 Q-19 -2 0 -19 Q19 -2 15 30 Z" fill="#3e3a52" />
          <path d="M-11 10 q11 5 22 0" stroke="#2a2740" strokeWidth="2.5" fill="none" />
          {/* la tête, barbe fournie, toque */}
          <circle cx="0" cy="-29" r="9.5" fill="#c8a882" />
          <path d="M-10 -33 q0 -9 10 -9 q10 0 10 9 Z" fill="#2c2438" />
          <path d="M-11 -34 h22" stroke="#2c2438" strokeWidth="3" />
          <path d="M-7 -23 q7 11 14 -1" stroke="#8a7a6a" strokeWidth="3.5" fill="none" />
          {/* les deux mains qui présentent le bloc gravé fendu */}
          <path d="M-14 -6 q-12 8 -12 16" stroke="#c8a882" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <path d="M14 -6 q12 8 12 16" stroke="#c8a882" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <g transform="translate(0,12)">
            <rect x="-20" y="-8" width="40" height="20" rx="1.5" fill="#7a5636" />
            <path d="M-16 -4 h13 M-16 1 h11 M-16 6 h14 M5 -4 h11 M5 1 h13" stroke="#3a2a18" strokeWidth="1.2" />
            {/* la fêlure qui a tout gâché */}
            <path d="M-2 -9 l4 9 l-3 5 l4 8" stroke="#1a1008" strokeWidth="2" fill="none" />
          </g>
        </g>
      </PLayer>

      {/* voile de grain global */}
      <rect width="1000" height="560" fill="#180f08" opacity="0.08" style={{ pointerEvents: "none" }} />

      {/* zones cliquables */}
      {/* le « ? » de Gutenberg : des lettres SÉPARÉES, réutilisables */}
      {!made.includes("msg_imprimerie") && (
        <>
          <g transform="translate(478,376)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
            <path d="M0 0 q0 -20 20 -20 q20 0 20 17 q0 14 -17 18 l0 6" fill="none" stroke="#ffd166" strokeWidth="4" />
            <circle cx="20" cy="31" r="2.6" fill="#ffd166" />
          </g>
          <Hotspot cx={498} cy={386} r={28} label="parler à Gutenberg" reveal={reveal} onClick={() => action("gutenberg")} />
        </>
      )}

      <Hotspot cx={200} cy={472} r={40} label="plomb fondu" item="plomb_fondu" reveal={reveal} onClick={() => collect("plomb_fondu")} />
      <Hotspot cx={360} cy={500} r={46} label="moule à lettres" item="moule" reveal={reveal} onClick={() => collect("moule")} />
      <Hotspot cx={110} cy={496} r={42} label="la cuve du papetier" item="cuve" reveal={reveal} onClick={() => collect("cuve")} />
      <Hotspot cx={440} cy={520} r={28} label="vieux chiffons de lin" item="chiffons" reveal={reveal} onClick={() => collect("chiffons")} />
      <Hotspot cx={678} cy={470} r={74} label="presse à vis" item="presse" reveal={reveal} onClick={() => collect("presse")} />
    </svg>
  );
}
