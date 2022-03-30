import React from "react";
import "./ChatBoxfooter.css";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, orange } from "@mui/material/colors";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { useEffect } from "react";
import InputEmoji from "react-input-emoji";
import { useParams } from "react-router-dom";

function ChatBoxFooter({ setReceiverMessaage, currentlyChatingWith }) {
  const [text, setText] = useState("");
  let { roomId } = useParams();

  const send = () => {
    if (roomId !== "undefined") {
      setReceiverMessaage(text);
      const box = document.querySelector(".chatbox .messageContainer");
      const div = document.createElement("div");
      div.className = "sender";
      div.innerHTML = `${text}`;
      box.appendChild(div);
    }
    setText("");
  };

  return (
    <div className="chatboxFooter">
      <Box
        sx={{
          width: "80%",
          maxWidth: "100%",
        }}
      >
        {/* <ThemeProvider> */}
        <div className="emoji">
          <InputEmoji
            value={text}
            onChange={setText}
            onEnter={send}
            placeholder="Type a message"
          />
        </div>

        {/* </ThemeProvider> */}
      </Box>
      <SendIcon onClick={() => send()} />
    </div>
  );
}

export default ChatBoxFooter;
