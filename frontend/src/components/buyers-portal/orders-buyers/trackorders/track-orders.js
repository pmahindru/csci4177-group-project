/* Created By: Patrick Wooden | 2023-June-19 */
import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, Button, Typography } from '@mui/material';
import car from "../images/download.jpg";
import { styled } from '@mui/system';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CreateReview from '../review/create-review';
import { getTrackedOrders } from '../../../../api';
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
  width: '75%',
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



const OrderHistoryCard = ({order}) => {

  const { address,  ad_details } = order;
  const price = `$${ad_details.price}`;
  const photoUrl = ad_details.image;
  console.log(photoUrl[0]);
  const [selectedAdId, setAdId] = useState('');
  
  

  return (
    <div style={{ paddingBottom: '5px' }}>
      <StyledCard>
        <Grid item xs={3} md={3}>
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
       
        <Grid item xs={3} md={3}>
          <StyledTypography>
            Status: {price}
          </StyledTypography>
        </Grid>
        <Grid item xs={3} md={3}>
          <StyledTypography>
            Shipping to: {address}
          </StyledTypography>
        </Grid>
        <Grid item xs={3} md={3}>
          <StyledTypography>
            Shipping to: {address}
          </StyledTypography>
        </Grid>
      </StyledCard>
    </div>
  );
};

const OrderHistoryPage =  () => {
  const storedData = localStorage.getItem('user_info');
  const parsedData = JSON.parse(storedData);
  const user_id = parsedData._id;
 
  
  
  

 

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const result = await getTrackedOrders(user_id);
        console.log(result.data);   
        setOrders(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Grid container rowSpacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12} alignItems="center">
          <Grid container justifyContent="center">
            <h1>Order History</h1>
          </Grid>
        </Grid>
        <Grid item xs={12}>
        
          {orders.length === 0 ? (
            <p>No bought orders</p>
          ) : (
            orders.map((order) => (
              <div key={order._id}>
                
                <OrderHistoryCard
                   order={order}
                   
                ></OrderHistoryCard>
              </div>
            ))
          )}
          
        </Grid>
    
      </Grid>
    </div>
  );
};

export default OrderHistoryPage;