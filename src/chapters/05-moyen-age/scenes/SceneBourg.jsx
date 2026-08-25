import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 5 — Tableau adjacent : LA PLACE DU BOURG
   ------------------------------------------------------------
   Le cœur d'une petite ville médiévale. Maisons à colombages,
   enseignes des artisans (tavernier, boulanger, apothicaire),
   crieur public sur son estrade, un moine mendiant, une charrette
   de foin, poules qui picorent, mât de la halle au centre.
   ============================================================ */

export default function SceneBourg({ collect, action, reveal }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="bg-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a8b8c8" /><stop offset="100%" stopColor="#e0d0a8" /></linearGradient>
        <linearGradient id="bg-mur" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e8d0a8" /><stop offset="100%" stopColor="#c8a878" /></linearGradient>
        <linearGradient id="bg-bois" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6a4020" /><stop offset="100%" stopColor="#3a2010" /></linearGradient>
        <linearGradient id="bg-sol" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a08858" /><stop offset="100%" stopColor="#5a4830" /></linearGradient>
        <linearGradient id="bg-toit" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a4028" /><stop offset="100%" stopColor="#5a2818" /></linearGradient>
      </defs>

      <PLayer depth={5}>
        <rect width="1000" height="360" fill="url(#bg-sky)" />
        {/* nuages */}
        <ellipse cx="240" cy="80" rx="90" ry="7" fill="#f0e0c0" opacity="0.55" />
        <ellipse cx="620" cy="110" rx="110" ry="8" fill="#f0e0c0" opacity="0.5" />
        {/* Fumées qui montent des cheminées cachées derrière les toits */}
        <g style={{ animation: "float 4s ease-in-out infinite" }} opacity="0.65">
          <ellipse cx="140" cy="220" rx="10" ry="18" fill="#c8b8a0" />
          <ellipse cx="150" cy="200" rx="14" ry="16" fill="#a89880" opacity="0.7" />
          <ellipse cx="140" cy="180" rx="18" ry="14" fill="#c8b8a0" opacity="0.55" />
        </g>
        <g style={{ animation: "float 5s ease-in-out infinite" }} opacity="0.55">
          <ellipse cx="480" cy="220" rx="8" ry="14" fill="#c8b8a0" />
          <ellipse cx="486" cy="204" rx="12" ry="12" fill="#a89880" opacity="0.7" />
        </g>
        {/* volée de corbeaux autour du clocher */}
        <g opacity="0.7" transform="translate(680,180)" style={{ animation: "float 4s ease-in-out infinite" }}>
          <path d="M0 0 q-3 -3 -6 0 M0 0 q3 -3 6 0" stroke="#0a0806" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M20 8 q-3 -3 -6 0 M20 8 q3 -3 6 0" stroke="#0a0806" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M-16 12 q-3 -3 -6 0 M-16 12 q3 -3 6 0" stroke="#0a0806" strokeWidth="1" fill="none" strokeLinecap="round" />
        </g>
        {/* clocher de l'église au fond */}
        <g transform="translate(700,200)">
          <rect x="-24" y="0" width="48" height="150" fill="#a89880" stroke="#3a2818" strokeWidth="0.8" />
          <path d="M-24 0 L0 -60 L24 0 Z" fill="#5a2818" stroke="#2a1408" strokeWidth="0.8" />
          <rect x="-4" y="-64" width="8" height="20" fill="#3a2010" />
          <path d="M0 -84 L-6 -74 L0 -80 L6 -74 Z" fill="#c8a848" stroke="#5a3818" strokeWidth="0.5" />
          {/* ouvertures */}
          <path d="M-12 30 L-4 30 L-4 50 Q-8 54 -12 50 Z M12 30 L4 30 L4 50 Q8 54 12 50 Z" fill="#2a1810" />
          <circle cx="0" cy="80" r="8" fill="#2a1810" stroke="#8a6828" strokeWidth="1" />
        </g>
      </PLayer>

      <PLayer depth={4}>
        {/* MAISON À COLOMBAGES à gauche (tavernier) */}
        <g transform="translate(160,400)">
          {/* toit pentu */}
          <path d="M-90 -100 L-90 -60 L-70 -80 L-50 -60 L-30 -80 L-10 -60 L10 -80 L30 -60 L50 -80 L70 -60 L90 -100 Z" fill="none" />
          <path d="M-100 -110 L90 -110 L60 -160 L-70 -160 Z" fill="url(#bg-toit)" stroke="#2a1408" strokeWidth="1" />
          {/* tuiles écailles */}
          {[-72, -52, -32, -12, 8, 28, 48, 68].map((x, i) => (
            <path key={i} d={`M${x} -140 q4 -4 8 0`} stroke="#3a1810" strokeWidth="0.5" fill="none" />
          ))}
          {/* corps du bâtiment beige clair */}
          <rect x="-100" y="-110" width="200" height="110" fill="url(#bg-mur)" stroke="#5a3818" strokeWidth="0.6" />
          {/* colombages en X et croix */}
          <path d="M-100 -60 L100 -60" stroke="url(#bg-bois)" strokeWidth="6" />
          <path d="M-90 -110 L-90 -60 M-50 -110 L-50 -60 M0 -110 L0 -60 M50 -110 L50 -60 M90 -110 L90 -60" stroke="url(#bg-bois)" strokeWidth="4" />
          <path d="M-90 -60 L-50 -110 M-50 -60 L0 -110 M50 -60 L0 -110 M50 -60 L90 -110" stroke="url(#bg-bois)" strokeWidth="3" opacity="0.85" />
          {/* fenêtres */}
          <rect x="-80" y="-100" width="20" height="24" fill="#3a2818" stroke="#6a4020" strokeWidth="0.8" />
          <path d="M-70 -100 L-70 -76 M-80 -88 L-60 -88" stroke="#6a4020" strokeWidth="0.6" />
          <rect x="60" y="-100" width="20" height="24" fill="#3a2818" stroke="#6a4020" strokeWidth="0.8" />
          <path d="M70 -100 L70 -76 M60 -88 L80 -88" stroke="#6a4020" strokeWidth="0.6" />
          {/* porte */}
          <path d="M-10 0 L-10 -50 Q-10 -60 0 -60 Q10 -60 10 -50 L10 0 Z" fill="#5a3818" stroke="#2a1408" strokeWidth="0.8" />
          <circle cx="6" cy="-30" r="1.4" fill="#c8a848" />
          {/* enseigne pendante du tavernier : chope de bière */}
          <path d="M-30 -60 L-30 -74" stroke="#3a2010" strokeWidth="1.4" />
          <rect x="-42" y="-88" width="26" height="16" fill="#8a5828" stroke="#3a1810" strokeWidth="0.8" />
          <text x="-29" y="-77" textAnchor="middle" fontSize="10" fontWeight="700" fill="#f0e0c0">🍺</text>
        </g>

        {/* MAISON À COLOMBAGES à droite (apothicaire) */}
        <g transform="translate(860,400)">
          <path d="M-90 -110 L90 -110 L60 -160 L-70 -160 Z" fill="url(#bg-toit)" stroke="#2a1408" strokeWidth="1" />
          <rect x="-90" y="-110" width="180" height="110" fill="url(#bg-mur)" stroke="#5a3818" strokeWidth="0.6" />
          <path d="M-90 -60 L90 -60" stroke="url(#bg-bois)" strokeWidth="6" />
          <path d="M-80 -110 L-80 -60 M-40 -110 L-40 -60 M0 -110 L0 -60 M40 -110 L40 -60 M80 -110 L80 -60" stroke="url(#bg-bois)" strokeWidth="4" />
          <path d="M-80 -60 L-40 -110 M-40 -60 L0 -110 M40 -60 L0 -110 M40 -60 L80 -110" stroke="url(#bg-bois)" strokeWidth="3" opacity="0.85" />
          <rect x="-70" y="-100" width="20" height="24" fill="#3a2818" stroke="#6a4020" strokeWidth="0.8" />
          <rect x="50" y="-100" width="20" height="24" fill="#3a2818" stroke="#6a4020" strokeWidth="0.8" />
          <path d="M-10 0 L-10 -50 Q-10 -60 0 -60 Q10 -60 10 -50 L10 0 Z" fill="#5a3818" stroke="#2a1408" strokeWidth="0.8" />
          {/* enseigne : mortier & pilon */}
          <path d="M-30 -60 L-30 -74" stroke="#3a2010" strokeWidth="1.4" />
          <rect x="-42" y="-88" width="26" height="16" fill="#a08858" stroke="#3a1810" strokeWidth="0.8" />
          <text x="-29" y="-77" textAnchor="middle" fontSize="10" fontWeight="700" fill="#3a1810">⚗</text>
        </g>

        {/* MAISON À COLOMBAGES centrale plus petite (boulanger) */}
        <g transform="translate(500,380)">
          <path d="M-70 -100 L70 -100 L50 -140 L-50 -140 Z" fill="url(#bg-toit)" stroke="#2a1408" strokeWidth="1" />
          <rect x="-70" y="-100" width="140" height="100" fill="url(#bg-mur)" stroke="#5a3818" strokeWidth="0.6" />
          <path d="M-70 -50 L70 -50" stroke="url(#bg-bois)" strokeWidth="5" />
          <path d="M-60 -100 L-60 -50 M-20 -100 L-20 -50 M20 -100 L20 -50 M60 -100 L60 -50" stroke="url(#bg-bois)" strokeWidth="3.5" />
          <path d="M-60 -50 L-20 -100 M-20 -50 L20 -100 M20 -50 L60 -100" stroke="url(#bg-bois)" strokeWidth="2.5" opacity="0.85" />
          <rect x="-50" y="-90" width="16" height="20" fill="#3a2818" />
          <rect x="34" y="-90" width="16" height="20" fill="#3a2818" />
          <path d="M-6 0 L-6 -42 Q-6 -50 0 -50 Q6 -50 6 -42 L6 0 Z" fill="#5a3818" />
          {/* enseigne bretzel */}
          <path d="M-24 -50 L-24 -64" stroke="#3a2010" strokeWidth="1.4" />
          <rect x="-36" y="-78" width="24" height="14" fill="#e0c088" stroke="#3a1810" strokeWidth="0.8" />
          <text x="-24" y="-67" textAnchor="middle" fontSize="9" fontWeight="700" fill="#5a3010">🥨</text>
        </g>
      </PLayer>

      <PLayer depth={3}>
        {/* SOL empierré */}
        <rect y="440" width="1000" height="120" fill="url(#bg-sol)" />
        {/* pavés inégaux */}
        {Array.from({ length: 30 }).map((_, i) => {
          const x = (i * 35) % 1000;
          const y = 440 + Math.floor(i / 20) * 60;
          return <path key={i} d={`M${x} ${y} l30 0 l-3 20 l-27 0 z`} fill="none" stroke="#3a2010" strokeWidth="0.4" opacity="0.5" />;
        })}
        {/* PUITS au centre */}
        <g transform="translate(500,470)">
          <ellipse cx="0" cy="34" rx="30" ry="4" fill="#0a0604" opacity="0.55" />
          {/* margelle */}
          <path d="M-24 20 Q-30 6 -18 -6 Q0 -14 18 -6 Q30 6 24 20 L20 30 Q0 34 -20 30 Z" fill="#8a7860" stroke="#3a2818" strokeWidth="1" />
          {/* eau sombre */}
          <ellipse cx="0" cy="-4" rx="18" ry="6" fill="#2a3040" stroke="#3a2818" strokeWidth="0.6" />
          {/* arceau + poulie */}
          <path d="M-24 -6 L-24 -40 L24 -40 L24 -6" stroke="#3a2010" strokeWidth="2" fill="none" />
          <circle cx="0" cy="-40" r="4" fill="#8a5828" stroke="#3a1810" strokeWidth="0.6" />
          {/* corde + seau */}
          <path d="M0 -40 L0 -18" stroke="#8a7048" strokeWidth="0.8" />
        </g>
      </PLayer>

      <PLayer depth={2}>
        {/* CHARRETTE de foin */}
        <g transform="translate(240,510)">
          <ellipse cx="0" cy="30" rx="50" ry="4" fill="#0a0604" opacity="0.55" />
          {/* plateau */}
          <rect x="-40" y="0" width="80" height="14" fill="#8a5a2e" stroke="#2a1810" strokeWidth="0.8" />
          {/* foin */}
          <path d="M-38 0 Q-30 -30 -10 -32 Q10 -34 30 -30 Q38 -20 38 0 Z" fill="#e0c078" stroke="#5a3818" strokeWidth="0.5" />
          <path d="M-30 -20 l4 -8 M-10 -30 l2 -8 M10 -32 l-2 -8 M20 -28 l4 -8" stroke="#8a6828" strokeWidth="0.6" fill="none" />
          {/* roues */}
          <circle cx="-24" cy="18" r="10" fill="#5a3818" stroke="#2a1408" strokeWidth="0.8" />
          <circle cx="-24" cy="18" r="4" fill="#3a2010" />
          <path d="M-24 8 v20 M-34 18 h20" stroke="#3a2010" strokeWidth="0.8" />
          <circle cx="24" cy="18" r="10" fill="#5a3818" stroke="#2a1408" strokeWidth="0.8" />
          <circle cx="24" cy="18" r="4" fill="#3a2010" />
          <path d="M24 8 v20 M14 18 h20" stroke="#3a2010" strokeWidth="0.8" />
        </g>
        {/* CHIEN qui dort près de la taverne */}
        <g transform="translate(320,530)">
          <ellipse cx="0" cy="8" rx="24" ry="4" fill="#0a0604" opacity="0.5" />
          <ellipse cx="0" cy="0" rx="20" ry="8" fill="#8a5a2e" stroke="#2a1408" strokeWidth="0.5" />
          <ellipse cx="-16" cy="-2" rx="8" ry="6" fill="#8a5a2e" stroke="#2a1408" strokeWidth="0.5" />
          {/* oreille tombante */}
          <path d="M-22 -6 q-6 4 -2 8 q4 -2 4 -6 Z" fill="#5a3818" />
          {/* pattes */}
          <path d="M-8 6 v6 M-2 6 v6 M6 6 v6 M12 6 v6" stroke="#5a3818" strokeWidth="2" strokeLinecap="round" />
          {/* queue */}
          <path d="M18 -2 q6 -2 8 4" stroke="#8a5a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Zzz au-dessus */}
          <text x="14" y="-14" fontSize="8" fontFamily="Georgia, serif" fill="#5a3818" opacity="0.65">z</text>
          <text x="20" y="-20" fontSize="6" fontFamily="Georgia, serif" fill="#5a3818" opacity="0.55">z</text>
        </g>

        {/* poules qui picorent */}
        {[[600, 520, 1], [640, 528, -1], [420, 530, 1]].map(([x, y, dir], i) => (
          <g key={i} transform={`translate(${x},${y}) scale(${dir},1)`}>
            <ellipse cx="0" cy="0" rx="8" ry="6" fill="#f0e0c0" stroke="#5a3818" strokeWidth="0.5" />
            <path d="M-8 -2 q-4 -2 -4 2" stroke="#5a3818" strokeWidth="0.5" fill="none" />
            <circle cx="-10" cy="-3" r="3" fill="#f0e0c0" stroke="#5a3818" strokeWidth="0.4" />
            <path d="M-13 -4 l-1 -2 M-13 -4 l1 -2" stroke="#8a2818" strokeWidth="0.4" />
            <path d="M-13 -2 l-2 0" stroke="#e08040" strokeWidth="0.8" strokeLinecap="round" />
            <circle cx="-11" cy="-3" r="0.4" fill="#0a0806" />
            <path d="M-2 5 l-1 4 M2 5 l1 4" stroke="#5a3818" strokeWidth="0.5" />
          </g>
        ))}
      </PLayer>

      <PLayer depth={1}>
        {/* CRIEUR PUBLIC sur son estrade avec parchemin ouvert */}
        <g transform="translate(700,485)">
          {/* estrade */}
          <rect x="-24" y="30" width="48" height="20" fill="#8a5a2e" stroke="#3a1810" strokeWidth="0.6" />
          <ellipse cx="0" cy="50" rx="30" ry="3" fill="#0a0604" opacity="0.55" />
          {/* jambes en collants (chausses) */}
          <path d="M-6 30 L-6 4 M6 30 L6 4" stroke="#c85028" strokeWidth="6" strokeLinecap="round" />
          {/* pourpoint vert */}
          <path d="M-14 8 Q-16 -14 0 -20 Q16 -14 14 8 Z" fill="#3a5828" stroke="#1a2810" strokeWidth="0.6" />
          {/* ceinture à boucle */}
          <rect x="-14" y="4" width="28" height="4" fill="#3a2010" />
          <rect x="-2" y="3" width="4" height="6" fill="#c8a848" />
          {/* épaules */}
          <ellipse cx="-14" cy="-8" rx="5" ry="4" fill="#3a5828" />
          <ellipse cx="14" cy="-8" rx="5" ry="4" fill="#3a5828" />
          {/* bras qui tient parchemin ouvert */}
          <path d="M-14 -6 L-24 -14" stroke="#c8946a" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M14 -6 L24 -14" stroke="#c8946a" strokeWidth="3.5" strokeLinecap="round" />
          <g transform="translate(0,-14)">
            <rect x="-26" y="-6" width="52" height="18" fill="#e8d0a0" stroke="#5a3818" strokeWidth="0.5" />
            <path d="M-26 -6 L-30 -8 L-30 12 L-26 12 Z M26 -6 L30 -8 L30 12 L26 12 Z" fill="#c8a878" />
            <path d="M-22 -2 h44 M-22 2 h44 M-22 6 h44 M-22 10 h44" stroke="#5a3818" strokeWidth="0.3" />
          </g>
          {/* tête */}
          <ellipse cx="0" cy="-32" rx="10" ry="12" fill="#c8946a" stroke="#5a3818" strokeWidth="0.5" />
          {/* chaperon rouge avec cornet */}
          <path d="M-11 -34 q0 -14 6 -14 q8 4 12 -2 q4 4 4 12 z" fill="#c85028" stroke="#5a1810" strokeWidth="0.6" />
          <path d="M8 -46 q6 -6 12 0 q-6 6 -12 0 Z" fill="#c85028" stroke="#5a1810" strokeWidth="0.5" />
          {/* traits */}
          <circle cx="-3" cy="-32" r="1.2" fill="#0a0806" />
          <circle cx="3" cy="-32" r="1.2" fill="#0a0806" />
          <path d="M-3 -26 q3 2 6 0" stroke="#5a2818" strokeWidth="0.8" fill="none" />
        </g>
        <g transform="translate(700,415)" style={{ animation: "float 2s ease-in-out infinite" }}>
          <circle r="14" fill="#ffd166" stroke="#8a5a20" strokeWidth="2" />
          <text y="5" textAnchor="middle" fontSize="18" fontWeight="800" fill="#3a2410">!</text>
        </g>

        {/* MOINE mendiant assis contre le mur avec bol */}
        <g transform="translate(380,502)">
          <ellipse cx="0" cy="34" rx="24" ry="4" fill="#0a0604" opacity="0.5" />
          {/* robe brune à capuche */}
          <path d="M-18 34 L-18 -20 Q-14 -30 0 -30 Q14 -30 18 -20 L18 34 Z" fill="#6a4020" stroke="#2a1408" strokeWidth="0.6" />
          <path d="M-18 -14 Q0 -6 18 -14" stroke="#3a2010" strokeWidth="0.6" fill="none" />
          {/* corde à la taille */}
          <path d="M-16 10 q16 4 32 0" stroke="#e0d0a0" strokeWidth="1.5" fill="none" />
          {/* visage dans capuche */}
          <ellipse cx="0" cy="-28" rx="8" ry="10" fill="#a08068" stroke="#5a3818" strokeWidth="0.4" />
          <circle cx="-3" cy="-28" r="1.2" fill="#0a0806" />
          <circle cx="3" cy="-28" r="1.2" fill="#0a0806" />
          {/* bol tendu */}
          <path d="M-8 -8 L-16 4" stroke="#a08068" strokeWidth="3" strokeLinecap="round" />
          <path d="M-24 4 Q-24 12 -16 14 L-8 14 Q0 12 0 4 Z" fill="#5a3818" stroke="#2a1408" strokeWidth="0.5" />
        </g>

        {/* Ephemere : plume d'oie + reliquat de bougie */}
        <g transform="translate(140,540) rotate(30)">
          <path d="M0 -14 Q4 -10 4 0 Q4 8 -2 12 Q-4 8 -4 0 Q-4 -10 0 -14 Z" fill="#f0e8d0" stroke="#5a3818" strokeWidth="0.4" />
          <path d="M0 -12 L0 10" stroke="#5a3818" strokeWidth="0.5" />
        </g>
        <g transform="translate(920,540)">
          <rect x="-3" y="-8" width="6" height="16" fill="#e8dcc0" stroke="#5a3818" strokeWidth="0.4" />
          <path d="M0 -8 l0 -6" stroke="#8a7048" strokeWidth="1" />
          <ellipse cx="0" cy="-15" rx="1.2" ry="2" fill="#f8c058" />
        </g>
      </PLayer>

      <Hotspot cx={700} cy={460} r={40} label="le crieur public sur son estrade" reveal={reveal} onClick={() => action("crieur")} />
      <Hotspot cx={380} cy={480} r={30} label="le moine mendiant" reveal={reveal} onClick={() => action("moine_mendiant")} />
      <Hotspot cx={500} cy={460} r={40} label="le puits de la place" reveal={reveal} onClick={() => action("puits")} />
      <Hotspot cx={240} cy={500} r={40} label="charrette de foin" reveal={reveal} onClick={() => action("charrette")} />
      <Hotspot cx={160} cy={340} r={70} label="la taverne du bourg" reveal={reveal} onClick={() => action("taverne")} />
      <Hotspot cx={860} cy={340} r={70} label="l'apothicaire" reveal={reveal} onClick={() => action("apothicaire")} />
      <Hotspot cx={700} cy={260} r={50} label="le clocher de l'église" reveal={reveal} onClick={() => action("clocher")} />
      <Hotspot cx={140} cy={540} r={14} label="plume d'oie" item="plume_oie" reveal={reveal} onClick={() => collect("plume_oie")} />
      <Hotspot cx={920} cy={540} r={14} label="bout de bougie" item="bout_bougie" reveal={reveal} onClick={() => collect("bout_bougie")} />
    </svg>
  );
}
