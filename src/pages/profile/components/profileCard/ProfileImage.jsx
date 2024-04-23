import {
  UilCamera,
  UilCheck,
  UilTrashAlt,
  UilTimes,
} from "@iconscout/react-unicons";
import { useState } from "react";
import {
  useRemoveProfileImageMutation,
  useUpdateProfileImageMutation,
} from "../../../../redux/features/profile/RTK Query/profileApi";
import { Loader } from "@mantine/core";
import { imageResizer } from "../../../../utility/fileResizer";

const ProfileImage = ({ profilePicture }) => {
  const [profileImage, setProfileImage] = useState("");

  // RTK querys
  const [removeProfileImage, { isLoading: isRemoveLoading }] =
    useRemoveProfileImageMutation();

  const [updateProfileImage, { isLoading: isUploadLoading }] =
    useUpdateProfileImageMutation();

  const loading = isRemoveLoading || isUploadLoading;

  const handleSubmitImage = () => {
    updateProfileImage({ profilePicture: profileImage });
    setProfileImage("");
  };

  const handleRemoveImage = (imageData) => {
    removeProfileImage(imageData);
  };

  const handleFileSelect = async (event) => {
    const selectedFile = event.target.files[0];
    const fileType = selectedFile.type;

    // Check if file type is an image
    if (!fileType.startsWith("image/")) {
      alert("Please upload an image file");
      setProfileImage(null);
      return;
    }

    const { resizedImage, fileSize } = await imageResizer(
      selectedFile,
      500, //maxWidth
      500, //maxHeight
      90 //quality
    );

    // Check if file size is less than or equal to 1MB
    if (fileSize > 1 * 1024 * 1024) {
      alert("Please upload an image file with size less than or equal to 1MB");
      setProfileImage(null);
      return;
    } else {
      setProfileImage(resizedImage);
    }
  };

  return (
    <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-slate-400">
      {loading ? (
        <Loader size="md" color="orange" variant="bars" />
      ) : profileImage || profilePicture?.url ? (
        <>
          <img
            className="h-24 w-24 rounded-full object-fill"
            src={profileImage || profilePicture?.url}
            alt="ProfileImage"
          />

          {/* button section  */}
          {profilePicture?.url ? (
            //if image alreday uploaded
            <button
              onClick={() => handleRemoveImage(profilePicture)}
              className="absolute right-3 top-0 h-6 w-6 rounded-full bg-slate-300 text-red-400 shadow-sm shadow-gray-400 hover:text-red-500"
            >
              <UilTrashAlt />
            </button>
          ) : (
            //image not uploaded

            profileImage && (
              <>
                <button
                  onClick={() => setProfileImage("")}
                  className="absolute right-10 top-2 h-6 w-6 rounded-full bg-slate-300 text-red-400 shadow-sm shadow-gray-400 hover:text-red-500"
                >
                  <UilTimes />
                </button>
                <button
                  onClick={handleSubmitImage}
                  className="absolute right-3 top-0 h-6 w-6 rounded-full bg-slate-300 text-green-600 shadow-sm shadow-gray-400 hover:text-green-700"
                >
                  <UilCheck />
                </button>
              </>
            )
          )}
        </>
      ) : (
        <label
          htmlFor="fileInput"
          className="relative flex w-full cursor-pointer items-center justify-center"
        >
          <UilCamera
            className="absolute text-gray-600 opacity-25 "
            size="50px"
          />

          <div className="absolute font-bold  text-gray-700 ">
            +upload photo
          </div>

          <input
            id="fileInput"
            className=" hidden dark:bg-slate-900 dark:text-gray-200"
            name="profilePicture"
            type="file"
            onChange={handleFileSelect}
          />
        </label>
      )}
    </div>
  );
};

export default ProfileImage;
