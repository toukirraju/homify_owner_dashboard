import React, { useEffect, useState } from "react";
import { Box } from "@mantine/core";
import { DataTable } from "mantine-datatable";

import Style from "../../../../Styles/TableStyle.module.css";
import { useSelector } from "react-redux";
import PopUpWindow from "../../modals/PopUpWindow";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import { useCreateApartmentMutation } from "../../../../redux/features/apartment/RTK Query/apartmentApi";
const ApartmentTable = ({ data }) => {
  const [clickCount, setClickCount] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);

  const { user: profileData } = useSelector((state) => state.auth);

  const [createApartment, { isSuccess, isLoading }] =
    useCreateApartmentMutation();

  // table row duoble click function
  const handleRowDoubleClick = (rowData) => {
    setClickCount(clickCount + 1);
    setSelectedRow(rowData);
    setTimeout(() => {
      if (clickCount === 1) {
        // console.log("Double click event fired on row: ", selectedRow);
        handlePopUpOn(selectedRow);
        setClickCount(0);
        setSelectedRow(null);
      } else {
        setClickCount(0);
        setSelectedRow(null);
      }
    }, 300);
  };

  const tableColumns = [
    {
      Header: "Renter Name",
      textAlignment: "center",
      accessor: "renterName",
      width: 150,
      customCellAttributes: (row) => ({
        style: {
          width: "auto",
          textAlign: "center",
          position: "absolute",
          height: "35px",
          fontWeight: "600",
          backgroundColor: "#70a493",
          zIndex: 7,
          boxShadow: "1px 0px 3px rgba(0,0,0,0.2)",
        },
      }),
    },
    // apartment details
    {
      accessor: "Apartment Name",
      textAlignment: "center",
      width: 150,
      render: ({ apartmentDetails }) => `${apartmentDetails.apartmentName}`,
    },

    {
      //Header: "Apartment No",
      accessor: "Apartment No",
      render: ({ apartmentDetails }) => `${apartmentDetails.apartment_number}`,
      resizable: true,
    },
    {
      //Header: "Room No",
      accessor: "Room No",
      render: ({ apartmentDetails }) => `${apartmentDetails.roomNumber}`,
      resizable: true,
    },
    {
      //Header: "Apartment Type",
      accessor: "Apartment Type",
      render: ({ apartmentDetails }) => `${apartmentDetails.apartmentType}`,
      resizable: true,
    },
    {
      //Header: "Beds",
      accessor: "Beds",
      render: ({ apartmentDetails }) =>
        `${apartmentDetails.number_of_bed_room}`,
      resizable: true,
    },
    {
      //Header: "Kitchen",
      accessor: "Kitchen",
      render: ({ apartmentDetails }) => `${apartmentDetails.number_of_kitchen}`,
      resizable: true,
    },
    {
      //Header: "Balcony",
      accessor: "Balcony",
      render: ({ apartmentDetails }) => `${apartmentDetails.number_of_balcony}`,
      resizable: true,
    },
    {
      //Header: "Baths",
      accessor: "Baths",
      render: ({ apartmentDetails }) => `${apartmentDetails.number_of_baths}`,
      resizable: true,
    },
    // bill details
    {
      //Header: "Rent",
      accessor: "Rent",
      render: ({ billDetails }) => `${billDetails.rent}`,
      resizable: true,
      // width: 100,
    },
    {
      //Header: "Gas bill",
      accessor: "Gas bill",
      render: ({ billDetails }) => `${billDetails.gas_bill}`,
      resizable: true,
      // width: 100,
    },
    {
      //Header: "Water bill",
      accessor: "Water bill",
      render: ({ billDetails }) => `${billDetails.water_bill}`,
      resizable: true,
      // width: 150,
    },

    {
      //Header: "Service charge",
      accessor: "Service charge",
      render: ({ billDetails }) => `${billDetails.service_charge}`,
      resizable: true,
      // width: 100,
    },
    {
      //Header: "Others",
      accessor: "Others",
      render: ({ billDetails }) => `${billDetails.others}`,
      resizable: true,
      // width: 100,
    },
    {
      //Header: "Total Rent",
      accessor: "Total Rent",
      render: ({ billDetails }) => `${billDetails.totalRent}`,
      resizable: true,
      // width: 100,
    },
  ];

  const [popUpModalOpened, setPopUpModalOpened] = useState(false);
  const [popUpData, setPopUpData] = useState({});

  const handlePopUpOn = (rowData) => {
    setPopUpModalOpened(true);
    setPopUpData(rowData);
  };

  const [selectedData, setSelectedData] = useState({
    floor: 1,
  });

  const handleChange = (e) => {
    setSelectedData({ ...selectedData, [e.target.name]: e.target.value });
  };

  //add single apartment
  const addApartment = (floor) => {
    const formData = {
      numOfFloors: floor,
    };
    createApartment(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully add new apartment");
    }
  }, [isSuccess]);

  //filterd Data by floors
  const filteredData = data.filter(
    (row) => row?.apartmentDetails?.floor === parseInt(selectedData.floor)
  );
  //family apartment count
  let familyApartment = 0;
  filteredData.forEach((obj) => {
    if (
      obj.apartmentDetails &&
      obj.apartmentDetails.apartmentType === "family"
    ) {
      familyApartment++;
    }
  });
  //bachelor apartment count
  let bachelorApartment = 0;
  filteredData.forEach((obj) => {
    if (
      obj.apartmentDetails &&
      obj.apartmentDetails.apartmentType === "bachelor"
    ) {
      bachelorApartment++;
    }
  });

  return (
    <>
      <>
        <div className={`card ${Style.table_container}`}>
          {/**********  Contain header section ***********/}
          <div className={Style.table__header}>
            <h4 className="subtitle">Apartments : {filteredData.length}</h4>
            <h3 className="title">Family : {familyApartment}</h3>
            <h4 className="subtitle">Bachelor : {bachelorApartment}</h4>
          </div>
          {/**********  header buttons start ***********/}
          <div className={Style.table__header}>
            {profileData.role === "owner" && (
              <button
                className={`submit_button px-3 py-1`}
                disabled={isLoading}
                onClick={() => addApartment(parseInt(selectedData.floor))}
              >
                {isLoading ? <LoadingSpinner /> : "ADD"}
              </button>
            )}

            <form>
              <div className={Style.input__container}>
                <select
                  className="bg-slate-200 dark:bg-slate-500 dark:text-gray-300"
                  onChange={handleChange}
                  value={selectedData.floor}
                  name="floor"
                >
                  <option value="">Select Apartment</option>
                  {data
                    ? [
                        ...new Set(
                          data?.map(
                            (apartment) => apartment?.apartmentDetails?.floor
                          )
                        ),
                      ].map((apartment, idx) => (
                        <option key={idx} value={apartment}>
                          Floor: {apartment}
                        </option>
                      ))
                    : null}
                </select>
              </div>
            </form>
          </div>
          {/**********  header buttons end ***********/}

          {/**********  table start ***********/}
          <Box
            sx={(theme) => ({
              height: 440,
              width: "calc(100vw - 270px)",
              // Media query with value from theme
              [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                height: "100vh - 200px",
                width: "calc(100vw - 20px)",
              },
            })}
          >
            <DataTable
              withColumnBorders
              striped
              highlightOnHover
              records={filteredData}
              columns={tableColumns}
              textSelectionDisabled
              classNames={{
                root: "bg-transparent",
              }}
              rowStyle={{ background: "transparent" }}
              onRowClick={handleRowDoubleClick}
            />
          </Box>
          {/**********  table end ***********/}
        </div>
        {Object.keys(popUpData) != 0 && (
          <PopUpWindow
            popUpModalOpened={popUpModalOpened}
            setPopUpModalOpened={setPopUpModalOpened}
            data={popUpData}
          />
        )}
      </>
    </>
  );
};

export default ApartmentTable;
