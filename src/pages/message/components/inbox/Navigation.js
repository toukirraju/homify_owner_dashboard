import { useState } from "react";
import { UilEnvelopeAdd } from "@iconscout/react-unicons";
import SendMessageModal from "../../modals/SendMessageModal";

export default function Navigation() {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <>
      <div className="card headerContainer">
        <h3>Message</h3>
        <div className="bulkCreate">
          <div className="flex h-[65px] justify-center border-b border-gray-300 p-4 text-center md:justify-end">
            <UilEnvelopeAdd
              className=" cursor-pointer "
              onClick={() => setModalOpened(true)}
            />
          </div>
        </div>
      </div>{" "}
      <SendMessageModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      />
    </>
  );
}
