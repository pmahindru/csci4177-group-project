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

const loginUser = async (data) => {
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


module.exports = {
    getAllUserSignup,
    registerUser,
    loginUser,
}