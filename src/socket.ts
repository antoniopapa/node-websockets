import {Server} from "socket.io";

export const io = new Server(8080, {
    cors: {
        origin: '*'
    }
})

io.on('connect', (socket) => {
    console.log(`Connected ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Disconnected ${socket.id}`);
    })

    socket.on('message', (msg) => {
        console.log(`Message: ${msg}`);
    })
})
