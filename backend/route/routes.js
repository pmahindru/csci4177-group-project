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
app.post(`${baseURL}/login`, controller.loginUser);
app.get(`${baseURL}/order-history/:userId`, controller.getOrderHistory);
app.get(`${baseURL}/payments/:userId`, controller.getPayments);
app.put(`${baseURL}/payments/:paymentId`, controller.editPayment);
app.delete(`${baseURL}/payments/:paymentId`, controller.deletePaymentMethod);
app.post(`${baseURL}/create-payment`, controller.createPayment);
app.put(`${baseURL}/reviews/:reviewId`, controller.editReview);
app.post(`${baseURL}/reviews`, controller.createReview);
app.get(`${baseURL}/review/:userId/:adId`, controller.getReview);
app.get(`${baseURL}/cart/:userId`, controller.getCart);
app.delete(`${baseURL}/cart/:itemId`, controller.deleteCartItem);
app.get(`${baseURL}/reviews/:userId`, controller.getReviews);
app.get(`${baseURL}/favourites/:userId`, controller.getFavourites);
app.delete(`${baseURL}/favourites/:favouriteId`, controller.deleteFavourite);
app.get(`${baseURL}/track-orders/:userId`, controller.getTrackedOrders);
module.exports = app;