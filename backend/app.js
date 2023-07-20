// const express = require("express");
// const app = express();
// const cors = require("cors");
// app.use(cors());

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://Team24:qwhoZh2NkExdtQu5@shopaestheticscluster.za4i1fn.mongodb.net/";

// const uuid = require("uuid");

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });
  
// app.use(express.json());
// app.get("/api/",async(request,response)=>{
//     try {
//         // Connect the client to the server    (optional starting in v4.7)
//          await client.connect();
    
//         const db = client.db("User_Management");
//         const collection = db.collection("Signup");
//         const user = await collection.find().toArray();
//         console.log(user);
        
//         response.status(200).json(user);

//         // Ensures that the client will close when you finish/error
//         await client.close();
//         console.log("closed!");
    
//       } catch (error) {
//         console.log("Error");
//         response.status(500).json(error);
//       }
// });

// app.post("/api/register", async(request,response)=>{

//   try {
//       // Connect the client to the server    (optional starting in v4.7)
//        await client.connect();
  
//       const db = client.db("User_Management");
//       const collection = db.collection("Signup");
      
//       const newUser = {
//         "_id" : uuid.v4(),
//         "firstName" : request.body.firstName,
//         "lastName" : request.body.lastName,
//         "email" : request.body.email,
//         "address" : request.body.addr,
//         "password" : request.body.password,
//         "location" : request.body.loc,
//         "phone" : request.body.phone
//       };
      
//       const res = await collection.insertOne(newUser);
      
//       response.status(200).json(res);

//       // Ensures that the client will close when you finish/error
//       await client.close();
//       console.log("closed!");
  
//     } catch (error) {
//       console.log("Error");
//       response.status(500).json(error);
//     }
// });

// app.post("/api/login", async (request, response) => {
//   try {
//     const { email, password } = request.body;

//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();

//     const db = client.db("User_Management");
//     const collection = db.collection("Signup");

//     // Check if a user with the provided email exists in the database
//     const user = await collection.findOne({ email : email });
//     console.log(user);

//     if (!user) {
//       return response.status(404).json({ message: 'User not found' });
//     }

//     if (user.password !== password) {
//       return response.status(401).json({ message: 'Invalid password' });
//     }

//     return response.status(201).json({ message: 'Login successful' });

//     await client.close();
//     console.log("closed!");

//   } catch (error) {
//     console.log("Error during login:", error);
//     response.status(500).json(error);
//   } 
// });

// module.exports = app;
  
  
  

