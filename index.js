const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const profileRoutes = require("./routes/profile.routes");
const commentRoutes = require("./routes/comment.routes");

const app = express();

/* 🔥 REQUIRED FOR VERSEL + COOKIES */
app.set("trust proxy", 1);

/* ✅ CORS CONFIG */
const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-vgi4.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());

/* MIDDLEWARE */
app.use(express.json());
app.use(cookieParser());

/* DB */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MONGODB"))
  .catch((err) => console.log("err", err.message));

/* ROUTES */
app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use("/api", profileRoutes);
app.use("/api", commentRoutes);

app.get("/", (req, res) => {
  res.send("<h1>LinkedIn Backend Project!</h1>");
});

module.exports = app;
