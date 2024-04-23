import { Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Styles from "../../../Styles/ModalStyle.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../LoadingSpinner";
import { toast } from "react-toastify";
import {
  renterApi,
  useUnAssignRenterMutation,
} from "../../../redux/features/renter/RTK Query/renterApi";

const UnAssignRenter = ({
  unAssignModalOpened,
  setUnAssignModalOpened,
  renterData,
}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [assignRenter, { isSuccess, isLoading }] = useUnAssignRenterMutation();
  //manually fetch renters data
  const { refetch: refetchRenters } =
    renterApi.endpoints.fetchRenters.useQuery();

  const user = useSelector((state) => state.auth.user);
  const [selectedData, setSelectedData] = useState({
    renter: "",
  });
  const handleChange = (e) => {
    setSelectedData({ ...selectedData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let renter = Array.isArray(renterData)
      ? JSON.parse(selectedData.renter)
      : null;

    const unAssignedData = {
      ownerId: user._id,
      apartmentId: renter ? renter.apartmentId : renterData.apartmentId,
      renterId: renter ? renter._id : renterData._id,
    };
    // console.log(unAssignedData);
    assignRenter(unAssignedData);
  };
  useEffect(() => {
    if (isSuccess) {
      refetchRenters();
      toast.success("successfully unassigned");
      setUnAssignModalOpened(false);
      setSelectedData({
        renter: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

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
        opened={unAssignModalOpened}
        onClose={() => setUnAssignModalOpened(false)}
      >
        {Array.isArray(renterData) === true ? (
          <form>
            <div className={Styles.Modal_header}>
              <h3 className="text-2xl text-gray-400 drop-shadow-lg">
                Unassign Renter
              </h3>
              <span className="text-gray-400">
                * select the renter which one you want to unassign from the
                apartment
              </span>
            </div>
            <div className={Styles.input__container}>
              <select
                name="renter"
                className="bg-slate-500 text-gray-200"
                onChange={handleChange}
                value={selectedData.renter}
              >
                <option value="">Select Renter</option>
                {renterData
                  ? renterData.map((item, index) =>
                      item.apartment_number !== "" && item.roomNumber !== "" ? (
                        <option key={index} value={JSON.stringify(item)}>
                          Name: {item.fullname} &#10148; Phone: {item.phone}
                        </option>
                      ) : null
                    )
                  : null}
              </select>
            </div>

            <button
              className={`removeButton ${Styles.submit_button}`}
              disabled={isLoading}
              onClick={onSubmit}
            >
              {isLoading ? <LoadingSpinner /> : "Unassign"}
            </button>
          </form>
        ) : (
          <>
            <div className={Styles.Modal_header}>
              <h3 className={Styles.Modal_header_title}>
                Are you sure to unassign?
              </h3>
              <span className={Styles.Modal_header_subtitle}>
                After unassign you need to re-assign again
              </span>
            </div>

            <button
              className={`removeButton ${Styles.submit_button}`}
              disabled={isLoading}
              onClick={onSubmit}
              style={{
                // margin: "10px 13%",
                float: "right",
              }}
            >
              {isLoading ? <LoadingSpinner /> : "Unassign"}
            </button>
          </>
        )}
      </Modal>
    </>
  );
};

export default UnAssignRenter;
