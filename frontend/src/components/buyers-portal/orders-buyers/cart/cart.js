/* Created By: Patrick Wooden | 2023-June-19 */
import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, Button, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/system';
import { getCart, deleteCartItem } from '../../../../api';
import "./cart.css";
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
  alignItems: 'center',
  border: '1px solid',
  borderRadius: '16px',
  backgroundColor: 'rgb(230,230,230)',
  margin: '0 auto'
});
const StyledCardMedia = styled(CardMedia)({
  objectFit: "contain",
  paddingTop: "5px",
});

const StyledButton = styled(Button)({
  width: '10%',
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

const CartCard = ({item}) => {
  
  const { id, address,  ad_details } = item;
  const price = `$${ad_details.price}`;
  const title = ad_details.title;
  const photoUrl = ad_details.image;
  
  console.log(photoUrl[0]);
  const [selectedAdId, setAdId] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    
  };
  const handleRemoveCartItem = async () => {
    try{
      await deleteCartItem(item._id);
      setAnchorEl(null);
      alert("Item Removed from Cart!");
      window.location.reload();
    }catch (error) {
      alert('Failed to remove favourite ad');
      console.error('Error removing ad from favourites:', error);
    }
  }
  

  return (
    <div style={{ paddingBottom: '5px' }}>
      <StyledCard>
        <Grid item xs={4} md={4}>
        {photoUrl && photoUrl.length > 0 ? (
            <StyledCardMedia
              component="img"
              height="auto"
              image={photoUrl[0]} 
              alt="Product Image"
            />
          ) : (
            <div>No Image Available</div>
          )}
        </Grid>
        <Grid item xs={5} md={6}>
          <StyledTypography>
            {title}
          </StyledTypography>
        </Grid>
        <Grid item xs={3} md={3}>
          <StyledTypography>
            Price: {price}
          </StyledTypography>
        </Grid>
       
        <Grid item xs={1} md={1} sx={{ marginRight: '1px' }}>
          <StyledTypography sx={{ flexGrow: 1 }}>
          <MoreVertIcon onClick={handleClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleRemoveCartItem}>Remove from Cart</MenuItem>
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
   
  }, [user_id]);

  const totalPrice = cart.reduce(
    (total, item) => total + parseInt(item.ad_details.price),
    0
  );
  

  return (
    <div style={{ padding: '20px' }}>
      <Grid container rowSpacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12} alignItems="center">
          <Grid container justifyContent="center">
            <h1>Cart</h1>
          </Grid>
        </Grid>
        <Grid item xs={12}>
         
          {cart.length === 0 ? (
            <div className="center-container">
            <h2>Your Cart Is Empty</h2>
            </div>
          ) : (
            cart.map((item) => (
              <><div key={item._id}>

                <CartCard
                  key={item._id}
                  item={item}

                ></CartCard>
              </div>
              
              </>
            ))
            
          )}
              {cart.length > 0 && (
        <><div className="card-total">
              <StyledTypography>Total: ${totalPrice.toFixed(2)}</StyledTypography>
            </div><div className="card-total">
                <StyledButton variant="contained">Checkout</StyledButton>
              </div></>
      )}
        
        </Grid>
       
      </Grid>
    </div>
  );
};

export default Cart;