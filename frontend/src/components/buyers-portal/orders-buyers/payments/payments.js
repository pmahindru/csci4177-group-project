/* Created By: Patrick Wooden | 2023-June-19 */
import React, { useEffect, useState } from 'react';
import { getPayments, createPayment, deletePaymentMethod, updatePaymentMethod  } from '../../../../api';
import "./payments.css";

const AccountPayments = () => {
  const storedData = localStorage.getItem('user_info');
  const parsedData = JSON.parse(storedData);
  const user_id = parsedData._id;
  const [payments, setPayments] = useState([]);

  //local variables to toggle opening create/edit payment components and to recive data from database
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [paymentId, setpaymentId] = useState(null);

  // for the payments
  //local vairables for submitting new payment method to database
  const [card_number, setCardNumber] = useState('');
  const [cvv, setCVV] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');

  // for the payments
  useEffect(() => {
    setFirstName(parsedData.firstName)
    setLastName(parsedData.lastName)
    if (parsedData.address !== null) {
      setAddress(parsedData.address)
    }
  }, [parsedData])

  //event handlers to update local variables and to toggle opening the edit payment component and create payment componenet
  const handleCreatePaymentOpen = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreatePaymentClose = () => {
    setIsCreateModalOpen(false);
  };

  const handleEditPaymentClose = () => {
    setpaymentId(null);
    setIsEditModalOpen(false);
    fetchPayments(false);
  };

  const handleEditPaymentOpen = (paymentId) => {
    setpaymentId(paymentId);
    setIsEditModalOpen(true);
    fetchPayments(true);
  };

  // edit payments
  //event handlers to update local variables when values change
  const handleCVVChange = (event) => {
    setCVV(event.target.value);
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
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  //event handlers to update local variables when values change
  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  //useffect for getting all the users payment methods they already have
  const fetchPayments = async (isChecked) => {
    const result = await getPayments(user_id);
    if(Object.keys(result).length > 0){
      if (!result.address) {
        if (isChecked) {
          setCVV(result[0].cvv);
          const [expiryMonth, expiryYear] = result[0].expiry.split('/');
          setExpiryMonth(expiryMonth);
          setExpiryYear(expiryYear);
        }
        else{
          setCVV("");
          setExpiryMonth("");
          setExpiryYear("");
          setPayments(result); 
        } 
      }
    }
  };
  useEffect(() => {
    fetchPayments(false);
  }, []);

  //method to handle submitting new payment method to database when user clicks add payment
  const handleCreatePayment = async (e) => {
    e.preventDefault();
    const formattedExpiryMonth = expiryMonth.padStart(2, '0');
    const formattedExpiryYear = expiryYear.padStart(2, '0');
    const expiry = `${formattedExpiryMonth}/${formattedExpiryYear}`;

    if (!card_number || !cvv || !expiry || !firstName || !lastName || !address) {
      alert('Please fill in all fields');
      return;
    }

    // check proper card number
    if(card_number.trim().length !== 16){
      alert("Card number is not valid");
      return;
    }
    const existingPayment = payments.find(payment => parseInt(payment.card_number) === parseInt(card_number));

    if(existingPayment){
      alert("This card number is already on file. Please add a different card");
      return;
    }

    // payments limit
    let countPayments = 0
    for (let i = 0; i < payments.length; i++) {
      countPayments++;
    }

    if (countPayments >= 3) {
      alert("Reached the limit of Card. Make sure you delete and add new one");
      return;
    }

    const paymentData = {user_id, card_number, cvv, expiry, firstName, lastName, address};
    const res = await createPayment(paymentData);

    if (res.status === 500) {
      alert("Failed to add payment method, try again");
      return;
    }
    alert("Payment added successfully");
    window.location.reload();
    handleCreatePaymentClose();
  };

  //method to handle submitting new payment method to database when user clicks save changes
  const handleEditPayment = async () => {
    const formattedExpiryMonth = expiryMonth.padStart(2, '0');
    const formattedExpiryYear = expiryYear.padStart(2, '0');
    const expiry = `${formattedExpiryMonth}/${formattedExpiryYear}`;

    if ((!expiryMonth && expiryYear) || (expiryMonth && !expiryYear)) {
      alert('Please set both Expiry Month and Expiry Year!');
      return;
    }
    
    if (!cvv && !expiry && !address ) {
      alert('Please fill at least one field to submit a change');
      return;
    }
    try {
      const updatedPaymentData = {
        cvv, expiry,  address
      };
      await updatePaymentMethod(paymentId, updatedPaymentData);
      alert("Payment method updated successfully");
      window.location.reload();
    } catch (error) {
      alert('Failed to update payment method');
      return error;
    }
  };

  //method to remove a existing payment from users database
  const handleRemovePayment = async () => {
    const shouldRemove = window.confirm('Are you sure you want to remove this item from the cart?');
    if (shouldRemove) {
      try {
        await deletePaymentMethod(paymentId);
        alert("Payment Removed!");
      } catch (error) {
        alert('Failed to remove payment method');
        return error;
      }
    }
  };

  return (
    <div className="container">
      <h1 className="paymentHeading">Payment Page</h1>
      {payments.length === 0 ? (
        <div className="center-container">
          <h2 className="paymentLabel">No Payment Methods</h2>
        </div>
      ) : (
        payments.map((payment) => {
          return (
            <div className="cards" key={payment._id}>
            <div>
              <p className="paymentLabel">Card Number: {payment.card_number}</p>
              <p className="paymentLabel">Expiry Date: {payment.expiry}</p>
              <button className="paymentPageButton" onClick={() => handleEditPaymentOpen(payment._id)}>Edit</button>
            </div>
          </div>
          )
        })
      )}

      <button className="addPaymentButton" onClick={handleCreatePaymentOpen}>Add a Payment</button>

      {isCreateModalOpen && (
        <div className="modalOverlay">
          <div className="paymentOverlay">
            <div className="paymentContent">
              <h2 className="paymentHeading">Create Payment</h2>
              <form>
                <div className="formRow">
                  <label className="paymentLabel">Card Number:</label>
                  <input
                    id="cardNumberInput"
                    type="Number"
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
                    type="Number"
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
                  <button className="paymentButton" type="button" onClick={handleCreatePaymentClose}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )} 

      {isEditModalOpen && (
        <div className="modalOverlay">
          <div className="paymentOverlay">
            <div className="paymentContent">
              <h2 className="paymentHeading">Edit Payment Method </h2>
              <form>
                <div className="formRow">
                  <label className="paymentLabel" >CVV:</label>
                  <input
                    id="cvvInput"
                    type="text"
                    value={cvv || ""}
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
                    value={expiryMonth || ""}
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
                    value={expiryYear || ""}
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
                    value={address || ""}
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
                  <button className="paymentButton" type="button" onClick={handleEditPaymentClose}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPayments;
