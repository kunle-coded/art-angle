import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedArtists: [],
  selectedMedium: [],
  selectedRarity: {},
  selectedMaterials: [],
  selectedPrice: [],
  selectedSize: [],
  allSelectedFilters: [],
  priceFilter: {},
  sizeFilter: {},
  selectedWaysToBuy: [],
  selectedLocations: [],
  selectedColors: [],
  selectedGalleries: [],
  selectedTimePeriods: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateArtistsFilter(state, action) {
      const exists = state.selectedArtists.some(
        (artist) => artist.value === action.payload
      );

      if (!exists) {
        state.selectedArtists.push({
          value: action.payload,
          timestamp: Date.now(),
        });
      }
    },

    removeArtistItem(state, action) {
      state.selectedArtists = state.selectedArtists.filter(
        (artist) => artist.value !== action.payload
      );
    },

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

    updateMaterials(state, action) {
      const exists = state.selectedMaterials.some(
        (material) => material.value === action.payload
      );

      if (!exists) {
        state.selectedMaterials.push({
          value: action.payload,
          timestamp: Date.now(),
        });
      }
    },

    removeMaterialsItem(state, action) {
      state.selectedMaterials = state.selectedMaterials.filter(
        (material) => material.value !== action.payload
      );
    },

    updateRarity(state, action) {
      state.selectedRarity = { value: action.payload, timestamp: Date.now() };
    },

    removeRarityItem(state) {
      state.selectedRarity = initialState.selectedRarity;
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

    updateSizeFilter(state, action) {
      state.sizeFilter = action.payload;
    },
    removeSizeFilter(state) {
      state.sizeFilter = initialState.sizeFilter;
    },

    updateSize(state, action) {
      const exists = state.selectedSize.some(
        (size) => size.value === action.payload
      );

      if (!exists) {
        state.selectedSize.push({
          value: action.payload,
          timestamp: Date.now(),
        });
      }
    },

    removeSizeItem(state, action) {
      state.selectedSize = state.selectedSize.filter(
        (size) => size.value !== action.payload
      );
    },

    updateWaysToBuy(state, action) {
      const itExists = state.selectedWaysToBuy.some(
        (item) => item.value === action.payload
      );

      if (!itExists) {
        state.selectedWaysToBuy.push({
          value: action.payload,
          timestamp: Date.now(),
        });
      }
    },

    removeWaysToBuyItem(state, action) {
      state.selectedWaysToBuy = state.selectedWaysToBuy.filter(
        (item) => item.value !== action.payload
      );
    },

    updateLocations(state, action) {
      const exists = state.selectedLocations.some(
        (location) => location.value === action.payload
      );

      if (!exists) {
        state.selectedLocations.push({
          value: action.payload,
          timestamp: Date.now(),
        });
      }
    },

    removeLocationsItem(state, action) {
      state.selectedLocations = state.selectedLocations.filter(
        (location) => location.value !== action.payload
      );
    },

    updateColors(state, action) {
      const exists = state.selectedColors.some(
        (color) => color.value === action.payload
      );

      if (!exists) {
        state.selectedColors.push({
          value: action.payload,
          timestamp: Date.now(),
        });
      }
    },

    removeColorsItem(state, action) {
      state.selectedColors = state.selectedColors.filter(
        (color) => color.value !== action.payload
      );
    },

    updateTimePeriods(state, action) {
      const exists = state.selectedTimePeriods.some(
        (period) => period.value === action.payload
      );

      if (!exists) {
        state.selectedTimePeriods.push({
          value: action.payload,
          timestamp: Date.now(),
        });
      }
    },

    removeTimePeriodsItem(state, action) {
      state.selectedTimePeriods = state.selectedTimePeriods.filter(
        (period) => period.value !== action.payload
      );
    },

    updateGalleries(state, action) {
      const exists = state.selectedGalleries.some(
        (gallery) => gallery.value === action.payload
      );

      if (!exists) {
        state.selectedGalleries.push({
          value: action.payload,
          timestamp: Date.now(),
        });
      }
    },

    removeGalleriesItem(state, action) {
      state.selectedGalleries = state.selectedGalleries.filter(
        (gallery) => gallery.value !== action.payload
      );
    },

    updateAllFilters(state, action) {
      const itExists = state.allSelectedFilters.some(
        (filter) => filter.value === action.payload
      );
      if (!itExists) {
        state.allSelectedFilters.push({
          value: action.payload,
          timestamp: Date.now(),
        });
      }
    },

    removeAllFiltersItem(state, action) {
      state.allSelectedFilters = state.allSelectedFilters.filter(
        (filter) => filter.value !== action.payload
      );
    },

    resetFilter() {
      return initialState;
    },
  },
});

export const {
  updateArtistsFilter,
  removeArtistItem,
  updateMedium,
  removeMediumItem,
  clearMedium,
  updateColors,
  removeColorsItem,
  updateGalleries,
  removeGalleriesItem,
  updateLocations,
  removeLocationsItem,
  updateMaterials,
  removeMaterialsItem,
  updateTimePeriods,
  removeTimePeriodsItem,
  updateWaysToBuy,
  removeWaysToBuyItem,
  updateRarity,
  removeRarityItem,
  updatePrice,
  removePriceItem,
  updateSizeFilter,
  removeSizeFilter,
  updateSize,
  removeSizeItem,
  resetFilter,
  updateAllFilters,
  removeAllFiltersItem,
  updatePriceFilter,
  removePriceFilter,
} = filterSlice.actions;

export default filterSlice.reducer;

export const getFilters = (state) => state.filter;
