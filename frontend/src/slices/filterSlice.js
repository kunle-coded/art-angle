import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMedium: [],
  selectedRarity: {},
  selectedPrice: [],
  allSelectedFilters: [],
  priceFilter: {},
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateMedium(state, action) {
      const exists = state.selectedMedium.some(
        (medium) => medium.value === action.payload
      );

      if (!exists) {
        state.selectedMedium.push({
          value: action.payload,
          timestamp: Date.now(),
        });
      }
    },

    removeMediumItem(state, action) {
      state.selectedMedium = state.selectedMedium.filter(
        (filter) => filter.value !== action.payload
      );
    },

    clearMedium(state) {
      state.selectedMedium = initialState.selectedMedium;
    },

    updateRarity(state, action) {
      state.selectedRarity = { value: action.payload, timestamp: Date.now() };
    },

    removeRarityItem(state) {
      state.selectedRarity = initialState.selectedRarity;
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
    removePriceFilter(state) {
      state.priceFilter = initialState.priceFilter;
    },

    resetFilter() {
      return initialState;
    },
  },
});

export const {
  updateMedium,
  removeMediumItem,
  clearMedium,
  updateRarity,
  removeRarityItem,
  updatePrice,
  removePriceItem,
  resetFilter,
  updateAllFilters,
  removeAllFiltersItem,
  updatePriceFilter,
  removePriceFilter,
} = filterSlice.actions;

export default filterSlice.reducer;

export const getFilters = (state) => state.filter;
