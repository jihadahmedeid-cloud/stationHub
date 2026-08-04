const Station = require("../models/station");

const getAllStations = async () => {
    const stations = await Station.find();

    return stations;
};

module.exports = {
    getAllStations,
};