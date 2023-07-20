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

module.exports = {
    getSignUpUser,
    registerUser,
    loginUser,
}