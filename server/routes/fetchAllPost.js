import express from "express";
import Post from "../models/postModel.js";

const router = express.Router();

// GET /api/posts - Fetch all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); 
    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});

export default router;
