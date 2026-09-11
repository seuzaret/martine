import { useEffect, useMemo, useRef, useState } from "react";

/* ============================================================
   PROTOTYPE v5 : Boussole temporelle
   ------------------------------------------------------------
   - Deplacement le long des lignes de la grille iso, case par case
   - 4 fleches = les 4 axes de la grille (NE / SE / SW / NW ecran)
   - Boucle refs-DOM directs (fluide)
   ============================================================ */

const VW = 1600;
const VH = 900;
/* Plateau 2.4x plus grand qu'avant (5760 au lieu de 2400). La cellule
   fait toujours 240 unites monde, donc le rythme case-a-case ne change
   pas ; il y a juste plus de cases a parcourir. */
const WORLD = 5760;
const LOCK_RADIUS = 100;   // un peu plus large : on s'arrete sur une case
const LOCK_MS = 900;
const NUM_WHIRLS = 24;     // densite proportionnelle a la nouvelle surface
const GRID_N = 48;         // 48 subdivisions
const STEP = (WORLD * 2) / GRID_N;       // 240 unites monde par case
const CELL_MS = 260;                     // temps pour traverser une case
const ZOOM = 0.82;                       // camera legerement reculee
const TACHYON_CELL_MS = 520;             // tachyons rouges (joueur = 260 ms/case)
const TACHYON_RANDOM = 0.15;             // chance d'un mouvement aleatoire
const TACHYON_COUNT = 4;                 // un a chaque angle

/* Angle iso plus doux : moins ecrase verticalement.
   sx = (x - y) * ISO_X ; sy = (x + y) * ISO_Y */
const ISO_X = 0.95;
const ISO_Y = 0.35;
const iso = (x, y) => ({ sx: (x - y) * ISO_X, sy: (x + y) * ISO_Y });

const rand = (min, max) => min + Math.random() * (max - min);

/* Epoques du jeu, ordonnees du passe (Ouest) vers le futur (Est).
   Les couleurs sont tenues (chaudes -> froides -> menthe) pour lire
   d'un coup d'oeil la region du plateau. */
const ERAS = [
  { key: "prehistoire", name: "Préhistoire",   color: "#c07040" },
  { key: "antiquite",   name: "Antiquité",     color: "#d0a24a" },
  { key: "moyen-age",   name: "Moyen Âge",     color: "#8b6bd0" },
  { key: "renaissance", name: "Renaissance",   color: "#c85fa0" },
  { key: "moderne",     name: "Époque moderne",color: "#5a9be0" },
  { key: "xixe",        name: "XIXᵉ siècle",   color: "#4ac0b0" },
  { key: "xxe-guerres", name: "Grandes Guerres",color:"#7a8a6a" },
  { key: "xxe-medias",  name: "Médias de masse",color:"#e0a058" },
  { key: "xxie",        name: "XXIᵉ siècle",   color: "#7fffb0" },
];
const eraIndexForX = (x) => {
  const t = (x + WORLD) / (WORLD * 2);        // 0 -> 1
  return Math.max(0, Math.min(ERAS.length - 1, Math.floor(t * ERAS.length)));
};

/* Reperes de dates dissemines sur le plateau. Le x rappelle l'epoque
   (bande), le y est arbitraire pour ne pas empiler les etiquettes.
   `tick` : petit trait vertical si vrai. */
const DATE_MARKERS = [
  { x: -WORLD * 0.95, y: -WORLD * 0.55, text: "-30 000", tick: true  },
  { x: -WORLD * 0.80, y:  WORLD * 0.25, text: "-8 000",  tick: false },
  { x: -WORLD * 0.60, y: -WORLD * 0.15, text: "-800",    tick: true  },
  { x: -WORLD * 0.50, y:  WORLD * 0.55, text: "100",     tick: false },
  { x: -WORLD * 0.32, y: -WORLD * 0.42, text: "800",     tick: true  },
  { x: -WORLD * 0.20, y:  WORLD * 0.10, text: "1200",    tick: false },
  { x: -WORLD * 0.05, y: -WORLD * 0.65, text: "1500",    tick: true  },
  { x:  WORLD * 0.08, y:  WORLD * 0.35, text: "1600",    tick: false },
  { x:  WORLD * 0.18, y: -WORLD * 0.05, text: "1789",    tick: true  },
  { x:  WORLD * 0.30, y:  WORLD * 0.60, text: "1830",    tick: false },
  { x:  WORLD * 0.42, y: -WORLD * 0.30, text: "1889",    tick: true  },
  { x:  WORLD * 0.55, y:  WORLD * 0.05, text: "1918",    tick: false },
  { x:  WORLD * 0.65, y: -WORLD * 0.55, text: "1944",    tick: true  },
  { x:  WORLD * 0.78, y:  WORLD * 0.30, text: "1969",    tick: true  },
  { x:  WORLD * 0.86, y: -WORLD * 0.10, text: "1985",    tick: false },
  { x:  WORLD * 0.94, y:  WORLD * 0.50, text: "2024",    tick: true  },
];

