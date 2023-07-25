/* Created By: Patrick Wooden | 2023-June-19 */
import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, Button, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/system';
import Checkout from '../checkout/checkout';
import { getCart, deleteCartItem, getAllPayments } from '../../../../api';
import "./cart.css";
import "../checkout/checkout.css";
//styling for my card, cardmedia, typography and button I use in this file
const StyledTypography = styled(Typography)({
  margin: '10px',
  fontSize: '10px',
  textAlign: 'center',
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

// The CartCard returns a card for each item with an image, the price of the product, and the title of the ad.
const CartCard = ({ item }) => {
  const { ad_details } = item;
  const price = `$${ad_details.price}`;
  const title = ad_details.title;
  const photoUrl = ad_details.image;
  const [anchorEl, setAnchorEl] = useState(null);

  //event handlers to open/close the more options button in the cart
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveCartItem = async () => {
    const shouldRemove = window.confirm('Are you sure you want to remove this item from the cart?');
    if (shouldRemove) {
      try {
        await deleteCartItem(item._id);
        setAnchorEl(null);
        alert("Item Removed from Cart!");
        window.location.reload();
      } catch (error) {
        alert('Failed to remove favourite ad');
        return error;
      }
    }
    setAnchorEl(null);
  };

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
            <div className="checkoutLabel">No Image Available</div>
          )}
        </Grid>
        <Grid item xs={5} md={6}>
          <StyledTypography>
            Title: {title}
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

const Cart = () => {
  const storedData = localStorage.getItem('user_info');
  const parsedData = JSON.parse(storedData);
  const user_id = parsedData._id;
  //local state variables
  const [cart, setCart] = useState([]);
  const [payments, setPayments] = useState([]);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  //event handles to open/close the checkout component
  const handleCheckoutPopup = () => {
    setCheckoutOpen(true);
  };

  const handleCheckoutClose = () => {
    setCheckoutOpen(false);
  };

  // The two useEffects below get the data for the user's cart and the payment methods that they have.
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const result = await getCart(user_id);
        setCart(result);
      } catch (error) {
        return error;
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const result = await getAllPayments(user_id);
        setPayments(result);
      } catch (error) {
        return error;
      }
    };

    fetchPayments();
  }, []);

  // This function handles when the user clicks checkout. If the user has at least one payment method, they will be directed to the checkout screen. If not, they will be alerted to add a payment method before they can check out.
  const handleCheckout = () => {
    if (payments.length !== 0) {
      handleCheckoutPopup();
    } else {
      alert("Please add a payment method to this account to checkout");
    }
  }

  // Total price is calculated with the reduce method and the price from each item in the cart is summed up.
  const totalPrice = cart.length > 0
    ? cart.reduce((total, item) => total + parseInt(item.ad_details.price), 0)
    : 0;

  return (
    <div style={{ padding: '20px' }}>
      <Grid container rowSpacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12} alignItems="center">
          <Grid container justifyContent="center">
            <h1  className="checkoutHeading">Cart</h1>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {cart.length === 0 ? (
            <div className="center-container">
              <h2 className="checkoutLabel">Your Cart Is Empty</h2>
            </div>
          ) : (
              Array.isArray(cart) && cart.map((item) => (
                
                  <CartCard
                    item={item}
                  ></CartCard>
               
              ))
            )}
          {cart.length > 0 && (
            <React.Fragment>
              <div className="card-total">
                <StyledTypography>Total: ${totalPrice.toFixed(2)}</StyledTypography>
              </div>
              <div className="card-total">
                <StyledButton variant="contained" onClick={() => handleCheckout()}>Checkout</StyledButton>
              </div>
            </React.Fragment>
          )}
          {isCheckoutOpen && (
            <div className="modalOverlay">
              <Checkout
                totalPrice={totalPrice}
                cart={cart}
                payments={payments}
                onClose={handleCheckoutClose}
              />
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Cart;
