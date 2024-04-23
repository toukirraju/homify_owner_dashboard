import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import profile from "../../../assets/user.png";
import { useSelector } from "react-redux";
import SettingsPopover from "./SettingsPopover";
import { useMediaQuery } from "@mantine/hooks";

const Sidebar = () => {
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width: 48em)");

  const [toggle, setToggle] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="sidebar relative">
      <div className="nav container ">
        {/*********************************** nav logo********************************** */}
        <p className="nav__logo z-10">
          {isMobile ? (
            <NavLink className="LinkUnset__hover" to="/">
              HomeFy
            </NavLink>
          ) : (
            <a
              className="LinkUnset__hover"
              href="https://h0mify.com"
              target="_blank"
              rel="noreferrer"
            >
              HomeFy
            </a>
          )}
        </p>

        {/*********************************** nav lists start********************************** */}
        <div className="nav__menu" style={toggle ? { bottom: "0" } : null}>
          <ul className="nav__list">
            <li className="nav__item " onClick={handleToggle}>
              <NavLink
                to="/"
                className="nav__link flex items-center justify-start"
              >
                <i className="uil uil-create-dashboard"></i> Dashboard
              </NavLink>
            </li>
            <li className="nav__item" onClick={handleToggle}>
              <NavLink
                to="apartment"
                className="nav__link flex items-center justify-start"
              >
                <i className="uil uil-building"></i> Apartments
              </NavLink>
            </li>
            <li className="nav__item" onClick={handleToggle}>
              <NavLink
                to="renter"
                className="nav__link flex items-center justify-start"
              >
                <i className="uil uil-users-alt"></i> Renters
              </NavLink>
            </li>
            <li className="nav__item" onClick={handleToggle}>
              <NavLink
                to="transaction"
                className="nav__link flex items-center justify-start"
              >
                <i className="uil uil-invoice"></i> Transactions
              </NavLink>
            </li>
            <li className="nav__item" onClick={handleToggle}>
              <NavLink
                to="inbox"
                className="nav__link flex items-center justify-start"
              >
                <i className="uil uil-message"></i> Message
              </NavLink>
            </li>
            {isMobile && (
              <li className="nav__item">
                <span className="nav__link flex items-center justify-start">
                  <SettingsPopover />
                </span>
              </li>
            )}
          </ul>
          <i
            onClick={handleToggle}
            className="uil uil-times nav__close"
            style={toggle ? null : { bottom: "-100%" }}
          ></i>
        </div>
        {/*********************************** nav lists  end********************************** */}
        {/*********************************** nav bottom buttons small screen start********************************** */}
        <div className="nav__btns z-10">
          <div className="nav__toggle" onClick={handleToggle}>
            <i className="uil uil-apps"></i>
          </div>
        </div>
        {/*********************************** nav bottom buttons small screen end********************************** */}

        {/*********************************** nav bottom buttons large screen start********************************** */}
        <div className="absolute bottom-3 left-4 flex w-full items-center justify-center gap-2 md:left-0">
          <img
            className="h-10 w-10 cursor-pointer rounded-full shadow-sm shadow-gray-500 ring-2 ring-gray-500"
            src={user?.profilePicture ? user?.profilePicture?.url : profile}
            alt=""
            onClick={() => navigate("profile")}
          />

          {/******************* setting popover start  ****************** */}
          {/* <Popover
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
                <img
                  className="h-8 w-8 cursor-pointer"
                  src={logoutIcon}
                  alt=""
                />
                <span className="text-slate-400">Logout</span>
              </div>
              <div className="flex cursor-pointer items-center justify-start gap-2 rounded-md p-2 font-bold">
                <img src={about} className="h-8 w-8" alt="" />
                <img src={feedback} className="h-8 w-8" alt="" />
                <img src={help_center} className="h-8 w-8" alt="" />
                <DarkModeToggle />
              </div>
            </Popover.Dropdown>
          </Popover> */}
          {!isMobile && <SettingsPopover />}

          {/******************* setting popover end  ****************** */}
        </div>
        {/*********************************** nav bottom buttons large screen end********************************** */}
      </div>
    </div>
  );
};

export default Sidebar;
