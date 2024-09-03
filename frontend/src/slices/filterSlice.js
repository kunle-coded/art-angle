import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedArtists: localStorage.getItem("selectedArtists")
    ? JSON.parse(localStorage.getItem("selectedArtists"))
    : [],
  selectedMedium: localStorage.getItem("selectedMedium")
    ? JSON.parse(localStorage.getItem("selectedMedium"))
    : [],
  selectedRarity: localStorage.getItem("selectedRarity")
    ? JSON.parse(localStorage.getItem("selectedRarity"))
    : {},
  selectedMaterials: localStorage.getItem("selectedMaterials")
    ? JSON.parse(localStorage.getItem("selectedMaterials"))
    : [],
  selectedPrice: localStorage.getItem("selectedPrice")
    ? JSON.parse(localStorage.getItem("selectedPrice"))
    : [],
  selectedSize: localStorage.getItem("selectedSize")
    ? JSON.parse(localStorage.getItem("selectedSize"))
    : [],
  allSelectedFilters: localStorage.getItem("allSelectedFilters")
    ? JSON.parse(localStorage.getItem("allSelectedFilters"))
    : [],
  priceFilter: localStorage.getItem("priceFilter")
    ? JSON.parse(localStorage.getItem("priceFilter"))
    : {},
  sizeFilter: localStorage.getItem("sizeFilter")
    ? JSON.parse(localStorage.getItem("sizeFilter"))
    : {},
  selectedWaysToBuy: localStorage.getItem("selectedWaysToBuy")
    ? JSON.parse(localStorage.getItem("selectedWaysToBuy"))
    : [],
  selectedLocations: localStorage.getItem("selectedLocations")
    ? JSON.parse(localStorage.getItem("selectedLocations"))
    : [],
  selectedColors: localStorage.getItem("selectedColors")
    ? JSON.parse(localStorage.getItem("selectedColors"))
    : [],
  selectedGalleries: localStorage.getItem("selectedGalleries")
    ? JSON.parse(localStorage.getItem("selectedGalleries"))
    : [],
  selectedTimePeriods: localStorage.getItem("selectedTimePeriods")
    ? JSON.parse(localStorage.getItem("selectedTimePeriods"))
    : [],
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

        localStorage.setItem(
          "selectedArtists",
          JSON.stringify(state.selectedArtists)
        );
      }
    },

    removeArtistItem(state, action) {
      const updated = state.selectedArtists.filter(
        (artist) => artist.value !== action.payload
      );
      state.selectedArtists = updated;
      localStorage.setItem("selectedArtists", JSON.stringify(updated));
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

        localStorage.setItem(
          "selectedMedium",
          JSON.stringify(state.selectedMedium)
        );
      }
    },

    removeMediumItem(state, action) {
      const updated = state.selectedMedium.filter(
        (medium) => medium.value !== action.payload
      );
      state.selectedMedium = updated;
      localStorage.setItem("selectedMedium", JSON.stringify(updated));
    },

    clearMedium(state) {
      state.selectedMedium = initialState.selectedMedium;
      localStorage.removeItem("selectedMedium");
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

        localStorage.setItem(
          "selectedMaterials",
          JSON.stringify(state.selectedMaterials)
        );
      }
    },

    removeMaterialsItem(state, action) {
      const updated = state.selectedMaterials.filter(
        (material) => material.value !== action.payload
      );
      state.selectedMaterials = updated;
      localStorage.setItem("selectedMaterials", JSON.stringify(updated));
    },

    updateRarity(state, action) {
      const payload = { value: action.payload, timestamp: Date.now() };
      state.selectedRarity = payload;
      localStorage.setItem("selectedRarity", JSON.stringify(payload));
    },

    removeRarityItem(state) {
      state.selectedRarity = initialState.selectedRarity;
      localStorage.removeItem("selectedRarity");
    },

    updatePrice(state, action) {
      const payload = [{ value: action.payload, timestamp: Date.now() }];
      state.selectedPrice = payload;
      localStorage.setItem("selectedPrice", JSON.stringify(payload));
    },

    removePriceItem(state) {
      state.selectedPrice = initialState.selectedPrice;
      localStorage.removeItem("selectedPrice");
    },

    updatePriceFilter(state, action) {
      state.priceFilter = action.payload;
      localStorage.setItem("priceFilter", JSON.stringify(action.payload));
    },

    removePriceFilter(state) {
      state.priceFilter = initialState.priceFilter;
      localStorage.removeItem("priceFilter");
    },

    updateSizeFilter(state, action) {
      state.sizeFilter = action.payload;
      localStorage.setItem("sizeFilter", JSON.stringify(action.payload));
    },

    removeSizeFilter(state) {
      state.sizeFilter = initialState.sizeFilter;
      localStorage.removeItem("sizeFilter");
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

        localStorage.setItem(
          "selectedSize",
          JSON.stringify(state.selectedSize)
        );
      }
    },

    removeSizeItem(state, action) {
      const updated = state.selectedSize.filter(
        (size) => size.value !== action.payload
      );
      state.selectedSize = updated;
      localStorage.setItem("selectedSize", JSON.stringify(updated));
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

        localStorage.setItem(
          "selectedWaysToBuy",
          JSON.stringify(state.selectedWaysToBuy)
        );
      }
    },

    removeWaysToBuyItem(state, action) {
      const updated = state.selectedWaysToBuy.filter(
        (item) => item.value !== action.payload
      );
      state.selectedWaysToBuy = updated;
      localStorage.setItem("selectedWaysToBuy", JSON.stringify(updated));
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

        localStorage.setItem(
          "selectedLocations",
          JSON.stringify(state.selectedLocations)
        );
      }
    },

    removeLocationsItem(state, action) {
      const updated = state.selectedLocations.filter(
        (location) => location.value !== action.payload
      );
      state.selectedLocations = updated;
      localStorage.setItem("selectedLocations", JSON.stringify(updated));
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

        localStorage.setItem(
          "selectedColors",
          JSON.stringify(state.selectedColors)
        );
      }
    },

    removeColorsItem(state, action) {
      const updated = state.selectedColors.filter(
        (color) => color.value !== action.payload
      );
      state.selectedColors = updated;
      localStorage.setItem("selectedColors", JSON.stringify(updated));
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

        localStorage.setItem(
          "selectedTimePeriods",
          JSON.stringify(state.selectedTimePeriods)
        );
      }
    },

    removeTimePeriodsItem(state, action) {
      const updated = state.selectedTimePeriods.filter(
        (period) => period.value !== action.payload
      );
      state.selectedTimePeriods = updated;
      localStorage.setItem("selectedTimePeriods", JSON.stringify(updated));
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

        localStorage.setItem(
          "selectedGalleries",
          JSON.stringify(state.selectedGalleries)
        );
      }
    },

    removeGalleriesItem(state, action) {
      const updated = state.selectedGalleries.filter(
        (gallery) => gallery.value !== action.payload
      );
      state.selectedGalleries = updated;
      localStorage.setItem("selectedGalleries", JSON.stringify(updated));
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

    resetFilter(state) {
      localStorage.clear();
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
