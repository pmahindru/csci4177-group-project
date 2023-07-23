/* Created By: Patrick Wooden | 2023-June-19 */
import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, Typography } from '@mui/material';
import CreateReview from './create-review';
import { styled } from '@mui/system';
import './ratings-reviews.css';
import { getReviews } from '../../../../api';
import ResponsiveStarRatingDisplay from './star_rating';

//styling for my card, cardmedia, typography and button I use in this file
const StyledTypography = styled(Typography)({
  margin: '10px',
  fontSize: '10px',
  textAlign: 'center',
  justifyContent: 'center',
  display: 'flex', 
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
  margin: '0 auto'
});

const StyledCardMedia = styled(CardMedia)({
  objectFit: "contain",
  paddingTop: "5px",
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
          {photoUrl && photoUrl.length > 0 ? (
              <StyledCardMedia
                component="img"
                height="auto"
                image={photoUrl[0]}
                alt="Product Image"
              />
            ) : (
              <div className="reviewLabel">No Image Available</div>
            )}
        </Grid>
        <Grid item xs={2} md={2}>
          <StyledTypography>
            {title}
          </StyledTypography>
        </Grid>
        <Grid item xs={4} md={4} sx={{ margin: '10px' }}>
          <StyledTypography>
            
             <ResponsiveStarRatingDisplay value={parseInt(star_rating)}  /> 
            
          </StyledTypography>
        </Grid>
        
        <Grid item xs={2} md={2} sx={{ marginLeft: '1px', justifyContent: 'flex-end',  display: 'flex' }}>
          <StyledTypography sx={{ flexGrow: 1 }}>
          <button className="responsive-button" type="button" onClick={() => handleCreateReviewOpen(ad_details._id)}> Edit</button>
            
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
  const [isCreateReviewOpen, setIsCreateReviewOpen] = useState(false);
  const [selectedAdId, setAdId] = useState('');

  //event handlers to open and close the create review component when edit is clicked
  const handleCreateReviewOpen = (adId) => {
    setAdId(adId);
    setIsCreateReviewOpen(true);
  };

  const handleCreateReviewClose = () => {
    setIsCreateReviewOpen(false);
    window.location.reload();
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
            reviews.map((review) => {
              return(
                <div key={review._id}>
                  <ReviewCard
                    key={review._id}
                    review={review}
                    handleCreateReviewOpen={handleCreateReviewOpen}
                  />
                </div>
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