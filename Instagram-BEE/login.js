const express = require("express");
const fs = require("fs/promises");
const cors = require("cors");

const app = express();
const PORT = 4000;
const USERS_FILE = "./users.json";
const post_file = "./posts.json";
const reels_file = "./reels.json";
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

// SIGNUP ROUTE
app.post("/auth/signup", async (req, res) => {
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

// LOGIN ROUTE
app.post("/auth/login", async (req, res) => {
  const {email, password } = req.body;
  
  const users = await readUsers();
  const user = users.find((u) => u.email === email);
  
  if (!user) {
    return res.status(404).json({ message: "User not found. Please sign up." });
  }
  
  const isMatch = users.find((u)=>u.email==email && u.password == password);
  if (!isMatch) {
    return res.status(401).json({ message: "Incorrect password" });
  }
  
  res.json({ 
    message: "Login successful",
    email: user.email,
    myPost: user.myPost || []
  });
});

app.get("/users",async(req,res)=>{
  const data = await readUsers();
  res.json(data);
})

//For Delete
app.delete("/user/:id", async(req, res) => {
  const id = req.params.id;
  const users = await readUsers();
  const newUsers = users.filter((user) => user.id !== id);
  await writeUsers(newUsers);
  res.json({ message: "User deleted successfully" });
})

// For Posts
const readPost =async()=>{
  try{
    const data = await fs.readFile(post_file,"utf-8");
    return JSON.parse(data);
  }
  catch(err){
    return [];
  }
}
const writePost =async(posts)=>{
  await fs.writeFile(post_file,JSON.stringify(posts,null,2));
}

app.post("/post", async (req, res) => {
  const { number, imagePath } = req.body;
  if (!number || !imagePath) {
    return res.status(400).json({ message: "Number and imagePath are required" });
  }

  let posts = await readPost();
  posts[number] = imagePath;
  await writePost(posts);

  res.status(201).json({ message: "Post added successfully!" });
});

app.get("/post/:number", async (req, res) => {
  const number = req.params.number;
  const data = await readPost();
  
  if (data[number]) {
    res.send(data[number]);
  } else {
    res.status(404).send("Post not found");
  }
});

// For Reels
const readReel = async() => {
  try{
    const data = await fs.readFile(reels_file, "utf-8");
    return JSON.parse(data);
  }
  catch(err){
    return {};  // Initialize as empty object instead of array
  }
}
const writeReel = async(reels) => {
  await fs.writeFile(reels_file, JSON.stringify(reels, null, 2));
}

app.post("/reels", async(req, res) => {
  const {number, videoPath} = req.body;
  if(!number || !videoPath){
    return res.status(400).json({message : "Number and videoPAth are required"});
  }
  let reels = await readReel();
  reels[number] = videoPath;
  await writeReel(reels);
  res.status(201).json({message : "Reel added successfully!"});
})

app.get("/reels/:number", async(req, res) => {
  const number = req.params.number;
  const data = await readReel();
  if(data[number]){
    res.send(data[number]);
  }
  else{
    res.status(404).send("Reel not found");
  }
})

app.get("/reels", async(req, res) => {
  const data = await readReel();
  res.json(data);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
