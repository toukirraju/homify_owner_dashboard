import Styles from "../../../Styles/ModalStyle.module.css";
import { Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { toast } from "react-toastify";
import { useUpdateRenterMutation } from "../../../redux/features/renter/RTK Query/renterApi";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
  fullname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const UpdateRenter = ({ updateModalOpened, setUpdateModalOpened, data }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [updateRenter, { isSuccess, isLoading }] = useUpdateRenterMutation();
  const initialValues = {
    ...data,
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully Updated");
      setUpdateModalOpened(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <>
      <Modal
        classNames={{
          modal: `bg-gray-300 dark:bg-gray-800`,
          title: `modal__title`,
          close: `modal__close`,
        }}
        title="update renter profile"
        overlayOpacity={0.55}
        overlayBlur={3}
        size={isMobile ? "sm" : "md"}
        // fullScreen={isMobile}
        opened={updateModalOpened}
        onClose={() => setUpdateModalOpened(false)}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            // same shape as initial values
            updateRenter(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="rounded-lg bg-slate-800 p-5">
              <div className={Styles.input__container}>
                <label htmlFor="username" className={Styles.input__label}>
                  Username/E-mail
                </label>
                <Field className="bg-slate-900 text-gray-200" name="username" />
                {errors.username && touched.username ? (
                  <div className={Styles.input__error}>{errors.username}</div>
                ) : null}
              </div>
              <div className={Styles.input__container}>
                <label htmlFor="phone" className={Styles.input__label}>
                  Phone
                </label>
                <Field
                  className="bg-slate-900 text-gray-200"
                  name="phone"
                  type="number"
                />
                {errors.phone && touched.phone ? (
                  <div className={Styles.input__error}>{errors.phone}</div>
                ) : null}
              </div>

              <div className={Styles.address_container}>
                <div className={Styles.input__container}>
                  <label htmlFor="fullname" className={Styles.input__label}>
                    Full name
                  </label>
                  <Field
                    className="bg-slate-900 text-gray-200"
                    name="fullname"
                  />
                  {errors.fullname && touched.fullname ? (
                    <div className={Styles.input__error}>{errors.fullname}</div>
                  ) : null}
                </div>
              </div>

              <div className={Styles.input__container}>
                <label
                  htmlFor="permanent_address"
                  className={Styles.input__label}
                >
                  Address
                </label>
                <Field
                  className="bg-slate-900 text-gray-200"
                  name="permanent_address"
                  type="text"
                />
                {errors.permanent_address && touched.permanent_address ? (
                  <div className={Styles.input__error}>
                    {errors.permanent_address}
                  </div>
                ) : null}
              </div>
              <div className={Styles.address_container}>
                <div>
                  <label htmlFor="street_no" className={Styles.input__label}>
                    Street Number
                  </label>
                  <Field
                    className="bg-slate-900 text-gray-200"
                    name="street_no"
                    type="text"
                  />
                  {errors.street_no && touched.street_no ? (
                    <div className={Styles.input__error}>
                      {errors.street_no}
                    </div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="postcode" className={Styles.input__label}>
                    Zip / Postcode
                  </label>
                  <Field
                    className="bg-slate-900 text-gray-200"
                    name="postcode"
                    type="text"
                  />
                  {errors.postcode && touched.postcode ? (
                    <div className={Styles.input__error}>{errors.postcode}</div>
                  ) : null}
                </div>
              </div>

              <div className={Styles.input__container}>
                <label htmlFor="NID_no" className={Styles.input__label}>
                  National ID or Passport no
                </label>
                <Field
                  className="bg-slate-900 text-gray-200"
                  name="NID_no"
                  type="text"
                />
                {errors.NID_no && touched.NID_no ? (
                  <div className={Styles.input__error}>{errors.NID_no}</div>
                ) : null}
              </div>
              <div className={Styles.input__container}>
                <label htmlFor="advanceRent" className={Styles.input__label}>
                  Advance Rent
                </label>
                <Field
                  className="bg-slate-900 text-gray-200"
                  name="advanceRent"
                  type="text"
                />
                {errors.advanceRent && touched.advanceRent ? (
                  <div className={Styles.input__error}>
                    {errors.advanceRent}
                  </div>
                ) : null}
              </div>
              <button
                className="submit_button mx-auto px-3 py-1"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner /> : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default UpdateRenter;
