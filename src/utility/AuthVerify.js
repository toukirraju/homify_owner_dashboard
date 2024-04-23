import React from "react";
import { useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";

const AuthVerify = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  React.useEffect(() => {
    const checkToken = () => {
      if (user) {
        const decodedJwt = jwtDecode(user.token);
        if (decodedJwt.exp * 1000 < Date.now()) {
          // dispatch(logout());
        }
      }
    };
    setInterval(() => {
      checkToken();
    }, 6000);
  }, [dispatch, user, location]);

  return <div></div>;
};

export default AuthVerify;
