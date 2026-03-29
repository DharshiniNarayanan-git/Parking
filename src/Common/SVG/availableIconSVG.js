export const availableIconSVG = `
<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">

<defs>

<!-- Updated Green Gradient -->
<radialGradient id="fluorescentGreenSphereGradient" cx="50%" cy="50%" r="50%">
  <stop offset="10%" style="stop-color:#22c55e; stop-opacity:1" />
  <stop offset="100%" style="stop-color:#16a34a; stop-opacity:1" />
</radialGradient>

<linearGradient id="protrusionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="0%" style="stop-color:#22c55e; stop-opacity:1" />
  <stop offset="100%" style="stop-color:#16a34a; stop-opacity:1" />
</linearGradient>

</defs>

<!-- Main Circle -->
<circle cx="50" cy="50" r="40" fill="url(#fluorescentGreenSphereGradient)" />

<!-- Inner Ring -->
<circle cx="50" cy="50" r="20" fill="none" stroke="#bbf7d0" stroke-width="2">
  <animate
    attributeName="stroke-opacity"
    values="1;0;1"
    dur="1s"
    repeatCount="indefinite" />
</circle>

</svg>
`;