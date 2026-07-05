const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {

    getUsers,

} = require("../controllers/userController");

router.get(
    "/",
    protect,
    getUsers
);

module.exports = router;
