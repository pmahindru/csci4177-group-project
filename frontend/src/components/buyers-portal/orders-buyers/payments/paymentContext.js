
import React, { createContext, useState, useEffect } from 'react';
import {getPayments } from '../../../../api';

const PaymentContext = createContext();

const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);
  const storedData = localStorage.getItem('user_info');
  const parsedData = JSON.parse(storedData);
  const user_id = parsedData._id;
  useEffect(() => {
   
    const fetchPayments = async () => {
            const result = await getPayments(user_id);
            if (Object.keys(result).length > 0) {
              if (!result.address) {
                console.log(result);
                setPayments(result);
              }
            }
    };

    fetchPayments();
  }, []);

  return (
    <PaymentContext.Provider value={{ payments }}>
      {children}
    </PaymentContext.Provider>
  );
};

export { PaymentContext, PaymentProvider };
