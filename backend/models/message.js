const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        station: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Station",
            required: true
        },

        status: {
            type: String,
            required: true,
            enum: ["info", "warning"]
        },

        message: {
            type: String,
            maxlength: 300,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;