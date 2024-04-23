import Styles from "./ModalStyle.module.css";
import { Loader, Modal } from "@mantine/core";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  useAssignRoleMutation,
  useFetchHousesQuery,
} from "../../../redux/features/profile/RTK Query/profileApi";

const validation = Yup.object().shape({
  house: Yup.string().required("Required"),
});

function AssignManagerModal({
  modalOpened,
  setModalOpened,
  data,
  closeSearchModal,
}) {
  const [isLoading, setisLoading] = useState(false);
  const initialValues = {
    ...data,
  };
  const {
    data: houses,
    isLoading: houseLoading,
    isError: houseError,
  } = useFetchHousesQuery();
  //house list render
  let houseList = null;
  if (houseLoading && !houseError) {
    houseList = <Loader />;
  }
  if (!houseLoading && !houseError && houses.length === 0) {
    houseList = <>house not found</>;
  }
  if (!houseLoading && !houseError && houses.length > 0) {
    houseList = houses.map((house) => (
      <option key={house._id} value={JSON.stringify(house)}>
        {house.houseName}
      </option>
    ));
  }

  const [assignRole] = useAssignRoleMutation();
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
      // fullScreen={isMobile}
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={(values) => {
            // same shape as initial values
            const house = JSON.parse(values.house);
            const formData = {
              ...values,
              defaultHomeID: house._id,
              houseName: house.houseName,
            };
            setisLoading(true);
            assignRole(formData)
              .then((result) => {
                setisLoading(false);
                setModalOpened(false);
                toast.success("Manager assigned");
                closeSearchModal();
              })
              .catch((err) => setisLoading(false));
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div>
                <div className="card mb-2 flex justify-around py-2">
                  <span className="font-bold text-gray-400">Name</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {data.firstname + " " + data.lastname}
                  </span>
                </div>
                <div className="card mb-2 flex justify-around py-2">
                  <span className="font-bold text-gray-400">Phone</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {data.phone}
                  </span>
                </div>
                <div className="card mb-2 flex justify-around py-2">
                  <span className="font-bold text-gray-400">Role</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {data.role}
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="house" className={Styles.input__label}>
                  Select house for assign manager
                </label>

                <Field
                  id="house"
                  name="house"
                  className=" w-full dark:bg-slate-900 dark:text-gray-200"
                  component="select"
                >
                  <option value="">Select house</option>
                  {houseList}
                </Field>
                {errors.house && touched.house ? (
                  <div className={Styles.input__error}>{errors.house}</div>
                ) : null}
              </div>

              <button
                disabled={isLoading}
                className="submit_button mx-auto mb-16 mt-4 px-3 py-1 md:my-4"
                type="submit"
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

export default AssignManagerModal;
