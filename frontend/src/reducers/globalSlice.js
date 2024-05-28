import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortPosition: { top: 0, left: 0 },
  showSortDropdown: false,
  sortDropdownPadding: false,
  currentSort: "Recommended",
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setPosition(state, action) {
      state.sortPosition = action.payload;
    },
    showDropdown(state) {
      state.showSortDropdown = true;
    },
    closeDropdown(state) {
      state.showSortDropdown = false;
    },
    setPadding(state) {
      state.sortDropdownPadding = true;
    },
    removePadding(state) {
      state.sortDropdownPadding = false;
    },
    updateCurrentSort(state, action) {
      state.currentSort = action.payload;
    },
  },
});

export const {
  setPosition,
  showDropdown,
  closeDropdown,
  setPadding,
  removePadding,
  updateCurrentSort,
} = globalSlice.actions;

export default globalSlice.reducer;

export const getGlobal = (state) => state.global;
