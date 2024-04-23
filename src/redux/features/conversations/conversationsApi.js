import io from "socket.io-client";

import { apiSlice } from "../../api/apiSlice";
import { messagesApi } from "../messages/messagesApi";

export const conversationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: (username) =>
        `/messenger/conversations?participants_like=${username}&_page=1&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`,

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
          socket.on("conversation", (data) => {
            updateCachedData((draft) => {
              const conversation = draft?.conversations.find(
                (conv) => conv._id == data?.data?._id
              );
              if (conversation?._id) {
                conversation.message = data?.data?.message;
                conversation.updatedAt = data?.data?.updatedAt;
              } else {
                return {
                  conversations: [...draft.conversations, data?.data],
                  totalCount: Number(draft.totalCount),
                };
              }
            });
          });
        } catch (error) {}

        await cacheEntryRemoved;
        socket.close();
      },
    }),

    getMoreConversations: builder.query({
      query: ({ username, page }) =>
        `/messenger/conversations?participants_like=${username}&_page=${page}&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`,
      async onQueryStarted({ username }, { queryFulfilled, dispatch }) {
        try {
          const { data: response } = await queryFulfilled;
          const { conversations, totalCount } = response;
          if (conversations?.length > 0) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getConversations",
                username,
                (draft) => {
                  const combinedArr = draft.conversations.concat(conversations);
                  // Use the filter() method to remove duplicates
                  const uniqueArr = combinedArr.filter((obj, index, self) => {
                    return index === self.findIndex((t) => t._id == obj._id);
                  });
                  return {
                    conversations: [...uniqueArr],
                    totalCount: Number(totalCount),
                  };

                  // return {
                  //   conversations: [...draft.conversations, ...conversations],
                  //   totalCount: Number(draft.totalCount),
                  // };
                }
              )
            );
          }
        } catch (error) {}
      },
    }),

    getConversation: builder.query({
      query: ({ myUsername, participantUsername }) =>
        `/messenger/conversations?participants_like=${myUsername}-${participantUsername}&&participants_like=${participantUsername}-${myUsername}`,
    }),

    addConversation: builder.mutation({
      query: ({ sender, data }) => ({
        url: "/messenger/conversations",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: conversation } = await queryFulfilled;
          if (conversation?._id) {
            //update conversations pessimistically start
            dispatch(
              apiSlice.util.updateQueryData(
                "getConversations",
                arg.sender,
                (draft) => {
                  const filterdConversations = draft.conversations.filter(
                    (draftConversation) =>
                      draftConversation._id != conversation._id
                  );
                  return {
                    conversations: [...filterdConversations, conversation],
                    totalCount: Number(draft.totalCount),
                  };
                }
              )
            );
            //update conversations pessimistically end

            //silent entry to message table
            const users = conversation.users;
            const senderUser = users.find(
              (user) => user.username === arg.sender
            );
            const reciverUser = users.find(
              (user) => user.username !== arg.sender
            );
            await dispatch(
              messagesApi.endpoints.addMessage.initiate({
                conversationId: conversation?._id,
                sender: senderUser,
                receiver: reciverUser,
                message: conversation?.message,
              })
            );
          }
        } catch (error) {}
      },
    }),

    editConversation: builder.mutation({
      query: ({ _id, sender, data }) => ({
        url: `/messenger/conversations/${_id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic cache update start

        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getConversations",
            arg.sender,
            (draft) => {
              const draftConversation = draft.conversations.find(
                (conv) => conv._id == arg._id
              );

              draftConversation.message = arg.data.message;
            }
          )
        );

        // optimistic cache update end
        try {
          const { data: conversation } = await queryFulfilled;

          if (conversation?._id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getConversations",
                arg.sender,
                (draft) => {
                  const draftConversation = draft.conversations.find(
                    (conv) => conv._id == conversation._id
                  );
                  draftConversation.updatedAt = conversation.updatedAt;
                }
              )
            );

            //silent entry to message table
            const users = conversation.users;
            const senderUser = users.find(
              (user) => user.username === arg.sender
            );
            const reciverUser = users.find(
              (user) => user.username !== arg.sender
            );
            await dispatch(
              messagesApi.endpoints.addMessage.initiate({
                conversationId: conversation?._id,
                sender: senderUser,
                receiver: reciverUser,
                message: arg.data.message,
              })
            );
          }
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetConversationQuery,
  useAddConversationMutation,
  useEditConversationMutation,
} = conversationsApi;
