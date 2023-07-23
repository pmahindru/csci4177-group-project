/* Created By: Patrick Wooden | 2023-June-19 */
import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, Button, Typography } from '@mui/material';
import car from "../images/download.jpg";
import CreateReview from './create-review';
import { styled } from '@mui/system';
import './ratings-reviews.css';
import { getReviews } from '../../../../api';
import Rating from '@mui/material/Rating';
const StyledTypography = styled(Typography)({
  margin: '10px',
  fontSize: '10px',
  '@media (min-width: 600px)': {
    fontSize: '14px',
  },
  '@media (min-width: 807px)': {
    fontSize: '18px',
  },
});

const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'row',
  padding: '15px',
  width: '100%',
  alignItems: 'center',
  marginRight: '10px',
  border: '1px solid',
  borderRadius: '16px',
  backgroundColor: 'rgb(230,230,230)',
});

const StyledCardMedia = styled(CardMedia)({
  objectFit: "contain",
  paddingTop: "5px",
});

const StyledButton = styled(Button)({
  width: '25%',
  butonSize: 'small',
  fontSize: '10px',
  '@media (min-width: 600px)': {
    fontSize: '10px',
    buttonSize: 'medium',
  },
  '@media (min-width: 807px)': {
    fontSize: '12px',
    buttonSize: 'large',
  },
});

const ReviewCard = ({review, handleCreateReviewOpen}) => {
  const { _id, star_rating, reviewText, ad_details} = review;
  const title = ad_details.title;
  const photoUrl = ad_details.image
  
 
  

  return (
    <div style={{ paddingBottom: '5px' }}>
      <StyledCard>
        <Grid item xs={4} md={4}>
          <StyledCardMedia
            component="img"
            height="auto"
            image={photoUrl[0]}
            alt="Product Image"
          />
        </Grid>
        <Grid item xs={4} md={4} sx={{ margin: '10px' }}>
          <StyledTypography>
          <Rating name="half-rating-read" defaultValue={star_rating} precision={0.5} readOnly />
          </StyledTypography>
        </Grid>
        <Grid item xs={4} md={4}>
          <StyledTypography>
            Title: {title}
          </StyledTypography>
        </Grid>
     
        <Grid item xs={1} md={1} sx={{ marginRight: '1px' }}>
          <StyledTypography sx={{ flexGrow: 1 }}>
            <StyledButton variant="contained" onClick={() => handleCreateReviewOpen(ad_details._id)}>Edit</StyledButton>
          </StyledTypography>
        </Grid>
      </StyledCard>
    </div>
  );
};

const Rating_Reviews =  () => {
  const storedData = localStorage.getItem('user_info');
  const parsedData = JSON.parse(storedData);
  const user_id = parsedData._id;
  const [reviews, setReviews] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedAdId, setAdId] = useState('');
  const handleCreateReviewOpen = (adId) => {
    setAdId(adId);
    console.log(selectedAdId);
    setIsCreateModalOpen(true);
  };

  const handleCreateReviewOpenClose = () => {
    setIsCreateModalOpen(false);
  };

  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const result = await getReviews(user_id);
        console.log(result.data);
        setReviews(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [selectedAdId]);

  return (
    <div style={{ padding: '20px' }}>
      <Grid container rowSpacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12} alignItems="center">
          <Grid container justifyContent="center">
            <h1>Reviews</h1>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          
          {reviews.length === 0 ? (
            //this checks to see if there are any reviews the user has made. If there is not then a message saying that there are no reviews is displayed
            <div className="center-container">
                <h2>No Reviews Created</h2>
            </div>
            
          ) : (
            reviews.map((review) => (
              //if there are reviews each one is mapped through and displayed in a Review Card
              <div key={review._id}>
                
                <ReviewCard
                  key={review._id}
                  review={review}
                  handleCreateReviewOpen={handleCreateReviewOpen}
                ></ReviewCard>
              </div>
            ))
          )}
          {isCreateModalOpen && (
        <div className="modalOverlay">
          <CreateReview onClose={handleCreateReviewOpenClose} selectedAdId={selectedAdId}/>
        </div>
      )}
        </Grid>
    
      </Grid>
    </div>
  );
};

export default Rating_Reviews;