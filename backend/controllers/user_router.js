const express = require('express');
const bcrypt = require('bcrypt');
const User  = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

module.exports.verifyUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "no token" });
    }
    const decoded = await jwt.verify(token, process.env.KEY);
    return res.json({ status: true, message: "authorized" });
  } catch (error) {
    return res.json(error);
  }
};

exports.signup= async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email })
    if (user) {
      return res.json({ message: "user already existed" })
      
    }
    const hashpassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      username,
      email,
      password: hashpassword,
    })
    await newUser.save()
    return res.json({ status: true, message: "record registered" ,username:username});
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports.getUser= (req,res)=>{
    User.find()
  .then(users=>res.json(users))
  .catch(err=>res.json(err))
}



module.exports.login= async(req,res)=>{
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({ message: "user is not registered" })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.json({ message: "password is incorrect" })
    }

    const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '1h' })
    res.cookie('token', token, { httpOnly: true, maxAge: 360000 })
    return res.json({ status: true, message: "login successful" })
  } catch (error) {
  
    console.log(error)
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports.forgotpassword= async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({ message: "user not registered" })
    }
    const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '15m' })


    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jaya555priya@gmail.com',
        pass: 'ifdk jvjk nudj lcxo'
      }
    });

    var mailOptions = {
      from: 'jaya555priya@gmail.com',
      to: email,
      subject: 'Received password',
      text: `http://localhost:3000/resetpassword/${token}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "error sending mail" })
      } else {
        return res.json({ status: true, message: "email send" })

      }
    });

  } catch (error) {
    console.log(error)
  }

}

module.exports.resetpassword=async (req, res) => {
  const token = req.params.token;
  const { password } = req.body;
  try {
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashpassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashpassword })
    return res.json({ status: true, message: "updated password" })


  } catch (error) {
    return res.json("invalid token")

  }
}


exports.logout=(req, res) => {
  res.clearCookie('token')
  return res.json({ status: true })
}
