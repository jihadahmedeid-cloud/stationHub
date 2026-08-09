require("dotenv").config();

const http = require("http");

const app = require("./app");
const connectDB = require("./config/db");

const { initSocket } = require("./sockets/socket");


connectDB();


const PORT = process.env.PORT || 3000;


// Create HTTP server
const server = http.createServer(app);


// Initialize Socket.io
initSocket(server);


server.listen(PORT, () => {

    console.log(
        `Server is running on http://localhost:${PORT}`
    );

});