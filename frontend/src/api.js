// Created by Pranav Mahindru
// try catch referred from mdn web docs
// URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
// Date Accessed: 07/23/2023
// Used by Saiz Charolia

// status codes referred from educative
// URL: https://www.educative.io/answers/how-to-use-the-nodejs-httpserverresponsestatuscode-property
// Date Accessed: 07/23/2023
// Used by Saiz Charolia

import axios from "axios";
import bcrypt from 'bcryptjs';

const baseURL = "https://csci4177-group-project-backend.onrender.com/api";

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
    const hashedPassword = await bcrypt.hash(data.password, 10);

    console.log("Hashed signup Password:", hashedPassword);

    const requestData = {
      ...data,
      password: hashedPassword,
    };

    const res = await axios.post(`${baseURL}/register`, requestData);
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
export const getPayments = async (userId) => {
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
export const createCartItem = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/cart`, data);
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
    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await axios.post(`${baseURL}/reset-password`, {
      email,
      password: hashedPassword,
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

// ADD NEW POST ADD APIs CALL (Pranav Mahindru)
export const addNewPostAd = async (data) => {
    try {
      const res = await axios.post(`${baseURL}/seller/addPost`, data);
      return res.data;
    } catch (error) {
      return error
    }
}

// SAVE POST ADD APIs CALL (Pranav Mahindru)
export const savePostAd = async (data) => {
    try {
      const res = await axios.post(`${baseURL}/seller/savePost`, data);
      return res.data;
    } catch (error) {
      return error
    }
}

// GET ALL POSTED ADD APIs CALL (Pranav Mahindru)
export const getAllPostedAd = async (data) => {
    try {
      const res = await axios.post(`${baseURL}/seller/getPost`, data);
      return res.data;
    } catch (error) {
      return error
    }
}

// GET ALL POSTED ADD APIs CALL (Pranav Mahindru)
export const getPostForDashboard = async () => {
    try {
      const res = await axios.get(`${baseURL}/seller/getPostForDashboard`);
      return res.data;
    } catch (error) {
      return error
    }
}

// GET ALL POSTED ADD APIs CALL (Pranav Mahindru)
export const getAllSavePostedAd = async (data) => {
    try {
      const res = await axios.post(`${baseURL}/seller/getSavePost`, data);
      return res.data;
    } catch (error) {
      return error
    }
}

// GET ALL POSTED ADD APIs CALL (Pranav Mahindru)
export const getPostAdWithId = async (data) => {
    try {
      const res = await axios.post(`${baseURL}/seller/getPostAdWithId/${data._id}`);
      return res.data;
    } catch (error) {
      return error
    }
}

// update the POST ADD APIs CALL (Pranav Mahindru)
export const updatePostAd = async (data) => {
    try {
      const { _id, ...object } = data;
      const res = await axios.put(`${baseURL}/seller/updatePostWithId/${_id}`, object);
      return res.data;
    } catch (error) {
      return error
    }
}

// update the POST ADD APIs CALL (Pranav Mahindru)
export const previewSavePostAd = async (data) => {
    try {
      const { _id, ...object } = data;
      const res = await axios.put(`${baseURL}/seller/previewSavePostAd/${_id}`, object);
      return res.data;
    } catch (error) {
      return error
    }
}

// pause the POST ADD APIs CALL (Pranav Mahindru)
export const pausePostAd = async (data) => {
    try {
      const res = await axios.put(`${baseURL}/seller/pausePostAdWithId/${data._id}`, data);
      return res.data;
    } catch (error) {
      return error
    }
}

// delete the POST ADD APIs CALL (Pranav Mahindru)
export const deletePostAd = async (postId) => {
    try {
      const res = await axios.delete(`${baseURL}/seller/deletePostWithId/${postId}`);
      return res.data;
    } catch (error) {
      return error
    }
}

// delete the POST ADD APIs CALL (Pranav Mahindru)
export const deleteSavePostAd = async (postId) => {
    try {
      const res = await axios.delete(`${baseURL}/seller/deleteSaveWithId/${postId}`);
      return res.data;
    } catch (error) {
      return error
    }
};

// get user with id (Pranav Mahindru)
export const getUserWithID = async (userId) => {
    try {
      const res = await axios.get(`${baseURL}/getSpecificUser/${userId}`);
      return res.data;
    } catch (error) {
      return error
    }
};

// 2FA (Pranav Mahindru)
export const twoFactorAuthentication = async (email) => {
  try {
    const generatedCode = generateRandomCode();
    const response = await axios.post(`${baseURL}/twoFactorAuthentication`, {
      email,
      authenticationCode: generatedCode,
    });

    return response.data;
  } catch (error) {
    return false;
  }
};

// add to the user interaction
export const addToUserInteraction = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/addToUserInteraction`, data);
    return response.data;
  } catch (error) {
    return false;
  }
};

/* User Profile Settings APIs | By: Joel Kuruvilla | 2023-07-26 */
//User Profile READ API:
export const userProfileSettingsRead = async (userID) => { //By Joel Kuruvilla
    try {
      const res = await axios.get(`${baseURL}/profile_setting/${userID}`);
      return res.data;
    } catch (error) {
      return error
    }
};
//User Profile UPDATE API:
export const userProfileSettingsUpdate = async (userID, data) => { //By Joel Kuruvilla
  try {
    const res = await axios.put(`${baseURL}/profile_settings/${userID}`, data);
    return res.data;
  } catch (error) {
    return error
  }
};

/* User SignUp API | B: Joel Kuruvilla | 2023-07-26 */
export const userSignUpUpdate = async (userID, data) => { //By Joel Kuruvilla
  try {
    const res = await axios.put(`${baseURL}/signup/${userID}`, data);
    return res.data;
  } catch (error) {
    return error
  }
};

/* User Notification Settings APIs | By: Joel Kuruvilla | 2023-07-26 */
//User Notification READ API:
export const userNotificationSettingsRead = async (userID) => { //By Joel Kuruvilla
  try {
    const res = await axios.get(`${baseURL}/notification_setting/${userID}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
//User Notification UPDATE API:
export const userNotificationSettingsUpdate = async (userID, data) => { //By Joel Kuruvilla
  try {
    const res = await axios.put(`${baseURL}/notification_settings/${userID}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
