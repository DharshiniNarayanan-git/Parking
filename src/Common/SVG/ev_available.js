export const ev_available = `
<svg width="0" height="0" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
<!-- Define gradients and filters for realistic look -->
<defs>
<!-- Radial Gradient for the Fluorescent Green Sphere -->
<radialGradient id="fluorescentGreenSphereGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
<stop offset="10%" style="stop-color:#9CFF2E; stop-opacity:1" />
<stop offset="100%" style="stop-color:#38E54D; stop-opacity:1" />
</radialGradient>
<!-- Gradient for the Protrusion -->
<linearGradient id="protrusionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" style="stop-color:#00ff00; stop-opacity:1" />
<stop offset="100%" style="stop-color:#009900; stop-opacity:1" />
</linearGradient>

 <!-- Flickering animation -->
<animate id="flicker" attributeName="stroke-opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
</defs>
<!-- Fluorescent Green Sphere with shadow -->
<circle cx="50" cy="50" r="40" fill="url(#fluorescentGreenSphereGradient)" />
<!-- Protruding Inner Circle with border -->
<circle cx="50" cy="50" r="20" fill="none" stroke="#FFFF00" stroke-width="2">
<animate
   attributeName="stroke-opacity"
   values="1;0;1"
   dur="1s"
   repeatCount="indefinite" />
</circle>
</svg>
 `;
