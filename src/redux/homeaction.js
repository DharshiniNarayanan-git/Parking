export const SET_LIVE_LOCATION = "SET_LIVE_LOCATION";
export const SET_BAY_TYPE = "SET_BAY_TYPE";
export const SET_ERROR = "SET_ERROR";
export const SET_AVAILIBILITY = "SET_AVAILIBILITY";
export const SET_STYLE = "SET_STYLE";
export const SET_STOP_LIVE = "SET_STOP_LIVE";
export const SET_COUNT = "SET_COUNT";

export const setLiveLocation = (location) => ({
  type: SET_LIVE_LOCATION,
  payload: location,
});

export const setBayType = (bayType) => ({
  type: SET_BAY_TYPE,
  payload: bayType,
});

export const setAvailability = (availability) => ({
  type: SET_AVAILIBILITY,
  payload: availability,
});

export const setStyle = (isStyle) => ({
  type: SET_STYLE,
  payload: isStyle,
});

export const setStopLive = (data) => {
  return {
    type: "SET_STOP_LIVE",
    payload: data,
  };
};

export const setCount = (count) => ({
  type: "SET_COUNT",
  payload: count,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});
