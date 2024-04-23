import { apiSlice } from "../../../api/apiSlice";
import { getRenters } from "../slice/renterSlice";

export const renterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchRenters: builder.query({
      query: () => ({
        url: "/renter/getAll",
        method: "GET",
      }),
      providesTags: ["AllRenters"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(getRenters(data));
        } catch (error) {}
      },
    }),

    createRenter: builder.mutation({
      query: (data) => ({
        url: `/renter/create`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            // update  cache pessimistically

            dispatch(
              apiSlice.util.updateQueryData(
                "fetchRenters",
                undefined,
                (draft) => {
                  return [...draft, data];
                }
              )
            );
          }
        } catch (error) {}
      },
    }),

    updateRenter: builder.mutation({
      query: (data) => ({
        url: `/renter/update/${data._id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          //Edit  cache pessimistically start
          if (data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "fetchRenters",
                undefined,
                (draft) => {
                  // console.log(JSON.stringify(draft));
                  const newArray = draft.map((item) => {
                    // eslint-disable-next-line eqeqeq
                    if (item._id == arg._id) {
                      return {
                        ...arg,
                      };
                    }
                    return item;
                  });
                  return newArray;
                }
              )
            );
          }
          //Edit  cache pessimistically end
        } catch (error) {}
      },
    }),

    removeRenter: builder.mutation({
      query: (data) => ({
        url: `/renter/remove/${data.renterId}`,
        method: "PATCH",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const deletionComplete = await queryFulfilled;

        //Delete  cache pessimistically start
        if (deletionComplete) {
          dispatch(
            apiSlice.util.updateQueryData(
              "fetchRenters",
              undefined,
              (draft) => {
                // eslint-disable-next-line eqeqeq
                const updatedRenters = draft.filter(
                  (item) => item._id != arg.renterId
                );
                return updatedRenters;
              }
            )
          );
        }
        //Delete  cache pessimistically end
      },
    }),

    assignRenter: builder.mutation({
      query: (data) => ({
        url: `/renter/assign`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;

        const { updatedRenter, updatedApartment } = data || {};

        //Delete  cache pessimistically start
        if (data) {
          //update all renters data
          dispatch(
            apiSlice.util.updateQueryData(
              "fetchRenters",
              undefined,
              (draft) => {
                const newRentersArray = draft.map((renter) => {
                  if (renter._id == updatedRenter._id) {
                    return {
                      ...updatedRenter,
                    };
                  }
                  return renter;
                });
                return newRentersArray;
              }
            )
          );

          //update all apartments data
          dispatch(
            apiSlice.util.updateQueryData(
              "fetchApartments",
              undefined,
              (draft) => {
                const newApartmentsArray = draft.map((apartment) => {
                  if (apartment._id == updatedApartment._id) {
                    return {
                      ...updatedApartment,
                    };
                  }
                  return apartment;
                });
                return newApartmentsArray;
              }
            )
          );
        }
        //Delete  cache pessimistically end
      },
    }),

    unAssignRenter: builder.mutation({
      query: (data) => ({
        url: `/renter/unassign`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;

        const { updatedRenter, updatedApartment } = data || {};

        if (data) {
          //update all renters data
          dispatch(
            apiSlice.util.updateQueryData(
              "fetchRenters",
              undefined,
              (draft) => {
                const newRentersArray = draft.map((renter) => {
                  if (renter._id == updatedRenter._id) {
                    return {
                      ...updatedRenter,
                    };
                  }
                  return renter;
                });
                return newRentersArray;
              }
            )
          );

          //update all apartments data
          dispatch(
            apiSlice.util.updateQueryData(
              "fetchApartments",
              undefined,
              (draft) => {
                const newApartmentsArray = draft.map((apartment) => {
                  if (apartment._id == updatedApartment._id) {
                    return {
                      ...updatedApartment,
                    };
                  }
                  return apartment;
                });
                return newApartmentsArray;
              }
            )
          );
        }
      },
    }),
  }),
});

export const {
  useFetchRentersQuery,
  useCreateRenterMutation,
  useUpdateRenterMutation,
  useRemoveRenterMutation,
  useAssignRenterMutation,
  useUnAssignRenterMutation,
} = renterApi;
