/* Created By: Patrick Wooden | 2023-June-19 */
import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { getTrackedOrders } from '../../../../api';
import "./track-orders.css";
import ImageSlider from '../image-slider';

const TrackOrders = () => {
  const storedData = localStorage.getItem('user_info');
  const parsedData = JSON.parse(storedData);
  const user_id = parsedData._id;
  //local variable to hold the incomming data from database
  const [orders, setOrders] = useState([]);

  //useffect to get the orders in transit the user has from the database
  useEffect(() => {
    const fetchOrderHistory = async () => {
       const result = await getTrackedOrders(user_id);
        if (Object.keys(result).length > 0) {
          if (!result.address) {
            setOrders(result);
          }
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
            orders.map((item) => {
                return(
                    <ImageSlider
                      item={item}
                      handleCreateReviewOpen=""
                      pageName="track-orders"
                     key={item._id}
                    />
                );
            })
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default TrackOrders;
