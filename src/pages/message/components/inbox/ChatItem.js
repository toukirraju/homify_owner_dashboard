export default function ChatItem({ avatar, name, lastMessage, lastTime }) {
  return (
    <div className="flex cursor-pointer items-center border-b border-gray-300 px-3 py-2 text-sm transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none">
      <img
        className="h-10 w-10 rounded-full object-cover"
        src={avatar}
        alt={name}
      />
      <div className="hidden w-full pb-2 md:block">
        <div className="flex justify-between">
          <span className="ml-2 block font-semibold text-gray-600  dark:text-gray-400">
            {name}
          </span>
          <span className="ml-2 block text-sm text-gray-600">{lastTime}</span>
        </div>
        <span className="ml-2 block text-sm text-gray-600 dark:text-gray-400">
          {lastMessage}
        </span>
      </div>
    </div>
  );
}
