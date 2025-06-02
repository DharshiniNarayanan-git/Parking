
export const unauthorized = `
<svg width="16px" height="16px" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9998 9.00023V13.0002M11.9998 17.0002H12.0098M10.6151 3.89195L2.39019 18.0986C1.93398 18.8866 1.70588 19.2806 1.73959 19.6039C1.769 19.886 1.91677 20.1423 2.14613 20.309C2.40908 20.5002 2.86435 20.5002 3.77487 20.5002H20.2246C21.1352 20.5002 21.5904 20.5002 21.8534 20.309C22.0827 20.1423 22.2305 19.886 22.2599 19.6039C22.2936 19.2806 22.0655 18.8866 21.6093 18.0986L13.3844 3.89195C12.9299 3.10679 12.7026 2.71421 12.4061 2.58235C12.1474 2.46734 11.8521 2.46734 11.5935 2.58235C11.2969 2.71421 11.0696 3.10679 10.6151 3.89195Z" stroke="red" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`

export const unauthorized1 = `
<svg width="0" height="0" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
<!-- Define gradients and filters for realistic look -->
<defs>
<!-- Radial Gradient for the Deep Orange Triangle -->
<radialGradient id="deepOrangeTriangleGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
<stop offset="10%" style="stop-color:#ff6600; stop-opacity:1" /> <!-- Deeper orange -->
<stop offset="100%" style="stop-color:#cc5200; stop-opacity:1" /> <!-- Even deeper orange -->
</radialGradient>
<!-- Gradient for the Protrusion -->
<linearGradient id="protrusionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" style="stop-color:#ff6600; stop-opacity:1" />
<stop offset="100%" style="stop-color:#cc5200; stop-opacity:1" />
</linearGradient>
 
    <!-- Reflection Effect -->
<linearGradient id="reflectionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" style="stop-color:rgba(255,255,255,0.5); stop-opacity:0.5" />
<stop offset="100%" style="stop-color:transparent; stop-opacity:0" />
</linearGradient>
 
    <!-- Flickering animation for the inner triangle -->
<animate id="flicker" attributeName="stroke" values="#000000; #ff6600; #000000" dur="1s" repeatCount="indefinite" />
</defs>
<!-- Deep Orange Triangle with gradient and reflection -->
<polygon points="50,30 80,90 20,90" fill="url(#deepOrangeTriangleGradient)" />
<polygon points="50,30 80,90 20,90" fill="url(#reflectionGradient)" opacity="0.3" />
<!-- Centered Inner Triangle with a black border and flickering effect -->
<polygon points="50,50 65,85 35,85" fill="none" stroke="#000000" stroke-width="2">
<animate
      attributeName="stroke"
      values="#000000; #ff6600; #000000"
      dur="1s"
      repeatCount="indefinite" />
</polygon>
<!-- Reflection Effect for the Inner Triangle -->
<polygon points="50,50 65,85 35,85" fill="none" stroke="url(#reflectionGradient)" stroke-width="2" opacity="0.5" />
<!-- Small Circle at the Bottom of the Design -->
</svg>
 `;