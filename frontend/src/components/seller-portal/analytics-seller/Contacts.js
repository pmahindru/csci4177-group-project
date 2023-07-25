//Created by Parth Patel
import React, { useState } from "react";

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

export default function Contacts({ contacts, changeChat }) {
  const [currentSelected, setCurrentSelected] = useState(null);

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
