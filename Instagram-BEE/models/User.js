const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['admin', 'user', 'guest'], default: 'user'},
    privacy: {type: String, enum: ['public', 'private'], default: 'public'},
    myPost: [{ type: String }],
    myReels: [{ type: String }]
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
module.exports = User;