import React from "react";
import "./chatBoxMessage.css";
import { useSelector } from "react-redux";
function CnatBoxMessage({ person, currentlyChatingWith }) {
  var messagePic;
  const USERDATA = useSelector((state) => state.currentUserReducer.user);
  if (person == "sender") {
    messagePic = "http://localhost:8081/" + currentlyChatingWith.profilePic;
  } else if (person == "receiver") {
    messagePic = "http://localhost:8081/" + currentlyChatingWith.profilePic;
  }
  return (
    <div className={person}>
      <div className="message">
        <div>hello</div>
        <div>time</div>
      </div>
      <div className="messagePic">
        <img src={messagePic} alt="" />
      </div>
    </div>
  );
}

export default CnatBoxMessage;
