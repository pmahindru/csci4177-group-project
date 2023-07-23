/* Created By: Patrick Wooden | 2023-June-19 */

import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, Button, Typography } from '@mui/material';
import car from "../images/download.jpg";
import { styled } from '@mui/system';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";
import { getCart } from '../../../../api';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
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
  width: '75%',
  justifyContent: 'center',
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

const CartCard = (order) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { id, product,price} = order;
  const navigate = useNavigate();
 

  return (
    <div style={{ paddingBottom: '5px' }}>
      <StyledCard>
        <Grid item xs={4} md={4}>
          <StyledCardMedia
            component="img"
            height="auto"
            image={car}
            alt="Product Image"
          />
        </Grid>
        <Grid item xs={4} md={4} sx={{ margin: '10px' }}>
          <StyledTypography>
            {product}
          </StyledTypography>
        </Grid>
        <Grid item xs={4} md={4}>
          <StyledTypography>
            Price: {price}
          </StyledTypography>
        </Grid>
       
        <Grid item xs={1} md={1} sx={{ marginRight: '1px' }}>
          <StyledTypography sx={{ flexGrow: 1 }}>
          <MoreVertIcon onClick={handleClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleClose}>Remove from Favorites</MenuItem>
            </Menu>
          </StyledTypography>
        </Grid>
      </StyledCard>
    </div>
  );
};

const Cart =  () => {
  const storedData = localStorage.getItem('user_info');
  const parsedData = JSON.parse(storedData);
  const user_id = parsedData._id;

  const [cart, setCart] = useState([]);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const result = await getCart(user_id);
        console.log(result.data);
        setCart(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
  }, []);

  return (
    <div className="container" style={{ padding: '20px' }}>
      
          
            <h1>Cart</h1>
          
       
          
          {cart.map((item) => (
        <div key={item._id}>
      
          <CartCard
          key={item._id}
          id={item._id}
          adId ={item.ad_id}
          photoUrl={item.ad_details.image[0]}
          price={item.ad_details.price}
          product={item.ad_details.title}
          ></CartCard>
        </div>
      ))}
        
    
     
    </div>
  );
};

export default Cart;