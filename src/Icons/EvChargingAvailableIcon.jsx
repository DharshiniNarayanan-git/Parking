import React from "react";
import evehicle from "../Assets/electric-car.png";
import { useSelector } from "react-redux";

const EvChargingAvailableIcon = ({
  size = "30px",
  fillColor = "#007433",
  strokeColor = "#fff",
  textColor = "#fff",
}) => {
  const { isStyle } = useSelector((state) => state.HomeReducer);

  const circle = (
    <svg
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
    >
      <circle
        cx="8"
        cy="8"
        r="7"
        stroke={strokeColor}
        strokeWidth="1"
        fill={fillColor}
      />
      <text
        x="8"
        y="12"
        fill={textColor}
        fontSize="10px"
        textAnchor="middle"
        fontWeight="bold"
      >
        E
      </text>
    </svg>
  );

  const pin = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 13V21M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614
 9.23858 13 12 13Z"
        stroke={fillColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <image href={evehicle} x="9" y="4.5" height="6.5" width="6.5" />
    </svg>
  );

  return isStyle ? circle : pin;
};

export default EvChargingAvailableIcon;
