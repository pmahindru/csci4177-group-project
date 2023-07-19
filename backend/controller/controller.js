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

module.exports = {
    getSignUpUser,
    registerUser,
}