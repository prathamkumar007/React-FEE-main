const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();


const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const reelRoutes = require("./routes/reels");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/instagram_clone";

mongoose
    .connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error: ", err));

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/auth", authRoutes);
app.use("/post", postRoutes);
app.use("/reels", reelRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
