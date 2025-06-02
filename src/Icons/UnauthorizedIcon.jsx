import React from "react";
import { useSelector } from "react-redux";
import Brightness1Icon from "@mui/icons-material/Brightness1";


const Unauthorized = ({
  size = "30px",
  fillColor = "#FA3636",
  strokeColor = "grey",
  textColor = "white",
}) => {

  const { isStyle } = useSelector((state) => state.HomeReducer);

// const unauthorized1 = (
// <svg width={size} height={size} viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
// <defs>
// <radialGradient id="metallicRedSphereGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
// <stop offset="10%" style= {{stopColor:'#FF7518',stopOpacity:1}}/>
// <stop offset="100%" style= {{stopColor:'#FF4433',stopOpacity:1}}/>
// </radialGradient>
// <linearGradient id="metallicPlatinumStickGradient" x1="0%" y1="0%" x2="0%" y2="100%">
// <stop offset="0%" style= {{stopColor:'#e5e5e5',stopOpacity:1}} />
// <stop offset="50%" style= {{stopColor:'#bfbfbf',stopOpacity:1}} />
// <stop offset="100%" style= {{stopColor:'#8c8c8c',stopOpacity:1}} />
// </linearGradient>
// <radialGradient id="stickHighlightGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
// <stop offset="40%" style= {{stopColor:'white',stopOpacity:0.6}}/>
// <stop offset="100%" style= {{stopColor:'transparent',stopOpacity:0}}/>
// </radialGradient>
 
// <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
// <feDropShadow dx="4" dy="4" stdDeviation="3" flood-color="#555" />
// </filter>
// </defs>
// <circle cx="50" cy="50" r="40" fill="url(#metallicRedSphereGradient)" filter="url(#shadow)" />

// <rect x="45" y="90" width="10" height="110" fill="url(#metallicPlatinumStickGradient)" />
// <rect x="45" y="90" width="10" height="110" fill="url(#stickHighlightGradient)" style={{mixBlendMode:'screen'}} />
// <polygon points="45,200 55,200 50,180" fill="url(#metallicPlatinumStickGradient)" />
// <circle cx="50" cy="200" r="5" fill="#777" />
// </svg>
// );

const lollypop = (
  <Brightness1Icon style={{ fontSize: "10px", color: "orange" }} /> 
 );

const unauthorized =(

//  <svg fill="#D85802" width="20px" height="15px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21,21H3L12,3Z"/></svg>


<svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9998 9.00023V13.0002M11.9998 17.0002H12.0098M10.6151 3.89195L2.39019 18.0986C1.93398 18.8866 1.70588 19.2806 1.73959 19.6039C1.769 19.886 1.91677 20.1423 2.14613 20.309C2.40908 20.5002 2.86435 20.5002 3.77487 20.5002H20.2246C21.1352 20.5002 21.5904 20.5002 21.8534 20.309C22.0827 20.1423 22.2305 19.886 22.2599 19.6039C22.2936 19.2806 22.0655 18.8866 21.6093 18.0986L13.3844 3.89195C12.9299 3.10679 12.7026 2.71421 12.4061 2.58235C12.1474 2.46734 11.8521 2.46734 11.5935 2.58235C11.2969 2.71421 11.0696 3.10679 10.6151 3.89195Z" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);
    return isStyle ? lollypop : unauthorized;
}

export default Unauthorized;
