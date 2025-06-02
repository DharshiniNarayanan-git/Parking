export const SET_SELECTED_ROUTE = "SET_SELECTED_ROUTE";
export const SET_LEG = "SET_LEG";
export const SET_ROUTES = "SET_ROUTES";
export const SET_ROUTE_INDEX = "SET_ROUTE_INDEX";

export const setSelectedRoute = (selected) => ({
  type: SET_SELECTED_ROUTE,
  Payload: selected,
});

export const setLeg = (leg) => ({
  type: SET_LEG,
  Payload: leg,
});

export const setRoutes = (routes) => {
  console.log("actionRoutes", routes);

  return {
    type: SET_ROUTES,
    Payload: routes,
  };
};

export const setRouteIndex = (routeIndex) => ({
  type: SET_ROUTE_INDEX,
  Payload: routeIndex,
});
