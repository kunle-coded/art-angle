import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMedium: [],
  selectedRarity: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateMedium(state, action) {
      state.selectedMedium = [...state.selectedMedium, action.payload];
    },

    removeMediumItem(state, action) {
      state.selectedMedium = state.selectedMedium.filter(
        (medium) => medium !== action.payload
      );
    },

    resetFilter() {
      return initialState;
    },
  },
});

export const { updateMedium, removeMediumItem, resetFilter } =
  filterSlice.actions;

export default filterSlice.reducer;

export const getFilters = (state) => state.filter;
