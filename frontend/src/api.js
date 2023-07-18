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
        const res = await axios.post(`${baseURL}/`);
        return res.data; 
    } catch (error) {
        console.error(error);
    }
}