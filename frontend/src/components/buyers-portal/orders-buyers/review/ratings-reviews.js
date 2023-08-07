/* Created By: Patrick Wooden | 2023-June-19 */
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import CreateReview from './create-review';
import './ratings-reviews.css';
import { getReviews } from '../../../../api';
import ResponsiveStarRatingDisplay from './star_rating';
import ImageSlider from '../image-slider';

const Rating_Reviews = () => {
  const storedData = localStorage.getItem('user_info');
  const parsedData = JSON.parse(storedData);
  const user_id = parsedData._id;
  //local state variables used for getting users reviews and toggling the create review popup
  const [reviews, setReviews] = useState([]);
  const [isCreateReviewOpen, setIsCreateReviewOpen] = useState(false);
  const [selectedAdId, setAdId] = useState('');

  //event handlers to open and close the create review component when edit is clicked
  const handleCreateReviewOpen = (adId) => {
    setAdId(adId);
    setIsCreateReviewOpen(true);
  };

  const handleCreateReviewClose = () => {
    setIsCreateReviewOpen(false);
  };
  // use effect getting all of the reviews the user has created
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const result = await getReviews(user_id);
        if (!result.address) {
          setReviews(result);
        }
        
      } catch (error) {
        return error;
      }
    };
    fetchReviews();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Grid container rowSpacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12} alignItems="center">
          <Grid container justifyContent="center">
            <h1 className="reviewHeading">Reviews</h1>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {reviews.length === 0 ? (
            <div className="center-container">
              <h2 className="reviewLabel">No Reviews Created</h2>
            </div>
          ) : (
            reviews.map((item) => {
              return(
                <ImageSlider
                    item={item}
                    handleCreateReviewOpen={handleCreateReviewOpen}
                    pageName="reviews"
                    key={item._id}
                  />
              )
             
            })
          )}
          {isCreateReviewOpen && (
            <div className="modalOverlay">
              <CreateReview onClose={handleCreateReviewClose} selectedAdId={selectedAdId} />
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Rating_Reviews;
