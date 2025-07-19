const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model"); //  User model

const signup = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const { fullname, email, password, role } = req.body;
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
    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      "your-secret-key",
      { expiresIn: "1h" } // Token expires in 1 hour
    );
    return res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Login failed" });
  }
};

module.exports = {
    signup,
  loginUser
};
