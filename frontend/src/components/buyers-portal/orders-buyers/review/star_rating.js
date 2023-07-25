//created by Patrick Wooden July 25th
import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

//This returns a modified rating from material ui, making it responsive
const ResponsiveStarRatingDisplay = ({ value}) => {

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Rating name="responsive-rating" value={value} precision={0.5} readOnly sx={{
        fontSize: '10px',
        '@media (min-width: 600px)': {
          fontSize: '20px', 
        },
        '@media (min-width: 600px)': {
          fontSize: '20px', 
        },
        '@media (min-width: 807px)': {
          fontSize: '26px', 
        },
      }}/>
    </Box>
  );
};

export default ResponsiveStarRatingDisplay;