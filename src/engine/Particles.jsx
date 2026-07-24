/* ============================================================
   MOTEUR — Volée de particules dorées
   S'affiche au point (x, y) de l'écran où la combinaison a eu
   lieu, puis s'estompe toute seule. CSS pur, aucune librairie.
   `big` : version amplifiée pour les messages (cristaux).
   Respecte prefers-reduced-motion (les animations globales
   sont désactivées dans global.css).
   ============================================================ */

const COLORS = ["#ffd166", "#ffe28a", "#f0b054", "#5eff9e"];

export default function Particles({ x, y, big = false }) {
  const n = big ? 26 : 12;
  const parts = Array.from({ length: n }, (_, i) => {
    const angle = (Math.PI * 2 * i) / n + Math.random() * 0.6;
    const dist = (big ? 95 : 55) * (0.5 + Math.random() * 0.9);
    return {
      dx: Math.cos(angle) * dist,
      dy: Math.sin(angle) * dist - 18, // léger biais vers le haut
      size: 3 + Math.random() * (big ? 6 : 4),
      color: COLORS[i % COLORS.length],
      delay: Math.random() * 0.12,
    };
  });
  return (
    <div style={{ position: "fixed", left: x, top: y, zIndex: 90, pointerEvents: "none" }}>
      {parts.map((p, i) => (
        <span key={i} style={{
          position: "absolute", left: -p.size / 2, top: -p.size / 2,
          width: p.size, height: p.size, borderRadius: "50%",
          background: p.color, boxShadow: `0 0 6px ${p.color}`,
          "--dx": `${p.dx}px`, "--dy": `${p.dy}px`,
          animation: `particleFly ${big ? 0.95 : 0.7}s ease-out ${p.delay}s forwards`,
        }} />
      ))}
    </div>
  );
}
