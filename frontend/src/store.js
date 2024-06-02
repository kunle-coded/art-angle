import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./reducers/globalSlice";
import filterSlice from "./reducers/filterSlice";

const store = configureStore({
  reducer: {
    global: globalSlice,
    filter: filterSlice,
  },
});

export default store;
