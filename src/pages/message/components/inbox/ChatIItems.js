import { useDispatch, useSelector } from "react-redux";
import ChatItem from "./ChatItem";
import {
  conversationsApi,
  useGetConversationsQuery,
} from "../../../../redux/features/conversations/conversationsApi";
import { useEffect, useState } from "react";
import Error from "../ui/Error";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment/moment";
import gravatarUrl from "gravatar-url";
import { Link } from "react-router-dom";
import getPartnerInfo from "../../../../utility/getPartnerInfo";

export default function ChatItems() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { username } = user || {};
  const { data, isLoading, isError, error } =
    useGetConversationsQuery(username) || {};

  const { conversations, totalCount } = data || {};

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) {
      dispatch(
        conversationsApi.endpoints.getMoreConversations.initiate({
          username,
          page,
        })
      );
    }
  }, [page, username]);

  useEffect(() => {
    if (totalCount > 0) {
      const more =
        Math.ceil(
          totalCount / Number(process.env.REACT_APP_CONVERSATIONS_PER_PAGE)
        ) > page;
      setHasMore(more);
    }
  }, [totalCount, page]);

  //decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <div
        id="scrollableDiv"
        className="h-[calc(100vh_-_129px)] overflow-auto md:h-[calc(100vh_-_75px)] "
      >
        <ul>
          <li className="m-2 text-center">loading....</li>
        </ul>{" "}
      </div>
    );
  } else if (!isLoading && isError) {
    content = (
      <div
        id="scrollableDiv"
        className="h-[calc(100vh_-_129px)] overflow-auto md:h-[calc(100vh_-_75px)] "
      >
        <ul>
          <li className="m-2 text-center">
            <Error message={error?.data} />
          </li>
        </ul>
      </div>
    );
  } else if (!isLoading && !isError && conversations?.length === 0) {
    content = (
      <div
        id="scrollableDiv"
        className="h-[calc(100vh_-_129px)] overflow-auto md:h-[calc(100vh_-_75px)] "
      >
        <ul>
          <li className="m-2 text-center">conversations not found!</li>
        </ul>{" "}
      </div>
    );
  } else if (!isLoading && !isError && conversations?.length > 0) {
    content = (
      <div
        id="scrollableDiv"
        className="h-[calc(100vh_-_129px)] overflow-auto md:h-[calc(100vh_-_75px)] "
      >
        <ul>
          <InfiniteScroll
            dataLength={conversations?.length} //This is important field to render the next data
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            // height={window.innerHeight - 129}
            scrollableTarget="scrollableDiv"
          >
            {conversations
              .slice()
              .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
              .map((conversation) => {
                const { _id, message, updatedAt } = conversation;
                const { username } = user || {};
                const { fullname, username: partnerEmail } = getPartnerInfo(
                  conversation.users,
                  username
                );
                return (
                  <li key={_id}>
                    <Link
                      style={{
                        display: "unset",
                        padding: "unset",
                        height: "unset",
                        fontWeight: "unset",
                      }}
                      to={`/inbox/${_id}`}
                    >
                      <ChatItem
                        avatar={gravatarUrl(partnerEmail, { size: 80 })}
                        name={fullname}
                        lastMessage={message}
                        lastTime={moment(updatedAt).fromNow()}
                      />
                    </Link>
                  </li>
                );
              })}
          </InfiniteScroll>
        </ul>{" "}
      </div>
    );
  }
  return content;
  // <div
  //   id="scrollableDiv"
  //   className="h-[calc(100vh_-_129px)] overflow-auto md:h-[calc(100vh_-_75px)] "
  // >
  //   <ul>{content}</ul>{" "}
  // </div>
}
