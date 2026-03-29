import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { MapContext } from "../App";
import { useContext } from "react";

export default function BasicMenu({ open, anchorEl, handleClose }) {
  const { handleLogout } = useContext(MapContext);
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/dash");
  };

  const goToGraph = () => {
    navigate("/graph");
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem
        onClick={() => {
          handleClose();
          goToDashboard();
        }}
      >
        Dashboard
      </MenuItem>
      {/* <MenuItem
        onClick={() => {
          handleClose();
          goToGraph();
        }}
      >
        Graph
      </MenuItem> */}
      {/* <MenuItem onClick={handleLogout}>Logout</MenuItem> */}
      <MenuItem onClick={() => navigate("/")}>Logout</MenuItem>
    </Menu>
  );
}
