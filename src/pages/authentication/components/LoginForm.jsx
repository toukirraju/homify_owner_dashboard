import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { toast } from "react-toastify";
import AlertPoPUP from "../../../Components/AlertPoPUP";
import { clearMessage, setMessage } from "../../../redux/slices/message";
import {
  useSignInMutation,
  useSignUpMutation,
} from "../../../redux/features/auth/RTK Query/authApi";
import TextInput from "../../../Components/UI/TextInput";
import Banner from "./Banner";
import { validateUser } from "../../../utility/validator/authValidator";

const initialValues = {
  firstname: "",
  lastname: "",
  username: "",
  password: "",
  cpassword: "",
  phone: "",
  role: "",
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [
    signIn,
    {
      isSuccess: signInSuccess,
      isLoading: signInLoading,
      isError: signInIsError,
      error: signinError,
    },
  ] = useSignInMutation();
  const [
    signUp,
    {
      isSuccess: signUpSuccess,
      isLoading: signUpLoading,
      isError: signUpIsError,
      error: signupError,
    },
  ] = useSignUpMutation();

  const loading = signInLoading || signUpLoading;
  const success = signInSuccess || signUpSuccess;
  const isError = signInIsError || signUpIsError;

  const { message } = useSelector((state) => state.message);
  const [isSignUp, setIsSignUp] = useState(false);

  const submitForm = (values, { resetForm }) => {
    if (isSignUp) {
      signUp(values);
    } else {
      signIn(values);
    }
    success && resetForm();
  };
  useEffect(() => {
    if (success) {
      dispatch(clearMessage());
      toast.success("Success");
      navigate("/");
    }
  }, [success, dispatch, navigate]);

  useEffect(() => {
    dispatch(clearMessage());
    if (isError) {
      signinError && dispatch(setMessage(signinError?.data?.message));
      signupError && dispatch(setMessage(signupError?.data?.message));
    }
  }, [isError, dispatch]);

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => validateUser(values, isSignUp)}
      onSubmit={submitForm}
    >
      {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isValid,
          dirty,
          resetForm,
        } = formik;
        return (
          // Style.container Style.form__row

          <div className={`mx-5 mb-5 md:mx-10 lg:mx-28`}>
            {message && <AlertPoPUP message={message} />}

            <h3 className="my-5 text-center text-2xl font-extrabold text-gray-500 drop-shadow-lg dark:text-white">
              {isSignUp ? "Signup for new account" : "Dashboard Signin"}
            </h3>

            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <div
                  className={`my-1 flex gap-1 rounded-lg bg-white p-2 shadow-md dark:bg-slate-600`}
                >
                  <TextInput
                    title="First name"
                    type="firstname"
                    name="firstname"
                    id="firstname"
                    placeholder="first name"
                    value={values.firstname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.firstname}
                    touched={touched.firstname}
                  />

                  <TextInput
                    title="Last name"
                    type="lastname"
                    name="lastname"
                    id="lastname"
                    placeholder="last name"
                    value={values.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.lastname}
                    touched={touched.lastname}
                  />
                </div>
              )}
              {/* Style.form__row */}
              <div
                className={`my-1 flex rounded-lg bg-white p-2 shadow-md dark:bg-slate-600`}
              >
                <TextInput
                  type="text"
                  name="username"
                  id="username"
                  title="Email"
                  placeholder="@username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.username}
                  touched={touched.username}
                />
              </div>
              <div
                className={`my-1 flex gap-1 rounded-lg bg-white p-2 shadow-md dark:bg-slate-600`}
              >
                <TextInput
                  title="Password"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.password}
                  touched={touched.password}
                />

                {isSignUp && (
                  <TextInput
                    title="Confirm Password"
                    type="password"
                    name="cpassword"
                    placeholder="confirm password"
                    id="cpassword"
                    value={values.cpassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.cpassword}
                    touched={touched.cpassword}
                  />
                )}
              </div>

              {isSignUp && (
                <div
                  className={`my-1 flex rounded-lg bg-white p-2 shadow-md dark:bg-slate-600`}
                >
                  <TextInput
                    title="Phone"
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="019XXXXXXXX"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors.phone}
                    touched={touched.phone}
                  />
                </div>
              )}

              {isSignUp && (
                <div
                  className={`my-1 flex rounded-lg bg-white p-2 shadow-md dark:bg-slate-600`}
                >
                  <div
                    className={`w-full text-sm font-normal text-gray-500 dark:text-slate-300`}
                  >
                    <label htmlFor="role">Role</label>

                    <select
                      name="role"
                      value={values.role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full dark:bg-slate-700"
                    >
                      <option value="" label="Select a role">
                        Select a role{" "}
                      </option>
                      <option value="owner" label="owner">
                        owner
                      </option>
                      <option value="manager" label="manager">
                        manager
                      </option>
                    </select>
                    {errors.role && touched.role && (
                      <span className="mx-1 w-full text-xs text-red-500">
                        {errors.role}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="my-2 cursor-pointer text-xs text-gray-500 hover:text-gray-700 dark:hover:text-white">
                <div>
                  <span
                    onClick={() => {
                      setIsSignUp((prev) => !prev);
                      resetForm();
                      // dispatch(clearMessage());
                    }}
                  >
                    {isSignUp
                      ? "Already have an account. Sign in"
                      : "Don't have an account? Sign Up"}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className={
                  !(dirty && isValid)
                    ? "disabled-btn px-2 py-1"
                    : "submit_button px-2 py-1"
                }
                disabled={!(dirty && isValid) || loading}
                style={{ margin: "auto" }}
              >
                {/* {isSignUp ? "Sign up" : "Sign in"} */}
                {loading ? (
                  <LoadingSpinner />
                ) : isSignUp ? (
                  "Sign up"
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
