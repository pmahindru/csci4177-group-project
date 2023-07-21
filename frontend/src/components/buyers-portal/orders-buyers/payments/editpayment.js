/* Created By: Patrick Wooden | 2023-July-16 */
import React, { useEffect, useState } from 'react';
import "./payments.css";
import { deletePaymentMethod, getPaymentMethod, updatePaymentMethod } from '../../../../api';
const EditPaymentModal = ({ paymentId, onClose }) => {
    const storedData = localStorage.getItem('user_info');
    const parsedData = JSON.parse(storedData);
    const user_id = parsedData._id;
    console.log(paymentId);
    const [cvv, setCVV] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState(''); 
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
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
    const handleEditPayment = async () => {
        
        const expiry = `${expiryMonth}/${expiryYear}`;
        if ( !cvv || !expiry || !address) {
            alert('Please fill in all fields');
            return;
          }
        try{
            const updatedPaymentData ={
                cvv, expiry,  address
            };
            await updatePaymentMethod(paymentId, updatedPaymentData);
            alert("Payment added successfully")

            onClose();
        }catch (error) {
            alert('Failed to update payment method');
            console.error('Error updating payment method:', error);
          }
       
    };
    const handleRemovePayment = async () => {
        try{
          await deletePaymentMethod(paymentId);
        }catch (error) {
          alert('Failed to remove payment method');
          console.error('Error removing payment method:', error);
        }
    }
    useEffect(() => {
        const fetchPaymentData = async () => {
        try{
            const result = await getPaymentMethod(paymentId);
            console.log(result);
            setPaymentMethod(result);
            setCVV(result.cvv);
            const [expiryMonth, expiryYear] = result.expiryDate.split('/');
            setExpiryMonth(expiryMonth);
            setExpiryYear("20" + expiryYear);
            setAddress(result.address);
        }catch (error) {
            console.error(error);
        }
        }
        
    
        fetchPaymentData();
    },[]);




    return (
    <div className="modalOverlay">
        <div className="modalContent">
        <h2>Edit Payment Method </h2>
        <form>
        <div className="formRow">
              <label >CVV:</label>
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
              <label htmlFor="expiryMonthSelect">Expiry Date:</label>
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
              <label htmlFor="addressInput">Address:</label>
              <textarea
                id="addressInput"
                value={address}
                onChange={handleAddressChange}
              />
            </div>
            <div className="formRow">
              <button type="button"onClick={handleRemovePayment}>
                Remove Payment Method
              </button>
            </div>
            <div className="formRow">
            <button type="button" onClick={handleEditPayment}>
                Save Changes
              </button>
            </div>
            <div className="formRow">
              <button type="button" onClick={onClose}>
                Cancel
              </button>
            </div>
            
        </form>
        
    </div>
    </div>
       
      
    );
  };

  export default EditPaymentModal;