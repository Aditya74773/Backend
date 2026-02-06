//post shema
//mongoose
const e = require('express');
const mongoose = require('mongoose');

//schema

//const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required:true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    //storing the user id who liked the post
    likes: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    
    },
    numberOfComments: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);
const Post = mongoose.model('Post', postSchema);
module.exports = Post;

