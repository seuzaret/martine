/* ============================================================
   MOTEUR — Badge de fin de voyage (4 paliers)
   ------------------------------------------------------------
   Selon le SCORE cumulé (flux gagné sur l'ensemble des chapitres,
   divisé par le target total). Le score n'est jamais pénalisé
   (les malus ne le baissent pas) : il ne reflète que l'excellence
   des actions POSITIVES.
   ============================================================ */
export function computeBadge(fluxTotal, totalTarget) {
  const pct = totalTarget ? (fluxTotal / totalTarget) * 100 : 0;
  if (pct >= 250) return { name: "Chronaute maître",   emoji: "🌟", color: "#ffd166", desc: "Tout fait, sans presque une erreur. Ta jauge a débordé à chaque étape." };
  if (pct >= 200) return { name: "Chronaute expert",   emoji: "🎖️", color: "#ffb060", desc: "Presque tous les bonus rassemblés. Tu as vraiment exploré chaque époque." };
  if (pct >= 150) return { name: "Chronaute confirmé", emoji: "🏅", color: "#7fd8ff", desc: "Tu as goûté aux à-côtés — anachronismes, SOS, mini-jeux — pas seulement au chemin balisé." };
  return               { name: "Chronaute apprenti",   emoji: "🎓", color: "#c8d4e2", desc: "Tu as bouclé le voyage. Le strict nécessaire, et c'est déjà beaucoup." };
}
