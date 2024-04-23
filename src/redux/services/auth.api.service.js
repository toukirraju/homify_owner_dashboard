import axios from "axios";

const API_URL = "http://localhost:4040/api/v1/auth/";
// const API_URL = "https://api.billfactor.xyz/auth/";

/////////////////////// Owner Register \\\\\\\\\\\\\\\\\\\\\\\\
const register = (formData) => {
  return axios.post(API_URL + "owner/signup", formData).then((response) => {
    // if (response.data) {
    //   if (response.data.user.role) {
    //     localStorage.setItem("profile", JSON.stringify(response.data));
    //   } else {
    //     // redirect:
    //     window.location.replace("http://localhost:3000");
    //   }
    // }
    return response.data;
  });
};
/////////////

/////////////////////// Owner login \\\\\\\\\\\\\\\\\\\\\\\\
const login = (formData) => {
  return axios.post(API_URL + "owner/signin", formData).then((response) => {
    if (response.data) {
      if (response.data.user.role) {
        localStorage.setItem("profile", JSON.stringify(response.data));
      } else {
        // redirect:
        window.location.replace("http://localhost:3000");
      }
    }
    return response.data;
  });
};
/////////////

/////////////////////// Logout \\\\\\\\\\\\\\\\\\\\\\\\
const logout = () => {
  localStorage.clear();
  window.location.reload();
};
/////////////

const authService = {
  register,
  login,
  logout,
};

export default authService;
