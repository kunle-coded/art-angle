import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortPosition: { top: 0, left: 0 },
  sortDropdown: false,
  mediumDropdown: false,
  rarityDropdown: false,
  priceDropdown: false,
  dropdownPadding: false,
  isMediumDisabled: true,
  isRarityDisabled: true,
  isPriceDisabled: true,
  isDropdown: false,
  isModalOpen: false,
  isProfileDropdown: false,
  isSuccess: false,
  isError: false,
  isDeactivate: false,
  successMessage: "",
  loginWindow: "",
  userType: "buyer",
  currentSort: "",
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
    showPriceDropdown(state) {
      state.priceDropdown = true;
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
    closePriceDropdown(state) {
      state.priceDropdown = false;
    },
    setPadding(state) {
      state.dropdownPadding = true;
    },
    removePadding(state) {
      state.dropdownPadding = false;
    },
    disableMediumButton(state) {
      state.isMediumDisabled = true;
    },
    enableMediumButton(state) {
      state.isMediumDisabled = false;
    },
    disableRarityButton(state) {
      state.isRarityDisabled = true;
    },
    enableRarityButton(state) {
      state.isRarityDisabled = false;
    },
    disablePriceButton(state) {
      state.isPriceDisabled = true;
    },
    enablePriceButton(state) {
      state.isPriceDisabled = false;
    },
    updateCurrentSort(state, action) {
      state.currentSort = action.payload;
    },
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
    updateProfileDropdown(state) {
      state.isProfileDropdown = true;
    },
    disableProfileDropdown(state) {
      state.isProfileDropdown = false;
    },
    enableSuccess(state) {
      state.isSuccess = true;
    },
    disableSuccess(state) {
      state.isSuccess = false;
    },
    enableError(state) {
      state.isError = true;
    },
    disableError(state) {
      state.isError = false;
    },

    updateSuccessMgs(state, action) {
      state.successMessage = action.payload;
    },

    openLogin(state, action) {
      state.loginWindow = action.payload;
    },
    closeLogin(state) {
      state.loginWindow = "";
    },
    updateUserType(state, action) {
      state.userType = action.payload;
    },
    deleteUserType(state) {
      state.userType = "buyer";
    },
    updateDeactivate(state) {
      state.isDeactivate = true;
    },
  },
});

export const {
  setPosition,
  showSortDropdown,
  showMediumDropdown,
  showRarityDropdown,
  showPriceDropdown,
  closeSortDropdown,
  closeMediumDropdown,
  closeRarityDropdown,
  closePriceDropdown,
  setPadding,
  removePadding,
  disableMediumButton,
  enableMediumButton,
  disableRarityButton,
  enableRarityButton,
  disablePriceButton,
  enablePriceButton,
  updateCurrentSort,
  openModal,
  closeModal,
  updateProfileDropdown,
  disableProfileDropdown,
  enableSuccess,
  disableSuccess,
  updateSuccessMgs,
  enableError,
  disableError,
  openLogin,
  closeLogin,
  updateUserType,
  deleteUserType,
  updateDeactivate,
} = globalSlice.actions;

export default globalSlice.reducer;

export const getGlobal = (state) => state.global;
