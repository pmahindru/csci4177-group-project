/* Created By: Parth Patel*/
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const DraftsPage = () => {
  const [drafts] = useState([
    {
      id: 1,
      title: "Draft 1",
      createdDate: "2023-06-15",
    },
    {
      id: 2,
      title: "Draft 2",
      createdDate: "2023-06-14",
    },
  ]);

  return (
    <div className="drafts-page">
      <h2 className="drafts-title">Drafts</h2>
      <div className="drafts-list">
        {drafts.map((draft) => (
          <div key={draft.id} className="draft-item">
            <div className="draft-details">
              <h3 className="draft-title">{draft.title}</h3>
              <p className="draft-created-date">Created: {draft.createdDate}</p>
            </div>
            <div className="draft-actions">
              <button className="edit-button">Edit</button>
              <button className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <Link to="/analytics" className="back-link">
        Back to Analytics
      </Link>
    </div>
  );
};

export default DraftsPage;
