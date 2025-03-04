const express = require("express");
const router = express.Router();
const { readReels, writeReels } = require("../utils/fileUtils");

router.post("/", async (req, res) => {
  const { number, videoPath } = req.body;
  if (!number || !videoPath) {
    return res.status(400).json({ message: "Number and videoPath are required" });
  }

  let reels = await readReels();
  reels[number] = videoPath;
  await writeReels(reels);
  res.status(201).json({ message: "Reel added successfully!" });
});

router.get("/", async(req, res) => {
  const data = await readReels();
  res.json(data);
})

router.get("/:number", async (req, res) => {
  const number = req.params.number;
  const data = await readReels();
  if (data[number]) {
    res.send(data[number]);
  } else {
    res.status(404).send("Reel not found");
  }
});

router.put("/:number", async (req, res) => {
  const number = req.params.number;
  const { videoPath } = req.body;
  const reels = await readReels();
  reels[number] = videoPath;
  await writeReels(reels);
  res.json({ message: "Reel updated successfully" });
});

router.delete("/:number", async (req, res) => {
  const number = req.params.number;
  const reels = await readReels();
  delete reels[number];
  await writeReels(reels);
  res.json({ message: "Reel deleted successfully" });
});

module.exports = router;
