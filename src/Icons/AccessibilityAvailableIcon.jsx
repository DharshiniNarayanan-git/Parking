import React from "react";
import car from "../Assets/car.png";
import parking from "../Assets/parking.gif";
import { useSelector } from "react-redux";
import Brightness1Icon from "@mui/icons-material/Brightness1";

const AccessibilityAvailableIcon = ({
  size = "30px",
  fillColor,
  strokeColor = "grey",
  textColor = "black",
  text = "A",
}) => {
  const { isStyle } = useSelector((state) => state.HomeReducer);

  // const lollypop = (
  //   <svg width={size} height={size} viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
  //     <defs>
  //       <radialGradient id="metallicRedSphereGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
  //         <stop offset="10%" style={{ stopColor: "#06D001", stopOpacity: 1 }} />
  //         <stop offset="100%" style={{ stopColor: "#059212", stopOpacity: 1 }} />
  //       </radialGradient>
  //       <linearGradient id="metallicPlatinumStickGradient" x1="0%" y1="0%" x2="0%" y2="100%">
  //         <stop offset="0%" style={{ stopColor: "#e5e5e5", stopOpacity: 1 }} />
  //         <stop offset="50%" style={{ stopColor: "#bfbfbf", stopOpacity: 1 }} />
  //         <stop offset="100%" style={{ stopColor: "#8c8c8c", stopOpacity: 1 }} />
  //       </linearGradient>
  //       <radialGradient id="stickHighlightGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
  //         <stop offset="40%" style={{ stopColor: "white", stopOpacity: 0.6 }} />
  //         <stop offset="100%" style={{ stopColor: "transparent", stopOpacity: 0 }} />
  //       </radialGradient>
  //       <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
  //         <feDropShadow dx="4" dy="4" stdDeviation="3" floodColor="#555" />
  //       </filter>
  //     </defs>

  //     <circle
  //       cx="50"
  //       cy="50"
  //       r="40"
  //       fill="url(#metallicRedSphereGradient)"
  //       filter="url(#shadow)"
  //       style={{ stroke: "black", strokeWidth: "2px" }}
  //     />
  //     <rect
  //       x="45"
  //       y="90"
  //       width="10"
  //       height="110"
  //       fill="url(#metallicPlatinumStickGradient)"
  //       style={{ stroke: "black", strokeWidth: "1px" }}
  //     />
  //     <rect
  //       x="45"
  //       y="90"
  //       width="10"
  //       height="110"
  //       fill="url(#stickHighlightGradient)"
  //       style={{ mixBlendMode: "screen" }}
  //     />
  //     <polygon
  //       points="45,200 55,200 50,180"
  //       fill="url(#metallicPlatinumStickGradient)"
  //       style={{ stroke: "black", strokeWidth: "1px" }}
  //     />
  //     <circle cx="50" cy="200" r="5" fill="#777" style={{ stroke: "black", strokeWidth: "1px" }} />
  //   </svg>
  // );

  const lollypop = (
    <Brightness1Icon style={{ fontSize: "10px", color: "green" }} />
  );
  const circle = (
    // <svg
    //   width="25px"
    //   height="25px"
    //   viewBox="0 0 100 200"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <defs>
    //     <radialGradient
    //       id="fluorescentGreenSphereGradient"
    //       cx="50%"
    //       cy="50%"
    //       r="50%"
    //       fx="50%"
    //       fy="50%"
    //     >
    //       <stop offset="10%" style={{ stopColor: "#00ff00", stopOpacity: 1 }} />
    //       <stop
    //         offset="100%"
    //         style={{ stopColor: "#009900", stopOpacity: 1 }}
    //       />
    //     </radialGradient>
    //     <linearGradient
    //       id="protrusionGradient"
    //       x1="0%"
    //       y1="0%"
    //       x2="0%"
    //       y2="100%"
    //     >
    //       <stop offset="0%" style={{ stopColor: "#00ff00", stopOpacity: 1 }} />
    //       <stop
    //         offset="100%"
    //         style={{ stopColor: "#009900", stopOpacity: 1 }}
    //       />
    //     </linearGradient>
    //   </defs>
    //   <circle
    //     cx="50"
    //     cy="50"
    //     r="40"
    //     fill="url(#fluorescentGreenSphereGradient)"
    //   />
    // </svg>
    <svg width="20px" height="10px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="8" cy="8" r="8" fill={fillColor}/>
</svg>

  );

  return isStyle ? lollypop : circle;
};

export default AccessibilityAvailableIcon;
