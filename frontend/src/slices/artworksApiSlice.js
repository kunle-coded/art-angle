import { apiArtworkSlice } from "./apiArtworkSlice";

const ARTWORKS_URL = "/api/user/artworks";
const ALL_ARTWORKS_URL = "/api/artworks";

export const artworksApiSlice = apiArtworkSlice.injectEndpoints({
  endpoints: (builder) => ({
    allArtworks: builder.query({
      query: () => ({
        url: ALL_ARTWORKS_URL,
      }),
      providesTags: ["Artworks"],
    }),
    filtertedArtworks: builder.query({
      query: (filters) => {
        const params = new URLSearchParams();

        Object.keys(filters).forEach((key) => {
          if (filters[key]) {
            params.append(key, filters[key]);
          }
        });

        return `${ALL_ARTWORKS_URL}/filter?${params.toString()}`;
      },
    }),
    featuredArtworks: builder.query({
      query: () => ({
        url: `${ALL_ARTWORKS_URL}/featured`,
      }),
    }),
    newArtworks: builder.query({
      query: () => ({
        url: `${ALL_ARTWORKS_URL}/new`,
      }),
    }),
    artworksByPrice: builder.query({
      query: ({ min, max }) => {
        let url = `${ALL_ARTWORKS_URL}/price?`;

        if (min !== undefined) {
          url += `minPrice=${min}&`;
        }
        if (max !== undefined) {
          url += `maxPrice=${max}`;
        }
        return url;
      },
    }),
    artistArtworks: builder.query({
      query: () => ({
        url: ARTWORKS_URL,
      }),
      providesTags: ["artistArtworks"],
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
      invalidatesTags: ["Artworks", "artistArtworks"],
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
      invalidatesTags: ["Artwork", "artistArtworks", "Artworks"],
    }),
  }),
});

export const {
  useAllArtworksQuery,
  useFiltertedArtworksQuery,
  useFeaturedArtworksQuery,
  useNewArtworksQuery,
  useArtworksByPriceQuery,
  useArtistArtworksQuery,
  useUserSingleArtworkQuery,
  useUploadMutation,
  useDeleteImageMutation,
  useUploadImageMutation,
  useUpdateMutation,
  useDeleteArtworkMutation,
} = artworksApiSlice;
