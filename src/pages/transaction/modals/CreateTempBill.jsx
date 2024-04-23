import { Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import Styles from "../../../Styles/ModalStyle.module.css";
import { useCreateTemporaryBillMutation } from "../../../redux/features/transactions/RTK Query/billApi";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const CreateTempBill = ({
  createTempBillModalOpened,
  setCreateTempBillModalOpened,
  renterData,
  temporaryData,
}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const [createTemporaryBill, { isLoading, isSuccess }] =
    useCreateTemporaryBillMutation();

  const [formData, setFormData] = useState({
    renterId: "",
    renterName: "",
    electricity_bill: 0,
    others: 0,
    tempDue: 0,
  });

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
    createTemporaryBill(formData);
  };
  useEffect(() => {
    setFormData({
      renterId: renterData._id,
      renterName: renterData.fullname,
      electricity_bill: 0,
      others: 0,
      tempDue: 0,
    });
  }, [renterData, temporaryData]);

  useEffect(() => {
    if (isSuccess) {
      setCreateTempBillModalOpened(false);
      toast.success("Temporary bill created");
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
        opened={createTempBillModalOpened}
        onClose={() => setCreateTempBillModalOpened(false)}
        title="Create Temporary Bill"
      >
        <div
          className={`${Styles.bill__header} card dark:text-gray-200`}
          style={{ margin: "15px 0" }}
        >
          <h3>{renterData.fullname}</h3>
          <span className="subtitle">Apartment: {renterData.apartNo}</span>
        </div>
        <>
          <div className={`${Styles.bill__info}`}>
            <p className="card dark:text-gray-200">
              Electricity Bill:{" "}
              <b>{temporaryData ? temporaryData.electricity_bill : 0}</b>
            </p>
            <p className="card dark:text-gray-200">
              Others Bill: <b>{temporaryData ? temporaryData.others : 0}</b>
            </p>

            <p className="card dark:text-gray-200">
              Old Due: <b>{temporaryData ? temporaryData.tempDue : 0}</b>
            </p>
          </div>
        </>
        <div className={Styles.switch}>
          <label className="dark:text-gray-200">Manual add due bill</label>
          <span
            style={{
              fontSize: "20px",
              cursor: "pointer",
              color: "#5bc8ab",
            }}
            onClick={() => {
              setIsSwitchOn((prev) => !prev);
            }}
          >
            {isSwitchOn ? (
              <i className="uil uil-toggle-on "></i>
            ) : (
              <i className="uil uil-toggle-off text-gray-400"></i>
            )}
          </span>
        </div>
        <form onSubmit={submitHandler}>
          {isSwitchOn && (
            <>
              <div className={`${Styles.input__container} ${Styles.infoInput}`}>
                <label className="text-gray-600 dark:text-gray-300">
                  Due bill
                </label>
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
            </>
          )}

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
            disabled={isLoading}
            className="submit_button mx-auto mb-5 px-3 py-1"
          >
            {isLoading ? <LoadingSpinner /> : "submit"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default CreateTempBill;
