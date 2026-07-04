const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const upload = require("../config/upload");

const {

    uploadAvatar,

} = require("../controllers/profileController");

router.post(

    "/avatar",

    auth,

    upload.single("avatar"),

    uploadAvatar

);

module.exports = router;
