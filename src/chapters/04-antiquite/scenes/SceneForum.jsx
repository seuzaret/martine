import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 4 — Tableau : le forum romain
   Peinture fine — plein soleil, marbre et colonnes, une grande
   stèle gravée, l'atelier du parcheminier-copiste. À trouver :
   marbre, burin, peau, chaux & ponce, plume, grattoir.
   ============================================================ */

export default function SceneForum({ collect, action, reveal, made = [] }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="fo-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a86bc" />
          <stop offset="60%" stopColor="#9cc0d4" />
          <stop offset="100%" stopColor="#eadcb8" />
        </linearGradient>
        <linearGradient id="fo-marble" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f0ece2" /><stop offset="55%" stopColor="#d8d2c4" /><stop offset="100%" stopColor="#b4ac9c" /></linearGradient>
        <linearGradient id="fo-col" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#eae4d6" /><stop offset="50%" stopColor="#d2c8b4" /><stop offset="100%" stopColor="#aca290" /></linearGradient>
        <linearGradient id="fo-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#cabfa4" /><stop offset="100%" stopColor="#8a7c60" /></linearGradient>
        <filter id="fo-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="fo-mottle" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* ═══ ciel romain ═══ */}
      <rect width="1000" height="560" fill="url(#fo-sky)" />
      <circle cx="820" cy="120" r="36" fill="#fff6da" opacity="0.85" />
      <path d="M120 110 q8 -8 16 0 M180 132 q6 -6 12 0" stroke="#4a5464" strokeWidth="2.2" fill="none" opacity="0.5" />

      {/* ═══ couche lointaine : basilique + arc de triomphe ═══ */}
      <PLayer depth={1}>
        <rect y="288" width="1000" height="60" fill="#b0a488" />
        {/* rangée de colonnes de la basilique */}
        {[60, 110, 160, 210, 260].map((x, i) => (
          <g key={i}><rect x={x - 8} y="150" width="16" height="140" fill="url(#fo-col)" /><rect x={x - 12} y="142" width="24" height="10" fill="#d8cdb4" /></g>
        ))}
        <rect x="44" y="132" width="240" height="14" fill="#c2b48e" />
        <path d="M44 132 L164 104 L284 132 Z" fill="#cbbf9c" />
        {/* arc de triomphe (droite) */}
        <g transform="translate(860,290)">
          <rect x="-70" y="-130" width="140" height="130" fill="url(#fo-marble)" />
          <path d="M-40 0 v-70 Q0 -100 40 -70 v70 Z" fill="#7a746a" />
          <rect x="-70" y="-146" width="140" height="18" fill="#d8d2c4" />
          <rect x="-56" y="-124" width="16" height="94" fill="#cfc7b8" /><rect x="40" y="-124" width="16" height="94" fill="#cfc7b8" />
        </g>
      </PLayer>

      {/* ═══ couche intermédiaire : la grande stèle gravée + colonne ═══ */}
      <PLayer depth={2}>
        {/* colonne isolée (gauche) */}
        <g transform="translate(120,400)">
          <rect x="-14" y="-230" width="28" height="230" fill="url(#fo-col)" />
          {[...Array(5)].map((_, k) => <path key={k} d={`M${-10 + k * 5} -224 v224`} stroke="#a89e86" strokeWidth="1" opacity="0.4" />)}
          <rect x="-20" y="-244" width="40" height="16" fill="#e0d6c2" />
          <path d="M-20 -244 q-6 -10 6 -14 q6 8 14 4 q-4 10 6 10 Z" fill="#d0c6b0" />
        </g>
        {/* la GRANDE STÈLE de marbre, couverte de lettres romaines */}
        <g transform="translate(430,404)">
          <rect x="-96" y="-190" width="192" height="190" fill="url(#fo-marble)" />
          <rect x="-96" y="-190" width="192" height="190" fill="#8a8478" opacity="0.18" filter="url(#fo-grain)" />
          <rect x="-96" y="-190" width="192" height="190" fill="none" stroke="#a89e86" strokeWidth="3" />
          {/* fronton */}
          <path d="M-104 -190 L0 -222 L104 -190 Z" fill="#e0dacc" />
          {/* lignes de capitales romaines gravées (ombre portée) */}
          {["SENATVS","POPVLVSQVE","ROMANVS","·  S P Q R  ·"].map((t, i) => (
            <text key={i} x="0" y={-150 + i * 34} textAnchor="middle" fontSize={i === 3 ? 15 : 20} fill="#6e675a" fontFamily="Palatino, Georgia, serif" letterSpacing="2" style={{ fontWeight: 700 }}>{t}</text>
          ))}
        </g>
      </PLayer>

      {/* ═══ premier plan : dallage, tailleur de pierre, atelier du copiste ═══ */}
      <PLayer depth={3}>
        <rect y="400" width="1000" height="160" fill="url(#fo-floor)" />
        <rect y="402" width="1000" height="158" fill="#3c3220" opacity="0.28" filter="url(#fo-mottle)" />
        <path d="M0 448 h1000 M0 506 h1000 M240 410 v150 M520 410 v150 M760 410 v150" stroke="#5c503a" strokeWidth="1.6" opacity="0.4" />
        <ellipse cx="500" cy="474" rx="440" ry="52" fill="#7a6c4a" opacity="0.3" />

        {/* petit BLOC DE MARBRE au sol + burin du tailleur */}
        <g transform="translate(190,470)">
          <ellipse cx="0" cy="26" rx="52" ry="12" fill="#241608" opacity="0.35" />
          <path d="M-42 26 L-38 -18 L40 -26 L46 20 Z" fill="url(#fo-marble)" />
          <path d="M-38 -18 L40 -26 L46 20 L-42 26 Z" fill="#8a8478" opacity="0.15" filter="url(#fo-grain)" />
          <path d="M-30 0 h50 M-28 10 h44" stroke="#8a8072" strokeWidth="2" opacity="0.5" />
          {/* burin + maillet posés dessus */}
          <g transform="translate(6,-24) rotate(-24)"><rect x="-2" y="-16" width="4" height="24" fill="#6a6c72" /><rect x="-3" y="8" width="6" height="6" fill="#4a4c52" /></g>
          <g transform="translate(30,-16)"><rect x="-8" y="-6" width="16" height="12" rx="2" fill="#8a5a34" /><rect x="-2" y="4" width="4" height="14" fill="#5a3f24" /></g>
        </g>

        {/* L'ATELIER DU PARCHEMINIER-COPISTE (droite) */}
        {/* peau tendue sur un cadre */}
        <g transform="translate(590,458)">
          <path d="M-36 20 L-36 -50 M36 20 L36 -50 M-40 -46 L40 -46" stroke="#5a3f24" strokeWidth="5" strokeLinecap="round" />
          <path d="M-28 -42 Q0 -50 28 -42 L24 12 Q0 20 -24 12 Z" fill="#e6d8bc" />
          <path d="M-28 -42 Q0 -50 28 -42 L24 12 Q0 20 -24 12 Z" fill="#8a7a56" opacity="0.2" filter="url(#fo-grain)" />
          <path d="M-20 -34 q20 -6 40 0 M-22 -14 q22 -6 44 0" stroke="#c9b892" strokeWidth="1.4" fill="none" opacity="0.6" />
        </g>
        {/* seau de chaux + pierre ponce */}
        <g transform="translate(660,512)">
          <path d="M-14 -8 L14 -8 L11 12 L-11 12 Z" fill="#7a6e5a" />
          <ellipse cx="0" cy="-8" rx="14" ry="4.5" fill="#e8e4da" />
          <ellipse cx="20" cy="8" rx="10" ry="7" fill="#d0ccc0" /><path d="M14 6 q6 -4 12 0" stroke="#b0aca0" strokeWidth="1" fill="none" />
        </g>
        {/* pupitre du copiste : parchemin, plume & encrier, grattoir */}
        <g transform="translate(740,500)">
          <path d="M-46 14 L46 14 L40 -2 L-52 -2 Z" fill="#6e4c2e" />
          <rect x="-52" y="14" width="8" height="26" fill="#5a3f24" /><rect x="40" y="14" width="8" height="26" fill="#5a3f24" />
          {/* parchemin en cours */}
          <g transform="translate(-6,-2)"><rect x="-30" y="-16" width="60" height="22" rx="2" fill="#efe6ce" transform="rotate(-6)" /><path d="M-22 -8 h44 M-22 -2 h36" stroke="#c9b892" strokeWidth="1" opacity="0.7" transform="rotate(-6)" /></g>
          {/* plume + encrier */}
          <g transform="translate(30,-6)"><path d="M-6 4 Q-7 -4 0 -6 Q7 -4 6 4 Z" fill="#3a3a4a" /><g transform="translate(2,-6) rotate(28)"><path d="M0 0 q-3 -20 2 -30 q4 10 1 30 Z" fill="#e8e4da" /></g></g>
          {/* grattoir (lame courbe) */}
          <g transform="translate(-30,6) rotate(-8)"><path d="M-10 0 q10 -6 20 -2" stroke="#9a9ca4" strokeWidth="3" fill="none" strokeLinecap="round" /><rect x="8" y="-3" width="8" height="6" rx="2" fill="#6e4c2e" /></g>
        </g>

        {/* herbes entre les dalles */}
        <g opacity="0.85"><path d="M-4 560 q8 -20 2 -30 M980 560 q-6 -18 2 -28 M470 558 q-4 -14 2 -22" stroke="#4a4426" strokeWidth="3.5" fill="none" /></g>
      </PLayer>

      {/* voile de grain global */}
      <rect width="1000" height="560" fill="#231c10" opacity="0.05" style={{ pointerEvents: "none" }} />

      {/* zones cliquables */}
      {/* LE MAGISTRAT — toge à bande, une tablette à la main, excédé */}
      <g transform="translate(322,476)">
        <ellipse cx="0" cy="28" rx="24" ry="7" fill="#241c10" opacity="0.4" />
        {/* la toge, avec la bande pourpre du magistrat */}
        <path d="M-15 28 Q-19 -2 0 -18 Q19 -2 15 28 Z" fill="#f0ead8" />
        <path d="M-15 28 Q-9 4 -2 -17" stroke="#8a2438" strokeWidth="3.5" fill="none" />
        <path d="M12 28 Q7 8 1 -14" stroke="#c8bfa8" strokeWidth="2" fill="none" />
        {/* la tête, coupe romaine */}
        <circle cx="0" cy="-27" r="9" fill="#c89a6e" />
        <path d="M-9 -30 q1 -10 9 -10 q10 0 9 10 q-4 -4 -9 -4 q-6 0 -9 4 Z" fill="#4a3a2c" />
        {/* le poing levé, l'autre main tenant la tablette */}
        <path d="M14 -8 q14 -4 16 -16" stroke="#c89a6e" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        <circle cx="32" cy="-26" r="4.5" fill="#c89a6e" />
        <path d="M-14 -4 q-12 6 -12 14" stroke="#c89a6e" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        <g transform="translate(-30,12) rotate(-10)">
          <rect x="-9" y="-7" width="18" height="14" rx="1.5" fill="#8a6a3a" />
          <rect x="-7" y="-5" width="14" height="10" fill="#2c2418" />
        </g>
      </g>
      {/* le « ? » du magistrat : afficher la loi pour que nul ne l'ignore */}
      {!made.includes("msg_inscription") && (
        <>
          <g transform="translate(314,378)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
            <path d="M0 0 q0 -20 20 -20 q20 0 20 17 q0 14 -17 18 l0 6" fill="none" stroke="#ffd166" strokeWidth="4" />
            <circle cx="20" cy="31" r="2.6" fill="#ffd166" />
          </g>
          <Hotspot cx={334} cy={388} r={28} label="parler au magistrat" reveal={reveal} onClick={() => action("magistrat")} />
        </>
      )}

      <Hotspot cx={430} cy={310} r={90} label="marbre" item="marbre" reveal={reveal} onClick={() => collect("marbre")} />
      <Hotspot cx={196} cy={452} r={44} label="burin" item="burin" reveal={reveal} onClick={() => collect("burin")} />
      <Hotspot cx={590} cy={440} r={44} label="peau" item="peau" reveal={reveal} onClick={() => collect("peau")} />
      <Hotspot cx={660} cy={512} r={30} label="chaux" item="chaux" reveal={reveal} onClick={() => collect("chaux")} />
      <Hotspot cx={772} cy={494} r={26} label="plume" item="plume" reveal={reveal} onClick={() => collect("plume")} />
      <Hotspot cx={710} cy={506} r={24} label="grattoir" item="grattoir" reveal={reveal} onClick={() => collect("grattoir")} />
    </svg>
  );
}
