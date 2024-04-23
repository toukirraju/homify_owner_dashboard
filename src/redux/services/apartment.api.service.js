import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4040/api/v1/apartment/";
// const API_URL = "https://api.billfactor.xyz/api/v1/apartment/";

/////////////////////// Create Apartment \\\\\\\\\\\\\\\\\\\\\\\\
const createApartments = (numOfapartment) => {
  return axios
    .post(API_URL + "create", numOfapartment, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

/////////////////////// Get Apartments \\\\\\\\\\\\\\\\\\\\\\\\
const getApartments = () => {
  return axios.get(API_URL, { headers: authHeader() }).then((response) => {
    return response.data;
  });
};
/////////////

/////////////////////// Add single Apartment \\\\\\\\\\\\\\\\\\\\\\\\
const addApartment = (apartData) => {
  return axios
    .post(API_URL + "addApartment", apartData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
/////////////

/////////////////////// Update Apartment \\\\\\\\\\\\\\\\\\\\\\\\
const updateApartment = (updatedData) => {
  return axios
    .post(API_URL + "update", updatedData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
/////////////

/////////////////////// Remove Apartment \\\\\\\\\\\\\\\\\\\\\\\\
const removeApartment = (apartmentId) => {
  return axios.delete(API_URL + `${apartmentId}`, { headers: authHeader() });
};
/////////////

const apartmentService = {
  createApartments,
  addApartment,
  getApartments,
  updateApartment,
  removeApartment,
};

export default apartmentService;
