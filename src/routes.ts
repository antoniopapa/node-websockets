import {Router} from "express";
import {Message} from "./controllers/message.controller";
import {GetUser, Login, Register} from "./controllers/auth.controller";
import {AuthMiddleware} from "./middlewares/auth.middleware";


export const routes = (router: Router) => {
    router.post('/api/message', Message)
    router.post('/api/register', Register)
    router.post('/api/login', Login)
    router.get('/api/user', AuthMiddleware, GetUser)
}
