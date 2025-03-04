const fs = require("fs/promises");

const USERS_FILE = "./data/users.json";
const POSTS_FILE = "./data/posts.json";
const REELS_FILE = "./data/reels.json";

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

const readPosts = async () => {
  try {
    const data = await fs.readFile(POSTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
};

const writePosts = async (posts) => {
  await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));
};

const readReels = async () => {
  try {
    const data = await fs.readFile(REELS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
};

const writeReels = async (reels) => {
  await fs.writeFile(REELS_FILE, JSON.stringify(reels, null, 2));
};

module.exports = { readUsers, writeUsers, readPosts, writePosts, readReels, writeReels };
