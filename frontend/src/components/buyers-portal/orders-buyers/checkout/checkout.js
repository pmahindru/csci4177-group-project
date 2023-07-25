/* Created By: Patrick Wooden | 2023-July-24 */
import React, { useState } from 'react';
import "./checkout.css";
import { createOrder } from '../../../../api';

const Checkout = ({ onClose, totalPrice, payments, cart }) => {
  const storedData = localStorage.getItem('user_info');
  const parsedData = JSON.parse(storedData);
  const user_id = parsedData._id;
  //local state variables
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState('');

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
      const orderPromises = cart.map((item) => {
        const orderData = {
          user_id,
          address,
          ad_id: item.ad_id,
          date_purchased: formattedDate,
          status: "In Transit"
        };
        return createOrder(orderData);
      });
      // waits to submit each ad in users cart as a order before moving on
      await Promise.all(orderPromises);

      alert('Order created successfully');
      onClose();
      window.location.reload();
    } catch (error) {
      alert('Failed to create order');
      console.error('Error creating order:', error);
    }
  };

  return (
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

          <div className="formRow">
            <p className="checkoutLabel" >Total: ${totalPrice.toFixed(2)}</p>
          </div>
          <div className="formRow">
            <button className="checkoutButton" type="button" onClick={handleCreateOrder}>
              Place Order
            </button>
          </div>

          <div className="formRow">
            <button button className="checkoutButton" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;