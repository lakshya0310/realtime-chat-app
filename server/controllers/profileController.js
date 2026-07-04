const User = require("../models/User");

const uploadAvatar = async (req, res) => {

    try {

        console.log("===== AVATAR UPLOAD =====");
        console.log("req.user:", req.user);
        console.log("req.file:", req.file);

        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                avatar: "/uploads/" + req.file.filename,
            },
            {
                new: true,
            }
        ).select("-password");

        console.log("Updated user:", user);

        res.json(user);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Avatar upload failed",
        });

    }

};

module.exports = {
    uploadAvatar,
};
