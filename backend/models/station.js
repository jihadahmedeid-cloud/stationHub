const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        status: {
            type: String,
            enum: ["online", "offline"],
            default: "online"
        },
    },
    {
        timestamps: true
    }
);

const Station = mongoose.model("Station", stationSchema);

module.exports = Station;