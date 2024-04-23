import { Loader, Switch, Modal } from "@mantine/core";
import Styles from "../../../Styles/ModalStyle.module.css";
import { useMediaQuery } from "@mantine/hooks";
import {
  UilSimCard,
  UilLayerGroup,
  UilListOl,
  UilBedDouble,
  UilBath,
  UilUtensils,
  UilLaptopCloud,
  UilRulerCombined,
  UilTextFields,
  UilBill,
  UilFire,
  UilTear,
  UilWrench,
  UilSigma,
  UilEllipsisH,
} from "@iconscout/react-unicons";
import { useState } from "react";
import ConfirmationModal from "../../../Components/modals/ConfirmationModal";
import UpdateRenter from "./UpdateRenter";
import AssignRenter from "../../../Components/modals/renterModal/AssignRenter";
import UnAssignRenter from "../../../Components/modals/renterModal/UnAssignRenter";
import { useSelector } from "react-redux";
import CreateBill from "../../transaction/modals/CreateBill";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { billApi } from "../../../redux/features/transactions/RTK Query/billApi";
const PopUpWindow = ({ popUpModalOpened, setPopUpModalOpened, data }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const { user: profileData } = useSelector((state) => state.auth);

  const [checked, setChecked] = useState(false);
  const [billChecked, setBillChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const [billModalOpened, setBillModalOpened] = useState(false);
  const [updateModalOpened, setUpdateModalOpened] = useState(false);
  const [assignModalOpened, setAssignModalOpened] = useState(false);
  const [unAssignModalOpened, setUnAssignModalOpened] = useState(false);

  const [confirmationPopUp, setConfirmationPopUp] = useState(false);

  const { data: tempData = {}, refetch } =
    billApi.endpoints.fetchRenterTemporaryBill.useQuery(data?._id);
  const [isAssignData, setIsAssignData] = useState();
  const [removeData, setRemoveData] = useState();

  const [date, setDate] = useState(new Date());
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // remove Renter
  const handleRemove = (renter) => {
    if (
      (renter.apartmentId === "" || renter.apartmentId === undefined) &&
      (renter.apartment_number === "" ||
        renter.apartment_number === undefined) &&
      (renter.roomNo === "" || renter.roomNo === undefined)
    ) {
      setConfirmationPopUp(true);
      setRemoveData({ renterId: renter._id });
      setIsAssignData(null);
    } else {
      setConfirmationPopUp(true);
      setRemoveData(null);
      setIsAssignData(renter);
    }
  };
  // make bill
  const billHandler = () => {
    refetch(data?._id);
    setPopUpModalOpened(false);
    setBillModalOpened(true);
  };
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
        opened={popUpModalOpened}
        onClose={() => setPopUpModalOpened(false)}
      >
        {data ? (
          <>
            <div>
              <div className={`card ${Styles.Modal_header}`}>
                <h3 className={` ${Styles.Modal_header_title}`}>Actions</h3>
              </div>
              <div>
                <div className={Styles.popUpWindow__body}>
                  <div className={Styles.popUpWindow_double_elements}>
                    <div className={Styles.popUpWindow__innerCard}>
                      <div className={Styles.popUpWindow__card__elements}>
                        <span>First Name</span>
                        <span>{data.firstname}</span>
                      </div>
                    </div>
                    <div className={Styles.popUpWindow__innerCard}>
                      <div className={Styles.popUpWindow__card__elements}>
                        <span>Last Name</span> <hr />
                        <span>{data.lastname}</span>
                      </div>
                    </div>
                  </div>

                  <div className={Styles.popUpWindow_double_elements}>
                    <div className={Styles.popUpWindow__innerCard}>
                      <div className={Styles.popUpWindow__card__elements}>
                        <span>Phone</span>
                        <span>{data.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className={Styles.popUpWindow_double_elements}>
                    <div className={Styles.popUpWindow__innerCard}>
                      <div className={Styles.popUpWindow__card__elements}>
                        <span>Address</span>
                        <span>{data.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className={Styles.popUpWindow_double_elements}>
                    <div className={Styles.popUpWindow__innerCard}>
                      <div className={Styles.popUpWindow__card__elements}>
                        <span>Area</span>
                        <span>{data.area}</span>
                      </div>
                    </div>
                    <div className={Styles.popUpWindow__innerCard}>
                      <div className={Styles.popUpWindow__card__elements}>
                        <span>City/Town</span> <hr />
                        <span>{data.city}</span>
                      </div>
                    </div>
                    <div className={Styles.popUpWindow__innerCard}>
                      <div className={Styles.popUpWindow__card__elements}>
                        <span>Postcode</span> <hr />
                        <span>{data.postCode}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`card ${Styles.expend_apartment_info}`}>
                  <span>Apartment Informations</span>
                  <Switch
                    onLabel="ON"
                    offLabel="OFF"
                    checked={checked}
                    onChange={(event) =>
                      setChecked(event.currentTarget.checked)
                    }
                  />
                </div>
                {checked && (
                  <>
                    <div className={Styles.popUpWindow_container}>
                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilLayerGroup />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Floor</span> <hr />
                            <span>
                              {data.apartment === null
                                ? null
                                : data.apartment.apartmentDetails.floor}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilSimCard />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Name</span>
                            <span>
                              {data.apartment === null
                                ? null
                                : data.apartment.apartmentDetails.apartmentName}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilListOl />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Room Number</span>
                            <span>
                              {data.apartment === null
                                ? null
                                : data.apartment.apartmentDetails
                                    .apartment_number}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={Styles.popUpWindow_container}>
                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilTextFields />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Type</span> <hr />
                            <span>
                              {data.apartment === null
                                ? null
                                : data.apartment.apartmentDetails.apartmentType}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilBedDouble />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Bed Room</span>
                            <span>
                              {data.apartment === null
                                ? null
                                : data.apartment.apartmentDetails
                                    .number_of_bed_room}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilBath />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Bath</span> <hr />
                            <span>
                              {data.apartment === null
                                ? null
                                : data.apartment.apartmentDetails
                                    .number_of_baths}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={Styles.popUpWindow_container}>
                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilUtensils />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Kitchen</span>
                            <span>
                              {data.apartment === null
                                ? null
                                : data.apartment.apartmentDetails
                                    .number_of_kitchen}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilLaptopCloud />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Balcony</span>
                            <span>
                              {data.apartment === null
                                ? null
                                : data.apartment.apartmentDetails
                                    .number_of_balcony}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilRulerCombined />
                          </span>

                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Length</span>

                            <span>
                              {data.apartment === null
                                ? null
                                : data.apartment.apartmentDetails
                                    .apartment_length}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className={`card ${Styles.expend_apartment_info}`}>
                  <span>Bill Informations</span>
                  <Switch
                    onLabel="ON"
                    offLabel="OFF"
                    checked={billChecked}
                    onChange={(event) =>
                      setBillChecked(event.currentTarget.checked)
                    }
                  />
                </div>
                {billChecked && (
                  <>
                    <div className={Styles.popUpWindow_container}>
                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilBill />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Rent</span> <hr />
                            <span>
                              {data.apartment == null
                                ? null
                                : data.apartment.billDetails.rent}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilFire />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Gas bill</span>
                            <span>
                              {data.apartment == null
                                ? null
                                : data.apartment.billDetails.gas_bill}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilTear />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Water bill</span>
                            <span>
                              {data.apartment == null
                                ? null
                                : data.apartment.billDetails.water_bill}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={Styles.popUpWindow_container}>
                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilWrench />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Service charge</span> <hr />
                            <span>
                              {data.apartment == null
                                ? null
                                : data.apartment.billDetails.service_charge}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilEllipsisH />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>others</span>
                            <span>
                              {data.apartment == null
                                ? null
                                : data.apartment.billDetails.others}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilSigma />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Total </span>
                            <span>
                              {data.apartment == null
                                ? null
                                : data.apartment.billDetails.totalRent}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/******************************************  button section ******************************** */}
            {profileData.role === "owner" && (
              <div className={`card ${Styles.Modal_button_container}`}>
                {data.apartment === null ? (
                  <>
                    <button
                      className="removeButton px-2 py-1 text-sm"
                      onClick={() => handleRemove(data)}
                    >
                      remove
                    </button>
                    <button
                      className="submit_button px-2 py-1 text-sm"
                      onClick={() => setAssignModalOpened(true)}
                    >
                      Assign
                    </button>
                  </>
                ) : (
                  <button
                    className="removeButton px-2 py-1 text-sm"
                    onClick={() => setUnAssignModalOpened(true)}
                  >
                    Unassign
                  </button>
                )}
                {data.apartment !== null && (
                  <button
                    className="submit_button px-3 py-1"
                    onClick={() => billHandler()}
                    disabled={loading}
                  >
                    {loading ? <LoadingSpinner /> : "Make bill"}
                  </button>
                )}

                <button
                  className="updateButton px-2 py-1 text-sm"
                  onClick={() => setUpdateModalOpened(true)}
                >
                  Update
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="loading__screen">
            <Loader color="teal" variant="bars" />
          </div>
        )}
      </Modal>

      <UpdateRenter
        updateModalOpened={updateModalOpened}
        setUpdateModalOpened={setUpdateModalOpened}
        data={data}
      />
      <AssignRenter
        assignModalOpened={assignModalOpened}
        setAssignModalOpened={setAssignModalOpened}
        renterData={data}
        renterPopUp={true}
      />
      <UnAssignRenter
        unAssignModalOpened={unAssignModalOpened}
        setUnAssignModalOpened={setUnAssignModalOpened}
        renterData={data}
      />
      {Object.keys(tempData).length !== 0 && data.apartment !== null && (
        <CreateBill
          billModalOpened={billModalOpened}
          setBillModalOpened={setBillModalOpened}
          data={{ ...data, month, year }}
          temporaryBill={tempData}
        />
      )}
      <ConfirmationModal
        confirmationPopUp={confirmationPopUp}
        setConfirmationPopUp={setConfirmationPopUp}
        data={removeData}
        popUp_type="Remove_Renter"
        isAssignData={isAssignData}
      />
    </>
  );
};

export default PopUpWindow;
