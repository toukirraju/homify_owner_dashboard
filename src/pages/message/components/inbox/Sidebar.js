import ChatItems from "./ChatIItems";

export default function Sidebar() {
  return (
    <div className="h-[calc(100vh_-_129px)] w-[100px] border-r border-t-0 border-gray-300  md:h-[calc(100vh_-_75px)]  md:w-full lg:col-span-1">
      <ChatItems />
    </div>
  );
}
