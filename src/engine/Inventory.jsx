import { useDrag } from "./DragDrop.jsx";

/* ============================================================
   MOTEUR — Barre d'inventaire (la besace)
   Deux dispositions, selon la place disponible (choisie par App) :
   - `vertical` : COLONNE à gauche du décor, sur les écrans larges.
     Le décor est en 16/9 : il y est bloqué par la hauteur, et l'espace
     sur les côtés est perdu. Y loger la besace rend ~38 % de surface
     au décor sur un 1366×768.
   - par défaut : BARRE en bas, sur tablette / écran étroit — le bas
     reste la zone du pouce.
   Dans les deux cas on combine en GLISSANT un élément sur un autre
   (ou sur un objet du décor), ou par TAP-TAP : un tap sélectionne
   (halo doré), un second tap sur la cible combine.
   Clavier : Tab/flèches pour naviguer, Entrée pour prendre puis
   déposer. `shake` : tremblement quand une combinaison échoue.
   Les éléments devenus inutiles sont retirés par le moteur
   (voir App.jsx) : la besace reste courte.
   ============================================================ */

export function InventoryBar({ items, inv, shake, vertical = false }) {
  const { dragId, hover, selected, dragProps } = useDrag();

  /* le panneau « cuir » de la besace (texture discrète + reliure) et les
     cases en creux, pour un vrai air d'inventaire sans singer Minecraft. */
  const CUIR = {
    backgroundImage: "repeating-linear-gradient(90deg, rgba(255,225,180,0.028) 0 1px, transparent 1px 6px), linear-gradient(180deg, #241a12, #160f09)",
    border: "1px solid #3a2c1c",
    boxShadow: "inset 0 1px 0 rgba(255,220,170,0.06), 0 3px 10px rgba(0,0,0,0.45)",
  };
  /* cases LÉGÈRES : une fine bordure claire + un léger relief, pas de creux
     appuyé (l'utilisatrice trouvait le biseau trop lourd). */
  const BISEAU = "inset 0 1px 0 rgba(255,236,206,0.07)";

  /* navigation au clavier : ← → (barre) ou ↑ ↓ (colonne) */
  const onKeyDown = (e) => {
    const suivant = vertical ? "ArrowDown" : "ArrowRight";
    const precedent = vertical ? "ArrowUp" : "ArrowLeft";
    if (e.key === suivant) e.currentTarget.nextElementSibling?.focus();
    if (e.key === precedent) e.currentTarget.previousElementSibling?.focus();
  };

  /* Une pastille d'objet : identique dans les deux dispositions, seule
     sa largeur change (elle remplit la colonne). */
  const Pastille = (id) => {
    const isSel = selected === id;
    const isHov = hover === `item:${id}`;
    return (
      <button key={id} {...dragProps(id)} data-drop={`item:${id}`}
        onKeyDown={onKeyDown}
        aria-pressed={isSel}
        title={items[id].desc}
        style={{
          /* zone de saisie ≥ 44×44 px (doigts d'enfants) */
          minWidth: vertical ? 0 : 64, minHeight: 54,
          width: vertical ? "100%" : undefined,
          flex: "0 0 auto",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2,
          background: isSel ? "#2e2616" : "#211a11",
          border: isHov ? "2px solid #5eff9e" : isSel ? "2px solid #ffd166" : "1px solid rgba(255,228,190,0.16)",
          boxShadow: isHov ? `${BISEAU}, 0 0 14px rgba(94,255,158,0.5)` : isSel ? `${BISEAU}, 0 0 12px rgba(255,209,102,0.45)` : BISEAU,
          transition: "border-color .15s, box-shadow .15s",
          borderRadius: 8, padding: "5px 9px", color: "#e8eef5",
          cursor: "grab", touchAction: "none",
          opacity: dragId === id ? 0.35 : 1,
          /* effet "pop" à ressort quand l'objet apparaît dans la besace */
          animation: "pop .45s cubic-bezier(.34,1.56,.64,1)",
        }}>
        <span style={{ fontSize: 23, lineHeight: 1 }}>{items[id].emoji}</span>
        <span style={{ fontSize: 9.5, textAlign: "center", lineHeight: 1.15, ...(vertical ? {} : { whiteSpace: "nowrap" }) }}>{items[id].name}</span>
      </button>
    );
  };

  /* ---------- COLONNE à gauche (écran large) ----------
     Occupe la hauteur restante de la colonne : App épingle le creuset
     juste en dessous, et la liste d'objets défile si besoin. */
  if (vertical) {
    return (
      <div style={{ ...CUIR, width: "100%", flex: "1 1 auto", display: "flex", flexDirection: "column", minHeight: 0, borderRadius: 12, padding: 8, WebkitUserSelect: "none", userSelect: "none", animation: shake ? "shake .5s" : "none" }}>
        <div style={{ fontSize: 10, letterSpacing: 1, color: "#c9a877", fontFamily: "ui-monospace,monospace", marginBottom: 6, textAlign: "center" }}>
          🎒 SAC ({inv.length})
        </div>
        {inv.length === 0 ? (
          <div style={{ fontSize: 11.5, color: "#7a879e", fontStyle: "italic", lineHeight: 1.4, textAlign: "center" }}>
            Vide. Observe les décors et touche ce qui te semble utile.
          </div>
        ) : (
          /* les objets s'empilent de haut en bas ; ça défile s'il y en a beaucoup */
          <div style={{ display: "flex", flexDirection: "column", gap: 7, overflowY: "auto", paddingRight: 2, minHeight: 0 }}>
            {inv.map(Pastille)}
          </div>
        )}
        {selected && (
          <div style={{ fontSize: 10, color: "#ffd166", fontFamily: "ui-monospace,monospace", marginTop: 6, textAlign: "center", lineHeight: 1.3 }}>
            {items[selected].name} en main : touche une cible…
          </div>
        )}
      </div>
    );
  }

  /* ---------- BARRE en bas (tablette / écran étroit) ---------- */
  return (
    <div style={{ ...CUIR, borderLeft: "none", borderRight: "none", borderBottom: "none", WebkitUserSelect: "none", userSelect: "none", animation: shake ? "shake .5s" : "none" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "6px 12px 8px" }}>
        <div style={{ fontSize: 10, letterSpacing: 1.5, color: "#c9a877", fontFamily: "ui-monospace,monospace", marginBottom: 5 }}>
          🎒 SAC ({inv.length}) — glisse un élément sur un autre ou sur le décor pour combiner
          {selected && <span style={{ color: "#ffd166" }}> · {items[selected].name} en main : touche une cible…</span>}
        </div>
        {inv.length === 0 ? (
          <div style={{ fontSize: 13, color: "#7a879e", fontStyle: "italic", padding: "8px 0 12px" }}>
            Vide. Observe les décors et touche ce qui te semble utile. Déplace-toi avec ‹ ›.
          </div>
        ) : (
          <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 4 }}>
            {inv.map(Pastille)}
          </div>
        )}
      </div>
    </div>
  );
}
