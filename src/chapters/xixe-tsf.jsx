import { useState, useEffect, useMemo, useRef } from "react";

/* ============================================================
   MINI-JEU : « Sauver le Titanic ! » — DRAG N DROP
   ------------------------------------------------------------
   Le joueur doit CHOISIR l'antenne parmi plusieurs outils et
   la GLISSER-DEPOSER sur la station Marconi pour la brancher.
   Les autres outils declenchent une explication sonore/visuelle
   « bzzt, non — ca ne franchira pas l'ocean ».
   ============================================================ */

const OUTILS = [
  { id: "antenne", nom: "Antenne", ok: true,
    svg: (<g><rect x="-2" y="10" width="4" height="34" fill="#8a8c92" /><path d="M0 10 L-14 -18 M0 10 L14 -18 M0 -4 L-8 -22 M0 -4 L8 -22" stroke="#8a8c92" strokeWidth="2.5" /><circle cx="0" cy="-22" r="3" fill="#ffe08a" /></g>),
    raison: "L'antenne lance et capte les ONDES INVISIBLES dans l'air, sans le moindre fil : elles franchissent la mer et l'horizon. C'est la TSF de Marconi." },
  { id: "drapeaux", nom: "Drapeaux", ok: false,
    svg: (<g><path d="M-2 -22 v66" stroke="#3a2c1c" strokeWidth="2" /><path d="M-2 -22 L18 -16 L-2 -10 Z" fill="#c8382e" /><path d="M4 -22 v60" stroke="#3a2c1c" strokeWidth="2" transform="translate(6,0)" /><path d="M4 -22 L-16 -16 L4 -10 Z" fill="#2a6a9a" transform="translate(6,0)" /></g>),
    raison: "Des drapeaux, ca ne se voit qu'a vue d'oeil. Dans la nuit noire de l'Atlantique, a des lieues de distance, personne ne les verrait." },
  { id: "longuevue", nom: "Longue-vue", ok: false,
    svg: (<g><rect x="-24" y="-4" width="48" height="10" rx="3" fill="#3a2c1c" transform="rotate(-14)" /><circle cx="-22" cy="0" r="4" fill="#cfeaff" transform="rotate(-14)" /></g>),
    raison: "Une longue-vue sert a VOIR, pas a envoyer un message. Elle ne sauvera personne au fond de la nuit." },
  { id: "corne", nom: "Corne de brume", ok: false,
    svg: (<g><path d="M-14 4 L14 -10 L18 10 L-14 20 Z" fill="#6a4c2e" stroke="#3a2c1c" strokeWidth="1.4" /><path d="M-14 4 L-14 20" stroke="#3a2c1c" strokeWidth="2" /></g>),
    raison: "Un son porte a quelques centaines de metres tout au plus. Le Titanic est a des centaines de kilometres. Peine perdue." },
  { id: "corde", nom: "Corde & harpon", ok: false,
    svg: (<g><path d="M-16 12 q-6 -20 12 -18 q18 2 12 20 q-6 12 -22 8" stroke="#8a6a3a" strokeWidth="6" fill="none" /><path d="M-16 12 q-6 -20 12 -18 q18 2 12 20 q-6 12 -22 8" stroke="#5a4020" strokeWidth="2" fill="none" opacity="0.6" /></g>),
    raison: "Une corde ne franchit pas l'ocean. Il faudrait une invention qui ne tienne a AUCUN fil." },
];

function OutilCard({ o, onPointerDown, faded, wrong }) {
  return (
    <div
      onPointerDown={onPointerDown}
      style={{
        width: 88, height: 88, borderRadius: 12,
        background: wrong ? "#2a0e10" : "#101827",
        border: `2px solid ${wrong ? "#e8934a" : "#2a3648"}`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3,
        cursor: faded ? "default" : "grab", opacity: faded ? 0.4 : 1,
        touchAction: "none", userSelect: "none",
        transition: "border-color .2s, background .2s",
      }}
    >
      <svg viewBox="-32 -32 64 64" style={{ width: 42, height: 42, pointerEvents: "none" }}>{o.svg}</svg>
      <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 10.5, color: wrong ? "#e8934a" : "#e8eef5", pointerEvents: "none" }}>{o.nom}</div>
    </div>
  );
}

