const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const reelRoutes = require("./routes/reels");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/auth", authRoutes);
app.use("/post", postRoutes);
app.use("/reels", reelRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
