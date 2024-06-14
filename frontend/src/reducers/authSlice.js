import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  isSignup: false,
  isArtistSignup: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLogin = true;
    },
    logout(state, action) {
      state.isLogin = false;
    },

    signup(state, action) {
      state.isSignup = true;
    },

    artistSignup(state, action) {
      state.isArtistSignup = true;
    },
  },
});

export const { login, logout, signup, artistSignup } = authSlice.actions;

export default authSlice.reducer;

export const getAuth = (state) => state.auth;
