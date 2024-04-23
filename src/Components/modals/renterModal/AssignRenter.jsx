import { Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import Styles from "../../../Styles/ModalStyle.module.css";

import LoadingSpinner from "../../LoadingSpinner";
import useAssign from "./hooks/useAssign";
import { useFetchRentersQuery } from "../../../redux/features/renter/RTK Query/renterApi";

const AssignRenter = ({
  assignModalOpened,
  setAssignModalOpened,
  renterData,
  renterPopUp,
  apartmentData,
  apartmentPopUp,
}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const { data: renters = [] } = useFetchRentersQuery();

  //custom useAssign hook
  const { loading, fatchApartments, selectedData, handleChange, onSubmit } =
    useAssign({
      apartmentData,
      apartmentPopUp,
      renterData,
      renterPopUp,
      setAssignModalOpened,
    });

  return (
    <>
      <Modal
        classNames={{
          modal: `modal__Body`,
          title: `modal__title`,
          close: `modal__close`,
        }}
        overlayOpacity={0.55}
        overlayBlur={3}
        size={isMobile ? "sm" : "md"}
        // fullScreen={isMobile}
        opened={assignModalOpened}
        onClose={() => setAssignModalOpened(false)}
      >
        <div className={Styles.Modal_header}>
          <h3 className="text-2xl text-gray-400 drop-shadow-lg">
            Assign Renter
          </h3>
          {fatchApartments?.length === 0 && (
            <span className={Styles.Modal_header_subtitle}>
              * Apartment not available
            </span>
          )}
        </div>
        <form>
          <div className={Styles.input__container}>
            {!apartmentPopUp && (
              <select
                className="bg-slate-500 text-gray-200"
                onChange={handleChange}
                value={selectedData.apartment}
                name="apartment"
              >
                <option value="">Select Apartment</option>

                {fatchApartments
                  ? fatchApartments.map((apartment, idx) =>
                      apartment.isAvailable === true ? (
                        <option key={idx} value={JSON.stringify(apartment)}>
                          Floor:- {apartment.apartmentDetails.floor} &#10148;
                          Apartment:-{" "}
                          {apartment.apartmentDetails.apartment_number} &#10148;
                          Room:- {apartment.apartmentDetails.roomNumber}
                        </option>
                      ) : null
                    )
                  : null}
              </select>
            )}

            {!renterPopUp && (
              <select
                name="renter"
                className="bg-slate-500 text-gray-200"
                onChange={handleChange}
                value={selectedData.renter}
              >
                <option value="">Select Renter</option>
                {renters
                  ? renters.map((item, index) =>
                      (item.apartment_number === "" ||
                        item.apartment_number === undefined) &&
                      (item.roomNumber === "" ||
                        item.roomNumber === undefined) ? (
                        <option key={index} value={JSON.stringify(item)}>
                          &#10687; Name&#9500; {item.fullname} &#9500;&#9742;
                          Phone:- {item.phone}
                        </option>
                      ) : null
                    )
                  : null}
              </select>
            )}
          </div>

          <button
            className="submit_button mx-auto px-3 py-1"
            disabled={loading}
            onClick={onSubmit}
          >
            {loading ? <LoadingSpinner /> : " Assign"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default AssignRenter;
