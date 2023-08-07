/* Created By: Patrick Wooden | 2023-June-19 */
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CreateReview from '../review/create-review';
import { getOrderHistory, getPayments } from '../../../../api';
import "./order-history.css";
import ImageSlider from '../image-slider';

const OrderHistoryPage = () => {
  const storedData = localStorage.getItem('user_info');
  const parsedData = JSON.parse(storedData);
  const user_id = parsedData._id;
  
  //local variables to get user order history and toggle the review popup
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedAdId, setAdId] = useState('');
  const [orders, setOrders] = useState([]);
  
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
  }, [sortOrder, user_id]);

  useEffect(() => {
    const fetchPayments = async () => {
      const result = await getPayments(user_id);
      if (Object.keys(result).length > 0) {
        if (!result.address) {
          console.log(result)
          setPayments(result);

           
           localStorage.setItem('payments', JSON.stringify(result));
        }
      }
    };

    fetchPayments();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Grid container rowSpacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12} alignItems="center">
          <Grid container justifyContent="center">
            <h1 className="orderHistoryHeading">Order History</h1>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div className='sort-by-style'>
              <p>Sort By</p>
              <CalendarMonthIcon onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} />
          </div>

          {orders.length === 0 ? (
            <div className="center-container">
              <h2 className="orderHistoryLabel">No Products Purchased</h2>
            </div>
          ) : (
            orders.map((item) => {
                return(
                    <ImageSlider
                      item={item}
                      handleCreateReviewOpen={handleCreateReviewOpen}
                      pageName="order-history"
                      key={item._id}
                    />
                );
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
