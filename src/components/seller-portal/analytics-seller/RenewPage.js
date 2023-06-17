import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import "@fortawesome/fontawesome-free/css/all.css";

const RenewPage = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Item 1", renewed: false },
    { id: 2, name: "Item 2", renewed: false },
    { id: 3, name: "Item 3", renewed: false },
    // Add more items as needed
  ]);

  const handleRenew = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, renewed: true } : item
      )
    );
  };

  return (
    <div className="renew-page">
      <h1 className="renew-title">Renew Page</h1>
      <ul className="renew-list">
        {items.map((item) => (
          <li key={item.id} className="renew-item">
            <div className="item-details">
              <h3 className="item-name">{item.name}</h3>
              {item.renewed ? (
                <p className="renewed-text">
                  Renewed on {new Date().toLocaleDateString()}
                </p>
              ) : (
                <button
                  className="renew-button"
                  onClick={() => handleRenew(item.id)}
                >
                  Renew
                </button>
              )}
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

export default RenewPage;
