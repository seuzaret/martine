import { useEffect, useRef } from "react";

/* ============================================================
   MOTEUR — useWinOnce(won, onWin)
   ------------------------------------------------------------
   Petit hook qui appelle onWin() UNE SEULE FOIS quand `won`
   passe à true, quelle que soit l'instabilité de la référence
   onWin (closure recréée à chaque render du parent). Évite
   le classique
       useEffect(() => { if (won) onWin?.(); }, [won]);
       // eslint-disable-line react-hooks/exhaustive-deps
   qu'on retrouvait dans une bonne demi-douzaine de mini-jeux.

   Bonus : garde un ref sur le dernier onWin pour que le premier
   déclenchement utilise toujours le handler le plus récent, sans
   pour autant redéclencher à chaque re-render.
   ============================================================ */
export function useWinOnce(won, onWin) {
  const cb = useRef(onWin);
  useEffect(() => { cb.current = onWin; }, [onWin]);
  const fired = useRef(false);
  useEffect(() => {
    if (won && !fired.current) {
      fired.current = true;
      cb.current?.();
    }
  }, [won]);
}
