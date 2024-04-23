import Styles from "../../../Styles/ModalStyle.module.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  UilChatBubbleUser,
  UilUser,
  UilMobileAndroid,
} from "@iconscout/react-unicons";
import { useState } from "react";
import AssignRenter from "../../../Components/modals/renterModal/AssignRenter";

function SearchPopUp({ searchPopUp, setSearchPopUp, data }) {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [assignModalOpened, setAssignModalOpened] = useState(false);

  const handleSubmit = () => {
    setAssignModalOpened(true);
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
      size={isMobile ? "sm" : "md"}
      opened={searchPopUp}
      onClose={() => setSearchPopUp(false)}
    >
      {data && (
        <>
          <h3 className={Styles.Modal_header_title}> Search Result </h3>
          <div className={Styles.widget__innerCard}>
            <div className={Styles.widget__card__content}>
              <span>{<UilChatBubbleUser />}</span>
              <span>Username</span>
              <span>{data.username}</span>
            </div>
          </div>

          <div className={Styles.widget__innerCard}>
            <div className={Styles.widget__card__content}>
              <span>{<UilUser />}</span>
              <span>Name</span>
              <span>{data.fullname}</span>
            </div>
          </div>
          <div className={Styles.widget__innerCard}>
            <div className={Styles.widget__card__content}>
              <span>{<UilMobileAndroid />}</span>
              <span>Phone</span>
              <span>{data.phone}</span>
            </div>
          </div>

          <button
            className="submit_button mx-auto px-3 py-1"
            onClick={handleSubmit}
          >
            Assign
          </button>
          <AssignRenter
            assignModalOpened={assignModalOpened}
            setAssignModalOpened={setAssignModalOpened}
            renterData={data}
            renterPopUp={true}
          />
        </>
      )}
    </Modal>
  );
}

export default SearchPopUp;
