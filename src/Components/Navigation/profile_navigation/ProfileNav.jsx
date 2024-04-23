import React from "react";

import Home from "../../../assets/home.png";
import Noti from "../../../assets/notificationIcon.png";
import message from "../../../assets/messageIcon.png";

import { useNavigate } from "react-router-dom";

const ProfileNav = () => {
  const navigate = useNavigate();
  return (
    // {Style.navIcons}
    // ${Style.RightSide}
    <div className={`card w-full `}>
      <div className="mx-5 flex items-center justify-between py-3 ">
        <div className=" text-lg font-bold ">Profile</div>
        <div className="flex items-center gap-5 ">
          <img
            className="h-7 w-7 cursor-pointer hover:translate-y-1  hover:duration-300"
            src={Home}
            alt=""
            onClick={() => navigate("/")}
          />
          <div className="relative cursor-pointer hover:translate-y-1  hover:duration-300">
            <img className=" h-7 w-7 " src={Noti} alt="" />
            <span className="absolute -right-1 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              2
            </span>
          </div>

          <div className="relative cursor-pointer hover:translate-y-1  hover:duration-300">
            <img
              className="h-7 w-7 "
              src={message}
              alt=""
              onClick={() => navigate("/message")}
            />
            <span className="absolute -right-2 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileNav;
