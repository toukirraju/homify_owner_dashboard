/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import {
  UilHouseUser,
  UilPhoneAlt,
  UilMapMarker,
  UilEllipsisH,
  UilEdit,
  UilCheckCircle,
  UilTrashAlt,
  UilMinusCircle,
} from "@iconscout/react-unicons";
import { Loader, Popover, Badge, Modal, Image } from "@mantine/core";
import "./Post.css";

import Email from "../../../assets/email.png";
import Chat from "../../../assets/send.png";
import Call from "../../../assets/phone-call.png";

import EditPost from "../../modals/postModal/EditPost";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  useDeletePostMutation,
  useMakePostMutation,
} from "../../../redux/features/post/RTK Query/postApi";
import PostImages from "./PostImages";

const Post = ({ data }) => {
  const { user: profileData } = useSelector((state) => state.auth);
  const [postEditModalOpened, setPostEditModalOpened] = useState(false);
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const [makePost] = useMakePostMutation();
  const [deletePost] = useDeletePostMutation();

  const handleEditOpen = () => {
    setPostEditModalOpened(true);
    setOpened((o) => !o);
  };

  const handleActive = () => {
    setLoading(true);
    makePost({ ...data, isVisible: true })
      .unwrap()
      .then(() => {
        setLoading(false);
        toast.success("Active now!");
        setOpened((o) => !o);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleInactive = () => {
    setLoading(true);
    makePost({ ...data, isVisible: false })
      .unwrap()
      .then(() => {
        setLoading(false);
        toast.success("Inactive now!");
        setOpened((o) => !o);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleDelete = () => {
    setLoading(true);
    deletePost(data._id)
      .unwrap()
      .then(() => {
        setLoading(false);
        toast.success("Deleted!");
        setOpened((o) => !o);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="loading__screen">
        <Loader color="orange" variant="bars" />
      </div>
    );
  }

  return (
    <div className={data.isVisible ? "Post" : "Inactive__Post"}>
      {/* {data && <ImageCollage data={images} />} */}

      {data?.images.length !== 0 && <PostImages images={data?.images} />}

      {/* {images && <ImageCollage data={images} />} */}

      <div className="postDetails">
        {/*************************  apartment details section start *************************/}
        <div className=" Post__innerCard">
          <h4 className="Post_innerCard_title">Apartment Details </h4>
          <div className="Post__innerCard__container">
            <div className="container__body">
              <div className="content">
                <span>Floor </span>
                <span>{data.apartment.apartmentDetails.floor}</span>
              </div>
              <div className="content">
                <span>Apartment number </span>
                <span>{data.apartment.apartmentDetails.apartment_number}</span>
              </div>
              <div className="content">
                <span>Apartment Type </span>
                <span>{data.apartment.apartmentDetails.apartmentType}</span>
              </div>
              <div className="content">
                <span>Bed room </span>
                <span>
                  {data.apartment.apartmentDetails.number_of_bed_room}
                </span>
              </div>
            </div>
            <div className="container__body">
              <div className="content">
                <span>Kitchen </span>
                <span>{data.apartment.apartmentDetails.number_of_kitchen}</span>
              </div>
              <div className="content">
                <span>Baths </span>
                <span>{data.apartment.apartmentDetails.number_of_baths}</span>
              </div>
              <div className="content">
                <span>Balcony </span>
                <span>{data.apartment.apartmentDetails.number_of_balcony}</span>
              </div>
              <div className="content">
                <span>Apartment length </span>
                <span>{data.apartment.apartmentDetails.apartment_length}</span>
              </div>
            </div>
          </div>
        </div>
        {/*************************  apartment details section End *************************/}

        {/*************************  Bill details section start *************************/}

        {!data.isNegotiable ? (
          <>
            <div className=" Post__innerCard">
              <h4 className="Post_innerCard_title">Bill Details </h4>
              <div className="Post__innerCard__container">
                <div className="container__body">
                  <div className="content">
                    <span>Rent </span>
                    <span>{data.apartment.billDetails.rent}</span>
                  </div>
                  <div className="content">
                    <span>Gas bill </span>
                    <span>{data.apartment.billDetails.gas_bill}</span>
                  </div>
                  <div className="content">
                    <span>Water bill </span>
                    <span>{data.apartment.billDetails.water_bill}</span>
                  </div>
                  <div className="content">
                    <span>Service charge </span>
                    <span>{data.apartment.billDetails.service_charge}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h3 className="negotiable_message">Bills can be negotiated</h3>
          </>
        )}

        {/*************************  Bill details section End *************************/}
        <div className="postDescription">
          {data.description}
          {/* A customer shared two recorded demos with me, each 1-hour long,
          presented to their typical prospects. These two examples had the same
          storyline and the only difference between them was the verbal style of
          delivery. The content and the sequence of steps in each demo were
          exactly alike. We had scheduled for me to see one more demo, but this
          one was live. */}
        </div>
        {/*************************  House details section start *************************/}
        <div className=" Post__innerCard">
          <div className="Post__innerCard__container">
            <h2 className="innerCard__title">{data.house.houseName}</h2>
            <h4 className="innerCard__subtitle">
              <UilMapMarker />{" "}
              {`${data.house.houseNo}, ${data.house.area}, ${data.house.city}, ${data.house.postCode}`}
            </h4>
            <div className="owner__container__body">
              <div className="owner_content">
                <span>
                  <UilHouseUser />
                </span>
                <span>{data.house.ownerName}</span>
              </div>
              <div className="owner_content">
                <span>
                  <UilPhoneAlt />{" "}
                </span>
                <span>{data.house.ownerPhone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*************************  Button section start *************************/}
      <div className="postReact">
        <div>
          <img
            src={Call}
            alt=""
            style={{ height: "30px", cursor: "pointer" }}
            // onClick={handleLike}
          />
          <span
            style={{
              color: "var(--gray)",
              fontSize: "12px",
              marginTop: "10px",
            }}
          >
            {/* 500 likes */}
          </span>
        </div>

        <div>
          <img
            src={Email}
            style={{ height: "30px", cursor: "pointer" }}
            alt=""
          />
          <span
            style={{
              color: "var(--gray)",
              fontSize: "12px",
              marginTop: "10px",
            }}
          >
            {/* 1.5k comments */}
          </span>
        </div>

        <img src={Chat} style={{ height: "30px", cursor: "pointer" }} alt="" />
      </div>

      {/*************************  Post Update section start *************************/}

      {data.ownerId === profileData._id && data.owner.role === "owner" && (
        <div className="Post__edit__dropdown">
          <Popover opened={opened} onChange={setOpened}>
            <Popover.Target>
              <UilEllipsisH onClick={() => setOpened((o) => !o)} />
            </Popover.Target>

            <Popover.Dropdown style={{ marginLeft: "40px" }}>
              <div className="popover__buttons">
                <span onClick={() => handleEditOpen()}>
                  <UilEdit size={16} color=" var(--orange)" />
                  edit
                </span>
                {data.isVisible ? (
                  <span onClick={() => handleInactive()}>
                    <UilMinusCircle size={16} color=" gray" />
                    Inactive
                  </span>
                ) : (
                  <span onClick={() => handleActive()}>
                    <UilCheckCircle size={16} color=" green" />
                    Active
                  </span>
                )}

                <span onClick={() => handleDelete()}>
                  <UilTrashAlt size={16} color=" var(--red)" />
                  Delete
                </span>
              </div>
            </Popover.Dropdown>
          </Popover>

          {!data.isVisible && (
            <Badge color="red" variant="filled">
              Inactive
            </Badge>
          )}
        </div>
      )}

      {data && (
        <EditPost
          postEditModalOpened={postEditModalOpened}
          setPostEditModalOpened={setPostEditModalOpened}
          data={data}
        />
      )}
    </div>
  );
};

export default Post;
