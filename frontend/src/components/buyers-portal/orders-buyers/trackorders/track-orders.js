/* Created By: Patrick Wooden | 2023-June-19 */
import React from 'react';
import { Grid, Card,CardMedia, Typography } from '@mui/material';
import car from "../images/download.jpg";
import { styled } from '@mui/system';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

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


const TrackOrdersCard = (order) => {
    const{product, status, address} = order;
    return (
      
      <div style={{ paddingBottom: '5px' }}>
          <StyledCard >
            <Grid item xs={4} md={4}>
              <StyledCardMedia
                component="img"
                height="auto"
                image={car}
                alt="Product Image"
              />
            </Grid>
            <Grid item xs={4} md={4} sx={{margin: '10px'}}>
              <StyledTypography >
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
                <p> Expected Arrival Date: {address}</p>
              </StyledTypography>
            </Grid>
          </StyledCard>
        
      </div>
    );
  };
  

const TrackOrders = () => {
  const orders = [
    {
      id: 1,
      product: 'Car',
      photoUrl: '',
      status: 'Ordered',
      expecteddate: 'June 19th',
    },
    {
      id: 2,
      product: 'Bat',
      photoUrl: '',
      status: 'In Transit',
      expecteddate: 'July 20th',
    },
    {
        id: 3,
        product: 'Bike',
        photoUrl: '',
        status: 'In Transit',
        expecteddate: 'June 20th',
      },
  ];

  return (
    <div style={{ padding: '20px' }}>
        <Grid container rowSpacing={1} alignItems="center" justifyContent="center">
          <Grid item xs={12} alignItems="center">
            <Grid container justifyContent="center">
              <h1>Track Orders</h1>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" style={{ display: 'flex', alignItems: 'center' }}>
              <span>Order by Arrival Date</span>
              <CalendarMonthIcon style={{ marginLeft: '5px' }} />
            </Typography>
          </Grid>
          {orders.map((order) => (
            <Grid item xs={12} md={12}>

              <TrackOrdersCard key={order.id} product={order.product} status={order.status} address={order.expecteddate} photo={order.photoUrl} />
            </Grid>
          ))}

        </Grid>
      </div>
  );
};

export default TrackOrders;