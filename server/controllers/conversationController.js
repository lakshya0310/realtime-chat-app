const Conversation = require("../models/Conversation");
require("../models/Message");

// Create a conversation OR return existing one
const createConversation = async (req, res) => {

    try {

        const { receiverId } = req.body;

        // Current logged in user
        const senderId = req.user._id;

        // Check if conversation already exists
        let conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId],
            },
        });

        if (conversation) {
            return res.status(200).json(conversation);
        }

        // Create new conversation
        conversation = await Conversation.create({
            participants: [senderId, receiverId],
        });

        res.status(201).json(conversation);

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
