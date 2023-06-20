/* Created By: Patrick Wooden | 2023-June-19 */
import React from 'react';
import { Grid} from '@mui/material';

const RatingAndReviews = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Grid container rowSpacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12} alignItems="center">
          <Grid container justifyContent="center">
            <h1> Reviews </h1>
          </Grid>
          <Grid container justifyContent="center" sx={{padding: '10px'}}>
            <h2>No current Reviews at this time</h2>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default RatingAndReviews;