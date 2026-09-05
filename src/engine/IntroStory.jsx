import { useEffect, useState, useRef } from 'react';
import { playSfx } from './audio.js';

/* ============================================================
   INTRO — 7 tableaux INTERACTIFS.
   ============================================================
   1. NUIT PAISIBLE : radio-réveil, chat qui dort. Le téléphone
      se met à vibrer après ~3 s (son). Clic tel → suivant.
   2. LE MESSAGE : SMS du « toi dans 30 ans ». Clic tel → suivant.
   3. CHAMBRE : une lumière brille sous le lit. Clic lumière →
      suivant.
   4. SOUS LE LIT : MARTINE (noix) planquée sous des objets. Il
      faut cliquer les objets pour les dégager avant de la voir.
      Clic MARTINE → suivant.
   5. MARTINE PARLE : « n'aie pas peur… ton moi du futur… ». Clic
      MARTINE → le chat lui donne un coup de patte. Clic sur le
      chat pour l'écarter. Clic MARTINE → « Bzzzz » (cassée). Clic
      encore → flash de téléportation.
   6. FLASH.
   7. PRÉHISTOIRE : arrivée en −18 000 avec MARTINE en noix.
      Clic MARTINE → elle explique l'incident, la brigade
      temporelle, le SOS et le flux. Un dernier clic → COMMENCER.
   ============================================================ */

/* ─── MARTINE en forme de NOIX, réutilisable ─── */
function MartineNut({ x = 0, y = 0, scale = 1, mood = 'neutre', talking = false, date, onClick, cursor = 'default', style }) {
  const vexe = mood === 'vexe';
  const content = mood === 'content';
  const casse = mood === 'casse';
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`} onClick={onClick} style={{ cursor, ...style }}>
      {content && (
        <g stroke="#7fd8ff" strokeWidth="2" fill="none" opacity="0.9">
          <path d="M-38 -12 q-8 -6 -4 -14" style={{ animation: 'drift 1.6s infinite' }} />
          <path d="M38 -8 q9 -5 5 -14" style={{ animation: 'drift 2s infinite' }} />
          <path d="M-30 22 q-9 3 -12 10" style={{ animation: 'drift 1.8s infinite' }} />
        </g>
      )}
      {/* antenne */}
      <g style={{ transformOrigin: '0px -24px', transform: vexe || casse ? 'rotate(38deg)' : 'none' }}>
        <line x1="0" y1="-24" x2="0" y2="-38" stroke="#8a94a8" strokeWidth="3" strokeLinecap="round" />
        <circle cx="0" cy="-40" r="3.6" fill={casse ? '#8a1a10' : vexe ? '#e8934a' : '#5eff9e'} style={{ animation: `pulse ${talking ? 0.45 : 2.2}s infinite` }} />
      </g>
      {/* propulseurs latéraux */}
      <rect x="-46" y="2" width="14" height="11" rx="4" fill="#6a7488" />
      <rect x="32" y="2" width="14" height="11" rx="4" fill="#6a7488" />
      {!vexe && !casse && (
        <g style={{ animation: 'flick .5s infinite' }}>
          <path d="M-45 5 l-10 3.5 l10 4.5 Z" fill="#7fd8ff" />
          <path d="M45 5 l10 3.5 l-10 4.5 Z" fill="#7fd8ff" />
          <path d="M-45 7 l-5.5 1.8 l5.5 2.4 Z" fill="#ffb347" />
          <path d="M45 7 l5.5 1.8 l-5.5 2.4 Z" fill="#ffb347" />
        </g>
      )}
      {/* coque de noix */}
      <path d="M0 -26 Q28 -24 32 2 Q34 24 16 32 Q0 38 -16 32 Q-34 24 -32 2 Q-28 -24 0 -26 Z" fill="#8a6240" />
      <path d="M0 -26 Q28 -24 32 2 Q33 16 24 26 Q14 10 16 -8 Q10 -20 0 -26 Z" fill="#6e4a2c" opacity="0.7" />
      <path d="M-30 4 Q0 -6 30 4" stroke="#5c3a22" strokeWidth="3" fill="none" opacity="0.8" />
      <path d="M-20 -14 q10 6 6 16 M12 -18 q-6 10 0 18 M-10 18 q8 6 18 2 M-24 12 q4 8 12 10" stroke="#5c3a22" strokeWidth="2" fill="none" opacity="0.55" />
      {/* écran de bord */}
      {date && (
        <g>
          <rect x="-20" y="16" width="40" height="13" rx="3" fill="#0c1410" stroke="#5c3a22" strokeWidth="1.5" />
          <text x="0" y="25.5" textAnchor="middle" fontSize="8.5" fill={vexe || casse ? '#e8934a' : '#5eff9e'} fontFamily="ui-monospace,monospace">{date}</text>
        </g>
      )}
      {/* hublot-œil */}
      <circle cx="0" cy="2" r="11" fill="#cfeaff" stroke="#5c3a22" strokeWidth="2.5" />
      <ellipse cx="-4" cy="-3" rx="4" ry="2.4" fill="#fff" opacity="0.85" />
      {content ? (
        <path d="M-7 5 Q0 -4 7 5" stroke="#0c2233" strokeWidth="3.6" fill="none" strokeLinecap="round" />
      ) : casse ? (
        <g>
          <path d="M-7 -3 L7 3 M7 -3 L-7 3" stroke="#0c2233" strokeWidth="3" strokeLinecap="round" />
          {/* étincelles */}
          <path d="M-14 -14 l-4 -3 M14 -12 l4 -2 M-18 4 l-4 0 M18 4 l4 0" stroke="#e8934a" strokeWidth="2" opacity="0.9" />
        </g>
      ) : vexe ? (
        <g>
          <circle cx="3.5" cy="4.5" r="3.6" fill="#0c2233" />
          <path d="M-9 -3 Q0 -5.5 9 -1" stroke="#4a6a84" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
      ) : (
        <circle cx="0" cy="2" r="4" fill="#0c2233" />
      )}
    </g>
  );
}

/* ─── MEOW : miaulement WebAudio (glissando descendant + formant) ─── */
let MeowAC = null;
function playMeow() {
  try {
    MeowAC = MeowAC || new (window.AudioContext || window.webkitAudioContext)();
    if (MeowAC.state === 'suspended') MeowAC.resume();
    const t = MeowAC.currentTime;
    // Glissando montant puis descendant (courbe caractéristique du miaou)
    const o = MeowAC.createOscillator(); o.type = 'sawtooth';
    o.frequency.setValueAtTime(300, t);
    o.frequency.exponentialRampToValueAtTime(700, t + 0.15);
    o.frequency.exponentialRampToValueAtTime(220, t + 0.55);
    // filtre passe-bande pour la voix
    const bp = MeowAC.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 900; bp.Q.value = 4;
    // vibrato
    const lfo = MeowAC.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 6;
    const lfoGain = MeowAC.createGain(); lfoGain.gain.value = 12;
    lfo.connect(lfoGain); lfoGain.connect(o.frequency);
    // enveloppe
    const g = MeowAC.createGain();
    g.gain.setValueAtTime(0.001, t);
    g.gain.exponentialRampToValueAtTime(0.22, t + 0.03);
    g.gain.setValueAtTime(0.22, t + 0.45);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
    o.connect(bp); bp.connect(g); g.connect(MeowAC.destination);
    o.start(t); lfo.start(t);
    o.stop(t + 0.65); lfo.stop(t + 0.65);
  } catch { /* pas d'audio */ }
}

/* ─── CHAT curled up sleeping, reusable — cliquable optionnel ─── */
function CatSleeping({ x = 0, y = 0, scale = 1, awake = false, purring = false, onClick, cursor = 'default' }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`} onClick={onClick} style={{ cursor }}>
      {/* queue enroulée derrière */}
      <path d="M40 4 Q60 -2 68 12 Q66 24 54 22 Q46 18 44 10 Z" fill="#c86828" stroke="#8a3818" strokeWidth="1" />
      <path d="M46 8 q10 -2 16 8" stroke="#8a3818" strokeWidth="0.8" fill="none" opacity="0.6" />
      {/* corps en boule */}
      <ellipse cx="0" cy="4" rx="42" ry="18" fill="#c86828" stroke="#8a3818" strokeWidth="1.5" />
      <ellipse cx="0" cy="0" rx="40" ry="16" fill="#e08840" />
      {/* rayures tabby */}
      <path d="M-24 -8 q3 6 0 12 M-12 -12 q3 8 0 16 M0 -14 q3 8 0 16 M12 -12 q3 8 0 16 M24 -8 q3 6 0 12" stroke="#8a3818" strokeWidth="2" fill="none" opacity="0.7" />
      {/* patte tendue devant */}
      <ellipse cx="-30" cy="12" rx="12" ry="6" fill="#e08840" stroke="#8a3818" strokeWidth="1" />
      <path d="M-42 12 q-4 -2 -4 2 M-38 15 q-4 -2 -4 2" stroke="#8a3818" strokeWidth="0.6" fill="none" />
      {/* tête posée sur la patte */}
      <ellipse cx="-32" cy="-4" rx="18" ry="16" fill="#e08840" stroke="#8a3818" strokeWidth="1.5" />
      {/* oreilles pointues */}
      <path d="M-46 -14 L-44 -26 L-36 -18 Z" fill="#e08840" stroke="#8a3818" strokeWidth="1.2" />
      <path d="M-30 -18 L-24 -26 L-22 -14 Z" fill="#e08840" stroke="#8a3818" strokeWidth="1.2" />
      {/* intérieur oreille rose */}
      <path d="M-44 -16 L-42 -22 L-38 -18 Z" fill="#e0a0a0" opacity="0.7" />
      <path d="M-30 -18 L-26 -22 L-24 -16 Z" fill="#e0a0a0" opacity="0.7" />
      {/* œil (fermé ou entrouvert) */}
      {awake ? (
        <>
          <ellipse cx="-38" cy="-4" rx="2.4" ry="3" fill="#c8e070" />
          <ellipse cx="-38" cy="-3" rx="0.8" ry="2" fill="#0a0e04" />
        </>
      ) : (
        <path d="M-42 -4 Q-38 -1 -34 -4" stroke="#3a1808" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      )}
      {/* nez rose */}
      <path d="M-48 4 L-46 6 L-50 6 Z" fill="#e08080" />
      {/* bouche */}
      <path d="M-48 8 q2 2 4 0 M-48 8 q-2 2 -4 0" stroke="#3a1808" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      {/* moustaches */}
      <path d="M-52 4 l-8 -1 M-52 6 l-8 1 M-46 8 l-8 3" stroke="#e8dfc8" strokeWidth="0.6" strokeLinecap="round" opacity="0.85" />
      {/* Sommeil : Zzz par défaut ; rrrr rrrr quand on clique dessus (ronron) */}
      {!awake && !purring && (
        <>
          <text x="-16" y="-30" fontFamily="Georgia,serif" fontStyle="italic" fontSize="12" fill="#7a6a50" opacity="0.85">z</text>
          <text x="-10" y="-38" fontFamily="Georgia,serif" fontStyle="italic" fontSize="9" fill="#7a6a50" opacity="0.7">Z</text>
          <text x="-4" y="-44" fontFamily="Georgia,serif" fontStyle="italic" fontSize="7" fill="#7a6a50" opacity="0.55">z</text>
        </>
      )}
      {!awake && purring && (
        <text x="-8" y="-30" fontFamily="Georgia,serif" fontStyle="italic" fontSize="12" fill="#c88060" opacity="0.95" letterSpacing="1">rrrr rrrr</text>
      )}
    </g>
  );
}

