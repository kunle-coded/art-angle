import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  images: [],
  category: "",
  subject: "",
  year: "",
  medium: [],
  materials: [],
  styles: [],
  dimensions: { width: "", height: "", depth: "" },
  keywords: [],
  description: "",
  availability: "",
  editions: "",
  totalRun: "",
  availableForSale: "",
  aditionalDetails: "",
  shippingAddress: "",
  price: 0,
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
      state.medium = action.payload;
    },
    updateMaterials(state, action) {
      state.materials = action.payload;
    },
    updateStyles(state, action) {
      state.styles = action.payload;
    },

    updateDimensions(state, action) {
      state.dimensions = action.payload;
    },
    updateKeywDesc(state, action) {
      const { keywords, description } = action.payload;
      state.keywords = keywords;
      state.description = description;
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
  updateKeywDesc,
} = artworkSlice.actions;

export default artworkSlice.reducer;

export const getArtwork = (state) => state.artwork;
