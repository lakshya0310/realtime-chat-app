const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoutes");
const http = require("http");
const path = require("path");
const uploadRoutes = require("./routes/uploadRoutes");
const profileRoutes = require("./routes/profileRoutes");
const userRoutes = require("./routes/userRoutes");


dotenv.config();

connectDB();

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://realtime-chat-app-gold-gamma.vercel.app"
        ],
        credentials: true,
    })
);
app.use(express.json());
app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);

app.use("/api/auth", authRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/profile",profileRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("API is running");
});
app.get("/health", (req, res) => {

    res.status(200).json({

        status: "ok",
        message: "Server is running",

    });

});
const PORT = process.env.PORT || 5000;


const { initializeSocket } = require("./socket/socket");

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
