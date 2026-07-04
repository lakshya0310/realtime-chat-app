const express = require("express");

const router = express.Router();

const upload = require("../config/upload");

const auth = require("../middleware/authMiddleware");

const {

    uploadFile,

} = require("../controllers/uploadController");

router.post(

    "/",

    auth,

    upload.single("file"),

    uploadFile

);

module.exports = router;
