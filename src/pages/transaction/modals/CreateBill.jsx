import Styles from "../../../Styles/ModalStyle.module.css";
import { Loader, Switch, Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import ConfirmationModal from "../../../Components/modals/ConfirmationModal";
import useBillMaker from "../hooks/useBillMaker";
import { useSelector } from "react-redux";

const CreateBill = ({
  billModalOpened,
  setBillModalOpened,
  data,
  temporaryBill,
}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const { user } = useSelector((state) => state.auth);

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isSMSOn, setIsSMSOn] = useState(true);

  const {
    error,
    total,
    newDue,
    formValue,
    onSubmit,
    submitedData,
    handleChange,
    confirmationPopUp,
    setConfirmationPopUp,
  } = useBillMaker(setBillModalOpened, temporaryBill, data, isSMSOn);

  return (
    <>
      <ConfirmationModal
        confirmationPopUp={confirmationPopUp}
        setConfirmationPopUp={setConfirmationPopUp}
        data={submitedData}
        popUp_type="Create_Bill"
      />
      <Modal
        classNames={{
          modal: `bg-gray-300 dark:bg-gray-800`,
          title: `modal__title`,
          close: `modal__close`,
        }}
        overlayOpacity={0.55}
        overlayBlur={3}
        size={isMobile ? "lg" : "lg"}
        opened={billModalOpened}
        onClose={() => setBillModalOpened(false)}
        title="Make bill"
      >
        {Object.keys(data).length !== 0 ? (
          <div>
            <div
              className={`card dark:text-gray-200 ${Styles.bill__header}`}
              style={{ margin: "15px 0" }}
            >
              <h3>{data?.apartment.renterName}</h3>
              <span className="subtitle">
                Floor: {data?.apartment.apartmentDetails.floor}
              </span>
            </div>

            <div className={Styles.bill__info}>
              <p className="card dark:text-gray-200">
                {" "}
                Rent: <b>{data?.apartment.billDetails.rent}</b>
              </p>
              <p className="card dark:text-gray-200">
                Gas Bill: <b>{data?.apartment.billDetails.gas_bill}</b>
              </p>
              <p className="card dark:text-gray-200">
                Water Bill: <b>{data?.apartment.billDetails.water_bill}</b>
              </p>
              <p className="card dark:text-gray-200">
                Service Charge:{" "}
                <b>{data?.apartment.billDetails.service_charge}</b>
              </p>
              <p className="card dark:text-gray-200">
                Others Bill: <b>{data?.apartment.billDetails.others}</b>
              </p>
              <p className="card dark:text-gray-200">
                Electricity Bill: <b>{temporaryBill.electricity_bill}</b>
              </p>
              <p className="card dark:text-gray-200">
                Others Temoprary Bill: <b>{temporaryBill.others}</b>
              </p>
              <p className="card dark:text-gray-200">
                Total fixed Rent: <b>{data?.apartment.billDetails.totalRent}</b>
              </p>
              <p className="card dark:text-gray-200">
                Old Due: <b>{temporaryBill ? temporaryBill.tempDue : 0}</b>
              </p>
            </div>

            <div
              className={`card dark:text-gray-200 ${Styles.bill__header}`}
              style={{ margin: "15px 0" }}
            >
              <p className="mt-2">
                {/* <b> */}
                Payable Amount: <b className="payableAmount">{total}</b> /-
                {/* </b> */}
              </p>
              <p className="mt-2">
                {/* <b> */}
                {newDue < 0
                  ? `Return Money : ${Math.abs(newDue)}`
                  : `Due : ${newDue}`}
                {/* </b> */}
              </p>
            </div>

            <form>
              <div className={Styles.switch}>
                <div>
                  <span className="dark:text-gray-200">Manual add bill</span>
                  <Switch
                    onLabel="ON"
                    offLabel="OFF"
                    checked={isSwitchOn}
                    onChange={(event) =>
                      setIsSwitchOn(event.currentTarget.checked)
                    }
                  />
                </div>

                {user?.isHomifyPlus && (
                  <div className={Styles.switch}>
                    <span className="dark:text-gray-200">SMS</span>
                    <Switch
                      onLabel="ON"
                      offLabel="OFF"
                      checked={isSMSOn}
                      onChange={(event) =>
                        setIsSMSOn(event.currentTarget.checked)
                      }
                    />
                  </div>
                )}
              </div>

              {isSwitchOn && (
                <>
                  <div
                    className={`${Styles.input__container} ${Styles.infoInput}`}
                  >
                    <label className={Styles.input__label}>
                      Electricity bill
                    </label>
                    <input
                      className=" dark:bg-slate-900 dark:text-gray-200"
                      type="number"
                      name="electricity_bill"
                      onChange={handleChange}
                      value={formValue.electricity_bill}
                      placeholder="Electricity bill"
                    />
                  </div>
                  <div
                    className={`${Styles.input__container} ${Styles.infoInput}`}
                  >
                    <label className={Styles.input__label}>Other bill</label>
                    <input
                      className=" dark:bg-slate-900 dark:text-gray-200"
                      type="number"
                      name="others"
                      onChange={handleChange}
                      value={formValue.others}
                      placeholder="Other bill"
                    />
                  </div>
                </>
              )}
              <div className={`${Styles.input__container} ${Styles.infoInput}`}>
                <label className={Styles.input__label}>Paid amount</label>
                <input
                  style={{ fontSize: "16px", fontWeight: 700 }}
                  type="number"
                  className=" dark:bg-slate-900 dark:text-gray-200"
                  name="paidAmount"
                  onChange={handleChange}
                  value={formValue.paidAmount}
                  placeholder="Paid amount"
                  onFocus={(e) => (e.target.value = "")}
                  required
                />
                {error && <div className={Styles.input__error}>{error}</div>}
              </div>
              <button
                className="submit_button mx-auto mb-5 px-3 py-1"
                disabled={error}
                onClick={onSubmit}
              >
                submit
              </button>
            </form>
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </Modal>
    </>
  );
};

export default CreateBill;
