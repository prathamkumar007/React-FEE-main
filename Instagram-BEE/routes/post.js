const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = require("../models/Posts");
const User = require("../models/User");

router.post("/add", async (req, res) => {
  const { 
    userId, 
    profileImage, 
    accountName, 
    content, 
    imageUrl, 
    likes, 
    comments, 
    shares 
  } = req.body;

  if (!userId || !content || !imageUrl || !profileImage || !accountName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newPost = new Post({
      userId,
      profileImage,
      accountName,
      content,
      imageUrl,
      likes: likes || 0,
      comments: comments || [],
      shares: shares || 0,
    });

    await newPost.save();
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    res.status(500).json({ error: "Could not save post", details: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({ isProfileOnly: { $ne: true } });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch posts", details: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) return res.status(404).json({ message: "Post not found" });
    
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch post", details: err.message });
  }
});

router.post("/upload", async (req, res) => {
  try {
    const { imageUrl, email, isProfileOnly = true, isPrivate = false } = req.body;

    if (!email || !imageUrl) {
      return res.status(400).json({ error: "Email and Image URL are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newPost = new Post({
      userId: user._id,
      profileImage: user.profileImage || "/Images/user.png",
      accountName: user.username || email.split('@')[0],
      content: "",
      imageUrl,
      likes: 0,
      comment: [],
      shares: 0,
      isProfileOnly: isProfileOnly,
      isPrivate: user.privacy === 'private'
    });

    const savedPost = await newPost.save();

    user.myPost = user.myPost || [];
    user.myPost.push(savedPost._id);
    await user.save();

    res.status(201).json(savedPost);
  } catch (err) {
    console.error("Error uploading post: ", err);
    res.status(500).json({ error: "Failed to upload post", details: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.query;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID format" });
    }
    
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    if (email) {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      user.myPost = user.myPost.filter(postId => postId.toString() !== id.toString());
      await user.save();
    }
    
    await Post.findByIdAndDelete(id);
    
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete post", error: err.message });
  }
});

module.exports = router;
