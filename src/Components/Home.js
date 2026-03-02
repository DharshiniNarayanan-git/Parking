import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import MyLocationIcon from "@mui/icons-material/MyLocation";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import "react-toastify/dist/ReactToastify.css";

import "../Styles/Home.css";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import {
  setAvailability,
  setBayType,
  setError,
  setLiveLocation,
  setStyle,
} from "../redux/homeaction";
import AccessibilityAvailableIcon from "../Icons/AccessibilityAvailableIcon";
import Unauthorized from "../Icons/UnauthorizedIcon";
import AccessibilityOccupiedIcon from "../Icons/AccessibilityOccupiedIcon";
import NonsensorDataIcon from "../Icons/NonsensorDataIcon";
import RadioButtonUnchecked from "../Icons/RadioButtonUnchecked";
import BasicMenu from "./Menu";
import MapComponent from "./Mapcomponent";
import {
  setCenter,
  setDashCenter,
  setDestination,
  setZoom,
} from "../redux/mapaction";
import DrawerCom from "./DrawerCom";
import { MapContext } from "../App";

const Home = () => {
  const { setAvailableCount, availableCount, homedata, centerLocation } =
    useContext(MapContext);

  console.log("Homeeee", homedata);

  const data1 = homedata;

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLarge = useMediaQuery(theme.breakpoints.up("md"));

  const [watchId, setWatchId] = useState(null);
  const [occupiedCount, setOccupiedCount] = useState(0);
  const [unauthorizedCount, setUnauthorizedCount] = useState(0);
  const [noDataCount, setNoDataCOunt] = useState(0);
  const [allCount, setAllCount] = useState(0);
  const [selectedButton, setSelectedButton] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isStyle, setIsStyle] = useState(false);
  const [selectedBayType, setSelectedBayType] = useState("all");
  const [selectedBox, setSelectedBox] = useState("all-avail");

  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const { liveLocation } = useSelector((state) => state.HomeReducer);
  const { destination } = useSelector((state) => state.MapReducer);

  const handleBayTypeChange = (event) => {
    const value = event.target.value;
    console.log("valllll", value);

    setSelectedBayType(value);
    setSelectedBox("all-avail");

    dispatch(setBayType(value));

    dispatch(setDashCenter(null));
    dispatch(setLiveLocation(null));

    if (value === "ev_charging") {
      dispatch(setAvailability(null));
      dispatch(setZoom(12));
      dispatch(setCenter({ lat: centerLocation.lat, lng: centerLocation.lng }));
    }

    if (value == "accessibility") {
      dispatch(setAvailability(null));
      dispatch(setZoom(12));
      dispatch(setCenter({ lat: centerLocation.lat, lng: centerLocation.lng }));
    }

    if (value === "all") {
      dispatch(setBayType(null));
      // dispatch(setZoom(13.1));
      dispatch(setZoom(12));
      dispatch(setAvailability(null));
      dispatch(
        setCenter({
          lat: centerLocation.lat,
          lng: centerLocation.lng,
        }),
      );
    }
  };

  const handleAvailabilityChange = (value) => {
    console.log("valueee", value, selectedBayType);
    setSelectedBox(value);

    if (value === "available" && selectedBayType === "ev_charging") {
      dispatch(setAvailability("ev_available"));
    } else if (value === "unauthorized") {
      dispatch(setAvailability("unauthorized"));
    } else if (value === "occupied" && selectedBayType === "ev_charging") {
      dispatch(setAvailability("ev_occupied"));
    } else if (value === "available" && selectedBayType === "accessibility") {
      dispatch(setAvailability("normal_available"));
    } else if (value === "occupied" && selectedBayType === "accessibility") {
      dispatch(setAvailability("normal_occupied"));
    } else if (value === "available" && selectedBayType === "all") {
      dispatch(setAvailability("all_available"));
    } else if (value === "occupied" && selectedBayType === "all") {
      dispatch(setAvailability("all_occupied"));
    } else if (value === "all-avail" && selectedBayType === "all") {
      dispatch(setBayType(null));
      // dispatch(setZoom(13.1));
      dispatch(setZoom(12));
      dispatch(setAvailability(null));
      dispatch(
        setCenter({
          lat: centerLocation.lat,
          lng: centerLocation.lng,
        }),
      );
    } else if (value === "all-avail" && selectedBayType === "ev_charging") {
      dispatch(setAvailability(null));
    } else if (value === "all-avail" && selectedBayType === "accessibility") {
      dispatch(setAvailability(null));
    } else if (value === "nosignal") {
      dispatch(setAvailability("nosignal"));
    }
  };

  const handleToggle = () => {
    setIsStyle((prev) => !prev);
    dispatch(setStyle(!isStyle));
  };

  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType);
  };

  console.log("live", liveLocation);

  const startLiveLocation = () => {
    if (!navigator.geolocation) {
      dispatch(setError("Geolocation is not supported by this browser"));
      return;
    }

    if (watchId) {
      // Already tracking
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log("Updated Location:", latitude, longitude);

        dispatch(setLiveLocation({ lat: 53.35014, lng: -6.266155 }));
        dispatch(setCenter({ lat: 53.35014, lng: -6.266155 }));
        dispatch(setZoom(13));
        dispatch(setDashCenter(null));
      },
      (err) => {
        console.error(`Geolocation error (${err.code}): ${err.message}`);
        dispatch(setError(`Geolocation error: ${err.message}`));
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );

    setWatchId(id);
  };

  const stopLiveLocation = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      dispatch(setLiveLocation(null));
      dispatch(setDestination(null));
      dispatch(setZoom(12));
      dispatch(setCenter({ lat: centerLocation.lat, lng: centerLocation.lng }));
    }
  };

  const totalCount = useCallback(() => {
    let availableCount = 0;
    let occupiedCount = 0;
    let unauthorized = 0;
    let noData = 0;
    let allCount = 0;

    data1?.forEach((element) => {
      const { availableSlots, occupiedSlots, authSts, status } =
        element.properties;

      if (availableSlots > 0) {
        availableCount += availableSlots;
      }

      if (occupiedSlots > 0) {
        occupiedCount += occupiedSlots;
      }

      // if (status === "occupied" && authSts === "Occupied and not authorized") {
      //   unauthorized += 1;
      // }
    });

    setAvailableCount(availableCount);
    setOccupiedCount(occupiedCount);
    // setUnauthorizedCount(unauthorized);
    // setNoDataCOunt(noData);
    setAllCount(availableCount + occupiedCount + unauthorized);
  }, [data1]);

  useEffect(() => {
    if (data1?.length > 0 && selectedBayType == "all") {
      totalCount();
    }
  }, [data1]);

  const filterCount = (event) => {
    const value = event.target.value;

    console.log("valueee", value);

    let availableCount = 0;
    let occupiedCount = 0;

    if (value === "all") {
      // Call totalCount and exit early to avoid resetting counts later
      totalCount();
      return;
    }

    data1?.forEach((element) => {
      const { availableSlots, occupiedSlots, parking_bay_type } =
        element.properties;

      // Check if the parking bay type is 'ev_charging'
      if (parking_bay_type === value) {
        // Calculate available spaces
        if (availableSlots > 0) {
          availableCount += availableSlots;
        }

        // Calculate occupied spaces
        if (occupiedSlots > 0) {
          occupiedCount += occupiedSlots;
        }
      }
    });

    // Update the state with the counts
    setAvailableCount(availableCount);
    setOccupiedCount(occupiedCount);
  };

  const [open1, setOpen1] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen1(newOpen);
  };

  return (
    <Container maxWidth={false} disableGutters>
      {/* ===== APP BAR ===== */}
      <AppBar
        elevation={0}
        sx={{
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.85)",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Box
              component="img"
              src="Access_Earth_Logo.png"
              sx={{ height: 40 }}
            />

            <Box display="flex" gap={2}>
              <Button
                onClick={() => {
                  startLiveLocation();
                  handleButtonClick("start");
                }}
                startIcon={<MyLocationIcon />}
                sx={{
                  borderRadius: "30px",
                  px: 3,
                  fontWeight: 600,
                  background:
                    selectedButton === "start"
                      ? "linear-gradient(45deg,#2196F3,#21CBF3)"
                      : "transparent",
                  color: selectedButton === "start" ? "#fff" : "#333",
                  "&:hover": {
                    background: "linear-gradient(45deg,#1976d2,#42a5f5)",
                    color: "#fff",
                  },
                }}
              >
                Start Live
              </Button>

              <Button
                onClick={() => {
                  stopLiveLocation();
                  handleButtonClick("stop");
                }}
                startIcon={<MyLocationIcon />}
                sx={{
                  borderRadius: "30px",
                  px: 3,
                  fontWeight: 600,
                  background:
                    selectedButton === "stop"
                      ? "linear-gradient(45deg,#f44336,#e57373)"
                      : "transparent",
                  color: selectedButton === "stop" ? "#fff" : "#333",
                  "&:hover": {
                    background: "linear-gradient(45deg,#d32f2f,#ef5350)",
                    color: "#fff",
                  },
                }}
              >
                Stop Live
              </Button>

              <Button onClick={(e) => setAnchorEl(e.currentTarget)}>
                <MenuIcon />
              </Button>
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>

      <BasicMenu
        open={open}
        anchorEl={anchorEl}
        handleClose={() => setAnchorEl(null)}
      />

      {/* ===== BODY ===== */}
      <Grid container sx={{ mt: 9 }}>
        {/* ===== MAP SECTION ===== */}
        <Grid item xs={12} sm={9} md={9} lg={9}>
          <Box
            sx={{
              height: "calc(100vh - 100px)",
              borderRadius: "25px",
              overflow: "hidden",
              boxShadow: 6,
              m: 1.5,
            }}
          >
            <MapComponent />
          </Box>
        </Grid>

        {/* ===== SIDE PANEL ===== */}
        <Grid item xs={12} sm={3} md={3} lg={3}>
          <Box
            sx={{
              height: "calc(100vh - 100px)",
              m: 1.5,
              px: 1.5,
              borderRadius: "20px",
              background: "#ffffff",
              boxShadow: 4,
              display: "flex",
              flexDirection: "column",
              // justifyContent: "space-between",
              gap: 3.5,
            }}
          >
            {/* ===== COUNTS SECTION ===== */}
            <Grid display="flex" flexDirection="column" gap={1.5}>
              {/* Row 1: Available + Occupied */}
              <Box display="flex" gap={1} pt={2}>
                {/* Available */}
                <Box
                  onClick={() => handleAvailabilityChange("available")}
                  sx={{
                    flex: 1,
                    p: 1,
                    borderRadius: "12px",
                    background:
                      selectedBox === "available" ? "#e8f5e9" : "#f7f7f7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    transition: "0.2s",
                    "&:hover": {
                      background: "#e8f5e9",
                    },
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#00B500",
                      }}
                    />
                    <Typography fontSize="12px" fontWeight={500}>
                      Available :
                    </Typography>
                  </Box>

                  <Typography fontSize="14px" fontWeight="bold">
                    {availableCount}
                  </Typography>
                </Box>

                {/* Occupied */}
                <Box
                  onClick={() => handleAvailabilityChange("occupied")}
                  sx={{
                    flex: 1,
                    p: 1,
                    borderRadius: "12px",
                    background:
                      selectedBox === "occupied" ? "#e3f2fd" : "#f7f7f7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    transition: "0.2s",
                    "&:hover": {
                      background: "#e3f2fd",
                    },
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#1565C0",
                      }}
                    />
                    <Typography fontSize="12px" fontWeight={500}>
                      Occupied :
                    </Typography>
                  </Box>

                  <Typography fontSize="14px" fontWeight="bold">
                    {occupiedCount}
                  </Typography>
                </Box>
              </Box>

              {/* Row 2: All Centered */}
              <Box
                onClick={() => handleAvailabilityChange("all-avail")}
                sx={{
                  p: 1,
                  borderRadius: "12px",
                  background:
                    selectedBox === "all-avail" ? "#dadac998" : "#f7f7f7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": {
                    background: "#dadac998",
                  },
                }}
              >
                <Typography fontSize="13px" fontWeight={500}>
                  All Parking :{" "}
                  <span style={{ fontWeight: "bold" }}>{allCount}</span>
                </Typography>
              </Box>
            </Grid>

            {/* ===== BAY TYPE FILTER */}
            <Box
              sx={{
                p: 2,
                borderRadius: "14px",
                background: "#f5f5f5",
              }}
            >
              <Typography fontSize="13px" fontWeight="bold" mb={1}>
                Bay Type
              </Typography>

              {/* First Row */}
              <Box display="flex" gap={2}>
                {/* EV */}
                <Box
                  onClick={() => {
                    const fakeEvent = { target: { value: "ev_charging" } };
                    handleBayTypeChange(fakeEvent);
                    filterCount(fakeEvent);
                    setSelectedButton(null);
                  }}
                  sx={{
                    flex: 1,
                    p: 1,
                    borderRadius: "10px",
                    textAlign: "center",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: 500,
                    background:
                      selectedBayType === "ev_charging" ? "#e3f2fd" : "#ffffff",
                    border:
                      selectedBayType === "ev_charging"
                        ? "1px solid #1976d2"
                        : "1px solid #e0e0e0",
                    transition: "0.2s",
                    "&:hover": {
                      background: "#e3f2fd",
                    },
                  }}
                >
                  ⚡ EV
                </Box>

                {/* Accessibility */}
                <Box
                  onClick={() => {
                    const fakeEvent = { target: { value: "accessibility" } };
                    handleBayTypeChange(fakeEvent);
                    filterCount(fakeEvent);
                    setSelectedButton(null);
                  }}
                  sx={{
                    flex: 1,
                    p: 1,
                    borderRadius: "10px",
                    textAlign: "center",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: 500,
                    background:
                      selectedBayType === "accessibility"
                        ? "#e3f2fd"
                        : "#ffffff",
                    border:
                      selectedBayType === "accessibility"
                        ? "1px solid #1976d2"
                        : "1px solid #e0e0e0",
                    transition: "0.2s",
                    "&:hover": {
                      background: "#e3f2fd",
                    },
                  }}
                >
                  ♿ Access
                </Box>
              </Box>

              {/* Second Row - All */}
              <Box
                mt={1.5}
                onClick={() => {
                  const fakeEvent = { target: { value: "all" } };
                  handleBayTypeChange(fakeEvent);
                  filterCount(fakeEvent);
                  setSelectedButton(null);
                }}
                sx={{
                  p: 1.5,
                  borderRadius: "10px",
                  textAlign: "center",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 500,
                  background: selectedBayType === "all" ? "#e3f2fd" : "#ffffff",
                  border:
                    selectedBayType === "all"
                      ? "1px solid #1976d2"
                      : "1px solid #e0e0e0",
                  transition: "0.2s",
                  "&:hover": {
                    background: "#e3f2fd",
                  },
                }}
              >
                All Bays
              </Box>
            </Box>

            {/* ===== BUTTONS ===== */}
            <Box display="flex" flexDirection="column" gap={1.5}>
              <Button
                variant="contained"
                size="small"
                onClick={toggleDrawer(true)}
                disabled={liveLocation === null || destination === null}
                sx={{
                  borderRadius: "20px",
                  fontSize: "13px",
                  py: 1,
                  background: "white",
                }}
              >
                Show Other Routes
              </Button>

              <Button
                variant="outlined"
                size="small"
                onClick={handleToggle}
                sx={{
                  borderRadius: "20px",
                  fontSize: "13px",
                  py: 1,
                }}
              >
                Change Map Icon
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <DrawerCom open={open1} toggleDrawer={toggleDrawer} />
    </Container>
  );
};

export default Home;
