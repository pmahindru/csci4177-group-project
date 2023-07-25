// CRUD operations referred from MongoDB
// URL: https://mongodb.github.io/node-mongodb-native/3.0/reference/ecmascriptnext/crud/
// Date Accessed: 07/23/2023
// Used by Saiz Charolia

const { MongoClient, ServerApiVersion } = require('mongodb');
const crypto = require('crypto');

const uri = "mongodb+srv://Team24:qwhoZh2NkExdtQu5@shopaestheticscluster.za4i1fn.mongodb.net/";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// getAllUserSignup created by Saiz Charolia
const getAllUserSignup = async () => {
  try {

    await client.connect();

    // calling the db and the collection
    const db = client.db("User_Management");
    const collection = db.collection("Signup");

    const user = await collection.find().toArray();

    await client.close();
    return user;

  } catch (error) {
    return error;
  }
}

// registerUser created by Saiz Charolia
const registerUser = async (data) => {
  try {
  
    await client.connect();

    // calling the db and the collection
    const db = client.db("User_Management");
    const collection = db.collection("Signup");

    const addUser = await collection.insertOne(data);

    await client.close();
    return addUser;

  } catch (error) {
    return error;
  }
}

// loginUserModel created by Saiz Charolia
const loginUserModel = async (data) => {
  try {

    await client.connect();

    // calling the db and the collection
    const db = client.db("User_Management");
    const collection = db.collection("Signup");

    const user = await collection.findOne(data);

    await client.close();
    return user;

  } catch (error) {
    return error;
  }
}

// saveResetCode created by Saiz Charolia
const saveResetCode = async (email, resetCode) => {
  try {

    await client.connect();

    // calling the db and the collection
    const db = client.db("User_Management");
    const collection = db.collection("Signup");

    // Update the user record with the reset code
    const updatedUser = await collection.findOneAndUpdate(
      { email },
      { $set: { resetCode } },
      { returnOriginal: false }
    );

    await client.close();
    return updatedUser;

  } catch (error) {
    return error;
  }
}

// verifyCode created by Saiz Charolia
const verifyCode = async (email, resetCode) => {
  try {

    await client.connect();

    // calling the db and the collection
    const db = client.db("User_Management");
    const collection = db.collection("Signup");

    const user = await collection.findOne({ email });
    
    await client.close();
    return user && user.resetCode == resetCode;
    
  } catch (error) {
    return false;
  }
}

// saveNewPassword created by Saiz Charolia
const saveNewPassword = async (email, password) => {
  try {

    await client.connect();

    // calling the db and the collection
    const db = client.db("User_Management");
    const collection = db.collection("Signup");

    const updatedUser = await collection.findOneAndUpdate(
      { email },
      { $set: { password } },
      { returnOriginal: false }
    );

    await client.close();
    return updatedUser;

  } catch (error) {
    return error;
  }
}

// checkEmailExists created by Saiz Charolia
const checkEmailExists = async (data) => {
  try {

    await client.connect();

    // calling the db and the collection
    const db = client.db("User_Management");
    const collection = db.collection("Signup");

    const user = await collection.findOne(data);

    await client.close();
    return !!user; 

  } catch (error) {
    console.error('Error checking email existence:', error);
    return false;
  }
};
 
