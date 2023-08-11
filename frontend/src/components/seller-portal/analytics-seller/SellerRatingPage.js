/* Created By: Parth Patel*/
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { getAllPostedAd, getReviewWithAdId } from "../../../api";


const SellerRatingPage = () => {
  const getLocalStorage = localStorage.getItem("user_info");
  const user_data = JSON.parse(getLocalStorage);
  // for active ads
  const [getAllActivePost, setAllActivePost] = useState([]);
  // save Review
  const [getReviewObjects, setReviewObjects] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const Active_inActive = await getAllPostedAd({"user_id": user_data["_id"], "isActive": {$in: [true, false]} });
      if (!Active_inActive.address) {
        const activeArr = []
        for (let i = 0; i < Active_inActive.length; i++) {
          if (Active_inActive[i].isActive === true) {
            activeArr.push(Active_inActive[i])
          }
        }
        setAllActivePost(activeArr);

        const ReviewArray = []
        if (activeArr.length > 0) {
          for (let i = 0; i < activeArr.length; i++) {
            const getAllReview = await getReviewWithAdId(activeArr[i]._id)
            if (!getAllReview.address) {
              if (getAllReview.length > 0) {
                for (let i = 0; i < getAllReview.length; i++) {
                  if (getAllReview[i] !== undefined) {
                    ReviewArray.push(getAllReview[i]);
                  }                  
                }
              }
            }
          }
          setReviewObjects(ReviewArray); 
        }
      }
    }
    getData();
  }, [])

  return (
    <div className="seller-rating-page">
      <h2>Seller Rating</h2>
      <br/>
      {getAllActivePost.length > 0 ? (
        getAllActivePost.map(item => (
            getReviewObjects.length > 0 ? (
              getReviewObjects.map(itemReview => {
                if (item._id === itemReview.ad_id) {
                  return (
                    <>
                    <div className="sold-item" key={item._id}>
                      <h3>{item.title}</h3>
                      <div className="rating" key={itemReview.ad_id}>
                        <span className="stars">
                          {Array.from(Array(Math.floor(itemReview.star_rating)), (_, index) => (
                            <i key={index} className="fas fa-star"></i>
                          ))}
                          {itemReview.star_rating % 1 !== 0 && (
                            <i className="fas fa-star-half-alt"></i>
                          )}
                        </span>
                        <span className="rating-value">{itemReview.star_rating}</span>
                      </div>
                      <p>{itemReview.title}<br/>{itemReview.review}</p>
                  </div>
                    
                    </>
                  )
                }
              })
            ) : (
              <div className="rating">
                This Ad is Active but no review and rating available
              </div>
            )
        ))
      ) : (
        <div className="sold-item">
          There are no Ratings and Review for the post
        </div>
      )}
      <Link to="/analytics" className="back-link">
        Back to Analytics
      </Link>
    </div>
  );
};

export default SellerRatingPage;
