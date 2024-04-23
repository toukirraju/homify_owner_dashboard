import { Modal } from "@mantine/core";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { useEffect } from "react";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import {
  UilBuilding,
  UilLayerGroup,
  UilListOlAlt,
  UilPanelAdd,
} from "@iconscout/react-unicons";
import { useMakeDefaultHouseMutation } from "../../../redux/features/profile/RTK Query/profileApi";

function DefaultHousePopupModal({
  defaultPopUpModalOpened,
  setDefaultPopUpModalOpened,
  data,
}) {
  const [makeDefaultHouse, { isLoading, isSuccess }] =
    useMakeDefaultHouseMutation();

  const initialValues = {
    ...data,
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("This house is default now");
      setDefaultPopUpModalOpened(false);
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
      opened={defaultPopUpModalOpened}
      onClose={() => setDefaultPopUpModalOpened(false)}
    >
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            // same shape as initial values
            makeDefaultHouse(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="card mb-2 grid grid-cols-6  py-3 text-slate-700 dark:text-slate-300">
                <span className="col-start-1 col-end-2 flex items-center justify-center">
                  {<UilBuilding />}
                </span>
                <span className="col-span-2 flex items-center justify-start font-bold">
                  House Name
                </span>
                <span className="col-span-3 flex items-center justify-center font-medium">
                  {data.houseName}
                </span>
              </div>

              <div className="card mb-2 grid grid-cols-6  py-3 text-slate-700 dark:text-slate-300">
                <span className="col-start-1 col-end-2 flex items-center justify-center">
                  {<UilListOlAlt />}
                </span>
                <span className="col-span-2 flex items-center justify-start font-bold">
                  House Number
                </span>
                <span className="col-span-3 flex items-center justify-center font-medium">
                  {data.houseNo}
                </span>
              </div>

              <div className="card mb-2 grid grid-cols-6  py-3 text-slate-700 dark:text-slate-300">
                <span className="col-start-1 col-end-2 flex items-center justify-center">
                  {<UilLayerGroup />}
                </span>
                <span className="col-span-2 flex items-center justify-start font-bold">
                  Number of floors
                </span>
                <span className="col-span-3 flex items-center justify-center font-medium">
                  {data.number_of_floors}
                </span>
              </div>

              <div className="card mb-2 grid grid-cols-6  py-3 text-slate-700 dark:text-slate-300">
                <span className="col-start-1 col-end-2 flex items-center justify-center">
                  {<UilPanelAdd />}
                </span>
                <span className="col-span-2 flex items-center justify-start font-bold">
                  Number of apartments
                </span>
                <span className="col-span-3 flex items-center justify-center font-medium">
                  {data.number_of_apartments}
                </span>
              </div>

              <div className="p-2 text-justify font-semibold text-slate-700 drop-shadow-md dark:text-slate-400">
                Are you sure? You want to set default this house?
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
      </div>
    </Modal>
  );
}

export default DefaultHousePopupModal;
