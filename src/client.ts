import {io} from "socket.io-client";

const socket = io("ws://localhost:8080/", {});

socket.on("connect", () => {
    console.log(`Connected ${socket.id}`)
})

socket.on("disconnect", () => {
    console.log(`Disconnected ${socket.id}`)
})
