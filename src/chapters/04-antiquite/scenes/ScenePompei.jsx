import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 4 — Tableau : la villa de Pompéi (tableau de départ)
   Peinture fine — lumière méditerranéenne, murs « rouge
   pompéien » à fresque, colonnes, graffitis gravés, le Vésuve
   qui fume à l'horizon. À trouver : enduit frais, pigments,
   tablette de cire, stylet.
   ============================================================ */

export default function ScenePompei({ collect, action, reveal, made = [] }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="pm-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3f74a4" />
          <stop offset="55%" stopColor="#8fb6cc" />
          <stop offset="100%" stopColor="#e8d0a0" />
        </linearGradient>
        <linearGradient id="pm-red" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a83a2c" /><stop offset="100%" stopColor="#7e2a20" /></linearGradient>
        <linearGradient id="pm-col" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#e8dcc4" /><stop offset="50%" stopColor="#d4c4a4" /><stop offset="100%" stopColor="#b0a080" /></linearGradient>
        <linearGradient id="pm-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c8b48a" /><stop offset="100%" stopColor="#8a7452" /></linearGradient>
        <filter id="pm-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="pm-mottle" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="pm-blur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="7" /></filter>
      </defs>

      {/* ═══ ciel méditerranéen ═══ */}
      <rect width="1000" height="560" fill="url(#pm-sky)" />
      <circle cx="200" cy="140" r="34" fill="#fff4d0" opacity="0.85" />

      {/* ═══ couche lointaine : le Vésuve qui fume + colline ═══ */}
      <PLayer depth={1}>
        <path d="M0 300 Q250 288 500 296 Q750 304 1000 294 L1000 360 L0 360 Z" fill="#9a9a6e" />
        {/* le Vésuve — imposant, il domine la ville qui l'ignore */}
        <g transform="translate(788,302)">
          {/* la masse de la montagne */}
          <path d="M-155 0 L-42 -152 Q0 -174 42 -152 L155 0 Z" fill="#63634a" />
          <path d="M-155 0 L-42 -152 Q0 -174 42 -152 L155 0 Z" fill="#34342a" opacity="0.45" filter="url(#pm-mottle)" />
          {/* flancs boisés en bas */}
          <path d="M-155 0 L155 0 L125 -20 Q0 -38 -125 -20 Z" fill="#55663f" opacity="0.5" />
          {/* le cratère, avec une lueur rouge qui « respire » */}
          <path d="M-42 -152 Q0 -174 42 -152 L24 -136 Q0 -150 -24 -136 Z" fill="#454534" />
          <ellipse cx="0" cy="-152" rx="21" ry="6" fill="#e0762e" opacity="0.5" style={{ animation: "pulse 3.2s ease-in-out infinite" }} />
          {/* panache de cendre qui s'élève, plus dense */}
          <path d="M0 -164 q-14 -36 11 -62 q-19 8 -8 -36 q12 -22 -3 -48" stroke="#c8bcae" strokeWidth="13" fill="none" opacity="0.42" style={{ animation: "drift 7s ease-in-out infinite" }} filter="url(#pm-blur)" />
          <path d="M5 -152 q-9 -26 7 -46" stroke="#9a5238" strokeWidth="6" fill="none" opacity="0.3" filter="url(#pm-blur)" />
        </g>
        {/* cyprès */}
        {[120, 170, 940].map((x, i) => (
          <path key={i} d={`M${x} 300 q-6 -50 0 -70 q6 20 0 70 Z`} fill="#3a5236" opacity="0.85" />
        ))}
      </PLayer>

      {/* ═══ couche intermédiaire : le mur à fresque + colonnes ═══ */}
      <PLayer depth={2}>
        {/* grand panneau de mur rouge pompéien */}
        <rect x="60" y="180" width="360" height="230" fill="url(#pm-red)" />
        <rect x="60" y="180" width="360" height="230" fill="#4e1a14" opacity="0.25" filter="url(#pm-grain)" />
        {/* encadrements peints (faux marbre) + petite scène de fresque */}
        <rect x="80" y="200" width="150" height="150" fill="none" stroke="#e8c86a" strokeWidth="3" />
        <rect x="90" y="210" width="130" height="130" fill="#7e2a20" />
        {/* Le panneau : VIDE tant que la fresque n'est pas peinte, puis on y
            découvre un personnage (feedback direct de « pigments → mur »). */}
        {!made.includes("msg_fresque") ? (
          <>
            <circle cx="140" cy="250" r="16" fill="#e8c86a" opacity="0.8" />
            <path d="M120 300 q35 -40 70 0" stroke="#d8b060" strokeWidth="3" fill="none" opacity="0.7" />
          </>
        ) : (
          <g style={{ animation: "fadein .7s ease-out" }}>
            {/* liseré décoratif */}
            <rect x="98" y="218" width="114" height="114" fill="none" stroke="#d8a838" strokeWidth="2" opacity="0.6" />
            {/* un personnage en toge, façon fresque de Pompéi */}
            <g transform="translate(155,286)">
              <path d="M-18 48 Q-25 -12 0 -26 Q25 -12 18 48 Z" fill="#efe3c8" />
              <path d="M-18 48 Q-25 -12 0 -26 Q25 -12 18 48 Z" fill="#c8322a" opacity="0.12" />
              <path d="M-14 4 q14 9 28 -1 M-12 20 q12 7 24 -1" stroke="#c98a5a" strokeWidth="2" fill="none" opacity="0.5" />
              <circle cx="0" cy="-38" r="11" fill="#d8a878" />
              <path d="M-10 -42 q1 -11 10 -10 q10 1 9 11 q-3 -6 -9 -6 q-7 0 -10 5 Z" fill="#4e3220" />
              {/* bras levé tenant un rameau de laurier */}
              <path d="M15 -16 q21 -6 27 -26" stroke="#d8a878" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M42 -42 q5 -11 1 -21 M42 -42 q10 -3 17 -9 M42 -42 q10 5 18 3" stroke="#6a9a4a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            </g>
            {/* une petite plante grimpante dans un angle */}
            <path d="M104 330 q-3 -26 7 -40 M111 302 q9 -5 15 -1 M111 314 q-9 -4 -15 1" stroke="#6a8a4a" strokeWidth="2.4" fill="none" opacity="0.8" strokeLinecap="round" />
          </g>
        )}
        <rect x="250" y="200" width="150" height="150" fill="none" stroke="#e8c86a" strokeWidth="3" />
        {/* graffitis gravés dans le crépi (petites griffures) */}
        <g stroke="#e8caa0" strokeWidth="1.4" opacity="0.55">
          <path d="M270 240 h60 M270 250 h44 M270 260 h54" />
          <path d="M270 300 l50 6 M270 314 l40 4" />
          <text x="268" y="336" fontSize="12" fill="#e8caa0" fontFamily="ui-monospace,monospace" opacity="0.6">CIL IV</text>
        </g>
        {/* colonnes du péristyle (droite) */}
        {[560, 700, 840].map((x, i) => (
          <g key={i}>
            <rect x={x - 16} y="150" width="32" height="260" fill="url(#pm-col)" />
            {[...Array(5)].map((_, k) => <path key={k} d={`M${x - 12 + k * 5} 158 v250`} stroke="#a89870" strokeWidth="1" opacity="0.4" />)}
            <rect x={x - 22} y="150" width="44" height="14" fill="#d8c8a8" />
            <rect x={x - 20} y="404" width="40" height="10" fill="#c0b088" />
          </g>
        ))}
      </PLayer>

      {/* ═══ premier plan : sol en mosaïque, impluvium, table du scribe ═══ */}
      <PLayer depth={3}>
        <rect y="400" width="1000" height="160" fill="url(#pm-floor)" />
        <rect y="402" width="1000" height="158" fill="#3c2c18" opacity="0.28" filter="url(#pm-mottle)" />
        {/* mosaïque au sol */}
        <g opacity="0.35" stroke="#6e5836" strokeWidth="1">
          <path d="M0 440 h1000 M0 480 h1000 M0 520 h1000" />
          {[...Array(20)].map((_, i) => <path key={i} d={`M${i * 52} 420 v140`} />)}
        </g>
        <ellipse cx="500" cy="470" rx="440" ry="54" fill="#7a6240" opacity="0.3" />

        {/* impluvium (petit bassin central) */}
        <g transform="translate(330,500)">
          <rect x="-56" y="-8" width="112" height="34" rx="4" fill="#8a7452" />
          <rect x="-46" y="-2" width="92" height="24" rx="3" fill="#5a7e86" />
          <path d="M-40 4 q40 -4 80 2" stroke="#a8ccd0" strokeWidth="1.6" fill="none" opacity="0.5" style={{ animation: "ripple 3.4s ease-in-out infinite" }} />
        </g>

        {/* TABLE avec la tablette de cire + le stylet */}
        <g transform="translate(580,494)">
          <rect x="-56" y="8" width="112" height="10" rx="2" fill="#6e4c2e" />
          <rect x="-50" y="18" width="8" height="22" fill="#5a3f24" /><rect x="42" y="18" width="8" height="22" fill="#5a3f24" />
          {/* tablette de cire (cadre bois, cire sombre) */}
          <g transform="translate(-16,-4)">
            <rect x="-22" y="-12" width="44" height="30" rx="3" fill="#7a5230" />
            <rect x="-17" y="-7" width="34" height="20" rx="2" fill="#3a3428" />
            <path d="M-12 -3 h24 M-12 2 h20 M-12 7 h16" stroke="#6a6250" strokeWidth="1.2" opacity="0.8" />
          </g>
          {/* stylet posé */}
          <g transform="translate(26,-2) rotate(28)">
            <rect x="-1.5" y="-16" width="3" height="30" rx="1.5" fill="#c9b48a" />
            <path d="M-1.5 -16 l3 0 l-1.5 -4 Z" fill="#8a7a5a" />
            <rect x="-2.5" y="12" width="5" height="4" rx="1" fill="#8a7a5a" />
          </g>
        </g>

        {/* POTS DE PIGMENTS au pied du mur */}
        <g transform="translate(180,516)">
          {[["#b23020", -22], ["#2a5a9a", 0], ["#d8a838", 22], ["#e8dcc4", 44]].map(([c, dx], i) => (
            <g key={i} transform={`translate(${dx},0)`}>
              <ellipse cx="0" cy="8" rx="11" ry="4.5" fill="#241608" opacity="0.4" />
              <path d="M-10 -2 Q-11 7 0 8 Q11 7 10 -2 Z" fill="#7a5636" />
              <ellipse cx="0" cy="-2" rx="9" ry="4" fill={c} />
            </g>
          ))}
          {/* pinceau appuyé */}
          <g transform="translate(56,2) rotate(20)"><rect x="-1" y="-18" width="2.5" height="26" fill="#8a6a42" /><rect x="-2" y="-22" width="4.5" height="6" rx="2" fill="#3a2a1a" /></g>
        </g>

        {/* épave de MARTINE dans un coin de l'atrium */}
        <g transform="translate(910,504) rotate(8)">
          <ellipse cx="0" cy="12" rx="26" ry="6" fill="#140b06" opacity="0.5" />
          <path d="M0 -20 Q18 -18 20 -4 Q22 8 11 11 L-11 11 Q-22 8 -20 -4 Q-18 -18 0 -20 Z" fill="#8a6240" />
          <circle cx="-1" cy="-4" r="5.5" fill="#cfeaff" stroke="#5c3a22" strokeWidth="1.4" />
          <rect x="-13" y="3" width="24" height="7" rx="2" fill="#0c1410" stroke="#5c3a22" strokeWidth="1" />
          <text x="-1" y="9" textAnchor="middle" fontSize="5.5" fill="#5eff9e" fontFamily="ui-monospace,monospace" style={{ animation: "pulse 2.2s infinite" }}>an 79</text>
          <circle cx="13" cy="-27" r="2.3" fill="#5eff9e" style={{ animation: "pulse 1.5s infinite" }} />
          <path d="M8 -20 q6 -8 13 -6" stroke="#8a94a8" strokeWidth="2.3" fill="none" strokeLinecap="round" />
        </g>
      </PLayer>

      {/* voile de grain global */}
      <rect width="1000" height="560" fill="#231a10" opacity="0.06" style={{ pointerEvents: "none" }} />

      {/* zones cliquables */}
      {/* LE PEINTRE DE FRESQUES — devant le mur, ses pinceaux à la main */}
      <g transform="translate(318,478)">
        <ellipse cx="0" cy="26" rx="22" ry="6" fill="#2a1408" opacity="0.4" />
        {/* la tunique courte d'artisan */}
        <path d="M-13 26 Q-17 -2 0 -17 Q17 -2 13 26 Z" fill="#c8a86a" />
        <path d="M-10 8 q10 4 20 0" stroke="#a8884a" strokeWidth="2" fill="none" />
        {/* la tête, cheveux bouclés */}
        <circle cx="0" cy="-26" r="9" fill="#c08a5e" />
        <path d="M-9 -29 q1 -11 9 -10 q10 1 9 11 q-3 -6 -9 -6 q-6 0 -9 5 Z" fill="#3a2418" />
        {/* le bras levé vers le mur, un pinceau à la main */}
        <path d="M-13 -6 q-16 -2 -22 -16" stroke="#c08a5e" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        <g transform="translate(-38,-26) rotate(-30)">
          <rect x="-1.4" y="-12" width="2.8" height="20" rx="1" fill="#8a6a3a" />
          <path d="M-2 -12 l4 0 l-2 -5 Z" fill="#a8322a" />
        </g>
        {/* le pot de couleur dans l'autre main */}
        <path d="M13 -4 q12 4 14 14" stroke="#c08a5e" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M22 12 h12 l-2 10 h-8 Z" fill="#8a4a3a" />
      </g>
      {/* le « ? » du peintre : comment faire parler un mur ? */}
      {!made.includes("msg_fresque") && (
        <>
          <g transform="translate(310,388)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
            <path d="M0 0 q0 -20 20 -20 q20 0 20 17 q0 14 -17 18 l0 6" fill="none" stroke="#ffd166" strokeWidth="4" />
            <circle cx="20" cy="31" r="2.6" fill="#ffd166" />
          </g>
          <Hotspot cx={330} cy={398} r={28} label="parler au peintre" reveal={reveal} onClick={() => action("pictor")} />
        </>
      )}

      <Hotspot cx={175} cy={300} r={66} label="enduit" item="enduit" reveal={reveal} onClick={() => collect("enduit")} />
      <Hotspot cx={200} cy={512} r={48} label="pigments" item="pigments" reveal={reveal} onClick={() => collect("pigments")} />
      <Hotspot cx={556} cy={488} r={30} label="cire" item="cire" reveal={reveal} onClick={() => collect("cire")} />
      <Hotspot cx={618} cy={490} r={26} label="stylet" item="stylet" reveal={reveal} onClick={() => collect("stylet")} />
      <Hotspot cx={910} cy={500} r={34} label="MARTINE" reveal={reveal} onClick={() => action("wreck")} />
    </svg>
  );
}
