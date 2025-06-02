import React from "react";
import { useSelector } from "react-redux";
import Brightness1Icon from "@mui/icons-material/Brightness1";

const AccessibilityOccupiedIcon = ({
  size = "30px",
  fillColor = "#f7a801",
  strokeColor = "grey",
}) => {
  const { isStyle } = useSelector((state) => state.HomeReducer);

  const lollypop = (
    <Brightness1Icon style={{ fontSize: "10px", color: "red" }} />
  );

  const diamond = (
   
     <svg width="20px" height="10px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="14" height="14" fill="#024CAA"/>
</svg>

  );
  return isStyle ? lollypop : diamond;
};

export default AccessibilityOccupiedIcon;
