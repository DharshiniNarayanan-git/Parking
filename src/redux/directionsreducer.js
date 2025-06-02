import {
  SET_LEG,
  SET_ROUTE_INDEX,
  SET_ROUTES,
  SET_SELECTED_ROUTE,
} from "./directionsaction";

const initialState = {
  selectedRoute: null,
  leg: null,
  routes: [],
  routeIndex: 0,
};

const DirectionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SELECTED_ROUTE:
      return {
        ...state,
        selectedRoute: payload,
      };
    case SET_LEG:
      return {
        ...state,
        leg: payload,
      };

    case SET_ROUTES:
      return {
        ...state,
        routes: payload,
      };

    case SET_ROUTE_INDEX:
      return {
        ...state,
        routeIndex: payload,
      };

    default:
      return state;
  }
};

export default DirectionReducer;
