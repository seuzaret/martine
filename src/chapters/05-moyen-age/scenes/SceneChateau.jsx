import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 5 — Tableau 1 : la salle du trône de Charles Bannister
   Peinture fine — un grand hall médiéval : le seigneur trône sur
   une estrade, deux gardes en armes l'encadrent, des armures et
   des tableaux décorent les murs. Derrière lui, un grand PAN DE
   MUR tendu d'une TOILE VIDE, prête à recevoir le récit de ses
   exploits (façon broderie de Bayeux). Devant le trône, un paysan
   supplie qu'on soigne son fils ; le prêtre renvoie au monastère.
   À trouver : la toile de lin (au mur) et le fil de laine coloré.
   ============================================================ */

export default function SceneChateau({ collect, action, reveal, made = [], flags = {}, queteQui }) {
  const brode = made.includes("msg_broderie");
  /* mode LIVRAISON (2e visite) : on a payé le traité et on doit le remettre.
     Le prêtre et le paysan deviennent des cibles où déposer le livre. */
  const livraison = flags.paye && !made.includes("remis");
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="cs-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a7c66" /><stop offset="100%" stopColor="#5a4e3c" /></linearGradient>
        <linearGradient id="cs-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7a5636" /><stop offset="100%" stopColor="#4a3320" /></linearGradient>
        <linearGradient id="cs-throne" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e6c25a" /><stop offset="100%" stopColor="#a8801f" /></linearGradient>
        <linearGradient id="cs-drape" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9a2530" /><stop offset="100%" stopColor="#611420" /></linearGradient>
        <linearGradient id="cs-win" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c8d8e0" /><stop offset="100%" stopColor="#e8dcb0" /></linearGradient>
        <filter id="cs-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* ═══ mur de pierre du grand hall ═══ */}
      <rect width="1000" height="560" fill="url(#cs-wall)" />
      <rect width="1000" height="560" fill="#2a2015" opacity="0.28" filter="url(#cs-grain)" />
      {/* joints de pierre */}
      <g stroke="#3a3022" strokeWidth="1.4" opacity="0.4">
        <path d="M0 90 h1000 M0 170 h1000 M0 250 h1000" />
        <path d="M80 10 v80 M240 10 v80 M400 10 v80 M560 10 v80 M720 10 v80 M880 10 v80" />
        <path d="M160 90 v80 M320 90 v80 M480 90 v80 M640 90 v80 M800 90 v80" />
      </g>

      {/* ═══ couche lointaine : fenêtres, bannières, tableaux, tapisserie ═══ */}
      <PLayer depth={1}>
        {/* deux hautes fenêtres en ogive laissant entrer le jour */}
        {[130, 870].map((x, i) => (
          <g key={i} transform={`translate(${x},40)`}>
            <path d="M-30 200 L-30 30 Q0 -14 30 30 L30 200 Z" fill="url(#cs-win)" />
            <path d="M-30 200 L-30 30 Q0 -14 30 30 L30 200 Z" fill="none" stroke="#3a3022" strokeWidth="7" />
            <path d="M0 200 V6 M-30 96 H30 M-30 150 H30" stroke="#3a3022" strokeWidth="3" />
          </g>
        ))}

        {/* bannières rouges à lion d'or, de part et d'autre de la tapisserie */}
        {[300, 700].map((x, i) => (
          <g key={i} transform={`translate(${x},44)`}>
            <path d="M-22 0 L22 0 L22 150 L0 132 L-22 150 Z" fill="url(#cs-drape)" />
            <path d="M-22 0 L22 0 L22 150 L0 132 L-22 150 Z" fill="none" stroke="#e6c25a" strokeWidth="2" />
            <path d="M0 40 q10 -10 10 8 q0 14 -10 18 q-10 -4 -10 -18 q0 -18 10 -8" fill="#e6c25a" />
            <circle cx="0" cy="62" r="3" fill="#611420" />
          </g>
        ))}

        {/* deux tableaux (portraits d'ancêtres) accrochés au mur */}
        {[[120, 300], [880, 300]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <rect x="-40" y="-52" width="80" height="104" rx="2" fill="#3a2c1c" />
            <rect x="-33" y="-45" width="66" height="90" fill="#6a6250" />
            {/* silhouette de portrait */}
            <circle cx="0" cy="-14" r="16" fill="#8a7a60" />
            <path d="M-24 45 Q-26 6 0 -2 Q26 6 24 45 Z" fill="#4a3f5a" />
            <rect x="-40" y="-52" width="80" height="104" rx="2" fill="none" stroke="#e6c25a" strokeWidth="2" opacity="0.6" />
          </g>
        ))}

        {/* ═══ LE GRAND PAN DE MUR : la tapisserie ═══ */}
        <g transform="translate(500,150)">
          {/* cadre de bois */}
          <rect x="-160" y="-96" width="320" height="196" rx="3" fill="#5a3f24" />
          <rect x="-160" y="-96" width="320" height="196" rx="3" fill="none" stroke="#3a2814" strokeWidth="3" />
          {!brode ? (
            /* TOILE VIDE, écrue, à peine tramée — elle attend le récit */
            <>
              <rect x="-150" y="-86" width="300" height="176" fill="#e6dcc4" />
              <rect x="-150" y="-86" width="300" height="176" fill="#8a7a56" opacity="0.12" filter="url(#cs-grain)" />
              <g stroke="#c9b892" strokeWidth="1" opacity="0.5">
                {[-60, -20, 20, 60].map((y, i) => <path key={i} d={`M-150 ${y} h300`} />)}
              </g>
              <text x="0" y="6" textAnchor="middle" fontSize="15" fill="#9a8a66" fontFamily="Palatino, Georgia, serif" fontStyle="italic">(toile vide — à broder)</text>
            </>
          ) : (
            /* LA BRODERIE DES EXPLOITS (résultat msg_broderie) : bande façon
               Bayeux — cavaliers, soldats, bateaux, bordures narratives. */
            <g style={{ animation: "fadein 1.1s ease-out" }}>
              <rect x="-150" y="-86" width="300" height="176" fill="#efe6cc" />
              {/* deux bordures décoratives haut/bas */}
              {[-78, 82].map((y, i) => (
                <g key={i}>
                  <path d={`M-150 ${y} h300`} stroke="#a8302a" strokeWidth="1.6" />
                  {[...Array(15)].map((_, k) => <path key={k} d={`M${-146 + k * 20} ${y - 5} l5 10 l5 -10`} stroke="#2a6a9a" strokeWidth="1.2" fill="none" />)}
                </g>
              ))}
              {/* rangée du haut : cavaliers */}
              {[-120, -72, -24, 24, 72, 120].map((x, i) => (
                <g key={i} transform={`translate(${x},-40)`}>
                  <path d="M-12 6 q4 -6 12 -6 q4 -4 8 0 l-2 6 Z" fill={["#a8302a", "#c89030", "#2a6a9a"][i % 3]} />
                  <path d="M-10 6 l-3 8 M8 6 l3 8 M-6 6 l0 8 M2 6 l0 8" stroke="#5a4a2e" strokeWidth="1.4" />
                  <circle cx="6" cy="-4" r="3.4" fill="#c8a882" />
                  <path d="M8 -8 l8 -4" stroke="#7a6a4a" strokeWidth="1.4" />
                </g>
              ))}
              {/* légende latine brodée */}
              <text x="0" y="4" textAnchor="middle" fontSize="12" fill="#7a3020" fontFamily="Palatino, Georgia, serif" letterSpacing="2">HIC KAROLVS DVX · FORTIS IN BELLO</text>
              {/* rangée du bas : fantassins + navire */}
              {[-120, -84, -48, -12].map((x, i) => (
                <g key={i} transform={`translate(${x},52)`}>
                  <path d="M-6 0 q6 -12 12 0 l-2 10 h-8 Z" fill={["#2a6a9a", "#a8302a"][i % 2]} />
                  <path d="M6 -6 l8 -6" stroke="#8a8c92" strokeWidth="1.6" />
                  <circle cx="0" cy="-8" r="3" fill="#c8a882" />
                </g>
              ))}
              <g transform="translate(90,52)">
                <path d="M-30 4 Q0 18 30 4 L24 -6 L-24 -6 Z" fill="#8a5a2e" />
                <path d="M0 -6 v-24 M0 -26 l22 8 l-22 6" fill="#a8302a" stroke="#5a3f24" strokeWidth="1.4" />
              </g>
            </g>
          )}
        </g>
      </PLayer>

      {/* ═══ couche intermédiaire : estrade, trône, armures, gardes ═══ */}
      <PLayer depth={2}>
        {/* tapis rouge central */}
        <path d="M430 560 L570 560 L520 300 L480 300 Z" fill="url(#cs-drape)" opacity="0.9" />
        <path d="M430 560 L570 560 L520 300 L480 300 Z" fill="none" stroke="#e6c25a" strokeWidth="2" opacity="0.5" />

        {/* estrade à deux marches */}
        <path d="M360 402 h280 v22 h-280 Z" fill="#6a4c2e" />
        <path d="M330 424 h340 v26 h-340 Z" fill="#5a3f24" />

        {/* LE TRÔNE + Charles Bannister assis */}
        <g transform="translate(500,300)">
          {/* dossier haut, doré, drapé de rouge */}
          <rect x="-46" y="0" width="92" height="110" rx="6" fill="url(#cs-throne)" />
          <rect x="-38" y="8" width="76" height="94" fill="url(#cs-drape)" />
          <path d="M-46 0 q46 -30 92 0" fill="url(#cs-throne)" />
          {[-46, 46].map((x, i) => <circle key={i} cx={x} cy="4" r="8" fill="#e6c25a" stroke="#a8801f" strokeWidth="1.4" />)}
          {/* accoudoirs */}
          <rect x="-58" y="70" width="16" height="40" rx="3" fill="url(#cs-throne)" />
          <rect x="42" y="70" width="16" height="40" rx="3" fill="url(#cs-throne)" />

          {/* CHARLES assis : robe pourpre bordée d'hermine, cercle d'or */}
          <path d="M-26 108 Q-32 44 0 34 Q32 44 26 108 Z" fill="#7a2a44" />
          <path d="M-26 108 Q0 118 26 108 L22 100 Q0 108 -22 100 Z" fill="#efe9dc" />
          <path d="M-20 60 Q0 70 20 60" stroke="#e6c25a" strokeWidth="3" fill="none" />
          {/* mains posées, une tenant un sceptre court */}
          <circle cx="-20" cy="66" r="5" fill="#c8a882" />
          <circle cx="20" cy="66" r="5" fill="#c8a882" />
          <path d="M20 66 v-26" stroke="#a8801f" strokeWidth="3" /><circle cx="20" cy="40" r="4" fill="#e6c25a" />
          {/* tête + barbe courte + cercle d'or */}
          <circle cx="0" cy="20" r="13" fill="#d2a878" />
          <path d="M-11 22 q11 14 22 0 q-2 12 -11 12 q-9 0 -11 -12" fill="#6a4a2e" />
          <path d="M-12 12 q12 -8 24 0 q-4 -8 -12 -8 q-8 0 -12 8" fill="#5a3f24" />
          <path d="M-13 12 q13 -6 26 0 l0 -4 q-13 -5 -26 0 Z" fill="#e6c25a" stroke="#a8801f" strokeWidth="1" />
          <circle cx="0" cy="9" r="2.4" fill="#9a2530" />
        </g>

        {/* deux ARMURES décoratives sur socle, contre les murs */}
        {[110, 890].map((x, i) => (
          <g key={i} transform={`translate(${x},430)`}>
            <ellipse cx="0" cy="60" rx="26" ry="7" fill="#0a0603" opacity="0.5" />
            <rect x="-18" y="42" width="36" height="10" fill="#3a3f48" />
            {/* jambières + torse + heaume */}
            <path d="M-14 42 l4 -34 h20 l4 34 Z" fill="#aeb6c2" />
            <path d="M-16 8 Q-20 -18 0 -22 Q20 -18 16 8 Z" fill="#c2cad6" />
            <path d="M-16 8 Q0 16 16 8" stroke="#8a94a2" strokeWidth="2" fill="none" />
            <circle cx="0" cy="-30" r="11" fill="#c2cad6" />
            <path d="M-11 -30 h22 M0 -41 v22" stroke="#7a8290" strokeWidth="2" />
            <path d="M-3 -34 h6 v10 h-6 Z" fill="#3a3f48" />
            {/* lance appuyée */}
            <path d="M22 -46 v96" stroke="#6a4c2e" strokeWidth="3" />
            <path d="M22 -46 l-5 12 l5 -2 l5 2 Z" fill="#c2cad6" />
          </g>
        ))}

        {/* deux GARDES en armes, encadrant l'estrade */}
        {[[398, 452, 1], [602, 452, -1]].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <ellipse cx="0" cy="42" rx="20" ry="6" fill="#0a0603" opacity="0.5" />
            {/* jambes + tunique */}
            <path d="M-13 42 Q-17 2 0 -6 Q17 2 13 42 Z" fill="#3a5a7a" />
            <path d="M-13 20 Q0 28 13 20" stroke="#2a4460" strokeWidth="2.5" fill="none" />
            {/* plastron + tabard */}
            <path d="M-11 6 L11 6 L8 34 L-8 34 Z" fill="#aeb6c2" opacity="0.85" />
            {/* tête + heaume conique */}
            <circle cx="0" cy="-14" r="9" fill="#c8a882" />
            <path d="M-9 -16 Q0 -34 9 -16 Z" fill="#9aa2b0" />
            <path d="M-9 -16 h18 M-3 -16 v-12" stroke="#7a8290" strokeWidth="1.6" />
            {/* bras + lance (côté extérieur) + bouclier (côté intérieur) */}
            <path d={`M${13 * s} -4 q${16 * s} 4 ${16 * s} 18`} stroke="#c8a882" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d={`M${29 * s} -40 v80`} stroke="#6a4c2e" strokeWidth="3.4" />
            <path d={`M${29 * s} -40 l${-5 * s} 12 l${5 * s} -2 l${5 * s} 2 Z`} fill="#c2cad6" />
            <g transform={`translate(${-16 * s},14)`}>
              <path d="M-11 -14 L11 -14 L11 6 Q0 20 -11 6 Z" fill="#9a2530" />
              <path d="M0 -14 v34 M-11 -4 h22" stroke="#e6c25a" strokeWidth="1.8" />
            </g>
          </g>
        ))}
      </PLayer>

      {/* ═══ premier plan : sol, paysan suppliant, prêtre, laine, épave ═══ */}
      <PLayer depth={3}>
        <rect y="450" width="1000" height="110" fill="url(#cs-floor)" />
        <rect y="452" width="1000" height="108" fill="#2a1c10" opacity="0.32" filter="url(#cs-grain)" />
        <path d="M0 500 h1000 M240 450 v110 M500 450 v110 M760 450 v110" stroke="#2a1c10" strokeWidth="1.6" opacity="0.4" />

        {/* LE PAYSAN agenouillé, mains jointes, suppliant (devant, à gauche) */}
        <g transform="translate(348,500)">
          <ellipse cx="0" cy="30" rx="30" ry="8" fill="#0a0603" opacity="0.5" />
          {/* jambe repliée + tunique brune rapiécée */}
          <path d="M-22 30 Q-24 8 -4 4 Q6 2 14 8 Q26 16 22 30 Z" fill="#7a5a38" />
          <path d="M2 10 l10 4 M-10 12 l-6 6" stroke="#5a4026" strokeWidth="1.6" />
          {/* buste penché en avant, mains jointes */}
          <path d="M-14 8 Q-20 -14 -2 -20 Q14 -22 16 -6 L10 8 Z" fill="#8a6a44" />
          <circle cx="-4" cy="-24" r="8" fill="#c8a882" />
          <path d="M-12 -26 q8 -6 16 -2" stroke="#5a4632" strokeWidth="3" fill="none" />
          {/* mains jointes tendues vers le trône */}
          <path d="M4 -12 q16 -2 22 4" stroke="#c8a882" strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="27" cy="-7" r="5" fill="#d2b088" />
        </g>

        {/* LE PRÊTRE debout, en aube sombre, tenant un livre (à droite) */}
        <g transform="translate(676,494)">
          <ellipse cx="0" cy="38" rx="22" ry="7" fill="#0a0603" opacity="0.5" />
          <path d="M-16 38 Q-18 -8 0 -18 Q18 -8 16 38 Z" fill="#2c2a34" />
          <path d="M0 -18 v56" stroke="#4a4856" strokeWidth="2" opacity="0.6" />
          {/* étole */}
          <path d="M-8 -14 L-4 30 M8 -14 L4 30" stroke="#7a2a44" strokeWidth="3" />
          <circle cx="0" cy="-26" r="8.5" fill="#c8a882" />
          <path d="M-9 -30 q9 -4 18 0 q-2 -7 -9 -7 q-7 0 -9 7" fill="#5a5060" />
          {/* mains tenant un petit livre */}
          <path d="M-12 -4 q-8 6 -6 14 M12 -4 q8 6 6 14" stroke="#c8a882" strokeWidth="4" fill="none" strokeLinecap="round" />
          <rect x="-11" y="8" width="22" height="15" rx="1.5" fill="#5a2a2e" />
          <path d="M0 8 v15" stroke="#3a1a1e" strokeWidth="1.4" />
        </g>

        {/* PANIER DE FIL DE LAINE coloré (à gauche, au sol) */}
        <g transform="translate(168,512)">
          <path d="M-26 -6 Q-28 14 0 16 Q28 14 26 -6 Z" fill="#8a6a42" />
          <path d="M-22 -6 q22 7 44 0" stroke="#6e5232" strokeWidth="1.6" fill="none" opacity="0.6" />
          {[["#c8382e", -14, -4], ["#2a6a9a", 2, -8], ["#e0b040", 15, -2], ["#3a8a4a", -2, 3], ["#9a2530", 12, 5]].map(([c, x, y], i) => (
            <g key={i}><circle cx={x} cy={y} r="8" fill={c} /><path d={`M${x - 6} ${y} q6 -4 12 0`} stroke="#fff" strokeWidth="0.8" opacity="0.3" fill="none" /></g>
          ))}
        </g>

        {/* épave de MARTINE, échouée dans un coin de la cour (à droite) */}
        <g transform="translate(918,516) rotate(8)">
          <ellipse cx="0" cy="12" rx="26" ry="6" fill="#0a0603" opacity="0.6" />
          <path d="M0 -20 Q18 -18 20 -4 Q22 8 11 11 L-11 11 Q-22 8 -20 -4 Q-18 -18 0 -20 Z" fill="#8a6240" />
          <circle cx="-1" cy="-4" r="5.5" fill="#cfeaff" stroke="#5c3a22" strokeWidth="1.4" />
          <rect x="-13" y="3" width="24" height="7" rx="2" fill="#0c1410" stroke="#5c3a22" strokeWidth="1" />
          <text x="-1" y="9" textAnchor="middle" fontSize="5.5" fill="#5eff9e" fontFamily="ui-monospace,monospace" style={{ animation: "pulse 2.2s infinite" }}>1450</text>
          <circle cx="13" cy="-27" r="2.3" fill="#5eff9e" style={{ animation: "pulse 1.5s infinite" }} />
          <path d="M8 -20 q6 -8 13 -6" stroke="#8a94a8" strokeWidth="2.3" fill="none" strokeLinecap="round" />
        </g>
      </PLayer>

      {/* voile global chaud */}
      <rect width="1000" height="560" fill="#1a1206" opacity="0.06" style={{ pointerEvents: "none" }} />

      {/* ═══ zones cliquables ═══ */}
      {/* le « ? » du seigneur (tant qu'il est le personnage de la quête) */}
      {queteQui === "charles" && (
        <>
          <g transform="translate(482,236)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
            <path d="M0 0 q0 -20 20 -20 q20 0 20 17 q0 14 -17 18 l0 6" fill="none" stroke="#ffd166" strokeWidth="4" />
            <circle cx="20" cy="31" r="2.6" fill="#ffd166" />
          </g>
          <Hotspot cx={500} cy={330} r={52} label="parler au seigneur Bannister" reveal={reveal} onClick={() => action("charles")} />
        </>
      )}

      {/* le paysan et le prêtre : le contexte de la quête de Galien.
          Un « ? » doré apparaît sur celui dont c'est le tour dans la quête. */}
      {queteQui === "paysan" && (
        <g transform="translate(334,430)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
          <path d="M0 0 q0 -20 20 -20 q20 0 20 17 q0 14 -17 18 l0 6" fill="none" stroke="#ffd166" strokeWidth="4" />
          <circle cx="20" cy="31" r="2.6" fill="#ffd166" />
        </g>
      )}
      <Hotspot cx={352} cy={484} r={34} label={livraison ? "donner le traité au paysan" : "le paysan suppliant"} {...(livraison ? { item: "paysan" } : {})} reveal={reveal} onClick={() => action("paysan")} />
      {queteQui === "pretre" && (
        <g transform="translate(658,424)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
          <path d="M0 0 q0 -20 20 -20 q20 0 20 17 q0 14 -17 18 l0 6" fill="none" stroke="#ffd166" strokeWidth="4" />
          <circle cx="20" cy="31" r="2.6" fill="#ffd166" />
        </g>
      )}
      <Hotspot cx={676} cy={476} r={32} label={livraison ? "remettre le traité au prêtre" : "le prêtre"} {...(livraison ? { item: "pretre" } : {})} reveal={reveal} onClick={() => action("pretre")} />

      {/* la toile de lin (au mur) — seulement tant que la broderie n'est pas faite */}
      {!brode && (
        <Hotspot cx={500} cy={150} r={92} label="la toile de lin (à broder)" item="toile_lin" reveal={reveal} onClick={() => collect("toile_lin")} />
      )}
      {/* le fil de laine coloré (seulement tant que la broderie n'est pas faite) */}
      {!brode && (
        <Hotspot cx={168} cy={508} r={40} label="fil de laine coloré" item="fil_laine" reveal={reveal} onClick={() => collect("fil_laine")} />
      )}
      {/* l'épave de MARTINE */}
      <Hotspot cx={918} cy={510} r={32} label="MARTINE" reveal={reveal} onClick={() => action("wreck")} />
          {/* AMBIANCE : petit vol d'oiseaux qui traverse le ciel */}
      <g opacity="0.75">
        <animateTransform attributeName="transform" type="translate"
          values="-40,0; 1050,-20" dur="28s" repeatCount="indefinite" />
        <path d="M0 130 q6 -8 12 0 q6 -8 12 0" stroke="#1a1408" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M28 142 q6 -8 12 0 q6 -8 12 0" stroke="#1a1408" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M54 128 q6 -8 12 0 q6 -8 12 0" stroke="#1a1408" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
</svg>
  );
}
