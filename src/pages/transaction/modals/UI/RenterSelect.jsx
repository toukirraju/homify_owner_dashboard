import React from "react";

const RenterSelect = ({ data, selectedData, handleChange }) => {
  const filterData = (item) => {
    return (
      item.apartment !== null &&
      item.apartment.apartmentDetails.apartment_number !== "" &&
      item.apartment.apartmentDetails.roomNumber !== ""
    );
  };

  const renderOptions = () => {
    if (data) {
      const filteredData = data.filter(filterData);

      return filteredData.map((newitem, index) => {
        const { apartment_number, floor } = newitem.apartment.apartmentDetails;

        return (
          <option key={index} value={JSON.stringify(newitem)}>
            &#10687; {newitem.fullname} &#10148; Floor: {floor}
            &nbsp; &#10148; Apartment: {apartment_number}
          </option>
        );
      });
    }
    return null;
  };

  return (
    <select
      name="renter"
      className="col-span-3 my-2 dark:bg-slate-800 dark:text-gray-400"
      onChange={handleChange}
      value={selectedData.renter}
    >
      <option value="" hidden>
        Select Renter
      </option>
      {renderOptions()}
    </select>
  );
};

export default RenterSelect;
