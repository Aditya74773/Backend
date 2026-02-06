//post shema
//mongoose
const e = require('express');
const mongoose = require('mongoose');

//schema

//const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(

  {


    textComment: {
      type: String,
      required:true
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    //storing the user id who liked the post
  },
  {
    timestamps: true
  }
);
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;

