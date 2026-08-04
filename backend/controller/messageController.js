const { getMessages, createMessage } = require("../services/messageServices");
const { validationResult } = require("express-validator");
const { getIO } = require("../sockets/socket");

const getAllMessages = async (req, res, next) => {
    try {
        const { stationId } = req.params;

        const messages = await getMessages(req.query, stationId);

        res.status(200).json({
            success: true,
            ...messages,
        });

    } catch (err) {
        next(err);
    }
};

const postMessage = async (req, res, next) => {
    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(422).json({
                success: false,
                errors: error.array(),
            });
        }

        const { stationId } = req.params;

        const {
            status,
            message,
        } = req.body;

        const sender = req.user.id;
 
        const update = await createMessage({
            station: stationId,
            status,
            message,
            sender,
        });

        getIO().to(station).emit("newMessage", update);

        res.status(201).json({
            success: true,
            data: update,
        });

    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllMessages,
    postMessage,
};