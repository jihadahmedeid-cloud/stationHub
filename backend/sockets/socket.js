const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        let currentStation = null;

        socket.on("joinStation", (station) => {

            // Leave the old station
            if (currentStation) {
                socket.leave(currentStation);

                const oldCount =
                    io.sockets.adapter.rooms.get(currentStation)?.size || 0;

                io.to(currentStation).emit("presenceUpdate", {
                    stationId: currentStation,
                    count: oldCount,
                });
            }

            // Join the new station
            const stationRoom = station.toLowerCase();

            socket.join(stationRoom);
            currentStation = stationRoom;

            const count =
                io.sockets.adapter.rooms.get(stationRoom)?.size || 0;

            io.to(stationRoom).emit("presenceUpdate", {
                stationId: stationRoom,
                count,
            });
        });

        socket.on("disconnect", () => {

            if (currentStation) {
                const count =
                    io.sockets.adapter.rooms.get(currentStation)?.size || 0;

                io.to(currentStation).emit("presenceUpdate", {
                    stationId: currentStation,
                    count,
                });
            }

            console.log(`Socket disconnected: ${socket.id}`);
        });
    });
};

const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }

    return io;
};

module.exports = {
    initSocket,
    getIO,
};