/* Point-and-click bubble — hauteur auto, texte bien centré verticalement.
   `color` : « default » (blanc-crème) ou « alert » (jaune-orangé) pour
   marquer les moments importants (ex. explication du SOS). */
function Bubble({ x, y, w = 260, text, from = 'left', color = 'default' }) {
  const lines = Array.isArray(text) ? text : [text];
  const LINE = 18;
  const PAD_TOP = 16;
  const PAD_BOT = 14;
  /* La HAUTEUR de la bulle est calculée sur le texte COMPLET (pas
     progressif) — sinon la bulle « grandit » en même temps que le
     texte, effet moche. On garde la géométrie stable, seul le texte
     apparaît lettre par lettre. */
  const h = PAD_TOP + PAD_BOT + lines.length * LINE;
  const top = -h / 2;
  const firstBaseline = top + PAD_TOP + 13;
  const bottom = top + h;
  const fill = color === 'alert' ? '#fff0c8' : '#fff9e8';
  const stroke = color === 'alert' ? '#e0a848' : '#5a4028';
  const textFill = color === 'alert' ? '#3a2010' : '#1a1408';

  /* ═══ EFFET MACHINE À ÉCRIRE ═══
     On concatène toutes les lignes avec un séparateur `\n`, puis on
     révèle les caractères un à un (~28 ms/lettre). Un clic n'importe
     où sur la bulle SAUTE à la fin (pour les lecteurs rapides ou une
     démo en classe). Quand le texte change, on repart de zéro. */
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
  /* Reconstruit les lignes RÉVÉLÉES à partir du texte plein tronqué,
     en respectant les sauts. La dernière ligne partielle porte le
     curseur clignotant `▮` tant que la révélation n'est pas terminée. */
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
    <SlideRoomLight   key="s3" onNext={next} />,
    <SlideUnderBed    key="s4" onNext={next} />,
    <SlideMartineTalks key="s5" onNext={next} />,
    <SlideFlash       key="s6" onNext={next} />,
    <SlidePrehistoric key="s7" onDone={onDone} />,
  ];
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#050810', zIndex: 100, display: 'flex', flexDirection: 'column', color: '#efe6d2', fontFamily: 'Palatino, Georgia, serif', overflow: 'hidden' }}>
      <button onClick={onDone}
        style={{ position: 'absolute', top: 12, right: 16, zIndex: 10, background: 'transparent', border: '1px solid #5a4028', color: '#7a6a4a', padding: '6px 14px', borderRadius: 6, fontSize: 11, cursor: 'pointer', fontFamily: 'ui-monospace,monospace' }}>
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
   S1 — NUIT PAISIBLE (radio-réveil + chat, tel vibre après 3s)
   ═══════════════════════════════════════════════════════════════ */
