import gravatarUrl from "gravatar-url";
import { useSelector } from "react-redux";
export default function ChatHead({ message }) {
  const { user } = useSelector((state) => state.auth);
  const { sender, receiver } = message || {};

  const { username } = user || {};

  const partnerUsername =
    sender.username === username ? receiver.username : sender.username;
  const partnerName =
    sender.username === username ? receiver.fullname : sender.fullname;

  return (
    <div className="relative flex items-center border-b border-gray-300 p-3">
      <img
        className="h-10 w-10 rounded-full object-cover"
        src={gravatarUrl(partnerUsername, { size: 80 })}
        alt={partnerName}
      />
      <span className="ml-2 block font-bold text-gray-600 drop-shadow-md  dark:text-gray-400 ">
        {partnerName}
      </span>
    </div>
  );
}
