import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 5 — Tableau : le château et le bourg
   Peinture fine — jour clair médiéval : le donjon et ses
   bannières, des maisons à colombages, l'atelier de broderie
   (la toile de Bayeux), le vitrailliste de la chapelle, et la
   place du marché où officie le crieur. À trouver : fil de
   laine, toile de lin, verre coloré, plomb, ta voix, la place.
   ============================================================ */

export default function SceneChateau({ collect, action, reveal, made = [] }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ch-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5a86b4" /><stop offset="60%" stopColor="#9cbcd4" /><stop offset="100%" stopColor="#d8dcc8" /></linearGradient>
        <linearGradient id="ch-stone" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a8a094" /><stop offset="100%" stopColor="#6e685e" /></linearGradient>
        <linearGradient id="ch-wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e2d6b8" /><stop offset="100%" stopColor="#c2b48e" /></linearGradient>
        <linearGradient id="ch-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#b0a074" /><stop offset="100%" stopColor="#6e5e40" /></linearGradient>
        <filter id="ch-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="ch-mottle" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* ═══ ciel ═══ */}
      <rect width="1000" height="560" fill="url(#ch-sky)" />
      {/* LE SOLEIL — la lumière du jour qui allumera le vitrail */}
      {!made.includes("msg_vitrail") && (
        <g transform="translate(858,96)">
          <circle cx="0" cy="0" r="54" fill="#fff6d0" opacity="0.35" style={{ animation: "glow 4s ease-in-out infinite" }} />
          <circle cx="0" cy="0" r="30" fill="#ffe9a0" />
          <circle cx="0" cy="0" r="30" fill="none" stroke="#fff3c8" strokeWidth="3" />
          {[...Array(12)].map((_, i) => (
            <path key={i} d="M0 -36 v-12" stroke="#ffe9a0" strokeWidth="3" strokeLinecap="round" transform={`rotate(${i * 30})`} style={{ animation: "glow 3s ease-in-out infinite" }} />
          ))}
        </g>
      )}
      {[[180, 90, 120], [520, 70, 150], [700, 118, 90]].map(([x, y, w], i) => (
        <ellipse key={i} cx={x} cy={y} rx={w} ry={12} fill="#eef0e8" opacity="0.5" />
      ))}

      {/* ═══ couche lointaine : le donjon + la chapelle ═══ */}
      <PLayer depth={1}>
        <path d="M0 300 Q250 286 500 296 Q750 306 1000 292 L1000 360 L0 360 Z" fill="#8a8468" />
        {/* le château (gauche) */}
        <g transform="translate(180,300)">
          <rect x="-90" y="-140" width="180" height="140" fill="url(#ch-stone)" />
          <rect x="-110" y="-170" width="50" height="170" fill="url(#ch-stone)" />
          <rect x="60" y="-180" width="50" height="180" fill="url(#ch-stone)" />
          {/* créneaux */}
          {[-108, -96, -84, -72].map((x, i) => <rect key={i} x={x} y="-178" width="8" height="10" fill="#8a8272" />)}
          {[62, 74, 86, 98].map((x, i) => <rect key={i} x={x} y="-188" width="8" height="10" fill="#8a8272" />)}
          {/* toits coniques + bannières */}
          <path d="M-110 -170 L-85 -210 L-60 -170 Z" fill="#7a3a2a" /><path d="M60 -180 L85 -224 L110 -180 Z" fill="#7a3a2a" />
          <path d="M-85 -210 v-16 M85 -224 v-16" stroke="#5a3020" strokeWidth="2" />
          <path d="M-85 -226 l16 5 l-16 5 Z" fill="#c8382e" /><path d="M85 -240 l16 5 l-16 5 Z" fill="#c8382e" />
          {/* fenêtres */}
          {[-40, 0, 40].map((x, i) => <rect key={i} x={x - 6} y="-100" width="12" height="24" rx="6" fill="#2c2620" />)}
        </g>
        {/* la chapelle (droite) avec sa rosace */}
        <g transform="translate(760,300)">
          <rect x="-60" y="-120" width="120" height="120" fill="url(#ch-stone)" />
          <path d="M-60 -120 L0 -170 L60 -120 Z" fill="#9a9284" />
          <circle cx="0" cy="-84" r="22" fill="#3a3a4a" />
          <circle cx="0" cy="-84" r="22" fill="none" stroke="#6e685e" strokeWidth="4" />
          <path d="M0 -106 v44 M-22 -84 h44 M-16 -100 l32 32 M16 -100 l-32 32" stroke="#6e685e" strokeWidth="2" />
          {[["#c8382e", 0, -96], ["#2a6ab0", -10, -84], ["#e0b040", 10, -84], ["#3a8a4a", 0, -72]].map(([c, x, y], i) => <circle key={i} cx={x} cy={y} r="5" fill={c} opacity="0.8" />)}
        </g>
      </PLayer>

      {/* ═══ couche intermédiaire : maisons à colombages, atelier broderie ═══ */}
      <PLayer depth={2}>
        {/* maisons du bourg */}
        {[[430, 300, "#c8382e"], [520, 296, "#3a6a8a"], [610, 302, "#8a6a3a"]].map(([x, y, c], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <rect x="-40" y="-96" width="80" height="96" fill="url(#ch-wood)" />
            <path d="M-40 -96 h80 M-40 -60 h80 M0 -96 v96 M-40 -96 l80 96 M40 -96 l-80 96" stroke="#6e5236" strokeWidth="3" opacity="0.7" />
            <path d="M-48 -96 L0 -130 L48 -96 Z" fill={c} />
            <rect x="-12" y="-40" width="24" height="40" fill="#3a2c1c" />
          </g>
        ))}
        {/* le grand métier à broder sous un auvent (toile de Bayeux) */}
        <g transform="translate(240,340)">
          <path d="M-120 0 h240 v-14 h-240 Z" fill="#6e4c2e" />
          <rect x="-124" y="-14" width="10" height="80" fill="#5a3f24" /><rect x="114" y="-14" width="10" height="80" fill="#5a3f24" />
          {/* la longue bande de lin tendue, avec des scènes brodées */}
          <rect x="-116" y="-12" width="232" height="40" fill="#e6dcc4" />
          <rect x="-116" y="-12" width="232" height="40" fill="#8a7a56" opacity="0.15" filter="url(#ch-grain)" />
          {/* petites figures brodées (chevaux/soldats stylisés) */}
          {[-96, -60, -24, 12, 48, 84].map((x, i) => (
            <g key={i} transform={`translate(${x},8)`}>
              <path d="M-8 0 q4 -10 12 -8 q4 -6 8 0 l-2 8 Z" fill={["#a8302a", "#2a6a9a", "#c89030"][i % 3]} />
              <path d="M-6 8 l-2 6 M6 8 l2 6" stroke="#5a4a2e" strokeWidth="1.4" />
            </g>
          ))}
          <path d="M-116 -12 h232 M-116 28 h232" stroke="#b0a074" strokeWidth="1.4" opacity="0.7" />
        </g>
      </PLayer>

      {/* ═══ premier plan : la place du marché, vitrailliste, crieur ═══ */}
      <PLayer depth={3}>
        <rect y="400" width="1000" height="160" fill="url(#ch-ground)" />
        <rect y="402" width="1000" height="158" fill="#2c2214" opacity="0.3" filter="url(#ch-mottle)" />
        <ellipse cx="500" cy="474" rx="440" ry="52" fill="#7a6844" opacity="0.3" />

        {/* PANIERS DE FIL DE LAINE colorés (près du métier) */}
        <g transform="translate(180,506)">
          <path d="M-24 -6 Q-26 12 0 14 Q26 12 24 -6 Z" fill="#8a6a42" />
          <path d="M-20 -6 q20 6 40 0" stroke="#6e5232" strokeWidth="1.4" fill="none" opacity="0.6" />
          {[["#c8382e", -12, -4], ["#2a6a9a", 2, -8], ["#e0b040", 14, -2], ["#3a8a4a", -2, 2]].map(([c, x, y], i) => (
            <g key={i}><circle cx={x} cy={y} r="8" fill={c} /><path d={`M${x - 6} ${y} q6 -4 12 0`} stroke="#fff" strokeWidth="0.8" opacity="0.3" fill="none" /></g>
          ))}
        </g>

        {/* L'ATELIER DU VITRAILLISTE : verre coloré + baguettes de plomb */}
        <g transform="translate(590,494)">
          {/* établi */}
          <path d="M-56 14 L56 14 L48 -2 L-48 -2 Z" fill="#6e4c2e" />
          <rect x="-52" y="14" width="8" height="28" fill="#5a3f24" /><rect x="44" y="14" width="8" height="28" fill="#5a3f24" />
          {/* morceaux de verre coloré */}
          <g transform="translate(-30,4)">
            <path d="M-12 -8 l14 -2 l4 12 l-14 2 Z" fill="#c8382e" opacity="0.85" />
            <path d="M4 -6 l12 2 l-2 12 l-12 -2 Z" fill="#2a6ab0" opacity="0.85" />
            <path d="M-6 6 l10 0 l2 8 l-12 0 Z" fill="#3a8a4a" opacity="0.85" />
            <path d="M8 8 l10 -2 l2 8 l-10 2 Z" fill="#e0b040" opacity="0.85" />
          </g>
          {/* baguettes de plomb (en H) et un fer à souder */}
          <g transform="translate(30,2)">
            <path d="M-6 -8 v18 M6 -8 v18 M-6 1 h12" stroke="#8a8c92" strokeWidth="2.4" />
            <path d="M-2 -10 v20 M10 -10 v20 M-2 0 h12" stroke="#7a7c82" strokeWidth="2.4" />
          </g>
        </g>

        {/* LE CRIEUR PUBLIC sur son estrade (ta voix + la place) */}
        <g transform="translate(720,478)">
          {/* estrade */}
          <rect x="-24" y="24" width="48" height="14" fill="#6e4c2e" />
          {/* personnage, main levée */}
          <path d="M-11 4 Q-14 -14 0 -18 Q14 -14 11 4 L8 24 L-8 24 Z" fill="#3a5a8a" />
          <circle cx="0" cy="-24" r="8" fill="#c8a882" />
          <path d="M-8 -28 q8 -6 16 0 q-3 -6 -8 -6 q-7 0 -8 6" fill="#8a3020" />
          {/* bras levé + cor/rouleau d'annonce */}
          <path d="M6 -8 q12 -8 12 -22" stroke="#c8a882" strokeWidth="4" fill="none" strokeLinecap="round" />
          <rect x="14" y="-36" width="10" height="14" rx="2" fill="#efe6ce" transform="rotate(20 19 -30)" />
          {/* bulle « Oyez ! » */}
          <g transform="translate(30,-34)">
            <rect x="0" y="-14" width="52" height="22" rx="6" fill="#fbf6e8" />
            <path d="M4 8 l-8 8 l14 -4 Z" fill="#fbf6e8" />
            <text x="26" y="1" textAnchor="middle" fontSize="12" fill="#7a3020" fontFamily="Palatino, Georgia, serif" style={{ fontWeight: 700 }}>Oyez !</text>
          </g>
        </g>

        {/* ÉTAL DU MARCHÉ (la place) */}
        <g transform="translate(880,496)">
          <path d="M-40 12 L40 12 L34 -2 L-34 -2 Z" fill="#8a6a3a" />
          <rect x="-36" y="12" width="8" height="26" fill="#5a3f24" /><rect x="28" y="12" width="8" height="26" fill="#5a3f24" />
          {/* auvent rayé */}
          <path d="M-46 -2 L46 -2 L40 -18 L-40 -18 Z" fill="#c8382e" />
          {[-30, -14, 2, 18, 34].map((x, i) => <path key={i} d={`M${x} -2 l4 -16`} stroke="#efe6ce" strokeWidth="4" />)}
          {/* marchandises */}
          {[["#d8a838", -22], ["#a83828", -6], ["#3a8a4a", 10], ["#c89030", 26]].map(([c, x], i) => <circle key={i} cx={x} cy="4" r="6" fill={c} />)}
        </g>

        {/* pavés de la place */}
        <path d="M0 470 h1000 M0 520 h1000 M300 440 v120 M560 440 v120 M800 440 v120" stroke="#4c3c24" strokeWidth="1.4" opacity="0.4" />
      </PLayer>

      {/* voile de grain global */}
      <rect width="1000" height="560" fill="#231c10" opacity="0.05" style={{ pointerEvents: "none" }} />

      {/* zones cliquables */}
      {/* le « ? » du crieur : annoncer à des gens qui ne savent pas lire */}
      {!made.includes("msg_crieur") && (
        <>
          <g transform="translate(712,366)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
            <path d="M0 0 q0 -20 20 -20 q20 0 20 17 q0 14 -17 18 l0 6" fill="none" stroke="#ffd166" strokeWidth="4" />
            <circle cx="20" cy="31" r="2.6" fill="#ffd166" />
          </g>
          <Hotspot cx={732} cy={376} r={26} label="parler au crieur" reveal={reveal} onClick={() => action("crieur")} />
        </>
      )}

      <Hotspot cx={180} cy={500} r={40} label="fil de laine" item="fil_laine" reveal={reveal} onClick={() => collect("fil_laine")} />
      <Hotspot cx={240} cy={344} r={74} label="toile de lin" item="toile_lin" reveal={reveal} onClick={() => collect("toile_lin")} />
      <Hotspot cx={560} cy={492} r={34} label="verre coloré" item="verre" reveal={reveal} onClick={() => collect("verre")} />
      <Hotspot cx={624} cy={496} r={28} label="plomb" item="plomb" reveal={reveal} onClick={() => collect("plomb")} />
      <Hotspot cx={720} cy={470} r={40} label="ta voix" item="voix" reveal={reveal} onClick={() => collect("voix")} />
      <Hotspot cx={880} cy={490} r={44} label="la place" item="place" reveal={reveal} onClick={() => collect("place")} />
      {/* le soleil : la lumière du jour qui allume le vitrail (tant qu'il n'est pas fait) */}
      {!made.includes("msg_vitrail") && (
        <Hotspot cx={858} cy={96} r={48} label="lumière du jour" item="soleil" reveal={reveal} onClick={() => collect("soleil")} />
      )}
    </svg>
  );
}
