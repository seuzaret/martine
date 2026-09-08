import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 9 — Tableau-ÉNIGME : « Et si tout tenait dans ma poche ? »
   ------------------------------------------------------------
   Ta chambre, aujourd'hui. Le bureau croule sous les objets.
   L'ado (cliquable) en a assez de tout trimballer.
   → puce flash + poche → la clé USB apparaît, minuscule.
   → écran tactile + réseau mobile → LE smartphone apparaît, et
     tous les médias du voyage s'affichent dedans.
   ⚠️ C'est ici qu'on tente de lire la DISQUETTE du chapitre 8
      sur le PC moderne… (message perdu)
   Ce décor réagit à l'état du jeu via la prop `made`.
   ============================================================ */

export default function SceneChambre({ collect, action, reveal, made = [], mode }) {
  const usb = made.includes("msg_usb");           // la clé USB existe
  const phone = made.includes("msg_smartphone");  // le smartphone existe
  const dead = made.includes("msg_disquette");    // la disquette a rendu l'âme
  const compte = made.includes("msg_compte");     // les photos ont disparu

  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ch-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3a4058" /><stop offset="100%" stopColor="#20243a" /></linearGradient>
        <linearGradient id="ch-win" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#141c34" /><stop offset="100%" stopColor="#3a4a68" /></linearGradient>
        <linearGradient id="ch-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5a4a3e" /><stop offset="100%" stopColor="#2a2018" /></linearGradient>
        <linearGradient id="ch-desk" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a8478" /><stop offset="100%" stopColor="#4e4a42" /></linearGradient>
        <radialGradient id="ch-scr" cx="50%" cy="40%" r="70%"><stop offset="0%" stopColor="#7fd8ff" stopOpacity="0.35" /><stop offset="100%" stopColor="#7fd8ff" stopOpacity="0" /></radialGradient>
        <radialGradient id="ch-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffe9a8" stopOpacity="0.65" /><stop offset="100%" stopColor="#ffe9a8" stopOpacity="0" /></radialGradient>
        <filter id="ch-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
        <clipPath id="ch-winclip"><rect x="-56" y="-56" width="112" height="112" /></clipPath>
      </defs>

      {/* ═══ le mur de la chambre ═══ */}
      <rect width="1000" height="560" fill="url(#ch-wall)" />
      <rect width="1000" height="560" fill="#10121e" opacity="0.24" filter="url(#ch-grain)" />
      {/* la lueur bleue des écrans sur le mur */}
      <ellipse cx="620" cy="380" rx="300" ry="180" fill="url(#ch-scr)" style={{ animation: "glow 4s ease-in-out infinite" }} />

      {/* ═══ couche lointaine : la fenêtre + l'antenne-relais, le poster ═══ */}
      <PLayer depth={1}>
        <g transform="translate(770,158)">
          <rect x="-58" y="-58" width="116" height="116" fill="url(#ch-win)" />
          <g clipPath="url(#ch-winclip)">
            {/* la ville la nuit */}
            <path d="M-56 44 L-56 6 L-36 6 L-36 26 L-14 26 L-14 -4 L10 -4 L10 22 L34 22 L34 2 L56 2 L56 44 Z" fill="#151b2c" />
            {[[-48, 14], [-28, 34], [-6, 6], [18, 30], [42, 12], [-44, 30], [24, 8]].map(([x, y], i) => (
              <rect key={i} x={x} y={y} width="4" height="4" fill="#ffd166" opacity="0.8" style={{ animation: `twinkle ${2 + (i % 3)}s infinite` }} />
            ))}
            {/* L'ANTENNE-RELAIS sur le toit */}
            <g transform="translate(20,-16)">
              <path d="M-3 26 L-7 -22 L7 -22 L3 26 Z" fill="#2a3040" />
              {[...Array(4)].map((_, i) => <path key={i} d={`M${-6 + i * 0.6} ${-16 + i * 10} h${12 - i * 1.2}`} stroke="#3a4050" strokeWidth="1.4" />)}
              {/* les panneaux de l'antenne */}
              {[-1, 1].map((s, i) => <rect key={i} x={s * 7 - 2} y="-24" width="4" height="11" rx="1" fill="#4a5060" />)}
              {/* le réseau mobile qui rayonne */}
              <g fill="none" stroke="#7fd8ff">
                {[10, 18, 26].map((r, i) => (
                  <g key={i} style={{ animation: `pulse ${1.6 + i * 0.4}s infinite` }}>
                    <path d={`M${r * 0.6} -${r * 0.5 + 22} A${r} ${r} 0 0 1 ${r * 0.6} ${r * 0.5 - 22}`} strokeWidth="1.8" opacity={0.9 - i * 0.2} />
                    <path d={`M-${r * 0.6} -${r * 0.5 + 22} A${r} ${r} 0 0 0 -${r * 0.6} ${r * 0.5 - 22}`} strokeWidth="1.8" opacity={0.9 - i * 0.2} />
                  </g>
                ))}
              </g>
            </g>
          </g>
          <rect x="-58" y="-58" width="116" height="116" fill="none" stroke="#2a3040" strokeWidth="7" />
          <path d="M0 -58 v116 M-58 0 h116" stroke="#2a3040" strokeWidth="3.5" />
        </g>

        {/* un poster au mur */}
        <g transform="translate(200,150)">
          <rect x="-44" y="-56" width="88" height="112" rx="2" fill="#2c3350" stroke="#465070" strokeWidth="3" />
          <circle cx="0" cy="-18" r="20" fill="#c8483a" opacity="0.8" />
          <path d="M-30 40 q30 -44 60 0 Z" fill="#3a6ac8" opacity="0.7" />
          <text x="0" y="48" textAnchor="middle" fontSize="9" fill="#8fa3bd" fontFamily="ui-monospace,monospace">MUSIQUE</text>
        </g>
        {/* DRONE de livraison qui traverse le ciel — signature XXIe siecle,
            avec petit clignotant rouge. */}
        <g opacity="0.8">
          <animateTransform attributeName="transform" type="translate"
            values="-40,0; 1050,20" dur="20s" repeatCount="indefinite" />
          <g transform="translate(0,80)">
            {/* corps */}
            <rect x="-4" y="-1.5" width="8" height="3" rx="0.6" fill="#3a3a3a" />
            {/* helices */}
            <path d="M-6 -1 h4 M2 -1 h4" stroke="#6a6a6a" strokeWidth="0.6" />
            <path d="M-6 1 h4 M2 1 h4" stroke="#6a6a6a" strokeWidth="0.6" />
            {/* clignotant */}
            <circle cx="0" cy="0" r="0.8" fill="#e83820">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="0.9s" repeatCount="indefinite" />
            </circle>
          </g>
        </g>
      </PLayer>

      {/* ═══ couche intermédiaire : l'étagère ═══ */}
      <PLayer depth={2}>
        <g transform="translate(360,300)">
          <rect x="-70" y="0" width="140" height="9" rx="2" fill="#5a4a3e" />
          {/* des livres et une console posés dessus */}
          {[-58, -50, -42, -34].map((x, i) => <rect key={i} x={x} y="-34" width="7" height="34" fill={["#c8483a", "#3a6ac8", "#c9a24a", "#5a8a4a"][i]} />)}
          <rect x="10" y="-18" width="44" height="18" rx="3" fill="#2a2e3a" />
          <circle cx="20" cy="-9" r="3" fill="#5a6070" /><circle cx="44" cy="-9" r="3" fill="#5a6070" />
        </g>
      </PLayer>

      {/* ═══ premier plan : le sol, le lit, le bureau, l'ado ═══ */}
      <PLayer depth={3}>
        <rect y="408" width="1000" height="152" fill="url(#ch-floor)" />
        <rect y="410" width="1000" height="150" fill="#1a1208" opacity="0.34" filter="url(#ch-grain)" />
        <path d="M0 452 h1000 M0 504 h1000 M150 408 v152 M420 408 v152 M690 408 v152 M900 408 v152" stroke="#241810" strokeWidth="1.4" opacity="0.45" />

        {/* LE LIT, à gauche : le jean (poche) et la tablette (photos) dessus */}
        <g transform="translate(190,470)">
          <rect x="-90" y="0" width="180" height="34" rx="4" fill="#3a4a6a" />
          <rect x="-90" y="0" width="180" height="34" rx="4" fill="#101828" opacity="0.24" filter="url(#ch-grain)" />
          <rect x="-90" y="-16" width="54" height="18" rx="6" fill="#e8e4da" opacity="0.85" />
          <rect x="-86" y="34" width="10" height="26" fill="#2a2018" /><rect x="76" y="34" width="10" height="26" fill="#2a2018" />

          {/* PIÈCE : le jean roulé en boule (la poche) */}
          {!usb && (
            <g transform="translate(24,-14)">
              <path d="M-26 14 q-6 -20 6 -24 q20 -6 40 2 q10 4 4 22 Z" fill="#3a5a8a" />
              <path d="M-26 14 q-6 -20 6 -24 q20 -6 40 2 q10 4 4 22 Z" fill="#101828" opacity="0.22" filter="url(#ch-grain)" />
              {/* la poche, bien visible */}
              <path d="M2 -12 q12 -3 18 2 l-3 12 q-9 3 -16 -1 Z" fill="none" stroke="#7fa8d8" strokeWidth="1.6" />
              <path d="M-14 -6 q10 -4 18 -2" stroke="#7fa8d8" strokeWidth="1.2" fill="none" />
            </g>
          )}
          {/* APPARAÎT : LA CLÉ USB, minuscule, posée sur le lit */}
          {usb && (
            <g transform="translate(24,-10)" style={{ animation: "pulse 0.7s ease-out 2" }}>
              <ellipse cx="0" cy="6" rx="60" ry="26" fill="url(#ch-glow)" />
              <rect x="-16" y="-5" width="26" height="11" rx="2" fill="#2a2e3a" />
              <rect x="10" y="-3" width="11" height="7" rx="1" fill="#b8bcc4" />
              <path d="M12 -1 h7 M12 2 h7" stroke="#6a6e76" strokeWidth="0.8" />
              <circle cx="-11" cy="0" r="2" fill="#5eff9e" style={{ animation: "pulse 1.4s infinite" }} />
            </g>
          )}
        </g>

        {/* LE BUREAU, à droite */}
        <g transform="translate(620,452)">
          <rect x="-130" y="0" width="260" height="12" rx="3" fill="url(#ch-desk)" />
          <rect x="-122" y="12" width="12" height="52" fill="#3a3e46" /><rect x="110" y="12" width="12" height="52" fill="#3a3e46" />

          {/* LE PC MODERNE : fin, sans lecteur de disquette (il reste dessiné) */}
          <g transform="translate(-58,-2)">
            {/* l'écran */}
            <rect x="-52" y="-72" width="104" height="66" rx="4" fill="#2a2e3a" />
            <rect x="-48" y="-68" width="96" height="54" rx="2" fill={dead ? "#2a1418" : "#101828"} />
            {dead ? (
              /* APPARAÎT : le message d'erreur, quand la disquette a échoué */
              <g fontFamily="ui-monospace,monospace">
                <text x="0" y="-48" textAnchor="middle" fontSize="8" fill="#ff6a4a">⚠ ERREUR</text>
                <text x="0" y="-36" textAnchor="middle" fontSize="5.5" fill="#ff9a8a">périphérique inconnu</text>
                <text x="0" y="-27" textAnchor="middle" fontSize="5.5" fill="#ff9a8a">format illisible</text>
                <rect x="-20" y="-22" width="40" height="6" rx="1" fill="#5a2a2a" />
              </g>
            ) : (
              <g fontFamily="ui-monospace,monospace">
                <path d="M-40 -58 h30 M-40 -50 h48 M-40 -42 h22" stroke="#3a6ac8" strokeWidth="2" opacity="0.7" />
                <rect x="-40" y="-34" width="5" height="7" fill="#5eff9e" opacity="0.8" style={{ animation: "pulse 1.1s steps(2) infinite" }} />
              </g>
            )}
            <rect x="-8" y="-6" width="16" height="5" fill="#4a4e58" />
            <rect x="-26" y="-1" width="52" height="4" rx="2" fill="#5a5e68" />
          </g>

          {/* PIÈCE : la puce de mémoire flash, minuscule, sur le bureau */}
          {!usb && (
            <g transform="translate(24,-8)">
              <rect x="-9" y="-6" width="18" height="12" rx="1.5" fill="#1c2028" />
              <rect x="-6" y="-4" width="12" height="8" rx="1" fill="#3a4050" />
              {[-7, -4, -1, 2, 5].map((x, i) => <path key={i} d={`M${x} 6 v3`} stroke="#c9a24a" strokeWidth="1.2" />)}
              {[-7, -4, -1, 2, 5].map((x, i) => <path key={`t${i}`} d={`M${x} -6 v-3`} stroke="#c9a24a" strokeWidth="1.2" />)}
            </g>
          )}

          {/* PIÈCE : l'écran tactile, une vitre nue posée là */}
          {!phone && (
            <g transform="translate(84,-16)">
              <rect x="-20" y="-30" width="40" height="58" rx="5" fill="#cfe4ff" opacity="0.5" stroke="#8fb8e0" strokeWidth="1.6" />
              <path d="M-14 -22 q14 -6 28 4" stroke="#eaf4ff" strokeWidth="2" fill="none" opacity="0.8" />
              {/* une empreinte de doigt qui pulse : « touche-moi » */}
              <circle cx="2" cy="4" r="7" fill="none" stroke="#7fd8ff" strokeWidth="1.6" style={{ animation: "pulse 1.6s infinite" }} />
              <circle cx="2" cy="4" r="2.4" fill="#7fd8ff" />
            </g>
          )}
          {/* APPARAÎT : LE SMARTPHONE — tous les médias du voyage dedans */}
          {phone && (
            <g transform="translate(84,-18)" style={{ animation: "pulse 0.7s ease-out 2" }}>
              <ellipse cx="0" cy="4" rx="80" ry="52" fill="url(#ch-glow)" />
              <rect x="-22" y="-34" width="44" height="66" rx="6" fill="#1c2028" />
              <rect x="-19" y="-30" width="38" height="58" rx="4" fill="#0e1420" />
              {/* la grille d'icônes : TOUS les médias du jeu */}
              {["📷", "📻", "📺", "🎞️", "📰", "✉️", "📚", "🎵", "☎️"].map((e, i) => (
                <text key={i} x={-13 + (i % 3) * 12} y={-19 + Math.floor(i / 3) * 15} fontSize="9" textAnchor="middle">{e}</text>
              ))}
              <rect x="-8" y="25" width="16" height="2" rx="1" fill="#5a6070" />
              <circle cx="0" cy="-33" r="1.4" fill="#3a4050" />
            </g>
          )}

          {/* PIÈCE : la tablette avec les photos d'enfance */}
          {!compte && (
            <g transform="translate(-124,-14)">
              <rect x="-26" y="-20" width="52" height="40" rx="3" fill="#2a2e3a" />
              <rect x="-23" y="-17" width="46" height="34" rx="2" fill="#dfe8f2" />
              {/* une grille de petites photos */}
              {[...Array(6)].map((_, i) => (
                <rect key={i} x={-20 + (i % 3) * 15} y={-14 + Math.floor(i / 3) * 16} width="12" height="13" rx="1"
                  fill={["#c8a882", "#8ab0c8", "#c8c07a", "#b08a9a", "#8ac8a0", "#c88a6a"][i]} />
              ))}
              <path d="M-14 -8 l3 -3 l4 4" stroke="#6a5a48" strokeWidth="1" fill="none" />
            </g>
          )}
        </g>

        {/* des chargeurs qui traînent au sol */}
        <path d="M400 528 q26 -14 50 2 q22 14 46 -4" stroke="#e8e4da" strokeWidth="3" fill="none" opacity="0.65" />
        <rect x="392" y="522" width="12" height="9" rx="2" fill="#e8e4da" opacity="0.75" />
        <path d="M300 546 q30 -12 58 4" stroke="#2a2e3a" strokeWidth="3" fill="none" opacity="0.8" />

        {/* « ? » tant qu'il reste une invention */}
        {!(usb && phone) && (
          <g transform="translate(392,318)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
            <path d="M0 0 q0 -24 24 -24 q24 0 24 20 q0 17 -20 22 l0 8" fill="none" stroke="#ffd166" strokeWidth="4" />
            <circle cx="24" cy="37" r="3" fill="#ffd166" />
          </g>
        )}

        {/* L'ADO, assis sur le bord du lit, découragé devant le bazar */}
        <g transform="translate(420,466)">
          <path d="M-14 8 Q-18 -16 0 -21 Q18 -16 14 8 L12 42 L-12 42 Z" fill="#3a6ac8" />
          <path d="M-14 8 Q-18 -16 0 -21 Q18 -16 14 8 L12 42 L-12 42 Z" fill="#101828" opacity="0.22" filter="url(#ch-grain)" />
          <circle cx="0" cy="-31" r="10" fill="#e0b090" />
          <path d="M-10 -35 q2 -12 10 -11 q11 1 10 11 q-4 -6 -10 -6 q-7 0 -10 6 Z" fill="#2c2018" />
          {/* écouteurs autour du cou */}
          <path d="M-9 -24 a9 9 0 0 0 18 0" stroke="#e8e4da" strokeWidth="2" fill="none" />
          {/* le bras qui montre le bureau, dépité */}
          <path d="M13 -6 q22 2 30 14" stroke="#e0b090" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>

        {/* épave de MARTINE, entre deux chargeurs (x ≤ 860 : au-delà, c'est rogné) */}
        <g transform="translate(830,516) rotate(-7)">
          <ellipse cx="0" cy="12" rx="26" ry="6" fill="#0a0603" opacity="0.6" />
          <path d="M0 -20 Q18 -18 20 -4 Q22 8 11 11 L-11 11 Q-22 8 -20 -4 Q-18 -18 0 -20 Z" fill="#8a6240" />
          <circle cx="-1" cy="-4" r="5.5" fill="#cfeaff" stroke="#5c3a22" strokeWidth="1.4" />
          <rect x="-13" y="3" width="24" height="7" rx="2" fill="#0c1410" stroke="#5c3a22" strokeWidth="1" />
          <text x="-1" y="9" textAnchor="middle" fontSize="4.6" fill="#5eff9e" fontFamily="ui-monospace,monospace" style={{ animation: "pulse 2.2s infinite" }}>2026</text>
          <circle cx="13" cy="-27" r="2.3" fill="#5eff9e" style={{ animation: "pulse 1.5s infinite" }} />
          <path d="M8 -20 q6 -8 13 -6" stroke="#8a94a8" strokeWidth="2.3" fill="none" strokeLinecap="round" />
        </g>

        {/* ANACHRONISME DU FUTUR : NEURO-LIEN™ (2141) posé sur le bureau.
            Un disque bio-imprimé qui projette un hologramme neuronal. */}
        {!made.includes("neurolien") && mode !== "jeu2" && (
          <g transform="translate(140,506)">
            {/* halo violet-cyan pulsé */}
            <circle r={38} fill="#a840c0" opacity="0.25" style={{ animation: "pulse 2s infinite" }} />
            <circle r={24} fill="#7fe0ff" opacity="0.35" style={{ animation: "pulse 2s infinite" }} />
            {/* disque bio-imprimé translucide (plus gros) */}
            <ellipse cx={0} cy={2} rx={20} ry={6} fill="#c8a8e0" stroke="#7fe0ff" strokeWidth="1.5" opacity="0.9" />
            <ellipse cx={0} cy={0} rx={16} ry={5} fill="#e0c8f0" opacity="0.85" />
            {/* motif neuronal (nœuds reliés) */}
            {[[-11, 0], [-4, -2], [4, 0], [11, -2]].map(([nx, ny], i) => (
              <circle key={i} cx={nx} cy={ny} r={1.6} fill="#3a1a58" />
            ))}
            <path d="M-11 0 L-4 -2 L4 0 L11 -2" stroke="#5a2088" strokeWidth="1" fill="none" />
            {/* logo « NL™ » */}
            <text x={0} y={4} textAnchor="middle" fontSize="4" fontFamily="ui-monospace,monospace" fontWeight="800" fill="#3a1a58">NL™</text>
            {/* hologramme triangulaire qui monte au-dessus */}
            <g transform="translate(0,-14)">
              <path d="M-6 0 L6 0 L0 -10 Z" fill="#7fe0ff" opacity="0.6" style={{ animation: "float 2s ease-in-out infinite" }} />
              <path d="M-3 -4 h6 M-2 -6 h4" stroke="#7fe0ff" strokeWidth="0.8" opacity="0.7" />
            </g>
          </g>
        )}
      </PLayer>

      <rect width="1000" height="560" fill="#0c0e1a" opacity="0.06" style={{ pointerEvents: "none" }} />

      {/* ═══ zones cliquables ═══ */}
      <Hotspot cx={420} cy={444} r={50} label="toi" reveal={reveal} onClick={() => action("ado")} />
      {!usb && (
        <>
          <Hotspot cx={214} cy={452} r={38} label="poche" item="poche" reveal={reveal} onClick={() => collect("poche")} />
          <Hotspot cx={644} cy={444} r={26} label="mémoire flash" item="memoire_flash" reveal={reveal} onClick={() => collect("memoire_flash")} />
        </>
      )}
      {!phone && (
        <>
          <Hotspot cx={704} cy={436} r={34} label="écran tactile" item="ecran_tactile" reveal={reveal} onClick={() => collect("ecran_tactile")} />
          <Hotspot cx={790} cy={142} r={44} label="réseau mobile" item="reseau_mobile" reveal={reveal} onClick={() => collect("reseau_mobile")} />
        </>
      )}
      {/* le PC : sert à tenter de lire la disquette */}
      {!dead && (
        <Hotspot cx={562} cy={412} r={48} label="PC moderne" item="pc_moderne" reveal={reveal} onClick={() => collect("pc_moderne")} />
      )}
      {!compte && (
        <Hotspot cx={496} cy={438} r={32} label="photos d'enfance" item="photos_enfance" reveal={reveal} onClick={() => collect("photos_enfance")} />
      )}
      <Hotspot cx={830} cy={512} r={32} label="MARTINE" reveal={reveal} onClick={() => action("wreck")} />
      {mode !== "jeu2" && (
        <Hotspot cx={140} cy={506} r={44} label="… quelque chose de très bizarre" item="neurolien" reveal={reveal} onClick={() => collect("neurolien")} />
      )}
    </svg>
  );
}
