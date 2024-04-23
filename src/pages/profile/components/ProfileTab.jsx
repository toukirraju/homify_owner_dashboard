import React from "react";
import ProfileCard from "./profileCard/ProfileCard";
import SearchSection from "./searchSection/SearchSection";
import { useSelector } from "react-redux";
import { useFetchManagersQuery } from "../../../redux/features/profile/RTK Query/profileApi";
import { Loader } from "@mantine/core";
import ManagersTable from "./tables/ManagersTable";
import DefaultHomeCard from "./DefaultHomeCard";
import ErrorMessage from "../../../Components/ErrorMessage";

const ProfileTab = () => {
  const { user: profileData } = useSelector((state) => state.auth);

  const { data: managers = [], isLoading, isError } = useFetchManagersQuery();

  //decide what to render
  let managerContent = null;
  if (isLoading && !isError) {
    managerContent = (
      <div className="mx-auto flex h-full flex-col items-center justify-center">
        <Loader color="cyan" variant="bars" size="lg" />
      </div>
    );
  }

  if (!isLoading && isError) {
    managerContent = (
      <ErrorMessage message={"somthing went wrong to getting managers data"} />
    );
  }

  if (!isLoading && !isError && managers.length >= 0) {
    managerContent = <ManagersTable data={managers} />;
  }
  return (
    <div
      className={`mt-2 h-[calc(100vh-170px)] overflow-y-scroll md:h-[calc(100vh-115px)]  `}
    >
      <div className={`flex flex-col gap-3 md:flex-row`}>
        <ProfileCard data={profileData} />
        <DefaultHomeCard data={profileData} />

        {profileData.role === "owner" && (
          <div className={`mt-3 `}>
            <SearchSection />
            {/* make due for all unpaid user  */}
            {/* electricity bill calculator  */}
            {/* gas billcalculator */}
          </div>
        )}
      </div>
      {profileData.role === "owner" && (
        <div className={`relative mt-3`}>{managerContent}</div>
      )}
    </div>
  );
};

export default ProfileTab;
