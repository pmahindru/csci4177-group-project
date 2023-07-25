/* Created By: Patrick Wooden | 2023-July-16 */
import React, { useEffect, useState } from 'react';
import "./payments.css";
import { deletePaymentMethod, getPaymentMethod, updatePaymentMethod } from '../../../../api';

const EditPayment = ({ paymentId, onClose }) => {
  const storedData = localStorage.getItem('user_info');
  const parsedData = JSON.parse(storedData);
  const user_id = parsedData._id;
  //local variables for updating payment methods
  const [cvv, setCVV] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState(''); 
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  //event handlers to update local variables when values change
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

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  //method to handle submitting new payment method to database when user clicks save changes
  const handleEditPayment = async () => {
    if ((!expiryMonth && expiryYear) || (expiryMonth && !expiryYear)) {
      alert('Please set both Expiry Month and Expiry Year!');
      return;
    }
    const expiry = `${expiryMonth}/${expiryYear}`;
    const change = cvv || expiry || address;
    if (!change) {
      alert('Please fill one field to submit a change');
      return;
    }
    try {
      const updatedPaymentData = {
        cvv, expiry,  address
      };
      await updatePaymentMethod(paymentId, updatedPaymentData);
      alert("Payment method updated successfully");
      onClose();
      window.location.reload();
    } catch (error) {
      alert('Failed to update payment method');
      console.error('Error updating payment method:', error);
    }
  };
  //method to remove a existing payment from users database
  const handleRemovePayment = async () => {
    const shouldRemove = window.confirm('Are you sure you want to remove this item from the cart?');
    if (shouldRemove) {
      try {
        await deletePaymentMethod(paymentId);
        alert("Payment Removed!");
        onClose();
      } catch (error) {
        alert('Failed to remove payment method');
        console.error('Error removing payment method:', error);
      }
    }
  };
  //use effect to get the existing payment method data
  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const result = await getPaymentMethod(paymentId);
        console.log(result);
        setPaymentMethod(result);
        setCVV(result.cvv);
        const [expiryMonth, expiryYear] = result.expiryDate.split('/');
        setExpiryMonth(expiryMonth);
        setExpiryYear("20" + expiryYear);
        setAddress(result.address);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPaymentData();
  }, []);

  return (
    <div className="paymentOverlay">
      <div className="paymentContent">
        <h2 className="paymentHeading">Edit Payment Method </h2>
        <form>
          <div className="formRow">
            <label className="paymentLabel" >CVV:</label>
            <input
              id="cvvInput"
              type="text"
              onChange={handleCVVChange}
              pattern="[0-9]*"
              inputMode="numeric"
              maxLength={3}
            />
          </div>
          <div className="formRow">
            <label className="paymentLabel" >Expiry Date:</label>
            <select
              id="expiryMonthSelect"
              value={expiryMonth}
              onChange={handleExpiryMonthChange}
            >
              <option value="">--Select Month--</option>
              <option value='1'>Janaury</option>
              <option value='2'>February</option>
              <option value='3'>March</option>
              <option value='4'>April</option>
              <option value='5'>May</option>
              <option value='6'>June</option>
              <option value='7'>July</option>
              <option value='8'>August</option>
              <option value='9'>September</option>
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
              <option value='23'>2023</option>
              <option value='24'>2024</option>
              <option value='25'>2025</option>
              <option value='26'>2026</option>
              <option value='27'>2027</option>
              <option value='28'>2028</option>
              <option value='29'>2029</option>
              <option value='30'>2030</option>
              <option value='31'>2031</option>
              <option value='32'>2032</option>
              <option value='33'>2033</option>
              <option value='34'>2034</option>
            </select>
          </div>
          <div className="formRow">
            <label className="paymentLabel">Address:</label>
            <textarea
            className="paymentTextArea"
              id="addressInput"
              value={address}
              onChange={handleAddressChange}
            />
          </div>
          <div className="formRow">
            <button className="paymentButton" type="button" onClick={handleRemovePayment}>
              Remove Payment Method
            </button>
          </div>
          <div className="formRow">
            <button className="paymentButton" type="button" onClick={handleEditPayment}>
              Save Changes
            </button>
          </div>
          <div className="formRow">
            <button className="paymentButton" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPayment;