function SlideNight({ onNext }) {
  const [vibrating, setVibrating] = useState(false);
  const [purring, setPurring] = useState(false);
  const purrTimer = useRef(null);
  const petCat = () => {
    setPurring(true);
    clearTimeout(purrTimer.current);
    purrTimer.current = setTimeout(() => setPurring(false), 2500);
  };
  useEffect(() => () => clearTimeout(purrTimer.current), []);
  const audioRef = useRef(null);
  useEffect(() => {
    // Préchargement dès le mount — comme ça au moment où on play(), le fichier est en cache
    try {
      const a = new Audio('assets/sounds/phone-vibrate.wav');
      a.loop = true; a.volume = 0.35; a.preload = 'auto';
      a.load();
      audioRef.current = a;
    } catch {}
    const t = setTimeout(() => {
      setVibrating(true);
      const a = audioRef.current;
      if (!a) return;
      // Retry jusqu'à 3× si l'audio n'est pas prêt
      const tryPlay = (n = 0) => {
        const p = a.play();
        if (p && p.catch) p.catch((err) => {
          if (n < 3) setTimeout(() => tryPlay(n + 1), 200);
          else console.warn('[intro] audio blocked:', err?.message);
        });
      };
      tryPlay();
    }, 3000);
    return () => { clearTimeout(t); try { audioRef.current?.pause(); } catch {} };
  }, []);

  return (
    <div style={{ animation: 'fadeIn 1s ease-out' }}>
      <svg viewBox="0 0 800 500" style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '62vh' }}>
        <defs>
          <radialGradient id="s1-moon" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#f0e4c8" stopOpacity="0.35" /><stop offset="100%" stopColor="#f0e4c8" stopOpacity="0" /></radialGradient>
          <radialGradient id="s1-phone-halo" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#7fb0e0" stopOpacity="0.85" /><stop offset="100%" stopColor="#7fb0e0" stopOpacity="0" /></radialGradient>
        </defs>
        {/* mur nuit */}
        <rect width="800" height="500" fill="#0a0e18" />
        {/* halo lune par fenêtre à droite */}
        <circle cx="750" cy="150" r="220" fill="url(#s1-moon)" />
        {/* fenêtre */}
        <rect x="640" y="60" width="130" height="160" fill="#1a2438" stroke="#3a2818" strokeWidth="3" />
        <path d="M705 60 v160 M640 140 h130" stroke="#3a2818" strokeWidth="2" />
        <circle cx="720" cy="110" r="18" fill="#f0e4c8" opacity="0.8" />
        <circle cx="726" cy="107" r="14" fill="#1a2438" />

        {/* LIT au premier plan (dormeur invisible sous couette) */}
        <rect x="50" y="330" width="480" height="90" fill="#2a1e28" stroke="#0a0806" strokeWidth="2" />
        <path d="M60 336 Q160 322 300 342 Q420 358 520 340 L520 372 Q420 380 300 372 Q160 366 60 372 Z" fill="#3a2450" />
        <rect x="50" y="330" width="90" height="26" rx="6" fill="#5a4a58" transform="rotate(-3 95 343)" />
        {/* silhouette du dormeur (bosse) */}
        <path d="M180 348 Q220 336 280 348 Q320 358 300 372 Q240 376 200 370 Q170 360 180 348 Z" fill="#4a3060" opacity="0.7" />
        <rect x="52" y="420" width="12" height="30" fill="#1a0e08" />
        <rect x="518" y="420" width="12" height="30" fill="#1a0e08" />

        {/* TABLE DE NUIT plus large pour poser réveil ET téléphone côte à côte */}
        <rect x="540" y="330" width="130" height="90" fill="#5a3818" stroke="#1a0e08" strokeWidth="1.5" />
        {/* pieds table */}
        <rect x="544" y="418" width="8" height="26" fill="#1a0e08" />
        <rect x="660" y="418" width="8" height="26" fill="#1a0e08" />

        {/* RADIO-RÉVEIL à gauche de la table (heure lumineuse rouge) */}
        <g transform="translate(575,336)">
          <rect x="-26" y="0" width="52" height="24" rx="3" fill="#1a1408" stroke="#3a2818" strokeWidth="1" />
          <rect x="-22" y="4" width="44" height="14" fill="#0a0806" />
          <text x="0" y="15" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="12" fontWeight="800" fill="#ff3020" style={{ letterSpacing: 2, filter: 'drop-shadow(0 0 3px #ff3020)' }}>03:14</text>
          <circle cx="20" cy="10" r="1" fill="#ff3020" />
        </g>

        {/* TÉLÉPHONE posé à plat à DROITE du radio-réveil sur la même table — vibre après 3s */}
        <g transform="translate(636,346)" style={vibrating ? { animation: 'phoneShake 0.12s ease-in-out infinite' } : {}}>
          {vibrating && <circle cx="0" cy="0" r="42" fill="url(#s1-phone-halo)" style={{ animation: 'phoneGlow 0.9s ease-in-out infinite' }} />}
          <g onClick={vibrating ? onNext : undefined} style={{ cursor: vibrating ? 'pointer' : 'default' }}>
            {/* smartphone à plat, vu de dessus (rectangle vertical) */}
            <rect x="-14" y="-20" width="28" height="40" rx="4" fill="#1a1a1a" stroke="#5a5a5a" strokeWidth="1" />
            <rect x="-12" y="-18" width="24" height="34" rx="2" fill={vibrating ? '#3a80c8' : '#0a0a0a'} />
            {vibrating && (<>
              {/* icône notification */}
              <circle cx="0" cy="-6" r="4" fill="#e83820" />
              <text x="0" y="-3.5" textAnchor="middle" fontSize="6" fontWeight="800" fill="#fff">1</text>
              {/* ondes qui rayonnent */}
              {[14, 22, 30].map((r, i) => (
                <circle key={i} r={r} fill="none" stroke="#7fb0e0" strokeWidth="1.4" opacity={0.85 - i * 0.25} style={{ animation: 'phoneGlow 0.9s ease-in-out infinite' }} />
              ))}
            </>)}
          </g>
        </g>

        {/* CHAT qui dort en boule sur le lit — clic = ronron « rrrr rrrr » 2,5 s */}
        <CatSleeping x={400} y={310} scale={1} awake={false} purring={purring}
          onClick={petCat} cursor="pointer" />

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
   S2 — LE MESSAGE (téléphone plein cadre, clic pour continuer)
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
          <rect x="-118" y="-208" width="236" height="416" rx="20" fill="#0a1428" />
          <rect x="-118" y="-208" width="236" height="30" fill="#0a1420" />
          <text x="-100" y="-190" fontFamily="ui-monospace,monospace" fontSize="10" fill="#c8d4e2">03:14</text>
          <text x="100" y="-190" textAnchor="end" fontFamily="ui-monospace,monospace" fontSize="10" fill="#c8d4e2">◒ 39%</text>
          <rect x="-118" y="-178" width="236" height="46" fill="#141b26" />
          <circle cx="-92" cy="-155" r="14" fill="#3a1a10" stroke="#e83820" strokeWidth="1.5" />
          <text x="-92" y="-152" textAnchor="middle" fontSize="14" fontWeight="800" fill="#e83820">?</text>
          <text x="-72" y="-160" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10" fontWeight="700" fill="#e8dfc8">Numéro inconnu</text>
          <text x="-72" y="-146" fontFamily="ui-monospace,monospace" fontSize="8" fill="#7a879e">+?? ?? ?? ?? ??</text>
          <g transform="translate(-96,-100)">
            <path d="M0 0 L200 0 Q212 0 212 12 L212 120 Q212 132 200 132 L18 132 L4 148 L6 132 Q-6 130 -6 118 L-6 12 Q-6 0 6 0 Z" fill="#2a3d58" stroke="#3a5878" strokeWidth="1" />
            <text x="102" y="24" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10" fill="#e8dfc8" fontStyle="italic">« Elle est là,</text>
            <text x="102" y="40" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10" fill="#e8dfc8" fontStyle="italic">sous ton lit.</text>
            <text x="102" y="56" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10" fill="#e8dfc8" fontStyle="italic">N'aie pas peur.</text>
            <text x="102" y="76" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10" fill="#e8dfc8" fontStyle="italic">Prends-la, un grand</text>
            <text x="102" y="92" textAnchor="middle" fontFamily="Segoe UI, system-ui, sans-serif" fontSize="10" fill="#e8dfc8" fontStyle="italic">danger te menace. »</text>
            <text x="102" y="118" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" fontWeight="700" fill="#ffd166">— Toi, dans 30 ans</text>
          </g>
          <text x="0" y="70" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="9" fill="#5a6a80">03:14</text>
          <rect x="-40" y="204" width="80" height="3" rx="1.5" fill="#5a6a80" />
        </g>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   S3 — LA CHAMBRE : une lumière brille sous le lit. Clic → suivant
   ═══════════════════════════════════════════════════════════════ */
