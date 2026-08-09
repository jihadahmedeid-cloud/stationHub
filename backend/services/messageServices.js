const Message = require("../models/message");
const Station = require("../models/station");

const getMessages = async (query, stationName) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const station = await Station.findOne({
        name: stationName.toLowerCase()
    });

    if (!station) {
        const error = new Error("Station not found");
        error.status = 404;
        throw error;
    }

    const filter = {
        station: station._id
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
    message
}) => {
    const stationData = await Station.findOne({
        name: station.toLowerCase()
    });

    if (!stationData) {
        const error = new Error("Station not found");
        error.status = 404;
        throw error;
    }

    const newMessage = await Message.create({
        station: stationData._id,
        status,
        message
    });

    return newMessage;
};

module.exports = {
    getMessages,
    createMessage
};