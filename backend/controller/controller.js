// Created by Pranav Mahindru
// status codes referred from educative
// URL: https://www.educative.io/answers/how-to-use-the-nodejs-httpserverresponsestatuscode-property
// Date Accessed: 07/23/2023
// Used by Saiz Charolia

const model = require("../model/model");
const uuid = require("uuid");

// nodemailer and overall mailing system referred from nodemailer
// URL: https://nodemailer.com/about/
// Date Accessed: 07/23/2023
// Used by Saiz Charolia

const nodemailer = require("nodemailer");
// transporter created by Saiz Charolia
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shopaesthetics01@gmail.com",
    pass: "kibbicuuhilxovsj",
  },
});

// getSignUpUser created by Saiz Charolia
const getSignUpUser = async (req, res) => {
  try {
    const data = await model.getAllUserSignup();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// getSignUpUser created by Saiz Charolia
const registerUser = async (req, res) => {
  try {
    const isEmailExists = await model.checkEmailExists({
      email: req.body.email,
    });

    if (isEmailExists) {
      res
        .status(400)
        .json({ message: "Email already exists\nUse a different email" });
      return;
    }

    // adding everything in the database
    const newUser = {
      _id: uuid.v4(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      address: req.body.addr,
      password: req.body.password,
      location: req.body.loc,
      phone: req.body.phone,
    };

    const data = await model.registerUser(newUser);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// loginUser created by Saiz Charolia
const loginUser = async (req, res) => {
  try {
    const validateUser = {
      email: req.body.email,
    };

    const data = await model.loginUserModel(validateUser);

    if (!data) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    if (data.password !== req.body.password) {
      res.status(401).json({ message: "Invalid Password" });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// generateResetCode created by Saiz Charolia
const generateResetCode = async (req, res) => {
  try {
    const { email, resetCode } = req.body;

    const updatedUser = await model.saveResetCode(email, resetCode);

    try {
      // email format referred from nodemailer
      // URL: https://nodemailer.com/about/
      // Date Accessed: 07/23/2023
      const mailOptions = {
        from: "ShopAesthetics01@gmail.com",
        to: email,
        subject: "Reset Code for Password Recovery",
        text: `Your reset code is: ${resetCode}`,
      };
      await transporter.sendMail(mailOptions);
    } catch (error) {
      return error;
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

// verifyResetCode created by Saiz Charolia
const verifyResetCode = async (req, res) => {
  try {
    const { email, resetCode } = req.query;

    const isCodeValid = await model.verifyCode(email, resetCode);

    if (isCodeValid) {
      res.status(200).json({ message: "Reset code is valid." });
    } else {
      res.status(400).json({ message: "Reset code is not valid." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

// resetNewPassword created by Saiz Charolia
const resetNewPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const updatedUser = await model.saveNewPassword(email, password);

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get order history with users id (Patrick Wooden)
const getOrderHistory = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await model.getOrderHistory(userId);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get cart with users id (Patrick Wooden)
const getCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await model.getCart(userId);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
//delete a cart item with item id (Patrick Wooden)
const deleteCartItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    const data = await model.deleteCartItem(itemId);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
//create a new order using request data(Patrick Wooden)
const createOrder = async (req, res) => {
  try {

    const orders = req.body.orderArray; 
    
    
    const newOrders = orders.map((order) => ({
      _id: uuid.v4(),
      user_id: order.user_id,
      ad_id: order.ad_id,
      date_purchased: order.date_purchased,
      address: order.address,
      status: order.status,
    }));
    

    const response = await model.createOrder(newOrders);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all payment methods for logged in user id(Patrick Wooden)
const getPayments = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await model.getPayments(userId);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
//put method a cart item with payment id and data(Patrick Wooden)
const editPayment = async (req, res) => {
  try {
    const paymentId = req.params.paymentId;
    const paymentData = req.body;
    const data = await model.editPayment(paymentId, paymentData);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
//delete a payment method with a payment id (Patrick Wooden)
const deletePaymentMethod = async (req, res) => {
  try {
    const paymentId = req.params.paymentId;

    const data = await model.deletePaymentMethod(paymentId);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
//create a payment method with payment data (Patrick Wooden)
const createPayment = async (req, res) => {
  try {
    const newPayment = {
      _id: uuid.v4(),
      user_id: req.body.user_id,
      card_number: req.body.card_number,
      expiry: req.body.expiry,
      cvv: req.body.cvv,
      fname: req.body.firstName,
      lname: req.body.lastName,
      address: req.body.address,
    };
    const response = await model.createPayment(newPayment);
    if (response && response.data) {
      res.status(200).json(data);
    } else {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
//create a review with the request data(Patrick Wooden)
const createReview = async (req, res) => {
  try {
    const newReview = {
      _id: uuid.v4(),
      user_id: req.body.user_id,
      star_rating: req.body.star_rating,
      review: req.body.review,
      ad_id: req.body.ad_id,
      title: req.body.title,
    };
    const response = await model.createReview(newReview);
    if (response && response.data) {
      res.status(200).json(response);
    } else {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
//get all favourited ads using logged in users id (Patrick Wooden)
const getFavourites = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await model.getFavourites(userId);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
//delete a favourited ad based on its id (Patrick Wooden)
const deleteFavourite = async (req, res) => {
  try {
    const favouriteId = req.params.favouriteId;

    const data = await model.deleteFavourite(favouriteId);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
//get all reviews a based on the loggegd in users id (Patrick Wooden)
const getReviews = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await model.getReviews(userId);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
//get a specific review using the adId and the logged in users id (Patrick Wooden)
const getReview = async (req, res) => {
  try {
    const adId = req.params.adId;
    const userId = req.params.userId;
    const data = await model.getReview(userId, adId);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
//put method to edit a existing review using review id and the review data (Patrick Wooden)
const editReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const reviewData = req.body;
    const data = await model.editReview(reviewId, reviewData);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
//get all orders with the status in transit (Patrick Wooden)
const getTrackedOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await model.getTrackedOrders(userId);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

//create a new favourite ad based off request body (Patrick Wooden)
const createFavourite = async (req, res) => {
  try {
    const newFavourite = {
      _id: uuid.v4(),
      user_id: req.body.user_id,
      ad_id: req.body.ad_id,
    };
    const response = await model.createFavourite(newFavourite);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
//add a new item to the users cart using req body (Patrick Wooden)
const createCartItem = async (req, res) => {
  try {
    const newItem = {
      _id: uuid.v4(),
      user_id: req.body.user_id,
      ad_id: req.body.ad_id,
    };
   
    const response = await model.createCartItem(newItem);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await model.addMessageModel({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data)
      return res.status(200).json({ msg: "Message added successfully." });
    else
      return res
        .status(200)
        .json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await model.findMessages({
      users: {
        $all: [from, to],
      },
    });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.status(200).json(projectedMessages);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await model.findUsers({ _id: { $ne: req.params.id } });
    return res.json(users);
  } catch (ex) {
    res.status(500).json(ex);
  }
};

// SELLER PORTAL CONTROLLER METHODS
// add new post Ad (Pranav Mahindru)
const addNewPostAd = async (req,res) => {
    try {
      if (Object.keys(req.body).length === 0) {
          res.status(401).json({message: "Invalid Input"});
          return;
      }

      const add_new_post = {
          "_id" : uuid.v4(),
          "user_id": req.body.user_id,
          "category" : req.body.category,
          "condition" : req.body.condition,
          "description" : req.body.description,
          "image" : req.body.image,
          "location" : req.body.location,
          "payments_type" : req.body.payments_type,
          "price" : req.body.price,
          "prod_tags" : req.body.prod_tags,
          "title" : req.body.title,
          "type" : req.body.type,
          "status" : req.body.status,
          'isActive' : req.body.isActive,
          'product_status' : req.body.product_status
      };
      // send to the model
      await model.addNewPostAd(add_new_post);
      res.status(200).json({message: "Successfully Add New Ad"});
    } catch (error) {
      res.status(500).json(error);
    }
}

// save post Ad (Pranav Mahindru)
const savePostAd = async (req,res) => {
    try {
      if (Object.keys(req.body).length === 0) {
          res.status(401).json({message: "Invalid Input"});
          return;
      }

      const save_post = {
          "_id" : uuid.v4(),
          "user_id": req.body.user_id,
          "category" : req.body.category,
          "condition" : req.body.condition,
          "description" : req.body.description,
          "image" : req.body.image,
          "location" : req.body.location,
          "payments_type" : req.body.payments_type,
          "price" : req.body.price,
          "prod_tags" : req.body.prod_tags,
          "title" : req.body.title,
          "type" : req.body.type,
          "status" : req.body.status,
          'isActive' : req.body.isActive,
          'product_status' : req.body.product_status
      };
        
      // send to the model
      await model.savePostAd(save_post);
      res.status(200).json({message: "Successfully Save Ad"});
    } catch (error) {
      res.status(500).json(error);
    }
}

// get all posted Ad (Pranav Mahindru)
const getAllSavePostedAd = async (req,res) => {
    try {
      const { _id, user_id} = req.body
      if (req.body.user_id !== undefined) {
        const data = await model.getAllSavePostedAd({"user_id": req.body.user_id});
        res.status(200).json(data);
      }
      else {
        const data = await model.getAllSavePostedAd({"_id": req.body._id});
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json(error);
    }
}

// get all posted Ad (Pranav Mahindru)
const getAllPostedAd = async (req,res) => {
    try {
      const data = await model.getAllPostedAd({"user_id": req.body.user_id, "isActive": req.body.isActive});
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(object);
    }
}

const getPostForDashboard = async (req,res) => {
    try {
      const data = await model.getAllPostedAd({});
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(object);
    }
}

// get posted Ad with specific Id (Pranav Mahindru)
const getPostAdWithId = async (req,res) => {
    try {
      const data = await model.getAllPostedAd({"_id": req.params.postId});
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
}

// pause posted Ad with specific Id (Pranav Mahindru)
const pausePostAdWithId = async (req,res) => {
    try {
      const data = await model.pausePostAdWithId(req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
}

// get posted Ad with specific Id (Pranav Mahindru)
const updatePostWithId = async (req,res) => {
    try {
      await model.updatePostWithId({"_id": req.params.postId}, {$set: req.body});
      res.status(200).json({message: "Successfully Update Ad"});
    } catch (error) {
      res.status(500).json(error);
    }
}

// preview save posted Ad with specific Id (Pranav Mahindru)
const previewSavePostAd = async (req,res) => {
    try {
      await model.previewSavePostAd({"_id": req.params.postId}, {$set: req.body});
      res.status(200).json({message: "Successfully Update Ad"});
    } catch (error) {
      res.status(500).json(error);
    }
}

// delete posted Ad with specific Id (Pranav Mahindru)
const deletePostWithId = async (req,res) => {
    try {
      await model.deletePostWithId({"_id": req.params.postId});
      res.status(200).json({message: "Successfully Delete Ad"});
    } catch (error) {
      res.status(500).json(error);
    }
}

// delete save Ad with specific Id (Pranav Mahindru)
const deleteSaveWithId = async (req,res) => {
    try {
      await model.deleteSaveWithId({"_id": req.params.postId});
      res.status(200).json({message: "Successfully Delete Ad"});
    } catch (error) {
      res.status(500).json(error);
    }
}

// get user with specific Id (Pranav Mahindru)
const loginUserModel = async (req,res) => {
    try {
      const data = await model.loginUserModel({"_id": req.params.userId});
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
}

// for the 2FA (Pranav Mahindru)
// refer to the generate reset code method
const twoFactorAuthentication = async (req, res) => {
  try {
    const { email, authenticationCode } = req.body;
    try {
      // email format referred from nodemailer
      // URL: https://nodemailer.com/about/
      // Date Accessed: 07/23/2023
      const mailOptions = {
        from: "ShopAesthetics01@gmail.com",
        to: email,
        subject: "2FA Code",
        text: `Your code for login is: ${authenticationCode}`,
      };
      await transporter.sendMail(mailOptions);
    } catch (error) {
      return error;
    }

    res.status(200).json({message: authenticationCode});
  } catch (error) {
    res.status(500).json(error);
  }
};

const addToUserInteraction = async (req, res) => {
  try {
      const data = await model.addToUserInteraction(req.body, uuid.v4());
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
};

/* User Profile Settings READ and UPDATE ControllerS | By: Joel Kuruvilla */
const userProfileSettingsRead = async (req, res) => { //Profile READ Controller | Joel Kuruvilla
  try {
    const userSettingConfigs = await model.userProfileSettingsReadModel({ "user_id": req.params.userID });
    return res.status(200).json(userSettingConfigs);
  } 
  catch (error) {
    res.status(500).json(error);
  }
};
const userProfileSettingsUpdate = async (req, res) => { //Profile UPDATE Controller | Joel Kuruvilla
  try {
    const userID = req.params.userID;
    const dataToUpdate = req.body;
    const settingChanges = await model.userProfileSettingsUpdateModel(userID, dataToUpdate);
    return res.status(200).json(settingChanges);
  } 
  catch (error) {
    res.status(500).json(error);
  }
};

/* User SignUp UPDATE Controller | By: Joel Kuruvilla */
const signupUpdate = async (req, res) => { //SignUp Controller | Joel Kuruvilla
  try {
    const userID = req.params.userID;
    const dataToUpdate = req.body;
    const settingChanges = await model.signupUpdateModel(userID, dataToUpdate);
    return res.status(200).json(settingChanges);
  } 
  catch (error) {
    res.status(500).json(error);
  }
};

/* User Notification Settings READ and UPDATE ControllerS | By: Joel Kuruvilla */
const userNotificationSettingsRead = async (req, res) => { //Notifications READ Controller | Joel Kuruvilla
  try {
    const userSettingConfigs = await model.userNotificationSettingsReadModel({"user_id": req.params.userID});
    return res.status(200).json(userSettingConfigs);
  } 
  catch (error) {
    res.status(500).json(error);
  }
};
const userNotificationSettingsUpdate = async (req, res) => { //Notifications UPDATE Controller | Joel Kuruvilla
  try {
    const userID = req.params.userID;
    const dataToUpdate = req.body;
    const settingChanges = await model.userNotificationSettingsUpdateModel(userID, dataToUpdate);
    return res.status(200).json(settingChanges);
  } 
  catch (error) {
    res.status(500).json(error);
  }
};

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
  generateResetCode,
  verifyResetCode,
  resetNewPassword,
  addMessage,
  getMessages,
  getAllUsers,
  userProfileSettingsRead,
  userProfileSettingsUpdate,
  signupUpdate,
  userNotificationSettingsRead,
  userNotificationSettingsUpdate,
  savePostAd,
  getAllSavePostedAd,
  getAllPostedAd,
  getPostForDashboard,
  getPostAdWithId,
  pausePostAdWithId,
  addNewPostAd,
  updatePostWithId,
  previewSavePostAd,
  deletePostWithId,
  deleteSaveWithId,
  loginUserModel,
  twoFactorAuthentication,
  addToUserInteraction,
};
