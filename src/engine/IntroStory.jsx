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
    const step = 55;
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
    <div style={{ animation: 'fadeIn 1s ease-out' }}>
      <svg viewBox="0 0 800 500" style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '62vh' }}>
        <defs>
          <radialGradient id="s1-moon" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#f0e4c8" stopOpacity="0.35" /><stop offset="100%" stopColor="#f0e4c8" stopOpacity="0" /></radialGradient>
          <radialGradient id="s1-phone-halo" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#7fb0e0" stopOpacity="0.85" /><stop offset="100%" stopColor="#7fb0e0" stopOpacity="0" /></radialGradient>
        </defs>
        <rect width="800" height="500" fill="#0a0e18" />
        <circle cx="750" cy="150" r="220" fill="url(#s1-moon)" />
        <rect x="640" y="60" width="130" height="160" fill="#1a2438" stroke="#3a2818" strokeWidth="3" />
        <path d="M705 60 v160 M640 140 h130" stroke="#3a2818" strokeWidth="2" />
        <circle cx="720" cy="110" r="18" fill="#f0e4c8" opacity="0.8" />
        <circle cx="726" cy="107" r="14" fill="#1a2438" />

        {/* LIT au premier plan */}
        <rect x="50" y="330" width="480" height="90" fill="#2a1e28" stroke="#0a0806" strokeWidth="2" />
        <path d="M60 336 Q160 322 300 342 Q420 358 520 340 L520 372 Q420 380 300 372 Q160 366 60 372 Z" fill="#3a2450" />
        <rect x="50" y="330" width="90" height="26" rx="6" fill="#5a4a58" transform="rotate(-3 95 343)" />
        <path d="M180 348 Q220 336 280 348 Q320 358 300 372 Q240 376 200 370 Q170 360 180 348 Z" fill="#4a3060" opacity="0.7" />
        <rect x="52" y="420" width="12" height="30" fill="#1a0e08" />
        <rect x="518" y="420" width="12" height="30" fill="#1a0e08" />

        {/* Table de nuit avec réveil et téléphone */}
        <rect x="540" y="330" width="130" height="90" fill="#5a3818" stroke="#1a0e08" strokeWidth="1.5" />
        <rect x="544" y="418" width="8" height="26" fill="#1a0e08" />
        <rect x="660" y="418" width="8" height="26" fill="#1a0e08" />

        <g transform="translate(575,336)">
          <rect x="-26" y="0" width="52" height="24" rx="3" fill="#1a1408" stroke="#3a2818" strokeWidth="1" />
          <rect x="-22" y="4" width="44" height="14" fill="#0a0806" />
          <text x="0" y="15" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="12" fontWeight="800" fill="#ff3020" style={{ letterSpacing: 2, filter: 'drop-shadow(0 0 3px #ff3020)' }}>03:14</text>
          <circle cx="20" cy="10" r="1" fill="#ff3020" />
        </g>

        <g transform="translate(636,346)" style={vibrating ? { animation: 'phoneShake 0.12s ease-in-out infinite' } : {}}>
          {vibrating && <circle cx="0" cy="0" r="42" fill="url(#s1-phone-halo)" style={{ animation: 'phoneGlow 0.9s ease-in-out infinite' }} />}
          <g onClick={vibrating ? onNext : undefined} style={{ cursor: vibrating ? 'pointer' : 'default' }}>
            <rect x="-14" y="-20" width="28" height="40" rx="4" fill="#1a1a1a" stroke="#5a5a5a" strokeWidth="1" />
            <rect x="-12" y="-18" width="24" height="34" rx="2" fill={vibrating ? '#3a80c8' : '#0a0a0a'} />
            {vibrating && (<>
              <circle cx="0" cy="-6" r="4" fill="#e83820" />
              <text x="0" y="-3.5" textAnchor="middle" fontSize="6" fontWeight="800" fill="#fff">1</text>
              {[14, 22, 30].map((r, i) => (
                <circle key={i} r={r} fill="none" stroke="#7fb0e0" strokeWidth="1.4" opacity={0.85 - i * 0.25} style={{ animation: 'phoneGlow 0.9s ease-in-out infinite' }} />
              ))}
            </>)}
          </g>
        </g>

        <style>{`
          @keyframes phoneShake { 0%, 100% { transform: translate(636px, 346px); } 25% { transform: translate(635px, 346.5px); } 75% { transform: translate(637px, 345.5px); } }
          @keyframes phoneGlow { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }
        `}</style>
      </svg>
      {!vibrating && (
        <p style={{ textAlign: 'center', margin: '20px auto', fontSize: 17, color: '#c8b090', fontStyle: 'italic', maxWidth: 600, lineHeight: 1.5 }}>
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
    <div style={{ animation: 'fadeIn 0.8s ease-out' }}>
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
          {/* Bulle blanche du message */}
          <g transform="translate(-100,-124)">
            <rect x="0" y="0" width="216" height="264" rx="8" fill="#fff" stroke="#e0e0e0" strokeWidth="0.5" />
            <text x="108" y="24" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10.5" fill="#111b21" fontStyle="italic">« Je m'appelle Al3x1a.</text>
            <text x="108" y="42" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10.5" fill="#111b21" fontStyle="italic">Je viens du futur.</text>
            <text x="108" y="66" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10.5" fill="#111b21" fontStyle="italic">Une machine — MARTINE —</text>
            <text x="108" y="82" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10.5" fill="#111b21" fontStyle="italic">va se poser dehors.</text>
            <text x="108" y="106" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10.5" fill="#111b21" fontStyle="italic">On a besoin de toi</text>
            <text x="108" y="122" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10.5" fill="#111b21" fontStyle="italic">pour retrouver les messages</text>
            <text x="108" y="138" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10.5" fill="#111b21" fontStyle="italic">perdus de l'humanité.</text>
            <text x="108" y="162" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10.5" fill="#111b21" fontStyle="italic">Sans eux, tout s'efface —</text>
            <text x="108" y="178" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10.5" fill="#111b21" fontStyle="italic">et moi avec.</text>
            <text x="108" y="204" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="11" fontWeight="700" fill="#111b21">Sors. »</text>
            <text x="200" y="250" textAnchor="end" fontFamily="ui-monospace,monospace" fontSize="8" fill="#8696a0">03:14</text>
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
    <div style={{ animation: 'fadeIn 0.8s ease-out', position: 'relative' }}>
      <svg viewBox="0 0 800 500" style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '62vh' }}>
        <defs>
          <linearGradient id="s3-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0a0e28" /><stop offset="100%" stopColor="#1a2438" /></linearGradient>
          <radialGradient id="s3-moon" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#f0e4c8" stopOpacity="0.5" /><stop offset="100%" stopColor="#f0e4c8" stopOpacity="0" /></radialGradient>
          <radialGradient id="s3-halo" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#b0ffdc" stopOpacity="0.85" /><stop offset="45%" stopColor="#5eff9e" stopOpacity="0.5" /><stop offset="100%" stopColor="#5eff9e" stopOpacity="0" /></radialGradient>
        </defs>
        {/* ciel nocturne */}
        <rect width="800" height="380" fill="url(#s3-sky)" />
        {/* étoiles */}
        {[[80, 60], [180, 100], [280, 40], [420, 80], [560, 50], [640, 110], [720, 70], [340, 130], [500, 120]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 1.6 : 1} fill="#fff" opacity={0.6 + (i % 4) * 0.1} />
        ))}
        {/* lune */}
        <circle cx="120" cy="100" r="90" fill="url(#s3-moon)" />
        <circle cx="120" cy="100" r="34" fill="#f0e4c8" opacity="0.85" />
        <circle cx="130" cy="90" r="28" fill="#0a0e28" opacity="0.3" />
        {/* Silhouettes de maisons au fond */}
        <g fill="#0a0e18" opacity="0.9">
          <path d="M0 380 L0 320 L60 320 L60 300 L120 260 L180 300 L180 320 L280 320 L280 280 L340 240 L400 280 L400 320 L520 320 L520 300 L580 260 L640 300 L640 320 L720 320 L720 340 L800 340 L800 380 Z" />
          {/* Quelques fenêtres allumées */}
          <rect x="140" y="290" width="10" height="12" fill="#c8a848" opacity="0.85" />
          <rect x="360" y="270" width="10" height="12" fill="#e0a848" opacity="0.75" />
          <rect x="600" y="290" width="10" height="12" fill="#c8a848" opacity="0.7" />
        </g>
        {/* rue / sol */}
        <rect y="380" width="800" height="120" fill="#141018" />
        <path d="M0 400 L800 400" stroke="#2a2028" strokeWidth="1" />
        {/* marquage au sol */}
        {[80, 240, 400, 560, 720].map((x, i) => (
          <rect key={i} x={x} y={445} width={40} height={4} fill="#4a4030" opacity="0.5" />
        ))}
        {/* lampadaire à gauche */}
        <g>
          <rect x="60" y="200" width="4" height="200" fill="#3a3a3a" />
          <path d="M62 220 L110 220 L108 232 L62 232 Z" fill="#3a3a3a" />
          <circle cx="108" cy="228" r="7" fill="#ffe8a0" opacity="0.9" />
          <circle cx="108" cy="228" r="30" fill="#ffe8a0" opacity="0.15" />
        </g>

        {/* Halo qui grandit puis se stabilise */}
        <circle cx="400" cy="380" r="0" fill="url(#s3-halo)">
          <animate attributeName="r" values="20;280;240" keyTimes="0;0.65;1" dur="2s" fill="freeze" />
          <animate attributeName="opacity" values="0;1;0.75" keyTimes="0;0.55;1" dur="2s" fill="freeze" />
        </circle>
        {/* MARTINE se matérialise progressivement (opacité 0 → 1) */}
        <g transform="translate(400,380) scale(0.85)" opacity="0">
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
          ▶ ENTRER DANS MARTINE
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
    <div style={{ animation: 'fadeIn 0.8s ease-out', position: 'relative' }}>
      <svg viewBox="0 0 800 500" style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '62vh' }}>
        <defs>
          <linearGradient id="s4-cabin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0a1a2a" /><stop offset="100%" stopColor="#050810" /></linearGradient>
          <radialGradient id="s4-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#7fd8ff" stopOpacity="0.35" /><stop offset="100%" stopColor="#7fd8ff" stopOpacity="0" /></radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#s4-cabin)" />
        {/* hublot au-dessus : ciel étoilé qui défile */}
        <ellipse cx="400" cy="120" rx="280" ry="60" fill="#000814" stroke="#5a7898" strokeWidth="4" />
        {[[280, 100], [340, 130], [400, 105], [460, 135], [520, 110], [380, 145], [440, 100]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i % 2 ? 1.4 : 1} fill="#fff" opacity="0.75" />
        ))}
        {/* diodes de bord */}
        {[[100, 250], [700, 250], [80, 320], [720, 320], [90, 390], [710, 390]].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="6" fill="#141c26" stroke="#4a5460" strokeWidth="1" />
            <circle cx={cx} cy={cy} r="4" fill={['#5eff9e', '#ffd166', '#7fd8ff', '#ff6a7a'][i % 4]} opacity="0.85">
              <animate attributeName="opacity" values="0.4;1;0.4" dur={`${1.4 + (i % 3) * 0.3}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
        <circle cx="400" cy="120" r="60" fill="url(#s4-glow)" opacity="0.5" />
      </svg>
      {/* MARTINE avatar centré */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, 0)', pointerEvents: 'none' }}>
        <Avatar mood="content" size={110} talking />
      </div>
      {/* Bulle texte */}
      <div style={{ position: 'absolute', left: '50%', bottom: 80, transform: 'translateX(-50%)', width: 'min(88%, 560px)',
        background: '#0e1a30', border: '2px solid #5eff9e', borderRadius: 14,
        padding: '14px 20px', color: '#e8eef5',
        boxShadow: '0 0 30px rgba(94,255,158,0.35)', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55 }}>
          « Bienvenue à bord. Je suis <strong style={{ color: '#5eff9e' }}>MARTINE</strong> —
          Machine À Remonter le Temps Intelligente Néanmoins Excellente.
          Al3x1a m'envoie te chercher. Nous partons en <strong style={{ color: '#ffd166' }}>−18 000</strong>. Accroche-toi. »
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
   S5 — FLASH (auto-avance après 2s)
   ═══════════════════════════════════════════════════════════════ */
function SlideFlash({ onNext }) {
  useEffect(() => { const t = setTimeout(() => onNext(), 2600); return () => clearTimeout(t); }, [onNext]);
  return (
    <div style={{ animation: 'fadeIn 0.8s ease-out' }}>
      <svg viewBox="0 0 800 500" style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '62vh' }}>
        <defs>
          <radialGradient id="s5-flash" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#fff" stopOpacity="1" /><stop offset="30%" stopColor="#fff8c0" stopOpacity="0.85" /><stop offset="70%" stopColor="#f8b800" stopOpacity="0.35" /><stop offset="100%" stopColor="#e88030" stopOpacity="0" /></radialGradient>
        </defs>
        <rect width="800" height="500" fill="#0a0604" />
        <g style={{ transformOrigin: '400px 250px', animation: 'flashSpin 4s linear infinite' }}>
          {[...Array(24)].map((_, i) => {
            const a = (i * 15) * Math.PI / 180;
            const x2 = 400 + Math.cos(a) * 500;
            const y2 = 250 + Math.sin(a) * 500;
            return <path key={i} d={`M400 250 L${x2} ${y2}`} stroke="#ffd870" strokeWidth={i % 2 ? 0.8 : 1.6} opacity={i % 2 ? 0.25 : 0.5} />;
          })}
        </g>
        <circle cx="400" cy="250" r="280" fill="url(#s5-flash)" style={{ animation: 'flashPulse 1.2s ease-in-out infinite' }} />
        <style>{`
          @keyframes flashSpin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
          @keyframes flashPulse { 0%, 100% { opacity: 0.75; transform: scale(1); } 50% { opacity: 0.95; transform: scale(1.05); } }
        `}</style>
      </svg>
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

<<<<<<< HEAD
        {/* MARTINE posée proprement à droite */}
        <g transform="translate(600,430) scale(0.65)">
          <TimeMachine landed={true} />
=======
        {/* JOUEUR — silhouette debout à côté de MARTINE (pas de crash) */}
        <g transform="translate(400,420)">
          {/* jambes */}
          <path d="M-8 60 L-6 20 L-2 20 L-4 60 Z" fill="#3a5580" stroke="#243554" strokeWidth="1" />
          <path d="M2 60 L4 20 L8 20 L6 60 Z" fill="#3a5580" stroke="#243554" strokeWidth="1" />
          {/* baskets */}
          <ellipse cx="-6" cy="60" rx="9" ry="4" fill="#f8f8f8" stroke="#2a2a2a" strokeWidth="0.8" />
          <ellipse cx="6" cy="60" rx="9" ry="4" fill="#f8f8f8" stroke="#2a2a2a" strokeWidth="0.8" />
          {/* torse t-shirt bleu */}
          <path d="M-14 20 L-14 -14 Q-14 -20 -8 -20 L8 -20 Q14 -20 14 -14 L14 20 Z" fill="#5eaadd" stroke="#2a5478" strokeWidth="1" />
          {/* bras */}
          <path d="M-14 -14 L-24 10" stroke="#e8b088" strokeWidth="7" strokeLinecap="round" />
          <path d="M14 -14 L24 10" stroke="#e8b088" strokeWidth="7" strokeLinecap="round" />
          {/* tête */}
          <ellipse cx="0" cy="-30" rx="10" ry="12" fill="#e8b088" stroke="#8a5030" strokeWidth="0.8" />
          <path d="M-10 -34 q0 -8 5 -10 q5 2 6 -2 q3 4 6 -1 q5 3 6 10 z" fill="#5a3818" />
          <circle cx="-3" cy="-30" r="1.3" fill="#2a1808" />
          <circle cx="3" cy="-30" r="1.3" fill="#2a1808" />
          <path d="M-2 -25 Q0 -23 2 -25" stroke="#5a2818" strokeWidth="0.9" fill="none" strokeLinecap="round" />
>>>>>>> origin/main
        </g>
        {/* Zone cliquable invisible sur MARTINE pour avancer les dialogues */}
        {!lastStep && (
          <circle cx="600" cy="380" r="70" fill="transparent" onClick={clickMartine} style={{ cursor: 'pointer' }} />
        )}

<<<<<<< HEAD
=======
        {/* MARTINE posée proprement à droite */}
        <g transform="translate(600,430) scale(0.65)">
          <TimeMachine landed={true} />
        </g>
        {/* Zone cliquable invisible sur MARTINE pour avancer les dialogues */}
        {!lastStep && (
          <circle cx="600" cy="380" r="70" fill="transparent" onClick={clickMartine} style={{ cursor: 'pointer' }} />
        )}

>>>>>>> origin/main
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
