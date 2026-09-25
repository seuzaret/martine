import { useState } from "react";
import { useWinOnce } from "../engine/useWinOnce.js";

/* ============================================================
   MINI-JEU : « Fais la une »
   ------------------------------------------------------------
   Le kioskier propose 6 dépêches AFP du jour. L'élève doit en
   choisir TROIS à mettre en Une de son présentoir. Aucune
   « bonne » réponse : chaque combinaison reflète une ligne
   éditoriale (info sérieuse, people, sensationnel, savoir…).
   MARTINE commente à la fin le journal que l'élève vient de
   composer sans s'en rendre compte. Introduit la notion de
   ligne éditoriale : choisir, c'est déjà éditer.
   ============================================================ */

/* Chaque dépêche : id, titre, un « chapo » (résumé), et un TAG
   qui indique son registre (info / people / sensation / savoir /
   sport / société). Le mix des 3 tags choisis fabrique la ligne. */
const DEPECHES = [
  { id: "sommet",   tag: "info",     titre: "Sommet européen : accord sur les subventions agricoles",
    chapo: "Les Douze trouvent un compromis au terme de 48 heures de négociations." },
  { id: "grippe",   tag: "info",     titre: "Épidémie de grippe : l'Europe touchée",
    chapo: "Le ministère de la Santé recommande la vaccination des personnes fragiles." },
  { id: "star",     tag: "people",   titre: "Diana attend son deuxième enfant",
    chapo: "Buckingham confirme la nouvelle grossesse de la princesse de Galles." },
  { id: "divorce",  tag: "people",   titre: "Le divorce du siècle : la star et son producteur",
    chapo: "Photos exclusives : cinq pages inédites à l'intérieur." },
  { id: "monstre",  tag: "sensation", titre: "Une créature étrange aperçue dans le lac de Serre-Ponçon",
    chapo: "Trois témoins l'ont vue. Le maire promet une enquête." },
  { id: "meurtre",  tag: "sensation", titre: "Le tueur de Marseille toujours en fuite : reconstitution",
    chapo: "Neuvième jour de traque. Photos du suspect en pages centrales." },
  { id: "voyager",  tag: "savoir",   titre: "Voyager 2 : premières images en couleur de Saturne",
    chapo: "La sonde de la NASA a transmis 18 000 clichés en quinze jours." },
  { id: "fouille",  tag: "savoir",   titre: "Une nouvelle chambre découverte dans une pyramide",
    chapo: "L'équipe française du CNRS l'annonce depuis Le Caire." },
  { id: "coupe",    tag: "sport",    titre: "Finale de Coupe : le suspense jusqu'aux tirs au but",
    chapo: "Les Verts arrachent la victoire à la dernière seconde." },
  { id: "olympiades", tag: "sport",  titre: "JO d'hiver : trois médailles françaises",
    chapo: "Le ski alpin sauve l'honneur, le patinage déçoit." },
  { id: "greve",    tag: "societe",  titre: "SNCF : appel à la grève pour vendredi",
    chapo: "Les syndicats réclament l'ouverture de négociations salariales." },
  { id: "lycee",    tag: "societe",  titre: "Lycéens dans la rue contre la réforme",
    chapo: "50 000 manifestants à Paris, calmes selon la préfecture." },
];

/* On tire 6 dépêches au hasard parmi les 12 disponibles, à
   chaque nouvelle partie, pour que les Unes possibles varient. */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* Étiquette humaine + couleur pour chaque tag. */
const TAGS = {
  info:      { label: "Info",       color: "#4a6fa5" },
  people:    { label: "People",     color: "#c85a7a" },
  sensation: { label: "Sensation",  color: "#c05a2a" },
  savoir:    { label: "Savoir",     color: "#5aa07a" },
  sport:     { label: "Sport",      color: "#c9a54a" },
  societe:   { label: "Société",    color: "#8a5aa0" },
};

/* Verdict final : selon le tag majoritaire dans les 3 dépêches
   choisies, on décrit la ligne éditoriale composée. Aucune n'est
   « mauvaise » — chaque combinaison a sa personnalité. */
function verdict(picks) {
  const counts = picks.reduce((m, p) => { m[p.tag] = (m[p.tag] || 0) + 1; return m; }, {});
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  const [tag, n] = top;
  if (n >= 2) {
    const V = {
      info:      "Ton kiosque met l'info sérieuse en tête. Ligne éditoriale : « quotidien de référence ». Le lecteur pressé a l'essentiel en un regard.",
      people:    "Ta Une file droit vers les stars. Ligne éditoriale : « hebdo people ». Ça se vend très fort — c'est aussi ce qui attire le plus l'œil sur un présentoir.",
      sensation: "Ta Une joue sur le frisson et le mystère. Ligne éditoriale : « presse à sensation ». Le lecteur revient chaque semaine pour la suite — même si le fait divers monte souvent en épingle.",
      savoir:    "Tu privilégies la connaissance. Ligne éditoriale : « magazine de savoir ». Moins de lecteurs, mais très fidèles — c'est le journal qu'on garde et qu'on prête.",
      sport:     "Ta Une célèbre l'exploit. Ligne éditoriale : « presse sportive ». Un lectorat immense, très passionné, qui zappe le reste.",
      societe:   "Ta Une donne la parole aux mouvements sociaux. Ligne éditoriale : « journal engagé ». Il assume une couleur politique, le lecteur le sait en l'achetant.",
    };
    return V[tag];
  }
  return "Ta Une est éclectique : un peu de tout, pour attirer tous les regards. Ligne éditoriale : « quotidien généraliste ». C'est le pari des grands titres — plaire large, sans se compromettre trop.";
}

