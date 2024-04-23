import { Loader, Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UilSearch } from "@iconscout/react-unicons";
import { useGetUserQuery } from "../../../redux/features/users/userApi";
import {
  conversationsApi,
  useAddConversationMutation,
  useEditConversationMutation,
} from "../../../redux/features/conversations/conversationsApi";
import Error from "../components/ui/Error";

const SendMessageModal = ({ modalOpened, setModalOpened }) => {
  const dispatch = useDispatch();
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [resError, setResError] = useState("");
  const [conversation, setConversation] = useState(undefined);
  const [userCheck, setUserCheck] = useState(false);

  const { user: loggedInUser } = useSelector((state) => state.auth) || {};

  const { username: myUsername } = loggedInUser || {};

  const {
    data: participant,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUserQuery(to, {
    skip: !userCheck,
  });

  const [addConversation, { isSuccess: isAddConversationSuccess }] =
    useAddConversationMutation();
  const [editConversation, { isSuccess: isEditConversationSuccess }] =
    useEditConversationMutation();

  //check conversation existence
  useEffect(() => {
    if (participant?._id && participant.username !== myUsername) {
      dispatch(
        conversationsApi.endpoints.getConversation.initiate({
          myUsername: myUsername,
          participantUsername: to,
        })
      )
        .unwrap()
        .then((data) => {
          setConversation(data?.conversations);
        })
        .catch((err) => setResError("There was an error!"));
    }
  }, [participant, participant?._id, dispatch, myUsername, to]);

  const debounceHandler = (fn, delay) => {
    let timeoutId;
    return (...arg) => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        fn(...arg);
      }, delay);
    };
  };
  const doSearch = (value) => {
    // if (isValidateEmail(value)) {
    //check user api
    setUserCheck(true);
    setTo(value);
    refetch(value);
    // }
  };

  const handleSearch = debounceHandler(doSearch, 2000);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (conversation?.length > 0) {
      //edit convestaion
      editConversation({
        _id: conversation[0]._id,
        sender: myUsername,
        data: {
          message,
        },
      });
    } else if (conversation?.length === 0) {
      //add conversatiion

      addConversation({
        sender: myUsername,
        data: {
          participant,
          message,
        },
      });
    }
  };

  //listen conversation add/edit success
  useEffect(() => {
    if (isAddConversationSuccess || isEditConversationSuccess) {
      setModalOpened(false);
      setMessage("");
      setTo("");
    }
  }, [isAddConversationSuccess, isEditConversationSuccess]);

  return (
    <Modal
      classNames={{
        modal: `bg-gray-300 dark:bg-gray-800`,
        title: `modal__title`,
        close: `modal__close`,
      }}
      title=""
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900   drop-shadow-sm dark:text-gray-400">
          Send message
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div className="relative">
              <label htmlFor="to" className="sr-only">
                To
              </label>
              <input
                id="to"
                name="to"
                type="text"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
                placeholder="Send to"
                onChange={(e) => handleSearch(e.target.value)}
              />
              {isLoading && (
                <Loader className="absolute right-8 top-2 h-6 text-gray-600 hover:text-gray-700" />
              )}
              <UilSearch
                onClick={() => refetch(to)}
                className="absolute right-2 top-2 z-10 cursor-pointer text-gray-600 hover:text-gray-700"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                type="message"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:bg-slate-400"
              disabled={
                conversation === undefined ||
                isError ||
                (participant?._id && participant.username === myUsername)
              }
            >
              Send Message
            </button>
          </div>

          {isError && <Error message={error?.data?.message} />}

          {resError && <Error message={resError} />}
        </form>
      </div>
    </Modal>
  );
};

export default SendMessageModal;
