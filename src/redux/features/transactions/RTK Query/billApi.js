import { apiSlice } from "../../../api/apiSlice";

export const billApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchMonthlyBill: builder.query({
      query: ({ month, year }) => ({
        url: `/bill/${month}/${year}`,
        method: "GET",
      }),
      providesTags: ["MonthlyBills"],
    }),
    fetchPayableRenters: builder.query({
      query: ({ month, year }) => ({
        url: `/bill/payable/${month}/${year}`,
        method: "GET",
      }),
      // Set skip to true to prevent automatic query execution
      skip: true,
    }),
    fetchTemporaryBills: builder.query({
      query: () => ({
        url: `/bill/temp`,
        method: "GET",
      }),
      providesTags: ["TemporaryBills"],
    }),
    fetchRenterTemporaryBill: builder.query({
      query: (renterId) => ({
        url: `/bill/temp/r/${renterId}`,
        method: "GET",
      }),
      // Set skip to true to prevent automatic query execution
      skip: true,
    }),

    //create bill
    createBill: builder.mutation({
      query: (data) => ({
        url: `/bill/create`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;

        const { createdBill } = data || {};

        const monthYear = {
          month: createdBill.billMonth,
          year: createdBill.billYear,
        };
        //update cache pessimistically start
        if (data) {
          dispatch(
            apiSlice.util.updateQueryData(
              "fetchMonthlyBill",
              monthYear,
              (draft) => {
                return [...draft, createdBill];
              }
            )
          );
        }
        //update cache pessimistically end
      },
      invalidatesTags: [
        "TemporaryBills",
        "YarlyBills",
        "RenterActivity",
        "ChartData",
      ],
    }),

    deleteBill: builder.mutation({
      query: (bill) => ({
        url: `/bill/delete/${bill._id}`,
        method: "DELETE",
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const deletionComplete = await queryFulfilled;

        const monthYear = {
          month: args.billMonth,
          year: args.billYear,
        };

        //Delete  cache pessimistically start
        if (deletionComplete) {
          dispatch(
            apiSlice.util.updateQueryData(
              "fetchMonthlyBill",
              monthYear,
              (draft) => {
                // eslint-disable-next-line eqeqeq
                const updatedBills = draft.filter(
                  (bill) => bill._id != args._id
                );
                return updatedBills;
              }
            )
          );
        }
        //Delete  cache pessimistically end
      },
      invalidatesTags: [
        "TemporaryBills",
        "YarlyBills",
        "RenterActivity",
        "ChartData",
      ],
    }),

    createTemporaryBill: builder.mutation({
      query: (data) => ({
        url: `/bill/temp/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["TemporaryBills"],
    }),

    deleteTemporaryBill: builder.mutation({
      query: (id) => ({
        url: `/bill/temp/delete/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const deletionComplete = await queryFulfilled;

        //Delete  cache pessimistically start
        if (deletionComplete) {
          dispatch(
            apiSlice.util.updateQueryData(
              "fetchTemporaryBills",
              undefined,
              (draft) => {
                // eslint-disable-next-line eqeqeq
                const updatedTempBills = draft.filter(
                  (bill) => bill._id != arg
                );
                return updatedTempBills;
              }
            )
          );
        }
        //Delete  cache pessimistically end
      },
    }),

    updateTemporaryBill: builder.mutation({
      query: (temp) => ({
        url: `/bill/temp/update`,
        method: "PATCH",
        body: temp,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        const { temporaryBill } = data || {};

        if (temporaryBill) {
          dispatch(
            apiSlice.util.updateQueryData(
              "fetchTemporaryBills",
              undefined,
              (draft) => {
                const newDraft = draft.map((temp) => {
                  if (temp._id == temporaryBill._id) {
                    return { ...temporaryBill };
                  }
                  return temp;
                });

                return newDraft;
              }
            )
          );
        }
      },
    }),

    generateDues: builder.mutation({
      query: (data) => ({
        url: `/bill/unbilled`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        if (data) {
          dispatch(
            apiSlice.util.invalidateTags(["MonthlyBills", "TemporaryBills"])
          );
        }
      },
    }),
  }),
});

export const {
  useFetchMonthlyBillQuery,
  useFetchPayableRentersQuery,
  useFetchTemporaryBillsQuery,
  useFetchRenterTemporaryBillQuery,
  useCreateBillMutation,
  useDeleteBillMutation,
  useCreateTemporaryBillMutation,
  useDeleteTemporaryBillMutation,
  useUpdateTemporaryBillMutation,
  useGenerateDuesMutation,
} = billApi;
