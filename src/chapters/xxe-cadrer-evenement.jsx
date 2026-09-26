import { useState, useEffect } from "react";
import { useWinOnce } from "../engine/useWinOnce.js";

/* ============================================================
   MINI-JEU : « Cadre l'événement » — JT du 9 nov. 1989
   ------------------------------------------------------------
<<<<<<< HEAD
   Une seule GRANDE image de la scène de Berlin. Le joueur
   déplace un « cadre TV » sur cette image et choisit ce qu'il
   veut mettre en Une du JT : la foule qui danse, un morceau de
   béton dans une main, un garde-frontière hébété, ou un couple
   qui s'embrasse. Le cadre glisse et zoome vers la zone choisie
   avec une petite transition. À la validation, l'image est
   projetée en gros dans une TV cathodique et MARTINE nomme ce
   que ce cadrage « fabrique » comme lecture.
   ============================================================ */

/* Coordonnées des zones cliquables sur la GRANDE image (viewBox
   0 0 800 460). Chaque zone donne un cadre { x, y, w, h } pour
   la TV finale et un verdict de MARTINE. */
const ZONES = [
  {
    id: "foule",
    label: "La foule qui danse",
    color: "#e0a848",
    frame: { x: 260, y: 60, w: 280, h: 160 },
    verdict: "Tu ouvres sur la FÊTE. C'est l'image la plus joyeuse. On oublie presque pourquoi ces gens sont là — c'est un peu dommage : l'histoire, c'est aussi ce qui a rendu cette fête possible.",
  },
  {
    id: "beton",
    label: "Un morceau de béton",
    color: "#a8a49c",
    frame: { x: 40, y: 260, w: 240, h: 160 },
    verdict: "Tu ouvres sur la RELIQUE. Une image qui parle plus fort que 100 mots : le mur est déjà passé au passé. Un peu triste, très fort.",
  },
  {
    id: "garde",
    label: "Le garde-frontière hébété",
    color: "#5a7aa0",
    frame: { x: 520, y: 180, w: 220, h: 200 },
    verdict: "Tu ouvres sur la BASCULE POLITIQUE. Cette image dit tout ce qui compte : celui qui interdisait laisse faire. C'est un régime entier qui vient de céder. Le plan des rédactions sérieuses.",
  },
  {
    id: "couple",
    label: "Le couple qui s'embrasse",
    color: "#c04a70",
    frame: { x: 300, y: 260, w: 240, h: 170 },
    verdict: "Tu ouvres sur l'HUMAIN. Le mur, c'était aussi des familles séparées. L'image la plus émouvante — celle qu'on retient dix ans après. Choix de la presse magazine.",
  },
];

/* La GRANDE image de la scène : tous les éléments cohabitent
   dans une seule image, on va « cadrer » dedans. */
