import { Loader, Switch, Modal, useMantineTheme } from "@mantine/core";
import Styles from "../../../Styles/ModalStyle.module.css";
import { useMediaQuery } from "@mantine/hooks";
import {
  UilBookReader,
  UilBuilding,
  UilUser,
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
  UilElipsisDoubleVAlt,
  UilSigma,
  UilEllipsisH,
} from "@iconscout/react-unicons";
import { useState } from "react";

import ConfirmationModal from "../../../Components/modals/ConfirmationModal";
import UpdateRenter from "./UpdateRenter";
import AssignRenter from "../../../Components/modals/renterModal/AssignRenter";
import UnAssignRenter from "../../../Components/modals/renterModal/UnAssignRenter";

import ProfileImage from "../../../assets/user.png";
import RenterBillTable from "../components/tables/RenterBillTable";
import { useSelector } from "react-redux";

const RenterProfile = ({ profileModalOpened, setProfileModalOpened, data }) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [checked, setChecked] = useState(false);
  const [billChecked, setBillChecked] = useState(false);

  const [updateModalOpened, setUpdateModalOpened] = useState(false);
  const [assignModalOpened, setAssignModalOpened] = useState(false);
  const [unAssignModalOpened, setUnAssignModalOpened] = useState(false);

  const [confirmationPopUp, setConfirmationPopUp] = useState(false);

  const [isAssignData, setIsAssignData] = useState();
  const [removeData, setRemoveData] = useState();

  const { user: profileData } = useSelector((state) => state.auth);

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
        size="400"
        fullScreen={isMobile}
        opened={profileModalOpened}
        onClose={() => setProfileModalOpened(false)}
      >
        {data ? (
          <>
            <div>
              <div className={`card ${Styles.Modal_header}`}>
                <h3 className={` ${Styles.Modal_header_title}`}>Profile</h3>
              </div>
              <div>
                <div className={Styles.profile__Info__container}>
                  <div className={Styles.left__side}>
                    <img src={ProfileImage} alt="" />
                  </div>
                  <div className={Styles.popUpWindow__body}>
                    <div className={Styles.popUpWindow_double_elements}>
                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__elements}>
                          <span>Name</span>
                          <span>{data.fullname}</span>
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
                    <div className={Styles.popUpWindow_double_elements}>
                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__elements}>
                          <span>Advance Pay</span>
                          <span>{data.advanceRent}</span>
                        </div>
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
                            <UilElipsisDoubleVAlt />{" "}
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

              <RenterBillTable data={data.bills} />
            </div>

            {profileData.role === "owner" && (
              <div
                style={{ marginBottom: "40px" }}
                className={`card ${Styles.Modal_button_container}`}
              >
                {data.apartment === null ? (
                  <>
                    <button
                      className="removeButton btns"
                      onClick={() => handleRemove(data)}
                    >
                      remove
                    </button>
                    <button
                      className="submit_button btns"
                      onClick={() => setAssignModalOpened(true)}
                    >
                      Assign
                    </button>
                  </>
                ) : (
                  <button
                    className="removeButton btns"
                    onClick={() => setUnAssignModalOpened(true)}
                  >
                    Unassign
                  </button>
                )}
                <button
                  className="updateButton btns"
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

export default RenterProfile;
