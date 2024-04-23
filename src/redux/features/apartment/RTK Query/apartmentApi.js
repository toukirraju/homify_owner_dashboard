import { apiSlice } from "../../../api/apiSlice";

export const apartmnetApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchApartments: builder.query({
      query: () => ({
        url: "/apartment/",
        method: "GET",
      }),
      providesTags: ["AllApartments"],
    }),

    createApartment: builder.mutation({
      query: (data) => ({
        url: `/apartment/create`,
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
                "fetchApartments",
                undefined,
                (draft) => {
                  return [...draft, data];
                }
              )
            );
          }
        } catch (error) {}
      },
      invalidatesTags: ["AllApartments"],
    }),

    updateApartment: builder.mutation({
      query: (data) => ({
        url: `/apartment/update`,
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
                "fetchApartments",
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

    deleteApartment: builder.mutation({
      query: (id) => ({
        url: `/apartment/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const deletionComplete = await queryFulfilled;

        //Delete  cache pessimistically start
        if (deletionComplete) {
          dispatch(
            apiSlice.util.updateQueryData(
              "fetchApartments",
              undefined,
              (draft) => {
                // eslint-disable-next-line eqeqeq
                const updatedApartments = draft.filter(
                  (item) => item._id != arg
                );
                return updatedApartments;
              }
            )
          );
        }
        //Delete  cache pessimistically end
      },
    }),
  }),
});

export const {
  useFetchApartmentsQuery,
  useCreateApartmentMutation,
  useUpdateApartmentMutation,
  useDeleteApartmentMutation,
} = apartmnetApi;
