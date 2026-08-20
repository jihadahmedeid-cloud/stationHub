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

        line: {
            type: String,
            required: true
        },

        order: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Station = mongoose.model("Station", stationSchema);

module.exports = Station;