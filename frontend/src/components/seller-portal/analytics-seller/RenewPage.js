/* Created By: Parth Patel*/
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { getAllPostedAd, pausePostAd } from "../../../api";

const RenewPage = () => {
  const getLocalStorage = localStorage.getItem("user_info");
  const user_data = JSON.parse(getLocalStorage);
  // for active ads
  const [getAllActivePost, setInActivePost] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const Active_inActive = await getAllPostedAd({"user_id": user_data["_id"], "isActive": {$in: [true, false]} });
      if (!Active_inActive.address) {
        const inActiveArr = []
        for (let i = 0; i < Active_inActive.length; i++) {
          if (Active_inActive[i].isActive === false) {
            inActiveArr.push(Active_inActive[i])
          }
        }
        setInActivePost(inActiveArr);
      }
    }
    getData();
  }, [])

  const handleRenew = async (itemId) => {
    await pausePostAd({"_id": itemId, "page": ""});
    alert("Update Successfully")
    window.location.reload();
  }

  return (
    <div className="renew-page">
      <h1 className="renew-title">Renew Page</h1>
      <ul className="renew-list">
        {getAllActivePost.length > 0 ? (
          getAllActivePost.map(item => {
            return (
              <li key={item._id} className="renew-item">
                <div className="item-details">
                  <h3 className="item-name">{item.title}</h3>
                  <button className="renew-button" onClick={() => handleRenew(item._id)}>
                      Renew
                    </button>
                </div>
              </li>
            )})
        ) : (
          <li className="renew-item">
            <div className="item-details">
              <h3 className="item-name">There are no InActive Ads</h3>
            </div>
          </li>
        )}

        {/* {items.map((item) => (
          
        ))} */}
      </ul>
      <Link to="/analytics" className="back-link">
        Back to Analytics
      </Link>
    </div>
  );
};

export default RenewPage;
