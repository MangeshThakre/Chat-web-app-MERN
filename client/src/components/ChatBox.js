import React from "react";
import "./ChatBox.css";
import { useSelector } from "react-redux";
import ChatBoxMessage from "./ChatBoxMessage.js";
import bj from "../img/bj.png";
import { useRef, useEffect } from "react";
function ChatBox({ currentlyChatingWith, messages, messageLoading }) {
  const USERDATA = useSelector((state) => state.currentUserReducer.user);
  const scroll = useRef(null);
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messageLoading]);

  const allMessage = (
    <div className ="chatimage" >
      {messageLoading ? (
        <div>
          <div className="loading">Fetching....</div>
        </div>
      ) : (
        <div className="messageContainer">
          {messages.map((message, index) => {
            return (
              <ChatBoxMessage
                key={index}
                currentlyChatingWith={currentlyChatingWith}
                person={
                  USERDATA._id == message.senderId ? "sender" : "receiver"
                }
                created_at={message.created_at}
                text={message.text}
              />
            );
          })}
          <div ref={scroll}></div>
        </div>
      )}
    </div>
  );

  return (
    <div className="chatbox">
      {currentlyChatingWith.length !== 0 ? allMessage : "....."}
    </div>
  );
}

export default ChatBox;
