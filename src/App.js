import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import AppRoutes from "./AppRoutes";
import AuthVerify from "./utility/AuthVerify";
import useAuthCheck from "./hooks/useAuthCheck";
import Sidebar from "./Components/Navigation/sidebar/Sidebar";
import useAuth from "./hooks/useAuth";

function App() {
  const authChecked = useAuthCheck();
  const isLoggedIn = useAuth();

  return !authChecked ? (
    <div>Checking authentication.......</div>
  ) : (
    <>
      <AuthVerify />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // theme="colored"
      />

      <div className="App">
        {/* <div className="blur" style={{ top: "-18%", right: "0" }}></div>
        <div className="blur" style={{ top: "36%", left: "-8rem" }}></div> */}
        <div className="sidebar_container">{isLoggedIn && <Sidebar />}</div>
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
