import { apiSlice } from "../../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (username) => `/messenger/users?username=${username}`,
    }),
  }),
});

export const { useGetUserQuery } = userApi;
