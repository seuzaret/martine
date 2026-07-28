import { useState, useEffect } from "react";

/* ============================================================
   MINI-JEU : « Écris MARTINE dans le premier alphabet »
   ------------------------------------------------------------
   Il y a ~3 500 ans, chaque lettre de l'alphabet était le DESSIN
   d'une chose (un bœuf, l'eau, une main…). En touchant chaque
   dessin, l'élève le voit se métamorphoser en une de nos lettres,
   et écrit ainsi MARTINE — le nom de l'héroïne — dans l'alphabet
   des Phéniciens. Origines vérifiées (article « Alphabet phénicien »).

   Tout est dessiné ici : libre de droit et hors-ligne.
   ============================================================ */

const OR = "#e8dcc0"; // trait des pictogrammes (craie/os sur l'argile)

/* --- les 7 pictogrammes, dans l'ordre de MARTINE --- */
const Mem = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%"><g fill="none" stroke={OR} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 20 q6 -8 12 0 t12 0 t12 0 t12 0" />
    <path d="M8 34 q6 -8 12 0 t12 0 t12 0 t12 0" />
    <path d="M8 48 q6 -8 12 0 t12 0 t12 0 t12 0" />
  </g></svg>
);
const Aleph = () => ( /* tête de bœuf : museau + cornes (une fois retourné → A) */
  <svg viewBox="0 0 64 64" width="100%" height="100%"><g fill="none" stroke={OR} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 20 L32 44 L42 20" />
    <path d="M22 20 Q12 8 6 14" />
    <path d="M42 20 Q52 8 58 14" />
    <circle cx="32" cy="30" r="1.6" fill={OR} stroke="none" />
  </g></svg>
);
const Resh = () => ( /* une tête de profil */
  <svg viewBox="0 0 64 64" width="100%" height="100%"><g fill="none" stroke={OR} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M40 14 Q20 12 20 30 Q20 40 30 42 L30 52" />
    <path d="M20 30 L12 34 L20 37" />
  </g></svg>
);
const Taw = () => ( /* la marque : une croix */
  <svg viewBox="0 0 64 64" width="100%" height="100%"><g fill="none" stroke={OR} strokeWidth="4.5" strokeLinecap="round">
    <path d="M16 16 L48 48 M48 16 L16 48" />
  </g></svg>
);
const Yod = () => ( /* une main + avant-bras */
  <svg viewBox="0 0 64 64" width="100%" height="100%"><g fill="none" stroke={OR} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 50 L30 30" />
    <path d="M30 30 Q34 18 40 16 M30 30 Q40 20 46 22 M30 30 Q42 26 48 30 M30 30 Q40 32 44 38" />
  </g></svg>
);
const Nun = () => ( /* un serpent qui ondule */
  <svg viewBox="0 0 64 64" width="100%" height="100%"><g fill="none" stroke={OR} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 54 q-10 -10 4 -18 q14 -8 4 -18 q-8 -8 2 -12" />
    <path d="M28 6 q6 -2 8 3" />
    <circle cx="34" cy="7" r="1.4" fill={OR} stroke="none" />
  </g></svg>
);
const He = () => ( /* un battant de porte */
  <svg viewBox="0 0 64 64" width="100%" height="100%"><g fill="none" stroke={OR} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="18" y="10" width="28" height="44" rx="2" />
    <path d="M32 10 L32 54" />
    <circle cx="40" cy="32" r="2" fill={OR} stroke="none" />
  </g></svg>
);

const LETTERS = [
  { l: "M", nom: "mem", sens: "l'eau", Picto: Mem },
  { l: "A", nom: "aleph", sens: "le bœuf", Picto: Aleph, rotate: 180 },
  { l: "R", nom: "resh", sens: "la tête", Picto: Resh },
  { l: "T", nom: "taw", sens: "la marque", Picto: Taw },
  { l: "I", nom: "yod", sens: "la main", Picto: Yod },
  { l: "N", nom: "nun", sens: "le serpent", Picto: Nun },
  { l: "E", nom: "he", sens: "le battant de porte", Picto: He },
];