export function TemporalCompass({ onClose, onLock, nextLabel }) {
  const posRef = useRef({ x: 0, y: 0 });
  const heldRef = useRef({ up: false, down: false, left: false, right: false });
  const cameraRef = useRef(null);
  const playerRef = useRef(null);
  const needleRef = useRef(null);
  const targetGroupRef = useRef(null);
  const minimapPlayerRef = useRef(null);
  const lockBarRef = useRef(null);
  const lockGroupRef = useRef(null);
  const ringsRef = useRef([]);
  const warpRef = useRef((x, y) => [x, y]);
  const tachyonRefs = useRef([]);           // <g> des 4 tachyons rouges
  const trailGroupRef = useRef(null);       // <g> ou on append les segments rouges
  const tachyonMiniRefs = useRef([]);       // points rouges sur la mini-carte
  const [done, setDone] = useState(false);
  const [caught, setCaught] = useState(false);
  const [decoys, setDecoys] = useState([]); // faux noeuds temporels ephemeres

  const { target, whirls } = useMemo(() => {
    const snap = (v) => Math.round(v / STEP) * STEP;
    const angle = Math.random() * Math.PI * 2;
    /* Cible plus loin, proportionnelle a la nouvelle taille du plateau. */
    const dist = rand(WORLD * 0.6, WORLD * 0.88);
    let tx = snap(Math.cos(angle) * dist), ty = snap(Math.sin(angle) * dist);
    if (tx === 0 && ty === 0) tx = STEP * 6;
    const era = ERAS[eraIndexForX(tx)];
    return {
      target: { x: tx, y: ty, era, label: nextLabel || era.name },
      whirls: Array.from({ length: NUM_WHIRLS }, () => ({
        x: rand(-WORLD + 300, WORLD - 300),
        y: rand(-WORLD + 300, WORLD - 300),
        r: rand(90, 160),
        dir: Math.random() < 0.5 ? 1 : -1,
      })),
    };
  }, [nextLabel]);

  /* Faux noeuds : apparaissent au hasard, vivent ~5s puis disparaissent.
     Purement decoratifs (aucune interaction gameplay). */
  useEffect(() => {
    let nextId = 0;
    const CELL_MAX = Math.floor(WORLD / STEP);
    const spawn = () => {
      const dx = (Math.floor(rand(-CELL_MAX, CELL_MAX + 1))) * STEP;
      const dy = (Math.floor(rand(-CELL_MAX, CELL_MAX + 1))) * STEP;
      /* Evite de coincider avec la vraie cible. */
      if (Math.hypot(dx - target.x, dy - target.y) < STEP * 2) return;
      const life = 4500 + Math.random() * 2500;
      const era = ERAS[eraIndexForX(dx)];
      const d = { id: nextId++, x: dx, y: dy, era, life };
      setDecoys((arr) => (arr.length >= 3 ? arr : [...arr, d]));
      setTimeout(() => setDecoys((arr) => arr.filter((x) => x.id !== d.id)), life);
    };
    const iv = setInterval(spawn, 2600);
    return () => clearInterval(iv);
  }, [target]);

  /* clavier */
  useEffect(() => {
    const map = (k) => {
      if (["ArrowUp", "z", "w"].includes(k)) return "up";
      if (["ArrowDown", "s"].includes(k)) return "down";
      if (["ArrowLeft", "q", "a"].includes(k)) return "left";
      if (["ArrowRight", "d"].includes(k)) return "right";
      return null;
    };
    const down = (e) => {
      if (e.key === "Escape") { onClose?.(); return; }
      if (e.key === " " || e.code === "Space") { heldRef.current.brake = true; e.preventDefault?.(); return; }
      const k = map(e.key); if (k) heldRef.current[k] = true;
    };
    const up = (e) => {
      if (e.key === " " || e.code === "Space") { heldRef.current.brake = false; return; }
      const k = map(e.key); if (k) heldRef.current[k] = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, [onClose]);

  /* boucle : deplacement le long des lignes de la grille.
     La position ecran interpole entre 2 noeuds (from -> to). Quand on
     arrive, on regarde les fleches maintenues pour partir sur la case
     suivante. Une case = STEP unites monde. */
  useEffect(() => {
    let raf, last = performance.now();
    let lock = 0, isDone = false, isCaught = false;
    /* Etat de deplacement */
    let fromX = 0, fromY = 0, toX = 0, toY = 0, prog = 1;
    /* Inertie : quand on relache la touche, le joueur continue encore
       MOMENTUM_STEPS cases dans la meme direction avant de s'arreter.
       Barre espace = frein immediat (momentum remis a 0). */
    let lastDir = null;
    let momentum = 0;
    const MOMENTUM_STEPS = 4;
    const BRAKE_FACTOR = 0.35;   // ralentit la case en cours quand on freine
    const CELL_MAX = Math.floor(WORLD / STEP);

    /* --- 4 tachyons rouges, un a chaque angle du plateau --- */
    const CORNERS = [
      [-CELL_MAX, -CELL_MAX],
      [ CELL_MAX, -CELL_MAX],
      [-CELL_MAX,  CELL_MAX],
      [ CELL_MAX,  CELL_MAX],
    ];
    const tachyons = CORNERS.map(([cx, cy]) => ({
      fromX: cx * STEP, fromY: cy * STEP,
      toX:   cx * STEP, toY:   cy * STEP,
      curX:  cx * STEP, curY:  cy * STEP,
      prog:  1,
    }));
    const trail = new Set();          // cle "cxA,cyA|cxB,cyB" (ordre canonique)
    const edgeKey = (ax, ay, bx, by) => {
      if (ax < bx || (ax === bx && ay < by)) return `${ax},${ay}|${bx},${by}`;
      return `${bx},${by}|${ax},${ay}`;
    };
    const addTrailSegment = (ax, ay, bx, by) => {
      const k = edgeKey(ax, ay, bx, by);
      if (trail.has(k)) return;
      trail.add(k);
      if (!trailGroupRef.current) return;
      /* Trace le segment warpé */
      const SUB = 8;
      const pts = [];
      for (let i = 0; i <= SUB; i++) {
        const u = i / SUB;
        const wxA = ax * STEP + (bx - ax) * STEP * u;
        const wyA = ay * STEP + (by - ay) * STEP * u;
        const [wx, wy] = warpRef.current(wxA, wyA);
        const pr = iso(wx, wy);
        pts.push(`${pr.sx.toFixed(1)},${pr.sy.toFixed(1)}`);
      }
      const el = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      el.setAttribute("points", pts.join(" "));
      el.setAttribute("fill", "none");
      el.setAttribute("stroke", "#ff2a4a");
      el.setAttribute("stroke-width", "2.4");
      el.setAttribute("stroke-linecap", "round");
      el.setAttribute("opacity", "0.9");
      trailGroupRef.current.appendChild(el);
    };
    const tachyonChooseDir = (curCx, curCy) => {
      const pCx = Math.round(posRef.current.x / STEP);
      const pCy = Math.round(posRef.current.y / STEP);
      const dx = pCx - curCx, dy = pCy - curCy;
      const candidates = [];
      if (Math.random() < TACHYON_RANDOM || (dx === 0 && dy === 0)) {
        candidates.push({ dx: 1, dy: 0 }, { dx: -1, dy: 0 }, { dx: 0, dy: 1 }, { dx: 0, dy: -1 });
      } else {
        /* privilegie l'axe le plus long */
        if (Math.abs(dx) >= Math.abs(dy)) {
          if (dx !== 0) candidates.push({ dx: Math.sign(dx), dy: 0 });
          if (dy !== 0) candidates.push({ dx: 0, dy: Math.sign(dy) });
        } else {
          if (dy !== 0) candidates.push({ dx: 0, dy: Math.sign(dy) });
          if (dx !== 0) candidates.push({ dx: Math.sign(dx), dy: 0 });
        }
      }
      for (const c of candidates) {
        const nx = curCx + c.dx, ny = curCy + c.dy;
        if (nx >= -CELL_MAX && nx <= CELL_MAX && ny >= -CELL_MAX && ny <= CELL_MAX) return c;
      }
      return null;
    };
    /* Correspondance fleche ECRAN -> direction monde (une ligne de la grille).
       Convention : les 4 fleches forment une croix tournee de 45 deg qui
       suit les 4 axes visibles de la grille iso. */
    const dirFor = (h) => {
      if (h.up)    return { dx:  0, dy: -1 };
      if (h.right) return { dx: +1, dy:  0 };
      if (h.down)  return { dx:  0, dy: +1 };
      if (h.left)  return { dx: -1, dy:  0 };
      return null;
    };
    const step = (t) => {
      const dt = Math.min(50, t - last); last = t;
      const p = posRef.current, held = heldRef.current;

      /* Progression sur la case en cours.
         Si le frein est tenu, la traversee se ralentit (BRAKE_FACTOR). */
      if (prog < 1) {
        const factor = held.brake ? BRAKE_FACTOR : 1;
        prog = Math.min(1, prog + (dt * factor) / CELL_MS);
        p.x = fromX + (toX - fromX) * prog;
        p.y = fromY + (toY - fromY) * prog;
      }
      /* Arrive : demarrer la case suivante.
         Les tourbillons peuvent detourner (voire imposer) la direction. */
      if (prog >= 1) {
        const cx = Math.round(p.x / STEP), cy = Math.round(p.y / STEP);

        /* Cherche le tourbillon dont le nœud actuel est le plus enfonce. */
        let strongest = null, strongestDepth = 0;
        for (const w of whirls) {
          const dx = p.x - w.x, dy = p.y - w.y;
          const d = Math.hypot(dx, dy);
          if (d < w.r) {
            const depth = 1 - d / w.r;   // 0 (bord) -> 1 (centre)
            if (depth > strongestDepth) { strongestDepth = depth; strongest = w; }
          }
        }

        /* Frein tenu : arrivee au noeud = arret complet (pas de nouvelle case). */
        if (held.brake) {
          momentum = 0;
          lastDir = null;
        }
        let d = dirFor(held);
        /* Inertie : si aucune touche, on continue avec la derniere
           direction pendant MOMENTUM_STEPS cases. */
        if (d) {
          lastDir = d;
          momentum = MOMENTUM_STEPS;
        } else if (momentum > 0 && lastDir) {
          d = lastDir;
          momentum--;
        }
        if (strongest) {
          /* Direction tangentielle (dans le sens du tourbillon) au nœud actuel. */
          const rx = p.x - strongest.x, ry = p.y - strongest.y;
          const tx = -ry * strongest.dir, ty = rx * strongest.dir;
          /* Snap sur l'axe le plus proche. */
          const tDir = Math.abs(tx) > Math.abs(ty)
            ? { dx: Math.sign(tx), dy: 0 }
            : { dx: 0, dy: Math.sign(ty) };
          if (!d) {
            /* Aucune touche : le tourbillon nous emporte des qu'il mord (>=0.2). */
            if (strongestDepth > 0.2) d = tDir;
          } else {
            /* Touche tenue : proba de detournement proportionnelle a la profondeur. */
            if (Math.random() < strongestDepth * 0.85) d = tDir;
          }
        }

        if (d) {
          const ncx = Math.max(-CELL_MAX, Math.min(CELL_MAX, cx + d.dx));
          const ncy = Math.max(-CELL_MAX, Math.min(CELL_MAX, cy + d.dy));
          if (ncx !== cx || ncy !== cy) {
            /* Traverser une arete rouge = attrape. */
            if (trail.has(edgeKey(cx, cy, ncx, ncy)) && !isCaught) {
              isCaught = true; setCaught(true);
              setTimeout(() => onClose?.(), 1500);
            }
            fromX = cx * STEP; fromY = cy * STEP;
            toX = ncx * STEP; toY = ncy * STEP;
            p.x = fromX; p.y = fromY;
            prog = 0;
          } else {
            /* on est bloque au bord : coupe court a l'inertie */
            momentum = 0;
          }
        }
      }

      /* --- Tachyons rouges : chacun avance sur la grille, laisse un trait --- */
      if (!isCaught) {
        for (let ti = 0; ti < tachyons.length; ti++) {
          const T = tachyons[ti];
          if (T.prog < 1) {
            T.prog = Math.min(1, T.prog + dt / TACHYON_CELL_MS);
            T.curX = T.fromX + (T.toX - T.fromX) * T.prog;
            T.curY = T.fromY + (T.toY - T.fromY) * T.prog;
          }
          if (T.prog >= 1) {
            const ccx = Math.round(T.curX / STEP), ccy = Math.round(T.curY / STEP);
            const d = tachyonChooseDir(ccx, ccy);
            if (d) {
              const nx = ccx + d.dx, ny = ccy + d.dy;
              addTrailSegment(ccx, ccy, nx, ny);
              T.fromX = ccx * STEP; T.fromY = ccy * STEP;
              T.toX = nx * STEP;    T.toY = ny * STEP;
              T.curX = T.fromX;     T.curY = T.fromY;
              T.prog = 0;
            }
          }
          /* Render tachyon (warped iso). */
          const el = tachyonRefs.current[ti];
          if (el) {
            const [wxT, wyT] = warpRef.current(T.curX, T.curY);
            const ptT = iso(wxT, wyT);
            el.setAttribute("transform", `translate(${ptT.sx} ${ptT.sy})`);
          }
          const mel = tachyonMiniRefs.current[ti];
          if (mel) {
            mel.setAttribute("cx", (T.curX / WORLD) * 60);
            mel.setAttribute("cy", (T.curY / WORLD) * 60);
          }
          /* Collision directe joueur / tachyon */
          if (Math.hypot(p.x - T.curX, p.y - T.curY) < STEP * 0.5) {
            isCaught = true; setCaught(true);
            setTimeout(() => onClose?.(), 1500);
            break;
          }
        }
      }

      /* projection iso pour camera + joueur, avec la meme deformation
         que la grille pour rester "sur les lignes". */
      const [wx, wy] = warpRef.current(p.x, p.y);
      const psx = (wx - wy) * ISO_X;
      const psy = (wx + wy) * ISO_Y;
      if (cameraRef.current) cameraRef.current.setAttribute("transform", `translate(${VW / 2} ${VH / 2}) scale(${ZOOM}) translate(${-psx} ${-psy})`);
      if (playerRef.current) playerRef.current.setAttribute("transform", `translate(${psx} ${psy})`);
      if (minimapPlayerRef.current) {
        minimapPlayerRef.current.setAttribute("cx", (p.x / WORLD) * 60);
        minimapPlayerRef.current.setAttribute("cy", (p.y / WORLD) * 60);
      }

      /* boussole : angle en coordonnees ECRAN (iso) pour que la fleche
         pointe visuellement vers le noeud tel qu'affiche a l'ecran. */
      const dxT = target.x - p.x, dyT = target.y - p.y;
      const distT = Math.hypot(dxT, dyT);
      const dsxT = (dxT - dyT) * ISO_X;
      const dsyT = (dxT + dyT) * ISO_Y;
      const angT = Math.atan2(dsyT, dsxT);
      if (needleRef.current) needleRef.current.setAttribute("transform", `rotate(${(angT * 180) / Math.PI})`);
      const prox = Math.max(0, Math.min(1, 1 - distT / (WORLD * 1.05)));
      const lit = Math.round(prox * 5);
      const col = lit >= 4 ? "#ff4a3a" : lit >= 3 ? "#ffa050" : lit >= 2 ? "#ffd166" : "#a8c8ff";
      ringsRef.current.forEach((r, i) => {
        if (!r) return;
        const active = i < lit;
        r.setAttribute("stroke", active ? col : "#233855");
        r.setAttribute("stroke-width", active ? 3 : 1.2);
        r.setAttribute("opacity", active ? 0.95 : 0.45);
      });
      if (targetGroupRef.current) targetGroupRef.current.setAttribute("opacity", Math.max(0, 1 - distT / 900));

      /* verrouillage */
      if (distT < LOCK_RADIUS) {
        lock = Math.min(1, lock + dt / LOCK_MS);
        if (lockBarRef.current) lockBarRef.current.setAttribute("width", 312 * lock);
        if (lockGroupRef.current) lockGroupRef.current.setAttribute("opacity", "1");
        if (lock >= 1 && !isDone) {
          isDone = true;
          setDone(true);
          setTimeout(() => { onLock?.(); onClose?.(); }, 600);
        }
      } else {
        lock = 0;
        if (lockBarRef.current) lockBarRef.current.setAttribute("width", 0);
        if (lockGroupRef.current) lockGroupRef.current.setAttribute("opacity", "0");
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [whirls, target, onClose, onLock]);

  /* Deformation "gravitationnelle" : chaque tourbillon attire les points
     alentours vers son centre, avec un rayon d'influence 2.2*w.r et une
     force plafonnee pour eviter les singularites. */
  const warp = useMemo(() => (x, y) => {
    let dx = 0, dy = 0;
    for (const w of whirls) {
      const rx = x - w.x, ry = y - w.y;
      const d2 = rx * rx + ry * ry;
      const d = Math.sqrt(d2) || 1;
      const R = w.r * 2.4;
      if (d > R) continue;
      /* Chute progressive au bord + saturation au coeur. */
      const t = 1 - d / R;                       // 0 (bord) -> 1 (centre)
      const pull = Math.min(0.75, t * t * 1.6) * w.r * 0.55;
      dx -= (rx / d) * pull;
      dy -= (ry / d) * pull;
    }
    return [x + dx, y + dy];
  }, [whirls]);
  warpRef.current = warp;

  /* Monde statique memoise : grille (deformee) + tourbillons + noeud. */
  const worldStatic = useMemo(() => {
    const c1 = iso(-WORLD, -WORLD), c2 = iso(WORLD, -WORLD), c3 = iso(WORLD, WORLD), c4 = iso(-WORLD, WORLD);
    const diamond = `M${c1.sx} ${c1.sy} L${c2.sx} ${c2.sy} L${c3.sx} ${c3.sy} L${c4.sx} ${c4.sy} Z`;

    /* Trace une polyligne monde -> iso avec deformation, en la coupant
       chaque fois que l'epoque change (couleur d'epoque par tronçon).
       N = GRID_N pour que les lignes visibles correspondent EXACTEMENT
       aux cases sur lesquelles se deplace le joueur. */
    const N = GRID_N;
    const SUB = 4;            // sous-echantillons par cellule (lignes plus lisses = joueur pile dessus)
    const projectSample = (wx, wy) => {
      const [xw, yw] = warp(wx, wy);
      return iso(xw, yw);
    };
    const buildColoredLine = (ax, ay, bx, by, keyBase) => {
      const out = [];
      const steps = N * SUB;
      let curEra = eraIndexForX(ax);
      let curPts = [];
      const flush = (i) => {
        if (curPts.length >= 2) {
          out.push(
            <polyline key={`${keyBase}_${i}`} points={curPts.join(" ")}
              fill="none" stroke={ERAS[curEra].color} strokeWidth="1.3" opacity="0.55" />
          );
        }
        curPts = [];
      };
      for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        const wx = ax + (bx - ax) * u;
        const wy = ay + (by - ay) * u;
        const e = eraIndexForX(wx);
        const p = projectSample(wx, wy);
        if (e !== curEra && curPts.length > 0) {
          curPts.push(`${p.sx.toFixed(1)},${p.sy.toFixed(1)}`); // finit le troncon
          flush(i);
          curEra = e;
        }
        curPts.push(`${p.sx.toFixed(1)},${p.sy.toFixed(1)}`);
      }
      flush("end");
      return out;
    };
    const grid = [];
    for (let i = 0; i <= N; i++) {
      const t = -WORLD + (i * WORLD * 2) / N;
      grid.push(...buildColoredLine(t, -WORLD, t, WORLD, `v${i}`));
      grid.push(...buildColoredLine(-WORLD, t, WORLD, t, `h${i}`));
    }

    /* Carte du monde stylisee en fond : quelques masses continentales
       en forme de blobs organiques, iso-projetees + warpees, avec une
       ombre decalee vers le bas pour l'effet de plateau 3D. */
    /* Continents definis pour WORLD=2400 puis mis a l'echelle du plateau. */
    const CS = WORLD / 2400;
    const CONTINENTS = [
      { cx: -1650 * CS, cy: -750 * CS, rx: 550 * CS, ry: 380 * CS, seed: 0.4 },
      { cx: -1350 * CS, cy:  650 * CS, rx: 320 * CS, ry: 460 * CS, seed: 1.2 },
      { cx:  -100 * CS, cy: -350 * CS, rx: 260 * CS, ry: 220 * CS, seed: 2.1 },
      { cx:   150 * CS, cy:  550 * CS, rx: 340 * CS, ry: 470 * CS, seed: 3.0 },
      { cx:   950 * CS, cy: -450 * CS, rx: 620 * CS, ry: 420 * CS, seed: 4.4 },
      { cx:  1500 * CS, cy:  800 * CS, rx: 340 * CS, ry: 200 * CS, seed: 5.7 },
    ];
    const blobPath = (c, dyLift = 0) => {
      const N = 28;
      const pts = [];
      for (let i = 0; i <= N; i++) {
        const a = (i / N) * Math.PI * 2;
        const w = 0.72 + 0.32 * Math.sin(a * 3 + c.seed) + 0.15 * Math.sin(a * 5 + c.seed * 1.3);
        const wx = c.cx + Math.cos(a) * c.rx * w;
        const wy = c.cy + Math.sin(a) * c.ry * w;
        const [xw, yw] = warp(wx, wy);
        const p = iso(xw, yw);
        pts.push(`${p.sx.toFixed(1)},${(p.sy - dyLift).toFixed(1)}`);
      }
      return "M" + pts.join(" L") + " Z";
    };

    /* Points d'intersection de la grille (deformes par la warp). Rendent
       les noeuds visuellement solidaires des lignes apparentes. */
    const gridDots = [];
    for (let i = 0; i <= N; i++) {
      for (let j = 0; j <= N; j++) {
        const wx0 = -WORLD + (i * WORLD * 2) / N;
        const wy0 = -WORLD + (j * WORLD * 2) / N;
        const [wx, wy] = warp(wx0, wy0);
        const p = iso(wx, wy);
        gridDots.push(
          <circle key={`dot${i}_${j}`} cx={p.sx.toFixed(1)} cy={p.sy.toFixed(1)} r="1.4"
            fill={ERAS[eraIndexForX(wx0)].color} opacity="0.55" />
        );
      }
    }

    return (
      <>
        <path d={diamond} fill="#1a2a48" opacity="0.55" />

        {/* Carte du monde (fond) : ombre + facette du dessus */}
        <g opacity="0.55">
          {CONTINENTS.map((c, i) => (
            <path key={`sh${i}`} d={blobPath(c, 0)} fill="#0a1830" opacity="0.9" />
          ))}
          {CONTINENTS.map((c, i) => (
            <path key={`cn${i}`} d={blobPath(c, 8)} fill="#25436a" stroke="#3a6494" strokeWidth="1.2" />
          ))}
        </g>

        <g fill="none">{grid}</g>
        <g>{gridDots}</g>
        <path d={diamond} fill="none" stroke="#7fb0e0" strokeWidth="3" strokeDasharray="12 8" opacity="0.9" />

        {/* Reperes de dates : petits, flottants, coleur de l'epoque. */}
        {DATE_MARKERS.map((m, i) => {
          const [wx, wy] = warp(m.x, m.y);
          const p = iso(wx, wy);
          const col = ERAS[eraIndexForX(m.x)].color;
          const dur = 3.6 + (i % 5) * 0.4;
          const amp = 3 + (i % 3);
          return (
            <g key={`d${i}`} transform={`translate(${p.sx} ${p.sy})`} opacity="0.9">
              <animateTransform attributeName="transform" type="translate"
                values={`${p.sx} ${p.sy}; ${p.sx} ${p.sy - amp}; ${p.sx} ${p.sy}`}
                dur={`${dur}s`} repeatCount="indefinite" />
              {m.tick && <line x1="0" y1="-7" x2="0" y2="0" stroke={col} strokeWidth="1" opacity="0.75" />}
              <text x="3" y={m.tick ? -2 : 2} fontSize="9" fontWeight="600"
                fill={col} letterSpacing="0.5"
                style={{ paintOrder: "stroke", stroke: "#0a1224", strokeWidth: 2.4, strokeLinejoin: "round" }}>
                {m.text}
              </text>
            </g>
          );
        })}

        {whirls.map((w, i) => {
          const c = iso(w.x, w.y);
          return (
            <g key={i} transform={`translate(${c.sx} ${c.sy})`}>
              <g>
                <animateTransform attributeName="transform" type="rotate" values={`0; ${360 * w.dir}`} dur={`${5 + (i % 4)}s`} repeatCount="indefinite" />
                {[0.35, 0.6, 0.85, 1].map((k, j) => (
                  <ellipse key={j} rx={w.r * k * ISO_X} ry={w.r * k * ISO_Y * 2.2} fill="none" stroke="#c8a8f0" strokeWidth="2" opacity={0.7 - j * 0.13} />
                ))}
              </g>
              <circle r="5" fill="#e8d8ff" />
            </g>
          );
        })}

        {(() => {
          const [tx, ty] = warp(target.x, target.y);
          const c = iso(tx, ty);
          const col = target.era.color;
          return (
            <g ref={targetGroupRef} transform={`translate(${c.sx} ${c.sy})`}>
              {[60, 42, 26].map((r, i) => (
                <ellipse key={i} rx={r * ISO_X} ry={r * ISO_Y * 2.2} fill="none" stroke={col} strokeWidth="2.4">
                  <animate attributeName="opacity" values="0.2;0.95;0.2" dur={`${1.6 + i * 0.4}s`} repeatCount="indefinite" />
                </ellipse>
              ))}
              <circle r="10" fill="#ffffff" stroke={col} strokeWidth="2.2" />
              {/* Etiquette du tableau suivant, avec halo pour la lisibilite. */}
              <g transform="translate(28 -14)">
                <rect x="-4" y="-16" width={target.label.length * 8.6 + 40} height="26"
                  rx="13" fill="#0e1a30" stroke={col} strokeWidth="1.4" opacity="0.92" />
                <circle cx="10" cy="-3" r="5" fill={col} />
                <text x="24" y="1" fontSize="13" fontWeight="700" fill="#f5faff" letterSpacing="1">
                  {target.label}
                </text>
              </g>
            </g>
          );
        })()}
      </>
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whirls, target, warp]);

  return (
    <div onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "linear-gradient(180deg,#2a3a58 0%,#14203a 65%,#0a1224 100%)", overflow: "hidden" }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ position: "absolute", inset: 0, color: "#e8eef5", fontFamily: "ui-monospace,monospace" }}>
        <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
          <g ref={cameraRef} transform={`translate(${VW / 2} ${VH / 2}) scale(${ZOOM})`}>
            {worldStatic}
            {/* Trainee rouge du tachyon (les segments sont ajoutes en direct) */}
            <g ref={trailGroupRef} />

            {/* Faux noeuds temporels : apparaissent et disparaissent */}
            {decoys.map((d) => {
              const [wx, wy] = warpRef.current(d.x, d.y);
              const p = iso(wx, wy);
              return (
                <g key={d.id} transform={`translate(${p.sx} ${p.sy})`}>
                  <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.15;0.75;1"
                    dur={`${d.life}ms`} repeatCount="1" fill="freeze" />
                  {[38, 24].map((r, i) => (
                    <ellipse key={i} rx={r * ISO_X} ry={r * ISO_Y * 2.2} fill="none"
                      stroke={d.era.color} strokeWidth="1.6" opacity="0.5" />
                  ))}
                  <circle r="6" fill={d.era.color} opacity="0.7" />
                </g>
              );
            })}
            {/* Les 4 tachyons rouges (un par angle) */}
            {Array.from({ length: TACHYON_COUNT }).map((_, i) => (
              <g key={`t${i}`} ref={(el) => (tachyonRefs.current[i] = el)}>
                <ellipse rx="16" ry="8" fill="none" stroke="#ff2a4a" strokeWidth="1.6" opacity="0.7">
                  <animate attributeName="rx" values="10;22;10" dur="1.2s" repeatCount="indefinite" begin={`${i * 0.25}s`} />
                  <animate attributeName="ry" values="5;11;5" dur="1.2s" repeatCount="indefinite" begin={`${i * 0.25}s`} />
                  <animate attributeName="opacity" values="0.7;0.15;0.7" dur="1.2s" repeatCount="indefinite" begin={`${i * 0.25}s`} />
                </ellipse>
                <circle r="10" fill="#ff2a4a" stroke="#480010" strokeWidth="2" />
                <circle r="4" fill="#ffd0d8" />
              </g>
            ))}
            <g ref={playerRef}>
              <ellipse cy="8" rx="16" ry="5" fill="#000" opacity="0.5" />
              <circle r="11" fill="#7fffb0" stroke="#0e2a1a" strokeWidth="2" />
              <ellipse rx="20" ry="10" fill="none" stroke="#7fffb0" strokeWidth="1.6" opacity="0.6">
                <animate attributeName="rx" values="14;26;14" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="ry" values="7;13;7" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0;0.6" dur="1.8s" repeatCount="indefinite" />
              </ellipse>
            </g>
          </g>

          {/* HUD boussole : 5 arcs concentriques orientes vers la cible */}
          <g transform={`translate(${VW - 140} 140)`}>
            <circle r="96" fill="#0e1a30" stroke="#7fb0e0" strokeWidth="1.6" opacity="0.9" />
            <g ref={needleRef}>
              {/* Arcs de +/-40 deg centres sur la direction de la cible.
                  chord = 2 * r * sin(40 deg) ; on trace un arc SVG. */}
              {[0, 1, 2, 3, 4].map((k) => {
                const r = 16 + (k + 1) * 12;
                const a = (40 * Math.PI) / 180;
                const x1 = r * Math.cos(-a), y1 = r * Math.sin(-a);
                const x2 = r * Math.cos( a), y2 = r * Math.sin( a);
                return (
                  <path key={k} ref={(el) => (ringsRef.current[k] = el)}
                    d={`M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`}
                    fill="none" stroke="#233855" strokeWidth="1.2" opacity="0.45" strokeLinecap="round" />
                );
              })}
              {/* fleche + rivet au centre */}
              <path d="M0 0 L76 0 L68 -5 M76 0 L68 5" stroke="#ffe08a" strokeWidth="3" fill="none" strokeLinecap="round" />
              <circle r="5" fill="#ffe08a" />
            </g>
            <text y="122" textAnchor="middle" fontSize="12" letterSpacing="2" fill="#a8c8ff">PROXIMITE</text>
            <text y="-114" textAnchor="middle" fontSize="11" letterSpacing="2" fill="#a8c8ff">BOUSSOLE TEMPORELLE</text>
          </g>

          {/* barre de verrouillage */}
          <g ref={lockGroupRef} transform={`translate(${VW / 2} 50)`} opacity="0">
            <rect x="-160" y="-12" width="320" height="24" rx="4" fill="#0e1a30" stroke="#7fffb0" strokeWidth="1.4" />
            <rect ref={lockBarRef} x="-156" y="-9" width="0" height="18" rx="3" fill="#7fffb0" />
            <text y="-20" textAnchor="middle" fontSize="14" fontWeight="700" fill="#7fffb0" letterSpacing="3">VERROUILLAGE…</text>
          </g>
          {done && (
            <g transform={`translate(${VW / 2} 80)`}>
              <text textAnchor="middle" fontSize="34" fontWeight="800" fill="#7fffb0" letterSpacing="6">✓ NŒUD VERROUILLÉ</text>
            </g>
          )}
          {caught && (
            <>
              <rect x="0" y="0" width={VW} height={VH} fill="#3a0010" opacity="0.55" />
              <g transform={`translate(${VW / 2} ${VH / 2})`}>
                <text textAnchor="middle" fontSize="42" fontWeight="800" fill="#ff5266" letterSpacing="6">⚠ TACHYONS ROUGES ⚠</text>
                <text y="42" textAnchor="middle" fontSize="18" fill="#ffd0d8" letterSpacing="3">La ligne temporelle est coupée</text>
              </g>
            </>
          )}

          <text x="24" y={VH - 24} fontSize="12" fill="#a8c8ff" letterSpacing="2">
            ↑ ↓ ← →  ou  W A S D   ·   ESPACE = frein   ·   ESC pour quitter
          </text>


          {/* mini-map */}
          <g transform={`translate(${VW - 170} ${VH - 170})`}>
            <rect x="0" y="0" width="150" height="150" fill="#0e1a30" stroke="#7fb0e0" strokeWidth="1.4" opacity="0.9" />
            <text x="75" y="14" textAnchor="middle" fontSize="9" fill="#a8c8ff" letterSpacing="2">CARTE</text>
            <g transform="translate(75 80)">
              {whirls.map((w, i) => (
                <circle key={i} cx={(w.x / WORLD) * 60} cy={(w.y / WORLD) * 60} r={(w.r / WORLD) * 60 + 1} fill="none" stroke="#c8a8f0" strokeWidth="0.6" opacity="0.6" />
              ))}
              <circle cx={(target.x / WORLD) * 60} cy={(target.y / WORLD) * 60} r="3" fill="#ffe08a" />
              {Array.from({ length: TACHYON_COUNT }).map((_, i) => (
                <circle key={`tm${i}`} ref={(el) => (tachyonMiniRefs.current[i] = el)} cx="0" cy="0" r="2.4" fill="#ff2a4a" />
              ))}
              <circle ref={minimapPlayerRef} cx="0" cy="0" r="2.4" fill="#7fffb0" />
              <rect x="-62" y="-62" width="124" height="124" fill="none" stroke="#7fb0e0" strokeWidth="0.6" strokeDasharray="3 3" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
