import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [pendingMessage, setPendingMessage] = useState("");
  const history = useNavigate();

  const handleChatSelection = (chat) => {
    setSelectedChat(chat);
  };

  const handleChatClose = () => {
    setSelectedChat(null);
    history("/analytics");
  };

  const handleSendMessage = () => {
    if (pendingMessage.trim() === "") {
      return;
    }

    const newMessage = {
      content: pendingMessage.trim(),
      isSent: true,
    };

    setSelectedChat((prevChat) => {
      const updatedChat = { ...prevChat };
      updatedChat.messages = [...updatedChat.messages, newMessage];
      return updatedChat;
    });

    setPendingMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const renderChatItem = (chat, index) => {
    return (
      <div
        key={index}
        className={`chat-item ${selectedChat === chat ? "active" : ""}`}
        onClick={() => handleChatSelection(chat)}
      >
        <div className="chat-item-info">
          <h4>{chat.user}</h4>
          <p>{chat.lastMessage}</p>
        </div>
      </div>
    );
  };

  const renderChatSession = () => {
    if (!selectedChat) {
      return (
        <div className="chat-session-placeholder">
          <p>Select a chat to start messaging</p>
          <button className="close-button1" onClick={handleChatClose}>
            <span className="close-icon">&#10005;</span>
          </button>
        </div>
      );
    }

    return (
      <div className="chat-session">
        <div className="chat-session-header">
          <h2>{selectedChat.user}</h2>
          <button className="close-button" onClick={handleChatClose}>
            <span className="close-icon">&#10005;</span>
          </button>
        </div>
        <div className="chat-session-messages">
          {selectedChat.messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${message.isSent ? "sent" : "received"}`}
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="chat-session-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={pendingMessage}
            onKeyDown={handleKeyDown}
            onChange={(event) => setPendingMessage(event.target.value)}
          />
          <button className="send-button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    );
  };

  // Dummy data for chat
  const chats = [
    {
      user: "John Doe",
      lastMessage: "Is this still available?",
      messages: [{ content: "Is this still available?", isSent: false }],
    },
    {
      user: "Jane Smith",
      lastMessage: "Hey, I'm interested in your product.",
      messages: [
        { content: "Hey, I'm interested in your product.", isSent: false },
      ],
    },
  ];

  return (
    <div className="chat-page">
      <div className="chat-list">
        <h2>Chats</h2>
        {chats.map((chat, index) => renderChatItem(chat, index))}
      </div>
      <div className="chat-session-container">{renderChatSession()}</div>
    </div>
  );
};

export default ChatPage;
