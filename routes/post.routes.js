// const express = require('express');
// const router = express.Router();
// const { createPost,getAllPosts, likePost } = require('../controllers/post.controler');
// router.post('/createPost', createPost);
// router.get('/get-Posts', getAllPosts);
// router.post('/likePost', likePost);
// module.exports = router;


const express = require("express");
const router = express.Router();
const { createPost,getAllPosts, likePost } = require("../controllers/post.controler");
router.post('/createPost', createPost);
router.get('/get-Posts', getAllPosts);
router.post("/likePost", likePost);

module.exports = router;
