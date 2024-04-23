import Style from "./styles/Dashboard.module.css";
import WidStyle from "./components/widgets/style/widgets.module.css";
import TransactionButtons from "../transaction/components/buttons/TransactionButtons";
import BarChartCompo from "./components/Charts/BarChartCompo";
import CircularProgress from "./components/Charts/CircularProgress";
import PieChart from "./components/Charts/PieChart";
import ApartmentWidget from "./components/widgets/ApartmentWidget";
import RenterWidget from "./components/widgets/RenterWidget";
import BillTable from "../transaction/components/tables/BillTable";
import { useSelector } from "react-redux";
import LogoSearch from "./components/logoSearch/LogoSearch";
import AlertPoPUP from "../../Components/AlertPoPUP";
import { Loader } from "@mantine/core";
import {
  useFetchChartsQuery,
  useFetchRentersActivityQuery,
  useFetchWidgetsQuery,
} from "../../redux/features/dashboard/RTK Query/dashboardApi";
import { useFetchMonthlyBillQuery } from "../../redux/features/transactions/RTK Query/billApi";
import { useState } from "react";
import ErrorMessage from "../../Components/ErrorMessage";

const Dashboard = () => {
  // const { billData } = useSelector((state) => state.billInfo);
  const [date, setDate] = useState(new Date());
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const { message } = useSelector((state) => state.message);

  const {
    data: renterActivity,
    isLoading: isLoadingRactive,
    isError: isErrorRactiv,
  } = useFetchRentersActivityQuery();
  const {
    data: pieChartData,
    isLoading: isLoadingPie,
    isError: isErrorPie,
  } = useFetchChartsQuery();
  const {
    data: apartmentWidgets,
    isLoading: isLoadingWidget,
    isError: isErrorWidget,
  } = useFetchWidgetsQuery();

  const {
    data: billData,
    isLoading: billLoading,
    isError: billError,
  } = useFetchMonthlyBillQuery({ month, year });

  //decide what to render

  //Progress bar
  let progressBar = null;
  let activity = null;
  if (isLoadingRactive && !isErrorRactiv) {
    progressBar = (
      <div className="flex h-full flex-col items-center justify-center">
        <Loader color="cyan" variant="bars" size="lg" />
      </div>
    );
    activity = (
      <div className="flex h-full flex-col items-center justify-center">
        <Loader color="cyan" variant="bars" size="lg" />
      </div>
    );
  }
  if (!isLoadingRactive && isErrorRactiv) {
    progressBar = <ErrorMessage message={"There is an error"} />;
  }

  if (!isLoadingRactive && !isErrorRactiv && renterActivity) {
    progressBar = <CircularProgress data={renterActivity} />;
    activity = <RenterWidget data={renterActivity} />;
  }

  //pie chart
  let pieChart = null;
  if (isLoadingPie && !isErrorPie) {
    pieChart = (
      <div className="flex h-full flex-col items-center justify-center">
        <Loader color="cyan" variant="bars" size="lg" />
      </div>
    );
  }
  if (!isLoadingPie && isErrorPie) {
    pieChart = <ErrorMessage message={"There is an error"} />;
  }

  if (!isLoadingPie && !isErrorPie && pieChartData) {
    pieChart = <PieChart data={pieChartData} />;
  }

  //widget
  let apartmentWidget = null;
  if (isLoadingWidget && !isErrorWidget) {
    apartmentWidget = (
      <div className="flex h-full flex-col items-center justify-center">
        <Loader color="cyan" variant="bars" size="lg" />
      </div>
    );
  }
  if (!isLoadingWidget && isErrorWidget) {
    apartmentWidget = <ErrorMessage message={"There is an error"} />;
  }

  if (!isLoadingWidget && !isErrorWidget && pieChartData) {
    apartmentWidget = <ApartmentWidget data={apartmentWidgets} />;
  }

  //bill table
  let billTable = null;
  if (billLoading && !billError) {
    billTable = (
      <div className="flex h-full flex-col items-center justify-center">
        <Loader color="cyan" variant="bars" size="lg" />
      </div>
    );
  }
  if (!billLoading && billError) {
    billTable = <ErrorMessage message={"There is an error"} />;
  }

  if (!billLoading && !billError && billData.length === 0) {
    billTable = <BillTable data={[]} date={date} />;
  }

  if (!billLoading && !billError && billData.length > 0) {
    billTable = <BillTable data={billData} date={date} />;
  }

  return (
    <div className="w-full lg:w-[calc(100vw-270px)]">
      {message && <AlertPoPUP message={message} />}
      <div className="card headerContainer">
        <h3 className="title">Dashboard</h3>
        <div className="bulkCreate">
          <LogoSearch />
        </div>
      </div>
      <div className="button_sections">
        <TransactionButtons />
      </div>
      <div className={`${Style.main__section} relative`}>
        <div>
          <BarChartCompo />
        </div>
        <div className={` flex flex-wrap justify-center gap-4 py-4 `}>
          <div className={` ${Style.progress} relative`}>{progressBar}</div>
          <div className={` ${Style.progress} relative`}>{pieChart}</div>

          {/* Widgets */}

          <div className={`${WidStyle.widget__wrapper} relative`}>
            {apartmentWidget}
          </div>

          <div className={`${WidStyle.widget__wrapper} `}>{activity}</div>
        </div>
        <div className="table__sections relative">
          {/* <BillTable data={billData} /> */}
          {billTable}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
