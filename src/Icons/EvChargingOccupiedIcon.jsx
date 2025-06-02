import React from "react";
import noparking from "../Assets/no-parking-sign.png";
import { useSelector } from "react-redux";

const EvChargingOccupiedIcon = ({
  size = "30px",
  fillColor = "#fca700",
  strokeColor = "red",
  textColor = "red",
}) => {
  const { isStyle } = useSelector((state) => state.HomeReducer);

  const circle = (
    <svg
      height="30px"
      width="30px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
    >
      <circle cx="8" cy="8" r="7" stroke="red" strokeWidth="1" fill="#fca700" />
      <text
        x="8"
        y="12"
        fill="red"
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

      <image href={noparking} x="8.5" y="4.5" height="7" width="7" />
    </svg>
  );

  return isStyle ? circle : pin;
};

export default EvChargingOccupiedIcon;
