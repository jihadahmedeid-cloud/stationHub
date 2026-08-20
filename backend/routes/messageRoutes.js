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
        .isIn(["info", "warning"])
        .withMessage("Status must be info or warning"),

    body("message")
        .trim()
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