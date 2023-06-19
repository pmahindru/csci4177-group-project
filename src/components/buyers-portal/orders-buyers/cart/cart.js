/* Created By: Patrick Wooden | 2023-June-19 */
import React from 'react';
import { Grid} from '@mui/material';

const Cart = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Grid container rowSpacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12} alignItems="center">
         
          <Grid container justifyContent="center" sx={{padding: '10px'}}>
            <h2>Your Cart is Empty</h2>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cart;