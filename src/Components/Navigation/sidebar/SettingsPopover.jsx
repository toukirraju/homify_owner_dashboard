import { Popover } from "@mantine/core";
import React from "react";
import { useDispatch } from "react-redux";
import { apiSlice } from "../../../redux/api/apiSlice";
import { userLoggedOut } from "../../../redux/features/auth/slice/authSlice";
import { setDefaultHouse } from "../../../redux/features/profile/slice/profileSlice";
import DarkModeToggle from "../../DarkModeToggle";

import setting from "../../../assets/cogicon.png";
import about from "../../../assets/about.png";
import help_center from "../../../assets/help_center.png";
import feedback from "../../../assets/feedback.png";
import logoutIcon from "../../../assets/logout.png";

const SettingsPopover = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLoggedOut());
    localStorage.removeItem("auth");
    dispatch(apiSlice.util.resetApiState());
    dispatch(setDefaultHouse({}));
  };
  return (
    <Popover
      width={200}
      position="bottom"
      classNames={{ dropdown: "dark:bg-gray-700" }}
      withArrow
      shadow="md"
    >
      <Popover.Target>
        <img className="h-10 w-10 cursor-pointer" src={setting} alt="" />
      </Popover.Target>
      <Popover.Dropdown>
        <div
          onClick={handleLogout}
          className="my-2 flex cursor-pointer items-center justify-start gap-2 rounded-md p-2 font-bold hover:bg-gray-200"
        >
          <img className="h-8 w-8 cursor-pointer" src={logoutIcon} alt="" />
          <span className="text-slate-400">Logout</span>
        </div>
        <div className="flex cursor-pointer items-center justify-start gap-2 rounded-md p-2 font-bold">
          <img src={about} className="h-8 w-8" alt="" />
          <img src={feedback} className="h-8 w-8" alt="" />
          <img src={help_center} className="h-8 w-8" alt="" />
          <DarkModeToggle />
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

export default SettingsPopover;
