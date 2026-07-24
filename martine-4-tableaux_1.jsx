import { useState, useEffect } from "react";

/* ============================================================
   MARTINE — Chapitre 1 : Préhistoire (v3)
   Point-and-click : 4 tableaux traversables
   Objets dessinés dans le décor, cliquables sans halo
   Crafting en chaîne : 2 éléments → outils → messages
   ============================================================ */

/* ---------------- Données ---------------- */

const ITEMS = {
  branche:  { name: "Branche souple", emoji: "🌿", desc: "Du noisetier, souple et solide. De quoi fabriquer bien des choses." },
  liane:    { name: "Liane", emoji: "🪢", desc: "Fibre végétale, résistante et élastique. Ça s'étire… et ça revient." },
  silex:    { name: "Silex taillé", emoji: "🔪", desc: "Un éclat fraîchement taillé, tranchant comme un rasoir." },
  ocre:     { name: "Ocre rouge", emoji: "🟠", desc: "Pigment minéral. Broyé, mélangé à de la graisse : de la peinture." },
  paroi:    { name: "Paroi de la grotte", emoji: "🪨", desc: "Immense, lisse, à l'abri du vent et de la pluie. Un écran naturel." },
  feu:      { name: "Feu de camp", emoji: "🔥", desc: "Chaleur, lumière… et le lieu où le clan se rassemble le soir." },
  voix:     { name: "Ta voix", emoji: "🗣️", desc: "Le tout premier média. Livré d'origine avec chaque être humain." },
  tronc:    { name: "Tronc creux", emoji: "🪵", desc: "Un tronc échoué, évidé par l'eau. Ça résonne quand on tape dessus." },
  cerf:     { name: "Cerf (repéré)", emoji: "🦌", desc: "Il boit à la rivière. Peau, os, tendons : tout est précieux… mais il faudra le chasser." },
  arc:      { name: "Arc", emoji: "🏹", desc: "Branche courbée + liane tendue. Il ne manque qu'un projectile." },
  fleche:   { name: "Flèche", emoji: "➶", desc: "Branche droite, pointe de silex. Elle vole droit." },
  arcarme:  { name: "Arc armé", emoji: "🎯", desc: "Arc + flèche. Prêt pour la chasse." },
  peau:     { name: "Peau de cerf", emoji: "🟤", desc: "Grattée au silex, séchée. Une surface souple… on pourrait y peindre." },
  os:       { name: "Os creux", emoji: "🦴", desc: "Léger, creux. Percé de trous, il pourrait chanter." },
  charbon:  { name: "Charbon de bois", emoji: "⚫", desc: "Bois passé au feu. Ça noircit les doigts — et tout ce qu'on touche." },
};

const SCENES = [
  { id: "interieur", name: "Au fond de la grotte" },
  { id: "exterieur", name: "Devant la grotte" },
  { id: "campement", name: "Le campement" },
  { id: "riviere",   name: "La rivière" },
];

/* pour les indices : où trouver chaque élément de base */
const WHERE = {
  liane: "devant la grotte", ocre: "devant la grotte",
  paroi: "au fond de la grotte", silex: "au fond de la grotte",
  feu: "au campement", voix: "au campement", branche: "au campement",
  cerf: "à la rivière", tronc: "à la rivière",
};

const RECIPES = [
  { a: "branche", b: "liane",  out: "arc",
    line: "Une branche qui plie, une liane qui tire : un ARC. Les humains viennent d'inventer le stockage d'énergie." },
  { a: "branche", b: "silex",  out: "fleche",
    line: "Branche droite + pointe de silex = FLÈCHE. Aérodynamique validée par mes capteurs." },
  { a: "arc",     b: "fleche", out: "arcarme",
    line: "Arc armé. Rappel de sécurité : ne vise que le gibier, pas la machine temporelle." },
  { a: "arcarme", b: "cerf",   out: "chasse", special: "hunt",
    line: "Chasse réussie, d'une seule flèche. Respect au cerf : rien ne sera gaspillé. Tu récupères une PEAU et un OS CREUX. Retiens : avant de communiquer, les humains ont d'abord dû survivre — et la chasse a fourni les premiers supports." },
  { a: "branche", b: "feu",    out: "charbon",
    line: "Du bois, du feu, et voilà du CHARBON. Le premier crayon de l'humanité sort du foyer." },
  { a: "os",      b: "silex",  out: "msg_flute", msg: true },
  { a: "charbon", b: "paroi",  out: "msg_peinture", msg: true },
  { a: "ocre",    b: "paroi",  out: "msg_mains", msg: true },
  { a: "peau",    b: "charbon", out: "msg_peau", msg: true },
  { a: "peau",    b: "ocre",   out: "msg_peau", msg: true },
  { a: "peau",    b: "tronc",  out: "msg_tambour", msg: true },
  { a: "voix",    b: "feu",    out: "msg_veillee", msg: true },
];

const MESSAGES = {
  msg_peinture: { title: "Peinture rupestre", emoji: "🐂",
    fact: "Au charbon et aux pigments, les humains couvrent les parois de chevaux, bisons, aurochs — comme à Lascaux, vers −18 000. Ces images nous « parlent » encore 20 000 ans plus tard : c'est le plus ancien média conservé. Un message sans mots, mais pas sans sens — et sans son auteur pour l'expliquer : à nous d'interpréter, prudemment." },
  msg_mains: { title: "Mains négatives", emoji: "🖐️",
    fact: "Main plaquée sur la roche, ocre soufflé autour : une main « en négatif ». La grotte de Gargas, dans les Hautes-Pyrénées, en compte plus de 200, vieilles de 27 000 ans ! Le message le plus simple du monde : « J'existe, j'étais là. » L'ancêtre lointain de la signature… et du selfie." },
  msg_flute: { title: "Flûte en os", emoji: "🪈",
    fact: "Un os creux, quelques trous percés au silex : une flûte. Les plus anciennes connues ont 35 000 ans (grotte de Hohle Fels) — et la grotte d'Isturitz, au Pays basque, en a livré plus de vingt ! La musique transmet des émotions sans aucun mot : un langage qui n'a pas besoin de traduction." },
  msg_tambour: { title: "Tambour", emoji: "🥁",
    fact: "Une peau tendue sur un tronc creux : le son porte loin, bien plus loin que la voix. Frapper des rythmes codés, c'est envoyer un message à distance — bien plus tard, les « tambours parleurs » d'Afrique transmettront des nouvelles de village en village, à des kilomètres. Le son fut le premier réseau longue distance." },
  msg_peau: { title: "Peau ornée", emoji: "🟤",
    fact: "Des signes peints sur une peau : un récit qu'on peut rouler, transporter, offrir. Mais attention : contrairement à la pierre, la peau pourrit — presque rien de tel ne nous est parvenu. Grande leçon des médias : un message ne survit que si son SUPPORT survit. (La vraie écriture, elle, naîtra vers −3300 en Mésopotamie.)" },
  msg_veillee: { title: "Veillée du récit", emoji: "🌙",
    fact: "Le soir, autour du feu, les anciens racontent : mythes, techniques de chasse, histoire du clan. Pendant des dizaines de milliers d'années, TOUT le savoir passe par la parole. Sa limite : à chaque transmission, le récit se déforme un peu — comme au téléphone arabe. Sans trace écrite, impossible de vérifier la version « originale »." },
};

const HINTS = [
  { needs: ["branche", "liane"], out: "arc", text: "Quelque chose qui plie… avec quelque chose qui s'étire. Ça pourrait propulser." },
  { needs: ["branche", "silex"], out: "fleche", text: "Une branche bien droite avec une pointe qui coupe : ça pourrait voler." },
  { needs: ["arc", "fleche"], out: "arcarme", text: "Tu as l'arme et le projectile. Réunis-les." },
  { needs: ["arcarme", "cerf"], out: "chasse", text: "Ton arc est prêt. Le cerf boit à la rivière… Peau et os t'attendent." },
  { needs: ["branche", "feu"], out: "charbon", text: "Que devient le bois quand il passe dans le feu ? Un outil pour dessiner, peut-être." },
  { needs: ["os", "silex"], out: "msg_flute", text: "Un os creux… perce-le avec quelque chose de pointu, et il chantera." },
  { needs: ["charbon", "paroi"], out: "msg_peinture", text: "Tu as de quoi tracer du noir. Et au fond de la grotte, un immense écran de pierre…" },
  { needs: ["ocre", "paroi"], out: "msg_mains", text: "Du pigment rouge, une paroi… et ta main comme pochoir ?" },
  { needs: ["peau", "charbon"], out: "msg_peau", text: "La peau du cerf est une surface souple. De quoi y tracer un récit ?" },
  { needs: ["peau", "tronc"], out: "msg_tambour", text: "Une peau bien tendue sur quelque chose qui résonne…" },
  { needs: ["voix", "feu"], out: "msg_veillee", text: "Le soir, le clan se rassemble quelque part. Ta voix y trouverait un public." },
];

