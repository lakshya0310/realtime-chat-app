const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

const sendMessage = async (req, res) => {
    try {

        const { conversationId, text } = req.body;

        if (!conversationId || !text) {
            return res.status(400).json({
                message: "Conversation ID and text are required",
            });
        }

        // Create message
        const message = await Message.create({
            conversation: conversationId,
            sender: req.user._id,
            text,
        });

        // Update last message in conversation
        await Conversation.findByIdAndUpdate(
            conversationId,
            {
                lastMessage: message._id,
            }
        );

        res.status(201).json(message);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

const getMessages = async (req, res) => {

    try {

        const messages = await Message.find({
            conversation: req.params.conversationId,
        })
        .populate("sender", "-password")
        .sort({
            createdAt: 1,
        });

        res.status(200).json(messages);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

module.exports = {
    sendMessage,
    getMessages,
};
