import { useState, useRef } from "react";
import BunkerAwake from "../chapters/jeu3/scenes/BunkerAwake.jsx";
import BunkerHub from "../chapters/jeu3/scenes/BunkerHub.jsx";
import BunkerHubHaut from "../chapters/jeu3/scenes/BunkerHubHaut.jsx";
import BunkerHubBas from "../chapters/jeu3/scenes/BunkerHubBas.jsx";
import BunkerSurface from "../chapters/jeu3/scenes/BunkerSurface.jsx";
import BunkerElevator from "../chapters/jeu3/scenes/BunkerElevator.jsx";
import BunkerChambre from "../chapters/jeu3/scenes/BunkerChambre.jsx";
import BunkerRumeurs from "../chapters/jeu3/scenes/BunkerRumeurs.jsx";
import BunkerArchives from "../chapters/jeu3/scenes/BunkerArchives.jsx";
import BunkerCantine from "../chapters/jeu3/scenes/BunkerCantine.jsx";
import BunkerInfirmerie from "../chapters/jeu3/scenes/BunkerInfirmerie.jsx";
import BunkerAtelier from "../chapters/jeu3/scenes/BunkerAtelier.jsx";
import BunkerChapelle from "../chapters/jeu3/scenes/BunkerChapelle.jsx";
import BunkerVoyage from "../chapters/jeu3/scenes/BunkerVoyage.jsx";
import BunkerServeurs from "../chapters/jeu3/scenes/BunkerServeurs.jsx";
import BunkerMinimap from "../chapters/jeu3/BunkerMinimap.jsx";
import { MISSIONS_RUMEURS, MISSIONS_TEMPS, MISSIONS_OSINT } from "../chapters/jeu3/missions.js";
import { LEVELS, ROOM_TO_LEVEL } from "../chapters/jeu3/levels.js";

/* ============================================================
   MOTEUR — JEU 3 : « Le bunker 2087 »
   ------------------------------------------------------------
   Architecture multi-niveaux (5 étages : +2 Surface, +1 Communal,
   0 Habitat, -1 Services, -3 Serveurs). Chaque étage a son mini-
   hub. L'ascenseur (room "elevator") permet de sauter d'un étage
   à l'autre. Une mini-carte latérale (BunkerMinimap) montre en
   permanence où on est et clique pour se déplacer.

   État partagé (j3) :
     flags        — flags de mission (mission_kova_done, ...)
     heardPnj     — set des PNJ déjà interviewés
     previousRoom — pièce d'où l'on vient (utilisé par l'ascenseur
                    pour connaître le niveau courant)
     missions     — catalogue de toutes les missions
   ============================================================ */
const ROOMS = {
  awake:      { Comp: BunkerAwake,      label: "Réveil" },
  hub:        { Comp: BunkerHub,        label: "Couloir · Niveau 0" },
  hubHaut:    { Comp: BunkerHubHaut,    label: "Couloir · Niveau +1" },
  hubBas:     { Comp: BunkerHubBas,     label: "Couloir · Niveau -1" },
  surface:    { Comp: BunkerSurface,    label: "Surface · Niveau +2" },
  elevator:   { Comp: BunkerElevator,   label: "Ascenseur" },
  chambre:    { Comp: BunkerChambre,    label: "Ma chambre" },
  rumeurs:    { Comp: BunkerRumeurs,    label: "Bureau des Rumeurs" },
  archives:   { Comp: BunkerArchives,   label: "Salle des Archives" },
  cantine:    { Comp: BunkerCantine,    label: "Cantine commune" },
  infirmerie: { Comp: BunkerInfirmerie, label: "Infirmerie" },
  atelier:    { Comp: BunkerAtelier,    label: "Atelier des Ingénieurs" },
  chapelle:   { Comp: BunkerChapelle,   label: "Chapelle des Anciens" },
  voyage:     { Comp: BunkerVoyage,     label: "⏳ Retour dans le temps" },
  serveurs:   { Comp: BunkerServeurs,   label: "⚠ Niveau -3 · Serveurs" },
};

export default function Jeu3({ prenom, onExit }) {
  const [room, setRoom] = useState("awake");
  const [flags, setFlags] = useState({});
  const [heardPnj, setHeardPnj] = useState({});
  /* previousRoom permet à l'ascenseur de savoir depuis quel étage
     on l'a appelé (pour surligner "ici" dans le sélecteur). */
  const prevRef = useRef("awake");
  const goTo = (r) => { prevRef.current = room; setRoom(r); };

  const setFlag = (k, v = true) => setFlags((f) => ({ ...f, [k]: v }));
  const hear = (pnjId) => setHeardPnj((h) => ({ ...h, [pnjId]: true }));
  /* Le hub à rejoindre depuis la pièce courante : chaque pièce a un
     niveau associé, et chaque niveau a son propre couloir. Ainsi
     "Retour au couloir" depuis Cantine (niveau +1) renvoie à hubHaut,
     depuis Rumeurs (niveau -1) à hubBas, etc. */
  const levelHere = ROOM_TO_LEVEL[room];
  const hubRoom = LEVELS.find((l) => l.id === levelHere)?.hubRoom || "hub";
  const j3 = { flags, heardPnj, setFlag, hear,
    previousRoom: prevRef.current,
    hubRoom,
    missions: { ...MISSIONS_RUMEURS, ...MISSIONS_TEMPS, ...MISSIONS_OSINT } };

  const current = ROOMS[room] || ROOMS.hub;
  const Comp = current.Comp;

  /* La mini-carte latérale n'a pas de sens dans quelques écrans très
     immersifs (réveil, voyage dans le temps, confrontation finale). */
  const showMinimap = !["awake", "voyage", "serveurs"].includes(room);

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

      {/* Zone principale : mini-carte à gauche + scène à droite */}
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {showMinimap && <BunkerMinimap room={room} flags={flags} onGo={goTo} />}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 6, minHeight: 0, overflow: "hidden" }}>
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Comp prenom={prenom} onGo={goTo} j3={j3} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* On ré-exporte LEVELS pour d'éventuels tests ou pour un futur écran de fin. */
export { LEVELS };
