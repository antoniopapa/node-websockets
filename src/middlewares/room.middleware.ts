import {Request, Response} from "express";
import {Room} from "../entities/room.entity";

export const RoomMiddleware = async (req: Request, res: Response, next: Function) => {
    const id = req.params.room as any
    req['room'] = await Room.findOne({where: {id}})
    next()
}
