import React, { memo, useContext, useEffect, useState } from "react";
import { MapContext } from "../App";
import { Drawer, Grid, Typography } from "@mui/material";

function DrawerCom({ open, toggleDrawer }) {
  const { routes, setRouteIndex, routeIndex } = useContext(MapContext);

  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  return (
    <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
      <Grid container width={250} p={3} gap={2}>
        <Grid item md={12} borderBottom={1} borderColor={"gray"}>
          <Typography variant="h5">Current Route</Typography>
          <Typography>{selected?.summary}</Typography>
        </Grid>

        <Grid
          item
          container
          md={12}
          gap={1}
          borderBottom={1}
          borderColor={"gray"}
        >
          <Typography variant="h5">Route Info</Typography>

          <Grid item md={12}>
            <Typography fontSize={16} fontWeight={"bold"}>
              {" "}
              Origin{" "}
            </Typography>
            <Typography>{leg?.start_address.split(",")[0]} </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography fontSize={16} fontWeight={"bold"}>
              Destination
            </Typography>
            <Typography>{leg?.end_address.split(",")[0]}</Typography>
          </Grid>

          <Grid item>
            <Typography>Distance: {leg?.distance?.text}</Typography>
            <Typography>Duration: {leg?.duration?.text}</Typography>
          </Grid>
        </Grid>

        <Grid item container>
          <Typography variant="h5">Other Routes</Typography>
          <ul>
            {routes?.map((route, index) => (
              <li key={route.summary}>
                <button
                  onClick={() => setRouteIndex(index)}
                  style={{ cursor: "pointer" }}
                >
                  {route.summary}
                </button>
              </li>
            ))}
          </ul>
        </Grid>
      </Grid>
    </Drawer>
  );
}

export default memo(DrawerCom);
