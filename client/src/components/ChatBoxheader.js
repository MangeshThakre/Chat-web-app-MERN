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
    // localStorage.removeItem("Token");
    // navigate("/signin");
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
            <h3>{currentlyChatingWith.name}</h3>
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
