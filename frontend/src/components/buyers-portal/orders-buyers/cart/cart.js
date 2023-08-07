/* Created By: Patrick Wooden | 2023-June-19 */
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { getCart, getPayments, createOrder, deleteCartItem } from '../../../../api';
import "./cart.css";
import { useNavigate } from 'react-router-dom';
import ImageSlider from '../image-slider';

const Cart = () => {
  const storedData = localStorage.getItem('user_info');
  const parsedData = JSON.parse(storedData);
  const user_id = parsedData._id;

  //local state variables
  const [cart, setCart] = useState([]);
  const [payments, setPayments] = useState([]);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const navigate = useNavigate();

  // for the checkout
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState('');

  //event handles to open/close the checkout component
  const handleCheckoutPopup = () => {
    setCheckoutOpen(true);
  };

  const handleCheckoutClose = () => {
    setCheckoutOpen(false);
  };
  
  useEffect(() => {
    const fetchPayments = async () => {
      const result = await getPayments(user_id);
      if (Object.keys(result).length > 0 && !result.address) {
          setPayments(result);
      }
    };

    fetchPayments();
  }, []);
  
  useEffect(() => {
    const fetchCart = async () => {
      const result = await getCart(user_id);
      if (Object.keys(result).length > 0) {
        if (!result.address) {
          setCart(result);
          console.log(user_id);
        }
      }
    };
    fetchCart();
  }, []);

 

  // This function handles when the user clicks checkout. If the user has at least one payment method, they will be directed to the checkout screen. If not, they will be alerted to add a payment method before they can check out.
  const handleCheckout = () => {
    
    if (Object.keys(payments).length > 0) {
      handleCheckoutPopup();
      return;
    } else {
      alert("Please add a payment method to this account to checkout");
      navigate("/orders#payments");
      window.location.reload();
      return;
    }
  }

  // Total price is calculated with the reduce method and the price from each item in the cart is summed up.
  const totalPrice = cart.length > 0
    ? cart.reduce((total, item) => total + parseInt(item.ad_details.price), 0)
    : 0;

  // for the checkout
  //event handlers to update locat states when input change
  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  //handleCreateOrder creates the order for each ad in the users cart if a shipping address and payment method is provided. Each ad is submitted as its own order to the database
  const handleCreateOrder = async () => {
    if (!address || !paymentMethod) {
      alert('Please fill in all fields');
      return;
    }
    try {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();

      const orderArray = cart.map((item) => ({
          user_id,
          address,
          ad_id: item.ad_id,
          date_purchased: formattedDate,
          status: "In Transit"
      }));
      
      // waits to submit each ad in users cart as a order before moving on
      await createOrder({ orderArray: orderArray });
      const itemIds = cart.map((item) => item._id);
      for (const itemId of itemIds) {
        await deleteCartItem(itemId);
      }
   
      alert('Order created successfully');
      navigate("/orders#order-history")
      window.location.reload();
    } catch (error) {
      alert('Failed to create order');
      console.error('Error creating order:', error);
    }
  }; 

  return (
    <Grid container rowSpacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12} alignItems="center">
          <Grid container justifyContent="center">
            <h1  className="checkoutHeading">Cart </h1>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {cart.length === 0 ? (
            <div className="center-container">
              <h2 className="checkoutLabel">Your Cart Is Empty</h2>
            </div>
          ) : (
            cart.map((item) => {
              return(
                <ImageSlider
                    item={item}
                    handleCreateReviewOpen=""
                    pageName="cart"
                    key={item._id}
                />
              )
            })
          )}
          {cart.length > 0 && (
              <>
              <div className="card-total">
                  Total Amount: ${totalPrice.toFixed(2)}
              </div>
              <div className='postAd-button card-total'>
                  <button onClick={() => handleCheckout()}>Checkout</button>
              </div>
              </>
          )}
          {isCheckoutOpen && (
            <div className="checkoutOverlay">
              <div className="checkoutContent">
                <h2 className="checkoutHeading">Place Order</h2>
                <form>
                  <div className="formRow">
                    <label className="checkoutLabel">Shipping Address</label>
                    <input
                      id="addressInput"
                      type="text"
                      value={address}
                      onChange={handleAddressChange}
                    />
                  </div>

                  <div className="formRow">
                    <label className="checkoutLabel">Payment Method</label>
                    <select
                      id="paymentMethod"
                      onChange={handlePaymentChange}
                    >
                      <option>Chose Payment Method</option>
                      {Array.isArray(payments) &&
                        payments.map((payment) => (
                          <option key={payment._id} value={payment._id}>
                            {payment.card_number}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="postAd-button formRow">
                    <p className="checkoutLabel" >Total: ${totalPrice.toFixed(2)}</p>
                  </div>
                  <div className="postAd-button formRow">
                    <button type="button" onClick={handleCreateOrder}>
                      Place Order
                    </button>
                  </div>
                  <div className="postAd-button formRow">
                    <button type="button" onClick={handleCheckoutClose}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </Grid>
      </Grid>
  );
};

export default Cart;
