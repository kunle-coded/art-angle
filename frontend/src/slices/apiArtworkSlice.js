import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const apiArtworkSlice = createApi({
  reducerPath: "apiArtworks",
  baseQuery,
  tagTypes: ["Artworks"],
  endpoints: (builder) => ({}),
});
