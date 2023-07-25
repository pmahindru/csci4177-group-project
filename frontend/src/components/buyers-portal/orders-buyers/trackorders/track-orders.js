/* Created By: Patrick Wooden | 2023-June-19 */
import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { getTrackedOrders } from '../../../../api';
import "./track-orders.css";
//styling for my card, cardmedia, typography and button I use in this file
const StyledTypography = styled(Typography)({
  margin: '10px',
  fontSize: '10px',
  textAlign: 'center',
  '@media (min-width: 600px)': {
    fontSize: '12px',
    wdith: '100%',
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
  
  border: '1px solid',
  borderRadius: '16px',
  backgroundColor: 'rgb(230,230,230)',
  margin: '0 auto',
  '@media (min-width: 600px)': {
     width: '75%',
  },
  '@media (min-width: 807px)': {
    width: '75%',
  },
});

const StyledCardMedia = styled(CardMedia)({
  objectFit: "contain",
  paddingTop: "5px",
});
//TrackOrders card returns a image of the product, the price, where it was shipped and a button to write a reivew. This is done for each order in transit the user has
const TrackOrdersCard = ({ order }) => {

  const { status, address, ad_details } = order;
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
            <div>No Image Available</div>
          )}
        </Grid>
        <Grid item xs={4} md={4}>
          <StyledTypography>
            Status: {status}
          </StyledTypography>
        </Grid>
        <Grid item xs={6} md={4}>
          <StyledTypography>
            Shipping to: {address}
          </StyledTypography>
        </Grid>
      </StyledCard>
    </div>
  );
};

const TrackOrders = () => {
  const storedData = localStorage.getItem('user_info');
  const parsedData = JSON.parse(storedData);
  const user_id = parsedData._id;
  //local variable to hold the incomming data from database
  const [orders, setOrders] = useState([]);
  //useeffect to get the orders in transit the user has from the database
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const result = await getTrackedOrders(user_id);
        console.log(result.data);
        setOrders(result);
      } catch (error) {
        return error;
      }
    };

    fetchOrderHistory();
  }, [user_id]);

  return (
    <div style={{ padding: '20px' }}>
      <Grid container rowSpacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12} alignItems="center">
          <Grid container justifyContent="center">
            <h1 className="trackOrdersHeading">Track Orders</h1>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {orders.length === 0 ? (
            <div className="center-container">
              <h2 className="trackOrdersLabel">No Orders In Transit</h2>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id}>
                <TrackOrdersCard
                  order={order}
                ></TrackOrdersCard>
              </div>
            ))
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default TrackOrders;
