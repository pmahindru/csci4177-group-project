const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Team24:qwhoZh2NkExdtQu5@shopaestheticscluster.za4i1fn.mongodb.net/";

const uuid = require("uuid");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
app.use(express.json());

app.get("/api/",async(request,response)=>{
    try {
        // Connect the client to the server    (optional starting in v4.7)
         await client.connect();
    
        const db = client.db("User_Management");
        const collection = db.collection("Signup");
        const user = await collection.find().toArray();
        console.log(user);
        
        response.status(200).json(user);

        // Ensures that the client will close when you finish/error
        await client.close();
        console.log("closed!");
    
      } catch (error) {
        console.log("Error");
        response.status(500).json(error);
      }
});

app.post("/api/register", async(request,response)=>{

  try {
      // Connect the client to the server    (optional starting in v4.7)
       await client.connect();
  
      const db = client.db("User_Management");
      const collection = db.collection("Signup");
      
      const newUser = {
        "_id" : uuid.v4(),
        "firstName" : request.body.firstName,
        "lastName" : request.body.lastName,
        "email" : request.body.email,
        "address" : request.body.addr,
        "password" : request.body.password,
        "location" : request.body.loc,
        "phone" : request.body.phone
      };
      
      const res = await collection.insertOne(newUser);
      
      response.status(200).json(res);

      // Ensures that the client will close when you finish/error
      await client.close();
      console.log("closed!");
  
    } catch (error) {
      console.log("Error");
      response.status(500).json(error);
    }
});
app.get("/api/payments",async(request,response)=>{
  try {
      // Connect the client to the server    (optional starting in v4.7)
       await client.connect();
      
      const db = client.db("Order_Management");
      const collection = db.collection("Payments");
      const payment = await collection.find().toArray();
      console.log(payment);
      
      response.status(200).json(payment);
      
      // Ensures that the client will close when you finish/error
      await client.close();
      console.log("closed!");
      
    } catch (error) {
      console.log("Error");
      response.status(500).json(error);
    }
});
app.get("/api/order-history",async(request,response)=>{
  try {
   

      // Connect the client to the server    (optional starting in v4.7)
       await client.connect();
      
      const user_id = '1';
      const orderdb = client.db("Order_Management");
      const orderCollection = orderdb.collection("Orders");
      const orderList = await orderCollection.find({user_id}).toArray();

      const adCollection = orderdb.collection("AdTest");
      const ordersWithAdDetails = await Promise.all(orderList.map(async (order) => {
        const adId = order.ad_id;
        const ad = await adCollection.findOne({ _id: adId });
        return {
          ...order,
          ad_details: ad,
        };
      }));
      console.log(ad);
      response.status(200).json(ordersWithAdDetails);

      
      
      
      
      // Ensures that the client will close when you finish/error
      await client.close();
      console.log("closed!");
      
    } catch (error) {
      console.log("Error");
      response.status(500).json(error);
    }
});
app.post("/api/create-payment", async(request,response)=>{

  try {
      // Connect the client to the server    (optional starting in v4.7)
       await client.connect();
  
      const db = client.db("Order_Management");
      const collection = db.collection("Payments");
      
      const newPayment = {
        "_id" : uuid.v4(),
        "user_id" : request.body.userId,
        "card_number" : request.body.cardNumber,
        "expiry" : request.body.expiryDate,
        "cvv" : request.body.cvv,
        "firstName" : request.body.firstName,
        "lastName" : request.body.lastName,
        "address" : request.body.address,
        
        
        
      };
      
      const res = await collection.insertOne(newPayment);
      
      response.status(200).json(res);

      // Ensures that the client will close when you finish/error
      await client.close();
      console.log("closed!");
  
    } catch (error) {
      console.log("Error");
      response.status(500).json(error);
    }
});
app.get("/api/payments/:paymentId",async(request,response)=>{
  try {
   

      // Connect the client to the server    (optional starting in v4.7)
       await client.connect();
      
      const paymentId = request.params.paymentId;
      const db = client.db("Order_Management");
      const Collection = db.collection("Payments");
      const payment = await Collection.findOne({ _id: paymentId });
      console.log(payment);
      response.status(200).json(payment);
      // Ensures that the client will close when you finish/error
      await client.close();
      console.log("closed!");
      
    } catch (error) {
      console.log("Error");
      response.status(500).json(error);
    }
});
app.put("/api/payments/:paymentId",async(request,response)=>{
  try {
   

      // Connect the client to the server    (optional starting in v4.7)
      await client.connect();

      const paymentId = request.params.paymentId;
      const paymentData = request.body;
       
  
      const db = client.db("Order_Management");
      const Collection = db.collection("Payments");
      const result = await Collection.updateOne(
        { _id: paymentId },
        { $set: paymentData }
      );
      console.log(result);
      
      if (result.modifiedCount === 1) {
        response.status(200).json({ message: 'Payment method updated' });
      } else {
        response.status(404).json({ message: 'Payment method not found' });
      }
      
      // Ensures that the client will close when you finish/error
      await client.close();
      console.log("closed!");
      
    } catch (error) {
      console.log("Error");
      response.status(500).json(error);
    }
});
app.delete("/api/payments/:paymentId",async(request,response)=>{
  try {
   

      // Connect the client to the server    (optional starting in v4.7)
      await client.connect();

      const paymentId = request.params.paymentId;
   
  
      const db = client.db("Order_Management");
      const Collection = db.collection("Payments");
      const result = await Collection.findOneAndDelete({ _id: paymentId });
      console.log(result);
      
      
        response.status(200).json({ message: 'Payment method removed' });
      
       
      
      // Ensures that the client will close when you finish/error
      await client.close();
      console.log("closed!");
      
    } catch (error) {
      console.log("Error");
      response.status(500).json(error);
    }
});
module.exports = app;
  
  
  

