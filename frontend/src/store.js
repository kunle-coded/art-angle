import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./reducers/globalSlice";
import filterSlice from "./reducers/filterSlice";
import authSlice from "./reducers/authSlice";
import userSlice from "./reducers/userSlice";

const store = configureStore({
  reducer: {
    global: globalSlice,
    filter: filterSlice,
    auth: authSlice,
    user: userSlice,
  },
});

export default store;
