import React from "react";
import Paper from "@mui/material/Paper";
import "./ChatboxHeader.css";
import Avatar from "@mui/material/Avatar";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
function ChatBoxheader({ currentlyChatingWith, setContactDetailToggle }) {
  const URL = process.env.REACT_APP_API_URL;

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
                  ? URL + "/" + currentlyChatingWith.profilePic
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
        {currentlyChatingWith.length !== 0 ? (
          <IconButton
            style={{ color: "white" }}
            onClick={() => {
              setContactDetailToggle(true);
            }}
          >
            <ManageAccountsOutlinedIcon />
          </IconButton>
        ) : null}
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