const NEAR_MISS = [
  { pair: ["arc", "cerf"], line: "Un arc sans flèche ? Le cerf te remercie pour la petite brise." },
  { pair: ["fleche", "cerf"], line: "Lancer une flèche à la main… ambitieux. Il te faudrait un engin pour la propulser. Un arc, par exemple." },
  { pair: ["silex", "cerf"], line: "Approcher un cerf avec un silex ? Il court à 60 km/h. Toi non. Trouve une arme à distance." },
  { pair: ["voix", "paroi"], line: "OHÉ !… ohé… ohé… Joli écho. Mais l'écho ne transmet rien au futur : il radote." },
  { pair: ["voix", "cerf"], line: "Tu as parlé au cerf. Il t'a écouté poliment, puis il a continué à boire. Le dialogue inter-espèces attendra." },
  { pair: ["ocre", "feu"], line: "Chauffer l'ocre le fonce — joli, mais ce n'est pas encore un message." },
];

const FAIL_LINES = [
  "Bzzt. Ces deux-là n'ont rien à se dire. Essaie autre chose.",
  "Combinaison rejetée. Même mes circuits de secours sont perplexes.",
  "Hmm. Créatif, mais l'Histoire n'a pas retenu cette invention — il y a une raison.",
  "Erreur 404 : invention non trouvée.",
  "Mes capteurs détectent 0 % d'idée et 100 % de bricolage. On réessaie ?",
];

const INTRO = [
  "⚠ IMPACT. Atterrissage… disons « rustique ». Mes circuits de retour sont grillés et mon GPS affiche : −18 000 avant votre ère.",
  "Je suis MARTINE — Machine À Remonter le Temps Intelligente Néanmoins Excellente. L'excellence reviendra dès que tu m'auras rechargée.",
  "Il me faut des MESSAGES laissés pour le futur : peintures, musiques, récits… Déplace-toi entre les lieux avec les flèches ‹ ›, observe bien chaque décor et touche ce qui te semble utile.",
  "Un conseil : ici, avant de communiquer, il faut survivre. On m'a signalé un cerf du côté de la rivière… mais il te faudra fabriquer de quoi chasser.",
];

const REQUIRED = 3;
const ALL_MSGS = Object.keys(MESSAGES);

/* ---------------- Machine à écrire ---------------- */
function useTypewriter(text, speed = 15) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setShown(""); setDone(false);
    if (!text) { setDone(true); return; }
    let i = 0;
    const iv = setInterval(() => {
      i += 2;
      setShown(text.slice(0, i));
      if (i >= text.length) { clearInterval(iv); setDone(true); }
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed]);
  return [shown, done, () => { setShown(text); setDone(true); }];
}

