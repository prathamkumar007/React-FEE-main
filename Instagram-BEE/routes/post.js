const express = require("express");
const router = express.Router();
const { readPosts, writePosts } = require("../utils/fileUtils");

router.post("/", async (req, res) => {
  const { number, imagePath } = req.body;
  if (!number || !imagePath) {
    return res.status(400).json({ message: "Number and imagePath are required" });
  }

  let posts = await readPosts();
  posts[number] = imagePath;
  await writePosts(posts);

  res.status(201).json({ message: "Post added successfully!" });
});

router.get("/", async(req, res) => {
  const data = await readPosts();
  res.json(data);
})

router.get("/:number", async (req, res) => {
  const number = req.params.number;
  const data = await readPosts();

  if (data[number]) {
    res.send(data[number]);
  } else {
    res.status(404).send("Post not found");
  }
});

router.put("/:number", async (req, res) => {
  const number = req.params.number;
  const { imagePath } = req.body;
  const posts = await readPosts();
  posts[number] = imagePath;
  await writePosts(posts);
  res.json({ message: "Post updated successfully" });
});

router.delete("/:number", async (req, res) => {
  const number = req.params.number;
  const posts = await readPosts();
  delete posts[number];
  await writePosts(posts);
  res.json({ message: "Post deleted successfully" });
});

module.exports = router;
