/* Created By: Parth Patel*/
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import React, { useState, useEffect } from "react";
import { getAllPostedAd } from "../../../api";
import ReactLoading from "react-loading";

const ActiveAdsPage = () => {
  const [getArrayObjects, setArrayObjects] = useState([]);
  const getLocalStorage = localStorage.getItem("user_info");
  const user_data = JSON.parse(getLocalStorage);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const getData = async () => {
          const res = await getAllPostedAd({"user_id": user_data["_id"], "isActive": true});
          if (!res.address) {
              setArrayObjects(res);
              setLoading(false);
          }
      }
      getData();
  }, [])

  const navigate = useNavigate();
  const handleClickActive = () => {
    navigate("/business_orders#Active");
    window.location.reload();
  }

  return (
    <div className="active-ads-page">
      <h2 className="active-ads-title">Active Ads</h2>
      <div className="active-ads-list">
        {loading ? (
            <div className='preview-loading'>
                <ReactLoading type="bars" color="#3f1a6b" height={100} width={50}/>
            </div>
        ) : (
          getArrayObjects.length > 0 ? (
            getArrayObjects.map((ad) => {
              return (
                <div key={ad._id} className="ad-item">
                  <Link className="link-unstyled" onClick={() => handleClickActive(ad._id)}>
                      <h3 className="ad-title">{ad.title}</h3>
                      <h4 className="ad-title">{ad.description}</h4>
                      <p className="ad-status">Status: {ad.status}</p>
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="ad-item">
              <h3 className="ad-title">There are no Active Ads</h3>
            </div>
          )
        )}
      </div>
      <Link to="/analytics" className="back-link">
        Back to Analytics
      </Link>
    </div>
  );
};

export default ActiveAdsPage;
