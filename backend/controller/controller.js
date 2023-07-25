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

const nodemailer = require('nodemailer');
// transporter created by Saiz Charolia
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shopaesthetics01@gmail.com', 
    pass: 'kibbicuuhilxovsj',
  },
});

// getSignUpUser created by Saiz Charolia
const getSignUpUser = async (req,res) => {
  try {
    const data = await model.getAllUserSignup();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}

// getSignUpUser created by Saiz Charolia
const registerUser = async (req,res) => {
  try {
    const isEmailExists = await model.checkEmailExists({"email": req.body.email});
    
    if (isEmailExists) {
      res.status(400).json({message: "Email already exists\nUse a different email" });
      return;
    }

    // adding everything in the database
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

// loginUser created by Saiz Charolia
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
        from: 'ShopAesthetics01@gmail.com', 
        to: email,
        subject: 'Reset Code for Password Recovery',
        text: `Your reset code is: ${resetCode}`,
      };
      await transporter.sendMail(mailOptions);
      console.log('Reset code email sent successfully.');
    } catch (error) {
      console.error('Failed to send reset code email:', error);
    }
    
    res.status(200).json(updatedUser);
  } catch (error) {
      res.status(500).json(error);
    }
}

// verifyResetCode created by Saiz Charolia
const verifyResetCode  = async (req, res) => {
  try{
    const { email, resetCode } = req.query;

    const isCodeValid = await model.verifyCode(email, resetCode);

    if (isCodeValid) {
      res.status(200).json({ message: 'Reset code is valid.' });
    } else {
        res.status(400).json({ message: 'Reset code is not valid.' });
    }
  } catch (error) {
      console.error('Failed to verify reset code:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
}

// resetNewPassword created by Saiz Charolia
const resetNewPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const updatedUser = await model.saveNewPassword(email, password);

    res.status(200).json(updatedUser);
    
  } catch (error) {
    res.status(500).json(error);
  }
}
  
module.exports = {
  getSignUpUser,
  registerUser,
  loginUser,
  generateResetCode,
  verifyResetCode,
  resetNewPassword
}