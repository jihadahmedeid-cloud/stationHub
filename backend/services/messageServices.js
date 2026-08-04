const Message = require("../models/Message");

const getMessages = async (query, stationId) => {

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {
        station: stationId
    };

    if (query.status) {
        filter.status = query.status;
    }

    const data = await Message.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Message.countDocuments(filter);

    return {
        data,
        pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
        }
    };
};

const createMessage = async ({
    station,
    status,
    message,
    sender
}) => {

    const newMessage = await Message.create({
        station,
        status,
        message,
        sender
    });

    return newMessage;
};

module.exports = {
    getMessages,
    createMessage
};