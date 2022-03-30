import React from "react";
import Paper from "@mui/material/Paper";
import "./ChatboxHeader.css";
import Avatar from "@mui/material/Avatar";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ChatBoxheader({ currentlyChatingWith }) {
  let { roomId } = useParams();
  const navigate = useNavigate();

  const logout = () => {
    // console.log("logput");
    localStorage.removeItem("Token");
    navigate("/signin");
  };

  // if (currentlyChatingWith.le) console.log(currentlyChatingWith);

  return (
    <div className="ChatboxHeader">
      {roomId ? (
        <div className="currentContactdetail">
          <div className="currentContactImg">
            <Avatar
              alt={currentlyChatingWith.name}
              src="/static/images/avatar/1.jpg"
            />
          </div>

          <div className="currentContactInfo">
            <p>{currentlyChatingWith.name}</p>
            <p>{currentlyChatingWith.phoneNo}</p>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="logout">
        <button
          onClick={() => {
            logout();
          }}
        >
          logout
        </button>
      </div>
    </div>
  );
}

export default ChatBoxheader;
