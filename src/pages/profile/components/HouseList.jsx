import { Loader } from "@mantine/core";
import { useFetchHousesQuery } from "../../../redux/features/profile/RTK Query/profileApi";
import Style from "../styles/Profile.module.css";
import HomeInfoCard from "./homeInfoCard/HomeInfoCard";
import ErrorMessage from "../../../Components/ErrorMessage";

const HouseList = () => {
  const { data: houses, isLoading, isError } = useFetchHousesQuery();

  //decide what to render
  let content = null;
  if (isLoading && !isError) {
    content = (
      <div className="mx-auto flex h-full flex-col items-center justify-center">
        <Loader color="cyan" variant="bars" size="lg" />
      </div>
    );
  }
  if (!isLoading && isError) {
    content = (
      <ErrorMessage message={"somthing went wrong to getting houses"} />
    );
  }
  if (!isLoading && !isError && houses?.length !== 0) {
    content = (
      <h3
        style={{
          padding: "20px",
          textAlign: "center",
          color: "gray",
        }}
      >
        House not found
      </h3>
    );
  }

  if (!isLoading && !isError && houses?.length > 0) {
    content = houses?.map((house, index) => (
      <div key={index}>
        <HomeInfoCard data={house} />
      </div>
    ));
  }
  return (
    <div className={`${Style.house_info_wrapper} relative`}>{content}</div>
  );
};

export default HouseList;
