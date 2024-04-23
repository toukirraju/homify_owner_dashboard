import React, { useState } from "react";
import styles from "./SearchRenter.module.css";
import { UilSearch, UilTimes } from "@iconscout/react-unicons";
import { useDispatch } from "react-redux";
import SearchPopUp from "../../modals/SearchPopUp";
import { Loader } from "@mantine/core";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { searchRenter } from "../../../../redux/features/filter/filterSlice";

const ValidatinSchema = Yup.object().shape({
  search: Yup.string().required("Required"),
});

const SearchRenter = () => {
  const dispatch = useDispatch();
  const initialValues = {
    search: "",
  };
  const [loading, setLoading] = useState(false);
  const [searchPopUp, setSearchPopUp] = useState(false);
  const [searchData, setSearchData] = useState({});

  return (
    <>
      <SearchPopUp
        searchPopUp={searchPopUp}
        setSearchPopUp={setSearchPopUp}
        data={searchData}
      />

      <div className={styles.Search_Wrapper}>
        <Formik
          initialValues={initialValues}
          validationSchema={ValidatinSchema}
          onSubmit={(values) => {
            setLoading(true);
            dispatch(searchRenter(values.search))
              .unwrap()
              .then((res) => {
                setLoading(false);
                setSearchData(res);
                setSearchPopUp(true);
              })
              .catch((error) => {
                setLoading(false);
              });
          }}
        >
          {({ errors, touched, resetForm, dirty }) => (
            <Form>
              <div className="flex">
                <div className="relative flex">
                  <Field
                    type="text"
                    name="search"
                    className="dark:bg-slate-800"
                    placeholder="Find Renter"
                  />
                  {errors.search && touched.search ? (
                    <div className={styles.input__error}>{errors.search}</div>
                  ) : null}
                  {dirty && loading ? (
                    <Loader
                      color="cyan"
                      size="sm"
                      className="absolute right-1 top-2.5 text-red-500"
                      variant="oval"
                    />
                  ) : dirty && !loading ? (
                    <UilTimes
                      className="absolute right-0 top-2 text-red-500"
                      cursor="pointer"
                      onClick={() => {
                        resetForm();
                      }}
                    />
                  ) : null}
                </div>

                <div className={styles.s_buttons}>
                  <button className={styles.s_icon} type="submit">
                    <UilSearch />
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SearchRenter;
