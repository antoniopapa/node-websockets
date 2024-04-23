import {User} from "../entities/user.entity";
import {Not} from "typeorm";

export const Users = async (req, res) => {
    const user = req["user"]

    let users = await User.find({
        where: {
            id: Not(user.id)
        }
    })

    res.send(users)
}
