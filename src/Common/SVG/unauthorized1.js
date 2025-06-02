export const unauthorized1 = `
<svg width="100" height="200" viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
<!-- Define gradients and filters for realistic look -->
<defs>
<!-- Radial Gradient for the Metallic Red Sphere -->
<radialGradient id="metallicRedSphereGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
<stop offset="10%" style="stop-color:#FFA500; stop-opacity:1" />
<stop offset="100%" style="stop-color:#FF9A00; stop-opacity:1" />
</radialGradient>
<!-- Linear Gradient for the Metallic Platinum Stick -->
<linearGradient id="metallicPlatinumStickGradient" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" style="stop-color:#e5e5e5; stop-opacity:1" />
<stop offset="50%" style="stop-color:#bfbfbf; stop-opacity:1" />
<stop offset="100%" style="stop-color:#8c8c8c; stop-opacity:1" />
</linearGradient>
<!-- Highlight for Extra Shine Effect -->
<radialGradient id="stickHighlightGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
<stop offset="40%" style="stop-color:white; stop-opacity:0.6" />
<stop offset="100%" style="stop-color:transparent; stop-opacity:0" />
</radialGradient>
 
    <!-- Shadow Filter for Depth -->
<filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
<feDropShadow dx="4" dy="4" stdDeviation="3" flood-color="#555" />
</filter>
</defs>
<!-- Metallic Red Sphere with shadow -->
<circle cx="50" cy="50" r="40" fill="url(#metallicRedSphereGradient)" filter="url(#shadow)" />
<!-- Shiny Metallic Platinum Stick with gradient and highlight -->
<!-- Rectangular section of the stick with reduced width -->
<rect x="45" y="90" width="10" height="110" fill="url(#metallicPlatinumStickGradient)" />
<rect x="45" y="90" width="10" height="110" fill="url(#stickHighlightGradient)" style="mix-blend-mode: screen;" />
<!-- Sharp Pin at the bottom -->
<polygon points="45,200 55,200 50,180" fill="url(#metallicPlatinumStickGradient)" />
<!-- Optional: Add a small circle at the bottom of the pin for additional detail -->
<circle cx="50" cy="200" r="5" fill="#777" />
</svg>
`;