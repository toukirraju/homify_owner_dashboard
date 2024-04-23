import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4040/api/v1/renter/";
// const API_URL = "https://api.billfactor.xyz/api/v1/renter/";

//////////////////////////////////////////     Create Renter      //////////////////////////////////////////
const createRenter = (formData) => {
  return axios
    .post(API_URL + "create", formData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
//////////////////////////////////////////     Get All Renter      //////////////////////////////////////////
const getAllRenter = () => {
  return axios
    .get(API_URL + `getAll`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
//////////////////////////////////////////    Query  Renter      //////////////////////////////////////////
const getQueryRenters = ({ startRow, endRow }) => {
  return axios
    .get(API_URL + `all?s_page=${startRow}&e_page=${endRow}`, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
//////////////////////////////////////////     Find Renter      //////////////////////////////////////////
const findRenter = (searchId) => {
  return axios
    .get(API_URL + `find/${searchId}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
//////////////////////////////////////////     Update Renter      //////////////////////////////////////////
const updateRenter = (formData) => {
  return axios
    .put(API_URL + `update/${formData._id}`, formData, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
//////////////////////////////////////////     Remove Renter From Home     //////////////////////////////////////////
const removeRenter = (removeData) => {
  return axios
    .put(API_URL + `remove/${removeData.renterId}`, removeData, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

//////////////////////////////////////////     Permanently Delete Renter      //////////////////////////////////////////
const deleteRenter = (renterId) => {
  return axios.delete(API_URL + `renter/${renterId}`, {
    headers: authHeader(),
  });
};

//////////////////////////////////////////    assign/unassign  Renter      //////////////////////////////////////////

//////////////////////////////////////////     Assign Renter      //////////////////////////////////////////
const assignRenter = (assignedData) => {
  return axios
    .post(API_URL + "assign", assignedData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

//////////////////////////////////////////     Unassign Renter      //////////////////////////////////////////
const unAssignRenter = (unAssignedData) => {
  return axios
    .post(API_URL + "unassign", unAssignedData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const renterService = {
  ////////Renter////////
  createRenter,
  getAllRenter,
  getQueryRenters,
  updateRenter,
  removeRenter,
  deleteRenter,
  findRenter,
  ////////Assign/////////
  assignRenter,
  unAssignRenter,
};

export default renterService;
