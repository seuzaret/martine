import { createContext, useContext, useRef, useState } from "react";

/* ============================================================
   MOTEUR — Glisser-déposer (Pointer Events)
   ============================================================
   Pourquoi les Pointer Events et pas l'API HTML5 "draggable" ?
   → draggable ne fonctionne pas au doigt sur tablette.
   Les Pointer Events unifient souris, doigt et stylet.

   Fonctionnement :
   - Chaque élément de l'inventaire reçoit les poignées via
     dragProps(id) : appui → seuil de 8 px → le glisser démarre.
   - Un "fantôme" (l'emoji agrandi + ombre) suit le pointeur.
   - Les cibles possibles portent un attribut data-drop :
       "item:xxx"  → un autre élément de l'inventaire
       "hot:xxx"   → un objet du décor (zone cliquable)
       "slot:0/1"  → un emplacement du creuset
       "crucible"  → la zone creuset entière
   - Au relâchement : onDrop(source, cible) est appelé,
     sinon le fantôme rebondit vers sa place d'origine.

   Alternative sans glisser (souris au vidéoprojecteur, clavier) :
   - un tap/clic sélectionne l'élément (halo doré),
   - un second tap sur une cible tente la combinaison,
   - un tap sur le même élément le désélectionne.
   Au clavier : Tab/flèches pour naviguer, Entrée pour
   sélectionner puis déposer (les cibles sont des boutons).
   ============================================================ */

const DragCtx = createContext(null);

/** À utiliser dans les composants qui veulent réagir au glisser
    (inventaire, creuset, zones du décor). */
export const useDrag = () => useContext(DragCtx);

export function DragProvider({ items, onDrop, children }) {
  const [dragId, setDragId] = useState(null);     // élément en cours de glisser
  const [hover, setHover] = useState(null);       // clé data-drop survolée
  const [selected, setSelected] = useState(null); // sélection par tap/clavier
  const ghostRef = useRef(null);
  const info = useRef(null); // détail du geste en cours
  const pos = useRef(null);  // dernière position du pointeur

  /* Quelle cible se trouve sous le pointeur ? */
  const findDrop = (x, y, selfId) => {
    const el = document.elementFromPoint(x, y);
    const key = el?.closest?.("[data-drop]")?.getAttribute("data-drop") || null;
    return key === `item:${selfId}` ? null : key; // pas de dépôt sur soi-même
  };

  const applyGhost = (el) => {
    if (el && pos.current) {
      el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) scale(1.15)`;
    }
  };

  /* Retour en place avec un petit rebond quand le dépôt échoue */
  const bounceBack = (d) => {
    const g = ghostRef.current;
    if (g && d.rect) {
      g.style.transition = "transform .3s cubic-bezier(.3,1.6,.5,1), opacity .3s ease";
      g.style.transform = `translate(${d.rect.left + d.rect.width / 2}px, ${d.rect.top + d.rect.height / 2}px) translate(-50%, -50%) scale(0.6)`;
      g.style.opacity = "0.35";
    }
    setTimeout(() => { setDragId(null); setHover(null); }, 300);
  };

  /* Tap (ou Entrée) sur un élément de l'inventaire.
     `point` : position du geste, pour les effets visuels. */
  const tapItem = (id, point) => {
    if (!selected) { setSelected(id); return; }
    if (selected === id) { setSelected(null); return; }
    const src = selected;
    setSelected(null);
    onDrop(src, `item:${id}`, point);
  };

  /* Tap (ou Entrée) sur une cible (emplacement, objet du décor…).
     Renvoie true si un élément sélectionné a été déposé. */
  const tapTarget = (key, point) => {
    if (!selected) return false;
    const src = selected;
    setSelected(null);
    onDrop(src, key, point);
    return true;
  };

  /* Poignées à poser sur chaque élément déplaçable de l'inventaire */
  const dragProps = (id) => ({
    onPointerDown: (e) => {
      /* capture : le glisser ne "décroche" pas même si le doigt sort du bouton */
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* pointeur simulé */ }
      info.current = { id, x0: e.clientX, y0: e.clientY, moved: false, rect: e.currentTarget.getBoundingClientRect() };
    },
    onPointerMove: (e) => {
      const d = info.current;
      if (!d || d.id !== id) return;
      if (!d.moved && Math.hypot(e.clientX - d.x0, e.clientY - d.y0) > 8) {
        d.moved = true;
        setDragId(id);
      }
      if (d.moved) {
        pos.current = { x: e.clientX, y: e.clientY };
        applyGhost(ghostRef.current);
        setHover(findDrop(e.clientX, e.clientY, id));
      }
    },
    onPointerUp: (e) => {
      const d = info.current;
      info.current = null;
      if (!d) return;
      if (d.moved) {
        d.justDragged = true;
        suppressClick.current = true;
        const key = findDrop(e.clientX, e.clientY, d.id);
        if (key) { setDragId(null); setHover(null); onDrop(d.id, key, { x: e.clientX, y: e.clientY }); }
        else bounceBack(d);
      }
      /* pas de mouvement → c'est un tap : on laisse l'événement click gérer
         (il couvre aussi la touche Entrée au clavier) */
    },
    onPointerCancel: () => { info.current = null; setDragId(null); setHover(null); },
    onClick: (e) => {
      if (suppressClick.current) { suppressClick.current = false; return; }
      const r = e.currentTarget.getBoundingClientRect();
      tapItem(id, { x: r.left + r.width / 2, y: r.top });
    },
  });
  const suppressClick = useRef(false);

  return (
    <DragCtx.Provider value={{ dragId, hover, selected, dragProps, tapItem, tapTarget, items }}>
      {children}
      {/* le fantôme qui suit le doigt */}
      {dragId && (
        <div
          ref={(el) => { ghostRef.current = el; applyGhost(el); }}
          style={{
            position: "fixed", left: 0, top: 0, zIndex: 100, pointerEvents: "none",
            fontSize: 40, lineHeight: 1, filter: "drop-shadow(0 8px 10px rgba(0,0,0,0.55))",
            transform: "translate(-200px,-200px)",
          }}>
          {items[dragId]?.emoji}
        </div>
      )}
    </DragCtx.Provider>
  );
}
