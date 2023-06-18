import React from 'react';
import { Grid } from '@mui/material';
import SubNavMenu from './subnav';
import '../orders-buyers/subnav.css';

const OrdersBuyers = () => {
  return (
    <>
      <div className="custom-subnav" style={{ zIndex: 100 }}>
        <SubNavMenu />
      </div>
      <div style={{ padding: '20px' }}>
        <Grid container rowSpacing={1} alignItems="center" justifyContent="center">
          {/* Add your content here */}
        </Grid>
      </div>
    </>
  );
};

export default OrdersBuyers;