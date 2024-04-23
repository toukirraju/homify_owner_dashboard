import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4040/api/v1/bill/";
// const API_URL = "https://api.billfactor.xyz/api/v1/bill/";

/////////////////////// Monthly Bills \\\\\\\\\\\\\\\\\\\\\\\\
const getMonthlyBill = ({ month, year }) => {
  return axios
    .get(API_URL + `${month}/${year}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

/////////////////////// Payable Renters \\\\\\\\\\\\\\\\\\\\\\\\
const getPayableRenters = ({ month, year }) => {
  return axios
    .get(API_URL + `payable/${month}/${year}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

/////////////////////// Get Temporary Bills \\\\\\\\\\\\\\\\\\\\\\\\
const getTempBills = () => {
  return axios
    .get(API_URL + `temp`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

/////////////////////// Get single Temporary Bill \\\\\\\\\\\\\\\\\\\\\\\\
const getRenterTempBIll = (renterId) => {
  return axios
    .get(API_URL + `/temp/r/${renterId}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

/////////////////////// Create Monthly Bills \\\\\\\\\\\\\\\\\\\\\\\\
const createBill = (billData) => {
  return axios
    .post(API_URL + "create", billData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

/////////////////////// Create Temporary Bill \\\\\\\\\\\\\\\\\\\\\\\\
const createTempBill = (tempBillData) => {
  return axios
    .post(API_URL + "temp/create", tempBillData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

/////////////////////// Update Temporary Bill \\\\\\\\\\\\\\\\\\\\\\\\
const updateTempBill = (tempBillData) => {
  return axios
    .post(API_URL + "temp/update", tempBillData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

/////////////////////// Remove Bill \\\\\\\\\\\\\\\\\\\\\\\\
const removeBill = (id) => {
  return axios
    .delete(API_URL + `delete/${id}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

/////////////////////// Remove Temporary Bill \\\\\\\\\\\\\\\\\\\\\\\\
const removeTempBill = (id) => {
  return axios
    .delete(API_URL + `temp/delete/${id}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const billService = {
  getPayableRenters,
  getMonthlyBill,
  getTempBills,
  getRenterTempBIll,
  createBill,
  createTempBill,
  updateTempBill,
  removeBill,
  removeTempBill,
};

export default billService;
