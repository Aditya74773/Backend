const Post = require("../models/Post.model");

// CREATE POST
const createPost = async (req, res) => {
  try {
    const { content, author } = req.body;

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
    console.error("CREATE POST ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET ALL POSTS
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username email");

    return res.status(200).json({
      message: "Posts fetched successfully",
      posts,
    });
  } catch (err) {
    console.error("GET POSTS ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ❤️ LIKE POST (FIXED)
const likePost = async (req, res) => {
  try {
    const { postId, userIdObj } = req.body;

    // 1️⃣ validate input
    if (!postId || !userIdObj) {
      return res.status(400).json({
        message: "postId and userIdObj are required",
      });
    }

    // 2️⃣ check post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // 3️⃣ ensure likes array exists
    if (!post.likes) {
      post.likes = [];
    }

    // 4️⃣ prevent duplicate likes
    if (post.likes.includes(userIdObj)) {
      return res.status(400).json({
        message: "Post already liked",
      });
    }

    // 5️⃣ like post
    post.likes.push(userIdObj);
    await post.save();

    return res.status(200).json({
      message: "Post liked successfully",
      likes: post.likes.length,
    });

  } catch (err) {
    console.error("LIKE POST ERROR:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  likePost,
};
