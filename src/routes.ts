import express, {Router} from "express";
import {Messages, SendImage, SendMessage} from "./controllers/message.controller";
import {GetUser, Login, Register, UpdateUser} from "./controllers/auth.controller";
import {AuthMiddleware} from "./middlewares/auth.middleware";
import {Users} from "./controllers/user.controller";
import {CreateRoom, Rooms} from "./controllers/room.controller";
import {RoomMiddleware} from "./middlewares/room.middleware";


export const routes = (router: Router) => {
    router.post('/api/register', Register)
    router.post('/api/login', Login)
    router.get('/api/user', AuthMiddleware, GetUser)
    router.put('/api/user', AuthMiddleware, UpdateUser)
    router.get('/api/users', AuthMiddleware, Users)
    router.post('/api/images', AuthMiddleware, SendImage)
    router.use('/api/images', express.static('./uploads'))
    router.get('/api/rooms/:room/messages', AuthMiddleware, RoomMiddleware, Messages)
    router.post('/api/rooms/:room/messages', AuthMiddleware, RoomMiddleware, SendMessage)
    router.get('/api/rooms', AuthMiddleware, Rooms)
    router.post('/api/rooms', AuthMiddleware, CreateRoom)
}
