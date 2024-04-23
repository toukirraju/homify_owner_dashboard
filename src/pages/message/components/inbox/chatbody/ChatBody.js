// import Blank from "./Blank";
import { useParams } from "react-router-dom";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import Options from "./Options";
import { useGetMessagesQuery } from "../../../../../redux/features/messages/messagesApi";
import Error from "../../ui/Error";

export default function ChatBody() {
  const { id } = useParams();
  const {
    data: messagesResponse,
    isLoading,
    isError,
    error,
  } = useGetMessagesQuery(id);

  const { messages, totalCount } = messagesResponse || {};

  //decide what to render
  let content = null;

  if (isLoading) {
    content = <div>loading....</div>;
  } else if (!isLoading && isError) {
    content = (
      <div>
        <Error message={error?.data} />
      </div>
    );
  } else if (!isLoading && !isError && messages?.length === 0) {
    content = <div>no messages found!</div>;
  } else if (!isLoading && !isError && messages?.length > 0) {
    content = (
      <>
        <ChatHead message={messages[0]} />
        <Messages data={messagesResponse} />
        <Options info={messages[0]} />
      </>
    );
  }
  return (
    <div className="w-full  lg:col-span-2 lg:block ">
      <div className="conversation-row-grid grid  w-full">{content}</div>
    </div>
  );
}
