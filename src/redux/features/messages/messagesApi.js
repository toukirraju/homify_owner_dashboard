import io from "socket.io-client";

import { apiSlice } from "../../api/apiSlice";

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (id) =>
        `/messenger/messages?conversationId=${id}&_page=1&_limit=${process.env.REACT_APP_MESSAGES_PER_PAGE}`,

      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        //create socket

        const socket = io(process.env.REACT_APP_API_URL, {
          reconnectionDelay: 1000,
          reconnection: true,
          reconnectionAttempts: 10,
          transports: ["websocket"],
          agent: false,
          upgrade: false,
          rejectUnauthorized: false,
          withCredentials: true,
        });
        try {
          await cacheDataLoaded;
          socket.on("message", (data) => {
            updateCachedData((draft) => {
              if (data?.data?._id) {
                if (
                  !draft?.messages.find((item) => item._id == data.data._id)
                ) {
                  return {
                    messages: [...draft.messages, data?.data],
                    totalCount: Number(draft.totalCount),
                  };
                }
              }
            });
          });
        } catch (error) {}

        await cacheEntryRemoved;
        socket.close();
      },
    }),

    getMoreMessages: builder.query({
      query: ({ conversationId, page }) =>
        `/messenger/messages?conversationId=${conversationId}&_page=${page}&_limit=${process.env.REACT_APP_MESSAGES_PER_PAGE}`,
      async onQueryStarted({ conversationId }, { queryFulfilled, dispatch }) {
        try {
          const { data: response } = await queryFulfilled;
          const { messages } = response;

          if (messages?.length > 0) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getMessages",
                conversationId,
                (draft) => {
                  const combinedArr = draft.messages.concat(messages);
                  // Use the filter() method to remove duplicates
                  const uniqueArr = combinedArr.filter((obj, index, self) => {
                    return index === self.findIndex((t) => t._id == obj._id);
                  });
                  return {
                    messages: [...uniqueArr],
                    totalCount: Number(draft.totalCount),
                  };
                }
              )
            );
          }
        } catch (error) {}
      },
    }),

    addMessage: builder.mutation({
      query: (data) => ({
        url: "/messenger/messages",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;
