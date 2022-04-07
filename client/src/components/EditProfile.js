import React from "react";
import Card from "@mui/material/Card";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import { USER } from "../redux/reduxToken/currentUserSplice.js";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./editProfile.css";
function EditProfile({ toggle, setToggle, USERDATA }) {
  const TOKEN = localStorage.getItem("Token");
  const dispatch = useDispatch();

  const upload = async (e) => {
    const image = e.target.files[0];

    const formData = new FormData();
    formData.append("avatar", image);
    formData.append("userPhoneNo", USERDATA.phoneNo);

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8081/updateimage",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        data: formData,
      });
      const data = await response.data;
      dispatch(USER(data));
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <div className="EditProfile">
      <div className=" editProfileHeader">
        <span>
          <IconButton style={{ color: "white" }}>
            <ArrowBackIcon onClick={() => setToggle(!toggle)} />
          </IconButton>
        </span>
        <h3>Profile</h3>
      </div>
      <div>
        <div className="userImg">
          <img
            src={USERDATA ? `http://localhost:8081/` + USERDATA.profilePic : ""}
            alt="img"
          />

          <label id="icon-button-file" className="edit">
            <PhotoCameraIcon />
            <input
              type="file"
              accept="image/*"
              id="icon-button-file"
              onChange={(e) => {
                upload(e);
              }}
              style={{ display: "none" }}
            />
          </label>
        </div>
        <div className="userProfileInfo">
          <div className="UserProfileName">
            <div className="icon">
              <PersonIcon />
            </div>
            <div>
              <p>Name</p>
              <h3>{USERDATA.firstName}</h3>
              <p>
                This is not your or pin. This name will be visible to your
                chatApp contact.
              </p>
            </div>
          </div>
          <div className="UserProfileAbout">
            <div className="icon">
              <InfoIcon />
            </div>
            <div>
              <p>About</p>
              <h3></h3>
            </div>
          </div>
          <div className="UserProfileAbout">
            <div className="icon">
              <LocalPhoneIcon />
            </div>
            <div>
              <p>Phone</p>
              <h3>{USERDATA.phoneNo}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
