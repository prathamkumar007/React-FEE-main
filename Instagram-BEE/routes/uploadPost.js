const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Posts");

router.post("/", async (req, res) => {
  try {
    const { imageUrl, email, isProfileOnly = true } = req.body;

    if (!email || !imageUrl) {
      return res.status(400).json({ error: "Email and Image URL are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const newPost = new Post({
      userId: user._id,
      profileImage: user.profileImage || "/Images/user.png",
      accountName: user.username || email.split('@')[0],
      content: "",
      imageUrl: imageUrl,
      likes: 0,
      comment: [],
      shares: 0,
      isProfileOnly: isProfileOnly
    });

    const savedPost = await newPost.save();

    user.myPost.push(savedPost._id);
    await user.save();

    res.status(201).json(savedPost);
  } catch (err) {
    console.error("Error uploading post: ", err);
    res.status(500).json({ error: "Failed to upload post" });
  }
});

module.exports = router;
