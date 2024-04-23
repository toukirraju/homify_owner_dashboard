import { apiSlice } from "../../../api/apiSlice";
import { userLoggedIn } from "../slice/authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: `/auth/owner/signup`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          localStorage.setItem(
            "auth",
            JSON.stringify({
              token: data?.token,
              user: data?.user,
            })
          );

          dispatch(
            userLoggedIn({
              token: data?.token,
              user: data?.user,
            })
          );
        } catch (error) {}
      },
    }),
    signIn: builder.mutation({
      query: (data) => ({
        url: `/auth/owner/signin`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          localStorage.setItem(
            "auth",
            JSON.stringify({
              token: data?.token,
              user: data?.user,
            })
          );

          dispatch(
            userLoggedIn({
              token: data?.token,
              user: data?.user,
            })
          );
        } catch (error) {}
      },
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
