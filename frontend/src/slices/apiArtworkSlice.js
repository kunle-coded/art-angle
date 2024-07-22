import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const apiArtworkSlice = createApi({
  baseQuery,
  tagTypes: ["Artworks"],
  endpoints: (builder) => ({}),
});