function SceneEntiere() {
  return (
    <g>
      {/* fond nuit / avec des projecteurs, un peu de fumée dans l'air */}
      <defs>
        <linearGradient id="be-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e1a2a" />
          <stop offset="100%" stopColor="#28241a" />
        </linearGradient>
        <linearGradient id="be-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a8880" />
          <stop offset="100%" stopColor="#5a5850" />
        </linearGradient>
      </defs>
      <rect width="800" height="460" fill="url(#be-sky)" />

      {/* halo de projecteurs qui balaient le ciel */}
      <path d="M0 0 L120 200 L60 200 Z" fill="#f0e8a0" opacity="0.08" />
      <path d="M800 0 L680 200 L740 200 Z" fill="#f0e8a0" opacity="0.08" />

      {/* le MUR de Berlin — horizontal, épais, couvert de graffitis */}
      <rect x="0" y="180" width="800" height="140" fill="url(#be-wall)" />
      {/* joints entre blocs */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <line key={i} x1={i * 90} y1="180" x2={i * 90} y2="320" stroke="#3a3a34" strokeWidth="1.5" />
      ))}
      {[210, 250, 290].map((y) => (
        <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#3a3a34" strokeWidth="1" />
      ))}
      {/* graffitis */}
      <path d="M100 210 Q140 200 180 220 M220 250 Q260 240 300 260" stroke="#c04a30" strokeWidth="2.5" fill="none" />
      <text x="360" y="248" fontFamily="Georgia,serif" fontSize="18" fontWeight="800" fill="#c9a54a" opacity="0.85">FREIHEIT !</text>
      <path d="M580 220 Q610 210 640 230 M620 270 L680 280" stroke="#3a80c8" strokeWidth="2.5" fill="none" />

      {/* Zone 1 — LA FOULE qui danse SUR le mur, au centre-haut */}
      <g>
        {[[300, 170], [330, 165], [360, 172], [390, 165], [420, 170], [450, 168], [480, 172], [510, 165]].map(([x, y], i) => (
          <g key={`crowd-${i}`}>
            <circle cx={x} cy={y - 22} r="8" fill="#f0d0a0" />
            <path d={`M${x - 5} ${y - 14} L${x - 10} ${y + 4} M${x + 5} ${y - 14} L${x + 10} ${y + 4}`} stroke="#f0d0a0" strokeWidth="2" strokeLinecap="round" />
            <path d={`M${x} ${y - 14} L${x - 6} ${y + 14} L${x + 6} ${y + 14} Z`} fill={i % 2 ? "#c04a30" : "#3a80c8"} />
          </g>
        ))}
        {/* mains levées / drapeaux */}
        {[[320, 130], [400, 120], [470, 128]].map(([x, y], i) => (
          <g key={`flag-${i}`}>
            <line x1={x} y1={y + 30} x2={x} y2={y} stroke="#3a2418" strokeWidth="2" />
            <rect x={x} y={y - 4} width="16" height="10" fill={i === 1 ? "#000" : "#c04030"} />
            <rect x={x} y={y - 4} width="16" height="3" fill="#c9a54a" />
          </g>
        ))}
        {/* confettis en l'air */}
        {[[280, 90], [340, 100], [400, 80], [460, 100], [520, 90], [380, 60]].map(([x, y], i) => (
          <rect key={`conf-${i}`} x={x} y={y} width="4" height="3" fill={i % 3 === 0 ? "#e8542e" : i % 3 === 1 ? "#c9a54a" : "#7ab0c8"} />
        ))}
      </g>

      {/* Zone 2 — MAIN qui TIENT UN BÉTON, en bas à gauche */}
      <g transform="translate(160,340)">
        {/* bras + main */}
        <path d="M-70 80 Q-40 -10 20 -20 Q60 -14 60 30 L50 80 Z" fill="#e8bfa0" />
        {/* morceau de béton irrégulier */}
        <path d="M-10 -20 L36 -30 L46 -6 L34 20 L4 24 L-14 6 Z" fill="#a8a49c" stroke="#3a3a30" strokeWidth="1.2" />
        {/* graffiti sur le béton */}
        <path d="M0 -8 L18 -12 M12 6 L34 4 M2 16 L26 12" stroke="#c04a30" strokeWidth="1.6" opacity="0.9" />
        {/* poussière */}
        {[[10, -14], [28, 0], [22, 16], [2, 6]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.3" fill="#5a5850" opacity="0.7" />
        ))}
      </g>

      {/* Zone 3 — GARDE-FRONTIÈRE hébété à droite du portique, laisse passer */}
      <g transform="translate(630,260)">
        {/* poste-frontière — poteau + rayures */}
        <rect x="-90" y="-70" width="6" height="160" fill="#3a3628" />
        <rect x="-90" y="-70" width="24" height="10" fill="#c04030" />
        <rect x="-90" y="-58" width="24" height="8" fill="#f0e8d0" />
        <rect x="-90" y="-48" width="24" height="8" fill="#c04030" />
        <path d="M-84 -30 L20 -32" stroke="#5a5040" strokeWidth="6" />

        {/* le garde de face, épaules tombantes */}
        <g>
          <path d="M-18 60 Q-14 -10 0 -14 Q14 -10 18 60 Z" fill="#4a5a4a" />
          <line x1="0" y1="-14" x2="0" y2="50" stroke="#c9a54a" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="1.6" fill="#c9a54a" />
          <circle cx="0" cy="14" r="1.6" fill="#c9a54a" />
          {/* tête */}
          <circle cx="0" cy="-28" r="12" fill="#e8c8a8" />
          {/* casquette de travers */}
          <g transform="rotate(-14 0 -32)">
            <path d="M-12 -34 L12 -34 L10 -40 L-10 -40 Z" fill="#3a4838" />
            <ellipse cx="0" cy="-36" rx="14" ry="2" fill="#28321f" />
            <path d="M-10 -34 L10 -34 L8 -32 L-8 -32 Z" fill="#1a1a1a" />
          </g>
          {/* yeux baissés */}
          <path d="M-5 -28 L-2 -26 M2 -26 L5 -28" stroke="#1a1a1a" strokeWidth="1.2" />
          {/* bras tombant */}
          <path d="M-14 0 L-24 26" stroke="#4a5a4a" strokeWidth="8" strokeLinecap="round" />
          <path d="M14 0 L24 26" stroke="#4a5a4a" strokeWidth="8" strokeLinecap="round" />
        </g>
        {/* silhouettes flou qui passent derrière lui */}
        {[[40, 40], [60, 46], [80, 40]].map(([x, y], i) => (
          <g key={i} opacity="0.5">
            <circle cx={x} cy={y - 12} r="5" fill="#e0c8a8" />
            <path d={`M${x - 5} ${y - 6} Q${x} ${y + 20} ${x + 5} ${y - 6}`} fill="#3a3628" />
          </g>
        ))}
      </g>

      {/* Zone 4 — COUPLE qui s'embrasse, en bas au centre-droit */}
      <g transform="translate(420,360)">
        {/* deux têtes se rejoignent */}
        <g transform="translate(-16,0)">
          <circle cx="0" cy="0" r="26" fill="#e8bfa0" />
          <path d="M-26 -8 Q-32 -26 -20 -30 Q-6 -34 4 -26 Q8 -14 4 -6 Z" fill="#3a2418" />
        </g>
        <g transform="translate(16,0)">
          <circle cx="0" cy="0" r="24" fill="#e0b088" />
          <path d="M20 -10 Q28 -26 12 -30 Q-6 -32 -14 -26 L-14 -12 Q0 -16 20 -10 Z" fill="#5a3a20" />
        </g>
        {/* larmes qui coulent */}
        <path d="M-30 4 Q-32 12 -34 20" stroke="#8ab0d8" strokeWidth="0.8" fill="none" opacity="0.9" />
        <path d="M32 4 Q34 12 36 20" stroke="#8ab0d8" strokeWidth="0.8" fill="none" opacity="0.9" />
      </g>
    </g>
  );
}

