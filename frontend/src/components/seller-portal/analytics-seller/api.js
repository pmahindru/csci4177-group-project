import axios from "axios";

const baseURL = "http://localhost:3001/api";

export const createUser = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/register`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllUser = async () => {
  try {
    const res = await axios.get(`${baseURL}/`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/login`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const allUsersRoute = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/login`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
