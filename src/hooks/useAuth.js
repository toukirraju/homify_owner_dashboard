import { useSelector } from "react-redux";

const useAuth = () => {
  const auth = useSelector((state) => state.auth);

  if (auth?.token && auth?.user) {
    return true;
  } else {
    return false;
  }
};

export default useAuth;
