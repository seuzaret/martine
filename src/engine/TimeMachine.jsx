/* ============================================================
   MOTEUR — Silhouette SVG du vaisseau MARTINE (bulle + tripodes).
   ------------------------------------------------------------
   Utilisée par TimeVessel (saut de chapitre) et IntroStory
   (matérialisation initiale + arrivée au chapitre 1). À intégrer
   dans un <svg viewBox="..."><g transform="translate(cx, cy)">…</g></svg>.
   `landed` : dessine l'ombre au sol + les flammes vertes qui pulsent
   sous les tripodes. Sans lui, la machine flotte (utile pendant la
   matérialisation).
   ============================================================ */
export default function TimeMachine({ landed = false }) {
  return (
    <g>
      <defs>
        <radialGradient id="tmBubble" cx="0.35" cy="0.3" r="0.75">
          <stop offset="0"    stopColor="#eafff7" stopOpacity="0.85" />
          <stop offset="0.35" stopColor="#7fecc4" stopOpacity="0.55" />
          <stop offset="0.85" stopColor="#3aa07a" stopOpacity="0.35" />
          <stop offset="1"    stopColor="#12503a" stopOpacity="0.7" />
        </radialGradient>
        <linearGradient id="tmMetal" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#c8d0d8" />
          <stop offset="1" stopColor="#5a6270" />
        </linearGradient>
        <linearGradient id="tmMetalDark" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#4a525c" />
          <stop offset="1" stopColor="#1a2028" />
        </linearGradient>
        <radialGradient id="tmFlame" cx="0.5" cy="0" r="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.3" stopColor="#a0ffce" stopOpacity="0.9" />
          <stop offset="0.7" stopColor="#5eff9e" stopOpacity="0.6" />
          <stop offset="1" stopColor="#5eff9e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {landed && (
        <ellipse cx="0" cy="150" rx="160" ry="16" fill="#0a1408" opacity="0.55" />
      )}

      {/* Pieds fusée (tripode) */}
      <g>
        {[-70, 0, 70].map((x, i) => (
          <g key={i}>
            <path d={`M ${x - 8} 30 L ${x - 14} 120 L ${x - 22} 148 L ${x + 22} 148 L ${x + 14} 120 L ${x + 8} 30 Z`}
              fill="url(#tmMetal)" stroke="#1a2028" strokeWidth="1.2" />
            <circle cx={x - 6} cy="50" r="1.4" fill="#0a1420" />
            <circle cx={x + 6} cy="50" r="1.4" fill="#0a1420" />
            <circle cx={x - 8} cy="90" r="1.4" fill="#0a1420" />
            <circle cx={x + 8} cy="90" r="1.4" fill="#0a1420" />
            <ellipse cx={x} cy="150" rx="30" ry="7" fill="url(#tmMetalDark)" stroke="#0a1420" strokeWidth="1.2" />
            <ellipse cx={x} cy="148" rx="30" ry="5" fill="#7a8890" />
          </g>
        ))}
      </g>

      <ellipse cx="0" cy="30" rx="105" ry="18" fill="url(#tmMetalDark)" stroke="#0a1420" strokeWidth="1.4" />
      <ellipse cx="0" cy="26" rx="105" ry="16" fill="url(#tmMetal)" />
      {[-90, -60, -30, 0, 30, 60, 90].map((x, i) => (
        <circle key={i} cx={x} cy="24" r="1.6" fill="#1a2028" />
      ))}

      <g>
        <animateTransform attributeName="transform" type="rotate" values="0;360" dur="9s" repeatCount="indefinite" />
        <ellipse cx="0" cy="-40" rx="118" ry="28" fill="none" stroke="#5eff9e" strokeWidth="1.6" opacity="0.5" strokeDasharray="6 4" />
      </g>
      <g>
        <animateTransform attributeName="transform" type="rotate" values="360;0" dur="14s" repeatCount="indefinite" />
        <ellipse cx="0" cy="-30" rx="128" ry="34" fill="none" stroke="#7fd8ff" strokeWidth="1.2" opacity="0.35" strokeDasharray="3 5" />
      </g>

      <circle cx="0" cy="-40" r="95" fill="url(#tmBubble)" stroke="#a8f0d0" strokeWidth="1.6" />
      <ellipse cx="-38" cy="-80" rx="30" ry="18" fill="#ffffff" opacity="0.4" transform="rotate(-30 -38 -80)" />
      <ellipse cx="-52" cy="-58" rx="8" ry="16" fill="#ffffff" opacity="0.3" transform="rotate(-20 -52 -58)" />
      <ellipse cx="0" cy="-40" rx="95" ry="95" fill="none" stroke="#3a5a48" strokeWidth="1.5" opacity="0.6" />
      <path d="M -95 -40 L 95 -40" stroke="#3a5a48" strokeWidth="1" opacity="0.5" />
      <path d="M 0 -135 L 0 55" stroke="#3a5a48" strokeWidth="1" opacity="0.4" />

      <path d="M -50 20 Q -55 5 -50 -8 L 50 -8 Q 55 5 50 20 Z" fill="#0a1620" stroke="#3a5060" strokeWidth="1" opacity="0.85" />
      <rect x="-42" y="-4" width="12" height="6" rx="1" fill="#5eff9e" opacity="0.85" />
      <rect x="-26" y="-4" width="12" height="6" rx="1" fill="#ffd166" opacity="0.85" />
      <rect x="-10" y="-4" width="12" height="6" rx="1" fill="#7fd8ff" opacity="0.85" />
      <rect x="6" y="-4"  width="12" height="6" rx="1" fill="#ff6a7a" opacity="0.85" />
      <rect x="22" y="-4" width="12" height="6" rx="1" fill="#c8a8f0" opacity="0.85" />
      <path d="M -14 -12 L 14 -12 L 16 12 L -16 12 Z" fill="#2a3a4a" opacity="0.6" />
      <path d="M -14 -40 L -14 -12 L 14 -12 L 14 -40 Q 0 -50 -14 -40 Z" fill="#3a4a5a" opacity="0.5" />

      <ellipse cx="0" cy="-30" rx="26" ry="34" fill="#0a1420" stroke="#5eff9e" strokeWidth="2" opacity="0.85" />
      <circle cx="18" cy="-30" r="2" fill="#5eff9e">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
      </circle>

      <rect x="-2.5" y="-158" width="5" height="30" fill="url(#tmMetal)" stroke="#0a1420" strokeWidth="0.8" />
      <circle cx="0" cy="-160" r="4" fill="#ffd166" stroke="#8a5a20" strokeWidth="1">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="1.2s" repeatCount="indefinite" />
      </circle>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="0" cy="-160" r={8 + i * 8} fill="none" stroke="#ffd166" strokeWidth="0.8" opacity="0.4">
          <animate attributeName="r" values={`${8 + i * 6};${28 + i * 6}`} dur="2.4s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0" dur="2.4s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {landed && [-70, 0, 70].map((x, i) => (
        <ellipse key={`f${i}`} cx={x} cy="164" rx="18" ry="10" fill="url(#tmFlame)" opacity="0.7">
          <animate attributeName="ry" values="6;14;6" dur="1.4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.85;0.4" dur="1.4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
        </ellipse>
      ))}
    </g>
  );
}
