// try catch referred from mdn web docs
// URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
// Date Accessed: 07/23/2023
// Used by Saiz Charolia

// status codes referred from educative
// URL: https://www.educative.io/answers/how-to-use-the-nodejs-httpserverresponsestatuscode-property
// Date Accessed: 07/23/2023
// Used by Saiz Charolia

import axios from 'axios';

const baseURL = "http://localhost:3001/api"

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
    const res = await axios.post(`${baseURL}/register`,data);
    return res.data; 
  } catch (error) {
    return error;
  }
}

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
}

// loginUser created by Saiz Charolia
// axios post request referred from LogRocket
// URL: https://blog.logrocket.com/how-to-use-axios-post-requests/
// Date Accessed: 07/23/2023
export const loginUser = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/login`, data);
    return res.data;
  } catch (error) {
    return error
  }
}

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
    console.error(error);
    return false;
  }
}
  
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
    console.error('Failed to verify reset code:', error);
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
    console.error('Failed to reset password:', error);
    return false;
  }
}

// profileUserDetails created by Saiz Charolia
// axios post request referred from LogRocket
// URL: https://blog.logrocket.com/how-to-use-axios-post-requests/
// Date Accessed: 07/23/2023
export const profileUserDetails  = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/profile_setting`, data);
    return res.data;
  } catch (error) {
    return error
  }
}