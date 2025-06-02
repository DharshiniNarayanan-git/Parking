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

  console.log("mapppp", mapdata);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [color, setColor] = useState();

  useEffect(() => {
    getColors();
  }, [data1]);

  const getColors = () => {
    // const value = data1?.features;

    const newColors = data1?.map((element) => {
      const occupiedSpaces = element.properties.num_spaces_occupied;
      const type = element.properties.parking_bay_type;
      const name = element.properties.name;
      const location = element.geometry.coordinates;

      console.log("loca", location);

      let color;
      if (occupiedSpaces === 0 && type === "accessibility") {
        color = "#2E7D32";
      } else if (occupiedSpaces > 0 && type === "accessibility") {
        color = "red";
      } else if (occupiedSpaces === 0 && type == "ev_charging") {
        color = "#77F401";
      } else if (occupiedSpaces > 0 && type == "ev_charging") {
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
    <Container>
      <Grid container mt={5} justifyContent={"center"} gap={3}>
        <Grid container justifyContent={"center"} spacing={2}>
          <Grid item>
            <Grid item container>
              <SquareIcon style={{ color: "#2E7D32" }} />
              <Typography>Normal_Bay_Available</Typography>
            </Grid>
            <Grid item container>
              <SquareIcon style={{ color: "red" }} />
              <Typography>Normal_Bay_Occupied</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid item container>
              <SquareIcon style={{ color: "#77F401" }} />
              <Typography>Ev_Bay_Available</Typography>
            </Grid>
            <Grid item container>
              <SquareIcon style={{ color: "#0000FF" }} />
              <Typography>Ev_Bay_Occupied</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          container
          bgcolor={"lightgrey"}
          py={2}
          md={10}
          lg={12}
          rowSpacing={2}
        >
          {color?.map((item, index) => (
            <Grid item md={1} justifyContent={"center"} display={"flex"}>
              <Box
                onClick={() => handleClick(item)}
                bgcolor={item.color}
                height={"65px"}
                width={"65px"}
                border={1}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{
                  "&:hover": {
                    transform: "scale(1.2)",
                    cursor: "pointer",
                  },
                }}
              >
                <Typography
                  fontSize={"8px"}
                  color={"white"}
                  textAlign={"center"}
                >
                  {item.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Grid container justifyContent={"center"}>
          <Button
            onClick={() => {
              navigate("/home");
              dispatch(setLiveLocation(null));
            }}
            variant="outlined"
          >
            Back
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
