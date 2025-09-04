// routes/deletePost.js or inside index.js
import express from "express";
import Post from "../models/postModel.js"; // adjust path

const router = express.Router();

// DELETE /deletePost/:id
router.delete("/:id", async (req, res) => {
  try {
    console.log("Deleting post with ID:", req.params.id);
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
