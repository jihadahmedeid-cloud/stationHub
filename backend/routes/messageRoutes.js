const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const requireAdmin = require("../middleware/requireAdmin");

const {
    getAllMessages,
    postMessage,
} = require("../controller/messageController");

const messageValidator = [
    body("status")
        .notEmpty()
        .withMessage("Status is required"),

    body("message")
        .notEmpty()
        .withMessage("Message is required"),
];

router.get("/:station/updates", getAllMessages);

router.post(
    "/:station/updates",
    requireAdmin,
    messageValidator,
    postMessage
);

module.exports = router;