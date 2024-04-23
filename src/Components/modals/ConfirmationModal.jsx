import Styles from "./ModalStyle.module.css";
import { Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import UnAssignRenter from "./renterModal/UnAssignRenter";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";
import { useDeleteApartmentMutation } from "../../redux/features/apartment/RTK Query/apartmentApi";
import { useRemoveRenterMutation } from "../../redux/features/renter/RTK Query/renterApi";
import {
  useCreateBillMutation,
  useDeleteBillMutation,
  useDeleteTemporaryBillMutation,
} from "../../redux/features/transactions/RTK Query/billApi";
import { useRemoveManagerRoleMutation } from "../../redux/features/profile/RTK Query/profileApi";
import ErrorMessage from "../ErrorMessage";

function ConfirmationModal({
  confirmationPopUp,
  setConfirmationPopUp,
  data,
  popUp_type,
  isAssignData,
}) {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [unAssignModalOpened, setUnAssignModalOpened] = useState(false);

  //delete apartemnet
  const [
    deleteApartment,
    {
      isSuccess: apartmentDeletionSuccess,
      isLoading: apartmentDeletionLoading,
    },
  ] = useDeleteApartmentMutation();

  //delete renter
  const [
    removeRenter,
    { isSuccess: renterRemoveSuccess, isLoading: renterRemoveLoading },
  ] = useRemoveRenterMutation();

  //delete bill
  const [
    deleteBill,
    { isSuccess: billDeleteSuccess, isLoading: billDeleteLoading },
  ] = useDeleteBillMutation();

  //delete temporary bill
  const [
    deleteTemporaryBill,
    { isSuccess: tempBillDeleteSuccess, isLoading: tempBillDeleteLoading },
  ] = useDeleteTemporaryBillMutation();

  //create bill
  const [
    createBill,
    {
      isSuccess: createBillSuccess,
      isLoading: createBillLoading,
      error: billError,
    },
  ] = useCreateBillMutation();

  //remove manager
  const [
    removeManagerRole,
    { isSuccess: managerRemoveSuccess, isLoading: managerRemoveLoading },
  ] = useRemoveManagerRoleMutation();

  const handleSubmit = () => {
    switch (popUp_type) {
      case "Remove_Apartment":
        deleteApartment(data);

        break;
      case "Remove_Renter":
        removeRenter(data);
        break;

      case "Create_Bill":
        createBill(data);
        break;
      case "Remove_Bill":
        deleteBill(data);
        break;

      case "Remove_Temporary_Bill":
        deleteTemporaryBill(data);
        break;

      case "Delete_manager":
        removeManagerRole(data);
        break;

      default:
        return null;
    }
  };

  const success =
    renterRemoveSuccess ||
    apartmentDeletionSuccess ||
    createBillSuccess ||
    billDeleteSuccess ||
    tempBillDeleteSuccess ||
    managerRemoveSuccess;
  const loading =
    apartmentDeletionLoading ||
    renterRemoveLoading ||
    createBillLoading ||
    billDeleteLoading ||
    tempBillDeleteLoading ||
    managerRemoveLoading;

  useEffect(() => {
    if (success) {
      toast.success("Success!");
      setConfirmationPopUp(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const unAssingned = () => {
    setConfirmationPopUp(false);
    setUnAssignModalOpened(true);
  };
  return (
    <>
      <UnAssignRenter
        unAssignModalOpened={unAssignModalOpened}
        setUnAssignModalOpened={setUnAssignModalOpened}
        renterData={isAssignData}
      />

      <Modal
        classNames={{
          modal: `modal__Body`,
          title: `modal__title`,
          close: `modal__close`,
        }}
        overlayOpacity={0.55}
        overlayBlur={3}
        size={isMobile ? "sm" : "md"}
        //   fullScreen={isMobile}
        opened={confirmationPopUp}
        onClose={() => setConfirmationPopUp(false)}
      >
        {billError && <ErrorMessage message={billError?.data?.message} />}

        {data ? (
          <>
            {popUp_type === "Remove_Apartment" ||
            popUp_type === "Remove_Renter" ||
            popUp_type === "Remove_Bill" ||
            popUp_type === "Remove_Temporary_Bill" ||
            popUp_type === "Delete_manager" ? (
              <>
                <h3 className="title"> Are you sure? </h3>

                <div className={Styles.popUp__body}>
                  Do you really want to <b>{popUp_type}</b> ? After doing this
                  it can't be undone.
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    className="rounded-lg bg-slate-400 px-3 py-1 uppercase hover:bg-sky-500 hover:text-gray-200"
                    onClick={() => setConfirmationPopUp(false)}
                  >
                    cancel
                  </button>
                  <button
                    className={`removeButton px-3 py-1`}
                    disabled={loading}
                    onClick={() => handleSubmit()}
                  >
                    {loading ? <LoadingSpinner /> : "submit"}
                  </button>
                </div>
              </>
            ) : popUp_type === "Create_Bill" ? (
              <>
                <h3 className="title"> Are you sure? </h3>
                <div className="text-gray-300">
                  Do you really want to <b>{popUp_type}</b>? After creating, it
                  cannot be undone.
                </div>

                <div className="my-5 flex justify-end gap-2">
                  <button
                    className="rounded-lg bg-slate-400 px-2 py-1 uppercase hover:bg-sky-500 hover:text-gray-200"
                    onClick={() => setConfirmationPopUp(false)}
                  >
                    cancel
                  </button>
                  <button
                    className={`submit_button px-3 py-1`}
                    disabled={loading}
                    onClick={() => handleSubmit()}
                  >
                    {loading ? <LoadingSpinner /> : "submit"}
                  </button>
                </div>
              </>
            ) : null}
          </>
        ) : (
          <>
            <h3 className="title"> Are you sure? </h3>
            <div className={Styles.popUp__body}>
              To remove the <b>{popUp_type}</b>, it must be <b>unassigned</b>{" "}
              first.
            </div>
            <div className="flex justify-end gap-2">
              <button
                className={`removeButton px-3 py-1`}
                onClick={() => setConfirmationPopUp(false)}
              >
                cancel
              </button>
              <button
                className={`updateButton px-3 py-1`}
                onClick={() => unAssingned()}
              >
                unassign
              </button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}

export default ConfirmationModal;
