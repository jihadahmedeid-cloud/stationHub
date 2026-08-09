const { getMessages, createMessage } = require("../services/messageServices");
const { validationResult } = require("express-validator");
const { getIO } = require("../sockets/socket");

const getAllMessages = async (req, res, next) => {
    try {
        const { station } = req.params;

        const messages = await getMessages(req.query, station);

        res.status(200).json({
            success: true,
            ...messages
        });

    } catch (err) {
        next(err);
    }
};

const postMessage = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                errors: errors.array()
            });
        }

        const { station } = req.params;
        const { status, message } = req.body;

        const newMessage = await createMessage({
            station,
            status,
            message
        });

        getIO()
            .to(station.toLowerCase())
            .emit("newMessage", newMessage);

        res.status(201).json({
            success: true,
            data: newMessage
        });

    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllMessages,
    postMessage
};