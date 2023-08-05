//Created by Parth Patel
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import ChatContainer from "./ChatContainer";
import Contacts from "./Contacts";

const SERVER_URL = "http://localhost:3001";
const ALL_USERS_ROUTE = "http://localhost:3001/api/allusers";

const Chat = () => {
  const navigateTo = useNavigate();
  const socketRef = useRef(null);
  const [contactList, setContactList] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if user info exists in local storage, if not, redirect to the login page
    const checkLocalStorage = async () => {
      const userInfo = localStorage.getItem("user_info");
      if (!userInfo) {
        navigateTo("/login");
      } else {
        setCurrentUser(JSON.parse(userInfo));
      }
    };

    checkLocalStorage();
  }, [navigateTo]);

  useEffect(() => {
    // Create and initialize the socket when the currentUser is available
    if (currentUser) {
      socketRef.current = io(SERVER_URL);
      socketRef.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    // Fetch the list of contacts when the currentUser is available
    const fetchContacts = async () => {
      if (currentUser) {
        const data = await axios.get(`${ALL_USERS_ROUTE}/${currentUser._id}`);
        setContactList(data.data);
      }
    };

    fetchContacts();
  }, [currentUser]);

  // Function to handle the change of the current chat
  const handleChatChange = (selectedChat) => {
    setCurrentChat(selectedChat);
  };

  return (
    <div className="chat-container">
      {/* Display the contacts list */}
      <Contacts contacts={contactList} changeChat={handleChatChange} />
      {/* Display the chat container if a chat is selected, otherwise show a message */}
      {currentChat === null ? (
        <h2 style={{ padding: "300px 500px" }}>Select a chat to begin</h2>
      ) : (
        <ChatContainer currentChat={currentChat} socket={socketRef} />
      )}
    </div>
  );
};

export default Chat;
