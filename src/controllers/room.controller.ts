import {Room} from "../entities/room.entity";
import {User} from "../entities/user.entity";
import {In} from "typeorm";

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
