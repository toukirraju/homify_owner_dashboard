import { Modal } from "@mantine/core";
import Styles from "../../../Styles/ModalStyle.module.css";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { toast } from "react-toastify";
import {
  useCreateApartmentMutation,
  useFetchApartmentsQuery,
} from "../../../redux/features/apartment/RTK Query/apartmentApi";

const validation = Yup.object().shape({
  numOfFloors: Yup.number()
    .min(1, " Zero '0' not accepted. Minimum length is 1-100")
    .max(100, "Too Long! Maximum length is 1-100")
    .required("Required"),
});

const CreateBulkApartment = ({ modalOpened, setModalOpened }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [createApartment, { isSuccess, isLoading }] =
    useCreateApartmentMutation();
  const { data: apartmentData = [] } = useFetchApartmentsQuery();
  const initialValues = {
    numOfFloors: 0,
  };

  const resetInput = (e) => {
    e.target.value = "";
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully created");
      setModalOpened(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <>
      <Modal
        overlayOpacity={0.55}
        overlayBlur={3}
        size={isMobile ? "sm" : "md"}
        // fullScreen={isMobile}
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        classNames={{
          modal: `bg-gray-300 dark:bg-gray-800`,
          title: `modal__title`,
          close: `modal__close`,
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={(values, { resetForm }) => {
            // same shape as initial values
            createApartment(values);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={Styles.Modal_header}>
                <h3 className={Styles.Modal_header_title}>
                  {apartmentData.length === 0
                    ? "Create Multipule Apartment"
                    : "Create Apartment"}
                </h3>
                <span className={Styles.Modal_header_subtitle}>
                  {apartmentData.length === 0
                    ? "* if you want to create multiple apartment then you just enter how many floors you want to create"
                    : "* You just enter floor number where you want to create apartment"}
                </span>
              </div>
              <div className={Styles.input__container}>
                <label htmlFor="numOfFloors" className={Styles.input__label}>
                  {apartmentData.length === 0
                    ? "Enter Number of Floor's"
                    : "Enter floor number"}
                </label>
                <Field
                  className=" dark:bg-slate-800 dark:text-gray-200"
                  name="numOfFloors"
                  type="number"
                  onFocus={(e) => resetInput(e)}
                />
                {errors.numOfFloors && touched.numOfFloors ? (
                  <div className={Styles.input__error}>
                    {errors.numOfFloors}
                  </div>
                ) : null}
              </div>
              <button
                className="submit_button mx-auto px-3 py-1"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner /> : "Create"}
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default CreateBulkApartment;
