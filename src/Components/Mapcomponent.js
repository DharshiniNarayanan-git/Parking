import {
  useAdvancedMarkerRef,
  useApiIsLoaded,
} from "@vis.gl/react-google-maps";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "../Styles/MapComponent.css";
import Directions from "./Directions";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../redux/homeaction";
import {
  setCenter,
  setDashZoom,
  setDestination,
  setZoom,
} from "../redux/mapaction";

import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";
import { MapContext } from "../App";
import { availableIconSVG } from "../Common/SVG/availableIconSVG";
import { availableIconSVG1 } from "../Common/SVG/availableIconSVG1";
import { ev_available } from "../Common/SVG/ev_available";
import { ev_available1 } from "../Common/SVG/ev_available1";
import { occupiedIconSVG } from "../Common/SVG/occupiedIconSVG";
import { occupiedIconSVG1 } from "../Common/SVG/occupiedIconSVG1";
import { unauthorized } from "../Common/SVG/unauthorized";
import { unauthorized1 } from "../Common/SVG/unauthorized1";
import { noData } from "../Common/SVG/noData";
import { noData1 } from "../Common/SVG/noData1";
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function MapComponent() {
  console.log("Map child Render");

  const { mapdata, centerLocation } = useContext(MapContext);
  const { transcript, listening, resetTranscript,browserSupportsSpeechRecognition, } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    console.log('Your browser doesnt support speech recognition software!')
    
  }
  const data2 = mapdata;

  console.log("mapdata", data2);

  const dispatch = useDispatch();

  const { liveLocation, bayType, availability, isStyle } = useSelector(
    (state) => state.HomeReducer
  );
  const { center, zoom, dashvalue, dashcenter } = useSelector(
    (state) => state.MapReducer
  );

  const [showTraffic, setShowTraffic] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);
 
  const mapRef = useRef(null);
  const trafficLayer = useRef(null);
  const [map, setMap] = useState(null);

  const onLoad = useCallback(
    (map) => {
      mapRef.current = map;
      setMap(map);

      const button = document.createElement("button");
      button.innerText = "Show Traffic";
      button.style.color = "#666666";
      button.style.backgroundColor = "#fff";
      button.style.border = "2px #000 ";
      button.style.borderRadius = "3px";
      button.style.padding = "12px";
      button.style.marginTop = "11px";
      button.style.marginRight = "11px";
      button.style.cursor = "pointer";

      // Add an event listener for button clicks
      button.addEventListener("click", () => {
        setShowTraffic((pre) => !pre);
      });

      // Add the button to the top-left corner of the map
      map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(button);
    },
    [setMap, setShowTraffic]
  );

  const inputRef = useRef(null);

