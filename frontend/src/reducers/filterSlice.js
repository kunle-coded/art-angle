import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedFilter: [],
  selectedRarity: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilter(state, action) {
      state.selectedFilter = [...state.selectedFilter, action.payload];
    },

    removeFilterItem(state, action) {
      state.selectedFilter = state.selectedFilter.filter(
        (filter) => filter !== action.payload
      );
    },
    updateRarity(state, action) {
      state.selectedRarity = [...state.selectedRarity, action.payload];
    },

    removeRarityItem(state, action) {
      state.selectedRarity = state.selectedRarity.filter(
        (rarity) => rarity !== action.payload
      );
    },

    resetFilter() {
      return initialState;
    },
  },
});

export const {
  updateFilter,
  removeFilterItem,
  updateRarity,
  removeRarityItem,
  resetFilter,
} = filterSlice.actions;

export default filterSlice.reducer;

export const getFilters = (state) => state.filter;
