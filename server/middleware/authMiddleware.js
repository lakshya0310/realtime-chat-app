const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    try {

        let token;

        // Check Authorization header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {

            token = req.headers.authorization.split(" ")[1];

            // Verify JWT
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            // Find user (excluding password)
            req.user = await User.findById(decoded.id).select("-password");

            return next();
        }

        return res.status(401).json({
            message: "Not authorized. No token provided.",
        });

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token.",
        });

    }
};

module.exports = protect;