/* Une case : le pictogramme qui se transforme en lettre au toucher. */
function Tuile({ L, revealed, onReveal }) {
  return (
    <button onClick={onReveal} disabled={revealed}
      style={{ background: revealed ? "#14251c" : "#1a130c", border: `1px solid ${revealed ? "#2a5a3a" : "#3a2c1c"}`, borderRadius: 10, padding: "8px 6px 6px", cursor: revealed ? "default" : "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 78 }}>
      <div style={{ position: "relative", width: 56, height: 56 }}>
        {/* le dessin ancien */}
        <div style={{ position: "absolute", inset: 0, opacity: revealed ? 0 : 1, transform: revealed ? `rotate(${L.rotate || 0}deg) scale(.5)` : "none", transition: "opacity .55s, transform .55s" }}>
          <L.Picto />
        </div>
        {/* la lettre d'aujourd'hui */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: revealed ? 1 : 0, transform: revealed ? "none" : "scale(.5)", transition: "opacity .55s, transform .55s", fontFamily: "'Cinzel', 'Trajan Pro', 'Constantia', Georgia, serif", fontWeight: 700, fontSize: 44, color: "#ffd166" }}>
          {L.l}
        </div>
      </div>
      <div style={{ fontSize: 10.5, fontFamily: "ui-monospace,monospace", color: revealed ? "#8fb8a0" : "#c9a877", textAlign: "center", lineHeight: 1.2 }}>
        {revealed ? `→ ${L.l}` : <>{L.nom}<br /><span style={{ color: "#8a97ad" }}>{L.sens}</span></>}
      </div>
    </button>
  );
}

export function AlphabetGame({ onClose, onWin }) {
  const [done, setDone] = useState([]);
  const fini = done.length === LETTERS.length;

  /* Quand les 7 dessins sont transformés, le message « Alphabet » est
     vraiment transmis au futur (une seule fois). */
  useEffect(() => { if (fini) onWin?.(); }, [fini]);

  return (
    <div onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(4,8,14,0.82)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 70, backdropFilter: "blur(3px)" }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ background: "#0e1420", border: "2px solid #e8934a66", borderRadius: 18, padding: 20, maxWidth: 640, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 12px 48px rgba(0,0,0,0.6)", fontFamily: "Palatino, Georgia, serif", color: "#e8eef5" }}>
        <div style={{ textAlign: "center", fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#e8934a" }}>✍ L'INVENTION DE L'ALPHABET</div>
        <h2 style={{ textAlign: "center", margin: "6px 0 4px", color: "#ffd166", fontSize: 21 }}>Écris MARTINE dans le premier alphabet</h2>
        <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "#c8d4e2", textAlign: "center", margin: "0 0 14px" }}>
          Il y a 3 500 ans, chaque lettre était le DESSIN d'une chose. Touche chaque dessin : regarde-le devenir une de nos lettres.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
          {LETTERS.map((L, i) => (
            <Tuile key={i} L={L} revealed={done.includes(i)}
              onReveal={() => setDone((d) => (d.includes(i) ? d : [...d, i]))} />
          ))}
        </div>

        {!fini ? (
          <p style={{ fontSize: 12.5, color: "#8fa3bd", fontStyle: "italic", textAlign: "center", marginTop: 14 }}>
            Encore {LETTERS.length - done.length} dessin(s) à transformer…
          </p>
        ) : (
          <div style={{ marginTop: 16 }}>
            <div style={{ background: "#101827", border: "1px solid #2a3648", borderRadius: 12, padding: "14px 16px" }}>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: "#e8eef5", margin: 0 }}>
                « Tu viens d'écrire mon nom dans l'alphabet des Phéniciens ! Regarde : chacune de nos lettres n'est, au départ, que le dessin d'une chose. Un bœuf, l'eau, une main… Ce code est si SIMPLE qu'on l'apprend en quelques jours. Maintenant que tu le TIENS, confie-le aux navires marchands : c'est le commerce qui le portera de port en port, tout autour de la mer. » — MARTINE
              </p>
            </div>
            <p style={{ textAlign: "center", margin: "12px 0 0", color: "#7fe0a8", fontSize: 13, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              ✨ Tu as appris l'ALPHABET — mets-le sur les navires pour le diffuser !
            </p>
            <button onClick={onClose}
              style={{ marginTop: 10, width: "100%", background: "#e8934a", color: "#1a0e02", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: "pointer", fontSize: 15, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              Continuer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
