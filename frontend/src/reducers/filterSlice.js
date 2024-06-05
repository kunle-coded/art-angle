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
      state.selectedMedium = [
        ...state.selectedMedium,
        { value: action.payload, timestamp: Date.now() },
      ];
    },

    removeMediumItem(state, action) {
      state.selectedMedium = state.selectedMedium.filter(
        (filter) => filter.value !== action.payload
      );
    },
    updateRarity(state, action) {
      state.selectedRarity = [
        ...state.selectedRarity,
        { value: action.payload, timestamp: Date.now() },
      ];
    },

    removeRarityItem(state, action) {
      state.selectedRarity = state.selectedRarity.filter(
        (rarity) => rarity.value !== action.payload
      );
    },

    resetFilter() {
      return initialState;
    },
  },
});

export const {
  updateMedium,
  removeMediumItem,
  updateRarity,
  removeRarityItem,
  resetFilter,
} = filterSlice.actions;

export default filterSlice.reducer;

export const getFilters = (state) => state.filter;