export function CadrerEvenementGame({ onClose, onWin }) {
  const [step, setStep] = useState(0); // 0 = intro, 1 = choix (cadrage), 2 = résultat
  const [zone, setZone] = useState(null);
  const [reveal, setReveal] = useState(0);
=======
   Le mur de Berlin tombe. Le rédacteur en chef du JT a 4 plans
   possibles pour ouvrir l'édition du soir. L'élève en choisit UN.
   Chaque plan raconte l'événement autrement : fête, relique,
   bascule politique, humain. Aucun n'est faux — MARTINE nomme
   ce que chaque cadrage « fabrique » comme lecture. Introduit
   la notion : cadrer, c'est interpréter.
   ============================================================ */

const PLANS = [
  {
    id: "foule",
    label: "La foule qui danse sur le mur",
    color: "#e0a848",
    desc: "Jeunes des deux Berlin, verres à la main, hurlent leur joie sur le mur.",
    verdict: "Tu ouvres sur la FÊTE. C'est l'image la plus joyeuse. On oublie presque pourquoi ils sont là — et c'est un peu dommage : l'histoire, c'est aussi ce qui a rendu cette fête possible.",
    draw: (
      <g>
        <rect x="-96" y="-46" width="192" height="94" fill="#3a2818" />
        {/* mur horizontal en bas */}
        <rect x="-96" y="18" width="192" height="30" fill="#8a8a80" />
        {/* silhouettes qui dansent sur le mur */}
        {[[-72, 12], [-52, 8], [-28, 14], [-4, 6], [22, 12], [46, 8], [68, 14]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y - 6} r="3" fill="#f0d0a0" />
            <path d={`M${x} ${y} L${x - 3} ${y + 12} L${x + 3} ${y + 12} Z`} fill="#c04a30" />
            <path d={`M${x - 3} ${y - 3} L${x - 8} ${y + 4}`} stroke="#f0d0a0" strokeWidth="1.5" />
            <path d={`M${x + 3} ${y - 3} L${x + 8} ${y + 4}`} stroke="#f0d0a0" strokeWidth="1.5" />
          </g>
        ))}
        {/* confettis en l'air */}
        {[[-70, -30], [-40, -22], [-10, -34], [20, -26], [50, -30], [70, -18]].map(([x, y], i) => (
          <rect key={`c-${i}`} x={x} y={y} width="3" height="2" fill={i % 2 ? "#e8542e" : "#c9a54a"} />
        ))}
      </g>
    ),
  },
  {
    id: "beton",
    label: "Un morceau de béton dans une main",
    color: "#8a8880",
    desc: "Gros plan : une main tient un fragment du mur, encore couvert de graffitis.",
    verdict: "Tu ouvres sur la RELIQUE. Une image qui parle plus fort que 100 mots : le mur est déjà passé au passé. Un peu triste, très fort.",
    draw: (
      <g>
        <rect x="-96" y="-46" width="192" height="94" fill="#28221a" />
        {/* main tenant un morceau de béton */}
        <path d="M-30 40 Q-20 -8 8 -14 Q34 -18 36 12 L34 40 Z" fill="#e8bfa0" />
        {/* béton irrégulier */}
        <path d="M-8 -8 L26 -12 L30 4 L20 20 L-4 22 L-12 8 Z" fill="#a8a49c" stroke="#3a3a30" strokeWidth="0.8" />
        {/* graffiti sur le béton */}
        <path d="M-4 0 L6 -2 M10 6 L20 4 M-2 12 L14 10" stroke="#c04a30" strokeWidth="1.2" opacity="0.85" />
        {/* granulés / poussière */}
        {[[10, -6], [22, 2], [16, 12], [-2, 6]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1" fill="#5a5850" opacity="0.7" />
        ))}
      </g>
    ),
  },
  {
    id: "garde",
    label: "Un garde-frontière hébété qui laisse passer",
    color: "#4a6a90",
    desc: "Un jeune soldat est-allemand, casquette de travers, regarde la foule le dépasser.",
    verdict: "Tu ouvres sur la BASCULE POLITIQUE. Cette image dit tout ce qui compte : celui qui interdisait laisse faire. C'est un régime entier qui vient de céder. Le plan des rédactions sérieuses.",
    draw: (
      <g>
        <rect x="-96" y="-46" width="192" height="94" fill="#3a3628" />
        {/* portique / poste-frontière */}
        <rect x="-80" y="-40" width="6" height="86" fill="#5a5040" />
        <rect x="-84" y="-46" width="14" height="10" fill="#c04030" />
        {/* garde de face, épaules tombantes */}
        <g transform="translate(-16,-8)">
          {/* uniforme */}
          <path d="M-14 20 Q-12 -6 0 -8 Q12 -6 14 20 Z" fill="#4a5a4a" />
          {/* col et boutons */}
          <line x1="0" y1="-8" x2="0" y2="20" stroke="#c9a54a" strokeWidth="0.6" />
          <circle cx="0" cy="0" r="0.8" fill="#c9a54a" />
          <circle cx="0" cy="8" r="0.8" fill="#c9a54a" />
          {/* tête */}
          <circle cx="0" cy="-18" r="7" fill="#e8c8a8" />
          {/* casquette militaire, un peu de travers */}
          <path d="M-7 -22 L7 -22 L6 -26 L-6 -26 Z" fill="#3a4838" transform="rotate(-8 0 -22)" />
          <ellipse cx="0" cy="-24" rx="9" ry="1.5" fill="#28321f" transform="rotate(-8 0 -22)" />
          {/* visière */}
          <path d="M-6 -22 L6 -22 L4 -20 L-4 -20 Z" fill="#1a1a1a" transform="rotate(-8 0 -22)" />
          {/* yeux baissés */}
          <path d="M-3 -18 L-1 -17 M1 -17 L3 -18" stroke="#1a1a1a" strokeWidth="0.8" />
        </g>
        {/* silhouettes floues qui passent en arrière-plan */}
        {[[20, 30], [40, 26], [60, 30], [76, 28]].map(([x, y], i) => (
          <g key={i} opacity="0.55">
            <circle cx={x} cy={y - 10} r="3" fill="#e0c8a8" />
            <path d={`M${x - 4} ${y - 6} Q${x} ${y + 14} ${x + 4} ${y - 6}`} fill="#3a3628" />
          </g>
        ))}
      </g>
    ),
  },
  {
    id: "couple",
    label: "Un couple qui s'embrasse à l'ouverture du mur",
    color: "#c04a70",
    desc: "Deux visages, une longue étreinte : elle vient de l'Est, il vient de l'Ouest.",
    verdict: "Tu ouvres sur l'HUMAIN. Le mur, c'était aussi des familles séparées. L'image la plus émouvante — celle qu'on retient dix ans après. Choix de la presse magazine.",
    draw: (
      <g>
        <rect x="-96" y="-46" width="192" height="94" fill="#2a1e28" />
        {/* deux têtes qui s'embrassent, gros plan */}
        <g transform="translate(-14,4)">
          {/* tête gauche (elle) */}
          <circle cx="0" cy="0" r="24" fill="#e8bfa0" />
          {/* cheveux */}
          <path d="M-24 -6 Q-30 -22 -18 -26 Q-4 -30 4 -22 Q10 -12 4 -4 L-14 4 Z" fill="#3a2418" />
        </g>
        <g transform="translate(14,4)">
          {/* tête droite (il) */}
          <circle cx="0" cy="0" r="22" fill="#e0b088" />
          <path d="M18 -8 Q26 -22 12 -26 Q-6 -28 -14 -22 L-14 -10 Q0 -14 18 -8 Z" fill="#5a3a20" />
        </g>
        {/* larmes qui coulent */}
        <path d="M-24 4 Q-26 12 -28 20" stroke="#8ab0d8" strokeWidth="0.8" fill="none" opacity="0.8" />
        <path d="M26 4 Q28 12 30 20" stroke="#8ab0d8" strokeWidth="0.8" fill="none" opacity="0.8" />
        {/* voile de flou romantique en périphérie */}
        <rect x="-96" y="-46" width="192" height="94" fill="none" stroke="#c04a70" strokeWidth="1" opacity="0.15" />
      </g>
    ),
  },
];

