import {Router} from "express";
import {Message} from "./controllers/message.controller";
import {Register} from "./controllers/auth.controller";


export const routes = (router: Router) => {
    router.post('/api/message', Message)
    router.post('/api/register', Register)
}
