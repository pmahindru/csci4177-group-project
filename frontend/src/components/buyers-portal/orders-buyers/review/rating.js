import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

const ResponsiveStarRating = ({ value, handleRatingChange}) => {

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Rating name="responsive-rating" value={value} precision={0.5} onClick={handleRatingChange}sx={{
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

export default ResponsiveStarRating;