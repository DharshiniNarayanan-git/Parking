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
    setSelectedBox('all-avail')

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
        })
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
        })
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
  
        dispatch(setLiveLocation({ lat: 53.350140, lng: -6.266155 }));
        dispatch(setCenter({ lat: 53.350140, lng: -6.266155 }));
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
      }
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
      const { max_capacity, num_spaces_occupied, authSts, status } =
        element.properties;

      if (max_capacity > num_spaces_occupied) {
        availableCount += max_capacity - num_spaces_occupied;
      }

      if (num_spaces_occupied > 0) {
        occupiedCount += num_spaces_occupied;
      }

      if (status === "occupied" && authSts === "Occupied and not authorized") {
        unauthorized += 1;
      }
    });

    setAvailableCount(availableCount);
    setOccupiedCount(occupiedCount);
    setUnauthorizedCount(unauthorized);
    setNoDataCOunt(noData);
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
      const { max_capacity, num_spaces_occupied, parking_bay_type } =
        element.properties;

      // Check if the parking bay type is 'ev_charging'
      if (parking_bay_type === value) {
        // Calculate available spaces
        if (max_capacity > num_spaces_occupied) {
          availableCount += max_capacity - num_spaces_occupied;
        }

        // Calculate occupied spaces
        if (num_spaces_occupied > 0) {
          occupiedCount += num_spaces_occupied;
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
    <Container maxWidth={false} disableGutters className="container">
      <Grid container>
        {/* AppBar */}
        <Grid item xl={12} md={12} xs={12}>
          <AppBar elevation={0} className="appbar">
            <Toolbar>
              <Grid container justifyContent={"space-between"}>
                {/* Logo */}
                <Grid
                  item
                  xs={12}
                  md={3}
                  lg={3}
                  xl={3}
                  sm={4}
                  display="flex"
                  alignItems="center"
                >
                  <Box
                    component="img"
                    src="Access_Earth_Logo.png"
                    className="logo"
                    width="50%"
                  />
                </Grid>

                {/* Buttons */}
                <Grid item xs={12} sm={5} md={4} lg={4} xl={3}>
                  <Grid
                    item
                    container
                    md={12}
                    lg={12}
                    xl={12}
                    sm={12}
                    alignItems={"center"}
                    textAlign={"end"}
                    justifyContent={"end"}
                  >
                    <Grid item xs={6} sm={4} md={4} lg={3.5} xl={3}>
                      <Button
                        onClick={() => {
                          startLiveLocation();
                          handleButtonClick("start");
                        }}
                        size="small"
                        startIcon={<MyLocationIcon color="primary" />}
                        sx={{
                          color:
                            selectedButton === "start" ? "#3ABEF9" : "#333333",
                          border: selectedButton === "start" ? 1 : 0,
                          fontSize: { sm: "11px", md: "13px" },
                        }}
                        // disabled={selectedButton === 'start'}
                        className="appbar-button"
                      >
                        Start Live
                      </Button>
                    </Grid>

                    <Grid item xs={6} sm={4} md={4} lg={3.5} xl={3}>
                      <Button
                        onClick={() => {
                          stopLiveLocation();
                          handleButtonClick("stop");
                        }}
                        size="small"
                        startIcon={<MyLocationIcon sx={{ color: "gray" }} />}
                        sx={{
                          color:
                            selectedButton === "stop" ? "#3ABEF9" : "#333333",
                          border: selectedButton === "stop" ? 1 : 0,
                          fontSize: { sm: "11px", md: "13px" },
                        }}
                        className="appbar-button"
                      >
                        Stop Live
                      </Button>
                    </Grid>
                    {/* Menu */}
                    <Grid item xs={6} sm={2} md={3} lg={1.3} xl={1.4}>
                      <Button
                        size="small"
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        sx={{ color: "black" }}
                      >
                        <MenuIcon
                          sx={{
                            fontSize: {
                              xs: "16px", // Extra small devices
                              sm: "20px", // Small devices
                              md: "24px", // Medium devices
                              lg: "30px", // Large devices
                            },
                          }}
                        />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Grid>
        <BasicMenu
          open={open}
          anchorEl={anchorEl}
          handleClose={() => setAnchorEl(null)}
        />

        {/* Body */}
        <Grid item xl={12} md={12} xs={12} lg={12} mt={10.5}>
          <Grid container>
            {/* Map */}
            <Grid item xl={9} md={9} xs={9} lg={9}>
              <MapComponent />
            </Grid>

            {/* Rigth-Side Bar */}

            <Grid item xl={3} md={3} xs={3} lg={3} className="side-panel">
              {/* Count */}
              <Grid item container gap={2} justifyContent={"center"}>
                <Grid item>
                  <Tooltip title="Click to See Available Parking Lots" arrow>
                    <Box
                      className="side-panel-count-Box"
                      onClick={() => handleAvailabilityChange("available")}
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedBox === "available" ? "#D9EAFD" : "#ffff",
                      }}
                    >
                      <AccessibilityAvailableIcon
                        fillColor={"#00B500"}
                        size={isSmall ? "5px" : isMedium ? "8px" : "10px"}
                      />
                      <Typography className="side-panel-count">
                        {availableCount}
                      </Typography>
                      <Typography className="side-panel-count-Typography">
                        AVAILABLE
                      </Typography>
                    </Box>
                  </Tooltip>
                </Grid>

                <Grid item>
                  <Tooltip title="Click to See Occupied Parking Lots" arrow>
                    <Box
                      className="side-panel-count-Box"
                      onClick={() => handleAvailabilityChange("occupied")}
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedBox === "occupied" ? "#D9EAFD" : "#ffff",
                      }}
                    >
                      <AccessibilityOccupiedIcon size="40px" />
                      <Typography className="side-panel-count">
                        {occupiedCount}
                      </Typography>
                      <Typography className="side-panel-count-Typography">
                        OCCUPIED
                      </Typography>
                    </Box>
                  </Tooltip>
                </Grid>

                <Grid item>
                  <Tooltip title="Click to See Unauthorized Parking Lots" arrow>
                    <Box
                      className="side-panel-count-Box"
                      onClick={() => handleAvailabilityChange("unauthorized")}
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedBox === "unauthorized" ? "#D9EAFD" : "#ffff",
                      }}
                    >
                      <Unauthorized size="40px" />
                      <Typography className="side-panel-count">
                        {unauthorizedCount}
                      </Typography>
                      <Typography className="side-panel-count-Typography">
                        UNAUTHORIZED
                      </Typography>
                    </Box>
                  </Tooltip>
                </Grid>

                <Grid item>
                  <Tooltip title="Click to See Nosignal Parking Lots" arrow>
                    <Box
                      className="side-panel-count-Box"
                      onClick={() => handleAvailabilityChange("nosignal")}
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedBox === "nosignal" ? "#D9EAFD" : "#ffff",
                      }}
                    >
                      <NonsensorDataIcon size="40px" />
                      <Typography className="side-panel-count">
                        {noDataCount}
                      </Typography>
                      <Typography className="side-panel-count-Typography">
                        NO SIGNAL
                      </Typography>
                    </Box>
                  </Tooltip>
                </Grid>

                <Grid item>
                  <Tooltip title="Click to See All Parking Lots" arrow>
                    <Box
                      className="side-panel-count-Box"
                      onClick={() => handleAvailabilityChange("all-avail")}
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedBox === "all-avail" ? "#D9EAFD" : "#ffff",
                      }}
                    >
                      <AccessibilityAvailableIcon
                        fillColor={"#808080"}
                        size={isSmall ? "5px" : isMedium ? "8px" : "10px"}
                      />
                      <Typography className="side-panel-count">
                        {allCount}
                      </Typography>
                      <Typography className="side-panel-count-Typography">
                        All PARKING LOTS
                      </Typography>
                    </Box>
                  </Tooltip>
                </Grid>
              </Grid>

              {/* RadioButtons */}
              <Grid
                container
                className="radio-button-margin"
                justifyContent={"center"}
              >
                <Grid item md={10.4} lg={10.4} sm={9}>
                  <Box className="radio-button-Box">
                    <RadioGroup
                      value={selectedBayType}
                      onChange={(e) => {
                        handleBayTypeChange(e);
                        filterCount(e);
                        setSelectedButton(null);
                      }}
                      className="radio-button-RadioGroup"
                    >
                      <Grid item container my={1} ml={1}>
                        <Grid item md={5.5} lg={5.5} sm={4.5}>
                          <FormControlLabel
                            value="ev_charging"
                            control={
                              <Radio
                                size="small"
                                icon={<RadioButtonUnchecked />}
                                checkedIcon={
                                  <RadioButtonCheckedIcon className="radio-button" />
                                }
                                style={{ padding: "5px" }}
                              />
                            }
                            label={
                              <Typography className="radio-button-Typography">
                                EV
                              </Typography>
                            }
                          />
                        </Grid>

                        <Grid item md={5.5} lg={5.5} sm={4.5}>
                          <FormControlLabel
                            value="accessibility"
                            control={
                              <Radio
                                size="small"
                                icon={<RadioButtonUnchecked />}
                                checkedIcon={
                                  <RadioButtonCheckedIcon className="radio-button" />
                                }
                                style={{ padding: "5px" }}
                              />
                            }
                            label={
                              <Typography className="radio-button-Typography">
                                ACCESSIBILITY
                              </Typography>
                            }
                          />
                        </Grid>

                        <Grid item md={12} lg={12} sm={9} mt={1}>
                          <FormControlLabel
                            value="all"
                            control={
                              <Radio
                                size="small"
                                icon={<RadioButtonUnchecked />}
                                checkedIcon={
                                  <RadioButtonCheckedIcon className="radio-button" />
                                }
                                style={{ padding: "5px" }}
                              />
                            }
                            label={
                              <Typography className="radio-button-Typography">
                                ALL BAY
                              </Typography>
                            }
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>
                  </Box>
                </Grid>

              </Grid>

              {/* Toggle Map Icon */}
              <Grid
                item
                container
                gap={1}
                justifyContent={"center"}
                alignItems="center" 
                className="radio-button-margin"
              >
                <Grid item lg={5}>
                  <Button
                    sx={{
                      color: "black",
                      backgroundColor: "white",
                      fontSize: isSmall ? "6px" : isMedium ? "8px" : "13px",
                      fontWeight: "normal",
                    }}
                    onClick={toggleDrawer(true)}
                    disabled={liveLocation === null || destination === null}
                  >
                    Show Other Routes
                  </Button>
                </Grid>
                <Grid item lg={5}>
                  <Button
                    sx={{
                      color: "black",
                      backgroundColor: "white",
                      fontSize: isSmall ? "6px" : isMedium ? "8px" : "13px",
                      fontWeight: "normal",
                    }}
                    onClick={handleToggle}
                  >
                    Change Map Icon
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <DrawerCom open={open1} toggleDrawer={toggleDrawer} />
      </Grid>
    </Container>
  );
};

export default Home;