function Martine({ lines, idx, onNext }) {
  const text = lines[idx] || "";
  const [shown, done, skip] = useTypewriter(text);
  const hasNext = idx < lines.length - 1;
  return (
    <div onClick={() => (done ? hasNext && onNext() : skip())}
      style={{ background: "#0c1410", border: "2px solid #24382c", borderRadius: 14, boxShadow: "inset 0 0 40px rgba(80,255,160,0.05)", padding: "10px 14px", cursor: "pointer", minHeight: 88, position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#5eff9e", boxShadow: "0 0 8px #5eff9e", animation: "pulse 2s infinite" }} />
        <span style={{ fontFamily: "ui-monospace,monospace", fontSize: 10, letterSpacing: 2, color: "#5eff9e", opacity: 0.7 }}>M.A.R.T.I.N.E.</span>
      </div>
      <p style={{ fontFamily: "ui-monospace,monospace", fontSize: 13.5, lineHeight: 1.55, color: "#c8ffdd", margin: 0, textShadow: "0 0 6px rgba(94,255,158,0.3)" }}>
        {shown}<span style={{ opacity: done ? 0 : 1 }}>▮</span>
      </p>
      {done && hasNext && (
        <span style={{ position: "absolute", bottom: 6, right: 12, fontFamily: "ui-monospace,monospace", fontSize: 10, color: "#5eff9e", animation: "pulse 1.2s infinite" }}>▶ suite</span>
      )}
    </div>
  );
}

/* ---------------- Zone cliquable invisible ---------------- */
function Hot({ cx, cy, r = 46, onClick, reveal, label }) {
  return (
    <g onClick={onClick} style={{ cursor: "pointer" }}>
      <circle cx={cx} cy={cy} r={r} fill="transparent" />
      {reveal && (
        <>
          <circle cx={cx} cy={cy} r={r * 0.8} fill="none" stroke="#ffe28a" strokeWidth="3" strokeDasharray="6 5" opacity="0.9" />
          {label && <text x={cx} y={cy - r * 0.8 - 8} textAnchor="middle" fontSize="17" fill="#ffe28a" fontFamily="ui-monospace,monospace" style={{ paintOrder: "stroke", stroke: "#000", strokeWidth: 3 }}>{label}</text>}
        </>
      )}
    </g>
  );
}

/* ============================================================
   LES QUATRE TABLEAUX
   viewBox commun : 1000 × 560
   ============================================================ */

const SkyDefs = () => (
  <defs>
    <linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#171236" />
      <stop offset="30%" stopColor="#43265c" />
      <stop offset="58%" stopColor="#9c4436" />
      <stop offset="80%" stopColor="#d97b35" />
      <stop offset="100%" stopColor="#f0b054" />
    </linearGradient>
    <radialGradient id="sunhaze" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#ffe9ae" />
      <stop offset="40%" stopColor="#ffcf78" stopOpacity="0.7" />
      <stop offset="100%" stopColor="#ffcf78" stopOpacity="0" />
    </radialGradient>
    <linearGradient id="mFar" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4e2f63" /><stop offset="100%" stopColor="#3a2350" /></linearGradient>
    <linearGradient id="mMid" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5d3358" /><stop offset="100%" stopColor="#452648" /></linearGradient>
    <linearGradient id="mNear" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4a2a3e" /><stop offset="100%" stopColor="#331d30" /></linearGradient>
    <linearGradient id="soil" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a6a42" /><stop offset="25%" stopColor="#6e5232" /><stop offset="100%" stopColor="#3f2d1c" /></linearGradient>
    <linearGradient id="rock" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7d5c44" /><stop offset="45%" stopColor="#5c4030" /><stop offset="100%" stopColor="#3a2820" /></linearGradient>
    <radialGradient id="caveMouth" cx="50%" cy="30%" r="80%"><stop offset="0%" stopColor="#050302" /><stop offset="70%" stopColor="#120a06" /><stop offset="100%" stopColor="#241510" /></radialGradient>
    <radialGradient id="fireLight" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffb85e" stopOpacity="0.55" /><stop offset="55%" stopColor="#ff9540" stopOpacity="0.22" /><stop offset="100%" stopColor="#ff9540" stopOpacity="0" /></radialGradient>
    <linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e8a05a" /><stop offset="30%" stopColor="#a35a4e" /><stop offset="70%" stopColor="#5c3a62" /><stop offset="100%" stopColor="#33224a" /></linearGradient>
    <linearGradient id="trunk" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#4a3322" /><stop offset="50%" stopColor="#6b4a30" /><stop offset="100%" stopColor="#33231a" /></linearGradient>
    <radialGradient id="canopy" cx="40%" cy="35%" r="70%"><stop offset="0%" stopColor="#3f5232" /><stop offset="70%" stopColor="#26351f" /><stop offset="100%" stopColor="#1a2617" /></radialGradient>
    <linearGradient id="caveWallIn" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#241610" /><stop offset="45%" stopColor="#4a3020" /><stop offset="75%" stopColor="#6e4c30" /><stop offset="100%" stopColor="#8a6240" /></linearGradient>
    <radialGradient id="dayHole" cx="50%" cy="50%" r="60%"><stop offset="0%" stopColor="#ffd98c" /><stop offset="60%" stopColor="#e8935a" /><stop offset="100%" stopColor="#a35440" /></radialGradient>
  </defs>
);

/* petits composants de décor réutilisés */
const Pine = ({ x, y, s = 1, dark = "#1d2f22" }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M-3 0 L3 0 L2 -18 L-2 -18 Z" fill="#2e1f14" />
    <path d="M0 -92 L20 -60 L10 -62 L28 -34 L14 -36 L34 -8 L-34 -8 L-14 -36 L-28 -34 L-10 -62 L-20 -60 Z" fill={dark} />
    <path d="M0 -92 L20 -60 L10 -62 L28 -34 L14 -36 L20 -26 L-2 -30 Z" fill="#28402d" opacity="0.6" />
  </g>
);

const GrassTuft = ({ x, y, c = "#5d6b2e" }) => (
  <path d={`M${x} ${y} q-5 -18 -11 -22 M${x} ${y} q0 -20 6 -26 M${x} ${y} q5 -16 12 -19 M${x} ${y} q-2 -14 2 -24`} stroke={c} strokeWidth="2.2" fill="none" opacity="0.85" />
);

const Birds = () => (
  <g stroke="#241530" strokeWidth="2.4" fill="none" opacity="0.85">
    <path d="M560 118 q9 -9 18 0 q9 -9 18 0" />
    <path d="M615 145 q7 -7 14 0 q7 -7 14 0" />
    <path d="M520 160 q6 -6 12 0 q6 -6 12 0" />
  </g>
);

/* ---------- T0 : intérieur de la grotte ---------- */
function SceneInterieur({ collect, inv, reveal }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <SkyDefs />
      <rect width="1000" height="560" fill="#100906" />
      {/* voûte et parois */}
      <path d="M0 0 L1000 0 L1000 560 L0 560 Z" fill="#1a0f09" />
      <path d="M0 0 Q180 90 90 240 Q30 340 120 560 L0 560 Z" fill="#241610" />
      <path d="M1000 0 Q840 60 900 200 Q960 330 860 560 L1000 560 Z" fill="#221410" />
      {/* lumière du jour par l'entrée (gauche) */}
      <path d="M0 120 Q120 200 90 560 L0 560 Z" fill="url(#dayHole)" opacity="0.95" />
      <path d="M0 120 Q120 200 90 560 L260 560 Q200 320 60 140 Z" fill="#f0b054" opacity="0.12" />
      {/* silhouette d'arbres dehors */}
      <path d="M8 300 l6 -40 l6 40 M30 340 l8 -52 l8 52" stroke="#3a2030" strokeWidth="5" opacity="0.7" fill="none" />
      {/* stalactites */}
      {[[300, 0, 70], [370, 0, 44], [520, 0, 90], [610, 0, 52], [760, 0, 76], [690, 0, 36], [450, 0, 60]].map(([x, y, h], i) => (
        <path key={i} d={`M${x - 16} ${y} Q${x} ${y + h * 0.5} ${x} ${y + h} Q${x} ${y + h * 0.5} ${x + 16} ${y} Z`} fill={i % 2 ? "#3a2618" : "#2e1d12"} />
      ))}
      {/* stalagmites */}
      {[[330, 560, 60], [720, 560, 82], [800, 560, 46]].map(([x, y, h], i) => (
        <path key={i} d={`M${x - 20} ${y} Q${x} ${y - h * 0.5} ${x} ${y - h} Q${x} ${y - h * 0.5} ${x + 20} ${y} Z`} fill="#33210f" />
      ))}
      {/* LA GRANDE PAROI lisse (fond droit) */}
      <path d="M380 60 Q700 30 940 90 L920 470 Q640 500 400 460 Z" fill="url(#caveWallIn)" />
      <path d="M420 120 q160 -18 380 6 M410 220 q200 -14 430 10 M415 330 q180 -10 400 12" stroke="#33210f" strokeWidth="3" fill="none" opacity="0.35" />
      {/* fissures */}
      <path d="M600 90 q-8 60 6 110 q10 40 -4 80" stroke="#241408" strokeWidth="2.5" fill="none" opacity="0.6" />
      <path d="M780 130 q10 50 -2 95" stroke="#241408" strokeWidth="2" fill="none" opacity="0.5" />
      {/* lueur chaude sur la paroi (venant de l'entrée) */}
      <ellipse cx="560" cy="280" rx="260" ry="190" fill="#f0b054" opacity="0.10" />
      {/* sol */}
      <path d="M0 560 L1000 560 L1000 470 Q700 510 400 465 Q200 440 90 460 L0 480 Z" fill="#2a1a10" />
      <ellipse cx="500" cy="530" rx="420" ry="26" fill="#1c1008" opacity="0.8" />
      {/* flaque */}
      <ellipse cx="700" cy="520" rx="70" ry="12" fill="#3a2a3e" />
      <ellipse cx="700" cy="518" rx="52" ry="7" fill="#5c4058" opacity="0.7" />
      {/* atelier de taille : éclats de silex */}
      <g transform="translate(300,505)">
        <ellipse cx="0" cy="10" rx="70" ry="12" fill="#20130a" />
        {[[-30, 2, 14], [-8, -3, 18], [14, 4, 12], [34, -1, 15], [2, 8, 10]].map(([x, y, w], i) => (
          <path key={i} d={`M${x} ${y} l${w} -6 l${w * 0.5} 8 l-${w * 0.9} 5 Z`} fill={i % 2 ? "#8d8d97" : "#6f6f7a"} stroke="#c9c9d4" strokeWidth="0.8" />
        ))}
        {/* le bel éclat */}
        <path d="M-2 -8 L22 -18 L34 -6 L12 2 Z" fill="#9aa0ad" stroke="#dfe3ec" strokeWidth="1.2" />
      </g>
      {/* percuteur en pierre */}
      <ellipse cx="380" cy="512" rx="16" ry="11" fill="#4a4a52" />
      {/* chauve-souris */}
      <path d="M840 70 q8 -10 14 0 q6 -10 14 0 l-14 8 Z" fill="#0d0805" />
      {/* poussière en suspension */}
      {[[180, 260], [230, 340], [150, 420], [260, 300]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.6" fill="#ffd98c" opacity="0.6" style={{ animation: `drift ${5 + i}s ease-in-out infinite` }} />
      ))}

      {/* zones cliquables */}
      <Hot cx={640} cy={270} r={150} label="paroi" reveal={reveal} onClick={() => collect("paroi")} />
      <Hot cx={310} cy={498} r={55} label="silex" reveal={reveal} onClick={() => collect("silex")} />
    </svg>
  );
}

