const express = require("express");
const router = express.Router();
const Reel = require('../models/Reels');

router.post('/add', async (req, res) => {
  const { 
    userId, 
    profileImage, 
    accountName,
    videoUrl, 
    likes, 
    comment, 
    shares        
  } = req.body;

  if (!userId || !videoUrl || !profileImage || !accountName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newReel = new Reel({
      userId,
      profileImage,
      accountName,
      videoUrl,
      likes: likes || 0,
      comment: comment || [],
      shares: shares || 0,
    });
    await newReel.save();
    res.status(201).json({ message: 'Reel created successfully', reel: newReel });
  } catch (err) {
    res.status(500).json({ error: 'Could not save reel', details: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const reels = await Reel.find();
    res.json(reels);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch reels", details: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);
    
    if (!reel) return res.status(404).json({ message: "Reel not found" });
    
    res.json(reel);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch reel", details: err.message });
  }
});

module.exports = router;
