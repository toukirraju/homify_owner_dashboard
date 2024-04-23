import { useState } from "react";
import RenterTable from "./components/tables/RenterTable";
import "./styles/Renter.css";
import CreateRenter from "./modals/CreateRenter";
import { useSelector } from "react-redux";
import SearchRenter from "./components/renterSearch/SearchRenter";
import AlertPoPUP from "../../Components/AlertPoPUP";
import { Loader } from "@mantine/core";
import DefaultHouseGuideline from "../../Components/UI/guidlines/DefaultHouseGuideline";

import RenterAddingGuideline from "../../Components/UI/guidlines/RenterAddingGuideline";
import { useFetchRentersQuery } from "../../redux/features/renter/RTK Query/renterApi";
import ErrorMessage from "../../Components/ErrorMessage";

const Renter = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const { message } = useSelector((state) => state.message);
  const { user: profileData } = useSelector((state) => state.auth);

  const { data: renters, isLoading, isError } = useFetchRentersQuery();

  let content = null;

  if (isLoading && !isError)
    content = (
      <div className="loading__screen">
        <Loader color="cyan" variant="bars" />
      </div>
    );
  if (!isLoading && isError)
    content = (
      <ErrorMessage message={"There was an error to getting apartments"} />
    );

  if (renters?.length === 0) {
    content = <RenterAddingGuideline />;
  }

  if (profileData.defaultHomeID === "") {
    content = <DefaultHouseGuideline />;
  }

  if (renters?.length > 0) {
    content = <RenterTable data={renters} />;
  }

  return (
    <>
      {/* <AlertPoPUP /> */}
      {message && <AlertPoPUP message={message} />}

      <div className="card headerContainer ">
        <h3>Renters</h3>
        {profileData.role === "owner" && <SearchRenter />}
      </div>

      {/* create new renter */}
      {profileData.role === "owner" && (
        <>
          <button
            className="submit_button px-3 py-1"
            disabled={profileData.defaultHomeID === ""}
            onClick={() => setModalOpened(true)}
          >
            create renter
          </button>
          <CreateRenter
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
          />
        </>
      )}
      <div className="relative" style={{ marginTop: "10px" }}>
        {content}
      </div>
    </>
  );
};

export default Renter;
