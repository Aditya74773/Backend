// profile schema
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    headline: {
      type: String,
    },

    summary: {
      type: String,
    },

    // storing user's experience
    experiences: [
      {
        companyName: String,
        joiningDate: String,
        lastDate: String,
        description: String,
      },
    ],

    skills: {
      type: [String],
      default: [],
    },

    education: [
      {
        schoolName: String,
        passedOutYear: String,
        joiningDate: String
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
