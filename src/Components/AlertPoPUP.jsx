import { Alert } from "@mantine/core";
import { UilExclamationCircle } from "@iconscout/react-unicons";
import { useDispatch } from "react-redux";
import { clearMessage } from "../redux/slices/message";

const AlertPoPUP = ({ message }) => {
  const dispatch = useDispatch();
  return (
    <div className="">
      <Alert
        icon={<UilExclamationCircle size={16} />}
        title="Error!"
        color="red"
        radius="md"
        // variant="outline"
        withCloseButton
        onClose={() => dispatch(clearMessage())}
      >
        {/* somthing want's wrong! Please try again.. */}
        <div style={{ color: "red", fontWeight: "600" }}>{message}</div>
      </Alert>
    </div>
  );
};

export default AlertPoPUP;