function SlideRoomLight({ onNext }) {
  return (
    <div style={{ animation: 'fadeIn 0.8s ease-out' }}>
      <svg viewBox="0 0 800 500" style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '62vh' }}>
        <defs>
          <radialGradient id="s3-light" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#7fe0ff" stopOpacity="1" /><stop offset="60%" stopColor="#3a80c8" stopOpacity="0.5" /><stop offset="100%" stopColor="#3a80c8" stopOpacity="0" /></radialGradient>
        </defs>
        {/* mur + sol */}
        <rect width="800" height="500" fill="#0a0e18" />
        <rect y="380" width="800" height="120" fill="#0a0604" />
        {/* fenêtre */}
        <rect x="640" y="60" width="130" height="160" fill="#1a2438" stroke="#3a2818" strokeWidth="3" />
        <path d="M705 60 v160 M640 140 h130" stroke="#3a2818" strokeWidth="2" />
        {/* LIT */}
        <rect x="80" y="280" width="500" height="100" fill="#2a1e28" stroke="#0a0806" strokeWidth="2" />
        <rect x="80" y="280" width="90" height="26" rx="6" fill="#5a4a58" transform="rotate(-3 125 293)" />
        <path d="M90 288 Q180 274 320 296 Q460 316 570 300 L570 336 Q460 348 320 340 Q180 332 90 336 Z" fill="#3a2450" />
        <rect x="82" y="380" width="12" height="30" fill="#1a0e08" />
        <rect x="566" y="380" width="12" height="30" fill="#1a0e08" />
        {/* couette qui pend un peu */}
        <path d="M80 380 L580 380 L580 400 L80 400 Z" fill="#2a1e28" />

        {/* SOUS le lit : la LUMIÈRE bleue qui filtre — DISCRÈTE, à peine visible */}
        <g onClick={onNext} style={{ cursor: 'pointer' }}>
          <ellipse cx="330" cy="410" rx="80" ry="18" fill="url(#s3-light)" opacity="0.55" style={{ animation: 'phoneGlow 2.4s ease-in-out infinite' }} />
          {/* fine ligne qui filtre entre le sol et le bord du lit */}
          <path d="M290 400 L370 400" stroke="#7fe0ff" strokeWidth="2" opacity="0.75" style={{ filter: 'drop-shadow(0 0 4px #7fe0ff)' }} />
        </g>

        {/* CHAT au MÊME endroit qu'en S1, mais RÉVEILLÉ (a entendu du bruit) */}
        <CatSleeping x={400} y={300} scale={1} awake={true} />

        <style>{`@keyframes phoneGlow { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }`}</style>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   S4 — SOUS LE LIT : objets à écarter pour trouver MARTINE
   ═══════════════════════════════════════════════════════════════ */
