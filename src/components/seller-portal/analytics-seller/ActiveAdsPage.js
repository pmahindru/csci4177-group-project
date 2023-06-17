import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import "@fortawesome/fontawesome-free/css/all.css";

const ActiveAdsPage = () => {
  // Dummy data for active ads
  const activeAds = [
    {
      id: 1,
      title: "Item 1",
      status: "Active",
    },
    {
      id: 2,
      title: "Item 2",
      status: "Active",
    },
    // Add more active ads
  ];

  return (
    <div className="active-ads-page">
      <h2 className="active-ads-title">Active Ads</h2>
      <div className="active-ads-list">
        {activeAds.map((ad) => (
          <div key={ad.id} className="ad-item">
            <h3 className="ad-title">{ad.title}</h3>
            <p className="ad-status">Status: {ad.status}</p>
          </div>
        ))}
      </div>
      <Link to="/analytics" className="back-link">
        Back to Analytics
      </Link>
    </div>
  );
};

export default ActiveAdsPage;
