import { useState, useEffect } from "react";
import { useWinOnce } from "../engine/useWinOnce.js";

/* ============================================================
   MINI-JEU : « Cadre l'événement » — JT du 9 nov. 1989
   ------------------------------------------------------------
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
  const [done, setDone] = useState(false);
  useWinOnce(done, onWin);

  useEffect(() => {
    if (step !== 2) return;
    setReveal(0);
    const timers = [
      setTimeout(() => setReveal(1), 300),
      setTimeout(() => setReveal(2), 900),
      setTimeout(() => setReveal(3), 1500),
      setTimeout(() => setDone(true), 1800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [step]);

  return (
    <div onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(4,8,14,0.88)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 70, backdropFilter: "blur(3px)" }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ background: "#0e1420", color: "#e8eef5", border: "2px solid #a02020", borderRadius: 14, padding: 20, maxWidth: 700, width: "100%", maxHeight: "92vh", overflowY: "auto", boxShadow: "0 12px 48px rgba(0,0,0,0.7)", fontFamily: "Georgia, serif" }}>
        <div style={{ textAlign: "center", fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#a02020" }}>◉ RÉDACTION DU JT — 9 NOV. 1989</div>
        <h2 style={{ textAlign: "center", margin: "6px 0 6px", color: "#ffd166", fontSize: 22 }}>Cadre l'événement</h2>

        {step === 0 && (
          <>
            <p style={{ fontSize: 14, lineHeight: 1.55, textAlign: "center", margin: "0 0 12px", color: "#c8d4e2" }}>
              Le mur de Berlin est en train de tomber, en direct. Tu ouvres le journal télévisé de 20 h dans quelques minutes.
              <br /><strong>Une seule image</strong> ouvrira l'édition. Ton reporter t'en propose quatre.
            </p>
            <button onClick={() => setStep(1)}
              style={{ marginTop: 8, width: "100%", background: "#a02020", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: "pointer", fontSize: 14, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              Voir les 4 plans →
            </button>
          </>
        )}

        {step === 1 && (
          <>
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
                  </button>
                );
              })}
            </div>
            <button onClick={() => setStep(2)} disabled={!pick}
              style={{ marginTop: 14, width: "100%", background: pick ? "#a02020" : "#3a3648", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: pick ? "pointer" : "not-allowed", fontSize: 14, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              ✓ Ouvrir le JT avec cette image
            </button>
          </>
        )}

        {step === 2 && (
          <>
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
                </svg>
              </div>
            </div>

            {/* Verdict MARTINE */}
            {reveal >= 3 && (
              <div style={{ marginTop: 14, background: "#101827", border: "1px solid #2a3648", borderRadius: 10, padding: "12px 14px", color: "#e8eef5", animation: "fadein .4s" }}>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
                  « {pick.verdict} Retiens : cadrer, c'est déjà interpréter. Deux JT peuvent ouvrir le même soir sur la même chute de mur — et raconter deux histoires différentes. Qui choisit ce qu'on montre ? » — MARTINE
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
