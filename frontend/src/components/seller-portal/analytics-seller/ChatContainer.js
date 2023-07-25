import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
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
      const data = JSON.parse(localStorage.getItem("user_info"));
      const response = await axios.post(receiveMessageRoute, {
        from: data._id,
        to: currentChat._id,
      });
      setMessages(response.data);
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

    const newMessage = { fromSelf: true, message: msg };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

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
    <Container>
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
            {/* Apply "key" to the top-level element */}
            <div
              className={`message ${message.fromSelf ? "sended" : "received"}`}
            >
              <div className="content">
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={scrollRef}></div> {/* Empty div for scrolling to bottom */}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  border: 1px solid #ccc;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }

  .close-button1 {
    position: absolute;
    top: 70px;
    right: 40px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    background-color: #f2f2f2;
    color: black;
    font-size: 20px;
    font-weight: bold;
  }

  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    border-top: 1px solid #ccc; /* Add border between header and messages */
    border-bottom: 1px solid #ccc; /* Add border between messages and input */
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: black;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }

    .sended {
      justify-content: flex-end;
      .content {
        background-color: #007bff;
        color: white;
      }
    }

    .received {
      justify-content: flex-start;
      .content {
        background-color: #f2f2f2;
      }
    }
  }
`;
