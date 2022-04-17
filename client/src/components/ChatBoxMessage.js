import React from "react";
import "./chatBoxMessage.css";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { useState } from "react";
import { padding } from "@mui/system";
function CnatBoxMessage({
  person,
  currentlyChatingWith,
  contactList,
  created_at,
  text,
  message,
}) {
  var name;
  const URL = process.env.REACT_APP_API_URL;
  var messagePic;
  const USERDATA = useSelector((state) => state.currentUserReducer.user);
  if (message.type == "GROUP") {
    if (person == "receiver") {
      const groupMember = contactList.find(
        (e) => e.contactID == message.senderId
      );
      name = groupMember ? groupMember.name : message.senderPhoneNo;
      messagePic = groupMember?.profilePic
        ? URL + "/" + groupMember.profilePic
        : null;
    } else if (person == "sender") {
      name = USERDATA.userName;
      messagePic = URL + "/" + USERDATA.profilePic;
    }
  } else if (message.type == "PRIVATE") {
    if (person == "sender") {
      name = USERDATA.userName;
      messagePic = URL + "/" + USERDATA.profilePic;
    } else if (person == "receiver") {
      name = currentlyChatingWith.name;
      messagePic = currentlyChatingWith.profilePic
        ? URL + "/" + currentlyChatingWith.profilePic
        : "";
    }
  }

  return (
    <div className={person}>
      <div className="message">
        <div>
          <h5 style={{ margin: "2px" }}>{name}</h5>
          <p className="text_message">{text}</p>
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
