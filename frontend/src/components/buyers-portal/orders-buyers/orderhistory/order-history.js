/* Created By: Patrick Wooden | 2023-June-19 */
import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CreateReview from '../review/create-review';
import { getOrderHistory } from '../../../../api';
import "./order-history.css";
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

const OrderHistoryCard = ({order, handleCreateReviewOpen}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { id, address,  ad_details } = order;
  const price = `$${ad_details.price}`;
  const photoUrl = ad_details.image;
  console.log(photoUrl[0]);
  const [selectedAdId, setAdId] = useState('');
  
  

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
            Total: {price}
          </StyledTypography>
        </Grid>
        <Grid item xs={5} md={6}>
          <StyledTypography>
            Shipped to: {address}
          </StyledTypography>
        </Grid>
        <Grid item xs={1} md={1} sx={{ marginRight: '1px' }}>
          <StyledTypography sx={{ flexGrow: 1 }}>
            <StyledButton variant="contained" onClick={() => handleCreateReviewOpen(ad_details._id)}>Review</StyledButton>
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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('desc');
  
  
  const [selectedAdId, setAdId] = useState('');
  const handleCreateReviewOpen = (adId) => {
    setAdId(adId);
    console.log(selectedAdId);
    setIsCreateModalOpen(true);
  };

  const handleCreateReviewClose = () => {
    setIsCreateModalOpen(false);
  };

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const result = await getOrderHistory(user_id);
        console.log(result.data);

        const sortedData = result.sort((a,b) => {
          if (sortOrder === 'desc') {
            return new Date(a.date_purchased) - new Date(b.date_purchased);
          } else {
            return new Date(b.date_purchased) - new Date(a.date_purchased);
          }
        });
        setOrders(sortedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrderHistory();
  }, [sortOrder]);

  return (
    <div style={{ padding: '20px' }}>
      <Grid container rowSpacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12} alignItems="center">
          <Grid container justifyContent="center">
            <h1>Order History</h1>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" style={{ display: 'flex', alignItems: 'center' }}>
            <span>Order by Date</span>
            <CalendarMonthIcon style={{ marginLeft: '5px' }} onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} />
          </Typography>
          {orders.length === 0 ? (
            <div className="center-container">
            <h2>No Products Purchased</h2>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id}>
                
                <OrderHistoryCard
                   order={order}
                   handleCreateReviewOpen={handleCreateReviewOpen}
                ></OrderHistoryCard>
              </div>
            ))
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