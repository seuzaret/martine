import Hotspot from "../../../engine/Hotspot.jsx";
import { PLayer } from "../../../engine/Parallax.jsx";

/* ============================================================
   CHAPITRE 7 — Tableau-ÉNIGME : « Comment garder une voix ? »
   ------------------------------------------------------------
   L'atelier d'Edison. Sur l'établi, PAS de phonographe : juste
   les pièces en vrac (aiguille, cylindre de cire, disque) et
   l'inventeur qui se pose une question. Le soleil d'été tape à
   la fenêtre (danger pour la cire).
   → Quand le joueur assemble aiguille + cire, le PHONOGRAPHE
     apparaît sur l'établi (prop `made`). Puis, une fois le
     disque gravé (msg_gramophone), un disque se met à tourner.
   Ce décor RÉAGIT à l'état du jeu via la prop `made`.
   ============================================================ */

export default function ScenePhonographe({ collect, action, reveal, made = [] }) {
  const built = made.includes("phonographe");   // l'aiguille a gravé la cire → la machine existe
  const gramo = made.includes("msg_gramophone"); // on est passé au disque plat

  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ph-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a5a52" /><stop offset="100%" stopColor="#5e3a34" /></linearGradient>
        <linearGradient id="ph-win" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ffe6a8" /><stop offset="100%" stopColor="#ffc060" /></linearGradient>
        <linearGradient id="ph-table" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7a4e2c" /><stop offset="100%" stopColor="#4a2e18" /></linearGradient>
        <linearGradient id="ph-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7a5a3c" /><stop offset="100%" stopColor="#3e2c1c" /></linearGradient>
        <linearGradient id="ph-horn" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f4c860" /><stop offset="60%" stopColor="#c98a2c" /><stop offset="100%" stopColor="#8a5a18" /></linearGradient>
        <radialGradient id="ph-sun" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#fff0c0" stopOpacity="0.8" /><stop offset="100%" stopColor="#ffd060" stopOpacity="0" /></radialGradient>
        <radialGradient id="ph-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffe9a8" stopOpacity="0.7" /><stop offset="100%" stopColor="#ffe9a8" stopOpacity="0" /></radialGradient>
        <filter id="ph-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
        <clipPath id="ph-winclip"><rect x="-56" y="-70" width="112" height="140" /></clipPath>
      </defs>

      {/* ═══ papier peint ═══ */}
      <rect width="1000" height="560" fill="url(#ph-wall)" />
      {[...Array(7)].map((_, r) => [...Array(11)].map((_, c) => (
        <path key={`${r}-${c}`} d={`M${40 + c * 96 + (r % 2 ? 48 : 0)} ${50 + r * 74} q6 -10 12 0 q-6 10 -12 0`} fill="#a86a5a" opacity="0.25" />
      )))}
      <rect width="1000" height="560" fill="#2c1810" opacity="0.16" filter="url(#ph-grain)" />

      {/* ═══ couche lointaine : la fenêtre ensoleillée (chaleur) + un cadre ═══ */}
      <PLayer depth={1}>
        <g transform="translate(820,180)">
          <rect x="-58" y="-72" width="116" height="144" fill="url(#ph-win)" />
          <g clipPath="url(#ph-winclip)">
            <ellipse cx="30" cy="-30" rx="40" ry="40" fill="#fff2c8" opacity="0.9" />
            {[...Array(8)].map((_, i) => <path key={i} d={`M30 -30 L${30 + Math.cos(i) * 70} ${-30 + Math.sin(i) * 70}`} stroke="#ffe08a" strokeWidth="2" opacity="0.5" />)}
            <path d="M-58 40 L-30 20 L-2 40 L26 18 L54 40 Z" fill="#c98a4a" opacity="0.5" />
          </g>
          <rect x="-58" y="-72" width="116" height="144" fill="none" stroke="#3a2418" strokeWidth="8" />
          <path d="M0 -72 v144 M-58 0 h116" stroke="#3a2418" strokeWidth="4" />
          <ellipse cx="0" cy="0" rx="130" ry="150" fill="url(#ph-sun)" style={{ animation: "glow 3s ease-in-out infinite" }} />
        </g>
        {/* petit cadre au mur */}
        <g transform="translate(150,150)">
          <rect x="-40" y="-30" width="80" height="60" fill="#d8c8a0" stroke="#5a3f24" strokeWidth="6" />
          <circle cx="0" cy="-4" r="12" fill="#b09070" />
          <path d="M-24 24 q24 -30 48 0 Z" fill="#9a7a58" />
        </g>
      </PLayer>

      {/* ═══ couche intermédiaire : L'INVENTEUR (Edison) à son établi ═══ */}
      <PLayer depth={2}>
        {/* bulle « ? » tant que rien n'est trouvé — signale qu'il y a une énigme */}
        {!built && (
          <g transform="translate(360,232)" style={{ animation: "glow 2.4s ease-in-out infinite" }}>
            <path d="M0 0 q0 -26 26 -26 q26 0 26 22 q0 18 -22 24 l0 8" fill="none" stroke="#ffd166" strokeWidth="4" />
            <circle cx="26" cy="40" r="3" fill="#ffd166" />
          </g>
        )}
        {/* la silhouette de l'inventeur, penché, cliquable */}
        <g transform="translate(300,360)">
          <path d="M-26 90 Q-34 20 -6 6 Q10 -2 24 6 Q40 18 34 90 Z" fill="#3a2c3a" />
          <path d="M-26 90 Q-34 20 -6 6 Q10 -2 24 6 Q40 18 34 90 Z" fill="#160c10" opacity="0.25" filter="url(#ph-grain)" />
          <circle cx="4" cy="-10" r="15" fill="#d8a884" />
          <path d="M-11 -14 q-2 -20 18 -18 q18 2 12 18 q-4 -8 -14 -8 q-12 0 -16 8 Z" fill="#4a3a34" />
          {/* moustache d'époque */}
          <path d="M-4 -4 q8 4 16 0" stroke="#4a3a34" strokeWidth="2.5" fill="none" />
          {/* bras tendu vers l'établi */}
          <path d="M24 20 q26 6 40 30" stroke="#d8a884" strokeWidth="7" fill="none" strokeLinecap="round" />
          {/* nœud papillon */}
          <path d="M-2 8 l8 -4 l0 8 Z M14 8 l-8 -4 l0 8 Z" fill="#7a2418" />
        </g>
      </PLayer>

      {/* ═══ premier plan : parquet, établi, pièces en vrac, invention ═══ */}
      <PLayer depth={3}>
        <rect y="410" width="1000" height="150" fill="url(#ph-floor)" />
        <rect y="412" width="1000" height="148" fill="#241408" opacity="0.34" filter="url(#ph-grain)" />
        <path d="M0 440 h1000 M0 480 h1000 M0 520 h1000 M120 410 v150 M340 410 v150 M560 410 v150 M780 410 v150" stroke="#2c1c0e" strokeWidth="1.4" opacity="0.4" />
        <ellipse cx="480" cy="480" rx="440" ry="46" fill="#241408" opacity="0.28" />

        {/* L'ÉTABLI (guéridon de travail) */}
        <g transform="translate(470,470)">
          <rect x="-8" y="10" width="16" height="70" fill="#4a2e18" />
          <path d="M-30 80 h60 M-24 84 l-8 6 M24 84 l8 6" stroke="#4a2e18" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="0" cy="8" rx="92" ry="18" fill="url(#ph-table)" />
          <ellipse cx="0" cy="4" rx="92" ry="16" fill="#6a4628" />

          {/* AVANT assemblage : un cornet posé de côté + un socle nu (les pièces attendent) */}
          {!built && (
            <g>
              {/* socle vide, prêt à recevoir la machine */}
              <rect x="-30" y="-14" width="60" height="18" rx="3" fill="#3a2414" opacity="0.9" />
              <ellipse cx="0" cy="-14" rx="30" ry="6" fill="#4a2e18" />
              {/* un cornet couché, en pièce détachée */}
              <g transform="translate(44,-4) rotate(18)">
                <path d="M0 0 Q26 -18 52 -24 Q54 -12 54 0 Q54 12 52 24 Q26 18 0 0 Z" fill="url(#ph-horn)" opacity="0.85" />
                <path d="M0 0 Q26 -18 52 -24 Q54 -12 54 0 Q54 12 52 24 Q26 18 0 0 Z" fill="none" stroke="#8a5a18" strokeWidth="1.6" opacity="0.7" />
              </g>
            </g>
          )}

          {/* APRÈS assemblage : LE PHONOGRAPHE monté (apparaît via `built`) */}
          {built && (
            <g style={{ animation: "pulse 0.7s ease-out 2" }}>
              <ellipse cx="0" cy="-6" rx="120" ry="60" fill="url(#ph-glow)" />
              <rect x="-40" y="-24" width="80" height="30" rx="4" fill="#3a2414" />
              <rect x="-40" y="-24" width="80" height="30" rx="4" fill="#160c04" opacity="0.3" filter="url(#ph-grain)" />
              {/* plateau + support tournant */}
              <ellipse cx="-14" cy="-24" rx="22" ry="8" fill="#5a3f24" />
              {/* si on n'a pas encore le disque : le cylindre de cire ; sinon un disque qui tourne */}
              {gramo ? (
                <g transform="translate(-14,-26)">
                  <ellipse cx="0" cy="0" rx="26" ry="8" fill="#1c1c22" style={{ transformOrigin: "0px 0px", animation: "spin 1.6s linear infinite" }} />
                  <ellipse cx="0" cy="0" rx="6" ry="2" fill="#a83828" />
                </g>
              ) : (
                <g transform="translate(-30,-40)">
                  <rect x="0" y="0" width="30" height="16" rx="4" fill="#e8dcc0" />
                  <path d="M0 4 h30 M0 10 h30" stroke="#c8b890" strokeWidth="1" />
                </g>
              )}
              {/* LE GRAND PAVILLON en place */}
              <g transform="translate(20,-30)">
                <path d="M0 0 Q40 -46 88 -60 Q92 -34 92 -10 Q92 14 88 40 Q40 26 0 -2 Z" fill="url(#ph-horn)" />
                <path d="M0 0 Q40 -46 88 -60 Q92 -34 92 -10 Q92 14 88 40 Q40 26 0 -2 Z" fill="none" stroke="#8a5a18" strokeWidth="2" />
                <ellipse cx="88" cy="-10" rx="8" ry="50" fill="#3a2408" opacity="0.5" />
                <path d="M0 0 q-14 -2 -22 6" stroke="#6a6c72" strokeWidth="3" fill="none" />
              </g>
              {/* petites notes de musique qui s'échappent une fois le disque gravé */}
              {gramo && [0, 1, 2].map((i) => (
                <text key={i} x={70 + i * 18} y={-58 - i * 10} fontSize="16" fill="#ffe9a8" opacity="0.9" style={{ animation: `drift ${2 + i * 0.6}s ease-in-out infinite` }}>♪</text>
              ))}
            </g>
          )}
        </g>

        {/* LES PIÈCES EN VRAC — chacune disparaît une fois SERVIE.
            aiguille + cire : consommées à l'assemblage du phonographe.
            disque : consommé plus tard, à la gravure du gramophone. */}
        {/* console de dépose (aiguille tant que non monté · disque tant que non gravé) */}
        {!gramo && (
          <g transform="translate(700,486)">
            <rect x="-70" y="-6" width="140" height="12" rx="2" fill="url(#ph-table)" />
            {/* LE DISQUE PLAT — reste jusqu'à la gravure du gramophone */}
            <g transform="translate(-34,-10)">
              <ellipse cx="0" cy="4" rx="38" ry="9" fill="#160c04" opacity="0.4" />
              <ellipse cx="0" cy="0" rx="38" ry="10" fill="#1c1c22" />
              <ellipse cx="0" cy="0" rx="38" ry="10" fill="none" stroke="#3a3a42" strokeWidth="1" />
              {[30, 22, 14].map((r, i) => <ellipse key={i} cx="0" cy="0" rx={r} ry={r * 0.26} fill="none" stroke="#3a3a42" strokeWidth="0.8" />)}
              <ellipse cx="0" cy="0" rx="6" ry="1.6" fill="#a83828" />
            </g>
            {/* L'AIGUILLE — disparaît une fois le phonographe monté */}
            {!built && (
              <g transform="translate(46,-8)">
                <rect x="-16" y="-4" width="32" height="12" rx="2" fill="#6a4628" />
                <rect x="-13" y="-2" width="26" height="8" fill="#2c1c10" />
                <path d="M-8 2 l16 0" stroke="#dfeaf2" strokeWidth="1.4" />
                <path d="M8 2 l6 -3" stroke="#c8c8d0" strokeWidth="2.4" strokeLinecap="round" />
              </g>
            )}
          </g>
        )}

        {/* LE CYLINDRE DE CIRE, exposé devant (menacé par la chaleur) */}
        {!built && (
          <g transform="translate(150,500)">
            <ellipse cx="0" cy="26" rx="30" ry="7" fill="#160c04" opacity="0.4" />
            <rect x="-22" y="-14" width="44" height="36" rx="4" fill="#e8dcc0" />
            <ellipse cx="0" cy="-14" rx="22" ry="7" fill="#f2ead6" />
            <ellipse cx="0" cy="22" rx="22" ry="7" fill="#d8ccae" />
            {[...Array(6)].map((_, i) => <ellipse key={i} cx="0" cy={-8 + i * 5} rx="22" ry="6" fill="none" stroke="#cabf9e" strokeWidth="0.7" />)}
            <path d="M18 -6 q6 8 2 18" stroke="#d8ccae" strokeWidth="2" fill="none" opacity="0.6" />
          </g>
        )}
      </PLayer>

      {/* voile chaud global */}
      <rect width="1000" height="560" fill="#3a1e08" opacity="0.06" style={{ pointerEvents: "none" }} />

      {/* ═══ zones cliquables ═══ */}
      {/* l'inventeur : pose son problème (dialogue) */}
      <Hotspot cx={310} cy={370} r={54} label="l'inventeur" reveal={reveal} onClick={() => action("edison")} />
      {/* le soleil d'été (chaleur) : toujours ramassable */}
      <Hotspot cx={820} cy={190} r={70} label="chaleur" item="chaleur" reveal={reveal} onClick={() => collect("chaleur")} />
      {/* aiguille & cire : tant que le phonographe n'est pas monté */}
      {!built && (
        <>
          <Hotspot cx={746} cy={478} r={30} label="aiguille" item="aiguille" reveal={reveal} onClick={() => collect("aiguille")} />
          <Hotspot cx={150} cy={498} r={40} label="cylindre de cire" item="cylindre_cire" reveal={reveal} onClick={() => collect("cylindre_cire")} />
        </>
      )}
      {/* disque : tant que le gramophone n'est pas gravé */}
      {!gramo && (
        <Hotspot cx={666} cy={476} r={40} label="disque" item="disque" reveal={reveal} onClick={() => collect("disque")} />
      )}
    </svg>
  );
}
