import express from "express";
import Post from "../models/postModel.js";

const router = express.Router();

// GET /api/posts/:id - Fetch post by MongoDB _id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
