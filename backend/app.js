const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const stationRoutes = require("./routes/stationRoutes");
const messageRoutes = require("./routes/messageRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();   



app.use(cors());
app.use(express.json());




app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "StationHub API is running",
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/stations", stationRoutes);
app.use("/api/v1/stations", messageRoutes);

app.use(errorHandler);


module.exports = app;