import { apiArtworkSlice } from "./apiArtworkSlice";

const ARTWORKS_URL = "/api/user/artworks";

export const artworksApiSlice = apiArtworkSlice.injectEndpoints({
  endpoints: (builder) => ({
    artworks: builder.query({
      query: () => ({
        url: ARTWORKS_URL,
      }),
      providesTags: ["Artworks"],
    }),
    upload: builder.mutation({
      query: (data) => ({
        url: `${ARTWORKS_URL}(upload)`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Artworks"],
    }),
  }),
});

export const { useArtworksQuery, useUploadMutation } = artworksApiSlice;
