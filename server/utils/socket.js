const { Server } = require('socket.io');

let io;

const socket = {
    init: server => {
        io = new Server(server, {
            cors: {
                origin: "*"
            }
        });

        return io;
    },
    getIo: () => {
        if (!io) {
            throw new Error('Socket io failed to connect')
        }

        return io;
    }
}

module.exports = socket;