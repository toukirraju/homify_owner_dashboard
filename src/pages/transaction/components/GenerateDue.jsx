import React, { useEffect } from "react";
import { monthIsBeforeOrOn25th } from "../../../utility/customFunctions";
import { useGenerateDuesMutation } from "../../../redux/features/transactions/RTK Query/billApi";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { toast } from "react-toastify";
const GenerateDue = ({ fullDate, setPayableModalOpened }) => {
  const [generateDues, { isLoading, isSuccess }] = useGenerateDuesMutation();
  const handleClick = () => {
    generateDues({ date: fullDate });
  };

  useEffect(() => {
    if (isSuccess) {
      setPayableModalOpened(false);
      toast.success("Due bill generated");
    }
  }, [isSuccess]);

  return (
    <div className="my-2 flex w-full flex-col items-center justify-center px-3 text-justify">
      <span className="text-sm text-zinc-500">
        You can generate due bill for all unpaid renters with one click on{" "}
        <b>GENERATE DUE</b> button.
      </span>

      <button
        className="warning_button my-3 px-2"
        onClick={handleClick}
        disabled={monthIsBeforeOrOn25th(fullDate)}
      >
        {isLoading ? <LoadingSpinner /> : "generate due"}
      </button>
      <span className="text-sm text-zinc-500">
        Think before you click <b>GENERATE DUE</b> because it might cause
        trouble later.
      </span>
    </div>
  );
};

export default GenerateDue;
