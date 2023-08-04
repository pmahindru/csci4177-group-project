/* Created By: Patrick Wooden | 2023-July-16 */
import React, { useState } from 'react';
import "./payments.css";
import { createPayment } from '../../../../api';
//CreatePayment returns a 
const CreatePayment= ({ onClose }) => {
  const storedData = localStorage.getItem('user_info');
  const parsedData = JSON.parse(storedData);
  const user_id = parsedData._id;
  //local vairables for submitting new payment method to database
  const [card_number, setCardNumber] = useState('');
  const [cvv, setCVV] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  //event handlers to update local variables when values change
  const handleCardNumberChange = (event) => {
    const inputValue = event.target.value.replace(/\D/g, '');
    setCardNumber(inputValue);
  };

  const handleCVVChange = (event) => {
    const inputValue = event.target.value.replace(/\D/g, '');
    setCVV(inputValue);
  };

  const handleExpiryMonthChange = (event) => {
    setExpiryMonth(event.target.value);
  };

  const handleExpiryYearChange = (event) => {
    setExpiryYear(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  //method to handle submitting new payment method to database when user clicks add payment
  const handleCreatePayment = async (e) => {
    e.preventDefault();
    const expiry = `${expiryMonth}/${expiryYear}`;
    if (!card_number || !cvv || !expiry || !firstName || !lastName || !address) {
      alert('Please fill in all fields');
      return;
    }
    if(card_number.trim().length !== 16){
      alert("Card number is not valid");
      return;
    }
    try {
      const paymentData = {
        user_id, card_number, cvv, expiry, firstName, lastName, address
      };
      await createPayment(paymentData);
      alert("Payment added successfully");
      onClose();
      window.location.reload();
    } catch (error) {
      alert('Failed to add payment method');
      return error;
    }
  };

  return (
    <div className="paymentOverlay">
      <div className="paymentContent">
        <h2 className="paymentHeading" >Create Payment</h2>
        <form>
          <div className="formRow">
            <label className="paymentLabel" >Card Number:</label>
            <input
              id="cardNumberInput"
              type="text"
              value={card_number}
              onChange={handleCardNumberChange}
              pattern="[0-9]*"
              inputMode="numeric"
              maxLength={16}
            />
          </div>
          <div className="formRow">
            <label className="paymentLabel" >CVV:</label>
            <input
            
              id="cvvInput"
              type="text"
              value={cvv}
              onChange={handleCVVChange}
              pattern="[0-9]*"
              inputMode="numeric"
              maxLength={3}
            />
          </div>
          <div className="formRow">
            <label className="paymentLabel"  >Expiry Date:</label>
            <select
              id="expiryMonthSelect"
              value={expiryMonth}
              onChange={handleExpiryMonthChange}
            >
              <option value="">--Select Month--</option>
              <option value='01'>Janaury</option>
              <option value='02'>February</option>
              <option value='03'>March</option>
              <option value='04'>April</option>
              <option value='05'>May</option>
              <option value='06'>June</option>
              <option value='07'>July</option>
              <option value='08'>August</option>
              <option value='09'>September</option>
              <option value='10'>October</option>
              <option value='11'>November</option>
              <option value='12'>December</option>
            </select>
            <select
              id="expiryYearSelect"
              value={expiryYear}
              onChange={handleExpiryYearChange}
            >
              <option value=''>--Select Year--</option>
              <option value='1'>2023</option>
              <option value='2'>2024</option>
              <option value='3'>2025</option>
              <option value='4'>2026</option>
              <option value='5'>2027</option>
              <option value='6'>2028</option>
              <option value='7'>2029</option>
              <option value='8'>2030</option>
              <option value='9'>2031</option>
              <option value='10'>2032</option>
              <option value='11'>2033</option>
              <option value='12'>2034</option>
            </select>
          </div>
          <div className="formRow">
            <label className="paymentLabel"  >First Name:</label>
            <input
              id="firstNameInput"
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div className="formRow">
            <label className="paymentLabel" >Last Name:</label>
            <input
              id="lastNameInput"
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="formRow">
            <label className="paymentLabel"  >Address:</label>
            <textarea
              id="addressInput"
              value={address}
              onChange={handleAddressChange}
            />
          </div>
          <div className="formRow">
            <button className="paymentButton" type="button" onClick={handleCreatePayment}>
              Create Payment
            </button>
          </div>
          <div className="formRow">
            <button  className="paymentButton" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePayment;
