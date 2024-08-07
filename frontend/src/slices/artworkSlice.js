import { createSlice } from "@reduxjs/toolkit";
import { Availability, Editions } from "../constants/enums";

const initialState = {
  title: "",
  category: "",
  subject: "",
  published: "",
  images: localStorage.getItem("artworkImages")
    ? JSON.parse(localStorage.getItem("artworkImages"))
    : [],
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
      state.published = action.payload;
    },
    updateMedium(state, action) {
      state.medium = [...state.medium, action.payload];
    },
    deleteMediumItem(state, action) {
      const newList = state.medium.filter((item) => item !== action.payload);
      state.medium = [...newList];
    },
    updateMaterials(state, action) {
      state.materials = [...state.materials, action.payload];
    },
    updateStyles(state, action) {
      state.styles = [...state.styles, action.payload];
    },

    deleteStyleItem(state, action) {
      const newList = state.styles.filter((item) => item !== action.payload);
      state.styles = [...newList];
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
    updateImages(state, action) {
      const images = [...state.images, action.payload];
      state.images = [...state.images, action.payload];
      localStorage.setItem("artworkImages", JSON.stringify(images));
    },
    resetArtwork(state) {
      localStorage.removeItem("artworkImages");
      return initialState;
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
  deleteMediumItem,
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
  updateImages,
  resetArtwork,
} = artworkSlice.actions;

export default artworkSlice.reducer;

export const getArtwork = (state) => state.artwork;
