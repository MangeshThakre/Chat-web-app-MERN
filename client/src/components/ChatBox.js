import React from "react";
import "./ChatBox.css";
import { useSelector } from "react-redux";
import ChatBoxMessage from "./ChatBoxMessage.js";
import bgIcon from "../img/icons8-chat-bubble-48.png";
import { useRef, useEffect } from "react";
function ChatBox({
  currentlyChatingWith,
  contactList,
  messages,
  messageLoading,
}) {
  const USERDATA = useSelector((state) => state.currentUserReducer.user);
  const scroll = useRef(null);
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messageLoading]);

  const allMessage = (
    <div className="chatimage">
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
                message={message}
                currentlyChatingWith={currentlyChatingWith}
                contactList={contactList}
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
      {currentlyChatingWith.length !== 0 ? (
        allMessage
      ) : (
        <div class="emptyChatBox">
          <img src={bgIcon} alt="image" />
        </div>
      )}
    </div>
  );
}

export default ChatBox;
