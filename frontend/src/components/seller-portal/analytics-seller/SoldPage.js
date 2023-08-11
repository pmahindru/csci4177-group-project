/* Created By: Parth Patel*/
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const SoldPage = () => {
  // Dummy data for sold items
  const soldItems = [];

  return (
    <div className="sold-page">
      <h2 className="sold-title">Sold & Out of Stock</h2>
      <div className="sold-list">
        {soldItems.length > 0 ? (
            soldItems.map((item) => (
            <div key={item.id} className="sold-item">
              <h3 className="item-title">{item.title}</h3>
              <p className="sold-date">Sold Date: {item.soldDate}</p>
            </div>
          ))
        ) : (
          <div className="sold-item">
            <h3 className="item-title">No sold Item found</h3>
          </div>
        )}
      </div>
      <Link to="/analytics" className="back-link">
        Back to Analytics
      </Link>
    </div>
  );
};

export default SoldPage;
