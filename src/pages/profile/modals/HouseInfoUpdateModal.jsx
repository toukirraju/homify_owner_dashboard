import Styles from "./ModalStyle.module.css";
import { Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import MapWindow from "../../../Components/CustomMap/MapWindow";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { useUpdateHouseMutation } from "../../../redux/features/profile/RTK Query/profileApi";

function HouseInfoUpdateModal({ modalOpened, setModalOpened, data }) {
  const isMobile = useMediaQuery("(max-width: 600px)");
  // const [isLoading, setisLoading] = useState(false);
  const [mapWindowOpen, setMapWindowOpen] = useState(false);

  const [address, setAddress] = useState({});

  const [updateHouse, { isLoading, isSuccess }] = useUpdateHouseMutation();
  // console.log(data);
  const [initialValues, setInitialValues] = useState({
    // ...data,
    houseName: data?.houseName,
    houseNo: data?.houseNo,
    number_of_floors: data?.number_of_floors,
    number_of_apartments: data?.number_of_apartments,
    streetNo: data?.streetNo,

    address_display_name: data?.address?.address_display_name,
    state: data?.address?.state,
    state_district: data?.address?.state_district,
    postCode: data?.address?.postcode ? data?.address?.postcode : "",
    lat: data?.address?.lat,
    lon: data?.address?.lon,
    country: data?.address?.address?.country,
    country_code: data?.address?.address?.country_code,
    place_id: data?.address?.place_id,
  });

  // update state with old data
  useEffect(() => {
    setInitialValues({
      _id: data?._id,
      houseName: data?.houseName,
      houseNo: data?.houseNo,
      number_of_floors: data?.number_of_floors,
      number_of_apartments: data?.number_of_apartments,
      // ...data,
      streetNo: data?.streetNo,
      address_display_name: data?.address?.address_display_name,
      state: data?.address?.state,
      state_district: data?.address?.state_district,
      postCode: data?.address?.postcode ? address?.postcode : "",
      lat: data?.address?.lat,
      lon: data?.address?.lon,
      country: data?.address?.country,
      country_code: data?.address?.country_code,
      place_id: data?.address?.place_id,
    });
  }, [modalOpened]);

  // update state with address data
  useEffect(() => {
    setInitialValues({
      ...initialValues,
      address_display_name: address?.display_name,
      state: address?.address?.state,
      state_district: address?.address?.state_district,
      postCode: address?.address?.postcode ? address?.address?.postcode : "",
      lat: address?.lat,
      lon: address?.lon,
      country: address?.address?.country,
      country_code: address?.address?.country_code,
      place_id: address?.place_id,
    });
  }, [address, address?.display_name]);

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setInitialValues((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("House information updated");
      setModalOpened(false);
    }
  }, [isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateHouse(initialValues);
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
      size="lg"
      fullScreen={isMobile}
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <div>
        <form onSubmit={handleSubmit}>
          <div className={Styles.input__container}>
            <label className="my-1 px-2 text-sm text-gray-600 dark:text-gray-300 ">
              House name
            </label>
            <input
              className=" dark:bg-slate-900 dark:text-gray-200"
              required
              value={initialValues.houseName}
              onChange={handleChange}
              name="houseName"
            />
          </div>

          <div className={Styles.address_container}>
            <div className={Styles.input__container}>
              <label
                htmlFor="houseNo"
                className="my-1 px-2 text-sm text-gray-600 dark:text-gray-300 "
              >
                House number
              </label>
              <input
                className=" dark:bg-slate-900 dark:text-gray-200"
                required
                value={initialValues.houseNo}
                onChange={handleChange}
                name="houseNo"
              />
            </div>
            <div className={Styles.input__container}>
              <label
                htmlFor="streetNo"
                className="my-1 px-2 text-sm text-gray-600 dark:text-gray-300 "
              >
                Street number
              </label>
              <input
                className=" dark:bg-slate-900 dark:text-gray-200"
                value={initialValues.streetNo}
                onChange={handleChange}
                name="streetNo"
              />
            </div>
          </div>
          <div className={Styles.address_container}>
            <div className={Styles.input__container}>
              <label
                htmlFor="number_of_floors"
                className="my-1 px-2 text-sm text-gray-600 dark:text-gray-300 "
              >
                Number of floors
              </label>
              <input
                className=" dark:bg-slate-900 dark:text-gray-200"
                value={initialValues.number_of_floors}
                onChange={handleChange}
                name="number_of_floors"
                type="number"
              />
            </div>
            <div className={Styles.input__container}>
              <label
                htmlFor="number_of_apartments"
                className="my-1 px-2 text-sm text-gray-600 dark:text-gray-300 "
              >
                Number of apartments
              </label>
              <input
                className=" dark:bg-slate-900 dark:text-gray-200"
                value={initialValues.number_of_apartments}
                onChange={handleChange}
                name="number_of_apartments"
                type="text"
              />
            </div>
          </div>
          <div className={Styles.address_container}>
            <div className={Styles.input__container}>
              <div
                id="map"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                className="px-2 text-gray-600 dark:text-gray-400 "
                onClick={() => setMapWindowOpen(true)}
              >
                <UilLocationPoint /> Pick your location
              </div>
            </div>
          </div>

          <div className={Styles.input__container}>
            <label
              htmlFor="address_display_name"
              className="my-1 px-2 text-sm text-gray-600 dark:text-gray-300 "
            >
              Address
            </label>
            <input
              className=" dark:bg-slate-900 dark:text-gray-200"
              required
              value={initialValues.address_display_name}
              onChange={handleChange}
              name="address_display_name"
              type="text"
            />
          </div>

          <div className={Styles.address_container}>
            <div>
              <label
                htmlFor="state_district"
                className="my-1 px-2 text-sm text-gray-600 dark:text-gray-300 "
              >
                Area
              </label>
              <input
                className=" dark:bg-slate-900 dark:text-gray-200"
                required
                value={initialValues.state_district}
                onChange={handleChange}
                name="state_district"
                type="text"
              />
            </div>
            <div>
              <label
                htmlFor="state"
                className="my-1 px-2 text-sm text-gray-600 dark:text-gray-300 "
              >
                City/Town
              </label>
              <input
                className=" dark:bg-slate-900 dark:text-gray-200"
                required
                value={initialValues.state}
                onChange={handleChange}
                name="state"
                type="text"
              />
            </div>
            <div>
              <label
                htmlFor="postCode"
                className="my-1 px-2 text-sm text-gray-600 dark:text-gray-300 "
              >
                Zip / Postcode
              </label>
              <input
                className=" dark:bg-slate-900 dark:text-gray-200"
                value={initialValues.postCode}
                onChange={handleChange}
                name="postCode"
                type="text"
              />
            </div>
          </div>

          <div className={Styles.address_container}>
            <div className={Styles.input__container}>
              <label
                htmlFor="lat"
                className="my-1 px-2 text-sm text-gray-600 dark:text-gray-300 "
              >
                Latitude
              </label>
              <input
                className=" dark:bg-slate-900 dark:text-gray-200"
                required
                value={initialValues.lat}
                onChange={handleChange}
                name="lat"
                type="text"
              />
            </div>
            <div className={Styles.input__container}>
              <label
                htmlFor="lon"
                className="my-1 px-2 text-sm text-gray-600 dark:text-gray-300 "
              >
                Longitude
              </label>
              <input
                className=" dark:bg-slate-900 dark:text-gray-200"
                required
                value={initialValues.lon}
                onChange={handleChange}
                name="lon"
                type="text"
              />
            </div>
          </div>

          <button
            className="submit_button mx-auto mb-16 mt-4 px-3 py-1 md:my-4"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner /> : "Submit"}
          </button>
        </form>

        <MapWindow
          mapWindowOpen={mapWindowOpen}
          setMapWindowOpen={setMapWindowOpen}
          setAddress={setAddress}
        />
      </div>
    </Modal>
  );
}

export default HouseInfoUpdateModal;
