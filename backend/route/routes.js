const express = require("express");
const app = express();
const cors = require("cors");
const controller = require("../controller/controller");

app.use(cors());
app.use(express.json());

const baseURL = "/api";

// calling the controller method
app.get(`${baseURL}/`, controller.getSignUpUser); // by Saiz Charolia
app.post(`${baseURL}/register`, controller.registerUser); // by Saiz Charolia
app.post(`${baseURL}/login`, controller.loginUser); // by Saiz Charolia
app.post(`${baseURL}/generate-reset-code`, controller.generateResetCode); // by Saiz Charolia
app.get(`${baseURL}/get-reset-code`, controller.verifyResetCode); // by Saiz Charolia
app.post(`${baseURL}/reset-password`, controller.resetNewPassword); // by Saiz Charolia

module.exports = app;