import Styles from "./ModalStyle.module.css";
import { Modal } from "@mantine/core";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { useUpdateUserProfileMutation } from "../../../redux/features/profile/RTK Query/profileApi";

function ProfileUpdateModal({ modalOpened, setModalOpened, data }) {
  const initialValues = {
    ...data,
  };

  const [updateUserProfile, { isLoading, isSuccess }] =
    useUpdateUserProfileMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated");
      setModalOpened(false);
    }
  }, [isSuccess]);

  return (
    <Modal
      classNames={{
        modal: `bg-gray-300 dark:bg-gray-800`,
        title: `modal__title`,
        close: `modal__close`,
      }}
      overlayOpacity={0.55}
      overlayBlur={3}
      size="sm"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            // same shape as initial values
            updateUserProfile(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={Styles.address_container}>
                <div className={Styles.input__container}>
                  <label
                    htmlFor="firstname"
                    className="my-1 px-2 text-sm text-gray-600 dark:text-gray-300 "
                  >
                    First Name
                  </label>
                  <Field
                    className=" dark:bg-slate-900 dark:text-gray-200"
                    name="firstname"
                  />
                  {errors.firstname && touched.firstname ? (
                    <div className={Styles.input__error}>
                      {errors.firstname}
                    </div>
                  ) : null}
                </div>
                <div className={Styles.input__container}>
                  <label
                    htmlFor="lastname"
                    className="my-1 px-2 text-sm text-gray-600 dark:text-gray-300 "
                  >
                    Last Name
                  </label>
                  <Field
                    className=" dark:bg-slate-900 dark:text-gray-200"
                    name="lastname"
                  />
                  {errors.lastname && touched.lastname ? (
                    <div className={Styles.input__error}>{errors.lastname}</div>
                  ) : null}
                </div>
              </div>

              <div className={Styles.input__container}>
                <label
                  htmlFor="phone"
                  className="my-1 px-2 text-sm text-gray-600 dark:text-gray-300 "
                >
                  Phone Number
                </label>
                <Field
                  className=" dark:bg-slate-900 dark:text-gray-200"
                  name="phone"
                />
                {errors.phone && touched.phone ? (
                  <div className={Styles.input__error}>{errors.phone}</div>
                ) : null}
              </div>

              <div className={Styles.input__container}>
                <label
                  htmlFor="nid"
                  className="my-1 px-2 text-sm text-gray-600 dark:text-gray-300 "
                >
                  National id number
                </label>
                <Field
                  className=" dark:bg-slate-900 dark:text-gray-200"
                  name="nid"
                  type="number"
                />
                {errors.nid && touched.nid ? (
                  <div className={Styles.input__error}>{errors.nid}</div>
                ) : null}
              </div>
              <div className={Styles.input__container}>
                <label
                  htmlFor="profession"
                  className="my-1 px-2 text-sm text-gray-600 dark:text-gray-300 "
                >
                  Profession
                </label>
                <Field
                  className=" dark:bg-slate-900 dark:text-gray-200"
                  name="profession"
                  type="text"
                />
                {errors.profession && touched.profession ? (
                  <div className={Styles.input__error}>{errors.profession}</div>
                ) : null}
              </div>

              <button
                className="submit_button mx-auto  mt-4 px-3 py-1 md:my-4"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner /> : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}

export default ProfileUpdateModal;
