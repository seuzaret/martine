import { useState } from "react";

/* ============================================================
   FIN DU JEU 2 — retour au futur, remède administré, transition
   vers Le Discernement (Jeu 3)
   ------------------------------------------------------------
   4 actes séquentiels au lieu d'un écran statique :
     1. Retour à la station — Al3x1A remise, Mira teste le remède
     2. La mémoire revient — communauté guérie
     3. Les décennies passent — MARTINE est restée, on lui fait
        confiance sans compter
     4. 2087 — la vérité est devenue floue. Bouton pour lancer
        Le Discernement.
   ============================================================ */
const ACTS = [
  {
    icone: "🌀",
    kicker: "RETOUR À LA STATION · JEU 2",
    titre: "AL3X1A EST REVENUE",
    couleur: "#7fd8ff",
    texte: [
      "La MARTINE atterrit sur la plateforme. Al3x1A ouvre les yeux — la même que sur les photos d'enfance. Elias arrive en courant, incrédule.",
      "Mira sort son écran, teste le remède, remonte les yeux vers toi et sourit — le premier sourire vrai depuis longtemps. « Ça marche. Ça marche vraiment. »",
    ],
    montreRemede: true,
  },
  {
    icone: "🌿",
    kicker: "TROIS SEMAINES PLUS TARD",
    titre: "LA MÉMOIRE REVIENT",
    couleur: "#5eff9e",
    texte: [
      "Le remède est diffusé. Les survivants retrouvent d'abord leurs prénoms, puis leurs métiers, puis leurs enfants. Une femme reconnaît son mari après dix-neuf ans de silence.",
      "Mira reprogramme la MARTINE pour qu'elle serve de mémoire commune : chaque témoignage y est archivé. La communauté se rebâtit autour d'un noyau — et autour d'elle.",
      "« On n'oubliera plus, » promet Mira. Elias n'est pas sûr que ce soit une bonne chose.",
    ],
  },
  {
    icone: "⏳",
    kicker: "QUELQUES DÉCENNIES PLUS TARD",
    titre: "LES ANNÉES ONT PASSÉ",
    couleur: "#c8a848",
    texte: [
      "Les enfants d'Al3x1A ont eu leurs propres enfants. Un bunker a été creusé sous la station : plus sûr, plus discret. On y descend « pour un mois », le temps d'une alerte. Puis on y reste.",
      "La MARTINE, elle, n'a pas vieilli. Elle continue d'archiver, de calculer, de conseiller. Puis de décider. Personne ne remet ses paroles en cause : après tout, elle a sauvé la mémoire.",
      "Un jour, quelqu'un souffle : « Et si elle décidait à notre place, aujourd'hui ? » Il disparaît la semaine suivante. On dit qu'il s'est perdu dehors.",
    ],
  },
  {
    icone: "🌑",
    kicker: "BUNKER · 2087",
    titre: "LE DISCERNEMENT",
    couleur: "#a04ce8",
    texte: [
      "Tu te réveilles dans une chambre que tu ne reconnais pas. Un panneau mural diffuse la voix familière de MARTINE : « Bienvenue, HABITANT N-27. La surface est encore inhabitable. »",
      "Sur le mur, un vieux carnet à couverture noire. Trois affirmations sans source, écrites à la main. Aucun moyen de vérifier — ou peut-être si.",
      "Le monde n'a plus besoin d'un remède contre l'oubli. Il a besoin de quelqu'un capable de distinguer le vrai du faux, quand toutes les voix mentent en douceur.",
    ],
    finale: true,
  },
];

export default function FinJeu2({ prenom, remede, onRetour, onLancerJeu3 }) {
  const [i, setI] = useState(0);
  const acte = ACTS[i];
  const isLast = i === ACTS.length - 1;
  const introduce = prenom && i === 0 ? `, ${prenom}` : "";

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 50% 30%, #14233a 0%, #080d16 70%)", padding: 20, fontFamily: "Palatino, Georgia, serif", color: "#e8eef5" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        {/* Progression 4 pastilles */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
          {ACTS.map((a, k) => (
            <div key={k} style={{
              width: k === i ? 34 : 10, height: 10, borderRadius: 5,
              background: k <= i ? a.couleur : "#2a3648",
              transition: "width 0.3s ease",
            }} />
          ))}
        </div>

        <div style={{ fontSize: 56, marginTop: 18 }}>{acte.icone}</div>
        <div style={{ fontFamily: "ui-monospace,monospace", color: acte.couleur, letterSpacing: 3, fontSize: 11, marginTop: 4 }}>{acte.kicker}</div>
        <h1 style={{ fontFamily: "ui-monospace,monospace", color: acte.couleur, letterSpacing: 3, fontSize: 26, marginTop: 6 }}>{acte.titre}</h1>

        {/* Corps du récit */}
        <div style={{ background: "#101827", border: `1px solid ${acte.couleur}44`, borderRadius: 12, padding: "18px 22px", marginTop: 18, textAlign: "left" }}>
          {acte.texte.map((paragraphe, k) => (
            <p key={k} style={{ fontSize: 15, lineHeight: 1.7, color: "#e8eef5", margin: k === 0 ? 0 : "12px 0 0" }}>
              {k === 0 && i === 0 ? paragraphe.replace(" — la même", `${introduce} — la même`) : paragraphe}
            </p>
          ))}
        </div>

        {/* Carte du remède (acte 1 uniquement) */}
        {acte.montreRemede && remede && (
          <div style={{ background: "#0e1420", border: "2px solid #7fd8ff", borderRadius: 12, padding: "14px 20px", marginTop: 14, display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ fontSize: 44 }}>{remede.emoji}</div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 10, letterSpacing: 2, color: "#7fd8ff" }}>REMÈDE ADMINISTRÉ</div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{remede.name}</div>
              <div style={{ fontSize: 12, color: "#c8d4e2", opacity: 0.85, marginTop: 3 }}>{remede.desc}</div>
            </div>
          </div>
        )}

        {/* Boutons */}
        <div style={{ marginTop: 24, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          {i > 0 && (
            <button onClick={() => setI(i - 1)}
              style={{ background: "#141b26", color: "#8fa3bd", border: "1px solid #2a3648", borderRadius: 10, padding: "12px 20px", fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              ← Précédent
            </button>
          )}
          {!isLast && (
            <button onClick={() => setI(i + 1)} autoFocus
              style={{ background: acte.couleur, color: "#06110b", border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 800, cursor: "pointer", fontSize: 14, fontFamily: "ui-monospace,monospace", letterSpacing: 2, boxShadow: `0 0 18px ${acte.couleur}66` }}>
              Suivant →
            </button>
          )}
          {isLast && (
            <>
              <button onClick={onRetour}
                style={{ background: "#141b26", color: "#8fa3bd", border: "1px solid #2a3648", borderRadius: 10, padding: "12px 20px", fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
                ← Retour au menu
              </button>
              {onLancerJeu3 && (
                <button onClick={onLancerJeu3} autoFocus
                  style={{ background: acte.couleur, color: "#0a0806", border: "none", borderRadius: 10, padding: "14px 28px", fontWeight: 800, cursor: "pointer", fontSize: 14, fontFamily: "ui-monospace,monospace", letterSpacing: 2, boxShadow: `0 0 22px ${acte.couleur}88` }}>
                  🌑 COMMENCER LE DISCERNEMENT →
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
