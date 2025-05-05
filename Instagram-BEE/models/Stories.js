const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    userId: {type: String, default: true},
    profileImage: {type: String, default: true},
    accountName: {type: String, default: true},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Stories', storySchema);