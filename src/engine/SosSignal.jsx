import { useEffect, useRef, useState } from 'react';

/* ============================================================
   SOS SIGNAL — bouton flottant + animation Morse ··· −−− ···
   ============================================================
   Après chaque invention transmise, un bouton 🆘 pulsé apparaît
   en bas à droite. Clic → animation en 9 temps du motif SOS
   (3 brefs, 3 longs, 3 brefs) avec sons Morse. L'équipe de
   sauvetage capte le signal — bonus de flux temporel (compté
   pour plus tard).
   ============================================================ */

/* Le motif : durées en ms, alternant SIGNAL (true) / silence (false) */
const SEQ = [
  { on: true, d: 130 }, { on: false, d: 130 },   // ·
  { on: true, d: 130 }, { on: false, d: 130 },   // ·
  { on: true, d: 130 }, { on: false, d: 350 },   // ·  (fin de S, gros silence)
  { on: true, d: 380 }, { on: false, d: 130 },   // −
  { on: true, d: 380 }, { on: false, d: 130 },   // −
  { on: true, d: 380 }, { on: false, d: 350 },   // − (fin de O)
  { on: true, d: 130 }, { on: false, d: 130 },   // ·
  { on: true, d: 130 }, { on: false, d: 130 },   // ·
  { on: true, d: 130 },                          // ·
];
/* Représentation visuelle des 9 signaux (pour la barre du haut) */
const SYMBOLS = ['·', '·', '·', '−', '−', '−', '·', '·', '·'];

/* WebAudio : petit bip Morse à 700 Hz (fréquence standard). */
let AC = null;
function beep(durMs) {
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    if (AC.state === 'suspended') AC.resume();
    const t = AC.currentTime;
    const o = AC.createOscillator(); o.type = 'sine'; o.frequency.value = 700;
    const g = AC.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.15, t + 0.008);
    g.gain.setValueAtTime(0.15, t + durMs / 1000 - 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + durMs / 1000);
    o.connect(g); g.connect(AC.destination);
    o.start(t); o.stop(t + durMs / 1000 + 0.02);
  } catch { /* audio indisponible */ }
}

/* --- Bouton flottant 🆘 en bas à droite, pulsé --- */
export function SosButton({ onClick }) {
  return (
    <button onClick={onClick} title="Envoyer un SOS pour être retrouvé"
      style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 60,
        width: 68, height: 68, borderRadius: '50%',
        background: 'linear-gradient(140deg, #ff5030, #c02020)',
        color: '#fff', border: '3px solid #fff',
        boxShadow: '0 4px 24px rgba(230,60,32,0.7), 0 0 0 6px rgba(230,60,32,0.25)',
        fontSize: 26, fontWeight: 800, cursor: 'pointer',
        fontFamily: 'ui-monospace, monospace', letterSpacing: 1,
        animation: 'sosPulse 1.2s ease-in-out infinite',
      }}>
      🆘
      <style>{`
        @keyframes sosPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 24px rgba(230,60,32,0.7), 0 0 0 6px rgba(230,60,32,0.25); }
          50%      { transform: scale(1.08); box-shadow: 0 4px 32px rgba(230,60,32,0.9), 0 0 0 12px rgba(230,60,32,0.15); }
        }
      `}</style>
    </button>
  );
}

/* --- Overlay qui joue l'animation Morse SOS --- */
export function SosOverlay({ muted, onDone }) {
  const [step, setStep] = useState(-1);       // -1 avant le début, 0..8 pendant
  const [litNow, setLitNow] = useState(false);
  const [done, setDone] = useState(false);
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;
    let i = 0;
    let symbolIdx = -1;
    const tick = () => {
      if (cancelled.current || i >= SEQ.length) {
        if (!cancelled.current) {
          setDone(true);
          setTimeout(() => onDone?.(), 1400);
        }
        return;
      }
      const seg = SEQ[i];
      setLitNow(seg.on);
      if (seg.on) {
        symbolIdx++;
        setStep(symbolIdx);
        if (!muted) beep(seg.d);
      }
      i++;
      setTimeout(tick, seg.d);
    };
    // petit délai avant le premier bip
    const start = setTimeout(tick, 350);
    return () => { cancelled.current = true; clearTimeout(start); };
  }, [muted]); // eslint-disable-line

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 95,
      background: 'rgba(6,4,2,0.85)', backdropFilter: 'blur(6px)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontFamily: '"Segoe UI", system-ui, sans-serif',
      animation: 'sosFadeIn 0.35s ease-out',
    }}>
      <div style={{ fontSize: 12, letterSpacing: 4, color: '#ffd166', textTransform: 'uppercase', marginBottom: 10 }}>
        Émission d'un signal de détresse
      </div>
      <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 3, color: '#f8efdd', marginBottom: 32 }}>
        S · O · S
      </div>

      {/* La grande lampe qui clignote au rythme du Morse */}
      <div style={{
        width: 200, height: 200, borderRadius: '50%',
        background: litNow ? 'radial-gradient(circle, #ffe870 0%, #ff9040 60%, #6a1810 100%)' : '#2a1a10',
        border: `4px solid ${litNow ? '#ffe870' : '#5a3818'}`,
        boxShadow: litNow ? '0 0 80px 20px #ffb050, inset 0 0 40px #fff8c0' : 'inset 0 0 20px rgba(0,0,0,0.6)',
        transition: 'background 0.05s, box-shadow 0.05s, border-color 0.05s',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ fontSize: 64, color: litNow ? '#3a0a0a' : '#5a3818', fontWeight: 900 }}>🆘</div>
      </div>

      {/* La séquence des 9 symboles apparaît au fur et à mesure */}
      <div style={{ display: 'flex', gap: 6, marginTop: 32, minHeight: 60, alignItems: 'center' }}>
        {SYMBOLS.map((s, i) => (
          <span key={i} style={{
            display: 'inline-block',
            width: s === '−' ? 40 : 20, height: 20,
            background: i <= step ? '#ffd166' : 'rgba(255,209,102,0.18)',
            borderRadius: 4,
            transition: 'background 0.12s',
            boxShadow: i === step && litNow ? '0 0 14px #ffd166' : 'none',
          }} />
        ))}
      </div>

      {done && (
        <div style={{
          marginTop: 32, textAlign: 'center',
          animation: 'sosFadeIn 0.5s ease-out',
        }}>
          <div style={{ fontSize: 22, color: '#7fe0a8', fontWeight: 700, marginBottom: 8 }}>
            ✓ Signal reçu par l'équipe de sauvetage
          </div>
          <div style={{ fontSize: 13, color: '#c8b090' }}>
            +1 flux temporel · un pas de plus vers le retour
          </div>
        </div>
      )}

      <style>{`@keyframes sosFadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  );
}
