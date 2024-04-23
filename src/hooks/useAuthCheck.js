import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../redux/features/auth/slice/authSlice";

const useAuthCheck = () => {
  const dispatch = useDispatch();

  const [authCheck, setAuthCheck] = useState(false);

  useEffect(() => {
    const localAuth = localStorage?.getItem("auth");
    if (localAuth) {
      const auth = JSON.parse(localAuth);

      if (auth?.token && auth?.user) {
        dispatch(
          userLoggedIn({
            token: auth.token,
            user: auth.user,
          })
        );
      }
    }
    setAuthCheck(true);
  }, []);

  return authCheck;
};

export default useAuthCheck;
