import Style from "./styles/Profile.module.css";
import ProfileNav from "../../Components/Navigation/profile_navigation/ProfileNav";
import { Tabs } from "@mantine/core";
import { useState } from "react";
import CreateNewHouseIModal from "./modals/CreateNewHouseIModal";
import AlertPoPUP from "../../Components/AlertPoPUP";
import HouseList from "./components/HouseList";
import ProfileTab from "./components/ProfileTab";
import PostTab from "./components/PostTab";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user: profileData } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <>
      {message && <AlertPoPUP message={message} />}
      <div className="headerContainer">
        <ProfileNav />
      </div>
      <div className={Style.tab__sections}>
        <Tabs
          variant="outline"
          className="text-gray-700 dark:text-gray-300"
          classNames={{
            tab: "dark:bg-gray-600 font-bold text-gray-700 dark:text-gray-300",
          }}
          defaultValue="profile"
        >
          <Tabs.List>
            <Tabs.Tab color="blue" value="profile">
              Profile
            </Tabs.Tab>

            {profileData.role === "owner" && (
              <>
                <Tabs.Tab color="blue" value="houseInfo">
                  House Info
                </Tabs.Tab>

                <Tabs.Tab color="blue" value="post">
                  Post
                </Tabs.Tab>
              </>
            )}
          </Tabs.List>

          {/******************  tab panal for profile section  ******************/}
          {/* ${Style.profile__sections} */}
          {/* ${Style.profile_container_1} */}
          {/* ${Style.profile_left} */}
          {/* ${Style.profile_right} */}
          {/* ${Style.profile_container_2} */}
          <Tabs.Panel value="profile">
            <ProfileTab />
          </Tabs.Panel>

          {profileData.role === "owner" && (
            <>
              {/******************  tab panal for house section  ******************/}
              <Tabs.Panel value="houseInfo">
                <button
                  className="submit_button mt-2 px-3 py-1"
                  onClick={() => setModalOpened(true)}
                >
                  create new house
                </button>
                <CreateNewHouseIModal
                  modalOpened={modalOpened}
                  setModalOpened={setModalOpened}
                />
                {/* house lists */}
                <HouseList />
              </Tabs.Panel>

              {/******************  tab panal for post section  ******************/}
              <Tabs.Panel value="post">
                {/* {Style.Posts__wrapper} */}
                {/* {Style.Posts__widget} */}
                {/* {Style.Posts__container} */}
                <PostTab />
              </Tabs.Panel>
            </>
          )}
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
