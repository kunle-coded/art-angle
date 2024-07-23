import { createSlice } from "@reduxjs/toolkit";
import { Availability, Editions } from "../constants/enums";

const initialState = {
  title: "",
  category: "",
  subject: "",
  year: "",
  images: ["", "", "", "", "", ""],
  medium: [],
  materials: [],
  styles: [],
  dimensions: { width: null, height: null, depth: null },
  keywords: [],
  description: "",
  availability: Availability.FOR_SALE,
  editions: Editions.LIMITED,
  totalRun: null,
  availableForSale: null,
  weight: null,
  framed: false,
  frameDimensions: { width: null, height: null, depth: null },
  packagingType: "",
  packagingInstructions: "",
  packagingWeight: null,
  totalWeight: null,
  shippingAddress: { city: "", state: "", country: "" },
  price: null,
  totalPrice: null,
};

const artworkSlice = createSlice({
  name: "artwork",
  initialState,
  reducers: {
    updateTitle(state, action) {
      state.title = action.payload;
    },
    updateCategory(state, action) {
      state.category = action.payload;
    },
    updateSubject(state, action) {
      state.subject = action.payload;
    },
    updateYear(state, action) {
      state.year = action.payload;
    },
    updateMedium(state, action) {
      state.medium = [...state.medium, action.payload];
    },
    updateMaterials(state, action) {
      state.materials = [...state.materials, action.payload];
    },
    updateStyles(state, action) {
      state.styles = [...state.styles, action.payload];
    },

    updateDimensions(state, action) {
      state.dimensions = action.payload;
    },
    updateKeywords(state, action) {
      state.keywords = [...state.keywords, action.payload];
    },
    updateDescription(state, action) {
      state.description = action.payload;
    },
    updateAvailability(state, action) {
      state.availability = action.payload;
    },
    updateEditions(state, action) {
      state.editions = action.payload;
    },
    updateRuns(state, action) {
      state.totalRun = action.payload;
    },
    updateAvailableForSale(state, action) {
      state.availableForSale = action.payload;
    },
    updateWeight(state, action) {
      state.weight = action.payload;
    },
    updateFramed(state, action) {
      state.framed = action.payload;
    },
    updateFrameDimension(state, action) {
      state.frameDimensions = action.payload;
    },
    updatePackagingType(state, action) {
      state.packagingType = action.payload;
    },
    updatePackagingInstructions(state, action) {
      state.packagingInstructions = action.payload;
    },
    updatePackagingWeight(state, action) {
      state.packagingWeight = action.payload;
    },
    updateTotalWeight(state, action) {
      state.totalWeight = action.payload;
    },
    updateAddress(state, action) {
      state.shippingAddress = action.payload;
    },
    updatePrice(state, action) {
      state.price = action.payload;
    },
    updateTotalPrice(state, action) {
      state.totalPrice = action.payload;
    },
  },
});

export const {
  updateTitle,
  updateCategory,
  updateSubject,
  updateYear,
  updateMaterials,
  updateMedium,
  updateStyles,
  updateDimensions,
  updateDescription,
  updateKeywords,
  updateAvailability,
  updateAvailableForSale,
  updateAddress,
  updateEditions,
  updateFramed,
  updateFrameDimension,
  updateWeight,
  updatePackagingWeight,
  updatePackagingInstructions,
  updatePackagingType,
  updatePrice,
  updateRuns,
  updateTotalPrice,
  updateTotalWeight,
} = artworkSlice.actions;

export default artworkSlice.reducer;

export const getArtwork = (state) => state.artwork;
