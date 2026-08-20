const Station = require("../models/station");

const getAllStations = async () => {
    const stations = await Station.find()
        .sort({
            line: 1,
            order: 1
        });

    return stations;
};

module.exports = {
    getAllStations,
};