import axios from "axios";
import authHeader from "../../../utility/auth-header";

// const baseURL = "http://localhost:4040/api/v1";
const baseURL = "https://api.h0mify.com/api/v1";
const URL = "/renter";
const URL2 = "/owner";

export const findRenter = async (searchId) => {
  const response = await axios.get(baseURL + URL + `/find/${searchId}`, {
    headers: authHeader(),
  });

  return response.data;
};
////********* Search Manager ************\\\\
export const findManager = async (searchId) => {
  const response = await axios.get(baseURL + URL2 + `/manager/${searchId}`, {
    headers: authHeader(),
  });

  return response.data;
};
