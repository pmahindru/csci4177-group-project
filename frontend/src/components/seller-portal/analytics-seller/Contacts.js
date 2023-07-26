//Created by Parth Patel
// Referred to the youtube video on how to use socket.io for real time commjunication and partially used the code after understanding to implement the chat feature.
// URL1: https://www.youtube.com/watch?v=otaQKODEUFs&t=13178s&ab_channel=KishanSheth
// URL2: https://github.com/koolkishan/chat-app-react-nodejs
// Date Accessed: 07/26/2023
// Used by Parth Patel
import React, { useState } from "react";

// component to display individual contacts in the contact list
function Contact({ contact, isSelected, onClick }) {
  return (
    <div
      className={`contact ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="username">
        <h3>{`${contact.firstName} ${contact.lastName}`}</h3>
      </div>
    </div>
  );
}

// Main Contacts component to display the list of contacts
export default function Contacts({ contacts, changeChat }) {
  const [currentSelected, setCurrentSelected] = useState(null);

  //Function to change the currently selected chat and trigger the chat change
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <div className="contacts-container">
      <div className="brand"></div>
      <div className="contacts">
        <h2>Chats</h2>
        {contacts.map((contact, index) => (
          <Contact
            key={contact._id}
            contact={contact}
            isSelected={index === currentSelected}
            onClick={() => changeCurrentChat(index, contact)}
          />
        ))}
      </div>
    </div>
  );
}
