import Style from "./style/widgets.module.css";
import {
  UilUsersAlt,
  UilUserCheck,
  UilUserTimes,
} from "@iconscout/react-unicons";
import { Badge } from "@mantine/core";
const RenterWidget = ({ data }) => {
  return (
    <>
      {/* <div className={Style.widget__wrapper}> */}
      <div className={Style.widget__header}>
        <h4>Renters</h4>
      </div>
      <div className={Style.widget__container}>
        <div className={Style.widget__innerCard}>
          <div
            className={`${Style.widget__card__content} text-stone-600 dark:text-gray-400`}
          >
            <span>
              <UilUsersAlt />
            </span>
            <span>Total Renters</span>
            <span>
              {parseInt(data.activeRenters) + parseInt(data.inactiveRenters)}
            </span>
          </div>
        </div>

        <div className={Style.widget__innerCard}>
          <div
            className={`${Style.widget__card__content} text-stone-600 dark:text-gray-400`}
          >
            <span>
              <Badge
                variant="gradient"
                gradient={{ from: "teal", to: "blue", deg: 60 }}
              >
                New
              </Badge>
            </span>
            <span style={{ marginLeft: "5px" }}> New Renters</span>
            <span>{parseInt(data.newRenters)}</span>
          </div>
        </div>

        <div className={Style.widget__innerCard}>
          <div
            className={`${Style.widget__card__content} text-stone-600 dark:text-gray-400`}
          >
            <span>
              <UilUserCheck />
            </span>
            <span>Active renters</span>
            <span>{data.activeRenters}</span>
          </div>
        </div>
        <div className={Style.widget__innerCard}>
          <div
            className={`${Style.widget__card__content} text-stone-600 dark:text-gray-400`}
          >
            <span>
              <UilUserTimes />
            </span>
            <span>Inactive renters</span>
            <span>{data.inactiveRenters}</span>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default RenterWidget;
