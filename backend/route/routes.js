const express = require("express");
const app = express();
const cors = require("cors");
const controller = require("../controller/controller");

// access json and cors
app.use(cors());
app.use(express.json());

const baseURL = "/api";

// call the controller method
app.get(`${baseURL}/`, controller.getSignUpUser);
app.post(`${baseURL}/register`, controller.registerUser);

module.exports = app;