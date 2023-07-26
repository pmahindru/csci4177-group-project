// Created by Pranav Mahindru
const express = require("express");
const app = express();
const cors = require("cors");
const controller = require("../controller/controller");
// const { addMessage, getMessages } = require("../controllers/messageController");

app.use(cors());
app.use(express.json({limit: "20mb"}));

// base url
const baseURL = "/api";

// calling the controller method
app.get(`${baseURL}/`, controller.getSignUpUser); // by Saiz Charolia
app.post(`${baseURL}/register`, controller.registerUser); // by Saiz Charolia
app.post(`${baseURL}/login`, controller.loginUser); // by Saiz Charolia
app.post(`${baseURL}/generate-reset-code`, controller.generateResetCode); // by Saiz Charolia
app.get(`${baseURL}/get-reset-code`, controller.verifyResetCode); // by Saiz Charolia
app.post(`${baseURL}/reset-password`, controller.resetNewPassword); // by Saiz Charolia
app.get(`${baseURL}/order-history/:userId`, controller.getOrderHistory);
app.post(`${baseURL}/orders`, controller.createOrder);
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
app.post(`${baseURL}/favourites`, controller.createFavourite);
app.post(`${baseURL}/cart`, controller.createCartItem);
app.delete(`${baseURL}/favourites/:favouriteId`, controller.deleteFavourite);
app.get(`${baseURL}/track-orders/:userId`, controller.getTrackedOrders);
//api for add
app.post(`${baseURL}/addmsg`, controller.addMessage);
app.post(`${baseURL}/getmsg`, controller.getMessages);
app.get(`${baseURL}/allusers/:id`, controller.getAllUsers);
// SELLER PORTAL ROUTES
app.post(`${baseURL}/seller/addPost`, controller.addNewPostAd);
app.post(`${baseURL}/seller/savePost`, controller.savePostAd);
app.post(`${baseURL}/seller/getPost`, controller.getAllPostedAd);
app.post(`${baseURL}/seller/getSavePost`, controller.getAllSavePostedAd);
app.post(`${baseURL}/seller/getPostAdWithId/:postId`, controller.getPostAdWithId);
app.put(`${baseURL}/seller/updatePostWithId/:postId`, controller.updatePostWithId);
app.delete(`${baseURL}/seller/deletePostWithId/:postId`, controller.deletePostWithId);

module.exports = app;
