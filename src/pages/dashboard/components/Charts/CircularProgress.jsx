import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Style from "../../styles/Dashboard.module.css";
const CircularProgress = ({ data }) => {
  const percentage = Math.floor(
    (parseInt(data.paidRenters) * 100) / parseInt(data.activeRenters)
  );
  return (
    <div>
      <div className={`${Style.widget_header}`}>
        <h5 className="subtitle">
          <b>Payment</b>
        </h5>
        <div className={`${Style.widget_footer}`}>
          <p style={{ marginRight: "5px" }}>
            Complete:
            {data.paidRenters}
          </p>
          <p>Incomplete: {data.nonPaidRenters}</p>
        </div>
      </div>

      <div className={`mx-auto w-16 md:w-28 lg:w-32`}>
        <CircularProgressbar
          value={isNaN(percentage) ? 0 : percentage}
          text={`Paid: ${isNaN(percentage) ? 0 : percentage}%`}
          styles={buildStyles({
            textColor: "gray",
            pathColor: "turquoise",
            trailColor: "gold",
            textSize: "14px",
            fontWeight: "600",
          })}
        />
      </div>
      <div className={`${Style.widget_footer}`}>
        {/* <div> */}
        <p>Active Renter: {data.activeRenters}</p>
        <p>Inactive Renter: {data.inactiveRenters}</p>
        {/* </div> */}
      </div>
    </div>
  );
};

export default CircularProgress;
