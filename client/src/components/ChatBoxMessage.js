import React from "react";
import "./chatBoxMessage.css";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { useState } from "react";
import { padding } from "@mui/system";
function CnatBoxMessage({ person, currentlyChatingWith, created_at, text }) {
  var name;

  var messagePic;
  const USERDATA = useSelector((state) => state.currentUserReducer.user);
  if (person == "sender") {
    name = USERDATA.firstName;
    messagePic = "http://localhost:8081/" + USERDATA.profilePic;
  } else if (person == "receiver") {
    name = currentlyChatingWith.name;
    messagePic = currentlyChatingWith.profilePic
      ? "http://localhost:8081/" + currentlyChatingWith.profilePic
      : "";
  }
  return (
    <div className={person}>
      <div className="message">
        <div>
          <h5 style={{ margin: "2px" }}>{name}</h5>
          <p style={{ margin: "2px" }}>{text}</p>
        </div>
        <div style={{ fontSize: "10px" }}>{format(created_at)}</div>
      </div>
      <div className="messagePicContainer">
        <div className="messagePic">
          <img src={messagePic} alt="" />
        </div>
      </div>
    </div>
  );
}

export default CnatBoxMessage;
