const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createConversation,
    getConversations,
} = require("../controllers/conversationController");

// All routes protected
router.post("/", protect, createConversation);

router.get("/", protect, getConversations);

module.exports = router;
