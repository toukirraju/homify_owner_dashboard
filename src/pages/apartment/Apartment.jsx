import styles from "./style/Apartment.module.css";
import CreateBulkApartment from "./modals/CreateBulkApartment";
import { useState } from "react";
import { useSelector } from "react-redux";
import AlertPoPUP from "../../Components/AlertPoPUP";
import ApartmentTable from "./components/tables/ApartmentTable";
import { Loader } from "@mantine/core";
import DefaultHouseGuideline from "../../Components/UI/guidlines/DefaultHouseGuideline";
import CreateApartmentGuideline from "../../Components/UI/guidlines/CreateApartmentGuideline";
import { useFetchApartmentsQuery } from "../../redux/features/apartment/RTK Query/apartmentApi";
import ErrorMessage from "../../Components/ErrorMessage";

const Apartment = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const { message } = useSelector((state) => state.message);

  const { data: apartmentData, isLoading, isError } = useFetchApartmentsQuery();

  const { user: profileData } = useSelector((state) => state.auth);

  let content = null;

  if (isLoading && !isError)
    content = (
      <div className="loading__screen">
        <Loader color="cyan" variant="bars" />
      </div>
    );

  if (!isLoading && isError)
    content = (
      <ErrorMessage message={"There was an error to fetching apartments"} />
    );

  if (apartmentData?.length === 0) {
    content = <CreateApartmentGuideline />;
  }

  if (profileData.defaultHomeID === "") {
    content = <DefaultHouseGuideline />;
  }

  if (apartmentData?.length > 0) {
    content = <ApartmentTable data={apartmentData} />;
  }
  return (
    <>
      {message && <AlertPoPUP message={message} />}
      <div className="card headerContainer" style={{ marginBottom: "10px" }}>
        <h3>Apartments</h3>
        {profileData.role === "owner" && (
          <div className="bulkCreate">
            <button
              disabled={profileData.defaultHomeID === ""}
              className={`submit_button ${styles.create__btn}`}
              onClick={() => setModalOpened(true)}
            >
              Create
            </button>
            <CreateBulkApartment
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
            />
          </div>
        )}
      </div>

      <div className="relative">{content}</div>
    </>
  );
};

export default Apartment;