export function TsfGame({ onClose, onWin }) {
  const [drag, setDrag] = useState(null); // {id, x, y, offX, offY}
  const [verdict, setVerdict] = useState(null); // "id:yes" | "id:no"
  const [wrongIds, setWrongIds] = useState([]);
  const [won, setWon] = useState(false);
  const [overTarget, setOverTarget] = useState(false);
  const shuffled = useMemo(() => [...OUTILS].sort(() => Math.random() - 0.5), []);
  const targetRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => { if (won) onWin?.(); }, [won]); // eslint-disable-line react-hooks/exhaustive-deps

  const isOverTarget = (x, y) => {
    const r = targetRef.current?.getBoundingClientRect();
    return !!r && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  };

  const beginDrag = (o) => (e) => {
    if (won || wrongIds.includes(o.id)) return;
    e.preventDefault();
    const r = e.currentTarget.getBoundingClientRect();
    setDrag({ id: o.id, x: e.clientX, y: e.clientY, offX: e.clientX - (r.left + r.width / 2), offY: e.clientY - (r.top + r.height / 2) });
  };

  useEffect(() => {
    if (!drag) return;
    const move = (e) => {
      setDrag((d) => d && { ...d, x: e.clientX, y: e.clientY });
      setOverTarget(isOverTarget(e.clientX, e.clientY));
    };
    const up = (e) => {
      const over = isOverTarget(e.clientX, e.clientY);
      const o = OUTILS.find((x) => x.id === drag.id);
      setDrag(null);
      setOverTarget(false);
      if (over && o) {
        if (o.ok) {
          setVerdict(o.id + ":yes");
          setTimeout(() => setWon(true), 900);
        } else {
          setVerdict(o.id + ":no");
          setWrongIds((w) => [...w, o.id]);
        }
      }
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [drag]);

  const outilVerdict = verdict && OUTILS.find((o) => verdict.startsWith(o.id + ":"));
  const dragged = drag && OUTILS.find((o) => o.id === drag.id);

  return (
    <div onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(4,8,14,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 70, backdropFilter: "blur(3px)" }}>
      <div ref={containerRef} onClick={(e) => e.stopPropagation()}
        style={{ background: "#0e1420", border: "2px solid #7fb0e066", borderRadius: 18, padding: 20, maxWidth: 700, width: "100%", maxHeight: "94vh", overflowY: "auto", boxShadow: "0 12px 48px rgba(0,0,0,0.6)", color: "#e8eef5", fontFamily: "Palatino, Georgia, serif" }}>
        <div style={{ textAlign: "center", fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 2, color: "#7fb0e0" }}>🌊 NUIT DU 15 AVRIL 1912 · STATION MARCONI</div>
        <h2 style={{ textAlign: "center", margin: "6px 0 4px", color: "#ffd166", fontSize: 21 }}>Un paquebot coule dans l'Atlantique !</h2>
        <p style={{ textAlign: "center", fontSize: 13.5, color: "#c8d4e2", margin: "0 0 12px", lineHeight: 1.55 }}>
          On entend ses bips de detresse. <strong>Glissez</strong> le bon outil sur la station Marconi pour envoyer un message <strong>dans l'air, sans fil</strong>, jusqu'aux navires les plus proches.
        </p>

        {!won ? (
          <>
            {/* la scene : station Marconi + baie */}
            <div style={{ position: "relative", width: "100%", aspectRatio: "5 / 2", background: "linear-gradient(#0e1636 0%, #243a5e 60%, #3e5a6e 100%)", borderRadius: 12, overflow: "hidden", border: "1px solid #2a3648", marginBottom: 12 }}>
              <svg viewBox="0 0 500 200" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                {/* etoiles */}
                {[[40,30],[110,20],[190,40],[280,26],[360,44],[440,22]].map(([x,y],i) => (
                  <circle key={i} cx={x} cy={y} r="1.2" fill="#fff" opacity="0.85" />
                ))}
                {/* lune */}
                <circle cx="70" cy="52" r="18" fill="#eef2f6" />
                {/* mer */}
                <rect y="130" width="500" height="70" fill="#204a5e" />
                {[145, 165, 185].map((y, i) => (
                  <path key={i} d={`M0 ${y} q60 ${i % 2 ? 3 : -3} 120 0 t120 0 t120 0 t120 0`} stroke="#5a7a8a" strokeWidth="1" fill="none" opacity="0.4" />
                ))}
                {/* Titanic au loin, gite */}
                <g transform="translate(380,138) rotate(-12)">
                  <path d="M-34 3 Q0 11 34 3 L28 11 Q0 15 -28 11 Z" fill="#0e1620" />
                  <rect x="-24" y="-7" width="48" height="10" fill="#1a2430" />
                  {[-14,-2,10,22].map((x,i) => <rect key={i} x={x} y="-14" width="4" height="8" fill="#2a2018" />)}
                  {[-20,-10,0,10,20].map((x,i) => <circle key={i} cx={x} cy="-2" r="0.9" fill="#ffd166" opacity="0.85" />)}
                  {/* fusee de detresse */}
                  <circle cx="26" cy="-42" r="2" fill="#ff6a4a">
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="1.1s" repeatCount="indefinite" />
                  </circle>
                </g>
                {/* falaise cote */}
                <path d="M0 200 L0 155 Q120 148 240 155 Q360 162 500 152 L500 200 Z" fill="#161c26" />
                {/* la STATION Marconi (cabine + emplacement du mat) */}
                <g transform="translate(200,150)">
                  <rect x="-32" y="-30" width="64" height="42" rx="2" fill="#2a3038" />
                  <path d="M-36 -30 L0 -46 L36 -30 Z" fill="#1c222a" />
                  <rect x="-18" y="-22" width="22" height="18" fill="#ffcf78" opacity="0.85" />
                  <path d="M-18 -13 h22 M-7 -22 v18" stroke="#3a2c1c" strokeWidth="1.4" />
                  <rect x="12" y="-12" width="12" height="24" fill="#12161c" />
                </g>
              </svg>

              {/* ZONE DE DROP : le socle de l'antenne */}
              <div ref={targetRef}
                style={{
                  position: "absolute",
                  left: "36%", top: "10%",
                  width: "28%", height: "58%",
                  borderRadius: 8,
                  border: `2px dashed ${overTarget ? "#7fd8ff" : "#7fb0e066"}`,
                  background: overTarget ? "#7fd8ff22" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  pointerEvents: "none",
                  transition: "all .15s",
                }}
              >
                <div style={{
                  fontFamily: "ui-monospace,monospace", fontSize: 11, letterSpacing: 1,
                  color: overTarget ? "#7fd8ff" : "#7fb0e0aa", textAlign: "center", padding: "0 8px"
                }}>
                  {overTarget ? "lachez ici pour brancher" : "glissez ici"}
                </div>
              </div>
            </div>

            {/* le TRAY des outils */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 12 }}>
              {shuffled.map((o) => {
                const wrong = wrongIds.includes(o.id);
                const beingDragged = drag && drag.id === o.id;
                return (
                  <OutilCard
                    key={o.id}
                    o={o}
                    onPointerDown={beginDrag(o)}
                    faded={beingDragged}
                    wrong={wrong}
                  />
                );
              })}
            </div>

            <div style={{ minHeight: 56, background: outilVerdict ? "#101827" : "transparent", border: outilVerdict ? "1px solid #2a3648" : "none", borderRadius: 10, padding: outilVerdict ? "10px 14px" : 0 }}>
              {outilVerdict && (
                <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: verdict.endsWith(":no") ? "#e8934a" : "#c8e0b8", fontStyle: "italic" }}>
                  <strong>{verdict.endsWith(":no") ? "Bzzt, non : " : "OUI ! "}</strong>{outilVerdict.raison}
                </p>
              )}
            </div>

            {/* le ghost qui suit le curseur pendant le drag */}
            {dragged && (
              <div style={{
                position: "fixed", left: drag.x - (drag.offX || 0) - 40, top: drag.y - (drag.offY || 0) - 40,
                width: 80, height: 80, pointerEvents: "none", zIndex: 100,
                filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.5))",
              }}>
                <svg viewBox="-32 -32 64 64" style={{ width: "100%", height: "100%" }}>{dragged.svg}</svg>
              </div>
            )}
          </>
        ) : (
          <div>
            <div style={{ background: "#0e1a24", border: "1px solid #2a4648", borderRadius: 12, padding: "14px 16px" }}>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: "#e8eef5", margin: 0 }}>
                « L'antenne monte, l'etincelle claque, les ondes filent dans la nuit… Le RMS Carpathia capte les bips a 60 milles marins et met le cap sur le naufrage. Environ 700 personnes sauvees, dont beaucoup d'emigrants irlandais de 3ᵉ classe. Sans la TSF de Marconi, personne n'aurait jamais su a temps. Apres le drame, une regle mondiale : les navires DOIVENT rester a l'ecoute des ondes. Un simple message peut sauver des vies. » — MARTINE
              </p>
            </div>
            <p style={{ textAlign: "center", margin: "12px 0 0", color: "#7fe0a8", fontSize: 13, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              ✓ SOS transmis — le Carpathia arrive !
            </p>
            <button onClick={onClose}
              style={{ marginTop: 10, width: "100%", background: "#7fb0e0", color: "#06121e", border: "none", borderRadius: 10, padding: "12px", fontWeight: 800, cursor: "pointer", fontSize: 15, fontFamily: "ui-monospace,monospace", letterSpacing: 1 }}>
              Continuer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
