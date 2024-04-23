import Styles from "../../../Styles/ModalStyle.module.css";
import { Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { useUpdateTemporaryBillMutation } from "../../../redux/features/transactions/RTK Query/billApi";

const UpdateTempBill = ({
  updateTempBillModalOpened,
  setUpdateTempBillModalOpened,
  data,
}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [formData, setFormData] = useState({ ...data });

  const [updateTemporaryBill, { isSuccess, isLoading }] =
    useUpdateTemporaryBillMutation();

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    updateTemporaryBill(formData);
  };
  //   console.log(formData);
  useEffect(() => {
    setFormData({ ...data });
  }, [data]);
  // console.log(data);
  useEffect(() => {
    if (isSuccess) {
      toast.success("Temporary bill updated");
      setUpdateTempBillModalOpened(false);
    }
  }, [isSuccess]);
  return (
    <>
      <Modal
        classNames={{
          modal: `bg-gray-300 dark:bg-gray-800`,
          title: `modal__title`,
          close: `modal__close`,
        }}
        overlayOpacity={0.55}
        overlayBlur={3}
        size={isMobile ? "sm" : "md"}
        opened={updateTempBillModalOpened}
        onClose={() => setUpdateTempBillModalOpened(false)}
        title="Update Temporary Bill"
      >
        <div className={`${Styles.bill__header} card dark:text-gray-200`}>
          <h3>{data.renterName}</h3>
        </div>
        <>
          <div className={`${Styles.bill__info}`} style={{ margin: "15px 0" }}>
            <p className="card dark:text-gray-200">
              Electricity Bill: <b>{data ? data.electricity_bill : 0}</b>
            </p>
            <p className="card dark:text-gray-200">
              Others Bill: <b>{data ? data.others : 0}</b>
            </p>

            <p className="card dark:text-gray-200">
              Old Due: <b>{data ? data.tempDue : 0}</b>
            </p>
          </div>
        </>

        <form onSubmit={submitHandler}>
          <div className={`${Styles.input__container} ${Styles.infoInput}`}>
            <label className="text-gray-600 dark:text-gray-300">Due bill</label>
            <input
              className=" dark:bg-slate-900 dark:text-gray-200"
              type="number"
              placeholder="Enter Due"
              name="tempDue"
              value={formData.tempDue}
              //   onFocus={(e) => (e.target.value = "")}
              onChange={changeHandler}
              required
            />
          </div>

          <div className={`${Styles.input__container} ${Styles.infoInput}`}>
            <label className="text-gray-600 dark:text-gray-300">
              Electricity Bill
            </label>
            <input
              className=" dark:bg-slate-900 dark:text-gray-200"
              type="number"
              placeholder="Enter Electricity Bill"
              name="electricity_bill"
              value={formData.electricity_bill}
              //   onFocus={(e) => (e.target.value = "")}
              onChange={changeHandler}
              required
            />
          </div>

          <div className={`${Styles.input__container} ${Styles.infoInput}`}>
            <label className="text-gray-600 dark:text-gray-300">
              Others Bill
            </label>
            <input
              className=" dark:bg-slate-900 dark:text-gray-200"
              type="number"
              placeholder="Enter Others Bill"
              name="others"
              value={formData.others}
              //   onFocus={(e) => (e.target.value = "")}
              onChange={changeHandler}
              required
            />
          </div>

          <button
            className="submit_button mx-auto mb-5 px-3 py-1"
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner /> : "submit"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default UpdateTempBill;
