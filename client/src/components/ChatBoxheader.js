import React from "react";
import Paper from "@mui/material/Paper";
import "./ChatboxHeader.css";
import Avatar from "@mui/material/Avatar";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
function ChatBoxheader({ currentlyChatingWith }) {
  let { roomId } = useParams();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("Token");
    navigate("/signin");
  };

  return (
    <div className="ChatboxHeader">
      {currentlyChatingWith.length !== 0 ? (
        <div className="currentContactdetail">
          <div className="currentContactImg">
            <Avatar
              alt={currentlyChatingWith.name}
              src={
                currentlyChatingWith?.profilePic
                  ? "http://localhost:8081/" + currentlyChatingWith.profilePic
                  : null
              }
            />
          </div>

          <div className="currentContactInfo">
            <h5>{currentlyChatingWith.name}</h5>
            <p>{currentlyChatingWith.phoneNo}</p>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="logout">
        <IconButton
          style={{ color: "white" }}
          onClick={() => {
            logout();
          }}
        >
          <LogoutIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatBoxheader;
