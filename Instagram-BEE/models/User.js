const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['admin', 'user', 'guest'], default: 'user'},
    privacy: {type: String, enum: ['public', 'private'], default: 'public'},
    myPost: [{ type: String }],
    myReels: [{ type: String }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {timestamps: true});

// Add method to check if a user is following another user
userSchema.methods.isFollowing = function(userId) {
    return this.following.includes(userId);
};

const User = mongoose.model("User", userSchema);
module.exports = User;