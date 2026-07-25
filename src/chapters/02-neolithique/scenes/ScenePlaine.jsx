import Hotspot from "../../../engine/Hotspot.jsx";

/* ============================================================
   CHAPITRE 2 · Tableau 4 — La plaine aux mégalithes
   Une grande plaine, un fleuve à droite (argile + cailloux noirs).
   Le prêtre Imir, le tailleur Doka et ses hommes, la grande pierre
   couchée. (Art « premier jet ».)
   ============================================================ */

export default function ScenePlaine({ collect, action, reveal, made = [], queteQui }) {
  const dresse = made.includes("msg_megalithe");
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="pl-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5a7aa0" /><stop offset="60%" stopColor="#a8bcc8" /><stop offset="100%" stopColor="#d8d4bc" /></linearGradient>
        <linearGradient id="pl-land" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a9058" /><stop offset="100%" stopColor="#5a6038" /></linearGradient>
        <linearGradient id="pl-river" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8ab0b8" /><stop offset="100%" stopColor="#5a808a" /></linearGradient>
        <linearGradient id="pl-granite" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#b0aca2" /><stop offset="50%" stopColor="#86827a" /><stop offset="100%" stopColor="#5a564e" /></linearGradient>
      </defs>

      {/* ciel + collines */}
      <rect width="1000" height="560" fill="url(#pl-sky)" />
      <path d="M0 300 Q250 276 500 296 Q750 316 1000 292 L1000 360 L0 360 Z" fill="#7a8452" opacity="0.85" />
      {/* soleil pâle */}
      <circle cx="300" cy="140" r="40" fill="#ffe9a8" opacity="0.6" />

      {/* plaine */}
      <rect y="330" width="1000" height="230" fill="url(#pl-land)" />
      <ellipse cx="450" cy="480" rx="440" ry="60" fill="#3a3f22" opacity="0.25" />

      {/* LE FLEUVE, à droite */}
      <path d="M820 330 Q860 420 840 560 L1000 560 L1000 330 Z" fill="url(#pl-river)" />
      {[360, 400, 440, 480, 520].map((y, i) => <path key={i} d={`M840 ${y} q40 ${i % 2 ? 4 : -4} 80 0`} stroke="#c4d4d4" strokeWidth="1.4" fill="none" opacity="0.4" />)}
      {/* argile + cailloux sur la berge */}
      <g transform="translate(880,500)"><path d="M-18 4 Q-16 -10 0 -10 Q16 -10 18 4 Z" fill="#8a6a4a" /><ellipse cx="0" cy="4" rx="18" ry="5" fill="#7a5a3a" /></g>
      <g transform="translate(816,516)">{[[-10, 0], [2, 4], [12, -2], [-2, 8]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="4" ry="3" fill="#2c2c30" />)}</g>

      {/* un menhir déjà dressé, au loin */}
      <g transform="translate(140,360)"><path d="M-12 40 Q-16 -20 0 -46 Q16 -20 12 40 Z" fill="url(#pl-granite)" /><ellipse cx="-2" cy="-10" rx="6" ry="4" fill="#7a8a3a" opacity="0.5" /></g>

      {/* LE CHANTIER (tant que le mégalithe n'est pas dressé) */}
      {!dresse && (
        <>
          {/* la grande pierre couchée sur des rondins */}
          <g transform="translate(450,478)">
            {[-70, -20, 30, 80].map((dx, i) => <ellipse key={i} cx={dx} cy={40} rx="10" ry="8" fill="#6e4c2e" />)}
            <path d="M-100 30 L90 8 Q112 6 112 22 L110 32 Q108 42 90 42 L-98 42 Q-112 42 -100 30 Z" fill="url(#pl-granite)" />
            <path d="M-90 20 L88 2" stroke="#c8c4bc" strokeWidth="2" opacity="0.4" />
          </g>
          {/* les hommes de Doka, prêts à tirer */}
          <g transform="translate(640,462)">
            {[0, 30, 60].map((dx, i) => (
              <g key={i} transform={`translate(${dx},${(i % 2) * 6})`}>
                <path d="M-6 6 Q-10 -12 4 -15 Q14 -12 8 6 L6 24 L-8 24 Z" fill={i % 2 ? "#7a4f34" : "#6a4a30"} transform="rotate(-12)" />
                <circle cx="-4" cy="-18" r="6" fill="#8a5c3c" />
              </g>
            ))}
            <path d="M-14 -6 L86 0" stroke="#8a6a42" strokeWidth="3" fill="none" opacity="0.8" />
          </g>
        </>
      )}

      {/* LE MÉGALITHE DRESSÉ (résultat de msg_megalithe) */}
      {dresse && (
        <g transform="translate(452,494)" style={{ animation: "fadein 1s ease-out" }}>
          <ellipse cx="-6" cy="4" rx="60" ry="13" fill="#3a3f22" opacity="0.4" />
          <path d="M-44 2 Q-54 -70 -44 -152 Q-38 -224 -12 -244 Q14 -250 30 -226 Q46 -166 42 -82 Q46 -22 38 2 Z" fill="url(#pl-granite)" />
          <path d="M38 0 Q46 -70 42 -146 Q38 -220 18 -240" stroke="#eceae0" strokeWidth="3" fill="none" opacity="0.45" />
          {/* symboles gravés (spirales + chevrons) */}
          <g fill="none" strokeLinecap="round" stroke="#3f3c34" strokeWidth="3" opacity="0.8">
            <path d="M-8 -68 a6 6 0 1 1 -9 3 a13 13 0 1 1 18 -5 a20 20 0 1 1 -28 8" />
            <path d="M6 -150 a5 5 0 1 1 -7 3 a11 11 0 1 1 15 -4 a17 17 0 1 1 -23 7" />
            <path d="M-22 -108 l14 -8 l14 8 M-22 -99 l14 -8 l14 8" strokeWidth="2.3" opacity="0.7" />
          </g>
          <ellipse cx="-28" cy="-40" rx="12" ry="6" fill="#7a8a3a" opacity="0.45" />
        </g>
      )}

      {/* IMIR le prêtre (bras levés, robe claire) */}
      <g transform="translate(300,472)">
        <ellipse cx="0" cy="28" rx="22" ry="6" fill="#2a1c10" opacity="0.4" />
        <path d="M-15 28 Q-19 -4 0 -20 Q19 -4 15 28 Z" fill="#e6dccc" />
        <path d="M-15 28 Q-8 4 0 -18" stroke="#8a2438" strokeWidth="3" fill="none" />
        <circle cx="0" cy="-28" r="9" fill="#c89a6e" />
        <path d="M-9 -30 q9 -10 18 0 Z" fill="#8a8078" />
        {/* bras levés vers le ciel */}
        <path d="M-12 -6 q-14 -8 -16 -24 M12 -6 q14 -8 16 -24" stroke="#c89a6e" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      {queteQui === "imir" && (
        <g transform="translate(282,372)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
          <path d="M0 0 q0 -20 20 -20 q20 0 20 17 q0 14 -17 18 l0 6" fill="none" stroke="#ffd166" strokeWidth="4" />
          <circle cx="20" cy="31" r="2.6" fill="#ffd166" />
        </g>
      )}

      {/* DOKA le tailleur (accroupi près de la pierre, un maillet) */}
      <g transform="translate(560,484)">
        <ellipse cx="0" cy="22" rx="20" ry="6" fill="#2a1c10" opacity="0.4" />
        <path d="M-12 22 Q-16 -2 0 -14 Q16 -2 12 22 Z" fill="#6a4a30" />
        <circle cx="0" cy="-20" r="8" fill="#b0855c" />
        <path d="M-8 -23 q8 -8 16 0 Z" fill="#3a2a1c" />
        <path d="M10 -6 q12 2 14 12" stroke="#b0855c" strokeWidth="4" fill="none" strokeLinecap="round" />
        <g transform="translate(24,8)"><rect x="-6" y="-6" width="12" height="10" rx="2" fill="#8a5a34" /><rect x="-2" y="4" width="4" height="10" fill="#5a3f24" /></g>
      </g>
      {queteQui === "doka" && (
        <g transform="translate(542,388)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
          <path d="M0 0 q0 -20 20 -20 q20 0 20 17 q0 14 -17 18 l0 6" fill="none" stroke="#ffd166" strokeWidth="4" />
          <circle cx="20" cy="31" r="2.6" fill="#ffd166" />
        </g>
      )}

      <rect width="1000" height="560" fill="#1a1c14" opacity="0.05" style={{ pointerEvents: "none" }} />

      {/* zones cliquables — personnages */}
      <Hotspot cx={300} cy={448} r={40} label="Imir, le prêtre" reveal={reveal} onClick={(p) => action("imir", p)} />
      <Hotspot cx={560} cy={462} r={38} label="Doka, le tailleur" reveal={reveal} onClick={(p) => action("doka", p)} />
      {/* objets + supports (le chantier disparaît une fois dressé) */}
      {!dresse && <Hotspot cx={450} cy={500} r={70} label="grande pierre" item="grande_pierre" reveal={reveal} onClick={() => collect("grande_pierre")} />}
      {!dresse && <Hotspot cx={670} cy={462} r={60} label="les hommes" item="hommes" reveal={reveal} onClick={() => collect("hommes")} />}
      <Hotspot cx={880} cy={500} r={34} label="argile" item="argile" reveal={reveal} onClick={() => collect("argile")} />
      <Hotspot cx={816} cy={514} r={30} label="cailloux noirs" item="cailloux" reveal={reveal} onClick={() => collect("cailloux")} />
    </svg>
  );
}
