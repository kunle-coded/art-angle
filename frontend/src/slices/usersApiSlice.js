import { apiSlice } from "./apiSlice";
import { setCredentials } from "./authSlice";

const USERS_URL = "/api/user";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.query({
      query: () => ({
        url: `${USERS_URL}/logout`,
      }),
    }),
    profile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
      }),
      providesTags: ["User"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (error) {
          console.error("Error fetching profile: ", error);
        }
      },
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    uploadFile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/upload`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(apiSlice.endpoints.profile.initiate());
        } catch (error) {
          console.error("Error uploading file: ", error);
        }
      },
    }),
    delete: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/deactivate`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutQuery,
  useDeleteMutation,
  useProfileQuery,
  useUpdateProfileMutation,
  useUploadFileMutation,
} = usersApiSlice;
