// setup the server
const express = require("express");
// will allow you to read environment variables from .env file
const dotenv = require("dotenv").config()
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser")

// Validate required environment variables
if (!process.env.MONGO_URI) {
    console.error("ERROR: MONGO_URI environment variable is not set");
}
if (!process.env.JWT_SECRET_KEY) {
    console.error("ERROR: JWT_SECRET_KEY environment variable is not set");
}

const userRoutes = require("./routes/user.routes")
const postRoutes = require("./routes/post.routes")
const profileRoutes = require("./routes/profile.routes");
const CommentRoutes = require("./routes/comment.routes")
const app = express();

// application-level middleware
// parse the req.body back to json
// middleware
// allow both production frontend and local dev origin for CORS
const allowedOrigins = [
  "https://frontend-vgi4.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        return callback(new Error('CORS policy: This origin is not allowed.'), false);
    },
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
// mongodb -> connection string

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MONGODB")
}).catch((err) => console.log("MongoDB Connection Error:", err.message))

// api

app.use("/api", userRoutes)
app.use("/api", postRoutes)
app.use("/api", profileRoutes)
app.use("/api", CommentRoutes)

app.get("/", (req, res) => {
    return res.send("<h1>Linkedin Backend Project - Working!</h1>")
})
// register -> (POST) http://localhost:4000/api/register

// server-> http://localhost:4000

module.exports = app

// For local development
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("Server is running on port ", PORT)
})