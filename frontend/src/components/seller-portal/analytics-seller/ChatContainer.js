// Created by Parth Patel
import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ChatContainer({ currentChat, socket }) {
  // API routes for sending and receiving messages
  const sendMessageRoute = "https://csci4177-group-project-backend.onrender.com/api/addmsg";
  const receiveMessageRoute = "https://csci4177-group-project-backend.onrender.com/api/getmsg";

  // State to store the chat messages and handle scroll
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  // State to handle incoming messages
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const history = useNavigate();

  // Fetch messages from the server for the current chat
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

  // Get the current chat user id
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

    const updatedMessages = [...messages];
    updatedMessages.push({ fromSelf: true, message: msg });
    setMessages(updatedMessages);
  };

  // Listen for incoming messages through the socket
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  // Update messages state when a new message arrives
  useEffect(() => {
    arrivalMessage &&
      setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
  }, [arrivalMessage]);

  // Scroll to the latest message when the messages change
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to handle closing the chat
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
        {messages.map((message) => (
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