/* ---------- T1 : devant la grotte ---------- */
function SceneExterieur({ collect, inv, reveal, onMartine }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <SkyDefs />
      <rect width="1000" height="560" fill="url(#dusk)" />
      <circle cx="705" cy="200" r="150" fill="url(#sunhaze)" />
      <circle cx="705" cy="200" r="44" fill="#ffedb0" />
      <circle cx="705" cy="200" r="44" fill="none" stroke="#fff6d8" strokeWidth="2" opacity="0.7" />
      {/* étoiles */}
      {[[70, 36], [150, 66], [300, 30], [480, 52], [880, 40], [950, 84], [400, 84], [560, 24]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.7" fill="#fff" opacity="0.85" style={{ animation: `twinkle ${2 + (i % 3)}s infinite` }} />
      ))}
      <Birds />
      {/* bancs de nuages */}
      <ellipse cx="270" cy="130" rx="110" ry="10" fill="#e77b4a" opacity="0.35" />
      <ellipse cx="560" cy="180" rx="150" ry="9" fill="#f0b054" opacity="0.3" />
      <ellipse cx="840" cy="120" rx="90" ry="8" fill="#c95f4a" opacity="0.3" />
      {/* montagnes en 3 plans + brume */}
      <path d="M0 296 L110 216 L215 288 L350 196 L480 300 L620 232 L760 306 L880 240 L1000 296 L1000 400 L0 400 Z" fill="url(#mFar)" />
      <rect y="288" width="1000" height="26" fill="#d97b35" opacity="0.12" />
      <path d="M0 336 L140 262 L290 342 L455 272 L640 348 L810 284 L1000 340 L1000 420 L0 420 Z" fill="url(#mMid)" />
      <rect y="330" width="1000" height="22" fill="#d97b35" opacity="0.10" />
      <path d="M0 376 L180 316 L370 384 L560 330 L780 392 L1000 350 L1000 430 L0 430 Z" fill="url(#mNear)" />
      {/* troupeau lointain sur la crête */}
      <g fill="#241530">
        <g transform="translate(795,258) scale(0.8)">
          <ellipse cx="0" cy="0" rx="26" ry="16" /><circle cx="-23" cy="-8" r="9" />
          <path d="M-31 -6 q-11 8 -5 19 q-2 -8 4 -12" />
          <rect x="-14" y="10" width="5" height="14" rx="2" /><rect x="4" y="10" width="5" height="14" rx="2" />
          <path d="M-29 -14 q-8 -11 3 -15 q-7 6 -1 13" />
        </g>
        <g transform="translate(862,268) scale(0.5)">
          <ellipse cx="0" cy="0" rx="26" ry="16" /><circle cx="-23" cy="-8" r="9" />
          <rect x="-14" y="10" width="5" height="14" rx="2" /><rect x="4" y="10" width="5" height="14" rx="2" />
        </g>
      </g>
      {/* sol */}
      <rect y="400" width="1000" height="160" fill="url(#soil)" />
      <path d="M0 404 Q260 392 520 404 T1000 400 L1000 424 Q700 434 380 422 T0 428 Z" fill="#96733e" opacity="0.5" />
      {/* sentier */}
      <path d="M240 560 Q300 490 420 462 Q560 430 705 424 L740 430 Q580 444 470 474 Q360 504 330 560 Z" fill="#a3814c" opacity="0.55" />
      {/* falaise avec strates */}
      <path d="M0 430 L0 96 Q52 66 104 108 Q166 76 208 130 Q276 118 308 190 Q346 268 306 336 Q338 392 292 430 Z" fill="url(#rock)" />
      {[[30, 150, 240], [50, 220, 250], [40, 292, 246], [60, 356, 220]].map(([x, y, w], i) => (
        <path key={i} d={`M${x} ${y} q${w * 0.5} ${i % 2 ? -10 : 10} ${w} 0`} stroke="#33210f" strokeWidth="4" fill="none" opacity="0.45" />
      ))}
      <path d="M120 110 q14 60 -4 120 M210 150 q16 70 2 130" stroke="#2e1d12" strokeWidth="2.5" fill="none" opacity="0.5" />
      {/* lumière rasante sur la falaise */}
      <path d="M240 120 Q300 180 292 300 L308 190 Q276 118 240 120 Z" fill="#f0b054" opacity="0.25" />
      {/* bouche de grotte */}
      <path d="M92 430 Q86 316 168 300 Q252 314 246 430 Z" fill="url(#caveMouth)" />
      <path d="M92 430 Q86 316 168 300 Q252 314 246 430" fill="none" stroke="#1c0f0a" strokeWidth="7" />
      <path d="M110 428 Q108 340 168 326" stroke="#f0b054" strokeWidth="3" fill="none" opacity="0.25" />
      {/* éboulis */}
      {[[86, 444, 18], [130, 452, 12], [252, 446, 16], [286, 452, 10]].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.55} fill="#5c4030" />
      ))}
      {/* tache d'ocre au pied */}
      <g>
        <ellipse cx="118" cy="486" rx="34" ry="11" fill="#a8431f" />
        <ellipse cx="106" cy="482" rx="14" ry="5" fill="#c95a28" />
        <ellipse cx="132" cy="488" rx="9" ry="4" fill="#8a3418" />
        <path d="M96 480 q10 -6 22 -3" stroke="#d96a35" strokeWidth="2" fill="none" />
      </g>
      {/* lianes pendantes du rebord */}
      <g>
        <path d="M296 300 q8 34 -5 62 q-9 24 3 46" stroke="#3c5528" strokeWidth="5" fill="none" />
        <path d="M306 306 q3 30 -7 54 q-6 20 1 38" stroke="#527232" strokeWidth="3.5" fill="none" />
        <path d="M288 296 q10 28 0 56" stroke="#324a22" strokeWidth="3" fill="none" />
        {[[300, 340], [292, 372], [302, 402]].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} q8 -2 10 -9 q-9 1 -10 9`} fill="#527232" />
        ))}
      </g>
      {/* buissons + herbes */}
      <ellipse cx="380" cy="452" rx="42" ry="18" fill="#3a4a24" />
      <ellipse cx="360" cy="444" rx="24" ry="12" fill="#4a5c2c" />
      {[430, 540, 660, 950].map((x, i) => <GrassTuft key={i} x={x} y={470 + (i % 2) * 40} />)}
      <GrassTuft x={200} y={540} c="#6b5a2e" />
      {/* MARTINE écrasée, sillon d'impact */}
      <path d="M560 520 Q680 500 790 498 L800 512 Q690 514 575 532 Z" fill="#33210f" opacity="0.7" />
      <g transform="translate(840,486) rotate(10)">
        <ellipse cx="0" cy="20" rx="46" ry="9" fill="#140b06" opacity="0.6" />
        <path d="M-36 8 Q-42 -24 0 -27 Q42 -24 36 8 Z" fill="#98a2b6" />
        <path d="M-36 8 Q-42 -24 0 -27 Q10 -26 18 -22 Q-20 -20 -28 6 Z" fill="#b8c2d4" opacity="0.8" />
        <ellipse cx="0" cy="8" rx="37" ry="10" fill="#6a7488" />
        <ellipse cx="0" cy="-16" rx="15" ry="9" fill="#cfeaff" opacity="0.95" />
        <ellipse cx="-4" cy="-18" rx="6" ry="3" fill="#fff" opacity="0.8" />
        <path d="M-24 -2 l-10 -12 M24 -2 l10 -12" stroke="#5eff9e" strokeWidth="2.5" style={{ animation: "pulse 1.5s infinite" }} />
        <path d="M12 12 q8 10 3 18 M18 10 q10 6 8 16" stroke="#aab4c8" strokeWidth="3" fill="none" opacity="0.8" />
        {/* fumée */}
        <path d="M-20 -28 q-6 -14 4 -22 q-8 4 -12 -8" stroke="#8a94a8" strokeWidth="3" fill="none" opacity="0.5" style={{ animation: "drift 4s ease-in-out infinite" }} />
      </g>

      {/* zones cliquables */}
      <Hot cx={118} cy={486} r={44} label="ocre" reveal={reveal} onClick={() => collect("ocre")} />
      <Hot cx={297} cy={360} r={48} label="liane" reveal={reveal} onClick={() => collect("liane")} />
      <Hot cx={168} cy={380} r={60} label="grotte" reveal={reveal} onClick={onMartine.cave} />
      <Hot cx={840} cy={486} r={60} label="MARTINE" reveal={reveal} onClick={onMartine.wreck} />
    </svg>
  );
}

/* ---------- T2 : le campement ---------- */
function SceneCampement({ collect, inv, reveal }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <SkyDefs />
      <rect width="1000" height="560" fill="url(#dusk)" />
      {[[120, 40], [340, 28], [620, 46], [820, 30], [930, 70]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.7" fill="#fff" opacity="0.85" style={{ animation: `twinkle ${2 + (i % 3)}s infinite` }} />
      ))}
      {/* fond de forêt */}
      <path d="M0 330 L1000 330 L1000 430 L0 430 Z" fill="#2a1c34" />
      {[60, 190, 330, 470, 640, 800, 940].map((x, i) => (
        <g key={i} opacity="0.85">
          <rect x={x - 7} y={200 + (i % 3) * 12} width="14" height={160} fill="#241626" rx="4" />
          <ellipse cx={x} cy={188 + (i % 3) * 12} rx={54} ry={44} fill="#2e2138" />
        </g>
      ))}
      {/* rangée d'arbres proches */}
      <g>
        <rect x="60" y="120" width="30" height="330" fill="url(#trunk)" rx="8" />
        <path d="M66 200 q12 6 22 0 M64 300 q14 8 24 0" stroke="#33231a" strokeWidth="3" fill="none" />
        <ellipse cx="80" cy="112" rx="105" ry="76" fill="url(#canopy)" />
        <ellipse cx="140" cy="86" rx="66" ry="48" fill="url(#canopy)" />
      </g>
      <g>
        <rect x="870" y="90" width="36" height="360" fill="url(#trunk)" rx="9" />
        <path d="M878 180 q14 7 24 0 M874 290 q16 9 28 0 M880 380 q12 6 22 0" stroke="#33231a" strokeWidth="3" fill="none" />
        <ellipse cx="890" cy="84" rx="125" ry="86" fill="url(#canopy)" />
        <ellipse cx="812" cy="120" rx="70" ry="50" fill="url(#canopy)" />
      </g>
      <Pine x={760} y={452} s={1.05} />
      <Pine x={200} y={448} s={0.85} />
      {/* sol de clairière */}
      <rect y="400" width="1000" height="160" fill="url(#soil)" />
      <ellipse cx="500" cy="470" rx="360" ry="60" fill="#7a5c36" opacity="0.5" />
      {/* halo du feu sur le sol et les troncs */}
      <ellipse cx="500" cy="470" rx="230" ry="110" fill="url(#fireLight)" style={{ animation: "glow 2.4s ease-in-out infinite" }} />
      <path d="M60 200 l0 220" stroke="#ff9540" strokeWidth="8" opacity="0.12" />
      <path d="M902 160 l0 260" stroke="#ff9540" strokeWidth="10" opacity="0.14" />
      {/* pierres du foyer */}
      {[[-52, 16], [-34, 26], [-8, 30], [20, 27], [44, 18], [54, 4]].map(([dx, dy], i) => (
        <ellipse key={i} cx={500 + dx} cy={452 + dy} rx="13" ry="8" fill={i % 2 ? "#5a5a64" : "#4a4a52"} />
      ))}
      {/* bûches et flammes */}
      <g transform="translate(500,452)">
        <path d="M-30 10 L32 20 M-28 20 L30 8 M-6 24 L4 4" stroke="#3a2412" strokeWidth="8" strokeLinecap="round" />
        <g style={{ transformOrigin: "0px 12px", animation: "flick 0.85s ease-in-out infinite" }}>
          <path d="M0 14 Q-20 -8 -6 -38 Q-1 -18 5 -30 Q20 -6 8 12 Z" fill="#ff7f24" />
          <path d="M0 14 Q-11 -2 -3 -22 Q1 -10 4 -16 Q11 -2 5 11 Z" fill="#ffb347" />
          <path d="M0 13 Q-5 4 -1 -8 Q1 -3 2 -6 Q6 2 3 10 Z" fill="#ffe28a" />
        </g>
        {/* étincelles */}
        <circle cx="-8" cy="-46" r="1.8" fill="#ffd166" style={{ animation: "spark 1.8s linear infinite" }} />
        <circle cx="10" cy="-56" r="1.5" fill="#ff9540" style={{ animation: "spark 2.3s linear infinite" }} />
        {/* fumée */}
        <path d="M2 -40 q-8 -22 6 -38 q-10 8 -4 -20" stroke="#8a7a90" strokeWidth="4" fill="none" opacity="0.35" style={{ animation: "drift 5s ease-in-out infinite" }} />
      </g>
      {/* le conteur assis (toi) */}
      <g transform="translate(408,442)">
        <ellipse cx="4" cy="34" rx="26" ry="7" fill="#241408" opacity="0.6" />
        <path d="M-12 -14 Q-18 12 -10 28 L14 28 Q20 8 12 -16 Z" fill="#5c3a22" />
        <path d="M-12 -14 Q-4 -22 12 -16 L10 -6 Q-2 -12 -10 -6 Z" fill="#6e4a2c" />
        <circle cx="1" cy="-26" r="10" fill="#8a5c3c" />
        <path d="M-8 -32 q8 -8 18 -2 q-2 -6 -9 -7 q-8 0 -9 9" fill="#3a2415" />
        <path d="M-10 24 q-11 6 -19 3 M13 24 q11 6 18 2" stroke="#5c3a22" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M14 -4 q12 -2 16 6" stroke="#8a5c3c" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>
      {/* tas de branches */}
      <g transform="translate(660,492)">
        <ellipse cx="0" cy="14" rx="66" ry="10" fill="#241408" opacity="0.5" />
        <path d="M-52 6 q30 -14 66 -6" stroke="#5a3a1e" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M-44 12 q34 -10 62 -2" stroke="#6e4a26" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M-30 2 q26 -12 54 -8" stroke="#4a3018" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M14 -2 l10 -14 M-10 0 l-8 -12" stroke="#5a3a1e" strokeWidth="4" strokeLinecap="round" />
      </g>
      {/* peaux qui sèchent sur un cadre (déco) */}
      <g transform="translate(150,470)">
        <path d="M-40 20 L-40 -60 M40 20 L40 -60 M-44 -56 L44 -56" stroke="#4a3018" strokeWidth="6" strokeLinecap="round" />
        <path d="M-30 -52 Q0 -60 30 -52 L26 6 Q0 14 -26 6 Z" fill="#8a6240" />
        <path d="M-22 -44 q22 -6 44 0 M-24 -20 q24 -6 48 0" stroke="#6e4a2c" strokeWidth="2" fill="none" opacity="0.7" />
      </g>
      {[300, 580, 940].map((x, i) => <GrassTuft key={i} x={x} y={520 + (i % 2) * 20} />)}
      {/* lucioles */}
      {[[260, 380], [700, 360], [820, 420]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="#d9ff7a" opacity="0.8" style={{ animation: `twinkle ${1.6 + i * 0.5}s infinite` }} />
      ))}

      {/* zones cliquables */}
      <Hot cx={500} cy={440} r={62} label="feu" reveal={reveal} onClick={() => collect("feu")} />
      <Hot cx={410} cy={432} r={48} label="toi" reveal={reveal} onClick={() => collect("voix")} />
      <Hot cx={660} cy={488} r={58} label="branches" reveal={reveal} onClick={() => collect("branche")} />
    </svg>
  );
}

/* ---------- T3 : la rivière ---------- */
function SceneRiviere({ collect, inv, reveal, hunted }) {
  return (
    <svg viewBox="0 0 1000 560" style={{ display: "block", width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      <SkyDefs />
      <rect width="1000" height="560" fill="url(#dusk)" />
      <circle cx="290" cy="170" r="120" fill="url(#sunhaze)" />
      <circle cx="290" cy="170" r="40" fill="#ffedb0" />
      {[[560, 30], [700, 60], [860, 36], [120, 50], [960, 90]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.7" fill="#fff" opacity="0.85" style={{ animation: `twinkle ${2 + (i % 3)}s infinite` }} />
      ))}
      <Birds />
      {/* collines */}
      <path d="M0 300 L160 230 L330 306 L520 240 L700 310 L860 250 L1000 302 L1000 380 L0 380 Z" fill="url(#mMid)" />
      <rect y="294" width="1000" height="20" fill="#d97b35" opacity="0.12" />
      <path d="M0 350 L200 296 L420 358 L640 310 L850 364 L1000 330 L1000 420 L0 420 Z" fill="url(#mNear)" />
      {/* berge lointaine */}
      <rect y="380" width="1000" height="40" fill="#4a3524" />
      <Pine x={80} y={392} s={0.7} dark="#22301f" />
      <Pine x={150} y={396} s={0.55} dark="#1d2a1b" />
      <Pine x={930} y={390} s={0.75} dark="#22301f" />
      {[240, 320, 620, 700, 780].map((x, i) => <GrassTuft key={i} x={x} y={400} c="#4a5426" />)}
      {/* LA RIVIÈRE */}
      <rect y="404" width="1000" height="100" fill="url(#water)" />
      {/* reflet du soleil */}
      <path d="M250 410 L330 410 L360 500 L220 500 Z" fill="#ffcf78" opacity="0.25" />
      {[[120, 424, 90], [300, 448, 130], [520, 430, 100], [700, 460, 120], [860, 436, 80], [420, 472, 90]].map(([x, y, w], i) => (
        <path key={i} d={`M${x} ${y} q${w / 2} ${i % 2 ? 4 : -4} ${w} 0`} stroke={i % 2 ? "#ffd9a0" : "#8a5c78"} strokeWidth="2.4" fill="none" opacity="0.5" style={{ animation: `ripple ${3 + (i % 3)}s ease-in-out infinite` }} />
      ))}
      {/* berge proche */}
      <path d="M0 504 Q240 486 520 502 Q780 516 1000 498 L1000 560 L0 560 Z" fill="url(#soil)" />
      <path d="M0 506 Q240 490 520 505 T1000 500" stroke="#96733e" strokeWidth="4" fill="none" opacity="0.5" />
      {/* galets */}
      {[[90, 528, 14], [130, 540, 10], [420, 534, 16], [470, 546, 9], [560, 528, 12], [940, 534, 13]].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.55} fill={i % 2 ? "#6e5a48" : "#5a4838"} />
      ))}
      {/* roseaux */}
      <g>
        {[640, 660, 682, 700].map((x, i) => (
          <g key={i}>
            <path d={`M${x} 520 q${i % 2 ? 5 : -5} -50 ${i % 2 ? 8 : -3} -86`} stroke="#4a6228" strokeWidth="3.5" fill="none" style={{ animation: `sway ${3 + i * 0.4}s ease-in-out infinite` }} />
            <ellipse cx={x + (i % 2 ? 8 : -3)} cy={430} rx="4.5" ry="15" fill="#5c4020" style={{ animation: `sway ${3 + i * 0.4}s ease-in-out infinite` }} />
          </g>
        ))}
      </g>
      {/* tronc creux échoué */}
      <g transform="translate(240,514)">
        <ellipse cx="0" cy="16" rx="86" ry="10" fill="#241408" opacity="0.55" />
        <path d="M-78 -8 Q-80 -20 -66 -20 L66 -14 Q80 -13 78 0 L76 8 Q76 16 62 16 L-64 12 Q-78 12 -78 -8 Z" fill="url(#trunk)" />
        <ellipse cx="72" cy="-1" rx="10" ry="13" fill="#1c0f06" />
        <ellipse cx="72" cy="-1" rx="10" ry="13" fill="none" stroke="#33210f" strokeWidth="2.5" />
        <path d="M-66 -12 h110 M-60 -2 h96 M-52 6 h80" stroke="#33210f" strokeWidth="2" opacity="0.7" />
        <path d="M-40 -18 q6 -10 16 -8" stroke="#4a3322" strokeWidth="4" fill="none" />
      </g>
      {/* LE CERF qui boit */}
      {!hunted ? (
        <g transform="translate(800,470)">
          <ellipse cx="0" cy="40" rx="52" ry="8" fill="#241408" opacity="0.5" />
          {/* corps */}
          <path d="M-34 0 Q-38 -22 -12 -24 L26 -20 Q44 -18 42 -2 Q40 12 24 14 L-20 12 Q-34 12 -34 0 Z" fill="#6e4a2c" />
          <path d="M-34 0 Q-38 -22 -12 -24 L10 -22 Q-10 -14 -16 4 Z" fill="#7d5636" />
          <ellipse cx="8" cy="-4" rx="18" ry="10" fill="#8a6240" opacity="0.5" />
          {/* cou penché vers l'eau */}
          <path d="M34 -12 Q58 -6 66 18 L74 30" stroke="#6e4a2c" strokeWidth="13" strokeLinecap="round" fill="none" />
          {/* tête */}
          <g transform="translate(76,34) rotate(28)">
            <path d="M-8 -6 Q6 -10 14 -2 Q18 2 12 6 L-4 8 Q-12 6 -8 -6 Z" fill="#7d5636" />
            <circle cx="0" cy="-2" r="1.8" fill="#1c0f06" />
            <ellipse cx="13" cy="3" rx="2.5" ry="2" fill="#2e1d12" />
            <path d="M-6 -8 l-5 -8" stroke="#6e4a2c" strokeWidth="4" strokeLinecap="round" />
          </g>
          {/* bois */}
          <g stroke="#4a3018" strokeWidth="3.2" fill="none" strokeLinecap="round">
            <path d="M60 6 q-2 -18 -12 -26 M54 -8 q-10 -4 -14 -12 M56 -14 q2 -10 10 -14 M52 -20 q-6 -8 -14 -8" />
          </g>
          {/* pattes */}
          <path d="M-26 10 L-30 42 M-12 12 L-13 42 M12 12 L14 42 M26 8 L32 40" stroke="#5c3a22" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M-31 42 l4 3 M-14 42 l4 3 M13 42 l4 3 M31 40 l5 3" stroke="#2e1d12" strokeWidth="4" strokeLinecap="round" />
          {/* queue + ondulation de l'eau où il boit */}
          <path d="M-34 -6 q-8 0 -9 7" stroke="#6e4a2c" strokeWidth="5" strokeLinecap="round" fill="none" />
          <ellipse cx="86" cy="46" rx="20" ry="3.5" fill="none" stroke="#ffd9a0" strokeWidth="1.8" opacity="0.6" style={{ animation: "ripple 2.4s ease-in-out infinite" }} />
        </g>
      ) : (
        /* traces après la chasse */
        <g fill="#3a2a1c" opacity="0.8">
          {[[760, 520], [790, 530], [822, 524], [854, 534]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x},${y})`}>
              <ellipse cx="-3" cy="0" rx="3.5" ry="6" /><ellipse cx="4" cy="0" rx="3.5" ry="6" />
            </g>
          ))}
        </g>
      )}
      {/* héron au loin */}
      <g transform="translate(520,398)" fill="#2a1a30">
        <path d="M0 0 q2 -18 10 -22 q6 -2 8 2 l6 -2 l-5 5 q-2 8 -10 9 L8 22 M14 22 l-3 -14" stroke="#2a1a30" strokeWidth="2.5" fill="none" />
      </g>

      {/* zones cliquables */}
      {!hunted && <Hot cx={810} cy={470} r={78} label="cerf" reveal={reveal} onClick={() => collect("cerf")} />}
      <Hot cx={240} cy={510} r={70} label="tronc" reveal={reveal} onClick={() => collect("tronc")} />
    </svg>
  );
}

