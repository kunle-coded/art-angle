import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortPosition: { top: 0, left: 0 },
  sortDropdown: false,
  mediumDropdown: false,
  rarityDropdown: false,
  dropdownPadding: false,
  isButtonDisabled: false,
  currentSort: "Recommended",
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setPosition(state, action) {
      state.sortPosition = action.payload;
    },
    showSortDropdown(state) {
      state.sortDropdown = true;
    },
    showMediumDropdown(state) {
      state.mediumDropdown = true;
    },
    showRarityDropdown(state) {
      state.rarityDropdown = true;
    },
    closeSortDropdown(state) {
      state.sortDropdown = false;
    },
    closeMediumDropdown(state) {
      state.mediumDropdown = false;
    },
    closeRarityDropdown(state) {
      state.rarityDropdown = false;
    },
    setPadding(state) {
      state.dropdownPadding = true;
    },
    removePadding(state) {
      state.dropdownPadding = false;
    },
    disableButton(state) {
      state.isButtonDisabled = true;
    },
    enableButton(state) {
      state.isButtonDisabled = false;
    },
    updateCurrentSort(state, action) {
      state.currentSort = action.payload;
    },
  },
});

export const {
  setPosition,
  showSortDropdown,
  showMediumDropdown,
  showRarityDropdown,
  closeSortDropdown,
  closeMediumDropdown,
  closeRarityDropdown,
  setPadding,
  removePadding,
  disableButton,
  enableButton,
  updateCurrentSort,
} = globalSlice.actions;

export default globalSlice.reducer;

export const getGlobal = (state) => state.global;
