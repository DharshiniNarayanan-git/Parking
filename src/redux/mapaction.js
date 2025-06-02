export const SET_DESTINATION = "SET_DESTINATION";
export const SET_CENTER = "SET_CENTER";
export const SET_ZOOM = "SET_ZOOM";
export const SET_DASH_VALUE = "SET_DASH_VALUE";
export const SET_DASH_CENTER = "SET_DASH_CENTER";

export const setDestination = (destination) => ({
  type: SET_DESTINATION,
  payload: destination,
});

export const setCenter = (center) => ({
  type: SET_CENTER,
  payload: center,
});

export const setZoom = (zoom) => ({
  type: SET_ZOOM,
  payload: zoom,
});

export const setDashValue = (value) => ({
  type: SET_DASH_VALUE,
  payload: value,
});

export const setDashCenter = (center) => ({
  type: SET_DASH_CENTER,
  payload: center,
});
