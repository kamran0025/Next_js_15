import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true // Removes whitespace from both ends of a string
  },
  caption: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically sets the creation timestamp
  }
});

const Post = (mongoose.models.Post || mongoose.model('Post', postSchema));

export default Post;
