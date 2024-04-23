import Style from "../../../../Styles/TableStyle.module.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useRef, useState } from "react";
import ConfirmationModal from "../../../../Components/modals/ConfirmationModal";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const BillTable = ({ data, date }) => {
  const gridRef = useRef();
  const { pathname } = useLocation();

  const { user: profileData } = useSelector((state) => state.auth);

  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [removeId, setRemoveId] = useState();
  const dateFormatter = (params) => {
    return new Date(params.value).toDateString();
  };

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

  const handleRemove = (bill) => {
    if (new Date(bill.createdAt).getMonth() + 1 === new Date().getMonth() + 1) {
      setConfirmationPopUp(true);
      setRemoveId(bill);
    } else {
      toast.error("you can't remove this bill");
    }
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
      headerName: "Payable Amount",
      field: "payableAmount",
      resizable: true,
      width: 100,
    },
    {
      headerName: "Paid Amount",
      field: "paidAmount",
      resizable: true,
      width: 100,
      cellStyle: function (params) {
        if (params.data.paidAmount) {
          return {
            color: "white",
            backgroundColor: "#5bc8ab",
            fontWeight: 900,
          };
        } else {
          return null;
        }
      },
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
      field: "due",
      resizable: true,
      width: 100,
      cellStyle: function (params) {
        if (params.data.due) {
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
    {
      headerName: "Actions",
      field: "_id",
      resizable: true,
      width: 160,
      cellRenderer: (params) => (
        <div className="flex items-center justify-center gap-1">
          <button
            className="submit_button px-2 py-1 text-sm"
            // onClick={() => handleRemove(params.data)}
          >
            Print
          </button>
          {profileData.role === "owner" && pathname === "/transaction" && (
            <button
              className="removeButton border-[3px] px-2 py-1 text-sm"
              disabled={
                new Date(params.data.createdAt).getMonth() + 1 !==
                new Date().getMonth() + 1
              }
              onClick={() => handleRemove(params.data)}
            >
              Remove
            </button>
          )}
        </div>
      ),
    },
  ];
  useEffect(() => {}, [data]);
  return (
    <>
      <ConfirmationModal
        confirmationPopUp={confirmationPopUp}
        setConfirmationPopUp={setConfirmationPopUp}
        data={removeId}
        popUp_type="Remove_Bill"
      />
      <div className={`card ${Style.table_container}`}>
        <div className={Style.table__header}>
          <h1 className="title">Bills</h1>
          <h4 className="subtitle">
            {new Date(date).toLocaleString("default", { month: "long" })}
          </h4>
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

export default BillTable;
