import { computeBadge } from "./badge.js";
import * as EPILOGUE from "../chapters/epilogue/data.js";

/* ============================================================
   MOTEUR — LE CARNET IMPRIMABLE
   ------------------------------------------------------------
   Invisible à l'écran (voir global.css) : à l'impression, c'est
   la SEULE chose qui sort. C'est la trace écrite que l'élève
   garde à la fin de la séance : identité, badge, une fiche par
   invention découverte (avec les 4 jauges en ■/□), la conclusion
   de MARTINE, la question de débat avec 4 lignes vierges.
   Aucun état propre : tout via props.
   ============================================================ */
const printBar = (n) => "■".repeat(n) + "□".repeat(Math.max(0, 5 - n));

export default function CarnetPrint({ prenom, collection, fluxTotal, bonusChapters, chapters }) {
  /* Groupe la collection par date (ordre d'ajout conservé). */
  const epoques = [];
  collection.forEach((c) => {
    const derniere = epoques[epoques.length - 1];
    if (derniere && derniere.date === c.date) derniere.items.push(c);
    else epoques.push({ date: c.date, items: [c] });
  });

  return (
    <div className="carnet-print">
      <div style={{ borderBottom: "2px solid #000", paddingBottom: 8, marginBottom: 14 }}>
        <h1 style={{ fontSize: 22, margin: 0, letterSpacing: 2 }}>MARTINE — Carnet de bord</h1>
        <p style={{ fontSize: 10, margin: "3px 0 0", fontStyle: "italic" }}>
          Machine À Remonter le Temps Intelligente Néanmoins Excellente — 20 000 ans de messages
        </p>
        <p style={{ fontSize: 13, margin: "12px 0 0" }}>
          Prénom : <span style={{ borderBottom: "1px solid #000", display: "inline-block", minWidth: 240, fontWeight: 700 }}>{prenom || " "}</span>
        </p>
      </div>

      <p style={{ fontSize: 12, margin: "0 0 14px" }}>
        <strong>{collection.filter((c) => !c.perdu).length}</strong> message(s) transmis au futur
        {"  ·  "}
        <strong>{collection.filter((c) => c.perdu).length}</strong> message(s) perdu(s) en route
      </p>

      {/* BADGE + score cumulé — en noir et blanc, imprimable */}
      {fluxTotal > 0 && (() => {
        const totalTarget = chapters.reduce((s, c) => s + (c.required || 3) * 5, 0);
        const badge = computeBadge(fluxTotal, totalTarget);
        const scorePct = Math.round((fluxTotal / totalTarget) * 100);
        return (
          <div style={{ border: "2px solid #000", padding: "8px 12px", marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1 }}>
              {badge.emoji} {badge.name.toUpperCase()} — {fluxTotal} points ({scorePct}%)
            </div>
            <div style={{ fontSize: 11, fontStyle: "italic", marginTop: 3 }}>{badge.desc}</div>
            {bonusChapters.length > 0 && (
              <div style={{ fontSize: 10.5, marginTop: 4 }}>
                ✨ Cartes bonus débloquées : {bonusChapters.map((i) => chapters[i]?.epoque).join(" · ")}
              </div>
            )}
          </div>
        );
      })()}

      {epoques.map((ep) => (
        <div key={ep.date} className="cp-epoque" style={{ marginBottom: 14 }}>
          <h2 style={{ fontSize: 13, letterSpacing: 1, margin: "0 0 6px", borderBottom: "1px solid #000", paddingBottom: 2 }}>
            {ep.date}
          </h2>
          {ep.items.map((c) => (
            <div key={c.id} className="cp-fiche" style={{ marginBottom: 9, paddingLeft: 4 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700 }}>
                {c.perdu ? "✗ " : "◆ "}{c.titre}
                {c.perdu && <span style={{ fontWeight: 400, fontStyle: "italic" }}> — perdu en route</span>}
              </div>
              {/* les 4 jauges, en noir et blanc */}
              <div style={{ fontSize: 9.5, fontFamily: "ui-monospace, monospace", margin: "2px 0" }}>
                Vitesse {printBar(c.jauges.vitesse)} &nbsp; Portée {printBar(c.jauges.portee)} &nbsp;
                Capacité {printBar(c.jauges.capacite)} &nbsp; Durabilité {printBar(c.jauges.durabilite)}
              </div>
              <p style={{ fontSize: 10.5, lineHeight: 1.45, margin: 0, textAlign: "justify" }}>{c.fact}</p>
            </div>
          ))}
        </div>
      ))}

      {/* la question de l'épilogue + de la place pour répondre à la main */}
      <div className="cp-epoque" style={{ borderTop: "2px solid #000", marginTop: 8, paddingTop: 10 }}>
        <p style={{ fontSize: 10.5, lineHeight: 1.5, margin: "0 0 10px", fontStyle: "italic", textAlign: "justify" }}>
          « {EPILOGUE.CONCLUSION} » — MARTINE
        </p>
        <h2 style={{ fontSize: 13, margin: "0 0 6px" }}>{EPILOGUE.DEBAT_TITRE}</h2>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ borderBottom: "1px solid #888", height: 19 }} />
        ))}
      </div>
    </div>
  );
}
