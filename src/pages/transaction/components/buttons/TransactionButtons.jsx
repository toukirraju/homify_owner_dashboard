import Style from "../../styles/Transaction.module.css";
import dashStyle from "../../../dashboard/styles/Dashboard.module.css";
import { DatePicker } from "@mantine/dates";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import PayableRenters from "../../modals/PayableRenters";
import RenterDropDown from "../../modals/RenterDropDown";
import { billApi } from "../../../../redux/features/transactions/RTK Query/billApi";
import { renterApi } from "../../../../redux/features/renter/RTK Query/renterApi";
const TransactionButtons = () => {
  const { user: profileData } = useSelector((state) => state.auth);
  const isFirstRender = useRef(true);
  const [isMakeBillOpen, setIsMakeBillOpen] = useState(false);
  const [popUpType, setPopUpType] = useState("");
  const [payableModalOpened, setPayableModalOpened] = useState(false);
  const [renterDropDownModalOpened, setRenterDropDownModalOpened] =
    useState(false);

  const [payableRenters, setPayableRenters] = useState([]);
  const [renterData, setRenterData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState(new Date());
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  //manually fetch payable renters data
  const { refetch: refetchPayableRenters } =
    billApi.endpoints.fetchPayableRenters.useQuery({ month, year });

  //manually fetch renters data
  const { refetch: refetchRenters } =
    renterApi.endpoints.fetchRenters.useQuery();

  // payable renters fetch on date change
  const handleDateChange = (e) => {
    setDate(e);
    setPayableRenters([]);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setLoading(true);
    refetchPayableRenters({ month, year })
      .unwrap()
      .then((result) => {
        setLoading(false);
        setPayableRenters(result);
        setPayableModalOpened(true);
        setIsMakeBillOpen(!isMakeBillOpen);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [date]);

  // renter fetch for temporary bill or renter profile
  const rentersPopUp = ({ popUpType }) => {
    setPopUpType(popUpType);

    setLoading(true);
    refetchRenters()
      .unwrap()
      .then((res) => {
        setLoading(false);
        setRenterData(res);
        setRenterDropDownModalOpened(true);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      <div className={`card ${Style.btn__container}`}>
        <DatePicker
          style={{
            display: "none",
          }}
          dropdownType="modal"
          variant="unstyled"
          dropdownOpened={isMakeBillOpen}
          setDropdownOpened={() => setIsMakeBillOpen(!isMakeBillOpen)}
          maxDate={new Date()}
          value={date}
          onChange={handleDateChange}
        />

        {/* temporary bill button  */}
        {profileData.role === "owner" && (
          <button
            className="submit_button"
            onClick={() => rentersPopUp({ popUpType: "tempBill" })}
            disabled={loading || profileData.defaultHomeID === ""}
          >
            Temporary Bill
          </button>
        )}
        {/* Make bill button  */}
        <button
          className={Style.makeBill__button}
          onClick={() => setIsMakeBillOpen(!isMakeBillOpen)}
          disabled={loading || profileData.defaultHomeID === ""}
        >
          Make Bill
        </button>

        {/* check Profile button  */}
        <button
          className="submit_button"
          onClick={() => rentersPopUp({ popUpType: "renterProfile" })}
          disabled={loading || profileData.defaultHomeID === ""}
        >
          Renter profile
        </button>

        {/* {payableRenters.length !== 0 && ( */}
        <PayableRenters
          payableModalOpened={payableModalOpened}
          setPayableModalOpened={setPayableModalOpened}
          data={payableRenters}
          date={{ month, year }}
          fullDate={date}
        />
        {/* )} */}

        {renterData.length !== 0 && (
          <RenterDropDown
            renterDropDownModalOpened={renterDropDownModalOpened}
            setRenterDropDownModalOpened={setRenterDropDownModalOpened}
            data={renterData}
            popUpType={popUpType}
          />
        )}
      </div>

      {loading && (
        <div className={dashStyle.loading__screen}>
          <LoadingSpinner />
        </div>
      )}
    </>
  );
};

export default TransactionButtons;
