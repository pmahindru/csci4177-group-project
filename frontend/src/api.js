// try catch referred from mdn web docs
// URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
// Date Accessed: 07/23/2023
// Used by Saiz Charolia

// status codes referred from educative
// URL: https://www.educative.io/answers/how-to-use-the-nodejs-httpserverresponsestatuscode-property
// Date Accessed: 07/23/2023
// Used by Saiz Charolia

import axios from "axios";

const baseURL = "http://localhost:3001/api";

// generateRandomCode created by Saiz Charolia
// random number generating referred from iqcode
// URL: https://iqcode.com/code/javascript/javascript-random-4-digit-number
// Date Accessed: 07/23/2023
const generateRandomCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// createUser created by Saiz Charolia
// axios post request referred from LogRocket
// URL: https://blog.logrocket.com/how-to-use-axios-post-requests/
// Date Accessed: 07/23/2023
export const createUser = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/register`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

// getAllUser created by Saiz Charolia
// axios get request referred from atatus
// URL: https://www.atatus.com/blog/how-to-perform-http-requests-with-axios-a-complete-guide/#:~:text=Axios%20Get%20Request,-Axios%20can%20make&text=get()%20method%20is%20used,should%20be%20supplied%20to%20it.
// Date Accessed: 07/23/2023
export const getAllUser = async () => {
  try {
    const res = await axios.get(`${baseURL}/`);
    return res.data;
  } catch (error) {
    return error;
  }
};

// loginUser created by Saiz Charolia
// axios post request referred from LogRocket
// URL: https://blog.logrocket.com/how-to-use-axios-post-requests/
// Date Accessed: 07/23/2023
export const loginUser = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/login`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const getAllPayments = async (userId) => {
  try {
    const res = await axios.get(`${baseURL}/payments/${userId}`);

    return res.data;
  } catch (error) {
    return error;
  }
};
export const getOrderHistory = async (userId) => {
  try {
    const orderHistoryResponse = await axios.get(
      `${baseURL}/order-history/${userId}`
    );
    return orderHistoryResponse.data;
  } catch (error) {
    return error;
  }
};
export const getCart = async (userId) => {
  try {
    const cartResponse = await axios.get(`${baseURL}/cart/${userId}`);
    return cartResponse.data;
  } catch (error) {
    return error;
  }
};
export const getFavourites = async (userId) => {
  try {
    const favouriteResponse = await axios.get(
      `${baseURL}/favourites/${userId}`
    );
    return favouriteResponse.data;
  } catch (error) {
    return error;
  }
};
export const getReviews = async (userId) => {
  try {
    const reviewResponse = await axios.get(`${baseURL}/reviews/${userId}`);
    return reviewResponse.data;
  } catch (error) {
    return error;
  }
};
export const getReview = async (userId, adId) => {
  try {
    const reviewResponse = await axios.get(
      `${baseURL}/review/${userId}/${adId}`
    );
    return reviewResponse.data;
  } catch (error) {
    return error;
  }
};
export const createPayment = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/create-payment`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const createReview = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/reviews`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getPaymentMethod = async (paymentId) => {
  try {
    const res = await axios.get(`${baseURL}/payments/${paymentId}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const updatePaymentMethod = async (paymentId, updatedPaymentData) => {
  try {
    const res = await axios.put(
      `${baseURL}/payments/${paymentId}`,
      updatedPaymentData
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
export const editReview = async (reviewId, reviewData) => {
  try {
    const res = await axios.put(`${baseURL}/reviews/${reviewId}`, reviewData);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const deletePaymentMethod = async (paymentId) => {
  try {
    const res = await axios.delete(`${baseURL}/payments/${paymentId}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const deleteFavourite = async (favouriteId) => {
  try {
    const res = await axios.delete(`${baseURL}/favourites/${favouriteId}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const deleteCartItem = async (itemId) => {
  try {
    const res = await axios.delete(`${baseURL}/cart/${itemId}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const getTrackedOrders = async (userId) => {
  try {
    const trackedOrdersResponse = await axios.get(
      `${baseURL}/track-orders/${userId}`
    );
    return trackedOrdersResponse.data;
  } catch (error) {
    return error;
  }
};
export const createOrder = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/orders`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

// sendResetCode created by Saiz Charolia
// axios post request referred from LogRocket
// URL: https://blog.logrocket.com/how-to-use-axios-post-requests/
// Date Accessed: 07/23/2023
export const sendResetCode = async (email) => {
  try {
    const generatedCode = generateRandomCode();
    const response = await axios.post(`${baseURL}/generate-reset-code`, {
      email,
      resetCode: generatedCode,
    });

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// verifyResetCodeFromDatabase created by Saiz Charolia
// axios get request referred from atatus
// URL: https://www.atatus.com/blog/how-to-perform-http-requests-with-axios-a-complete-guide/#:~:text=Axios%20Get%20Request,-Axios%20can%20make&text=get()%20method%20is%20used,should%20be%20supplied%20to%20it.
// Date Accessed: 07/23/2023
export const verifyResetCodeFromDatabase = async (email, resetCode) => {
  try {
    const response = await axios.get(`${baseURL}/get-reset-code`, {
      params: {
        email: email,
        resetCode: resetCode,
      },
    });

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// resetPassword created by Saiz Charolia
// axios post request referred from LogRocket
// URL: https://blog.logrocket.com/how-to-use-axios-post-requests/
// Date Accessed: 07/23/2023
export const resetPassword = async (email, password) => {
  try {
    const response = await axios.post(`${baseURL}/reset-password`, {
      email,
      password,
    });

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// profileUserDetails created by Saiz Charolia
// axios post request referred from LogRocket
// URL: https://blog.logrocket.com/how-to-use-axios-post-requests/
// Date Accessed: 07/23/2023
export const profileUserDetails = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/profile_setting`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
