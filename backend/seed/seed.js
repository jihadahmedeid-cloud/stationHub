require("dotenv").config({
    path: require("path").join(__dirname, "../.env")
});

const mongoose = require("mongoose");

const Station = require("../models/station");
const Message = require("../models/message");

const stations = [
    {
        name: "ramses",
        status: "online"
    },
    {
        name: "sadat",
        status: "offline"
    },
    {
        name: "attaba",
        status: "online"
    },
    {
        name: "helwan",
        status: "offline"
    },
    {
        name: "giza",
        status: "online"
    },
    {
        name: "dokki",
        status: "online"
    }
];

const seed = async () => {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    // Clear old data
    await Station.deleteMany({});
    await Message.deleteMany({});

    // Create stations
    const createdStations = await Station.insertMany(stations);

    console.log(`Seeded ${createdStations.length} stations`);

    // Create messages
    const messages = [
        {
            station: createdStations[0]._id,
            status: "info",
            message: "Welcome to Ramses station"
        },
        {
            station: createdStations[0]._id,
            status: "warning",
            message: "Please follow the station instructions"
        },
        {
            station: createdStations[1]._id,
            status: "info",
            message: "Sadat station is currently available"
        },
        {
            station: createdStations[2]._id,
            status: "warning",
            message: "Please check the station status"
        }
    ];

    const createdMessages = await Message.insertMany(messages);

    console.log(`Seeded ${createdMessages.length} messages`);

    await mongoose.disconnect();

    console.log("Seed complete.");
};

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});