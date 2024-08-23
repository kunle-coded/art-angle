import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchedKeyword: localStorage.getItem("keyword")
    ? JSON.parse(localStorage.getItem("keyword"))
    : {},
  searchedArtwork: localStorage.getItem("artwork")
    ? JSON.parse(localStorage.getItem("artwork"))
    : {},
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateKeyword(state, action) {
      const searched = { value: action.payload, timestamp: Date.now() };
      state.searchedKeyword = searched;
      localStorage.setItem("keyword", JSON.stringify(searched));
    },
  },
});

export const { updateKeyword } = searchSlice.actions;

export default searchSlice.reducer;

export const getSearch = (state) => state.search;
