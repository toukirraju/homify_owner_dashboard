import BillTable from "./components/tables/BillTable";
import TempBillTable from "./components/tables/TempBillTable";
import Style from "./styles/Transaction.module.css";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";
import { useSelector } from "react-redux";

import TransactionButtons from "./components/buttons/TransactionButtons";
import AlertPoPUP from "../../Components/AlertPoPUP";
import {
  useFetchMonthlyBillQuery,
  useFetchTemporaryBillsQuery,
} from "../../redux/features/transactions/RTK Query/billApi";
import { Loader } from "@mantine/core";
import ErrorMessage from "../../Components/ErrorMessage";

const Transaction = () => {
  const { message } = useSelector((state) => state.message);

  const [date, setDate] = useState(new Date());
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const handleDateChange = (value) => {
    setDate(value);
  };

  const {
    data: billData,
    isLoading: billLoading,
    isError: billError,
  } = useFetchMonthlyBillQuery({ month, year });

  const {
    data: temporaryData,
    isLoading: tempBillLoading,
    isError: tempBillError,
  } = useFetchTemporaryBillsQuery();

  // decide what to render
  //bill table
  let billTable = null;
  if (billLoading && !billError) {
    billTable = (
      <div className="mx-auto flex h-full flex-col items-center justify-center">
        <Loader color="cyan" variant="bars" size="lg" />
      </div>
    );
  }
  if (!billLoading && billError) {
    billTable = <ErrorMessage message={"There is an error fetching bills"} />;
  }

  if (!billLoading && !billError && billData.length === 0) {
    billTable = <BillTable data={[]} date={date} />;
  }

  if (!billLoading && !billError && billData.length > 0) {
    billTable = <BillTable data={billData} date={date} />;
  }

  //temporary bill table
  let temporaryBillTable = null;
  if (tempBillLoading && !tempBillError) {
    temporaryBillTable = (
      <div className="mx-auto flex h-full flex-col items-center justify-center">
        <Loader color="cyan" variant="bars" size="lg" />
      </div>
    );
  }
  if (!tempBillLoading && tempBillError) {
    temporaryBillTable = (
      <ErrorMessage message={"There is an error fetching Temporary  bills"} />
    );
  }

  if (!tempBillLoading && !tempBillError && temporaryData.length === 0) {
    temporaryBillTable = <TempBillTable data={[]} />;
  }

  if (!tempBillLoading && !tempBillError && temporaryData.length > 0) {
    temporaryBillTable = <TempBillTable data={temporaryData} />;
  }

  return (
    <>
      {/* <AlertPoPUP /> */}
      {message && <AlertPoPUP message={message} />}
      <div className="card headerContainer">
        <h3 className="title">Transaction</h3>
        <div className="bulkCreate">
          <DatePicker
            className={Style.makeBill__button}
            defaultValue={new Date()}
            placeholder="Pick date"
            dropdownType="modal"
            // withinPortal
            variant="unstyled"
            size="xs"
            inputFormat={"MMMM-YYYY"}
            clearable={false}
            value={date}
            onChange={(value) => handleDateChange(value)}
          />
        </div>
      </div>
      <TransactionButtons />
      <div className="h-[calc(100vh-180px)] overflow-y-scroll  md:h-[calc(100vh-130px)] lg:flex   lg:gap-3">
        <div className="relative lg:w-8/12">{billTable}</div>

        <div className="relative lg:w-4/12">{temporaryBillTable}</div>
      </div>
    </>
  );
};

export default Transaction;
