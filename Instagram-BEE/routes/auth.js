const express = require("express");
const router = express.Router();
const { readUsers, writeUsers } = require("../utils/fileUtils");

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const users = await readUsers();
  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const newId = (users.length + 1).toString();
  const newUser = {
    id: newId,
    username,
    email,
    myPost: [],
    myReels: [],
    password
  };

  users.push(newUser);
  await writeUsers(users);
  res.status(201).json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const users = await readUsers();
  const user = users.find((u) => u.email === email);

  const isMatch = users.find((u)=>u.email==email && u.password == password);
  if (!isMatch) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  res.json({ message: "Login successful", email: user.email, myPost: user.myPost || [] });
});

router.get("/users", async (req, res) => {
  const data = await readUsers();
  res.json(data);
})

router.get("/users/:id", async(req, res) => {
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
    users[userIndex].password = password;
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
