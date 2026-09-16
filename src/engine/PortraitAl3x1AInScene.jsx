/* ============================================================
   MOTEUR — Portrait AL3X1A « dans le décor » (silhouette SVG).
   ------------------------------------------------------------
   Version SVG à intégrer DANS un <svg viewBox="0 0 1000 560">
   pour marquer AL3X1A à sa place trouvée : tunique grise,
   cheveux mi-longs, halo bleuté discret. Coordonnées relatives
   au groupe parent (translate déjà appliqué). ~80 px de haut.
   ============================================================ */
export default function PortraitAl3x1AInScene() {
  return (
    <g>
      {/* halo bleuté derrière la silhouette pour la repérer sans marqueur */}
      <ellipse cx="0" cy="0" rx="42" ry="52" fill="rgba(127,216,255,0.22)" />
      <ellipse cx="0" cy="0" rx="28" ry="38" fill="rgba(127,216,255,0.32)" />
      {/* Corps : tunique de voyage grise */}
      <path d="M-14 40 L-14 -6 Q-14 -14 -6 -14 L6 -14 Q14 -14 14 -6 L14 40 Z" fill="#606878" stroke="#3a4048" strokeWidth="1" />
      {/* insigne chronaute dorée */}
      <circle cx="-8" cy="0" r="2.4" fill="#c8a848" stroke="#5a4020" strokeWidth="0.4" />
      {/* cou + tête */}
      <ellipse cx="0" cy="-18" rx="4" ry="3" fill="#d0a888" />
      <ellipse cx="0" cy="-26" rx="9" ry="10" fill="#d0a888" stroke="#5a3818" strokeWidth="0.6" />
      {/* cheveux mi-longs androgynes */}
      <path d="M-9 -30 Q-9 -38 0 -38 Q9 -38 9 -30 L9 -22 Q6 -20 0 -22 Q-6 -20 -9 -22 Z" fill="#4a3828" />
      {/* yeux */}
      <circle cx="-3" cy="-26" r="0.9" fill="#3a2818" />
      <circle cx="3" cy="-26" r="0.9" fill="#3a2818" />
      {/* petit sourire */}
      <path d="M-2 -22 Q0 -21 2 -22" stroke="#5a2818" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    </g>
  );
}
