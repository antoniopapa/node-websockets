import {Router} from "express";
import {SendMessage} from "./controllers/message.controller";
import {GetUser, Login, Register, UpdateUser} from "./controllers/auth.controller";
import {AuthMiddleware} from "./middlewares/auth.middleware";
import {Users} from "./controllers/user.controller";


export const routes = (router: Router) => {
    router.post('/api/register', Register)
    router.post('/api/login', Login)
    router.get('/api/user', AuthMiddleware, GetUser)
    router.put('/api/user', AuthMiddleware, UpdateUser)
    router.get('/api/users', AuthMiddleware, Users)
    router.post('/api/messages', AuthMiddleware, SendMessage)
}
