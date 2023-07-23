/* Created By: Patrick Wooden | 2023-June-19 */
import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/system';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CreateReview from '../review/create-review';
import { getOrderHistory, getPayments } from '../../../../api';
import "./order-history.css";

//styling for my card, cardmedia, typography and button I use in this file
const StyledTypography = styled(Typography)({
  marginRight: '10px',
  fontSize: '10px',
  textAlign: "center",
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
  marginBottom: '10px',
  border: '1px solid',
  borderRadius: '16px',
  backgroundColor: 'rgb(230,230,230)',
});

const StyledCardMedia = styled(CardMedia)({
  objectFit: "contain",
  paddingTop: "5px",
});


//order history card returns a image of the product, the price, where it was shipped and a button to write a reivew. This is done for each order the user has
const OrderHistoryCard = ({ order, handleCreateReviewOpen }) => {
  const { address,  ad_details } = order;
  const price = `$${ad_details.price}`;
  const photoUrl = ad_details.image;

  return (
    <div style={{ paddingBottom: '5px' }}>
      <StyledCard>
        <Grid item xs={3} md={4}>
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
       
        <Grid item xs={3} md={4}>
          <StyledTypography>
            Total: {price}
          </StyledTypography>
        </Grid>
        <Grid item xs={4} md={6}>
          <StyledTypography>
            Shipped to: {address}
          </StyledTypography>
        </Grid>
        <Grid item xs={2} md={2} sx={{ marginRight: '1px' }}>
          <StyledTypography sx={{ flexGrow: 1 }}>
            <button className="responsive-button" type="button" onClick={() => handleCreateReviewOpen(ad_details._id)}> Review</button>
            
          </StyledTypography>
        </Grid>
      </StyledCard>
    </div>
  );
};

const OrderHistoryPage = () => {
  const storedData = localStorage.getItem('user_info');
  const parsedData = JSON.parse(storedData);
  const user_id = parsedData._id;
  
  //local variables to get user order history and toggle the review popup
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedAdId, setAdId] = useState('');
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  //event handlers to update locat states when review button is clicked
  const handleCreateReviewOpen = (adId) => {
    setAdId(adId);
    
    setIsCreateModalOpen(true);
  };

  const handleCreateReviewClose = () => {
    setIsCreateModalOpen(false);
  };

  //use effect gets and sorts order history of user
  useEffect(() => {
    const fetchOrderHistory = async () => {
        const result = await getOrderHistory(user_id);
        if (Object.keys(result).length > 0) {
          if (!result.address) {
            const sortedData = result.sort((a,b) => {
              if (sortOrder === 'desc') {
                return new Date(a.date_purchased) - new Date(b.date_purchased);
              } else {
                return new Date(b.date_purchased) - new Date(a.date_purchased);
              }
            });
            setOrders(sortedData);
          }
        }
    };

    fetchOrderHistory();
  }, [sortOrder]);

  return (
    <div style={{ padding: '20px' }}>
      <Grid container rowSpacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12} alignItems="center">
          <Grid container justifyContent="center">
            <h1 className="orderHistoryHeading">Order History</h1>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" style={{ display: 'flex', alignItems: 'center' }}>
            <p className="orderHistoryLabel">Order by Date</p>
            <CalendarMonthIcon style={{ marginLeft: '5px'}} onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} />
          </Typography>
          {orders.length === 0 ? (
            <div className="center-container">
              <h2 className="orderHistoryLabel">No Products Purchased</h2>
            </div>
          ) : (
            orders.map((order) => {
              return(
                <div key={order._id}>
                  <OrderHistoryCard
                    order={order}
                    handleCreateReviewOpen={handleCreateReviewOpen}
                  ></OrderHistoryCard>
              </div>
              )
              
              })
          )}
          {isCreateModalOpen && (
        <div className="modalOverlay">
          <CreateReview onClose={handleCreateReviewClose} selectedAdId={selectedAdId}/>
        </div>
      )}
        </Grid>
    
      </Grid>
    </div>
  );
};

export default OrderHistoryPage;
