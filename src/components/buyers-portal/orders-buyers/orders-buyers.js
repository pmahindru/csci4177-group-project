import React from 'react';
import { Grid } from '@mui/material';
import SubNavMenu from './orders-nav';

import '../orders-buyers/orders-nav.css';
import OrderHistoryPage from './orderhistory/order-history';
import TrackOrders from './trackorders/track-orders';
import Favourites from './favourites/favourites';

const OrdersBuyers = () => {
  return (
    <>
    <div className='wrapper-div'>
                  <SubNavMenu />
            </div>
      <div className="custom-subnav" style={{ zIndex: 100 }}>
       
      </div>
      <div style={{ padding: '20px' }}>
      
      </div>
    </>
  );
};

export default OrdersBuyers;