import express from "express";
import Post from "../models/postModel.js";

const router = express.Router();

// POST /api/posts
router.post("/",  async (req, res) => {
  try {
    const { username, caption, imageUrl } = req.body;

    // Validation
    if (!username || !caption || !imageUrl) {
      return res
        .status(400)
        .json({ message: "Username, caption, and image are required." });
    }

    // Create Post with image as binary buffer
    const newPost = await Post.create({
      username,
      caption,
      imageUrl,
    });

    console.log("New post created:", newPost);

    res.status(201).json({
      message: "Post created Successfully",
      postId: newPost._id,
    });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "Something went wrong on the server." });
  }
});

export default router;
