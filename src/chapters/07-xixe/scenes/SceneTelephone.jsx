import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 7 — Tableau 4 : le téléphone transcontinental
   ------------------------------------------------------------
   Bureau new-yorkais chic, 1915. Sur une haute table, un téléphone
   à colonne Bell (« candlestick »). Au mur, une grande carte des
   États-Unis avec la nouvelle LIGNE TRANSCONTINENTALE tirée par
   AT&T de New York à San Francisco. Par la fenêtre, la silhouette
   de la Statue de la Liberté. SEAN O'SULLIVAN, fils de James,
   décroche pour appeler la famille rescapée à San Francisco.
   On lui APPORTE le combiné + le microphone → mini-jeu ? Non :
   simple recette combiné + microphone → msg_telephone.
   ============================================================ */

export default function SceneTelephone({ collect, action, reveal, made = [], queteQui }) {
  const dit = made.includes("msg_telephone");
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="tp-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7a6a5a" /><stop offset="100%" stopColor="#4c4034" /></linearGradient>
        <linearGradient id="tp-desk" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5a3f24" /><stop offset="100%" stopColor="#2c1c10" /></linearGradient>
        <linearGradient id="tp-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6a4a30" /><stop offset="100%" stopColor="#3a2416" /></linearGradient>
        <linearGradient id="tp-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a8bcc8" /><stop offset="100%" stopColor="#dccfa0" /></linearGradient>
        <radialGradient id="tp-lamp" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffcf78" stopOpacity="0.5" /><stop offset="100%" stopColor="#ff9540" stopOpacity="0" /></radialGradient>
        <filter id="tp-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
        <clipPath id="tp-winclip"><rect x="-90" y="-80" width="180" height="150" /></clipPath>
      </defs>

      {/* mur */}
      <rect width="1000" height="560" fill="url(#tp-wall)" />
      <rect width="1000" height="560" fill="#241a10" opacity="0.22" filter="url(#tp-grain)" />
      {/* lambris décoratif */}
      <g stroke="#3a2a18" strokeWidth="2" opacity="0.4">
        <path d="M0 320 h1000" />
      </g>

      {/* ═══ couche lointaine : fenêtre sur New York + grande carte USA ═══ */}
      <PLayer depth={1}>
        {/* la FENÊTRE avec vue sur la baie (Statue de la Liberté) */}
        <g transform="translate(788,160)">
          <rect x="-92" y="-84" width="184" height="156" fill="url(#tp-sky)" />
          <g clipPath="url(#tp-winclip)">
            {/* mer */}
            <rect x="-90" y="30" width="180" height="42" fill="#5a94a4" opacity="0.85" />
            <path d="M-90 32 h180" stroke="#cfe0dc" strokeWidth="1" opacity="0.4" />
            {/* Statue de la Liberté au loin */}
            <g transform="translate(-30,42)">
              {/* socle */}
              <rect x="-8" y="0" width="16" height="12" fill="#7a705c" />
              <rect x="-14" y="12" width="28" height="6" fill="#5a5040" />
              {/* silhouette */}
              <path d="M-3 -22 L3 -22 L4 0 L-4 0 Z" fill="#7ea89a" />
              <circle cx="0" cy="-26" r="4" fill="#7ea89a" />
              {/* couronne à rayons */}
              {[...Array(7)].map((_, i) => <path key={i} d="M0 -32 v-4" stroke="#7ea89a" strokeWidth="1.2" transform={`rotate(${-45 + i * 15} 0 -26)`} />)}
              {/* flambeau levé */}
              <path d="M4 -22 l12 -14" stroke="#7ea89a" strokeWidth="2" />
              <path d="M16 -36 q-2 -6 3 -8 q5 2 3 8 Z" fill="#ffcf78" style={{ animation: "glow 2.6s ease-in-out infinite" }} />
            </g>
            {/* buildings de Manhattan */}
            {[[20, 20, 40], [46, 12, 52], [72, 20, 32]].map(([x, top, h], i) => (
              <g key={i}>
                <rect x={x} y={top} width={20} height={h} fill="#4a4a54" />
                {[...Array(4)].map((_, k) => [...Array(2)].map((__, c) => (
                  <rect key={`${k}-${c}`} x={x + 3 + c * 8} y={top + 4 + k * 8} width="4" height="4" fill="#ffe08a" opacity="0.7" />
                )))}
              </g>
            ))}

            {/* GODZILLA emerge de la baie, s'approche de la Statue puis repart */}
            <g>
              <animateTransform attributeName="transform" type="translate"
                values="90,30; 90,30; -30,30; -30,30; -30,30; 90,30; 90,30"
                keyTimes="0; 0.15; 0.45; 0.55; 0.65; 0.9; 1"
                dur="42s" repeatCount="indefinite" />
              <g>
                {/* petit bercement de marche */}
                <animateTransform attributeName="transform" type="translate"
                  values="0,0; 0,-1; 0,0; 0,-1; 0,0" dur="1.4s" repeatCount="indefinite" />
                {/* remous autour des jambes */}
                <ellipse cx="0" cy="14" rx="16" ry="2.5" fill="#cfe0dc" opacity="0.55">
                  <animate attributeName="opacity" values="0.35;0.7;0.35" dur="1.4s" repeatCount="indefinite" />
                </ellipse>
                {/* queue */}
                <path d="M8 8 Q22 6 32 12 Q26 14 20 12 Q14 12 8 12 Z" fill="#1e3a24" />
                {/* corps massif */}
                <path d="M-8 12 Q-14 -4 -6 -14 Q6 -18 12 -6 Q14 6 10 14 Z" fill="#26502e" />
                {/* dos avec ecailles/pointes */}
                {[[-6,-14],[-2,-16],[2,-15],[6,-12]].map(([x,y],i) => (
                  <path key={i} d={`M${x} ${y} l1.6 -3 l1.6 3 Z`} fill="#3a7a44" />
                ))}
                {/* tete */}
                <path d="M-4 -14 Q-10 -22 -4 -26 Q4 -28 8 -22 Q6 -16 -2 -14 Z" fill="#26502e" />
                {/* oeil rouge lueur */}
                <circle cx="2" cy="-22" r="0.9" fill="#ff6b3a">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />
                </circle>
                {/* dent visible */}
                <path d="M-2 -18 l0 2 l1.4 0 Z" fill="#efe6d2" />
                {/* petites pattes avant */}
                <path d="M-4 -6 q-3 4 -2 8" stroke="#1e3a24" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              </g>
            </g>
          </g>
          {/* cadre + croisillons */}
          <rect x="-92" y="-84" width="184" height="156" fill="none" stroke="#3a2a18" strokeWidth="8" />
          <path d="M0 -84 v156 M-92 -6 h184" stroke="#3a2a18" strokeWidth="4" />
        </g>

        {/* GRANDE CARTE DES USA au mur avec la LIGNE TRANSCONTINENTALE 1915 */}
        <g transform="translate(280,180)">
          <rect x="-160" y="-96" width="320" height="188" fill="#efe0be" />
          <rect x="-160" y="-96" width="320" height="188" fill="#8a6a3a" opacity="0.16" filter="url(#tp-grain)" />
          <rect x="-160" y="-96" width="320" height="188" fill="none" stroke="#5a3f24" strokeWidth="5" />
          <text x="0" y="-72" textAnchor="middle" fontFamily="'Cinzel',Georgia,serif" fontSize="14" fill="#5a3f24" letterSpacing="1">UNITED STATES · 1915</text>
          {/* contour très stylisé du continent */}
          <path d="M-140 -46 L-40 -50 L20 -46 L100 -40 L140 -30 L140 60 L60 66 L-40 70 L-100 60 L-140 30 Z" fill="none" stroke="#7a5a34" strokeWidth="2.2" />
          {/* la LIGNE transcontinentale : San Francisco → New York */}
          <path d="M-124 20 Q-40 -6 132 -12" stroke="#c8382e" strokeWidth="3" strokeDasharray="6 5" fill="none" />
          {/* SF (gauche) et NY (droite) */}
          <circle cx="-124" cy="20" r="5" fill="#c8382e" stroke="#5a1a12" strokeWidth="1.4" />
          <text x="-124" y="36" textAnchor="middle" fontFamily="Palatino,serif" fontSize="10" fill="#5a1a12" fontWeight="700">San Francisco</text>
          <circle cx="132" cy="-12" r="5" fill="#c8382e" stroke="#5a1a12" strokeWidth="1.4" />
          <text x="132" y="-20" textAnchor="middle" fontFamily="Palatino,serif" fontSize="10" fill="#5a1a12" fontWeight="700">New York</text>
          {/* une signature-tampon */}
          <g transform="translate(-88,72)" opacity="0.65">
            <circle r="14" fill="none" stroke="#7a2418" strokeWidth="1.4" />
            <text y="1" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7" fill="#7a2418">AT&amp;T</text>
            <text y="9" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7" fill="#7a2418">1915</text>
          </g>
        </g>
      </PLayer>

      {/* ═══ couche intermédiaire : lampe à abat-jour + Sean au bureau ═══ */}
      <PLayer depth={2}>
        {/* « ? » de Sean tant qu'il guide */}
        {queteQui === "sean" && !dit && (
          <g transform="translate(560,280)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
            <path d="M0 0 q0 -24 24 -24 q24 0 24 20 q0 17 -20 22 l0 8" fill="none" stroke="#ffd166" strokeWidth="4" />
            <circle cx="24" cy="37" r="3" fill="#ffd166" />
          </g>
        )}

        {/* SEAN O'SULLIVAN debout, en costume, main sur le combiné */}
        <g transform="translate(560,376)">
          <ellipse cx="0" cy="94" rx="34" ry="8" fill="#160f08" opacity="0.5" />
          {/* costume */}
          <path d="M-24 92 Q-30 6 0 -8 Q30 6 24 92 Z" fill="#4a5a6a" />
          <path d="M-18 92 L-12 40 M18 92 L12 40" stroke="#2a3846" strokeWidth="2" opacity="0.6" />
          {/* chemise + cravate rayée verte/or */}
          <path d="M-6 -6 L6 -6 L8 44 L-8 44 Z" fill="#efe9dc" />
          <path d="M-2 8 L2 8 L4 48 L-4 48 Z" fill="#2a6a3a" />
          {[10, 20, 30].map((y, i) => <path key={i} d={`M-3 ${y} l6 0`} stroke="#e0b040" strokeWidth="1.2" />)}
          {/* tête + cheveux auburn foncés en arrière */}
          <circle cx="0" cy="-24" r="12" fill="#e0b084" />
          <path d="M-11 -26 q10 -7 22 0 q-2 -10 -11 -10 q-9 0 -11 10" fill="#7a3a1a" />
          <path d="M-11 -26 Q-10 -14 0 -16 Q10 -14 11 -26 Z" fill="#e0b084" />
          <path d="M8 -24 q6 2 6 10" stroke="#7a3a1a" strokeWidth="3" fill="none" />
          {/* bras qui tient le combiné à l'oreille (droite) */}
          <path d="M14 -6 Q26 -12 22 -26" stroke="#4a5a6a" strokeWidth="6" fill="none" strokeLinecap="round" />
          <ellipse cx="22" cy="-28" rx="5" ry="8" fill="#2a2418" />
          <path d="M18 -28 q4 -2 8 0" stroke="#e0b040" strokeWidth="1" fill="none" />
          {/* bras gauche qui tient la colonne / mène au fil */}
          <path d="M-14 -4 q-14 -6 -14 -18" stroke="#4a5a6a" strokeWidth="6" fill="none" strokeLinecap="round" />
        </g>
      </PLayer>

      {/* ═══ premier plan : bureau, téléphone à colonne, lampe, épave ═══ */}
      <PLayer depth={3}>
        <rect y="440" width="1000" height="120" fill="url(#tp-floor)" />
        <rect y="442" width="1000" height="118" fill="#241608" opacity="0.32" filter="url(#tp-grain)" />
        <ellipse cx="500" cy="490" rx="440" ry="46" fill="#5e4230" opacity="0.3" />
        <ellipse cx="490" cy="460" rx="180" ry="60" fill="url(#tp-lamp)" style={{ animation: "glow 3s ease-in-out infinite" }} />

        {/* LE GRAND BUREAU */}
        <g transform="translate(500,490)">
          <rect x="-240" y="-8" width="480" height="18" rx="4" fill="url(#tp-desk)" />
          <rect x="-232" y="10" width="14" height="52" fill="#2c1c10" />
          <rect x="218" y="10" width="14" height="52" fill="#2c1c10" />
          {/* dossier + plume sur le bureau */}
          <g transform="translate(-160,-14)">
            <rect x="-24" y="-10" width="48" height="18" rx="1" fill="#e6dcc2" />
            <path d="M-18 -4 h36 M-18 0 h30" stroke="#8a7a5a" strokeWidth="1" opacity="0.6" />
            <g transform="translate(22,-6) rotate(20)"><path d="M0 0 Q4 -18 1 -32 Q-2 -18 0 0 Z" fill="#f4efe2" stroke="#c9be9a" strokeWidth="0.8" /></g>
          </g>
        </g>

        {/* LE TÉLÉPHONE À COLONNE Bell (candlestick) — vibre légèrement (voix qui arrive) */}
        <g>
          <animateTransform attributeName="transform" type="translate"
            values="560,468; 560,468; 561,468; 559,468; 561,469; 560,468; 560,468; 560,468"
            keyTimes="0; 0.55; 0.6; 0.65; 0.7; 0.75; 0.8; 1"
            dur="6s" repeatCount="indefinite" />
          {/* base ronde */}
          <ellipse cx="0" cy="14" rx="26" ry="6" fill="#160f08" opacity="0.5" />
          <ellipse cx="0" cy="12" rx="22" ry="4" fill="#2c2418" />
          <ellipse cx="0" cy="8" rx="22" ry="6" fill="#3a2c1c" />
          {/* colonne */}
          <rect x="-3" y="-40" width="6" height="48" fill="#3a2c1c" />
          {/* microphone conique (embouchure) au sommet */}
          <path d="M-12 -46 L12 -46 L8 -34 L-8 -34 Z" fill="#2a2418" />
          <ellipse cx="0" cy="-46" rx="12" ry="3.5" fill="#1a1410" />
          <ellipse cx="0" cy="-46" rx="8" ry="2.2" fill="#0a0806" />
          {/* petit crochet latéral pour l'écouteur (vide car Sean l'a en main) */}
          <path d="M12 -36 q10 -2 8 8" stroke="#5a4a30" strokeWidth="2" fill="none" />
          {/* cordon qui va vers l'écouteur (Sean au-dessus) */}
          <path d="M14 -30 Q30 -34 34 -68" stroke="#2a2418" strokeWidth="2.5" fill="none" />
        </g>

        {/* petites ondes sonores qui sortent de l'ecouteur (la voix qui arrive) */}
        <g transform="translate(594,438)" opacity="0.75">
          {[0, 1, 2].map((i) => (
            <path key={i} d="M0 0 q6 -6 12 0" stroke="#ffe08a" strokeWidth="1.6" fill="none" strokeLinecap="round">
              <animate attributeName="opacity" values="0;0;0.9;0" dur="6s" begin={`${3 + i * 0.4}s`} repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="translate"
                values="0,0; 6,-4; 12,-8" dur="6s" begin={`${3 + i * 0.4}s`} repeatCount="indefinite" />
            </path>
          ))}
        </g>

        {/* petite lampe à abat-jour verte (banquier) qui clignote */}
        <g transform="translate(300,462)">
          <rect x="-4" y="0" width="8" height="30" fill="#c8a860" />
          <rect x="-14" y="0" width="28" height="6" rx="2" fill="#a88b30" />
          <path d="M-24 -20 L24 -20 L20 0 L-20 0 Z" fill="#2a6a3a" />
          <ellipse cx="0" cy="-20" rx="24" ry="6" fill="#3a8a4a">
            <animate attributeName="fill" values="#3a8a4a;#7ae090;#3a8a4a;#3a8a4a;#3a8a4a" dur="2.6s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="0" cy="4" rx="26" ry="6" fill="url(#tp-lamp)">
            <animate attributeName="opacity" values="0.45;1;0.45;0.45;0.45" dur="2.6s" repeatCount="indefinite" />
          </ellipse>
        </g>

        {/* résultat : SIGNAL vocal qui file dans la ligne (petits ronds
            partant du téléphone vers la carte, animation) */}
        {dit && (
          <g style={{ animation: "fadein 1s ease-out" }}>
            {[0, 1, 2, 3].map((i) => (
              <circle key={i} r="4" fill="#ffe08a">
                <animateMotion dur="2.4s" begin={`${i * 0.6}s`} repeatCount="indefinite" path="M560 428 Q460 380 300 220" />
                <animate attributeName="opacity" values="0;1;0" dur="2.4s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>
        )}

        {/* épave de MARTINE */}
        <g transform="translate(856,506) rotate(8)">
          <ellipse cx="0" cy="12" rx="26" ry="6" fill="#0a0603" opacity="0.6" />
          <path d="M0 -20 Q18 -18 20 -4 Q22 8 11 11 L-11 11 Q-22 8 -20 -4 Q-18 -18 0 -20 Z" fill="#8a6240" />
          <circle cx="-1" cy="-4" r="5.5" fill="#cfeaff" stroke="#5c3a22" strokeWidth="1.4" />
          <rect x="-13" y="3" width="24" height="7" rx="2" fill="#0c1410" stroke="#5c3a22" strokeWidth="1" />
          <text x="-1" y="9" textAnchor="middle" fontSize="5.5" fill="#5eff9e" fontFamily="ui-monospace,monospace" style={{ animation: "pulse 2.2s infinite" }}>1915</text>
          <circle cx="13" cy="-27" r="2.3" fill="#5eff9e" style={{ animation: "pulse 1.5s infinite" }} />
        </g>
      </PLayer>

      {/* voile de grain global */}
      <rect width="1000" height="560" fill="#181008" opacity="0.06" style={{ pointerEvents: "none" }} />

      {/* zones cliquables */}
      <Hotspot cx={560} cy={370} r={54} label="Sean O'Sullivan" reveal={reveal} onClick={() => action("sean")} />
      {!dit && (
        <>
          <Hotspot cx={560} cy={432} r={26} label="microphone du téléphone" item="micro" reveal={reveal} onClick={() => collect("micro")} />
          <Hotspot cx={582} cy={410} r={20} label="écouteur du téléphone" item="ecouteur" reveal={reveal} onClick={() => collect("ecouteur")} />
        </>
      )}
      <Hotspot cx={856} cy={502} r={34} label="MARTINE" reveal={reveal} onClick={() => action("wreck")} />
    </svg>
  );
}
