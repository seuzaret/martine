import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 7 — Tableau 4 : le SALON du PHONOGRAPHE (New York, 1878)
   ------------------------------------------------------------
   James, désormais âgé (~66 ans), a fait venir à la maison la
   dernière merveille d'Edison : un phonographe à cylindre de cire.
   Il veut y enregistrer sa voix pour ses petits-enfants — pour
   qu'après sa mort, on l'entende encore. Son fils tourne la
   manivelle. Cliquer sur le phonographe ouvre le mini-jeu.
   ============================================================ */

export default function ScenePhonographe({ action, reveal, made = [], queteQui }) {
  const done = made.includes("msg_phonographe");

  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ph-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7a4a3a" /><stop offset="100%" stopColor="#4a2818" /></linearGradient>
        <linearGradient id="ph-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5a3820" /><stop offset="100%" stopColor="#2a1608" /></linearGradient>
        <linearGradient id="ph-table" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a5a30" /><stop offset="100%" stopColor="#4a2c14" /></linearGradient>
        <radialGradient id="ph-lamp" cx="50%" cy="0%" r="80%"><stop offset="0%" stopColor="#ffe8b0" stopOpacity="0.6" /><stop offset="100%" stopColor="#ffe8b0" stopOpacity="0" /></radialGradient>
        <filter id="ph-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* ═══ mur tapissé de bordeaux (papier peint Belle Époque) ═══ */}
      <rect width="1000" height="440" fill="url(#ph-wall)" />
      <rect width="1000" height="440" fill="#2a1808" opacity="0.15" filter="url(#ph-grain)" />
      <g fill="#3a1c10" opacity="0.5">
        {[80, 200, 320, 440, 560, 680, 800, 920].map((x, i) =>
          [60, 160, 260, 360].map((y, j) => (
            <path key={`${i}-${j}`} d={`M${x} ${y} l6 -8 l6 8 l-6 8 Z m0 0 l-6 -8 l-6 8 l6 8 Z`} />
          ))
        )}
      </g>
      <path d="M0 340 h1000" stroke="#2a1808" strokeWidth="4" />
      <rect y="340" width="1000" height="60" fill="#3a2010" />

      {/* Un CADRE au mur : le daguerréotype de James JEUNE (héritage narratif du T2) */}
      <g transform="translate(120,120)">
        <rect x="-30" y="-40" width="60" height="80" fill="#e8c060" />
        <rect x="-26" y="-36" width="52" height="72" fill="#0a0806" />
        <rect x="-22" y="-32" width="44" height="64" fill="#c8d0d4" />
        <path d="M-10 -22 Q0 -30 10 -22 L8 8 Q0 12 -8 8 Z" fill="#8a807a" />
        <circle cx="0" cy="-14" r="4" fill="#5a5450" />
        <text y="56" textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontStyle="italic" fontSize="10" fill="#e8c060">1855</text>
      </g>

      {/* halo lumineux (lampe à pétrole) */}
      <path d="M400 20 L640 20 L720 400 L320 400 Z" fill="url(#ph-lamp)" opacity="0.5" />

      {/* ═══ le sol parqueté ═══ */}
      <PLayer depth={2}>
        <path d="M0 560 L0 400 L1000 400 L1000 560 Z" fill="url(#ph-floor)" />
        {[420, 460, 500, 540].map((y, i) => <path key={i} d={`M0 ${y} h1000`} stroke="#1a0c04" strokeWidth="1" opacity="0.5" />)}
        {[200, 400, 600, 800].map((x, i) => <path key={i} d={`M${x} 400 v160`} stroke="#1a0c04" strokeWidth="1" opacity="0.4" />)}
      </PLayer>

      {/* ═══ premier plan : la TABLE + LE PHONOGRAPHE + James âgé + son fils ═══ */}
      <PLayer depth={3}>
        {/* la table victorienne */}
        <g transform="translate(500,410)">
          <rect x="-140" y="-10" width="280" height="16" fill="url(#ph-table)" />
          <rect x="-140" y="-10" width="280" height="16" fill="#1a0c04" opacity="0.25" filter="url(#ph-grain)" />
          <path d="M-130 6 Q-124 60 -134 130 L-126 130 Q-116 60 -122 6 Z" fill="#4a2c14" />
          <path d="M130 6 Q124 60 134 130 L126 130 Q116 60 122 6 Z" fill="#4a2c14" />
        </g>

        {/* LE PHONOGRAPHE EDISON — cylindre à cire + grand cornet de cuivre */}
        <g transform="translate(500,320)">
          <rect x="-70" y="60" width="140" height="30" rx="4" fill="#5a3820" />
          <rect x="-70" y="60" width="140" height="30" rx="4" fill="none" stroke="#2a1608" strokeWidth="2" />
          <rect x="-60" y="30" width="120" height="30" fill="#3a2a20" />
          <circle cx="-52" cy="45" r="10" fill="#7a6a5a" stroke="#3a2a20" strokeWidth="2" />
          <circle cx="-52" cy="45" r="4" fill="#3a2a20" />
          {/* manivelle */}
          <g style={{ transformOrigin: "-52px 45px", animation: done ? "spin 3.2s linear infinite" : "none" }}>
            <rect x="-58" y="43" width="26" height="4" fill="#a89878" />
            <circle cx="-32" cy="45" r="3.4" fill="#5a4a3a" />
          </g>
          {/* le cylindre de cire (le SUPPORT — l'objet héritage) */}
          <g transform="translate(0,20)">
            <ellipse cx="0" cy="0" rx="52" ry="12" fill="#e0d0a0" />
            <rect x="-52" y="0" width="104" height="20" fill="#e0d0a0" />
            <ellipse cx="0" cy="20" rx="52" ry="12" fill="#c8b088" />
            {[4, 8, 12, 16].map((y, i) => <ellipse key={i} cx="0" cy={y} rx="52" ry="12" fill="none" stroke="#8a7050" strokeWidth="0.6" opacity="0.7" />)}
            {/* l'aiguille sur son bras */}
            <path d="M0 -10 L-20 -30" stroke="#7a6a5a" strokeWidth="3" />
            <circle cx="-20" cy="-30" r="6" fill="#a89878" />
            <path d="M0 -10 L0 -6" stroke="#c8b088" strokeWidth="3" />
          </g>
          {/* le grand cornet de cuivre (pavillon d'enregistrement) */}
          <g transform="translate(50,0)">
            <path d="M0 0 L120 -70 L120 -30 L0 30 Z" fill="#c8802a" />
            <path d="M0 0 L120 -70 L120 -30 L0 30 Z" fill="none" stroke="#7a4a10" strokeWidth="2" />
            <ellipse cx="120" cy="-50" rx="10" ry="40" fill="#7a4a10" />
            <path d="M0 -6 L20 -14 L20 22 L0 14 Z" fill="#7a4a10" />
          </g>
        </g>

        {/* JAMES ÂGÉ (~66 ans) — dans un fauteuil, penché vers le cornet */}
        <g transform="translate(720,420)">
          {/* fauteuil */}
          <rect x="-52" y="-30" width="104" height="80" rx="8" fill="#4a2814" />
          <rect x="-58" y="-90" width="12" height="130" rx="4" fill="#4a2814" />
          <rect x="46" y="-90" width="12" height="130" rx="4" fill="#4a2814" />
          <rect x="-48" y="-102" width="96" height="20" rx="6" fill="#5a3018" />
          {/* corps : redingote noire, cravate */}
          <path d="M-24 -60 Q-30 -110 0 -122 Q30 -110 24 -60 L20 -50 L-20 -50 Z" fill="#1c1610" />
          <path d="M-8 -122 L0 -110 L8 -122 L6 -80 L-6 -80 Z" fill="#efe6d2" />
          <path d="M-3 -110 L3 -110 L3 -84 L-3 -84 Z" fill="#0a0a10" />
          {/* le bras qui se tend vers le cornet à sa gauche */}
          <path d="M-22 -100 q-50 -8 -80 8" stroke="#e0b084" strokeWidth="6" fill="none" strokeLinecap="round" />
          {/* la tête — cheveux blancs, moustache blanche, petites lunettes rondes */}
          <path d="M0 -150 c14 0 22 12 22 26 c0 14 -8 24 -22 24 c-14 0 -22 -10 -22 -24 c0 -14 8 -26 22 -26 Z" fill="#e0b084" />
          <path d="M-20 -134 Q-16 -156 0 -158 Q16 -156 20 -134 Q10 -148 0 -148 Q-10 -148 -20 -134 Z" fill="#e8e4dc" />
          <path d="M-6 -114 q6 -3 12 0 q-2 -4 -6 -4 q-4 0 -6 4 Z" fill="#e8e4dc" />
          <path d="M-6 -114 q-3 3 -5 3 M6 -114 q3 3 5 3" stroke="#e8e4dc" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <circle cx="-7" cy="-126" r="6" fill="none" stroke="#5a4030" strokeWidth="1.2" />
          <circle cx="7" cy="-126" r="6" fill="none" stroke="#5a4030" strokeWidth="1.2" />
          <path d="M-1 -126 h2" stroke="#5a4030" strokeWidth="1.2" />
          <circle cx="-7" cy="-126" r="1.6" fill="#3a6a8a" />
          <circle cx="7" cy="-126" r="1.6" fill="#3a6a8a" />
        </g>

        {/* LE FILS DE JAMES (~30 ans) — debout, tournant la manivelle du phono */}
        <g transform="translate(360,410)">
          <path d="M-16 -60 Q-20 -110 0 -122 Q20 -110 16 -60 L12 -50 L-12 -50 Z" fill="#4a5a6a" />
          <path d="M-8 -122 L0 -110 L8 -122 L6 -80 L-6 -80 Z" fill="#efe6d2" />
          <path d="M-3 -110 L3 -110 L3 -80 L-3 -80 Z" fill="#3a2820" />
          <path d="M-12 -50 L-8 40 L-2 40 L-2 -50 Z" fill="#2c3846" />
          <path d="M2 -50 L2 40 L8 40 L12 -50 Z" fill="#2c3846" />
          {/* bras qui tourne la manivelle à droite */}
          <path d="M14 -90 q40 -6 60 20" stroke="#4a5a6a" strokeWidth="6" fill="none" strokeLinecap="round" />
          {/* tête — cheveux courts auburn */}
          <path d="M0 -150 c12 0 20 10 20 24 c0 14 -8 22 -20 22 c-12 0 -20 -8 -20 -22 c0 -14 8 -24 20 -24 Z" fill="#e0b084" />
          <path d="M-18 -134 Q-14 -154 0 -156 Q14 -154 18 -134 Q10 -146 0 -146 Q-10 -146 -18 -134 Z" fill="#7a3a1a" />
          <circle cx="-6" cy="-128" r="1.5" fill="#3a6a8a" />
          <circle cx="6" cy="-128" r="1.5" fill="#3a6a8a" />
        </g>

        {/* lampe à pétrole suspendue */}
        <g transform="translate(500,40)">
          <path d="M0 0 v50" stroke="#3a2410" strokeWidth="2" />
          <path d="M-24 50 L24 50 L20 70 L-20 70 Z" fill="#a89878" />
          <ellipse cx="0" cy="80" rx="18" ry="10" fill="#ffe8b0" opacity="0.85" style={{ animation: "glow 2.8s ease-in-out infinite" }} />
        </g>

        {/* « ? » de James âgé (tant qu'il guide) */}
        {queteQui === "james-vieux" && !done && (
          <g transform="translate(720,240)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
            <path d="M0 0 q0 -24 24 -24 q24 0 24 20 q0 17 -20 22 l0 8" fill="none" stroke="#ffd166" strokeWidth="4" />
            <circle cx="24" cy="37" r="3" fill="#ffd166" />
          </g>
        )}
      </PLayer>

      <rect width="1000" height="560" fill="#141810" opacity="0.06" style={{ pointerEvents: "none" }} />

      {/* ═══ zones cliquables ═══ */}
      <Hotspot cx={720} cy={310} r={54} label="James âgé" reveal={reveal} onClick={() => action("james-vieux")} />
      <Hotspot cx={360} cy={330} r={40} label="son fils" reveal={reveal} onClick={() => action("filsjames")} />
      {!done && (
        <Hotspot cx={520} cy={320} r={80} label="le phonographe Edison — graver la voix" reveal={reveal} onClick={() => action("phono")} />
      )}
    </svg>
  );
}
