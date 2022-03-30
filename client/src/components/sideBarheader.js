import React from "react";
import { useSelector } from "react-redux";
import "./sideBarheader.css";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
function SideBarheader({ toggle, setToggle, addToggle, setAddToggle }) {
  const USERDATA = useSelector((state) => state.currentUserReducer.user);
  const userName =
    USERDATA != null ? USERDATA.firstName + " " + USERDATA.lastName : "null";
  const phoneNo = USERDATA != null ? USERDATA.phoneNo : "null";

  return (
    <div className="sideBarheader">
      <div className="header">
        <div
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <Avatar alt={userName} src="/static/images/avatar/1.jpg" />
        </div>
        <div>
          <p>{userName}</p>
          <p>{phoneNo}</p>
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
