import express, {Router} from "express";
import {Messages, SendImage, SendMessage} from "./controllers/message.controller";
import {GetUser, Login, Register, UpdateUser} from "./controllers/auth.controller";
import {AuthMiddleware} from "./middlewares/auth.middleware";
import {Users} from "./controllers/user.controller";


export const routes = (router: Router) => {
    router.post('/api/register', Register)
    router.post('/api/login', Login)
    router.get('/api/user', AuthMiddleware, GetUser)
    router.put('/api/user', AuthMiddleware, UpdateUser)
    router.get('/api/users', AuthMiddleware, Users)
    router.get('/api/users/:id/messages', AuthMiddleware, Messages)
    router.post('/api/messages', AuthMiddleware, SendMessage)
    router.post('/api/images', AuthMiddleware, SendImage)
    router.use('/api/images', AuthMiddleware, express.static('./uploads'))
}
