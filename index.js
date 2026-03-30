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

let isMongoConnected = false;
let mongoConnectionPromise = null;

const connectToMongoDB = async () => {
    if (isMongoConnected) {
        return;
    }

    if (mongoConnectionPromise) {
        await mongoConnectionPromise;
        return;
    }

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI environment variable is not set");
    }

    mongoConnectionPromise = mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            isMongoConnected = true;
            console.log("Connected to MONGODB");
        })
        .catch((err) => {
            mongoConnectionPromise = null;
            throw err;
        });

    await mongoConnectionPromise;
};

// application-level middleware
// parse the req.body back to json
// middleware
// allow production frontend and local development origins for CORS
const allowedOrigins = [
    "https://frontend-vgi4.vercel.app"
];

const allowedOriginPatterns = [
    /^https:\/\/frontend-vgi4.*\.vercel\.app$/
];

const isLocalDevOrigin = (origin) => {
        return /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
};

const isAllowedOrigin = (origin) => {
    if (!origin) {
        return true;
    }

    if (allowedOrigins.includes(origin) || isLocalDevOrigin(origin)) {
        return true;
    }

    return allowedOriginPatterns.some((pattern) => pattern.test(origin));
};

app.use(cors({
    origin: function (origin, callback) {
        if (isAllowedOrigin(origin)) {
            return callback(null, true);
        }
        return callback(new Error('CORS policy: This origin is not allowed.'), false);
    },
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Ensure MongoDB connection before handling API routes.
app.use(async (req, res, next) => {
    try {
        await connectToMongoDB();
        next();
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
        return res.status(500).json({
            message: "Server error",
            error: "Database connection failed"
        });
    }
});

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
if (process.env.VERCEL !== "1") {
    app.listen(PORT, () => {
        console.log("Server is running on port ", PORT)
    });
}