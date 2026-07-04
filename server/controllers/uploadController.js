const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

const uploadFile = async (req, res) => {

    try {

        const {

            conversationId,

            receiverId,

        } = req.body;

        const message = await Message.create({

            conversation: conversationId,

            sender: req.user._id,

            file: "/uploads/" + req.file.filename,

            fileType: req.file.mimetype,

        });

        await Conversation.findByIdAndUpdate(

            conversationId,

            {

                lastMessage: message._id,

            }

        );

        await message.populate(
            "sender",
            "-password"
        );

        res.json(message);

    }

    catch (err) {

    console.error(err);

    res.status(500).json({
        message: err.message,
        error: err,
    });

}
};

module.exports = {

    uploadFile,

};
