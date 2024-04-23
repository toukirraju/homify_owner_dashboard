import LoginForm from "./components/LoginForm";
import Style from "./styles/loginPage.module.css";
import logo from "../../assets/homefyDashboardLogo.png";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../../Components/DarkModeToggle";
import Banner from "./components/Banner";
const Authentication = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Style.wrapper  Style.logo__side Style.form__side*/}
      <section className="relative flex h-screen items-center justify-center overflow-y-scroll bg-gray-200 dark:bg-gray-900 ">
        <div className="absolute right-8 top-5">
          <DarkModeToggle />
        </div>
        <Banner />
        <div
          className={`flex flex-col items-center justify-center md:flex-row`}
        >
          <div className={` flex w-full items-center justify-center `}>
            <img
              className="h-40 cursor-pointer md:h-auto"
              onClick={() => navigate("/")}
              src={logo}
              alt=""
            />
          </div>
          <div className={`w-full items-center justify-center md:py-10`}>
            <LoginForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default Authentication;
