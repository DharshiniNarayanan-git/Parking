import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { MapContext } from "../App";

function Directions({ origin, map }) {
  const { routes, setRoutes, routeIndex } = useContext(MapContext);
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();

  const destination = useSelector((state) => state.MapReducer?.destination);

  console.log(destination, "origin", origin);

  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!map || !origin || !destination) return;

    // Initialize Directions Service and Renderer
    const newDirectionsService = new window.google.maps.DirectionsService();
    const newDirectionsRenderer = new window.google.maps.DirectionsRenderer({
      map,
      polylineOptions: {
        strokeColor: "#0597FF",
        strokeWeight: 5,
        strokeOpacity: 0.7,
      },
    });

    setDirectionsService(newDirectionsService);
    setDirectionsRenderer(newDirectionsRenderer);

    return () => {
      if (newDirectionsRenderer) {
        newDirectionsRenderer.setMap(null);
      }
    };
  }, [map, origin, destination]);

  useEffect(() => {
    if (!directionsRenderer) return;

    if (directionsService && destination) {
      directionsService
        .route({
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.WALKING,
          provideRouteAlternatives: true,
        })
        .then((response) => {
          console.log("routes", response.routes);

          directionsRenderer.setDirections(response);
          setRoutes(response.routes);
        })
        .catch((err) => console.log("dirError", err));
    }
  }, [directionsService, directionsRenderer, origin, destination]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  console.log("directions", leg);

  if (!leg) return null;

  return null;
}

export default Directions;
