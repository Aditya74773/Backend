// setup the server
const express = require("express");
// will allow you to read environment variables from .env file
const dotenv = require("dotenv").config()
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const userRoutes = require("./routes/user.routes")
const postRoutes = require("./routes/post.routes")
const profileRoutes = require("./routes/profile.routes");
const CommentRoutes = require("./routes/comment.routes")
const app = express();

// application-level middleware
// parse the req.body back to json
// middleware
app.use(cors({
    origin: "https://linkedin-frontend-theta.vercel.app",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
// mongodb -> connection string

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MONGODB")
}).catch((err) => console.log("err", err.message))

// api

app.use("/api", userRoutes)
app.use("/api", postRoutes)
app.use("/api", profileRoutes)
app.use("/api", CommentRoutes)

app.get("/", (req, res) => {
    return res.send("<h1>Linkedin Backend Project!</h1>")
})
// register -> (POST) http://localhost:4000/api/register

// server-> http://localhost:4000

module.exports = app

// app.listen(process.env.PORT, () => {
//     console.log("Server is running on port ", process.env.PORT)
// })