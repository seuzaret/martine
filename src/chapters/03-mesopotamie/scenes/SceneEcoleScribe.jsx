import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 3 — Tableau adjacent : L'ÉCOLE DU SCRIBE (Edubba)
   ------------------------------------------------------------
   La « maison des tablettes » (é-dubba, la plus vieille école
   du monde). Un maître ummia sévère, deux apprentis courbés
   sur leurs tablettes, un mur d'exercices ratés, un panier
   d'argile fraîche dans le coin, une brique de comptage.
   Anachronisme géré au niveau du chapitre (stylo Bic ailleurs).
   ============================================================ */

export default function SceneEcoleScribe({ collect, action, reveal, inv = [] }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ec-mur" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#b28454" /><stop offset="100%" stopColor="#8a5c2e" /></linearGradient>
        <linearGradient id="ec-sol" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7a5a34" /><stop offset="100%" stopColor="#4a3020" /></linearGradient>
        <linearGradient id="ec-argile" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c8956a" /><stop offset="100%" stopColor="#8a5f34" /></linearGradient>
        <radialGradient id="ec-lampe" cx="50%" cy="30%" r="70%"><stop offset="0%" stopColor="#ffe4a8" stopOpacity="0.85" /><stop offset="70%" stopColor="#f8b048" stopOpacity="0.4" /><stop offset="100%" stopColor="#f8a848" stopOpacity="0" /></radialGradient>
        <filter id="ec-grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" /><feColorMatrix values="0 0 0 0 0.3 0 0 0 0 0.2 0 0 0 0 0.1 0 0 0 0.4 0" /></filter>
      </defs>

      <PLayer depth={4}>
        {/* mur du fond en briques crues */}
        <rect width="1000" height="440" fill="url(#ec-mur)" />
        <rect width="1000" height="440" fill="#3a2818" opacity="0.3" filter="url(#ec-grain)" />
        {/* rangées de briques */}
        {Array.from({ length: 10 }).map((_, r) => (
          <g key={r}>
            {Array.from({ length: 14 }).map((_, c) => (
              <rect key={c} x={c * 72 + (r % 2 ? -36 : 0)} y={r * 44} width="70" height="42" fill="none" stroke="#5a3818" strokeWidth="0.5" opacity="0.6" />
            ))}
          </g>
        ))}
        {/* petite ouverture haute (fente d'aération) */}
        <rect x="60" y="60" width="120" height="30" fill="#e0b878" opacity="0.55" />
        <rect x="60" y="60" width="120" height="30" fill="none" stroke="#3a1810" strokeWidth="1.5" />
        <rect x="820" y="60" width="120" height="30" fill="#e0b878" opacity="0.55" />
        <rect x="820" y="60" width="120" height="30" fill="none" stroke="#3a1810" strokeWidth="1.5" />
        {/* halo de lampe au centre */}
        <ellipse cx="500" cy="140" rx="220" ry="80" fill="url(#ec-lampe)" />
        {/* poussière qui danse dans le rai de lumière */}
        {[[420, 120, 1.4], [480, 160, 2], [520, 100, 1.6], [560, 180, 2.2], [500, 200, 1.8]].map(([x, y, d], i) => (
          <circle key={i} cx={x} cy={y} r="1.2" fill="#f8e0a0" opacity="0.65" style={{ animation: `float ${d}s ease-in-out infinite` }} />
        ))}
        {/* lampe à huile suspendue */}
        <g transform="translate(500,60)">
          <path d="M0 0 L0 30" stroke="#3a2818" strokeWidth="0.6" />
          <path d="M-14 30 Q-14 44 -6 46 L6 46 Q14 44 14 30 Q14 24 0 22 Q-14 24 -14 30 Z" fill="#8a6828" stroke="#3a2010" strokeWidth="0.6" />
          <path d="M-8 40 Q-8 44 0 44 Q8 44 8 40" stroke="#5a3818" strokeWidth="0.4" fill="none" />
          <path d="M14 32 L22 30 L22 34" stroke="#3a2010" strokeWidth="0.4" fill="none" />
          <ellipse cx="22" cy="32" rx="2.5" ry="3.5" fill="#f8c058" opacity="0.9" />
          <ellipse cx="22" cy="30" rx="1.2" ry="2" fill="#fff4c8" opacity="0.85" />
        </g>
      </PLayer>

      <PLayer depth={3}>
        {/* MUR D'EXERCICES : rangée de tablettes accrochées, certaines cassées */}
        <g transform="translate(260,180)">
          {Array.from({ length: 6 }).map((_, i) => {
            const casse = i === 2 || i === 4;
            const x = i * 82;
            return (
              <g key={i} transform={`translate(${x},0) rotate(${(i % 2 ? -3 : 3)})`}>
                {/* corde */}
                <path d={`M18 -14 l0 -20`} stroke="#5a3818" strokeWidth="1.2" />
                {/* tablette */}
                <rect x="0" y="-10" width="60" height="72" rx="6" fill="url(#ec-argile)" stroke="#3a1810" strokeWidth="1.2" />
                {casse && <path d="M0 30 L60 40 M20 -10 L40 62" stroke="#3a1810" strokeWidth="1.2" opacity="0.85" />}
                {/* stries cunéiformes */}
                {[0, 1, 2, 3, 4].map((r) => (
                  <g key={r} transform={`translate(6,${4 + r * 10})`}>
                    <path d="M0 0 l3 -3 l3 3 M8 2 l3 -3 l3 3 M16 0 l3 -3 l3 3 M24 2 l3 -3 l3 3 M32 0 l3 -3 l3 3 M40 2 l3 -3 l3 3" stroke="#3a1810" strokeWidth="0.8" fill="none" />
                  </g>
                ))}
              </g>
            );
          })}
        </g>
        {/* étagère basse : rouleaux d'argile prête */}
        <g transform="translate(60,280)">
          <rect x="0" y="0" width="160" height="14" fill="#5a3818" stroke="#2a1810" strokeWidth="0.8" />
          {[10, 40, 70, 100, 130].map((x, i) => (
            <ellipse key={i} cx={x + 8} cy="-4" rx="12" ry="6" fill="url(#ec-argile)" stroke="#3a1810" strokeWidth="0.6" />
          ))}
        </g>
      </PLayer>

      <PLayer depth={2}>
        {/* SOL de terre battue */}
        <rect y="440" width="1000" height="120" fill="url(#ec-sol)" />
        <rect y="440" width="1000" height="120" fill="#2a1810" opacity="0.25" filter="url(#ec-grain)" />
        {/* tapis / natte au sol devant les élèves — tressage détaillé */}
        <ellipse cx="500" cy="500" rx="380" ry="34" fill="#5a3820" opacity="0.75" />
        {/* motif tressage */}
        {Array.from({ length: 40 }).map((_, i) => (
          <path key={i} d={`M${140 + i * 18} 486 q6 4 12 0 q6 -4 12 0`} stroke="#3a2010" strokeWidth="0.4" fill="none" opacity="0.55" />
        ))}
        {Array.from({ length: 40 }).map((_, i) => (
          <path key={`b${i}`} d={`M${140 + i * 18} 512 q6 4 12 0 q6 -4 12 0`} stroke="#3a2010" strokeWidth="0.4" fill="none" opacity="0.55" />
        ))}
        {/* franges tapis */}
        <path d="M120 500 v6 M132 500 v6 M144 500 v6 M156 500 v6 M844 500 v6 M856 500 v6 M868 500 v6 M880 500 v6" stroke="#3a2010" strokeWidth="0.8" />
        {/* poussière au sol */}
        <ellipse cx="700" cy="530" rx="40" ry="4" fill="#3a2010" opacity="0.25" />
        <ellipse cx="300" cy="530" rx="30" ry="3" fill="#3a2010" opacity="0.2" />
      </PLayer>

      <PLayer depth={1}>
        {/* LE MAÎTRE UMMIA (assis au centre-droit, sur natte, canne posée) */}
        <g transform="translate(680,470)">
          {/* ombre */}
          <ellipse cx="0" cy="26" rx="34" ry="5" fill="#0a0604" opacity="0.5" />
          {/* jambes croisées */}
          <path d="M-30 20 Q-20 8 -6 12 L18 24 Q28 28 24 30 L-24 30 Q-32 28 -30 20 Z" fill="#5a3818" stroke="#2a1810" strokeWidth="0.6" />
          {/* tunique blanche à franges */}
          <path d="M-22 20 Q-20 -16 0 -22 Q20 -16 22 20 Z" fill="#e8dcc0" stroke="#5a3818" strokeWidth="0.6" />
          <path d="M-22 20 l0 4 M-14 20 l0 4 M-6 20 l0 4 M2 20 l0 4 M10 20 l0 4 M18 20 l0 4" stroke="#8a6a48" strokeWidth="1.2" strokeLinecap="round" />
          {/* épaules */}
          <ellipse cx="-18" cy="-8" rx="6" ry="5" fill="#c8946a" />
          <ellipse cx="18" cy="-8" rx="6" ry="5" fill="#c8946a" />
          {/* tête */}
          <ellipse cx="0" cy="-30" rx="14" ry="16" fill="#c8946a" stroke="#5a3818" strokeWidth="0.6" />
          {/* crâne rasé + barbe soignée noire bouclée (mode sumérienne) */}
          <path d="M-12 -30 q-2 -12 6 -14 q6 4 6 -2 q4 6 8 -2 q4 6 4 14" stroke="#2a1a10" strokeWidth="1.5" fill="none" />
          <path d="M-9 -22 q3 10 9 10 q6 0 9 -10 q1 4 -1 12 q-4 4 -8 3 q-6 1 -8 -3 q-2 -8 -1 -12 z" fill="#1a1408" />
          {/* boucles de la barbe */}
          <path d="M-6 -14 q2 3 4 0 M0 -12 q2 3 4 0 M-2 -18 q2 3 4 0" stroke="#2a1a10" strokeWidth="0.5" fill="none" />
          {/* traits sévères */}
          <circle cx="-4" cy="-30" r="1.6" fill="#0a0806" />
          <circle cx="4" cy="-30" r="1.6" fill="#0a0806" />
          <path d="M-7 -34 q3 -2 5 0 M2 -34 q3 -2 5 0" stroke="#2a1a10" strokeWidth="0.8" fill="none" />
          {/* bras qui tient une canne */}
          <path d="M22 -8 L46 22" stroke="#c8946a" strokeWidth="4" strokeLinecap="round" />
          <path d="M46 22 L54 44" stroke="#3a2418" strokeWidth="3" strokeLinecap="round" />
        </g>
        {/* « ? » de dialogue au-dessus du maître */}
        <g transform="translate(680,412)" style={{ animation: "float 2s ease-in-out infinite" }}>
          <circle r="14" fill="#ffd166" stroke="#8a5a20" strokeWidth="2" />
          <text y="5" textAnchor="middle" fontSize="18" fontWeight="800" fill="#3a2410">?</text>
        </g>

        {/* 2 APPRENTIS courbés sur leur tablette (à gauche) */}
        {[[260, 480], [360, 484]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <ellipse cx="0" cy="22" rx="24" ry="4" fill="#0a0604" opacity="0.5" />
            {/* jambes croisées */}
            <path d="M-20 16 Q-14 6 -4 10 L14 20 Q22 24 18 26 L-18 26 Q-24 24 -20 16 Z" fill="#6a4028" />
            {/* buste courbé en avant */}
            <path d="M-14 18 Q-18 -10 -2 -16 Q14 -10 18 12 Q10 20 -6 20 Z" fill={i === 0 ? "#c8a848" : "#a86828"} stroke="#3a2010" strokeWidth="0.5" />
            {/* tête courbée */}
            <ellipse cx="4" cy="-20" rx="9" ry="11" fill="#c8946a" transform="rotate(15 4 -20)" />
            <path d="M-3 -24 q4 -8 10 -6 q4 2 6 6" stroke="#2a1a10" strokeWidth="1.5" fill="none" />
            {/* bras qui tient calame */}
            <path d="M8 0 L18 12" stroke="#c8946a" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M18 12 L26 20" stroke="#5a3818" strokeWidth="1.2" strokeLinecap="round" />
            {/* tablette sur les genoux */}
            <rect x="6" y="18" width="26" height="18" rx="2" fill="url(#ec-argile)" stroke="#3a1810" strokeWidth="0.6" />
            <path d="M10 24 l2 -2 l2 2 M16 24 l2 -2 l2 2 M22 24 l2 -2 l2 2 M10 30 l2 -2 l2 2 M16 30 l2 -2 l2 2" stroke="#3a1810" strokeWidth="0.5" fill="none" />
          </g>
        ))}

        {/* Panier d'argile fraîche (collectable) — disparaît quand ramassé */}
        {!inv.includes("argile") && (
        <g transform="translate(120,506)">
          <ellipse cx="0" cy="20" rx="30" ry="5" fill="#0a0604" opacity="0.55" />
          {/* panier tressé */}
          <path d="M-26 0 L-22 18 L22 18 L26 0 Z" fill="#8a5c2e" stroke="#3a1810" strokeWidth="0.8" />
          <path d="M-24 4 h48 M-24 10 h48 M-24 15 h48" stroke="#5a3818" strokeWidth="0.4" />
          <path d="M-22 0 L-22 18 M-14 0 L-14 18 M-6 0 L-6 18 M2 0 L2 18 M10 0 L10 18 M18 0 L18 18" stroke="#5a3818" strokeWidth="0.4" />
          {/* mottes d'argile qui débordent */}
          <ellipse cx="-8" cy="-3" rx="10" ry="6" fill="url(#ec-argile)" stroke="#3a1810" strokeWidth="0.6" />
          <ellipse cx="8" cy="-4" rx="9" ry="5" fill="url(#ec-argile)" stroke="#3a1810" strokeWidth="0.6" />
          <ellipse cx="0" cy="-8" rx="7" ry="4" fill="url(#ec-argile)" stroke="#3a1810" strokeWidth="0.6" />
        </g>
        )}

        {/* Ephemere : boulette d'argile + tablette cassée (disparaissent au ramassage) */}
        {!inv.includes("boulette_argile") && (
        <g transform="translate(420,536)">
          <circle r="6" fill="url(#ec-argile)" stroke="#3a1810" strokeWidth="0.6" />
          <path d="M-3 -1 q3 -2 5 0" stroke="#5a3818" strokeWidth="0.4" fill="none" />
        </g>
        )}
        {!inv.includes("tablette_cassee") && (
        <g transform="translate(560,540) rotate(15)">
          <path d="M-14 -6 L10 -8 L14 6 L-8 8 Z" fill="url(#ec-argile)" stroke="#3a1810" strokeWidth="0.6" />
          <path d="M14 6 L-8 8" stroke="#2a1408" strokeWidth="1" fill="none" />
          <path d="M-10 -3 l2 -2 l2 2 M-4 -3 l2 -2 l2 2 M2 -3 l2 -2 l2 2 M-10 2 l2 -2 l2 2 M-4 2 l2 -2 l2 2" stroke="#3a1810" strokeWidth="0.5" fill="none" />
        </g>
        )}
      </PLayer>

      {/* zones cliquables */}
      <Hotspot cx={680} cy={450} r={40} label="le maître ummia" reveal={reveal} onClick={() => action("ummia")} />
      <Hotspot cx={260} cy={470} r={30} label="apprenti scribe" reveal={reveal} onClick={() => action("apprenti")} />
      <Hotspot cx={360} cy={472} r={30} label="apprenti scribe" reveal={reveal} onClick={() => action("apprenti")} />
      <Hotspot cx={470} cy={220} r={40} label="mur d'exercices" reveal={reveal} onClick={() => action("mur_exercices")} />
      <Hotspot cx={120} cy={500} r={30} label="panier d'argile fraîche" item="argile" reveal={reveal} onClick={() => collect("argile")} />
      <Hotspot cx={420} cy={536} r={12} label="boulette d'argile" item="boulette_argile" reveal={reveal} onClick={() => collect("boulette_argile")} />
      <Hotspot cx={560} cy={540} r={16} label="tablette cassée" item="tablette_cassee" reveal={reveal} onClick={() => collect("tablette_cassee")} />
    </svg>
  );
}