// Then set the transcript in input
useEffect(() => {
  if (inputRef.current && transcript) {
    inputRef.current.value = transcript;
  }
}, [transcript]);


  useEffect(() => {
    if (map) {
      if (showTraffic) {
        trafficLayer.current = new window.google.maps.TrafficLayer();
        trafficLayer.current.setMap(map);
      } else if (trafficLayer.current) {
        // Remove the traffic layer
        trafficLayer.current.setMap(null);
      }
    }
  }, [showTraffic, map]);

  const handleMarkerClick = useCallback((marker) => {
    console.log("markerrrrrr", marker);

    dispatch(setDestination({ lat: marker.lat, lng: marker.lng }));

    dispatch(setCenter({ lat: marker.lat, lng: marker.lng }));
    dispatch(setZoom(16));
  }, []);

  const get = () => {
    try {
      const updatedData = {
        id: "1",
        type: "ParkingSpot",
        description: {
          type: "Text",
          value: "034050787f3a0d93",
          metadata: {},
        },
        category: {
          type: "Array",
          value: [],
          metadata: {},
        },
        refParkingSite: {
          type: "Text",
          value: "Accessible Parking",
          metadata: {},
        },
        refParkingGroup: {
          type: "Text",
          value: "Accessible Parking",
          metadata: {},
        },
        _manufacturer: {
          type: "Text",
          value: "Nabla Quadro",
          metadata: {},
        },
        _client: {
          type: "Text",
          value: "DLR",
          metadata: {},
        },
        _group: {
          type: "Text",
          value: "DLR Parking",
          metadata: {},
        },
        _source: {
          type: "Text",
          value: "LoRa",
          metadata: {},
        },
        _status: {
          type: "Text",
          value: "ACTIVE",
          metadata: {},
        },
        activation_date: {
          type: "DateTime",
          value: "2023-02-15T00:00:00.000Z",
          metadata: {},
        },
        location: {
          type: "Object",
          value: {
            lng: -6.241365739707778,
            lat: 53.34800133759479,
          },
          metadata: {},
        },
        EVChargingStation: {
          type: "Object",
          value: {},
          metadata: {},
        },
        tags: {
          type: "Array",
          value: [],
          metadata: {},
        },
        parkingangel: {
          type: "Array",
          value: ["0e2a", "0e31"],
          metadata: {},
        },
        alias: {
          type: "Object",
          value: {
            name: "Parking Angel 1",
            hideId: false,
          },
          metadata: {},
        },
        dateCreated: {
          type: "DateTime",
          value: "2024-11-13T12:57:37.513Z",
          metadata: {},
        },
        dateUpdated: {
          type: "DateTime",
          value: "2024-12-23T11:27:07.761Z",
          metadata: {},
        },
        dateUpdatedFlow: {
          type: "DateTime",
          value: "2024-12-23T11:27:07.624Z",
          metadata: {},
        },
        lora_rssi: {
          type: "Number",
          value: -109,
          metadata: {
            samplingTime: {
              type: "DateTime",
              value: "2024-12-23T11:27:04.902Z",
            },
          },
        },
        lora_seq: {
          type: "Number",
          value: 5801,
          metadata: {
            samplingTime: {
              type: "DateTime",
              value: "2024-12-23T11:27:04.902Z",
            },
          },
        },
        lora_snr: {
          type: "Number",
          value: -12,
          metadata: {
            samplingTime: {
              type: "DateTime",
              value: "2024-12-23T11:27:04.902Z",
            },
          },
        },
        authorizationStatus: {
          type: "Text",
          value: "Occupied and authorized by 0e2a",
          metadata: {
            samplingTime: {
              type: "DateTime",
              value: "2024-12-20T12:33:12.000Z",
            },
          },
        },
        batteryStatus: {
          type: "Text",
          value: "ok",
          metadata: {
            samplingTime: {
              type: "DateTime",
              value: "2024-12-23T11:27:04.000Z",
            },
          },
        },
        currentTransmission: {
          type: "Text",
          value: "first transmission",
          metadata: {
            samplingTime: {
              type: "DateTime",
              value: "2024-12-23T11:27:04.000Z",
            },
          },
        },
        detectionMode: {
          type: "Text",
          value: "magnetic only",
          metadata: {
            samplingTime: {
              type: "DateTime",
              value: "2024-12-23T11:27:04.000Z",
            },
          },
        },
        hash: {
          type: "Text",
          value: -451637315,
          metadata: {
            samplingTime: {
              type: "DateTime",
              value: "2024-12-23T11:27:04.000Z",
            },
          },
        },
        lora_sf: {
          type: "Number",
          value: 12,
          metadata: {
            samplingTime: {
              type: "DateTime",
              value: "2024-12-23T11:27:04.000Z",
            },
          },
        },
        msgType: {
          type: "Text",
          value: "occupation state",
          metadata: {
            samplingTime: {
              type: "DateTime",
              value: "2024-12-23T11:27:04.000Z",
            },
          },
        },
        status: {
          type: "Text",
          value: "free",
          metadata: {
            samplingTime: {
              type: "DateTime",
              value: "2024-12-23T11:27:04.000Z",
            },
          },
        },
        tokenBatteryStatus: {
          type: "Text",
          value: "ok",
          metadata: {
            samplingTime: {
              type: "DateTime",
              value: "2024-12-20T12:33:12.000Z",
            },
          },
        },
        restartMessage: {
          type: "Boolean",
          value: true,
          metadata: {
            samplingTime: {
              type: "DateTime",
              value: "2024-12-12T09:14:42.000Z",
            },
          },
        },
        geometry: {
          type: "Point",
          coordinates: [-6.17134693145752, 53.2945823669434],
        },
        properties: {
          id: "1",
          name: "Test",
          status: "occupied",
          num_spaces_occupied: 1,
          parking_bay_type: "",
          max_capacity: 1,
          authSts: "Occupied and not authorized",
          tokenBatSts: "ok",
        },
      };

      const updatedData1 = {
        geometry: {
          type: "Point",
          coordinates: [-6.18534693145752, 53.2945823669434],
        },
        properties: {
          id: 2,
          name: "NoSignal TestMarker",
          status: "noData",
          num_spaces_occupied: 0,
          parking_bay_type: "",
          max_capacity: 1,
          authSts: "",
          tokenBatSts: "",
        },
      };

      const newMapData = [...mapdata, updatedData, updatedData1];
      console.log("updatedData", newMapData);

      const newMarkers = mapdata?.map((feature) => {
        const coordinates = feature.geometry.coordinates;
        const props = feature.properties;

        return { lat: coordinates[1], lng: coordinates[0], ...props };
      });
      setMarkers(newMarkers);
    } catch (error) {
      console.log(error);
    }
  };

  const centerMap = () => {
    try {
      if (dashvalue) {
        dispatch(setZoom(19));
      } else if (centerLocation.lat && centerLocation.lng) {
        dispatch(
          setCenter({ lat: centerLocation.lat, lng: centerLocation.lng })
        );
        dispatch(setZoom(12));
      } else {
        console.log("Centering skipped due to missing location data.");
      }
    } catch (error) {
      console.log("centering Error", error);
    }
  };

  useEffect(() => {
    get();
  }, [mapdata]);

  useEffect(() => {
    centerMap();
  }, [centerLocation]);

  console.log("marrrr", markers);

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, handleError, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (pos) => {
    const crd = pos.coords;
    console.log("coordi", crd);
  
    setCenter({
      lat: crd.latitude,
      lng: crd.longitude,
    });
    setZoom(10);
  };

  const handleError = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    dispatch(setError(`Geolocation error: ${err.message}`));
  };

  const isApiLoaded = useApiIsLoaded();

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  const handleAutocompleteLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setSearchLocation(location);
        setDestination(location)
        dispatch(setCenter(location));
        dispatch(setZoom(14));
      }
    }
  };

  const handleVoiceSearch = () => {
    SpeechRecognition.startListening({ continuous: false,language: "en-IN" });
  };

  useEffect(() => {
    if (transcript && !listening) {
      const geocodeFromVoice = async () => {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              transcript
            )}&key=${apiKey}`
          );
          const data = await response.json();
          if (data.results[0]) {
            const location = data.results[0].geometry.location;
            const formattedAddress = data.results[0].formatted_address;

            // Update input box so it looks like user typed it
            if (inputRef.current) {
              inputRef.current.value = formattedAddress;
            }

            // Update map
            setSearchLocation(location);
            setDestination(location);
            dispatch(setCenter(location));
            dispatch(setZoom(14));
          }
        } catch (error) {
          console.error("Geocode error:", error);
        } finally {
          resetTranscript();
        }
      };

      geocodeFromVoice();
    }
  }, [transcript, listening]);


  const svgToDataURL = (svgString) => {
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgString)}`;
  };

  // Convert to data URLs
  const availableIconURL = svgToDataURL(
    isStyle ? availableIconSVG1 : availableIconSVG
  );

  const occupiedIconURL = svgToDataURL(
    isStyle ? occupiedIconSVG1 : occupiedIconSVG
  );
  const ev_availableIconURL = svgToDataURL(
    isStyle ? ev_available1 : ev_available
  );
  const UnauthorizedIconURL = svgToDataURL(
    isStyle ? unauthorized1 : unauthorized
  );

  const noDataIconUrl = svgToDataURL(isStyle ? noData1 : noData);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "85vh",
            cursor: "pointer",
          }}
          center={dashcenter || center}
          zoom={zoom}
          onLoad={onLoad}
          options={{
            clickableIcons: false,
            fullscreenControl: true,
            zoomControl: true,
            mapTypeControl: true,
            mapTypeControlOptions: {
              style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain"],
            },
            scaleControl: true,
            rotateControl: true,
          }}
          onUnmount={() => setMap(null)}
        >
          {/* Search Box */}
          <div >
          <Autocomplete
            onLoad={handleAutocompleteLoad}
            onPlaceChanged={handlePlaceChanged}
          >
            <input
            ref={inputRef}
              type="text"
              placeholder="Search for places..."
              className="search-box"
              
            />
          </Autocomplete>
         
