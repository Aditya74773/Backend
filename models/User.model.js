//mongoose
const e = require('express');
const mongoose = require('mongoose');

//schema

//const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required:true
    },
    email: {
      type: String,
      required:true
    },
    password: {
      type: String,
      required:true
    },
    lastLogin: {
      type: Date
      
    }
  },
  {
    timestamps: true
  }
);
const User = mongoose.model('User', userSchema);
module.exports = User;

