import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 9 — Tableau : Bureau, 1990. Céline, 25 ans, cadre
   en informatique, dans un open-space naissant. Un PC beige
   avec écran cathodique 14", clavier, souris à boule, une
   imprimante matricielle, une pile de CD-Rom vierges à graver.
   Windows 3.0 tourne à l'écran (arrière-plan cyan/gris).
   ============================================================ */

export default function SceneBureau1990({ collect, action, reveal, made = [], flags = [] }) {
  const cdCharge = !!flags.cd_charge;
  const grave = made.includes("msg_cd");

  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="b90-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e0d8c8" /><stop offset="100%" stopColor="#8a8478" /></linearGradient>
        <linearGradient id="b90-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4a5060" /><stop offset="100%" stopColor="#1a1e28" /></linearGradient>
        <linearGradient id="b90-desk" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c8b090" /><stop offset="100%" stopColor="#6a5030" /></linearGradient>
        <linearGradient id="b90-pc" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e0d0b0" /><stop offset="100%" stopColor="#a89878" /></linearGradient>
      </defs>

      {/* ═══ MUR beige + moquette gris-bleu (open-space années 90) ═══ */}
      <PLayer depth={4}>
        <rect width="1000" height="560" fill="url(#b90-wall)" />
        {/* frise horizontale */}
        <rect x="0" y="220" width="1000" height="2" fill="#8a7060" />
        <rect x="0" y="222" width="1000" height="6" fill="#6a5040" />
        {/* palmier en pot du bureau chic 90s */}
        <g transform="translate(150,340)">
          <path d="M-14 60 L-18 90 L18 90 L14 60 Z" fill="#3a2418" />
          <path d="M0 60 Q-20 20 -40 30 M0 60 Q20 20 40 30 M0 60 Q-30 0 -50 -10 M0 60 Q30 0 50 -10 M0 60 Q-10 -20 -20 -40 M0 60 Q10 -20 20 -40 M0 60 Q0 -40 -6 -70" stroke="#4a7a30" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M-40 30 q-6 -6 -4 -14" fill="#5a9040" opacity="0.8" />
          <path d="M40 30 q6 -6 4 -14" fill="#5a9040" opacity="0.8" />
        </g>
        {/* tableau blanc au mur avec quelques notes */}
        <g transform="translate(700,60)">
          <rect x="0" y="0" width="200" height="120" fill="#f8f8f0" stroke="#3a3a3a" strokeWidth="2" />
          <path d="M20 30 h60 M20 45 h80 M20 60 h40 M20 80 h100 M20 95 h50" stroke="#4a6aa0" strokeWidth="1.4" />
          <path d="M140 30 L170 30 L170 55 L140 55 Z" fill="none" stroke="#e83820" strokeWidth="1.4" />
          <path d="M144 42 L152 50 L166 34" stroke="#e83820" strokeWidth="1.4" fill="none" />
        </g>
      </PLayer>

      {/* ═══ BUREAU + PC ═══ */}
      <PLayer depth={2}>
        <rect y="440" width="1000" height="120" fill="url(#b90-floor)" />

        {/* BUREAU */}
        <g>
          <rect x="200" y="380" width="700" height="20" fill="url(#b90-desk)" stroke="#3a2818" strokeWidth="2" />
          <rect x="215" y="400" width="20" height="80" fill="#5a4028" />
          <rect x="865" y="400" width="20" height="80" fill="#5a4028" />
          {/* caissons tiroirs */}
          <rect x="220" y="400" width="120" height="80" fill="url(#b90-desk)" stroke="#3a2818" strokeWidth="1.4" />
          <rect x="230" y="410" width="100" height="24" fill="#8a6840" stroke="#5a3818" strokeWidth="1" />
          <rect x="230" y="440" width="100" height="24" fill="#8a6840" stroke="#5a3818" strokeWidth="1" />
          <circle cx="280" cy="422" r="2.5" fill="#3a2818" />
          <circle cx="280" cy="452" r="2.5" fill="#3a2818" />
        </g>

        {/* ÉCRAN cathodique 14" beige */}
        <g transform="translate(560,320)">
          <rect x="-90" y="-40" width="180" height="130" fill="url(#b90-pc)" stroke="#3a2818" strokeWidth="2" rx="6" />
          <rect x="-78" y="-30" width="156" height="100" rx="6" fill="#0a2038" />
          {/* image écran : Windows 3.0 */}
          <rect x="-78" y="-30" width="156" height="12" fill="#0a3878" />
          <text x="-72" y="-22" fontSize="8" fontFamily="ui-monospace,monospace" fill="#fff">Program Manager</text>
          <rect x="72" y="-28" width="4" height="4" fill="#c8c8c8" />
          {grave ? (
            <g>
              <text x="0" y="18" textAnchor="middle" fontSize="9" fontFamily="ui-monospace,monospace" fill="#5eff9e">GRAVURE OK</text>
              <rect x="-40" y="24" width="80" height="6" fill="#0a1020" stroke="#5eff9e" strokeWidth="0.6" />
              <rect x="-40" y="24" width="80" height="6" fill="#5eff9e" opacity="0.9" />
              <text x="0" y="46" textAnchor="middle" fontSize="7" fontFamily="ui-monospace,monospace" fill="#c8d4e2">C:\\CD_MASTER\\OK</text>
            </g>
          ) : (
            <g>
              {/* Icônes Program Manager */}
              {[[-50, 0], [-10, 0], [30, 0], [-50, 30], [-10, 30], [30, 30]].map(([x, y], i) => (
                <g key={i}>
                  <rect x={x - 8} y={y - 8} width="16" height="12" fill="#c8c8c8" stroke="#3a3a3a" strokeWidth="0.6" />
                  <text x={x} y={y + 14} textAnchor="middle" fontSize="4" fill="#c8c8c8" fontFamily="ui-monospace,monospace">FILE</text>
                </g>
              ))}
            </g>
          )}
          {/* base cathodique */}
          <path d="M-40 90 L-30 100 L30 100 L40 90 Z" fill="url(#b90-pc)" stroke="#3a2818" strokeWidth="1.4" />
        </g>

        {/* UNITÉ CENTRALE (PC beige) sous l'écran */}
        <g transform="translate(750,340)">
          <rect x="-80" y="-20" width="160" height="60" fill="url(#b90-pc)" stroke="#3a2818" strokeWidth="2" />
          {/* fentes lecteur disquette + CD */}
          <rect x="-60" y="-10" width="60" height="6" fill="#0a0806" stroke="#5a5a5a" strokeWidth="0.6" />
          <rect x="-60" y="4" width="60" height="12" rx="1" fill="#0a0806" stroke="#5a5a5a" strokeWidth="0.6" />
          <rect x="-56" y="8" width="52" height="4" fill="#3a3a3a" />
          {/* CD gravé qui pointe */}
          {grave && (
            <ellipse cx="-30" cy="10" rx="12" ry="3" fill="url(#b90-pc)" stroke="#8a5a20" strokeWidth="0.6" />
          )}
          {/* bouton power */}
          <circle cx="60" cy="0" r="4" fill="#3a3a3a" />
          <circle cx="60" cy="0" r="1.6" fill="#5eff9e" />
          {/* label */}
          <text x="-40" y="34" fontSize="6" fontFamily="ui-monospace,monospace" fill="#5a4028" fontWeight="700">PENTIUM 90</text>
        </g>

        {/* CLAVIER + SOURIS À BOULE devant l'écran */}
        <g transform="translate(560,398)">
          <rect x="-60" y="-8" width="120" height="16" rx="2" fill="#e0d0b0" stroke="#5a4028" strokeWidth="1" />
          {[...Array(12)].map((_, c) => [...Array(3)].map((_, r) => (
            <rect key={`k-${c}-${r}`} x={-56 + c * 10} y={-6 + r * 5} width="8" height="3" rx="0.3" fill="#c8b090" />
          )))}
        </g>
        <g transform="translate(700,400)">
          <ellipse cx="0" cy="0" rx="12" ry="8" fill="#e0d0b0" stroke="#5a4028" strokeWidth="1" />
          <path d="M0 -8 L0 4" stroke="#5a4028" strokeWidth="0.6" />
          <path d="M-16 0 q-6 -4 -14 0" stroke="#3a3a3a" strokeWidth="1.4" fill="none" />
        </g>

        {/* PILE DE CD-Rom vierges — bien visible sur le bureau, entre l'imprimante
            et l'écran. Boîtier ouvert avec un CD qui reflète les arcs-en-ciel. */}
        {!grave && (
          <g transform="translate(430,364)">
            {/* boîtier plastique noir ouvert (le CD en bas) */}
            <rect x="-38" y="4" width="76" height="10" fill="#1a1a1a" stroke="#0a0806" strokeWidth="0.8" />
            {/* le CD debout dans son boîtier + pile de 4 CD à côté */}
            {[0, -4, -8, -12].map((y, i) => (
              <g key={i}>
                <ellipse cx="0" cy={y} rx="36" ry="10" fill="#f0e8d0" stroke="#8a6840" strokeWidth="1" />
                <ellipse cx="0" cy={y} rx="8" ry="3" fill="#5a4028" />
              </g>
            ))}
            {/* reflets arc-en-ciel sur le CD du dessus */}
            <ellipse cx="0" cy="-12" rx="32" ry="9" fill="none" stroke="#c8a8e0" strokeWidth="0.8" opacity="0.7" />
            <ellipse cx="0" cy="-12" rx="26" ry="7.5" fill="none" stroke="#8ac8e0" strokeWidth="0.8" opacity="0.7" />
            <ellipse cx="0" cy="-12" rx="20" ry="6" fill="none" stroke="#e0a848" strokeWidth="0.8" opacity="0.7" />
            {/* étiquette « CD-R » */}
            <text x="16" y="-11" textAnchor="middle" fontSize="6" fontFamily="ui-monospace,monospace" fontWeight="800" fill="#c8963e">CD-R</text>
          </g>
        )}

        {/* IMPRIMANTE MATRICIELLE à gauche */}
        <g transform="translate(310,340)">
          <rect x="-40" y="0" width="80" height="30" fill="url(#b90-pc)" stroke="#3a2818" strokeWidth="1.4" />
          <rect x="-38" y="6" width="76" height="16" fill="#8a7860" />
          {/* papier qui sort par le haut */}
          <path d="M-30 0 L-30 -20 L30 -20 L30 0 Z" fill="#f8f0d8" stroke="#5a4028" strokeWidth="0.6" />
          <path d="M-24 -14 h48 M-24 -10 h44" stroke="#3a2818" strokeWidth="0.6" />
          {/* trous d'entrainement */}
          {[-26, -20, -14, -8, -2, 4, 10, 16, 22].map((x, i) => (
            <circle key={i} cx={x} cy="-18" r="0.6" fill="#8a5828" />
          ))}
        </g>
      </PLayer>

      {/* ═══ AVANT-PLAN : CÉLINE assise devant le bureau ═══ */}
      <PLayer depth={1}>
        <g transform="translate(560,470)">
          {/* fauteuil de bureau à roulettes */}
          <path d="M-40 -10 L40 -10 L34 40 L-34 40 Z" fill="#1a1a1a" />
          {/* corps assis */}
          <path d="M-24 0 Q-22 -40 0 -46 Q22 -40 24 0 Z" fill="#5a2030" />
          {/* épaulettes marquées */}
          <path d="M-24 -40 L-28 -30 M24 -40 L28 -30" stroke="#5a2030" strokeWidth="8" />
          {/* col chemise crème */}
          <path d="M-6 -40 L0 -28 L6 -40 L10 -20 L-10 -20 Z" fill="#f0e0d0" />
          {/* nœud lavallière rouge */}
          <path d="M-4 -34 L4 -34 L2 -22 L0 -26 L-2 -22 Z" fill="#c02830" />
          {/* tête */}
          <ellipse cx="0" cy="-60" rx="14" ry="16" fill="#f4d8b8" />
          {/* cheveux carrés blonds vénitiens volumineux */}
          <path d="M-14 -66 Q-10 -80 0 -80 Q12 -80 14 -66 Q10 -76 0 -76 Q-10 -76 -14 -66 Z" fill="#c89060" />
          <path d="M-14 -66 Q-18 -50 -12 -40" stroke="#c89060" strokeWidth="6" fill="none" />
          <path d="M14 -66 Q18 -50 12 -40" stroke="#c89060" strokeWidth="6" fill="none" />
          {/* yeux */}
          <circle cx="-4" cy="-62" r="1.4" fill="#3a6a80" />
          <circle cx="4" cy="-62" r="1.4" fill="#3a6a80" />
          {/* bouche */}
          <path d="M-3 -54 q3 2 6 0" stroke="#7a1020" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </g>

        {/* « ? » de quête au-dessus de Céline */}
        {!grave && (
          <g transform="translate(560,380)" style={{ animation: "float 2s ease-in-out infinite" }}>
            <circle r="14" fill="#ffd166" stroke="#8a5a20" strokeWidth="2" />
            <text y="5" textAnchor="middle" fontSize="18" fontWeight="800" fill="#3a2410">?</text>
          </g>
        )}
      </PLayer>

      {/* ═══ zones cliquables ═══ */}
      <Hotspot cx={560} cy={430} r={54} label="Céline" reveal={reveal} onClick={() => action("celine")} />
      {!cdCharge && !grave && (
        <Hotspot cx={430} cy={358} r={40} label="pile de CD-Rom vierges (CD-R)" item="cd_vierge" reveal={reveal} onClick={() => collect("cd_vierge")} />
      )}
      {/* PC = support (fente CD-Rom) — devient bouton d'ouverture du mini-jeu une fois le CD dedans */}
      {!cdCharge && (
        <Hotspot cx={750} cy={340} r={80} label="PC beige — glisse-y le CD-Rom vierge" item="pc_beige" reveal={reveal} onClick={() => action("celine")} />
      )}
      {cdCharge && !grave && (
        <Hotspot cx={750} cy={340} r={80} label="PC beige — lance l'assistant de gravure" reveal={reveal} onClick={() => action("graver_cd")} />
      )}
      {grave && (
        <Hotspot cx={750} cy={340} r={80} label="PC beige (gravure terminée)" reveal={reveal} onClick={() => action("celine")} />
      )}
    </svg>
  );
}
