const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const auth = require("../middleware/auth");

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

router.get("/:stationId/messages", getAllMessages);

router.post(
    "/:stationId/messages",
    auth,
    messageValidator,
    postMessage
);

module.exports = router;