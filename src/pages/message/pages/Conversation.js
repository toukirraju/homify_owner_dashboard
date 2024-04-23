import Blank from "../components/inbox/chatbody/Blank";
import Navigation from "../components/inbox/Navigation";
import Sidebar from "../components/inbox/Sidebar";

export default function Conversation() {
  return (
    <div>
      <Navigation />
      <div className="mx-auto -mt-1   max-w-7xl">
        <div className="flex  min-w-full rounded border lg:grid lg:grid-cols-3">
          <Sidebar />
          <div className=" w-full lg:col-span-2 lg:block">
            <div className="conversation-row-grid grid w-full">
              <Blank />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
