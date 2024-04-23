import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4040/api/v1/dashboard/";
// const API_URL = "https://api.billfactor.xyz/api/v1/dashboard/";

///////////////////////////////////////////////////////// Dashboard ///////////////////////////////////////////////

//////////////////// Yearly Bills ///////////////////////
const getYearlyBill = (year) => {
  return axios
    .get(API_URL + `bills/${year}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

//////////////////// Activity widget ///////////////////////
const getRenterActivityWidget = () => {
  return axios
    .get(API_URL + `activity`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

//////////////////// Pie Chart ///////////////////////
const getPieChartData = () => {
  return axios
    .get(API_URL + `pie`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

//////////////////// Apartment widget ///////////////////////
const getWidget = () => {
  return axios
    .get(API_URL + `widget`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const dashboardService = {
  //////////////////// Dashboard ///////////////////////
  getRenterActivityWidget,
  getWidget,
  getYearlyBill,
  getPieChartData,
};

export default dashboardService;
