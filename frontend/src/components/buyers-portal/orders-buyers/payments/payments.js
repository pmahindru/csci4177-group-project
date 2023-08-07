/* Created By: Patrick Wooden | 2023-June-19 */
import React, { useEffect, useState } from 'react';
import CreatePayment from './createpayment';
import EditPaymentModal from './editpayment';
import { getPayments } from '../../../../api';
import "./payments.css";

const AccountPayments = () => {
  const storedData = localStorage.getItem('user_info');
  const parsedData = JSON.parse(storedData);
  const userId = parsedData._id;
  //local variables to toggle opening create/edit payment components and to recive data from database
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [payments, setPayments] = useState([]);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  //event handlers to update local variables and to toggle opening the edit payment component and create payment componenet
  const handleCreatePayment = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreatePaymentClose = () => {
    setIsCreateModalOpen(false);
  };

  const handleEditPayment = (paymentId) => {
    setSelectedPaymentId(paymentId);
    setIsEditModalOpen(true);
    
  };

  const handleEditPaymentClose = () => {
    setSelectedPaymentId(null);
    setIsEditModalOpen(false);
  };
  //useeffect for getting all the users payment methods they already have
  useEffect(() => {
    const fetchPayments = async () => {
        const result = await getPayments(userId);
        if(Object.keys(result).length > 0){
          if (!result.address) {
            setPayments(result);
          }
        }
    };
    fetchPayments();
  }, []);

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
              <button className="paymentPageButton" onClick={() => handleEditPayment(payment._id)}>Edit</button>
              {isEditModalOpen && selectedPaymentId === payment._id && (
                <EditPaymentModal
                  paymentId={selectedPaymentId}
                  onClose={handleEditPaymentClose}
                />
              )}
            </div>
          </div>
          )

        })
      )}

      <button className="addPaymentButton" onClick={handleCreatePayment}>Add a Payment</button>

      {isCreateModalOpen && (
        <div className="modalOverlay">
          <CreatePayment onClose={handleCreatePaymentClose} />
        </div>
      )}

      {isEditModalOpen && (
        <div className="modalOverlay">
          <EditPaymentModal
            paymentId={selectedPaymentId}
            onClose={handleEditPaymentClose}
          />
        </div>
      )}
    </div>
  );
};

export default AccountPayments;
