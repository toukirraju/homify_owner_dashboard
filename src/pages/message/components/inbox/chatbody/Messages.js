import Message from "./Message";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messagesApi } from "../../../../../redux/features/messages/messagesApi";

export default function Messages({ data = {} }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { username } = user || {};

  const { messages, totalCount } = data || {};

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };
  useEffect(() => {
    if (page > 1) {
      dispatch(
        messagesApi.endpoints.getMoreMessages.initiate({
          conversationId: messages[0].conversationId,
          page,
        })
      );
    }
  }, [page, messages[0]?.conversationId]);

  useEffect(() => {
    if (totalCount > 0) {
      const more =
        Math.ceil(
          totalCount / Number(process.env.REACT_APP_MESSAGES_PER_PAGE)
        ) > page;
      setHasMore(more);
    }
  }, [totalCount, page]);
  return (
    <div
      id="scrollableDiv"
      className="relative flex h-[calc(100vh_-_260px)] w-full flex-col-reverse overflow-y-auto p-6 md:h-[calc(100vh_-_200px)]"
    >
      <ul className="space-y-2">
        <InfiniteScroll
          dataLength={messages?.length} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          // height={window.innerHeight - 290}
          inverse={true}
          scrollableTarget="scrollableDiv"
          style={{
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          {messages
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((message) => {
              const { message: lastMessage, _id, sender } = message || {};

              const justify = sender.username !== username ? "start" : "end";
              return (
                <Message key={_id} justify={justify} message={lastMessage} />
              );
            })}
        </InfiniteScroll>
      </ul>
    </div>
  );
}
