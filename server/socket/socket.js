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

        // Authenticate socket after login
        socket.on("join", (token) => {

            try {

                const decoded = jwt.verify(
                    token,
                    process.env.JWT_SECRET
                );

                const userId = decoded.id;

                // Save authenticated user on this socket
                socket.userId = userId;

                onlineUsers.set(userId, socket.id);

                console.log(`User ${userId} is online`);

                io.emit("onlineUsers", [...onlineUsers.keys()]);

            } catch (error) {

                console.log("Invalid Socket Token");

            }

        });

        // Send Message
        socket.on("sendMessage", async (data) => {

            try {

                const {
                    conversationId,
                    receiverId,
                    text,
                } = data;

                // Authenticated sender
                const senderId = socket.userId;

                if (!senderId) {

                    return socket.emit("error", {
                        message: "Unauthorized",
                    });

                }

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

                // Populate sender details
                await message.populate("sender", "-password");

                // Send to receiver if online
                const receiverSocket = onlineUsers.get(receiverId);

               if (receiverSocket) {

    // Mark delivered
    await Message.findByIdAndUpdate(
        message._id,
        {
            $push: {
                deliveredTo: receiverId,
            },
        }
    );

    message.deliveredTo = [receiverId];

    io.to(receiverSocket).emit(
        "receiveMessage",
        message
    );

    socket.emit("messageDelivered", {
        messageId: message._id,
        userId: receiverId,
    });

}

                // Send confirmation back to sender
                socket.emit(
                    "messageSent",
                    message
                );

            } catch (error) {

                console.log(error);

            }

        });
        socket.on("markAsRead", async ({ conversationId }) => {

    try {

        await Message.updateMany(

            {

                conversation: conversationId,

                sender: {
                    $ne: socket.userId,
                },

                readBy: {
                    $ne: socket.userId,
                },

            },

            {

                $push: {
                    readBy: socket.userId,
                },

            }

        );

        io.emit("messagesRead", {

            conversationId,

            userId: socket.userId,

        });

    } catch (error) {

        console.log(error);

    }

});
	socket.on("typing", ({ receiverId }) => {
	

    	const receiverSocket = onlineUsers.get(receiverId);

    	if (receiverSocket) {

    	    io.to(receiverSocket).emit("typing", {
    	        userId: socket.userId,
    	    });

   	 }

	});
	socket.on("stopTyping", ({ receiverId }) => {

    const receiverSocket = onlineUsers.get(receiverId);

    if (receiverSocket) {

        io.to(receiverSocket).emit("stopTyping", {
            userId: socket.userId,
        });

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
