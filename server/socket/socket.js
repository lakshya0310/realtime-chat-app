const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

let io;

// userId -> socketId
const onlineUsers = new Map();

const initializeSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {

        console.log(`Socket Connected: ${socket.id}`);

        // User joins after login
        socket.on("join", (token) => {

            try {

                const decoded = jwt.verify(
                    token,
                    process.env.JWT_SECRET
                );

                const userId = decoded.id;

                onlineUsers.set(userId, socket.id);

                console.log(`User ${userId} is online`);

                io.emit("onlineUsers", [...onlineUsers.keys()]);

            } catch (error) {

                console.log("Invalid Socket Token");

            }

        });
        socket.on("sendMessage", async (data) => {

    try {

        const {
            conversationId,
            senderId,
            receiverId,
            text,
        } = data;

        // Save message
        const message = await Message.create({
            conversation: conversationId,
            sender: senderId,
            text,
        });

        // Update conversation
        await Conversation.findByIdAndUpdate(
            conversationId,
            {
                lastMessage: message._id,
            }
        );

        // Populate sender information
        await message.populate("sender", "-password");

        // Find receiver socket
        const receiverSocket = onlineUsers.get(receiverId);

        // Send only if receiver is online
        if (receiverSocket) {

            io.to(receiverSocket).emit(
                "receiveMessage",
                message
            );

        }

        // Send back to sender as confirmation
        socket.emit("messageSent", message);

    } catch (error) {

        console.log(error);

    }

});
        
        

        socket.on("disconnect", () => {

            console.log(`Socket Disconnected: ${socket.id}`);

            for (const [userId, socketId] of onlineUsers.entries()) {

                if (socketId === socket.id) {

                    onlineUsers.delete(userId);

                    break;

                }

            }

            io.emit("onlineUsers", [...onlineUsers.keys()]);

        });

    });

};

const getIO = () => io;

module.exports = {
    initializeSocket,
    getIO,
    onlineUsers,
};
