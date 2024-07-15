import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./slices/globalSlice";
import filterSlice from "./slices/filterSlice";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import userSlice from "./slices/userSlice";
import artworkSllice from "./slices/artworkSllice";

const store = configureStore({
  reducer: {
    global: globalSlice,
    filter: filterSlice,
    auth: authReducer,
    user: userSlice,
    artwork: artworkSllice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefautMiddleware) =>
    getDefautMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
