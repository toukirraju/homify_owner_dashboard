import { useState } from "react";
import AssignManagerModal from "../../modals/AssignManagerModal";
import Style from "../../styles/Profile.module.css";
import { UilTimes } from "@iconscout/react-unicons";

const SearchOutput = ({ closeSearchModal, data }) => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <>
      <div className={` ${Style.display_card}`}>
        <div className={`${Style.display_card_header}`}>
          <span
            className={
              data.ownerId === "" || data.ownerId === undefined
                ? `${Style.display_card_badge_available}`
                : `${Style.display_card_badge}`
            }
          >
            {data.ownerId === "" || data.ownerId === undefined
              ? "Available"
              : "Not Available"}
          </span>
          <UilTimes cursor="pointer" onClick={() => closeSearchModal()} />
        </div>
        <div className={`${Style.display_card_body}`}>
          <div>
            <span>Name</span> {data.firstname + " " + data.lastname}
          </div>
          <div>
            <span>Phone</span> {data.phone}
          </div>
          <div>
            <span>Role</span> {data.role}
          </div>
        </div>

        <AssignManagerModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          closeSearchModal={closeSearchModal}
          data={data}
        />
        <button
          className="submit_button"
          disabled={data.ownerId}
          onClick={() => setModalOpened(true)}
        >
          Assign
        </button>
      </div>
    </>
  );
};

export default SearchOutput;
