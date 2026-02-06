const Post = require("../models/Post.model");

// create post controller
const createPost = async (req, res) => {
  try {
    const { content, author } = req.body;

    // create post
    const post = new Post({
      content,
      author,
    });

    await post.save();

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (err) {
    console.log("err", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// get all posts controller
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");

    return res.status(200).json({
      message: "Posts fetched successfully",
      posts,
    });
  } catch (err) {
    console.log("err", err.message);
  }
};
const likePost = async (req, res) => {
  try {
    const { postId, userIdObj } = req.body;
    const post = await Post.findById(postId);
    post.likes.push(userIdObj);
    await post.save();
    return res.status(200).json({
        message: "Post liked successfully", 
        post
    });
  } catch (err) {
    console.log("err", err.message);
  } 
};

module.exports = {
  createPost,
  getAllPosts,
  likePost
};
