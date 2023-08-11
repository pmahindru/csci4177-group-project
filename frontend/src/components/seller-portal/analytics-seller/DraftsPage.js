/* Created By: Parth Patel*/
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { deleteSavePostAd, getAllSavePostedAd } from "../../../api";

const DraftsPage = () => {
  const getLocalStorage = localStorage.getItem("user_info");
  const user_data = JSON.parse(getLocalStorage);
  // for drafts Ads
  const [getDraftObjects, setDraftObjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const draftAds = await getAllSavePostedAd({"user_id": user_data["_id"]});
      if (!draftAds.address) {
        setDraftObjects(draftAds);
      }
    }
    getData();
  }, [])

  const handleClickEdit = async (itemId) => {
    navigate(`/draftEdit/${itemId}`)
  }

  const handleClickDelete = async (itemId) => {
    const confirmDelete = window.confirm("Are you sure want to delete");
    if (confirmDelete) {
      const res = await deleteSavePostAd(itemId);
      if (res.response === undefined) {
          alert("Successfully deleted");
          window.location.reload();
      } 
    }
  }

  return (
    <div className="drafts-page">
      <h2 className="drafts-title">Drafts</h2>
      <div className="drafts-list">
        {getDraftObjects.length > 0 ? (
          getDraftObjects.map(item => {
            return (
              <div key={item._id} className="draft-item">
                <div className="draft-details">
                  <h3 className="draft-title">{item.title}</h3>
                </div>
                <div className="draft-actions">
                  <button className="edit-button" onClick={() => handleClickEdit(item._id)}>Edit</button>
                  <button className="delete-button" onClick={() => handleClickDelete(item._id)}>Delete</button>
                </div>
              </div>
            )})
        ) : (
          <div className="draft-item">
            There are no Save Drafts
          </div>
        )}
      </div>
      <Link to="/analytics" className="back-link">
        Back to Analytics
      </Link>
    </div>
  );
};

export default DraftsPage;
