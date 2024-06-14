import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    email: "",
    password: "",
  },

  newUser: {
    name: "",
    email: "",
    password: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register(state, action) {
      state.newUser = action.payload;
    },
    login(state, action) {
      state.user = action.payload;
    },
    logout() {
      return initialState;
    },
  },
});

export const { register, login, logout } = userSlice.actions;

export default userSlice.reducer;

export const getUser = (state) => state.user;
