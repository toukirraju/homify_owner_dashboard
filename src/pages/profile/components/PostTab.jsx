import React from "react";
import PostWidget from "../../../Components/postComponents/PostWidget";
import PostSide from "./postSide/PostSide";

const PostTab = () => {
  return (
    <div className="h-[calc(100vh-170px)] overflow-y-scroll md:h-[calc(100vh-115px)]">
      <div className="mx-auto md:w-2/3">
        <div className="">
          <PostWidget />
        </div>
        <div className="">
          <PostSide />
        </div>
      </div>
    </div>
  );
};

export default PostTab;
