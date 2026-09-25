import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 9 — Tableau : KIOSQUE À JOURNAUX (années 80)
   ------------------------------------------------------------
   Un trottoir parisien un matin brumeux. Kiosque en fer forgé
   vert bouteille, plein de titres empilés sur le présentoir.
   Le kioskier (Robert) attend le client. Deux passants : une
   lycéenne feuilletant un mag ado, un cadre pressé qui achète
   Le Monde. Le clic sur le kioskier ouvre le mini-jeu « Fais
   la Une » — introduit la notion de ligne éditoriale.
   ============================================================ */

export default function SceneKiosque1980({ collect, action, reveal, made = [], inv = [], mode }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="kq-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c6cfd8" />
          <stop offset="55%" stopColor="#d8dbde" />
          <stop offset="100%" stopColor="#e6e2d8" />
        </linearGradient>
        <linearGradient id="kq-street" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7a7268" />
          <stop offset="100%" stopColor="#3c3830" />
        </linearGradient>
        <linearGradient id="kq-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a89a80" />
          <stop offset="100%" stopColor="#6a5a44" />
        </linearGradient>
        <linearGradient id="kq-kiosk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a5e40" />
          <stop offset="100%" stopColor="#1e3624" />
        </linearGradient>
        <linearGradient id="kq-roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a6e50" />
          <stop offset="100%" stopColor="#243a2a" />
        </linearGradient>
        <linearGradient id="kq-facade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8e0c8" />
          <stop offset="100%" stopColor="#a89478" />
        </linearGradient>
      </defs>

      {/* CIEL matinal légèrement brumeux */}
      <rect width="1000" height="560" fill="url(#kq-sky)" />

      {/* IMMEUBLES en fond, silhouettes haussmanniennes */}
      <PLayer depth={5}>
        <rect x="0" y="90" width="1000" height="260" fill="url(#kq-facade)" opacity="0.9" />
        {/* fenêtres régulières */}
        {[0, 1, 2, 3, 4].map((row) => (
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((col) => (
            <rect key={`w-${row}-${col}`} x={20 + col * 100} y={110 + row * 45} width="42" height="28" fill="#5a4c3a" opacity="0.55" />
          ))
        ))}
        {/* corniches */}
        {[130, 220, 310].map((y, i) => (
          <rect key={i} x="0" y={y} width="1000" height="4" fill="#8a7458" opacity="0.6" />
        ))}
        {/* toitures en zinc */}
        <path d="M0 90 L1000 90 L1000 70 L0 76 Z" fill="#5a5648" opacity="0.85" />
      </PLayer>

      {/* TROTTOIR — pavé + bordure */}
      <PLayer depth={2}>
        <rect y="360" width="1000" height="200" fill="url(#kq-street)" />
        <rect y="360" width="1000" height="6" fill="#2a2620" />
        {/* joints entre pavés (motif régulier) */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <line key={`p-${i}`} x1={i * 80} y1="360" x2={i * 80 - 40} y2="560" stroke="#2a2620" strokeWidth="1.5" opacity="0.5" />
        ))}
        {[380, 420, 460, 500, 540].map((y, i) => (
          <line key={`ph-${i}`} x1="0" y1={y} x2="1000" y2={y} stroke="#2a2620" strokeWidth="1" opacity="0.35" />
        ))}
        {/* petite feuille morte ici et là */}
        <path d="M240 468 q4 -6 10 -4 q6 4 2 10 q-6 4 -12 -6 Z" fill="#a06a3a" opacity="0.7" />
        <path d="M780 502 q4 -6 10 -4 q6 4 2 10 q-6 4 -12 -6 Z" fill="#8a5a2a" opacity="0.6" />
      </PLayer>

      {/* LE KIOSQUE — au centre, imposant */}
      <PLayer depth={3}>
        {/* base en fer forgé */}
        <rect x="330" y="240" width="380" height="180" fill="url(#kq-kiosk)" stroke="#141c14" strokeWidth="2" rx="2" />
        {/* motifs de fer forgé (fines volutes) */}
        {[350, 400, 450, 500, 550, 600, 650, 690].map((x) => (
          <line key={`bar-${x}`} x1={x} y1="260" x2={x} y2="410" stroke="#0e1a10" strokeWidth="1" opacity="0.5" />
        ))}
        {/* toit pentu en zinc */}
        <path d="M320 240 L520 168 L720 240 Z" fill="url(#kq-roof)" stroke="#141c14" strokeWidth="2" />
        <path d="M330 240 L710 240" stroke="#141c14" strokeWidth="2" />
        {/* bandeau « KIOSQUE » */}
        <rect x="360" y="210" width="320" height="26" fill="#c9a54a" stroke="#7a5a2a" strokeWidth="1.5" rx="2" />
        <text x="520" y="228" textAnchor="middle" fontFamily="Georgia, serif" fontSize="16" fontWeight="700" fill="#3a2210">PRESSE · TABAC · LOTO</text>
        {/* pointe du toit */}
        <path d="M518 168 L522 168 L522 156 L518 156 Z" fill="#5a4a30" />
        <circle cx="520" cy="152" r="4" fill="#c9a54a" />

        {/* PRÉSENTOIR de journaux (façade avant) */}
        <rect x="352" y="260" width="336" height="140" fill="#1a2a1e" stroke="#0e1a10" strokeWidth="1.5" rx="2" />

        {/* Journaux/magazines empilés en 3 rangs, 4 par rang */}
        {[0, 1, 2].map((row) => (
          [0, 1, 2, 3].map((col) => {
            const x = 362 + col * 82;
            const y = 268 + row * 44;
            const covers = [
              { bg: "#d8d0c0", title: "LE MONDE",   accent: "#1a2030" },
              { bg: "#e8c8a8", title: "LIBÉ",       accent: "#c04040" },
              { bg: "#c8dae8", title: "PARIS-M.",   accent: "#3070a0" },
              { bg: "#f0c8d0", title: "STAR",       accent: "#c04a70" },
              { bg: "#fae8a8", title: "OKAPI",      accent: "#c07a30" },
              { bg: "#e0d8c0", title: "PIF",        accent: "#a04a30" },
              { bg: "#c8e0c8", title: "AUTO+",      accent: "#3a704a" },
              { bg: "#e0c8e8", title: "TÉLÉ 7",     accent: "#7a3a80" },
              { bg: "#f0e0c0", title: "CUISINE",    accent: "#a05a2a" },
              { bg: "#d0e0f0", title: "GÉO",        accent: "#3a5a90" },
              { bg: "#f0d8c8", title: "MODES",      accent: "#a04a5a" },
              { bg: "#c8c8d8", title: "L'ÉQUIPE",   accent: "#3a3a5a" },
            ];
            const c = covers[row * 4 + col];
            return (
              <g key={`c-${row}-${col}`}>
                <rect x={x} y={y} width="72" height="38" fill={c.bg} stroke="#5a4a30" strokeWidth="0.8" />
                <rect x={x} y={y} width="72" height="8" fill={c.accent} />
                <text x={x + 36} y={y + 22} textAnchor="middle" fontFamily="Georgia, serif" fontSize="7.5" fontWeight="800" fill={c.accent}>{c.title}</text>
                <line x1={x + 6} y1={y + 28} x2={x + 66} y2={y + 28} stroke={c.accent} strokeWidth="0.5" opacity="0.5" />
                <line x1={x + 6} y1={y + 32} x2={x + 60} y2={y + 32} stroke={c.accent} strokeWidth="0.5" opacity="0.5" />
              </g>
            );
          })
        ))}

        {/* Comptoir + Robert le kioskier passe la tête par la fenêtre latérale gauche
           (dimensionné plus petit pour ne pas éclipser le kiosque) */}
        <g transform="translate(276,306) scale(0.7)">
          {/* petite ouverture de service, côté gauche du kiosque */}
          <rect x="70" y="-20" width="16" height="60" fill="#1a2a1e" stroke="#0e1a10" strokeWidth="1" />
          {/* tête et buste de Robert */}
          <ellipse cx="40" cy="10" rx="26" ry="34" fill="#d8b090" />
          {/* béret noir */}
          <path d="M14 -14 Q40 -30 66 -14 Q66 -2 40 0 Q14 -2 14 -14 Z" fill="#1a1a20" />
          <circle cx="40" cy="-16" r="3" fill="#3a3a40" />
          {/* moustache blanche */}
          <path d="M28 20 Q40 22 52 20 Q46 26 40 25 Q34 26 28 20 Z" fill="#f0eae0" />
          {/* sourcils gris */}
          <path d="M28 4 q6 -2 10 0 M42 4 q6 -2 10 0" stroke="#8a8a90" strokeWidth="2" fill="none" />
          {/* yeux */}
          <circle cx="32" cy="12" r="2" fill="#1a1a20" />
          <circle cx="48" cy="12" r="2" fill="#1a1a20" />
          {/* nez */}
          <path d="M40 14 q-2 4 0 8" stroke="#a07050" strokeWidth="1.5" fill="none" />
          {/* buste — pull en laine grise, foulard rouge */}
          <path d="M8 40 Q40 32 72 40 L74 74 L6 74 Z" fill="#6a6a70" />
          <path d="M20 42 Q40 40 60 42 Q56 52 40 52 Q24 52 20 42 Z" fill="#c04030" />
        </g>
      </PLayer>

      {/* PASSANTS — une lycéenne à droite feuilletant un mag ado, un cadre à gauche */}
      <PLayer depth={2}>
        {/* Cadre pressé, gauche */}
        <g transform="translate(160,360)">
          {/* jambes en pantalon marron */}
          <rect x="-14" y="30" width="12" height="52" fill="#4a3620" />
          <rect x="4" y="30" width="12" height="52" fill="#4a3620" />
          {/* chaussures */}
          <rect x="-16" y="80" width="16" height="8" fill="#1a1410" rx="2" />
          <rect x="2" y="80" width="16" height="8" fill="#1a1410" rx="2" />
          {/* manteau beige */}
          <path d="M-22 -18 Q0 -24 22 -18 L26 32 L-26 32 Z" fill="#c9a878" />
          {/* col + revers */}
          <path d="M-6 -18 L6 -18 L4 -6 L-4 -6 Z" fill="#7a5a3a" />
          {/* tête */}
          <circle cx="0" cy="-30" r="12" fill="#e8bfa0" />
          <path d="M-10 -38 Q0 -46 10 -38 Q8 -34 0 -34 Q-8 -34 -10 -38 Z" fill="#3a2418" />
          {/* mallette dans la main */}
          <rect x="24" y="10" width="18" height="14" fill="#3a2418" stroke="#1a1410" strokeWidth="1" />
          <line x1="28" y1="8" x2="38" y2="8" stroke="#1a1410" strokeWidth="1.5" />
          {/* journal replié sous le bras */}
          <rect x="-30" y="0" width="20" height="26" fill="#e8e0c8" stroke="#8a7458" strokeWidth="0.8" transform="rotate(-8 -20 13)" />
          <line x1="-28" y1="6" x2="-14" y2="6" stroke="#3a2418" strokeWidth="0.5" transform="rotate(-8 -20 13)" />
          <line x1="-28" y1="10" x2="-14" y2="10" stroke="#3a2418" strokeWidth="0.4" transform="rotate(-8 -20 13)" />
        </g>

        {/* Lycéenne, droite, en train de feuilleter */}
        <g transform="translate(830,370)">
          {/* jambes en jean bleu */}
          <rect x="-12" y="34" width="10" height="46" fill="#3a5074" />
          <rect x="2" y="34" width="10" height="46" fill="#3a5074" />
          {/* baskets blanches */}
          <rect x="-14" y="78" width="14" height="8" fill="#e8e8e0" stroke="#7a7a70" strokeWidth="0.6" rx="2" />
          <rect x="0" y="78" width="14" height="8" fill="#e8e8e0" stroke="#7a7a70" strokeWidth="0.6" rx="2" />
          {/* pull rose fluo bien 80s */}
          <path d="M-20 -12 Q0 -18 20 -12 L22 36 L-22 36 Z" fill="#e878a0" />
          {/* motif géométrique */}
          <path d="M-14 -4 L0 6 L14 -4 L14 8 L0 18 L-14 8 Z" fill="#f8b0c8" opacity="0.7" />
          {/* tête + queue-de-cheval haute */}
          <circle cx="0" cy="-24" r="11" fill="#f0d0a8" />
          <path d="M-4 -34 Q4 -40 6 -30 Q4 -20 0 -18 Q-4 -20 -6 -30 Q-4 -40 -4 -34 Z" fill="#3a2418" />
          <ellipse cx="8" cy="-38" rx="4" ry="8" fill="#c04a70" opacity="0.8" />
          {/* magazine tenu à deux mains */}
          <rect x="-16" y="12" width="32" height="24" fill="#f0c8d0" stroke="#8a5a70" strokeWidth="0.8" />
          <rect x="-16" y="12" width="32" height="5" fill="#c04a70" />
          <text x="0" y="26" textAnchor="middle" fontFamily="Georgia, serif" fontSize="5" fontWeight="800" fill="#c04a70">STAR</text>
        </g>

        {/* petit chien attaché à la grille du kiosque, à droite */}
        <g transform="translate(720,392)">
          <ellipse cx="0" cy="14" rx="18" ry="8" fill="#5a4030" />
          <circle cx="14" cy="6" r="7" fill="#5a4030" />
          <ellipse cx="-14" cy="10" rx="6" ry="4" fill="#5a4030" />
          <path d="M-18 6 Q-18 -2 -12 -2" stroke="#5a4030" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* laisse */}
          <path d="M14 6 Q10 -20 -10 -30" stroke="#3a2418" strokeWidth="1.5" fill="none" />
          <circle cx="14" cy="6" r="1.5" fill="#c9a54a" />
          {/* museau + œil */}
          <circle cx="18" cy="8" r="1.5" fill="#1a1410" />
          <circle cx="14" cy="4" r="1" fill="#1a1410" />
        </g>
      </PLayer>

      {/* Lampadaire en fer forgé à gauche */}
      <PLayer depth={1}>
        <rect x="80" y="240" width="6" height="160" fill="#1a1a20" />
        <path d="M60 240 Q66 232 76 236 M110 240 Q104 232 94 236" stroke="#1a1a20" strokeWidth="4" fill="none" />
        <circle cx="83" cy="232" r="10" fill="#f0e0a0" stroke="#5a4a20" strokeWidth="1.5" />
        <ellipse cx="83" cy="232" rx="20" ry="10" fill="#fff8c8" opacity="0.35" />
        <rect x="70" y="400" width="26" height="14" fill="#1a1a20" rx="2" />
      </PLayer>

      {/* voile de grain global */}
      <rect width="1000" height="560" fill="#161410" opacity="0.06" style={{ pointerEvents: "none" }} />

      {/* zones cliquables */}
      {/* Le kioskier — ouvre le mini-jeu « Fais la Une » (tant qu'il n'est pas fait) */}
      {!made.includes("msg_ligneEditoriale") && mode !== "jeu2" && (
        <Hotspot cx={312} cy={330} r={28} label="parler à Robert, le kioskier" reveal={reveal} onClick={() => action("robert")} />
      )}
      {/* Bouton mini-jeu direct sur le présentoir (accessible aussi via Robert) */}
      {!made.includes("msg_ligneEditoriale") && mode !== "jeu2" && (
        <Hotspot cx={520} cy={330} r={80} label="faire la Une du kiosque" reveal={reveal} onClick={() => action("faire_la_une")} />
      )}
      {/* Passants — juste du dialogue anodin */}
      <Hotspot cx={160} cy={340} r={30} label="le cadre pressé" reveal={reveal} onClick={() => action("cadre_presse")} />
      <Hotspot cx={830} cy={370} r={30} label="la lycéenne" reveal={reveal} onClick={() => action("lyceenne")} />
    </svg>
  );
}
