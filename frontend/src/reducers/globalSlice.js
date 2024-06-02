import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortPosition: { top: 0, left: 0 },
  showSortDropdown: false,
  filterDropdown: false,
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
    showFilterDropdown(state) {
      state.filterDropdown = true;
    },
    closeDropdown(state) {
      state.showSortDropdown = false;
    },
    closeFilterDropdown(state) {
      state.filterDropdown = false;
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
  showFilterDropdown,
  closeDropdown,
  closeFilterDropdown,
  setPadding,
  removePadding,
  updateCurrentSort,
} = globalSlice.actions;

export default globalSlice.reducer;

export const getGlobal = (state) => state.global;
