import {Room} from "../entities/room.entity";
import {User} from "../entities/user.entity";
import {In} from "typeorm";
import {io} from "../socket";
import {Message} from "../entities/message.entity";

export const Rooms = async (req, res) => {
    const user = req["user"]
    const name = req.query.name || ""
    let query = Room.createQueryBuilder('r')
        .innerJoin('room_members_user', 'm', 'r.id = m.roomId')
        .where('m.userId = :id', {id: user.id})

    if (name != ''){
        query = query.andWhere(`title LIKE '%${name}%'`)
    }

    const rooms = await query.getMany()

    for (let i = 0; i < rooms.length; i++){
        rooms[i]["last_message"] = await Message.findOne({
            where: {
                room: {id: rooms[i].id}
            },
            order: {created_at: 'DESC'}
        })
    }

    res.send(rooms)
}

export const CreateRoom = async (req, res) => {
    const user = req["user"]

    const room = Room.create({
        title: req.body.title
    })

    const members = await User.find({where: {id: In(req.body.members)}})
    room.members = [...members, user]
    const r = await room.save()

    io.on("connection", socket => {
        socket.join(`room:${r.id}`)
    })

    res.send(room)
}
