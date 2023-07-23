const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Team24:qwhoZh2NkExdtQu5@shopaestheticscluster.za4i1fn.mongodb.net/";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

const getAllUserSignup = async () => {
    try {
      // connection with db
      await client.connect();

      // call the db name and collection
      const db = client.db("User_Management");
      const collection = db.collection("Signup");

      const user = await collection.find().toArray();

      await client.close();

      return user;
    } catch (error) {
      return error;
    }
}

const registerUser = async (data) => {
    try {
      // connection with db
      await client.connect();

      // call the db name and collection
      const db = client.db("User_Management");
      const collection = db.collection("Signup");

      const addUser = await collection.insertOne(data);

      await client.close();
      
      return addUser;
    } catch (error) {
      return error;
    }
}

const loginUserModel = async (data) => {
  try {
    // connection with db
    await client.connect();

    // call the db name and collection
    const db = client.db("User_Management");
    const collection = db.collection("Signup");

    const user = await collection.findOne(data);

    await client.close();
    
    return user;
  } catch (error) {
    return error;
  }
}
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
    await client.close();
    console.log("closed!");
    console.log(ordersWithAdDetails);
    return ordersWithAdDetails;

    // Ensures that the client will close when you finish/error
    
  }catch (error) {
    console.error(error); // Log the actual error message
    response.status(500).json({ error: 'Internal Server Error' });
  }
}
const getCart = async (userId) => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    
    //call db name and collection
    const orderdb = client.db("Order_Management");
    const orderCollection = orderdb.collection("Cart");

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
    await client.close();
    console.log("closed!");
    console.log(ordersWithAdDetails);
    return ordersWithAdDetails;

    // Ensures that the client will close when you finish/error
    
  }catch (error) {
    console.error(error); // Log the actual error message
    response.status(500).json({ error: 'Internal Server Error' });
  }
};
const getPayments = async (userId) => {
  try {
   

    // Connect the client to the server    (optional starting in v4.7)
    await client.connect();
    
    
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
    response.status(500).json(error);
  }
}
const createPayment = async (data) => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    
    const db = client.db("Order_Management");
    const collection = db.collection("Payments");
    const newPayment = await collection.insertOne(data);

    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("closed!");
    return newPayment;
  } catch (error) {
    console.error(error);
    throw error; // Propagate the error back to the calling function
  }
};
const createReview = async (data) => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    
    const db = client.db("Order_Management");
    const collection = db.collection("Reviews");
    const newReview = await collection.insertOne(data);

    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("closed!");
    return newReview;
  } catch (error) {
    console.error(error);
    throw error; // Propagate the error back to the calling function
  }
};
const editPayment = async(paymentId, paymentData) => {
  try {
   

    // Connect the client to the server    (optional starting in v4.7)
    await client.connect();
    
    
    const db = client.db("Order_Management");
    const Collection = db.collection("Payments");
    const payment = await Collection.updateOne({ _id: paymentId }, {$set: paymentData});
    console.log(payment);
  
    // Ensures that the client will close when you finish/error
    await client.close();
    
    return payment;
  } catch (error) {
    console.log("Error");
    throw error;
  }
}
const getReviews = async (userId) => {
  try {
   

    // Connect the client to the server    (optional starting in v4.7)
    await client.connect();
    
    
    const db = client.db("Order_Management");
    const Collection = db.collection("Reviews");
    const review = await Collection.find({ user_id: userId }).toArray();
    console.log(review);
  
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("closed!");
    return review;
  } catch (error) {
    console.log("Error");
    response.status(500).json(error);
  }
}
const getReview = async (userId,adId) => {
  try {
   

    // Connect the client to the server    (optional starting in v4.7)
    await client.connect();
    
    
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
    response.status(500).json(error);
  }
}
const editReview = async(reviewId, reviewData) => {
  try {
   

    // Connect the client to the server    (optional starting in v4.7)
    await client.connect();
    
    
    const db = client.db("Order_Management");
    const Collection = db.collection("Reviews");
    const review = await Collection.updateOne({ _id: reviewId }, {$set: reviewData});
    console.log(review);
  
    // Ensures that the client will close when you finish/error
    await client.close();
    
    return review;
  } catch (error) {
    console.log("Error");
    throw error;
  }
}
const deletePaymentMethod = async(paymentId) => {
  try {
   

    // Connect the client to the server    (optional starting in v4.7)
    await client.connect();
    
    
    const db = client.db("Order_Management");
    const Collection = db.collection("Payments");
    const deleteResult = await Collection.deleteOne({ _id: paymentId });
    console.log(deleteResult);
  
    // Ensures that the client will close when you finish/error
    await client.close();
    
    return deleteResult;
  } catch (error) {
    console.log("Error");
    throw error;
  }
}
const getFavourites = async (userId) => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    
    //call db name and collection
    const orderdb = client.db("Order_Management");
    const orderCollection = orderdb.collection("Favourites");

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
    await client.close();
    console.log("closed!");
    console.log(ordersWithAdDetails);
    return ordersWithAdDetails;

    // Ensures that the client will close when you finish/error
    
  }catch (error) {
    console.error(error); // Log the actual error message
    response.status(500).json({ error: 'Internal Server Error' });
  }
}
const deleteFavourite = async(favouriteId) => {
  try {
   

    // Connect the client to the server    (optional starting in v4.7)
    await client.connect();
    
    
    const db = client.db("Order_Management");
    const Collection = db.collection("Favourites");
    const deleteResult = await Collection.deleteOne({ _id: favouriteId });
    console.log(deleteResult);
  
    // Ensures that the client will close when you finish/error
    await client.close();
    
    return deleteResult;
  } catch (error) {
    console.log("Error");
    throw error;
  }
}
module.exports = {
    getAllUserSignup,
    registerUser,
    loginUserModel,
    getOrderHistory,
    getPayments,
    createPayment,
    editPayment,
    deletePaymentMethod,
    getReviews,
    getCart,
    getFavourites,
    deleteFavourite,
    createReview,
    getReview,
    editReview,
}