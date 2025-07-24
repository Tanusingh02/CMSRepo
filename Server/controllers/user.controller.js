const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model"); //  User model

const signup = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const { fullname, email, password, role, doj, location, age, course } = req.body;
  
  const inputDate = new Date(doj);
  const cutoffDate = new Date("2025-05-29");

  let errormessage ="";
  if(age <= 22){
    errormessage +="Age must be greater then 22";
  }

    if(inputDate <= cutoffDate){
     errormessage += "Date of Joining must be after 29-05-2025";
    }

    if(errormessage){
      return res.status(400).json({message:errormessage.trim()});
     }
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      role: role || "user",
      doj,
      location,
      age,
      course
      
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  }catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!await bcrypt.compare(password,user.password)) {
      return res.status(401).json({ message: "Invalid password" });
    }
    
  if (!password) {
    return res.status(401).json({
      success: false,
      message: 'Password is incorrect',
    });
  }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      "your-secret-key",
      { expiresIn: "1h" } // Token expires in 1 hour
    );
    return res.status(200).json({
       token, 
       message: "Login successful" ,
       user:{
        fullname : user.fullname,
        email:user.email,
        role:user.role
       }
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Login failed" });
  }
};
const getLatestUsers = async(req,res)=>{
  try {
    const users = await User.find().sort({created: -1}).limit(15);
    res.status(200).json(users);
  }catch(err){
    res.status(500).json({message: err.message});
  }
};
const updateUser =async(req,res)=>{
  const{fullname,email}=req.body;
  const user = await User.findByIdAndUpdate(req.params.id,{fullname,email},{new:true});
  res.json(user);
}
const deleteUser =async(req,res)=>{
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send();
}

module.exports = {
    signup,
    loginUser,
    getLatestUsers,updateUser,deleteUser
};
