import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Addparticapents from "./Addparticapents";
import { USER } from "../redux/reduxToken/currentUserSplice.js";
import Grid from "@mui/material/Grid";
import SideBarheader from "./sideBarheader.js";
import Sidebar from "./sidebar.js";
import ChatBoxheader from "./ChatBoxheader.js";
import ChatBox from "./ChatBox.js";
import ChatBoxFooter from "./ChatBoxFooter.js";
import EditProfile from "./EditProfile.js";
import Add from "./add.js";
import ContactDetail from "./contactDetails";
import Picker from "emoji-picker-react";
import "./dashbord.css";
import { useParams } from "react-router-dom";
function Dashbord() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { roomId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const USERDATA = useSelector((state) => state.currentUserReducer.user);
  const [toggle, setToggle] = useState(false);
  const [addToggle, setAddToggle] = useState(false);
  const [addParticapentsToggle, setaddParticapentsToggle] = useState(false);
  const [contactDetailToggle, setContactDetailToggle] = useState(false);
  const [contactList, setContactList] = useState([]);
  const [toggleEmojy, setToggleEmojy] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [currentlyChatingWith, setCurrentlyChatingWith] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState("");
  const [messageLoading, setMessageLoading] = useState(false);
  const [reloadContactList, setReloadContactlist] = useState(false);
  const [currentMember, setcurrentMember] = useState("");
  //   const TOKEN = useSelector((state) => state.currentUserReducer.token);

  const TOKEN = localStorage.getItem("Token");
  if (!localStorage.getItem("Token")) navigate("/signin");

  useEffect(() => {
    navigate("/");
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getSidebarContactList();
    setReloadContactlist(false);
  }, [reloadContactList]);

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
      localStorage.setItem("userId", USERDATA._id);
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

  useEffect(async () => {
    if (currentlyChatingWith != 0) {
      setMessageLoading(true);
      const messagess = await axios({
        method: "get",
        url: `http://localhost:8081/getMessage/${roomId}`,
        headers: {
          "Content-type": "appllication/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = messagess.data;
      setMessages(data);
      setMessageLoading(false);
    }
  }, [currentlyChatingWith]);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", zIndex: "2", right: "0" }}>
        {contactDetailToggle ? (
          <ContactDetail
            contactDetailToggle={contactDetailToggle}
            setContactDetailToggle={setContactDetailToggle}
            currentlyChatingWith={currentlyChatingWith}
            setaddParticapentsToggle={setaddParticapentsToggle}
            setcurrentMember={setcurrentMember}
          ></ContactDetail>
        ) : null}
      </div>
      <div style={{ position: "absolute", zIndex: "3", right: "0" }}>
        {addParticapentsToggle ? (
          <Addparticapents
            addParticapentsToggle={addParticapentsToggle}
            setaddParticapentsToggle={setaddParticapentsToggle}
            currentlyChatingWith={currentlyChatingWith}
            currentMember={currentMember}
            contactList={contactList}
            setCurrentlyChatingWith={setCurrentlyChatingWith}
            setReloadContactlist={setReloadContactlist}
          />
        ) : null}
      </div>

      <div style={{ position: "fixed", zIndex: "1" }}>
        {addToggle ? (
          <Add
            addToggle={addToggle}
            setAddToggle={setAddToggle}
            contactList={contactList}
            setCurrentlyChatingWith={setCurrentlyChatingWith}
            setReloadContactlist={setReloadContactlist}
          />
        ) : null}
        {toggle ? (
          <EditProfile
            toggle={toggle}
            setToggle={setToggle}
            USERDATA={USERDATA}
          />
        ) : null}
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
              <ChatBoxheader
                currentlyChatingWith={currentlyChatingWith}
                setContactDetailToggle={setContactDetailToggle}
              />
            </Grid>
            <Grid item xs={4}>
              <Sidebar
                contactList={contactList}
                setCurrentlyChatingWith={setCurrentlyChatingWith}
              />
            </Grid>
            <Grid item xs={8}>
              <ChatBox
                currentlyChatingWith={currentlyChatingWith}
                messages={messages}
                messageLoading={messageLoading}
              />
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
                setMessages={setMessages}
                messages={messages}
                setCurrentChat={setCurrentChat}
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
