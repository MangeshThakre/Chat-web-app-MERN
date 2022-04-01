import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { USER } from "../redux/reduxToken/currentUserSplice.js";
import Grid from "@mui/material/Grid";
import SideBarheader from "./sideBarheader.js";
import Sidebar from "./sidebar.js";
import ChatBoxheader from "./ChatBoxheader.js";
import ChatBox from "./ChatBox.js";
import ChatBoxFooter from "./ChatBoxFooter.js";
import EditProfile from "./EditProfile.js";
import Add from "./add.js";
import io from "socket.io-client";
import Picker from "emoji-picker-react";
import "./dashbord.css";
import { useParams } from "react-router-dom";
import { rootShouldForwardProp } from "@mui/material/styles/styled";
const ENDPOINT = "http://localhost:8081";

var socket = io(ENDPOINT, { transports: ["websocket"] });

function Dashbord() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { roomId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const USERDATA = useSelector((state) => state.currentUserReducer.user);
  const [toggle, setToggle] = useState(false);
  const [addToggle, setAddToggle] = useState(false);
  const [contactList, setContactList] = useState([]);
  const [toggleEmojy, setToggleEmojy] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [currentlyChatingWith, setCurrentlyChatingWith] = useState([]);
  const [receiverMessaage, setReceiverMessaage] = useState("");
  //   const TOKEN = useSelector((state) => state.currentUserReducer.token);
  const TOKEN = localStorage.getItem("Token");
  if (!localStorage.getItem("Token")) navigate("/signin");

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`connected with the back-end`);
    });
  }, []);

  // localStorage.removeItem("Token");

  useEffect(() => {
    navigate("/");
  }, []);
  useEffect(() => {
    // console.log(roomId);
    console.log(receiverMessaage);
    socket.emit("join-room", roomId, receiverMessaage);
  }, [receiverMessaage]);

  socket.on("receive-message", (message) => {
    if (currentlyChatingWith.length != 0) {
      const box = document.querySelector(".chatbox .messageContainer");
      const div = document.createElement("div");
      div.className = "receiver";
      div.innerHTML = `${message}`;
      box.appendChild(div);
    }
  });

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getSidebarContactList();
  }, []);

  const getUser = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:8081/verify",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;
      dispatch(USER(data));
      setIsLoading(false);
    } catch (error) {
      console.log("Error", error);
      navigate("/signin");
    }
  };

  const getSidebarContactList = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:8081/contactList",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = await response.data;
      setContactList(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  return (
    <div>
      <div style={{ position: "fixed", zIndex: "1" }}>
        {addToggle ? (
          <Add addToggle={addToggle} setAddToggle={setAddToggle} />
        ) : (
          ""
        )}
        {toggle ? (
          <EditProfile
            toggle={toggle}
            setToggle={setToggle}
            USERDATA={USERDATA}
          />
        ) : (
          ""
        )}
      </div>

      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div style={{ height: "580px", width: "1020px" }}>
          <Grid container spacing={0} columns={{ xs: 12 }}>
            <Grid item xs={4}>
              <SideBarheader
                toggle={toggle}
                setToggle={setToggle}
                addToggle={addToggle}
                setAddToggle={setAddToggle}
              />
            </Grid>
            <Grid item xs={8}>
              <ChatBoxheader currentlyChatingWith={currentlyChatingWith} />
            </Grid>
            <Grid item xs={4}>
              <Sidebar
                contactList={contactList}
                setCurrentlyChatingWith={setCurrentlyChatingWith}
              />
            </Grid>
            <Grid item xs={8}>
              <ChatBox currentlyChatingWith={currentlyChatingWith} />
              <div className="emojyPicker">
                {toggleEmojy ? (
                  <div>
                    <Picker onEmojiClick={onEmojiClick} />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <ChatBoxFooter
                setToggleEmojy={setToggleEmojy}
                toggleEmojy={toggleEmojy}
                chosenEmoji={chosenEmoji}
                setReceiverMessaage={setReceiverMessaage}
                currentlyChatingWith={currentlyChatingWith}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default Dashbord;
