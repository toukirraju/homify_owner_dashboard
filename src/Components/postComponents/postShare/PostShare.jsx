import React, { useState, useEffect } from "react";
import Styles from "../../../Styles/ModalStyle.module.css";
import "./PostShare.css";
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
  UilTimes,
} from "@iconscout/react-unicons";

import LoadingSpinner from "../../LoadingSpinner";
import { toast } from "react-toastify";
import { useMakePostMutation } from "../../../redux/features/post/RTK Query/postApi";
import { imageResizer } from "../../../utility/fileResizer";

const PostShare = ({ postModalOpened, setPostModalOpened, data }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [images, setImages] = useState([]);

  const [makePost, { isLoading, isSuccess }] = useMakePostMutation();

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
    if (postData.images.length === 0) {
      alert("Minimum 1 image will be required!");
    } else {
      makePost(postData);
      reset();
    }
  };
  useEffect(() => {
    setPostData({
      ...data,
      description,
      isVisible: true,
      isNegotiable: state.billChecked === false ? true : false,
      images,
    });
  }, [description, images, state.billChecked, data]);

  const reset = () => {
    setDescription("");
    setPostData({});
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Post done!");
      setPostModalOpened(false);
    }
  }, [isSuccess]);

  //Image section start

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    const fileType = file.type;
    // const fileSize = file.size;

    // Check if file type is an image
    if (!fileType.startsWith("image/")) {
      alert("Please upload an image file");
      // setProfileImage(null);
      return;
    }

    const { resizedImage, fileSize } = await imageResizer(
      file,
      1200, //maxWidth
      630, //maxHeight
      90 //quality
    );

    // Check if file size is less than or equal to 1MB
    if (fileSize > 1 * 1024 * 1024) {
      alert("Please upload an image file with size less than or equal to 1MB");
      setImages((prev) => [...prev]);
      return;
    } else {
      setImages((prev) => [...prev, resizedImage]);
    }
  };

  const handleRemoveImage = (image) => {
    const newImages = images.filter((img) => img !== image);
    setImages(newImages);
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
      size={isMobile ? "lg" : "lg"}
      opened={postModalOpened}
      onClose={() => setPostModalOpened(false)}
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
            <label
              htmlFor="fileInput"
              className="relative flex w-1/3 cursor-pointer items-center justify-center"
            >
              <div className="option" style={{ color: "var(--photo)" }}>
                <UilScenery />
                Photo
              </div>

              <input
                id="fileInput"
                className=" hidden dark:bg-slate-900 dark:text-gray-200"
                name="profilePicture"
                type="file"
                onChange={handleFileSelect}
              />
            </label>

            <button
              className="submit_button ps-button mb-1"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : "Share"}
            </button>
          </div>

          {images && (
            <div className="mx-auto grid grid-cols-2">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img className=" aspect-auto " src={image} alt="" />
                  <UilTimes
                    className="absolute right-0 top-0 cursor-pointer text-red-400 hover:text-red-500"
                    onClick={() => handleRemoveImage(image)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={`card ${Styles.expend_apartment_info}`}>
        <span>Apartment Informations</span>
        <Switch
          onLabel="ON"
          offLabel="OFF"
          checked={state.checked}
          onChange={(event) =>
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
                  <span>{data.apartmentDetails.apartment_number}</span>
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
                  <span>{data.apartmentDetails.number_of_bed_room}</span>
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
                  <span>{data.apartmentDetails.number_of_kitchen}</span>
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
                  <span>{data.apartmentDetails.number_of_balcony}</span>
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

                  <span>{data.apartmentDetails.apartment_length}</span>
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
    </Modal>
  );
};

export default PostShare;
