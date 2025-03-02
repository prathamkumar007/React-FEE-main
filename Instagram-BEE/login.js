const express = require("express");
const fs = require("fs/promises");
const cors = require("cors");

const app = express();
const PORT = 4000;
const USERS_FILE = "./users.json";
const post_file = "./posts.json";
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

  res.json({ message: "Login successful" });
});

app.post("/post", async (req, res) => {
  const { dp, image, caption, title, username } = req.body;
  let posts = await readPost();
  if (!posts[username]) {
      posts[username] = [];
  }
  const newPost = { dp, image, caption, title };
  posts[username].push(newPost);
  await writePost(posts);

  res.status(200).json({ message: "Post added successfully!" });
});

// app.get("/post",async(req,res)=>{
//     const data = await readPost();
//     res.json(data);
// })

app.get("/post/:number", async (req, res) => {
  const number = req.params.number;
  const data = await readPost();
  
  if (data[number]) {
    res.send(data[number]);
  } else {
    res.status(404).send("Post not found");
  }
});
app.get("/users",async(req,res)=>{
  const data = await readUsers();
  res.json(data);
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
