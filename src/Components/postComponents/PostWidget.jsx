import { Loader } from "@mantine/core";
import { useFetchPostWidgetQuery } from "../../redux/features/post/RTK Query/postApi";
import Styles from "./PostStyle.module.css";
import {
  UilHouseUser,
  UilPhoneAlt,
  UilMapMarker,
} from "@iconscout/react-unicons";
import ErrorMessage from "../ErrorMessage";

const PostWidget = () => {
  const { data, isLoading, isError } = useFetchPostWidgetQuery();

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
      <ErrorMessage message={"Somthing went wrong to fetching widgets data"} />
    );
  }

  if (!isLoading && !isError && data) {
    content = (
      <div className={`card  ${Styles.Post__widget__wrapper}`}>
        <div className={`card ${Styles.Post__widget__header}`}>
          <h3 className={`${Styles.header__title}`}>{data.houseName}</h3>
          <span className={`${Styles.header__subtitle}`}>
            <UilMapMarker /> {data?.address?.address_display_name}
          </span>
          <div className={`${Styles.owner__container__body}`}>
            <div className={`${Styles.owner_content}`}>
              <span>
                <UilHouseUser />
              </span>
              <span>{data.ownerName}</span>
            </div>
            <div className={`${Styles.owner_content}`}>
              <span>
                <UilPhoneAlt />{" "}
              </span>
              <span>{data.ownerPhone}</span>
            </div>
          </div>
        </div>
        <div className={`card ${Styles.Post__widget__container}`}>
          <div className={`card ${Styles.Post__count}`}>
            <span>Total Post:</span>
            <span>{data.totalPost}</span>
          </div>
          <div className={`card ${Styles.Post__activity}`}>
            <div className={`${Styles.active__post}`}>
              <span>Active Post: </span>
              <span>{data.activePost}</span>
            </div>
            <div className={`${Styles.inactive__post}`}>
              <span>inactive Post: </span>
              <span>{data.inactivePost}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div className="relative">{content}</div>;
};

export default PostWidget;
