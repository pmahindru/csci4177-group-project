const model = require("../model/model");
const uuid = require("uuid");

const getSignUpUser = async (req,res) => {
    try {
        const data = await model.getAllUserSignup();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
}

const registerUser = async (req,res) => {
    try {
        const newUser = {
            "_id" : uuid.v4(),
            "firstName" : req.body.firstName,
            "lastName" : req.body.lastName,
            "email" : req.body.email,
            "address" : req.body.addr,
            "password" : req.body.password,
            "location" : req.body.loc,
            "phone" : req.body.phone
        };
        const data = await model.registerUser(newUser);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
}

const loginUser = async (req,res) => {
    try {
        const validateUser = {
            "email" : req.body.email
        };
        const data = await model.loginUserModel(validateUser);

        if (!data) {
            res.status(400).json({ message: 'User not found' });
            return;
        }
        if (data.password !== req.body.password) {
            res.status(401).json({ message: 'Invalid Password' });
            return;
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
}
const getOrderHistory = async (req, res) => {
    try {
      const userId = req.params.userId;
      const data = await model.getOrderHistory(userId);
    
  
        res.status(200).json(data);
    } catch (error) {
      console.log("Error");
      res.status(500).json(error);
    }
  };
const getCart = async (req, res) => {
    try {
      const userId = req.params.userId;
      const data = await model.getCart(userId);
    
  
        res.status(200).json(data);
    } catch (error) {
      console.log("Error");
      res.status(500).json(error);
    }
  };
  const deleteCartItem = async (req, res) => {
    try {
      const itemId = req.params.itemId;
      
      const data = await model.deleteCartItem(itemId);
    
  
        res.status(200).json(data);
    } catch (error) {
      console.log("Error");
      res.status(500).json(error);
    }
  };
const getPayments = async (req, res) => {
    try {
      const userId = req.params.userId
      const data = await model.getPayments(userId);
    
  
        res.status(200).json(data);
    } catch (error) {
      console.log("Error");
      res.status(500).json(error);
    }
  };
  const editPayment = async (req, res) => {
    try {
      const paymentId = req.params.paymentId;
      const paymentData = req.body;
      const data = await model.editPayment(paymentId, paymentData);
    
  
        res.status(200).json(data);
    } catch (error) {
      console.log("Error");
      res.status(500).json(error);
    }
  };
const deletePaymentMethod = async (req, res) => {
    try {
      const paymentId = req.params.paymentId;
      
      const data = await model.deletePaymentMethod(paymentId);
    
  
        res.status(200).json(data);
    } catch (error) {
      console.log("Error");
      res.status(500).json(error);
    }
  };
const createPayment = async (req,res) => {
    try {
        console.log("request received:", req.body);
        const newPayment = {
            "_id" : uuid.v4(),
            "user_id" : req.body.user_id,
            "card_number" : req.body.card_number,
            "expiry" : req.body.expiry,
            "cvv" : req.body.cvv,
            "fname" : req.body.firstName,
            "lname" : req.body.lastName,
            "address" : req.body.address
        };
        console.log(newPayment);
        const response = await model.createPayment(newPayment);
        if (response && response.data) {
            res.status(200).json(data);
          } else {
            res.status(500).json(error);
          }
    } catch (error) {
        res.status(500).json(error);
        console.error('Error adding payment method:', error);
      }
}
const createReview = async (req,res) => {
  try {
    console.log("request received:", req.body);
    const newReview = {
      "_id": uuid.v4(),
      "user_id": req.body.user_id,
      "star_rating": req.body.star_rating,
      "review": req.body.review,
      "ad_id": req.body.ad_id,
      "title": req.body.title,
    };
    console.log(newReview);
    const response = await model.createReview(newReview);
    if (response && response.data) {
      res.status(200).json(response);
    } else {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
    console.error('Error adding review:', error);
  }
}
const getFavourites = async (req, res) => {
  try {
    const userId = req.params.userId
    const data = await model.getFavourites(userId);
  

      res.status(200).json(data);
  } catch (error) {
    console.log("Error");
    res.status(500).json(error);
  }
};
const deleteFavourite = async (req, res) => {
  try {
    const favouriteId = req.params.favouriteId;
    
    const data = await model.deleteFavourite(favouriteId);
  

      res.status(200).json(data);
  } catch (error) {
    console.log("Error");
    res.status(500).json(error);
  }
};
const getReviews = async (req, res) => {
  try {
    const userId = req.params.userId
    const data = await model.getReviews(userId);
  

      res.status(200).json(data);
  } catch (error) {
    console.log("Error");
    res.status(500).json(error);
  }
};
const getReview = async (req, res) => {
  try {
    const adId = req.params.adId
    const userId = req.params.userId
    const data = await model.getReview(userId,adId);
  

      res.status(200).json(data);
  } catch (error) {
    console.log("Error");
    res.status(500).json(error);
  }
};
const editReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const reviewData = req.body;
    const data = await model.editReview(reviewId, reviewData);
  

      res.status(200).json(data);
  } catch (error) {
    console.log("Error");
    res.status(500).json(error);
  }
};
const getTrackedOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await model.getTrackedOrders(userId);
    

      res.status(200).json(data);
  } catch (error) {
    console.log("Error");
    res.status(500).json(error);
  }
};
const createOrder = async (req,res) => {
  try {
    console.log("request received:", req.body);
    const newOrder = {
      "_id": uuid.v4(),
      "user_id": req.body.user_id,
      "ad_id": req.body.ad_id,
      "date_purchased": req.body.date_purchased,
      "address": req.body.address,
      "status": req.body.status,
    };
    console.log("Ran here");
    console.log(newOrder);
    const response = await model.createOrder(newOrder);
   
    res.status(200).json(response);
    
    
  } catch (error) {
    res.status(500).json(error);
    console.error('Error creating order:', error);
  }
}
const createFavourite = async (req,res) => {
  try {
    console.log("request received:", req.body);
    const newFavourite = {
      "_id": uuid.v4(),
      "user_id": req.body.user_id,
      "ad_id": req.body.ad_id,
      
    };
    console.log(newFavourite);
    const response = await model.createFavourite(newFavourite);
    
    res.status(200).json(response);
  
  } catch (error) {
    res.status(500).json(error);
    console.error('Error adding ad to favourites list:', error);
  }
}
const createCartItem = async (req,res) => {
  try {
    console.log("request received:", req.body);
    const newItem = {
      "_id": uuid.v4(),
      "user_id": req.body.user_id,
      "ad_id": req.body.ad_id,
      
    };
    console.log(newItem);
    const response = await model.createFavourite(newItem);
    if (response && response.data) {
      res.status(200).json(response);
    } else {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
    console.error('Error adding item to cart:', error);
  }
}
module.exports = {
    getSignUpUser,
    registerUser,
    loginUser,
    getOrderHistory,
    createOrder,
    getPayments,
    editPayment,
    deletePaymentMethod,
    createPayment,
    getCart,
    deleteCartItem,
    getFavourites,
    deleteFavourite,
    getReviews,
    createReview,
    getReview,
    editReview,
    getTrackedOrders,
    createFavourite,
    createCartItem,
}