export function FaireLaUneGame({ onClose, onWin }) {
  const [pool] = useState(() => shuffle(DEPECHES).slice(0, 6));
  const [picked, setPicked] = useState([]);   // ids
  const [done, setDone] = useState(false);
  useWinOnce(done, onWin);

  const isPicked = (id) => picked.includes(id);
  const toggle = (id) => {
    if (done) return;
    setPicked((p) => p.includes(id) ? p.filter(x => x !== id) : (p.length < 3 ? [...p, id] : p));
  };
  const valider = () => { if (picked.length === 3) setDone(true); };
  const pickedObjs = picked.map((id) => pool.find((d) => d.id === id));

  return (
    <div onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(4,8,14,0.82)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 70, backdropFilter: "blur(3px)" }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ background: "#f6efdf", color: "#1c1a10", border: "2px solid #8a6a3a", borderRadius: 14, padding: 20, maxWidth: 780, width: "100%", maxHeight: "92vh", overflowY: "auto", boxShadow: "0 12px 48px rgba(0,0,0,0.6)", fontFamily: "Georgia, serif" }}>
        <div style={{ textAlign: "center", fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#8a5a2a" }}>📰 FABRIQUE DE LA UNE — 1980</div>
        <h2 style={{ textAlign: "center", margin: "6px 0 4px", color: "#3a2214", fontSize: 22, fontFamily: "Georgia, serif" }}>Fais la Une du kiosque</h2>
        <p style={{ fontSize: 13.5, lineHeight: 1.55, textAlign: "center", margin: "0 0 14px", color: "#3a2e1e" }}>
          Le kioskier reçoit 6 dépêches AFP ce matin. À toi d'en <strong>choisir 3</strong> à mettre en Une de son présentoir. Chaque choix compte : ton journal aura une personnalité.
        </p>

        {!done ? (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 10 }}>
              {pool.map((d) => {
                const T = TAGS[d.tag];
                const sel = isPicked(d.id);
                return (
                  <button key={d.id} onClick={() => toggle(d.id)}
                    style={{ textAlign: "left", background: sel ? "#fffbe8" : "#fff", border: `2px solid ${sel ? T.color : "#c9b48c"}`, borderRadius: 10, padding: "10px 12px", cursor: "pointer", fontFamily: "Georgia, serif", boxShadow: sel ? `0 0 0 2px ${T.color}33` : "0 1px 2px rgba(0,0,0,0.06)", transition: "all .15s" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 5 }}>
                      <span style={{ fontFamily: "ui-monospace,monospace", fontSize: 10, letterSpacing: 1, color: T.color, fontWeight: 800 }}>{T.label.toUpperCase()}</span>
                      <span style={{ width: 16, height: 16, borderRadius: "50%", background: sel ? T.color : "transparent", border: `1.5px solid ${T.color}`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 900 }}>{sel ? "✓" : ""}</span>
                    </div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1c1a10", lineHeight: 1.3, marginBottom: 4 }}>{d.titre}</div>
                    <div style={{ fontSize: 12, color: "#4a3e2e", lineHeight: 1.4, fontStyle: "italic" }}>{d.chapo}</div>
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ flex: 1, fontFamily: "ui-monospace,monospace", fontSize: 12, color: "#5a4028" }}>{picked.length}/3 dépêches sélectionnées</span>
              <button onClick={valider} disabled={picked.length !== 3}
                style={{ background: picked.length === 3 ? "#8a5a2a" : "#c9b48c", color: "#fff", border: "none", borderRadius: 10, padding: "10px 22px", fontWeight: 800, fontSize: 14, cursor: picked.length === 3 ? "pointer" : "not-allowed", fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
                ✓ Composer la Une
              </button>
            </div>
          </>
        ) : (
          <div>
            {/* Aperçu de la Une composée */}
            <div style={{ background: "#fff", border: "1px solid #c9b48c", borderRadius: 8, padding: 14, marginBottom: 12 }}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 800, textAlign: "center", borderBottom: "3px double #1c1a10", paddingBottom: 6, marginBottom: 10, color: "#1c1a10" }}>LE JOURNAL DU JOUR</div>
              {pickedObjs.map((d, i) => (
                <div key={d.id} style={{ marginBottom: i < 2 ? 10 : 0, paddingBottom: i < 2 ? 10 : 0, borderBottom: i < 2 ? "1px dashed #c9b48c" : "none" }}>
                  <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 10, letterSpacing: 1, color: TAGS[d.tag].color, fontWeight: 800, marginBottom: 2 }}>{TAGS[d.tag].label.toUpperCase()}</div>
                  <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.25 }}>{d.titre}</div>
                  <div style={{ fontSize: 12.5, color: "#4a3e2e", fontStyle: "italic", marginTop: 3 }}>{d.chapo}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "#101827", border: "1px solid #2a3648", borderRadius: 10, padding: "12px 14px", color: "#e8eef5" }}>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
                « {verdict(pickedObjs)} Retiens : deux journaux différents avec les MÊMES dépêches font des Unes différentes. C'est ça, une ligne éditoriale — un choix, assumé. Il n'y a pas de journal neutre. » — MARTINE
              </p>
            </div>
            <button onClick={onClose}
              style={{ marginTop: 12, width: "100%", background: "#8a5a2a", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: "pointer", fontSize: 15, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              Continuer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
