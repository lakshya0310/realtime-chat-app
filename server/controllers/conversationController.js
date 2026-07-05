const Conversation = require("../models/Conversation");
require("../models/Message");

// Create a conversation OR return existing one
const createConversation = async (req, res) => {

    try {

        const { receiverId } = req.body;

        const senderId = req.user._id;

        // Check if conversation already exists
        let conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId],
            },
        });

        // If it doesn't exist, create it
        if (!conversation) {

            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });

        }

        // Populate exactly like getConversations()
        conversation = await Conversation.findById(conversation._id)
            .populate("participants", "-password")
            .populate("lastMessage");

        res.status(200).json(conversation);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};
const getConversations = async (req, res) => {

    try {

        const conversations = await Conversation.find({
            participants: req.user._id,
        })
            .populate("participants", "-password")
            .populate("lastMessage")
            .sort({
                updatedAt: -1,
            });

        res.status(200).json(conversations);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

module.exports = {
    createConversation,
    getConversations,
};
