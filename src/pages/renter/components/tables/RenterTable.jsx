import React, { useState } from "react";
import { Box, Badge } from "@mantine/core";
import { DataTable } from "mantine-datatable";

import Style from "../../../../Styles/TableStyle.module.css";
import AssignRenter from "../../../../Components/modals/renterModal/AssignRenter";
import UnAssignRenter from "../../../../Components/modals/renterModal/UnAssignRenter";
import { useSelector } from "react-redux";
import PopUpWindow from "../../modals/PopUpWindow";

const RenterTable = ({ data }) => {
  const [clickCount, setClickCount] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const { user: profileData } = useSelector((state) => state.auth);

  const handleRowDoubleClick = (rowData) => {
    setClickCount(clickCount + 1);
    setSelectedRow(rowData);
    setTimeout(() => {
      if (clickCount === 1) {
        console.log(
          "Double click event fired on row: "
          // selectedRow
        );
        handlePopUpOn(selectedRow);
        setClickCount(0);
        setSelectedRow(null);
      } else {
        setClickCount(0);
        setSelectedRow(null);
      }
    }, 300);
  };

  const columns = [
    // {
    //   accessor: "Name",
    //   textAlignment: "center",
    //   width: 150,
    //   render: ({ fullname }) => `${fullname} `,
    // },
    { title: "Name", accessor: "fullname", width: "auto" },
    { Header: "Phone No", accessor: "phone" },

    {
      Header: "Apartment number",
      accessor: "apartment_number",
      width: 100,
    },

    {
      Header: "Room number",
      accessor: "roomNumber",
    },

    {
      Header: "Advance Rent",
      accessor: "advanceRent",
      customCellAttributes: () => ({
        className: "bg-gray-300 font-bold dark:bg-gray-600",
      }),
    },
    {
      Header: "Username",
      accessor: "username",
      textAlignment: "center",
      width: "auto",
    },
    {
      Header: "Address",
      accessor: "permanent_address",
      textAlignment: "center",
      width: 200,
    },
    {
      Header: "Street Number",
      accessor: "street_no",
    },
    {
      Header: "Postcode",
      accessor: "postcode",
    },
    {
      title: "National ID / Passport",
      accessor: "NID_no",
    },

    {
      Header: "Assigned Date",
      accessor: "assignedDate",

      customCellAttributes: (row) => ({
        style: {
          textAlign: "center",
        },
      }),
    },
  ];

  const [assignModalOpened, setAssignModalOpened] = useState(false);
  const [unAssignModalOpened, setUnAssignModalOpened] = useState(false);

  const [popUpModalOpened, setPopUpModalOpened] = useState(false);
  const [popUpData, setPopUpData] = useState({});

  const handlePopUpOn = (rowData) => {
    setPopUpModalOpened(true);
    setPopUpData(rowData);
  };

  return (
    <>
      <>
        <div className={`card ${Style.table_container}`}>
          {profileData.role === "owner" && (
            <div className={Style.table__header}>
              <button
                className={`submit_button ${Style.table__btn}`}
                onClick={() => setAssignModalOpened(true)}
              >
                Assign
              </button>
              <AssignRenter
                assignModalOpened={assignModalOpened}
                setAssignModalOpened={setAssignModalOpened}
                renterData={data}
                searchPopUp={false}
                apartmentPopUp={false}
              />
              <button
                className={`removeButton border-[3px]  ${Style.table__btn}`}
                onClick={() => setUnAssignModalOpened(true)}
              >
                Unassign
              </button>
              <UnAssignRenter
                unAssignModalOpened={unAssignModalOpened}
                setUnAssignModalOpened={setUnAssignModalOpened}
                renterData={data}
              />
            </div>
          )}

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
              records={data}
              columns={columns}
              textSelectionDisabled
              onRowClick={handleRowDoubleClick}
              classNames={{
                root: "bg-transparent",
                pagination: "bg-transparent text-gray-300",
              }}
              rowStyle={{ background: "transparent" }}
              defaultColumnRender={(row, _, accessor) => {
                const data = row[accessor];

                if (accessor === "assignedDate") {
                  const date = new Date(data);
                  const options = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  };
                  return date.toLocaleDateString("en-US", options);
                }
                if (accessor === "fullname") {
                  const assignDate = new Date(row.assignedDate);
                  const currentDate = new Date();
                  if (assignDate.getMonth() === currentDate.getMonth()) {
                    return (
                      <>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontWeight: "600",
                          }}
                        >
                          <span>{data}</span>
                          <Badge
                            variant="gradient"
                            gradient={{ from: "teal", to: "blue", deg: 60 }}
                          >
                            New
                          </Badge>
                        </div>
                      </>
                    );
                  }
                }
                return data;
              }}
            />
          </Box>
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

export default RenterTable;
