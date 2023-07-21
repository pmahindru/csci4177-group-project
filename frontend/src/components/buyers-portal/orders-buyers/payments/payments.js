/* Created By: Patrick Wooden | 2023-June-19 */
import React, { useEffect, useState } from 'react';
import CreatePaymentModal from './createpayment';
import EditPaymentModal from './editpayment';
import { Grid } from '@mui/material';
import { getAllPayments } from '../../../../api';
import "./payments.css";

const AccountPayments = () => {
  const storedData = localStorage.getItem('user_info');
  const parsedData = JSON.parse(storedData);
  const userId = parsedData._id;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [payments, setPayments] = useState([]);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);

  const handleCreateModalOpen = () => {
    setIsCreateModalOpen(true);
    console.log("gets here");
  };

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
  };

  const handleEditModalOpen = (paymentId) => {
    setSelectedPaymentId(paymentId);
    setIsEditModalOpen(true);
    console.log(paymentId);
  };

  const handleEditModalClose = () => {
    setSelectedPaymentId(null);
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const result = await getAllPayments(userId);
        console.log(result.data);
        setPayments(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPayments();
  }, []);
const payment7 = "64b5cbb0008f0d694323a9c2";
  return (
    <div className="container">
      <h1>Payment Page</h1>

      {payments.map((payment) => (
        <div className="cards" key={payment._id}>
          <div>
            <p>Last 4 Digits: {payment.card_number}</p>
            <p>Expiry Date: {payment.expiry}</p>
            <button className="button" onClick={() => handleEditModalOpen(payment._id)}>Edit</button>
            {isEditModalOpen && selectedPaymentId === payment._id && (
              <EditPaymentModal
                paymentId={selectedPaymentId}
                onClose={handleEditModalClose}
              />
            )}
          </div>
        </div>
      ))}

    
      <button className="button" onClick={handleCreateModalOpen}>Add a Payment</button>

      {isCreateModalOpen && (
        <div className="modalOverlay">
          <CreatePaymentModal onClose={handleCreateModalClose} />
        </div>
      )}

      {isEditModalOpen && (
        <div className="modalOverlay">
          
          <EditPaymentModal
            paymentId={selectedPaymentId}
            onClose={handleEditModalClose}
          />
        </div>
      )}
    </div>
  );
};

export default AccountPayments;