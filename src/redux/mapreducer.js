import {
  SET_CENTER,
  SET_DASH_CENTER,
  SET_DASH_VALUE,
  SET_DESTINATION,
  SET_ZOOM,
} from "./mapaction";

const initalState = {
  destination: null,
  center: null,
  zoom: 13,
  dashvalue: null,
  dashcenter: null,
};

const MapReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case SET_DESTINATION:
      return {
        ...state,
        destination: payload,
      };

    case SET_CENTER:
      return {
        ...state,
        center: payload,
      };

    case SET_ZOOM:
      return {
        ...state,
        zoom: payload,
      };

    case SET_DASH_VALUE:
      return {
        ...state,
        dashvalue: payload,
      };

    case SET_DASH_CENTER:
      return {
        ...state,
        dashcenter: payload,
      };

    default:
      return state;
  }
};

export default MapReducer;
