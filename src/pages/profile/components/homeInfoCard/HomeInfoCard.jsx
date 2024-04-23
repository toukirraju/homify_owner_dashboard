import React, { useState } from "react";
import "./HomeInfoCard.css";
import logo from "../../../../assets/homeFylogo.png";
import { Link } from "react-router-dom";
import {
  UilCheckCircle,
  UilFileTimesAlt,
  UilFileCheckAlt,
  UilPen,
  UilTrashAlt,
} from "@iconscout/react-unicons";
import HouseInfoUpdateModal from "../../modals/HouseInfoUpdateModal";
import DefaultHousePopupModal from "../../modals/DefaultHousePopUpModal";
import HouseImage from "./HouseImage";
// import { useMediaQuery } from "@mantine/hooks";

const HomeInfoCard = ({ data }) => {
  // const isMobile = useMediaQuery("(max-width: 768px)");
  const [modalOpened, setModalOpened] = useState(false);
  const [defaultPopUpModalOpened, setDefaultPopUpModalOpened] = useState(false);

  return (
    <div className="card relative my-2 flex w-full flex-col  py-5 sm:flex-row">
      {/* image section  */}
      <div className="mx-2 mt-5 flex w-auto flex-col items-center justify-center p-2 md:mt-0">
        <HouseImage houseData={data} />
      </div>
      {/* button section  */}
      <div className="absolute right-1 top-2 flex">
        <DefaultHousePopupModal
          defaultPopUpModalOpened={defaultPopUpModalOpened}
          setDefaultPopUpModalOpened={setDefaultPopUpModalOpened}
          data={data}
        />
        {data.isDefault ? (
          <UilCheckCircle color="var(--orange)" width="2rem" />
        ) : (
          <UilCheckCircle
            width="2rem"
            cursor="pointer"
            onClick={() => setDefaultPopUpModalOpened(true)}
          />
        )}

        {data?.isVerified ? (
          <UilFileCheckAlt color="green" width="2rem" />
        ) : (
          <>
            <UilFileTimesAlt color="red" width="2rem" />
            <UilTrashAlt color="red" width="2rem" />
          </>
        )}

        {/* <button className=""> */}
        <UilPen
          width="2rem"
          height="1.2rem"
          cursor="pointer"
          onClick={() => setModalOpened(true)}
        />
        {/* </button> */}
        <HouseInfoUpdateModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          data={data}
        />
      </div>
      {/* info section  */}
      <div className="Profile__info__section">
        <h1 className="border-b-2 border-gray-400 text-lg font-bold text-gray-400 drop-shadow-lg">
          House Information
        </h1>
        <div className="flex items-center justify-start">
          <span>House Name:</span>
          <span className="text-lg drop-shadow-md dark:text-slate-200">
            {data.houseName}
          </span>
        </div>
        <div className="flex items-center justify-start">
          {" "}
          <span>House No:</span>
          {data.houseNo}
        </div>
        <div className="flex items-center justify-start">
          <span>Address:</span>
          {data?.address?.address_display_name}
        </div>
        <div className="flex items-center justify-start">
          <span>Division:</span>
          {data?.address?.state}
        </div>
        <div className="flex items-center justify-start">
          <span>District:</span>
          {data?.address?.state_district}
        </div>
        <div className="flex items-center justify-start">
          <span>Postcode:</span>
          {data?.address?.postCode ? data?.address?.postCode : ""}
        </div>

        <div className="flex items-center justify-start">
          <span>Number of floors:</span>
          {data.number_of_floors}
        </div>
        <div className="flex items-center justify-start">
          <span>Number of apartments:</span>
          {data.number_of_apartments}
        </div>
      </div>
    </div>
  );
};

export default HomeInfoCard;
