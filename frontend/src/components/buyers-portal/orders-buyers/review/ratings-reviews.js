/* Created By: Patrick Wooden | 2023-June-19 */
import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, Button, Typography } from '@mui/material';
import CreateReview from './create-review';
import { styled } from '@mui/system';
import './ratings-reviews.css';
import { getReviews } from '../../../../api';
import Rating from '@mui/material/Rating';

//styling for my card, cardmedia, typography and button I use in this file
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
  width: '50%',
  alignItems: 'center',
  marginRight: '10px',
  border: '1px solid',
  borderRadius: '16px',
  backgroundColor: 'rgb(230,230,230)',
  margin: '0 auto'
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

//review card returns a image of the product they reviewed, the star rating they gave, the review title they left and a edit button
const ReviewCard = ({ review, handleCreateReviewOpen }) => {
  const { star_rating, ad_details } = review;
  const title = ad_details.title;
  const photoUrl = ad_details.image;

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

const Rating_Reviews = () => {
  const storedData = localStorage.getItem('user_info');
  const parsedData = JSON.parse(storedData);
  const user_id = parsedData._id;
  //local state variables used for getting users reviews and toggling the create review popup
  const [reviews, setReviews] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedAdId, setAdId] = useState('');

  //event handlers to open and close the create review component when edit is clicked
  const handleCreateReviewOpen = (adId) => {
    setAdId(adId);
    setIsCreateModalOpen(true);
  };

  const handleCreateReviewOpenClose = () => {
    setIsCreateModalOpen(false);
    window.location.reload();
  };
  // use effect getting all of the reviews the user has created
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const result = await getReviews(user_id);
        setReviews(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviews();
  }, []);

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
            <div className="center-container">
              <h2>No Reviews Created</h2>
            </div>
          ) : (
            Array.isArray(reviews) && reviews.map((review) => (
              <div key={review._id}>
                <ReviewCard
                  key={review._id}
                  review={review}
                  handleCreateReviewOpen={handleCreateReviewOpen}
                />
              </div>
            ))
          )}
          {isCreateModalOpen && (
            <div className="modalOverlay">
              <CreateReview onClose={handleCreateReviewOpenClose} selectedAdId={selectedAdId} />
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Rating_Reviews;