import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedOut } from "../features/auth/slice/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://homify-5voh.onrender.com/api/v1",
  // baseUrl: "https://api.h0mify.com/api/v1",
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = getState()?.auth?.token;

    if (token) {
      headers.set("Authorization", token);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      api.dispatch(userLoggedOut());
      localStorage.removeItem("auth");
      api.dispatch(apiSlice.util.resetApiState());
    }
    return result;
  },
  tagTypes: [
    "AllHouses",
    "AllManagers",
    "AllApartments",
    "AllRenters",
    "MonthlyBills",
    "TemporaryBills",
    "YarlyBills",
    "RenterActivity",
    "ChartData",
    "WidgetData",
    "AllPosts",
    "PostWidget",
  ],

  endpoints: (builder) => ({}),
});
