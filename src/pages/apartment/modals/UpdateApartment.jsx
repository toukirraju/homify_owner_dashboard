import Styles from "../../../Styles/ModalStyle.module.css";
import { Modal, Switch } from "@mantine/core";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { UilBuilding, UilReceipt } from "@iconscout/react-unicons";

import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import { useUpdateApartmentMutation } from "../../../redux/features/apartment/RTK Query/apartmentApi";

const UpdateApartment = ({ updateModalOpened, setUpdateModalOpened, data }) => {
  const [checked, setChecked] = useState(false);
  const [billChecked, setBillChecked] = useState(true);
  const [formData, setFormData] = useState(data);
  const initialValues = {
    ...data,
  };

  const [updateApartment, { isSuccess, isLoading }] =
    useUpdateApartmentMutation();

  useEffect(() => {
    setFormData(data);
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully Updated");
      setUpdateModalOpened(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        size="sm"
        // fullScreen={isMobile}
        opened={updateModalOpened}
        onClose={() => setUpdateModalOpened(false)}
      >
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              updateApartment(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                {/* Apartment secton  */}
                <div className={Styles.widget__innerCard}>
                  <div className={Styles.widget__card__content}>
                    <span></span>
                    <span>{<UilBuilding />}</span>

                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        // gap: "5px",
                        paddingRight: "8px",
                      }}
                    >
                      Apartment Details{" "}
                      <Switch
                        onLabel="ON"
                        offLabel="OFF"
                        checked={checked}
                        onChange={(event) =>
                          setChecked(event.currentTarget.checked)
                        }
                      />
                    </span>
                  </div>
                </div>
                {checked && (
                  <>
                    <div className={Styles.address_container}>
                      <div className={Styles.input__container}>
                        <label
                          htmlFor="apartmentName"
                          className={Styles.input__label}
                        >
                          Apartment name
                        </label>
                        <Field
                          className=" dark:bg-slate-800 dark:text-gray-200"
                          name="apartmentDetails.apartmentName"
                        />
                        {errors.apartmentName && touched.apartmentName ? (
                          <div className={Styles.input__error}>
                            {errors.apartmentName}
                          </div>
                        ) : null}
                      </div>
                      <div className={Styles.input__container}>
                        <label
                          htmlFor="apartment_number"
                          className={Styles.input__label}
                        >
                          Apartment number
                        </label>
                        <Field
                          className=" dark:bg-slate-800 dark:text-gray-200"
                          name="apartmentDetails.apartment_number"
                        />
                        {errors.apartment_number && touched.apartment_number ? (
                          <div className={Styles.input__error}>
                            {errors.apartment_number}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className={Styles.address_container}>
                      <div className={Styles.input__container}>
                        <label
                          htmlFor="apartmentType"
                          className={Styles.input__label}
                        >
                          Apartment Type
                        </label>
                        <Field
                          className=" dark:bg-slate-800 dark:text-gray-200"
                          name="apartmentDetails.apartmentType"
                          component="select"
                        >
                          <option value="">Type</option>
                          <option value="family">Family</option>
                          <option value="bachelor">Bachelor</option>
                        </Field>
                        {errors.apartmentType && touched.apartmentType ? (
                          <div className={Styles.input__error}>
                            {errors.apartmentType}
                          </div>
                        ) : null}
                      </div>
                      <div className={Styles.input__container}>
                        <label
                          htmlFor="roomNumber"
                          className={Styles.input__label}
                        >
                          Room no
                        </label>
                        <Field
                          className=" dark:bg-slate-800 dark:text-gray-200"
                          name="apartmentDetails.roomNumber"
                        />
                        {errors.roomNumber && touched.roomNumber ? (
                          <div className={Styles.input__error}>
                            {errors.roomNumber}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className={Styles.address_container}>
                      <div className={Styles.input__container}>
                        <label
                          htmlFor="number_of_bed_room"
                          className={Styles.input__label}
                        >
                          Beds
                        </label>
                        <Field
                          className=" dark:bg-slate-800 dark:text-gray-200"
                          name="apartmentDetails.number_of_bed_room"
                          type="number"
                        />
                        {errors.number_of_bed_room &&
                        touched.number_of_bed_room ? (
                          <div className={Styles.input__error}>
                            {errors.number_of_bed_room}
                          </div>
                        ) : null}
                      </div>
                      <div className={Styles.input__container}>
                        <label
                          htmlFor="number_of_balcony"
                          className={Styles.input__label}
                        >
                          Balcony
                        </label>
                        <Field
                          className=" dark:bg-slate-800 dark:text-gray-200"
                          name="apartmentDetails.number_of_balcony"
                          type="number"
                        />
                        {errors.number_of_balcony &&
                        touched.number_of_balcony ? (
                          <div className={Styles.input__error}>
                            {errors.number_of_balcony}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className={Styles.address_container}>
                      <div className={Styles.input__container}>
                        <label
                          htmlFor="number_of_kitchen"
                          className={Styles.input__label}
                        >
                          Kitchen
                        </label>
                        <Field
                          className=" dark:bg-slate-800 dark:text-gray-200"
                          name="apartmentDetails.number_of_kitchen"
                          type="number"
                        />
                        {errors.number_of_kitchen &&
                        touched.number_of_kitchen ? (
                          <div className={Styles.input__error}>
                            {errors.number_of_kitchen}
                          </div>
                        ) : null}
                      </div>
                      <div className={Styles.input__container}>
                        <label
                          htmlFor="number_of_baths"
                          className={Styles.input__label}
                        >
                          Bath
                        </label>
                        <Field
                          className=" dark:bg-slate-800 dark:text-gray-200"
                          name="apartmentDetails.number_of_baths"
                          type="number"
                        />
                        {errors.number_of_baths && touched.number_of_baths ? (
                          <div className={Styles.input__error}>
                            {errors.number_of_baths}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className={Styles.input__container}>
                      <label
                        htmlFor="apartment_length"
                        className={Styles.input__label}
                      >
                        Apartment length
                      </label>
                      <Field
                        className=" dark:bg-slate-800 dark:text-gray-200"
                        name="apartmentDetails.apartment_length"
                        type="number"
                      />
                      {errors.apartment_length && touched.apartment_length ? (
                        <div className={Styles.input__error}>
                          {errors.apartment_length}
                        </div>
                      ) : null}
                    </div>
                  </>
                )}

                {/* bill secton  */}
                <div className={Styles.widget__innerCard}>
                  <div className={Styles.widget__card__content}>
                    <span></span>
                    <span>{<UilReceipt />}</span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        // gap: "5px",
                        paddingRight: "8px",
                      }}
                    >
                      bill Details{" "}
                      <Switch
                        onLabel="ON"
                        offLabel="OFF"
                        checked={billChecked}
                        onChange={(event) =>
                          setBillChecked(event.currentTarget.checked)
                        }
                      />
                    </span>
                  </div>
                </div>
                {billChecked && (
                  <>
                    <div className={Styles.address_container}>
                      <div className={Styles.input__container}>
                        <label htmlFor="rent" className={Styles.input__label}>
                          Rent
                        </label>
                        <Field
                          className=" dark:bg-slate-800 dark:text-gray-200"
                          name="billDetails.rent"
                          type="number"
                        />
                        {errors.rent && touched.rent ? (
                          <div className={Styles.input__error}>
                            {errors.rent}
                          </div>
                        ) : null}
                      </div>
                      <div className={Styles.input__container}>
                        <label
                          htmlFor="gas_bill"
                          className={Styles.input__label}
                        >
                          Gas bill
                        </label>
                        <Field
                          className=" dark:bg-slate-800 dark:text-gray-200"
                          name="billDetails.gas_bill"
                          type="number"
                        />
                        {errors.gas_bill && touched.gas_bill ? (
                          <div className={Styles.input__error}>
                            {errors.gas_bill}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className={Styles.address_container}>
                      <div className={Styles.input__container}>
                        <label
                          htmlFor="water_bill"
                          className={Styles.input__label}
                        >
                          Water bill
                        </label>
                        <Field
                          className=" dark:bg-slate-800 dark:text-gray-200"
                          name="billDetails.water_bill"
                          type="number"
                        />
                        {errors.water_bill && touched.water_bill ? (
                          <div className={Styles.input__error}>
                            {errors.water_bill}
                          </div>
                        ) : null}
                      </div>
                      <div className={Styles.input__container}>
                        <label
                          htmlFor="service_charge"
                          className={Styles.input__label}
                        >
                          Service charge
                        </label>
                        <Field
                          className=" dark:bg-slate-800 dark:text-gray-200"
                          name="billDetails.service_charge"
                          type="number"
                        />
                        {errors.service_charge && touched.service_charge ? (
                          <div className={Styles.input__error}>
                            {errors.service_charge}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className={Styles.input__container}>
                      <label htmlFor="others" className={Styles.input__label}>
                        Others
                      </label>
                      <Field
                        className=" dark:bg-slate-800 dark:text-gray-200"
                        name="billDetails.others"
                        type="number"
                      />
                      {errors.others && touched.others ? (
                        <div className={Styles.input__error}>
                          {errors.others}
                        </div>
                      ) : null}
                    </div>
                  </>
                )}

                <button
                  className="submit_button mx-auto px-3 py-1"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <LoadingSpinner /> : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default UpdateApartment;
