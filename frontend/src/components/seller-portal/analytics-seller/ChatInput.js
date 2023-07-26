// Created by Parth Patel
// Referred to the youtube video on how to use socket.io for real time commjunication and partially used the code after understanding to implement the chat feature.
// URL1: https://www.youtube.com/watch?v=otaQKODEUFs&t=13178s&ab_channel=KishanSheth
// URL2: https://github.com/koolkishan/chat-app-react-nodejs
// Date Accessed: 07/26/2023
// Used by Parth Patel
import React, { useState } from "react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");

  // Function to send the chat message
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="messageInputContainer">
      <div className="button-container"></div>
      <form className="input-container" onSubmit={sendChat}>
        <input
          className="input"
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button className="SendButton" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
