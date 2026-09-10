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
const WORLD = 2400;
const LOCK_RADIUS = 100;   // un peu plus large : on s'arrete sur une case
const LOCK_MS = 900;
const NUM_WHIRLS = 10;
const GRID_N = 20;                       // 20 subdivisions
const STEP = (WORLD * 2) / GRID_N;       // 240 unites monde par case
const CELL_MS = 260;                     // temps pour traverser une case
const TACHYON_CELL_MS = 340;             // le tachyon rouge, un peu plus lent
const TACHYON_RANDOM = 0.15;             // chance d'un mouvement aleatoire

/* Angle iso plus doux : moins ecrase verticalement.
   sx = (x - y) * ISO_X ; sy = (x + y) * ISO_Y */
const ISO_X = 0.95;
const ISO_Y = 0.35;
const iso = (x, y) => ({ sx: (x - y) * ISO_X, sy: (x + y) * ISO_Y });

const rand = (min, max) => min + Math.random() * (max - min);

export function TemporalCompass({ onClose, onLock }) {
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
  const tachyonRef = useRef(null);          // <g> du tachyon rouge
  const trailGroupRef = useRef(null);       // <g> ou on append les segments rouges
  const tachyonMiniRef = useRef(null);      // point rouge sur la mini-carte
  const [done, setDone] = useState(false);
  const [caught, setCaught] = useState(false);

  const { target, whirls } = useMemo(() => {
    const snap = (v) => Math.round(v / STEP) * STEP;
    const angle = Math.random() * Math.PI * 2;
    const dist = rand(1400, 2100);
    let tx = snap(Math.cos(angle) * dist), ty = snap(Math.sin(angle) * dist);
    if (tx === 0 && ty === 0) tx = STEP * 6;
    return {
      target: { x: tx, y: ty },
      whirls: Array.from({ length: NUM_WHIRLS }, () => ({
        x: rand(-WORLD + 300, WORLD - 300),
        y: rand(-WORLD + 300, WORLD - 300),
        r: rand(90, 160),
        dir: Math.random() < 0.5 ? 1 : -1,
      })),
    };
  }, []);

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
      const k = map(e.key); if (k) heldRef.current[k] = true;
    };
    const up = (e) => { const k = map(e.key); if (k) heldRef.current[k] = false; };
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
    const CELL_MAX = Math.floor(WORLD / STEP);

    /* --- Tachyon rouge : demarre sur un bord au hasard --- */
    const edgeSide = Math.floor(Math.random() * 4);
    let tcx, tcy;
    if (edgeSide === 0)      { tcx = -CELL_MAX; tcy = Math.floor(rand(-CELL_MAX, CELL_MAX + 1)); }
    else if (edgeSide === 1) { tcx = CELL_MAX;  tcy = Math.floor(rand(-CELL_MAX, CELL_MAX + 1)); }
    else if (edgeSide === 2) { tcy = -CELL_MAX; tcx = Math.floor(rand(-CELL_MAX, CELL_MAX + 1)); }
    else                     { tcy = CELL_MAX;  tcx = Math.floor(rand(-CELL_MAX, CELL_MAX + 1)); }
    let tFromX = tcx * STEP, tFromY = tcy * STEP;
    let tToX = tFromX, tToY = tFromY, tProg = 1;
    let tCurX = tFromX, tCurY = tFromY;
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

      /* Progression sur la case en cours */
      if (prog < 1) {
        prog = Math.min(1, prog + dt / CELL_MS);
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

        let d = dirFor(held);
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
          }
        }
      }

      /* --- Tachyon rouge : avance sur la grille, laisse un trait --- */
      if (!isCaught) {
        if (tProg < 1) {
          tProg = Math.min(1, tProg + dt / TACHYON_CELL_MS);
          tCurX = tFromX + (tToX - tFromX) * tProg;
          tCurY = tFromY + (tToY - tFromY) * tProg;
        }
        if (tProg >= 1) {
          const ccx = Math.round(tCurX / STEP), ccy = Math.round(tCurY / STEP);
          const d = tachyonChooseDir(ccx, ccy);
          if (d) {
            const nx = ccx + d.dx, ny = ccy + d.dy;
            addTrailSegment(ccx, ccy, nx, ny);
            tFromX = ccx * STEP; tFromY = ccy * STEP;
            tToX = nx * STEP;    tToY = ny * STEP;
            tCurX = tFromX;      tCurY = tFromY;
            tProg = 0;
          }
        }
        /* Render tachyon (warped iso). */
        if (tachyonRef.current) {
          const [wxT, wyT] = warpRef.current(tCurX, tCurY);
          const ptT = iso(wxT, wyT);
          tachyonRef.current.setAttribute("transform", `translate(${ptT.sx} ${ptT.sy})`);
        }
        if (tachyonMiniRef.current) {
          tachyonMiniRef.current.setAttribute("cx", (tCurX / WORLD) * 60);
          tachyonMiniRef.current.setAttribute("cy", (tCurY / WORLD) * 60);
        }
        /* Collision directe joueur / tachyon */
        if (Math.hypot(p.x - tCurX, p.y - tCurY) < STEP * 0.5) {
          isCaught = true; setCaught(true);
          setTimeout(() => onClose?.(), 1500);
        }
      }

      /* projection iso pour camera + joueur, avec la meme deformation
         que la grille pour rester "sur les lignes". */
      const [wx, wy] = warpRef.current(p.x, p.y);
      const psx = (wx - wy) * ISO_X;
      const psy = (wx + wy) * ISO_Y;
      if (cameraRef.current) cameraRef.current.setAttribute("transform", `translate(${VW / 2 - psx} ${VH / 2 - psy})`);
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

    /* Trace une polyligne monde -> iso, avec deformation, sur N+1 points. */
    const N = 20;             // subdivisions le long d'une ligne
    const SUB = 4;            // sous-echantillons par cellule pour lisser
    const seg = (a, b) => {
      const pts = [];
      const steps = N * SUB;
      for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        const wx = a[0] + (b[0] - a[0]) * u;
        const wy = a[1] + (b[1] - a[1]) * u;
        const [xw, yw] = warp(wx, wy);
        const p = iso(xw, yw);
        pts.push(`${p.sx.toFixed(1)},${p.sy.toFixed(1)}`);
      }
      return pts.join(" ");
    };
    const grid = [];
    for (let i = 0; i <= N; i++) {
      const t = -WORLD + (i * WORLD * 2) / N;
      grid.push(<polyline key={`v${i}`} points={seg([t, -WORLD], [t, WORLD])} />);
      grid.push(<polyline key={`h${i}`} points={seg([-WORLD, t], [WORLD, t])} />);
    }
    const axV = <polyline points={seg([0, -WORLD], [0, WORLD])} stroke="#7fd8ff" strokeWidth="1.6" opacity="0.55" fill="none" />;
    const axH = <polyline points={seg([-WORLD, 0], [WORLD, 0])} stroke="#7fd8ff" strokeWidth="1.6" opacity="0.55" fill="none" />;

    return (
      <>
        <path d={diamond} fill="#1a2a48" opacity="0.55" />
        <g stroke="#3f5f88" strokeWidth="1" fill="none" opacity="0.6">{grid}</g>
        {axH}{axV}
        <path d={diamond} fill="none" stroke="#7fb0e0" strokeWidth="3" strokeDasharray="12 8" opacity="0.9" />

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
          return (
            <g ref={targetGroupRef} transform={`translate(${c.sx} ${c.sy})`}>
              {[60, 42, 26].map((r, i) => (
                <ellipse key={i} rx={r * ISO_X} ry={r * ISO_Y * 2.2} fill="none" stroke="#ffe08a" strokeWidth="2.4">
                  <animate attributeName="opacity" values="0.2;0.95;0.2" dur={`${1.6 + i * 0.4}s`} repeatCount="indefinite" />
                </ellipse>
              ))}
              <circle r="10" fill="#fff2b8" />
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
          <g ref={cameraRef} transform={`translate(${VW / 2} ${VH / 2})`}>
            {worldStatic}
            {/* Trainee rouge du tachyon (les segments sont ajoutes en direct) */}
            <g ref={trailGroupRef} />
            {/* Le tachyon rouge lui-meme */}
            <g ref={tachyonRef}>
              <ellipse rx="16" ry="8" fill="none" stroke="#ff2a4a" strokeWidth="1.6" opacity="0.7">
                <animate attributeName="rx" values="10;22;10" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="ry" values="5;11;5" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0.15;0.7" dur="1.2s" repeatCount="indefinite" />
              </ellipse>
              <circle r="10" fill="#ff2a4a" stroke="#480010" strokeWidth="2" />
              <circle r="4" fill="#ffd0d8" />
            </g>
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

          {/* HUD boussole */}
          <g transform={`translate(${VW - 140} 140)`}>
            <circle r="96" fill="#0e1a30" stroke="#7fb0e0" strokeWidth="1.6" opacity="0.9" />
            {[0, 1, 2, 3, 4].map((k) => (
              <circle key={k} ref={(el) => (ringsRef.current[k] = el)} r={16 + (k + 1) * 12} fill="none" stroke="#233855" strokeWidth="1.2" opacity="0.45" />
            ))}
            <g ref={needleRef}>
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
                <text textAnchor="middle" fontSize="42" fontWeight="800" fill="#ff5266" letterSpacing="6">⚠ TACHYON ROUGE ⚠</text>
                <text y="42" textAnchor="middle" fontSize="18" fill="#ffd0d8" letterSpacing="3">La ligne temporelle est coupée</text>
              </g>
            </>
          )}

          <text x="24" y={VH - 24} fontSize="12" fill="#a8c8ff" letterSpacing="2">
            ↑ ↓ ← →  ou  W A S D   ·   deplacement de case en case le long des lignes   ·   ESC pour quitter
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
              <circle ref={tachyonMiniRef} cx="0" cy="0" r="2.4" fill="#ff2a4a" />
              <circle ref={minimapPlayerRef} cx="0" cy="0" r="2.4" fill="#7fffb0" />
              <rect x="-62" y="-62" width="124" height="124" fill="none" stroke="#7fb0e0" strokeWidth="0.6" strokeDasharray="3 3" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