export function CadrerEvenementGame({ onClose, onWin }) {
  const [step, setStep] = useState(0); // 0 = présentation, 1 = choix, 2 = résultat
  const [pick, setPick] = useState(null);
  const [reveal, setReveal] = useState(0); // pour l'anim TV finale
>>>>>>> origin/main
  const [done, setDone] = useState(false);
  useWinOnce(done, onWin);

  useEffect(() => {
    if (step !== 2) return;
    setReveal(0);
    const timers = [
      setTimeout(() => setReveal(1), 300),
      setTimeout(() => setReveal(2), 900),
<<<<<<< HEAD
      setTimeout(() => setReveal(3), 1400),
      setTimeout(() => setDone(true), 1700),
=======
      setTimeout(() => setReveal(3), 1500),
      setTimeout(() => setDone(true), 1800),
>>>>>>> origin/main
    ];
    return () => timers.forEach(clearTimeout);
  }, [step]);

  return (
    <div onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(4,8,14,0.88)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 70, backdropFilter: "blur(3px)" }}>
      <div onClick={(e) => e.stopPropagation()}
<<<<<<< HEAD
        style={{ background: "#0e1420", color: "#e8eef5", border: "2px solid #a02020", borderRadius: 14, padding: 20, maxWidth: 820, width: "100%", maxHeight: "94vh", overflowY: "auto", boxShadow: "0 12px 48px rgba(0,0,0,0.7)", fontFamily: "Georgia, serif" }}>
