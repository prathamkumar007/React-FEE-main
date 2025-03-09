require("dotenv").config();

const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require("jsonwebtoken");
const { readUsers, writeUsers } = require("../utils/fileUtils");
const authenticationToken = require("../middlewares/authMiddleware");

const SECRET_KEY = process.env.SECRET_KEY;
const saltRounds = 10;

const findUserByEmail = async(email) => {
  const users = await readUsers();
  return users.find((u) => u.email === email);
}

const findUserByUsername = async(username) => {
  const users = await readUsers();
  return users.find((u) => u.username === username);
}

const verifiedPassword = async(enteredPassword, storedHashesPassword) => {
  return bcrypt.compare(enteredPassword, storedHashesPassword);
};

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const users = await readUsers();
  if (await findUserByEmail(email)) {
    return res.status(400).json({ message: "Email already exists" });
  }

  if(await findUserByUsername(username)){
    return res.status(401).json({message: "Username already taken"});
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newId = (users.length + 1).toString();
  const newUser = {
    id: newId,
    username,
    email,
    myPost: [],
    myReels: [],
    password : hashedPassword
  };

  users.push(newUser);
  await writeUsers(users);
  res.status(201).json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if(!user){
    return res.status(401).json({message : "Invalid email "})
  }

  const isMatch = await verifiedPassword(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign({id: user.id, email: user.email}, SECRET_KEY, {expiresIn: "1h"});

  res.json({ message: "Login successful", token, email: user.email, myPost: user.myPost || [] });
});

router.get("/users", authenticationToken, async (req, res) => {
  const data = await readUsers();
  res.json(data);
})

router.get("/users/:id", authenticationToken, async(req, res) => {
  const {id} = req.params;
  const users = await readUsers();
  const user = users.find((u) => u.id === id);

  if(!user){
    res.status(404).json({message : "User not found"});
  }
  res.json(user);
})

router.put("/users/:id", async(req, res) => {
  const {id} = req.params;
  const {username, email, password} = req.body;

  const users = await readUsers();
  const userIndex = users.findIndex((u) => u.id === id);
  if(userIndex === -1){
    res.status(404).json({message : "User not found"});
  }
  if(username){
    users[userIndex].username = username;
  }
  if(email){
    users[userIndex].email = email;
  }
  if(password){
    users[userIndex].password = await bcrypt.hash(password, saltRounds);
  }

  await writeUsers(users);
  res.json({ message: "User updated successfully", user: users[userIndex] });
});

router.delete("/users/:id", async(req, res) => {
  const {id} = req.params;

  const users = await readUsers();
  const userIndex = users.findIndex((u) => u.id === id);

  if(userIndex === -1){
    res.status(201).json({message : "User not found"});
  }
  users.splice(userIndex, 1);
  await writeUsers(users);

  res.json({message : "User deleted successfully"});
})

module.exports = router;
