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
    userSingleArtwork: builder.query({
      query: (id) => ({
        url: `${ARTWORKS_URL}/${id}`,
      }),
    }),
    upload: builder.mutation({
      query: (data) => ({
        url: `${ARTWORKS_URL}/upload`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Artworks"],
    }),
    uploadImage: builder.mutation({
      query: (data) => ({
        url: `${ARTWORKS_URL}/image/upload`,
        method: "POST",
        body: data,
      }),
    }),
    deleteImage: builder.mutation({
      query: (data) => ({
        url: `${ARTWORKS_URL}/image/${data.id}`,
        method: "DELETE",
        body: { url: data.url },
      }),
    }),
  }),
});

export const {
  useArtworksQuery,
  useUserSingleArtworkQuery,
  useUploadMutation,
  useDeleteImageMutation,
  useUploadImageMutation,
} = artworksApiSlice;
