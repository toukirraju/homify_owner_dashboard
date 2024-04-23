import React from "react";
import Style from "./profileCard/ProfileCard.module.css";
import Profle from "../../../assets/userlogo.png";
import {
  UilListOlAlt,
  UilBuilding,
  UilLocationPinAlt,
  UilBriefcaseAlt,
  UilLayerGroup,
} from "@iconscout/react-unicons";
import { useSelector } from "react-redux";

const DefaultHomeCard = ({ data }) => {
  // const isMobile = useMediaQuery("(max-width: 768px)");
  const defaultHouse = useSelector((state) => state.profile.defaultHouse);

  return (
    // ${Style.DefaultHomeCard_wrapper}
    // ${Style.profile_image}
    // ${Style.image__upload}
    // ${Style.Profile__image__section}
    // ${Style.owner__container__body}
    <div
      className={`card flex flex-col flex-wrap p-4  sm:flex-row md:justify-center`}
    >
      <div className={`mx-2 flex   flex-col items-center justify-center p-2`}>
        <img
          className={`mx-auto h-24 w-24 object-cover sm:h-36 sm:w-36 xl:mr-2`}
          src={
            defaultHouse?.houseImage ? defaultHouse?.houseImage?.url : Profle
          }
          alt="profileimage"
        />
      </div>
      <div className={`lg:w-full `}>
        <h1 className="border-b-2 border-gray-400 text-lg font-bold text-gray-400 drop-shadow-lg">
          House Information
        </h1>
        <div className={``}>
          <div className={`${Style.owner_content} `}>
            <span className="flex flex-wrap items-center gap-1 text-sm text-gray-400 dark:text-stone-500">
              <UilBuilding /> House name
            </span>
            <span className="dark:text-gray-400">
              {defaultHouse?.houseName}{" "}
            </span>
          </div>
          <div className={`${Style.owner_content}`}>
            <span className="flex flex-wrap items-center gap-1 text-sm dark:text-stone-500">
              <UilListOlAlt /> House no
            </span>
            <span className="dark:text-gray-400"> {defaultHouse?.houseNo}</span>
          </div>
        </div>
        <div className={``}>
          <div className={`${Style.owner_content}`}>
            <span>
              <UilLocationPinAlt />
            </span>
            <span className="dark:text-gray-400">
              {defaultHouse?.address?.address_display_name}
            </span>
          </div>
        </div>
        <div className={`flex gap-2`}>
          <div className={`${Style.owner_content} w-full`}>
            <span className="flex flex-wrap items-center gap-1 text-sm dark:text-stone-500">
              <UilBriefcaseAlt /> Apartment
            </span>
            <span className="dark:text-gray-400">
              {" "}
              {defaultHouse?.number_of_apartments}
            </span>
          </div>
          <div className={`${Style.owner_content} w-full`}>
            <span className="flex flex-wrap items-center gap-1 text-sm dark:text-stone-500">
              <UilLayerGroup /> FLoor
            </span>
            <span className="dark:text-gray-400">
              {" "}
              {defaultHouse?.number_of_floors}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultHomeCard;
