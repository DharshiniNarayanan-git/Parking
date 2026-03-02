import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SquareIcon from "@mui/icons-material/Square";
import { MapContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDashCenter, setDashValue, setZoom } from "../redux/mapaction";
import { setLiveLocation } from "../redux/homeaction";

function Dashboard() {
  const { mapdata } = useContext(MapContext);

  const data1 = mapdata;

  console.log("dashData", mapdata);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [color, setColor] = useState();

  useEffect(() => {
    getColors();
  }, [data1]);

  const getColors = () => {
    // const value = data1?.features;

    const newColors = data1?.map((element) => {
      const occupiedSpaces = element.properties.status;
      const type = element.properties.parking_bay_type;
      const name = element.properties.name;
      const location = element.geometry.coordinates;

      console.log("loca", location);

      let color;
      if (occupiedSpaces === 'available' && type === "accessibility") {
        color = "#2E7D32";
      } else if (occupiedSpaces === 'occupied' && type === "accessibility") {
        color = "red";
      } else if (occupiedSpaces === 'available' && type == "ev_charging") {
        color = "#77F401";
      } else if (occupiedSpaces === 'occupied' && type == "ev_charging") {
        color = "blue";
      }

      return { color, name, location };
    });

    setColor(newColors);
  };

  const handleClick = (item) => {
    dispatch(setDashValue(1));
    dispatch(setDashCenter({ lat: item.location[1], lng: item.location[0] }));
    dispatch(setLiveLocation(null));
    navigate("/home");

  };

  return (
  <Container maxWidth="lg" sx={{ mt: 1 }}>
    {/* Title */}
    <Typography
      variant="h4"
      textAlign="center"
      fontWeight="bold"
      mb={2}
    >
      Parking Dashboard
    </Typography>

    {/* Legend Section */}
    <Box
      sx={{
        background: "#f5f5f5",
        p: 2,
        borderRadius: "16px",
        boxShadow: 3,
        mb: 3,
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {[
          { color: "#2E7D32", label: "Normal Available" },
          { color: "red", label: "Normal Occupied" },
          { color: "#77F401", label: "EV Available" },
          { color: "#0000FF", label: "EV Occupied" },
        ].map((item, index) => (
          <Grid item key={index}>
            <Box display="flex" alignItems="center" gap={1}>
              <SquareIcon sx={{ color: item.color }} />
              <Typography fontWeight="500">
                {item.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>

    {/* Parking Grid Section */}
    <Box
      sx={{
        background: "#fafafa",
        p: 3,
        borderRadius: "20px",
        boxShadow: 4,
        overflowY: "auto",
        maxHeight: "50vh",
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        {color?.map((item, index) => (
          <Grid item xs={6} sm={4} md={2} key={index}>
            <Box
              onClick={() => handleClick(item)}
              sx={{
                backgroundColor: item.color,
                height: 70,
                borderRadius: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                boxShadow: 4,
                transition: "all 0.3s ease",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "12px",
                px: 1,
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: 8,
                },
              }}
            >
              {item.name}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>

    {/* Back Button */}
    <Box display="flex" justifyContent="center" mt={2.5}>
      <Button
        onClick={() => {
          navigate("/home");
          dispatch(setLiveLocation(null));
        }}
        variant="contained"
        sx={{
          borderRadius: "30px",
          px: 5,
          py: 1.2,
          fontWeight: "bold",
          background: "linear-gradient(45deg, #1976d2, #42a5f5)",
        }}
      >
        Back to Map
      </Button>
    </Box>
  </Container>
);
}

export default Dashboard;
