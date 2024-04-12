import {Router} from "express";
import {Message} from "./controllers/message.controller";
import {GetUser, Login, Register, UpdateUser} from "./controllers/auth.controller";
import {AuthMiddleware} from "./middlewares/auth.middleware";
import {Users} from "./controllers/user.controller";


export const routes = (router: Router) => {
    router.post('/api/message', Message)
    router.post('/api/register', Register)
    router.post('/api/login', Login)
    router.get('/api/user', AuthMiddleware, GetUser)
    router.put('/api/user', AuthMiddleware, UpdateUser)
    router.get('/api/users', AuthMiddleware, Users)
}
