import React, { useState, useEffect } from "react";
import Styles from "../../../Styles/ModalStyle.module.css";
import "../../postComponents/postShare/PostShare.css";
import { Switch, Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  UilScenery,
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
// import { uploadImage, uploadPost } from "../../actions/UploadAction";
import LoadingSpinner from "../../LoadingSpinner";
import { toast } from "react-toastify";
import { useMakePostMutation } from "../../../redux/features/post/RTK Query/postApi";

const EditPost = ({ postEditModalOpened, setPostEditModalOpened, data }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [makePost] = useMakePostMutation();

  const [loading, setLoading] = useState(false);

  const [postData, setPostData] = useState({});

  const [description, setDescription] = useState("");

  const [state, setState] = useState({
    checked: true,
    billChecked: true,
    updateModalOpened: false,
    assignModalOpened: false,
    confirmationPopUp: false,
    isAssignData: null,
    removeId: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    makePost(postData)
      .unwrap()
      .then(() => {
        setPostEditModalOpened(false);
        setLoading(false);
        toast.success("success!");
      })
      .catch(() => {
        setLoading(false);
      });
    reset();
  };
  useEffect(() => {
    setPostData({
      ...data,
      description,
      isVisible: true,
      isNegotiable: state.billChecked === false ? true : false,
    });
  }, [description, state.billChecked, data]);

  const reset = () => {
    setDescription("");
    setPostData({});
  };

  return (
    <Modal
      classNames={{
        modal: `bg-gray-300 dark:bg-gray-800`,
        title: `modal__title`,
        close: `modal__close`,
      }}
      overlayOpacity={0.55}
      overlayBlur={3}
      size={isMobile ? "sm" : "lg"}
      opened={postEditModalOpened}
      title="Edit your post"
      onClose={() => setPostEditModalOpened(false)}
    >
      <div className="card">
        <div>
          <textarea
            className="w-full rounded-t-lg bg-gray-300 p-2 outline-none focus:border-b-2 focus:border-b-gray-400 dark:bg-slate-700 dark:text-gray-400 focus:dark:border-b-2"
            type="text"
            placeholder="Short description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="postOptions">
            <div
              className="option"
              style={{ color: "var(--photo)" }}
              // onClick={() => imageRef.current.click()}
            >
              <UilScenery />
              Photo
            </div>

            <button
              className="submit_button ps-button mb-1"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : "Share"}
            </button>
            <div style={{ display: "none" }}>
              <input
                type="file"
                name="myImage"
                // ref={imageRef}
                // onChange={onImageChange}
              />
            </div>
          </div>

          {/* {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )} */}
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
                  <span>{data.apartment.apartmentDetails.floor}</span>
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
                  <span>{data.apartment.apartmentDetails.apartmentName}</span>
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
                    {data.apartment.apartmentDetails.apartment_number}
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
                  <span>{data.apartment.apartmentDetails.apartmentType}</span>
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
                    {data.apartment.apartmentDetails.number_of_bed_room}
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
                  <span>{data.apartment.apartmentDetails.number_of_baths}</span>
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
                    {data.apartment.apartmentDetails.number_of_kitchen}
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
                    {data.apartment.apartmentDetails.number_of_balcony}
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
                    {data.apartment.apartmentDetails.apartment_length}
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
      {!state.billChecked ? (
        <h3 className={`card ${Styles.expend_apartment_info}`}>
          Bills maybe negotiable
        </h3>
      ) : (
        <>
          <div className={Styles.popUpWindow_container}>
            <div className={Styles.popUpWindow__innerCard}>
              <div className={Styles.popUpWindow__card__content}>
                <span className={Styles.popUpWindow__card__icon}>
                  <UilBill />{" "}
                </span>
                <div className={Styles.popUpWindow__card__elements}>
                  <span>Rent</span> <hr />
                  <span>{data.apartment.billDetails.rent}</span>
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
                  <span>{data.apartment.billDetails.gas_bill}</span>
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
                  <span>{data.apartment.billDetails.water_bill}</span>
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
                  <span>{data.apartment.billDetails.service_charge}</span>
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
                  <span>{data.apartment.billDetails.others}</span>
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
                  <span>{data.apartment.billDetails.totalRent}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

export default EditPost;
