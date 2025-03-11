require("dotenv").config();
const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authenticationToken = require("../middlewares/authMiddleware");

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;
const saltRounds = 10;

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      myPost: [],
      myReels: []
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error signing up", error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id.toString(), email: user.email }, SECRET_KEY, { expiresIn: "3h" });

    res.json({ message: "Login successful", token, email: user.email, myPost: user.myPost || [] });

  } catch (error) {
    res.status(500).json({ message: "Login error", error });
  }
});

router.get("/users", authenticationToken, async (req, res) => {
  try {
    const data = await User.find().select("-password");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

router.get("/users/:id", authenticationToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);

  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});

router.put("/users/:id", authenticationToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.user.id.toString() !== id) {
      return res.status(403).json({ message: "Unauthorized to update this user" });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, saltRounds);

    await user.save();
    res.json({ message: "User updated successfully", user });

  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

router.delete("/users/:id", authenticationToken, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.user.id.toString() !== id) {
      return res.status(403).json({ message: "Unauthorized to delete this user" });
    }

    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

module.exports = router;
