/* eslint-disable jsx-a11y/img-redundant-alt */
import { Image, Modal } from "@mantine/core";
import React from "react";
import { UilAngleLeftB, UilAngleRightB } from "@iconscout/react-unicons";
import { useState } from "react";
const PostImages = ({ images }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };
  const nextImage = () => {
    if (currentImageIndex + 1 === images.length) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(images.length - 1);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <>
      {/* // <img src={image.url} alt="" onClick={() => openModal(index)} /> */}
      <div className="grid grid-cols-3 gap-4">
        {images?.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Image ${index}`}
            className={` cursor-pointer rounded-lg ${
              index === 0 ? "col-span-2 row-span-2" : "col-span-1  row-span-1"
            }`}
            onClick={() => openModal(index)}
          />
        ))}
      </div>

      <Modal
        classNames={{
          modal: `modal__Body`,
          title: `modal__title`,
          close: `modal__close`,
        }}
        size="lg"
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <div className="relative  w-full ">
          <Image
            fit="contain"
            radius="md"
            src={images[currentImageIndex].url}
            alt={images[currentImageIndex].alt}
          />
          <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-between ">
            <span className="flex  h-14 w-14 cursor-pointer items-center justify-center rounded-full  bg-slate-300 bg-opacity-20  hover:bg-opacity-70">
              <UilAngleLeftB onClick={prevImage} />
            </span>
            <span className="flex h-14  w-14 cursor-pointer items-center justify-center rounded-full bg-slate-300 bg-opacity-20  hover:bg-opacity-70">
              <UilAngleRightB onClick={nextImage} />
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PostImages;
