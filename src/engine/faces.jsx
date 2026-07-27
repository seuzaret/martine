/* ============================================================
   VISAGES — briques réutilisables pour les portraits « gros plan »
   ------------------------------------------------------------
   Partagé par les portraits de tous les chapitres (ch.2, ch.3…)
   pour éviter la duplication. Voir chapters/NN/scenes/portraits.jsx.
   ============================================================ */

/* Bouche qui « parle » : la lèvre haute reste fixe ; l'ouverture et la
   lèvre basse s'animent (le personnage cause dans son gros plan). Réglable
   en position (y), largeur (w), couleurs, et sourire éventuel.
   (L'animation `talk` est définie dans styles/global.css.) */
export function Mouth({ y = 180, dark = "#7a4a34", light = "#b0785a", w = 14, smile = false }) {
  const corner = smile ? y - 4 : y;      // coins relevés si sourire
  const dip = smile ? y + 9 : y + 4;     // creux central de la lèvre haute
  return (
    <g>
      <path d={`M${150 - w} ${corner} Q150 ${dip} ${150 + w} ${corner}`} stroke={dark} strokeWidth="3" fill="none" strokeLinecap="round" />
      <g style={{ transformOrigin: `150px ${y + 1}px`, transformBox: "view-box", animation: "talk 0.6s ease-in-out infinite" }}>
        <path d={`M${150 - w + 3} ${y + 1} Q150 ${y + 9} ${150 + w - 3} ${y + 1} Q150 ${y + 4} ${150 - w + 3} ${y + 1} Z`} fill="#5a2a20" />
        <path d={`M${150 - w + 4} ${y + 7} Q150 ${y + 11} ${150 + w - 4} ${y + 7}`} stroke={light} strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.6" />
      </g>
    </g>
  );
}
