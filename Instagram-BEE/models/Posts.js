const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    profileImage: {type: String, required: false},
    accountName: {type: String, required: false},
    content: {type: String, required: false},
    imageUrl: {type: String, required: true},
    likes: {type: Number, default: 0},
    comment: {type: [String], default: []},
    shares: {type: Number, default: 0},
    isProfileOnly: {type: Boolean, default: true}
});

module.exports = mongoose.model('Post', postSchema);