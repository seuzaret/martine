import { useState } from "react";
import BunkerAwake from "../chapters/jeu3/scenes/BunkerAwake.jsx";
import BunkerHub from "../chapters/jeu3/scenes/BunkerHub.jsx";
import BunkerChambre from "../chapters/jeu3/scenes/BunkerChambre.jsx";
import BunkerRumeurs from "../chapters/jeu3/scenes/BunkerRumeurs.jsx";
import BunkerArchives from "../chapters/jeu3/scenes/BunkerArchives.jsx";
import BunkerCantine from "../chapters/jeu3/scenes/BunkerCantine.jsx";
import BunkerInfirmerie from "../chapters/jeu3/scenes/BunkerInfirmerie.jsx";
import BunkerAtelier from "../chapters/jeu3/scenes/BunkerAtelier.jsx";
import BunkerChapelle from "../chapters/jeu3/scenes/BunkerChapelle.jsx";
import BunkerVoyage from "../chapters/jeu3/scenes/BunkerVoyage.jsx";
import { MISSIONS_RUMEURS, MISSIONS_TEMPS } from "../chapters/jeu3/missions.js";

/* ============================================================
   MOTEUR — JEU 3 : « Le bunker 2087 » (squelette PR J3-A)
   ------------------------------------------------------------
   Composant plein écran qui gère son propre état interne
   `room` — la pièce du bunker où se trouve le joueur.
   Ce PR pose l'ossature seulement : réveil, hub central, et
   trois pièces avec du placeholder. Les missions viendront
   dans les PR J3-B et suivantes.

   Rooms :
     awake    — le joueur se réveille, ne reconnaît rien
     hub      — le couloir central du bunker (3 portes)
     chambre  — sa cellule d'habitation (retour possible)
     rumeurs  — Bureau des Rumeurs (placeholder)
     archives — Salle des Archives (placeholder)
   ============================================================ */
const ROOMS = {
  awake:      { Comp: BunkerAwake,      label: "Réveil" },
  hub:        { Comp: BunkerHub,        label: "Couloir central" },
  chambre:    { Comp: BunkerChambre,    label: "Ma chambre" },
  rumeurs:    { Comp: BunkerRumeurs,    label: "Bureau des Rumeurs" },
  archives:   { Comp: BunkerArchives,   label: "Salle des Archives" },
  cantine:    { Comp: BunkerCantine,    label: "Cantine commune" },
  infirmerie: { Comp: BunkerInfirmerie, label: "Infirmerie" },
  atelier:    { Comp: BunkerAtelier,    label: "Atelier des Ingénieurs" },
  chapelle:   { Comp: BunkerChapelle,   label: "Chapelle des Anciens" },
  voyage:     { Comp: BunkerVoyage,     label: "⏳ Retour dans le temps" },
};

export default function Jeu3({ prenom, onExit }) {
  const [room, setRoom] = useState("awake");
  /* État persistant partagé entre les pièces : flags de mission
     accomplies (ex. mission_kova_done) + set des PNJ déjà entendus
     pour la mission en cours. Ré-init au retour au titre. */
  const [flags, setFlags] = useState({});
  const [heardPnj, setHeardPnj] = useState({}); // { pnjId: true }
  const setFlag = (k, v = true) => setFlags((f) => ({ ...f, [k]: v }));
  const hear = (pnjId) => setHeardPnj((h) => ({ ...h, [pnjId]: true }));
  /* Toutes les missions rassemblées : les scènes accèdent à j3.missions.kova,
     j3.missions.appel, etc. selon la clé qu'elles portent. */
  const j3 = { flags, heardPnj, setFlag, hear,
    missions: { ...MISSIONS_RUMEURS, ...MISSIONS_TEMPS } };

  const current = ROOMS[room] || ROOMS.hub;
  const Comp = current.Comp;

  return (
    <div style={{ position: "fixed", inset: 0, background: "#050810", zIndex: 60, fontFamily: "Palatino, Georgia, serif", color: "#e8eef5", display: "flex", flexDirection: "column" }}>
      {/* Barre du haut : lieu courant + bouton menu */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: "#0a1020", borderBottom: "1px solid #1a2536" }}>
        <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 12, letterSpacing: 3, color: "#7fd8ff" }}>
          🌑 BUNKER · 2087 · <span style={{ color: "#e8eef5" }}>{current.label}</span>
        </div>
        <button onClick={onExit}
          style={{ background: "transparent", color: "#8fa3bd", border: "1px solid #2a3648", borderRadius: 8, padding: "6px 12px", fontSize: 11, cursor: "pointer", fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
          ← Menu
        </button>
      </div>

      {/* Scène courante */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, minHeight: 0, overflow: "hidden" }}>
        <div style={{ width: "100%", maxWidth: 960 }}>
          <Comp prenom={prenom} onGo={setRoom} j3={j3} />
        </div>
      </div>
    </div>
  );
}
