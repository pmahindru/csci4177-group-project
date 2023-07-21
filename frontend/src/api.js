import axios from 'axios';

const baseURL = "http://localhost:3001/api"

export const createUser = async (data) => {
    try {
        const res = await axios.post(`${baseURL}/register`,data);
        return res.data; 
    } catch (error) {
        console.error(error);
    }
}

export const getAllUser = async () => {
    try {
        const res = await axios.get(`${baseURL}/`);
        console.log(res);
        return res.data; 
        
    } catch (error) {
        console.error(error);
    }
}

export const loginUser = async (data) => {
    try {
      const res = await axios.post(`${baseURL}/login`, data);
      return res.data;
    } catch (error) {
      return error
    }
}
export const getAllPayments = async (userId) => {
    try {
        const res = await axios.get(`${baseURL}/payments/${userId}`);
        console.log(res.data);
        
        return res.data; 
    } catch (error) {
        console.error(error);
    }
}
export const getOrderHistory = async (userId) => {
    try {
        const orderHistoryResponse = await axios.get(`${baseURL}/order-history/${userId}`);
        console.log(orderHistoryResponse.data);
        return orderHistoryResponse.data;
    }
    catch (error) {
        console.error(error);
    }
}


export const createPayment = async (data) => {
    try {
        const res = await axios.post(`${baseURL}/create-payment`,data);
        return res.data; 
    } catch (error) {
        console.error(error);
    }
}

export const createReview = async (data) => {
    try {
        const res = await axios.post(`${baseURL}/create-review`,data);
        return res.data; 
    } catch (error) {
        console.error(error);
    }
}

export const getPaymentMethod = async (paymentId) => {
    try{
        const res = await axios.get(`${baseURL}/payments/${paymentId}`)
        return res.data;
    }catch (error) {
        console.error(error);
    }
}

export const updatePaymentMethod = async(paymentId,  updatedPaymentData) => {
    try{
        const res = await axios.put(`${baseURL}/payments/${paymentId}`, updatedPaymentData);
        return res.data
    }catch (error){
        console.error(error);
    }
}

export const deletePaymentMethod = async(paymentId) => {
    try{
        const res = await axios.delete(`${baseURL}/payments/${paymentId}`);
        return res.data;
    }catch (error){
        console.error(error);
    }
}