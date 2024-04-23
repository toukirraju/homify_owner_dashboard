import {
  UilCamera,
  UilCheck,
  UilTimes,
  UilTrashAlt,
} from "@iconscout/react-unicons";
import { useState } from "react";
import {
  useRemoveHouseImageMutation,
  useUploadHouseImageMutation,
} from "../../../../redux/features/profile/RTK Query/profileApi";
import { Loader } from "@mantine/core";
import { imageResizer } from "../../../../utility/fileResizer";

const HouseImage = ({ houseData }) => {
  const [image, setImage] = useState("");

  // RTK querys
  const [removeHouseImage, { isLoading: isRemoveLoading }] =
    useRemoveHouseImageMutation();

  const [uploadHouseImage, { isLoading: isUploadLoading }] =
    useUploadHouseImageMutation();

  const loading = isRemoveLoading || isUploadLoading;

  const handleSubmitImage = () => {
    uploadHouseImage({ ...houseData, houseImage: image });
    setImage("");
  };

  const handleRemoveImage = () => {
    removeHouseImage(houseData);
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    const fileType = file.type;

    // Check if file type is an image
    if (!fileType.startsWith("image/")) {
      alert("Please upload an image file");
      setImage(null);
      return;
    }

    const { resizedImage, fileSize } = await imageResizer(
      file,
      650, //maxWidth
      650, //maxHeight
      90 //quality
    );

    // Check if file size is less than or equal to 1MB
    if (fileSize > 1 * 1024 * 1024) {
      alert("Please upload an image file with size less than or equal to 1MB");
      setImage(null);
      return;
    } else {
      setImage(resizedImage);
    }
  };

  return (
    <div className="relative mx-auto flex h-56  w-56 items-center justify-center rounded-md bg-slate-400 md:h-60">
      {loading ? (
        <Loader size="md" color="orange" variant="bars" />
      ) : image || houseData?.houseImage?.url ? (
        <>
          <img
            className="w-ful h-full rounded-sm object-cover"
            src={image || houseData?.houseImage?.url}
            alt="HouseImage"
          />

          {/* button section  */}
          {houseData?.houseImage?.url ? (
            //if image alreday uploaded
            <button
              onClick={() => handleRemoveImage()}
              className="absolute right-3 top-2 h-6 w-6 rounded-full bg-slate-300 text-red-400 shadow-sm shadow-gray-400 hover:text-red-500"
            >
              <UilTrashAlt />
            </button>
          ) : (
            //image not uploaded

            image && (
              <>
                <button
                  onClick={() => setImage("")}
                  className="absolute right-10 top-2 h-6 w-6 rounded-full bg-slate-300 text-red-400 shadow-sm shadow-gray-400 hover:text-red-500"
                >
                  <UilTimes />
                </button>
                <button
                  onClick={handleSubmitImage}
                  className="absolute right-3 top-2 h-6 w-6 rounded-full bg-slate-300 text-green-600 shadow-sm shadow-gray-400 hover:text-green-700"
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
            name="houseData?.houseImage"
            type="file"
            onChange={handleFileSelect}
          />
        </label>
      )}
    </div>
  );
};

export default HouseImage;
