import React from "react";
import "./ChatBoxfooter.css";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import InputEmoji from "react-input-emoji";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";

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
    // newMessage = {
    //   roomId,
    //   senderId: USERDATA._id,
    //   text,
    //   created_at: new Date(),
    // };
    // setCurrentChat(text);
    // setMessages([...messages, newMessage]);

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
      setText("");
    } catch (error) {
      console.log(error);
    }
  };
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
                onEnter={send}
                placeholder="Type a message"
              />
            </div>
          </Box>
          <SendIcon
            onClick={() => {
              if (text !== "") send();
            }}
          />
        </>
      ) : null}
    </div>
  );
}

export default ChatBoxFooter;
