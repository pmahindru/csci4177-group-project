//Created by Parth Patel
import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ChatContainer({ currentChat, socket }) {
  const sendMessageRoute = "http://localhost:3001/api/addmsg";
  const receiveMessageRoute = "http://localhost:3001/api/getmsg";

  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const history = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("user_info"));
        const response = await axios.post(receiveMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (currentChat) {
      fetchMessages();
    }
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(localStorage.getItem("user_info"))._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = JSON.parse(localStorage.getItem("user_info"));
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });

    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  });

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChatClose = () => {
    history("/analytics");
  };

  return (
    <div className="message-container">
      <div className="chat-header">
        <div className="user-details">
          <div className="username">
            <h3>{currentChat.firstName + " " + currentChat.lastName}</h3>
          </div>
        </div>
        <button className="close-button1" onClick={handleChatClose}>
          <span className="close-icon">&#10005;</span>
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={uuidv4()}>
            {" "}
            <div
              className={`message ${message.fromSelf ? "sended" : "received"}`}
            >
              <div className="content">
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={scrollRef}></div>
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}
