import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const apiSlice = createApi({
  reducerPath: "apiUsers",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
