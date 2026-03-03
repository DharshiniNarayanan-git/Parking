import React, { memo, useContext, useEffect, useState } from "react";
import { MapContext } from "../App";
import { Drawer, Grid, Typography } from "@mui/material";

function DrawerCom({ open, toggleDrawer }) {
  const { routes, setRouteIndex, routeIndex } = useContext(MapContext);

  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  return (
  <Drawer
    open={open}
    onClose={toggleDrawer(false)}
    anchor="right"
    PaperProps={{
      sx: {
        width: { xs: "100%", sm: 350 },
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        p: 3,
      },
    }}
  >
    <Grid container direction="column" gap={3}>
      {/* Header */}
      <Grid item>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          🚗 Current Route
        </Typography>
        <Typography color="text.secondary">
          {selected?.summary}
        </Typography>
      </Grid>

      {/* Route Info Card */}
      <Grid
        item
        sx={{
          background: "#f5f7fa",
          borderRadius: 3,
          p: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Route Info
        </Typography>

        <Grid container direction="column" gap={2}>
          <Grid item>
            <Typography fontSize={14} color="text.secondary">
              Origin
            </Typography>
            <Typography fontWeight="medium">
              {leg?.start_address?.split(",")[0]}
            </Typography>
          </Grid>

          <Grid item>
            <Typography fontSize={14} color="text.secondary">
              Destination
            </Typography>
            <Typography fontWeight="medium">
              {leg?.end_address?.split(",")[0]}
            </Typography>
          </Grid>

          <Grid item display="flex" justifyContent="space-between">
            <Typography>
              📏 {leg?.distance?.text}
            </Typography>
            <Typography>
              ⏱ {leg?.duration?.text}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {/* Other Routes */}
      <Grid item>
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Alternative Routes
        </Typography>

        <Grid container direction="column" gap={1}>
          {routes?.map((route, index) => (
            <Grid item key={route.summary}>
              <button
                onClick={() => setRouteIndex(index)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "12px",
                  border:
                    index === routeIndex
                      ? "2px solid #0597FF"
                      : "1px solid #ddd",
                  background:
                    index === routeIndex ? "#e3f2fd" : "#ffffff",
                  fontWeight:
                    index === routeIndex ? "600" : "400",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                }}
              >
                {route.summary}
              </button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  </Drawer>
);
}

export default memo(DrawerCom);