</div>

<button  style={{
      position: "absolute",
      right: "170px",
      top: "6.5%",
      transform: "translateY(-50%)",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
    }} onClick={handleVoiceSearch} title="Start Voice Input">
      <KeyboardVoiceIcon style={{ color: "#666666" }} />
    </button>

          {listening && <span style={{position:'absolute',top:48,right:200}}>Listening...</span>}

          {/* <p style={{position:'absolute',top:300}}><strong>Transcript:</strong> {transcript || "No speech detected"}</p> */}

          {liveLocation && <Marker position={liveLocation} />}

          {markers
            ?.filter((marker) => {
              if (availability === "unauthorized") {
                return (
                  marker.status === "occupied" &&
                  marker.authSts === "Occupied and not authorized"
                );
              }

              if (availability === "nosignal") {
                return marker.status === "noData";
              }

              // Handle general availability conditions
              if (availability === "all_available") {
                return marker.num_spaces_occupied === 0;
              }

              if (availability === "all_occupied") {
                return marker.num_spaces_occupied === 1;
              }

              // Check bay type compatibility
              const isCorrectBayType =
                bayType === null ||
                bayType === "all" ||
                marker.parking_bay_type === bayType;

              // Check availability based on bay type
              const isAvailableOrOccupied =
                bayType === "ev_charging"
                  ? availability === "ev_available"
                    ? marker.num_spaces_occupied === 0
                    : availability === "ev_occupied"
                    ? marker.num_spaces_occupied === 1
                    : true
                  : bayType === "accessibility"
                  ? availability === "normal_available"
                    ? marker.num_spaces_occupied === 0
                    : availability === "normal_occupied"
                    ? marker.num_spaces_occupied === 1
                    : true
                  : true; // Default for "all" bay types

              // Return true only if both conditions are met
              return isCorrectBayType && isAvailableOrOccupied;
            })
            .map((marker, index) => {
              let svgIcon;

              if (
                marker.status === "occupied" &&
                marker.authSts === "Occupied and not authorized"
              ) {
                svgIcon = UnauthorizedIconURL;
              } else if (marker.parking_bay_type === "ev_charging") {
                svgIcon =
                  marker.num_spaces_occupied === 0
                    ? ev_availableIconURL
                    : occupiedIconURL;
              } else if (marker.parking_bay_type === "accessibility") {
                svgIcon =
                  marker.num_spaces_occupied === 0
                    ? availableIconURL
                    : occupiedIconURL;
              }

              else if (marker.status === "noData") {
                svgIcon = noDataIconUrl;
              } else {
                svgIcon =
                  marker.num_spaces_occupied === 0 ? (
                    <svg
                      fill="green"
                      height="30px"
                      width="30px"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="7"
                        stroke="#006425"
                        strokeWidth="1"
                        fill="green"
                      />
                      <text
                        x="8"
                        y="12"
                        fill="red"
                        fontSize="10px"
                        textAnchor="middle"
                        fontWeight="bold"
                      >
                        P
                      </text>
                    </svg>
                  ) : (
                    <svg
                      fill="black"
                      height="30px"
                      width="30px"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="7"
                        stroke="black"
                        strokeWidth="1"
                        fill="black"
                      />
                      <text
                        x="8"
                        y="12"
                        fill="red"
                        fontSize="10px"
                        textAnchor="middle"
                        fontWeight="bold"
                      >
                        P
                      </text>
                    </svg>
                  );
              }
              console.log("svg", svgIcon);

              return (
                <Marker
                  position={marker}
                  icon={{
                    url: svgIcon,
                    scaledSize: new window.google.maps.Size(28, 28),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(25, 50),
                  }}
                  onClick={
                    marker.num_spaces_occupied === 0
                      ? () => handleMarkerClick(marker)
                      : null
                  }
                  key={index}
                  title={`Id : ${marker.id}\nName : ${marker.name}\nStatus : ${marker.status}\nAuth Status : ${marker.authSts}\nBattery Status : ${marker.tokenBatSts}`}
                />
              );
            })}

          {searchLocation && <Marker position={searchLocation} />}
        </GoogleMap>
      ) : null}

      <Directions origin={liveLocation} map={mapRef.current} />
    </div>
  );
}

export default MapComponent;
