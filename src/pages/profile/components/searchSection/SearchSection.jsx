import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import { clearMessage } from "../../../../redux/slices/message";
import Style from "../../styles/Profile.module.css";
import SearchOutput from "../searchOutputCard/SearchOutput";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { searchManager } from "../../../../redux/features/filter/filterSlice";

const ValidatinSchema = Yup.object().shape({
  search: Yup.string().required("Required"),
});

const SearchSection = () => {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const [searchResult, setSearchResult] = useState({});
  const { message } = useSelector((state) => state.message);
  const initialValues = {
    search: "",
  };
  const closeSearchModal = () => {
    setSearchResult({});
  };
  useEffect(() => {
    dispatch(clearMessage());
  }, [searchResult]);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={ValidatinSchema}
        onSubmit={(values, { resetForm }) => {
          // same shape as initial values
          // console.log(values);
          setisLoading(true);
          dispatch(searchManager(values.search))
            .unwrap()
            .then((result) => {
              setisLoading(false);
              setSearchResult(result);
              resetForm();
            })
            .catch((err) => setisLoading(false));
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className={` ${Style.search_section}`}>
              <Field
                className="dark:bg-slate-800"
                type="text"
                name="search"
                placeholder="@username"
                // onChange={(e) => setsearchValue(e.target.value)}
                onFocus={() => {
                  setSearchResult({});
                }}
              />
              {errors.search && touched.search ? (
                <div className={Style.input__error}>{errors.search}</div>
              ) : null}
              <button
                disabled={isLoading}
                className={`submit_button absolute right-0 my-0.5 px-2 py-1`}
                type="submit"
              >
                {isLoading ? <LoadingSpinner /> : "find"}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div className={`card ${Style.search_output}`}>
        {/* search output */}

        {Object.keys(searchResult).length !== 0 ? (
          <SearchOutput
            closeSearchModal={closeSearchModal}
            data={searchResult}
          />
        ) : (
          <>
            <div style={{ width: "250px", padding: "10px", color: "grey" }}>
              If you want to assign manager. Then search manager username here
            </div>
            {message && (
              <h5
                style={{ textAlign: "center", margin: "10px 0", color: "red" }}
              >
                {message}
              </h5>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchSection;
