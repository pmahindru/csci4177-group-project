/* Created By: Patrick Wooden | 2023-June-19 */
import React, { useState } from 'react';
import { Grid, Card, CardMedia, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import car from '../images/download.jpg';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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
  objectFit: 'contain',
  paddingTop: '5px',
});



const FavouritesCard = (ad) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { product, status, address, photoUrl } = ad;

  return (
    <div style={{ paddingBottom: '5px' }}>
      <StyledCard>
        <Grid item xs={4} md={4}>
          <StyledCardMedia component="img" height="auto" image={car} alt="Product Image" />
        </Grid>
        <Grid item xs={4} md={4} sx={{ margin: '10px' }}>
          <StyledTypography>
            <p>{product}</p>
          </StyledTypography>
        </Grid>
        <Grid item xs={4} md={4}>
          <StyledTypography>
            <p>Status: {status}</p>
          </StyledTypography>
        </Grid>
        <Grid item xs={5} md={6}>
          <StyledTypography>
            <p> Seller: {address}</p>
          </StyledTypography>
        </Grid>
        <Grid item xs={1} md={1} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
          <div style={{ position: 'relative', top: 0, right: 0 }}>
            <MoreVertIcon onClick={handleClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleClose}>Remove from Favorites</MenuItem>
            </Menu>
          </div>
        </Grid>
      </StyledCard>
    </div>
  );
};

const Favourites = () => {
  const ads = [
    {
      id: 1,
      product: 'Car',
      photoUrl: 'https://',
      adstatus: 'Active',
      seller: 'YoungMark',
    },
    {
      id: 2,
      product: 'bat',
      photoUrl: '',
      adstatus: 'Removed',
      seller: 'Kevin23',
    },
    {
      id: 2,
      product: 'Bike',
      photoUrl: '',
      adstatus: 'Paused',
      seller: 'Bobby346',
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Grid container rowSpacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12} alignItems="center">
          <Grid container justifyContent="center">
            <h1> Favourites </h1>
          </Grid>
        </Grid>
        {ads.map((ad) => (
          <Grid item xs={12} md={12}>
            <FavouritesCard key={ad.id} product={ad.product} status={ad.adstatus} address={ad.seller} photo={ad.photoUrl} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Favourites;