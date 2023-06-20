/* Created By: Patrick Wooden | 2023-June-19 */
import React from 'react';
import { Grid, Card, CardMedia, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import car from '../images/download.jpg';
import Rating from "@mui/material/Rating";
const SingleLineTextField = () => {
  return <input type="text" style={{ width: '100%' }} />;
};

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
  flexDirection: 'column',
  padding: '15px',
  width: '100%',
  alignItems: 'center',
  marginRight: '10px',
  border: '1px solid',
  borderRadius: '16px',
  backgroundColor: 'rgb(230,230,230)',
});

const StyledCardMedia = styled(CardMedia)({
  objectFit: 'contain',
  paddingTop: '5px',
});

const StyledButton = styled(Button)({
  width: '100%',
  butonSize: 'small',
  fontSize: '10px',
  '@media (min-width: 600px)': {
    fontSize: '12px',
    buttonSize: 'medium',
  },
  '@media (min-width: 807px)': {
    fontSize: '14px',
    buttonSize: 'large',
  },
});

const CreateReviewCard = (ad) => {
  return (
    <div style={{ paddingBottom: '5px' }}>
      <StyledCard>
        <Grid item xs={4} md={8}>
          <StyledCardMedia component="img" height="auto" image={car} alt="Product Image" />
        </Grid>
        <Grid item xs={4} md={4} sx={{ margin: '10px' }}>
          <StyledTypography>
            <h3>Product Name</h3>
          </StyledTypography>
        </Grid>
        <Grid item xs={4} md={4}>
          <StyledTypography>
            <h2>Overall Rating</h2>
            <Rating defaultValue={2} precision={0.5}/>
          </StyledTypography>
        </Grid>
        <Grid item xs={5} md={6}>
          <StyledTypography>
            <h2>Add a Headline</h2>
            <SingleLineTextField />
          </StyledTypography>
        </Grid>
        <Grid item xs={5} md={6}>
          <StyledTypography>
            <h2>Add a Written Review</h2>
          </StyledTypography>
        </Grid>
        <Grid item xs={1} md={1} sx={{ marginRight: '1px' }}>
          <StyledTypography sx={{ flexGrow: 1 }}>
            <StyledButton variant="contained">Submit Review</StyledButton>
          </StyledTypography>
        </Grid>
      </StyledCard>
    </div>
  );
};

const CreateReview = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Grid container rowSpacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12} alignItems="center">
          <Grid container justifyContent="center">
            <h1> Create Review </h1>
          </Grid>
          <Grid item xs={12}>
            <CreateReviewCard />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateReview;