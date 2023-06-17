import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import "@fortawesome/fontawesome-free/css/all.css";

const DeletePage = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    // Add more items as needed
  ]);

  const handleDelete = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <div className="delete-page">
      <h1 className="delete-title">Delete Page</h1>
      <ul className="delete-list">
        {items.map((item) => (
          <li key={item.id} className="delete-item">
            <div className="item-details">
              <h3 className="item-name">{item.name}</h3>
              <button
                className="delete-button"
                onClick={() => handleDelete(item.id)}
              >
                <i className="fas fa-trash-alt"></i> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/analytics" className="back-link">
        Back to Analytics
      </Link>
    </div>
  );
};

export default DeletePage;
