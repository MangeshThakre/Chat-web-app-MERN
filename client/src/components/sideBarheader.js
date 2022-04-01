import React from "react";
import { useSelector } from "react-redux";
import "./sideBarheader.css";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
function SideBarheader({ toggle, setToggle, addToggle, setAddToggle }) {
  const USERDATA = useSelector((state) => state.currentUserReducer.user);
  const userName =
    USERDATA != null ? USERDATA.firstName + " " + USERDATA.lastName : "null";
  const phoneNo = USERDATA != null ? USERDATA.phoneNo : "null";

  return (
    <div className="sideBarheader">
      <div className="header">
        <div
          className="userInfobox"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <Avatar
            alt={userName}
            src={USERDATA ? "http://localhost:8081/" + USERDATA.profilePic : ""}
          />

          <div className="userInfo">
            <h3>{userName}</h3>
            <p>{phoneNo}</p>
          </div>
        </div>

        <IconButton
          aria-label="delete"
          style={{ color: "white" }}
          onClick={() => setAddToggle(!addToggle)}
        >
          <AddIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default SideBarheader;
