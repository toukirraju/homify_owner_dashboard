import Style from "../../../../Styles/TableStyle.module.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useRef } from "react";
import { useState } from "react";
import UpdateTempBill from "../../modals/UpdateTempBill";
import ConfirmationModal from "../../../../Components/modals/ConfirmationModal";
import { useSelector } from "react-redux";

const TempBillTable = ({ data }) => {
  const [tempData, setTempData] = useState({});
  const [removeId, setRemoveId] = useState();

  const { user: profileData } = useSelector((state) => state.auth);
  // console.log(profileData.role);

  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [updateTempBillModalOpened, setUpdateTempBillModalOpened] =
    useState(false);
  const gridRef = useRef();

  const sizeToFit = useCallback(() => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);
  const autoSizeAll = useCallback((skipHeader) => {
    const allColumnIds = [];
    gridRef.current.columnApi.getColumns().forEach((column) => {
      allColumnIds.push(column.getId());
    });
    gridRef.current.columnApi.autoSizeColumns(allColumnIds, skipHeader);
  }, []);
  const dateFormatter = (params) => {
    return new Date(params.value).toDateString();
  };

  const handleUpdate = (value) => {
    setTempData(value);
    setUpdateTempBillModalOpened(true);
  };

  const handleRemove = (bill) => {
    // if (new Date(bill.createdAt).getMonth() + 1 === new Date().getMonth() + 1) {
    setConfirmationPopUp(true);
    setRemoveId(bill._id);
    // } else {
    //   // toast.error("you can't remove this bill");
    //   console.log("you can't remove this bill");
    // }
  };
  const defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
  };
  const transColumns = [
    {
      headerName: "Renter Name",
      field: "renterName",
      resizable: true,
      width: 150,
    },
    {
      headerName: "Electricity Bill",
      field: "electricity_bill",
      resizable: true,
      width: 100,
    },
    { headerName: "Others Bill", field: "others", resizable: true, width: 100 },

    {
      headerName: "Due",
      field: "tempDue",
      resizable: true,
      width: 100,
      cellStyle: function (params) {
        if (params.data.tempDue) {
          return {
            color: "white",
            backgroundColor: "#5bc887",
            fontWeight: 900,
          };
        } else {
          return null;
        }
      },
    },
    {
      headerName: "Date",
      field: "createdAt",
      valueFormatter: dateFormatter,
      resizable: true,
      width: 150,
    },
    profileData.role === "owner" && {
      headerName: "Actions",
      field: "_id",
      resizable: true,
      width: 180,
      cellRenderer: (params) => (
        <div className="flex  gap-1">
          <button
            className="updateButton mt-1 border-[3px] px-2 py-1 text-sm"
            onClick={() => handleUpdate(params.data)}
          >
            update
          </button>

          <button
            className="removeButton mt-1 border-[3px] px-2 py-1 text-sm"
            onClick={() => handleRemove(params.data)}
          >
            Remove
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <ConfirmationModal
        confirmationPopUp={confirmationPopUp}
        setConfirmationPopUp={setConfirmationPopUp}
        data={removeId}
        popUp_type="Remove_Temporary_Bill"
      />
      <UpdateTempBill
        updateTempBillModalOpened={updateTempBillModalOpened}
        setUpdateTempBillModalOpened={setUpdateTempBillModalOpened}
        data={tempData}
      />
      <div className={`card ${Style.table_container}`}>
        <div className={Style.table__header}>
          <h3 className="title">Temporary Bills</h3>
        </div>
        <div className="ag-theme-alpine" style={{ height: 450, width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            rowData={data}
            columnDefs={transColumns}
            defaultColDef={defaultColDef}
          />
        </div>
        <div className={Style.table_resize_buttons}>
          <i
            className={`${"uil uil-arrows-h-alt"} ${Style.button}`}
            onClick={() => {
              autoSizeAll(false);
            }}
          ></i>
          <i
            className={`${"uil uil-arrows-merge"} ${Style.button}`}
            onClick={() => {
              autoSizeAll(true);
            }}
          ></i>
          <i
            className={`${"uil uil-arrows-shrink-h"} ${Style.button}`}
            onClick={() => {
              sizeToFit();
            }}
          ></i>
        </div>
      </div>
    </>
  );
};

export default TempBillTable;
