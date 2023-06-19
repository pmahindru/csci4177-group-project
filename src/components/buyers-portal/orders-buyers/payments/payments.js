import React from 'react';
import { Grid} from '@mui/material';

const AccountPayments = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Grid container rowSpacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12} alignItems="center">
          <Grid container justifyContent="center">
            <h1> Payments </h1>
          </Grid>
          <Grid container justifyContent="center" sx={{padding: '10px'}}>
            <h2>No Payment Methods Saved on this Account Currently</h2>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AccountPayments;