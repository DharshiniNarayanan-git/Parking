export const ev_available = `
<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">

<defs>

<!-- ✅ Teal Gradient -->
<radialGradient id="tealSphereGradient" cx="50%" cy="50%" r="50%">
  <stop offset="10%" style="stop-color:#2dd4bf; stop-opacity:1" />
  <stop offset="100%" style="stop-color:#0f766e; stop-opacity:1" />
</radialGradient>

<!-- Optional Inner Glow -->
<linearGradient id="innerGlowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="0%" style="stop-color:#14b8a6; stop-opacity:1" />
  <stop offset="100%" style="stop-color:#0d9488; stop-opacity:1" />
</linearGradient>

</defs>

<!-- ✅ Outer Circle -->
<circle cx="50" cy="50" r="40" fill="url(#tealSphereGradient)" />

<!-- ✅ Animated Inner Ring -->
<circle cx="50" cy="50" r="20" fill="none" stroke="#5eead4" stroke-width="2">
  <animate
     attributeName="stroke-opacity"
     values="1;0;1"
     dur="1s"
     repeatCount="indefinite" />
</circle>

</svg>
`;