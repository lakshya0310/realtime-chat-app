const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign(
        { id },                     // Payload
        process.env.JWT_SECRET,     // Secret Key
        {
            expiresIn: "7d",        // Token validity
        }
    );
};

module.exports = generateToken;
