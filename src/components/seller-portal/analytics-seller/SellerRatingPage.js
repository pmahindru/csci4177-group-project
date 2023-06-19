import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import "@fortawesome/fontawesome-free/css/all.css";

const SellerRatingPage = () => {
  // Dummy data for sold items with reviews
  const soldItems = [
    {
      id: 1,
      name: "Item 1",
      rating: 4.5,
      review: "Great product! Highly recommended.",
    },
    {
      id: 2,
      name: "Item 2",
      rating: 3.8,
      review: "Decent product. Could be better.",
    },
  ];

  return (
    <div className="seller-rating-page">
      <h2>Seller Rating</h2>
      {soldItems.map((item) => (
        <div key={item.id} className="sold-item">
          <h3>{item.name}</h3>
          <div className="rating">
            <span className="stars">
              {Array.from(Array(Math.floor(item.rating)), (_, index) => (
                <i key={index} className="fas fa-star"></i>
              ))}
              {item.rating % 1 !== 0 && (
                <i className="fas fa-star-half-alt"></i>
              )}
            </span>
            <span className="rating-value">{item.rating}</span>
          </div>
          <p>{item.review}</p>
        </div>
      ))}
      <Link to="/analytics" className="back-link">
        Back to Analytics
      </Link>
    </div>
  );
};

export default SellerRatingPage;
