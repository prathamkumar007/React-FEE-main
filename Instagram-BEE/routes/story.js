const express = require('express');
const router = express.Router();
const Story = require('../models/Stories');

router.post("/add", async (req, res) => {
    const {userId, profileImage, accountName} = req.body;
    
    if(!userId || !profileImage || !accountName){
        return res.status(400).json({message: "All fields are required"});
    }

    try{
        const newStory = new Story({
            userId,
            profileImage,
            accountName
        });
        await newStory.save();
        res.status(201).json({message: "Story created successfully", story: newStory});
    } catch(err){
        res.status(500).json({error: 'Could not save story', details: err.message});
    }
});

router.get("/", async (req, res) => {
    try{
        const stories = await Story.find();
        res.json(stories);
    } catch(err){
        res.status(500).json({error: 'Could not fetch stories', details: err.message});
    }
});

router.get("/:id", async (req, res) => {
    try{
        const story = await Story.findById(req.params.id);

        if(!story) return res.status(404).json({message: 'Story not found'});
        res.json(story);
    } catch(err){
        res.status(500).json({ error: "Could not fetch reel", details: err.message });
    }
});

module.exports = router;