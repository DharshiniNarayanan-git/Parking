export const availableIconSVG1 = `
<svg viewBox="0 0 150 190" xmlns="http://www.w3.org/2000/svg">

<defs>

<!-- ✅ Updated Green Gradient -->
<radialGradient id="metallicGreenSphereGradient" cx="50%" cy="50%" r="50%">
  <stop offset="10%" style="stop-color:#22c55e; stop-opacity:1" />
  <stop offset="100%" style="stop-color:#16a34a; stop-opacity:1" />
</radialGradient>

<!-- Stick remains metallic -->
<linearGradient id="metallicPlatinumStickGradient" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="0%" style="stop-color:#e5e5e5; stop-opacity:1" />
  <stop offset="50%" style="stop-color:#bfbfbf; stop-opacity:1" />
  <stop offset="100%" style="stop-color:#8c8c8c; stop-opacity:1" />
</linearGradient>

<!-- Highlight -->
<radialGradient id="stickHighlightGradient" cx="50%" cy="50%" r="50%">
  <stop offset="40%" style="stop-color:white; stop-opacity:0.6" />
  <stop offset="100%" style="stop-color:transparent; stop-opacity:0" />
</radialGradient>

<!-- Shadow -->
<filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
  <feDropShadow dx="4" dy="4" stdDeviation="3" flood-color="#555" />
</filter>

</defs>

<!-- ✅ Green Sphere -->
<circle cx="50" cy="50" r="40" fill="url(#metallicGreenSphereGradient)" filter="url(#shadow)" />

<!-- Stick -->
<rect x="45" y="90" width="10" height="110" fill="url(#metallicPlatinumStickGradient)" />
<rect x="45" y="90" width="10" height="110" fill="url(#stickHighlightGradient)" style="mix-blend-mode: screen;" />

<!-- Pin -->
<polygon points="45,200 55,200 50,180" fill="url(#metallicPlatinumStickGradient)" />

<!-- Bottom Dot -->
<circle cx="50" cy="200" r="5" fill="#9ca3af" />

</svg>
`;