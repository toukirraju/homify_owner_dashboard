import React, { useState } from "react";
import Style from "./ProfileCard.module.css";
import {
  UilPhoneAlt,
  UilUser,
  UilPen,
  UilPostcard,
  UilBriefcaseAlt,
  UilUserExclamation,
} from "@iconscout/react-unicons";
import ProfileUpdateModal from "../../modals/ProfileUpdateModal";
import ProfileImage from "./ProfileImage";

const ProfileCard = ({ data }) => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    // ${Style.ProfileCard_wrapper}
    // ${Style.profile_image}
    // ${Style.image__upload}
    // ${Style.Profile__image__section}
    // ${Style.owner__container__body}
    // ${Style.edit__button}
    <div
      className={`card relative flex flex-col flex-wrap p-4 sm:flex-row md:justify-center`}
    >
      {/* image upload section */}
      <ProfileImage profilePicture={data?.profilePicture} />

      <div className={` absolute right-2 top-3 cursor-pointer `}>
        <UilPen
          width="2rem"
          height="1.2rem"
          onClick={() => setModalOpened(true)}
        />
        <ProfileUpdateModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          data={data}
        />
      </div>

      <div className={`lg:w-full`}>
        <h1 className="border-b-2 border-gray-400 text-lg font-bold text-gray-400 drop-shadow-lg">
          Personal Information
        </h1>
        <div className={``}>
          <div className={`${Style.owner_content}`}>
            <span>
              <UilUser />
            </span>
            <span>{data.firstname + " " + data.lastname}</span>
          </div>
          <div className={`${Style.owner_content}`}>
            <span>
              <UilPhoneAlt />{" "}
            </span>
            <span> {data.phone}</span>
          </div>
        </div>
        <div className={``}>
          <div className={`${Style.owner_content}`}>
            <span>
              <UilPostcard />
            </span>
            <span>{data.nid}</span>
          </div>
        </div>
        <div className={`flex gap-2`}>
          <div className={`${Style.owner_content} w-full`}>
            <span>
              <UilBriefcaseAlt />
            </span>
            <span> {data.profession}</span>
          </div>
          <div className={`${Style.owner_content} w-full`}>
            <span>
              <UilUserExclamation />{" "}
            </span>
            <span> {data.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
