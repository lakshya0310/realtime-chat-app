const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        // Check required fields
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "Invalid email",
            });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "User registered successfully",
            id: user._id,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter email and password",
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        // Generate JWT
        const token = generateToken(user._id);

        res.status(200).json({
            message: "Login successful",

            token,

            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

const getCurrentUser = async (req, res) => {

    res.status(200).json({
        user: req.user,
    });

};

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
};
