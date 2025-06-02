import { combineReducers } from "redux";
import HomeReducer from "./homereducer";
import { configureStore } from "@reduxjs/toolkit";
import MapReducer from "./mapreducer";
import DirectionReducer from "./directionsreducer";

const rootReducer = combineReducers({
  HomeReducer,
  MapReducer,
  DirectionReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
