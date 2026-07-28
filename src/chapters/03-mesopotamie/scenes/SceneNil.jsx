import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 3 — Tableau 2 : les bords du Nil (Égypte)
   Peinture fine — lumière chaude, le fleuve, une felouque, une
   palmeraie, un pylône couvert de hiéroglyphes. La QUÊTE : le
   pharaon Snéfrou veut son NOM pour l'éternité → fabriquer papyrus
   (couteau + tiges), calame (couteau + roseau), encre (bol au feu
   → suie + sève d'acacia), puis écrire son cartouche (mini-jeu).
   ============================================================ */

export default function SceneNil({ collect, action, reveal, made = [], queteQui }) {
  const ecrit = made.includes("msg_hieroglyphes");
  const pretAEcrire = made.includes("encre") && made.includes("calame_nil") && made.includes("feuille_papyrus");
  const seve = made.includes("seve");
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="nl-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3f6a94" /><stop offset="45%" stopColor="#8fb0c4" /><stop offset="76%" stopColor="#e2c084" /><stop offset="100%" stopColor="#f4dca0" />
        </linearGradient>
        <radialGradient id="nl-sun" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#fff4d0" /><stop offset="50%" stopColor="#ffe09a" stopOpacity="0.6" /><stop offset="100%" stopColor="#ffe09a" stopOpacity="0" /></radialGradient>
        <linearGradient id="nl-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a9c4c0" /><stop offset="45%" stopColor="#6a98a0" /><stop offset="100%" stopColor="#41707a" /></linearGradient>
        <linearGradient id="nl-sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d8b878" /><stop offset="100%" stopColor="#9a7642" /></linearGradient>
        <linearGradient id="nl-temple" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d8b47e" /><stop offset="100%" stopColor="#a67c46" /></linearGradient>
        <linearGradient id="nl-nemes" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e8c04a" /><stop offset="100%" stopColor="#c89a2a" /></linearGradient>
        <filter id="nl-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="nl-blur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="7" /></filter>
      </defs>

      {/* ═══ ciel d'Égypte ═══ */}
      <rect width="1000" height="560" fill="url(#nl-sky)" />
      <circle cx="240" cy="150" r="150" fill="url(#nl-sun)" />
      <circle cx="240" cy="150" r="42" fill="#fff4d0" opacity="0.95" />
      <path d="M620 110 q8 -8 16 0 M660 128 q6 -6 12 0" stroke="#3c3a4a" strokeWidth="2.4" fill="none" opacity="0.6" />

      {/* ═══ couche lointaine : rive d'en face + pylône à hiéroglyphes ═══ */}
      <PLayer depth={1}>
        <path d="M0 300 Q250 290 500 298 Q750 306 1000 296 L1000 372 L0 372 Z" fill="#c69a5e" />
        <g transform="translate(800,300)">
          <path d="M-90 0 L-78 -110 L-40 -118 L-40 0 Z" fill="url(#nl-temple)" />
          <path d="M90 0 L78 -110 L40 -118 L40 0 Z" fill="url(#nl-temple)" />
          <rect x="-40" y="-96" width="80" height="96" fill="#8a6238" />
          {[-84, -66, -48, -30].map((y, i) => (
            <text key={i} x="-64" y={y} fontSize="10" fill="#5c3f22" opacity="0.55" fontFamily="ui-monospace,monospace">𓂀𓁶𓆓</text>
          ))}
          <path d="M-40 -18 L40 -18 L34 0 L-34 0 Z" fill="#241608" />
        </g>
        {[[130, 300, 1], [190, 296, 0.8], [940, 298, 0.9]].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x},${y}) scale(${s})`}>
            <path d="M0 0 L-3 -64 L3 -64 Z" fill="#6e4c2e" />
            <path d="M0 -64 q-32 -6 -50 14 M0 -64 q32 -6 50 14 M0 -64 q-22 -24 -36 -32 M0 -64 q22 -24 36 -32 M0 -64 q0 -28 0 -42" stroke="#4a6a30" strokeWidth="4" fill="none" />
          </g>
        ))}
      </PLayer>

      {/* ═══ couche intermédiaire : le Nil + la felouque ═══ */}
      <PLayer depth={2}>
        <rect y="322" width="1000" height="102" fill="url(#nl-water)" />
        <path d="M200 328 L280 328 L300 418 L180 418 Z" fill="#ffe09a" opacity="0.25" />
        {[338, 360, 384, 406].map((y, i) => (
          <path key={i} d={`M0 ${y} q120 ${i % 2 ? 4 : -4} 240 0 t240 0 t240 0 t240 0`} stroke="#cfe0da" strokeWidth="1.5" fill="none" opacity="0.4" />
        ))}
        <g transform="translate(520,350)">
          <path d="M-46 30 Q0 44 46 30 L38 40 Q0 50 -38 40 Z" fill="#6e4c2e" />
          <path d="M0 30 L0 -54" stroke="#5a3f24" strokeWidth="3" />
          <path d="M0 -54 L44 26 L0 26 Z" fill="#f0e6d0" />
          <path d="M0 -54 L44 26" stroke="#c9b890" strokeWidth="1.5" />
          <path d="M0 -30 L-30 26 L0 26 Z" fill="#e6dcc6" opacity="0.9" />
        </g>
      </PLayer>

      {/* ═══ premier plan : berge, acacia, atelier, Snéfrou ═══ */}
      <PLayer depth={3}>
        <path d="M0 560 L0 418 Q250 402 520 424 Q760 442 1000 416 L1000 560 Z" fill="url(#nl-sand)" />
        <path d="M0 560 L0 418 Q250 402 520 424 Q760 442 1000 416 L1000 560 Z" fill="#3c2c18" opacity="0.28" filter="url(#nl-grain)" />
        <ellipse cx="500" cy="502" rx="440" ry="52" fill="#8a6c40" opacity="0.3" />

        {/* L'ACACIA du désert (support) : canopée plate, tronc, entaille à sève */}
        <g transform="translate(70,432)">
          <path d="M0 8 L-4 -40 M0 8 L4 -40" stroke="#6a4a2c" strokeWidth="7" strokeLinecap="round" />
          <path d="M0 -40 l-14 -6 M0 -40 l14 -6 M-6 -30 l-16 -3 M6 -30 l16 -3" stroke="#6a4a2c" strokeWidth="3" />
          <path d="M-46 -46 Q-30 -66 0 -62 Q30 -66 46 -46 Q30 -40 0 -42 Q-30 -40 -46 -46 Z" fill="#5c7a34" />
          <path d="M-46 -46 Q0 -56 46 -46" stroke="#4a6a2a" strokeWidth="2" fill="none" opacity="0.5" />
          {/* l'entaille + gouttes de sève ambrée (visibles une fois récoltée) */}
          <path d="M-3 -18 l6 4" stroke="#3a2412" strokeWidth="2" />
          {seve && <g style={{ animation: "fadein 1s ease-out" }}><circle cx="2" cy="-10" r="2.6" fill="#e0a83a" /><circle cx="3" cy="-2" r="2" fill="#e0a83a" opacity="0.8" /></g>}
        </g>

        {/* massif de PAPYRUS (tiges à ombelles) */}
        <g transform="translate(180,472)">
          {[[-26, 0, 1], [-10, 6, 1.1], [8, -2, 0.95], [24, 8, 1.05], [0, 10, 0.9]].map(([dx, dy, s], i) => (
            <g key={i} transform={`translate(${dx},${dy}) scale(${s})`}>
              <path d={`M0 40 q${i % 2 ? 4 : -4} -40 0 -78`} stroke="#5c7a30" strokeWidth="4" fill="none" style={{ animation: `sway ${3 + i * 0.5}s ease-in-out infinite`, transformOrigin: "0px 40px", transformBox: "view-box" }} />
              <g style={{ animation: `sway ${3 + i * 0.5}s ease-in-out infinite`, transformOrigin: "0px 40px", transformBox: "view-box" }}>
                {[0, 40, 80, 120, 160].map((a) => <path key={a} d={`M0 -78 l${Math.cos(a * Math.PI / 180) * 16} ${-Math.sin(a * Math.PI / 180) * 16 - 4}`} stroke="#6a8a3a" strokeWidth="1.6" />)}
              </g>
            </g>
          ))}
        </g>

        {/* touffe de ROSEAUX du Nil, au bord de l'eau */}
        <g transform="translate(300,500)">
          <ellipse cx="0" cy="12" rx="24" ry="6" fill="#241608" opacity="0.35" />
          {[-12, -6, 0, 6, 12].map((x, i) => (
            <path key={i} d={`M${x} 10 q${i % 2 ? 4 : -4} -30 ${i % 2 ? 5 : -3} -52`} stroke="#7a9a3e" strokeWidth="3" fill="none" style={{ animation: `sway ${3 + i * 0.3}s ease-in-out infinite`, transformOrigin: `${x}px 10px`, transformBox: "view-box" }} />
          ))}
        </g>

        {/* L'ATELIER : une natte avec le COUTEAU et le BOL */}
        <g transform="translate(460,514)">
          <ellipse cx="0" cy="8" rx="76" ry="14" fill="#c2a066" />
          <ellipse cx="0" cy="8" rx="76" ry="14" fill="#6e5228" opacity="0.28" filter="url(#nl-grain)" />
          {/* le couteau */}
          <g transform="translate(-30,2) rotate(-8)">
            <rect x="-16" y="-3" width="16" height="6" rx="2" fill="#6e4c2e" />
            <path d="M0 -4 L20 -1 L20 3 L0 4 Z" fill="#c8c0b4" stroke="#8a8478" strokeWidth="0.8" />
          </g>
          {/* le bol de terre */}
          <g transform="translate(36,2)">
            <path d="M-14 -3 Q-15 9 0 10 Q15 9 14 -3 Z" fill="#a87c50" />
            <ellipse cx="0" cy="-3" rx="14" ry="4.5" fill="#7a5636" />
            <ellipse cx="0" cy="-3" rx="9" ry="2.6" fill="#5a4030" />
          </g>
        </g>

        {/* LE FEU (support) : petit foyer pour noircir le bol */}
        <g transform="translate(575,502)">
          <ellipse cx="0" cy="10" rx="34" ry="9" fill="url(#nl-sun)" opacity="0.5" style={{ animation: "glow 2.6s ease-in-out infinite" }} />
          {[-16, -6, 6, 16].map((x, i) => <ellipse key={i} cx={x} cy="8" rx="7" ry="4" fill="#4a3a2a" />)}
          <g style={{ transformOrigin: "0px 6px", transformBox: "view-box", animation: "flick 2.8s ease-in-out infinite" }}>
            <path d="M0 8 Q-12 -6 -3 -22 Q0 -10 4 -18 Q12 -2 6 8 Z" fill="#ff8a3c" />
            <path d="M0 6 Q-6 -4 -1 -14 Q1 -6 3 -12 Q8 -2 3 6 Z" fill="#ffd36a" />
          </g>
        </g>

        {/* LE PHARAON SNÉFROU (droite) : némès rayé, pagne blanc, sceptre */}
        <g transform="translate(730,472)">
          <ellipse cx="0" cy="30" rx="24" ry="7" fill="#241608" opacity="0.45" />
          {/* pagne blanc (shendyt) */}
          <path d="M-14 30 Q-14 2 0 -2 Q14 2 14 30 Z" fill="#eee6d2" />
          <path d="M0 -2 L0 30 M-7 6 v22 M7 6 v22" stroke="#c8bc9e" strokeWidth="1.4" />
          {/* torse nu + large collier */}
          <path d="M-13 4 Q-16 -14 0 -20 Q16 -14 13 4 Q0 10 -13 4 Z" fill="#c08a4e" />
          <path d="M-11 -8 q11 7 22 0" stroke="#c89a2a" strokeWidth="3" fill="none" />
          <path d="M-9 -3 q9 5 18 0" stroke="#2f6a9a" strokeWidth="2" fill="none" opacity="0.8" />
          {/* bras d'accueil, tendu */}
          <path d="M13 -8 q16 0 22 10" stroke="#c08a4e" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          {/* le sceptre */}
          <path d="M-15 -16 L-20 34" stroke="#6e4c2e" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M-20 -18 q-5 -2 -5 -8 q5 2 5 8 M-20 -18 q5 -2 5 -8 q-5 2 -5 8" fill="#c89a2a" />
          {/* tête + némès rayé + barbe postiche */}
          <circle cx="0" cy="-30" r="9" fill="#c08a4e" />
          <path d="M-11 -32 Q-11 -44 0 -44 Q11 -44 11 -32 L9 -20 L4 -30 L-4 -30 L-9 -20 Z" fill="url(#nl-nemes)" />
          <path d="M-9 -40 h18 M-8 -36 h16 M-7 -32 h14" stroke="#2f6a9a" strokeWidth="1.6" opacity="0.8" />
          <path d="M-2 -21 L2 -21 L1 -12 Q0 -10 -1 -12 Z" fill="#2e2013" />
          <circle cx="0" cy="-44" r="2" fill="#c8382e" />
        </g>
        {queteQui === "snefrou" && (
          <g transform="translate(712,378)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
            <path d="M0 0 q0 -20 20 -20 q20 0 20 17 q0 14 -17 18 l0 6" fill="none" stroke="#ffd166" strokeWidth="4" />
            <circle cx="20" cy="31" r="2.6" fill="#ffd166" />
          </g>
        )}

        {/* LE PAPYRUS À ÉCRIRE : n'apparaît qu'une fois encre + calame + feuille prêts */}
        {pretAEcrire && !ecrit && (
          <g transform="translate(640,508)">
            <g style={{ animation: "glow 2.4s ease-in-out infinite" }}>
              <g transform="translate(-18,-92)">
                <path d="M0 0 q0 -18 18 -18 q18 0 18 15 q0 13 -16 16 l0 6" fill="none" stroke="#ffd166" strokeWidth="4" />
                <circle cx="18" cy="27" r="2.4" fill="#ffd166" />
              </g>
            </g>
            <ellipse cx="0" cy="14" rx="34" ry="9" fill="#241608" opacity="0.35" />
            {/* feuille vierge roulée + calame + pot d'encre */}
            <rect x="-30" y="-8" width="52" height="26" rx="3" fill="#e6d09a" stroke="#c8a860" strokeWidth="1.4" />
            <path d="M-26 0 h44 M-26 8 h44" stroke="#d0b878" strokeWidth="0.8" opacity="0.5" />
            <g transform="translate(26,-6) rotate(28)"><rect x="-1" y="-14" width="2.4" height="24" rx="1" fill="#c9a86a" /><path d="M-1 -14 h2.4 l-1.2 -3 Z" fill="#3a3a3a" /></g>
            <g transform="translate(30,12)"><path d="M-6 -2 Q-7 6 0 7 Q7 6 6 -2 Z" fill="#5a4636" /><ellipse cx="0" cy="-2" rx="5" ry="2.4" fill="#14141a" /></g>
          </g>
        )}

        {/* herbes de berge */}
        <g opacity="0.9">
          <path d="M-4 560 q10 -28 4 -44 M18 560 q3 -22 14 -36 M960 560 q-6 -22 2 -36 M984 560 q4 -18 12 -28" stroke="#3a4a1c" strokeWidth="4" fill="none" />
        </g>

        {/* RÉSULTAT (msg_hieroglyphes) : le papyrus couvert de hiéroglyphes,
            le cartouche de Snéfrou bien visible */}
        {ecrit && (
          <g transform="translate(650,510)" style={{ animation: "fadein 1s ease-out" }}>
            <ellipse cx="0" cy="24" rx="44" ry="8" fill="#20140a" opacity="0.4" />
            <path d="M-40 -22 Q-46 -1 -40 20 L40 20 Q46 -1 40 -22 Z" fill="#e6d09a" />
            <path d="M-40 -22 Q-46 -1 -40 20" stroke="#c8a860" strokeWidth="4" fill="none" />
            <path d="M40 -22 Q46 -1 40 20" stroke="#c8a860" strokeWidth="4" fill="none" />
            {/* le cartouche royal (cadre ovale + nom) */}
            <g transform="translate(-22,-1)">
              <rect x="-11" y="-16" width="22" height="34" rx="11" fill="none" stroke="#3a2a14" strokeWidth="2" />
              <path d="M-6 18 h12" stroke="#3a2a14" strokeWidth="2.4" />
              <g stroke="#3a2a14" strokeWidth="1.3" fill="none" strokeLinecap="round">
                <path d="M-5 -12 q5 -3 10 0" /><path d="M-5 -6 q5 -3 10 0 M-5 -4 q5 -3 10 0" /><circle cx="0" cy="2" r="2.2" /><path d="M-4 10 q4 -3 8 0" />
              </g>
            </g>
            {/* colonnes de hiéroglyphes à droite */}
            <g stroke="#3a2a14" strokeWidth="1.4" fill="none" strokeLinecap="round">
              <path d="M6 -12 q4 -3 8 0 q-4 3 -8 0" /><path d="M22 -13 v6 l-3 3" /><path d="M8 0 h7 v-5" /><circle cx="24" cy="0" r="3" />
              <path d="M6 12 q4 -4 8 0 q-4 4 -8 0" /><path d="M22 10 v-8 l3 -2" />
            </g>
          </g>
        )}
      </PLayer>

      {/* voile de grain global */}
      <rect width="1000" height="560" fill="#2a1c10" opacity="0.07" style={{ pointerEvents: "none" }} />

      {/* ═══ zones cliquables ═══ */}
      <Hotspot cx={730} cy={444} r={40} label="le pharaon Snéfrou" reveal={reveal} onClick={(p) => action("snefrou", p)} />
      {/* le mini-jeu du cartouche : seulement quand encre + calame + feuille sont prêts */}
      {pretAEcrire && !ecrit && (
        <Hotspot cx={640} cy={505} r={40} label="écrire le cartouche de Snéfrou" reveal={reveal} onClick={() => action("cartouche")} />
      )}
      {/* objets & supports */}
      <Hotspot cx={180} cy={452} r={52} label="tiges de papyrus" item="papyrus_tiges" reveal={reveal} onClick={() => collect("papyrus_tiges")} />
      <Hotspot cx={300} cy={478} r={34} label="roseaux du Nil" item="roseau_nil" reveal={reveal} onClick={() => collect("roseau_nil")} />
      <Hotspot cx={70} cy={410} r={46} label="l'acacia (sa sève)" item="acacia" reveal={reveal} onClick={() => collect("acacia")} />
      <Hotspot cx={430} cy={514} r={28} label="couteau" item="couteau" reveal={reveal} onClick={() => collect("couteau")} />
      <Hotspot cx={496} cy={516} r={26} label="bol de terre" item="bol" reveal={reveal} onClick={() => collect("bol")} />
      <Hotspot cx={575} cy={500} r={38} label="le feu" item="feu" reveal={reveal} onClick={() => collect("feu")} />
    </svg>
  );
}
