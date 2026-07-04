const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const { getIO, onlineUsers } = require("../socket/socket");

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

        await message.populate("sender", "-password");

// Get socket instance
const io = getIO();

// Find receiver socket
console.log("Receiver ID:", receiverId);
console.log("Receiver Socket:", onlineUsers.get(receiverId));
const receiverSocket = onlineUsers.get(receiverId);

// Send image to receiver
if (receiverSocket) {

    io.to(receiverSocket).emit(
        "receiveMessage",
        message
    );
    console.log("Image emitted to receiver");

}

// Also send confirmation to sender
const senderSocket = onlineUsers.get(
    req.user._id.toString()
);

if (senderSocket) {

    io.to(senderSocket).emit(
        "messageSent",
        message
    );

}

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
