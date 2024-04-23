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
import UpdateApartment from "./UpdateApartment";
import ConfirmationModal from "../../../Components/modals/ConfirmationModal";
import AssignRenter from "../../../Components/modals/renterModal/AssignRenter";
import PostShare from "../../../Components/postComponents/postShare/PostShare";
import { useSelector } from "react-redux";
const PopUpWindow = ({ popUpModalOpened, setPopUpModalOpened, data }) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const { user: profileData } = useSelector((state) => state.auth);
  // console.log(profileData.role);

  const [updateModalOpened, setUpdateModalOpened] = useState(false);
  const [assignModalOpened, setAssignModalOpened] = useState(false);
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [postModalOpened, setPostModalOpened] = useState(false);

  const [state, setState] = useState({
    checked: false,
    billChecked: true,
    updateModalOpened: false,
    assignModalOpened: false,
    confirmationPopUp: false,
    isAssignData: null,
    removeId: null,
  });

  const handleRemove = (apartment) => {
    if (apartment.isAvailable === true) {
      setState({
        ...state,
        removeId: apartment._id,
        isAssignData: null,
      });
      setConfirmationPopUp(true);
    } else {
      setState({
        ...state,
        removeId: null,
        isAssignData: {
          apartmentId: apartment._id,
          _id: apartment.renterId,
        },
      });
      setConfirmationPopUp(true);
    }
  };

  return (
    <>
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        size={isMobile ? "sm" : "md"}
        opened={popUpModalOpened}
        onClose={() => setPopUpModalOpened(false)}
        classNames={{
          modal: `modal__Body`,
          title: `modal__title`,
          close: `modal__close`,
        }}
      >
        {data ? (
          <>
            <div>
              <div className={`card ${Styles.Modal_header}`}>
                <h3 className={`py-3 dark:text-gray-300`}>Actions</h3>
              </div>
              <div className={Styles.popUpWindow__body}>
                <div className={Styles.popUpWindow_container}>
                  <div className={Styles.popUpWindow__innerCard}>
                    <div className={Styles.popUpWindow__card__content}>
                      <span className={Styles.popUpWindow__card__icon}>
                        <UilBuilding />{" "}
                      </span>
                      <div className={Styles.popUpWindow__card__elements}>
                        <span>House Name</span>
                        <span>{data.houseName}</span>
                      </div>
                    </div>
                  </div>
                  <div className={Styles.popUpWindow__innerCard}>
                    <div className={Styles.popUpWindow__card__content}>
                      <span className={Styles.popUpWindow__card__icon}>
                        <UilBookReader />{" "}
                      </span>
                      <div className={Styles.popUpWindow__card__elements}>
                        <span>Owner Name</span> <hr />
                        <span>{data.ownerName}</span>
                      </div>
                    </div>
                  </div>
                  <div className={Styles.popUpWindow__innerCard}>
                    <div className={Styles.popUpWindow__card__content}>
                      <span className={Styles.popUpWindow__card__icon}>
                        <UilUser />{" "}
                      </span>
                      <div className={Styles.popUpWindow__card__elements}>
                        <span>Renter Name</span>
                        <span>{data.renterName}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`card ${Styles.expend_apartment_info}`}>
                  <span>Apartment Informations</span>
                  <Switch
                    onLabel="ON"
                    offLabel="OFF"
                    checked={state.checked}
                    onChange={(event) =>
                      // setChecked(event.currentTarget.checked)
                      setState({
                        ...state,
                        checked: event.currentTarget.checked,
                      })
                    }
                  />
                </div>
                {state.checked && (
                  <>
                    <div className={Styles.popUpWindow_container}>
                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilLayerGroup />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Floor</span> <hr />
                            <span>{data.apartmentDetails.floor}</span>
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
                            <span>{data.apartmentDetails.apartmentName}</span>
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
                              {data.apartmentDetails.apartment_number}
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
                            <span>{data.apartmentDetails.apartmentType}</span>
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
                              {data.apartmentDetails.number_of_bed_room}
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
                            <span>{data.apartmentDetails.number_of_baths}</span>
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
                              {data.apartmentDetails.number_of_kitchen}
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
                              {data.apartmentDetails.number_of_balcony}
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
                              {data.apartmentDetails.apartment_length}
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
                    checked={state.billChecked}
                    onChange={(event) =>
                      // setBillChecked(event.currentTarget.checked)
                      setState({
                        ...state,
                        billChecked: event.currentTarget.checked,
                      })
                    }
                  />
                </div>
                {state.billChecked && (
                  <>
                    <div className={Styles.popUpWindow_container}>
                      <div className={Styles.popUpWindow__innerCard}>
                        <div className={Styles.popUpWindow__card__content}>
                          <span className={Styles.popUpWindow__card__icon}>
                            <UilBill />{" "}
                          </span>
                          <div className={Styles.popUpWindow__card__elements}>
                            <span>Rent</span> <hr />
                            <span>{data.billDetails.rent}</span>
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
                            <span>{data.billDetails.gas_bill}</span>
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
                            <span>{data.billDetails.water_bill}</span>
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
                            <span>{data.billDetails.service_charge}</span>
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
                            <span>{data.billDetails.others}</span>
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
                            <span>{data.billDetails.totalRent}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {profileData.role === "owner" && (
              <div className={`card ${Styles.Modal_button_container}`}>
                <button
                  className="removeButton border-2 px-1 py-1"
                  onClick={() => handleRemove(data)}
                >
                  remove
                </button>
                {data.renterId === "" && data.renterName === "" && (
                  <>
                    <button
                      className="submit_button px-1 py-1"
                      onClick={() => setPostModalOpened(true)}
                    >
                      Post
                    </button>
                    <button
                      className="submit_button px-1 py-1"
                      onClick={() => setAssignModalOpened(true)}
                    >
                      Assign
                    </button>
                  </>
                )}

                <button
                  className="updateButton border-2 px-1 py-1"
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

      <UpdateApartment
        updateModalOpened={updateModalOpened}
        setUpdateModalOpened={setUpdateModalOpened}
        data={data}
      />

      {data && (
        <AssignRenter
          assignModalOpened={assignModalOpened}
          setAssignModalOpened={setAssignModalOpened}
          // renterData={data}
          renterPopUp={false}
          apartmentData={data}
          apartmentPopUp={true}
        />
      )}

      {data && (
        <PostShare
          postModalOpened={postModalOpened}
          setPostModalOpened={setPostModalOpened}
          data={data}
        />
      )}

      <ConfirmationModal
        confirmationPopUp={confirmationPopUp}
        setConfirmationPopUp={setConfirmationPopUp}
        data={state.removeId}
        popUp_type="Remove_Apartment"
        isAssignData={state.isAssignData}
      />
    </>
  );
};

export default PopUpWindow;
