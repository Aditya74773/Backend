// write the business logic
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken');

// controller for signup
const signup = async (req, res) => {
    try {
        /*
        username: 'adityakumar',
        email: 'abc@gmail.com',
        password: 'abcd1234'
        */

        const { username, email, password } = req.body;
        if(!username || !email || !password){
            return  res.status(400).json({
                message: 'All fields are required'
            });
        }

        // check whether the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists with this email'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        // save user
        await user.save();

        return res.status(201).json({
            message: 'User registered successfully',
            user
        });

    } catch (err) {
        console.error("SIGNUP ERROR:", err.message);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// signin controller
const signin = async (req, res) => {
    try {
        // Validate environment variables
        if (!process.env.JWT_SECRET_KEY) {
            console.error("JWT_SECRET_KEY is not set in environment variables");
            return res.status(500).json({ message: "Server configuration error" });
        }

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                message: "Invalid password please try again"
            });
        }
        const tokenData = {
            id: user._id,
            // email: user.email
        } 
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        console.log("Generated Token:", token);
        res.cookie("access_token", token, {httpOnly: true});

        const loginTime = new Date();
        user.lastLogin = loginTime;
        await user.save();

        return res.status(200).json({
            message: "User signed in successfully",
            user
        });

    } catch (err) {
        console.error("SIGNIN ERROR:", err.message);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// export controllers
module.exports = { signup, signin };