//get order history for logged user using users id (Patrick Wooden)
const getOrderHistory = async (userId) => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    
    //call db name and collection
    const orderdb = client.db("Order_Management");
    const orderCollection = orderdb.collection("Orders");

    //put into an array as we need to get each ad details to return to the user
    const orderList = await orderCollection.find({ user_id : userId }).toArray();
    const addb = client.db("Seller_Management");
    const adCollection = addb.collection("post_ad");
    const ordersWithAdDetails = await Promise.all(orderList.map(async (order) => {
      const adId = order.ad_id;
      
      const ad = await adCollection.findOne({ _id: adId });
      return {
        ...order,
        ad_details: ad,
      };
    }));
     // Ensures that the client will close when you finish/error
    await client.close();
    console.log("closed!");
    console.log(ordersWithAdDetails);
    return ordersWithAdDetails;

   
    
  }catch (error) {
    console.error(error); 
    return error; 
  }
}
//get every item in a cart for a user using user_id (Patrick Wooden)
const getCart = async (userId) => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    
    //call db name and collection
    const cartdb = client.db("Order_Management");
    const cartCollection = cartdb.collection("Cart");

    //put into an array as we need to get each ad details to return to the user
    const cartList = await cartCollection.find({ user_id : userId }).toArray();
    const addb = client.db("Seller_Management");
    const adCollection = addb.collection("post_ad");
    const cartWithAdDetails = await Promise.all(cartList.map(async (item) => {
      const adId = item.ad_id;
      
      const ad = await adCollection.findOne({ _id: adId });
      return {
        ...item,
        ad_details: ad,
      };
    }));
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("closed!");
    console.log(cartWithAdDetails);
    return cartWithAdDetails;

    
    
  }catch (error) {
    console.error(error);
    return error; 
  }
};
//delete a item in a users cart based on the items id (Patrick Wooden)
const deleteCartItem = async(itemId) => {
  try {
   

    // Connect the client to the server    (optional starting in v4.7)
    await client.connect();
    
    //call db name and collection
    const db = client.db("Order_Management");
    const Collection = db.collection("Cart");
    const deleteResult = await Collection.deleteOne({ _id: itemId });
    console.log(deleteResult);
  
    // Ensures that the client will close when you finish/error
    await client.close();
    
    return deleteResult;
  } catch (error) {
    console.log("Error");
    return error;
  }
}
//get all the payment methods a user has using user id (Patrick Wooden)
const getPayments = async (userId) => {
  try {
   

    // Connect the client to the server    (optional starting in v4.7)
    await client.connect();
    
    //call db name and collection
    const db = client.db("Order_Management");
    const Collection = db.collection("Payments");
    const payment = await Collection.find({ user_id: userId }).toArray();
    console.log(payment);
  
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("closed!");
    return payment;
  } catch (error) {
    console.log("Error");
    return error;
  }
}
//create a new payment method using data sent from controller (Patrick Wooden)
const createPayment = async (data) => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    //call db name and collection
    const db = client.db("Order_Management");
    const collection = db.collection("Payments");
    const newPayment = await collection.insertOne(data);

    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("closed!");
    return newPayment;
  } catch (error) {
    console.error(error);
    return error; 
  }
};
//create a new review using data sent over from controller(Patrick Wooden)
const createReview = async (data) => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    //call db name and collection
    const db = client.db("Order_Management");
    const collection = db.collection("Reviews");
    const newReview = await collection.insertOne(data);

    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("closed!");
    return newReview;
  } catch (error) {
    console.error(error);
    return error; 
  }
};
//edit a payment method using the paymentId and paymentData sent over from controller (Patrick Wooden)
const editPayment = async(paymentId, paymentData) => {
  try {
   

    // Connect the client to the server    (optional starting in v4.7)
    await client.connect();
    
    //call db name and collection
    const db = client.db("Order_Management");
    const Collection = db.collection("Payments");
    const payment = await Collection.updateOne({ _id: paymentId }, {$set: paymentData});
    console.log(payment);
  
    // Ensures that the client will close when you finish/error
    await client.close();
    
    return payment;
  } catch (error) {
    console.log("Error");
    return error;
  }
}
//get all reviews for a user using userId (Patrick Wooden)
const getReviews = async (userId) => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    
    //call db name and collection
    const reviewdb = client.db("Order_Management");
    const reviewsCollection = reviewdb.collection("Reviews");

    //put into an array as we need to get each ad details to return to the user
    const reviewsList = await reviewsCollection.find({ user_id : userId }).toArray();
    const addb = client.db("Seller_Management");
    const adCollection = addb.collection("post_ad");
    const reviewsWithAdDetails = await Promise.all(reviewsList.map(async (review) => {
      const adId = review.ad_id;
      
      const ad = await adCollection.findOne({ _id: adId });
      return {
        ...review,
        ad_details: ad,
      };
    }));
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("closed!");
    console.log(reviewsWithAdDetails);
    return reviewsWithAdDetails;

    
    
  }catch (error) {
    console.error(error); 
    return error;
  }
}
//get a specific review using userId and adId (Patrick Wooden)
const getReview = async (userId,adId) => {
  try {
   

    // Connect the client to the server    (optional starting in v4.7)
    await client.connect();
    
    //call db name and collection
    const db = client.db("Order_Management");
    const Collection = db.collection("Reviews");
    const review = await Collection.findOne({ user_id: userId, ad_id: adId });
    console.log(review);
  
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("closed!");
    return review;
  } catch (error) {
    console.log("Error");
    return error;
  }
}
//edit a review by finding it using reviewId and then setting the reviewData (Patrick Wooden)
const editReview = async(reviewId, reviewData) => {
  try {
   

    // Connect the client to the server    (optional starting in v4.7)
    await client.connect();
    
    //call db name and collection
    const db = client.db("Order_Management");
    const Collection = db.collection("Reviews");
    const review = await Collection.updateOne({ _id: reviewId }, {$set: reviewData});
    console.log(review);
  
    // Ensures that the client will close when you finish/error
    await client.close();
    
    return review;
  } catch (error) {
    console.log("Error");
    return error;
  }
}
//delete a payment method using its id (Patrick Wooden)
const deletePaymentMethod = async(paymentId) => {
  try {
   

    // Connect the client to the server    (optional starting in v4.7)
    await client.connect();
    
    //call db name and collection
    const db = client.db("Order_Management");
    const Collection = db.collection("Payments");
    const deleteResult = await Collection.deleteOne({ _id: paymentId });
    console.log(deleteResult);
  
    // Ensures that the client will close when you finish/error
    await client.close();
    
    return deleteResult;
  } catch (error) {
    console.log("Error");
    return error;
  }
}
//get all favourited ads a user has using the userId (Patrick Wooden)
const getFavourites = async (userId) => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    
    //call db name and collection
    const favouritedb = client.db("Order_Management");
    const favouriteCollection = favouritedb.collection("Favourites");

    //put into an array as we need to get each ad details to return to the user
    const favouriteList = await favouriteCollection.find({ user_id : userId }).toArray();
    const addb = client.db("Seller_Management");
    const adCollection = addb.collection("post_ad");
    const favouritesWithAdDetails = await Promise.all(favouriteList.map(async (favourite) => {
      const adId = favourite.ad_id;
      
      const ad = await adCollection.findOne({ _id: adId });
      return {
        ...favourite,
        ad_details: ad,
      };
    }));
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("closed!");
    console.log(favouritesWithAdDetails);
    return favouritesWithAdDetails;

    
    
  }catch (error) {
    console.error(error); 
    return error;
  }
}
//delete a favourited ad using its id (Patrick Wooden)
const deleteFavourite = async(favouriteId) => {
  try {
   

    // Connect the client to the server    (optional starting in v4.7)
    await client.connect();
    
    //call db name and collection
    const db = client.db("Order_Management");
    const Collection = db.collection("Favourites");
    const deleteResult = await Collection.deleteOne({ _id: favouriteId });
    console.log(deleteResult);
  
    // Ensures that the client will close when you finish/error
    await client.close();
    
    return deleteResult;
  } catch (error) {
    console.log("Error");
    return error;
  }
}
// get all orders from order history using userId status if its in transit (Patrick Wooden)
const getTrackedOrders = async (userId) => {
  try {
    await client.connect();
    const status = "In Transit";

    const orderdb = client.db("Order_Management");
    const orderCollection = orderdb.collection("Orders");
    const orderList = await orderCollection.find({ user_id: userId, status: status }).toArray();
    console.log(orderList);

    const addb = client.db("Seller_Management");
    const adCollection = addb.collection("post_ad");
    const ordersWithAdDetails = await Promise.all(
      orderList.map(async (order) => {
        const adId = order.ad_id;
        const ad = await adCollection.findOne({ _id: adId });
        return {
          ...order,
          ad_details: ad,
        };
      })
    );

    await client.close();
    console.log("closed!");
    console.log(ordersWithAdDetails);

    return ordersWithAdDetails;
  } catch (error) {
    console.error(error);
    return error;
  }
}

