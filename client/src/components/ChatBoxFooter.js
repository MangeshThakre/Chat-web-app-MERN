import React from "react";
import "./ChatBoxfooter.css";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";
import InputEmoji from "react-input-emoji";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Pusher from "pusher-js";
import IconButton from "@mui/material/IconButton";

function ChatBoxFooter({
  setMessages,
  messages,
  setCurrentChat,
  currentlyChatingWith,
}) {
  const TOKEN = localStorage.getItem("Token");
  const USERDATA = useSelector((state) => state.currentUserReducer.user);
  let { roomId } = useParams();
  const [text, setText] = useState("");
  var newMessage;
  const send = async () => {
    newMessage = {
      roomId,
      senderId: USERDATA._id,
      text,
      created_at: new Date(),
    };
    setCurrentChat(text);

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8081/message",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        data: { text, roomId, type: currentlyChatingWith.type },
      });
      const data = await response.data;
      await setMessages([...messages, newMessage]);

      setText("");
    } catch (error) {
      console.log(error);
    }
  };
  localStorage.getItem("userId");
  useEffect(() => {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher("e9c08f4eba776e45b9af", {
      cluster: "ap2",
    });
    var receivedMessage = {};
    var channel = pusher.subscribe("receive-message");
    channel.bind("inserted", function (data) {
      receivedMessage = data.receiveMessage;
      if (
        receivedMessage.type === "PRIVATE" &&
        roomId === receivedMessage.roomId &&
        localStorage.getItem("userId") !== receivedMessage.senderId
      ) {
        setMessages([...messages, receivedMessage]);
      } else if (
        receivedMessage.type === "GROUP" &&
        roomId === receivedMessage.roomId &&
        localStorage.getItem("userId") !== receivedMessage.senderId
      ) {
        setMessages([...messages, receivedMessage]);
      }
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="chatboxFooter">
      {currentlyChatingWith.length !== 0 ? (
        <>
          <Box
            sx={{
              width: "80%",
              maxWidth: "100%",
            }}
          >
            <div className="emoji">
              <InputEmoji
                value={text}
                onChange={setText}
                onEnter={text != "" ? send : null}
                placeholder="Type a message"
              />
            </div>
          </Box>
          <IconButton
            onClick={() => {
              if (text !== "") send();
            }}
            button
            sx={{ color: "white" }}
          >
            <SendIcon />
          </IconButton>
        </>
      ) : null}
    </div>
  );
}

export default ChatBoxFooter;
