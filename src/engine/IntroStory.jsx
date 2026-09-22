import { useEffect, useState, useRef } from 'react';
import { playMaterialize } from './sfx.js';
import TimeMachine from './TimeMachine.jsx';
import { Avatar } from './Martine.jsx';

/* ============================================================
   INTRO — 6 tableaux INTERACTIFS.
   ============================================================
   1. NUIT PAISIBLE : chambre, radio-réveil, téléphone qui vibre
      après ~3s. Clic tel → suivant.
   2. LE SMS D'AL3X1A : message plein écran expliquant la mission
      et annonçant l'arrivée de MARTINE. Clic → suivant.
   3. DEHORS : MARTINE se matérialise devant chez le joueur.
      Halo + son, puis bouton EMBARQUER apparaît.
   4. COCKPIT : MARTINE avatar t'accueille, bouton GO pour partir.
   5. FLASH : transition temporelle (auto-avance).
   6. ARRIVÉE PRÉHISTOIRE : MARTINE posée proprement, le joueur
      descend, MARTINE explique la quête. Clic sur clan → chapitre 1.
   ============================================================ */

/* Bulle façon BD, hauteur auto + effet machine à écrire. */
function Bubble({ x, y, w = 260, text, from = 'left', color = 'default' }) {
  const lines = Array.isArray(text) ? text : [text];
  const LINE = 18;
  const PAD_TOP = 16;
  const PAD_BOT = 14;
  const h = PAD_TOP + PAD_BOT + lines.length * LINE;
  const top = -h / 2;
  const firstBaseline = top + PAD_TOP + 13;
  const bottom = top + h;
  const fill = color === 'alert' ? '#fff0c8' : '#fff9e8';
  const stroke = color === 'alert' ? '#e0a848' : '#5a4028';
  const textFill = color === 'alert' ? '#3a2010' : '#1a1408';

  const fullText = lines.join('\n');
  const [nShown, setNShown] = useState(0);
  useEffect(() => {
    setNShown(0);
    if (!fullText) return;
    const step = 8;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setNShown(i);
      if (i >= fullText.length) clearInterval(id);
    }, step);
    return () => clearInterval(id);
  }, [fullText]);
  const shownFull = fullText.slice(0, nShown);
  const shownLines = shownFull.split('\n');
  const done = nShown >= fullText.length;

  return (
    <g transform={`translate(${x},${y})`} onClick={() => setNShown(fullText.length)} style={{ cursor: done ? 'default' : 'pointer' }}>
      <rect x={-w/2} y={top} width={w} height={h} rx={12} fill={fill} stroke={stroke} strokeWidth="2" />
      <path d={from === 'left'
        ? `M${-w/4} ${bottom} L${-w/4 - 8} ${bottom + 16} L${-w/4 + 12} ${bottom + 2} Z`
        : `M${w/4} ${bottom} L${w/4 + 8} ${bottom + 16} L${w/4 - 12} ${bottom + 2} Z`}
        fill={fill} stroke={stroke} strokeWidth="2" />
      <text x={0} y={firstBaseline} textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize="13" fill={textFill}>
        {lines.map((line, i) => {
          const shown = shownLines[i] ?? '';
          const isLast = i === shownLines.length - 1 && !done;
          return (
            <tspan key={i} x={0} dy={i === 0 ? 0 : LINE}>
              {shown}{isLast ? '▮' : ''}
            </tspan>
          );
        })}
      </text>
    </g>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
   ═══════════════════════════════════════════════════════════════ */
export default function IntroStory({ onDone }) {
  const [i, setI] = useState(0);
  const next = () => setI((v) => v + 1);
  const SLIDES = [
    <SlideNight       key="s1" onNext={next} />,
    <SlideMessage     key="s2" onNext={next} />,
    <SlideOutside     key="s3" onNext={next} />,
    <SlideCockpit     key="s4" onNext={next} />,
    <SlideRules       key="s4b" onNext={next} />,
    <SlideFlash       key="s5" onNext={next} />,
    <SlideArrival     key="s6" onDone={onDone} />,
  ];
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#050810', zIndex: 100, display: 'flex', flexDirection: 'column', color: '#efe6d2', fontFamily: 'Palatino, Georgia, serif', overflow: 'hidden' }}>
      <button onClick={onDone}
        style={{ position: 'absolute', top: 12, right: 16, zIndex: 10, background: '#ffd166', border: '2px solid #5a4028', color: '#3a2410', padding: '10px 18px', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'ui-monospace,monospace', boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
        Passer l'intro ›
      </button>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, minHeight: 0 }}>
        <div style={{ width: '100%', maxWidth: 900 }}>{SLIDES[i]}</div>
      </div>
      <style>{`
        @keyframes drift { 0%, 100% { opacity: 0.85; transform: translate(0, 0); } 50% { opacity: 0.4; transform: translate(2px, -3px); } }
        @keyframes flick { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   S1 — NUIT PAISIBLE (chambre, tel qui vibre après 3s)
   ═══════════════════════════════════════════════════════════════ */
function SlideNight({ onNext }) {
  const [vibrating, setVibrating] = useState(false);
  const audioRef = useRef(null);
  useEffect(() => {
    try {
      const a = new Audio('assets/sounds/phone-vibrate.wav');
      a.loop = true; a.volume = 0.35; a.preload = 'auto';
      a.load();
      audioRef.current = a;
    } catch { /* pas d'audio */ }
    const t = setTimeout(() => {
      setVibrating(true);
      const a = audioRef.current;
      if (!a) return;
      const tryPlay = (n = 0) => {
        const p = a.play();
        if (p && p.catch) p.catch((err) => {
          if (n < 3) setTimeout(() => tryPlay(n + 1), 200);
          else console.warn('[intro] audio blocked:', err?.message);
        });
      };
      tryPlay();
    }, 3000);
    return () => { clearTimeout(t); try { audioRef.current?.pause(); } catch { /* déjà arrêté */ } };
  }, []);

  return (
    <div style={{ animation: 'fadeIn 1s ease-out', width: '100%' }}>
      <svg viewBox="0 0 1200 680" style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '72vh' }}>
        <defs>
          <linearGradient id="s1-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1f30" />
            <stop offset="100%" stopColor="#0a0e18" />
          </linearGradient>
          <linearGradient id="s1-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a2818" />
            <stop offset="100%" stopColor="#0e0806" />
          </linearGradient>
          <linearGradient id="s1-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0a2a" />
            <stop offset="100%" stopColor="#2a3050" />
          </linearGradient>
          <radialGradient id="s1-moon" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f8ecd0" stopOpacity="1" />
            <stop offset="100%" stopColor="#f0e4c8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s1-moonlight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f0e4c8" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#f0e4c8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s1-phone-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7fb0e0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7fb0e0" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s1-nightlight" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#ffb060" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ffb060" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s1-laptop" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#3a80c8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3a80c8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* MUR + SOL */}
        <rect width="1200" height="680" fill="url(#s1-wall)" />
        {/* Papier peint subtil : rayures verticales */}
        {[100, 200, 300, 400, 900, 1000, 1100].map((x, i) => (
          <line key={i} x1={x} y1="0" x2={x} y2="520" stroke="#28303a" strokeWidth="0.8" opacity="0.35" />
        ))}
        <rect y="520" width="1200" height="160" fill="url(#s1-floor)" />
        <path d="M0 520 L1200 520" stroke="#0a0806" strokeWidth="1.5" />
        {/* Plinthe */}
        <rect y="514" width="1200" height="8" fill="#141820" />
        {/* Lattes du plancher en perspective */}
        {[100, 300, 500, 800, 1000].map((x, i) => (
          <path key={i} d={`M${x} 520 L${x + (x - 600) * 0.15} 680`} stroke="#0a0604" strokeWidth="0.8" opacity="0.55" />
        ))}
        {/* Tapis rond au sol */}
        <ellipse cx="600" cy="620" rx="220" ry="42" fill="#5a2820" stroke="#3a1810" strokeWidth="1.5" opacity="0.85" />
        <ellipse cx="600" cy="614" rx="220" ry="42" fill="#8a3820" opacity="0.6" />
        <ellipse cx="600" cy="614" rx="190" ry="34" fill="none" stroke="#c8a848" strokeWidth="1" opacity="0.5" />

        {/* GRANDE FENÊTRE à droite avec lune, ciel étoilé, silhouette de ville */}
        <g>
          <rect x="820" y="80" width="300" height="360" fill="url(#s1-sky)" stroke="#3a2818" strokeWidth="6" />
          {/* Croisillons */}
          <line x1="970" y1="80" x2="970" y2="440" stroke="#3a2818" strokeWidth="4" />
          <line x1="820" y1="260" x2="1120" y2="260" stroke="#3a2818" strokeWidth="4" />
          {/* Étoiles */}
          {[[860, 120], [920, 140], [1010, 100], [1080, 160], [960, 200], [890, 210], [1050, 230], [900, 300], [1020, 340], [860, 380], [1090, 400]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.6 : 1} fill="#e8eef5" opacity={0.55 + (i % 4) * 0.12} />
          ))}
          {/* Lune */}
          <circle cx="1050" cy="150" r="34" fill="url(#s1-moon)" />
          <circle cx="1050" cy="150" r="28" fill="#f8ecd0" />
          <circle cx="1060" cy="145" r="4" fill="#c8bda0" opacity="0.65" />
          <circle cx="1042" cy="160" r="3" fill="#c8bda0" opacity="0.55" />
          {/* Silhouette de ville au fond de la fenêtre */}
          <path d="M820 400 L820 380 L850 380 L850 360 L890 360 L890 400 L920 400 L920 370 L960 370 L960 400 L1000 400 L1000 350 L1030 350 L1030 400 L1060 400 L1060 380 L1090 380 L1090 400 L1120 400 L1120 400 Z" fill="#0a0e18" />
          {/* 2-3 fenêtres allumées lointaines */}
          <rect x="900" y="380" width="3" height="4" fill="#ffd870" opacity="0.85" />
          <rect x="1010" y="365" width="3" height="4" fill="#e0a848" opacity="0.75" />
        </g>
        {/* Rideaux */}
        <path d="M810 70 L810 460 Q820 100 830 90 Q835 250 830 460 Z" fill="#5a3820" stroke="#1a0e08" strokeWidth="1.2" opacity="0.9" />
        <path d="M1130 70 L1130 460 Q1120 100 1110 90 Q1105 250 1110 460 Z" fill="#5a3820" stroke="#1a0e08" strokeWidth="1.2" opacity="0.9" />
        <path d="M810 70 L1130 70 L1130 90 L810 90 Z" fill="#3a2010" />
        {/* Traînée de lune dans la chambre */}
        <ellipse cx="820" cy="530" rx="180" ry="60" fill="url(#s1-moonlight)" transform="rotate(-18 820 530)" />

        {/* ÉTAGÈRE MURALE en haut à gauche avec livres, plante, cadre, globe */}
        <g transform="translate(80,80)">
          {/* Planche */}
          <rect x="0" y="0" width="380" height="10" fill="#5a3818" stroke="#1a0e08" strokeWidth="1.5" />
          {/* Livres colorés inclinés */}
          {[["#8a3820", 60, 0], ["#3a80c8", 54, 0], ["#c8a848", 50, 0], ["#5eff9e", 58, 0], ["#8a5030", 62, -8], ["#a04ce8", 54, 0]].map(([c, h, r], i) => (
            <g key={i} transform={`translate(${16 + i * 22},${-h})`}>
              <rect x="0" y="0" width="16" height={h} fill={c} stroke="#0a0806" strokeWidth="0.5" transform={r ? `rotate(${r} 8 ${h})` : ''} />
              <line x1="0" y1={8} x2="16" y2="8" stroke="#0a0806" strokeWidth="0.4" opacity="0.5" transform={r ? `rotate(${r} 8 ${h})` : ''} />
            </g>
          ))}
          {/* Cadre photo */}
          <g transform="translate(180,-40)">
            <rect x="0" y="0" width="46" height="36" fill="#c8a848" stroke="#3a2010" strokeWidth="1.2" />
            <rect x="3" y="3" width="40" height="30" fill="#8a3820" />
            {/* deux silhouettes floues (photo de famille) */}
            <circle cx="15" cy="20" r="6" fill="#e0a878" />
            <circle cx="30" cy="22" r="5" fill="#e0a878" />
          </g>
          {/* Plante en pot */}
          <g transform="translate(250,-52)">
            <rect x="0" y="30" width="26" height="22" fill="#5a3018" stroke="#1a0e08" strokeWidth="0.8" />
            <path d="M4 30 Q10 -10 14 20 M12 30 Q16 -14 22 8 M0 30 Q-6 -6 8 24" stroke="#3a6828" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
          {/* Petit globe/planète décoratif */}
          <g transform="translate(310,-30)">
            <circle r="18" fill="#3a80c8" stroke="#1a2028" strokeWidth="1" />
            <path d="M-14 -4 Q-4 -8 8 -2 M-10 4 Q4 2 14 6 M-12 -10 Q0 -14 12 -8" stroke="#5eff9e" strokeWidth="1.4" fill="none" opacity="0.75" />
            <path d="M-18 -6 L-8 -4 M-6 8 L6 10" stroke="#1a2028" strokeWidth="0.6" opacity="0.5" />
          </g>
          {/* Guirlande de LED (string lights) qui pend depuis l'étagère */}
          <path d="M-40 10 Q80 60 200 30 Q320 60 420 20" stroke="#5a4028" strokeWidth="0.8" fill="none" />
          {["#ffd870", "#7fb0e0", "#c88060", "#5eff9e", "#e0a848", "#a04ce8", "#ffd870", "#7fb0e0"].map((c, i) => (
            <circle key={i} cx={-30 + i * 60} cy={20 + (i % 2 === 0 ? 14 : 22)} r="3.5" fill={c} opacity="0.9">
              <animate attributeName="opacity" values="0.5;1;0.5" dur={`${1.6 + (i % 3) * 0.4}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>

        {/* POSTER MURAL "SPACE" au-dessus du lit */}
        <g transform="translate(120,180)">
          <rect x="0" y="0" width="140" height="180" fill="#0a0e28" stroke="#c8a848" strokeWidth="3" />
          <rect x="6" y="6" width="128" height="168" fill="#0a0620" />
          {/* Fusée stylisée */}
          <path d="M70 30 L82 100 L58 100 Z" fill="#e8dfc8" stroke="#3a2010" strokeWidth="1" />
          <rect x="60" y="100" width="20" height="20" fill="#8a1010" />
          <circle cx="70" cy="60" r="6" fill="#3a80c8" />
          <path d="M58 120 L46 140 L58 130 Z M82 120 L94 140 L82 130 Z" fill="#e83820" />
          {/* Étoiles autour */}
          {[[20, 40], [110, 40], [30, 90], [110, 90], [30, 150], [110, 160]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 1.4 : 1} fill="#ffd870" opacity="0.9" />
          ))}
          {/* Texte poster */}
          <text x="70" y="164" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="11" fontWeight="900" fill="#c8a848" letterSpacing="3">ESPACE</text>
        </g>

        {/* POSTER MURAL 2 : musique/silhouette */}
        <g transform="translate(280,220)">
          <rect x="0" y="0" width="110" height="140" fill="#3a1030" stroke="#c88060" strokeWidth="3" />
          <rect x="6" y="6" width="98" height="128" fill="#2a0820" />
          <circle cx="55" cy="55" r="20" fill="#c88060" opacity="0.7" />
          <path d="M45 90 Q55 100 65 90 L60 130 L50 130 Z" fill="#c88060" opacity="0.7" />
          <text x="55" y="122" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fontWeight="800" fill="#e8dfc8" fontStyle="italic">CONCERT</text>
        </g>

        {/* LIT à gauche-centre, plus grand */}
        <g>
          {/* Tête de lit en bois */}
          <rect x="90" y="380" width="30" height="140" fill="#5a3818" stroke="#1a0e08" strokeWidth="2" />
          <rect x="94" y="384" width="22" height="132" fill="#8a5030" opacity="0.6" />
          {/* Base du lit */}
          <rect x="90" y="500" width="480" height="30" fill="#5a3818" stroke="#1a0e08" strokeWidth="2" />
          {/* Matelas + couette */}
          <rect x="120" y="430" width="450" height="70" fill="#e8dfc8" stroke="#3a2818" strokeWidth="1.5" />
          {/* Motif de la couette (rayures ou losanges) */}
          <path d="M120 445 L570 445 M120 460 L570 460 M120 475 L570 475 M120 490 L570 490" stroke="#c88060" strokeWidth="1.5" opacity="0.55" />
          <path d="M180 430 L180 500 M250 430 L250 500 M320 430 L320 500 M390 430 L390 500 M460 430 L460 500 M530 430 L530 500" stroke="#a04ce8" strokeWidth="0.8" opacity="0.4" />
          {/* Oreillers */}
          <rect x="135" y="400" width="120" height="40" rx="8" fill="#e8dfc8" stroke="#3a2818" strokeWidth="1.2" />
          <rect x="140" y="404" width="110" height="32" rx="6" fill="#f4ecd0" />
          <rect x="270" y="410" width="90" height="34" rx="6" fill="#c8a888" stroke="#3a2818" strokeWidth="1" />
          {/* Une petite bosse qui suggère quelqu'un qui dort sous la couette */}
          <path d="M300 440 Q380 425 460 440 L460 500 L300 500 Z" fill="#c8a888" opacity="0.7" />
          {/* Pieds du lit */}
          <rect x="94" y="530" width="14" height="26" fill="#1a0e08" />
          <rect x="556" y="530" width="14" height="26" fill="#1a0e08" />
        </g>

        {/* TABLE DE NUIT à droite du lit avec réveil, phone, veilleuse */}
        <g>
          {/* Table de nuit */}
          <rect x="600" y="440" width="180" height="120" fill="#5a3818" stroke="#1a0e08" strokeWidth="2" />
          <rect x="606" y="446" width="168" height="108" fill="#8a5030" opacity="0.55" />
          {/* Tiroir */}
          <rect x="616" y="510" width="148" height="30" fill="#3a2010" stroke="#1a0e08" strokeWidth="1" />
          <circle cx="690" cy="525" r="3" fill="#c8a848" />
          {/* Pieds */}
          <rect x="606" y="558" width="14" height="30" fill="#1a0e08" />
          <rect x="760" y="558" width="14" height="30" fill="#1a0e08" />
          {/* Halo veilleuse chaude sur toute la table */}
          <ellipse cx="690" cy="450" rx="200" ry="60" fill="url(#s1-nightlight)" />
          {/* Réveil digital à gauche de la table */}
          <g transform="translate(636,410)">
            <rect x="-32" y="0" width="64" height="30" rx="4" fill="#1a1408" stroke="#3a2818" strokeWidth="1.2" />
            <rect x="-28" y="4" width="56" height="20" fill="#0a0806" />
            <text x="0" y="19" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="16" fontWeight="900" fill="#ff3020" style={{ letterSpacing: 3, filter: 'drop-shadow(0 0 4px #ff3020)' }}>03:14</text>
            <circle cx="24" cy="14" r="1.2" fill="#ff3020" />
          </g>
          {/* Petite lampe veilleuse à droite */}
          <g transform="translate(740,406)">
            <rect x="-4" y="6" width="8" height="20" fill="#5a4028" />
            <path d="M-16 6 L16 6 L12 -12 L-12 -12 Z" fill="#c88060" stroke="#3a2010" strokeWidth="1" />
            <circle cx="0" cy="20" r="14" fill="#ffb060" opacity="0.28">
              <animate attributeName="opacity" values="0.2;0.35;0.2" dur="3s" repeatCount="indefinite" />
            </circle>
          </g>
        </g>

        {/* TÉLÉPHONE sur la table de nuit — position centrée sur la table */}
        <g transform="translate(696,470)" style={vibrating ? { animation: 'phoneShake 0.12s ease-in-out infinite' } : {}}>
          {vibrating && <circle cx="0" cy="0" r="60" fill="url(#s1-phone-halo)" style={{ animation: 'phoneGlow 0.9s ease-in-out infinite' }} />}
          <g onClick={vibrating ? onNext : undefined} style={{ cursor: vibrating ? 'pointer' : 'default' }}>
            <rect x="-20" y="-30" width="40" height="60" rx="6" fill="#1a1a1a" stroke="#5a5a5a" strokeWidth="1.4" />
            <rect x="-17" y="-27" width="34" height="52" rx="3" fill={vibrating ? '#3a80c8' : '#0a0a0a'} />
            {vibrating && (<>
              <circle cx="0" cy="-10" r="6" fill="#e83820" />
              <text x="0" y="-6.5" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff">1</text>
              {[20, 32, 44].map((r, i) => (
                <circle key={i} r={r} fill="none" stroke="#7fb0e0" strokeWidth="1.6" opacity={0.85 - i * 0.25} style={{ animation: 'phoneGlow 0.9s ease-in-out infinite' }} />
              ))}
            </>)}
          </g>
        </g>

        {/* BUREAU au fond gauche */}
        <g transform="translate(410,300)">
          {/* Plateau bureau */}
          <rect x="0" y="130" width="240" height="16" fill="#5a3818" stroke="#1a0e08" strokeWidth="1.5" />
          {/* Pieds */}
          <rect x="10" y="146" width="12" height="80" fill="#3a2010" />
          <rect x="218" y="146" width="12" height="80" fill="#3a2010" />
          {/* Ordinateur portable ouvert avec léger halo bleu */}
          <g transform="translate(70,90)">
            <ellipse cx="55" cy="80" rx="80" ry="24" fill="url(#s1-laptop)" />
            <path d="M0 40 L110 40 L100 0 L10 0 Z" fill="#28303a" stroke="#0a0e14" strokeWidth="1.2" />
            <path d="M10 4 L100 4 L92 36 L18 36 Z" fill="#141c26" />
            {/* Écran avec quelques lignes de texte */}
            <rect x="20" y="8" width="70" height="24" fill="#0a0806" />
            <line x1="26" y1="14" x2="82" y2="14" stroke="#5eff9e" strokeWidth="0.5" opacity="0.75" />
            <line x1="26" y1="18" x2="70" y2="18" stroke="#5eff9e" strokeWidth="0.5" opacity="0.65" />
            <line x1="26" y1="22" x2="76" y2="22" stroke="#5eff9e" strokeWidth="0.5" opacity="0.55" />
            {/* Base clavier */}
            <path d="M-6 40 L116 40 L110 48 L0 48 Z" fill="#3a4048" stroke="#0a0e14" strokeWidth="1.2" />
          </g>
          {/* Cahier ouvert + stylo */}
          <g transform="translate(0,110)">
            <rect x="0" y="0" width="60" height="20" fill="#e8dfc8" stroke="#5a4028" strokeWidth="0.8" />
            <line x1="30" y1="0" x2="30" y2="20" stroke="#5a4028" strokeWidth="0.5" />
            <line x1="4" y1="8" x2="26" y2="8" stroke="#5a4028" strokeWidth="0.3" />
            <line x1="4" y1="14" x2="22" y2="14" stroke="#5a4028" strokeWidth="0.3" />
            <rect x="32" y="-4" width="30" height="3" fill="#8a1010" transform="rotate(-8 32 -4)" />
          </g>
          {/* Pot à crayons */}
          <g transform="translate(200,100)">
            <rect x="0" y="0" width="20" height="30" fill="#5eff9e" stroke="#1a1a10" strokeWidth="0.8" opacity="0.85" />
            <line x1="6" y1="0" x2="6" y2="-12" stroke="#c8a848" strokeWidth="1.2" />
            <line x1="10" y1="0" x2="10" y2="-16" stroke="#8a3820" strokeWidth="1.2" />
            <line x1="14" y1="0" x2="14" y2="-10" stroke="#3a80c8" strokeWidth="1.2" />
          </g>
          {/* Casque audio suspendu au coin du bureau */}
          <g transform="translate(220,130)">
            <path d="M0 0 Q10 -20 20 0" fill="none" stroke="#1a1a10" strokeWidth="3" />
            <rect x="-4" y="0" width="8" height="14" rx="2" fill="#3a2010" />
            <rect x="16" y="0" width="8" height="14" rx="2" fill="#3a2010" />
          </g>
        </g>

        {/* CHAISE avec pull posé */}
        <g transform="translate(370,470)">
          <rect x="0" y="0" width="30" height="4" fill="#5a3818" />
          <rect x="0" y="0" width="4" height="60" fill="#5a3818" />
          <rect x="0" y="0" width="30" height="30" fill="#3a80c8" opacity="0.85" />
          <path d="M0 8 L28 8 L26 22 L2 22 Z" fill="#3a80c8" />
          <rect x="0" y="30" width="4" height="30" fill="#5a3818" />
          <rect x="26" y="30" width="4" height="30" fill="#5a3818" />
        </g>

        {/* SAC À DOS au sol devant le bureau */}
        <g transform="translate(500,540)">
          <path d="M0 0 Q30 -8 60 0 L58 60 Q30 68 2 60 Z" fill="#8a3820" stroke="#3a1010" strokeWidth="1.5" />
          <rect x="10" y="10" width="40" height="24" fill="#5a2010" opacity="0.7" />
          <circle cx="30" cy="34" r="4" fill="#c8a848" />
          <path d="M8 0 Q10 -20 30 -18 Q50 -20 52 0" stroke="#3a1010" strokeWidth="3" fill="none" />
        </g>

        {/* PORTE à droite (partiellement visible) avec filet de lumière dessous */}
        <g>
          <rect x="1150" y="220" width="50" height="300" fill="#3a2010" stroke="#0a0806" strokeWidth="2" />
          <circle cx="1156" cy="380" r="3" fill="#c8a848" />
          {/* Filet de lumière chaud sous la porte */}
          <rect x="1150" y="518" width="50" height="4" fill="#ffd870" opacity="0.65">
            <animate attributeName="opacity" values="0.5;0.75;0.5" dur="4s" repeatCount="indefinite" />
          </rect>
        </g>

        {/* PANTOUFLES au sol */}
        <g transform="translate(180,600)">
          <ellipse cx="0" cy="0" rx="24" ry="8" fill="#8a5030" stroke="#3a2010" strokeWidth="0.8" />
          <ellipse cx="0" cy="-3" rx="24" ry="8" fill="#c88060" />
          <ellipse cx="60" cy="0" rx="24" ry="8" fill="#8a5030" stroke="#3a2010" strokeWidth="0.8" />
          <ellipse cx="60" cy="-3" rx="24" ry="8" fill="#c88060" />
        </g>

        {/* PLANTE en pot au sol à gauche */}
        <g transform="translate(40,540)">
          <rect x="-24" y="20" width="48" height="60" fill="#5a3018" stroke="#1a0e08" strokeWidth="1.2" />
          <path d="M-20 20 Q-14 -20 -4 8 M0 20 Q6 -30 16 -4 M14 20 Q20 -14 28 4 M-14 20 Q-30 -4 -16 -14 M8 20 Q22 -22 24 6" stroke="#3a6828" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>

        <style>{`
          @keyframes phoneShake { 0%, 100% { transform: translate(696px, 470px); } 25% { transform: translate(695px, 470.5px); } 75% { transform: translate(697px, 469.5px); } }
          @keyframes phoneGlow { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }
        `}</style>
      </svg>
      {!vibrating && (
        <p style={{ textAlign: 'center', margin: '10px auto 0', fontSize: 17, color: '#c8b090', fontStyle: 'italic', maxWidth: 600, lineHeight: 1.5 }}>
          Une nuit paisible de ta vie…
        </p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   S2 — LE SMS D'AL3X1A (téléphone plein cadre)
   ═══════════════════════════════════════════════════════════════ */
function SlideMessage({ onNext }) {
  return (
    <div style={{ animation: 'fadeIn 0.8s ease-out', width: '100%' }}>
      <svg viewBox="0 0 800 500" style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '62vh' }}>
        <defs><radialGradient id="s2-halo" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#3a80c8" stopOpacity="0.4" /><stop offset="100%" stopColor="#3a80c8" stopOpacity="0" /></radialGradient></defs>
        <rect width="800" height="500" fill="#050810" />
        <circle cx="400" cy="250" r="300" fill="url(#s2-halo)" />
        <g transform="translate(400,250) rotate(-4)" onClick={onNext} style={{ cursor: 'pointer' }}>
          <rect x="-130" y="-220" width="260" height="440" rx="30" fill="#1a1a1a" stroke="#5a5a5a" strokeWidth="3" />
          <rect x="-118" y="-208" width="236" height="416" rx="20" fill="#efeae4" />
          {/* Barre statut */}
          <rect x="-118" y="-208" width="236" height="24" fill="#000" />
          <text x="-100" y="-192" fontFamily="ui-monospace,monospace" fontSize="10" fill="#fff">03:14</text>
          <text x="100" y="-192" textAnchor="end" fontFamily="ui-monospace,monospace" fontSize="10" fill="#fff">▮▮▮▮ 39%</text>
          {/* En-tête WhatsApp vert teal */}
          <rect x="-118" y="-184" width="236" height="46" fill="#075e54" />
          <circle cx="-92" cy="-160" r="15" fill="#fff" stroke="#c8e6cf" strokeWidth="1" />
          <text x="-92" y="-155" textAnchor="middle" fontSize="14" fontWeight="800" fill="#075e54">A</text>
          <text x="-70" y="-165" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="12" fontWeight="700" fill="#fff">Al3x1a</text>
          <text x="-70" y="-149" fontFamily="ui-monospace,monospace" fontSize="9" fill="#c8e6cf">● en ligne</text>
          {/* Bulle blanche du message (largeur 216, centrée dans le tel) */}
          <g transform="translate(-108,-124)">
            <rect x="0" y="0" width="216" height="264" rx="8" fill="#fff" stroke="#e0e0e0" strokeWidth="0.5" />
            <text x="108" y="22" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10.5" fill="#111b21" fontStyle="italic">« Je m'appelle Al3x1a.</text>
            <text x="108" y="38" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10.5" fill="#111b21" fontStyle="italic">Je viens du futur.</text>
            <text x="108" y="62" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10.5" fill="#111b21" fontStyle="italic">Ici, une maladie</text>
            <text x="108" y="78" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10.5" fill="#111b21" fontStyle="italic">efface la mémoire</text>
            <text x="108" y="94" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10.5" fill="#111b21" fontStyle="italic">de tout le monde.</text>
            <text x="108" y="118" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10.5" fill="#111b21" fontStyle="italic">Mon père est parti</text>
            <text x="108" y="134" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10.5" fill="#111b21" fontStyle="italic">dans le temps</text>
            <text x="108" y="150" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10.5" fill="#111b21" fontStyle="italic">chercher un remède.</text>
            <text x="108" y="166" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10.5" fill="#111b21" fontStyle="italic">Il n'est jamais rentré.</text>
            <text x="108" y="190" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10.5" fill="#111b21" fontStyle="italic">MARTINE va se poser</text>
            <text x="108" y="206" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10.5" fill="#111b21" fontStyle="italic">devant chez toi.</text>
            <text x="108" y="232" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="11" fontWeight="700" fill="#111b21">Sors. »</text>
            <text x="200" y="252" textAnchor="end" fontFamily="ui-monospace,monospace" fontSize="8" fill="#8696a0">03:14</text>
          </g>
          <text x="0" y="176" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill="#8696a0">touche pour ouvrir</text>
          <rect x="-40" y="204" width="80" height="3" rx="1.5" fill="#5a6a80" />
        </g>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   S3 — DEHORS : MARTINE SE MATÉRIALISE devant chez le joueur
   ═══════════════════════════════════════════════════════════════ */
function SlideOutside({ onNext }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    playMaterialize();
    const t = setTimeout(() => setReady(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ animation: 'fadeIn 0.8s ease-out', position: 'relative', width: '100%' }}>
      <svg viewBox="0 0 1200 680" style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '72vh' }}>
        <defs>
          <linearGradient id="s3-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0e28" />
            <stop offset="100%" stopColor="#2a2848" />
          </linearGradient>
          <radialGradient id="s3-moon" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f0e4c8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#f0e4c8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s3-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#b0ffdc" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#5eff9e" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#5eff9e" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s3-lamp" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe8a0" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffe8a0" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s3-window" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffc060" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffc060" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* CIEL nocturne */}
        <rect width="1200" height="500" fill="url(#s3-sky)" />
        {/* Étoiles nombreuses */}
        {[[80, 60], [180, 100], [280, 40], [420, 80], [560, 50], [640, 110], [720, 70], [340, 130], [500, 120],
          [820, 60], [880, 130], [960, 90], [1020, 60], [1080, 120], [1140, 80], [80, 180], [220, 220], [380, 200],
          [640, 220], [780, 200], [980, 200], [1120, 220]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 1.6 : 1} fill="#fff" opacity={0.55 + (i % 4) * 0.1} />
        ))}
        {/* Lune plus imposante */}
        <circle cx="200" cy="130" r="130" fill="url(#s3-moon)" />
        <circle cx="200" cy="130" r="52" fill="#f0e4c8" opacity="0.95" />
        <circle cx="212" cy="122" r="10" fill="#c8bda0" opacity="0.5" />
        <circle cx="188" cy="140" r="6" fill="#c8bda0" opacity="0.5" />
        {/* Nuage discret sur la lune */}
        <path d="M120 150 Q160 140 200 148 Q240 138 280 148 Q320 158 280 168 Q220 172 160 170 Q100 168 120 150" fill="#0a0e28" opacity="0.35" />

        {/* Silhouettes de collines au fond */}
        <path d="M0 460 Q200 400 400 440 Q600 380 800 430 Q1000 400 1200 440 L1200 500 L0 500 Z" fill="#0a0e18" opacity="0.8" />

        {/* QUARTIER : maisons de banlieue en enfilade */}
        <g fill="#0a0e18">
          {/* Maison à gauche : la maison du joueur (fenêtre allumée = sa chambre) */}
          <path d="M60 490 L60 380 L200 300 L340 380 L340 490 Z" />
          <rect x="60" y="380" width="280" height="110" fill="#141820" />
          {/* Fenêtre allumée (chambre du joueur) */}
          <rect x="180" y="400" width="50" height="46" fill="#141018" stroke="#3a2818" strokeWidth="1.5" />
          <rect x="184" y="404" width="42" height="38" fill="#ffc060" opacity="0.85">
            <animate attributeName="opacity" values="0.7;0.9;0.7" dur="4s" repeatCount="indefinite" />
          </rect>
          <line x1="205" y1="400" x2="205" y2="446" stroke="#3a2818" strokeWidth="1.2" />
          <line x1="184" y1="423" x2="226" y2="423" stroke="#3a2818" strokeWidth="1.2" />
          {/* Halo warm de la fenêtre */}
          <circle cx="205" cy="423" r="60" fill="url(#s3-window)" />
          {/* Porte */}
          <rect x="100" y="430" width="34" height="60" fill="#3a2010" stroke="#5a3818" strokeWidth="1.2" />
          <circle cx="127" cy="462" r="1.6" fill="#c8a848" />
          {/* Cheminée avec fumée */}
          <rect x="260" y="320" width="20" height="40" fill="#3a2010" />
          <path d="M270 320 Q265 300 275 285 Q270 265 280 250" stroke="#8a9098" strokeWidth="4" fill="none" opacity="0.4">
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="5s" repeatCount="indefinite" />
          </path>
        </g>
        {/* Autres maisons en enfilade au loin, sombres */}
        <g fill="#0a0e18" opacity="0.9">
          <path d="M380 490 L380 420 L440 380 L500 420 L500 490 Z" />
          <path d="M540 490 L540 400 L620 350 L700 400 L700 490 Z" />
          <path d="M740 490 L740 430 L800 390 L860 430 L860 490 Z" />
          <path d="M900 490 L900 410 L980 360 L1060 410 L1060 490 Z" />
          <path d="M1100 490 L1100 430 L1160 400 L1200 430 L1200 490 Z" />
          {/* fenêtres allumées éparses */}
          <rect x="446" y="440" width="8" height="10" fill="#c8a848" opacity="0.7" />
          <rect x="620" y="420" width="8" height="10" fill="#e0a848" opacity="0.6" />
          <rect x="980" y="420" width="8" height="10" fill="#c8a848" opacity="0.55" />
        </g>

        {/* Arbre à gauche */}
        <g transform="translate(30,420)">
          <rect x="-4" y="20" width="10" height="60" fill="#3a2010" />
          <circle r="30" fill="#1a3020" stroke="#0a1810" strokeWidth="0.8" />
          <circle cx="-10" cy="-14" r="18" fill="#1a3020" opacity="0.9" />
          <circle cx="16" cy="-10" r="18" fill="#1a3020" opacity="0.9" />
        </g>
        {/* Arbre à droite */}
        <g transform="translate(1100,440)">
          <rect x="-4" y="20" width="10" height="60" fill="#3a2010" />
          <circle r="32" fill="#1a3020" stroke="#0a1810" strokeWidth="0.8" />
          <circle cx="-14" cy="-12" r="18" fill="#1a3020" opacity="0.9" />
          <circle cx="18" cy="-8" r="16" fill="#1a3020" opacity="0.9" />
        </g>

        {/* RUE / SOL */}
        <rect y="500" width="1200" height="180" fill="#141018" />
        <path d="M0 520 L1200 520" stroke="#2a2028" strokeWidth="1.5" />
        {/* Bordure trottoir */}
        <rect y="500" width="1200" height="8" fill="#2a2830" />
        {/* Marquage bandes centrales */}
        {[80, 240, 400, 560, 720, 880, 1040].map((x, i) => (
          <rect key={i} x={x} y="600" width="60" height="6" fill="#c8a848" opacity="0.55" />
        ))}
        {/* Ligne de bord de route */}
        <rect y="558" width="1200" height="2" fill="#5a5040" opacity="0.4" />

        {/* Lampadaire à gauche avec halo */}
        <g>
          <circle cx="440" cy="360" r="60" fill="url(#s3-lamp)" />
          <rect x="436" y="180" width="6" height="330" fill="#3a3a3a" />
          <path d="M440 200 L500 200 L498 214 L440 214 Z" fill="#3a3a3a" />
          <circle cx="498" cy="210" r="10" fill="#ffe8a0" opacity="0.95" />
        </g>
        {/* Deuxième lampadaire à droite */}
        <g>
          <circle cx="960" cy="380" r="55" fill="url(#s3-lamp)" />
          <rect x="956" y="200" width="6" height="310" fill="#3a3a3a" />
          <path d="M960 220 L900 220 L902 234 L960 234 Z" fill="#3a3a3a" />
          <circle cx="902" cy="230" r="10" fill="#ffe8a0" opacity="0.95" />
        </g>

        {/* Boîte aux lettres au premier plan */}
        <g transform="translate(150,540)">
          <rect x="-3" y="0" width="6" height="60" fill="#3a3a3a" />
          <rect x="-20" y="-20" width="40" height="30" rx="6" fill="#8a1010" stroke="#3a0000" strokeWidth="1.2" />
          <rect x="-16" y="-16" width="10" height="6" fill="#0a0806" />
          <path d="M-20 -6 L-4 -14 L-4 -6 Z" fill="#c8a848" />
        </g>

        {/* Halo qui grandit puis se stabilise (position adaptée au centre du sol) */}
        <circle cx="600" cy="580" r="0" fill="url(#s3-halo)">
          <animate attributeName="r" values="20;340;280" keyTimes="0;0.65;1" dur="2s" fill="freeze" />
          <animate attributeName="opacity" values="0;1;0.75" keyTimes="0;0.55;1" dur="2s" fill="freeze" />
        </circle>
        {/* MARTINE se matérialise progressivement */}
        <g transform="translate(600,560) scale(1.05)" opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.8s" begin="1.2s" fill="freeze" />
          <TimeMachine landed={true} />
        </g>
      </svg>
      {ready && (
        <button onClick={onNext}
          autoFocus
          style={{ position: 'absolute', left: '50%', bottom: 8, transform: 'translateX(-50%)',
            background: '#5eff9e', color: '#06110b', border: 'none',
            borderRadius: 12, padding: '14px 32px', fontSize: 16, fontWeight: 800,
            cursor: 'pointer', fontFamily: 'ui-monospace,monospace', letterSpacing: 3,
            boxShadow: '0 0 22px rgba(94,255,158,0.5)',
            animation: 'fadeIn 0.4s ease-out' }}>
          ▶ ENTRE DANS LE VAISSEAU
        </button>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   S4 — COCKPIT : MARTINE t'accueille + bouton GO
   ═══════════════════════════════════════════════════════════════ */
function SlideCockpit({ onNext }) {
  return (
    <div style={{ animation: 'fadeIn 0.8s ease-out', position: 'relative', width: '100%' }}>
      <svg viewBox="0 0 1200 680" style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '72vh' }}>
        <defs>
          <linearGradient id="s4-cabin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a1a2a" />
            <stop offset="100%" stopColor="#050810" />
          </linearGradient>
          <linearGradient id="s4-console" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#28303a" />
            <stop offset="100%" stopColor="#0a0e14" />
          </linearGradient>
          <radialGradient id="s4-glow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#7fd8ff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7fd8ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s4-hublot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0a0620" />
            <stop offset="100%" stopColor="#000410" />
          </radialGradient>
          <radialGradient id="s4-panel-glow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#5eff9e" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#5eff9e" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Fond cabine */}
        <rect width="1200" height="680" fill="url(#s4-cabin)" />
        {/* Nervures métalliques (côtes de la coque) */}
        {[80, 200, 1000, 1120].map((x, i) => (
          <g key={i}>
            <path d={`M${x} 40 Q${x + (x < 600 ? -20 : 20)} 340 ${x} 640`} stroke="#3a4048" strokeWidth="3" fill="none" opacity="0.6" />
            <rect x={x - 4} y="60" width="8" height="6" fill="#5a6270" opacity="0.6" />
            <rect x={x - 4} y="320" width="8" height="6" fill="#5a6270" opacity="0.6" />
            <rect x={x - 4} y="580" width="8" height="6" fill="#5a6270" opacity="0.6" />
          </g>
        ))}
        {/* GRAND HUBLOT ovale au-dessus, ciel étoilé */}
        <ellipse cx="600" cy="140" rx="400" ry="90" fill="url(#s4-hublot)" stroke="#5a7898" strokeWidth="5" />
        <ellipse cx="600" cy="140" rx="390" ry="82" fill="none" stroke="#3a5878" strokeWidth="1.5" />
        {/* Rivets autour du hublot */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
          <circle key={i} cx={600 + 405 * Math.cos((a * Math.PI) / 180)} cy={140 + 92 * Math.sin((a * Math.PI) / 180)} r="4" fill="#5a6270" stroke="#0a0e14" strokeWidth="0.6" />
        ))}
        {/* Étoiles dans le hublot */}
        {[[380, 120], [460, 150], [540, 100], [620, 155], [700, 110], [780, 145], [820, 120], [500, 170], [660, 175]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i % 2 ? 1.4 : 1} fill="#fff" opacity="0.8" />
        ))}
        {/* Petite planète bleue au fond */}
        <circle cx="820" cy="140" r="12" fill="#3a80c8" opacity="0.85" />
        <path d="M810 138 Q820 132 830 140" stroke="#5eff9e" strokeWidth="0.8" fill="none" opacity="0.7" />
        {/* Comète */}
        <path d="M400 100 L450 120" stroke="#e8eef5" strokeWidth="0.8" opacity="0.7" />
        <circle cx="450" cy="120" r="1.4" fill="#fff" />

        {/* CONSOLE de bord en U autour du bas */}
        <path d="M0 480 Q0 440 40 440 L1160 440 Q1200 440 1200 480 L1200 680 L0 680 Z" fill="url(#s4-console)" stroke="#0a0e14" strokeWidth="4" />
        {/* Panneau avant central */}
        <rect x="380" y="440" width="440" height="140" fill="#141c26" stroke="#3a4048" strokeWidth="2" rx="6" />
        {/* Écran principal du panneau : mini-carte du temps */}
        <g transform="translate(600,470)">
          <rect x="-160" y="-14" width="320" height="90" fill="#0a0806" stroke="#5eff9e" strokeWidth="2" />
          <text x="-150" y="0" fontFamily="ui-monospace,monospace" fontSize="8" fill="#5eff9e" letterSpacing="3">TEMPOSCOPE</text>
          {/* Ligne de temps horizontale avec 5 points */}
          <line x1="-140" y1="30" x2="140" y2="30" stroke="#5eff9e" strokeWidth="1.5" opacity="0.65" />
          {[-120, -60, 0, 60, 120].map((x, i) => (
            <g key={i} transform={`translate(${x},30)`}>
              <circle r="4" fill={i === 0 ? "#ffd166" : "#141c26"} stroke="#5eff9e" strokeWidth="1" />
              <text x="0" y="16" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="6" fill="#5eff9e">{["−18k", "−12k", "−6k", "0", "+2k"][i]}</text>
            </g>
          ))}
          <text x="0" y="66" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7" fill="#c8d4e2" letterSpacing="2">DESTINATION : PALÉOLITHIQUE</text>
        </g>
        {/* Rangée de boutons colorés à gauche du panneau */}
        <g transform="translate(430,510)">
          {[["#5eff9e", "MOT."], ["#7fd8ff", "NAV."], ["#ffd166", "COMM."]].map(([c, lab], i) => (
            <g key={i} transform={`translate(0,${i * 22})`}>
              <rect x="0" y="0" width="46" height="18" fill="#28303a" stroke={c} strokeWidth="1" rx="3" />
              <text x="23" y="12" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7" fill={c} letterSpacing="1">{lab}</text>
            </g>
          ))}
        </g>
        <g transform="translate(724,510)">
          {[["#ff6a7a", "URG."], ["#c88060", "HAB."], ["#a04ce8", "AUX."]].map(([c, lab], i) => (
            <g key={i} transform={`translate(0,${i * 22})`}>
              <rect x="0" y="0" width="46" height="18" fill="#28303a" stroke={c} strokeWidth="1" rx="3" />
              <text x="23" y="12" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7" fill={c} letterSpacing="1">{lab}</text>
            </g>
          ))}
        </g>

        {/* Panneau LATÉRAL GAUCHE avec cadrans */}
        <g>
          <rect x="40" y="440" width="300" height="180" fill="#141c26" stroke="#3a4048" strokeWidth="2" rx="6" />
          <ellipse cx="190" cy="530" rx="180" ry="110" fill="url(#s4-panel-glow)" />
          {/* 3 cadrans ronds */}
          {[[100, 500], [190, 500], [280, 500]].map(([cx, cy], i) => (
            <g key={i} transform={`translate(${cx},${cy})`}>
              <circle r="30" fill="#0a0806" stroke="#5a6270" strokeWidth="1.5" />
              <circle r="26" fill="#141c26" stroke="#3a4048" strokeWidth="0.6" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a, k) => (
                <line key={k} x1={22 * Math.cos((a * Math.PI) / 180)} y1={22 * Math.sin((a * Math.PI) / 180)}
                  x2={26 * Math.cos((a * Math.PI) / 180)} y2={26 * Math.sin((a * Math.PI) / 180)}
                  stroke="#5a6270" strokeWidth="0.6" />
              ))}
              <line x1="0" y1="0" x2={20 * Math.cos((-70 + i * 40) * Math.PI / 180)} y2={20 * Math.sin((-70 + i * 40) * Math.PI / 180)} stroke={["#5eff9e", "#ffd166", "#ff6a7a"][i]} strokeWidth="2" strokeLinecap="round" />
              <circle r="2" fill="#5a6270" />
              <text x="0" y="46" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7" fill="#c8d4e2" letterSpacing="1">{["TEMPS", "VITESSE", "PUISS."][i]}</text>
            </g>
          ))}
          {/* Rangée LEDs statut en bas */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <g key={i} transform={`translate(${60 + i * 36},580)`}>
              <circle r="6" fill="#0a0806" stroke="#3a4048" strokeWidth="0.6" />
              <circle r="3" fill={["#5eff9e", "#ffd166", "#7fd8ff", "#5eff9e", "#c88060", "#5eff9e", "#a04ce8"][i]}>
                <animate attributeName="opacity" values="0.4;1;0.4" dur={`${1.2 + i * 0.15}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}
        </g>

        {/* Panneau LATÉRAL DROIT avec grand levier + boutons */}
        <g>
          <rect x="860" y="440" width="300" height="180" fill="#141c26" stroke="#3a4048" strokeWidth="2" rx="6" />
          {/* Grand levier */}
          <g transform="translate(940,540)">
            <rect x="-30" y="30" width="60" height="14" fill="#28303a" stroke="#0a0e14" strokeWidth="1" rx="3" />
            <rect x="-4" y="-40" width="8" height="70" fill="#5a6270" stroke="#0a0e14" strokeWidth="0.8" />
            <circle cx="0" cy="-46" r="14" fill="#c8a848" stroke="#3a2010" strokeWidth="1.5" />
            <text x="0" y="60" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7" fill="#c8d4e2" letterSpacing="2">SAUT</text>
          </g>
          {/* Grille de boutons */}
          <g transform="translate(1030,470)">
            {[0, 1, 2, 3].map((r) => (
              [0, 1, 2, 3].map((c) => (
                <rect key={`${r}${c}`} x={c * 26} y={r * 26} width="20" height="20" rx="3" fill={["#28303a", "#3a4048"][c % 2]} stroke={["#5eff9e", "#7fd8ff", "#ffd166", "#ff6a7a"][r]} strokeWidth="0.6" />
              ))
            ))}
          </g>
        </g>

        {/* MARTINE au centre — halo bleu */}
        <ellipse cx="600" cy="310" rx="220" ry="120" fill="url(#s4-glow)" />
      </svg>

      {/* MARTINE avatar centré (au-dessus du SVG) */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, 0)', pointerEvents: 'none' }}>
        <Avatar mood="content" size={130} talking />
      </div>
      {/* Bulle texte + bouton GO */}
      <div style={{ position: 'absolute', left: '50%', bottom: 20, transform: 'translateX(-50%)', width: 'min(88%, 620px)',
        background: '#0e1a30', border: '2px solid #5eff9e', borderRadius: 14,
        padding: '14px 20px', color: '#e8eef5',
        boxShadow: '0 0 30px rgba(94,255,158,0.35)', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55 }}>
          « Bienvenue à bord. Je suis <strong style={{ color: '#5eff9e' }}>MARTINE</strong> —
          Machine À Remonter le Temps Intelligente Néanmoins Excellente.
          Al3x1a m'envoie te chercher. Avant de partir, écoute bien : je vais te dire les <strong style={{ color: '#5eff9e' }}>4 règles</strong> que doit connaître un chronaute. »
        </p>
        <button onClick={onNext} autoFocus
          style={{ marginTop: 12, background: 'linear-gradient(180deg,#ff8a3a,#c0501a)',
            color: '#fff', border: '3px solid #ffd166',
            borderRadius: 999, width: 88, height: 88,
            fontSize: 22, fontWeight: 900, cursor: 'pointer',
            fontFamily: 'ui-monospace,monospace', letterSpacing: 3,
            boxShadow: '0 0 32px rgba(255,140,60,0.7), inset 0 -6px 12px rgba(0,0,0,0.35), inset 0 6px 12px rgba(255,255,255,0.3)' }}>
          GO
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   S4b — LES RÈGLES DES CHRONAUTES : MARTINE récite les 4 règles
   avant le premier saut. Chaque règle apparaît l'une après l'autre.
   Vocabulaire de 6e, formulations très simples.
   ═══════════════════════════════════════════════════════════════ */
function SlideRules({ onNext }) {
  /* Étapes : -1 = check-in MARTINE avec 3 choix de réponse,
     0..3 = les 4 règles empilées une par une. */
  const [n, setN] = useState(-1);
  /* mood: null (question posée), "content" / "dubitatif" / "enerve" (choix fait) */
  const [mood, setMood] = useState(null);
  const REPONSES = {
    content:   { emoji: "😊", label: "Vas-y, je t'écoute !",              reponse: "« Parfait ! Voilà les règles. » MARTINE t'adresse un clin d'œil.", martineMood: "content" },
    dubitatif: { emoji: "🤔", label: "Attends, j'ai peur de faire une bêtise…", reponse: "« C'est bien de te méfier. C'est justement pour ça qu'il y a des règles. Elles te protègent. »", martineMood: "neutre" },
    enerve:    { emoji: "😤", label: "Bon, allez, on n'a pas toute la journée !", reponse: "« Ha ! Un(e) impatient(e). Tant mieux : les gens pressés sautent souvent les règles. Écoute d'autant mieux. »", martineMood: "vexe" },
  };
  const REGLES = [
    { num: "1", titre: "Ne croise jamais un autre toi-même", desc: "Si tu rencontres une version de toi dans le passé ou le futur, le temps se déchire. Ne fais jamais ça.", couleur: "#ff6a7a" },
    { num: "2", titre: "Ne raconte pas le futur aux gens", desc: "Si tu dis à quelqu'un ce qui va lui arriver, il change ses choix — et l'histoire entière change avec.", couleur: "#ffd166" },
    { num: "3", titre: "Ne laisse rien du futur dans le passé", desc: "Ni objet, ni idée, ni technologie. Ramasse tout ce que tu poses. Sinon, les gens de l'époque changent leur monde à cause de toi.", couleur: "#5eff9e" },
    { num: "4", titre: "Rentre à ton époque avant qu'il soit trop tard", desc: "Si tu restes trop longtemps dans une autre époque, tu risques de ne plus jamais pouvoir revenir chez toi.", couleur: "#7fd8ff" },
  ];
  const isCheckin = n === -1;
  const isLast = n === REGLES.length - 1;
  const seen = isCheckin ? [] : REGLES.slice(0, n + 1);

  return (
    <div style={{ animation: 'fadeIn 0.6s ease-out', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      {/* --- ÉTAPE CHECK-IN : MARTINE demande si tout est clair --- */}
      {isCheckin && (
        <>
          <svg viewBox="0 0 800 340" style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '46vh' }}>
            <defs>
              <linearGradient id="s4b-cabin2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0a1a2a" />
                <stop offset="100%" stopColor="#050810" />
              </linearGradient>
              <radialGradient id="s4b-glow2" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#5eff9e" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#5eff9e" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="800" height="340" fill="url(#s4b-cabin2)" />
            <ellipse cx="400" cy="60" rx="260" ry="34" fill="#000814" stroke="#5a7898" strokeWidth="3" />
            {[[300, 50], [360, 66], [400, 46], [460, 68], [520, 54]].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={i % 2 ? 1.4 : 1} fill="#fff" opacity="0.75" />
            ))}
            <circle cx="400" cy="200" r="180" fill="url(#s4b-glow2)" />
            {/* Bulle centrée : question de MARTINE (ou sa réponse) */}
            <g transform="translate(400,200)">
              <rect x="-320" y="-80" width="640" height="160" fill="#0e1a30" stroke="#5eff9e" strokeWidth="3" rx="14" />
              <text x="0" y="-50" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="11" fill="#5eff9e" letterSpacing="4">MARTINE</text>
              {!mood ? (
                <>
                  <text x="0" y="-20" textAnchor="middle" fontFamily="Georgia,serif" fontSize="15" fill="#e8eef5" fontStyle="italic">« On va voyager dans le temps.</text>
                  <text x="0" y="0" textAnchor="middle" fontFamily="Georgia,serif" fontSize="15" fill="#e8eef5" fontStyle="italic">Ce n'est pas comme prendre le bus.</text>
                  <text x="0" y="24" textAnchor="middle" fontFamily="Georgia,serif" fontSize="15" fill="#e8eef5" fontStyle="italic">Il y a des règles précises.</text>
                  <text x="0" y="52" textAnchor="middle" fontFamily="Georgia,serif" fontSize="16" fill="#5eff9e" fontWeight="700">Prêt·e ? »</text>
                </>
              ) : (
                <foreignObject x="-300" y="-30" width="600" height="90">
                  <div xmlns="http://www.w3.org/1999/xhtml"
                    style={{ font: "italic 15px Georgia,serif", color: "#e8eef5", lineHeight: 1.4, textAlign: "center", padding: "0 12px" }}>
                    {REPONSES[mood].reponse}
                  </div>
                </foreignObject>
              )}
            </g>
          </svg>

          {/* Zone des choix ou du bouton continuer */}
          {!mood ? (
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 720, marginTop: 4 }}>
              {Object.entries(REPONSES).map(([key, r]) => (
                <button key={key} onClick={() => setMood(key)}
                  style={{ background: '#141b26', color: '#e8eef5', border: '2px solid #3a4048',
                    borderRadius: 12, padding: '12px 18px', fontSize: 13, fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'ui-monospace,monospace',
                    display: 'flex', alignItems: 'center', gap: 8, minWidth: 200,
                    transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#5eff9e'; e.currentTarget.style.background = '#0e1a30'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#3a4048'; e.currentTarget.style.background = '#141b26'; }}>
                  <span style={{ fontSize: 22 }}>{r.emoji}</span>
                  <span style={{ textAlign: 'left', flex: 1 }}>« {r.label} »</span>
                </button>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 4 }}>
              <div><Avatar mood={REPONSES[mood].martineMood} size={64} talking /></div>
              <button onClick={() => setN(0)} autoFocus
                style={{ background: '#5eff9e', color: '#06110b', border: 'none', borderRadius: 10,
                  padding: '12px 26px', fontSize: 14, fontWeight: 800, cursor: 'pointer',
                  fontFamily: 'ui-monospace,monospace', letterSpacing: 2,
                  boxShadow: '0 0 22px rgba(94,255,158,0.55)' }}>
                LES 4 RÈGLES →
              </button>
            </div>
          )}
        </>
      )}

      {/* --- ÉTAPES 0..3 : LES RÈGLES --- */}
      {!isCheckin && (
        <>
          <svg viewBox="0 0 800 520" style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '58vh' }}>
            <defs>
              <linearGradient id="s4b-cabin3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0a1a2a" />
                <stop offset="100%" stopColor="#050810" />
              </linearGradient>
              <radialGradient id="s4b-glow3" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#5eff9e" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#5eff9e" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="800" height="520" fill="url(#s4b-cabin3)" />
            <ellipse cx="400" cy="40" rx="260" ry="24" fill="#000814" stroke="#5a7898" strokeWidth="3" />
            {[[300, 34], [360, 46], [400, 30], [460, 48], [520, 36]].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={i % 2 ? 1.4 : 1} fill="#fff" opacity="0.75" />
            ))}
            <circle cx="400" cy="290" r="230" fill="url(#s4b-glow3)" />
            {/* Bandeau titre */}
            <g transform="translate(400,90)">
              <rect x="-260" y="-22" width="520" height="44" fill="#0a1428" stroke="#5eff9e" strokeWidth="2.5" rx="8" />
              <text x="0" y="8" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="18" fontWeight="800" fill="#5eff9e" letterSpacing="6">
                LES 4 RÈGLES DES CHRONAUTES
              </text>
            </g>
            {/* Règles empilées, y à partir de 140, hauteur 82 par ligne */}
            {seen.map((r, i) => (
              <g key={i} transform={`translate(70,${140 + i * 88})`} style={{ animation: i === n ? 'fadeIn 0.5s ease-out' : 'none' }}>
                <circle cx="30" cy="30" r="26" fill={r.couleur} stroke="#0a0806" strokeWidth="2" />
                <text x="30" y="40" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="28" fontWeight="900" fill="#0a0806">{r.num}</text>
                <rect x="72" y="4" width="600" height="52" fill="#141c26" stroke={`${r.couleur}88`} strokeWidth="1.5" rx="6" />
                <text x="88" y="24" fontFamily="ui-monospace,monospace" fontSize="13" fontWeight="800" fill={r.couleur} letterSpacing="1">
                  {r.titre.toUpperCase()}
                </text>
                <text x="88" y="44" fontFamily="Georgia,serif" fontSize="12" fill="#c8d4e2">
                  {r.desc}
                </text>
              </g>
            ))}
          </svg>
          {/* Zone commentaire + bouton — POSITIONNÉE SOUS le SVG (plus de chevauchement) */}
          <div style={{ width: 'min(92%, 660px)', display: 'flex', gap: 12, alignItems: 'center',
            background: '#0e1a30', border: '2px solid #5eff9e', borderRadius: 14,
            padding: '10px 16px', color: '#e8eef5',
            boxShadow: '0 0 20px rgba(94,255,158,0.25)' }}>
            <div style={{ flexShrink: 0 }}><Avatar mood="neutre" size={54} talking /></div>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.45, flex: 1, textAlign: 'left' }}>
              {!isLast
                ? "« Retiens bien ça. Chaque règle protège le fil du temps. »"
                : "« Voilà. Quatre règles. Simples, mais très importantes. Prêt·e à partir ? »"}
            </p>
            <button onClick={() => (isLast ? onNext() : setN(n + 1))} autoFocus
              style={{ flexShrink: 0, background: isLast ? '#5eff9e' : '#141b26',
                color: isLast ? '#06110b' : '#5eff9e',
                border: '2px solid #5eff9e',
                borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 800,
                cursor: 'pointer', fontFamily: 'ui-monospace,monospace', letterSpacing: 2,
                boxShadow: isLast ? '0 0 22px rgba(94,255,158,0.55)' : 'none' }}>
              {isLast ? "ON PART →" : `Suite (${n + 2}/${REGLES.length})`}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   S5 — FLASH + décompte des années (2026 → −18 000)
   ═══════════════════════════════════════════════════════════════ */
function SlideFlash({ onNext }) {
  const START = 2026;
  const END = -18000;
  const DUR = 3800; // ms
  const [year, setYear] = useState(START);
  const rafRef = useRef(null);
  useEffect(() => {
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / DUR);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setYear(Math.round(START + (END - START) * eased));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else setTimeout(() => onNext(), 400);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onNext]);
  const fmt = (y) => (y < 0 ? `−${Math.abs(y).toLocaleString('fr-FR')}` : y.toLocaleString('fr-FR'));

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out', position: 'relative' }}>
      <svg viewBox="0 0 800 500" style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '62vh' }}>
        <defs>
          <radialGradient id="s5-flash" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#fff" stopOpacity="1" /><stop offset="30%" stopColor="#fff8c0" stopOpacity="0.85" /><stop offset="70%" stopColor="#f8b800" stopOpacity="0.35" /><stop offset="100%" stopColor="#e88030" stopOpacity="0" /></radialGradient>
          <radialGradient id="s5-tunnel" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#0a0604" stopOpacity="0" /><stop offset="70%" stopColor="#3a1808" stopOpacity="0.65" /><stop offset="100%" stopColor="#0a0604" stopOpacity="1" /></radialGradient>
        </defs>
        <rect width="800" height="500" fill="#0a0604" />
        {/* Rayons qui tournent */}
        <g style={{ transformOrigin: '400px 250px', animation: 'flashSpin 3s linear infinite' }}>
          {[...Array(24)].map((_, i) => {
            const a = (i * 15) * Math.PI / 180;
            const x2 = 400 + Math.cos(a) * 500;
            const y2 = 250 + Math.sin(a) * 500;
            return <path key={i} d={`M400 250 L${x2} ${y2}`} stroke="#ffd870" strokeWidth={i % 2 ? 0.8 : 1.6} opacity={i % 2 ? 0.25 : 0.5} />;
          })}
        </g>
        {/* Anneaux concentriques qui foncent vers le centre (tunnel temporel) */}
        {[0, 0.2, 0.4, 0.6, 0.8].map((delay, i) => (
          <circle key={i} cx="400" cy="250" r="80" fill="none" stroke="#7fd8ff" strokeWidth="1.5" opacity="0.65">
            <animate attributeName="r" values="20;320" dur="1.4s" begin={`${delay}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0" dur="1.4s" begin={`${delay}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <circle cx="400" cy="250" r="280" fill="url(#s5-flash)" style={{ animation: 'flashPulse 1.2s ease-in-out infinite' }} />
        <circle cx="400" cy="250" r="380" fill="url(#s5-tunnel)" pointerEvents="none" />
        <style>{`
          @keyframes flashSpin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
          @keyframes flashPulse { 0%, 100% { opacity: 0.75; transform: scale(1); } 50% { opacity: 0.95; transform: scale(1.05); } }
        `}</style>
      </svg>
      {/* Décompte des années, superposé au flash */}
      <div style={{ position: 'absolute', top: '38%', left: 0, right: 0, textAlign: 'center', pointerEvents: 'none' }}>
        <div style={{ fontFamily: 'ui-monospace,monospace', fontSize: 12, letterSpacing: 4, color: '#ffd166',
          textShadow: '0 0 12px rgba(0,0,0,0.9)' }}>
          ⏳ SAUT TEMPOREL
        </div>
        <div style={{ fontFamily: 'ui-monospace,monospace', fontSize: 44, fontWeight: 900, color: '#fff',
          textShadow: '0 0 18px #ffd870, 0 0 28px #ff8030',
          letterSpacing: 2, marginTop: 8 }}>
          {fmt(year)}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   S6 — ARRIVÉE PRÉHISTOIRE : MARTINE posée + le joueur descend
   ═══════════════════════════════════════════════════════════════ */
function SlideArrival({ onDone }) {
  const [step, setStep] = useState(0);
  const dialogs = [
    { lines: ['« Nous y sommes.', 'Bienvenue en −18 000, chronaute. »'],
      pos: { x: 460, y: 130 }, color: 'default' },
    { lines: ['« Ma mission — et la tienne :', 'récupérer les messages que', 'les humains laissent au futur. »'],
      pos: { x: 440, y: 140 }, color: 'default' },
    { lines: ['« À chaque époque, aide un peuple', 'à laisser une trace de son savoir.', 'Plus le support est SOLIDE,', 'plus notre passage marque le temps. »'],
      pos: { x: 460, y: 150 }, color: 'alert' },
    { lines: ['« Allez, descends.', 'Approche-toi du feu — le clan t\'attend. »'],
      pos: { x: 470, y: 120 }, color: 'default' },
  ];
  const lastStep = step === dialogs.length - 1;
  const clickMartine = () => { if (!lastStep) setStep(step + 1); };

  return (
    <div style={{ animation: 'fadeIn 1s ease-out' }}>
      <svg viewBox="0 0 800 500" style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '62vh' }}>
        <defs>
          <linearGradient id="s6-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5a4020" /><stop offset="60%" stopColor="#e0a848" /><stop offset="100%" stopColor="#c86040" /></linearGradient>
          <linearGradient id="s6-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a4028" /><stop offset="100%" stopColor="#3a1808" /></linearGradient>
          <radialGradient id="s6-fire" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffd870" stopOpacity="0.9" /><stop offset="100%" stopColor="#ff5030" stopOpacity="0" /></radialGradient>
        </defs>
        <rect width="800" height="320" fill="url(#s6-sky)" />
        {/* Soleil couchant */}
        <circle cx="580" cy="240" r="70" fill="#ffe870" opacity="0.75" />
        <circle cx="580" cy="240" r="55" fill="#fff4b0" opacity="0.9" />
        {/* Montagnes lointaines et proches */}
        <path d="M0 320 L0 260 L100 220 L180 240 L280 210 L360 230 L460 200 L560 220 L680 200 L800 230 L800 320 Z" fill="#5a4058" opacity="0.55" />
        <path d="M0 320 L0 240 L100 170 L180 230 L280 150 L380 220 L470 140 L560 210 L640 170 L740 220 L800 200 L800 320 Z" fill="#3a2010" />
        <path d="M270 158 L280 150 L292 162 L282 168 Z" fill="#f0e4c8" opacity="0.7" />
        <path d="M462 148 L470 140 L480 152 L472 156 Z" fill="#f0e4c8" opacity="0.7" />
        {/* Forêt */}
        <g fill="#1a2a10">
          {[40, 78, 120, 158, 202, 250, 312, 348, 400, 452, 520, 580, 630, 680, 730, 770].map((x, i) => {
            const h = 30 + (i % 4) * 8;
            const y = 320;
            return (
              <g key={i} transform={`translate(${x},${y})`}>
                <path d={`M0 0 L-${h/3} 0 L-${h/4} -${h*0.6} L-${h/5} -${h*0.6} L0 -${h} L${h/5} -${h*0.6} L${h/4} -${h*0.6} L${h/3} 0 Z`} />
                <rect x="-1.5" y="-4" width="3" height="6" fill="#3a2010" />
              </g>
            );
          })}
        </g>
        {/* Mammouth */}
        <g transform="translate(180,300)">
          <ellipse cx="0" cy="0" rx="46" ry="26" fill="#1a0e04" />
          <ellipse cx="-40" cy="-2" rx="18" ry="14" fill="#1a0e04" />
          <path d="M-56 4 Q-70 20 -64 30 Q-56 32 -52 24" stroke="#1a0e04" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M-52 -4 Q-62 -8 -58 -14" stroke="#e8dfc8" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <circle cx="-46" cy="-4" r="1.5" fill="#f0d090" />
          <rect x="-30" y="20" width="9" height="24" fill="#1a0e04" />
          <rect x="-10" y="22" width="9" height="22" fill="#1a0e04" />
          <rect x="10" y="22" width="9" height="22" fill="#1a0e04" />
          <rect x="26" y="20" width="9" height="24" fill="#1a0e04" />
        </g>

        <rect y="320" width="800" height="180" fill="url(#s6-ground)" />
        {[[80, 380], [340, 400], [500, 380], [680, 410]].map(([cx, cy], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx="10" ry="3" fill="#5a3020" opacity="0.7" />
        ))}

        {/* Feu du clan */}
        <g transform="translate(120,410)">
          <circle r="46" fill="url(#s6-fire)" style={{ animation: 'firePulse 1.4s ease-in-out infinite' }} />
          <path d="M-18 8 L18 4 M-14 12 L18 10" stroke="#3a1808" strokeWidth="4" strokeLinecap="round" />
          <path d="M-8 -2 Q-6 -14 0 -20 Q4 -12 2 -2 Z" fill="#ffd870" />
          <path d="M-4 0 Q-2 -8 2 -12 Q4 -6 2 0 Z" fill="#ff8030" />
        </g>

        {/* Le VAISSEAU posé proprement à droite */}
        <g transform="translate(600,430) scale(0.65)">
          <TimeMachine landed={true} />
        </g>
        {/* MARTINE (avatar) qui flotte à côté du vaisseau. Elle est
            l'avatar parlant du vaisseau — c'est elle qu'on clique pour
            avancer les dialogues. Petit bob vertical pour signaler
            qu'elle lévite (via animateTransform SVG). */}
        <g onClick={!lastStep ? clickMartine : undefined}
          style={{ cursor: !lastStep ? 'pointer' : 'default' }}>
          <g transform="translate(480,340)">
            <animateTransform attributeName="transform" type="translate"
              values="480 340; 480 328; 480 340" dur="2.6s" repeatCount="indefinite" additive="replace" />
            <circle r="46" fill="rgba(94,255,158,0.18)">
              <animate attributeName="r" values="42;50;42" dur="2.6s" repeatCount="indefinite" />
            </circle>
            <circle cx="0" cy="0" r="34" fill="#8a6240" stroke="#5c3a22" strokeWidth="2" />
            <path d="M-28 -6 Q0 -14 28 -6" stroke="#5c3a22" strokeWidth="2.4" fill="none" opacity="0.8" />
            <circle cx="0" cy="4" r="12" fill="#cfeaff" stroke="#5c3a22" strokeWidth="2.4" />
            <path d="M-8 6 Q0 -3 8 6" stroke="#0c2233" strokeWidth="3.6" fill="none" strokeLinecap="round" />
            <line x1="0" y1="-34" x2="0" y2="-48" stroke="#8a94a8" strokeWidth="3" strokeLinecap="round" />
            <circle cx="0" cy="-50" r="3.6" fill="#5eff9e">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1.6s" repeatCount="indefinite" />
            </circle>
            <rect x="-44" y="-4" width="12" height="9" rx="3" fill="#6a7488" />
            <rect x="32" y="-4" width="12" height="9" rx="3" fill="#6a7488" />
            <path d="M-44 0 l-8 3 l8 3 Z" fill="#7fd8ff" style={{ animation: 'flick .5s infinite' }} />
            <path d="M44 0 l8 3 l-8 3 Z" fill="#7fd8ff" style={{ animation: 'flick .5s infinite' }} />
          </g>
        </g>

        {/* Bulle MARTINE */}
        <Bubble x={dialogs[step].pos.x} y={dialogs[step].pos.y} w={340}
          text={dialogs[step].lines}
          color={dialogs[step].color}
          from="right" />

        {/* Au dernier dialogue : personnages du clan cliquables */}
        {lastStep && (
          <g>
            <g transform="translate(200,400)" onClick={onDone} style={{ cursor: 'pointer' }}>
              <circle cx="0" cy="-10" r="52" fill="none" stroke="#5eff9e" strokeWidth="2" strokeDasharray="4 4" opacity="0.85" style={{ animation: 'personneCall 1.6s ease-in-out infinite' }} />
              <path d="M-18 20 L-18 -10 Q-18 -20 -10 -20 L10 -20 Q18 -20 18 -10 L18 20 Z" fill="#5a3818" />
              <ellipse cx="0" cy="-28" rx="12" ry="14" fill="#e0a878" />
              <path d="M-12 -32 q0 -8 6 -10 q6 2 8 -4 q4 6 8 4 q6 4 8 10 z" fill="#3a1808" />
              <circle cx="-4" cy="-28" r="1.4" fill="#0a0806" />
              <circle cx="4" cy="-28" r="1.4" fill="#0a0806" />
              <text x="0" y="-58" textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize="12" fontWeight="700" fill="#5eff9e" style={{ animation: 'personneCall 1.6s ease-in-out infinite' }}>◉ Rejoins-les</text>
            </g>
            <g transform="translate(320,380)" onClick={onDone} style={{ cursor: 'pointer' }}>
              <circle cx="0" cy="-20" r="42" fill="none" stroke="#5eff9e" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" style={{ animation: 'personneCall 1.8s ease-in-out infinite' }} />
              <path d="M-14 40 L-14 -14 Q-14 -22 -8 -22 L8 -22 Q14 -22 14 -14 L14 40 Z" fill="#4a3020" />
              <ellipse cx="0" cy="-30" rx="10" ry="12" fill="#d0a068" />
              <path d="M-10 -34 q0 -6 4 -8 q4 2 6 -2 q3 4 6 2 q4 3 6 8 z" fill="#2a1808" />
              <circle cx="-3" cy="-30" r="1.2" fill="#0a0806" />
              <circle cx="3" cy="-30" r="1.2" fill="#0a0806" />
              <path d="M14 -4 L28 -22" stroke="#3a1808" strokeWidth="3" strokeLinecap="round" />
            </g>
          </g>
        )}

        <style>{`
          @keyframes firePulse { 0%, 100% { opacity: 0.85; transform: scale(1); } 50% { opacity: 1; transform: scale(1.06); } }
          @keyframes personneCall { 0%, 100% { opacity: 0.75; transform: scale(1); } 50% { opacity: 1; transform: scale(1.08); } }
        `}</style>
      </svg>
    </div>
  );
}
