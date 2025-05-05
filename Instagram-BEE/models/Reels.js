const mongoose = require('mongoose');

const reelSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    profileImage: { type: String, required: true },
    accountName: { type: String, required: true },
    videoUrl: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comment: { type: [String], default: [] },
    shares: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reel', reelSchema);