function SlideUnderBed({ onNext }) {
  const [pushed, setPushed] = useState({});
  const pushAway = (id) => { setPushed((p) => ({ ...p, [id]: true })); playSfx('pickup'); };
  const OBJECTS = [
    { id: 'sock',    render: (p) => <g transform={`translate(${p ? -400 : 260},350) rotate(-10)`} style={{ transition: 'transform 0.5s ease-out', cursor: p ? 'default' : 'pointer' }} onClick={() => pushAway('sock')}><path d="M0 0 L34 -3 L38 12 L28 24 L26 40 L4 42 L-2 26 L0 12 Z" fill="#a04030" stroke="#5a1810" strokeWidth="1" /><path d="M2 6 h32 M2 14 h32" stroke="#5a1810" strokeWidth="0.5" opacity="0.55" /></g> },
    { id: 'shoe',    render: (p) => <g transform={`translate(${p ? 1200 : 460},345)`} style={{ transition: 'transform 0.5s ease-out', cursor: p ? 'default' : 'pointer' }} onClick={() => pushAway('shoe')}><path d="M0 0 Q10 -8 40 -6 L90 -4 Q110 0 108 20 L104 34 L0 34 L-8 20 Q-8 10 0 0 Z" fill="#3a3a3a" stroke="#1a1a1a" strokeWidth="1.5" /><path d="M0 34 h108" stroke="#8a8a8a" strokeWidth="4" /></g> },
    { id: 'book',    render: (p) => <g transform={`translate(${p ? -400 : 340},380) rotate(-8)`} style={{ transition: 'transform 0.5s ease-out', cursor: p ? 'default' : 'pointer' }} onClick={() => pushAway('book')}><rect x="0" y="0" width="70" height="42" fill="#5a2a80" stroke="#3a1650" strokeWidth="1.2" /><rect x="4" y="4" width="62" height="34" fill="#4a1e6a" /><text x="35" y="26" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9" fill="#e8dfc8" fontStyle="italic">MYSTÈRES</text></g> },
    { id: 'candy',   render: (p) => <g transform={`translate(${p ? 1200 : 380},420) rotate(15)`} style={{ transition: 'transform 0.5s ease-out', cursor: p ? 'default' : 'pointer' }} onClick={() => pushAway('candy')}><rect x="0" y="0" width="60" height="18" rx="2" fill="#e0a848" stroke="#a05828" strokeWidth="1" /><text x="30" y="12" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7" fontWeight="800" fill="#3a1808">BONBONS</text></g> },
    { id: 'ball',    render: (p) => <g transform={`translate(${p ? -400 : 470},400)`} style={{ transition: 'transform 0.5s ease-out', cursor: p ? 'default' : 'pointer' }} onClick={() => pushAway('ball')}><circle r="18" fill="#e83820" /><path d="M-14 -8 q6 -8 14 -8 q8 0 14 8 M-14 8 q6 8 14 8 q8 0 14 -8" stroke="#a01810" strokeWidth="1.5" fill="none" /></g> },
  ];
  const allPushed = OBJECTS.every((o) => pushed[o.id]);

  return (
    <div style={{ animation: 'fadeIn 0.8s ease-out' }}>
      <svg viewBox="0 0 800 500" style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '62vh' }}>
        <defs>
          <linearGradient id="s4-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4a3020" /><stop offset="100%" stopColor="#1a0e04" /></linearGradient>
          <radialGradient id="s4-halo" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#7fe0ff" stopOpacity="0.8" /><stop offset="100%" stopColor="#7fe0ff" stopOpacity="0" /></radialGradient>
        </defs>
        <rect width="800" height="500" fill="#0e0a04" />
        {/* lattes du sommier vues d'en-dessous */}
        <rect width="800" height="130" fill="#1a0e04" />
        {[0, 100, 200, 300, 400, 500, 600, 700, 800].map((x, i) => (
          <path key={i} d={`M${x} 0 L${x - 20} 130`} stroke="#0a0806" strokeWidth="3" opacity="0.7" />
        ))}
        <rect y="130" width="800" height="370" fill="url(#s4-floor)" />
        <path d="M0 130 h800" stroke="#0a0806" strokeWidth="1" />

        {/* poussières */}
        {[[80, 380], [180, 420], [520, 400], [680, 380]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="12" ry="4" fill="#7a6a50" opacity="0.5" />
        ))}

        {/* MARTINE au centre, halo bleu — d'abord CACHÉE sous les objets.
            Toute la NOIX est cliquable dès que le bazar est écarté. */}
        <g transform="translate(400,370)">
          <circle r="80" fill="url(#s4-halo)" style={{ animation: 'martinePulse 2s ease-in-out infinite' }} />
          <MartineNut scale={2} mood="neutre" date={null}
            onClick={allPushed ? onNext : undefined}
            cursor={allPushed ? 'pointer' : 'default'} />
          {/* halo pulsé quand elle est enfin découverte, pour attirer l'œil */}
          {allPushed && (
            <circle r="70" fill="none" stroke="#7fe0ff" strokeWidth="2" opacity="0.6" style={{ animation: 'martineRing 1.6s ease-out infinite', pointerEvents: 'none' }} />
          )}
        </g>

        {/* Les objets qui la cachent (dessinés APRÈS pour être devant) */}
        {OBJECTS.map((o) => (
          <g key={o.id}>{o.render(pushed[o.id])}</g>
        ))}

        <style>{`
          @keyframes martinePulse { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.15); } }
          @keyframes martineRing { 0% { transform: scale(1); opacity: 0.9; } 100% { transform: scale(1.5); opacity: 0; } }
        `}</style>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   S5 — MARTINE PARLE + LE CHAT ATTAQUE
   États : greet → clic → catAttack → catClicked → bzz → clic → next
   ═══════════════════════════════════════════════════════════════ */
function SlideMartineTalks({ onNext }) {
  const [step, setStep] = useState('greet'); // greet → cat → catGone → bzz
  const clickMartine = () => {
    if (step === 'greet') { setStep('cat'); playMeow(); }
    else if (step === 'catGone') setStep('bzz');
    else if (step === 'bzz') onNext();
  };
  const clickCat = () => {
    if (step === 'cat') setStep('catGone');
  };

  const bubble = step === 'greet'
    ? ['« N\'aie pas peur.', 'Je suis MARTINE.', 'Machine À Remonter le Temps', 'Intelligente Néanmoins Excellente.', 'Ton "toi" du futur m\'a envoyée', 'pour te ramener dans 30 ans,', 'car un grand danger te menace. »']
    : step === 'cat' ? []
    : step === 'catGone' ? []
    : ['« B–bzzzz…… »'];

  const catDown = step === 'cat';

  return (
    <div style={{ animation: 'fadeIn 0.8s ease-out' }}>
      <svg viewBox="0 0 800 500" style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '62vh' }}>
        <defs>
          <radialGradient id="s5-halo" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#7fe0ff" stopOpacity="0.6" /><stop offset="100%" stopColor="#7fe0ff" stopOpacity="0" /></radialGradient>
        </defs>
        {/* ta chambre, moins sombre — la scène est éclairée par MARTINE */}
        <rect width="800" height="500" fill="#141020" />
        <rect y="380" width="800" height="120" fill="#0a0604" />
        {/* meubles esquissés (lit derrière) */}
        <rect x="50" y="240" width="500" height="140" fill="#2a1e28" opacity="0.65" />
        <rect x="580" y="260" width="80" height="120" fill="#5a3818" opacity="0.7" />

        {/* MARTINE — centre, tombée si cat attack */}
        <g transform={`translate(${step === 'cat' || step === 'catGone' || step === 'bzz' ? 340 : 400},${step === 'greet' ? 340 : 380}) ${step === 'cat' || step === 'catGone' || step === 'bzz' ? 'rotate(50)' : ''}`}>
          <circle r="60" fill="url(#s5-halo)" style={{ animation: step === 'bzz' ? 'martineGlitch 0.4s steps(2) infinite' : 'martinePulse 2s ease-in-out infinite' }} />
          <MartineNut scale={2.4}
            mood={step === 'greet' ? 'content' : step === 'catGone' ? 'vexe' : 'casse'}
            talking={step === 'greet'}
            onClick={clickMartine}
            cursor="pointer" />
          {step === 'bzz' && (
            <>
              <path d="M-70 -70 l-10 -6 M70 -60 l10 -4 M-80 20 l-12 -2 M80 20 l12 -2" stroke="#e8934a" strokeWidth="3" opacity="0.9" />
              <text x="0" y="-70" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="14" fill="#e8934a" fontWeight="800">Bzzz…</text>
            </>
          )}
        </g>

        {/* CHAT qui attaque (n'apparaît qu'à l'étape 'cat') */}
        {catDown && (
          <g transform="translate(500,320)" onClick={clickCat} style={{ cursor: 'pointer', animation: 'catBounce 0.6s ease-out infinite alternate' }}>
            {/* corps chat en pleine action */}
            <ellipse cx="0" cy="10" rx="46" ry="24" fill="#5a3a20" />
            <path d="M-30 6 q3 8 0 16 M-10 4 q3 8 0 16 M10 4 q3 8 0 16 M30 6 q3 8 0 16" stroke="#3a2818" strokeWidth="1.5" fill="none" opacity="0.6" />
            {/* tête */}
            <ellipse cx="-40" cy="0" rx="16" ry="14" fill="#5a3a20" />
            <path d="M-52 -10 L-46 -20 L-40 -12 Z" fill="#5a3a20" />
            <path d="M-38 -10 L-32 -20 L-28 -12 Z" fill="#5a3a20" />
            {/* yeux méchants */}
            <ellipse cx="-46" cy="-2" rx="2" ry="3" fill="#c8e070" /><circle cx="-46" cy="-1" r="1" fill="#0a0e04" />
            <ellipse cx="-36" cy="-2" rx="2" ry="3" fill="#c8e070" /><circle cx="-36" cy="-1" r="1" fill="#0a0e04" />
            {/* patte tendue vers MARTINE */}
            <ellipse cx="-40" cy="26" rx="8" ry="12" fill="#5a3a20" transform="rotate(-30 -40 26)" />
            <path d="M-58 20 l-6 -1 M-56 26 l-8 0 M-54 32 l-8 2" stroke="#e8dfc8" strokeWidth="1.4" strokeLinecap="round" />
            {/* queue */}
            <path d="M40 0 q30 -10 40 -30" stroke="#5a3a20" strokeWidth="14" strokeLinecap="round" fill="none" />
            {/* petit indicateur cliquable */}
            <circle cx="-40" cy="-30" r="18" fill="none" stroke="#ffd166" strokeWidth="2" strokeDasharray="3 3" style={{ animation: 'ringRotate 3s linear infinite' }} />
          </g>
        )}

        {/* GROS MEEEOWWW ! à côté du chat, style BD, animé qui grandit */}
        {catDown && (
          <g transform="translate(360,190)" style={{ animation: 'meowGrow 0.5s ease-out' }}>
            {/* étoile éclatée façon BD */}
            <path d="M0 -50 L14 -22 L48 -30 L28 -6 L60 8 L26 12 L38 44 L8 24 L-14 54 L-14 20 L-48 30 L-24 6 L-56 -12 L-22 -14 L-30 -46 L-2 -26 Z" fill="#ffd166" stroke="#c02020" strokeWidth="3" />
            <text x="0" y="8" textAnchor="middle" fontFamily="Impact, ui-monospace, sans-serif" fontSize="28" fontWeight="900" fill="#c02020" letterSpacing="1">MEEEOWWW!</text>
          </g>
        )}

        {/* Bulle de MARTINE (seulement affichée quand il y a du texte) */}
        {bubble.length > 0 && (
          <Bubble x={520} y={140} w={340} text={bubble} from="left" />
        )}

        <style>{`
          @keyframes martinePulse { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.1); } }
          @keyframes martineGlitch { 0%, 100% { opacity: 0.6; transform: scale(1) translate(0,0); } 50% { opacity: 1; transform: scale(1.1) translate(2px, -2px); } }
          @keyframes catBounce { from { transform: translate(500px, 320px) scale(1); } to { transform: translate(500px, 316px) scale(1.05); } }
          @keyframes ringRotate { from { transform: rotate(0); transform-origin: -40px -30px; } to { transform: rotate(360deg); transform-origin: -40px -30px; } }
          @keyframes meowGrow { from { transform: translate(360px, 190px) scale(0.2) rotate(-15deg); opacity: 0; } to { transform: translate(360px, 190px) scale(1) rotate(0); opacity: 1; } }
        `}</style>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   S6 — FLASH (auto-avance après 2s)
   ═══════════════════════════════════════════════════════════════ */
function SlideFlash({ onNext }) {
  useEffect(() => { const t = setTimeout(() => onNext(), 4200); return () => clearTimeout(t); }, [onNext]);
  return (
    <div style={{ animation: 'fadeIn 0.8s ease-out' }}>
      <svg viewBox="0 0 800 500" style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '62vh' }}>
        <defs>
          <radialGradient id="s6-flash" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#fff" stopOpacity="1" /><stop offset="30%" stopColor="#fff8c0" stopOpacity="0.85" /><stop offset="70%" stopColor="#f8b800" stopOpacity="0.35" /><stop offset="100%" stopColor="#e88030" stopOpacity="0" /></radialGradient>
        </defs>
        <rect width="800" height="500" fill="#0a0604" />
        {/* rayons plus lents (8s au lieu de 4s) */}
        <g style={{ transformOrigin: '400px 250px', animation: 'flashSpin 8s linear infinite' }}>
          {[...Array(24)].map((_, i) => {
            const a = (i * 15) * Math.PI / 180;
            const x2 = 400 + Math.cos(a) * 500;
            const y2 = 250 + Math.sin(a) * 500;
            return <path key={i} d={`M400 250 L${x2} ${y2}`} stroke="#ffd870" strokeWidth={i % 2 ? 0.8 : 1.6} opacity={i % 2 ? 0.25 : 0.5} />;
          })}
        </g>
        {/* halo pulsé plus lent (2.2s au lieu de 0.9s) */}
        <circle cx="400" cy="250" r="280" fill="url(#s6-flash)" style={{ animation: 'flashPulse 2.2s ease-in-out infinite' }} />
        {/* MARTINE au CENTRE, TRÈS transparente, avec une lente respiration */}
        <g transform="translate(400,250)" style={{ opacity: 0.35, animation: 'martineFlashBreathe 3s ease-in-out infinite' }}>
          <MartineNut scale={2.8} mood="casse" />
        </g>
        <style>{`
          @keyframes flashSpin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
          @keyframes flashPulse { 0%, 100% { opacity: 0.75; transform: scale(1); } 50% { opacity: 0.95; transform: scale(1.05); } }
          @keyframes martineFlashBreathe { 0%, 100% { opacity: 0.28; transform: translate(400px, 250px) scale(1); } 50% { opacity: 0.5; transform: translate(400px, 250px) scale(1.08); } }
        `}</style>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   S7 — PRÉHISTOIRE : clic sur MARTINE, elle explique tout, commence
   ═══════════════════════════════════════════════════════════════ */
function SlidePrehistoric({ onDone }) {
  const [step, setStep] = useState(0);
  /* Chaque dialogue a sa position + éventuellement sa couleur (« alert »
     pour l'explication du SOS, qui est LA règle importante à retenir). */
  const dialogs = [
    { lines: ['« Bzzz… ouille ma tête. »'],
      pos: { x: 480, y: 120 }, color: 'default' },
    { lines: ['« Bzzz… j\'ai été endommagée.', 'Ça a provoqué un incident temporel. »'],
      pos: { x: 460, y: 140 }, color: 'default' },
    { lines: ['« Ton "toi" du futur fait partie', 'de la Brigade Temporelle —', 'mais nous retrouver ici,', 'ça va être TRÈS compliqué. »'],
      pos: { x: 500, y: 130 }, color: 'default' },
    { lines: ['« Ils cherchent déjà notre trace.', 'Aide-moi : laisse un SOS quelque part.', 'Plus le support est SOLIDE,', 'plus ils m\'envoient du flux temporel.', 'Et plus on se rapproche de chez nous. »'],
      pos: { x: 470, y: 150 }, color: 'alert' },
    { lines: ['« Allez, on démarre.', 'Approche-toi du feu, ils sont là. »'],
      pos: { x: 490, y: 120 }, color: 'default' },
  ];
  const lastStep = step === dialogs.length - 1;
  const clickMartine = () => {
    if (!lastStep) setStep(step + 1);
    // Sur le dernier dialogue, MARTINE n'avance PLUS — c'est au joueur
    // de cliquer sur un personnage dans le décor pour rejoindre le clan.
  };

  return (
    <div style={{ animation: 'fadeIn 1s ease-out' }}>
      <svg viewBox="0 0 800 500" style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '62vh' }}>
        <defs>
          <linearGradient id="s7-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5a4020" /><stop offset="60%" stopColor="#e0a848" /><stop offset="100%" stopColor="#c86040" /></linearGradient>
          <linearGradient id="s7-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a4028" /><stop offset="100%" stopColor="#3a1808" /></linearGradient>
          <radialGradient id="s7-halo" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#7fe0ff" stopOpacity="0.55" /><stop offset="100%" stopColor="#7fe0ff" stopOpacity="0" /></radialGradient>
          <radialGradient id="s7-fire" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffd870" stopOpacity="0.9" /><stop offset="100%" stopColor="#ff5030" stopOpacity="0" /></radialGradient>
        </defs>
        <rect width="800" height="320" fill="url(#s7-sky)" />

        {/* SOLEIL qui se couche DERRIÈRE les montagnes (rendu avant → recouvert) */}
        <circle cx="580" cy="240" r="70" fill="#ffe870" opacity="0.75" />
        <circle cx="580" cy="240" r="55" fill="#fff4b0" opacity="0.9" />
        {/* rayons diffus dans le ciel */}
        <g opacity="0.35">
          {[[-140, -60], [-80, -110], [0, -130], [80, -110], [140, -60]].map(([dx, dy], i) => (
            <path key={i} d={`M580 240 L${580 + dx} ${240 + dy}`} stroke="#ffe870" strokeWidth="2" strokeLinecap="round" />
          ))}
        </g>

        {/* NUAGES fins et étirés (ambiance couchant) */}
        {[[120, 100], [340, 80], [660, 130], [500, 105]].map(([cx, cy], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx="70" ry="6" fill="#e0a848" opacity="0.35" />
        ))}
        {[[240, 130], [580, 155], [720, 165]].map(([cx, cy], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx="50" ry="4" fill="#c88060" opacity="0.4" />
        ))}

        {/* CHAÎNE DE MONTAGNES LOINTAINE (bleu-mauve, floue) */}
        <path d="M0 320 L0 260 L100 220 L180 240 L280 210 L360 230 L460 200 L560 220 L680 200 L800 230 L800 320 Z" fill="#5a4058" opacity="0.55" />

        {/* MONTAGNES PROCHES (bien couvrantes, cachent le soleil en partie) */}
        <path d="M0 320 L0 240 L100 170 L180 230 L280 150 L380 220 L470 140 L560 210 L640 170 L740 220 L800 200 L800 320 Z" fill="#3a2010" />
        {/* neige au sommet des pics les plus hauts */}
        <path d="M270 158 L280 150 L292 162 L282 168 Z" fill="#f0e4c8" opacity="0.7" />
        <path d="M462 148 L470 140 L480 152 L472 156 Z" fill="#f0e4c8" opacity="0.7" />

        {/* FORÊT — sapins silhouettés au pied des montagnes */}
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

        {/* Mammouth juste devant la forêt à gauche — la tête est tournée vers
            le crash (curieux), et ses défenses pointent vers MARTINE : petit
            détail qui donne vie à la scène. */}
        <g transform="translate(180,300)">
          <ellipse cx="0" cy="0" rx="46" ry="26" fill="#1a0e04" />
          {/* La tête tourne LENTEMENT (comme s'il examinait le vaisseau écrasé) */}
          <g style={{ animation: 'mammothLook 8s ease-in-out infinite', transformOrigin: '-40px 0px' }}>
            <ellipse cx="-40" cy="-2" rx="18" ry="14" fill="#1a0e04" />
            <path d="M-56 4 Q-70 20 -64 30 Q-56 32 -52 24" stroke="#1a0e04" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M-52 -4 Q-62 -8 -58 -14" stroke="#e8dfc8" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            {/* petit œil visible */}
            <circle cx="-46" cy="-4" r="1.5" fill="#f0d090" />
          </g>
          <rect x="-30" y="20" width="9" height="24" fill="#1a0e04" />
          <rect x="-10" y="22" width="9" height="22" fill="#1a0e04" />
          <rect x="10" y="22" width="9" height="22" fill="#1a0e04" />
          <rect x="26" y="20" width="9" height="24" fill="#1a0e04" />
        </g>

        <rect y="320" width="800" height="180" fill="url(#s7-ground)" />

        {/* Cailloux et brindilles au sol */}
        {[[80, 380], [340, 400], [500, 380], [680, 410]].map(([cx, cy], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx="10" ry="3" fill="#5a3020" opacity="0.7" />
        ))}

        {/* feu */}
        <g transform="translate(120,410)">
          <circle r="46" fill="url(#s7-fire)" style={{ animation: 'firePulse 1.4s ease-in-out infinite' }} />
          <path d="M-18 8 L18 4 M-14 12 L18 10" stroke="#3a1808" strokeWidth="4" strokeLinecap="round" />
          <path d="M-8 -2 Q-6 -14 0 -20 Q4 -12 2 -2 Z" fill="#ffd870" />
          <path d="M-4 0 Q-2 -8 2 -12 Q4 -6 2 0 Z" fill="#ff8030" />
        </g>

        {/* ═══ ZONE DU CRASH ═══
            Deux éléments : le CRATÈRE de MARTINE (avec traînée de terre
            retournée pointant vers MARTINE — sillon d'atterrissage) et le
            joueur GROGGY qui vient d'être éjecté. */}
        {/* Sillon d'atterrissage : la trace du glissement de MARTINE au sol */}
        <path d="M 380 480 Q 500 430 640 420" stroke="#2a1408" strokeWidth="42" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M 380 480 Q 500 430 640 420" stroke="#4a2818" strokeWidth="26" fill="none" strokeLinecap="round" opacity="0.55" />
        {/* Éclats projetés autour du sillon */}
        {[[420, 450], [480, 442], [540, 448], [600, 440], [660, 455], [520, 468], [590, 465]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="4" ry="1.5" fill="#1a0e04" opacity="0.7" />
        ))}
        {/* Cratère autour de MARTINE : elliptique, terre remuée */}
        <ellipse cx="640" cy="430" rx="72" ry="22" fill="#2a1408" opacity="0.85" />
        <ellipse cx="640" cy="428" rx="58" ry="14" fill="#4a2818" opacity="0.65" />

        {/* JOUEUR GROGGY — un·e ado moderne (jean, t-shirt bleu, baskets)
            projeté·e hors de MARTINE. Assis au sol, dos courbé, il/elle
            reprend ses esprits. Étoiles ✨ tournantes pendant qu'il est
            sonné (dialogues 0 et 1), disparaissent au 3e (il comprend). */}
        <g transform="translate(400,410)">
          {/* JAMBES en jean : plié·e·s l'une repliée, l'autre étendue */}
          {/* jambe étendue vers la gauche (au sol) */}
          <path d="M-8 50 Q-30 56 -52 52 L-56 62 L-4 62 Z" fill="#3a5580" stroke="#243554" strokeWidth="1" />
          {/* baskets */}
          <ellipse cx="-52" cy="60" rx="8" ry="4" fill="#f8f8f8" stroke="#2a2a2a" strokeWidth="0.8" />
          <path d="M-58 60 L-46 60" stroke="#2a2a2a" strokeWidth="0.6" />
          {/* jambe repliée devant */}
          <path d="M-4 30 Q-8 50 12 60 L18 44 Q22 34 12 24 Z" fill="#3a5580" stroke="#243554" strokeWidth="1" />
          <ellipse cx="16" cy="60" rx="9" ry="4" fill="#f8f8f8" stroke="#2a2a2a" strokeWidth="0.8" />

          {/* TORSE : t-shirt bleu-vif, un peu débraillé (encolure de travers) */}
          <path d="M-20 30 Q-22 12 -18 -4 L-14 -8 Q-14 -14 -4 -14 L14 -14 Q24 -14 24 -8 L22 -4 Q28 12 26 30 L18 34 L-14 34 Z" fill="#5eaadd" stroke="#2a5478" strokeWidth="1" />
          {/* Petit détail : encolure ronde */}
          <path d="M-8 -8 Q0 -4 8 -8" stroke="#2a5478" strokeWidth="1.2" fill="none" />
          {/* Manche courte visible sur bras droit tendu */}
          <path d="M22 -6 L28 8" stroke="#2a5478" strokeWidth="1" />

          {/* BRAS GAUCHE : posé au sol (appui) */}
          <path d="M-20 4 Q-38 20 -46 34" stroke="#e8b088" strokeWidth="8" fill="none" strokeLinecap="round" />
          {/* main gauche posée au sol */}
          <circle cx="-46" cy="34" r="5" fill="#e8b088" stroke="#a06844" strokeWidth="0.8" />

          {/* BRAS DROIT : tendu vers MARTINE (comme pour la relever) */}
          <path d="M22 0 Q42 14 60 8" stroke="#e8b088" strokeWidth="8" fill="none" strokeLinecap="round" />
          {/* main droite : doigts ouverts vers MARTINE */}
          <g transform="translate(60,8)">
            <circle r="5" fill="#e8b088" stroke="#a06844" strokeWidth="0.8" />
            <path d="M2 -3 L8 -6 M4 0 L10 0 M2 3 L8 6" stroke="#a06844" strokeWidth="0.7" strokeLinecap="round" />
          </g>

          {/* TÊTE penchée sur le côté (sonné). Peau, cheveux bruns qui
              retombent, oreille visible, expression un peu hébétée. */}
          <g transform="rotate(-14) translate(-3,-30)">
            {/* cou */}
            <path d="M-4 12 L4 12 L4 18 L-4 18 Z" fill="#d89c78" />
            {/* visage */}
            <ellipse cx="0" cy="0" rx="14" ry="16" fill="#e8b088" stroke="#8a5030" strokeWidth="0.8" />
            {/* cheveux mi-longs, ébouriffés par le crash */}
            <path d="M-14 -6 Q-16 -14 -8 -18 Q-4 -22 2 -20 Q10 -22 14 -14 Q16 -6 12 0 L14 -2 Q10 -12 4 -10 Q-2 -14 -8 -8 Q-12 -6 -14 -2 Z" fill="#5a3818" />
            {/* mèche qui retombe sur le front */}
            <path d="M-6 -10 Q-4 -4 -8 0" stroke="#3a2010" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* oreille */}
            <path d="M-13 -2 Q-15 0 -14 4 Q-12 5 -12 2" fill="#d89c78" stroke="#8a5030" strokeWidth="0.5" />
            {/* Yeux : au step 0-1 fermés à moitié (sonné) ; step 2+ ouverts */}
            {step < 2 ? (
              <>
                <path d="M-6 0 Q-4 -2 -2 0" stroke="#2a1808" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <path d="M2 0 Q4 -2 6 0" stroke="#2a1808" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              </>
            ) : (
              <>
                <ellipse cx="-4" cy="0" rx="1.6" ry="1.8" fill="#2a1808" />
                <ellipse cx="4" cy="0" rx="1.6" ry="1.8" fill="#2a1808" />
              </>
            )}
            {/* Bouche : rondelette de surprise puis un léger sourire */}
            {step < 2 ? (
              <ellipse cx="0" cy="7" rx="2" ry="1.5" fill="#5a2818" />
            ) : (
              <path d="M-3 7 Q0 9 3 7" stroke="#5a2818" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            )}
            {/* Petite rougeur sur la joue (choc) */}
            <ellipse cx="-8" cy="4" rx="2.5" ry="1.4" fill="#e88068" opacity="0.5" />
          </g>

          {/* ÉTOILES ✨ qui tournent autour de la tête pendant qu'il est sonné.
              Trois étoiles à 120° chacune, sur une orbite qui tourne.
              Disparaissent quand step >= 2 (il a repris ses esprits). */}
          {step < 2 && (
            <g style={{ animation: 'dizzyOrbit 2.4s linear infinite', transformOrigin: '-3px -30px' }}>
              {[0, 120, 240].map((angle, i) => {
                const rad = angle * Math.PI / 180;
                const x = -3 + Math.cos(rad) * 24;
                const y = -34 + Math.sin(rad) * 8;
                return (
                  <text key={i} x={x} y={y} fontSize="14" textAnchor="middle" fill="#ffd166"
                    style={{ animation: `dizzyStar 1.2s ease-in-out infinite ${i * 0.3}s` }}>✦</text>
                );
              })}
            </g>
          )}
        </g>

        {/* ═══ MARTINE CRASHÉE ═══
            À droite, penchée dans son cratère. Autour d'elle : de la fumée
            qui monte, des étincelles électriques (circuits abîmés). Elle
            se redresse progressivement — inclinée aux premiers dialogues,
            droite à partir du 3e (elle a « rebooté »). */}
        {/* FUMÉE : 3 volutes qui montent et se dissipent en boucle */}
        {[
          { x: 620, delay: '0s', dur: '3.6s', drift: 8 },
          { x: 640, delay: '1.2s', dur: '4s', drift: -6 },
          { x: 660, delay: '2.1s', dur: '3.2s', drift: 10 },
        ].map((s, i) => (
          <g key={i} style={{ animation: `smokeRise ${s.dur} ease-out infinite`, animationDelay: s.delay, transformOrigin: `${s.x}px 400px` }}>
            <circle cx={s.x} cy="400" r="8" fill="#8a8a8a" opacity="0.35" />
            <circle cx={s.x + s.drift/2} cy="380" r="10" fill="#a0a0a0" opacity="0.28" />
            <circle cx={s.x + s.drift} cy="360" r="12" fill="#c0c0c0" opacity="0.2" />
          </g>
        ))}
        {/* MARTINE — inclinée au début, droite quand elle a repris ses esprits */}
        <g transform={`translate(640,410) rotate(${step < 3 ? -15 : 0})`} style={{ transition: 'transform 0.8s ease-out' }}>
          <circle r="46" fill="url(#s7-halo)" style={{ animation: 'martinePulse 2s ease-in-out infinite' }} />
          {/* ÉTINCELLES électriques autour d'elle tant qu'elle n'est pas OK */}
          {step < 3 && (
            <g style={{ animation: 'sparkFlicker 0.4s steps(2) infinite' }}>
              <path d="M -32 -18 L -28 -10 L -34 -8 L -30 0" stroke="#ffe066" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <path d="M 30 -20 L 34 -14 L 28 -12 L 32 -6" stroke="#8ae0ff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <circle cx="-30" cy="-15" r="2" fill="#fff4a0" />
              <circle cx="32" cy="-18" r="2" fill="#a0e0ff" />
            </g>
          )}
          <MartineNut scale={1.1} mood={step >= 3 ? 'content' : 'casse'} talking={!lastStep} date="−18 000"
            onClick={lastStep ? undefined : clickMartine}
            cursor={lastStep ? 'default' : 'pointer'} />
        </g>

        {/* Bulle : position légèrement variable par dialogue + couleur */}
        <Bubble x={dialogs[step].pos.x} y={dialogs[step].pos.y} w={340}
          text={dialogs[step].lines}
          color={dialogs[step].color}
          from="right" />

        {/* AU DERNIER DIALOGUE : deux silhouettes de personnages autour du feu,
            cliquables → l'aventure commence pour de vrai (chapitre 1) */}
        {lastStep && (
          <g>
            {/* Un premier prehistorique assis près du feu — clan */}
            <g transform="translate(200,400)" onClick={onDone} style={{ cursor: 'pointer' }}>
              {/* halo doré pulsé pour attirer le clic */}
              <circle cx="0" cy="-10" r="52" fill="none" stroke="#5eff9e" strokeWidth="2" strokeDasharray="4 4" opacity="0.85" style={{ animation: 'personneCall 1.6s ease-in-out infinite' }} />
              {/* corps assis */}
              <path d="M-18 20 L-18 -10 Q-18 -20 -10 -20 L10 -20 Q18 -20 18 -10 L18 20 Z" fill="#5a3818" />
              <ellipse cx="0" cy="-28" rx="12" ry="14" fill="#e0a878" />
              {/* cheveux */}
              <path d="M-12 -32 q0 -8 6 -10 q6 2 8 -4 q4 6 8 4 q6 4 8 10 z" fill="#3a1808" />
              {/* yeux */}
              <circle cx="-4" cy="-28" r="1.4" fill="#0a0806" />
              <circle cx="4" cy="-28" r="1.4" fill="#0a0806" />
              {/* signal « clic ici » */}
              <text x="0" y="-58" textAnchor="middle" fontFamily="Palatino, Georgia, serif" fontSize="12" fontWeight="700" fill="#5eff9e" style={{ animation: 'personneCall 1.6s ease-in-out infinite' }}>◉ Rejoins-les</text>
            </g>

            {/* Un second personnage debout un peu plus loin */}
            <g transform="translate(560,380)" onClick={onDone} style={{ cursor: 'pointer' }}>
              <circle cx="0" cy="-20" r="42" fill="none" stroke="#5eff9e" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" style={{ animation: 'personneCall 1.8s ease-in-out infinite' }} />
              <path d="M-14 40 L-14 -14 Q-14 -22 -8 -22 L8 -22 Q14 -22 14 -14 L14 40 Z" fill="#4a3020" />
              <ellipse cx="0" cy="-30" rx="10" ry="12" fill="#d0a068" />
              <path d="M-10 -34 q0 -6 4 -8 q4 2 6 -2 q3 4 6 2 q4 3 6 8 z" fill="#2a1808" />
              <circle cx="-3" cy="-30" r="1.2" fill="#0a0806" />
              <circle cx="3" cy="-30" r="1.2" fill="#0a0806" />
              {/* bras qui tient un bâton */}
              <path d="M14 -4 L28 -22" stroke="#3a1808" strokeWidth="3" strokeLinecap="round" />
            </g>
          </g>
        )}

        <style>{`
          @keyframes firePulse { 0%, 100% { opacity: 0.85; transform: scale(1); } 50% { opacity: 1; transform: scale(1.06); } }
          @keyframes martinePulse { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.15); } }
          @keyframes personneCall { 0%, 100% { opacity: 0.75; transform: scale(1); } 50% { opacity: 1; transform: scale(1.08); } }
          @keyframes smokeRise {
            0% { transform: translateY(0) scale(0.6); opacity: 0; }
            15% { opacity: 0.7; }
            100% { transform: translateY(-90px) scale(1.4); opacity: 0; }
          }
          @keyframes sparkFlicker {
            0% { opacity: 1; }
            50% { opacity: 0.15; }
            100% { opacity: 1; }
          }
          @keyframes dizzyOrbit {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes dizzyStar {
            0%, 100% { opacity: 0.9; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(1.25); }
          }
          @keyframes mammothLook {
            0%, 60%, 100% { transform: rotate(0deg); }
            70%, 85% { transform: rotate(-18deg); }
          }
        `}</style>
      </svg>
    </div>
  );
}