/* ============================================================ */
export default function App() {
  const [screen, setScreen] = useState("title");
  const [tab, setTab] = useState(1); // tableau courant (démarre devant la grotte)
  const [dialog, setDialog] = useState({ lines: INTRO, idx: 0 });
  const [inv, setInv] = useState([]);
  const [msgs, setMsgs] = useState([]);
  const [slots, setSlots] = useState([null, null]);
  const [hunted, setHunted] = useState(false);
  const [modal, setModal] = useState(null);
  const [shake, setShake] = useState(false);
  const [sparkle, setSparkle] = useState(false);
  const [reveal, setReveal] = useState(false);

  const say = (line) => setDialog({ lines: Array.isArray(line) ? line : [line], idx: 0 });

  const collect = (id) => {
    const it = ITEMS[id];
    if (id === "cerf" && hunted) return;
    if (!inv.includes(id)) {
      setInv((v) => [...v, id]);
      say(`${it.emoji} ${it.name} — ${it.desc}`);
    } else {
      say(`${it.name} : déjà noté. ${it.desc}`);
    }
  };

  const doReveal = () => { setReveal(true); setTimeout(() => setReveal(false), 2200); };

  const onMartine = {
    wreck: () => say("Oui, c'est moi, là, plantée dans le sol. Pas un mot. Contente-toi de me recharger, et je promets d'oublier que tu as vu ça."),
    cave: () => { setTab(0); say("Tu entres dans la grotte. Il y fait sombre… mais la lumière du soir éclaire une paroi magnifique, au fond."); },
  };

  const putInSlot = (id) => {
    if (slots.includes(id)) return;
    if (!slots[0]) setSlots([id, slots[1]]);
    else if (!slots[1]) setSlots([slots[0], id]);
    else setSlots([slots[0], id]);
  };

  const combine = () => {
    const [a, b] = slots;
    if (!a || !b) { say("Il me faut DEUX éléments dans l'atelier. Un seul, ce n'est pas une combinaison, c'est une contemplation."); return; }
    const rec = RECIPES.find((r) => (r.a === a && r.b === b) || (r.a === b && r.b === a));
    setSlots([null, null]);
    if (rec) {
      if (rec.special === "hunt") {
        setHunted(true);
        setInv((v) => [...v.filter((x) => x !== "cerf"), "peau", "os"]);
        setSparkle(true); setTimeout(() => setSparkle(false), 800);
        say(rec.line);
        return;
      }
      if (rec.msg) {
        if (msgs.includes(rec.out)) { say("Déjà transmis, celui-là. Mes cristaux refusent les doublons — question de principe."); return; }
        setMsgs((m) => [...m, rec.out]);
        setSparkle(true); setTimeout(() => setSparkle(false), 800);
        setModal({ type: "fact", id: rec.out });
        return;
      }
      if (inv.includes(rec.out)) { say(`${ITEMS[rec.out].emoji} ${ITEMS[rec.out].name} : tu en as déjà un. L'artisanat, oui ; la surproduction, non.`); return; }
      setInv((v) => [...v, rec.out]);
      setSparkle(true); setTimeout(() => setSparkle(false), 800);
      say(`✨ NOUVEL OBJET : ${ITEMS[rec.out].emoji} ${ITEMS[rec.out].name}. ${rec.line}`);
      return;
    }
    const nm = NEAR_MISS.find((n) => (n.pair[0] === a && n.pair[1] === b) || (n.pair[0] === b && n.pair[1] === a));
    setShake(true); setTimeout(() => setShake(false), 500);
    say(nm ? nm.line : FAIL_LINES[Math.floor(Math.random() * FAIL_LINES.length)]);
  };

  const hint = () => {
    const h = HINTS.find((h) => h.needs.every((n) => inv.includes(n)) && !inv.includes(h.out) && !msgs.includes(h.out));
    if (h) { say(`💡 Indice : ${h.text}`); return; }
    const missing = Object.keys(WHERE).find((id) => !inv.includes(id) && !(id === "cerf" && hunted));
    if (missing) say(`💡 Indice : il reste des choses à découvrir ${WHERE[missing]}. Observe bien le décor… (le bouton 👁 peut aider)`);
    else say("💡 Tu as tout trouvé. Il ne reste plus qu'à combiner — pense aux objets déjà fabriqués.");
  };

  const canJump = msgs.length >= REQUIRED;

  /* ---------- écran titre ---------- */
  if (screen === "title") {
    return (
      <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 50% 30%, #14233a 0%, #080d16 70%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "Palatino, Georgia, serif" }}>
        <style>{css}</style>
        <div style={{ maxWidth: 560, textAlign: "center" }}>
          <div style={{ fontSize: 60, animation: "floaty 4s ease-in-out infinite" }}>🛸</div>
          <h1 style={{ fontFamily: "ui-monospace,monospace", color: "#5eff9e", fontSize: "clamp(34px,8vw,54px)", letterSpacing: 6, margin: "6px 0 0", textShadow: "0 0 20px rgba(94,255,158,0.5)" }}>MARTINE</h1>
          <p style={{ color: "#8fa3bd", fontSize: 12.5, letterSpacing: 1, marginTop: 4, fontFamily: "ui-monospace,monospace" }}>
            Machine À Remonter le Temps Intelligente Néanmoins Excellente
          </p>
          <p style={{ color: "#d8e2ee", fontSize: 16.5, lineHeight: 1.6, marginTop: 22 }}>
            <strong>Chapitre 1 — Préhistoire.</strong> Un accident temporel vous a projetés en −18 000.
            Explore <strong>quatre lieux</strong> — la grotte, le campement, la rivière —
            trouve des éléments cachés dans le décor et <strong>combine-les deux par deux</strong> pour
            fabriquer des outils… et laisser des <strong>messages pour le futur</strong>.
          </p>
          <p style={{ color: "#8fa3bd", fontSize: 13.5, marginTop: 10 }}>
            Fabrique un arc 🏹 · chasse 🦌 · invente la flûte, le tambour, la peinture…
          </p>
          <button onClick={() => { setScreen("play"); setTab(1); setDialog({ lines: INTRO, idx: 0 }); }}
            style={{ marginTop: 26, background: "#5eff9e", color: "#06110b", border: "none", borderRadius: 12, padding: "14px 34px", fontSize: 16, fontWeight: 800, cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: 2, boxShadow: "0 0 24px rgba(94,255,158,0.4)" }}>
            ▶ DÉMARRER
          </button>
        </div>
      </div>
    );
  }

  /* ---------- écran fin ---------- */
  if (screen === "end") {
    return (
      <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 50% 20%, #1a2f4a 0%, #080d16 70%)", padding: 20, fontFamily: "Palatino, Georgia, serif", color: "#e8eef5" }}>
        <style>{css}</style>
        <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 58, marginTop: 18 }}>🌀</div>
          <h1 style={{ fontFamily: "ui-monospace,monospace", color: "#5eff9e", letterSpacing: 3, fontSize: 26 }}>SAUT TEMPOREL RÉUSSI</h1>
          <p style={{ fontSize: 16.5, lineHeight: 1.65, color: "#c8d4e2" }}>
            « Circuits rechargés à {Math.round((msgs.length / ALL_MSGS.length) * 100)} %. Tu viens de vivre la grande leçon
            de la Préhistoire : un média, c'est toujours <strong>une idée + un support + un outil</strong> — et souvent,
            il faut d'abord <em>fabriquer</em> le support. Prochaine escale : l'Antiquité, où les humains
            inventent un truc fou nommé <em>écriture</em>… » — MARTINE
          </p>
          <p style={{ fontFamily: "ui-monospace,monospace", color: "#5eff9e", fontSize: 18, marginTop: 14 }}>
            ◆ {msgs.length} / {ALL_MSGS.length} messages découverts
          </p>
          <div style={{ textAlign: "left", marginTop: 18 }}>
            {ALL_MSGS.map((id) =>
              msgs.includes(id) ? (
                <div key={id} style={{ background: "#101827", border: "1px solid #2a3648", borderRadius: 12, padding: "10px 14px", marginBottom: 8 }}>
                  <strong>{MESSAGES[id].emoji} {MESSAGES[id].title}</strong>
                  <p style={{ fontSize: 13, color: "#b8c4d4", margin: "4px 0 0", lineHeight: 1.5 }}>{MESSAGES[id].fact}</p>
                </div>
              ) : (
                <div key={id} style={{ background: "#0d1320", border: "1px dashed #2a3648", borderRadius: 12, padding: "10px 14px", marginBottom: 8, color: "#5a6678" }}>
                  ❓ Message non découvert — rejoue pour le trouver !
                </div>
              )
            )}
          </div>
          <button onClick={() => { setInv([]); setMsgs([]); setSlots([null, null]); setHunted(false); setTab(1); setScreen("title"); }}
            style={{ margin: "18px 0 40px", background: "transparent", color: "#5eff9e", border: "2px solid #5eff9e", borderRadius: 12, padding: "12px 26px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "ui-monospace,monospace" }}>
            ↺ REJOUER LE CHAPITRE
          </button>
        </div>
      </div>
    );
  }

  /* ---------- jeu ---------- */
  const sceneProps = { collect, inv, reveal, hunted, onMartine };
  return (
    <div style={{ minHeight: "100vh", background: "#080d16", fontFamily: "Palatino, Georgia, serif", color: "#e8eef5", paddingBottom: 24 }}>
      <style>{css}</style>

      {/* bandeau */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", flexWrap: "wrap", gap: 6 }}>
        <div>
          <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 10.5, letterSpacing: 2, color: "#e8934a" }}>CHAPITRE 1 · −18 000</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>🦣 {SCENES[tab].name}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "ui-monospace,monospace", fontSize: 13, color: "#5eff9e" }}>◆ {msgs.length}/{ALL_MSGS.length}</span>
          <button onClick={hint} style={{ background: "#141b26", border: "1px solid #2a3648", color: "#ffd166", borderRadius: 10, padding: "7px 12px", cursor: "pointer", fontSize: 13 }}>💡</button>
          <button onClick={doReveal} title="Révéler brièvement les zones" style={{ background: "#141b26", border: "1px solid #2a3648", color: "#c8d4e2", borderRadius: 10, padding: "7px 12px", cursor: "pointer", fontSize: 13 }}>👁</button>
          <button onClick={() => setModal({ type: "journal" })} style={{ background: "#141b26", border: "1px solid #2a3648", color: "#c8d4e2", borderRadius: 10, padding: "7px 12px", cursor: "pointer", fontSize: 13 }}>📔</button>
        </div>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 10px" }}>
        {/* scène + navigation */}
        <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "2px solid #2a3648", aspectRatio: "1000/560", boxShadow: sparkle ? "0 0 50px rgba(94,255,158,0.6)" : "0 6px 24px rgba(0,0,0,0.5)", transition: "box-shadow .4s" }}>
          {tab === 0 && <SceneInterieur {...sceneProps} />}
          {tab === 1 && <SceneExterieur {...sceneProps} />}
          {tab === 2 && <SceneCampement {...sceneProps} />}
          {tab === 3 && <SceneRiviere {...sceneProps} />}

          {/* flèches de déplacement */}
          {tab > 0 && (
            <button onClick={() => setTab(tab - 1)}
              style={navBtn("left")} title={SCENES[tab - 1].name}>‹</button>
          )}
          {tab < SCENES.length - 1 && (
            <button onClick={() => setTab(tab + 1)}
              style={navBtn("right")} title={SCENES[tab + 1].name}>›</button>
          )}
          {/* fil d'Ariane des lieux */}
          <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6, background: "rgba(0,0,0,0.4)", padding: "5px 10px", borderRadius: 20 }}>
            {SCENES.map((s, i) => (
              <button key={s.id} onClick={() => setTab(i)} title={s.name}
                style={{ width: 9, height: 9, borderRadius: "50%", border: "none", cursor: "pointer", background: i === tab ? "#ffd166" : "rgba(255,255,255,0.35)", padding: 0 }} />
            ))}
          </div>
        </div>

        {/* console MARTINE */}
        <div style={{ marginTop: 10 }}>
          <Martine lines={dialog.lines} idx={dialog.idx} onNext={() => setDialog((d) => ({ ...d, idx: d.idx + 1 }))} />
        </div>

        {/* atelier */}
        <div style={{ marginTop: 10, background: "#0e1420", border: "2px solid #2a3648", borderRadius: 16, padding: 12, animation: shake ? "shake .5s" : "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 4 }}>
            <span style={{ fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#8fa3bd" }}>⚙ ATELIER — combine 2 éléments</span>
            <span style={{ fontSize: 11, color: "#5a6678" }}>{REQUIRED} messages requis pour le saut</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {[0, 1].map((i) => (
              <button key={i} onClick={() => setSlots((s) => { const c = [...s]; c[i] = null; return c; })}
                style={{ flex: 1, background: "#141b26", border: `2px ${slots[i] ? "solid #e8934a" : "dashed #3a4656"}`, borderRadius: 12, padding: "10px 6px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, minHeight: 74 }}>
                <span style={{ fontSize: 26, lineHeight: 1 }}>{slots[i] ? ITEMS[slots[i]].emoji : "＋"}</span>
                <span style={{ fontSize: 11, color: slots[i] ? "#e8eef5" : "#5a6678", fontWeight: 600, textAlign: "center" }}>
                  {slots[i] ? ITEMS[slots[i]].name : "élément " + (i + 1)}
                </span>
              </button>
            ))}
            <button onClick={combine}
              style={{ flex: 1, background: "linear-gradient(180deg,#5eff9e,#2fd97a)", color: "#06110b", border: "none", borderRadius: 12, padding: "16px 6px", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: 1, boxShadow: "0 3px 0 #1a8a4d", minHeight: 74 }}>
              ✨<br />COMBINER
            </button>
          </div>

          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 10.5, letterSpacing: 1.5, color: "#8fa3bd", fontFamily: "ui-monospace,monospace", marginBottom: 6 }}>
              🎒 BESACE ({inv.length}) — touche un élément pour le placer
            </div>
            {inv.length === 0 ? (
              <div style={{ fontSize: 13, color: "#5a6678", fontStyle: "italic" }}>Vide. Observe les décors et touche ce qui te semble utile. Déplace-toi avec ‹ ›.</div>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {inv.map((id) => (
                  <button key={id} onClick={() => putInSlot(id)}
                    style={{ background: slots.includes(id) ? "#2a3648" : "#1a2536", border: "1px solid #33445c", borderRadius: 10, padding: "7px 11px", color: "#e8eef5", cursor: "pointer", fontSize: 13.5, display: "flex", alignItems: "center", gap: 6, opacity: slots.includes(id) ? 0.5 : 1 }}>
                    <span style={{ fontSize: 17 }}>{ITEMS[id].emoji}</span> {ITEMS[id].name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => setScreen("end")} disabled={!canJump}
            style={{ marginTop: 12, width: "100%", background: canJump ? "#e8934a" : "#1a2230", color: canJump ? "#111" : "#4a5568", border: "none", borderRadius: 12, padding: "13px", fontSize: 15, fontWeight: 800, cursor: canJump ? "pointer" : "not-allowed", fontFamily: "ui-monospace,monospace", letterSpacing: 1.5, boxShadow: canJump ? "0 3px 0 rgba(0,0,0,0.4)" : "none" }}>
            🌀 SAUT TEMPOREL {canJump ? "→ ANTIQUITÉ" : `(${msgs.length}/${REQUIRED} messages)`}
          </button>
        </div>
      </div>

      {/* ---------- modales ---------- */}
      {modal?.type === "fact" && (
        <div style={overlay} onClick={() => setModal(null)}>
          <div style={card} onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: "center", fontSize: 46 }}>{MESSAGES[modal.id].emoji}</div>
            <div style={{ textAlign: "center", fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#5eff9e" }}>◆ MESSAGE TRANSMIS AU FUTUR</div>
            <h2 style={{ textAlign: "center", margin: "6px 0 10px", color: "#e8934a", fontSize: 22 }}>{MESSAGES[modal.id].title}</h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "#d8e2ee", margin: 0 }}>{MESSAGES[modal.id].fact}</p>
            <button onClick={() => setModal(null)} style={{ marginTop: 16, width: "100%", background: "#e8934a", color: "#111", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: "pointer", fontSize: 15 }}>
              Continuer
            </button>
          </div>
        </div>
      )}

      {modal?.type === "journal" && (
        <div style={overlay} onClick={() => setModal(null)}>
          <div style={{ ...card, maxHeight: "80vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginTop: 0, color: "#5eff9e", fontFamily: "ui-monospace,monospace", letterSpacing: 2, fontSize: 16 }}>📔 CARNET DE BORD</h2>
            {msgs.length === 0 && <p style={{ color: "#8fa3bd", fontStyle: "italic" }}>Aucune découverte pour l'instant. Explore, combine, transmets !</p>}
            {msgs.map((id) => (
              <div key={id} style={{ background: "#141b26", borderRadius: 10, padding: "10px 12px", marginBottom: 8 }}>
                <strong>{MESSAGES[id].emoji} {MESSAGES[id].title}</strong>
                <p style={{ fontSize: 13, color: "#b8c4d4", margin: "4px 0 0", lineHeight: 1.5 }}>{MESSAGES[id].fact}</p>
              </div>
            ))}
            <div style={{ fontSize: 12, color: "#5a6678", margin: "8px 0" }}>
              {ALL_MSGS.length - msgs.length} message(s) encore à découvrir dans ce chapitre.
            </div>
            <button onClick={() => setModal(null)} style={{ width: "100%", background: "#1a2536", color: "#e8eef5", border: "1px solid #2a3648", borderRadius: 10, padding: "12px", fontWeight: 700, cursor: "pointer" }}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const navBtn = (side) => ({
  position: "absolute", top: "50%", [side]: 8, transform: "translateY(-50%)",
  width: 40, height: 56, borderRadius: 12, border: "1px solid rgba(255,255,255,0.25)",
  background: "rgba(0,0,0,0.38)", color: "#fff", fontSize: 26, cursor: "pointer",
  backdropFilter: "blur(2px)", lineHeight: 1,
});

const overlay = { position: "fixed", inset: 0, background: "rgba(4,8,14,0.82)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 50, backdropFilter: "blur(3px)" };
const card = { background: "#0e1420", border: "2px solid #e8934a66", borderRadius: 18, padding: 20, maxWidth: 480, width: "100%", boxShadow: "0 12px 48px rgba(0,0,0,0.6)", animation: "popIn .25s ease-out" };

const css = `
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
@keyframes twinkle { 0%,100%{opacity:.9} 50%{opacity:.15} }
@keyframes flick { 0%,100%{transform:scaleY(1) scaleX(1)} 50%{transform:scaleY(1.14) scaleX(.93)} }
@keyframes glow { 0%,100%{opacity:.75} 50%{opacity:1} }
@keyframes drift { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
@keyframes spark { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(-30px);opacity:0} }
@keyframes ripple { 0%,100%{opacity:.5} 50%{opacity:.15} }
@keyframes sway { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(2.5deg)} }
@keyframes floaty { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
@keyframes popIn { from{transform:scale(.92);opacity:0} to{transform:scale(1);opacity:1} }
@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
`;
