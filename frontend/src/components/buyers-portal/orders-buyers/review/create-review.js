/* Created By: Patrick Wooden | 2023-July-16 */
import React, { useEffect, useState } from 'react';
import "./ratings-reviews.css";
import {getReview, createReview, editReview } from '../../../../api';
import Rating from '@mui/material/Rating';
const CreateReview = ({ onClose, selectedAdId }) => {
    const storedData = localStorage.getItem('user_info');
    const parsedData = JSON.parse(storedData);
    const user_id = parsedData._id;
    const [star_rating, setRating] = useState(0);
    const ad_id = selectedAdId; 
    const [reviewId, setId] = useState('');
    const [title, setTitle] = useState('');
    const [review, setReview] = useState('');
    const [existingReview, setExistingReview] = useState(false);

    useEffect(() => {
      const fetchReview = async () => {
        try {
          
          const reviewExists = await getReview(user_id, selectedAdId);
  
          if (reviewExists) {
           
            const response = await getReview(user_id,selectedAdId);
            setRating(response.star_rating);
            setTitle(response.title);
            setReview(response.review);
            setExistingReview(true);
            setId(response._id);
            
          } else {
            
            setRating(0);
            setTitle('');
            setReview('');
            setExistingReview(false);
          }
        } catch (error) {
          console.error('Error fetching review:', error);
        }
      };
  
      fetchReview();
    }, [selectedAdId, user_id]);
    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };
  
    const handleReviewChange = (event) => {
      setReview(event.target.value);
    };

    const handleRatingChange = (event) => {
      setRating(event.target.value);
    }
  
    
  
    const handleCreateReview = async () => {
        
       
          if (!star_rating || !title || !review) {
           alert('Please fill in all fields');
           return;
          }
          try{
            const reviewData ={
              user_id,ad_id, star_rating, title, review
           };
            if (existingReview) {
              
              await editReview(reviewId,reviewData);
              alert('Review edited successfully');
              onClose();
            } else {
            
              await createReview(reviewData);
              alert('Review created successfully');
              onClose();
            }
        }catch (error) {
            alert('Failed to add payment method');
            console.error('Error adding payment method:', error);
          }
       
        
        
       
    };
  
    return (
      <div className="modalOverlay">
        <div className="modalContent">
          <h2>Create Review</h2>
          <form>
          <div className="formRow">
          <Rating name="half-rating"  precision={0.5} onClick={handleRatingChange} value={star_rating} />
          
           </div>
            <div className="formRow">
              <label >Review Title:</label>
              <input
                id="firstNameInput"
                type="text"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="formRow">
              <label >Review:</label>
              <textarea
                id="lastNameInput"
                type="text"
                rows={4}

                value={review}
                onChange={handleReviewChange}
              />
            </div>
         
            <button type="button" onClick={handleCreateReview}>
              Create Review
            </button>
            <button type="button" onClick={onClose}>
            Cancel
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default CreateReview;