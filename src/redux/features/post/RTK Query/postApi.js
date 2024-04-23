import { apiSlice } from "../../../api/apiSlice";

export const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchPosts: builder.query({
      query: () => ({
        url: `/post/specificposts`,
        method: "GET",
      }),
      providesTags: ["AllPosts"],
    }),
    fetchPostWidget: builder.query({
      query: () => ({
        url: `/post/postwidget`,
        method: "GET",
      }),
      providesTags: ["PostWidget"],
    }),
    makePost: builder.mutation({
      query: (data) => ({
        url: `/post/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllPosts", "PostWidget"],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/post/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const deletionComplete = await queryFulfilled;

        //Delete  cache pessimistically start
        if (deletionComplete) {
          dispatch(
            apiSlice.util.updateQueryData("fetchPosts", undefined, (draft) => {
              // eslint-disable-next-line eqeqeq
              const updatedPosts = draft.filter((item) => item._id != arg);
              return updatedPosts;
            })
          );
        }
        //Delete  cache pessimistically end
      },
      invalidatesTags: ["PostWidget"],
    }),
  }),
});

export const {
  useFetchPostsQuery,
  useFetchPostWidgetQuery,
  useMakePostMutation,
  useDeletePostMutation,
} = postApi;
