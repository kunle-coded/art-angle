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
      providesTags: ["Artwork"],
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
      invalidatesTags: ["Artwork"],
    }),
    deleteImage: builder.mutation({
      query: (data) => ({
        url: `${ARTWORKS_URL}/image/${data.id}`,
        method: "DELETE",
        body: { url: data.url },
      }),
      invalidatesTags: ["Artwork"],
    }),
    update: builder.mutation({
      query: (data) => ({
        url: `${ARTWORKS_URL}/${data.id}`,
        method: "PUT",
        body: data.value,
      }),
      invalidatesTags: ["Artwork"],
    }),
    deleteArtwork: builder.mutation({
      query: (id) => ({
        url: `${ARTWORKS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Artwork"],
    }),
  }),
});

export const {
  useArtworksQuery,
  useUserSingleArtworkQuery,
  useUploadMutation,
  useDeleteImageMutation,
  useUploadImageMutation,
  useUpdateMutation,
  useDeleteArtworkMutation,
} = artworksApiSlice;
