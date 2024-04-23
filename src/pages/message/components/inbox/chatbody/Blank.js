import blankImage from "../../../../../assets/blank.svg";

export default function Blank() {
  return (
    <div className="overflow-y-hiddeen relative flex h-[calc(100vh_-_164px)] w-full flex-col items-center justify-center space-y-5 p-5 text-gray-700">
      <div>
        <img src={blankImage} alt="Nothing here!" className="w-20" />
      </div>
      <div className="text-center">
        No messages selected! Select an user from left sidebar to view all
        messages
      </div>
    </div>
  );
}
