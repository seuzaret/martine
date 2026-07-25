import Hotspot from "../../../engine/Hotspot.jsx";

/* ============================================================
   CHAPITRE 2 · Tableau 5 — La mine de cuivre, en montagne
   Un filon de cuivre (malachite verte), une pierre à marteler,
   un feu avec un animal à la broche (→ os + suie). Ötzi creuse,
   à côté sa hache de silex et un bol d'argile. (Art « premier jet ».)
   ============================================================ */

export default function SceneMontagne({ collect, action, reveal, made = [], queteQui }) {
  const soigne = made.includes("msg_tatouage");
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="mo-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4a6a90" /><stop offset="60%" stopColor="#9ab0c0" /><stop offset="100%" stopColor="#cfd4c8" /></linearGradient>
        <linearGradient id="mo-rock" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#8a827a" /><stop offset="60%" stopColor="#5e564e" /><stop offset="100%" stopColor="#3e3830" /></linearGradient>
        <linearGradient id="mo-snow" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f4f6f8" /><stop offset="100%" stopColor="#cdd6dc" /></linearGradient>
        <radialGradient id="mo-fire" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffc068" stopOpacity="0.6" /><stop offset="100%" stopColor="#ff9540" stopOpacity="0" /></radialGradient>
      </defs>

      {/* ciel froid */}
      <rect width="1000" height="560" fill="url(#mo-sky)" />
      {/* sommets enneigés au loin */}
      <path d="M0 300 L160 150 L300 280 L460 120 L640 290 L820 160 L1000 300 L1000 360 L0 360 Z" fill="#6a7280" opacity="0.6" />
      <path d="M460 120 L440 168 L500 160 L480 120 Z M160 150 L146 188 L190 184 Z M820 160 L804 196 L848 192 Z" fill="url(#mo-snow)" opacity="0.9" />

      {/* la paroi de la montagne + l'entrée de mine (gauche) */}
      <path d="M0 560 L0 200 Q120 180 200 260 Q280 340 240 440 Q300 500 260 560 Z" fill="url(#mo-rock)" />
      <path d="M60 430 Q56 340 120 320 Q184 336 180 430 Z" fill="#1a140e" />
      <path d="M64 430 Q62 350 120 332" stroke="#a89e90" strokeWidth="2" fill="none" opacity="0.3" />

      {/* sol pierreux */}
      <rect y="440" width="1000" height="120" fill="#6a5e4e" />
      <rect y="440" width="1000" height="120" fill="#3a3226" opacity="0.4" />
      <ellipse cx="560" cy="500" rx="420" ry="46" fill="#241c12" opacity="0.3" />

      {/* LE FILON DE CUIVRE (malachite verte dans la roche) */}
      <g transform="translate(220,470)">
        <path d="M-30 20 L-20 -18 L30 -24 L34 18 Z" fill="#5a564e" />
        {[[-10, -6], [6, 2], [-2, 10], [16, -10], [22, 6]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="7" ry="5" fill="#3a8a5a" opacity="0.85" />)}
        <path d="M-8 -4 q6 -4 12 0 M-4 6 q5 -3 10 -1" stroke="#5ec88a" strokeWidth="2" fill="none" opacity="0.8" />
      </g>

      {/* LA PIERRE À MARTELER (enclume) */}
      <g transform="translate(380,504)">
        <ellipse cx="0" cy="10" rx="30" ry="9" fill="#241c12" opacity="0.5" />
        <path d="M-26 8 Q-30 -8 -12 -12 L16 -12 Q30 -10 28 6 Q26 12 12 12 L-14 12 Q-26 12 -26 8 Z" fill="#8a8278" />
        <ellipse cx="4" cy="-8" rx="10" ry="6" fill="#6a6258" />
      </g>

      {/* LE FEU + l'animal à la broche */}
      <g transform="translate(760,486)">
        <ellipse cx="0" cy="30" rx="70" ry="20" fill="url(#mo-fire)" style={{ animation: "glow 2.6s ease-in-out infinite" }} />
        {/* fourche gauche + droite */}
        <path d="M-46 30 l-4 -30 M-50 0 l8 6 M-50 0 l0 -8 M46 30 l4 -30 M50 0 l-8 6 M50 0 l0 -8" stroke="#4a3018" strokeWidth="3" strokeLinecap="round" />
        {/* la broche + l'animal */}
        <path d="M-54 -2 L54 -2" stroke="#8a8c92" strokeWidth="2.4" />
        <ellipse cx="0" cy="-2" rx="26" ry="12" fill="#7a4a2e" />
        <path d="M-18 -2 q18 -6 36 0" stroke="#5a3520" strokeWidth="1.4" fill="none" opacity="0.6" />
        {/* flammes */}
        <g style={{ transformOrigin: "0px 24px", transformBox: "view-box", animation: "flick 0.9s ease-in-out infinite" }}>
          <path d="M0 26 Q-16 6 -4 -18 Q0 -4 5 -14 Q16 4 8 24 Z" fill="#ff7f24" />
          <path d="M0 24 Q-7 8 -2 -8 Q1 0 3 -6 Q9 4 3 22 Z" fill="#ffd36a" />
        </g>
        {/* le bol d'argile posé DANS la fumée, qui recueille la suie */}
        <g transform="translate(0,-28)"><path d="M-10 -4 Q-11 6 0 7 Q11 6 10 -4 Z" fill="#8a6a4a" /><ellipse cx="0" cy="-4" rx="9" ry="3.5" fill="#5a4636" /></g>
      </g>

      {/* ÖTZI, accroupi, sa hache de cuivre, épuisé (ou soulagé) */}
      <g transform="translate(540,486)">
        <ellipse cx="0" cy="24" rx="22" ry="6" fill="#241c12" opacity="0.5" />
        {/* fourrure */}
        <path d="M-14 24 Q-20 -2 0 -18 Q20 -2 14 24 Z" fill="#6a5238" />
        <path d="M-14 4 Q0 10 14 4 L12 14 Q0 20 -12 14 Z" fill="#5a4630" />
        {/* tête sous un capuchon */}
        <path d="M-10 -16 Q0 -28 10 -16 Q11 -8 0 -6 Q-11 -8 -10 -16 Z" fill="#7a6244" />
        <circle cx="0" cy="-15" r="6" fill="#b08a68" />
        {/* haleine dans le froid */}
        <ellipse cx="11" cy="-13" rx="8" ry="3.5" fill="#f0f4f8" opacity="0.5" style={{ animation: "drift 3.5s ease-in-out infinite" }} />
        {/* jambe qui dépasse (nu) — c'est là que se posent les tatouages */}
        <path d="M-8 22 l-4 18" stroke="#b08a68" strokeWidth="6" strokeLinecap="round" />
        {soigne && (
          <g stroke="#20202a" strokeWidth="1.6" strokeLinecap="round" style={{ animation: "fadein 1s ease-out" }}>
            <path d="M-14 30 h6 M-14 33 h6 M-14 36 h6" />
            <path d="M-11 40 l4 4 M-7 40 l-4 4" />
          </g>
        )}
        {/* la hache posée à côté */}
        <g transform="translate(20,20) rotate(20)"><path d="M-14 0 L10 -3" stroke="#6e4c2e" strokeWidth="4" strokeLinecap="round" /><path d="M8 -8 L18 -4 L14 4 L6 0 Z" fill="#c87838" /></g>
      </g>
      {queteQui === "otzi" && (
        <g transform="translate(522,388)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
          <path d="M0 0 q0 -20 20 -20 q20 0 20 17 q0 14 -17 18 l0 6" fill="none" stroke="#ffd166" strokeWidth="4" />
          <circle cx="20" cy="31" r="2.6" fill="#ffd166" />
        </g>
      )}

      {/* une hache de silex + un os posés au sol */}
      <g transform="translate(470,516)"><path d="M-12 2 L8 -2" stroke="#6e4c2e" strokeWidth="4" strokeLinecap="round" /><path d="M6 -6 L16 -3 L13 5 L4 2 Z" fill="#8d8d97" stroke="#dfe3ec" strokeWidth="1" /></g>
      <g transform="translate(640,520)"><path d="M-14 0 q14 -6 28 0" stroke="#e8e0cc" strokeWidth="6" fill="none" strokeLinecap="round" /></g>

      <rect width="1000" height="560" fill="#141810" opacity="0.06" style={{ pointerEvents: "none" }} />

      {/* zones cliquables — Ötzi + objets/supports */}
      <Hotspot cx={540} cy={464} r={40} label="Ötzi, le mineur" reveal={reveal} onClick={(p) => action("otzi", p)} />
      <Hotspot cx={220} cy={468} r={44} label="filon de cuivre" item="minerai" reveal={reveal} onClick={() => collect("minerai")} />
      <Hotspot cx={380} cy={498} r={38} label="pierre à marteler" item="pierre_marteler" reveal={reveal} onClick={() => collect("pierre_marteler")} />
      <Hotspot cx={760} cy={484} r={50} label="le feu" item="feu" reveal={reveal} onClick={() => collect("feu")} />
      <Hotspot cx={760} cy={456} r={22} label="bol d'argile" item="bol" reveal={reveal} onClick={() => collect("bol")} />
      <Hotspot cx={470} cy={514} r={28} label="éclat de silex" item="silex" reveal={reveal} onClick={() => collect("silex")} />
      <Hotspot cx={640} cy={518} r={26} label="os" item="os" reveal={reveal} onClick={() => collect("os")} />
    </svg>
  );
}
