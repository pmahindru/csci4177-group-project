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
 

module.exports = {
  getAllUserSignup,
  registerUser,
  loginUserModel,
  saveResetCode,
  verifyCode,
  saveNewPassword,
  checkEmailExists
}
