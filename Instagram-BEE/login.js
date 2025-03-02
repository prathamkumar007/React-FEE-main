const express = require("express");
const fs = require("fs/promises");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 5000;
const USERS_FILE = "./users.json";
const pathi = [1,2,3,4];
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

const readUsers = async () => {
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeUsers = async (users) => {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
};
app.get("/auth/sign",async(req,res)=>{
    res.json(pathi)
})
// SIGNUP ROUTE
app.post("/auth/signup", async (req, res) => {
  const { username, email, password ,id } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const users = await readUsers();
  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ message: "Email already exists" });
  }
//   console.log(users);

  const newUser = { id, username, email, password };
  users.push(newUser);
  await writeUsers(users);

  res.status(201).json({ message: "User registered successfully" });
});

// LOGIN ROUTE
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const users = await readUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ message: "User not found. Please sign up." });
  }

  const isMatch = users.find((u)=>u.email==email && u.password == password);
  if (!isMatch) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  res.json({ message: "Login successful" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
