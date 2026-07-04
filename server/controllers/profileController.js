const User = require("../models/User");

const uploadAvatar = async (req, res) => {

    try {

        const user = await User.findByIdAndUpdate(

            req.user._id,

            {

                avatar:
                    "/uploads/" +
                    req.file.filename,

            },

            {

                new: true,

            }

        ).select("-password");

        res.json(user);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Avatar upload failed",

        });

    }

};

module.exports = {

    uploadAvatar,

};
