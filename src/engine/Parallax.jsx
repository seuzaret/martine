import { createContext, useContext, useRef, useEffect } from "react";

/* ============================================================
   MOTEUR — Parallaxe 2.5D
   ============================================================
   Donne de la profondeur aux tableaux sans 3D : le décor est
   découpé en COUCHES qui glissent à des vitesses différentes
   quand la souris survole la scène (ou quand la tablette
   s'incline, via le gyroscope).

   - <ParallaxRoot> : le cadre de la scène. Il écoute les
     mouvements et déplace directement les couches (aucun
     re-rendu React : c'est fluide même sur petite tablette).
   - <PLayer depth={1|2|3}> : une couche de décor, à placer
     DANS le SVG d'une scène. Plus depth est grand, plus la
     couche est proche et plus elle bouge.
       depth 0 (rien) : ciel, soleil — ne pas envelopper
       depth 1 : lointain (montagnes, fond de forêt)
       depth 2 : décor intermédiaire (falaise, rivière…)
       depth 3 : premier plan (sol, objets, personnages)
   - Chaque couche est très légèrement agrandie pour que ses
     bords ne se découvrent pas quand elle glisse.
   - Les ZONES CLIQUABLES restent hors couches : leur décalage
     maximal (≈15 px) est très inférieur au rayon des zones.
   - Respecte prefers-reduced-motion : parallaxe désactivée.
   ============================================================ */

const PCtx = createContext(null);

const REDUCED = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

export function ParallaxRoot({ children, style }) {
  const layers = useRef(new Map()); // élément <g> → profondeur

  /* x et y vont de −1 à 1 (position du pointeur / inclinaison) */
  const apply = (x, y) => {
    layers.current.forEach((depth, el) => {
      el.style.transform =
        `translate(${(x * 5 * depth).toFixed(1)}px, ${(y * 3 * depth).toFixed(1)}px) scale(${1 + depth * 0.012})`;
    });
  };

  /* gyroscope des tablettes : gamma = penché gauche/droite,
     beta = penché avant/arrière (≈40° quand on tient la tablette) */
  useEffect(() => {
    if (REDUCED) return;
    const onTilt = (e) => {
      if (e.gamma == null || e.beta == null) return;
      apply(
        Math.max(-1, Math.min(1, e.gamma / 25)),
        Math.max(-1, Math.min(1, (e.beta - 40) / 25))
      );
    };
    window.addEventListener("deviceorientation", onTilt);
    return () => window.removeEventListener("deviceorientation", onTilt);
  }, []);

  const value = {
    register: (el, depth) => layers.current.set(el, depth),
    unregister: (el) => layers.current.delete(el),
  };

  return (
    <div
      style={style}
      onPointerMove={REDUCED ? undefined : (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        apply(((e.clientX - r.left) / r.width - 0.5) * 2, ((e.clientY - r.top) / r.height - 0.5) * 2);
      }}
      onPointerLeave={REDUCED ? undefined : () => apply(0, 0)}
    >
      <PCtx.Provider value={value}>{children}</PCtx.Provider>
    </div>
  );
}

export function PLayer({ depth = 1, children }) {
  const ctx = useContext(PCtx);
  const elRef = useRef(null);
  const setEl = (el) => {
    if (elRef.current && ctx) ctx.unregister(elRef.current);
    elRef.current = el;
    if (el && ctx) ctx.register(el, depth);
  };
  return (
    <g ref={setEl} style={{ transition: "transform .4s cubic-bezier(.2,.8,.3,1)", willChange: "transform", transformOrigin: "50% 50%", transformBox: "view-box" }}>
      {children}
    </g>
  );
}
