import { useDrag } from "./DragDrop.jsx";

/* ============================================================
   MOTEUR — Zone cliquable invisible dans un décor SVG
   Les objets sont dessinés dans le décor, sans halo permanent.
   - `reveal` (bouton 👁) : cercle pointillé + libellé 2 s.
   - `item` : identifiant de l'objet représenté. La zone devient
     alors une CIBLE de dépôt : on peut y glisser un élément de
     l'inventaire (ex. charbon → paroi) ; elle s'illumine en vert
     au survol pendant un glisser. Un tap avec un élément
     sélectionné tente aussi la combinaison.
   ============================================================ */

/* Dernière position cliquée (centre de la zone, à l'écran). App s'en sert
   pour ancrer la bulle de dialogue à côté du personnage — comme ça les
   décors n'ont RIEN à transmettre : un simple `action("x")` suffit. */
export const lastHotspotClick = { x: 0, y: 0 };

export default function Hotspot({ cx, cy, r = 46, onClick, reveal, label, item, support: supportProp }) {
  const drag = useDrag();
  const hovered = item && drag?.hover === `hot:${item}`;
  /* Un support est reconnu AUTOMATIQUEMENT via le data.js (item.support),
     sans rien changer dans les décors ; le prop `support` reste possible
     pour forcer le cas à la main si besoin. */
  const support = supportProp || (item && drag?.items?.[item]?.support);
  /* Deux familles de zones, deux couleurs (l'élève apprend à les distinguer) :
     - un OBJET à ramasser / une cible normale → VERT / jaune ;
     - un SUPPORT fixe (paroi, feu, four : on ne le ramasse pas, on lui
       APPORTE un objet) → CYAN. */
  const cHi = support ? "#7fd8ff" : "#5eff9e";   // survol pendant un glisser
  const cRev = support ? "#7fd8ff" : "#ffe28a";  // révélation (bouton 👁)

  const handleClick = (e) => {
    /* un élément sélectionné (tap/clavier) déposé sur cet objet ? */
    if (item && drag?.tapTarget(`hot:${item}`, { x: e.clientX, y: e.clientY })) return;
    /* on mémorise la position À L'ÉCRAN du centre de la zone (pour ancrer une
       bulle) et on la transmet aussi à onClick. Les onClick qui n'en ont pas
       besoin (ramasser un objet) l'ignorent simplement. */
    const rect = e.currentTarget.getBoundingClientRect();
    const pt = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    lastHotspotClick.x = pt.x; lastHotspotClick.y = pt.y;
    onClick?.(pt);
  };

  return (
    <g onClick={handleClick} style={{ cursor: "pointer" }}>
      <circle cx={cx} cy={cy} r={r} fill="transparent" {...(item ? { "data-drop": `hot:${item}` } : {})} />
      {/* pointerEvents:none → ces décorations ne doivent jamais
          intercepter les clics ni les dépôts destinés à la zone */}
      {hovered && (
        <circle cx={cx} cy={cy} r={r * 0.85} fill={support ? "rgba(127,216,255,0.12)" : "rgba(94,255,158,0.10)"} stroke={cHi} strokeWidth="3.5" opacity="0.95" style={{ filter: `drop-shadow(0 0 10px ${cHi})`, pointerEvents: "none" }} />
      )}
      {reveal && (
        <>
          {/* un support garde un trait PLEIN (une surface où l'on dépose) ;
              un objet à ramasser reste en pointillés. */}
          <circle cx={cx} cy={cy} r={r * 0.8} fill="none" stroke={cRev} strokeWidth="3" strokeDasharray={support ? "none" : "6 5"} opacity="0.9" style={{ pointerEvents: "none" }} />
          {label && <text x={cx} y={cy - r * 0.8 - 8} textAnchor="middle" fontSize="17" fill={cRev} fontFamily="ui-monospace,monospace" style={{ paintOrder: "stroke", stroke: "#000", strokeWidth: 3, pointerEvents: "none" }}>{label}</text>}
        </>
      )}
    </g>
  );
}
