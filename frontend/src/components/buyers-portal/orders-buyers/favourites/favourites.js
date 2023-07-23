/* Created By: Patrick Wooden | 2023-June-19 */
import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, Button, Typography } from '@mui/material';
import car from "../images/download.jpg";
import { styled } from '@mui/system';

import { useNavigate } from "react-router-dom";
import { getFavourites } from '../../../../api';
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
  justifyContent: 'center', 
  alignItems: 'center', 
  position: 'absolute',
  top: '50%',
  left: '50%', 
  transform: 'translate(-50%, -50%)',
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

const OrderHistoryCard = (order) => {
  const { id, product,price, address, photoUrl } = order;
  const navigate = useNavigate();
  const handleClick = (event) => {
    navigate("/createreview", { state: { id: id, product: product, photoUrl: photoUrl } });
  };

  return (
    <div style={{ paddingBottom: '5px' }}>
      <StyledCard>
        <Grid item xs={4} md={4}>
          <StyledCardMedia
            component="img"
            height="auto"
            image={car}
            alt="Product Image"
          />
        </Grid>
        <Grid item xs={4} md={4} sx={{ margin: '10px' }}>
          <StyledTypography>
            {product}
          </StyledTypography>
        </Grid>
        <Grid item xs={4} md={4}>
          <StyledTypography>
            Price: {price}
          </StyledTypography>
        </Grid>
        <Grid item xs={5} md={6}>
          <StyledTypography>
            Shipped to: {address}
          </StyledTypography>
        </Grid>
        <Grid item xs={1} md={1} sx={{ marginRight: '1px' }}>
          <StyledTypography sx={{ flexGrow: 1 }}>
            <StyledButton variant="contained" onClick={handleClick}>Review</StyledButton>
          </StyledTypography>
        </Grid>
      </StyledCard>
    </div>
  );
};

const Favourites =  () => {
  const storedData = localStorage.getItem('user_info');
  const parsedData = JSON.parse(storedData);
  const user_id = parsedData._id;

  const [favourites, setFavourites] = useState([]);
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const result = await getFavourites(user_id);
        console.log(result.data);
        setFavourites(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavourites();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Grid container rowSpacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12} alignItems="center">
          <Grid container justifyContent="center">
            <h1>Favourites</h1>
          </Grid>
        </Grid>
        <Grid item xs={12}>
        
          {favourites.map((favourite) => (
        <div key={favourite._id}>
          
          <OrderHistoryCard
          key={favourite._id}
          id={favourite._id}
          adId ={favourite.ad_id}
          photoUrl={favourite.ad_details.image[0]}
          price={favourite.ad_details.price}
          product={favourite.ad_details.title}
            ></OrderHistoryCard>
        </div>
      ))}
        </Grid>
    
      </Grid>
    </div>
  );
};

export default Favourites;