import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMedium: [],
  selectedRarity: [],
  selectedPrice: [],
  allSelectedFilters: [],
  priceFilter: {},
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

    updateAllFilters(state, action) {
      state.allSelectedFilters = [
        ...state.allSelectedFilters,
        { value: action.payload, timestamp: Date.now() },
      ];
    },

    removeAllFiltersItem(state, action) {
      state.allSelectedFilters = state.allSelectedFilters.filter(
        (filter) => filter.value !== action.payload
      );
    },
    updatePrice(state, action) {
      state.selectedPrice = [{ value: action.payload, timestamp: Date.now() }];
    },

    removePriceItem(state) {
      state.selectedPrice = initialState.selectedPrice;
    },

    updatePriceFilter(state, action) {
      state.priceFilter = action.payload;
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
  updatePrice,
  removePriceItem,
  resetFilter,
  updateAllFilters,
  removeAllFiltersItem,
  updatePriceFilter,
} = filterSlice.actions;

export default filterSlice.reducer;

export const getFilters = (state) => state.filter;
