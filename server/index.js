import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';

import createPostRouter from './routes/createPost.js';
import fetchAllPostRouter from './routes/fetchAllPost.js';
import fetchSinglePostRouter from './routes/fetchSinglePost.js';
import deletePostRouter from './routes/deletePost.js';

const app = express();
const PORT = process.env.PORT || 4000;
const mongoString = process.env.MONGO_URI;

// Connect to MongoDB
// mongoose.connect(mongoString);
// const database = mongoose.connection;

mongoose.connect(mongoString)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// Middleware
app.use(cors()); // allow all origins (or configure)
app.use(express.json()); // for JSON payloads

// Routes
app.use('/posts', createPostRouter);
app.use('/fetchAllPosts', fetchAllPostRouter);
app.use('/fetchPost', fetchSinglePostRouter);
app.use('/deletePost',deletePostRouter);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
