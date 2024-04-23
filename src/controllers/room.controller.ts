import {Room} from "../entities/room.entity";
import {User} from "../entities/user.entity";
import {In} from "typeorm";

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

    res.send(rooms)
}

export const CreateRoom = async (req, res) => {
    const user = req["user"]

    const room = Room.create({
        title: req.body.title
    })

    const members = await User.find({where: {id: In(req.body.members)}})
    room.members = [...members, user]
    await room.save()

    res.send(room)
}
