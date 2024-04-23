import { apiSlice } from "../../../api/apiSlice";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchYarlyBills: builder.query({
      query: (year) => ({
        url: `/dashboard/bills/${year}`,
        method: "GET",
      }),
      providesTags: ["YarlyBills"],
    }),
    fetchRentersActivity: builder.query({
      query: () => ({
        url: `/dashboard/activity`,
        method: "GET",
      }),
      providesTags: ["RenterActivity"],
    }),
    fetchCharts: builder.query({
      query: () => ({
        url: `/dashboard/pie`,
        method: "GET",
      }),
      providesTags: ["ChartData"],
    }),
    fetchWidgets: builder.query({
      query: () => ({
        url: `/dashboard/widget`,
        method: "GET",
      }),
      providesTags: ["WidgetData"],
    }),
  }),
});

export const {
  useFetchYarlyBillsQuery,
  useFetchRentersActivityQuery,
  useFetchChartsQuery,
  useFetchWidgetsQuery,
} = dashboardApi;