=======
        style={{ background: "#0e1420", color: "#e8eef5", border: "2px solid #a02020", borderRadius: 14, padding: 20, maxWidth: 700, width: "100%", maxHeight: "92vh", overflowY: "auto", boxShadow: "0 12px 48px rgba(0,0,0,0.7)", fontFamily: "Georgia, serif" }}>
>>>>>>> origin/main
        <div style={{ textAlign: "center", fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#a02020" }}>◉ RÉDACTION DU JT — 9 NOV. 1989</div>
        <h2 style={{ textAlign: "center", margin: "6px 0 6px", color: "#ffd166", fontSize: 22 }}>Cadre l'événement</h2>

        {step === 0 && (
          <>
            <p style={{ fontSize: 14, lineHeight: 1.55, textAlign: "center", margin: "0 0 12px", color: "#c8d4e2" }}>
<<<<<<< HEAD
              Le mur de Berlin est en train de tomber, en direct. Tu es dans la régie du JT de 20 h.
              <br />Le cameraman t'envoie sa grande image de la scène. À toi de <strong>choisir ce que tu montres en gros</strong> — tout ne rentrera pas dans le cadre.
            </p>
            <button onClick={() => setStep(1)}
              style={{ marginTop: 8, width: "100%", background: "#a02020", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: "pointer", fontSize: 14, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              Voir la scène →
=======
              Le mur de Berlin est en train de tomber, en direct. Tu ouvres le journal télévisé de 20 h dans quelques minutes.
              <br /><strong>Une seule image</strong> ouvrira l'édition. Ton reporter t'en propose quatre.
            </p>
            <button onClick={() => setStep(1)}
              style={{ marginTop: 8, width: "100%", background: "#a02020", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: "pointer", fontSize: 14, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              Voir les 4 plans →
>>>>>>> origin/main
            </button>
          </>
        )}

        {step === 1 && (
          <>
<<<<<<< HEAD
            <p style={{ fontSize: 12.5, color: "#8fa3bd", textAlign: "center", margin: "0 0 10px", fontStyle: "italic" }}>
              Passe la souris sur chaque zone : le cadre TV bouge et zoome. Clique pour choisir.
            </p>
            {/* GRANDE image avec cadre TV survolable */}
            <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", border: "1px solid #2a3648" }}>
              <svg viewBox="0 0 800 460" style={{ display: "block", width: "100%", height: "auto", background: "#0a0a10" }}>
                <SceneEntiere />
                {/* Voile sombre partout SAUF sur la zone sélectionnée (effet cadrage) */}
                <defs>
                  <mask id="frame-mask">
                    <rect width="800" height="460" fill="#fff" />
                    {zone && (
                      <rect x={zone.frame.x} y={zone.frame.y} width={zone.frame.w} height={zone.frame.h} fill="#000"
                        style={{ transition: "all .45s cubic-bezier(.4,0,.2,1)" }} />
                    )}
                  </mask>
                </defs>
                {zone && (
                  <rect width="800" height="460" fill="#000" opacity="0.55" mask="url(#frame-mask)" />
                )}
                {/* Rectangle "cadre TV" animé qui suit la zone */}
                {zone && (
                  <rect x={zone.frame.x} y={zone.frame.y} width={zone.frame.w} height={zone.frame.h}
                    fill="none" stroke={zone.color} strokeWidth="4" rx="6"
                    style={{ transition: "all .45s cubic-bezier(.4,0,.2,1)", filter: `drop-shadow(0 0 6px ${zone.color})` }} />
                )}
                {/* petits marqueurs cliquables (invisibles hors survol) */}
                {ZONES.map((z) => (
                  <rect key={z.id} x={z.frame.x} y={z.frame.y} width={z.frame.w} height={z.frame.h}
                    fill="transparent" style={{ cursor: "pointer" }}
                    onMouseEnter={() => setZone(z)} onClick={() => setZone(z)} />
                ))}
              </svg>
            </div>

            {/* boutons de choix rapide (accessibilité + mobile) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8, marginTop: 10 }}>
              {ZONES.map((z) => {
                const sel = zone?.id === z.id;
                return (
                  <button key={z.id} onClick={() => setZone(z)}
                    style={{ textAlign: "left", background: sel ? "#1a2536" : "#141b26", border: `2px solid ${sel ? z.color : "#2a3648"}`, borderRadius: 8, padding: "8px 10px", cursor: "pointer", color: "#e8eef5", fontFamily: "Georgia, serif" }}>
                    <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 9.5, letterSpacing: 1, color: z.color, fontWeight: 800, marginBottom: 2 }}>▸ CADRAGE</div>
                    <div style={{ fontSize: 12.5, fontWeight: 700, lineHeight: 1.25 }}>{z.label}</div>
=======
            <p style={{ fontSize: 13, lineHeight: 1.5, textAlign: "center", margin: "0 0 12px", color: "#8fa3bd" }}>
              Chaque image raconte le MÊME événement, autrement.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 10 }}>
              {PLANS.map((p) => {
                const sel = pick?.id === p.id;
                return (
                  <button key={p.id} onClick={() => setPick(p)}
                    style={{ textAlign: "left", background: sel ? "#1a2536" : "#141b26", border: `2px solid ${sel ? p.color : "#2a3648"}`, borderRadius: 10, padding: "10px", cursor: "pointer", fontFamily: "Georgia, serif", boxShadow: sel ? `0 0 0 2px ${p.color}44` : "none", transition: "all .15s" }}>
                    {/* aperçu SVG du plan */}
                    <svg viewBox="-96 -46 192 94" style={{ display: "block", width: "100%", height: "auto", borderRadius: 4 }}>
                      {p.draw}
                    </svg>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#e8eef5", marginTop: 6, lineHeight: 1.3 }}>{p.label}</div>
                    <div style={{ fontSize: 11.5, color: "#8fa3bd", fontStyle: "italic", marginTop: 3, lineHeight: 1.35 }}>{p.desc}</div>
>>>>>>> origin/main
                  </button>
                );
              })}
            </div>
<<<<<<< HEAD

            <button onClick={() => setStep(2)} disabled={!zone}
              style={{ marginTop: 12, width: "100%", background: zone ? "#a02020" : "#3a3648", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: zone ? "pointer" : "not-allowed", fontSize: 14, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              {zone ? "✓ Ouvrir le JT avec ce cadrage" : "Choisis d'abord un cadrage…"}
=======
            <button onClick={() => setStep(2)} disabled={!pick}
              style={{ marginTop: 14, width: "100%", background: pick ? "#a02020" : "#3a3648", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: pick ? "pointer" : "not-allowed", fontSize: 14, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              ✓ Ouvrir le JT avec cette image
>>>>>>> origin/main
            </button>
          </>
        )}

        {step === 2 && (
          <>
<<<<<<< HEAD
            {/* TV cathodique qui affiche la zone cadrée en gros */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
              <div style={{ background: "#3a2418", border: "8px solid #5a3a20", borderRadius: 14, padding: 10, boxShadow: "0 6px 20px rgba(0,0,0,0.6)" }}>
                <svg viewBox={`${zone.frame.x} ${zone.frame.y} ${zone.frame.w} ${zone.frame.h}`}
                  style={{ display: "block", width: 380, maxWidth: "100%", height: "auto", background: "#000", borderRadius: 10 }}>
                  <g style={{ opacity: reveal >= 1 ? 1 : 0, transition: "opacity .5s" }}>
                    <SceneEntiere />
                  </g>
                  {/* scanlines simulées cathodique */}
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                    <line key={i}
                      x1={zone.frame.x} y1={zone.frame.y + i * (zone.frame.h / 12)}
                      x2={zone.frame.x + zone.frame.w} y2={zone.frame.y + i * (zone.frame.h / 12)}
                      stroke="#000" strokeWidth={zone.frame.h / 240} opacity="0.22" />
                  ))}
                  {/* bandeau EN DIRECT rouge en bas */}
                  {reveal >= 2 && (
                    <g>
                      <rect x={zone.frame.x} y={zone.frame.y + zone.frame.h - zone.frame.h * 0.14}
                        width={zone.frame.w} height={zone.frame.h * 0.14} fill="#a02020" />
                      <text x={zone.frame.x + zone.frame.w / 2}
                        y={zone.frame.y + zone.frame.h - zone.frame.h * 0.04}
                        textAnchor="middle" fontFamily="ui-monospace,monospace"
                        fontSize={zone.frame.w * 0.032} fontWeight="800" fill="#fff">
                        ◉ EN DIRECT — BERLIN, 9 NOV. 1989
                      </text>
                    </g>
                  )}
=======
            {/* TV cathodique qui affiche l'image choisie en gros */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
              <div style={{ background: "#3a2418", border: "8px solid #5a3a20", borderRadius: 14, padding: 10, boxShadow: "0 6px 20px rgba(0,0,0,0.6)" }}>
                <svg viewBox="-96 -46 192 100" style={{ display: "block", width: 320, maxWidth: "100%", height: "auto", background: "#000", borderRadius: 10 }}>
                  <g style={{ opacity: reveal >= 1 ? 1 : 0, transition: "opacity .5s" }}>
                    {pick.draw}
                  </g>
                  {/* bandeau EN DIRECT */}
                  {reveal >= 2 && (
                    <g>
                      <rect x="-96" y="34" width="192" height="16" fill="#a02020" />
                      <text x="0" y="46" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="10" fontWeight="800" fill="#fff">◉ EN DIRECT — BERLIN, 9 NOV. 1989</text>
                    </g>
                  )}
                  {/* effet scanline pour la TV cathodique */}
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                    <line key={i} x1="-96" y1={-44 + i * 10} x2="96" y2={-44 + i * 10} stroke="#000" strokeWidth="0.35" opacity="0.2" />
                  ))}
>>>>>>> origin/main
                </svg>
              </div>
            </div>

<<<<<<< HEAD
            {reveal >= 3 && (
              <div style={{ marginTop: 14, background: "#101827", border: "1px solid #2a3648", borderRadius: 10, padding: "12px 14px", color: "#e8eef5", animation: "fadein .4s" }}>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
                  « {zone.verdict} Retiens : cadrer, c'est déjà interpréter. Deux JT peuvent ouvrir le même soir sur la même chute de mur, et raconter deux histoires différentes selon ce qu'ils choisissent de montrer. » — MARTINE
=======
            {/* Verdict MARTINE */}
            {reveal >= 3 && (
              <div style={{ marginTop: 14, background: "#101827", border: "1px solid #2a3648", borderRadius: 10, padding: "12px 14px", color: "#e8eef5", animation: "fadein .4s" }}>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
                  « {pick.verdict} Retiens : cadrer, c'est déjà interpréter. Deux JT peuvent ouvrir le même soir sur la même chute de mur — et raconter deux histoires différentes. Qui choisit ce qu'on montre ? » — MARTINE
>>>>>>> origin/main
                </p>
              </div>
            )}
            {reveal >= 3 && (
              <button onClick={onClose}
                style={{ marginTop: 12, width: "100%", background: "#a02020", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: "pointer", fontSize: 15, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
                Continuer
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
