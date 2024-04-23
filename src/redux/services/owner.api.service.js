import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4040/api/v1/owner";
// const API_URL = "https://api.billfactor.xyz/api/v1/owner";

////********* Get Personal info ************\\\\
const getPersonalInfo = () => {
  return axios
    .get(API_URL + `/`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

//********* Update owner Personal Profile ************\\
const updateOwnerPersonalProfile = (formData) => {
  return axios
    .put(API_URL + "/personal/update", formData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

////********* Create new home ************\\\\
const createNewHouse = (formData) => {
  return axios
    .post(API_URL + "/house/create", formData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

////********* Get All Houses ************\\\\
const getAllHouses = (formData) => {
  return axios
    .get(API_URL + `/house/all`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

////********* Update House info ************\\\\
const updateHouseInfo = (formData) => {
  return axios
    .put(API_URL + `/house/update/${formData._id}`, formData, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

////********* Delete House ************\\\\
const deleteHouse = (formData) => {
  return axios
    .delete(API_URL + `/house/delete/${formData._id}`, formData, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

////********* Make Default House ************\\\\
const makeDefaultHouse = (formData) => {
  return axios
    .put(API_URL + `/house/default/${formData._id}`, formData, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

////********* Assign manager role ************\\\\
const assignRole = (formData) => {
  return axios
    .put(API_URL + `/assign/manager/${formData._id}`, formData, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

////********* Get Assigned manager ************\\\\
const getAllAssignedManagers = () => {
  return axios
    .get(API_URL + `/manager/all`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

////********* Search Manager ************\\\\
const searchManager = (formData) => {
  return axios
    .get(API_URL + `/manager/${formData}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

////********* Remove manager role ************\\\\
const removeRole = (formData) => {
  return axios
    .put(API_URL + `/remove/manager/${formData}`, formData, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const houseService = {
  getPersonalInfo,
  updateOwnerPersonalProfile,
  createNewHouse,
  getAllHouses,
  deleteHouse,
  makeDefaultHouse,
  assignRole,
  getAllAssignedManagers,
  searchManager,
  removeRole,
  updateHouseInfo,
};

export default houseService;