//create a new order using the data sent over from the controller (Patrick Wooden)
const createOrder = async (data) => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    //call db name and collection
    const db = client.db("Order_Management");
    const collection = db.collection("Orders");
    const newOrder = await collection.insertOne(data);

    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("closed!");
    return newOrder;
  } catch (error) {
    console.error(error);
    return error; 
  }
};
//create a new favourited order using the data sent over from the controller (Patrick Wooden)
const createFavourite = async (data) => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    //call db name and collection
    const db = client.db("Order_Management");
    const collection = db.collection("Favourites");
    const newFavourite = await collection.insertOne(data);

    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("closed!");
    return newFavourite;
  } catch (error) {
    console.error(error);
    return error; 
  }
};
const createCartItem = async (data) => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    //call db name and collection
    const db = client.db("Order_Management");
    const collection = db.collection("Cart");
    const newItem = await collection.insertOne(data);

    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("closed!");
    return newItem;
  } catch (error) {
    console.error(error);
    return error; 
  }
};

module.exports = {
  getAllUserSignup,
  registerUser,
  loginUserModel,
  saveResetCode,
  verifyCode,
  saveNewPassword,
  checkEmailExists,
  getOrderHistory,
  getPayments,
  createPayment,
  editPayment,
  deletePaymentMethod,
  getReviews,
  getCart,
  deleteCartItem,
  getFavourites,
  deleteFavourite,
  createReview,
  getReview,
  editReview,
  getTrackedOrders,
  createOrder,
  createFavourite,
  createCartItem,

}
