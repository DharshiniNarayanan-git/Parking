import {
  SET_AVAILIBILITY,
  SET_BAY_TYPE,
  SET_COUNT,
  SET_ERROR,
  SET_LIVE_LOCATION,
  SET_STOP_LIVE,
  SET_STYLE,
} from "./homeaction";

const initialState = {
  liveLocation: null,
  bayType: null,
  availability: null,
  isStyle: false,
  mapError: null,
  stopLive: null,
  count: [],
};

const HomeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LIVE_LOCATION:
      return {
        ...state,
        liveLocation: payload,
      };

    case SET_BAY_TYPE:
      return {
        ...state,
        bayType: payload,
      };

    case SET_AVAILIBILITY:
      return {
        ...state,
        availability: payload,
      };

    case SET_STYLE:
      return {
        ...state,
        isStyle: payload,
      };

    case SET_STOP_LIVE:
      return {
        ...state,
        stopLive: payload,
      };

    case SET_COUNT:
      return {
        ...state,
        count: payload,
      };

    case SET_ERROR:
      return {
        ...state,
        mapError: payload,
      };

    default:
      return state;
  }
};
export default HomeReducer;
