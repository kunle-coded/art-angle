import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./slices/globalSlice";
import filterSlice from "./slices/filterSlice";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import { apiArtworkSlice } from "./slices/apiArtworkSlice";
import userSlice from "./slices/userSlice";
import artworkSlice from "./slices/artworkSlice";
import searchSlice from "./slices/searchSlice";

const store = configureStore({
  reducer: {
    global: globalSlice,
    filter: filterSlice,
    auth: authReducer,
    user: userSlice,
    artwork: artworkSlice,
    search: searchSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apiArtworkSlice.reducerPath]: apiArtworkSlice.reducer,
  },
  middleware: (getDefautMiddleware) =>
    getDefautMiddleware()
      .concat(apiSlice.middleware)
      .concat(apiArtworkSlice.middleware),
  devTools: true,
});

export default store;
