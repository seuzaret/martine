import { useRef, useEffect } from "react";
import { ParallaxRoot } from "./Parallax.jsx";

/* ============================================================
   MOTEUR — Cadre d'affichage d'un tableau
   Affiche le tableau courant, les flèches de navigation ‹ ›
   et la mini-carte (points) en bas. Ne connaît pas le contenu :
   il reçoit la liste des tableaux du chapitre en props.
   Le cadre est un ParallaxRoot : il suit la souris (ou le
   gyroscope) et fait glisser les couches <PLayer> des décors.
   ============================================================ */

const navBtn = (side) => ({
  position: "absolute", top: "50%", [side]: 8, transform: "translateY(-50%)",
  width: 40, height: 56, borderRadius: 12, border: "1px solid rgba(255,255,255,0.25)",
  background: "rgba(0,0,0,0.38)", color: "#fff", fontSize: 26, cursor: "pointer",
  backdropFilter: "blur(2px)", lineHeight: 1,
});

export default function Scene({ scenes, tab, onTab, sceneProps, sparkle }) {
  const Current = scenes[tab].Component;

  /* sens du travelling : on arrive par la droite si on avance,
     par la gauche si on recule */
  const prev = useRef(tab);
  const dir = tab >= prev.current ? "Right" : "Left";
  useEffect(() => { prev.current = tab; }, [tab]);

  return (
    /* remplit la hauteur donnée par le parent ; le dessin SVG
       (preserveAspectRatio "slice") recadre proprement si besoin */
    <ParallaxRoot style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "2px solid #2a3648", height: "100%", width: "100%", boxShadow: sparkle ? "0 0 50px rgba(94,255,158,0.6)" : "0 6px 24px rgba(0,0,0,0.5)", transition: "box-shadow .4s" }}>
      {/* key={tab} : chaque tableau entre avec son animation de travelling */}
      <div key={tab} style={{ position: "absolute", inset: 0, animation: `sceneFrom${dir} .5s ease-out` }}>
        <Current {...sceneProps} />
      </div>

      {/* flèches de déplacement */}
      {tab > 0 && (
        <button onClick={() => onTab(tab - 1)} style={navBtn("left")} title={scenes[tab - 1].name}>‹</button>
      )}
      {tab < scenes.length - 1 && (
        <button onClick={() => onTab(tab + 1)} style={navBtn("right")} title={scenes[tab + 1].name}>›</button>
      )}

      {/* mini-carte : un point par lieu */}
      <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6, background: "rgba(0,0,0,0.4)", padding: "5px 10px", borderRadius: 20 }}>
        {scenes.map((s, i) => (
          <button key={s.id} onClick={() => onTab(i)} title={s.name}
            style={{ width: 9, height: 9, borderRadius: "50%", border: "none", cursor: "pointer", background: i === tab ? "#ffd166" : "rgba(255,255,255,0.35)", padding: 0 }} />
        ))}
      </div>
    </ParallaxRoot>
  );
}
